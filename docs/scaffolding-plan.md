# Scaffolding Plan

> PBI ordering for building the Swipe scaffold.
> Each PBI maps to a GitHub issue. Specs live in `/spec/[feature]/spec.md`.

---

## Dependency Graph

```
                ┌─────────────────────┐
                │  1. Monorepo        │
                │     Foundation      │
                └────┬───────┬───┬────┘
                     │       │   │
            ┌────────┘       │   └─────────┐
            ▼                ▼             ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │ 2. Vision +  │  │ 3. KB Seed + │  │ 4. Screenshot│
  │  Agent Docs  │  │  Vite Alias  │  │    Tool      │
  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
         │                 │                  │
         │                 ▼                  │
         │        ┌──────────────┐            │
         │        │ 5. Pages +   │            │
         │        │    Styles    │            │
         │        └──────┬───────┘            │
         │               │                   │
         └───────┬───────┘───────────────────┘
                 ▼
        ┌──────────────┐
        │ 6. Agent     │
        │  Integration │
        └──────────────┘
```

---

## PBI List

| # | PBI | Spec | Skill | Depends on | Est. |
|---|-----|------|-------|------------|------|
| 1 | Monorepo foundation | [spec](../spec/monorepo-foundation/spec.md) | `devops`, `toolsmith` | — | M |
| 2 | Vision + agent docs | [spec](../spec/vision-agent-docs/spec.md) | `doc-writer` | 1 | S |
| 3 | KB seed + vite alias | [spec](../spec/kb-seed-vite-alias/spec.md) | `toolsmith`, `schema-designer`, `kb-writer` | 1 | M |
| 4 | Screenshot tool | [spec](../spec/screenshot-tool/spec.md) | `toolsmith` | 1 | S |
| 5 | Pages + styles | [spec](../spec/pages-styles/spec.md) | `frontend-dev` | 3 | L |
| 6 | Agent integration | [spec](../spec/agent-integration/spec.md) | `doc-writer`, `kb-writer` | 2, 3, 4 | S |

Sizes: S = small (single session), M = medium (1-2 sessions), L = large (2-3 sessions)

---

## Execution Order

### Wave 1 — Foundation (serial, must complete first)

```
[1. Monorepo Foundation] ─────────────────────────▶ gate
```

Everything depends on the monorepo being set up. No parallelism possible.

**Gate:** `pnpm install` succeeds, `pnpm --filter @swipe/viewer dev` starts.

### Wave 2 — Parallel tracks (after Wave 1 gate)

```
[2. Vision + Agent Docs]  ─────▶ done
[3. KB Seed + Vite Alias] ─────▶ gate
[4. Screenshot Tool]      ─────▶ done
```

Three independent PBIs that can run in parallel:
- **PBI 2** has no downstream blockers for Wave 3 pages, but is needed for PBI 6
- **PBI 3** is the gate for PBI 5 (pages need content collections)
- **PBI 4** is independent of viewer work, needed for PBI 6

**Gate:** Astro parses KB seed data via vite alias without schema errors.

### Wave 3 — Viewer pages (after PBI 3 gate)

```
[5. Pages + Styles] ──────────────────────────────▶ gate
```

Depends on content collections (PBI 3) being wired. Serial — the five
deliverables within this PBI should be built in order:
1. Global CSS → 2. Base layout → 3. Home page → 4. Problem page → 5. Detail page

**Gate:** Seed example navigable through all three route levels.

### Wave 4 — Agent integration (after PBIs 2, 3, 4)

```
[6. Agent Integration] ───────────────────────────▶ done
```

Depends on:
- AGENTS.md (PBI 2) for operational context
- Content schema (PBI 3) for output format
- Screenshot tool (PBI 4) for captures

**Gate:** `/crawl` produces valid KB entries that appear in the viewer.

---

## Critical Path

```
1 → 3 → 5 → 6
```

The longest serial chain runs through monorepo → KB seed → pages → agent
integration. PBIs 2 and 4 are off the critical path and should not block
progress on 3 and 5.

---

## Risk Notes

- **PBI 3 (KB seed):** Seed screenshot requires either running the screenshot
  tool (PBI 4, which is parallel) or a manually captured PNG. To avoid blocking,
  include a pre-captured PNG in the seed data rather than depending on PBI 4.
- **PBI 5 (pages):** Largest PBI. If it blocks, the five deliverables can be
  merged incrementally (CSS first, then pages one at a time).
- **PBI 6 (agent integration):** Depends on three PBIs converging. If any
  delays, the crawl command can be drafted against mocked data and finalized
  after all deps land.
