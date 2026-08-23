# Development Contract: `<solution>`

Contract ID: `S###`
Project: `<project-id>`
Maturity: `micro | spec-first | spec-anchored | spec-as-source`
Status: `draft | approved | implemented | verified`
Revision: `1`
Owner: `<single integration owner>`
Decision owner: `<decision owner>`
Repository: `<owner/repository>`
Base ref: `<branch or ref>`
Base SHA: `<40-character commit SHA>`
Dirty-state owner: `<owner or clean>`
Required proof rung: `<source | static checks | tests | runtime | provider | deployed | installed | human accepted>`

## SPEC - Functional contract

Keep this section technology-neutral. State what the system must do and how a
person can prove the behavior.

### Objective

`Deliver <solution> so <user> can <outcome>.`

### Users and outcomes

- `<user>` can `<observable outcome>`.

### In scope

- `<required behavior>`

### Out of scope

- `<excluded behavior or surface>`

### Assumptions

- `<assumption with evidence or owner>`

### Functional requirements

- `FR-1: <one testable behavior>`

### Acceptance scenarios

#### AC-1 - `<behavior name>`

Given `<starting state>`
When `<one action or event occurs>`
Then `<observable result>`

### Edge and failure cases

- `<edge condition and required response>`

### Open questions

`None`

## PLAN - Technical contract

Use current repository truth. Record how the implementation will satisfy the
functional contract without changing its meaning.

### Current source and accepted patterns

- Repository truth: `<path, ref, SHA, and dirty owner>`
- Existing pattern: `<source path or accepted precedent>`
- External source: `<canonical URL, license, and adoption level>`

### Architecture and contracts

- `<component, data, API, provider, permission, or state decision>`

### Exact commands

- Focused test: `<exact command>`
- Full validation: `<exact command>`
- Build: `<exact command or Not applicable>`
- Runtime or Site: `<exact check or Not applicable>`

### Testing and proof

- `<test level, failure case, and required proof rung>`

### Security, performance, and observability

- `<constraint, numeric target, or Not applicable with reason>`

### Boundaries

- Always: `<required action>`
- Ask first: `<authority gate>`
- Never: `<forbidden action>`

### Risks and rollback

- Risk: `<failure mode>`
- Rollback: `<exact recovery path>`

## TASKS - Ordered execution

Use one integration owner. Keep tasks at size `S` or `M`. A task must be
self-contained, verifiable, and limited to five likely files. Run independent
tasks in parallel only after their shared contract is stable.

### T1 - `<one outcome>`

- Size: `S`
- Owner: `<owner>`
- Dependencies: `None`
- Files: `<one to five paths>`
- Acceptance: `AC-1`
- Verify: `<exact command and expected result>`
- Checkpoint: `<receipt or commit requirement>`

## Change log

- Revision 1: `<decision owner approved the contract before implementation>`
