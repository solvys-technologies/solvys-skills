# Linear Issue Candidates

This file is a parking lot only. Do not mutate Linear unless the user explicitly asks.

## Candidate Shapes

### Bookmark Ingestion Workflow

- Status: LINEAR ISSUE
- Scope:
  - import bookmark exports,
  - preserve provenance,
  - auto-bucket into Solvys planning statuses,
  - emit markdown output pack.
- Suggested owner: agent runtime or local Solvys automation
- Why it matters: keeps references from dying in chat history.

### Browserbase Planning Check

- Status: LINEAR ISSUE
- Scope:
  - whenever scraping, browser automation, or third-party workflow capture appears,
  - require an explicit Browserbase or browser-to-api feasibility check before custom implementation.
- Suggested owner: planning / discovery automation
- Why it matters: prevents missing off-the-shelf leverage.

### Skills Validation Queue

- Status: LINEAR ISSUE
- Scope:
  - validate Kappaemme complexity scan against one real codebase,
  - validate OfficeCLI document-editing workflow against one deterministic doc artifact,
  - record keep/adapt/pass outcomes.
- Suggested owner: local automation
- Why it matters: separates bookmark excitement from actual adoption proof.
