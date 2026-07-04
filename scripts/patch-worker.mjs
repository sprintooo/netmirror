import { readFileSync, writeFileSync } from "fs";

const WORKER_PATH = new URL("../.open-next/worker.js", import.meta.url).pathname;

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://netmirror.buzz/</loc>
  </url>
  <url>
    <loc>https://netmirror.buzz/blogs</loc>
  </url>
</urlset>`;

const SITEMAP_HANDLER = `
            // Serve sitemap.xml directly
            if (url.pathname === '/sitemap.xml') {
              const sitemap = \`${SITEMAP_XML}\`;
              return new Response(sitemap, {
                headers: {
                  'Content-Type': 'application/xml',
                  'Cache-Control': 'public, max-age=3600'
                }
              });
            }`;

const ANCHOR = "const url = new URL(request.url);";

let src = readFileSync(WORKER_PATH, "utf8");

if (src.includes("// Serve sitemap.xml directly")) {
  console.log("patch-worker: sitemap handler already present, skipping.");
  process.exit(0);
}

if (!src.includes(ANCHOR)) {
  console.error(`patch-worker: anchor "${ANCHOR}" not found in ${WORKER_PATH}`);
  process.exit(1);
}

src = src.replace(ANCHOR, ANCHOR + SITEMAP_HANDLER);
writeFileSync(WORKER_PATH, src, "utf8");
console.log("patch-worker: sitemap handler injected into .open-next/worker.js");
