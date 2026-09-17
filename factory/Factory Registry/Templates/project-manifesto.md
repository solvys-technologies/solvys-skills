# `<project>` manifesto

Read this before `AGENTS.md`, Wonder, sprint maps, and any Cursor goal. If those files disagree with this one, this file wins until a human revises it.

Copy this file to every family repo named in the project map.

Sources: `<contract or proposal path>`, `<spoken operating law date>`, `<what is still unsigned>`.

## The job

`<input surface>` in. `<client-facing surface>` out.

`<how the work is allowed to inspect the input>`. `<what must never happen, such as marking mail read>`.

`<what the artifact looks like to the paying human>`.

Ship that path fast. Leave it running.

## Who pays

Client: `<client>`. Operator: `<operator>`. FDE: `<name and email>`.

`<why this outcome is the paid job>`.

Solvys is a forward-deployed engineering team. We solve that operating problem.

## Priority stack

Do the next item only after the one above it is true in the real world.

1. **P0.** `<short name for the paid real-world event>`. `<paid real-world event>`.
2. **P1. Speed.** `<latency or fire-path>`.
3. **P2. Sight and hands.** `<diagnostic surface and the verbs that turn the pipe>`.
4. **P3. Stay up.** `<access, secrets, power, exception review>`.

`<board / dashboard / test-green with no live event>` is a P0 failure.

## Real-world done

Done means `<person>` can `<observe the outcome on the live surface>`.

Not done: `<green checks that have already fooled agents on this project>`.

## Customer intuition

Ask what the person on the live surface sees. Then fix that.

`<field observation>. <why the customer cannot use it>. <the repair>.`

Do not write `<the passing-check sentence that would get this account fired>`.

## Out of scope

These stay out unless a human writes a new scope, price, and acceptance:

- `<contract exclusion>`
- `<product this agent keeps trying to grow>`
- `<git-track mix that already caused damage>`

## Milestones

| ID | Milestone | Proof |
| --- | --- | --- |
| M0 | Access | `<login, service accounts, secrets in every environment, health true>` |
| M1 | First live outcome | `<one real artifact on the paying surface>` |
| M2 | Repeatable pipe | `<the path runs again without a rewrite>` |
| M3 | Honest cockpit | `<humans can see failures without env names>` |
| M4 | Chrome | Only after M1 is true. |

Do not start M4 while M0 or M1 is false.

## Access

Blocked on credentials is a stop, not a creative-coding prompt.

1. If the vault is logged out, log in on the authorized profile. Then continue.
2. Create or reuse service accounts and machine tokens for every environment that runs this app.
3. Disperse the named secrets into those environments. Do not copy values into chat, git, receipts, or screenshots.
4. Prove the env loaded, then prove P0.

Secret names only:

- `<NAME>` = `<item or role, never the value>`

Human gates: `<Workspace admin, MFA, domain policy>`. After two failed probes of the same auth path, stop.

## Deployment

| Rule | Detail |
| --- | --- |
| Live app | `<provider, project, root, production URL>` |
| Do not deploy | `<legacy projects>` |
| Preview vs production | `<what must not ship to prod>` |
| Dest / environment switch | `<test dest until the human switches>` |

## Unattended work

Do not start a Cursor goal you cannot cut off.

If you are blocked on access, a human gate, or the same failing probe twice: stop the goal. Leave a blocker receipt.

Maximum unattended window without a P0 proof: 2 hours. After that, stop.

`UpdateGoal` complete only when the live surface shows the paid outcome, or a human stopped the work.

## Consult, plan, craft

Name the real-world problem. Put options in front of the human. Wait for the plan. Then craft only that.

Do not retarget P0 because a side system is messy or a 34-hour goal is still active.

## Stop

Stop and report when:

- `<the live surface is failing and the next action is chrome>`
- `<the customer-visible artifact is wrong even if APIs return 200>`
- `<vault logged out and the next action is another probe>`
- A goal has been running for hours with no P0 proof

## Names

Product names: `<list>`. Do not invent others.

## Proof that counts

Counts: `<live surface proof>`.

Does not count: `<tsc, HTTP 200, screenshots of chrome, deploy of UI that still cannot complete P0>`.
