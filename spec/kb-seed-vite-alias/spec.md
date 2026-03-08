# Spec: KB Seed + Vite Alias

**Feature:** kb-seed-vite-alias
**Station:** Implementation
**Skills:** `toolsmith`, `schema-designer`, `kb-writer`
**Depends on:** monorepo-foundation (viewer package exists with Astro)

---

## Overview

Create one seed KB entry so the viewer has data from the start, wire the vite
alias so the viewer can read KB content, and define the Zod content collection
schema that validates all KB entries.

---

## Deliverables

### D1: Seed example — markdown

- **File:** `packages/kb/examples/mobile-navigation-patterns/stripe-mobile-nav.md`
- **Contract:**
  - Frontmatter conforms to the Zod schema (D3)
  - All required fields populated with real, representative data
  - Prose body demonstrates cross-referencing style (even if no other entries exist yet)
  - Fields:
    ```yaml
    problem: "mobile-navigation-patterns"
    problemTitle: "Mobile Navigation Patterns"
    title: "Stripe Mobile Nav"
    url: "https://stripe.com"
    screenshot: "./stripe-mobile-nav.png"
    tags: ["hamburger", "slide-out"]
    design: { summary, layout, color, typography, interaction, strengths, weaknesses }
    technical: { summary, approach, frameworks, cssDetails, a11y, performance }
    crawledAt: <valid ISO date>
    ```
- **Acceptance criteria:**
  - [ ] File exists at the correct path
  - [ ] Frontmatter parses without Zod errors
  - [ ] All required fields present and non-empty

### D2: Seed example — screenshot

- **File:** `packages/kb/examples/mobile-navigation-patterns/stripe-mobile-nav.png`
- **Contract:**
  - Valid PNG image, 1280x800
  - Shows the Stripe mobile navigation UI
- **Acceptance criteria:**
  - [ ] File exists at the path referenced by D1's `screenshot` field
  - [ ] Valid PNG (file opens in an image viewer)

### D3: Zod content collection schema

- **File:** `packages/viewer/src/content.config.ts`
- **Contract:**
  - Defines an `examples` collection using Astro's `defineCollection`
  - Schema matches the frontmatter model from `docs/scaffolding.md` § Content Model
  - Uses `z.coerce.date()` for `crawledAt`
  - All design and technical sub-fields required
  - Loader configured to read from KB via the vite alias path
- **Acceptance criteria:**
  - [ ] Schema compiles without TypeScript errors
  - [ ] Seed example passes validation when Astro dev server starts
  - [ ] Missing required field in a test file triggers a Zod error

### D4: Vite alias in Astro config

- **File:** `packages/viewer/astro.config.mjs`
- **Contract:**
  - Vite resolve alias: `@swipe/kb` → `../../packages/kb/examples`
  - Content collection loader reads from the aliased path
- **Acceptance criteria:**
  - [ ] `pnpm --filter @swipe/viewer dev` starts without alias resolution errors
  - [ ] Content collection finds and parses the seed example

---

## Verification

1. `pnpm --filter @swipe/viewer dev` — starts without errors
2. Astro logs show the seed example parsed by content collection
3. No Zod validation warnings in console output
