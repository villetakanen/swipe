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
