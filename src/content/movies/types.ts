/**
 * Movie content model.
 *
 * Mirrors the blog architecture: each movie lives in its own file under
 * `src/content/movies/posts/<slug>.ts` and is registered in
 * `src/content/movies/index.ts`. The body reuses the same typed `ContentBlock`
 * list (and the shared `BlogContent` renderer) so movie pages produce clean,
 * crawlable, semantic HTML — now including inline links (the `rich` and
 * `links` blocks) for movie→movie and movie→blog internal linking.
 */
import type { ContentBlock, FAQ } from "@/content/blog/types";

export interface Movie {
  /** URL-safe slug. The page lives at /movies/<slug>. */
  slug: string;
  /** Display name used as the H1, e.g. "Border 2". */
  title: string;
  /** <title> tag — keyword-optimised, may differ from the H1. */
  seoTitle: string;
  /** Meta description (~150–160 chars). */
  metaDescription: string;
  /** Optional Open Graph / structured-data image path. */
  ogImage?: string;
  /** Short summary shown on the /movies listing page. */
  excerpt: string;
  /** Release year, e.g. 2026. */
  year: number;
  /** ISO release date (YYYY-MM-DD) of the theatrical release. */
  releaseDate: string;
  /** Primary language / origin, e.g. "Hindi", "English". */
  language?: string;
  /** One or more genres, e.g. ["Action", "War"]. */
  genre: string[];
  /** Runtime in minutes (optional — omit if unverified). */
  runtime?: number;
  /** Director(s) (optional). */
  director?: string;
  /** Top-billed cast. */
  cast: string[];
  /** Content / certification rating or a short critic-rating note (optional). */
  rating?: string;
  /** Free-text tags powering <meta keywords> and the tag chips. */
  tags: string[];
  /** ISO date the page was published. */
  datePublished: string;
  /** ISO date the page was last updated (optional). */
  updated?: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Article body as ordered content blocks (reuses the blog renderer). */
  body: ContentBlock[];
  /** FAQs — emitted as FAQPage structured data. */
  faqs: FAQ[];
  /** Slugs of related movies (for the "Similar Movies" cluster). */
  related: string[];
}

export type { ContentBlock, FAQ } from "@/content/blog/types";
