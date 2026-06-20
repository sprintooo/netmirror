import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from "@/content/blog";
import { SITE_NAME, SITE_URL, absoluteUrl, formatDate } from "@/lib/site";

// Fully static: pre-render every known slug at build time and 404 anything else.
export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { slug: string };

/** Pre-generate one static page per post. */
export function generateStaticParams(): Params[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Per-post SEO: title, description, canonical, Open Graph, Twitter. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const url = absoluteUrl(`/blogs/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blogs/${post.slug}`);
  const related = getRelatedPosts(post.slug);

  // --- Structured data (JSON-LD) ---
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blogs"),
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqLd =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      <main className="relative">
        <article className="relative">
          {/* Header */}
          <header className="relative overflow-hidden pt-32 pb-10 sm:pt-40">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-radial-glow" />
            <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
              <nav
                aria-label="Breadcrumb"
                className="mb-6 text-sm text-white/50"
              >
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span className="px-2">/</span>
                <Link
                  href="/blogs"
                  className="transition-colors hover:text-white"
                >
                  Blog
                </Link>
                <span className="px-2">/</span>
                <span className="text-white/80">{post.category}</span>
              </nav>

              <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                {post.category}
              </span>

              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/50">
                <span>By {post.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
                {post.updated && (
                  <>
                    <span aria-hidden>·</span>
                    <span>Updated {formatDate(post.updated)}</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
            <BlogContent blocks={post.body} />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* FAQ section */}
            {post.faqs && post.faqs.length > 0 && (
              <section
                aria-labelledby="faq-heading"
                className="mt-14 border-t border-white/10 pt-10"
              >
                <h2
                  id="faq-heading"
                  className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  Frequently asked questions
                </h2>
                <div className="mt-6 space-y-3">
                  {post.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group rounded-2xl border border-white/10 bg-ink-900/60 p-5 open:bg-ink-900"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                        <span>{faq.question}</span>
                        <span
                          aria-hidden
                          className="text-brand-400 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Product CTA / internal link back to homepage */}
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-white">
                Watch it all in one place
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                NetMirror brings 50+ OTT platforms into one ad-free app with
                1-click play — on Android, iPhone, computer and TV.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Go to NetMirror home
              </Link>
            </div>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section
              aria-labelledby="related-heading"
              className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
            >
              <h2
                id="related-heading"
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Keep reading
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blogs/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-white/20 hover:bg-ink-900"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                        {r.category}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                        {r.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                        {r.excerpt}
                      </p>
                      <span className="mt-5 text-sm font-semibold text-brand-400 transition-transform group-hover:translate-x-1">
                        Read article →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/blogs"
                  className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  ← Back to all articles
                </Link>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
