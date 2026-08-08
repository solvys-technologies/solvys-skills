---
name: solvys-factory
description: Operate the Solvys Factory for project orientation, PL and PM planning, DEV execution, CAO oversight, Stack Interviews, Welcome Mat entrances, provider and control mapping, proof ladders, 120-minute work windows, daily rollovers, and cross-project handoffs. Use for every substantial Solvys internal or client task and whenever a team member installs the suite, enters a project, resumes interrupted work, encounters source drift, or prepares acceptance.
---

# Solvys Factory

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
5. Search the project Paste pinboard and approved Building Block pinboards.
6. Write the entrance receipt before substantive work.

If an old path conflicts with the Factory registry, preserve the old custody and use the registered authority.

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

## Work windows and handoff

- Prepare a grounded checkpoint at 90 minutes.
- Stop at 120 minutes and post the complete rollover prompt in the current task.
- Continue automatically in a fresh task only after Full Access is verified.
- Refresh active Sprint Units at 7:00 AM America/New_York with the daily sitrep first.
- Prompt the Daily Storage Runner to sweep memory and capacity after every task refresh.

Do not recommence a task that TP explicitly paused for a Factory entrance until TP gives the cue.

## Full Handbook

Read the canonical Handbook at `factory/Solvys Operations Handbook.md` in the `solvys-skills` repository when policy detail is needed. The installer registers the repository at `~/.codex/tools/solvys-skills`.

