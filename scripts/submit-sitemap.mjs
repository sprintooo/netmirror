#!/usr/bin/env node
/**
 * Submit the sitemap to Google Search Console via the Search Console API,
 * using the same service-account key as the indexing script.
 *
 * It first lists the properties the service account can access, then submits
 * the sitemap to every netmirror.buzz property it finds (URL-prefix and/or
 * sc-domain), so you don't have to guess the exact property identifier.
 *
 * The service account must be an OWNER of the property (same requirement as
 * the Indexing API). Zero npm deps — built-in crypto + global fetch.
 *
 * USAGE:
 *   node scripts/submit-sitemap.mjs path/to/service-account.json
 *
 * Optional flags:
 *   --sitemap=https://netmirror.buzz/sitemap.xml   (default)
 *   --site=https://netmirror.buzz/   force a specific property identifier
 *                                    (use sc-domain:netmirror.buzz for a
 *                                     Domain property)
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const DEFAULT_SITEMAP = "https://netmirror.buzz/sitemap.xml";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/webmasters";
const API = "https://www.googleapis.com/webmasters/v3";
const HOST = "netmirror.buzz";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};
const keyPath =
  args.find((a) => !a.startsWith("--")) ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
const sitemapUrl = flag("sitemap", DEFAULT_SITEMAP);
const forcedSite = flag("site", "");

if (!keyPath) {
  console.error("Error: pass the service-account JSON key path.");
  process.exit(1);
}

const b64url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

async function getAccessToken(key) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: key.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(
    JSON.stringify(claim),
  )}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .sign(key.private_key, "base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const data = await res.json();
  if (!res.ok)
    throw new Error(`Token request failed: ${res.status} ${JSON.stringify(data)}`);
  return data.access_token;
}

async function listSites(token) {
  const res = await fetch(`${API}/sites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(`sites.list failed: ${res.status} ${JSON.stringify(data)}`);
  return (data.siteEntry || []).map((s) => s.siteUrl);
}

async function submitSitemap(token, siteUrl) {
  const url = `${API}/sites/${encodeURIComponent(
    siteUrl,
  )}/sitemaps/${encodeURIComponent(sitemapUrl)}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  // A successful submit returns 204 No Content.
  if (res.status === 204) return { ok: true };
  const data = await res.json().catch(() => ({}));
  return { ok: false, status: res.status, msg: data?.error?.message || JSON.stringify(data) };
}

(async () => {
  const key = JSON.parse(readFileSync(keyPath, "utf8"));
  console.log(`Service account: ${key.client_email}`);
  const token = await getAccessToken(key);

  let targets;
  if (forcedSite) {
    targets = [forcedSite];
  } else {
    const sites = await listSites(token);
    console.log(`Accessible properties:\n  ${sites.join("\n  ") || "(none)"}\n`);
    targets = sites.filter((s) => s.includes(HOST));
    if (!targets.length) {
      console.error(
        `No property containing "${HOST}" found for this service account.\n` +
          `Make sure it's an Owner of the property, or pass --site=... explicitly.`,
      );
      process.exit(1);
    }
  }

  console.log(`Submitting sitemap: ${sitemapUrl}\n`);
  let ok = 0;
  for (const site of targets) {
    const r = await submitSitemap(token, site);
    if (r.ok) {
      ok++;
      console.log(`  ok    ${site}`);
    } else {
      console.log(`  FAIL  [${r.status}] ${site} -> ${r.msg}`);
    }
  }
  console.log(`\nDone. Submitted to ${ok}/${targets.length} property(ies).`);
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
