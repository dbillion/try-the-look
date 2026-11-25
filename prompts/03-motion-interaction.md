# P03 — Carousel, Motion and Interaction Engineering

## Goal
Preserve the original ring/walk-line motion and every interactive state while making the animation lifecycle efficient and predictable.

## Required inputs
- P01 interaction map.
- app.js and style.css.
- Reference desktop/mobile captures.
- P05 accessibility constraints.

## Carousel invariants
- Six unique looks.
- Twelve queue bodies (the six originals plus six clones).
- Desktop ring uses 30-degree steps, perspective projection, depth scale, depth blur and a critically damped spring.
- Ring stiffness is 95 and damping is 2√95.
- Mobile uses the classic walk-line layout with the active model on the left and following models staggered to the right.
- The active hero and front queue body hand off without a visible jump.
- Five-second autoplay, with a progress indicator.
- Autoplay pauses while the user engages with product controls, the popup is open, the panel is hovered, the page is hidden or a drag is active.

## Interaction requirements
- Previous, next and six labelled ticks navigate to the correct look.
- Desktop drag and trackpad navigation use the source thresholds and momentum rules.
- Mobile swipe moves exactly one look in the intended direction.
- ArrowLeft and ArrowRight work when the stage has focus.
- The front model opens the View Look popup.
- Popup pins map to the matching product rows and reveal them.
- Escape closes the popup or active mobile size sheet and restores focus.
- Desktop pickers open inline; mobile pickers move into a bottom sheet.
- Adding a product gives clear loading, success and error feedback.
- Add full look asks for explicit sizes; never infer a size from a preselected radio.
- The local bag supports persistence, quantity limits, remove and shortlist export.

## Performance constraints
- Use requestAnimationFrame only while the ring is moving, the cursor is active or another animation needs it.
- Stop or pause work when the section is offscreen or the document is hidden.
- Animate transform and opacity rather than layout properties.
- Clean up timers, observers and event listeners on disconnect.
- Avoid permanent animation loops and duplicated event handlers after reattachment.

## Output
Provide an interaction state map, implementation notes and browser tests for every state transition.

## Acceptance
No control is decorative or inert. Navigation, drag/swipe, popup, pins, picker, bag and export all work with mouse, keyboard and touch as appropriate. Reduced motion skips nonessential movement and disables autoplay.
