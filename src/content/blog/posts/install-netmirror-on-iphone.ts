import type { BlogPost } from "../types";

const post: BlogPost = {
  slug: "install-netmirror-on-iphone",
  title: "How to Install NetMirror on iPhone (iOS): Step-by-Step",
  description:
    "Install NetMirror on your iPhone in 3 easy steps using the DODO Webview app. A clear iOS setup guide so you can start streaming in minutes.",
  excerpt:
    "Setting up NetMirror on iPhone takes about three minutes. Here is the exact step-by-step process using the DODO Webview app.",
  category: "Device Guides",
  tags: ["iPhone", "iOS", "install", "DODO Webview", "setup"],
  author: "NetMirror Team",
  date: "2026-01-20",
  updated: "2026-04-18",
  readingMinutes: 5,
  body: [
    {
      type: "p",
      text: "iPhone setup is slightly different from Android because iOS opens NetMirror through a webview app rather than a standalone install. It is still quick — three short steps and you are watching. Here is exactly what to do.",
    },
    { type: "h2", text: "Before you start" },
    {
      type: "p",
      text: "You will need an iPhone running a recent version of iOS and an internet connection. NetMirror opens inside DODO Webview, a free third-party browser-style app from the App Store. It simply loads the site, the same way Safari would.",
    },
    { type: "h2", text: "Step 1 — Find DODO Webview" },
    {
      type: "p",
      text: "Open the Apple App Store, search for \"DODO Webview\", and install it like any other app. It is a lightweight webview wrapper, so the download is small.",
    },
    { type: "h2", text: "Step 2 — Enter the site URL" },
    {
      type: "p",
      text: "Open DODO Webview and type the NetMirror site URL into the address field. This points the webview at the streaming interface.",
    },
    { type: "h2", text: "Step 3 — Turn on and open" },
    {
      type: "p",
      text: "Turn ON all three toggles in DODO Webview, then tap \"Open Webview\". NetMirror loads and you can tap any title to start playing instantly.",
    },
    { type: "h2", text: "Tips for the best experience on iOS" },
    {
      type: "ul",
      items: [
        "Add the page to your home screen for one-tap access next time.",
        "Connect to Wi-Fi for HD playback and to save mobile data.",
        "Keep DODO Webview and iOS updated for smooth performance.",
      ],
    },
    {
      type: "p",
      text: "Prefer a different device? See our companion guides for installing on Android and streaming on Android TV — the steps differ slightly per platform.",
    },
    {
      type: "quote",
      text: "DODO Webview is a third-party app we do not control. It is simply a browser-style window on which the site opens, just like Safari.",
    },
  ],
  faqs: [
    {
      question: "Why does iPhone need DODO Webview instead of a direct app?",
      answer:
        "iOS handles third-party streaming apps differently from Android. DODO Webview is a browser-style wrapper that opens the NetMirror site, which is the simplest route on iPhone.",
    },
    {
      question: "Is DODO Webview free?",
      answer:
        "Yes, DODO Webview is a free download from the Apple App Store.",
    },
    {
      question: "Do I need to jailbreak my iPhone?",
      answer:
        "No. The webview method works on a standard, non-jailbroken iPhone.",
    },
    {
      question: "Can I watch in HD on iPhone?",
      answer:
        "Yes. With a solid Wi-Fi connection NetMirror streams in HD with original audio on iOS.",
    },
  ],
};

export default post;
