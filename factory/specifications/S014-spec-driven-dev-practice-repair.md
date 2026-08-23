# Development Contract: Factory Development Discipline

Contract ID: `S014`
Project: `solvys-factory`
Maturity: `spec-anchored`
Status: `approved`
Revision: `3`
Owner: `S014 Factory integrator`
Decision owner: `TP`
Repository: `solvys-technologies/solvys-skills`
Base ref: `2026-08-09`
Base SHA: `fda95efca102878265d551ed22e292d7a62df6e7`
Dirty-state owner: `TP owns all pre-existing Build Kit, Pen.dev, Design, and skill changes; S014 owns only its listed Factory files`
Required proof rung: `tests`

## SPEC - Functional contract

### Objective

Deliver Factory Development Discipline so Solvys agents can turn an approved
behavior contract into small verified changes without drifting across sources,
tools, tasks, or proof claims.

### Users and outcomes

- TP can approve observable behavior before an agent changes implementation.
- An implementation agent receives current source, exact boundaries, ordered
  tasks, and proof commands in one durable contract.
- A correction stops the failing path and produces a verified prevention rule.

### In scope

- One versioned Development Contract with separate SPEC, PLAN, and TASKS layers.
- A fail-closed validator for approval, Given/When/Then scenarios, boundaries,
  exact commands, small tasks, source identity, and resolved questions.
- Factory entrance, Sprint Unit, infraction, daily sweep, and agent-prompt links.
- A deduplicated audit of retained correction events that use the five terms TP
  named in this request.

### Out of scope

- Product-repository implementation, providers, deployments, or live Sites.
- Installation of the external Agent Skills repository as a dependency.
- Publication, commit, merge, or mutation of TP-owned Build Kit and Pen.dev work.
- Keyword-only policing of TP's language.

### Assumptions

- The current Codebase Cabinet checkout is the writable Factory source.
- The public `addyosmani/agent-skills` repository supplies MIT-licensed process
  patterns. S014 adopts patterns and retains Solvys ownership of the harness.
- Retained memory summaries are the safe source for deduplicated correction
  events. Raw session counts include repeated instruction bundles and cannot
  identify an infraction by keyword alone.
- Direct user authorization permits this bounded shared-skill repair in the
  current dirty branch. S014 will not commit or publish unrelated work.

### Functional requirements

- FR-1: Every code or behavior change has a written Development Contract. A
  micro change can use a short contract. A substantial change defaults to a
  spec-anchored contract that lives with the repository.
- FR-2: The functional SPEC states behavior without implementation choices and
  uses Given/When/Then acceptance scenarios.
- FR-3: The technical PLAN records current repo truth, accepted patterns, exact
  commands, architecture, boundaries, risks, rollback, and required proof.
- FR-4: TASKS are dependency-ordered, sized S or M, limited to five likely
  files, owned by one integrator, and verified before the next task begins.
- FR-5: Unexpected failures stop feature work. The owner preserves evidence,
  reproduces, localizes, reduces, repairs, guards, and verifies before resuming.
- FR-6: A named profanity token triggers context classification. Direct
  corrections and stop commands create repair work. Emphasis, quoted policy,
  and standing instructions update constraints without false ledger entries.
- FR-7: A correction record names the failed contract, root cause, stop state,
  prevention test, owner, and evidence. A repair stays open until that test
  passes.
- FR-8: Proof remains rung-specific. Tests, runtime, provider, deployment,
  installation, and human acceptance stay separate.

### Acceptance scenarios

#### AC-1 - Block ambiguous implementation

Given a substantial change with no approved Development Contract
When an agent requests implementation authorization
Then the Factory entrance check refuses implementation and lists the missing contract evidence

#### AC-2 - Reject weak acceptance criteria

Given a Development Contract whose acceptance scenario lacks Given, When, or Then
When the contract validator runs
Then validation fails before implementation begins

#### AC-3 - Stop after a direct correction

Given TP directly corrects the active source, surface, tool, scope, or execution path
When the agent classifies the message as a direct correction or stop command
Then the agent stops that path, records the mechanism, and resumes only after a prevention test passes

#### AC-4 - Avoid keyword false positives

Given a named profanity token appears in emphasis, a quotation, or inherited instructions
When no current agent action is being corrected or stopped
Then the agent updates the relevant requirement or tone constraint without creating an infraction record

#### AC-5 - Keep implementation incremental

Given an approved ordered task list
When the owner completes one task
Then the owner runs its exact verification and records a checkpoint before starting the next task

### Edge and failure cases

- `dickhead` and `doofus` have no distinct retained correction event in the
  deduplicated memory record. Their presence in repeated raw instructions must
  not create invented history.
- A task with unresolved questions, an XL size, an invalid base SHA, or missing
  proof commands fails closed.
- A failed test blocks new feature work. Existing unrelated failures remain
  named and isolated; they never become a silent pass.
- A changed requirement updates the contract revision before code continues.
- A dirty branch remains protected. S014 edits only the declared Factory files.

### Open questions

None

## PLAN - Technical contract

### Current source and accepted patterns

- Repository truth: Codebase Cabinet `solvys-skills`, branch `2026-08-09`, base
  SHA `fda95efca102878265d551ed22e292d7a62df6e7`, with TP-owned dirty work.
- Existing pattern: Factory entrance receipts, Sprint Units, infraction ledger,
  proof ladder, and `validate-suite.sh`.
- External source: `https://github.com/addyosmani/agent-skills`, MIT license,
  adoption level `pattern`. Adopt spec gates, small tasks, incremental proof,
  stop-the-line debugging, anti-rationalization, and Definition of Done ideas.
- Final source: the supplied article `The Spec Is the New Code`, adoption level
  `pattern`. Adopt functional SPEC, technical PLAN, self-contained TASKS,
  Given/When/Then scenarios, living specs, and ceremony proportional to risk.

### Architecture and contracts

- Add one Markdown template and one dependency-free Python validator.
- Link the contract from the entrance receipt and Sprint Unit.
- Extend infraction events with trigger kind, failed contract, root cause,
  prevention test, stop requirement, and repair verification state.
- Keep keyword detection contextual. Store the mechanism, not the insult.
- Keep detailed policy in the Handbook and concise gates in the Factory skill
  and product-agent prompt.

### Exact commands

- Focused test: `python3 -m unittest discover -s scripts/tests -p 'test_validate_development_contract.py'`
- Full validation: `bash scripts/validate-suite.sh`
- Build: `python3 -m py_compile scripts/validate_development_contract.py scripts/validate_entrance.py scripts/record_infraction.py scripts/sweep_infractions.py`
- Runtime or Site: Not applicable

### Testing and proof

- Unit tests prove an approved contract passes and missing Then, open questions,
  XL tasks, and draft status fail.
- Recorder tests use a temporary ledger and prove correction metadata survives
  deduplication without writing client records.
- Suite validation checks the template, Python syntax, focused tests, skills,
  and the existing Build Kit validator.

### Security, performance, and observability

- The validator reads only the supplied Markdown path and emits JSON.
- The recorder stores no developer names, secrets, or full user quotations.
- Runtime performance is not applicable. Validation must complete locally
  without network, dependencies, servers, or build caches.

### Boundaries

- Always: preserve TP-owned dirty work and validate each S014 slice.
- Ask first: publish, commit, merge, install new dependencies, or change provider state.
- Never: infer an infraction from a keyword alone or claim a higher proof rung.

### Risks and rollback

- Risk: the contract becomes ceremony that agents bypass. Mitigation: entrance
  validation fails closed and micro contracts keep small work short.
- Risk: profanity matching creates false records. Mitigation: trigger-kind
  classification and correction metadata are mandatory for non-manual events.
- Rollback: remove S014-owned additions and reverse only S014 hunks. Preserve
  every pre-existing dirty path and branch ref.

## TASKS - Ordered execution

### T1 - Add the Development Contract harness

- Size: `M`
- Owner: `S014 Factory integrator`
- Dependencies: `None`
- Files: `factory/Factory Registry/Templates/development-contract.md`, `scripts/validate_development_contract.py`, `scripts/tests/test_validate_development_contract.py`
- Acceptance: `AC-1, AC-2`
- Verify: run the focused contract tests and expect all tests to pass
- Checkpoint: validator test receipt

### T2 - Connect entrance and Sprint records

- Size: `M`
- Owner: `S014 Factory integrator`
- Dependencies: `T1`
- Files: `factory/Factory Registry/Templates/entrance-receipt.json`, `factory/Factory Registry/Templates/sprint-unit.json`, `factory/Factory Registry/Schemas/factory-records.schema.json`, `factory/Factory Registry/README.md`
- Acceptance: `AC-1`
- Verify: validate the JSON records and confirm each record exposes the same Development Contract fields
- Checkpoint: entrance validation receipt

### T3 - Enforce the implementation entrance

- Size: `S`
- Owner: `S014 Factory integrator`
- Dependencies: `T1, T2`
- Files: `scripts/validate_entrance.py`, `scripts/tests/test_validate_entrance.py`
- Acceptance: `AC-1`
- Verify: run entrance fixtures and confirm missing or invalid contracts fail implementation authorization
- Checkpoint: entrance gate test receipt

### T4 - Make correction records actionable

- Size: `M`
- Owner: `S014 Factory integrator`
- Dependencies: `T1`
- Files: `factory/Factory Registry/Schemas/infraction-ledger.schema.json`, `scripts/record_infraction.py`, `scripts/sweep_infractions.py`, `scripts/tests/test_infraction_controls.py`, `.claude/skills/solvys-cao/references/voice-and-respect.md`
- Acceptance: `AC-3, AC-4`
- Verify: run temporary-ledger recorder checks and inspect the ranked repair output
- Checkpoint: infraction-control receipt

### T5 - Promote the development workflow into loaded doctrine

- Size: `M`
- Owner: `S014 Factory integrator`
- Dependencies: `T2, T3, T4`
- Files: `.claude/skills/solvys-factory/SKILL.md`, `.claude/skills/solvys-cao/SKILL.md`, `.claude/skills/communication-style-protocol/SKILL.md`, `factory/Solvys Operations Handbook.md`, `SOLVYS_AGENT_SYSTEM_PROMPT.md`
- Acceptance: `AC-3, AC-4, AC-5`
- Verify: run skill validation and search each loaded surface for the Development Contract and correction-stop rules
- Checkpoint: doctrine readback receipt

### T6 - Close with proof and a deduplicated repair map

- Size: `S`
- Owner: `S014 Factory integrator`
- Dependencies: `T1, T2, T3, T4, T5`
- Files: `factory/receipts/S014-spec-driven-dev-practice-repair.md`, `scripts/validate-suite.sh`
- Acceptance: `AC-1, AC-2, AC-3, AC-4, AC-5`
- Verify: run `bash scripts/validate-suite.sh` and record the exact result plus protected dirty state
- Checkpoint: final S014 receipt

## Change log

- Revision 3: declare focused infraction tests and the CAO gate before changing correction doctrine.
- Revision 2: split entrance records from entrance enforcement so every task stays within five likely files.
- Revision 1: TP approved the Factory development-practice repair in this task.
