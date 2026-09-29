# Homepage — Overrides for DOMINO Glass Kitchen

This page file overrides the MASTER rules for the Homepage. It preserves the brand identity (Inter font, DOMINO colors) and specifies component tokens, spacing, and responsive rules.

## Tokens
- spacing-scale: 8px base; tokens: `space-1:8px`, `space-2:16px`, `space-3:24px`, `space-4:32px`, `space-5:48px`, `space-6:64px`
- container-width: 1200px
- grid: desktop 12 / tablet 8 / mobile 4
- radii: `r-sm:6px`, `r-md:12px`
- color-primary: var(--color-primary) (do not change)
- color-accent: var(--color-accent) (do not change)

## Components
- Hero: full-bleed media, overlay with 55% black on mobile, 30% on desktop. Headline max-width 720px.
- ProductCard: image focal point required; title, short description, CTA link. Image ratio 4:3 on mobile, 16:9 on desktop.
- WarrantyTile: show per-family policy via `warranty_policies` lookup. Use light surface for clarity.

## Responsive rules
- Mobile: 1 column stack, large paddings reduced to `space-2`.
- Tablet: 2-column layout for hero content; product grid 2 columns.
- Desktop: hero two-column split (image/content), product grid 4 columns.

## Motion
- Reveal animations: fade + translateY(8px) duration 320ms, easing `cubic-bezier(.22,.9,.32,1)`; respect `prefers-reduced-motion`.

## Accessibility
- All images must include `alt` text and `role="img"` if decorative set `aria-hidden="true"`.
- Focus outlines: `outline: 3px solid var(--color-primary)` when focused via keyboard.

## Data mapping
- `product_lines` -> ProductRange
- `warranty_policies` -> Warranty
- `projects` -> Projects (limit 3)
- `posts` -> Knowledge (limit 3)
- `media` -> hero image and product thumbnails

Source: MASTER.md + project-specific homepage adjustments.
