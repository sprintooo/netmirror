#!/usr/bin/env node
/**
 * Bulk-submit URLs to the Google Indexing API.
 *
 * Reads every <loc> from the live sitemap and notifies Google that each URL
 * was updated, so they get crawled/indexed quickly (200 URLs/day quota).
 *
 * Zero npm dependencies — signs the service-account JWT with Node's built-in
 * crypto and uses the global fetch (Node 18+).
 *
 * SETUP (one time):
 *   1. Google Cloud Console -> create/pick a project.
 *   2. Enable the "Web Search Indexing API".
 *   3. Create a Service Account -> add a JSON key -> download it.
 *   4. Search Console -> Settings -> Users and permissions -> add the service
 *      account email (xxx@xxx.iam.gserviceaccount.com) as an *Owner*.
 *
 * USAGE:
 *   node scripts/index-urls.mjs path/to/service-account.json
 *   # or set the key path via env:
 *   GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json node scripts/index-urls.mjs
 *
 * Optional flags:
 *   --sitemap=https://netmirror.buzz/sitemap.xml   (default)
 *   --type=URL_UPDATED | URL_DELETED               (default URL_UPDATED)
 *   --only=blogs/foo,movies/bar    only submit URLs containing these substrings
 */

import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const DEFAULT_SITEMAP = "https://netmirror.buzz/sitemap.xml";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";
const SCOPE = "https://www.googleapis.com/auth/indexing";

// ---- args -----------------------------------------------------------------
const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};
const keyPath =
  args.find((a) => !a.startsWith("--")) ||
  process.env.GOOGLE_APPLICATION_CREDENTIALS;
const sitemapUrl = flag("sitemap", DEFAULT_SITEMAP);
const type = flag("type", "URL_UPDATED");
const only = flag("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (!keyPath) {
  console.error(
    "Error: pass the service-account JSON key path, e.g.\n" +
      "  node scripts/index-urls.mjs ./service-account.json",
  );
  process.exit(1);
}

// ---- base64url helper -----------------------------------------------------
const b64url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

// ---- get an OAuth access token from the service account -------------------
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
  if (!res.ok) {
    throw new Error(
      `Token request failed: ${res.status} ${JSON.stringify(data)}`,
    );
  }
  return data.access_token;
}

// ---- pull URLs out of the sitemap ----------------------------------------
async function getSitemapUrls(url) {
  const res = await fetch(url, { headers: { "User-Agent": "index-script" } });
  if (!res.ok) throw new Error(`Could not fetch sitemap: ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].trim(),
  );
  return [...new Set(locs)];
}

// ---- submit one URL -------------------------------------------------------
async function publish(token, url) {
  const res = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type }),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

// ---- main -----------------------------------------------------------------
(async () => {
  const key = JSON.parse(readFileSync(keyPath, "utf8"));
  console.log(`Service account: ${key.client_email}`);

  let urls = await getSitemapUrls(sitemapUrl);
  if (only.length) {
    urls = urls.filter((u) => only.some((s) => u.includes(s)));
  }
  console.log(`Submitting ${urls.length} URL(s) as ${type}\n`);

  const token = await getAccessToken(key);

  let ok = 0;
  let failed = 0;
  for (const url of urls) {
    try {
      const r = await publish(token, url);
      if (r.ok) {
        ok++;
        console.log(`  ok    ${url}`);
      } else {
        failed++;
        const msg = r.data?.error?.message || JSON.stringify(r.data);
        console.log(`  FAIL  [${r.status}] ${url} -> ${msg}`);
        if (r.status === 429) {
          console.log(
            "\nDaily quota (200/day) hit. Re-run tomorrow for the rest.",
          );
          break;
        }
      }
    } catch (e) {
      failed++;
      console.log(`  ERROR ${url} -> ${e.message}`);
    }
    // gentle pacing so we don't burst the API
    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\nDone. ${ok} succeeded, ${failed} failed.`);
  process.exit(failed && !ok ? 1 : 0);
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
