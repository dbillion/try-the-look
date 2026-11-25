# DESIGN.md — Try the Look / Runway

## Source and evidence

- Reference: https://reel-ref-try-the-look.vercel.app/
- Catalogue source: https://nike-makknzjs.myshopify.com/pages/runway
- Captured: 2026-11-25
- Evidence: reference HTML, CSS, JavaScript and catalogue retrieved directly; all 22 checked asset URLs returned HTTP 200; Firecrawl branding/images extraction; Playwright captures at 1440×1000 desktop and 390×844 mobile.
- Reference captures are kept locally in .firecrawl/ and are not part of the deployed site.

Use the reference page and captures as the visual source of truth. This document records measured source tokens, not a redesign brief.

## Design summary

Minimal monochrome sportswear editorial. White space, large transparent full-body model cut-outs, restrained typography, hairline dividers, product photography, compact labels and precise motion. The stage is the hero; the interface should feel quiet and let the models and product combinations carry the page.

## Design tokens

| Role | Value |
|---|---|
| Stage / panel / page | #ffffff |
| Main text / heading | #151413 |
| Muted text | #66625c |
| Accent / CTA | #0e0e0e |
| Divider | #c8c8c8 |
| Primary CTA text | #ffffff |
| Body / heading stack | Helvetica, Arial, sans-serif |
| Embedded font | Inter 600 WOFF2 (used where the source specifies it) |
| Desktop title | 46px, weight 400, line-height 1 |
| Mobile title | 24px, weight 400 |
| Desktop panel width | 380px |
| Desktop section frame | viewport height minus 88px header, minimum 380px |
| Mobile header | 68px |
| Mobile section frame | 109svh |
| Desktop panel padding | 32px |
| Mobile side padding | 20px; 16px at ≤374px |
| Product thumb | 92px desktop / 62px mobile |
| Default radius | 0px |
| Size pill radius | 30px |
| Mobile dock radius | 20px |
| Main easing | cubic-bezier(.16,1,.3,1) |
| Silk easing | cubic-bezier(.65,0,.35,1) |
| Spring easing | cubic-bezier(.34,1.56,.64,1) |
| Sheet easing | cubic-bezier(.32,.72,0,1) |
| Carousel autoplay | 5000ms |

## Layout

### Header

- White 88px desktop header with Nike swoosh at left and compact navigation/bag controls at right.
- At ≤749px, header height is 68px; logo and navigation contract, two secondary links hide, bag remains visible.
- Keep the header separate from the runway section; the section measures the header height to fill the remaining desktop viewport.

### Desktop ≥1100px

- Full-width two-column grid: flexible runway stage plus a 380px product panel.
- Left column contains the heading, stage, controls and lightbox.
- Right panel is a white surface with a 1px left divider.
- The stage shows the active hero in front of a ring of blurred, smaller model figures.
- The product panel contains three rows and a fixed bundle footer.

### Tablet 750–1099px

- Keep the 380px product panel.
- Stack the left heading content and tighten stage controls.
- The active tick contracts to approximately 130px.

### Mobile ≤749px

- Switch from ring projection to the classic three-figure walk line.
- Keep the title/subtitle at the top of the stage.
- Replace desktop controls with a small progress line.
- Dock the product panel below the model stage with rounded top corners.
- Product rows become a horizontal snap carousel.
- Bundle price row is hidden; the full-look CTA remains full-width.
- Product size pickers become a bottom sheet.

## Component details

- Product row: 92px thumbnail on desktop, text and 44px add target; 62px thumbnail on mobile.
- Product rows use 1px dividers, no card radius, subtle image zoom and underline feedback.
- Size pills have 44px minimum width, 40px minimum height, a 30px radius and a dark selected state.
- Main CTA is square-cornered, 56px minimum height, dark background and white text.
- Lightbox uses a white stage, a quiet top caption, 48px close target and three numbered pins.
- Bag is a native dialog with a clear statement that it is only a local shortlist.

## Motion language

- Use transform and opacity for movement; avoid animating layout dimensions.
- Desktop ring: 12 body instances, 30° slot spacing, perspective projection, critical damping (stiffness 95; damping 2√95), subtle blur with depth, front hero/body hand-off.
- Mobile: classic walk line with staggered following bodies.
- Autoplay advances every 5 seconds and pauses while the visitor engages with product controls.
- Look changes replay a light sweep and staggered product-row entrance.
- Popup uses FLIP only when motion is allowed.
- The custom cursor is desktop-only and is removed on touch devices.
- prefers-reduced-motion: reduce disables autoplay and nonessential movement.

## Responsive breakpoints

- 1100px: desktop two-column composition.
- 750px: ring-to-classic mode and mobile docked product panel.
- 374px: tighter side padding and narrower product cards.
- 520px max-height: landscape-phone compact header and panel.

## Accessibility rules

- Keep the stage as a labelled carousel region with arrow-key navigation.
- Maintain real buttons for previous/next/ticks/autoplay and product actions.
- Announce look changes and bag feedback in polite live regions.
- Preserve aria-current, aria-pressed, aria-expanded, and picker control relationships.
- Keep focus visible and return focus after dismissing overlays.
- Keep all touch targets at least 44px where the source allows.
- Respect reduced motion in both CSS and JavaScript.
- Never rely on hover as the only way to access a product pin or size.

## Asset rules

- Keep all model, hero, product and logo image URLs absolute at the original Vercel asset host; do not copy them into this repository.
- Keep the WOFF2 font embedded as base64 in style.css.
- Add preconnect for the asset origin.
- Keep image alt text meaningful for content images and empty for decorative imagery.

## Engineering choice

The ring is a mathematically projected set of transparent 2D images. It does not need real 3D meshes, raycasting, physics, shaders or post-processing. Keep the existing vanilla implementation. Introduce Three.js only if a future approved requirement needs genuine mesh geometry or 3D camera interaction.
