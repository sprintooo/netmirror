import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import { SITE_NAME, SITE_URL } from "@/lib/site";
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
    locale: "en_US",
    // Default social/share image. Individual pages (movies, blog posts) may
    // override this with their own `images`.
    images: [
      {
        url: "/hero-bg.jpg",
        alt: "NetMirror — watch 50+ OTT platforms in one ad-free app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NetMirror APP - Watch Movies and Series",
    description:
      "Watch Movies and TV Series from 50+ OTT platforms — No Ads, 1-click play, on Android, iPhone and computer.",
    images: ["/hero-bg.jpg"],
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

// Site-wide structured data. WebSite enables Google to understand the site as
// an entity (and is the home for a future sitelinks search box); Organization
// establishes the publisher used across all Article/Movie structured data.
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preload the hero background — it is the LCP element on the homepage,
            so fetching it early measurably improves Largest Contentful Paint. */}
        <link rel="preload" as="image" href="/hero-bg.jpg" />

        {/* Site-wide structured data (WebSite + Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RDHYLM3K64"
          strategy="afterInteractive"
          async
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RDHYLM3K64');
          `}
        </Script>
        {/* Monetag OnClick / Popunder (quge5.com zone 253994) */}
        <Script
          src="https://quge5.com/88/tag.min.js"
          data-zone="253994"
          data-cfasync="false"
          async
          strategy="beforeInteractive"
        />
        {/* Monetag tag (al5sm.com zone 11208645) */}
        <Script id="monetag-al5sm" strategy="afterInteractive">
          {`(function(s){s.dataset.zone='11208645',s.src='https://al5sm.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
