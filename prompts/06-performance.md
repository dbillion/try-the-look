# P06 — Performance and Dependency Discipline

## Goal
Keep the page fast on real devices without changing the original visual result or breaking the externally hosted image requirement.

## Architecture facts
- The carousel is a 2D image ring projected with JavaScript and CSS transforms.
- The page has six model cut-outs, six full-look images, eight unique product thumbnails and cloned queue bodies.
- Source assets are hosted at https://reel-ref-try-the-look.vercel.app/assets/.
- The catalogue is inline JSON in index.html; do not add a runtime fetch for catalogue data.
- The page is static and has no server-side cart or checkout.

## Dependency rule
Do not add Three.js, React Three Fiber, Bullet Physics, three-mesh-bvh, postprocessing, anime.js, Remotion, Motion Canvas, Tone.js or FFmpeg for the current scope. The implementation does not need mesh geometry, raycasting, physics simulation, video generation or audio. Add a dependency only after a measured requirement proves it necessary.

## Performance work
1. Keep a preconnect to the source asset host.
2. Preload only the first visible model image and other true critical resources.
3. Keep active hero images eager; lazy-load offscreen queue clones and product thumbnails.
4. Set image dimensions/aspect ratios to prevent layout shift.
5. Use decode() and object-fit appropriately; handle failed image decode without breaking the section.
6. Keep animation work in requestAnimationFrame and only while moving or visible.
7. Stop work when the section is outside the viewport or the document is hidden.
8. Animate transform and opacity; avoid forced layout in animation loops.
9. Keep the font embedded as specified; avoid another external font request.
10. Avoid duplicate event listeners and timers after element disconnect/reconnect.
11. Guard localStorage access and JSON parsing.
12. Keep the deployed artifact limited to index.html, style.css and app.js.

## Measurements
Collect browser network timings and a cold-load performance trace where tooling allows. Record:
- document and critical asset response times,
- total transferred bytes,
- image decode failures,
- LCP, CLS and INP/TBT observations,
- long tasks and main-thread blocking,
- animation frame behavior while the section is visible and hidden.

Do not claim Core Web Vitals are good based only on a single local run. Identify whether the measurement is lab data or field data.

## Output
Provide a before/after metric table, specific changes and estimated user impact. Do not recommend optimizations with no measurable benefit.

## Acceptance
No broken source images, no unnecessary runtime JSON request, no permanent idle animation loop, no avoidable layout shift and no dependency added without a documented reason.
