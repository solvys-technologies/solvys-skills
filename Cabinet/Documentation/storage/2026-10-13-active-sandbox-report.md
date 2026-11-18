# Active workspace storage and sandbox reassignment

Observed 2026-10-13T13:03:22.434690+00:00. No sandbox migration or spending was performed.

Docker Desktop has **245.11 GB allocated**, with **245.11 GB logical disk size**, at `/Volumes/Ext./DockerDesktop/Docker.raw`. Process1447 holds the disk and Fintheon Buzz build mounts. Both supported Docker inventory calls timed out. This is shared active infrastructure; its full size cannot be attributed to Fintheon. Container and volume ownership remain unresolved.

| Active workspace | Allocated size | Activity | Required reassignment |
| --- | ---: | --- | --- |
| `/Volumes/Ext./Solvys-Apps/Wonder/Workspace/workspaces/credlist/goose` | 0.08 GB | zsh PID684, node PID89792, node_repl PID89795, node_repl PID90054 | Dedicated build/dependency sandbox, with existing task and source custody preserved |
| `/Volumes/Ext./Solvys-Apps/Wonder/Workspace/workspaces/Fintheon/Bonobo` | Total unverified | com.apple.Virtualization.Virtua PID1447, zsh PID38679 | Dedicated build/dependency sandbox, with existing task and source custody preserved |
| `/Volumes/Ext./Solvys-Apps/Wonder/Workspace/workspaces/focalcut/Vireo` | 3.75 GB | diskimages-helper PID21817, zsh PID92794, node PID92796, node PID92820, node PID92836 | Dedicated build/dependency sandbox, with existing task and source custody preserved |
| `/Volumes/Ext./Solvys-Apps/Wonder/Workspace/workspaces/goalpost-in-gpt-2/Ostrich` | 0.00 GB | zsh PID27755, Python PID27758, zsh PID41304 | Dedicated build/dependency sandbox, with existing task and source custody preserved |
| `/Volumes/Ext./Solvys-Apps/Wonder/Workspace/workspaces/Fintheon/Raccoon` | Total unverified | zsh PID36607 | Dedicated build/dependency sandbox, with existing task and source custody preserved |
| `/Users/tifos/Documents/Solvys/Codebase Cabinet/External Codebases/FocalCut` | 1.25 GB | node PID92836 | Dedicated build/dependency sandbox, with existing task and source custody preserved |

Fintheon Bonobo has an independently measured **0.51 GB** Buzz build cache mounted by the VM. Its full workspace scan timed out. Goalpost production-cycle external workspace also timed out and requires a smaller per-directory inventory. An open shell proves an active reference, not an active build.

Additional retained pressure: Goalpost Code primary checkout **4.77 GB**, including Open Pencil dependencies **1.63 GB** and OpenSession dependencies **1.47 GB**; dirty source and ongoing review prevent ordinary dependency cleanup. Hidden `.bb` plugin storage is **2.67 GB**. Twenty-two embedded repositories were inspected; many have changed lockfiles or generated tracked files. Plugin source and installed-runtime dependencies are preserved.

Devin CLI storage is **3.41 GB**, mostly its **3.08 GB** session database, not disposable binary cache. Cursor application support is **2.58 GB**, including IndexedDB and workspace state. These require supported history/runtime lifecycle handling; raw database deletion is excluded.

Next infrastructure step: resolve actual owner/task and existing sandbox entitlement for each row, verify target capacity and source/auth custody, then perform an authorized handover and validate the same user journey. This report requests reassignment; it does not claim remote execution or a backup. Exact indexed task candidates and process/path evidence are in active-sandbox-reassignment.json and workspace-handles.json.

Cleanup this continuation: obsolete Claude2.1.122 binary removed after selected2.1.126 version check and fresh no-handle verification;2.1.123 retained for rollback. Selected binary hash unchanged. Previous-sweep removals are not counted again.

Canonical Storage Runner now includes deep-cleanup.md, mandatory active workspace escalation, updater staging checks and runtime-version custody checks. Skill validation passes; scheduled-worker reload is unverified.

Follow-up measurement: Goalpost production-cycle node_modules is0.84 GB; its total workspace remains unverified. Internal free space ended at1.39 GB, below both admission thresholds. Exactly0.22 GB of obsolete runtime allocation was deleted, while concurrent writes consumed more space overall.

Total measured storage freed this sweep: 0.00 GB.
