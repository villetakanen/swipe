# Scaffolding: Swipe

**Status:** Proposed

**Date:** 2026-03-08

---

## Vision

> Full version lives at `docs/vision.md`. This section is the summary.

### The Problem

UI/UX design research is manual and lossy. When you need to understand how others have solved a design problem — "how do real products display a list of book authors?", "what patterns exist for multi-step onboarding?" — the workflow looks like this: search the web, open a dozen tabs, squint at each site, take mental notes, close the tabs, lose the references. Nothing is captured. Nothing compounds. Every research session starts from zero.

### The Solution

Swipe is a local, self-contained knowledge base of real-world UI/UX design examples, paired with a lightweight viewer for browsing them. It has two parts.

**Part 1: The Knowledge Base.** A directory of markdown files and screenshots, organized by design problem. Each file captures one real-world example: where it was found, a screenshot, and structured analysis covering layout, color, typography, interaction patterns, technical approach, and accessibility. An AI agent (Claude Code) is the primary way new examples enter the KB. When researching a design problem, the agent reads what's already in the KB (the collection compounds — later analyses are informed by earlier ones and reference adjacent work), searches the web for real-world examples, captures screenshots via a headless browser, analyzes each example, and writes the results as markdown with co-located screenshots into the content directory. The output is plain files on disk — no database, no API, no running server.

**Part 2: The Viewer.** Because the KB contains screenshots and structured metadata alongside prose, a file browser or Obsidian doesn't give you a good way to compare examples visually. Astro in dev mode reads the markdown as content collections (with schema validation), renders them into a browsable local site, and picks up new files automatically. No build step, no deployment — `pnpm dev` and you're looking at your research.

### Design Principles

- **The KB compounds.** Every crawl session makes the collection more valuable, not just larger. The agent reads existing content before searching, so later analyses build on earlier ones.
- **Files are the interface.** The content directory is the source of truth. The viewer reads from it; the agent writes to it. No intermediate database, no sync process.
- **KB and viewer are separate concerns.** The knowledge base is portable data. The viewer is one way to consume it. Neither depends on the other's internals.
- **Minimal moving parts.** The agent handles orchestration. A screenshot helper handles browser automation. Astro handles rendering. Nothing else.
- **No deployment.** This runs locally. The viewer is `pnpm dev`. The agent is a Claude Code session. There's no server, no hosting, no CI pipeline.

---

## Output Files

This scaffolding doc produces the following files. Each is described in the relevant section below and listed here for reference.

| File | Purpose |
|---|---|
| `docs/vision.md` | Full project vision and rationale |
| `AGENTS.md` | Concise operational instructions for the agent |
| `CLAUDE.md` | Symlink → `AGENTS.md` (Claude Code reads this filename by convention) |

---

## docs/vision.md

```markdown
# Swipe — Vision

## The Problem

UI/UX design research is manual and lossy. When you need to understand how others have solved a design problem — "how do real products display a list of book authors?", "what patterns exist for multi-step onboarding?" — the workflow looks like this:

1. Search the web, open a dozen tabs.
2. Squint at each site, take mental notes.
3. Close the tabs, lose the references.
4. Repeat next time the same question comes up.

Nothing is captured. Nothing compounds. Every research session starts from zero.

## The Solution

Swipe is a local, self-contained knowledge base of real-world UI/UX design examples, paired with a lightweight viewer for browsing them.

It has two parts:

### Part 1: The Knowledge Base

The KB is a directory of markdown files and screenshots, organized by design problem. Each file captures one real-world example: where it was found, a screenshot of the relevant UI, and structured analysis covering layout, color, typography, interaction patterns, technical approach, and accessibility.

An AI agent (Claude Code) is the primary way new examples enter the KB. When you ask the agent to research a design problem, it:

- **Reads what's already in the KB.** The collection compounds over time. If the KB already has examples for "mobile navigation patterns" and you ask about "tab bar designs", the agent sees that adjacent work exists and can reference it, compare against it, or build on its findings. The KB is not a pile of isolated captures — it's a connected body of research that grows richer with each query.
- **Searches the web** for real-world examples of the design problem.
- **Captures screenshots** of each example using a headless browser.
- **Analyzes each example** to produce structured design and technical notes.
- **Writes the results** as markdown files with co-located screenshots into the content directory.

The output is plain files on disk. They work without any tooling — you can read them in a text editor, grep through them, or commit them to version control. The agent doesn't need a database, an API, or a running server to add to the KB.

### Part 2: The Viewer

Because the KB contains screenshots and structured metadata alongside prose, a file browser or a tool like Obsidian doesn't give you a good way to compare examples visually. You need to see the screenshots at a glance, scan the analysis panels side by side, and drill into detail when something catches your eye.

Astro in dev mode solves this with minimal overhead. It reads the markdown files as content collections (with schema validation), renders them into a browsable local site, and picks up new files automatically. There's no build step, no deployment, no infrastructure — `pnpm dev` and you're looking at your research.

The viewer has three levels:

- **Home** — a list of all design problems you've researched, shown as linked cards.
- **Problem view** — a card grid of all examples for a given problem, with screenshot thumbnails and one-line summaries.
- **Example view** — the full detail for one example: large screenshot, design analysis, technical analysis, and the prose body.

The KB and the viewer are separate packages in a monorepo. The agent writes files into the KB package. The viewer reads from it via a vite alias. This separation means the KB is portable — it's just files and folders with no framework dependency.

## Design Principles

**The KB compounds.** Every crawl session should make the collection more valuable, not just larger. The agent reads existing content before searching, so later analyses are informed by earlier ones.

**Files are the interface.** The content directory is the source of truth. The viewer reads from it; the agent writes to it. There's no intermediate database, no sync process, no import/export. If you delete a file, it's gone from the viewer. If you hand-edit a file, the viewer reflects the change.

**KB and viewer are separate concerns.** The knowledge base is portable data — markdown and images in a package with no build step and no framework dependency. The Astro viewer is one consumer of that data. Separating them means the KB doesn't break if the viewer changes, and other tools or scripts can read the KB directly.

**Minimal moving parts.** This is a personal research tool, not a product. The agent handles orchestration. The screenshot helper handles browser automation. The Astro site handles rendering. Nothing else.

**No deployment.** This runs locally. The viewer is `pnpm dev`. The agent is a Claude Code session. The Chromium instance for screenshots lives on your machine. There's no server, no hosting, no CI pipeline.
```

---

## AGENTS.md

`CLAUDE.md` is a symlink to this file. Claude Code reads `CLAUDE.md` by convention; the canonical name is `AGENTS.md` to stay tool-agnostic.

```markdown
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
```

---

## Context

We need a local tool for UI/UX design research. The workflow today is manual: search the web for how others solve a design problem, open tabs, take mental notes, lose the tabs. There's no structured way to capture, compare, and revisit real-world design solutions.

The tool should accept a UI/UX design problem as input (e.g. "mobile navigation patterns"), crawl the web for real examples, take screenshots, and produce structured analysis covering design aspects and technical implementation highlights. Results are browsable as a local site.

We want Claude Code as the orchestration harness — no custom CLI framework. Claude Code searches, screenshots, analyzes, and writes files. The only custom code is a small Playwright helper for the actual screenshot capture and the Astro site for viewing results.

### Forces

- **Agent-native:** Claude Code can search the web, run scripts, read images, and write files. Building a separate CLI would duplicate capabilities the agent already has.
- **Low ceremony:** This is a personal research tool, not a product. Minimal moving parts.
- **Browsable output:** Markdown files in a content directory are useful on their own, but a rendered site with screenshot thumbnails makes comparison much easier.
- **Monorepo separation:** The KB should be portable data, decoupled from the viewer framework. A pnpm workspace with vite aliases achieves this cleanly.
- **Astro + Svelte 5:** Chosen stack for the viewer. Astro's content collections provide schema validation on the markdown. Svelte only where client interactivity is actually needed.
- **Quality gates from day one:** Biome, Lefthook, Commitlint prevent drift even on a small project.

## Decision

### Stack

pnpm monorepo with two packages linked via vite aliases. TypeScript (strict) throughout. Playwright for headless screenshot capture. Quality tooling at the repo root: Biome (lint + format), Lefthook (git hooks), Commitlint (conventional commits).

- `packages/kb` — pure data. Markdown files, screenshots, and a package.json. No build step, no framework dependency.
- `packages/viewer` — Astro 5 with Svelte 5 integration. Owns the Zod content schemas. Reads from `@swipe/kb` via a vite alias that maps to the KB package's content directory.

### Two-mode architecture

The tool operates in two modes that share the KB package as their integration point:

**Crawl mode** — Claude Code is the orchestrator. No custom CLI. A `.claude/commands/crawl.md` slash command prompts Claude Code to:
1. Read existing content in `packages/kb/examples/` for related problems and examples
2. Search the web for real-world examples of the given design problem
3. For each found URL, invoke `tools/screenshot.ts` to capture a PNG
4. Analyze the screenshot and page to produce structured design + technical notes, referencing related existing examples where relevant
5. Write a `.md` file (structured frontmatter + prose body) and the `.png` into `packages/kb/examples/{problem-slug}/`

**View mode** — `pnpm --filter viewer dev` starts Astro. Three route levels:
- `/` lists design problems as linked cards (grouped from content)
- `/problems/[slug]` shows a card grid with screenshot thumbnails and summaries
- `/problems/[slug]/[example]` shows full detail: large screenshot, design analysis panel, technical analysis panel, prose body

### Content model

Each crawled example is a markdown file with a co-located screenshot:

```
packages/kb/examples/
  mobile-navigation-patterns/
    stripe-mobile-nav.md
    stripe-mobile-nav.png
```

Frontmatter schema (validated by Zod in the viewer's Astro content collection config):

```yaml
problem: "mobile-navigation-patterns"
problemTitle: "Mobile Navigation Patterns"
title: "Stripe Mobile Nav"
url: "https://stripe.com"
screenshot: "./stripe-mobile-nav.png"
tags: ["hamburger", "slide-out"]

design:
  summary: "..."
  layout: "..."
  color: "..."
  typography: "..."
  interaction: "..."
  strengths: ["..."]
  weaknesses: ["..."]

technical:
  summary: "..."
  approach: "..."
  frameworks: ["React", "Next.js"]
  cssDetails: "..."
  a11y: "..."
  performance: "..."

crawledAt: 2026-03-08T12:00:00Z
```

### File structure

```
swipe/
├── CLAUDE.md → AGENTS.md
├── AGENTS.md
├── docs/
│   └── vision.md
├── .claude/
│   └── commands/crawl.md
├── packages/
│   ├── kb/
│   │   ├── package.json           # name: @swipe/kb, no deps
│   │   └── examples/              # crawled data (md + png)
│   └── viewer/
│       ├── package.json           # name: @swipe/viewer
│       ├── astro.config.mjs
│       ├── src/
│       │   ├── content.config.ts  # Zod schema
│       │   ├── pages/
│       │   │   ├── index.astro
│       │   │   └── problems/
│       │   │       ├── [slug].astro
│       │   │       └── [slug]/[example].astro
│       │   └── styles/global.css
│       └── tsconfig.json
├── tools/
│   └── screenshot.ts              # Playwright helper
├── pnpm-workspace.yaml
├── biome.json
├── lefthook.yml
├── commitlint.config.js
├── tsconfig.json                  # root, project references
└── package.json                   # root, scripts + devDeps
```

### Screenshot tool

`tools/screenshot.ts` is a single-purpose script at the repo root. It takes a URL and an output file path as arguments, launches headless Chromium via Playwright, captures the viewport at 1280×800, writes the PNG, and exits. Claude Code invokes it with `npx tsx tools/screenshot.ts <url> <output>`.

### Vite alias wiring

The viewer's Astro config defines a vite alias so that `@swipe/kb` resolves to the KB package's `examples/` directory. Astro's content collections are configured to read from this path. This means the viewer has no file-path coupling to the KB's location — if the KB moves or the monorepo structure changes, only the alias needs updating.

### Styling

Plain CSS with CSS custom properties. Dark theme. No Tailwind, no CSS framework. Minimal and functional — cards, grid layouts, definition lists for the analysis panels.

### Seed data

One pre-crawled example ships with `packages/kb` so `pnpm --filter viewer dev` produces a working site immediately. This validates the full pipeline: vite alias wiring, content schema, image handling, all three route levels.

## Consequences

**Positive:**

- Zero custom orchestration code — Claude Code handles all crawl logic, reducing maintenance surface to the screenshot helper and the viewer.
- KB is a standalone package with no framework dependency. Portable, grep-able, version-controllable.
- Zod schema in the viewer catches malformed crawl output at dev/build time.
- Quality tooling is in place from the first commit — no retroactive cleanup.
- Seed data means the viewer works on first run, validating the entire pipeline including the vite alias.
- The KB compounds over time — later research builds on earlier research because the agent reads before it writes.
- Monorepo separation means the viewer can be replaced or supplemented without touching the KB.

**Negative:**

- Playwright pulls in Chromium (~250MB). Acceptable for a local dev tool.
- Relying on Claude Code for crawl means no reproducible/scriptable crawl — you can't `pnpm crawl "topic"` without an agent session.
- The content schema is opinionated. If analysis needs change, existing crawled content may need migration.
- No client-side interactivity in v1 — filtering, search, and comparison features would require Svelte islands later.
- Monorepo adds some upfront wiring (pnpm workspace, vite alias, Astro content collection pointing at external directory). Small cost, but more than a single-package setup.

**Neutral:**

- Crawled content can be either gitignored (ephemeral research) or committed (persistent library). This is a user choice, not an architectural one.
- Svelte 5 is available in the viewer but may go unused in v1 if all pages are statically rendered Astro templates.

## Alternatives Considered

### Custom CLI with Commander/Yargs

A `pnpm crawl "topic"` command that handles search, screenshot, and analysis via API calls. Rejected because it duplicates what Claude Code already does natively (web search, image analysis, file writing), adds a dependency on an external LLM API key for analysis, and requires building argument parsing and error handling for a single-user tool.

### Single-package Astro project

Content lives inside `src/content/` in the Astro project. Simpler initial setup, but couples the KB to the Astro directory structure. The KB becomes non-portable — moving to a different viewer or consuming the data from a script requires extracting files from the Astro project. The monorepo split is a small upfront cost for meaningful long-term flexibility.

### Next.js / SvelteKit instead of Astro

Both could serve the view layer. Rejected because this is a static content site with no server runtime needs. Astro's content collections with Zod validation are a direct fit for structured markdown. SSG output means zero runtime overhead.

### Storing analysis in JSON instead of Markdown frontmatter

Would separate structured data from prose. Rejected because Astro content collections natively parse YAML frontmatter into typed objects, co-locating structure and prose in one file is simpler to browse and edit, and it avoids syncing two files per example.

## Implementation Sequence

The scaffold should be built in this order, each step verifiable before moving to the next:

1. **Monorepo foundation** — root package.json, pnpm-workspace.yaml, tsconfig with project references, biome, lefthook, commitlint. `packages/kb/package.json` and `packages/viewer/package.json`. Verify: `pnpm install` succeeds, `pnpm --filter viewer dev` starts an empty Astro site.
2. **Vision + agent docs** — `docs/vision.md`, `AGENTS.md`, `CLAUDE.md` symlink. Verify: files exist and symlink resolves.
3. **KB seed + vite alias** — one seed example (md + png) in `packages/kb/examples/`. Vite alias in viewer's Astro config pointing at KB. Content collection config with Zod schema. Verify: Astro parses the collection without errors.
4. **Pages + styles** — three route levels in the viewer, dark CSS theme. Verify: seed example navigable through all three views.
5. **Screenshot tool** — `tools/screenshot.ts` using Playwright. Verify: `npx tsx tools/screenshot.ts https://example.com test.png` produces a PNG.
6. **Agent integration** — `.claude/commands/crawl.md`. Verify: `/crawl "some topic"` in Claude Code produces new content files in `packages/kb/examples/`.
