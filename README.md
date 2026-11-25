# Try the Look — Runway

A static GitHub Pages recreation of the six-look Nike Runway styling experience.

## What is included

- Six looks with the original model cut-outs and product combinations.
- A desktop turning ring and a mobile classic carousel, driven by the original spring/positioning logic.
- Five-second autoplay, pause/resume, previous/next, progress ticks, drag/swipe and keyboard navigation.
- A look lightbox with three product pins and linked product rows.
- Product size selectors, a local styling bag, remove actions and a downloadable shortlist.
- Responsive desktop/tablet/mobile layouts and reduced-motion support.
- A project-specific agent skill and a modular prompt pack under prompts/.

## Stack and architecture

This is deliberately plain HTML, CSS and vanilla JavaScript. The carousel's apparent 3D is a perspective projection of transparent 2D model images; it is not a WebGL scene. Three.js, React, physics engines and animation frameworks are therefore not required and would add weight without improving fidelity.

- index.html — semantic page, custom runway-section element, inline product catalogue.
- style.css — source visual system, responsive layouts and motion.
- app.js — custom-element lifecycle, carousel, product pickers and local bag.
- prompts/ — task-specific prompts that can be run independently or through the master prompt.
- .agents/skills/runway-look-recreation/SKILL.md — project-specific workflow and invariants.
- scripts/build.mjs — creates a clean dist/ containing only deployable site files.
- tests/ — Playwright browser tests.

## Run locally

Requirements: Node.js 20 or newer and npm.

~~~sh
npm install
npm run build
npm test
npm run serve:test
~~~

Open http://127.0.0.1:4178/try-the-look/.

## Deploy

Push to main. GitHub Actions runs the browser tests, builds dist/, and deploys it to GitHub Pages. The intended public URL is:

https://dbillion.github.io/try-the-look/

The project uses its own repository (dbillion/try-the-look) and does not overwrite the profile site repository (dbillion.github.io).

## Important commerce limitation

The styling bag is a local shortlist stored in the visitor's browser. It does not create a Shopify cart, place an order, collect payment or apply the displayed 10% bundle discount. Product links open the original Shopify product pages. This limitation is stated in the bag UI and must not be removed or obscured.

## Asset hosting

Model, look, product and logo images remain at the original asset host, https://reel-ref-try-the-look.vercel.app/assets/, as required by the supplied specification. The Inter 600 WOFF2 font is embedded in the stylesheet as a data URI. The external image host is a runtime dependency: if it is retired or its paths change, the images will need a separately approved migration.

## Data integrity

The catalogue is embedded in index.html in the script#runway-catalog JSON block. Keep the six look order, eight product records, product names, vendor labels, prices, sizes, variant IDs, product URLs and pin mapping unchanged unless the user explicitly authorizes a data change. In particular, preserve the literal vendor label "Nikey | Password: 1" and apparel size order "S, L, M, XL".

## Prompt and skill workflow

Read prompts/README.md for the recommended sequence. The master prompt is prompts/00-master.md; focused prompts cover source audit, visual fidelity, motion, catalogue, accessibility, performance, QA and GitHub Pages. The project skill coordinates those steps and calls existing skills rather than duplicating them.

## Brand and rights notice

This is an independent reproduction exercise. It is not affiliated with, endorsed by or operated by Nike. Brand names, logos, product names and source imagery remain the property of their respective owners. Confirm the necessary rights before commercial use.
