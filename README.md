# NetMirror — Homepage Clone (UI only)

A pixel-style, front-end-only clone of the NetMirror landing page homepage. This
project replicates the **visual design and layout** (dark Netflix-inspired
theme, gradients, glassmorphism, device install showcase, hero, features, CTA
and footer). It contains **no backend, no auth, no database and no business
logic** — every button uses a placeholder `onClick={() => {}}` handler.

## Tech stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (entrance + scroll + tab animations)
- **Cloudflare** deployment via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- **Google AdSense** Auto Ads

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher ID (e.g. `ca-pub-…`). Used by the global Auto Ads script. |

> **Note:** `NEXT_PUBLIC_*` variables are inlined into the client bundle **at build time**. When deploying via the Cloudflare dashboard or CI, set this variable in the **build-time** environment (not only as a Worker runtime variable), since `.env.local` is gitignored and won't exist there.

## Deployment (Cloudflare)

```bash
npm run preview   # build with OpenNext and preview locally
npm run deploy    # build with OpenNext and deploy to Cloudflare
npm run cf-typegen # regenerate Cloudflare binding types
```

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, theme color, global AdSense script
    page.tsx          # assembles the homepage sections
    globals.css       # Tailwind + glass/gradient utilities
    robots.ts         # robots.txt route
    sitemap.ts        # sitemap.xml route
    blogs/            # SEO blog index + dynamic [slug] post pages
  components/
    Navbar.tsx        # sticky glass nav + mobile menu
    Hero.tsx          # headline, CTAs, phone mockup, stats
    Features.tsx      # feature grid (hover animations)
    DeviceShowcase.tsx# tabbed Android / iOS / Computer / TV install steps
    CTA.tsx           # closing call-to-action band
    Footer.tsx        # link columns + copyright
    BlogContent.tsx   # blog post renderer
    DeviceMockups.tsx # original SVG phone/desktop/TV placeholders
    Icons.tsx         # original inline SVG icons
    Logo.tsx          # original NetMirror wordmark + glyph
    Reveal.tsx        # scroll-reveal wrapper (Framer Motion)
    GoogleAdSense.tsx # global AdSense Auto Ads loader (next/script)
  content/
    blog/             # blog post data + types
  lib/
    content.ts        # all static UI copy / data
    site.ts           # site-level constants (URL, metadata)
tailwind.config.ts    # palette, gradients, shadows, keyframes
next.config.mjs       # Next.js + OpenNext Cloudflare dev bindings
wrangler.jsonc        # Cloudflare Worker / assets config
```

## Notes on assets

All icons, the logo, and the device illustrations are **original SVGs drawn for
this clone** as visually-similar placeholders. No copyrighted images, brand
logos, or poster artwork from the reference site are bundled. Swap in your own
assets where desired.

## Responsiveness

Layouts are fully responsive across mobile, tablet and desktop using Tailwind
breakpoints (`sm`, `md`, `lg`). Animations respect `prefers-reduced-motion`.
