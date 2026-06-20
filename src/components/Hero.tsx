"use client";

import { motion } from "framer-motion";
import { PhoneMockup } from "./DeviceMockups";
import { PlayIcon, ChevronRight } from "./Icons";
import { STATS } from "@/lib/content";

const platforms = ["Netflix", "Prime Video", "Disney+", "Hotstar", "+50 more"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-full max-w-[680px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:54px_54px] [mask-image:radial-gradient(60%_50%_at_50%_30%,black,transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-white/80"
          >
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-brand-500" />
            No Ads · 1-Click Play · HD Quality
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">Top </span>
            <span className="text-gradient-brand">50+ OTT</span>
            <br />
            <span className="text-gradient">Apps and Sites</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-5 max-w-xl text-base text-white/65 sm:text-lg lg:mx-0"
          >
            Watch thousands of TV series and movies with original audio and HD
            video quality — Netflix, Amazon Prime Video, Disney+, Hotstar and
            many more, all in one app.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          >
            <button
              type="button"
              onClick={() => {}}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              <PlayIcon className="h-5 w-5" />
              Go to Home
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl glass px-7 py-3.5 text-base font-semibold text-white/90 transition-colors hover:bg-white/10 sm:w-auto"
            >
              Download App
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.26 }}
            className="mt-4 text-xs text-white/45"
          >
            Sign-in is required to use on computer.
          </motion.p>

          {/* platform chips */}
          <motion.ul
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            {platforms.map((p) => (
              <li
                key={p}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60"
              >
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-sm justify-center lg:mx-0 lg:ml-auto"
        >
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-brand-500/25 blur-[90px]" />
          <PhoneMockup className="w-56 animate-float drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] sm:w-64" />
        </motion.div>
      </div>

      {/* stats */}
      <div className="relative mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl glass p-4 shadow-card sm:grid-cols-4 sm:gap-4 sm:p-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-gradient-brand sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/55 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
