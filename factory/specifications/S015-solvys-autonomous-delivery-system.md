# Development Contract: Solvys Autonomous Delivery System

Contract ID: `S015`
Project: `solvys-factory`
Maturity: `spec-anchored`
Status: `approved`
Revision: `1`
Owner: `S015 Factory integrator`
Decision owner: `TP`
Repository: `solvys-technologies/solvys-skills`
Base ref: `2026-08-09`
Base SHA: `fda95efca102878265d551ed22e292d7a62df6e7`
Dirty-state owner: `TP owns pre-existing S014, Build Kit, Pen.dev, Design, and skill changes; S015 owns only its declared files and bounded shared-file hunks`
Required proof rung: `tests`

## SPEC - Functional contract

### Objective

Deliver an active Factory delivery system that turns approved specifications
into bounded sprint runs, retries safe paths, stops repeated failure mechanisms,
and exposes honest status through one private operator surface.

### Users and outcomes

- TP sees every registered sprint, worker, proof rung, retry, and genuine gate.
- Agents inventory available skills and safe paths before requesting manual work.
- Sprint owners receive a durable specification, loop state, isolated execution,
  prevention hooks, and a reviewable branch or PR.

### In scope

- One canonical agency directive and validator-managed Codex entry surfaces.
- Native Codex productivity hooks that compose with existing safety and UI hooks.
- Loop Engineering 0.1.2 integration, durable loop records, and circuit breakers.
- Spec Kit 0.16.2 mapping into the S014 Development Contract and PL phases.
- Symphony source/runtime and a private Factory Operations ChatGPT Site.
- Prevention fixtures for all 13 retained correction mechanisms.

### Out of scope

- Auto-merge, automatic deployment, destructive provider actions, or secret values.
- Invented client identities or committed copies of protected local project records.
- Keyword-only infraction classification.

### Assumptions

- S014 remains the implementation authorization and proof envelope.
- The Factory source lane is limited to text and dependency-free Python while the
  local capacity receipt remains red. Runtime builds and installs use Cloud.
- Linear is issue authority and Symphony requires `symphony-ready`.
- Symphony has branch, commit, PR, review-comment, and proof authority only.

### Functional requirements

- FR-1: Every managed Codex entry surface contains the canonical directive once.
- FR-2: Hook state is durable, project-scoped, bounded, and free of secrets.
- FR-3: A correction latch prevents a stopped path from reopening without a
  passing prevention test or a new contract revision.
- FR-4: An avoidable handoff is rejected until the agent records a skill/source
  inventory and three materially different safe paths, or a genuine human gate.
- FR-5: Repeating the same failed action twice enters repair mode. A third
  identical failure, budget exhaustion, or authority conflict opens the circuit.
- FR-6: Loop records are generated from protected project manifests and never
  commit live client or provider identifiers to the public suite.
- FR-7: Spec Kit artifacts generate or update one S014-compatible contract and
  never become a second implementation authority.
- FR-8: Recurring loops stay report-only for seven days. Explicit approved
  Symphony tickets can create reviewable changes but cannot merge or deploy.
- FR-9: The private Site consumes Symphony state server-side and exposes no
  tracker or runtime credential to the browser.
- FR-10: Tests, Cloud runtime, Site deployment, provider state, and human review
  remain separate proof rungs.

### Acceptance scenarios

#### AC-1 - Load the directive everywhere

Given the managed Codex entry-surface inventory
When the agency validator runs
Then every surface contains the exact canonical directive once

#### AC-2 - Reject an avoidable manual handoff

Given a run has no genuine human gate and fewer than three distinct safe paths
When the agent attempts to stop with a manual handoff
Then the Stop hook rejects closure and requests a skill and source inventory

#### AC-3 - Allow a genuine human gate

Given the run records MFA, CAPTCHA, consent, cost, rights, secret issuance, or an irreversible decision
When the agent stops with exact evidence and a smallest human action
Then the Stop hook allows the handoff and preserves all safe work

#### AC-4 - Open a repeated-failure circuit

Given the same normalized failure occurs three times without new evidence
When the loop controller evaluates the run
Then it opens the circuit, blocks repetition, and records a repair handoff

#### AC-5 - Preserve specification authority

Given Spec Kit produces specification, plan, and task artifacts
When the Solvys mapper runs
Then it emits one S014-compatible contract and reports unresolved or conflicting authority

#### AC-6 - Keep Symphony review-only

Given a Symphony-ready issue passes the Factory entrance
When the worker completes its run
Then it can return a branch, commit, PR, review comment, and proof but has no merge or deploy action

#### AC-7 - Prevent all retained mechanisms

Given fixtures for the 13 retained correction mechanisms
When the productivity controls evaluate them
Then each fixture maps to its named prevention rule without keyword-only false positives

### Edge and failure cases

- `dickhead` and `doofus` do not create invented historical infractions.
- Missing project registration produces an honest unregistered state.
- Hook tool coverage gaps remain named and use instruction/loop reconciliation.
- A stale or unreachable Symphony runtime renders an error state and no fake data.
- A changed requirement increments this contract before implementation resumes.

### Open questions

None

## PLAN - Technical contract

### Current source and accepted patterns

- Reuse S014 contracts, entrance receipts, infraction controls, and validation.
- Pin `@cobusgreyling/loop` 0.1.2 with npm integrity and MIT attribution.
- Pin GitHub Spec Kit 0.16.2 and use its Codex skills integration.
- Pin OpenAI Symphony by release or commit with Apache-2.0 attribution.

### Architecture and contracts

- Store canonical policy in `factory/canon`, schemas in the Factory Registry,
  and project run state under `~/.config/solvys-factory/projects`.
- Use one dependency-free Python hook/controller and one loop scaffold generator.
- Add narrow `solvys-loop` and `solvys-spec` skills.
- Keep Symphony and Site implementation in the registered Solvys-2 Cloud lane.

### Exact commands

- Focused test: `python3 -m unittest scripts.tests.test_s015_controls`
- Full validation: `bash scripts/validate-suite.sh`
- Build: `python3 -m py_compile scripts/factory_productivity_hook.py scripts/init_factory_loop.py scripts/map_speckit_contract.py scripts/configure_factory_hooks.py`
- Runtime or Site: `Cloud T4 and T5 receipts; tracked separately from local tests`
- Hook probe: `python3 scripts/factory_productivity_hook.py --event Stop --state /tmp/s015-state.json`
- Loop scaffold: `python3 scripts/init_factory_loop.py --manifest factory/Factory\ Registry/Templates/project-manifest.yaml --output /tmp/s015-loop`
- Spec map: `python3 scripts/map_speckit_contract.py --feature-dir /tmp/s015-feature --output /tmp/s015-contract.md`

### Testing and proof

- Unit fixtures cover directive drift, 13 mechanisms, retries, genuine gates,
  scope drift, circuit breakers, and authority conflicts.
- An isolated installer target proves hook composition without overwriting
  existing guardrail, Impeccable, or Plannotator entries.
- Cloud tracks prove Symphony and Site builds separately from local source tests.

### Security, performance, and observability

- Hook records contain identifiers and evidence references only, never secrets.
- Hook execution remains dependency-free and bounded to a five-second timeout.
- Runtime controls use authenticated operator identity and idempotency keys.

### Boundaries

- Always: preserve dirty work, `main`, project partitions, and proof-rung truth.
- Ask first: cost, secret issuance, merge, deploy, or irreversible provider state.
- Never: auto-merge, expose credentials, invent project records, or infer an
  infraction from profanity alone.

### Risks and rollback

- Hooks can over-block. Start with tested mechanisms and provide a per-project
  pause plus exact genuine-gate path.
- Runtime preview software can drift. Pin it, wrap it, and retain a kill switch.
- Rollback disables S015 hooks and loops, pauses Symphony, and leaves S014 intact.

## TASKS - Ordered execution

### T1 - Factory doctrine and schemas

- Size: `M`
- Owner: `S015 Factory integrator`
- Dependencies: `None`
- Files: `factory/canon/agency-directive.md`, `factory/specifications/S015-solvys-autonomous-delivery-system.md`, Factory schemas
- Acceptance: `AC-1, AC-5`
- Verify: run directive and schema tests
- Checkpoint: `refs/sprints/S015/T1/P1`

### T2 - Hook and loop controller

- Size: `M`
- Owner: `S015 Factory integrator`
- Dependencies: `T1`
- Files: hook runtime, loop generator, hook/loop tests, installer hook template
- Acceptance: `AC-2, AC-3, AC-4, AC-7`
- Verify: run focused S015 controls and isolated installer tests
- Checkpoint: `refs/sprints/S015/T2/P1`

### T3 - Spec Kit PL mapping

- Size: `M`
- Owner: `S015 Factory integrator`
- Dependencies: `T1`
- Files: mapper, Solvys Spec skill, PL sign, mapper tests
- Acceptance: `AC-5`
- Verify: map a fixture and validate the generated contract
- Checkpoint: `refs/sprints/S015/T3/P1`

### T4 - Symphony runtime and gateway

- Size: `M`
- Owner: `Codex Cloud`
- Dependencies: `T1`
- Files: Solvys-2 runtime/gateway owned by Cloud T2
- Acceptance: `AC-6`
- Verify: runtime and API tests in the Cloud receipt
- Checkpoint: `refs/sprints/S015/T4/P1`

### T5 - Factory Operations Site

- Size: `M`
- Owner: `Codex Cloud`
- Dependencies: `T1, T4 API contract`
- Files: Solvys-2 Site source owned by Cloud T3
- Acceptance: `AC-6`
- Verify: build, browser states, private deployment, and human review separately
- Checkpoint: `refs/sprints/S015/T5/P1`

### T6 - Unify, install, and prove

- Size: `M`
- Owner: `S015 Factory integrator`
- Dependencies: `T1, T2, T3, T4, T5`
- Files: installer, validation suite, receipt, deployment records
- Acceptance: `AC-1, AC-2, AC-3, AC-4, AC-5, AC-6, AC-7`
- Verify: full Factory suite plus Cloud and Site receipts
- Checkpoint: `refs/sprints/S015/P1`

## Change log

- Revision 1: TP approved the S015 autonomous delivery plan for implementation.
