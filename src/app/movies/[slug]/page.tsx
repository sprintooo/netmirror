import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogContent from "@/components/BlogContent";
import {
  getAllMovieSlugs,
  getMovieBySlug,
  getRelatedMovies,
} from "@/content/movies";
import { SITE_NAME, SITE_URL, absoluteUrl, formatDate } from "@/lib/site";

// Fully static: pre-render every known slug at build time and 404 anything else.
export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { slug: string };

/** Pre-generate one static page per movie. */
export function generateStaticParams(): Params[] {
  return getAllMovieSlugs().map((slug) => ({ slug }));
}

/** Per-movie SEO: title, description, keywords, canonical, Open Graph, Twitter. */
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);
  if (!movie) return { title: "Movie not found" };

  const url = absoluteUrl(`/movies/${movie.slug}`);

  return {
    title: movie.seoTitle,
    description: movie.metaDescription,
    keywords: movie.tags,
    alternates: { canonical: `/movies/${movie.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title: movie.seoTitle,
      description: movie.metaDescription,
      publishedTime: movie.datePublished,
      modifiedTime: movie.updated ?? movie.datePublished,
      tags: movie.tags,
      ...(movie.ogImage ? { images: [{ url: absoluteUrl(movie.ogImage) }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: movie.seoTitle,
      description: movie.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);
  if (!movie) notFound();

  const url = absoluteUrl(`/movies/${movie.slug}`);
  const related = getRelatedMovies(movie.slug);

  // --- Structured data (JSON-LD) ---
  const movieLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: `${movie.title} (${movie.year})`,
    description: movie.metaDescription,
    ...(movie.ogImage ? { image: absoluteUrl(movie.ogImage) } : {}),
    datePublished: movie.releaseDate,
    genre: movie.genre,
    inLanguage: movie.language,
    ...(movie.director
      ? { director: { "@type": "Person", name: movie.director } }
      : {}),
    actor: movie.cast.map((name) => ({ "@type": "Person", name })),
    ...(movie.runtime ? { duration: `PT${movie.runtime}M` } : {}),
    ...(movie.rating ? { contentRating: movie.rating } : {}),
    url,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Movies",
        item: absoluteUrl("/movies"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${movie.title} (${movie.year})`,
        item: url,
      },
    ],
  };

  const faqLd =
    movie.faqs && movie.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: movie.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  // Quick-facts shown under the title.
  const facts: { label: string; value: string }[] = [
    { label: "Released", value: formatDate(movie.releaseDate) },
    ...(movie.language ? [{ label: "Language", value: movie.language }] : []),
    { label: "Genre", value: movie.genre.join(", ") },
    ...(movie.runtime
      ? [{ label: "Runtime", value: `${movie.runtime} min` }]
      : []),
    ...(movie.director ? [{ label: "Director", value: movie.director }] : []),
    ...(movie.rating ? [{ label: "Rating", value: movie.rating }] : []),
  ];

  return (
    <>
      <Navbar />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieLd) }}
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
                  href="/movies"
                  className="transition-colors hover:text-white"
                >
                  Movies
                </Link>
                <span className="px-2">/</span>
                <span className="text-white/80">{movie.title}</span>
              </nav>

              <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                {movie.genre[0]}
              </span>

              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {movie.title} ({movie.year})
              </h1>

              {/* Quick facts */}
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                      {f.label}
                    </dt>
                    <dd className="mt-0.5 text-sm text-white/75">{f.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Primary CTA */}
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  Watch {movie.title} on NetMirror
                </Link>
              </div>
            </div>
          </header>

          {/* Body */}
          <div className="mx-auto max-w-3xl px-4 pb-4 sm:px-6">
            <BlogContent blocks={movie.body} />

            {/* Cast */}
            {movie.cast.length > 0 && (
              <section className="mt-12 border-t border-white/10 pt-8">
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Cast
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {movie.cast.map((name) => (
                    <li
                      key={name}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Tags */}
            {movie.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {movie.tags.map((tag) => (
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
            {movie.faqs && movie.faqs.length > 0 && (
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
                  {movie.faqs.map((faq, i) => (
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
                Watch {movie.title} on NetMirror
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-white/70">
                Stream {movie.title} and thousands more titles from 50+ OTT
                platforms in one ad-free app — in HD and 4K, with 1-click play on
                Android, iPhone, computer and TV.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                Open NetMirror
              </Link>
            </div>
          </div>

          {/* Related / similar movies */}
          {related.length > 0 && (
            <section
              aria-labelledby="related-heading"
              className="mx-auto max-w-7xl px-4 py-20 sm:px-6"
            >
              <h2
                id="related-heading"
                className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Similar movies
              </h2>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/movies/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-white/20 hover:bg-ink-900"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                        {r.genre.slice(0, 2).join(" · ")}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                        {r.title} ({r.year})
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                        {r.excerpt}
                      </p>
                      <span className="mt-5 text-sm font-semibold text-brand-400 transition-transform group-hover:translate-x-1">
                        View movie →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/movies"
                  className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
                >
                  ← Back to all movies
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
