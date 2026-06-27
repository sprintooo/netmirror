import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Faq, { type FaqItem } from "@/components/Faq";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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

// Homepage FAQ — written to answer the real queries people search for around
// NetMirror (login online, APK for PC/Windows, Android TV, the "I'm not a
// robot" check, safety) in plain language rather than keyword stuffing. Each
// answer links to the in-depth guide, strengthening internal linking. The Faq
// component also emits FAQPage JSON-LD for rich-result eligibility.
const HOMEPAGE_FAQS: FaqItem[] = [
  {
    question: "Is NetMirror free to use?",
    answer:
      "Yes. NetMirror is free and built to be ad-light — you can browse and play titles from 50+ OTT platforms without a subscription. There is no paid 'Pro' tier to buy; any site selling a NetMirror licence is not official.",
    links: [{ label: "The truth about 'NetMirror Pro'", href: "/blogs/netmirror-pro-https" }],
  },
  {
    question: "How do I download the NetMirror APK?",
    answer:
      "Get the APK from the official link, allow installs from unknown sources on Android, then open the file to install. Our download guide walks through grabbing the correct, current version for your device.",
    links: [
      { label: "NetMirror APK download guide", href: "/blogs/netmirror-apk-download-guide" },
      { label: "Install on Android", href: "/blogs/install-netmirror-on-android" },
    ],
  },
  {
    question: "Can I use NetMirror on a PC or Windows laptop?",
    answer:
      "Yes. The easiest way on a PC or Windows laptop is to open NetMirror in any modern browser — no APK or emulator needed. If you want the phone-style app on Windows, you can run the APK inside an Android emulator.",
    links: [
      { label: "NetMirror for Windows", href: "/netmirror-for-windows" },
      { label: "NetMirror APK for PC", href: "/netmirror-apk-for-pc" },
    ],
  },
  {
    question: "Does NetMirror work on Android TV and smart TVs?",
    answer:
      "Yes. On Android TV you sideload the APK using a trusted downloader app, then launch it from your apps row. You can also use a TV browser or cast from your phone. On a Fire TV Stick the steps are slightly different.",
    links: [
      { label: "NetMirror for Android TV", href: "/netmirror-android-tv" },
      { label: "NetMirror on Fire TV & Smart TV", href: "/blogs/netmirror-on-firestick" },
    ],
  },
  {
    question: "How does NetMirror login online work — do I need an account?",
    answer:
      "There is no traditional username-and-password login. You open the official app or site, pass a quick human-verification step if it appears, and start watching. Never enter a real Netflix or Google password — the genuine app never asks for it.",
    links: [{ label: "How NetMirror login online works", href: "/netmirror-login-online" }],
  },
  {
    question: "Why does NetMirror show an 'I'm not a robot' check?",
    answer:
      "It is a standard human-verification step that blocks bots and keeps servers fast for real viewers. It is normal and safe. If it keeps looping, disable any VPN or ad-blocker for the site, clear cookies and try again.",
    links: [{ label: "Pass the 'I'm not a robot' check", href: "/blogs/netmirror-i-am-not-a-robot" }],
  },
  {
    question: "Is NetMirror safe?",
    answer:
      "NetMirror itself is safe to use when you install it from the official source. The main risk is fake clone sites and 'mod' APKs from random download pages — always use the official link and never approve unexpected downloads or password prompts.",
    links: [{ label: "Is NetMirror safe? Full checklist", href: "/blogs/is-netmirror-safe" }],
  },
  {
    question: "Can I watch NetMirror on iPhone?",
    answer:
      "Yes. NetMirror works on iPhone and iPad — follow the iOS install steps to set it up, then stream the same 50+ OTT catalogues you get on Android.",
    links: [{ label: "Install NetMirror on iPhone", href: "/blogs/install-netmirror-on-iphone" }],
  },
];

// WebApplication structured data — NetMirror is a streaming app, so this is the
// most accurate schema type for the homepage and helps Google represent it as
// software (category, platforms, price).
const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Android, iOS, Windows, macOS, Android TV",
  description:
    "Watch movies and TV series from Netflix, Amazon Prime Video, Disney+, Hotstar and 50+ more OTT platforms in one ad-free app — 1-click play on Android, iPhone, computer and TV.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }}
      />
      <main className="relative">
        <Hero />
        <Features />
        <DeviceShowcase />
        <Faq items={HOMEPAGE_FAQS} className="py-20 sm:py-24" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
