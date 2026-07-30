# Competitor To Build Plan Reference

Use this reference when `/solvys-fully-yop` needs a detailed rubric for search, visual interpretation, Solvys reuse, open-source filtering, and implementation planning.

## Same-Level Competitor Rubric

A same-level competitor should match at least four of these:

- same user or buyer
- same job-to-be-done
- comparable product maturity
- comparable workflow depth
- comparable pricing or budget expectation
- comparable distribution channel
- comparable implementation complexity
- comparable trust, compliance, or data-sensitivity burden
- comparable team size or operating model

Classify competitors:

- `same-level`: useful for product scope and feature decisions
- `adjacent`: useful for one workflow or UI pattern
- `aspirational`: useful for platform direction, not near-term scope
- `rejected`: not relevant enough; keep reason and source

## Search Prompts

Use live web search for current competitors and UI evidence. Adjust terms to the target product.

Competitor discovery:

```text
"{job to be done}" "{target user}" software
"{feature}" "{industry}" platform
"{workflow}" "{buyer}" startup
"{feature}" "alternatives"
"{competitor}" competitors
site:g2.com "{category}"
site:producthunt.com "{category}"
site:github.com "{feature}" "{framework}" "MIT"
```

Visual/UI discovery:

```text
"{feature}" dashboard screenshots
"{workflow}" app UI
"{feature}" product tour
"{feature}" docs screenshots
"{feature}" admin console
"{feature}" mobile app screenshots
```

Open-source discovery:

```text
site:github.com "{feature}" "{framework}" "MIT"
site:github.com "{feature}" "{framework}" "Apache-2.0"
site:github.com "{feature}" "{framework}" "starter"
site:npmjs.com "{feature}" "{framework}"
```

## Feature Disassembly

For each feature, identify:

- user job
- primary objects and nouns
- data inputs and outputs
- state lifecycle
- permissions and roles
- human review or approval points
- empty, loading, error, and success states
- notifications or handoffs
- integrations
- admin/ops controls
- audit/provenance requirements
- monetization or packaging implication

## Visual Interpretation

Capture the product lesson without copying the product.

For each source, write:

- source URL and access date
- screenshot/video/page context
- layout pattern
- hierarchy pattern
- component pattern
- interaction pattern
- state model
- what Solvys should borrow as a principle
- what Solvys must not copy

Translate into the correct Solvys register:

- Fintheon current app for dense operational product UI
- Fintheon product page for public product marketing
- solvys.io or pricedinresearch.io for studio/research authority pages
- Solvys-1 for resident operations and admin flows
- HeirRight/HWRITE for lead review, dossier, evidence, and export flows
- SSFitness for public PWA and conversion flows

## Solvys Reuse Scan

Start with local repos when available:

- `/Users/tifos/Documents/Codebases/fintheon`
- `/Users/tifos/Documents/Codebases/Solvys-1`
- `/Users/tifos/Documents/Codebases/heir-right`
- `/Users/tifos/Documents/Codebases/solvys-skills`

Useful scan commands:

```bash
git status -sb
rg --files | rg "(components|routes|pages|app|src|services|hooks|lib|schemas|prompts|skills)"
rg -n "{feature keyword}|{domain noun}|{interaction}|{agent name}" .
rg -n "drawer|rail|composer|approval|provenance|dossier|export|review|admin|diagnostics" .
```

Classify reuse:

- `reuse as-is`: can call/import without product mismatch
- `adapt`: good primitive with copy/state/data changes
- `extract shared`: should become a shared Solvys primitive
- `pattern only`: useful structure, not reusable code
- `do not reuse`: incompatible, stale, or too product-specific

## Open-Source Criteria

Before recommending OSS, verify:

- license is permissive and compatible
- recent maintenance exists or the code is small enough to vendor safely
- dependency tree is acceptable
- framework/runtime matches the target repo
- accessibility and security posture are acceptable
- feature value exceeds integration cost
- it does not duplicate an existing Solvys primitive

Adoption levels:

- `dependency`: add package only with clear maintenance and security rationale
- `starter`: use as scaffold only when license permits and product fit is strong
- `reference`: read for architecture or patterns, do not import
- `reject`: explain why

## Build Plan Template

```markdown
## Opportunity

{Who gets what outcome and why now}

## Competitor Set

| Candidate | Class | Why It Matches | Source |
| --- | --- | --- | --- |

## Feature Inspiration Ledger

| Source | Feature | User Job | Borrow As Principle | Reject / Avoid |
| --- | --- | --- | --- | --- |

## Visual Interpretation Board

| Source | Observed UI | Solvys Translation | Surface |
| --- | --- | --- | --- |

## Solvys Reuse Matrix

| Repo | Candidate | Classification | Adaptation Needed | Risk |
| --- | --- | --- | --- | --- |

## Open-Source Candidates

| Repo/Package | License | Maintenance | Adoption Level | Risk |
| --- | --- | --- | --- | --- |

## Build Plan

1. {Phase with files, behavior, and validation}
2. {Phase with files, behavior, and validation}
3. {Phase with files, behavior, and validation}

## Validation

- {highest-reality proof for UI}
- {API/data proof}
- {test/build proof}
- {manual review proof}

## Boundaries

- {what not to copy}
- {what not to build yet}
- {dependency or product risks}
```
