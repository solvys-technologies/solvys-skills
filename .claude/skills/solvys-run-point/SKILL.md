---
name: solvys-run-point
description: Use when setting up or auditing a Solvys project where an orchestrated agent runs point across multiple days using Linear, Codex Automation, Computer Use, and Cursor Web PWA. Trigger for /solvys-run-point, project point-guard setup, two-sprints-per-day Codex Automation projects, milestone-gated agent execution plans, daily automation planning, or converting sprint docs into a low-friction human-testing workflow.
---

# Solvys Run Point

## Overview

Use this skill to turn a project from "lots of briefs and possible agents" into a run-point system: one grounded planning thread, one Linear project structure, one automation cadence, milestone-only human testing, and clear daily agent execution rules.

## Mandatory Planning Contract

Every `/solvys-run-point` invocation plans a **Codex Automations based project** unless TP explicitly says otherwise.

Default execution contract:

- The Codex Automation runs point daily.
- The automation takes on **two full sprints per day** until the job is complete.
- A sprint is the unit of work. Do not recast the project into smaller terminology that makes the agent think one subtask is enough.
- The runner must not stop after one sprint if a second safe sprint can be implemented, verified, or concretely blocked in the same run.
- The project plan uses exactly these top-level milestone gates by default:
  1. **FULLY FUNCTIONAL PRD** - all product requirements, repo truth, source docs, architecture decisions, implementation sprint map, validation commands, and known blockers are captured well enough that agents can execute without rediscovery.
  2. **FULL-APP HUMAN-PRACTICAL TESTING** - human-practical testing is planned as its **own sprints**, not as a vague checklist. Any fixes found during those testing sprints are routed back into the individual implementation sprints that own the broken behavior.
  3. **UX AND PRODUCT LOOP HUMAN REVIEW** - the actual human review of end-to-end UX, product loop, readiness, and remaining judgment calls happens after full-app practical testing has produced evidence.

If a project has existing milestone names, preserve local names only when they map cleanly to these gates. Otherwise, add this contract as the controlling run-point structure.

## Workflow

1. Ground the workspace.
   - Confirm the repo/root, branch, dirty files, docs, briefs, test commands, and active deployment/runtime assumptions.
   - Inspect existing Linear teams, projects, statuses, labels, milestones, issues, and assignees before creating anything.
   - Inspect existing Codex automations before creating a duplicate.
   - Preserve unrelated dirty work and historical completed projects.

2. Resolve project decisions before mutation.
   - Confirm the active project name, historical project boundary, preferred agent/worker name, CRM/system-of-record decision, automation schedule/timezone, milestone names/dates, human assignee, and live-write/outreach boundaries.
   - Default the automation cadence to two full sprints per day. If a different cadence is required, record who chose it and why.
   - Default the milestone gates to FULLY FUNCTIONAL PRD, FULL-APP HUMAN-PRACTICAL TESTING, and UX AND PRODUCT LOOP HUMAN REVIEW.
   - If a variable is discoverable from repo docs or Linear, discover it. If it is not discoverable and risky, ask the smallest possible question or mark it as an open variable in the plan.
   - Use the user's exact chosen terminology. Do not invent or preserve stale agent/tool names.

3. Convert work into milestone gates.
   - Keep granular agent tickets for execution, but group them under full sprints that the automation can run two per day.
   - Milestone 1 ends only when the PRD is fully functional: source-backed, implementation-ready, acceptance-testable, and current with repo reality.
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
- Do not bury full-app human-practical testing inside implementation acceptance criteria; make it its own sprint work inside Milestone 2.
- Do not use smaller work-unit terminology in automation prompts when it would make the runner think one subtask is enough.
- Do not perform live outreach, production CRM writes, paid/manual source use, legal/compliance claims, or destructive repo operations without explicit approval.
- Do not duplicate Linear projects, milestones, automations, or issues when an appropriate active object already exists.
- Keep docs, Linear, automation prompts, and briefs consistent so the daily runner can operate without rediscovering basic project rules.
