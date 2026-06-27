/**
 * Landing-page content model.
 *
 * These are dedicated, high-intent SEO landing pages served at the site root
 * (e.g. /netmirror-login-online) rather than under /blogs. Each one targets a
 * specific search query and renders WebPage + BreadcrumbList + FAQPage
 * structured data via the shared LandingPageView component.
 *
 * Body and FAQ shapes are reused from the blog content model so we share the
 * same renderer (BlogContent) and FAQ structured-data logic.
 */
import type { ContentBlock, FAQ } from "@/content/blog/types";

/** Which device mockup illustration to show in the page header, if any. */
export type LandingDevice = "phone" | "desktop" | "tv";

export interface LandingPage {
  /** URL-safe slug. The page lives at /<slug> (root level). */
  slug: string;
  /** Label shown in the breadcrumb trail and used as the schema name. */
  breadcrumbLabel: string;
  /** <title> + Open Graph/Twitter title. */
  metaTitle: string;
  /** Meta description (~150–160 chars). */
  metaDescription: string;
  /** The visible H1. */
  h1: string;
  /** Lead paragraph rendered under the H1. */
  intro: string;
  /** Descriptive alt text for the page's hero image (accessibility + image SEO). */
  heroImageAlt: string;
  /** Optional device illustration shown beside the intro. */
  device?: LandingDevice;
  /** Meta keywords / OG tags. */
  keywords: string[];
  /** ISO date (YYYY-MM-DD) the page was published. */
  datePublished: string;
  /** ISO date the page was last updated (optional). */
  updated?: string;
  /** Main body as ordered content blocks (reuses the blog block renderer). */
  body: ContentBlock[];
  /** FAQs — rendered as an accordion and emitted as FAQPage structured data. */
  faqs: FAQ[];
}

export type { ContentBlock, FAQ };
