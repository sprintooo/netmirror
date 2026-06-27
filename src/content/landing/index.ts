/**
 * Landing-page registry.
 *
 * To add a new landing page:
 *   1. Create `src/content/landing/pages/<slug>.ts` that default-exports a
 *      `LandingPage` (see `types.ts`).
 *   2. Import it below and add it to the `pages` array.
 * The root `/[landing]` route, metadata, WebPage/Breadcrumb/FAQ structured
 * data and the sitemap all pick it up automatically.
 */
import type { LandingPage } from "./types";

import netmirrorLoginOnline from "./pages/netmirror-login-online";
import netmirrorApkForPc from "./pages/netmirror-apk-for-pc";
import netmirrorForWindows from "./pages/netmirror-for-windows";
import netmirrorAndroidTv from "./pages/netmirror-android-tv";
import netmirrorFaq from "./pages/netmirror-faq";

/** Every landing page. */
const pages: LandingPage[] = [
  netmirrorLoginOnline,
  netmirrorApkForPc,
  netmirrorForWindows,
  netmirrorAndroidTv,
  netmirrorFaq,
];

/** All landing pages. */
export function getAllLandingPages(): LandingPage[] {
  return pages;
}

/** All slugs — used by generateStaticParams and the sitemap. */
export function getAllLandingSlugs(): string[] {
  return pages.map((p) => p.slug);
}

/** Look up a single landing page by slug. */
export function getLandingBySlug(slug: string): LandingPage | undefined {
  return pages.find((p) => p.slug === slug);
}

export type { LandingPage } from "./types";
