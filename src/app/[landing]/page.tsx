import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageView from "@/components/LandingPageView";
import {
  getAllLandingSlugs,
  getLandingBySlug,
} from "@/content/landing";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

// Fully static: pre-render the known landing slugs at build time and 404 the
// rest. Static routes (/movies, /blogs, /sitemap.xml, …) always take priority
// over this dynamic segment, so it only ever resolves the landing pages.
export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { landing: string };

/** Pre-generate one static page per landing slug. */
export function generateStaticParams(): Params[] {
  return getAllLandingSlugs().map((landing) => ({ landing }));
}

/** Per-page SEO: title, description, keywords, canonical, Open Graph, Twitter. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { landing } = await params;
  const page = getLandingBySlug(landing);
  if (!page) return { title: "Page not found" };

  const url = absoluteUrl(`/${page.slug}`);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: page.metaTitle,
      description: page.metaDescription,
      images: [{ url: "/hero-bg.jpg", alt: page.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: ["/hero-bg.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LandingRoute({
  params,
}: {
  params: Promise<Params>;
}) {
  const { landing } = await params;
  const page = getLandingBySlug(landing);
  if (!page) notFound();

  return <LandingPageView page={page} />;
}
