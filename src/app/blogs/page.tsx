import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/content/blog";
import { SITE_NAME, SITE_URL, absoluteUrl, formatDate } from "@/lib/site";

export const dynamic = "force-static";

const PAGE_TITLE = "NetMirror Blog — Streaming Guides, Tips & Tech";
const PAGE_DESCRIPTION =
  "Guides, comparisons and tips for streaming smarter: how to watch movies free, fix buffering, save on subscriptions, and understand the tech and AI behind OTT.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/blogs"),
    siteName: SITE_NAME,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  // CollectionPage + ItemList structured data for the listing.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl("/blogs"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/blogs/${p.slug}`),
        name: p.title,
      })),
    },
  };

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative">
        {/* Header */}
        <header className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-glow" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/50">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-white/80">Blog</span>
            </nav>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              The <span className="text-gradient-brand">NetMirror</span> Blog
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Guides, comparisons and plain-English tech explainers to help you
              stream smarter — across 50+ OTT platforms, every device, no ads.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blogs/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 shadow-card transition-colors hover:border-white/20 sm:p-12"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-[110px]" />
              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  Featured · {featured.category}
                </span>
                <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-white/50">
                  <span>{formatDate(featured.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readingMinutes} min read</span>
                  <span
                    aria-hidden
                    className="ml-2 font-semibold text-brand-400 transition-transform group-hover:translate-x-1"
                  >
                    Read article →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of remaining posts */}
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-white/20 hover:bg-ink-900"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                    {post.category}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white group-hover:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-white/45">
                    <span>{formatDate(post.date)}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingMinutes} min read</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Back to home / product CTA */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-ink-900 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Ready to start watching?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Stream movies and series from 50+ OTT platforms in one ad-free app
              — on Android, iPhone, computer and TV.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Go to NetMirror home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
