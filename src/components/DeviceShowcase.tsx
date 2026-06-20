"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  DEVICE_TABS,
  DEVICE_PANELS,
  type DeviceKey,
} from "@/lib/content";
import {
  AndroidGlyph,
  AppleGlyph,
  ComputerGlyph,
  TvGlyph,
  DownloadIcon,
  CheckIcon,
} from "./Icons";
import { PhoneMockup, DesktopMockup, TvMockup } from "./DeviceMockups";

const TAB_ICONS: Record<DeviceKey, React.FC<React.SVGProps<SVGSVGElement>>> = {
  android: AndroidGlyph,
  ios: AppleGlyph,
  computer: ComputerGlyph,
  tv: TvGlyph,
};

function PanelArt({ device }: { device: DeviceKey }) {
  if (device === "computer") return <DesktopMockup className="w-full max-w-md" />;
  if (device === "tv") return <TvMockup className="w-full max-w-md" />;
  return <PhoneMockup className="mx-auto w-44 sm:w-52" />;
}

export default function DeviceShowcase() {
  const [active, setActive] = useState<DeviceKey>("android");
  const panel = DEVICE_PANELS[active];

  return (
    <section id="devices" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
            Available Everywhere
          </span>
          <h2
            id="install"
            className="mt-3 scroll-mt-28 font-display text-3xl font-bold tracking-tight text-gradient sm:text-4xl"
          >
            Install in seconds on any device
          </h2>
          <p className="mt-4 text-base text-white/60">
            Pick your device to see the quick setup steps. Available on phone,
            tablet, computer and the big screen.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mt-10">
          <div
            role="tablist"
            aria-label="Choose a device"
            className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-2xl glass p-2 shadow-card"
          >
            {DEVICE_TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.key];
              const isActive = active === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.key}`}
                  id={`tab-${tab.key}`}
                  onClick={() => setActive(tab.key)}
                  className={`relative inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors sm:px-5 ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/80"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="device-tab-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-xl bg-brand-gradient shadow-glow-sm"
                    />
                  )}
                  <Icon className="h-4 w-4" />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Panel */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`panel-${active}`}
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-10 rounded-3xl glass-strong p-6 shadow-card sm:p-10 lg:grid-cols-2"
            >
              {/* art */}
              <div className="relative order-1 flex justify-center lg:order-none">
                <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-2/3 w-2/3 rounded-full bg-brand-500/20 blur-[80px]" />
                <PanelArt device={active} />
              </div>

              {/* steps */}
              <div>
                <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                  {panel.heading}
                </h3>
                <p className="mt-3 text-white/65">{panel.intro}</p>

                <ol className="mt-6 space-y-4">
                  {panel.steps.map((step, idx) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-sm font-bold text-brand-400 ring-1 ring-white/10">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/60">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-sm transition-transform duration-200 hover:scale-[1.04] active:scale-95"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    {panel.ctaLabel}
                  </button>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/50">
                    <CheckIcon className="h-4 w-4 text-brand-400" />
                    Free · No ads
                  </span>
                </div>

                {panel.note && (
                  <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs leading-relaxed text-white/50">
                    <span className="font-semibold text-white/70">Note: </span>
                    {panel.note}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
