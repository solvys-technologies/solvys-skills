---
name: solvys-spec
description: Use GitHub Spec Kit with Solvys PL phases and map specification, plan, and task artifacts into one S014-compatible Development Contract. Use for substantial planning, ambiguity repair, contract revision, spec drift, or pre-implementation review.
---

# Solvys Spec

Use Spec Kit as the authoring system and the Solvys Development Contract as the
single implementation authority.

The Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) is the default
decision sequence recorded in every plan: YAGNI, repo reuse, stdlib/native,
installed dependency, maintained OSS with lower ownership cost, one line, then
minimum custom code. The PL1 OSS-first record states the tradeoff and exit path
when an OSS option is rejected.

work freely, work with an open mind, and explore all possible options; never jump to conclusions at the second or third blocker. Be innovative, take inventory of your skills

## PL mapping

1. **PL0:** establish the constitution, problem, outcome, scope, ambiguities,
   user stories, and Given/When/Then acceptance.
2. **PL1:** inspect repo truth and approved precedents. Record OSS, dependency,
   license, security, maintainability, and constraint decisions.
3. **PL2:** produce the technical plan, small ordered tasks, owner, protected
   zones, exact commands, rollback, and proof gates.
4. **PL3:** execute backend tasks only after the contract passes.
5. **PL4:** execute interface and integration tasks only after process, data,
   permissions, and control contracts pass.
6. **PL5:** run cross-artifact analysis, spec-to-code drift checks, proof
   reconciliation, and handoff.

## Contract rule

Run `scripts/map_speckit_contract.py` on `spec.md`, `plan.md`, and `tasks.md`.
Then run `scripts/validate_development_contract.py` on the generated contract.
Reject unresolved questions, missing Given/When/Then text, unordered tasks,
duplicate authorities, stale source refs, or missing proof commands.

Any requirement change increments the contract revision before implementation
resumes. Preserve the source Spec Kit artifacts as anchored documentation.
