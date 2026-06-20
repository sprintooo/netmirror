/**
 * Blog registry.
 *
 * To add a new post:
 *   1. Create `src/content/blog/posts/<your-slug>.ts` that default-exports a
 *      `BlogPost` (see `types.ts` for the shape).
 *   2. Import it below and add it to the `posts` array.
 * Everything else — the listing page, the /blogs/<slug> route, metadata,
 * structured data and the sitemap — picks it up automatically.
 */
import type { BlogPost } from "./types";

import howToWatchMoviesFreeOnline from "./posts/how-to-watch-movies-free-online";
import isNetmirrorSafe from "./posts/is-netmirror-safe";
import installNetmirrorOnIphone from "./posts/install-netmirror-on-iphone";
import installNetmirrorOnAndroid from "./posts/install-netmirror-on-android";
import watchNetflixPrimeDisneyOneApp from "./posts/watch-netflix-prime-disney-one-app";
import bestFreeStreamingApps2026 from "./posts/best-free-streaming-apps-2026";
import howToStreamOnAndroidTv from "./posts/how-to-stream-on-android-tv";
import stopBufferingStreaming from "./posts/stop-buffering-streaming";
import netmirrorVsPaidStreaming from "./posts/netmirror-vs-paid-streaming";
import adFreeStreamingGuide from "./posts/ad-free-streaming-guide";
import whatIsOttPlatform from "./posts/what-is-ott-platform";
import howVideoStreamingWorks from "./posts/how-video-streaming-works";
import hdrVs4kStreaming from "./posts/hdr-vs-4k-streaming";
import howMuchDataDoesStreamingUse from "./posts/how-much-data-does-streaming-use";
import aiMovieRecommendations from "./posts/ai-movie-recommendations";
import bestAiToolsForContentCreators from "./posts/best-ai-tools-for-content-creators";
import aiUpscalingStreaming from "./posts/ai-upscaling-streaming";
import organizeYourWatchlist from "./posts/organize-your-watchlist";
import screenTimeBalance from "./posts/screen-time-balance";
import saveMoneyOnStreaming from "./posts/save-money-on-streaming";
import netmirrorApkDownloadGuide from "./posts/netmirror-apk-download-guide";
import netmirrorV6WhatsNew from "./posts/netmirror-v6-whats-new";
import netmirrorOnPcWindows from "./posts/netmirror-on-pc-windows";
import netmirrorOnFirestick from "./posts/netmirror-on-firestick";
import netmirrorApkNotInstallingFix from "./posts/netmirror-apk-not-installing-fix";
import howToUpdateNetmirrorApk from "./posts/how-to-update-netmirror-apk";
import netmirrorApkSystemRequirements from "./posts/netmirror-apk-system-requirements";
import downloadMoviesWatchOffline from "./posts/download-movies-watch-offline";
import watchLiveTvSportsNetmirror from "./posts/watch-live-tv-sports-netmirror";
import watchMoviesOnNetmirrorBeginners from "./posts/watch-movies-on-netmirror-beginners";

/** Every post. Order here does not matter — listings sort by date. */
const posts: BlogPost[] = [
  howToWatchMoviesFreeOnline,
  isNetmirrorSafe,
  installNetmirrorOnIphone,
  installNetmirrorOnAndroid,
  watchNetflixPrimeDisneyOneApp,
  bestFreeStreamingApps2026,
  howToStreamOnAndroidTv,
  stopBufferingStreaming,
  netmirrorVsPaidStreaming,
  adFreeStreamingGuide,
  whatIsOttPlatform,
  howVideoStreamingWorks,
  hdrVs4kStreaming,
  howMuchDataDoesStreamingUse,
  aiMovieRecommendations,
  bestAiToolsForContentCreators,
  aiUpscalingStreaming,
  organizeYourWatchlist,
  screenTimeBalance,
  saveMoneyOnStreaming,
  netmirrorApkDownloadGuide,
  netmirrorV6WhatsNew,
  netmirrorOnPcWindows,
  netmirrorOnFirestick,
  netmirrorApkNotInstallingFix,
  howToUpdateNetmirrorApk,
  netmirrorApkSystemRequirements,
  downloadMoviesWatchOffline,
  watchLiveTvSportsNetmirror,
  watchMoviesOnNetmirrorBeginners,
];

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** All slugs — used by generateStaticParams and the sitemap. */
export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Look up a single post by slug. */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Distinct categories, sorted alphabetically. */
export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

/**
 * Related posts for a given slug — same category first, then most recent,
 * capped at `limit`.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  const others = getAllPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export type { BlogPost } from "./types";
