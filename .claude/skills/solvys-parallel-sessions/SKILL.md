---
name: solvys-parallel-sessions
description: Use for Solvys work that needs parallel planning or review sessions and repository-backed Cloud implementation tasks. Never launch sub-agents.
---

# Solvys Parallel Sessions

Use this skill when a Solvys plan needs independent planning or review sessions
and repository implementation in Cloud. It replaces sub-agent routing with
visible Codex sessions and a single local integration owner.

Follow the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) when
dispatching or assembling tracks: YAGNI, existing repo seam, standard library or
native platform, already-installed dependency, maintained OSS with lower
ownership cost, one line, then minimum custom code. Reuse the prepared Cloud
branch or worktree before creating a new copy.

## Operating rule

This skill never calls a Task tool, launches a `codex exec` child, creates a
hidden sub-agent, or delegates through a connector. Use separate, visible Codex
sessions for independent planning or review. Use the Luna model configured in
Codex (currently `gpt-5.6-luna` in `~/.codex/config.toml`) unless the user gives
a different model.

## Session sequence

1. **Ground the control session.** Read the current repository instructions,
   `git status -sb`, the accepted plan revision, the exact starting ref, and
   the protected zones. Keep the local planning or integration session
   read-only unless a documented local exception applies.
2. **Open parallel Codex sessions only for independent work.** Give each
   session a complete brief, exact scope, owner, dependencies, proof gates,
   and return path. Use no more than three sessions in one wave by default.
   The control session owns ordering and final integration.
3. **Send implementation to a Solvys Cloud Task.** Every task uses a
   repository-backed Cloud environment and a task-owned detached worktree.
   The pickup record must include the exact repository slug, base SHA/ref,
   environment ID and label, detached-checkout proof, date integration branch,
   checkpoint ref, owner, protected zones, dependency and secret-name lists,
   proof gates, budget, exit condition, and authenticated Git return route.
4. **Return the accepted checkpoint.** The Cloud task publishes its commit or
   checkpoint to the named Git route. The local daily integrator fetches that
   exact ref, verifies the expected SHA and clean-start receipt, and reads the
   changed files back into the local integration lane. Never copy files from a
   scratch directory or merge an unverified path.
5. **Review and deploy from the readback.** Run repository tests and the
   highest available browser, Plannotator, deployed, or installed proof in the
   local review lane. Deploy only after the local integrator records the Cloud
   receipt, validation result, ownership check, and remaining blockers.

## Frontend and backend boundaries

- Frontend sessions create or update the project-owned ChatGPT Site and use its
  URL in the Codex in-app browser for implementation checks. When visual or
  content review is needed, automatically open the Site-derived local HTML
  artifact with `human-review`, then apply feedback to source and refresh the
  Site. Install or confirm the UI hierarchy before composing: BeUI Pro/BeUI,
  Motionary.dev/ascertainty UI, and Bklit/EvilCharts for data visualization.
  Use the library block first; a custom component or block requires a recorded
  no-fit exception. Wonder owns new frontend proposals and their diffs before
  Site deployment. Existing Builder and Plasmic artifacts are protected legacy
  inputs unless TP explicitly selects a source transfer.
  Impeccable and Apple Design govern interaction quality. TP owns palette,
  effects, spacing adjustments, and polish.
- Every frontend session builds a 1:1 runnable Site prototype at the accepted
  scope. Match copy, geometry, data meaning, routes, controls, states,
  responsive behavior, accessibility, and interaction feedback. Reject
  placeholder or fake product behavior and record the fidelity target and
  evidence.
- Backend sessions reuse the recorded proven stack and default to Fly.io,
  Supabase, Cloudflare, Vercel, and PostHog in their documented roles. Add
  another technology only when best practice lowers lifetime tech debt and
  maintenance enough to justify the client's cost; record the tradeoff,
  license, security, and exit path.
- All sessions preserve dirty work, `main`, credentials, client partitions,
  and protected evidence. A session reports `planned`, `implemented`,
  `verified locally`, `review-ready`, `deployed`, or `live` truthfully.

## Required return receipt

Return one compact receipt with the session type, model, repository and exact
base ref, Cloud environment ID/label when implementation ran, task checkpoint,
commit SHA, files changed, commands and proof results, unresolved blockers, and
the next owner. If any required Cloud field is missing, stop the implementation
dispatch and report the missing field.
