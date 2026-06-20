import type { BlogPost } from "../types";

const post: BlogPost = {
  slug: "how-video-streaming-works",
  title: "How Does Video Streaming Work? The Tech Explained Simply",
  description:
    "How does video streaming actually work? A clear, jargon-light explanation of buffering, bitrates, adaptive streaming and CDNs — for curious viewers.",
  excerpt:
    "Ever wondered what happens between tapping play and the picture appearing? Here is the technology, explained in plain English.",
  category: "Technology",
  tags: ["streaming tech", "explainer", "bitrate", "CDN", "adaptive streaming"],
  author: "NetMirror Team",
  date: "2026-03-05",
  updated: "2026-05-28",
  readingMinutes: 7,
  body: [
    {
      type: "p",
      text: "Tap play and, almost instantly, a movie appears on your screen — even though the file lives on a server thousands of miles away. The technology that makes this feel effortless is genuinely clever. Here is how video streaming works, without the engineering degree.",
    },
    { type: "h2", text: "Streaming vs downloading" },
    {
      type: "p",
      text: "Downloading copies the entire file before you can watch. Streaming sends the video in small chunks that play as they arrive, so you start watching in seconds and never store the whole thing. That chunk-by-chunk delivery is the heart of it.",
    },
    { type: "h2", text: "The journey from server to screen" },
    { type: "h3", text: "1. Encoding and compression" },
    {
      type: "p",
      text: "Raw video is enormous, so it is compressed using a codec. The codec throws away data your eyes barely notice, shrinking the file enough to travel over the internet smoothly.",
    },
    { type: "h3", text: "2. Content delivery networks (CDNs)" },
    {
      type: "p",
      text: "Instead of one distant server, copies of the video sit on servers around the world. A CDN routes you to the nearest one, cutting the distance data must travel and reducing lag.",
    },
    { type: "h3", text: "3. Adaptive bitrate streaming" },
    {
      type: "p",
      text: "The video is prepared in several quality levels. As you watch, the player constantly measures your connection and switches between them on the fly — higher quality when your connection is strong, lower when it dips. This is why a stream can soften for a moment instead of freezing entirely.",
    },
    { type: "h2", text: "What the buffer actually does" },
    {
      type: "p",
      text: "The player downloads a few seconds ahead of what you are watching and stores it in a buffer. If your connection hiccups, playback draws from this reserve. Buffering screens appear when the reserve empties faster than it can refill.",
    },
    {
      type: "ul",
      items: [
        "Bitrate = how much data per second the video uses (higher = sharper, heavier)",
        "Latency = the delay before playback starts",
        "Throughput = how much your connection can actually deliver",
      ],
    },
    {
      type: "p",
      text: "Good apps lean on adaptive streaming so you rarely think about any of this. If buffering does strike, our nine-fix troubleshooting guide walks through the cures.",
    },
    {
      type: "quote",
      text: "Streaming is really just a smart conversation between your player and the network: 'how much can you handle right now?' — adjusted dozens of times a minute.",
    },
  ],
  faqs: [
    {
      question: "What is the difference between streaming and downloading?",
      answer:
        "Downloading saves the whole file before you watch. Streaming sends small chunks that play as they arrive, so you start almost immediately without storing the entire video.",
    },
    {
      question: "What is adaptive bitrate streaming?",
      answer:
        "It is a technique where the player switches between several quality levels in real time based on your connection, keeping playback smooth instead of freezing.",
    },
    {
      question: "Why does video start in low quality then sharpen?",
      answer:
        "The player begins at a safe lower quality to start fast, then steps up as it confirms your connection can handle more data.",
    },
  ],
};

export default post;
