/**
 * Google AdSense Auto Ads loader.
 *
 * Renders the official AdSense script as a PLAIN server-rendered <script> tag.
 *
 * Why not next/script:
 *   next/script (strategy="afterInteractive") only injects the tag CLIENT-SIDE
 *   after hydration and stamps it with a `data-nscript` attribute. The AdSense
 *   site-verification crawler reads the raw server HTML and rejects that tag
 *   ("AdSense head tag doesn't support data-nscript attribute"), so the site
 *   never verifies. A plain <script> is emitted verbatim into the server HTML
 *   <head> with no extra attributes — exactly what AdSense expects.
 *
 * The publisher ID is read from NEXT_PUBLIC_ADSENSE_CLIENT (must be
 * NEXT_PUBLIC_* so it is inlined at build time, including the
 * `opennextjs-cloudflare build` step used for Cloudflare deployment).
 *
 * This component must be rendered inside <head> in the root layout.
 */
export default function GoogleAdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // Skip rendering when the publisher ID is not configured so we never inject
  // an invalid AdSense tag.
  if (!client) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
