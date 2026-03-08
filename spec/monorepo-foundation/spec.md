# Spec: Monorepo Foundation

**Feature:** monorepo-foundation
**Station:** Implementation
**Skills:** `devops`, `toolsmith`
**Depends on:** nothing (first in sequence)

---

## Overview

Set up the pnpm monorepo with two packages, TypeScript project references,
and quality tooling. This is the foundation everything else builds on.

---

## Deliverables

### D1: Root package.json

- **File:** `package.json`
- **Contract:**
  - `private: true`
  - `type: "module"`
  - Scripts: `dev`, `lint`, `format`, `check`
  - devDependencies: `typescript`, `@biomejs/biome`, `lefthook`, `@commitlint/cli`, `@commitlint/config-conventional`
- **Acceptance criteria:**
  - [ ] `pnpm install` succeeds
  - [ ] `pnpm lint` runs Biome check
  - [ ] `pnpm format` runs Biome format --write
  - [ ] `pnpm dev` starts the viewer dev server

### D2: pnpm-workspace.yaml

- **File:** `pnpm-workspace.yaml`
- **Contract:**
  ```yaml
  packages:
    - "packages/*"
    - "tools"
  ```
- **Acceptance criteria:**
  - [ ] pnpm recognizes both packages
  - [ ] `pnpm --filter @swipe/viewer` resolves correctly

### D3: Root tsconfig.json

- **File:** `tsconfig.json`
- **Contract:**
  - `strict: true`
  - Project references to `packages/kb` and `packages/viewer`
  - Target: ES2022, module: ESNext, moduleResolution: bundler
- **Acceptance criteria:**
  - [ ] `tsc --build` succeeds (once packages have their tsconfigs)

### D4: Biome config

- **File:** `biome.json`
- **Contract:**
  - Formatter: indent with tabs or 2 spaces (align with Astro convention)
  - Linter: recommended rules enabled
  - Organizes imports
  - Ignores `node_modules`, `dist`, `.astro`
- **Acceptance criteria:**
  - [ ] `pnpm biome check .` runs without config errors
  - [ ] Catches intentional lint violations

### D5: Lefthook config

- **File:** `lefthook.yml`
- **Contract:**
  - `pre-commit`: run Biome check on staged files
  - `commit-msg`: run commitlint
- **Acceptance criteria:**
  - [ ] `lefthook install` succeeds
  - [ ] A commit with bad message is rejected
  - [ ] A commit with lint errors is rejected

### D6: Commitlint config

- **File:** `commitlint.config.js`
- **Contract:**
  - Extends `@commitlint/config-conventional`
- **Acceptance criteria:**
  - [ ] `echo "bad message" | pnpm commitlint` fails
  - [ ] `echo "feat: valid message" | pnpm commitlint` passes

### D7: KB package

- **File:** `packages/kb/package.json`
- **Contract:**
  - `name: "@swipe/kb"`
  - `private: true`
  - No dependencies
  - `packages/kb/tsconfig.json` extending root
- **Acceptance criteria:**
  - [ ] Package recognized by pnpm workspace
  - [ ] `packages/kb/examples/` directory exists (can be empty with `.gitkeep`)

### D8: Viewer package

- **Files:**
  - `packages/viewer/package.json`
  - `packages/viewer/tsconfig.json`
  - `packages/viewer/astro.config.mjs` (minimal, no vite alias yet)
  - `packages/viewer/src/pages/index.astro` (placeholder)
- **Contract:**
  - `name: "@swipe/viewer"`
  - `private: true`
  - Dependencies: `astro`, `@astrojs/svelte`, `svelte`
- **Acceptance criteria:**
  - [ ] `pnpm --filter @swipe/viewer dev` starts Astro dev server
  - [ ] Placeholder page renders at `http://localhost:4321/`

---

## Verification

Run in order:
1. `pnpm install` — succeeds, no peer dep errors
2. `pnpm lint` — runs without config errors
3. `pnpm --filter @swipe/viewer dev` — Astro starts, placeholder page loads
4. Make a commit with bad message — rejected by commitlint
5. Make a commit with lint error — rejected by Biome pre-commit hook
