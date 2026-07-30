---
name: solvys-support-sprint
description: Linear support sprint triage for Solvys client incidents. Use to gather all open Linear support/client-incident tickets, group and prioritize them, create a sprint/cycle, and produce an orchestrated sprint pack with briefs. Twin of solvys-orchestrate, but starts from Linear incidents instead of a new feature prompt.
---

# Solvys Support Sprint

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.

## Solution Ownership And Linear Closure

- Identify the user's original problem before naming the work. Every plan, sprint, or brief must state `Original Problem`, `Solution`, and an outcome-owned `Objective`.
- Name the solution for the user-visible result, not the task or skill. Once the solution is clear, use the available thread-title tool to rename the conversation to that solution. If renaming is unavailable, put `Solution: {name}` in the first planning artifact and handoff.
- Write the objective as responsibility: `Deliver {solution} so {user} can {outcome}; the owner is responsible for proving behavior, controls, validation, and design compliance.`
- Before creating new sprint work, query the relevant Linear team or workspace for every issue in `Awaiting Review`. Treat that queue as standing planning scope and avoid creating duplicate issues or briefs.
- Classify each in-scope `Awaiting Review` issue as:
  - `verified complete`: review the implementation and evidence now; if the requested outcome works, validation passes, and every applicable control/design gate below passes, comment with evidence and move the issue to the team's completed state (`Complete`, `Completed`, or `Done`, preferring `Complete` when available);
  - `needs fix`: include it in the generated sprint with explicit ownership, file scope, acceptance gates, and its Linear identifier, then leave it reviewable until a later evidence pass;
  - `blocked or superseded`: record the blocker or canonical replacement and do not close it until no requested outcome remains.
- A written sprint or brief is a repair commitment, not completion evidence. On the next planning/review pass, reopen every carried issue, inspect the implementation and proof, then complete it only if the acceptance gates pass. A skill that is already reviewing finished work may complete it in the same pass after verification.
- Every applicable acceptance gate must prove:
  1. The named solution solves the user's original problem on the intended surface.
  2. Every button or control requested by the user or introduced by the plan works through real click/tap behavior, correct action, relevant loading/disabled/error states, and expected navigation or persistence.
  3. The shared and repo-local design canons were loaded before planning, the implementation does not violate them, and rendered proof at relevant desktop/mobile widths confirms compliance.
- State `Design impact: not applicable` for work with no UI, frontend, product, docs, or user-facing surface. Do not silently skip the design gate.
- If Linear access is blocked, write a blocked queue audit with the issue identifiers available from approved repo evidence; do not claim any status change.



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
6. Every Awaiting Review issue in the relevant team, including non-support
   tickets when they belong to the same product solution. Verify and complete
   finished work; route missing gates into the sprint instead of duplicating it.

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
- Every requested/planned button or control works through real interaction and applicable states.
- Shared and repo-local design canons pass rendered proof, or design impact is explicitly not applicable.
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
