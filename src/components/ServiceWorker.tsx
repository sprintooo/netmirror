"use client";

import { useEffect } from "react";

// Registers the Monetag service worker (public/sw.js) so the push tag
// for 3nbf4.com (zone 11207526) can load. Verification only needs the
// file to be reachable at /sw.js; this registration makes it active.
export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => {
        console.error("Service worker registration failed:", err);
      });
  }, []);

  return null;
}
