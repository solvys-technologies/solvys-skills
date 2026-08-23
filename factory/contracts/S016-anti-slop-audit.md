# Development Contract: `S016 - Anti-Slop-led Solvys Audit`

Contract ID: `S016`
Project: `solvys-factory`
Maturity: `spec-anchored`
Status: `approved`
Revision: `1`
Owner: `Solvys Factory integrator`
Decision owner: `TP`
Repository: `solvys-technologies/solvys-skills`
Base ref: `2026-08-09`
Base SHA: `98dcc7d794f18b4140804b5dcaabb1325f4e9673`
Dirty-state owner: `TP; preserve existing suite changes`
Required proof rung: `tests`

## SPEC - Functional contract

### Objective

`Deliver an Anti-Slop-led Solvys audit so PL, DEV, and CAO lanes reject low-evidence TypeScript and JavaScript patterns without losing Solvys custody, proof, security, build, test, or debug checks.`

### Users and outcomes

- `PL, DEV, and CAO` can run `$solvys-audit` and see Anti-Slop findings first, followed by the remaining pre-flight evidence.

### In scope

- Make the upstream Anti-Slop workflow the primary TypeScript and JavaScript quality gate in `$solvys-audit`.
- Preserve Solvys terminology, report-only default, Phase 0, proof ladders, security review, and debug mode.
- Install the upstream `install-anti-slop` skill into managed agent skill roots.

### Out of scope

- Install Oxlint or modify lint configuration in any client repository.
- Change provider, production, credential, or Wonder state.
- Auto-fix audit findings.

### Assumptions

- Upstream `dmmulroy/anti-slop` commit `446268e5d15baa968eaec669ff65358d36ae6259` is MIT-licensed and its bundled installer is the correct adoption seam.

### Functional requirements

- `FR-1: $solvys-audit` must run or verify Anti-Slop before ordinary TypeScript or JavaScript quality findings.
- `FR-2: Missing Anti-Slop installation must be visible as a configuration gate, with an exact approved installation route.
- `FR-3: Audit output must preserve PASS, WARN, and FAIL evidence and never claim a runtime or acceptance result from lint alone.`

### Acceptance scenarios

#### AC-1 - TypeScript audit

Given a registered TypeScript or JavaScript project
When a user invokes `$solvys-audit`
Then the audit verifies the vendored Anti-Slop configuration and runs its project lint gate before supplementary code-quality checks.

#### AC-2 - Other audit modes

Given a non-TypeScript project or a debug/security request
When a user invokes `$solvys-audit`
Then the audit preserves applicable Solvys pre-flight, security, and debug workflows and states why Anti-Slop is not applicable.

### Edge and failure cases

- A target repository without Oxlint or an Anti-Slop vendor copy receives `WARN: Anti-Slop configuration missing`; the audit remains report-only.
- A target lint command fails receives `FAIL: Anti-Slop gate` with the reported rule, file, and line.

### Open questions

`None`

## PLAN - Technical contract

### Current source and accepted patterns

- Repository truth: canonical local suite at the recorded ref and SHA; protected dirty work remains untouched.
- Existing pattern: `.claude/skills/solvys-audit/SKILL.md` supplies the named audit workflow.
- External source: `https://github.com/dmmulroy/anti-slop`, MIT, skill-led per-project vendored adoption.

### Architecture and contracts

- `$solvys-audit` becomes the Solvys wrapper and evidence reporter.
- `$install-anti-slop` remains the only routine configuration path for a target repository.
- Anti-Slop is a source-quality gate. Solvys gates retain runtime, provider, deployment, and human-acceptance authority.

### Exact commands

- Focused test: `python3 /Users/tifos/.codex/skills/.system/skill-creator/scripts/quick_validate.py .claude/skills/solvys-audit`
- Full validation: `python3 scripts/validate_development_contract.py --contract factory/contracts/S016-anti-slop-audit.md --implementation`
- Build: `Not applicable - documentation and agent-skill change`
- Runtime or Site: `Not applicable - no product surface changes`

### Testing and proof

- Validate the revised skill structure and scan the final body for the full 15-rule Anti-Slop contract and preserved Solvys gates.

### Security, performance, and observability

- The audit must print commands and findings without secrets. No target repository is changed during an ordinary audit.

### Boundaries

- Always: preserve existing dirty work and report evidence.
- Ask first: a target repository dependency or lint-configuration mutation.
- Never: auto-fix, weaken an Anti-Slop rule, or treat lint as runtime proof.

### Risks and rollback

- Risk: a strict lint gate has no configuration in an older target repository.
- Rollback: restore the prior skill from Git or adjust the target project through the explicit installer workflow after owner review.

## TASKS - Ordered execution

### T1 - Install and map the Anti-Slop adoption seam

- Size: `S`
- Owner: `Solvys Factory integrator`
- Dependencies: `None`
- Files: `managed agent skill roots`, `factory/contracts/S016-anti-slop-audit.md`
- Acceptance: `AC-1`
- Verify: `npx skills add dmmulroy/anti-slop -g --skill install-anti-slop -y`
- Checkpoint: installer receipt and contract validation

### T2 - Replace the Solvys Audit quality core

- Size: `S`
- Owner: `Solvys Factory integrator`
- Dependencies: `T1`
- Files: `.claude/skills/solvys-audit/SKILL.md`, `PROJECT-STATE.md`
- Acceptance: `AC-1`, `AC-2`
- Verify: `quick_validate.py` plus targeted rule and policy readback
- Checkpoint: validation receipt

## Change log

- Revision 1: TP directed Anti-Slop to take over `$solvys-audit`; the Factory integrator approved this bounded adoption contract.
