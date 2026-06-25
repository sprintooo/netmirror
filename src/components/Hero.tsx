"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HomeIcon } from "./Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
    >
      {/* Background collage image at public/hero-bg.jpg (compressed). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark overlay so the text stays readable over the artwork.
          Kept light because the source image is already heavily dimmed —
          raise these opacities if your image is brighter. */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-cyan-400 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl"
        >
          NetMirror APK Download
          <span className="mt-3 block text-2xl font-bold text-cyan-300/90 sm:text-3xl lg:text-4xl">
            Top 50+ OTT Apps and Sites
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-5 max-w-2xl text-lg text-cyan-300/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] sm:text-2xl"
        >
          Watch thousands of tv series and movies with original audio and HD
          video quality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/movies"
            className="group inline-flex items-center justify-center gap-2.5 rounded-md bg-green-600 px-9 py-4 text-base font-bold tracking-wide text-white shadow-[0_10px_30px_rgba(22,163,74,0.45)] transition-transform duration-200 hover:scale-[1.03] hover:bg-green-500 active:scale-95"
          >
            <HomeIcon className="h-6 w-6" />
            GO TO HOME
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-base font-bold text-red-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        >
          Sign-In is Required to Use in Computer
        </motion.p>
      </div>
    </section>
  );
}
