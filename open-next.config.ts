import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * The site is fully static (SSG) — all pages, including /blogs/[slug], are
 * prerendered at build time and never revalidated. We serve their prerendered
 * payloads from Workers static assets (read-only) via the existing ASSETS
 * binding, so no R2/KV cache binding is required.
 *
 * Without this, prerendered dynamic routes (e.g. /blogs/<slug>) 404 at runtime
 * because their cached payloads can't be read.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
