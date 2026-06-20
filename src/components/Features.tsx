"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { FEATURES, type Feature } from "@/lib/content";
import {
  PlayIcon,
  HdIcon,
  NoAdsIcon,
  DevicesIcon,
  OttIcon,
  AudioIcon,
} from "./Icons";

const ICONS: Record<Feature["icon"], React.FC<React.SVGProps<SVGSVGElement>>> = {
  play: PlayIcon,
  hd: HdIcon,
  noads: NoAdsIcon,
  devices: DevicesIcon,
  ott: OttIcon,
  audio: AudioIcon,
};

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-brand-700/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
            Why NetMirror
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
            Everything you want to watch, in one place
          </h2>
          <p className="mt-4 text-base text-white/60">
            A single app for 50+ OTT platforms — built for speed, clarity and a
            clean, ad-free experience on every device.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <Reveal key={feature.title} delay={i * 0.06}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-2xl glass p-6 shadow-card"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/0 blur-2xl transition-all duration-300 group-hover:bg-brand-500/25" />
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {feature.body}
                  </p>
                  <span className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-brand-gradient transition-transform duration-300 group-hover:scale-x-100" />
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
