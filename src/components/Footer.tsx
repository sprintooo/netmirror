"use client";

import Logo from "./Logo";
import { FOOTER_LINKS } from "@/lib/content";
import { AndroidGlyph, AppleGlyph, ComputerGlyph, TvGlyph } from "./Icons";

const COLUMNS = [
  {
    title: "Platforms",
    links: ["Netflix", "Amazon Prime Video", "Disney+", "Hotstar", "50+ More"],
  },
  {
    title: "Apps",
    links: ["Android App", "iOS (DODO)", "Computer", "Android TV"],
  },
  {
    title: "Company",
    links: ["About", "Privacy Policy", "Contact", "FAQ"],
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
                  <li key={link}>
                    <a
                      href="#"
                      onClick={() => {}}
                      className="text-sm text-white/55 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
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
