# NetMirror — Homepage Clone (UI only)

A pixel-style, front-end-only clone of the NetMirror landing page homepage. This
project replicates the **visual design and layout** (dark Netflix-inspired
theme, gradients, glassmorphism, device install showcase, hero, features, CTA
and footer). It contains **no backend, no auth, no database and no business
logic** — every button uses a placeholder `onClick={() => {}}` handler.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** (entrance + scroll + tab animations)

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

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata, theme color
    page.tsx          # assembles the homepage sections
    globals.css       # Tailwind + glass/gradient utilities
  components/
    Navbar.tsx        # sticky glass nav + mobile menu
    Hero.tsx          # headline, CTAs, phone mockup, stats
    Features.tsx      # feature grid (hover animations)
    DeviceShowcase.tsx# tabbed Android / iOS / Computer / TV install steps
    CTA.tsx           # closing call-to-action band
    Footer.tsx        # link columns + copyright
    DeviceMockups.tsx # original SVG phone/desktop/TV placeholders
    Icons.tsx         # original inline SVG icons
    Logo.tsx          # original NetMirror wordmark + glyph
    Reveal.tsx        # scroll-reveal wrapper (Framer Motion)
  lib/
    content.ts        # all static UI copy / data
tailwind.config.ts    # palette, gradients, shadows, keyframes
```

## Notes on assets

All icons, the logo, and the device illustrations are **original SVGs drawn for
this clone** as visually-similar placeholders. No copyrighted images, brand
logos, or poster artwork from the reference site are bundled. Swap in your own
assets where desired.

## Responsiveness

Layouts are fully responsive across mobile, tablet and desktop using Tailwind
breakpoints (`sm`, `md`, `lg`). Animations respect `prefers-reduced-motion`.
