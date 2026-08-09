---
name: solvys-factory
description: Operate the Solvys Factory for project orientation, PL and PM planning, DEV execution, CAO oversight, Stack Interviews, Welcome Mat entrances, provider and control mapping, proof ladders, 120-minute work windows, daily rollovers, and cross-project handoffs. Use for every substantial Solvys internal or client task and whenever a team member installs the suite, enters a project, resumes interrupted work, encounters source drift, or prepares acceptance.
---

# Solvys Factory

Read the project Welcome Mat and read your assigned PL, PM, DEV, or CAO lane
sign before planning, tools, authentication, or code.

Use the Factory as the entrance and operating map for Solvys work. Keep this skill short in context. Load the full Handbook only when the task needs policy detail.

## First-install orientation gate

Before project work, look for `~/.config/solvys-factory/orientation.yaml`.

If it is absent:

1. Run `python3 scripts/orient.py` from this skill directory.
2. Complete each required identity, project, access, application, and review question.
3. Open the generated `orientation-handoff.md`.
4. Send that prompt to the Solvys orientation task.
5. Do not enter product work until the handoff is acknowledged and its access requests have owners.

Never collect passwords, MFA codes, tokens, or secret values in orientation files.

## Project entrance

1. Locate the project Cabinet and read `WELCOME.md`.
2. Read the assigned sign: PL, PM, DEV, or CAO.
3. Read the project manifest, active sprint packet, and latest accepted receipt.
4. Verify repository, owner, base ref, SHA, dirty ownership, local and Cloud paths, SSH route, provider account, environment, protected zones, and required proof rung.
5. Open Paste and search for the exact project name. Open the project folder
   from the search suggestion before searching inside it. The only approved
   password item names are `Primary Project Password` and `Secondary Project
   Password`; do not search guessed labels such as `CRED Gmail Password`. The
   project folder is the password authority. If Paste MCP is used, keep the
   Paste app and MCP connection open for the full task and handoff. Never close
   it or terminate its sync process.
6. Write the entrance receipt before substantive work.

If the project has no literal `WELCOME.md`, do not treat that absence as a
login or implementation blocker. Use the project's registered onboarding
composite, usually `AGENTS.md`, `CLAUDE.md`, `README.md`, `SETUP.md`,
`WORKSPACE.md`, `PRODUCT.md`, and `DESIGN.md`, then record the exact files used
as the Welcome Mat substitution in the entrance receipt. Create a literal
Welcome Mat only when the project owner authorizes that repository change.

The canonical shared skill source is the installed Solvys-skills suite in the
agent home and Codebase Cabinet. Do not copy shared skill bodies into a product
repository or commit thousands of mirror files. Use the installed source or a
project-local symlink when local discovery requires it, and preserve the
canonical source as the only editable copy.

If an old path conflicts with the Factory registry, preserve the old custody and use the registered authority.

The Factory Registry is the discovery index. When it declares
`handoffRegistry` or `activeStatusAuthority`, resolve those paths from the
registry file and read them before resuming any existing task. During an active
cutover, the pointed cutover registry owns the live status and rollover prompt;
the project record and chat are supporting evidence. If two registries disagree,
record the mismatch, use the declared active-status authority, and repair the
stale copy before sending work onward. Never treat a missing relative prompt
path as a reason to restart the task when the declared authority can be fixed.

## Lane selection

- **PL:** Define outcome and authority, approve foundations, complete contracts, prove the backend dyno, integrate the frontend chassis, and close release handoff.
- **PM:** Control product scope, architecture integration, quality and reliability, and delivery communication.
- **DEV:** Verify custody, install approved foundations, build backend contracts and resources first, connect Wonder proposals, map every control, and prove the required rung.
- **CAO:** Own priorities, dependencies, cost, protected zones, recovery, model routing, proof, and durable process repair.

Read `references/entrance-and-proof.md` for exact records and decision rules.

## Stack Interview

Start every large plan with the Stack Interview. Record fluid defaults, dynamic exceptions, numeric performance target, security needs, hosting, integrations, operating cost, and exit plan.

Export accepted decisions to the Cabinet, PRD, Architecture Canvas, provider-resource manifest, sprint plan, Outputs & Sources, and control inventory.

Use all 21 questions when 21 material decisions can change scope, authority, cost, architecture, or acceptance. Record why a shorter set is complete.

## Proof

Keep these rungs separate:

`source -> static checks -> tests -> runtime -> provider -> deployed -> installed -> human accepted`

Mark a node green only when it reaches the sprint's declared rung. Mark the earliest missing or failed dependency red.

## Infraction trigger and daily repair

The exact phrase `infraction committed` is a write trigger. When an agent uses
that phrase, it must immediately record the mechanism in the current project's
`infraction-ledger.json` before continuing. Use the bundled recorder:

```bash
python3 scripts/record_infraction.py \
  --project-id <project-slug> \
  --ledger <project-cabinet>/infraction-ledger.json \
  --title "<short mechanism>" \
  --category <category> \
  --description "<observed mechanism and impact>" \
  --source-type task --source-id <thread-or-automation-id> \
  --evidence <receipt-or-log-path>
```

The recorder merges the same fingerprint, increments its count, appends the
event, and keeps the highest severity. Use `--death-loop` when the same action
repeats without new evidence or progress. If the project is unknown, use
`--project-id unassigned` and the local Factory ledger, then make project
assignment the next repair. Never write an infraction without its mechanism,
source, evidence, owner, and next action. Do not name or blame a developer.

The daily 7:00 AM sitrep reads every registered project ledger, prioritizes
open `deathLoop`, critical, and recurring entries, fixes the earliest shared
cause, assigns the repair owner, and records the result or human gate. A second
infraction in the same work window stops the repeated action until the shared
cause is repaired. The sweep updates the ledger and daily sitrep; it does not
spawn one automation per infraction.

Use `python3 scripts/sweep_infractions.py` to build the read-only ranked repair
queue for that sitrep. It reports invalid ledgers as explicit evidence instead
of hiding them.

## Skill extraction trigger

The directive `skill that` is a case-insensitive write trigger for turning a
roadblock into a reusable skill. Do not answer with advice only:

1. Write `Skills/Proposals/<date>-<slug>.md` in the protected project Cabinet
   with `factory/Factory Registry/Templates/skill-proposal.md`. Use the local
   Factory proposal location when the project is unknown.
2. Search the current skill suite, installed skill links, and approved Paste
   sources for an existing fit.
3. Patch the smallest existing `SKILL.md` when a fit exists. Create a new
   skill only when the roadblock is a repeatable workflow. Run the
   `skill-creator` `init_skill.py` path for a new skill, then follow its
   frontmatter, resources, validation, and context-budget rules.
4. Prove the guardrail with a focused check, link the proposal to the Sprint
   Unit or receipt, and keep client detail and secrets out of the reusable skill.

If a global install or an irreversible source change needs human review, leave
the validated proposal and exact review gate in the Cabinet. Keep the repair
moving in the current lane.

## Breakthrough records

The directive `Update the C-Cab with that Breakthrough` is a durable-learning
write trigger. Create `Breakthroughs/<date>-<slug>.md` in the active project
Cabinet with `factory/Factory Registry/Templates/breakthrough-record.md`, read
it back, and route the lesson to the smallest layer that prevents recurrence:

- universal operating rule: Factory Handbook and agent-facing prompt or sign;
- repeatable agent workflow: an existing skill or a new validated skill;
- project-specific implementation rule: project Welcome Mat, manifest,
  Architecture Canvas, Design canon, or repository instructions;
- temporary state: infraction ledger, Sprint Unit, or receipt only;
- Codex memory: one concise ad-hoc note in
  `/Users/tifos/.codex/memories/extensions/ad_hoc/notes/` when this directive
  explicitly requests memory promotion.

Record the mechanism, why the old guardrail failed, the prevention rule, changed
files or records, proof and readback, protected zones, owner, and next gate. Do
not dump the transcript, secrets, browser session data, or stale client detail.
Link the record from the active Sprint Unit or latest receipt. A blocked write is
recorded as pending evidence and never presented as an acceptance mark.

When a semantic or accessibility probe conflicts with an authorized visible
provider UI, do not infer login, sender, target, or delivery state from the
probe alone. Preserve the existing tab. Use the smallest authorized visual
check, record only the required labels or mismatch, and keep browser storage,
session data, membership, and credentials outside the record.

## Work windows and handoff

- Prepare a grounded checkpoint at 90 minutes.
- Stop at 120 minutes and post the complete rollover prompt in the current task.
- Continue automatically in a fresh task only after Full Access is verified.
- Refresh active Sprint Units at 7:00 AM America/New_York with the daily sitrep first.
- Prompt the Daily Storage Runner to sweep memory and capacity after every task refresh.

Do not recommence a task that TP explicitly paused for a Factory entrance until TP gives the cue.

## Full Handbook

Read the canonical Handbook at `factory/Solvys Operations Handbook.md` in the `solvys-skills` repository when policy detail is needed. The installer registers the repository at `~/.codex/tools/solvys-skills`.
