---
name: gpc-iterate
description: Iterate on the Goalpost Code desktop app while it is in use — land work in the repo, ship it through Git, and let the built-in hot updater deliver it to the running app. Use when deploying a Goalpost Code desktop update, cutting an updater release, exercising the circular-arrows update button, or running the dev hot-reload path. Ships via the repo and Git, not side channels.
---

# gpc-iterate — Goalpost Code iterate-and-update

Goalpost Code's desktop app carries a hot updater (the circular-arrows button at
the bottom right of the ADE sidebar). The update feed is the repository itself:
GitHub releases on `solvys-technologies/goalpost-code`, produced by
`scripts/build-desktop-artifact.ts`. Deploying to a running app means landing
work in the repo, publishing a release, and letting the updater deliver it —
the user keeps working until the install confirmation.

Apply the Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`): reuse the
existing updater seam (`apps/desktop/src/updates/`), the build script, and `gh
release` before inventing any new delivery path.

## Repo truth (verify fresh each run)

- Repo: `goalpost-code` (`Internal Codebases/goalpost-code`), app tree at
  `t3code/`, remote `https://github.com/solvys-technologies/goalpost-code.git`
  (PRIVATE — see Honest states).
- Desktop version: `t3code/apps/desktop/package.json` → `version` (currently
  0.0.40). The updater only offers strictly newer versions — bump it.
- App identity: `productName` "Goalpost Code", appId `com.solvys.goalpost-code`,
  artifact pattern `Goalpost-Code-<version>-<arch>.{dmg,zip}`.
- Build entry: `cd t3code && pnpm dist:desktop:dmg:arm64` (or
  `dist:desktop:artifact` / `--platform linux|win` variants). macOS needs cargo
  (`~/.cargo/bin` on PATH) + the `aarch64-apple-darwin` rust target; on low
  internal disk, redirect TMPDIR/output/cargo/electron-builder caches to
  `/Volumes/Ext./tmp-storage/` and symlink `native/resource-monitor/target`.
- Update feed env: `T3CODE_DESKTOP_UPDATE_REPOSITORY=solvys-technologies/goalpost-code`
  (or CI's `GITHUB_REPOSITORY`). Without it the build ships no `app-update.yml`
  and the button reports no feed — that is the honest degraded state, not a bug.
- Artifacts land in `<repoRoot>/release/` (`release-mock/` for mock feeds).

## Ready-made flows

### Flow A — ship an update to the running app (repo → Git → updater)

1. Land the work on the integration branch; run the changed-package gate
   (`pnpm test`, `npx tsc --noEmit` in `t3code/apps/web` and `t3code/apps/server`).
   Never bare `vitest`.
2. Bump `t3code/apps/desktop/package.json` version (semver-up).
3. Build: `T3CODE_DESKTOP_UPDATE_REPOSITORY=solvys-technologies/goalpost-code
   pnpm dist:desktop:dmg:arm64`. Produces `release/` containing the DMG, the
   blockmap, and `latest-mac.yml` — the manifest the updater reads.
4. Publish: `gh release create v<version> --repo
   solvys-technologies/goalpost-code --title "Goalpost Code v<version>"` with
   the DMG/zip + `latest-mac.yml` attached. Nightly trains (`*-nightly.*`
   versions) need `--prerelease` — the publish config maps channels to
   releaseType automatically.
5. The running app picks it up three ways: the 15s-startup/4-minute auto-poll,
   the circular-arrows button (check → download → confirm install), or a
   server-triggered remote update (telemetry `requestDesktopUpdate` → prepare
   → `ready-to-install` → client commit → relaunch).
6. Verify the loop closes: updater state `downloaded` then app relaunches on
   the new version. Check the update report in telemetry if remote-triggered.

### Flow B — iterate in place (dev hot path, no release)

1. Run `cd t3code && node scripts/dev-runner.ts dev:desktop` (node_modules/.bin
   on PATH). Repo edits hot-reload: web via Vite HMR, server/desktop via
   pack-watch relaunch. This is the fastest "app in use" loop.
2. To exercise the updater UI in dev, write `dev-app-update.yml` in the app
   root or build with `--mock-updates` (`release-mock/`, generic provider →
   `http://localhost:3000`); never point dev at the real release feed.

### Flow C — verify the updater end-to-end without shipping

1. Build twice with ascending versions into `release-mock/`
   (`--mock-updates`), serve the dir, point `dev-app-update.yml` at it.
2. Drive check → download → install through the button; assert state machine
   (`apps/desktop/src/updates/updateMachine.ts` semantics) and honest errors.

## Gates and honest states

- Commits, pushes, and `gh release` publishes are owner-gated — do not run them
  without authorization. Local builds and verifications are not.
- The repo is private: release fetches can 404 for updater clients without
  GitHub auth. Record that as the honest state; options (token, public mirror,
  generic feed) are a TP decision, not an assumption to bake in.
- Unsigned builds show a Gatekeeper warning on first install — expected.
- Never claim "update delivered" from a build or a release alone: the claim
  holds only when a running app reports `downloaded`/`installed` for that
  version (telemetry report or on-screen state).
- Keep `app-update.yml`/`latest-mac.yml` with the artifact — an artifact
  without its manifest cannot be fetched by the updater.
- Do not edit the updater state machine or telemetry path to mask failures;
  surface them honestly.
