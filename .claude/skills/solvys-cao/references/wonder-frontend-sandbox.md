# Wonder Frontend Sandbox

## Role

Wonder is the lightweight collaborative frontend sandbox for new frontend
changes. It sits between design intent and source implementation so TP and the
agent can shape the same surface before production code is changed.

Wonder is provisional design truth. Port 7777 or the explicitly named sandbox
is source-integrated product truth.

## Required Sequence

For frontend-only and frontend plus backend work:

1. Read the anti-slop law, shared `Design.md`, repo-local design canon, source
   components, and the active brief.
2. Record the Installation Foundation: BeUI primary, Vercel UI secondary, Bklit
   primary for eligible visualization, and EvilCharts secondary.
3. Build or update the proposed frontend direction in Wonder when the surface
   can be represented there.
4. Review the Wonder preview with TP and record the accepted artboard, state,
   component, token, and behavior decisions.
5. Keep the accepted Wonder result isolated from production source until TP
   explicitly authorizes the transfer.
6. Translate or drag the accepted work into the product-owned source lane.
7. Run source checks, build, and port 7777 browser verification. Wonder proof
   does not replace source, runtime, browser, deployed, or installed proof.

## Concurrent Human Work

TP may edit Wonder while the agent builds. Treat those edits as a separate human
lane:

- Do not revert, merge, normalize, or claim human changes unless TP explicitly
  brings them into the agent-owned scope.
- Continue against the agent's selected artboard or branch and disregard
  unrelated human mutations.
- Re-read current Wonder context before every design action, but preserve the
  agent's recorded target and scope.
- When the final comparison is needed, present agent-owned and human-owned
  changes as separate candidates until TP chooses the source-bound result.

## Applicability

Use Wonder for new screens, layout changes, component compositions, visual
states, responsive intent, and interaction prototypes when it can shorten the
decision loop.

Wonder is optional for tiny copy, color, icon, or spacing corrections, pure
backend work, emergency repairs, and source-only behavior that cannot be
represented faithfully in the sandbox.

## Handoff Record

Every frontend brief records:

```markdown
- Wonder status: required | used | not applicable
- Wonder file/page/artboard:
- Agent-owned target:
- Human-owned changes ignored:
- Accepted decision:
- Source transfer authorized by:
- Port 7777 verification:
```
