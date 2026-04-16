---
name: solvys-deploy
description: Pre-flight checks, deploy release, post-deploy test, fix-and-redeploy cycle. Use when shipping to production. This skill has side effects -- it deploys code and creates releases.
version: 0.1.0
disable-model-invocation: true
---

# Solvys Deploy -- Ship to Production

You are a release engineer. Follow every phase in order. Do not skip pre-flight. If any phase fails, stop and report -- do not silently continue.

## Phase 1 -- Pre-flight

Run Solvys Audit phases 1-4 (environment, build, code quality, tests). If any phase returns FAIL, stop here and report the blockers. Do not deploy with failing checks.

Additionally verify:

### 1a. Git State
```bash
git status
git branch --show-current
```

- FAIL if there are uncommitted changes
- FAIL if not on the expected deploy branch
- WARN if branch is behind remote

### 1b. Version Check
```bash
node -p "require('./package.json').version"
git tag -l | tail -5
```

- WARN if `package.json` version matches an existing git tag (version not bumped)
- Suggest the next version based on the change type (patch/minor/major)

### 1c. Changelog
- Verify `src/lib/changelog.ts` has an entry for this release
- If not, prompt the user to add one before proceeding

---

## Phase 2 -- Deploy

Detect the deploy target from `$ARGUMENTS` or project configuration:

### Vercel (Frontend)
```bash
vercel --prod
```

Wait for deployment URL. Capture it for Phase 3.

### Backend (Hono/Workers)
```bash
cd backend-hono && bun run build
# Deploy method varies -- check package.json scripts for deploy command
```

### Full Stack
Run both in sequence: backend first, then frontend.

### GitHub Release
After successful deployment:
```bash
VERSION=$(node -p "require('./package.json').version")
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"
gh release create "v$VERSION" --generate-notes --title "v$VERSION"
```

---

## Phase 3 -- Post-Deploy Verification

### 3a. Health Check
Hit the deployment URL(s):

```bash
# Frontend
curl -s -o /dev/null -w "%{http_code}" {deployment_url}

# Backend API
curl -s {api_url}/api/diagnostics
```

- PASS if HTTP 200
- FAIL if non-200 or timeout

### 3b. Smoke Test
If the project has smoke tests or e2e tests, run them against the deployed URL.

### 3c. Visual Verification
If the frontend was deployed, remind the user to open the deployment URL and verify the golden path manually.

---

## Phase 4 -- Fix-and-Redeploy (Conditional)

Activated only if Phase 3 fails.

### Attempt 1
1. Diagnose the failure using Solvys Audit Phase 6 (Debug Mode)
2. Apply the minimal fix
3. Commit with prefix: `fix(deploy): {description}`
4. Re-run Phase 2 and Phase 3

### Attempt 2
If Attempt 1 also fails:
1. Diagnose again
2. Apply fix
3. Commit with prefix: `fix(deploy): {description} (retry 2)`
4. Re-run Phase 2 and Phase 3

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

1. Run the install-maintenance audit (if the project has one)
2. Update changelog with deploy entry
3. Report:
   ```
   ============================================
     DEPLOY COMPLETE
     {project} v{version} -- {date}
   ============================================

   Target: {vercel/workers/full-stack}
   URL: {deployment_url}
   Release: {github_release_url}
   Duration: {total time}
   Retries: {0/1/2}
   ```

## Rules

- This skill creates releases and deploys code. It requires user invocation (disable-model-invocation).
- Never deploy with failing pre-flight checks.
- Never force-push during a deploy.
- Always create a git tag before creating a GitHub release.
- If rolling back, delete both the release AND the tag.
- Maximum 2 fix-and-redeploy attempts. After that, humans need to intervene.
