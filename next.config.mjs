/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permanent (301) redirects consolidating the earlier blog drafts into their
  // dedicated, canonical landing pages — prevents keyword cannibalisation and
  // forwards any accumulated link equity to the page we want to rank.
  async redirects() {
    return [
      {
        source: "/blogs/netmirror-login-online",
        destination: "/netmirror-login-online",
        permanent: true,
      },
      {
        source: "/blogs/netmirror-for-android-tv",
        destination: "/netmirror-android-tv",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

// Enable OpenNext Cloudflare bindings during `next dev` (local development).
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
