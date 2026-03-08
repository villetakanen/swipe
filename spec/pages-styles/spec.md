# Spec: Pages + Styles

**Feature:** pages-styles
**Station:** Implementation
**Skills:** `frontend-dev`, `ux-critic`, `a11y-auditor`
**Depends on:** kb-seed-vite-alias (content collections and seed data must exist)

---

## Overview

Implement the three viewer route levels and the dark CSS theme. After this,
the seed example is browsable through the full navigation flow.

---

## Deliverables

### D1: Global CSS with dark theme

- **File:** `packages/viewer/src/styles/global.css`
- **Contract:**
  - CSS custom properties for colors, spacing, typography, radius
  - Dark theme as default (no light theme toggle in v1)
  - Tokens:
    ```css
    --color-bg, --color-surface, --color-text, --color-text-muted
    --color-accent, --color-border
    --space-xs, --space-sm, --space-md, --space-lg, --space-xl
    --radius
    --font-sans, --font-mono
    ```
  - Base reset (box-sizing, margin, font smoothing)
  - Responsive breakpoints via media queries (not container queries in v1)
- **Acceptance criteria:**
  - [ ] All tokens defined and used consistently across pages
  - [ ] Text contrast meets WCAG AA (4.5:1 for body text)
  - [ ] No hardcoded color/spacing values in page files

### D2: Base layout

- **File:** `packages/viewer/src/layouts/Base.astro`
- **Contract:**
  - HTML shell: `<!DOCTYPE html>`, `<html lang="en">`, charset, viewport meta
  - Imports `global.css`
  - `<header>` with site title linking to `/`
  - `<main>` slot for page content
  - Semantic landmarks: header, main, footer (if needed)
- **Acceptance criteria:**
  - [ ] Every page uses this layout
  - [ ] Heading hierarchy starts at h1 in layout or page (not both)
  - [ ] Responsive: no horizontal scroll at 320px

### D3: Home page

- **File:** `packages/viewer/src/pages/index.astro`
- **Contract:**
  - Query all examples from content collection
  - Group by `problem` field
  - Render one card per problem group:
    - Problem title
    - Example count (e.g., "3 examples")
    - Link to `/problems/{problem-slug}`
  - Card grid layout: responsive, 1 col mobile → 2-3 cols desktop
- **Acceptance criteria:**
  - [ ] Shows "Mobile Navigation Patterns" card from seed data
  - [ ] Card links to `/problems/mobile-navigation-patterns`
  - [ ] Example count is accurate
  - [ ] Grid adapts from mobile to desktop

### D4: Problem page

- **File:** `packages/viewer/src/pages/problems/[slug].astro`
- **Contract:**
  - `getStaticPaths` generates paths from unique `problem` values
  - Filter examples where `problem === slug`
  - Card grid with:
    - Screenshot thumbnail (constrained height, object-fit cover)
    - Example title
    - One-line design summary (`design.summary` truncated)
    - Link to `/problems/{slug}/{example-slug}`
  - Breadcrumb: Home > {Problem Title}
- **Acceptance criteria:**
  - [ ] `/problems/mobile-navigation-patterns` renders the seed example card
  - [ ] Screenshot thumbnail loads from KB via vite alias
  - [ ] Breadcrumb links back to home
  - [ ] Card links to example detail page

### D5: Example detail page

- **File:** `packages/viewer/src/pages/problems/[slug]/[example].astro`
- **Contract:**
  - `getStaticPaths` generates paths from all examples
  - Full-width screenshot (max-width constrained, not stretched)
  - Design analysis panel:
    - Summary, layout, color, typography, interaction
    - Strengths list, weaknesses list
  - Technical analysis panel:
    - Summary, approach, frameworks, CSS details, a11y, performance
  - Prose body rendered from markdown content
  - Breadcrumb: Home > {Problem Title} > {Example Title}
  - Source URL as external link
- **Acceptance criteria:**
  - [ ] `/problems/mobile-navigation-patterns/stripe-mobile-nav` renders fully
  - [ ] Screenshot displays at readable size
  - [ ] All design fields rendered
  - [ ] All technical fields rendered
  - [ ] Prose body rendered below analysis panels
  - [ ] Breadcrumb navigation works
  - [ ] Source URL opens in new tab

---

## Verification

1. `pnpm --filter @swipe/viewer dev` — starts without errors
2. Navigate: `/` → click problem card → click example card → full detail view
3. Navigate back via breadcrumbs at each level
4. Resize browser from 320px to 1280px — layouts adapt without overflow
5. Check color contrast with browser dev tools
