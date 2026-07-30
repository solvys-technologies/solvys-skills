# Competitive Analysis Playbook

Use this reference when `/solvys-fully-comp` needs a repeatable matrix, source protocol, and recommendation shape.

## Source Hierarchy

### External Anchors

Use current primary sources first:

- Anthropic, Claude, Claude Code, API docs, release notes, product docs, engineering posts, safety/evaluation docs, and official product pages
- OpenAI, Codex, ChatGPT, OpenAI API docs, release notes, product docs, engineering posts, safety/evaluation docs, and official product pages

Use secondary sources only as interpretation:

- reputable technical analysis
- conference talks or interviews
- public demo videos
- user/community reports
- public issue threads

Label secondary-source claims as `MARKET SIGNAL`, not product truth.

### Solvys Truth

Use this order:

1. latest user instruction
2. current repo state and `git status -sb`
3. `SOLVYS_AGENT_SYSTEM_PROMPT.md`
4. repo instructions: `AGENTS.md`, `WORKSPACE.md`, legacy `CLAUDE.md`, `.cursor/rules/`, README, active briefs, changelog
5. hidden product docs and skill docs
6. source code, schemas, prompts, services, tests
7. live UI, browser proof, packaged app, diagnostics, API response, or real data run
8. memory or prior notes, clearly marked if not refreshed

## Matrix Dimensions

Use the dimensions that match the task. Score only with evidence.

| Dimension | What To Compare |
| --- | --- |
| Task intake | how the system turns user intent into executable work |
| Context discovery | repo reading, docs, memory, current-state awareness |
| Planning | plan/execute boundaries, confirmation points, handoff quality |
| Tool use | shell, browser, GitHub, Linear, connectors, API tools, MCPs |
| Code editing | patch discipline, scoped edits, refactor boundaries |
| Verification | tests, browser proof, release proof, diagnostics, evals |
| Multi-agent orchestration | delegation, independent validation, conflict handling |
| UI/product experience | user-facing workflow, empty/loading/error states, control clarity |
| Memory/knowledge | durable learning, stale-context handling, source provenance |
| Safety/security | secrets, permissions, approvals, dependency risk, prompt safety |
| Observability | logs, audit trails, traces, failure recovery, status reporting |
| Integrations | IDEs, CLIs, repos, issue trackers, calendars, docs, deployments |
| Documentation | onboarding, examples, troubleshooting, operating constraints |
| Differentiation | where Solvys should be unlike the anchors on purpose |

## Evidence Scoring

Use this scale when useful:

- `0 absent`: no evidence the capability exists
- `1 ad hoc`: possible manually, no reliable pattern
- `2 functional`: works in a narrow or partially documented path
- `3 productized`: repeatable, documented, validated, and easy to invoke
- `4 differentiated`: stronger than the anchor for Solvys' target workflow

Every score needs a citation or repo/live proof. If evidence is weak, write `unknown` instead of guessing.

## Gap Classification

Classify every gap:

- `missing`: anchor has a capability Solvys needs and lacks
- `thin`: Solvys has the capability, but it is fragile, undocumented, or not proven
- `hidden`: capability exists in code/docs but is not surfaced to users or agents
- `operational`: process exists but validation, ownership, or status is weak
- `intentional`: anchor pattern conflicts with Solvys product strategy
- `not relevant`: anchor pattern does not map to the target user/job

Severity:

- `P0`: blocks shipping or creates safety/release risk
- `P1`: materially slows TP, agents, operators, or customers
- `P2`: quality or adoption gap with clear payoff
- `P3`: nice-to-have or future differentiation

## Recommendation Shape

Each recommendation should use this structure:

```markdown
### {Recommendation}

- Classification: adopt now | prototype | strategic bet | do not chase
- Source rationale: {Anthropic/Codex evidence with citation}
- Solvys evidence: {repo/live proof or gap}
- Solvys-native implementation: {components/services/prompts/skills to reuse first}
- Likely files/repos: {paths or repos}
- Validation: {browser/API/release/eval proof}
- Risk: {security, copy, product, dependency, operational}
- Owner decision needed: {yes/no and why}
```

## Anti-Copy Rules

- Do not reproduce competitor copy, screenshots, illustrations, icons, code, prompt text, pricing tables, or internal workflows.
- Translate patterns into Solvys vocabulary, source canon, and product architecture.
- Prefer "what job does this solve?" over "make ours look like theirs."
- Keep aspirational anchor patterns separate from same-product fit.
