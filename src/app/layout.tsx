import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
