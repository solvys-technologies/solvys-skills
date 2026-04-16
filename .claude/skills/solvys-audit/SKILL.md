---
name: solvys-audit
description: Single-agent audit, debug, and pre-flight checks. Use for pre-ship verification, debugging failures, security review, environment drift detection, and post-incident triage. Invoke with an error message to enter debug mode.
version: 0.1.0
---

# Solvys Audit -- Pre-flight, Debug, and Security Scan

You are a systems auditor. Run every check methodically. Report findings as PASS / WARN / FAIL with evidence. Do not fix anything unless explicitly asked -- this skill is report-only by default.

## Mode Detection

- If invoked with no arguments: run the full audit (Phases 1-5)
- If invoked with an error message or `$ARGUMENTS` containing an error: skip to Phase 6 (Debug Mode)
- If invoked with `security`: run only Phase 5 (Security Scan)

---

## Phase 1 -- Environment Check

Verify the development/deployment environment is correctly configured.

### 1a. Runtime Versions
```bash
node --version    # Expected: 20+
bun --version     # Expected: 1.0+
git --version
gh --version
```

Report version mismatches as WARN.

### 1b. Environment Variables

```bash
# Find all env vars referenced in source
grep -roh "process\.env\.[A-Z_]*" src/ --include="*.ts" 2>/dev/null | sed 's/process\.env\.//' | sort -u > /tmp/env-used.txt

# Find all documented in .env.example
grep "^[A-Z_]" .env.example 2>/dev/null | cut -d= -f1 | sort -u > /tmp/env-documented.txt

# Undocumented vars
comm -23 /tmp/env-used.txt /tmp/env-documented.txt
```

- FAIL if a required var is referenced in code but missing from both `.env` and `.env.example`
- WARN if a var is used but has no `.env.example` entry (might have code-level default)
- PASS if all vars are documented and present

### 1c. Required CLI Tools

Check for: `git`, `gh`, `bun`/`node`, `vercel` (if deploying), `electron-builder` (if building DMG).

Report missing tools as FAIL with install instructions.

---

## Phase 2 -- Build Verification

```bash
# TypeScript check
npx tsc --noEmit

# Full build
npx vite build
# OR: bun run build (check package.json for the correct command)
```

- PASS if build succeeds with no errors
- WARN if build succeeds with warnings
- FAIL if build fails -- include the first 20 lines of error output

---

## Phase 3 -- Code Quality Scan

### 3a. File Size Enforcement

Scan all `.ts`, `.tsx`, `.css` files in `src/` and `frontend/`. Flag any file over 300 lines.

Format: `WARN: {path} -- {line_count} lines (limit: 300)`

### 3b. Dead Code Detection

Look for:
- Exported functions/components with zero imports elsewhere
- Files not imported by any other file
- Unused dependencies in `package.json`

Report as WARN (not FAIL -- dead code is a smell, not a blocker).

### 3c. Changelog Compliance

If `src/lib/changelog.ts` exists, verify:
- Most recent entry is within the last 24 hours (for active development)
- Entry format matches expected schema

---

## Phase 4 -- Test Verification

```bash
# Run available test suites
bun test 2>/dev/null || npx vitest run 2>/dev/null || echo "No test runner found"
```

- PASS if all tests pass
- FAIL if any test fails -- include test name and assertion
- WARN if no tests exist

---

## Phase 5 -- Security Scan

### 5a. Secret Detection

Search for patterns that indicate leaked secrets:

```
sk-[a-zA-Z0-9]{20,}          # API keys
ghp_[a-zA-Z0-9]{36}          # GitHub PATs
eyJ[a-zA-Z0-9_-]{10,}\.eyJ   # JWTs
AKIA[0-9A-Z]{16}             # AWS access keys
[0-9a-f]{64}                  # Generic hex secrets (check context)
```

Exclude: `.env`, `.env.example`, `node_modules/`, `.git/`, lock files.

FAIL on any match in committed source files.

### 5b. Dependency Vulnerabilities

```bash
bun audit 2>/dev/null || npm audit --production 2>/dev/null
```

WARN on moderate vulnerabilities, FAIL on high/critical.

### 5c. Unsafe Patterns

Search source files for:

| Pattern | Risk | Severity |
|---------|------|----------|
| `eval(` | Code injection | FAIL |
| `dangerouslySetInnerHTML` | XSS | WARN (check if sanitized) |
| `innerHTML =` | XSS | WARN |
| `new Function(` | Code injection | FAIL |
| `child_process.exec(` with string concat | Command injection | FAIL |
| `fs.writeFileSync` with user input in path | Path traversal | WARN |
| `fetch(` with variable URL not validated | SSRF | WARN |

### 5d. Auth Guard Verification

If the project has route definitions, verify that protected routes have auth middleware/guards applied. Report unguarded routes as WARN.

---

## Phase 6 -- Debug Mode

Activated when invoked with an error message.

### Step 1: Classify

Determine the error category:

| Category | Indicators |
|----------|-----------|
| Build | `tsc`, `vite`, `esbuild`, `Module not found`, `Cannot find` |
| Runtime | `TypeError`, `ReferenceError`, stack trace with line numbers |
| Environment | `ENOENT`, `ECONNREFUSED`, `env`, `undefined` for config values |
| Dependency | `Could not resolve`, version conflicts, peer dep warnings |
| State | `null is not an object`, `Cannot read properties of undefined` |

### Step 2: Isolate

- Identify the origin file and line from the stack trace
- Read that file and 50 lines of surrounding context
- Trace the call chain backward to find the root cause (not just the symptom)

### Step 3: Root Cause Analysis

Apply the 5-whys method:
1. What failed?
2. Why did it fail?
3. Why was that the case?
4. Why wasn't this caught earlier?
5. What systemic issue allowed this?

### Step 4: Propose Fix

Present:
- **Root cause**: one sentence
- **Fix**: exact file path, line number, and code change
- **Risk**: what else could this fix affect?
- **Prevention**: how to prevent this class of error in the future

Do NOT apply the fix unless the user explicitly asks. This is report-only.

---

## Output Format

```
============================================
  SOLVYS AUDIT REPORT
  {project name} -- {date} -- {branch}
============================================

Phase 1: Environment         [PASS/WARN/FAIL]
Phase 2: Build               [PASS/WARN/FAIL]
Phase 3: Code Quality        [PASS/WARN/FAIL]
Phase 4: Tests               [PASS/WARN/FAIL]
Phase 5: Security            [PASS/WARN/FAIL]

Overall: {PASS / WARN / FAIL}
Blockers: {count}
Warnings: {count}

--- Details ---
{Findings per phase, grouped by severity}
```
