import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog";
import { getAllMovies } from "@/content/movies";
import { getAllLandingPages } from "@/content/landing";
import { SITE_URL } from "@/lib/site";

/**
 * Generates https://netmirror.buzz/sitemap.xml
 * Next.js serves this automatically from the App Router file convention.
 * Includes the homepage, the blog listing and every blog post, plus the
 * movies listing and every movie page, so all pages are discoverable and
 * crawlable by search engines.
 *
 * `lastModified` always reflects real content dates — never the build time —
 * so the values stay stable across deploys and only change when content does.
 * Google downranks/ignores <lastmod> when it sees it churn on every crawl, so
 * keeping it honest preserves its crawl-scheduling value.
 */

/** Newest date in a list of ISO date strings, as a Date. Falls back to epoch. */
function newestDate(dates: string[]): Date {
  const newest = dates.reduce((max, d) => (d > max ? d : max), "");
  return newest ? new Date(newest) : new Date(0);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const movies = getAllMovies();
  const landingPages = getAllLandingPages();

  // Effective "last touched" date for each item (an explicit update wins).
  const postDates = posts.map((p) => p.updated ?? p.date);
  const movieDates = movies.map((m) => m.updated ?? m.datePublished);

  const blogsLastModified = newestDate(postDates);
  const moviesLastModified = newestDate(movieDates);
  const homeLastModified = newestDate([...postDates, ...movieDates]);

  // Dedicated SEO landing pages live at the site root (e.g. /netmirror-faq).
  // High priority — these target high-intent queries and link to the app.
  const landingEntries: MetadataRoute.Sitemap = landingPages.map((p) => ({
    url: `${SITE_URL}/${p.slug}`,
    lastModified: new Date(p.updated ?? p.datePublished),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const movieEntries: MetadataRoute.Sitemap = movies.map((movie) => ({
    url: `${SITE_URL}/movies/${movie.slug}`,
    lastModified: new Date(movie.updated ?? movie.datePublished),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: homeLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/movies`,
      lastModified: moviesLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: blogsLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...landingEntries,
    ...movieEntries,
    ...postEntries,
  ];
}
