import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog";
import { getAllMovies } from "@/content/movies";
import { SITE_URL } from "@/lib/site";

/**
 * Generates https://netmirror.buzz/sitemap.xml
 * Next.js serves this automatically from the App Router file convention.
 * Includes the homepage, the blog listing and every blog post, plus the
 * movies listing and every movie page, so all pages are discoverable and
 * crawlable by search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const movies = getAllMovies();

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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/movies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...movieEntries,
    ...postEntries,
  ];
}
