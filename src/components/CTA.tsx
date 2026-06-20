"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { PlayIcon, DownloadIcon } from "./Icons";

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-8 shadow-card sm:p-14">
            {/* decorative gradients */}
            <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-[0.14]" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-brand-500/30 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-700/30 blur-[100px]" />

            <div className="relative mx-auto max-w-2xl text-center">
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Start watching in one click
              </motion.h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/70">
                Thousands of movies and series with original audio and HD video
                quality. No ads. Available on Android, iPhone, computer and TV.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {}}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-ink-950 transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:w-auto"
                >
                  <PlayIcon className="h-5 w-5" />
                  Go to Home
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl glass px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
                >
                  <DownloadIcon className="h-5 w-5" />
                  Download App
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
