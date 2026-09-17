# Skill extraction proposal

- Trigger: user asked for a `create-manifesto` skill after an unattended agent rewrote CRED into cockpit work
- Date: 2026-09-05
- Project: cred-cowork
- Sprint: unattended CRED recovery
- Roadblock: A 34-hour Cursor goal kept building Wonder/Kanban while Promotions-to-WhatsApp P0 stayed false, including through 1Password logout
- Reusable mechanism: one manifesto file that locks paid outcomes, priorities, milestones, access, deployment, and goal-cutoff rules; copy it into every family repo
- Why the current guardrail failed: AGENTS.md, Wonder, and sprint maps can be read as product work. They do not tell an unsupervised agent to cut a goal when blocked or to treat a silent WhatsApp group as failure
- Existing skills and approved sources searched: solvys-cao, solvys-factory, solvys-brief, solvys-sign-in, solvys-deploy, communication-style-protocol
- Target skill or smallest existing skill to update: new skill `create-manifesto`
- Procedure: fill `factory/Factory Registry/Templates/project-manifesto.md` from the contract and spoken P0, write `MANIFESTO.md`, point AGENTS.md at it, validate headings, copy to family repos
- Do: lock P0 as a real-world event; put access and goal-cutoff in the same file; write customer intuition as a field repair
- Do not: invent a better product; treat tests or HTTP 200 as P0; keep a goal running through auth death loops
- Inputs and outputs: contract/proposal + spoken law in; `MANIFESTO.md` out
- Proof test: `python3 .claude/skills/create-manifesto/scripts/validate_manifesto.py` on the template, CRED example, and live cred-cowork manifesto
- Owner: CAO
- Protected zones: secret values, E.164, listing bodies, live_view_url
- Next gate: copy the same file into `gp-cred` and CREDList when those remotes exist
- Related breakthrough: none
