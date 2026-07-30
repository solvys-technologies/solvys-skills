---
name: solvys-run-point
description: Use when setting up or auditing a Solvys project where an orchestrated agent runs point across multiple days using Linear, Codex Automation, Computer Use, and Cursor Web PWA. Trigger for /solvys-run-point, project point-guard setup, two-sprints-per-day Codex Automation projects, milestone-gated agent execution plans, daily automation planning, or converting sprint docs into a low-friction human-testing workflow.
---

# Solvys Run Point

## Refresh System Contract

Read `/solvys-cao/references/refresh-system.md`. The run-point keeps planning as
the local control plane and dispatches repository implementation only to a
repository-backed Codex Cloud environment/worktree by default. A projectless ChatGPT Work
VM remains non-repository research/artifact-only.
Every project/sprint uses searchable identity `S### - concise context`, a
date-only `YYYY-MM-DD` integration branch, and exact task-owned
root `refs/sprints/S###/P#` preservation/sprint checkpoints or
`refs/sprints/S###/T#/P#` tranche/track checkpoints.

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

## Execution, Storage, Conversation, And Wonder Contract

- Read `/solvys-cao`, `refresh-system.md`, and
  `storage-and-execution-lanes.md` before configuring an automation.
  Non-flagship implementation defaults to Cloud. Fintheon remains the flagship
  external-custody exception.
- Preserve the machine custody split: sound libraries stay on Ext,
  TP-selected sensitive music stays on the designated flash drive, and code
  uses remote Git plus bounded dirty-overlay preservation. A readable Ext
  volume is not a full-volume backup, repair, erase, or migration trigger.
- One sprint tranche keeps one registered workspace across task/session changes. Record its path, peak-storage estimate, reservation, protected zone, proof target, exit condition, and closure receipt. Never manually delete an opened worktree.
- At ten days, refresh an automation-bound task into its canonical automation task, retarget the automation, and pin that canonical task before archiving any predecessor. A non-automation task becomes archive-eligible only after explicit memory flush and reference checks.
- Frontend work uses Wonder as provisional design truth when representable. Preserve and disregard unrelated concurrent human edits, require TP's explicit source-transfer choice, then prove the selected implementation on port 7777.

## Overview

Use this skill to turn a project from "lots of briefs and possible agents" into a run-point system: one grounded planning thread, one Linear project structure, one automation cadence, milestone-only human testing, and clear daily agent execution rules.

## Mandatory Planning Contract

Every `/solvys-run-point` invocation plans a **Codex Automations based project** unless TP explicitly says otherwise.

Default execution contract:

- The Codex Automation runs point daily.
- The automation takes on **two full sprints per day** until the job is complete.
- A sprint is the unit of work. Do not recast the project into smaller terminology that makes the agent think one subtask is enough.
- The runner must not stop after one sprint if a second safe sprint can be implemented, verified, or concretely blocked in the same run.
- The only human-facing integration branch is `YYYY-MM-DD`. Automation must not
  create version, feature, recovery, product, incident, prose, agent, runtime,
  or other contextual branches.
- Parallel automation work uses registered detached Cloud worktrees or exact
  task-owned checkpoint refs. The daily integrator assembles accepted
  checkpoints onto the date branch.
- For any new Solvys project with frontend work, the run-point plan must reference `/solvys-discovery` and the `refero-design` skill before any frontend files are touched. `refero-design` is the required research/reference-lock gate installed from `https://github.com/referodesign/refero_skill`; if it is missing, install it with `npx skills add https://github.com/referodesign/refero_skill`.
- Milestone 1 cannot be considered a fully functional PRD for a greenfield frontend until it includes the `refero-design` reference lock, Solvys `Design.md` reconciliation, and `/solvys-feels` UI canon reconciliation.
- The project plan uses exactly these top-level milestone gates by default:
  1. **FULLY FUNCTIONAL PRD** - all product requirements, repo truth, source docs, architecture decisions, implementation sprint map, validation commands, and known blockers are captured well enough that agents can execute without rediscovery.
  2. **FULL-APP HUMAN-PRACTICAL TESTING** - human-practical testing is planned as its **own sprints**, not as a vague checklist. Any fixes found during those testing sprints are routed back into the individual implementation sprints that own the broken behavior.
  3. **UX AND PRODUCT LOOP HUMAN REVIEW** - the actual human review of end-to-end UX, product loop, readiness, and remaining judgment calls happens after full-app practical testing has produced evidence.

If a project has existing milestone names, preserve local names only when they map cleanly to these gates. Otherwise, add this contract as the controlling run-point structure.

## Workflow

1. Ground the workspace.
   - Confirm the repo/root, branch, dirty files, docs, briefs, test commands, and active deployment/runtime assumptions.
   - Inspect existing Linear teams, projects, statuses, labels, milestones, issues, and assignees before creating anything.
   - Query every relevant Awaiting Review issue. Complete only those whose implementation, validation, control behavior, and design evidence pass; route the rest into the next two-sprint batch.
   - Inspect existing Codex automations before creating a duplicate.
   - Preserve unrelated dirty work and historical completed projects.

2. Resolve project decisions before mutation.
   - Confirm the active project name, historical project boundary, preferred agent/worker name, CRM/system-of-record decision, automation schedule/timezone, milestone names/dates, human assignee, and live-write/outreach boundaries.
   - If this is a new project with any frontend surface, confirm `/solvys-discovery` has run and that the discovery artifact contains a `refero-design` reference lock before creating implementation tickets.
   - Default the automation cadence to two full sprints per day. If a different cadence is required, record who chose it and why.
   - Default the milestone gates to FULLY FUNCTIONAL PRD, FULL-APP HUMAN-PRACTICAL TESTING, and UX AND PRODUCT LOOP HUMAN REVIEW.
   - If a variable is discoverable from repo docs or Linear, discover it. If it is not discoverable and risky, ask the smallest possible question or mark it as an open variable in the plan.
   - Use the user's exact chosen terminology. Do not invent or preserve stale agent/tool names.

3. Convert work into milestone gates.
   - Keep granular agent tickets for execution, but group them under full sprints that the automation can run two per day.
   - Milestone 1 ends only when the PRD is fully functional: source-backed, implementation-ready, acceptance-testable, and current with repo reality.
   - For greenfield frontend projects, Milestone 1 also requires the `refero-design` reference lock and the Design.md/`/solvys-feels` reconciliation; implementation sprints that touch frontend remain blocked until that evidence is present.
   - Milestone 2 contains full-app human-practical testing as its own sprints. These testing sprints must exercise the whole app or product flow in realistic human terms.
   - Fixes discovered in Milestone 2 testing are assigned back to the implementation sprint that owns the broken behavior, with evidence and validation commands.
   - Milestone 3 is the actual human review of UX and product loop, not a substitute for full-app testing.
   - Human testing tickets belong at milestone gates and Milestone 2 testing sprints, unless a blocker needs credentials, approval, legal/compliance review, live-write approval, or explicit client acceptance.
   - Define which daily two-sprint automation batches roll into each milestone and what evidence proves the gate.

4. Update Linear.
   - Prefer updating an active project over reopening a completed historical delivery project.
   - Use local team statuses/labels that already exist unless a missing label is genuinely needed.
   - Issue descriptions should include: milestone, brief path, owner, execution path, validation commands, dependencies, and live-action guardrails.
   - Use owners such as Codex Automation, project worker/agent, TP/Sam, or human reviewer; assign human-only issues to the configured human assignee.

5. Set up Codex Automation.
   - Create or update one daily run-point automation with a self-contained prompt.
   - Include project root, Linear workspace/team/project, active milestone, execution method, smoke-test commands, design/UI audit requirement, and human assignment rule.
   - The automation prompt must say it takes on two full sprints per day until completion.
   - The automation prompt must state that for new-project frontend work, `/solvys-discovery` and `refero-design` must be completed before touching frontend files, writing CSS, generating UI, or treating a visual direction as implementation-ready.
   - The automation prompt must require the date-only integration branch,
     task-owned checkpoint refs, and registered detached Cloud worktrees.
   - The automation prompt must name the three default milestone gates and the first active milestone.
   - The automation prompt must tell the runner not to stop after one sprint unless the second sprint is concretely blocked.
   - First run should be dry-run or supervised unless the user explicitly approves unsupervised live execution.
   - Use the automation tool; do not hand-write raw schedule directives in the user-facing answer.

6. Define Cursor Web PWA execution.
   - Use Computer Use/Chrome when available to open Cursor Web PWA.
   - Launch ready tickets in separate tabs by pasting the relevant `@sprint-md/...` brief.
   - Start new work only after previous-day review, smoke gates, regression fixes, and UI audit pass.
   - Keep Cursor Web PWA sessions aligned to the two selected daily sprints; do not scatter work into unrelated one-off subtasks.
   - Monitor outputs, update Linear, and route blockers.

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
