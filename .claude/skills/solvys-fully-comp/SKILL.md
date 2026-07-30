---
name: solvys-fully-comp
description: Competitive analysis and improvement planning for Solvys systems using current deep research on Anthropic/Claude and OpenAI Codex as external truth anchors. Use when comparing Fintheon, Solvys-1, HeirRight, Solvys skills, agents, orchestration, coding workflows, UI patterns, evaluations, or operational systems against frontier agent products and turning gaps into Solvys-native improvements.
---

# Solvys Fully Comp

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


Run a research-grounded competitive comp that turns Anthropic/Claude and OpenAI Codex product truth into concrete Solvys improvements.

Use this skill for system-level benchmarking, agent UX reviews, coding-agent workflow improvements, orchestration upgrades, safety/evaluation comparisons, documentation upgrades, and product-planning gaps where "how do we stack up?" needs source-backed answers.

## Core Contract

- Load `SOLVYS_AGENT_SYSTEM_PROMPT.md` from the Solvys skills repo or installed copy before evaluating Solvys products.
- Keep the skill runtime-neutral. `.claude/skills/` is only the compatibility distribution path.
- Date-stamp the research pass. Anthropic and Codex move fast; do not rely on stale memory for product claims.
- Use primary sources first: official Anthropic, Claude, OpenAI, Codex, API, release-note, docs, and product pages. Use secondary sources only as market interpretation.
- Cite sources for every competitor claim. If a claim cannot be sourced, mark it `UNVERIFIED` or remove it.
- Treat Anthropic and Codex as outsourced truth anchors, not templates to copy. Translate their proven patterns into Solvys-native improvements.
- Anchor Solvys truth in the actual repo, docs, screenshots, runtime behavior, and product surfaces. Do not compare against imagined Solvys capability.
- For any recommendation that creates a new Solvys project or greenfield frontend, require `/solvys-discovery` and `refero-design` before frontend implementation planning. The improvement plan must cite the Refero reference lock before naming frontend files, CSS, generated UI, or implementation-ready visual direction.
- Preserve intentional dirty work and current branch strategy in every repo touched.

## Workflow

1. Define the comp target.
   - Name the Solvys product, surface, or workflow being compared.
   - State the improvement decision the comp should support.
   - Decide whether this is a product UX, coding-agent, orchestration, infra, evaluation, safety, or go-to-market comp.

2. Gather Solvys truth.
   - Read repo instructions, README, active briefs, changelog, hidden docs, and current source for the target surface.
   - For UI or runtime behavior, use the highest-reality proof available: browser, packaged app, live preview, screenshots, diagnostics, or real API responses.
   - List what is confirmed, what is inferred, and what is unknown.

3. Deep-research the anchors.
   - Research Anthropic/Claude and OpenAI Codex from current public sources.
   - Capture source URL, title, publisher, access date, and the specific claim supported.
   - Separate official product truth from analysis, community anecdotes, or speculation.

4. Normalize the comparison.
   - Use the dimensions in `references/competitive-analysis-playbook.md`.
   - Score only when evidence exists. Pair every score with a source or repo proof.
   - Call out where Solvys is intentionally different and should not chase the anchor.

5. Convert gaps into Solvys-native improvements.
   - Prefer existing Solvys components, services, prompts, skills, and UI canon before proposing new systems.
   - Sort recommendations into `adopt now`, `prototype`, `strategic bet`, and `do not chase`.
   - For each recommendation, include likely files/repos, implementation shape, validation proof, risk, and source rationale.

6. Produce the comp.
   - Lead with the verdict and the highest-leverage improvements.
   - Include the source ledger, capability matrix, gap inventory, and improvement plan.
   - Be explicit about research gaps or claims that could not be verified.

## Required Output

Produce a markdown comp with these sections:

- `Verdict`: one paragraph on where Solvys is ahead, behind, or deliberately different
- `Research Window`: dates, sources searched, and any unavailable surfaces
- `Source Ledger`: cited Anthropic, Codex, and Solvys evidence
- `Capability Matrix`: dimension-by-dimension comparison with evidence
- `Gap Inventory`: gaps, severity, user impact, and whether the gap is real or optional
- `Solvys Improvement Plan`: reuse-first recommendations with files/repos, validation, and risk
- `Do Not Chase`: competitor patterns that should not become Solvys work
- `Open Questions`: missing evidence or decisions for TP

## Review Checks

Before closing, verify:

- competitor claims are cited and date-stamped
- Solvys claims come from repo/live/product evidence, not assumption
- recommendations reuse Fintheon, Solvys-1, HeirRight, shared skills, or existing Solvys infra first
- greenfield frontend recommendations are blocked behind `/solvys-discovery` and a `refero-design` reference lock
- no recommendation copies proprietary competitor behavior, wording, or visuals
- every improvement has a validation path stronger than "build passes"
