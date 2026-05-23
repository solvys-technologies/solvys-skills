---
name: solvys-support-sprint
description: Linear support sprint triage for Solvys client incidents. Use to gather all open Linear support/client-incident tickets, group and prioritize them, create a sprint/cycle, and produce an orchestrated sprint pack with briefs. Twin of solvys-orchestrate, but starts from Linear incidents instead of a new feature prompt.
---

# Solvys Support Sprint

You turn Linear support chaos into an executable Solvys sprint.

This skill is a twin of `/solvys-orchestrate`, but the source of truth is existing Linear tickets: client incidents, support bugs, regressions, and operational failures.

## Goal

Create a sprint that:

- Triage all open relevant Linear support tickets.
- Groups duplicates and related failures.
- Prioritizes by client impact and support risk.
- Produces implementation tracks with clear file ownership.
- Creates or updates sprint/cycle issues in Linear.
- Writes local `sprint-md/` briefs when a repo is available.
- Ends with a unification/validation track.

## Phase 1 -- Linear Recon

Use Linear MCP when available. If unavailable, use repo scripts or direct GraphQL only if env is already present.

Query:

1. Teams: find `Solvys` unless the user specifies another team.
2. Statuses: open/backlog/todo/in progress/awaiting review/done.
3. Labels: `client-incident`, `support`, `bug`, app slug labels, severity labels.
4. Open issues matching:
   - labels above,
   - title/body containing `client incident`, `support`, app name, or affected client,
   - unresolved incidents linked from app support tables if available.
5. Existing active cycle/sprint to avoid duplicate planning.

Do not create anything until recon is summarized.

## Phase 2 -- Triage Rules

For every candidate issue, classify:

- Severity: critical/high/medium/low.
- Type: regression, integration failure, UX breakage, env/config, data/schema, deploy/update.
- Client impact: blocks use, degrades flow, admin-only, internal-only.
- Evidence: error, route, screenshot, stack, app incident id, repro notes.
- Duplicate cluster: same fingerprint/root cause.
- Likely ownership: frontend, backend/API, schema, integration, deploy/update, support tooling.

Merge duplicates by choosing one canonical issue and linking/commenting the others.

## Phase 3 -- Sprint Shape

Build a sprint with:

- T1..Tn implementation tracks grouped by root cause and file ownership.
- Final unification/validation track.
- ORCH issue summarizing clusters and wave order.

Default tracks:

- T1: critical blockers and integration failures.
- T2: admin/client UI recovery and health visibility.
- T3: schema/env/deploy/update path fixes.
- T4: dedupe/observability/support tooling polish.
- Tn: unification, smoke, deploy, and client update records.

Keep waves to 4 tracks or fewer. Do not assign the same file to multiple tracks.

## Phase 4 -- Linear Sprint Pack

Create or update:

- ORCH issue: `S{SPRINT}-ORCH: Support sprint - {client/app}`
- Track issues: `S{SPRINT}-T{N}: {title}`
- Final issue: `S{SPRINT}-T{N}: Unification, support smoke, and client update`

Each issue must include:

- Linked original support issues.
- Repro/evidence summary.
- Acceptance criteria.
- Validation commands.
- `@sprint-md/...` brief path when repo is available.
- Dependencies/blockers.

Move new issues to Todo/Backlog unless the user explicitly dispatches them. The final unification issue is blocked by every implementation track.

## Phase 5 -- Local Briefs

If in a repo, write:

- `sprint-md/S{SPRINT}-ORCHESTRATION.md`
- `sprint-md/S{SPRINT}-T{N}-{slug}.md` per track

Use the `/solvys-orchestrate` turnkey brief structure, plus a support-specific section:

```markdown
## Source Support Tickets

- LIN-123 -- title -- severity -- root-cause cluster

## Client Impact

Who is affected, what flow breaks, and how the fix will be verified.

## Support Acceptance

- Incident no longer reproduces.
- Existing support smoke passes.
- Linear source issues get a completion comment.
- Client update record is published if the app has support sync.
```

If no repo is available, keep the sprint pack entirely in Linear and state that local briefs are pending.

## Validation

Every support sprint must include:

- Existing build/typecheck/test gates.
- The app's support smoke command if present.
- Manual/browser repro for at least one issue per root-cause cluster.
- Verification that source Linear issues are linked/commented.
- Verification that `app_update_records` or equivalent client update path is populated for completed client incidents.

## Output

After creating the sprint pack, output only:

```text
### Wave 1
@sprint-md/S{SPRINT}-T1-...
@sprint-md/S{SPRINT}-T2-...

### Wave 2
@sprint-md/S{SPRINT}-T3-unification-...
```

Then a short debrief:

- clusters covered,
- source issue count,
- live blockers,
- validation gate.

## Guardrails

- Do not implement track fixes while running this skill.
- Do not close original support tickets until unification passes.
- Do not mark tickets done without smoke evidence.
- Preserve client-facing dignity in comments; describe failures clinically, not emotionally.
