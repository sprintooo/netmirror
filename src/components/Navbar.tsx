"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";

// Homepage sections use root-relative hashes so they work from any page
// (including /blogs/*), navigating home and scrolling to the section.
const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "Devices", href: "/#devices" },
  { label: "Features", href: "/#features" },
  { label: "Install", href: "/#install" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-[background,box-shadow,margin] duration-300 sm:px-6 ${
            scrolled
              ? "mt-2 glass-strong shadow-card"
              : "mt-0 bg-transparent"
          }`}
        >
          <Link href="/#home" aria-label="NetMirror home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => {}}
                  className="rounded-lg px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {}}
            className="hidden rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.04] active:scale-95 sm:inline-flex"
          >
            Go to Home
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl glass text-white md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition-all ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 bg-white transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 bg-white transition-all ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.nav
        aria-label="Mobile"
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="mx-4 overflow-hidden md:hidden"
      >
        <ul className="mt-2 space-y-1 rounded-2xl glass-strong p-3 shadow-card">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {}}
              className="mt-1 w-full rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-sm"
            >
              Go to Home
            </button>
          </li>
        </ul>
      </motion.nav>
    </motion.header>
  );
}
