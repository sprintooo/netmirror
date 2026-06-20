/**
 * Movie registry.
 *
 * To add a new movie:
 *   1. Create `src/content/movies/posts/<your-slug>.ts` that default-exports a
 *      `Movie` (see `types.ts` for the shape).
 *   2. Import it below and add it to the `movies` array.
 * Everything else — the /movies listing, the /movies/<slug> route, metadata,
 * Movie/Breadcrumb/FAQ structured data and the sitemap — picks it up
 * automatically.
 */
import type { Movie } from "./types";

import theSuperMarioGalaxyMovie from "./posts/the-super-mario-galaxy-movie";
import projectHailMary from "./posts/project-hail-mary";
import theDevilWearsPrada2 from "./posts/the-devil-wears-prada-2";
import scream7 from "./posts/scream-7";
import wutheringHeights from "./posts/wuthering-heights-2026";
import mastersOfTheUniverse from "./posts/masters-of-the-universe-2026";
import michael from "./posts/michael-2026";
import border2 from "./posts/border-2";
import theRajaSaab from "./posts/the-raja-saab";
import peddi from "./posts/peddi";

/** Every movie. Order here does not matter — listings sort by release date. */
const movies: Movie[] = [
  theSuperMarioGalaxyMovie,
  projectHailMary,
  theDevilWearsPrada2,
  scream7,
  wutheringHeights,
  mastersOfTheUniverse,
  michael,
  border2,
  theRajaSaab,
  peddi,
];

/** All movies, newest release first. */
export function getAllMovies(): Movie[] {
  return [...movies].sort((a, b) => (a.releaseDate < b.releaseDate ? 1 : -1));
}

/** All slugs — used by generateStaticParams and the sitemap. */
export function getAllMovieSlugs(): string[] {
  return movies.map((m) => m.slug);
}

/** Look up a single movie by slug. */
export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((m) => m.slug === slug);
}

/**
 * Related movies for a given slug. Honours the curated `related` list first
 * (in order), then back-fills with the most recent other titles, capped at
 * `limit`.
 */
export function getRelatedMovies(slug: string, limit = 3): Movie[] {
  const current = getMovieBySlug(slug);
  if (!current) return [];

  const curated = current.related
    .map((s) => getMovieBySlug(s))
    .filter((m): m is Movie => Boolean(m) && m!.slug !== slug);

  if (curated.length >= limit) return curated.slice(0, limit);

  const seen = new Set([slug, ...curated.map((m) => m.slug)]);
  const backfill = getAllMovies().filter((m) => !seen.has(m.slug));

  return [...curated, ...backfill].slice(0, limit);
}

export type { Movie } from "./types";
