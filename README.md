# Susan Atelier — Next.js Prelaunch Website

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

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with metadata
│   ├── collection/
│   │   ├── page.tsx       # Collection page (all 17 products)
│   │   └── [id]/
│   │       └── page.tsx   # Product detail page
│   ├── craft/
│   │   └── page.tsx       # Our Craft page
│   ├── fit/
│   │   └── page.tsx       # Size & Fit page
│   ├── about/
│   │   └── page.tsx       # About page
│   └── join/
│       └── page.tsx       # Waitlist/Join page
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ProductCard.tsx    # Product card component
├── lib/
│   └── products.ts        # Product data (17 pieces)
└── styles/
    └── globals.css        # Global styles (design system)
```

## Design System

Based on the **00_CANON_SPECS.md** brand specification:

- **Colors**: Ivory Blush #F5EAE1, Espresso Bronze #3B2412, Antique Gold #8A6324, Warm Taupe #B89A7C, Gold Tint #E4D3B8
- **Typography**: Playfair Display (display), Cormorant Garamond (body), Alex Brush (signature)
- **Serif-only** — no sans-serif fonts
- **Spacing**: 8px base unit
- **Border radius**: 4px (structured, not pill)

## Features

- 17-product collection with filtering (Co-ords, Occasion, Separates, Entry)
- Product detail pages with transparency cards (maker, cloth, wage, MRP)
- WhatsApp integration for waitlist and pre-orders
- Responsive design (mobile-first)
- Accessible (ARIA labels, semantic HTML, focus states)
- SEO optimized (Open Graph, Twitter Cards, structured metadata)
- Performance optimized (image optimization, font preloading)
- Vercel deployment ready

## Brand Compliance

This implementation follows the canonical brand spec from `D:\Fashion Brand\Brand\00_CANON_SPECS.md`:

- Uses real logo assets from `/public/logos/`
- Uses AI-generated ghost mannequin images from `/public/images/`
- Implements the correct color palette (Ivory Blush, Espresso Bronze, Antique Gold, etc.)
- Uses correct typography stack (Playfair + Cormorant + Alex Brush)
- Includes transparency cards with real artisan data
- No fake discounts, no "BOHO10" coupon
- "Made by named hands, worn for years, not seasons" messaging

## Deployment to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Vercel auto-detects Next.js
4. Deploy

The `vercel.json` configures:
- Build commands
- Security headers
- Cache headers for static assets
- Regional deployment (Singapore - sin1)