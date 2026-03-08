# Spec: Agent Integration

**Feature:** agent-integration
**Station:** Implementation
**Skills:** `doc-writer`, `kb-writer`
**Depends on:** vision-agent-docs, kb-seed-vite-alias, screenshot-tool

---

## Overview

Create the Claude Code slash command that triggers a crawl session. This is the
entry point for the core value loop: research → screenshot → analyze → write.

---

## Deliverables

### D1: Crawl slash command

- **File:** `.claude/commands/crawl.md`
- **Contract:**
  - Prompt template that instructs Claude Code to execute the `kb-writer` workflow
  - Accepts a design problem as the `$ARGUMENTS` parameter
  - Steps encoded in the prompt:
    1. Parse the design problem from input (slug + title)
    2. Read existing KB entries under `packages/kb/examples/{problem-slug}/`
    3. Search the web for real-world examples of the design problem
    4. For each promising example:
       a. Capture screenshot: `pnpm screenshot <url> <output>`
       b. Analyze the screenshot and page
       c. Write `.md` + `.png` to KB following the Zod schema
    5. Cross-reference new entries with existing ones in prose body
    6. Report summary of what was added
  - References `AGENTS.md` for operational context
  - References `packages/viewer/src/content.config.ts` for schema
- **Acceptance criteria:**
  - [ ] File exists at `.claude/commands/crawl.md`
  - [ ] `/crawl mobile-navigation-patterns` in Claude Code triggers the workflow
  - [ ] Agent reads existing KB before searching
  - [ ] Agent uses `tools/screenshot.ts` for captures
  - [ ] Output files conform to Zod schema
  - [ ] New entries appear in viewer without restart (Astro hot reload)

---

## Verification

1. Open Claude Code in the repo
2. Run `/crawl "pricing table layouts"` (a problem not yet in the KB)
3. Verify:
   - New directory `packages/kb/examples/pricing-table-layouts/` created
   - At least one `.md` + `.png` pair written
   - Frontmatter passes schema validation
   - `pnpm --filter @swipe/viewer dev` shows the new problem on home page
