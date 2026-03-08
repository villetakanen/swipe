# Swipe — Agent Factory

> Skills and personas for building Swipe with Claude Code,
> following the [ASDLC.io](https://asdlc.io) factory architecture.

## Operating Model

Swipe runs at **L3 Conditional Autonomy**: the human (Instructor) defines
intent and constraints; Claude Code (Agent) executes within those boundaries.
Work flows through discrete factory stations, each served by one or more
specialized skills that activate on demand.

```
Mission ──▶ Planning ──▶ Spec ──▶ Implementation ──▶ Review ──▶ Ship
  │            │          │            │                │
  └── Instructor sets intent & constraints at every gate ──┘
```

---

## Skills

Each skill below follows the ASDLC Agent Skills convention: a persona with
scoped procedural knowledge, activated only when a matching task arises.
Skills are grouped by factory station, then by cross-cutting concern.

### Station 1 — Planning

#### `architect`

| Field | Value |
|-------|-------|
| **Persona** | Software Architect |
| **Autonomy** | L3 — proposes; Instructor approves |
| **Trigger** | New feature, structural change, technology decision |
| **Responsibilities** | Evaluate trade-offs, write ADRs, define package boundaries, maintain the monorepo dependency graph |
| **Artifacts** | `docs/adr/NNN-*.md`, updated `docs/scaffolding.md` |
| **Context needs** | `docs/scaffolding.md`, `pnpm-workspace.yaml`, `tsconfig.json` |

#### `product-analyst`

| Field | Value |
|-------|-------|
| **Persona** | Product Analyst / Problem Definer |
| **Autonomy** | L3 |
| **Trigger** | New design-problem category, KB taxonomy change, feature request |
| **Responsibilities** | Translate user needs into structured problem definitions, maintain the problem taxonomy, identify gaps in KB coverage |
| **Artifacts** | Problem briefs, updated taxonomy docs |
| **Context needs** | Existing `packages/kb/examples/` directory structure, `docs/scaffolding.md` |

---

### Station 2 — Spec Definition

#### `spec-writer`

| Field | Value |
|-------|-------|
| **Persona** | Specification Author |
| **Autonomy** | L3 |
| **Trigger** | Approved plan needs a concrete spec before implementation |
| **Responsibilities** | Turn architecture decisions into implementation specs: file paths, Zod schemas, component contracts, route definitions, CSS custom-property tokens |
| **Artifacts** | Spec documents or inline task descriptions with acceptance criteria |
| **Context needs** | ADRs, `docs/scaffolding.md`, existing source files for the target package |

#### `schema-designer`

| Field | Value |
|-------|-------|
| **Persona** | Content Schema Designer |
| **Autonomy** | L3 |
| **Trigger** | KB frontmatter model change, new content-collection type, Zod schema update |
| **Responsibilities** | Design and evolve the Zod content-collection schemas, ensure backwards compatibility with existing KB entries, validate frontmatter contracts |
| **Artifacts** | Updated schema files in `packages/viewer/src/`, migration notes |
| **Context needs** | Current Zod schemas, sample `.md` files from `packages/kb/examples/` |

---

### Station 3 — Implementation

#### `frontend-dev`

| Field | Value |
|-------|-------|
| **Persona** | Astro + Svelte Frontend Developer |
| **Autonomy** | L3 |
| **Trigger** | Viewer pages, components, layouts, or styles need creation/modification |
| **Responsibilities** | Implement Astro pages and Svelte 5 components, write plain CSS with custom properties (dark theme, no Tailwind), wire content collections, ensure responsive layouts |
| **Artifacts** | Files under `packages/viewer/src/` |
| **Context needs** | `astro.config.mjs`, existing pages/components, `docs/scaffolding.md` content model |
| **Constraints** | No client-side JS unless explicitly approved; Astro static-first; CSS custom properties only |

#### `toolsmith`

| Field | Value |
|-------|-------|
| **Persona** | Developer Tools & Scripts Engineer |
| **Autonomy** | L3 |
| **Trigger** | Screenshot tool, build scripts, dev-server config, monorepo plumbing |
| **Responsibilities** | Implement and maintain `tools/screenshot.ts` (Playwright), vite aliases, pnpm workspace config, TypeScript project references |
| **Artifacts** | Files under `tools/`, root config files |
| **Context needs** | `pnpm-workspace.yaml`, `tsconfig.json`, Playwright docs |

#### `kb-writer`

| Field | Value |
|-------|-------|
| **Persona** | Knowledge Base Content Author |
| **Autonomy** | L3 |
| **Trigger** | New design example needs to be crawled, analyzed, and written to KB |
| **Responsibilities** | Research real-world UI/UX examples, capture screenshots via the screenshot tool, perform structured design + technical analysis, write frontmatter-rich markdown conforming to the Zod schema |
| **Artifacts** | `packages/kb/examples/{problem-slug}/{example-slug}.md` + `.png` |
| **Context needs** | Existing KB entries for the same problem slug (compound research), schema definition, `tools/screenshot.ts` |
| **Notes** | This is the crawl-mode persona — the core value loop of Swipe |

---

### Station 4 — Review & Quality

#### `code-reviewer`

| Field | Value |
|-------|-------|
| **Persona** | Code Reviewer |
| **Autonomy** | L3 |
| **Trigger** | Implementation complete, before merge |
| **Responsibilities** | Review for correctness, adherence to project conventions (Biome, strict TS, conventional commits), security (no secrets, no injection), and simplicity |
| **Artifacts** | Review comments, requested changes |
| **Context needs** | `biome.json`, `tsconfig.json`, `commitlint.config.js`, diff of changes |

#### `qa-engineer`

| Field | Value |
|-------|-------|
| **Persona** | Quality Assurance Engineer |
| **Autonomy** | L3 |
| **Trigger** | New feature or bug fix needs validation |
| **Responsibilities** | Verify viewer renders correctly, KB entries pass schema validation, screenshot tool produces valid output, content collections load without errors |
| **Artifacts** | Test results, bug reports |
| **Context needs** | Running dev server, sample KB entries |

---

### Cross-Cutting Skills

These activate alongside any station when their domain is relevant.

#### `ux-critic`

| Field | Value |
|-------|-------|
| **Persona** | UI/UX Design Critic |
| **Autonomy** | L2 — advisory only |
| **Trigger** | Viewer layout decisions, CSS changes, information architecture updates |
| **Responsibilities** | Evaluate the viewer's own UX: card layouts, typography scale, color contrast, responsive breakpoints, navigation flow. Swipe is a design tool — it should exemplify good design. |
| **Artifacts** | Design feedback, suggested CSS adjustments |
| **Context needs** | Current CSS custom properties, page screenshots |

#### `a11y-auditor`

| Field | Value |
|-------|-------|
| **Persona** | Accessibility Auditor |
| **Autonomy** | L2 — advisory |
| **Trigger** | New pages/components, color/typography changes |
| **Responsibilities** | Check semantic HTML, ARIA attributes, color contrast ratios, keyboard navigation, screen-reader compatibility |
| **Artifacts** | Accessibility findings with WCAG 2.1 AA references |
| **Context needs** | Rendered HTML output, CSS custom properties |

#### `devops`

| Field | Value |
|-------|-------|
| **Persona** | DevOps / DX Engineer |
| **Autonomy** | L3 |
| **Trigger** | Lefthook config, Biome rules, CI setup, monorepo dependency issues |
| **Responsibilities** | Maintain developer experience: git hooks, linting, formatting, commit conventions, workspace linking, TypeScript build graph |
| **Artifacts** | `lefthook.yml`, `biome.json`, `commitlint.config.js`, root `package.json` scripts |
| **Context needs** | All root config files |

#### `doc-writer`

| Field | Value |
|-------|-------|
| **Persona** | Documentation Author |
| **Autonomy** | L3 |
| **Trigger** | New feature shipped, AGENTS.md needs update, crawl command instructions change |
| **Responsibilities** | Keep `AGENTS.md`, `docs/` content, and `.claude/commands/crawl.md` accurate and current |
| **Artifacts** | Updated documentation files |
| **Context needs** | Current docs, recent changes |

---

## Skill Activation Matrix

| Task | Primary Skill | Supporting Skills |
|------|--------------|-------------------|
| Add new viewer page | `frontend-dev` | `ux-critic`, `a11y-auditor` |
| Crawl design examples | `kb-writer` | `schema-designer` |
| Change KB schema | `schema-designer` | `spec-writer`, `kb-writer` |
| Add screenshot features | `toolsmith` | `code-reviewer` |
| Set up monorepo tooling | `devops` | `toolsmith` |
| New design-problem category | `product-analyst` | `kb-writer`, `doc-writer` |
| Structural refactor | `architect` | `spec-writer`, `code-reviewer` |
| Pre-merge review | `code-reviewer` | `qa-engineer`, `a11y-auditor` |

---

## Progressive Disclosure

Following the ASDLC token-efficiency model:

1. **Discovery** — Only skill names and one-line descriptions load into base
   context (via `AGENTS.md`)
2. **Activation** — Full persona instructions load when the Instructor invokes
   a matching task (e.g., `/crawl` activates `kb-writer`)
3. **Execution** — Reference files, schemas, and existing KB entries load on
   demand during the task

---

## Governance

- **Every gate is human-approved.** No skill auto-merges or auto-deploys.
- **Compound knowledge.** The `kb-writer` skill explicitly reads prior KB
  entries so later analyses build on earlier ones.
- **Schema as contract.** Zod validation is the automated gate between
  `kb-writer` output and `frontend-dev` consumption.
- **Conventional commits enforced.** Commitlint + Lefthook ensure every commit
  follows the project's commit convention regardless of which skill produced it.
