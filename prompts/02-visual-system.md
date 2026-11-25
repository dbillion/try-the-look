# P02 — Visual System and Fidelity

## Goal

Reproduce the original monochrome sportswear editorial design. Improve consistency and responsive robustness without changing the brand language or visual composition.

## Required inputs

- P01 source audit.
- DESIGN.md.
- Reference desktop and mobile captures.
- index.html and style.css.

## Visual invariants

- White page, stage and product panel.
- Main text #151413, muted text #66625c, accent #0e0e0e, divider #c8c8c8.
- Helvetica/Arial typography with the supplied Inter 600 WOFF2 embedded in CSS.
- Desktop 46px title; mobile 24px title.
- Desktop two-column composition with a 380px product panel.
- Hairline dividers, square primary buttons, 30px size pills and 20px mobile dock radius.
- Large transparent full-body model imagery with a soft floor shadow.
- No generic card grids, gradients, decorative blobs, glass cards or new color palette.

## Layout requirements

- Desktop header height 88px; mobile header height 68px.
- Desktop frame fills the viewport below the header, minimum 380px.
- At 1100px and above, stage and 380px product panel sit side by side.
- Between 750px and 1099px, retain the product panel and tighten the left layout.
- At 749px and below, use the classic walk line, docked product panel, horizontal snap list and bottom-sheet picker.
- At 374px and below, reduce side padding and product card width.
- In landscape phones with max-height 520px, compact the header and stage.

## Implementation guidance

- Prefer the existing CSS variables and component classes.
- Use CSS transforms, opacity and clip-path for motion.
- Avoid new dependencies and avoid changing the visual hierarchy.
- Keep image dimensions/aspect ratios stable to prevent layout shifts.
- Maintain clear focus states and touch targets.

## Output

Return a focused CSS/markup change list, updated design tokens if needed, screenshots at the target viewports and a comparison against the source capture.

## Acceptance

The implementation remains recognizably the same page at all target viewports. Any improvement must preserve the source's layout, image scale, panel proportions, typography, spacing and interaction affordances.
