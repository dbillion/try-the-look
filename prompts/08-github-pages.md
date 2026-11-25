# P08 — GitHub Pages Build, Deploy and Public Verification

## Goal
Publish the static site to GitHub Pages without touching the existing profile homepage repository.

## Repository and URL
- Repository: dbillion/try-the-look.
- Deployment URL: https://dbillion.github.io/try-the-look/.
- Branch: main.
- Deployment mechanism: GitHub Actions Pages artifact deployment.
- Build output: dist/.

Never push this project into dbillion/dbillion.github.io and never replace the profile homepage.

## Build requirements
- Build only index.html, style.css and app.js into dist/.
- Keep prompts, tests, reports, local Firecrawl captures, node_modules and development scripts out of the published artifact.
- Use relative stylesheet and script references so the project path works.
- Keep all source image URLs absolute at the original asset host.
- Do not create a CNAME unless the user explicitly supplies a custom domain.
- Do not store GitHub tokens or secrets in source files.

## Workflow requirements
- Trigger on push to main and manual workflow_dispatch.
- Run npm ci, browser installation, catalogue checks and Playwright tests.
- Build dist/ only after tests pass.
- Upload dist/ with the official GitHub Pages artifact action.
- Deploy with the official Pages deployment action.
- Use least-privilege permissions: contents read, pages write and id-token write.
- Keep deployment concurrency controlled.

## Verification after deployment
1. Wait for the GitHub Actions workflow to finish.
2. Check the Pages API for the deployed URL and status.
3. Request the public URL and confirm HTTP 200.
4. Load the public page in Chromium at desktop and mobile sizes.
5. Confirm title, custom element, six looks, images, CSS, JS and inline catalogue load.
6. Test next/previous, popup, picker, bag and mobile overflow on the deployed path.
7. Capture browser console and network errors.
8. Confirm the final URL is exactly https://dbillion.github.io/try-the-look/.

## Output
Report repository, branch, commit SHA, workflow run URL, Pages URL, deployment status, HTTP status, browser verification, tested viewports and any remaining asset-host dependency.

## Acceptance
A GitHub Actions green check is not sufficient by itself. Completion requires a publicly reachable page and verified browser behavior on the deployed project path.
