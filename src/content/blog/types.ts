/**
 * Blog content model.
 *
 * Each post lives in its own file under `src/content/blog/posts/<slug>.ts`
 * and is registered in `src/content/blog/index.ts`. Content is authored as a
 * list of typed blocks so we control semantic headings (H2/H3), lists and
 * paragraphs — and can render clean, crawlable HTML without extra deps.
 */

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export interface FAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  /** URL-safe slug. The page lives at /blogs/<slug>. */
  slug: string;
  /** Used as the H1 and the <title>. */
  title: string;
  /** Meta description (~150–160 chars). */
  description: string;
  /** Short summary shown on the listing page. */
  excerpt: string;
  category: string;
  tags: string[];
  author: string;
  /** ISO date (YYYY-MM-DD) the article was published. */
  date: string;
  /** ISO date the article was last updated (optional). */
  updated?: string;
  /** Estimated reading time in minutes. */
  readingMinutes: number;
  /** Article body as ordered content blocks. */
  body: ContentBlock[];
  /** Optional FAQs — when present we emit FAQPage structured data. */
  faqs?: FAQ[];
}
