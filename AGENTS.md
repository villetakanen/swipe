# Swipe

Swipe is a local knowledge base of real-world UI/UX design examples. You (the agent) are the primary way new examples enter the KB.

## What This Project Is

A pnpm monorepo with two packages. `packages/kb` holds markdown files and screenshots organized by design problem. `packages/viewer` is an Astro site that renders the KB as a browsable local site. The screenshot tool at `tools/screenshot.ts` captures pages via Playwright.

## How You Work With It

When asked to research a design problem:

1. **Read the existing KB first.** Check `packages/kb/examples/` for related problems and examples. Your analysis should build on what's already captured — reference adjacent examples, note contrasts, avoid redundant observations.
2. **Search the web** for real-world examples of the design problem.
3. **Capture screenshots** using `tools/screenshot.ts`.
4. **Analyze each example** and write structured markdown (frontmatter + prose) and the screenshot into `packages/kb/examples/{problem-slug}/`.

The KB compounds. Later research is more valuable because it's informed by earlier research. Don't treat each crawl as isolated — connect it to what's already here.

## Key Constraint

Files are the interface. Write `.md` and `.png` files to `packages/kb/examples/`. The Astro viewer picks them up automatically via vite alias. No database, no API calls, no configuration changes needed.

Full vision and rationale: `docs/vision.md`
