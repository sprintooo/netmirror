import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// Homepage-specific metadata. Leads with "NetMirror APK Download" — the phrase
// users actually search — so it appears in the <title>, description and OG/Twitter
// cards. Overrides the site-wide defaults in layout.tsx for "/" only.
export const metadata: Metadata = {
  title: "NetMirror APK Download - Watch Movies & Series on 50+ OTT Apps",
  description:
    "NetMirror APK download — watch movies and TV series from Netflix, Amazon Prime Video, Disney+, Hotstar and 50+ more OTT platforms. No Ads, 1-click play, on Android, iPhone (iOS) and computer.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://netmirror.buzz/",
    siteName: "NetMirror",
    title: "NetMirror APK Download - Watch Movies & Series on 50+ OTT Apps",
    description:
      "Download the NetMirror APK to watch movies and TV series from Netflix, Prime Video, Disney+, Hotstar and 50+ OTT platforms — No Ads, 1-click play, on Android, iPhone and PC.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMirror APK Download - Watch Movies & Series on 50+ OTT Apps",
    description:
      "Download the NetMirror APK — watch 50+ OTT platforms with No Ads, 1-click play, on Android, iPhone and PC.",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Features />
        <DeviceShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
