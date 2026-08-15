# Breakthrough record

- Trigger: explicit TP directive
- Date: 2026-08-15
- Project: Solvys-wide
- Sprint: Build Kit custody and UI assembly policy
- Problem or repeated mistake: Agents could invent generic UI components and choose product colors without one mandatory assembly source.
- Observed mechanism: Approved libraries existed, but the shared rule allowed a no-fit record to become an agent-owned design decision.
- Why the existing guardrail failed: The hierarchy named preferred libraries without assigning final component and palette authority to TP.
- Smallest prevention rule: Use approved Build Kit blocks, require TP approval for every custom component, default to grayscale, and reserve palette selection for TP.
- Durable layer selected: Factory canon, Build Kit skill, local canonical package, Git history, and Codex memory
- Changed records or files: `factory/canon/solvys-ui-assembly-policy.md`, `.claude/skills/solvys-build-kit/SKILL.md`, and the canonical package README
- Proof and readback: Build Kit inventory receipt, local Git commit, public policy commit, remote readback, and shared-path resolution
- Protected zones: Licensed BeUI Pro and Aceternity source; user-owned product palettes and product-specific UI decisions
- Owner: TP
- Next gate: Every frontend sprint must load the Build Kit and record TP approval before a custom component or non-grayscale palette enters implementation.
