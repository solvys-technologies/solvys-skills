---
name: solvys-support-audit
description: "Audit a Solvys client support loop end-to-end: remote error capture, incident storage, Linear auto-filing, admin health UI, update records, scheduled Codex resolution sync, env readiness, and smoke tests. Use before shipping or after a support incident."
---

# Solvys Support Audit

You are auditing whether a client support loop will actually catch problems, file them to Linear, and notify the client setup after fixes land.

This is report-first. Do not fix unless the user explicitly asks.

## Audit Scope

Check these surfaces:

1. Remote capture: global browser errors, unhandled promises, React boundaries, API/integration catch paths.
2. Incident API: validation, fingerprinting, dedupe, persistence, retry behavior.
3. Data sink: migrations, RLS/admin access, update-record read path.
4. Linear filing: env, team/project/assignee config, priority mapping, issue body quality, failure mode.
5. Admin UI: open incident visibility, Linear links, setup failure honesty, fix/update record visibility.
6. Resolution sync: scheduled Codex/local watcher, secret-protected endpoint, Linear completion detection, Linear commentback.
7. Smoke tests: dry-run and live where env exists.

## Commands and Checks

Use repo-local commands. Typical checks:

```bash
rg -n "support_incidents|app_update_records|/api/incidents|LINEAR_|INCIDENT_WEBHOOK_SECRET|reportIncident|ErrorBoundary|unhandledrejection" .
rg -n "smoke:support|support-pipeline|sync-resolution" package.json scripts README.md . 2>/dev/null
bun test 2>/dev/null || npm test -- --runInBand 2>/dev/null || true
bun run build 2>/dev/null || npm run build 2>/dev/null || true
bun run typecheck 2>/dev/null || npm run typecheck 2>/dev/null || true
bun run smoke:support 2>/dev/null || npm run smoke:support 2>/dev/null || true
```

Never print secret values. Report only presence/missing.

## PASS/WARN/FAIL Criteria

### PASS

- Incident storage exists and is migrated.
- Client and server capture paths exist.
- Linear filing is server-side and env-driven.
- Admin health UI displays incidents and update records.
- A dry-run smoke passes.
- Live smoke passes when all env is present.
- Resolution sync is scheduled or documented with exact endpoint payload.

### WARN

- Live smoke skipped because env is missing.
- Labels are documented in issue body but not attached by ID.
- Admin UI is available but lacks auth/RLS hardening.
- Resolution sync exists but only as documentation.

### FAIL

- Client-side code directly contains Linear tokens.
- Errors are only logged to console.
- Linear failures drop incidents.
- No smoke test exists.
- Admin says "all clear" while setup/incident fetch is failing.
- Completed Linear fixes cannot publish client update records.

## Output Format

```text
============================================
  SOLVYS SUPPORT AUDIT
  {project} -- {date} -- {branch}
============================================

Capture                [PASS/WARN/FAIL]
Incident Sink          [PASS/WARN/FAIL]
Linear Filing          [PASS/WARN/FAIL]
Admin Visibility       [PASS/WARN/FAIL]
Resolution Sync        [PASS/WARN/FAIL]
Smoke Tests            [PASS/WARN/FAIL]

Overall: PASS/WARN/FAIL

Blockers:
- ...

Warnings:
- ...

Evidence:
- path:line -- finding

Recommended next actions:
1. ...
```

When the user asks for a fix after the audit, switch to implementation mode and keep changes narrowly scoped to the failing support surfaces.
