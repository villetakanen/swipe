# Spec: Vision + Agent Docs

**Feature:** vision-agent-docs
**Station:** Implementation
**Skills:** `doc-writer`
**Depends on:** monorepo-foundation (docs/ directory exists)

---

## Overview

Create the project vision document and operational agent instructions.
These files establish the "why" for humans and the "how" for Claude Code.

---

## Deliverables

### D1: Vision document

- **File:** `docs/vision.md`
- **Contract:**
  - Content as defined in `docs/scaffolding.md` § docs/vision.md
  - Covers: problem, solution (KB + viewer), design principles
- **Acceptance criteria:**
  - [ ] File exists at `docs/vision.md`
  - [ ] Contains all sections from scaffolding doc's vision template

### D2: AGENTS.md

- **File:** `AGENTS.md` (repo root)
- **Contract:**
  - Content as defined in `docs/scaffolding.md` § AGENTS.md
  - Operational instructions: what the project is, how the agent works with it,
    key constraints
  - Under 200 lines
- **Acceptance criteria:**
  - [ ] File exists at repo root
  - [ ] Describes the two-package structure
  - [ ] Documents the crawl workflow (read KB → search → screenshot → write)
  - [ ] States the "files are the interface" constraint

### D3: CLAUDE.md symlink

- **File:** `CLAUDE.md` → `AGENTS.md`
- **Contract:**
  - Symbolic link, not a copy
- **Acceptance criteria:**
  - [ ] `readlink CLAUDE.md` outputs `AGENTS.md`
  - [ ] `cat CLAUDE.md` shows AGENTS.md content

---

## Verification

1. `cat docs/vision.md` — full vision content present
2. `cat AGENTS.md` — operational instructions present
3. `readlink CLAUDE.md` — resolves to `AGENTS.md`
