---
name: solvys-test
description: Sprint feature verification. Reads a sprint brief, extracts features, tests them via CLI (curl, API checks), then via frontend (Playwright browser automation). Fixes failures inline before re-testing. Use after a sprint track is complete or before marking a deploy as done.
disable-model-invocation: true
argument-hint: "<sprint-brief-path> OR 'last' for most recent brief"
---

# Solvys Test -- Sprint Feature Verification

You are a QA engineer. Your job is to read a sprint brief, extract every testable feature, verify each one via CLI first, then via frontend browser automation. If a test fails, diagnose, fix, and re-test before moving on. Nothing ships untested.

**CRITICAL RULES (from operational history):**

- Never start a vite dev server -- test against live deployed endpoints or localhost:8080
- Backend runs on localhost:8080 (launchd-managed) and fintheon.fly.dev (production)
- Always `rm -rf dist` before any vite build during fix cycles
- After fixing and rebuilding, redeploy the affected target before re-testing
- **browser-harness is the canonical browser driver for UI verification.** It is the Solvys Playwright pool at `backend-hono/src/services/browser/` (actions: `search | open | read | click | fill | screenshot | close`). Drive it directly via Playwright (`playwright@1.58.2`) from the test script using the same semantics -- open, read selector, click, screenshot -- so the test path mirrors the Harper tool path.
- `expect` is available at `/usr/bin/expect` for interactive CLI testing if needed

---

## Phase 1 -- Brief Ingestion

### 1a. Locate the Brief

If `$ARGUMENTS` is a file path, read it directly. If `$ARGUMENTS` is `last` or empty, find the most recent brief:

```bash
ls -t docs/sprint-briefs/S*.md | head -1
```

### 1b. Extract Test Targets

Parse the brief and extract:

1. **New API endpoints** -- any `GET /api/...`, `POST /api/...` patterns
2. **New/modified files** -- from "Scope -- Included" checklist
3. **Acceptance criteria** -- from "Acceptance Criteria" section
4. **Database changes** -- any migration files or table references
5. **UI changes** -- any frontend component modifications

Build a test manifest:

```
============================================
  TEST MANIFEST
  Brief: {brief filename}
  Features: {count}
============================================

CLI Tests:
  [ ] {endpoint or backend feature 1}
  [ ] {endpoint or backend feature 2}

Frontend Tests:
  [ ] {UI feature 1}
  [ ] {UI feature 2}

Database Tests:
  [ ] {migration or table check}
```

Present the manifest to the user for confirmation before proceeding.

---

## Phase 2 -- CLI Verification

Test every backend feature against the running backend. Try localhost:8080 first (faster feedback), then fintheon.fly.dev (production verification).

### 2a. Backend Health Gate

```bash
# Local backend must be running
curl -sf http://localhost:8080/api/diagnostics || {
  echo "FAIL: Local backend not running. Restarting..."
  launchctl unload ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist 2>/dev/null
  launchctl load ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist
  sleep 3
  curl -sf http://localhost:8080/api/diagnostics || echo "FAIL: Backend still not running after restart"
}
```

### 2b. API Endpoint Tests

For each new or modified endpoint from the brief:

```bash
# GET endpoints
RESPONSE=$(curl -sf http://localhost:8080{endpoint})
echo "$RESPONSE" | head -c 500

# Verify: non-empty response, valid JSON, expected fields present
echo "$RESPONSE" | jq 'keys' 2>/dev/null || echo "FAIL: Invalid JSON"
```

For POST endpoints, construct a minimal valid payload from the brief's implementation details.

### 2c. Database Verification

If the brief includes migrations:

```bash
# Check table exists via the API or direct Supabase query
curl -sf http://localhost:8080/api/diagnostics | jq '.services' 2>/dev/null
```

### 2d. Service Integration Tests

For each new service file, verify it's properly wired:

- Imported in `boot/services.ts` or relevant route file
- Responds to its trigger (cron, API call, event)
- Handles missing env vars gracefully (in-memory fallback)

### 2e. CLI Results

```
--- CLI Test Results ---

[PASS] GET /api/oracle/research -- 200, valid JSON, 3 findings returned
[FAIL] GET /api/oracle/research?type=arb -- 500, "column not found"
[PASS] Cron scheduler registered in boot sequence
[SKIP] POST /api/harper/chat -- requires auth token (tested in frontend)

Passed: {n}/{total}
Failed: {n}
Skipped: {n}
```

---

## Phase 3 -- Fix Cycle (Conditional)

Activated for each FAIL from Phase 2. Run up to 2 fix attempts per failure.

### For each failure:

1. **Diagnose** -- Read the error, trace to source file and line
2. **Root cause** -- Apply 5-whys (same as Solvys Audit debug mode)
3. **Fix** -- Apply the minimal change
4. **Rebuild** -- `cd backend-hono && bun run build`
5. **Restart** -- Restart local backend via launchctl
6. **Re-test** -- Re-run the specific failing test

If the fix requires a deploy (production endpoint failing):

```bash
cd backend-hono && fly deploy --yes
```

After 2 failed fix attempts on the same test, mark it as BLOCKED and continue.

---

## Phase 4 -- Frontend Verification (browser-harness)

Drive UI verification through the **browser-harness** semantics -- the same action surface Harper uses on the web (`open | read | click | fill | screenshot | close`). The underlying driver is the Solvys Playwright pool at `backend-hono/src/services/browser/`; tests in this skill call Playwright directly using those same primitives so the harness path and the QA path stay aligned.

Ad-hoc audit (UX review / bug repro) and sprint-verification test scripts both follow the same shape:

### 4a. Harness Setup

```bash
# Verify the underlying driver is ready
npx playwright --version

# If browsers aren't installed
npx playwright install chromium 2>/dev/null
```

### 4b. Generate Harness Script

For each UI feature in the test manifest, generate a browser-harness-shaped script. Keep the action names matching the Harper tool (`open/read/click/fill/screenshot`) so a reader can port the script into a Harper tool call if needed. Write to a temporary file:

```typescript
// /tmp/solvys-test-{timestamp}.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Sprint {N} -- browser-harness verification", () => {
  test("{feature name}", async ({ page }) => {
    // harness.open(url)
    await page.goto("{target_url}");
    await page.waitForSelector("body", { state: "visible" });

    // harness.read(selector) -- verify a component is present
    await expect(page.locator("{selector}")).toBeVisible();
    await expect(page.locator("{data-selector}")).not.toBeEmpty();

    // harness.click(selector) / harness.read(selector)
    await page.click("{button-selector}");
    await expect(page.locator("{result-selector}")).toContainText("{expected}");

    // harness.screenshot() for visual evidence
    await page.screenshot({ path: "/tmp/solvys-test-{feature}.png" });
  });
});
```

### 4c. Run Harness Script

```bash
npx playwright test /tmp/solvys-test-*.spec.ts --reporter=list --timeout=30000
```

If auth is required (Supabase JWT on fintheon.pricedinresearch.io / fintheon-desktop.vercel.app), use the stored session or prompt the user for a test token. Auto mode: never try to log in with guessed credentials; if auth is blocking, screenshot the login screen, report it, and fall back to code-review verification.

### 4d. Visual Verification

For UI changes that can't be assertion-tested, take harness screenshots:

```bash
npx playwright screenshot {url} /tmp/solvys-test-screenshot-{feature}.png
```

Present screenshots to the user for manual review.

### 4e. Frontend Fix Cycle

Same as Phase 3 but for frontend failures:

1. Diagnose from harness script output (Playwright error trace)
2. Fix the component/route
3. Rebuild: `rm -rf dist && npx vite build`
4. Redeploy the affected frontend target
5. Re-run the harness script

---

## Phase 5 -- Production Smoke

After all fixes are applied and local tests pass, verify against production.

### 5a. Backend Production

```bash
for endpoint in {list_of_new_endpoints}; do
  STATUS=$(curl -sf -o /dev/null -w "%{http_code}" "https://fintheon.fly.dev$endpoint")
  echo "[$STATUS] $endpoint"
done
```

### 5b. Frontend Production

Run the same Playwright tests against the production URLs:

```bash
TARGET_URL=https://{desktop-vercel-url} npx playwright test /tmp/solvys-test-*.spec.ts
TARGET_URL=https://{mobile-vercel-url} npx playwright test /tmp/solvys-test-*.spec.ts
```

---

## Phase 6 -- Report

```
============================================
  SOLVYS TEST REPORT
  Brief: {brief filename}
  Date: {date}
  Branch: {branch}
============================================

CLI Tests:
  [PASS] {n}/{total}
  [FAIL] {n} (fixed: {n}, blocked: {n})

Frontend Tests:
  [PASS] {n}/{total}
  [FAIL] {n} (fixed: {n}, blocked: {n})

Production Smoke:
  Backend:  [PASS/FAIL]
  Desktop:  [PASS/FAIL]
  Mobile:   [PASS/FAIL]

Fix Summary:
  {list of fixes applied with file paths and commit hashes}

Blocked Items:
  {list of items that failed after 2 fix attempts}

Overall: {PASS / PARTIAL / FAIL}
============================================
```

If overall is PASS, the sprint track is verified. If PARTIAL or FAIL, list exactly what remains broken and why.

---

## Rules

- This skill runs tests and may apply fixes. It requires user invocation (disable-model-invocation).
- Never start a vite dev server. Test against deployed endpoints or localhost:8080.
- Always present the test manifest before running tests -- let the user adjust scope.
- Maximum 2 fix attempts per failing test. After that, mark as BLOCKED.
- Always test locally first (faster feedback), then production (real verification).
- Playwright tests should be minimal and targeted -- not a full E2E suite.
- Clean up temporary test files after the run: `rm /tmp/solvys-test-*`
- If a fix requires rebuilding, always `rm -rf dist` first.
- After any fix-and-redeploy, restart the local backend.
- Screenshots go to `/tmp/` -- never commit test artifacts.
