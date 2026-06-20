/**
 * Central site constants. Keep the canonical origin in one place so
 * metadata, canonical URLs, structured data and the sitemap stay in sync.
 */
export const SITE_URL = "https://netmirror.buzz";
export const SITE_NAME = "NetMirror";

/** Absolute URL helper. Pass a path beginning with "/". */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Format an ISO date (YYYY-MM-DD) for display, e.g. "May 2, 2026". */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
