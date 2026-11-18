---
name: solvys-storage-runner
description: Reclaim storage across Devin, Cursor, and Codex, including all Git worktrees, agent archives, dependencies, runtimes, and old codebases. Use for storage pressure, cleanup, 30-day retention, repository retirement, and scheduled storage sweeps.
---

# Solvys Storage Runner

Keep the Mac usable by measuring the largest consumers and completing authorized cleanup. Do not repeatedly prune tiny caches while overlooking repositories, runtimes, worktrees, or archives.

## Standing authority

Sam approved these rules on 2026-10-02 in task `01a0d3a1-f212-7e61-a9c6-6c11484394c8`:

- Scope includes Devin, Cursor, and Codex, locally and on accessible Cloud hosts, including worktrees outside default folders.
- Apply a 30-day retention limit to eligible Codex archives through supported Codex deletion.
- Apply the Codex custody budget requested on 2026-10-07: at most 5.00 GB combined for archives and old sessions, including a 2.00 GB archive sublimit. Follow the measurement, cleanup and protected-overage rules in [retention.md](references/retention.md#codex-custody-size-budget). Every recurring sweep must evaluate these limits alongside both 30-day rules.
- Screen recordings used for task review or verification are temporary, stay out of code commits, and must be wiped after the associated work is verified on remote `main`, under Sam's 2026-10-07 direction. Apply [the recording lifecycle](references/retention.md#temporary-recordings-after-merge) every sweep.
- Generated build caches are disposable when their code remains preserved in the repository. Unrelated dirty source alone is not a reason to keep a verified generated cache. Apply [generated-cache custody and sequencing](references/retention.md#generated-build-caches-and-source-custody); an explicit owner instruction to merge first is a separate prerequisite.
- For codebases untouched for 30 days, preserve the complete latest work, merge it into remote `main`, verify it there, then delete the local checkout. Ordinary checkpoint, push, and merge operations are authorized. Conflicts, secrets, failed required checks, unclear ownership, or unpreserved data stop that candidate, not the whole sweep.
- Execute the specific T3Code and Zenmium retirement in [retirements.md](references/retirements.md). The three-day cutoff is specific to the Goalpost replacement, not all projects.
- Use writable external temporary scratch under `/Volumes/Ext./Solvys-Temp/` when available. Verify writing and readback first. Preserve existing recovery archives and replacement dependencies.

These directions supersede earlier cache-only scope and custody-only external-temp restrictions for this workflow. They do not authorize deleting unrelated user data, credentials, deployed services, or other projects. Do not message people or other tasks without separate explicit authorization.

## Run sequence

1. Read current CAOStack, Core manifest, Factory entrance, and folder contract. Use the existing verified Core startup result when supplied. Before source changes, read the project's Welcome Mat or onboarding composite, lane sign, canonical project state, and latest receipt. Record actual branch, SHA, remote, dirty ownership, and protected paths.
2. Inspect existing Storage Runner automation and receipts. Update the existing automation rather than creating duplicates. Use the app automation tool and verify saved status; a skill alone is not a scheduler.
3. Record exact free space and total capacity on `/System/Volumes/Data` and each other changed filesystem. Distinguish disk capacity from RAM pressure. Inspect memory pressure, swap, and task-owned processes without summing shared RSS as unique memory. Below either 10.00 GB or 5.00 percent internal free, do not start local installs, checkouts, builds, previews, or servers.
4. Inventory bounded roots first, then descend into the largest consumers. Include codebase source, Git history, dependencies, build output, old runtime versions, agent session databases, archives, caches, and redundant installers. Inspect hidden tool and plugin roots as well as the registered codebase roots; Git checkouts can live inside plugin caches, such as `.bb/plugins/cache/git`. Constrain disk scans to one filesystem (`du -x` where supported), resolve aliases, and do not count an external mount or shared file twice. Do not infer that default worktree folders being empty means no worktrees exist.
5. Enumerate each repository's `git worktree list --porcelain`, including nested repositories, alternate locations, missing registrations, and accessible Cloud hosts. Resolve symlinks without counting the same data twice. Mark inaccessible hosts unverified.
6. Write an exact candidate manifest with path, owning platform/project, allocated and logical size when available, last meaningful activity, dirty status, recovery dependencies, active references, and open handles. Separate source, reproducible output, and user data. Inspect the most valuable eligible candidates first.
7. Execute supported cache pruning only when no install is active. Resolve actual cache locations before using pnpm, npm, Bun, or uv cache commands. For generated build caches, verify preserved code, exact ignored/untracked output, no unique data or runtime/recovery dependency, no active build or open handle, and the exact native cleanup dry run. Protect and compare dirty source before and after. Other ignored dependency removal still requires a clean checkout, verified remote HEAD, exact dry-run path, and no unique data. Explicit named retirement can authorize removing dirty source within its exact scope.
8. Apply [retention.md](references/retention.md) to archives, worktrees, and inactive repositories. Never raw-delete session logs or registered worktrees. Preserve active, pinned, paused, blocked, open, or referenced state unless an exact user retirement explicitly supersedes the relevant protection.
9. For retired services, stop only the identified service belonging to the authorized retirement. Do not kill applications, renderers, SSH, uploads, previews, or unknown processes to manufacture capacity. Remove redundant DMGs only after installed version/signature proof and handle checks. Do not empty Trash or broad Downloads folders.
10. Verify each action's result and replacement integrity, then measure the same filesystems again. Record partial failures and any new task-created worktrees, downloads, dependencies or output that consumed reclaimed space. Do not rebuild or install a product merely to prove a generated cache is disposable. Resolve ordinary permission issues only within verified owned targets; never broaden a failed deletion to a parent directory.

For a preservation merge, inspect the existing PR and current checks, and use [the bounded merge repair rule](references/retention.md#preservation-merge-repair-boundary). Storage cleanup does not authorize a billing migration, advisory waiver, product redesign or activation of legacy infrastructure.

## Deep cleanup and active workspace escalation

Owner direction, 2026-10-13: when a sweep leaves insufficient capacity, descend into the largest remaining consumers and execute verified eligible cleanup. Add newly verified cleanup classes and their exact eligibility checks to [deep-cleanup.md](references/deep-cleanup.md). Read that reference on every sweep. A small cache purge does not close a capacity failure.

Every storage issue belonging to an ACTIVE workspace must appear in an explicit infrastructure reassignment report. Include canonical workspace path, project/task owner, activity evidence, filesystem, allocated/logical bytes, reusable output versus source/state, current sandbox binding, and the proposed reassignment with its access/cost/custody prerequisites. Preserve the workspace until reassignment and replacement integrity are verified. Unknown ownership stays unresolved; do not label it inactive or silently delete it. Report the finding to Sam in the current session. This does not authorize messaging other tasks, buying infrastructure, or moving an active runtime.

## Reporting and recurring operation

Use decimal GB with two decimal places for every user-facing storage value. Keep precise integer measurements in the machine-readable receipt. Report largest consumers, exact removed paths, protections, failed candidates, worktree coverage, and whether admission thresholds are met. Distinguish logical candidate size from measured free-space gain, and note concurrent disk activity where relevant. Do not add gains from previous runs or count one APFS filesystem twice.

Recurring prompts must invoke this skill, enforce both 30-day rules, the Codex custody size budget and the post-merge recording lifecycle, and preserve the existing notification preference. Stay quiet on unchanged or non-actionable state; report meaningful cleanup, failure, or necessary user action. Keep the runner task visible unless Sam asks to archive it. Never claim scheduling or Cloud cleanup without readback.

Report verified cleanup and coverage separately. Name inventoried roots/worktrees, inaccessible paths or hosts, retained candidates and unfinished retirement checks. A successful deletion or passing free-space threshold does not prove that everything was covered. Do not describe configured Cloud caching as a verified backup, or source-policy changes as proof that scheduled or already-running agents reloaded them.

End each sweep with this exact line, replacing the amount with the measured nonnegative aggregate gain:

`Total measured storage freed this sweep: X.XX GB.`
