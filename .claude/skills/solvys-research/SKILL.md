---
name: solvys-research
description: Fast deep-dive research workflow for Solvys questions, technical topics, product decisions, architecture choices, market/tool investigations, and "what should we use?" asks. Use when the user wants a direct answer grounded in primary sources, repo truth, falsifying checks, and OSS solution options when applicable, without running the full greenfield /solvys-discovery planning process.
---

# Solvys Research

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


Use this skill to answer a specific research question quickly and well. It borrows the best parts of `/solvys-discovery` - deliberate problem framing, primary-source intake, assumption testing, contradiction handling, and OSS leverage - but it does not produce a full product plan unless the user asks for one.

Default output is a direct answer in the chat. Create a durable file only when the research needs to feed implementation, Linear, a sprint brief, or a future agent handoff.

## Core Contract

Start with the problem we are trying to achieve, not the topic label.

- State the desired outcome in one sentence.
- State the exact question being answered.
- Identify who needs the answer and what decision it should unlock.
- Time-box the first pass. Prefer the smallest source set that can answer the question honestly.
- Use primary sources first: official docs, source repos, papers, standards, changelogs, package registries, issue trackers, real product pages, repo code, raw data, or direct artifacts.
- Search the current web when facts can drift, tools/libraries may have changed, or recommendations depend on current maintenance.
- Inspect the local repo first when the question is about an existing Solvys/Fintheon/HeirRight/SSFitness codebase.
- Include OSS solutions when applicable, but only after checking license, maintenance, fit, integration cost, and security/runtime risk.
- Answer as soon as the evidence is strong enough. Do not turn a narrow answer into a full discovery pack.

## Workflow

### 1. Frame The Target

Write a compact frame before researching:

```text
Outcome:
Question:
Decision this unlocks:
Current best guess:
Fastest falsifying check:
```

If the question is too broad, ask the smallest blocking question. If a reasonable assumption is safe, proceed and name it.

### 2. Gather Source Truth

Use this order:

1. **Repo truth** - local docs, source files, package manifests, active briefs, changelog, scripts, tests, runtime config, and existing architecture.
2. **Primary external sources** - official docs, GitHub repos, package registries, release notes, specs, standards, academic papers, vendor docs, pricing/docs pages, and public product docs.
3. **Raw artifacts** - screenshots, logs, traces, support tickets, transcripts, benchmark output, issue threads, examples, or real workflow output.
4. **Secondary sources** - blog posts, comparisons, social posts, forums, or market commentary. Use these for interpretation only, not factual anchors.

Keep a tiny source ledger while working:

```text
Source:
What it proves:
What it does not prove:
```

### 3. Test The Answer Shape

Before finalizing, run a quick falsification pass:

- What fact would make this answer wrong?
- Is there a contradictory source?
- Is the source stale or marketing-biased?
- Is the repo already solving this differently?
- Is this a nice idea but too heavy for the actual task?
- Is there an OSS option that removes build risk?

If the contradiction matters, include it. If it changes the answer, change the answer.

### 4. OSS Solution Scan

Do this when the question could be solved by a library, framework, template, agent/tooling framework, CLI, protocol, hosted service, or open-source app.

For each serious candidate, check:

- **License** - MIT, Apache-2.0, BSD, MPL, source-available, commercial, unknown.
- **Maintenance** - recent commits/releases, active issues, maintainer responsiveness.
- **Fit** - language/framework/runtime match, API shape, deployment model, data model.
- **Adoption signal** - stars/downloads/users are supporting context, not proof.
- **Security/runtime risk** - auth, secrets, sandboxing, native dependencies, supply-chain exposure, browser automation risk, cloud lock-in.
- **Adoption level** - dependency, fork, code reference, pattern only, or reject.

Prefer maintained OSS frameworks for generic runtime/workflow/memory/tracing/tool-routing/approval primitives. Keep custom Solvys code for product-specific adapters, domain rules, UI canon, and source-owned workflows.

### 5. Answer Fast

Default answer shape:

```markdown
Verdict: [direct answer]

Why:
- [evidence-backed point]
- [evidence-backed point]

OSS options, if useful:
- [name/link]: [license], [fit], [adoption level], [risk]

What I would do:
1. [next action]
2. [next action]

Confidence / gaps:
- [known unknowns, stale risk, or blocker]
```

For simple questions, compress this into a few direct paragraphs.

For implementation-facing research, add:

```markdown
Repo fit:
- Existing seam:
- Files likely touched:
- Validation proof:
- Do not do:
```

## Durable Output

Only create a file when useful. Default path:

```text
docs/research/[topic-slug]-research.md
```

Use this structure:

```markdown
# Research: [Question]

## Outcome
## Verdict
## Source Ledger
## Evidence
## Contradictions / Risks
## OSS Candidates
## Recommendation
## Implementation Hand-off
```

## Guardrails

- Do not over-ask. Ask only for the missing detail that would materially change the answer.
- Do not substitute vibes, stale memory, or generic rankings for source evidence.
- Do not present an OSS candidate as safe until license, maintenance, and fit are checked.
- Do not copy proprietary code, trade dress, pricing tables, protected assets, or long source passages.
- Do not let secondary commentary outrank primary sources or repo truth.
- Do not bury the answer under the research trail. Lead with the verdict.
- Do not create a sprint plan, frontend direction, or run-point structure unless the user asks to continue from research into planning.

