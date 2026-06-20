"use client";

import Link from "next/link";
import Logo from "./Logo";
import { FOOTER_LINKS } from "@/lib/content";
import { AndroidGlyph, AppleGlyph, ComputerGlyph, TvGlyph } from "./Icons";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platforms",
    links: [
      { label: "Netflix", href: "#" },
      { label: "Amazon Prime Video", href: "#" },
      { label: "Disney+", href: "#" },
      { label: "Hotstar", href: "#" },
      { label: "50+ More", href: "#" },
    ],
  },
  {
    title: "Apps",
    links: [
      { label: "Android App", href: "#" },
      { label: "iOS (DODO)", href: "#" },
      { label: "Computer", href: "#" },
      { label: "Android TV", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Movies", href: "/movies" },
      { label: "Blog", href: "/blogs" },
      { label: "About", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const DEVICE_GLYPHS = [AndroidGlyph, AppleGlyph, ComputerGlyph, TvGlyph];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Watch movies and TV series from 50+ OTT platforms with original
              audio and HD video quality — no ads, one-click play.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {DEVICE_GLYPHS.map((Glyph, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-lg glass text-white/70 transition-colors hover:text-brand-400"
                >
                  <Glyph className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/45">All Rights Reserved © 2021</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => {}}
                  className="text-xs text-white/45 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
