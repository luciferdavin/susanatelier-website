# Susan Atelier — Premium Luxury Fashion Website

A cinematic, editorial experience for Susan Atelier — a quiet-luxury Indian
occasion-wear maison. Built with Next.js 14 (App Router), framer-motion, and a
serif-only design system.

## Quick Start

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm start
```

## The Experience (home page journey)

1. **Cinematic hero** — full-viewport chiaroscuro campaign image with Ken-Burns
   settle, line-mask display type (*"Made by named hands, worn for years, not
   seasons."*), parallax on scroll, and a hairline meta bar.
2. **Marquee band** — espresso hairline with Playfair italics.
3. **Manifesto** — scroll-linked word-by-word reveal of the maison standard.
4. **The Standard** — sticky editorial ledger: The Maker / The Cloth / The Math
   (live cost-breakdown table).
5. **Collection Nº 01** — filterable 17-piece grid with quick-view modal
   (transparency card, wage bar, WhatsApp reserve).
6. **The Campaign** — editorial lookbook collage + full-bleed parallax quote
   band on a cloth-macro photograph.
7. **The Craft** — dark atelier chapter: four named artisans, three cloths,
   animated counters, sticky embroidery-frame imagery.
8. **Size & Fit** — XXS–4XL chart, free size exchange.
9. **The Founder** — Riya's letter with atelier portrait.
10. **Early Access** — waitlist card (WhatsApp fallback), numbered hangtag perk.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home (cinematic journey above)
│   ├── layout.tsx         # Root layout: self-hosted fonts, metadata
│   ├── collection/
│   │   ├── page.tsx       # Collection page (17 pieces + filters)
│   │   └── [id]/page.tsx  # Product detail (transparency card, WhatsApp)
│   ├── apply/page.tsx     # Become-a-Custodian application
│   └── feed.xml/route.ts  # RSS feed
├── components/
│   ├── Header.tsx         # Fixed header — transparent over dark hero → frosted
│   ├── Footer.tsx         # Inverted luxury footer (accordions on mobile)
│   ├── sections/          # Hero, HeroTitle, Manifesto, WhySection, Marquee,
│   │                      # CollectionShowcase, EditorialSection, CraftSection,
│   │                      # FitSection, AboutSection, JoinSection, WaitlistCard,
│   │                      # ProductModal, Preloader, CustomCursor, Counters
│   ├── motion/Reveal.tsx  # Scroll reveals (reduced-motion aware)
│   └── ui/                # Button, Input
├── lib/                   # products, site config, schemas, email, scoring
└── styles/globals.css     # Design system tokens + all component styles
```

## Design System

Grounded in the brand canon (`DESIGN.md`), elevated to a premium editorial
register:

- **Colors**: Ivory Blush `#F5EAE1` (light), Espresso Bronze `#3B2412` and deep
  espresso `#1E1106`/`#241505` (dark cinematic grounds), Antique Gold `#8A6324`
  (reserved accent), Gold Tint `#E4D3B8`, Warm Taupe `#B89A7C`.
- **Typography**: Playfair Display (display), Cormorant Garamond (body/UI),
  Alex Brush (founder signature only). **Real italics are self-hosted** via
  Fontsource — no Google Fonts fetch at build time, fully hermetic builds.
- **Imagery**: AI campaign photography in `/public/images/editorial/` shot to a
  single palette (deep espresso, ivory, antique gold). Product ghosts in
  `/public/images/ghost-*.webp`, model drapes in `/public/images/real/`.
- **Motion**: ease `[0.16, 1, 0.3, 1]`, parallax via framer-motion scroll
  transforms, everything honors `prefers-reduced-motion`.
- **Rules**: serif-only, no true black, gold ≤10% of any viewport, hairlines
  over shadows, 4px radius.

## Features

- 17-product collection with filtering and quick-view modal
- Product detail pages with transparency cards (maker, cloth, wage, MRP)
- WhatsApp integration for waitlist and pre-orders
- Custodian application flow (`/apply`, scoring + result dashboard)
- Responsive, accessible (ARIA, focus management, reduced motion)
- SEO: Open Graph, Twitter Cards, JSON-LD (Organization, WebSite, Product,
  CollectionPage, FAQ, HowTo), sitemap, robots, RSS
- Hermetic builds (self-hosted fonts), Vercel-ready

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Vercel auto-detects Next.js
4. Deploy

The `vercel.json` configures build commands, security headers, cache headers
for static assets, and regional deployment (Singapore - sin1).
