import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import Faq from "@/components/Faq";
import { PhoneMockup, DesktopMockup, TvMockup } from "@/components/DeviceMockups";
import type { LandingPage } from "@/content/landing/types";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Shared renderer for the root-level SEO landing pages.
 *
 * Emits three pieces of structured data per page:
 *   • WebPage       — describes the page itself (name, description, image, dates)
 *   • BreadcrumbList — Home › <page> trail, matching the visible breadcrumb
 *   • FAQPage        — emitted by the <Faq> component from the page's faqs
 *
 * The header carries a real, visible hero image with descriptive alt text
 * (image SEO + accessibility) plus a device-specific illustration. The body
 * reuses BlogContent so headings, lists and inline links render as clean,
 * crawlable, semantic HTML with no client-side JavaScript.
 */

const DEVICE_MOCKUPS = {
  phone: PhoneMockup,
  desktop: DesktopMockup,
  tv: TvMockup,
} as const;

export default function LandingPageView({ page }: { page: LandingPage }) {
  const url = absoluteUrl(`/${page.slug}`);
  const heroImage = absoluteUrl("/hero-bg.jpg");
  const Mockup = page.device ? DEVICE_MOCKUPS[page.device] : null;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.metaTitle,
    description: page.metaDescription,
    url,
    inLanguage: "en",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: heroImage,
      caption: page.heroImageAlt,
    },
    datePublished: page.datePublished,
    dateModified: page.updated ?? page.datePublished,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: page.breadcrumbLabel,
        item: url,
      },
    ],
  };

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <main className="relative">
        <article className="relative">
          {/* Header */}
          <header className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-glow" />
            <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2">
              <div>
                <nav
                  aria-label="Breadcrumb"
                  className="mb-6 text-sm text-white/50"
                >
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                  <span className="px-2">/</span>
                  <span className="text-white/80">{page.breadcrumbLabel}</span>
                </nav>

                <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {page.h1}
                </h1>

                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                  {page.intro}
                </p>

                <div className="mt-8">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                  >
                    Open NetMirror
                  </Link>
                </div>
              </div>

              {/* Hero image + device illustration */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/hero-bg.jpg"
                    alt={page.heroImageAlt}
                    loading="lazy"
                    decoding="async"
                    className="h-64 w-full object-cover object-center sm:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
                  {Mockup && (
                    <div
                      role="img"
                      aria-label={`NetMirror app interface illustration on ${page.device}`}
                      className="pointer-events-none absolute inset-0 flex items-end justify-center p-6"
                    >
                      <Mockup className="w-full max-w-[260px] drop-shadow-2xl" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
            <BlogContent blocks={page.body} />
          </div>

          {/* FAQ (renders FAQPage JSON-LD) */}
          {page.faqs.length > 0 && (
            <Faq items={page.faqs} className="mt-16" />
          )}

          {/* CTA back to the main app */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mt-16 overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white">
                Watch it all on NetMirror
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                Stream movies and series from 50+ OTT platforms in one ad-free
                app — in HD and 4K, with 1-click play on Android, iPhone,
                computer and TV.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Go to NetMirror home
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <Link
              href="/netmirror-faq"
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              ← See all NetMirror FAQs
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
