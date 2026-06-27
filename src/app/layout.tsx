import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import ServiceWorker from "@/components/ServiceWorker";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netmirror.buzz"),
  referrer: "no-referrer-when-downgrade",
  title: "NetMirror APP - Watch Movies and Series",
  description:
    "Watch Movies and Tv Series from Netflix, Amazon Prime Video, Disney+, Hotstar and 50+ More OTT Platforms with No Ads, 1-click play, available on Android, iPhone (iOS), and computer.",
  keywords: [
    "watch",
    "streaming",
    "free",
    "movies",
    "series",
    "OTT",
    "android",
    "iphone",
    "computer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://netmirror.buzz/",
    siteName: "NetMirror",
    title: "NetMirror APP - Watch Movies and Series",
    description:
      "Watch Movies and TV Series from Netflix, Amazon Prime Video, Disney+, Hotstar and 50+ more OTT platforms — No Ads, 1-click play, on Android, iPhone and computer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMirror APP - Watch Movies and Series",
    description:
      "Watch Movies and TV Series from 50+ OTT platforms — No Ads, 1-click play, on Android, iPhone and computer.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "0c93ed2ecdd6a484c6db83154bd7eb3a041d5f2b":
        "0c93ed2ecdd6a484c6db83154bd7eb3a041d5f2b",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Google AdSense Auto Ads loader */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9451303528131556"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        {/* Monetag Multitag (quge5.com zone 253994) */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="253994"
          data-cfasync="false"
          async
          strategy="beforeInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
