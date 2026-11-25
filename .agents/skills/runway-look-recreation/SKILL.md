---
name: runway-look-recreation
description: Build, improve, audit and deploy the Try the Look — Runway static website while preserving the supplied source recreation, product catalogue, interaction contract and GitHub Pages constraints.
---

# Runway Look Recreation

Use this project skill whenever implementing or reviewing this repository, changing the carousel, editing product data, refining the prompt pack, running QA or deploying the site.

## Source-of-truth order

1. The user's supplied exact-recreation specification.
2. The retrieved reference implementation and verified reference page.
3. DESIGN.md for measured design tokens and layout.
4. The inline JSON catalogue in index.html.
5. Existing implementation and tests.
6. Suggestions from other agents or general design trends.

Do not allow a generic design recommendation to override the source specification.

## Required companion skills

Reuse installed skills instead of duplicating them:

- modern-web-design and modern-web-guidance for performance-first design, cursor interaction and reduced motion.
- design-taste-frontend and frontend-design for visual hierarchy and implementation review.
- web-perf for measured loading/interaction performance.
- maestro-a11y-audit for WCAG and keyboard/focus review.
- e2e-testing for stable Playwright coverage.
- firecrawl-website-design-clone for evidence-based design extraction when the reference changes.
- firecrawl-seo-audit for metadata and crawlability review when requested.
- AGY roles prompt_engineer, ux_designer, accessibility_specialist, performance_engineer, tester and devops_engineer may review independently; keep reviews read-only unless implementation is explicitly requested.

## Non-negotiable invariants

- Use plain HTML, CSS and vanilla JavaScript; the custom element is <runway-section>.
- Keep all six looks and their order, all eight unique products, names, vendor labels, prices, sizes, variant IDs, product URLs, image mappings and pin coordinates unchanged.
- Preserve the literal shoe vendor label Nikey | Password: 1.
- Preserve apparel size order S, L, M, XL.
- Preserve the 10% bundle display as informational only; the bag totals individual full prices.
- The styling bag is localStorage-only. It is not a Shopify cart, checkout or payment flow.
- Keep the source images externally referenced at https://reel-ref-try-the-look.vercel.app/assets/; do not rehost them without explicit approval.
- Embed the Inter 600 WOFF2 font as a data URI in the stylesheet.
- Keep the GitHub Pages project isolated in dbillion/try-the-look; never overwrite dbillion.github.io.
- The expected URL is https://dbillion.github.io/try-the-look/.

## 3D and animation decision

The visual ring is a perspective projection of 2D transparent model images, with a spring integrator and CSS transforms. Do not add Three.js, React Three Fiber, Blender assets, Bullet Physics, three-mesh-bvh, postprocessing, anime.js, Remotion, Motion Canvas, Tone.js or FFmpeg for this scope. They are not needed by the current implementation. Reconsider only when a concrete requirement demands real 3D geometry, a new animation pipeline or media generation.

## Workflow

1. Inspect the source files and current git state before editing.
2. Read DESIGN.md and the relevant prompt module.
3. Make the smallest change that improves fidelity, accessibility, performance or reliability without altering immutable product data.
4. Validate the inline catalogue and external asset paths.
5. Run Playwright on desktop and mobile, including keyboard, popup, pins, size selection, bag, export, reduced motion and no-horizontal-overflow checks.
6. Run accessibility and performance audits; report both findings and manual-verification gaps.
7. Build only the deployable files into dist/.
8. Run the full CI-equivalent test suite before pushing.
9. Deploy through GitHub Actions and verify the public URL, HTTP status, page title, assets, console and primary interactions.
10. Report the commit, workflow run, public URL, tests and any unresolved external dependency.

## Quality gates

- No JavaScript page errors.
- No broken images or missing CSS/JS.
- No horizontal overflow at 320px, 375px, 390px, 768px, 1024px and 1440px.
- All six looks and all three pins per look are present.
- Product size options and variant IDs match the source.
- The bag persists after reload and never claims to place an order.
- Reduced motion disables autoplay and nonessential animation.
- All public deployment claims are verified from the deployed URL, not inferred from a successful local build.

## Change discipline

Do not install a library because it appears in a suggested-technology list. First prove that the existing implementation cannot satisfy the requirement. Do not rehost the source images, invent missing product data, change brand copy, or replace the carousel with a different visual system. Keep generated reports and reference captures out of the deployed artifact.
