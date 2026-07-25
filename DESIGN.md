---
name: "Susan Atelier"
description: "Contemporary Indian occasion wear made by named hands, worn for years"
colors:
  ivory-blush: "#F5EAE1"
  charcoal: "#3B2412"
  antique-gold: "#8A6324"
  warm-taupe: "#B89A7C"
  gold-tint: "#E4D3B8"
  accent-soft: "#EAE6DD"
  bg-card: "#FBF6F0"
  text-secondary: "#5A554E"
  sage: "#5B6E4F"
  error-rust: "#9C4A3C"
  gold-deep: "#6F4E1C"
  hairline: "rgba(232, 211, 184, 0.45)"
  white: "#FFFFFF"
  whatsapp-green: "#25D366"
  statement-gold: "#EFE6D6"
  cta-gradient-dark: "#2C1A0E"
  note-bg: "#FBF4E6"
typography:
  display:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(2.4rem, 5.5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "0.4px"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(1.8rem, 3.8vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.12
  title:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.12
  lede:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  button:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1
  button-lg:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "1.1rem"
    fontWeight: 600
    lineHeight: 1
  ui-small:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  ui-smaller:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.65
  caption:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.92rem"
    fontWeight: 400
    lineHeight: 1.55
  error:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  breadcrumb:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.82rem"
    fontWeight: 400
    lineHeight: 1.5
  badge:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "1.2px"
    textTransform: "uppercase"
  pd-name:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(2rem, 4vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.12
  note:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Cormorant Garamond', Georgia, serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "3px"
    textTransform: "uppercase"
  script:
    fontFamily: "'Alex Brush', cursive"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1
  script-lg:
    fontFamily: "'Alex Brush', cursive"
    fontSize: "2.4rem"
    fontWeight: 400
    lineHeight: 1
  statement-tag:
    fontFamily: "'Playfair Display', Georgia, serif"
    fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.3px"
rounded:
  sm: "4px"
  md: "4px"
  lg: "8px"
  full: "9999px"
  btn: "4px"
spacing:
  2: "8px"
  3: "12px"
  4: "16px"
  5: "20px"
  6: "24px"
  8: "32px"
  10: "40px"
  12: "48px"
  16: "64px"
components:
  btn-primary:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory-blush}"
    rounded: "{rounded.btn}"
    padding: "0 var(--space-6)"
    height: "50px"
    fontFamily: "{typography.body.fontFamily}"
    fontWeight: 600
    fontSize: "1.05rem"
  btn-primary-hover:
    backgroundColor: "{colors.antique-gold}"
    borderColor: "{colors.antique-gold}"
    textColor: "{colors.ivory-blush}"
  btn-outline:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    borderColor: "{colors.charcoal}"
    borderWidth: "1.5px"
    rounded: "{rounded.btn}"
    padding: "0 var(--space-6)"
    height: "50px"
    fontFamily: "{typography.body.fontFamily}"
    fontWeight: 600
    fontSize: "1.05rem"
  btn-outline-hover:
    backgroundColor: "{colors.accent-soft}"
    borderColor: "{colors.antique-gold}"
    textColor: "{colors.charcoal}"
  btn-gold:
    backgroundColor: "{colors.antique-gold}"
    textColor: "{colors.ivory-blush}"
    borderColor: "{colors.antique-gold}"
    borderWidth: "1.5px"
    rounded: "{rounded.btn}"
    padding: "0 var(--space-6)"
    height: "50px"
    fontFamily: "{typography.body.fontFamily}"
    fontWeight: 600
    fontSize: "1.05rem"
  btn-gold-hover:
    backgroundColor: "{colors.gold-deep}"
    borderColor: "{colors.gold-deep}"
  btn-lg:
    height: "56px"
    padding: "0 var(--space-8)"
    fontSize: "1.1rem"
  card:
    backgroundColor: "{colors.bg-card}"
    borderColor: "{colors.gold-tint}"
    borderWidth: "1px"
    rounded: "{rounded.lg}"
    padding: "var(--space-6)"
    boxShadow: "{shadows.sm}"
  card-hover:
    transform: "translateY(-3px)"
    boxShadow: "{shadows.md}"
    borderColor: "{colors.antique-gold}"
  input:
    borderColor: "{colors.gold-tint}"
    backgroundColor: "#fff"
    rounded: "{rounded.md}"
    padding: "13px 16px"
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "1.05rem"
  input-focus:
    borderColor: "{colors.charcoal}"
    boxShadow: "0 0 0 3px var(--accent-soft)"
  filter-btn:
    backgroundColor: "#fff"
    borderColor: "{colors.gold-tint}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "var(--space-2) var(--space-4)"
    fontFamily: "{typography.body.fontFamily}"
    fontSize: "1rem"
    fontWeight: 600
  filter-btn-active:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory-blush}"
    borderColor: "{colors.charcoal}"
  product-card:
    backgroundColor: "{colors.bg-card}"
    borderColor: "{colors.gold-tint}"
    borderWidth: "1px"
    rounded: "{rounded.lg}"
    boxShadow: "{shadows.sm}"
  product-card-hover:
    boxShadow: "{shadows.lg}"
    transform: "translateY(-4px)"
    borderColor: "{colors.antique-gold}"
  badge-hero:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.ivory-blush}"
    rounded: "{rounded.full}"
    padding: "5px 11px"
    fontSize: "0.68rem"
    fontWeight: 700
    letterSpacing: "1.2px"
    textTransform: "uppercase"
  badge-entry:
    backgroundColor: "{colors.sage}"
    textColor: "#fff"
    rounded: "{rounded.full}"
    padding: "5px 11px"
    fontSize: "0.68rem"
    fontWeight: 700
    letterSpacing: "1.2px"
    textTransform: "uppercase"
  gst-5:
    backgroundColor: "{colors.sage}"
    textColor: "#fff"
    rounded: "{rounded.full}"
    padding: "3px 10px"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.4px"
    textTransform: "uppercase"
  gst-18:
    backgroundColor: "{colors.error-rust}"
    textColor: "#fff"
    rounded: "{rounded.full}"
    padding: "3px 10px"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.4px"
    textTransform: "uppercase"
---
# Design System: Susan Atelier

## Overview

**Creative North Star: "The Artisan's Ledger"**

Susan Atelier's visual identity draws from the quiet authority of a master artisan's handwritten ledger — where every entry is precise, every material named, every wage recorded in ink that has aged to bronze. The palette is the cloth itself: ivory blush of undyed linen, charcoal of aged ink, antique gold of brass clasps, warm taupe of unbleached thread. Typography mirrors the duality of the brand: Playfair Display's editorial serif for the crafted headline, Cormorant Garamond's readable warmth for the honest body, Alex Brush's confident script for the founder's signature. No neon, no glass, no gradients that don't exist in nature. Shadows are cast by cloth over a table, not by UI elevation. Motion is the drape of fabric — ease-out, never springy. The system is editorial, tactile, and quietly confident. It does not shout; it shows.

**Key Characteristics:**
- Serif-only typography (Playfair Display + Cormorant Garamond + Alex Brush)
- Earth-derived palette: ivory, charcoal, antique gold, warm taupe, sage, rust
- Subtle charcoal-based shadows (never black, never heavy)
- 4px base radius — tactile, not pillowy
- Editorial section rhythm: generous vertical space, one spacing rhythm throughout
- Gold as the single accent — used sparingly, never as decoration

## Colors

The palette is drawn from the materials of the craft: undyed linen, aged ink, brass fittings, unbleached thread, sage leaves, rusted iron. Gold is the only accent and carries the weight of attention.

### Primary

- **Antique Gold** (`#8A6324`): The brand's action color — primary buttons, active links, hover states, focus rings, GST 18% badge (rust variant). Deepens to `#6F4E1C` on hover.
- **Espresso Bronze** (`#3B2412`): Primary text, primary buttons (default), header scrolled state, logo. The "ink" of the ledger.

### Neutral

- **Ivory Blush** (`#F5EAE1`): Page background — the undyed linen ground.
- **Warm Taupe** (`#B89A7C`): Secondary text, borders, script accent, divider lines — the unbleached thread.
- **Gold Tint** (`#E4D3B8`): Input borders, card borders, filter buttons, subtle backgrounds — the brass highlight.
- **Accent Soft** (`#EAE6DD`): Input focus ring, hover backgrounds, striped table rows — the paper fiber.
- **Card Background** (`#FBF6F0`): Elevated surfaces — a warmer, slightly lighter ivory.
- **Text Secondary** (`#5A554E`): Muted body copy, placeholder text, inactive states.
- **Hairline** (`rgba(232, 211, 184, 0.45)`): Footer border, subtle dividers — the finest thread.

### Functional

- **Sage** (`#5B6E4F`): 5% GST badge, success states — the natural dye.
- **Error Rust** (`#9C4A3C`): 18% GST badge, error messages — the iron mordant.
- **Gold Deep** (`#6F4E1C`): Gold button hover, gold link hover — the aged brass.

### Named Rules

**The One Gold Rule.** Antique Gold (`#8A6324`) appears on ≤10% of any viewport. It marks the primary action, the active state, the maker's wage, the honest price. Its rarity is the point — gold is the signal, not the background.

**The No-Black Rule.** No `#000`, `#111`, `rgb(0,0,0)`. All darks derive from Espresso Bronze (`#3B2412`) or its transparent variants. Shadows use `rgba(59, 36, 18, α)`.

**The Single-Script Rule.** Alex Brush appears only for: "by Riya" signature, hero byline, statement tag accent. Never for UI labels, buttons, or body copy.

## Typography

**Display Font:** Playfair Display (400/500/600/700) with Georgia fallback — editorial serif, high contrast, crafted for headlines.

**Body Font:** Cormorant Garamond (400/500/600) with Georgia fallback — readable, warm, humanist serif for long-form and UI.

**Script Font:** Alex Brush (400) — confident cursive for the founder's signature only.

**Character:** The pairing is editorial but accessible — Playfair's high contrast commands attention; Cormorant's open counters and generous x-height ensure legibility at 18px. Alex Brush adds the human mark without whimsy.

### Hierarchy

- **Display** (600, `clamp(2.4rem, 5.5vw, 4rem)`, 1.12, 0.4px tracking): Hero H1, statement band tag, major section H1.
- **Headline** (600, `clamp(1.8rem, 3.8vw, 2.6rem)`, 1.12): Section H2, product detail name, page titles.
- **Title** (600, 1.3rem, 1.12): Feature card H3, product card name, transparency card labels.
- **Body** (400, 18px, 1.65): All body copy, lede, product descriptions, transparency values.
- **Label** (600, 0.72rem, 1, 3px tracking, uppercase): Eyebrows, filter buttons, GST badges, chip labels.
- **Script** (400, 2rem, 1): "by Riya" signature, hero byline, statement tag accent.

### Named Rules

**The Serif-Only Rule.** No sans-serif anywhere. UI buttons, nav links, form inputs, metadata — all Cormorant Garamond. The brand is serif; the interface honors that.

**The Eyebrow Rule.** Every major section opens with an eyebrow (`.eyebrow`): uppercase, tracked, gold rule before text. It orients the reader before the headline lands.

**The Lede Rule.** The first paragraph after a headline uses `.lede` (1.2rem, secondary color, max 640px). It carries the hook; the headline carries the promise.

## Layout

**Container:** Max-width 1120px (`--maxw`), centered, horizontal padding `--space-5` (16px) mobile / `--space-6` (24px) desktop via `.wrap`.

**Section Rhythm:** Every `<section>` gets `padding: clamp(2.75rem, 6vw, 4.5rem) 0` — generous vertical breathing room that scales with viewport.

**Grid System:** CSS Grid for all multi-column layouts:
- Hero: `1.05fr 0.95fr` (copy : art)
- Product detail: `1fr 1fr` (media : info)
- Collection grid: `repeat(4, 1fr)` → `repeat(3, 1fr)` → `repeat(2, 1fr)` → `1fr` at breakpoints 980/760/520px
- Feature/Story grids: `repeat(3, 1fr)` → `1fr` at 900px
- About hero: `1fr 1fr` → `1fr` at 900px

**Spacing Rhythm:** One scale (`--space-2` through `--space-16`). More space above headings than below (heading `margin-bottom: --space-3`; section padding handles the rest).

**Header:** Sticky, 68px (`--header-h`), backdrop-blur ivory at 90% → 98% on scroll with shadow + border.

**Responsive Breakpoints:** 980px (nav collapse), 900px (grid stacks), 760px (collection 3-col), 520px (collection 1-col, hero stacks, capture stacks).

## Elevation & Depth

**Philosophy:** Flat by default. Depth is conveyed through tonal layering (card background warmer than page), hairline borders, and subtle shadows that appear *only on interaction* (hover, focus). No persistent elevation.

### Shadow Vocabulary

- **Ambient Low** (`0 1px 2px rgba(59, 36, 18, 0.06)`): Card rest state, skeleton shimmer base.
- **Interaction Medium** (`0 6px 14px rgba(59, 36, 18, 0.08)`): Card hover, header scrolled, dropdown menus.
- **Focus High** (`0 16px 36px rgba(59, 36, 18, 0.12)`): Hero image, product detail media, modal overlays.

### Named Rules

**The Flat-At-Rest Rule.** Cards, buttons, inputs, nav — no shadow at rest. Shadow emerges on hover/focus as a tactile response.

**The Charcoal-Shadow Rule.** All shadows use `rgba(59, 36, 18, α)` — never black, never blue, never generic gray. The shadow color is the ink color.

## Shapes

**Corner Language:** 4px base radius (`--radius-sm`, `--radius-md`, `--radius-btn`). 8px for cards/media (`--radius-lg`) for media containers, product cards, feature cards. 9999px (`--radius-full`) for pills, badges, filter buttons, progress bars.

**Borders:** 1px solid Gold Tint (`--border`) for cards, inputs, tables. 1.5px for buttons. Hairline (0.5px equivalent via rgba) for footer/dividers.

**Media Containers:** Aspect-ratio locked (3:4 for product, 3:4 for hero art, 3:4 for detail). `object-fit: cover`. Subtle gradient placeholder while loading.

**Silhouette:** Rectangular with gently curved corners. No circles, no organic blobs, no asymmetrical clips. The form language is the woven cloth — warp and weft, right angles softened by wear.

## Components

### Buttons

**Character:** Tactile, lifted, confident. 50px min-height (56px LG). 1.5px border. Shadow at rest (sm). Lift -1px on hover, shadow deepens to md. Press returns to rest. Transitions 200ms `ease-soft`.

| Variant | Rest | Hover | Focus |
|---------|------|-------|-------|
| Primary | Charcoal bg, Ivory text | Gold bg, Gold border | 3px accent-soft ring |
| Gold | Gold bg, Ivory text, Gold border | Gold Deep bg, Gold Deep border | 3px accent-soft ring |
| Outline | Transparent, Charcoal text, Charcoal border | Accent Soft bg, Gold border | 3px accent-soft ring |
| Ghost | Transparent, Text Primary | Accent Soft bg | 3px accent-soft ring |

### Filter Buttons (`.fbtn`)

Pill-shaped (`--radius-full`), white bg, Gold Tint border, Text Secondary. Hover: Charcoal border, Charcoal text. Active: Charcoal bg, Ivory text, Charcoal border. 44px min-height for touch.

### Chips (`.chip`)

Pill-shaped, 44px min-height, 1.5px Gold Tint border. Selected: Charcoal bg, Ivory text, Charcoal border. Multi-selected: Accent Soft bg, Charcoal text, Charcoal border.

### Cards / Containers

**Product Card:** 3:4 aspect-ratio media, Ivory-to-Gold-Tint gradient placeholder. Hover: scale 1.04 on image, translateY(-4px), shadow-lg, Gold border. Badges top-left (Hero/Entry). Swatch bottom-right (48px circle). Body: name (Playfair), fabric (Cormorant italic), price + GST chip.

**Feature/Story Card:** Same chrome as product card minus media. Hover: translateY(-3px), shadow-md, Gold border.

**Transparency Card:** Card chrome, trow rows (label secondary, value primary), bottom border hairline.

### Inputs / Fields

White bg, Gold Tint border, 4px radius, 13px 16px padding. Focus: Charcoal border, 3px Accent Soft ring. Placeholder: Warm Taupe. Error: Error Rust text + border.

### Navigation

**Desktop:** Monogram logo (56px) + 6 nav links (gap 24px) + CTA outline button. Links: Charcoal, gold underline animation on hover/active. Monogram scales 1.04x on hover.

**Mobile:** Hamburger (3 spans). Panel slides from top (header height), ivory bg, column links full-width with hairline dividers. CTA outline button inside panel. Body scroll lock when open.

### Footer

Charcoal bg, Ivory text, Gold Tint accents. 4-col grid (brand + 2 link cols) → 2-col → 1-col. Legal bar: hairline top border, Text Secondary, copyright nowrap.

### Hero

Grid 1.05fr : 0.95fr. Copy: wordmark (300px) → script byline → Display H1 → lede → email capture → trust line. Art: 3:4 model image, radius-lg, shadow-lg. Pillar strip below: 5 items, flex-wrap, script icons in Taupe.

### Statement Band

Full-width Charcoal bg, Gold Tint text. Centered: 84px monogram circle (white bg, contain) → Display tagline (clamp 1.6–2.4rem). Script accent on "Worn for years" phrase.

### Collection Grid

Breadcrumb → Eyebrow + H1 + lede → Filter bar (5 categories) → 4-col grid → empty state.

### Product Detail

Breadcrumb → 2-col grid (media 3:4, max 520px + info). Media: swatch 72px bottom-right. Info: badges → H1 name → fabric italic → price + GST → actions (Primary + Outline) → Transparency card (6 rows: Maker, Cloth, Embroidery, Wage, MRP) → step-p note.

### Join / Waitlist

Centered 560px max. Eyebrow + H1 + lede → Email capture (flex, input + Gold LG button) → Position counter (code-box style number) → Note → WhatsApp button (green).

## Do's and Don'ts

### Do:

- **Do** use the 8px spacing scale exclusively — no arbitrary pixel values.
- **Do** apply `--ease-soft` (`cubic-bezier(0.22, 0.61, 0.36, 1)`) to all transitions.
- **Do** reserve Antique Gold for primary actions, active states, and maker wages.
- **Do** set body copy at 18px/1.65 in Cormorant Garamond.
- **Do** use Playfair Display for all headlines (H1/H2/H3).
- **Do** lock media to 3:4 aspect ratio with `object-fit: cover`.
- **Do** show focus rings: 3px solid Charcoal with 3px offset, border-radius 4px.
- **Do** respect `prefers-reduced-motion: reduce` — disable all transitions/animations.
- **Do** use the eyebrow component (gold rule + uppercase label) before every major section headline.
- **Do** name the fibre on every product (linen, cotton, silk, velvet — never "fabric").

### Don't:

- **Don't** use black (`#000`, `#111`, `rgb(0,0,0)`) — use Charcoal `#3B2412` or its transparencies.
- **Don't** use sans-serif fonts anywhere — not even for UI labels, buttons, or metadata.
- **Don't** use Alex Brush for anything except "by Riya", hero byline, statement tag accent.
- **Don't** apply persistent shadows to cards, buttons, or containers at rest.
- **Don't** use border-radius larger than 8px except for pills (9999px).
- **Don't** use generic "primary/secondary" color names in code — use the descriptive tokens (charcoal, antique-gold, ivory-blush, etc.).
- **Don't** animate `width`, `height`, `padding`, or `margin` — use `transform` and `opacity` (detector flags layout transitions).
- **Don't** add decorative gradients, glassmorphism, or neon accents — the palette is the cloth.
- **Don't** show fake urgency (countdowns, "only X left" unless literally true — each piece is 1 of 1).
- **Don't** use marketing adjectives ("exquisite", "luxurious", "timeless", "curated", "elevated") — show specifics instead.