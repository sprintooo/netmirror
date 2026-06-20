/**
 * Static UI content for the NetMirror homepage clone.
 * Text mirrors the public landing page copy. No business logic.
 */

export type DeviceKey = "android" | "ios" | "computer" | "tv";

export interface DeviceTab {
  key: DeviceKey;
  label: string;
}

export const DEVICE_TABS: DeviceTab[] = [
  { key: "android", label: "Android" },
  { key: "ios", label: "iOS" },
  { key: "computer", label: "Computer" },
  { key: "tv", label: "Android TV" },
];

export interface InstallStep {
  title: string;
  body: string;
}

export interface DevicePanel {
  key: DeviceKey;
  heading: string;
  intro: string;
  ctaLabel: string;
  note?: string;
  steps: InstallStep[];
}

export const DEVICE_PANELS: Record<DeviceKey, DevicePanel> = {
  android: {
    key: "android",
    heading: "Install on Android Mobile",
    intro: "Follow 2 easy steps to install the NetMirror app on your Android mobile.",
    ctaLabel: "Download APP",
    steps: [
      {
        title: "Step 1 — Download & Install",
        body: "Download our app and install it. Enable “Install unknown apps” under Settings → Security and privacy → Install unknown apps → your browser.",
      },
      {
        title: "Step 2 — Ready to Use",
        body: "Open it and enjoy. Available on phone and tablet, wherever you go.",
      },
    ],
  },
  ios: {
    key: "ios",
    heading: "Install on iPhone (iOS)",
    intro: "Follow 3 easy steps to install the DODO Webview app on your iOS (iPhone) mobile.",
    ctaLabel: "Download iOS DODO APP",
    note: "DODO Webview is a third-party app — we have no control over it. It is simply a webview app on which our site opens, just like in a browser.",
    steps: [
      {
        title: "Step 1 — Find DODO Webview",
        body: "Search “DODO Webview” on the Apple App Store and install it.",
      },
      {
        title: "Step 2 — Enter Site URL",
        body: "Open DODO Webview and type the site URL.",
      },
      {
        title: "Step 3 — Turn On & Open",
        body: "Turn ON all 3 buttons and tap “Open Webview”.",
      },
    ],
  },
  computer: {
    key: "computer",
    heading: "Use on Computer",
    intro: "PC users just click the “Go to Home” button for movies and series.",
    ctaLabel: "Go to Home",
    note: "Use Google Chrome or Mozilla Firefox for better performance. Sign-in is required to use on computer.",
    steps: [
      {
        title: "One-click play",
        body: "No installation needed — stream directly in your browser on desktop and laptop.",
      },
      {
        title: "Best experience",
        body: "Works great on widescreen displays with HD video and original audio.",
      },
    ],
  },
  tv: {
    key: "tv",
    heading: "Install on Android TV",
    intro: "Download the Android TV APK. Tested on Android TV and Google TV.",
    ctaLabel: "Download TV APK",
    steps: [
      {
        title: "Step 1 — Download TV APK",
        body: "Download the Android TV APK to your TV or via a USB drive.",
      },
      {
        title: "Step 2 — Big-screen streaming",
        body: "Install, open, and enjoy thousands of titles on the big screen.",
      },
    ],
  },
};

export interface Feature {
  title: string;
  body: string;
  icon: "play" | "hd" | "noads" | "devices" | "ott" | "audio";
}

export const FEATURES: Feature[] = [
  {
    title: "50+ OTT Platforms",
    body: "Netflix, Amazon Prime Video, Disney+, Hotstar and 50+ more — all in one place.",
    icon: "ott",
  },
  {
    title: "1-Click Play",
    body: "Skip the friction. Tap a title and it starts playing instantly.",
    icon: "play",
  },
  {
    title: "No Ads",
    body: "Watch thousands of movies and series without interruptions.",
    icon: "noads",
  },
  {
    title: "HD Video Quality",
    body: "Crisp, high-definition video with original audio tracks.",
    icon: "hd",
  },
  {
    title: "Original Audio",
    body: "Enjoy content in its original language and audio quality.",
    icon: "audio",
  },
  {
    title: "Any Device",
    body: "Android, iPhone (iOS), computer and Android TV — wherever you go.",
    icon: "devices",
  },
];

export const STATS = [
  { value: "50+", label: "OTT Platforms" },
  { value: "10K+", label: "Movies & Series" },
  { value: "4", label: "Supported Devices" },
  { value: "HD", label: "Video Quality" },
];

export const FOOTER_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Android App", href: "#" },
  { label: "iOS App", href: "#" },
  { label: "Android TV", href: "#" },
];
