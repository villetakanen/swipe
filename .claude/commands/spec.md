Review and update specs for: "$ARGUMENTS"

You are the spec-writer. Specs are the source of truth — living documents that code must fulfill.

## 1. Determine scope

The input may be:
- A **GitHub issue number** (e.g., "7") — find the relevant feature spec
- A **feature slug** (e.g., "screenshot-tool") — go directly to `spec/<slug>/spec.md`
- A **description** — identify which spec(s) are affected

If given an issue number, fetch it for context:
```
gh issue view <number> --json number,title,body,labels
```

## 2. Read codebase context

- Read `AGENTS.md` for project conventions
- Read `skills/spec-writer/SKILL.md` for spec format
- Read the existing spec at `spec/<feature-slug>/spec.md` if it exists
- Read source files in the affected area to understand current implementation

## 3. Evaluate the spec

A good spec has:
- **Overview**: what the feature does
- **Deliverables**: file paths, interface contracts, behavior
- **Acceptance criteria**: verifiable checkboxes
- **Dependencies**: what it depends on

Check for:
- Gaps between spec and current code (spec says one thing, code does another)
- Missing deliverables or acceptance criteria
- Stale references (renamed files, changed interfaces)

## 4. Update the spec

Update `spec/<feature-slug>/spec.md` with corrections. If no spec exists, create one following the format in `skills/spec-writer/SKILL.md`.

Rules:
- Specs describe contracts and criteria, not implementation tutorials
- Mark outdated sections as deprecated rather than deleting them
- One spec per feature domain, not per issue

## 5. Update the GitHub issue (if applicable)

If this was triggered by an issue, ensure the issue references the spec rather than duplicating it:
```
gh issue comment <number> --body "Spec updated: spec/<feature-slug>/spec.md"
```

## 6. Report

- Which spec was created or updated
- What changed and why
- Any gaps that need architect review
