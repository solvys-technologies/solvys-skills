# Deep storage cleanup and infrastructure reassignment

Apply the existing retention and custody rules alongside this reference. Exact paths below are discovery leads from the October 12/13 sweep, not permanent deletion allowlists. Revalidate identity, ownership, installed replacement, active references and handles immediately before each action.

## Rank actual storage before acting

Measure allocated and logical bytes on each filesystem. Resolve symlinks, deduplicate inodes and Git worktree registrations, and avoid double counting parent/child roots or shared APFS storage. Rank source, dependencies, generated output, app state, logs, virtual disks and agent history separately. Record timed-out or denied subtrees. Retry a valuable timed-out root as smaller bounded children rather than marking it empty.

Inspect hidden roots and non-default workspaces, including `.bb/plugins/cache/git`, `.local/share`, `Library/Application Support`, `Documents/Codex`, registered repositories, Agent Clutter, Wonder workspaces, external build roots and Docker's configured disk location. Current CLI/profile state may live outside the app bundle. Never classify SQLite databases, IndexedDB, session transcripts, snapshots, OAuth stores or user media as disposable caches by filename alone.

## Verified cleanup classes

- Package download caches: resolve the actual store with the installed package manager, verify no install is active and no cache handles are in use, then use its supported prune/clean command. Bun requires an existing package directory for `bun pm cache`; do not initialize a fake project. A scorer or dev server is not an installer, but protect any cache it actually references. Record exact cache roots and command results. Package hardlinks and concurrent writes mean reported package sizes are not measured disk gain.
- Superseded updater staging: the October 12 sweep removed two obsolete ChatGPT app copies under `Library/Caches/com.openai.codex/org.sparkle-project.Sparkle/Installation`. Compare the installed app's bundle identity and build, verify its signature, check that each staged copy is older, and verify no updater, running process or open handle uses it. Delete only the verified obsolete staging app path. Preserve pending newer updates, including Wonder ShipIt candidates. Never delete the live app or updater's entire parent cache indiscriminately.
- Generated build output: follow retention.md's source hashes, ignored-output, native dry run, handle and runtime checks. Active workspace status does not protect an independently verified disposable cache, but a mounted target or running build does. Never remove dependency trees from a dirty or unverified checkout under the generated-build exception.
- Old CLI/runtime versions: inspect launcher symlinks, version managers, pinned project configuration and process executable paths. Keep the selected version and any required recovery version. Use a supported uninstall when available. Log/session databases beside runtime binaries are separate protected data. Size or age alone is insufficient.

## Active workspace reassignment report

Write one compact report with rows containing:

`project | owner/task | canonical path | filesystem | allocated bytes | logical bytes | activity evidence | current sandbox | reassignment requirement | blocking prerequisite`

Use real process IDs, open handles, registered worktrees, current task state or provider readback as activity evidence. Distinguish an open source directory from a running server/build and a shared VM from a dedicated project sandbox. Do not attribute the entire shared VM disk to one mounted project. Unknown owner or project allocation must remain explicit.

For Docker, resolve the actual disk path from configuration/open handles and inspect `docker system df -v`, containers, mounts, volumes and builder usage with bounded commands. A large sparse virtual disk has both logical capacity and allocated host bytes. Reclaim only independently eligible builder/image cache with supported tooling; preserve volumes, running/stopped recovery containers, required images and active mounts. An unresponsive daemon is an infrastructure issue, not permission to delete Docker.raw, restart shared Docker or use blanket system/volume pruning. Report current providers and capacity/cost/access requirements before any sandbox reassignment.

For active local repository or Wonder workloads, identify which dependencies/build outputs can move to an existing authorized sandbox and which source/auth/UI state must remain. Reporting a proposed destination does not prove access, budget, backup or a completed migration. Do not create, resize, purchase or cut over infrastructure merely to make a storage report green.

## Verify and retain the lesson

After cleanup, compare the same filesystems and source state. Record deletion outcomes separately from net free-space gain, including concurrent consumption. Keep a timestamped exact-candidate receipt outside product source. Add each new verified cleanup class here with its safety checks; keep one-off paths and measurements in the receipt. Do not convert unresolved candidates into automatic deletion rules. A skill update does not prove scheduler or active-worker adoption.
