import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllMovies } from "@/content/movies";
import { SITE_NAME, SITE_URL, absoluteUrl, formatDate } from "@/lib/site";

export const dynamic = "force-static";

const PAGE_TITLE = "Movies — Watch the Latest 2026 Releases Online | NetMirror";
const PAGE_DESCRIPTION =
  "Watch the biggest 2026 movies online in HD and 4K — cast, release dates, reviews, story and where to stream. From global blockbusters to Indian hits, all in one place on NetMirror.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "watch movies online",
    "2026 movies",
    "movie streaming",
    "HD streaming",
    "4K movies",
    "where to watch",
    "OTT release",
    "movie reviews",
  ],
  alternates: { canonical: "/movies" },
  openGraph: {
    type: "website",
    url: absoluteUrl("/movies"),
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

export default function MoviesIndexPage() {
  const movies = getAllMovies();
  const [featured, ...rest] = movies;

  // CollectionPage + ItemList structured data for the listing.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: absoluteUrl("/movies"),
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: movies.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/movies/${m.slug}`),
        name: `${m.title} (${m.year})`,
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
              <span className="text-white/80">Movies</span>
            </nav>
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Watch the Latest{" "}
              <span className="text-gradient-brand">2026 Movies</span> Online
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Cast, release dates, reviews, spoiler-free story summaries and
              where to stream every major release — from global blockbusters to
              Indian hits, in HD and 4K, all in one place.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
          {/* Featured movie */}
          {featured && (
            <Link
              href={`/movies/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 shadow-card transition-colors hover:border-white/20 sm:p-12"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-[110px]" />
              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  Latest · {featured.genre[0]}
                </span>
                <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {featured.title} ({featured.year})
                </h2>
                <p className="mt-4 max-w-2xl text-base text-white/70">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/50">
                  <span>{formatDate(featured.releaseDate)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.language}</span>
                  <span
                    aria-hidden
                    className="ml-2 font-semibold text-brand-400 transition-transform group-hover:translate-x-1"
                  >
                    Read &amp; watch →
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Grid of remaining movies */}
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((movie) => (
              <li key={movie.slug}>
                <Link
                  href={`/movies/${movie.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-white/20 hover:bg-ink-900"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand-400">
                    {movie.genre.slice(0, 2).join(" · ")}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white group-hover:text-white">
                    {movie.title} ({movie.year})
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
                    {movie.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs text-white/45">
                    <span>{formatDate(movie.releaseDate)}</span>
                    <span aria-hidden>·</span>
                    <span>{movie.language}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Product CTA */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-ink-900 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Watch them all on NetMirror
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Stream movies and series from 50+ OTT platforms in one ad-free app
              — in HD and 4K, on Android, iPhone, computer and TV.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Open NetMirror
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
