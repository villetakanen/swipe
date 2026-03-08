Research the UI/UX design problem: "$ARGUMENTS"

Follow these steps precisely:

## 1. Understand the problem

Parse the design problem from the input. Derive:
- **problem-slug**: kebab-case identifier (e.g., "pricing-table-layouts")
- **problemTitle**: human-readable title (e.g., "Pricing Table Layouts")

## 2. Read the existing KB

Check `packages/kb/examples/` for related problems and examples. Read any files in `packages/kb/examples/{problem-slug}/` if the directory exists. Also scan adjacent problem directories for cross-reference opportunities. Your analysis should build on what's already captured.

## 3. Search the web

Search for real-world examples of this design problem. Look for well-known products, SaaS tools, and notable websites that implement this pattern. Aim for 3-5 diverse, high-quality examples.

## 4. Capture and analyze each example

For each promising example:

### a. Capture screenshot
```
npx tsx tools/screenshot.ts <url> packages/kb/examples/{problem-slug}/{example-slug}.png
```

### b. Analyze and write the KB entry

Create `packages/kb/examples/{problem-slug}/{example-slug}.md` with frontmatter conforming to the Zod schema in `packages/viewer/src/content.config.ts`:

```yaml
---
problem: "{problem-slug}"
problemTitle: "{Problem Title}"
title: "{Example Title}"
url: "{source-url}"
screenshot: "./{example-slug}.png"
tags: [relevant, tags]
design:
  summary: "One-sentence design overview"
  layout: "Layout description"
  color: "Color palette and usage"
  typography: "Font choices and hierarchy"
  interaction: "Interactive behaviors"
  strengths:
    - "Strength 1"
    - "Strength 2"
  weaknesses:
    - "Weakness 1"
technical:
  summary: "One-sentence technical overview"
  approach: "Architecture and implementation approach"
  frameworks: ["Framework1"]
  cssDetails: "CSS techniques used"
  a11y: "Accessibility features"
  performance: "Performance considerations"
crawledAt: {current ISO date}
---
```

Write 2-4 paragraphs of prose analysis below the frontmatter. Cross-reference other examples in this problem and adjacent problems in the KB where relevant.

## 5. Report

After all examples are written, list what was added:
- Number of new examples
- File paths created
- Any issues encountered (failed screenshots, inaccessible URLs)

Remind the user they can view the results with `pnpm dev`.
