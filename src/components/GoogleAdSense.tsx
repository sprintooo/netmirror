import Script from "next/script";

/**
 * Google AdSense Auto Ads loader.
 *
 * Renders the official AdSense script globally. The publisher ID is read from
 * the NEXT_PUBLIC_ADSENSE_CLIENT env var (must be NEXT_PUBLIC_* so it is
 * inlined into the client bundle at build time — including the
 * `opennextjs-cloudflare build` step used for Cloudflare deployment).
 *
 * `strategy="afterInteractive"` loads the script asynchronously after the page
 * becomes interactive, so it never blocks initial rendering.
 */
export default function GoogleAdSense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  // Skip rendering when the publisher ID is not configured (e.g. previews)
  // so we never inject an invalid AdSense tag.
  if (!client) return null;

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      async
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
    />
  );
}
