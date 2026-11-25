# P07 — QA, Regression and Release Acceptance

## Goal
Prove that the page behaves correctly before every merge or deployment. Prefer condition-based browser assertions over arbitrary sleeps.

## Static checks
- Parse the inline catalogue JSON.
- Assert six looks and eight unique product records.
- Assert each look has exactly three products.
- Assert all variant IDs are safe integers and unique within the product.
- Assert product URLs use nike-makknzjs.myshopify.com.
- Assert product images and model images use the approved Vercel asset host.
- Assert no runtime fetch to native-catalog.json remains.
- Assert no framework or WebGL dependency has been added without approval.

## Desktop browser tests
- Initial page loads with six heroes, six panels and 12 queue bodies.
- Previous, next and each tick select the expected look.
- Autoplay can be paused and resumed; reduced motion disables it.
- Stage responds to keyboard arrows and pointer drag.
- The front hero opens the popup; three pins exist; Escape and close return focus.
- Clicking a pin highlights the matching product row.
- Product plus opens its picker; size selection and confirmation add the exact variant.
- The bag counter updates; dialog lists the chosen product and size.
- Removing an item updates the counter and subtotal.
- Shortlist export downloads a text file with the product URL and selected size.
- Add full look requests missing size choices instead of guessing.
- No page errors, broken images or unexpected network failures.

## Mobile browser tests
- Verify 320px, 375px and 390px widths with no horizontal overflow.
- Verify the classic model walk and progress line.
- Verify the product list scrolls horizontally with snap behavior.
- Verify the size picker opens as a bottom sheet and can close by Escape and scrim.
- Verify the full-look CTA fits above the safe-area inset.
- Verify touch controls and bag dialog are usable.

## Accessibility checks
- Run axe/WCAG 2.2 AA automated checks.
- Verify keyboard tab order and visible focus.
- Verify focus return after closing the popup, picker and bag.
- Verify aria-current, aria-pressed, aria-expanded and live announcements.
- Verify reduced-motion behavior with emulated prefers-reduced-motion.
- Record manual screen-reader checks separately.

## Responsive regression matrix
Run at 320×740, 375×812, 390×844, 768×1024, 1024×768, 1100×800, 1440×1000 and 844×390.

## Output
Write docs/QA-REPORT.md with:
- test command and date,
- total/passed/failed counts,
- viewports covered,
- accessibility findings and severity,
- performance measurements,
- screenshots or traces for failures,
- known limitations and external dependencies.

## Release blocker criteria
Do not deploy with failing functional tests, broken images, JavaScript errors, horizontal overflow, incorrect catalogue data, inaccessible primary controls or an inaccurate claim about real commerce.
