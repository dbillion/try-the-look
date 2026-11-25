# Prompt Pack — Try the Look / Runway

This is a modular Prompt[] set. Use the master prompt for end-to-end work, then attach only the focused modules needed for the current task.

## Recommended sequence

1. P00 Master — always include.
2. P01 Reference and source audit — before any fidelity or data changes.
3. P02 Visual system — for layout, typography and responsive styling.
4. P03 Motion and interactions — for carousel, pins, cursor, popup and picker behavior.
5. P04 Catalogue and commerce — whenever product data, sizes, variants, prices or bag logic are involved.
6. P05 Responsive and accessibility — for layout, keyboard, focus, screen-reader and reduced-motion work.
7. P06 Performance — before adding dependencies or changing image loading.
8. P07 QA and acceptance — before merging or release.
9. P08 GitHub Pages — for build, workflow, deployment and public verification.

## How to run

- Give P00 plus one or more focused prompts to an implementation agent.
- Include the current repository state and exact source files, not only a visual description.
- Require the agent to report which source evidence supports each proposed change.
- Keep the inline catalogue in index.html as the canonical product data.
- Run P07 before every push; run P08 only after the CI-equivalent tests pass.

## Prompt discipline

Each module has a goal, required inputs, non-negotiable constraints, outputs and acceptance criteria. Do not merge modules into one vague instruction. Do not ask a design agent to rewrite catalogue data or a coding agent to invent missing product details.
