---
name: solvys-run-point
description: Use when setting up or auditing a Solvys project where a local control session runs point across multiple days using Linear, visible Luna sessions, repository-backed Cloud Tasks, and Codex-browser review. Trigger for /solvys-run-point, project point-guard setup, milestone-gated execution plans, daily planning, or converting sprint docs into a low-friction human-testing workflow.
---

# Solvys Run Point

## Refresh System Contract

Read `/solvys-cao/references/refresh-system.md`. The run-point keeps planning as
the local control plane and dispatches repository implementation only to a
repository-backed Codex Cloud environment/worktree by default. A projectless ChatGPT Work
VM remains non-repository research/artifact-only. Research and proof use the
Codex in-app browser and Plannotator when needed; no separate research or proof
skill is dispatched.
Every project/sprint uses searchable identity `S### - concise context`, a
date-only `YYYY-MM-DD` integration branch, and exact task-owned
root `refs/sprints/S###/P#` preservation/sprint checkpoints or
`refs/sprints/S###/T#/P#` tranche/track checkpoints.

The run-point never calls sub-agents. It may open separate visible Codex
sessions on the configured Luna model for independent planning or review, with
one local control/integration owner. Repository implementation uses Solvys Cloud
Tasks; the local integrator fetches and verifies each accepted checkpoint before
review or deployment.

`Implement this plan` freezes the accepted plan revision. The run-point
dispatches the frozen tracks and may not reinterpret scope or let a planning
task self-assign implementation. The originating planning task cannot
implement, and a missing or incomplete Cloud Pickup block fails dispatch. The
command must create or assign the task-owned Cloud worktree and return its
environment, checkout, and authenticated Git publication receipt; a local
target, projectless target, connector-read-only preflight, or mere Cloud
recommendation is not dispatch.

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

## Execution, Storage, Conversation, And Site Contract

- Read `/solvys-cao`, `refresh-system.md`, and
  `storage-and-execution-lanes.md` before configuring an automation.
  All repository implementation defaults to Cloud. Ext is recovery-only and
  cannot create a local implementation exception.
- Preserve the machine custody boundary: Ext stays recovery-only, personal
  media remains outside Solvys authority unless TP explicitly selects it, and
  code uses remote Git plus bounded dirty-overlay preservation. A readable Ext
  volume is not a full-volume backup, repair, erase, or migration trigger.
- One sprint tranche keeps one registered workspace across task/session changes. Record its path, peak-storage estimate, reservation, protected zone, proof target, exit condition, and closure receipt. Never manually delete an opened worktree.
- At ten days, refresh an automation-bound task into its canonical automation task, retarget the automation, and pin that canonical task before archiving any predecessor. A non-automation task becomes archive-eligible only after explicit memory flush and reference checks.
- Every new feature design, frontend surface, screen, state, flow,
  responsive/mobile review, and UI prototype has a project-owned ChatGPT Site.
  Use the Site URL in the Codex in-app browser for implementation checks. When
  visual or content review is needed, automatically open a Site-derived local
  HTML artifact with `human-review`, apply returned feedback to source, and
  refresh the Site.
- Wonder owns new frontend proposals and their diffs before Site deployment.
  Existing Builder and Plasmic artifacts stay protected legacy inputs unless TP
  explicitly selects a source transfer. Preserve user edits and
  annotations in those inputs.
- Frontend work uses this hierarchy: BeUI Pro with BeUI fallback;
  Motionary.dev with ascertainty UI fallback; Bklit for data visualization with
  EvilCharts fallback. Verify and install the eligible source before
  implementation. Do not design a generic component or block until every
  applicable source has been searched and found not to fit. Record a no-fit
  exception before custom work.

## Overview

Use this skill to turn a project from "lots of briefs and possible agents" into a run-point system: one grounded planning thread, one Linear project structure, one automation cadence, milestone-only human testing, and clear daily agent execution rules.

## Mandatory Planning Contract

Every `/solvys-run-point` invocation plans a **Solvys Cloud Task project** with
visible Luna planning/review sessions unless TP explicitly says otherwise.

Default execution contract:

- The local control session runs point daily and keeps the accepted plan and
  integration receipt.
- The run-point may prepare **two full sprints per day** until the job is
  complete when both sprints have safe scope and proof gates.
- A sprint is the unit of work. Do not recast the project into smaller
  terminology that makes the runner think one subtask is enough.
- The runner must not stop after one sprint if a second safe sprint can be implemented, verified, or concretely blocked in the same run.
- The only human-facing integration branch is `YYYY-MM-DD`. Automation must not
  create version, feature, recovery, product, incident, prose, agent, runtime,
  or other contextual branches.
- Parallel automation work uses registered detached Cloud worktrees or exact
  task-owned checkpoint refs. The daily integrator assembles accepted
  checkpoints onto the date branch.
- For any new Solvys project with frontend work, the run-point plan must record
  the approved UI-library sources before frontend files are touched. Agents use
  generic library blocks and leave palette, effects, and polish to TP.
- Milestone 1 cannot be considered ready for a greenfield frontend until it
  includes the approved component list, project ChatGPT Site record,
  source-to-Site publication path, installed library receipts, and `Design.md`
  reconciliation.
- Every frontend Site in the run-point record must be a 1:1 runnable
  representation of the accepted source or product specification. Record the
  fidelity target, route/state map, real-control checklist, viewport record,
  fixture provenance, and interaction receipt. Placeholder or fake product
  behavior blocks the milestone.
- The project plan uses exactly these top-level milestone gates by default:
  1. **FULLY FUNCTIONAL PRD** - all product requirements, repo truth, source docs, architecture decisions, implementation sprint map, validation commands, and known blockers are captured well enough that agents can execute without rediscovery.
  2. **FULL-APP HUMAN-PRACTICAL TESTING** - human-practical testing is planned as its **own sprints**, not as a vague checklist. Any fixes found during those testing sprints are routed back into the individual implementation sprints that own the broken behavior.
  3. **UX AND PRODUCT LOOP HUMAN REVIEW** - the actual human review of end-to-end UX, product loop, readiness, and remaining judgment calls happens after full-app practical testing has produced evidence.

## PL0-PL5 project system

Use these six planning levels as the child-simple build sequence. A level is a
gate, not a new skill, and the next level cannot assume missing evidence.

- **PL0 - Problem and outcome:** record the original problem, user, scope,
  desired result, success signal, and explicit exclusions.
- **PL1 - Approved foundation:** inspect repo truth, the proven backend stack,
  the Paste OSS/UI-library ledgers, licenses, maintenance, security, the
  project ChatGPT Site record, source-to-Site publication path, and installation
  receipts. Record reuse before any new dependency or component.
- **PL2 - Contracts and ownership:** define data, API, state, auth,
  permissions, integrations, owner, protected zones, date branch, checkpoint
  refs, proof gates, budget, and return path.
- **PL3 - Cloud build:** dispatch a repository-backed Cloud Task with the exact
  pickup block, implement the smallest change from the accepted ref, run the
  required checks, and publish the task-owned checkpoint receipt.
- **PL4 - Local integration and review:** fetch the accepted Cloud checkpoint
  into the date-branch integrator, verify the SHA and changed files, run tests,
  Codex-browser proof, Plannotator review, and human-practical checks when
  applicable. Route fixes back to the owning Cloud task.
- **PL5 - Release and handoff:** deploy only from the accepted local readback,
  run live or installed checks at the requested truth rung, record receipts and
  remaining blockers, and promote durable learning to the correct repo, memory,
  design, or skill layer.

The default milestone mapping is PL0-PL2 for FULLY FUNCTIONAL PRD, PL4 for
FULL-APP HUMAN-PRACTICAL TESTING and UX review, and PL5 for release and handoff.

If a project has existing milestone names, preserve local names only when they map cleanly to these gates. Otherwise, add this contract as the controlling run-point structure.

## Workflow

1. Ground the workspace.
   - Confirm the repo/root, branch, dirty files, docs, briefs, test commands, and active deployment/runtime assumptions.
   - Inspect existing Linear teams, projects, statuses, labels, milestones, issues, and assignees before creating anything.
   - Query every relevant Awaiting Review issue. Complete only those whose implementation, validation, control behavior, and design evidence pass; route the rest into the next two-sprint batch.
   - Inspect existing run-point or Cloud Task dispatch records before creating a duplicate.
   - Preserve unrelated dirty work and historical completed projects.

2. Resolve project decisions before mutation.
   - Confirm the active project name, historical project boundary, preferred agent/worker name, CRM/system-of-record decision, automation schedule/timezone, milestone names/dates, human assignee, and live-write/outreach boundaries.
   - If this is a new project with any frontend surface, confirm the approved
     UI-library source list, project ChatGPT Site URL, source-to-Site
     publication path, installation receipts, and user-owned theme boundary
     before creating implementation tickets.
   - Default the automation cadence to two full sprints per day. If a different cadence is required, record who chose it and why.
   - Default the milestone gates to FULLY FUNCTIONAL PRD, FULL-APP HUMAN-PRACTICAL TESTING, and UX AND PRODUCT LOOP HUMAN REVIEW.
   - If a variable is discoverable from repo docs or Linear, discover it. If it is not discoverable and risky, ask the smallest possible question or mark it as an open variable in the plan.
   - Use the user's exact chosen terminology. Do not invent or preserve stale agent/tool names.

3. Convert work into milestone gates.
   - Keep granular implementation tickets for execution, but group them under
     full sprints that the local control session can dispatch two per day.
   - Milestone 1 ends only when the PRD is fully functional: source-backed, implementation-ready, acceptance-testable, and current with repo reality.
   - For greenfield frontend projects, Milestone 1 also requires the approved
     component list, project ChatGPT Site record, library installation receipts,
     and `Design.md` reconciliation;
     implementation sprints that touch frontend remain blocked until that
     evidence is present.
   - Milestone 2 contains full-app human-practical testing as its own sprints. These testing sprints must exercise the whole app or product flow in realistic human terms.
   - Fixes discovered in Milestone 2 testing are assigned back to the implementation sprint that owns the broken behavior, with evidence and validation commands.
   - Milestone 3 is the actual human review of UX and product loop, not a substitute for full-app testing.
   - Human testing tickets belong at milestone gates and Milestone 2 testing sprints, unless a blocker needs credentials, approval, legal/compliance review, live-write approval, or explicit client acceptance.
   - Define which daily two-sprint automation batches roll into each milestone and what evidence proves the gate.

4. Update Linear.
   - Prefer updating an active project over reopening a completed historical delivery project.
   - Use local team statuses/labels that already exist unless a missing label is genuinely needed.
   - Issue descriptions should include: milestone, brief path, owner, execution path, validation commands, dependencies, and live-action guardrails.
   - Use owners such as Solvys Cloud Task, TP/Sam, or human reviewer; assign
     human-only issues to the configured human assignee.

5. Set up the Cloud Task run point.
   - Create or update one daily run-point record with a self-contained dispatch prompt.
   - Include project root, Linear workspace/team/project, active milestone, execution method, smoke-test commands, design/UI audit requirement, and human assignment rule.
   - The dispatch prompt may take on two full sprints per day until completion
     when the second sprint is safe and independently provable.
   - The dispatch prompt must state that new-project frontend work starts from
     the approved UI-library list, verified installations, and the project
     ChatGPT Site record; TP owns the palette, effects, and polish. It must use
     the Site for checks and automatically open `human-review` on a Site-derived
     local HTML artifact when visual or content review is needed.
   - The dispatch prompt must require a 1:1 runnable Site prototype at the
     accepted scope, with real controls and states, responsive and accessibility
     checks, fixture provenance, and a Site interaction receipt.
   - The dispatch prompt must require the date-only integration branch,
     task-owned checkpoint refs, and registered detached Cloud worktrees.
   - The dispatch prompt must name the three default milestone gates and the
     first active milestone.
   - The dispatch prompt must tell the runner not to stop after one sprint
     unless the second sprint is concretely blocked.
   - First run should be dry-run or supervised unless the user explicitly approves unsupervised live execution.
   - Keep the dispatch receipt in the accepted plan or run-point record; do not
     hand-write raw schedule directives in the user-facing answer.

6. Define Codex-browser review execution.
   - Use the Codex in-app browser when browser interaction or proof is required.
   - Launch only the accepted plan or review surface in a Codex-browser tab and
     keep the browser receipt tied to the local integration checkpoint.
   - Start new work only after previous-day review, smoke gates, regression fixes, and UI audit pass.
   - Keep visible Luna sessions aligned to the selected sprints; do not call
     sub-agents or scatter work into unrelated one-off tasks.
   - Record Cloud receipts, update Linear when authorized, and route blockers.

7. Validate and report.
   - Run docs/name sweeps requested by the project.
   - Run repo build/test/smoke commands when feasible.
   - Validate the skill or automation artifacts if they were changed.
   - Check Linear for active project, milestones, issue coverage, dependencies, and milestone-only human testing tickets.
   - Report what was created/updated, what passed, what could not be verified, and the first supervised-run recommendation.

## Default Output Shape

- Active project and milestone map.
- Two-sprints-per-day automation cadence and current sprint pair.
- Daily run-point workflow and automation prompt summary.
- Linear issue model and human-assignment rules.
- Validation commands and current pass/fail state.
- Open variables that still need a human decision.

The milestone map must include:

1. **FULLY FUNCTIONAL PRD**
2. **FULL-APP HUMAN-PRACTICAL TESTING**
3. **UX AND PRODUCT LOOP HUMAN REVIEW**

## Guardrails

- Do not create sprint-by-sprint human review loops when the user asked for milestone gates.
- Do not plan a run-point automation that only executes one sprint per day when two safe sprints can be attempted.
- Do not create automation branches with feature, recovery, product, incident,
  bug-description, prose, agent, runtime, worker, or tool-name prefixes.
- Require a complete Cloud Pickup block before every implementation dispatch:
  accepted revision, environment ID/label, repository slug and attachment
  proof, requested base/ref availability, detached checkout mode/proof,
  authenticated Git publication route, date branch, checkpoint ref, owner,
  protected zones, dependencies, name-only secrets manifest, excluded
  names/categories, purpose-specific authorization gates, proof gates, return
  path, budgets, and closure condition.
- Do not bury full-app human-practical testing inside implementation acceptance criteria; make it its own sprint work inside Milestone 2.
- Do not use smaller work-unit terminology in automation prompts when it would make the runner think one subtask is enough.
- Do not perform live outreach, production CRM writes, paid/manual source use, legal/compliance claims, or destructive repo operations without explicit approval.
- Do not duplicate Linear projects, milestones, automations, or issues when an appropriate active object already exists.
- Keep docs, Linear, automation prompts, and briefs consistent so the daily runner can operate without rediscovering basic project rules.

### Repository-backed Cloud identity invariant

For repository mutation, require the same actual repository-backed Codex Cloud
identity and repository attachment at pickup and return. Use a real opaque
32-character lowercase hexadecimal environment ID plus a separate readable
label; reject paths, `workspace:` and `/workspace/scratch/` identities, and
synthetic `codex-cloud-env-*` values. Cross-check repository slug, managed
workspace, requested base/ref, exact checked-out HEAD, clean-start proof,
detached checkout mode, publication route, return branch, task identity, and
checkpoint ref. Never call `main` the implementation lane. Projectless ChatGPT
Work and connector-only preflight are research/standalone-artifact lanes only.
