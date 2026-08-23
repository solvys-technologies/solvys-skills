# Structural delivery contract

## Purpose

Use this contract for every Factory task that has three or more independent
units, five or more affected files, or an expected duration above 30 minutes.
It combines Colony delegation, Ponytail implementation discipline, and unlazy
completion gates without replacing Solvys terminology or ownership.

## Factory terminology

| External pattern | Factory term | Required evidence |
| --- | --- | --- |
| Colony delegation ledger | Sprint Unit Assignment Ledger | one owned row per independent Cloud task or visible agent session |
| Colony worker brief | Cloud Pickup block | repository, ref, paths, owner, checks, return checkpoint |
| Ponytail ladder | Ponytail Chain | accepted reuse rung in the Development Contract |
| unlazy gates file | Development Contract Gate Ledger | `CHECK`, `EXPECT`, and deciding evidence per task |
| unlazy parent verification | Integrator verifier receipt | independent readback of every completed task |

## Assignment Ledger

Write the Assignment Ledger before implementation fan-out. Each row names one
non-overlapping unit, its exact file ownership, protected zones, acceptance
criteria, checks, execution lane, owner, checkpoint, and verifier result.
Use visible Codex sessions and task-owned Cloud worktrees. Do not use hidden
product subagents. An integrator verifies every row and records `verified`,
`blocked`, or `returned-for-repair`.

## Ponytail Chain

PL, PM, DEV, and CAO apply the Ponytail Chain before new code: confirm the need,
reuse the repository solution when present, prefer a platform or standard
feature, then an installed dependency, then maintained OSS, then the smallest
new code. The chain never removes validation, security, accessibility,
data-loss handling, explicit requirements, or proof.

## Development Contract Gate Ledger

Every implementation task names its gates before work starts. A gate contains
an ID, observable outcome, `CHECK` command, `EXPECT` result, and captured
evidence. A checked box without deciding evidence is open. A task may report
ready for integration only when all of its gates pass. The integrator reruns
the gates and records the result in the Sprint Unit and receipt.

An honest human, authority, or external-state block stays open with the exact
evidence and smallest next action. It never becomes a completion claim.
