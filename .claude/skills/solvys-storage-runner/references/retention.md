# Retention and source custody

## Generated build caches and source custody

Owner clarification captured in the 2026-10-08 sweep: a generated build cache may be deleted when the repository retains its code. This is different from deleting a checkout or retiring source, which still requires complete remote-main preservation under the 30-day rule below.

1. Resolve the actual repository, owning project, remote and source revision. Folder names are not project identity: an older `goalpost` folder can be the parked Macro fork rather than the current Goalpost product. Inspect the candidate's actual build system and scope before using its native cleanup command.
2. Verify the cache contains only reproducible generated output, is not tracked source or user data, and has no unique artifacts, installed-runtime references, recovery dependencies, active build, upload or open handle. A Cargo `target` directory should have the expected cache tag and ignored-output structure. Keep credentials, source, staged/unstaged/untracked work and legitimate product media intact. Record source hashes and status before and after.
3. Preserve the source in its repository. An unrelated dirty tree does not itself block deleting a verified generated cache. If the owner requires Cloud code custody, read back the remote branch/tree and compare the relevant source content. Different commit IDs can contain the same tree; compare contents for rebases or squashes instead of assuming a missing local SHA means the code is absent. A branch containing all code proves branch custody, not a merge into `main`.
4. When asked for the last merge, inspect merged PR records and current remote `main`; record the PR URL, merge SHA and `merged_at`, and report the date/time in America/New_York. Repository push time, local commit time or an old checkout's HEAD date is not the last merged date and does not alone prove 30-day inactivity.
5. A configured remote compiler cache, GitHub source and an exact copy of the Mac's build output are separate facts. Do not claim that an exact local cache exists in the Cloud without host/provider readback. A Cloud copy of reproducible output is not normally necessary when the code is preserved and no stronger owner condition applies.
6. Honor the latest owner sequencing instruction. If the owner says merge first, leave the exact deletion pending until the authorized merge and remote readback complete, or until the owner explicitly grants an exception. Keep an action manifest containing the prerequisite, approved path, code-custody proof and deletion state. Recheck it immediately before mutation.
7. On interruption or a changed instruction, inspect any already-started cleanup process before issuing more mutations. Record what actually completed under the earlier authority. Do not imply that deletion followed a later merge if it happened first, and do not recreate a large cache just to manufacture that order. Preserve the source and report the timing plainly.
8. Use the build system's exact native cleanup and dry run, such as `cargo clean --target-dir /exact/approved/target --dry-run` followed by the same command without `--dry-run`. Verify target absence, preserved source and before/after filesystem capacity. Do not merge, upload or create durable backup copies of disposable build output.

## Preservation merge repair boundary

Use an existing matching PR where possible. Confirm the local source and remote PR contents, current remote base, current checks and any automatic deployment or cross-repository side effects before changing a branch.

An explicit instruction to “merge it, then delete it” authorizes the ordinary preservation merge and the specified cleanup as one sequence. Carry both through without asking for the same permission again: verify required checks, complete the authorized merge, read back the relevant source on remote `main`, then delete the exact eligible output and measure the result. Use the last merged date as evidence, but compare current local source with remote contents; a recent merge alone does not prove that all local work is preserved. The scope and failed-check boundaries below still apply.

- Existing merge authority covers ordinary preservation commits/pushes and bounded necessary admission repairs. Fix an owned setup defect at its source, regenerate generated configuration with the repository's tool, and verify the result. Keep source, isolated worktree, exact patch, checks and remote readback reviewable. Preserve the primary dirty checkout and do not overwrite concurrent branch work.
- Identify genuinely required quality checks separately from optional previews using the repository's declared contracts. An optional upstream AWS preview does not prove product readiness and does not justify creating credentials or enabling another provider. Do not waive real security, test or branch-protection gates to complete a storage task.
- Diagnose a failing check before retrying. Prefer existing CI evidence and read-only Git/file queries that do not populate dependency stores. Measure an actual buffer/resource limit before changing it; compare the same workload afterward. Do not repeatedly install, rebuild or launch unchanged failing checks to manufacture progress.
- Scope expansion is an owner decision when admission requires a billing/authentication migration, a pre-release major SDK, a separately maintained security backport, product behavior/design changes, credential provisioning or paid infrastructure. Prepare the exact blocker, affected dependency/interfaces, current code-custody proof and smallest reviewable options before asking. Continue independent eligible cleanup while the decision is pending.
- If the main merge remains blocked, leave the code, PR, worktree and recovery state intact. A verified pushed branch can be reported as source preserved on that branch, but it does not satisfy a main-merge prerequisite for checkout retirement or an owner-ordered deletion. Do not call the merge complete.
- Track storage consumed by task-created dependencies, caches, evidence archives and temporary worktrees. Use verified external temporary output where authorized. Remove only task-owned disposable output once its use ends; retire registered worktrees through their supported lifecycle only after code and metadata custody are settled.

## Temporary recordings after merge

Sam's 2026-10-07 direction: screen recordings used to demonstrate, study or verify task work are temporary. Do not merge them with the work. Wipe them after that work is verified on remote `main`; this task-specific post-merge authority supersedes ordinary recording age or historical-reference retention.

- Store new task recordings and intermediate renders outside product repositories, in the task's registered Agent Clutter `recordings/` directory or verified external temporary scratch. Keep only paths, hashes, sizes, task/PR identifiers and the merge proof in receipts. Do not create durable backup copies merely to avoid deletion.
- Before each commit or PR, inspect staged files and exclude identified raw recordings, review exports and temporary extracted frames. Unstage only exact task-owned media with `git restore --staged -- <path>` when needed; preserve the working file until merge. Do not use broad video ignore patterns that hide legitimate product media, training data or user uploads. Existing tracked review media requires a scoped removal change through the normal repository workflow; do not rewrite Git history or silently mutate `main`.
- Associate each recording with its actual repository, task and source revision. Verify the completed task's exact change on current remote `main`: ancestry for a normal merge, or corresponding content and PR merge proof for a squash. A closed task, old filename or merged unrelated commit is insufficient.
- Revalidate file identity/hash, owning task, open handles, active upload/render references and any explicit owner hold immediately before deletion. Delete the exact approved raw recording and task-owned review copies, intermediate renders and extracted frames. Preserve application media, unrelated personal recordings, active or unmerged task recordings, and recovery archives with independent custody obligations. A missing association blocks that candidate, not other cleanup.
- Keep compact test results and merge/deletion receipts; they replace the need to retain the raw video. Record removed paths and measured disk gain. Mark expired video links in the existing task receipt or review card where authorized. Do not claim that media was removed from Git history, hosted attachments, Cloud hosts or backups without verifying that surface and its authority.
- No 30-day waiting period applies to a verified post-merge recording. Producers clean up at merge handoff, and Storage Runner catches leftovers on subsequent sweeps. A policy edit does not prove that already-running workers or scheduled runs have reloaded it.
- An explicit owner instruction to delete identified recordings now is an exception for those exact files, even before merge. Record the exception, verify file identity and active-use checks, and carry out the deletion without requesting the same approval again. It does not authorize deleting other unmerged recordings or their derived reports.

## Codex custody size budget

Sam requested a maximum custody size on 2026-10-07 and delegated the numerical choice. Use these local operational limits, not purported Codex vendor defaults:

| Scope | Maximum | Cleanup target after a breach |
| --- | --- | --- |
| Archives plus old sessions combined | 5.00 GB (5,000,000,000 bytes) | 4.00 GB (4,000,000,000 bytes) |
| Archives alone, included in the combined total | 2.00 GB (2,000,000,000 bytes) | 1.50 GB (1,500,000,000 bytes) |

This combines size and age retention with a lower cleanup target to avoid repeated tiny sweeps. The exact budgets are chosen for this Mac; the general size-plus-age pattern is documented in [systemd journal retention](https://www.freedesktop.org/software/systemd/man/252/journald.conf.html). Codex conversations have stronger continuity protections than ordinary logs.

- Measure each accessible host separately. Archives include every archived rollout. Old sessions are non-archived rollouts with at least 30 days since the newest verified meaningful indexed activity or rollout modification. Count protected old sessions too; unknown dates or identities go into a separately reported unknown bucket and prevent claiming full compliance.
- Deduplicate resolved paths and file identities. Use the larger of allocated and logical bytes for budget decisions, report both separately, and never count an archived session twice. Report recent/live sessions, databases and recovery backups separately; their exclusion from this budget is not permission to remove them.
- Enforce the existing 30-day retention rule even below budget. If either maximum is exceeded, prioritize the oldest independently eligible sessions, with larger files first for equal activity dates. Continue to the breached scope's cleanup target when eligible data permits. Recheck protections and descendants immediately before each bounded lifecycle action.
- A size breach does not shorten the 30-day inactivity requirement or override active, current, pinned, paused, blocked, referenced, open-handle, nonterminal-goal or parent/child protections. Non-archived old sessions additionally require verified task closure before supported archival and deletion; an old file is not proof that the task is closed. Preserve original meaningful activity evidence across administrative archival.
- Never truncate, compress in place, move rollout files, alter session databases, or raw-delete history to meet a limit. Use supported Codex lifecycle commands and verify index and path results. Preserve durable memories and recovery archives.
- When eligible data cannot reach the budget, record `over_budget_protected` with exact measured bytes, excess, protected IDs/reasons and the missing owner decision or host capability. Report this as a failed capacity gate, not successful enforcement. Do not silently increase the budget or transfer history to another disk to hide it.
- Every sweep receipt records both maxima, cleanup targets, archive bytes, old-session bytes, unknown bytes, protected bytes, eligible bytes, actions and remaining excess. Existing automation already invokes this canonical skill; read back that pointer and preserve its schedule and notification preference. A source update does not prove an already-running agent has reloaded it.

## Codex archives: 30 days

Use the installed Codex CLI's supported archive/delete lifecycle, confirmed with `codex archive --help` and `codex delete --help`. Never unlink rollout logs or mutate the thread database directly.

1. Read the thread index in SQLite read-only mode and obtain current app task state. Verify exact thread ID, archived state, rollout path, and file identity from the session metadata.
2. Use the newest meaningful indexed activity and rollout-file modification as the inactivity date. Require at least 30 days of inactivity. Record the archive timestamp separately: an administrative archive operation is not new task work and does not restart the inactivity clock. If timestamps cannot distinguish activity from administrative changes, preserve until verified.
3. Exclude the current task, pinned tasks, active or nonterminal goals, open handles, active parent/child task dependencies, and references in durable memory or automations. Preserve unknown identities or unavailable protection checks.
4. Before deleting a parent, recursively verify every descendant is independently eligible: Codex deletion can cascade to child sessions. Preserve the parent if any child is protected, recent, or unknown. For an already archived eligible thread, use `codex delete --force <verified-thread-id>`. Do not rearchive it and reset its age. Work in bounded batches; stop on unexpected deletion failure and inspect before continuing.
5. Verify both index state and rollout-path absence. Save IDs, measurements, and outcomes, not transcript contents or credentials. Do not bypass a failed lifecycle command with raw deletion.

The reported archive total must distinguish archived files from live session files. A large live transcript is not an archive. Evaluate closed live sessions for supported archival separately; size alone does not waive the 30-day retention rule or activity protections. Preserve durable memory.

For Cursor and Devin, inspect supported lifecycle mechanisms and use the same continuity checks. Codex commands never apply to another platform's sessions.

## Repositories untouched for 30 days

1. Resolve canonical root, owning project, remote, all local branches and linked worktrees. Determine the latest meaningful source/task activity from task records, source modifications and Git reflogs. Directory mtime or an old HEAD date alone cannot establish inactivity. If evidence is missing, record a baseline and defer.
2. Protect active, pinned, paused, blocked, open, or referenced projects. Inventory staged, unstaged, untracked and unique ignored data. Reconcile all relevant branch/worktree work; the newest timestamp alone does not define the complete latest state.
3. Read onboarding, project state and ownership before modifying source. Create a truthful checkpoint of verified owned work, excluding secrets, caches and unrelated data. Existing authorization covers ordinary preservation commits and pushes. Do not guess at conflicting changes or publish credentials.
4. Fetch and verify the remote `main`. Integrate through the repository's ordinary required checks and merge process. Do not force-push, rewrite history, bypass branch protections, accept failing required checks, or trigger a separate deployment operation. If merging main automatically deploys and that deployment lacks standing authorization, preserve and report that gate.
5. Verify the resulting remote `main` contains all work to be retired. A pushed side branch is insufficient. For squash merges verify resulting contents/diff rather than requiring ancestry. Preserve unique non-Git state and credential custody separately; unresolved custody blocks local removal.
6. Only after successful remote main readback, retire linked worktrees through their owning lifecycle, then the primary checkout. Do not delete a primary repository while another live worktree depends on its Git directory. Verify absence and measured gain.

If there is no main branch, no writable remote, a conflict, uncertain source ownership, failed checks, or a unique local artifact, report the exact blocker and leave that candidate. Continue other eligible cleanup.

## Worktrees and explicit retirement

Retain the earlier four-day inactive auxiliary-worktree review cadence. Measure from meaningful task closure or activity, not an unreliable folder date. For ordinary worktree expiry, verify commit/push and remote readback, no active references, no handles, and no unique unpreserved data. The 30-day whole-repository retirement additionally requires remote main integration.

For attached Codex-managed worktrees, use the app's supported archive lifecycle. For ordinary Git-linked worktrees use Git's worktree lifecycle. `--force` is appropriate only where explicit retirement covers the dirty work. Never raw-delete a registered or opened worktree. Preserve primary, pinned, shared and otherwise protected managed worktrees when the lifecycle tool disallows removal.

An explicit named project retirement can authorize removing obsolete dirty source without merging it. Record that distinction. Verify version ownership and replacement isolation before deletion; date or name resemblance alone is insufficient. Do not extend code retirement to mixed application databases, credentials, or global recovery archives without ownership evidence and scope.

The read-only helper `scripts/archive_candidates.py` accepts `--protected-task-ids` (a fresh JSON array from app pinned/current tasks) and `--output` (external JSON receipt). It checks index identity, goals, references, open handles, age, and cascading child eligibility. Refresh and recheck candidates before executing deletion.
