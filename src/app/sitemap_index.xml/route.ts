import { getAllPosts } from "@/content/blog";
import { getAllMovies } from "@/content/movies";
import { SITE_URL } from "@/lib/site";

/**
 * Serves https://netmirror.buzz/sitemap_index.xml — a sitemap index that
 * points at the main /sitemap.xml.
 *
 * Submitting the index URL in Search Console is a common way to reset a stale
 * "Couldn't fetch" state. `<lastmod>` is derived from the newest content date
 * (same source the sitemap uses) so it stays honest across deploys rather than
 * being frozen to a hardcoded date.
 */

export const dynamic = "force-static";

/** Newest content date as YYYY-MM-DD (W3C date form accepted in <lastmod>). */
function newestContentDate(): string {
  const dates = [
    ...getAllPosts().map((p) => p.updated ?? p.date),
    ...getAllMovies().map((m) => m.updated ?? m.datePublished),
  ];
  const newest = dates.reduce((max, d) => (d > max ? d : max), "");
  // Content dates are already YYYY-MM-DD; fall back to today if somehow empty.
  return (newest || new Date().toISOString()).slice(0, 10);
}

export function GET() {
  const lastmod = newestContentDate();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;

  return new Response(body, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
