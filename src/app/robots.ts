import type { MetadataRoute } from "next";

/**
 * Generates https://netmirror.buzz/robots.txt
 *
 * Standard, Google-supported directives only — no `Host:` and no
 * custom directives. Output:
 *   User-agent: *
 *   Allow: /
 *
 *   Sitemap: https://netmirror.buzz/sitemap.xml
 */
const BASE_URL = "https://netmirror.buzz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
