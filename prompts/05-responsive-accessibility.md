# P05 — Responsive Behavior and Accessibility

## Goal
Keep the original layout across desktop, tablet, phone and landscape while making every essential interaction usable with keyboard, touch and assistive technology.

## Required viewports
- 1440×1000 desktop.
- 1100×800 desktop/tablet boundary.
- 1024×768 tablet.
- 768×1024 tablet/phone boundary.
- 390×844 phone.
- 375×812 phone.
- 320×740 narrow phone.
- 844×390 landscape phone.

## Responsive rules
- At ≥1100px: two columns, flexible stage and 380px panel.
- At 750–1099px: retain the 380px panel, stack the heading and tighten controls.
- At ≤749px: switch to classic model walk, hide desktop controls, show progress line, dock panel below the stage, convert product rows to horizontal snap cards and size pickers to bottom sheets.
- At ≤374px: use 16px side padding and narrower cards.
- At max-height 520px: compact the header and stage and hide the subtitle if necessary.
- No horizontal document overflow at any target width.

## Accessibility requirements
- Use semantic header, navigation, main, headings, lists, buttons, links, fieldsets and native dialog.
- The runway stage is a labelled carousel region.
- Previous/next/tick controls have explicit accessible names and real button semantics.
- The active tick exposes aria-current; autoplay exposes aria-pressed.
- Look changes are announced by a polite atomic live region.
- Each pin has a product-specific accessible name; pin activation highlights and reveals the matching product row.
- Plus controls expose aria-expanded and aria-controls for the associated picker.
- Size options use labelled native radio inputs and fieldset/legend.
- Loading, success, error and pending-size messages are announced in status regions.
- Popup and size sheet have an operable close action, Escape support and deliberate focus return.
- Focus-visible indicators remain visible.
- Touch targets should be at least 44×44px where feasible.
- Do not make hover the only path to any action.

## Reduced motion
When prefers-reduced-motion is reduce:
- Do not start autoplay.
- Skip the ring entrance, light sweep, FLIP, cursor inertia and staggered entrances.
- Use instant scroll and state changes.
- Remove nonessential transitions and pin pulse animations.
- Keep all controls and state changes functional.

## Output
Return a viewport matrix, WCAG 2.2 AA findings, severity and user impact, code changes and automated/manual verification evidence.

## Acceptance
All controls work by keyboard and touch; focus is visible and restored; the page has no horizontal overflow; reduced motion prevents automatic or nonessential movement; no important information is conveyed by animation or hover alone.
