import type { MetadataRoute } from "next";

/**
 * Generates https://netmirror.buzz/sitemap.xml
 * Next.js serves this automatically from the App Router file convention.
 * The site is a single-page app, so only the homepage is listed.
 */
const BASE_URL = "https://netmirror.buzz";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
