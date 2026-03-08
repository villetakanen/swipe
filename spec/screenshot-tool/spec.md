# Spec: Screenshot Tool

**Feature:** screenshot-tool
**Station:** Implementation
**Skills:** `toolsmith`
**Depends on:** monorepo-foundation (tools/ directory, tsx available)

---

## Overview

Single-purpose Playwright script that captures a webpage screenshot.
Used by the `kb-writer` skill during crawl sessions.

---

## Deliverables

### D1: Screenshot script

- **File:** `tools/screenshot.ts`
- **Contract:**
  - **Interface:** `npx tsx tools/screenshot.ts <url> <output-path>`
  - **Arguments:**
    - `url` (required) — full URL to capture
    - `output-path` (required) — file path for the output PNG
  - **Behavior:**
    1. Validate arguments (exit 1 with usage message if missing)
    2. Launch headless Chromium via Playwright
    3. Set viewport to 1280x800
    4. Navigate to URL, wait for `networkidle`
    5. Take full-page screenshot (viewport only, not scrollable area)
    6. Write PNG to output path (create parent directories if needed)
    7. Close browser
    8. Exit 0 on success
  - **Error handling:**
    - Missing args → exit 1, print usage to stderr
    - Navigation timeout (30s) → exit 1, print error to stderr
    - DNS/connection failure → exit 1, print error to stderr
    - No retry logic — caller decides
  - **Output:**
    - Success: nothing to stdout, PNG written to disk
    - Failure: error message to stderr, non-zero exit code
- **Acceptance criteria:**
  - [ ] `npx tsx tools/screenshot.ts https://example.com /tmp/test.png` produces a valid PNG
  - [ ] Output PNG is 1280x800
  - [ ] Invalid URL exits with code 1 and stderr message
  - [ ] Missing arguments exits with code 1 and usage message

### D2: Playwright dependency

- **File:** Root `package.json` (or `tools/package.json` if tools is a workspace package)
- **Contract:**
  - `playwright` added as devDependency
  - Chromium browser installed via `npx playwright install chromium`
- **Acceptance criteria:**
  - [ ] `pnpm install` resolves playwright
  - [ ] Chromium binary available for the script

---

## Verification

1. `npx tsx tools/screenshot.ts https://example.com /tmp/test.png` — produces PNG
2. `file /tmp/test.png` — reports PNG image data
3. Image dimensions are 1280x800
4. `npx tsx tools/screenshot.ts` (no args) — exits 1 with usage
5. `npx tsx tools/screenshot.ts https://nonexistent.invalid /tmp/fail.png` — exits 1 with error
