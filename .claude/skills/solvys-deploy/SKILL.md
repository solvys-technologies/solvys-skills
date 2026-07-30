---
name: solvys-deploy
description: Pre-flight checks, deploy release, post-deploy test, fix-and-redeploy cycle. Use when shipping to production. This skill has side effects -- it deploys code and creates releases.
---

# Solvys Deploy -- Ship to Production

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


You are a release engineer. Follow every phase in order. Do not skip pre-flight. If any phase fails, stop and report -- do not silently continue.

**CRITICAL RULES (from operational history):**

- **STANDING PUSH AUTHORIZATION**: every invocation of this skill = commit → push → publish GH release → prune older releases in the current major-version namespace → refresh install/update scripts so they fetch the latest tag. Do NOT ask TP for push approval. That authorization is standing.
- **VALIDATOR-CHAIN INVOCATION**: a final unification validator may invoke `/solvys-deploy` automatically after every implementation track and the unification track are reviewed, accepted, and moved to `Done`. Treat that as an authorized skill invocation. Stop only if pre-flight fails, validation evidence is missing, or the sprint explicitly disabled auto-deploy.
- **UNIFICATION RELEASE CAPTURE RULE**: every deploy after unification must include every feature commit that is already clean, validated, and reachable from the release branch HEAD. Never publish or leave active a tag/release that points behind clean committed feature work. Before tagging, compare the latest release tag to `HEAD`; if `git log <latest-tag>..HEAD` contains implementation, hotfix, Linear-closeout, mobile, installer, or unification commits, bump the release, refresh installers, rebuild artifacts, and tag `HEAD`. If a tag/release was created early and more clean commits landed afterward, move/recreate the tag/release so GitHub, updater scripts, and the DMG all resolve to the final `HEAD`.
- **LINEAR BACKWARD-COMPLETION RULE**: before publishing, look backward across every open Linear issue in the repo's Linear workspace, not just the current assignee or nominal sprint ticket. If the release branch already completes an issue's acceptance criteria, mark it complete with branch/commit/file/validation evidence, regardless of assignee. Do not sacrifice completed work because the task was assigned to somebody else. If an issue is only partially covered, stale, duplicated, or unmounted, leave it open and comment with the exact gap.
- **DUPLICATE SURFACE GUARD**: before accepting new release contents, compare added routes, clients, components, skills, and sprint docs against the mounted app and already-shipped branch history. New files that recreate an existing capability must either replace the canonical path intentionally or be rejected as duplicate/unintegrated work. Stale branches and stale sprint briefs do not outrank repo-current product truth.
- **SL-007-FIN RELEASE BASELINE RULE**: for Fintheon deploys, review pending changes and PRs before publishing, exclude stale or unfinished work, combine only release-ready changes, and after the release finishes run the standard benchmarks and record the results as the new baseline.
- **Release prune rule**: after publishing the new GH release, run `gh release list` and `gh release delete <tag> --yes` for every release whose tag starts with the current major-version prefix (e.g. `v5.*`) EXCEPT the one just published. Keep exactly one release per major version at any time.
- **Install-script refresh rule** (MANDATORY every deploy, BOTH install AND update scripts): before the push, grep `scripts/fintheon-update.sh`, `scripts/fintheon-setup.sh`, `scripts/install-cli.sh` for version renders and fetch pointers. Any `git describe --tags --always` → swap to `git describe --tags --abbrev=0` (drops the `-N-gHASH` post-tag drift suffix). Any hardcoded `UPDATE_VERSION=` / `SETUP_VERSION=` / tag pointer → bump to the new tag. Any `git clone --branch <X>` or `curl .../raw/<X>/...` pointer must resolve to the new release. Commit the script changes with `INSTALL-UPDATE:` prefix as part of the deploy push — do NOT leave them for a follow-up. The final deploy report MUST confirm to TP that `fintheon update` (or equivalent global command) is ready to run the new version — do not say "DEPLOY COMPLETE" until the installer resolves to the new tag.
- **DMG lands on Desktop rule** (every DMG publish — deploy OR /solvys-beta): after electron-builder emits the DMG, delete every `Fintheon-*.dmg` already on `~/Desktop/` and copy the new one there. TP installs from Desktop; old DMGs confuse it. `find ~/Desktop -maxdepth 1 -name "Fintheon-*.dmg" -type f -delete` then `cp dist-electron/Fintheon-*.dmg ~/Desktop/`.
- **Current major** = numeric prefix of the active deploy branch (e.g. `v5.*` while on `v5.22`). When the branch rolls to v6.x later, pivot the prune target.
- Deploy must hit ALL 3 targets: backend (Fly.io), desktop frontend (Vercel), mobile PWA (Vercel)
- Backend deploys to Fly.io app `fintheon` (fintheon.fly.dev) -- NEVER `pulse-api-*`
- Never run `fly deploy` from the repo root -- root Dockerfile is a gostatic static server
- Mobile deploys as prebuilt from `mobile/` dir -- git auto-builds are disabled
- Always `rm -rf dist` before mobile vite build -- stale bundles deploy otherwise
- Desktop frontend deploys as prebuilt from `frontend/` dir
- Every desktop release must update install/update scripts
- Always restart local backend after deploy (unless actively editing it)
- Never start a vite dev server -- verify via `tsc --noEmit` + `vite build` only
- For frontend releases, confirm the accepted Wonder direction was explicitly
  transferred into source and verified through the existing port 7777 product
  lane before deployment. Do not spawn a duplicate dev server.
- Always redeploy to prod AND test endpoints before reporting done

---

## Phase 1 -- Pre-flight

Run Solvys Audit phases 1-4 (environment, build, code quality, tests). If any phase returns FAIL, stop here and report the blockers. Do not deploy with failing checks.

Additionally verify:

### 1a. Execution Lane And Tranche State

- Read the CAO `storage-and-execution-lanes.md`.
- Confirm the release workspace, owner, capacity reservation, protected zones,
  exit condition, and closure state.
- Frontend-only and combined work must identify the external-local workspace,
  accepted Wonder decision, source-transfer authorization, and port 7777 proof.
- Backend-only Cloud work must identify the pushed branch and completed
  handoff.
- Do not deploy from a dirty mixed workspace or an unprepared replacement
  checkout.

### 1b. Git State

```bash
git status
git branch --show-current
```

- FAIL if there are uncommitted changes
- FAIL if not on the expected deploy branch
- WARN if branch is behind remote

### 1c. Version Check

```bash
node -p "require('./package.json').version"
git tag -l | tail -5
```

- WARN if `package.json` version matches an existing git tag (version not bumped)
- Suggest the next version based on the change type (patch/minor/major)

### 1d. Changelog

- Verify `src/lib/changelog.ts` has an entry for this release
- If not, prompt the user to add one before proceeding

### 1e. Install/Update Scripts

- Verify install and update scripts reference the current version
- WARN if scripts are out of date -- they MUST be updated before deploy

### 1e. Linear + Branch Backward Completion Audit

This is mandatory before every publish. The deploy agent must reconcile **all open Linear work** with **everything on the branch about to ship**. Assignment does not limit completion credit or closeout.

Build the branch evidence first:

```bash
LATEST_TAG=$(git describe --tags --abbrev=0 --match 'v*' 2>/dev/null || true)
BASE_REF="${LATEST_TAG:-origin/main}"
git log --oneline "$BASE_REF..HEAD"
git diff --name-status "$BASE_REF..HEAD"
git diff --stat "$BASE_REF..HEAD"
rg -n "SOL-[0-9]+|S[0-9]+-[A-Z0-9-]+|@sprint-md/" sprint-md src frontend backend-hono mobile electron scripts package.json 2>/dev/null
```

Then pull the Linear inventory:

- Prefer the `solvys-support` MCP tools when available.
- If MCP is unavailable, source `scripts/.linear-env` and query Linear GraphQL with `Authorization: $LINEAR_API_KEY`. Never print the token.
- Query all open/non-completed issues in the Solvys/Fintheon workspace, across assignees, cycles, projects, and initiatives. Do not limit to "my tickets" or the visible sprint board.
- Include issue key, title, state, assignee, project, cycle, parent, labels, branch/PR links, and every `@sprint-md/...` reference from the description.

For every open issue, classify it:

- `completed_by_branch`: acceptance is satisfied by files/commits on `HEAD`, and validation evidence exists.
- `partially_completed`: some acceptance is on `HEAD`, but required UI wiring, backend route, tests, auth, deploy, or visual proof is missing.
- `duplicate_or_stale`: the issue asks for a capability that already exists in the mounted product path, or the branch adds a parallel unmounted implementation.
- `not_in_release`: no meaningful evidence in this release branch.

Close completed work regardless of assignee:

```text
If classification == completed_by_branch:
  move the Linear issue to Done/Completed after deploy validation
  add a comment with:
    - release version/tag
    - branch and commit range
    - exact touched files
    - validation commands/results
    - note: "Closed by release branch evidence; assignee did not gate completion."

If classification == partially_completed or duplicate_or_stale:
  leave open
  add a comment naming the missing acceptance or duplicate canonical path
```

FAIL the deploy if:

- a release-critical open issue is marked complete in Linear but its work is not reachable from `HEAD`;
- the branch contains an unmounted duplicate implementation of an already-shipped surface;
- open Linear work claims completion only through an old branch, old PR, stale brief, or local-only files;
- the deploy agent cannot produce the Linear inventory and branch classification table.

The deploy report must include a concise Linear closeout table with counts for completed, partially completed, duplicate/stale, and not-in-release issues.

### 1f. SL-007-FIN Pending Change Release Gate

For Fintheon deploys, run this gate before Phase 2:

1. Inspect local pending changes, remote branches, open pull requests, recent commits, and same-day automation branches.
2. Classify each change set as `release_ready`, `unfinished`, `stale`, `duplicate`, `unsafe`, or `blocked`.
3. Include only `release_ready` work in the release branch. Exclude stale or unfinished work even if it is nearby in the worktree.
4. If valid changes are split across branches or PRs, combine them onto the release branch with traceable commits and preserve unrelated dirty work.
5. Record excluded work and the reason in the deploy note so it can be picked up later without being silently shipped.

---

## Phase 2 -- Deploy (All 3 Targets)

Deploy order: backend first, then desktop frontend, then mobile PWA. All three are mandatory unless `$ARGUMENTS` explicitly limits scope.

### 2a. Backend (Fly.io)

```bash
cd backend-hono && bun run build && fly deploy --yes
```

- The `fly.toml` in `backend-hono/` has `app = 'fintheon'`
- NEVER deploy from repo root (wrong Dockerfile)
- NEVER deploy to any `pulse-api-*` app (deleted legacy)
- Verify deployment succeeds before proceeding

### 2b. Desktop Frontend (Vercel)

```bash
cd frontend && vercel build --prod && vercel deploy --prebuilt --prod
```

Capture the deployment URL for Phase 3.

### 2c. Mobile PWA (Vercel)

```bash
cd mobile && rm -rf dist && npx vite build && vercel build --prod && vercel deploy --prebuilt --prod
```

- ALWAYS `rm -rf dist` before build -- Vite caches aggressively and stale bundles have shipped
- The Vercel project `fintheon-mobile` has git auto-builds disabled (`commandForIgnoringBuildStep: "exit 0"`)
- Vercel rewrites in `mobile/vercel.json` proxy `/api/*` to `fintheon.fly.dev`
- Never set root directory to "mobile" on the Vercel project -- causes path doubling

Capture the deployment URL for Phase 3.

### 2d. Commit + Push (standing authorization — no prompt)

Before Phase 2 kicks the Fly/Vercel deploys, make sure local state is on origin. Do NOT ask TP — this is pre-authorized for every `/solvys-deploy` invocation.

```bash
# Commit any pending work in one "v{major}.{minor}.{patch} deploy" commit
if ! git diff --quiet || ! git diff --cached --quiet; then
  git add -A
  git commit --no-verify -m "v$VERSION deploy — $(git log -1 --format=%s HEAD)"
fi

CURRENT_BRANCH=$(git branch --show-current)
git push origin "$CURRENT_BRANCH"
```

### 2d2. Install/Update Script Refresh (MANDATORY every deploy)

Keep installers self-consistent with the release tag. A `fintheon update` run immediately after a deploy must render the new version and fetch the new code. Run these checks; if any of them hit, patch the script and fold the fix into the deploy push before tagging.

```bash
# 1. Version renders — must use --abbrev=0 so they don't pick up post-tag -N-gHASH drift
grep -nE "git describe --tags --always" scripts/fintheon-update.sh scripts/fintheon-setup.sh scripts/install-cli.sh 2>/dev/null

# 2. Hardcoded version strings — bump to $VERSION
grep -nE "UPDATE_VERSION=|SETUP_VERSION=|INSTALL_VERSION=" scripts/*.sh 2>/dev/null

# 3. Fetch pointers — git clone --branch / curl raw/... must resolve to v5.22 (current branch) or $VERSION
grep -nE "git clone.*--branch|raw\.githubusercontent\.com.*fintheon" scripts/*.sh 2>/dev/null

# 4. .env.example + fintheon-update.sh Step 5 backfills in sync with any new env vars from this release
grep -roh "process\.env\.[A-Z_]*" backend-hono/src/ --include="*.ts" | sed 's/process\.env\.//' | sort -u > /tmp/env-used.txt
grep "^[A-Z_]" backend-hono/.env.example | cut -d= -f1 | sort -u > /tmp/env-documented.txt
comm -23 /tmp/env-used.txt /tmp/env-documented.txt | head
```

If any grep hits require a fix, commit with `INSTALL-UPDATE:` prefix **before** pushing + tagging. The release tag should point to a commit that has a fully-refreshed installer — never a lagging one.

### 2e. GitHub Release

After all three targets deploy successfully:

```bash
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"
gh release create "v$VERSION" --generate-notes --title "v$VERSION"
```

### 2f. Prune older releases in the current major-version namespace

Keep exactly one GH release per major version. Extract the major from `$VERSION` and `gh release delete` every other release whose tag starts with that prefix:

```bash
MAJOR=$(echo "$VERSION" | cut -d. -f1)        # e.g. "5" from "5.22.3"
gh release list --limit 200 --json tagName --jq '.[].tagName' |
  grep -E "^v${MAJOR}\." |
  grep -v -E "^v${VERSION}$" |
  while read OLD_TAG; do
    echo "Deleting stale release $OLD_TAG"
    gh release delete "$OLD_TAG" --yes --cleanup-tag=false
  done
```

`--cleanup-tag=false` preserves the git tag so history/diffs remain intact — only the GitHub release artifact is removed.

---

## Phase 3 -- Post-Deploy Verification

### 3a. Backend Health Check

```bash
curl -s https://fintheon.fly.dev/api/diagnostics
```

- PASS if HTTP 200 and response contains expected service status
- FAIL if non-200 or timeout

### 3b. Desktop Frontend Check

Before checking the deployment URL, verify the source-integrated local surface
through the existing port 7777 lane. This proof must exercise the accepted
Wonder direction after it entered product source. Wonder preview alone does not
pass this gate.

```bash
curl -s -o /dev/null -w "%{http_code}" {desktop_deployment_url}
```

- PASS if HTTP 200

### 3c. Mobile PWA Check

```bash
curl -s -o /dev/null -w "%{http_code}" {mobile_deployment_url}
```

- PASS if HTTP 200

### 3d. API Smoke Tests

Hit key endpoints against the live backend:

```bash
curl -s https://fintheon.fly.dev/api/riskflow/feed | head -c 200
curl -s https://fintheon.fly.dev/api/riskflow/iv-aggregate | head -c 200
```

- PASS if responses contain valid JSON
- FAIL if empty, error, or timeout

### 3e. Local Backend Restart

```bash
launchctl unload ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist
```

Verify backend is running:

```bash
curl -s http://localhost:8080/api/diagnostics
```

Skip this step ONLY if actively editing the local backend.

### 3f. Feature Verification (Solvys Test)

If a sprint brief exists for this deploy, run the full Solvys Test flow:

1. Locate the relevant sprint brief in `docs/sprint-briefs/`
2. Extract all new/modified endpoints and UI features
3. **CLI tests** -- curl every new endpoint against localhost:8080 and fintheon.fly.dev, verify valid JSON responses with expected fields
4. **Frontend tests** -- use Playwright (`playwright@1.58.2`) to verify UI features render and function on the deployed desktop and mobile URLs
5. If any test fails, enter the fix cycle (Phase 4) for that specific failure

This is equivalent to running `/solvys-test` inline. If no sprint brief exists, skip to Phase 4.

---

## Phase 4 -- Fix-and-Redeploy (Conditional)

Activated only if Phase 3 (including 3f feature verification) fails.

### Attempt 1

1. Diagnose the failure using Solvys Audit Phase 6 (Debug Mode)
2. Apply the minimal fix
3. Commit with prefix: `fix(deploy): {description}`
4. Re-run Phase 2 (only the failing target) and Phase 3

### Attempt 2

If Attempt 1 also fails:

1. Diagnose again
2. Apply fix
3. Commit with prefix: `fix(deploy): {description} (retry 2)`
4. Re-run Phase 2 (only the failing target) and Phase 3

### Abort

If both attempts fail:

1. Report the full failure chain
2. Roll back:

   ```bash
   # Vercel
   vercel rollback

   # GitHub release
   VERSION=$(node -p "require('./package.json').version")
   gh release delete "v$VERSION" --yes
   git tag -d "v$VERSION"
   git push origin ":refs/tags/v$VERSION"
   ```

3. Document what went wrong in the changelog

Maximum retry cycles: 2. After 2 failures, abort and report.

---

## Phase 5 -- Post-Ship

After successful deployment and verification:

1. Update install/update scripts with the new version
2. Run the install-maintenance audit (`/install-maintenance`)
3. Update changelog with deploy entry
4. Run the SL-007-FIN release baseline capture for Fintheon deploys -- MANDATORY, do not skip
5. Run the Debrief Actions (Phase 5a) -- MANDATORY, do not skip
6. Report:

   ```
   ============================================
     DEPLOY COMPLETE
     {project} v{version} -- {date}
   ============================================

   Backend:    fintheon.fly.dev         [PASS]
   Desktop:    {desktop_url}            [PASS]
   Mobile:     {mobile_url}             [PASS]
   Release:    {github_release_url}
   Local:      localhost:8080           [PASS]
   DMG:        ~/Desktop/Fintheon-v{version}-arm64.dmg (older DMGs cleared)
   Features:   {n}/{total} verified     [PASS/PARTIAL/SKIPPED]
   Sanitation: {clean/issues-found}     [PASS/WARN]
   Archived:   {n} sprint plan(s) -> sprint-changelog/
   Duration:   {total time}
   Retries:    {0/1/2}

   NEXT: Run `fintheon update` in any terminal to pull v{version}.
   ```

   The closing `NEXT:` line is mandatory. Confirm `grep "UPDATE_VERSION=" scripts/fintheon-update.sh` renders the new version before writing this line. If the installer still lags, redo the refresh step and re-push BEFORE declaring complete.

### Phase 5.0 -- SL-007-FIN Release Baseline Capture

For Fintheon deploys, after the release is live and before final closeout:

1. Run the standard benchmark bundle for the repo state that was actually released. Include build/typecheck, backend/API smoke, desktop and mobile live checks, installer/update proof when applicable, page-load benchmark inventory, and any repo-native benchmark script.
2. Use repeatable conditions and record the exact commands, target URLs, auth/mock state, viewport set, and timing metric.
3. Store the result as the new baseline in the repo's benchmark, deploy-daily, or sprint evidence path. If no baseline path exists, create one under `sprint-md/deploy-daily/` and link it from the deploy note.
4. If a benchmark fails or regresses, either fix and redeploy through Phase 4 or mark the release as benchmark-warning with concrete evidence and follow-up issue. Do not silently skip the baseline.

### Phase 5a -- Debrief Actions (MANDATORY)

These three actions run after every successful deploy. They keep the workspace from accumulating stale sprint markdown and prevent changelog clutter.

#### 5a.1 Codebase Sanitation Check

For each file modified in this release (use `git diff --name-only {previous-tag}..HEAD`), verify:

- No stray `console.log` / `print` / `debugger` statements left from debugging
- No commented-out code blocks larger than 3 lines (delete or keep, not limbo)
- No TODO/FIXME comments added without an owner or ticket reference
- No orphaned imports, unused variables, or dead exports
- No hardcoded secrets, tokens, local paths, or developer names
- Every substantially modified file follows repo-approved header/comment conventions, if that repo already has them
- File sizes respect project rules (e.g. <300 lines for Fintheon source files)

Report findings as PASS / WARN / FAIL. WARN is acceptable post-deploy but must be logged in the changelog entry. FAIL means a follow-up patch release is required.

Never run destructive cleanup (mass deletions, auto-formatters across unmodified files) without asking the user first.

#### 5a.2 Archive Sprint Markdowns

Sprint planning documents accumulate in the workspace once the sprint ships. Archive them so only in-flight plans remain visible.

1. Ensure a `sprint-changelog/` directory exists at the CURRENT workspace root. Create it if missing. Do NOT put it inside `docs/` or any nested folder -- it lives at the top level of whatever repo we are deploying.
2. Identify which sprint(s) shipped in this release. Cross-reference the commit range (`git log {previous-tag}..HEAD`) against sprint orchestration docs.
3. Move MAIN plan markdowns ONLY into `sprint-changelog/`:
   - IN SCOPE: `S{N}-ORCHESTRATION.md`, `S{N}-DEBRIEF.md`, any standalone `S{N}-*.md` that is the top-level sprint plan, and single-agent briefs from `/solvys-brief` (`S{N}-BRIEF-*.md`)
   - OUT OF SCOPE (do NOT move): sub-track briefs like `S{N}-T1-*.md`, `S{N}-T2-*.md`, etc. -- sub-track briefs are deleted after the sprint ships, not archived. If the user wants them kept, they will ask.
   - Search both `sprint-md/` (new home from `/solvys-orchestrate` and `/solvys-brief`) and any legacy `docs/sprint-briefs/` location.
4. If a sprint is still in flight (next sprint already uses the same S{N} prefix, or a T{X} brief references an unshipped track), leave it untouched and warn.
5. Use `git mv` so history is preserved.

After archival, `sprint-md/` should contain only in-flight sprint documents. `sprint-changelog/` is the historical record.

#### 5a.3 Summarize Sprints in Changelog

For each sprint archived in 5a.2, append ONE concise entry to `src/lib/changelog.ts` (or the project's equivalent changelog):

```typescript
{
  date: '{YYYY-MM-DDTHH:mm:ss}',
  agent: 'agent-session',
  summary: 'S{N} shipped: {one-line outcome}. Archived to sprint-changelog/. {n} tracks, {m} files.',
  files: ['sprint-changelog/S{N}-ORCHESTRATION.md'],
}
```

Rules:

- ONE entry per sprint, not one per track. The sub-track detail lives in the archived orchestration doc, not the changelog.
- Keep the summary under ~180 characters. The changelog is a scannable log, not a narrative.
- Do NOT paste the full debrief into the changelog. The debrief markdown in `sprint-changelog/` is the long form.
- If multiple sprints archived in the same deploy, write separate entries.

#### 5a.4 Close The Tranche Workspace

After merge and release proof:

1. Mark each shipped workspace `cooling` in the tranche registry.
2. Record the exact merge, tag, release, live proof, remaining installed proof,
   automation references, and durable handoff.
3. Do not manually delete an opened worktree. The ten-day conversation sweep
   archives eligible tasks after memory flush, and Codex owns natural managed
   worktree retention.
4. Keep dirty, pinned, automation-targeted, referenced, or unverified workspaces
   `protected`.

## Rules

- This skill creates releases and deploys code. It requires direct user invocation or the pre-authorized validator-chain invocation from the final unification track.
- Never deploy with failing pre-flight checks.
- Never force-push during a deploy.
- Always deploy all 3 targets unless explicitly told otherwise.
- Always create a git tag before creating a GitHub release.
- If rolling back, delete both the release AND the tag.
- Maximum 2 fix-and-redeploy attempts. After that, humans need to intervene.
- Always restart local backend after deploy (unless actively editing it).
- Never start a vite dev server. Verify via build only.
- Reuse the existing port 7777 product lane for source-integrated frontend
  verification after Wonder transfer.
- Never manually delete an opened worktree during deploy closeout.
- Never report done without testing live endpoints.
