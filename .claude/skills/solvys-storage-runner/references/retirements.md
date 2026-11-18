# Explicit retirement instruction, 2026-10-02

Authority: Sam, task `01a0d3a1-f212-7e61-a9c6-6c11484394c8`.

Remove the T3Code version of Goalpost Code and Zenmium, including their obsolete worktrees, dependencies and runtime builds. The three-day Goalpost cutoff protects the recent Codex/OpenHands replacement begun around 2026-09-29. It is not a rolling three-day deletion rule for every repository.

Preserve the new Goalpost source under `goalpost-code/prototypes/openhands-shell`, `specs/014-openhands-foundation`, its current S018/S019 plans, and its external dependencies under `/Volumes/Ext./tmp-storage/goalpost-openhands-pwa`. Do not remove these because the enclosing Git repository has older history.

Confirmed retirement targets at execution time:

- `Codebase Cabinet/Internal Codebases/goalpost-code/t3code` and its root legacy `node_modules`.
- T3 canvas worktree under `Codebase Cabinet/Spare Files/Agent Clutter/goalpost-code/canvas-prototype`.
- `Codebase Cabinet/Internal Codebases/zenmium` and `zenmium-new`, plus the verified Zenmium release worktree.
- `/Users/tifos/.local/share/goalpost-web-runtime` and the retired `io.solvys.goalpost-web-runtime` and `io.solvys.goalpost-web-tunnel` login services.
- `/Applications/.Goalpost Code.previous-20260928T143336Z.app`, verified as the legacy T3 application.

Independent older Goalbot/OpenSpec/Goalkeeper/Tailgate modules are not automatically classified as T3Code. Clarification about their inclusion was requested; preserve until answered or ownership proves T3-only. Mixed app profiles and global recovery archives require separate content/ownership checks.

Execution receipts and replacement hashes live at `/Volumes/Ext./Solvys-Temp/waam-codexify-01a0f833/retirements-2026-10-02`. Revalidate paths before future action; never assume a historical path has not been repurposed. Do not repeat completed removal or recreate retired source.
