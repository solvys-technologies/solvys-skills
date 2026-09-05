---
name: create-manifesto
description: Write a project manifesto that locks paid real-world outcomes, priorities, milestones, access, deployment, and unattended-stop rules so an agent cannot rewrite the job while unsupervised. Use when a client contract exists, a project has gone off the rails, an unattended agent is building product instead of the paid outcome, or the user asks for a manifesto or create-manifesto.
---

# Create manifesto

Write one `MANIFESTO.md` that a later agent can be left alone with. The file steers the work. It is not a status report.

Load Communication Style Protocol. Short sentences. No em dashes. Do not invent the job.

## When to run

- A client contract, proposal, or SOW exists or is about to be signed
- An unattended agent is building cockpit, SaaS, or chrome while the paid outcome is still false
- The user says manifesto, create-manifesto, or that the project went off the rails
- A Cursor goal has been running for hours without a real-world proof

Do not start implementation in the same turn unless the user already approved a plan that the manifesto names.

## Order

1. Collect the contract, proposal, and the human's spoken P0. If the signed document is missing, say so in the Sources line and encode only what the human named.
2. Name the person who is in pain and the observable change that would mean rent is earned.
3. Fill every required heading in `factory/Factory Registry/Templates/project-manifesto.md`. Do not skip Access, Deployment, or Unattended work.
4. Write customer intuition as the thought an agent should have in the field, not as a passing check.
5. Put `MANIFESTO.md` at the root of every family repo named in the project map. Identical file. If a remote is missing, keep the portable copy under this skill's `examples/` and in the reachable repo.
6. Point `AGENTS.md` (or the Welcome Mat) at `MANIFESTO.md` as the first read. The manifesto outranks older canon, Wonder, sprint maps, and Cursor goals.
7. Run `python3 .claude/skills/create-manifesto/scripts/validate_manifesto.py <path-to-MANIFESTO.md>`.
8. Do not leave a contradicting Cursor goal running. If you are blocked on access, cut the goal instead of spending the rest of the usage window.

## Required headings

The validator requires these headings, in this order:

1. The job
2. Who pays
3. Priority stack
4. Real-world done
5. Customer intuition
6. Out of scope
7. Milestones
8. Access
9. Deployment
10. Unattended work
11. Consult, plan, craft
12. Stop
13. Names
14. Proof that counts

## How to fill them

**The job.** One operating path. Input. Output. Who sees it. How fast it had to ship.

**Who pays.** Client, operator, FDE. Why the outcome is rent. What Solvys owns versus what the client owns.

**Priority stack.** Numbered. P0 is the paid real-world event. Later items wait until P0 is true in the world.

**Real-world done.** A human can observe it without opening DevTools. Name the person and the surface (WhatsApp group, mailbox, signed PDF, live listing).

**Customer intuition.** Write the field thought, then the repair.

Use this shape:

> I see aerial views on the listing card. Customers will not be able to see the property like that. Fix the image.

Do not write:

> Checks pass. Maps returned 200s and the aerial photos are in their proper place.

**Out of scope.** Copy exclusions from the contract. Add the failure modes this project already burned time on.

**Milestones.** M0 is access. Then the first live outcome. Then repeatability. Chrome last.

**Access.** What to do when 1Password logs out: log in, create service accounts for every environment, disperse named secrets, prove they loaded. Secret names only. Human gates named. Two failed probes of the same auth path is a stop.

**Deployment.** Live project, root directory, production URL, preview rules, dest/environment switches, accounts (Cloudflare, Vercel, Fly). What not to `--prod`.

**Unattended work.** Max window without P0 proof: 2 hours. Cut the goal when blocked. `UpdateGoal` complete only for the real-world outcome or an explicit human stop.

**Consult, plan, craft.** Options to the human. Plan. Then build. Do not retarget P0.

**Stop.** Concrete stop lights so an unsupervised agent can halt.

**Names.** Allowed product names. No new names.

**Proof that counts.** The live surface. Then the list of green checks that do not count.

## CRED seed

`examples/cred.md` is the filled CRED manifesto. Use it as the template's first proof, not as a second source of truth. The live copy lives at cred-cowork `MANIFESTO.md` and must be copied to `gp-cred` and CREDList when those remotes exist.

## Do not

- Invent a better product than the paid job
- Treat Wonder, Kanban, or a passing test as P0
- Keep a goal alive through 1Password logout, IMAP LOGIN false, or a 503 send bridge
- Print secrets, tokens, E.164, message bodies
- Mix unrelated git tracks to "finish the goal"
- Write the manifesto as an apology or a status update
