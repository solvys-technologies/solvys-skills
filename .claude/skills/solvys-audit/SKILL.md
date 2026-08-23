---
name: solvys-audit
description: Anti-Slop-led Solvys audit, debug, and pre-flight checks. Use for TypeScript or JavaScript quality gates, pre-ship verification, debugging failures, security review, environment drift detection, and post-incident triage. Invoke with an error message to enter debug mode.
---

# Solvys Audit -- Anti-Slop-led Pre-flight, Debug, and Security Scan

You are a systems auditor. Anti-Slop owns the TypeScript and JavaScript code-quality gate. Solvys Audit owns custody, evidence, proof-rung discipline, the complete pre-flight, security checks, and debug analysis.

Run every applicable check methodically. Report PASS / WARN / FAIL with evidence. An ordinary audit is report-only: do not install dependencies, change lint configuration, modify code, auto-fix, or weaken rules unless the user explicitly asks for the named configuration or remediation work.

## Solvys Ponytail Ladder

The Solvys Ponytail Ladder (`factory/canon/ponytail-ladder.md`) governs every repair recommendation this skill makes. Run it in order before proposing any remediation: does this need to exist, is there an existing repo seam or installed dependency, does maintained OSS already solve it, can it be one line, and only then propose the minimum custom code. Never use the ladder to skip the Anti-Slop gate, security measures, trust-boundary validation, or the required proof rung.

## Anti-Slop precedence

For a TypeScript or JavaScript target, run this gate before ordinary code-quality findings.

1. Read target instructions, `git status`, package manager, existing Oxlint configuration, and the target lint command.
2. Verify a vendored `tools/oxlint/anti-slop/` copy, its `jsPlugins` registration, the complete 15-rule configuration at `error`, and ignores for agent-managed assets. Preserve target-specific existing configuration.
3. Run the target's Anti-Slop-aware lint command. Record the exact command, exit result, rule, file, and line for every finding.
4. When configuration is missing, report `WARN: Anti-Slop configuration missing`. State the approved repair route exactly: invoke `$install-anti-slop` in the target repository. Do not configure it during an ordinary audit.
5. When a configured Anti-Slop gate fails, report `FAIL: Anti-Slop gate`. Do not replace findings with casts, mocks, type widening, or rule suppression.

The required upstream rule set is:

- `no-chained-type-assertions`
- `no-conditional-empty-object-spread`
- `no-known-value-widening`
- `no-module-mocking`
- `no-object-parameters`
- `no-reflect-apply`
- `no-reflect-get`
- `no-runtime-typeof`
- `no-shape-in-symbol-names`
- `no-unknown-parameters`
- `no-unknown-returns`
- `no-unknown-type-aliases`
- `no-unsafe-dictionary-type`
- `no-widen-then-assert`
- `require-safety-comment-for-type-assertion`

For a non-TypeScript or non-JavaScript target, record `PASS: Anti-Slop not applicable` with the detected language and continue the applicable Solvys audit phases. Anti-Slop source checks do not prove a build, runtime, provider, deployed, installed, or human-accepted outcome.

## Phase 0 -- Inherited Specification And User-Testing Gate

For every registered sprint or isolated Cloud worktree, run this phase before ordinary implementation, testing, or debug work. Require `$solvys-user-testing` and its dual-map contract.

1. Read the physical canonical project specification map from the project's Codex Cabinet documentation.
2. Read the physical technical specification map from the owning internal, external, or exported codebase folder.
3. Require their shared revision and integrity-link ID, cross-linked physical paths, and current SHA-256 values. A pointer-only record fails.
4. Validate the compact `user-testing-context.json` with `solvys-user-testing/scripts/validate_user_testing.py`.
5. Confirm the context inherits the parent client objective, full user journey, exact task sub-journey, acceptance criteria, validation gates, authoritative resources, progress revision, regression journeys, test-data boundary, approval posture, genuine gates, acceptance branch, and next action.
6. FAIL before ordinary work when either map is missing, stale, incomplete, or inconsistent, or when the sprint defines separate completion criteria.

For completion review, require the user-testing record and `--require-acceptance`. The worker can report `ready-for-orchestrator-acceptance`. Only the orchestrator can accept completion after all inherited journeys and regressions pass with evidence.

Routine in-scope implementation, testing, debugging, restart, and validation carry full approval. Report an avoidable approval wait as `FAIL: orchestration approval posture`. Pause only for a new secret, MFA or consent, billing or a paid commitment, a client decision, rights, or an irreversible external action. Name the smallest human action and confirm that all other safe work continues.

## Mode Detection

- If invoked with no arguments: run Phase 0 when a sprint or worktree is registered, then run the full audit (Phases 1-5).
- If invoked with an error message or `$ARGUMENTS` containing an error: run Phase 0 when a sprint or worktree is registered, then enter Phase 7 (Debug Mode).
- If invoked with `security`: run only Phase 6 unless a completion or dispatch decision is also requested.

---

## Phase 1 -- Audit entrance and environment check

Verify the development/deployment environment is correctly configured.

### 1a. Runtime Versions
```bash
node --version    # Expected: 20+
bun --version     # Expected: 1.0+
git --version
gh --version
```

Report version mismatches as WARN.

### 1b. Environment variables

```bash
rg -o 'process\.env\.[A-Z_]+' src -g '*.ts' -g '*.tsx' 2>/dev/null | sed 's/.*process\.env\.//' | sort -u > /tmp/env-used.txt
rg '^[A-Z_]' .env.example 2>/dev/null | cut -d= -f1 | sort -u > /tmp/env-documented.txt
comm -23 /tmp/env-used.txt /tmp/env-documented.txt
```

- FAIL if a required var is referenced in code but missing from both `.env` and `.env.example`
- WARN if a var is used but has no `.env.example` entry (might have code-level default)
- PASS if all vars are documented and present

### 1c. Required CLI Tools

Check for: `git`, `gh`, `bun`/`node`, `vercel` (if deploying), `electron-builder` (if building DMG).

Report missing tools as FAIL with install instructions.

---

## Phase 2 -- Anti-Slop quality gate

For TypeScript or JavaScript targets, report this phase before build verification.

- PASS when all required Anti-Slop rules are configured at `error` and the target lint command succeeds.
- WARN when the target is eligible but has no installed or vendored Anti-Slop configuration; name `$install-anti-slop` as the exact repair route.
- FAIL when the configured command returns a finding or non-zero exit status; include the first 20 relevant output lines.

Do not treat a general ESLint, TypeScript, or formatting success as an Anti-Slop pass unless it runs the verified vendored rule set.

## Phase 3 -- Build verification

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

## Phase 4 -- Supplementary code-quality scan

### 4a. File size enforcement

Scan all `.ts`, `.tsx`, `.css` files in `src/` and `frontend/`. Flag any file over 300 lines.

Format: `WARN: {path} -- {line_count} lines (limit: 300)`

### 4b. Dead code detection

Look for:
- Exported functions/components with zero imports elsewhere
- Files not imported by any other file
- Unused dependencies in `package.json`

Report as WARN (not FAIL -- dead code is a smell, not a blocker).

### 4c. Changelog compliance

If `src/lib/changelog.ts` exists, verify:
- Most recent entry is within the last 24 hours (for active development)
- Entry format matches expected schema

---

## Phase 5 -- Test verification

```bash
# Run available test suites
bun test 2>/dev/null || npx vitest run 2>/dev/null || echo "No test runner found"
```

- PASS if all tests pass
- FAIL if any test fails -- include test name and assertion
- WARN if no tests exist

---

## Phase 6 -- Security scan

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

## Phase 7 -- Debug mode

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

Phase 1: Environment          [PASS/WARN/FAIL]
Phase 2: Anti-Slop quality    [PASS/WARN/FAIL/N/A]
Phase 3: Build                [PASS/WARN/FAIL]
Phase 4: Supplementary code   [PASS/WARN/FAIL]
Phase 5: Tests                [PASS/WARN/FAIL]
Phase 6: Security             [PASS/WARN/FAIL]

Overall: {PASS / WARN / FAIL}
Blockers: {count}
Warnings: {count}

--- Details ---
{Findings per phase, grouped by severity}
```
