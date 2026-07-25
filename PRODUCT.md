# Susan Atelier — Product Context

## Positioning Statement

**Susan Atelier** is contemporary Indian occasion wear made by named hands, from cloth you can name, at a price we can defend — for the woman who'd rather wear one real thing than ten forgettable ones.

- **Category:** Indian occasion wear / contemporary ethnic (co-ords, occasionwear, separates, entry)
- **Differentiation:** *Proof, not promise.* Every piece shows the maker (name, face, fair wage), the cloth (fibre named on label), and the math (fabric + embroidery + stitching = cost → MRP). No fake "was ₹X" strikethroughs.
- **Launch scope:** 17-piece collection, already made, one-of-a-kind.
- **Tagline:** "Made by named hands, worn for years — made by hand in India."
- **Founder:** Riya (first name only — the brand is the collective, not the person).

---

## Target User

**Primary:** Urban Indian women 25–40, professionally established, culturally rooted but globally fluent. They buy "occasion wear" 2–4×/year (weddings, festivals, family events). They're tired of polyester "designer" wear with opaque pricing and anonymous labor. They value craft, transparency, and longevity — and they'll pay ₹2,500–₹9,000 for a piece that lasts years.

**Secondary:** Diaspora buyers (US/UK/Canada/UAE) shopping for visits home or gifting. Same values; higher budget tolerance; need reliable shipping and easy returns.

**What they need to believe before buying:**
1. *The maker is real* — name, face, wage shown.
2. *The cloth is real* — fibre named, breathable, natural.
3. *The price is real* — cost breakdown shown, no fake discounts.
4. *The fit works* — XXS–4XL, shot on real bodies, free size exchange.

---

## Product Truths (Non-Negotiable)

| Commitment | How It's Proven |
|------------|-----------------|
| **Named makers** | Meena (Lucknow), Asha (Jaipur), Farida (Kolkata), Sara (Mumbai) — name + city on every product card + transparency card |
| **Fair wages** | Wage shown per piece vs. local living wage (e.g., "₹420 vs ₹300 living wage") |
| **Natural cloth** | Fibre composition named on every label + product detail (linen, cotton, silk, velvet — no polyester "silk") |
| **Transparent pricing** | Cost breakdown: fabric + embroidery + stitching = cost → MRP. GST called out (5% <₹2,500, 18% ≥₹2,500). |
| **One-of-a-kind** | Each piece is finished stock; no made-to-order, no restocks. "Seventeen pieces, already made." |
| **Inclusive sizing** | XXS–4XL across the line. Real-body photography. Free one-time size exchange. |
| **No fake urgency** | No countdown timers, no "only 2 left" unless it's literally true (and it is — each piece is 1 of 1). |

---

## Collection Architecture

| Category | Count | Price Range (₹) | GST | Key Pieces |
|----------|-------|-----------------|-----|------------|
| **Co-ords** | 5 | 3,500–4,500 | 18% | Midnight Botanical (hero), Azure Leaf, Aegean Pearl, Topographic Rainbow, Monochrome Line-Art |
| **Occasion** | 4 | 7,200–8,800 | 18% | Midnight Garden Velvet, Olive Sequin Ruched, Ivory Heirloom Scroll, |
| **Separates** | 7 | 3,200–6,500 | 18% | Cottage Bloom Bell Sleeve, Chambray Tonal Flora, Cobalt Dori Floral, Coral Reef Pearl Wrap, Ink Sketch Floral, Crystal Bloom Striped Oxford, Rococo Ivory Illusion |
| **Entry** | 1 | 1,800 | 5% | Coral Sprig Breezy Blouse |

**Hero piece:** The Midnight Botanical Co-ord (ID 1) — linen/cotton, white cording & seed pearls, Meena/Lucknow, ₹3,999.

**Entry piece:** Coral Sprig Breezy Blouse (ID 15) — cotton voile, delicate floral & seed pearls, Asha/Jaipur, ₹1,800 (5% GST).

---

## Channels & Motions

| Channel | Motion | Status |
|---------|--------|--------|
| **Waitlist → WhatsApp** | Email capture → WhatsApp deep-link with pre-filled message → manual order | Live (localStorage only) |
| **Pre-order via WhatsApp** | Product detail "Pre-order via WhatsApp" → deep-link with product + price | Live (localStorage only) |
| **Organic/SEO** | Structured data (Product, CollectionPage, Organization, WebSite), sitemap, robots | Implemented |
| **Social (IG)** | Visual storytelling — maker films, cloth close-ups, transparency cards | Planned (assets exist) |
| **Email** | Waitlist confirmation, drop announcement, craft stories | Not built (no ESP) |

---

## Operational Constraints

- **Inventory:** 17 pieces total, each unique. No restocks. When sold, it's gone.
- **Fulfillment:** Manual (WhatsApp coordination → ship). No Shopify/cart integration yet.
- **Payments:** COD / bank transfer / UPI via WhatsApp conversation. No payment gateway.
- **Shipping:** India Post / courier. Free size exchange (one-time).
- **Team:** Founder (Riya) + 4 named embroiderers. No employees beyond makers.
- **Budget:** Pre-revenue. Every rupee spent shows in the product or the site.

---

## Brand Voice & Copy Principles

- **Tone:** Quietly confident. Not loud, not apologetic. "We show you" not "We promise you."
- **No marketing fluff:** No "exquisite," "luxurious," "timeless," "curated," "elevated." Use specifics: "linen/cotton," "₹420 wage," "Meena, Lucknow."
- **First person plural only when collective:** "We show the maker." Not "We believe in craft."
- **Founder voice:** "by Riya" appears as a signature, not a narrator.
- **Hindi/Indian terms used naturally:** "co-ord," "occasion wear," "MRP," "GST," "dori," "chambray" — no italicization, no glossary.

---

## Visual Identity (Current Implementation)

| Token | Value | Role |
|-------|-------|------|
| **Ivory Blush** | `#F5EAE1` | Page background, primary light |
| **Espresso Bronze** | `#3B2412` | Primary text, primary buttons, header scrolled |
| **Antique Gold** | `#8A6324` | Accent buttons, links, highlight, gold badge |
| **Warm Taupe** | `#B89A7C` | Secondary text, borders, script accent |
| **Gold Tint** | `#E4D3B8` | Borders, input borders, subtle backgrounds |
| **Sage** | `#5B6E4F` | 5% GST badge, success |
| **Error Rust** | `#9C4A3C` | 18% GST badge, errors |

**Typography:**
- **Display:** Playfair Display (400/500/600/700) — headlines, feature cards, statement band
- **Body/UI:** Cormorant Garamond (400/500/600) — body copy, buttons, nav, forms
- **Script:** Alex Brush (400) — "by Riya" signature, hero byline, statement tag accent

**Spacing scale:** 8/12/16/20/24/32/40/48/64px (CSS custom properties `--space-2` through `--space-16`)

**Radius:** 4px (sm/md/btn), 8px (lg), 9999px (full/pill)

**Shadows:** Subtle charcoal-based (sm/md/lg)

**Max width:** 1120px (`--maxw`)

**Header height:** 68px (`--header-h`)

---

## Current Surface Map (Next.js App Router)

| Route | Component | Mode | Purpose |
|-------|-----------|------|---------|
| `/` | `app/page.tsx` | **Persuade** | Hero → pillars → why us → statement band → CTA bar |
| `/collection` | `app/collection/page.tsx` + `CollectionGrid` | **Persuade** | Filterable 17-piece grid → product detail |
| `/collection/[id]` | `app/collection/[id]/page.tsx` + `ProductDetail` | **Operate** | Product media, transparency card, pre-order WhatsApp |
| `/craft` | `app/craft/page.tsx` | **Read** | The Maker / The Cloth / The Math + why we show |
| `/fit` | `app/fit/page.tsx` | **Operate** | Size chart (XXS–4XL), measuring guide, free exchange |
| `/about` | `app/about/page.tsx` | **Read** | Founder story + pillars + CTAs |
| `/join` | `app/join/page.tsx` + `JoinForm` | **Persuade** | Waitlist email capture → WhatsApp + position counter |

**Shared components:** `Header`, `Footer`, `HeroEmailForm`, `ProductCard`, `JsonLd` (structured data), `Skeleton` (loading)

---

## Known Gaps vs. Impeccable Standard

| Dimension | Current | Impeccable Target |
|-----------|---------|-------------------|
| **Hero** | Static image, single model | Real bodies in motion (video/loop), multiple drapes |
| **Product media** | 1 ghost image per piece | 3–4 angles + detail macro + 15s drape video per piece |
| **Waitlist** | localStorage only | Real backend → email confirm → position → drop SMS/WhatsApp |
| **Pre-order** | WhatsApp deep-link only | Cart → order ID → payment link → confirmation → tracking |
| **Search** | Schema only, no UI | Predictive filter on collection page |
| **Trust signals** | Copy only ("first 50 get hangtag") | Live counter, hangtag photo, maker video embeds |
| **Craft page** | Text cards only | Embedded maker films (15–30s each), cloth swatch gallery |
| **Fit page** | Static table + copy | Measuring video, fit predictor (quiz → size), user photos |
| **Performance** | Next.js defaults | Critical CSS, font preload, image optimization, LCP < 2.5s |
| **Accessibility** | Good basics | Focus management (mobile nav), live regions (cart), WCAG AA+ |
| **Error/empty states** | Minimal | Designed 404, empty filter, network error, WhatsApp fail fallback |

---

## Immediate Next Steps (Priority Order)

1. **Create DESIGN.md** — Establish the visual world, system tokens, component library, motion language (via `/impeccable new-work` or `/impeccable document`).
2. **Produce missing assets** — Hero video/loop, product detail shots, maker films, measuring video, OG image.
3. **Build waitlist backend** — Netlify Function / Vercel Serverless / Supabase → email capture → confirmation → position.
4. **Add search/filter UX** — Wire `/collection?search=` to filter bar.
5. **Design trust signals** — Live waitlist counter, hangtag photography, maker video embeds.
6. **Harden mobile nav** — Body scroll lock, focus trap, escape key.
7. **Preload fonts + critical CSS** — Improve LCP/CLS.
8. **Custom 404 + error boundaries** — Branded, helpful, with search link.

---

*This file is the durable product context. Edit when positioning, users, or commitments change. Visual design decisions live in DESIGN.md and surface briefs.*