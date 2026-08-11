#!/usr/bin/env python3
"""Codex productivity hook and durable Factory run controller.

The hook reads one JSON object from stdin. It writes a compact JSON response to
stdout. A deny decision exits 2 so Codex stops the current action. State lives
outside product repositories under the configured Factory project directory.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DIRECTIVE = (
    "work freely, work with an open mind, and explore all possible options; "
    "never jump to conclusions at the second or third blocker. Be innovative, "
    "take inventory of your skills"
)
HANDOFF_MESSAGE = (
    "Stop. Don’t make TP do your fucking job. Inventory your skills, current "
    "repo truth, CLI, browser, provider API, approved OSS, and remaining safe "
    "paths before you hand this over."
)
GENUINE_GATES = {
    "new-secret",
    "mfa-or-consent",
    "billing-or-paid-commitment",
    "rights",
    "client-decision",
    "irreversible-external-action",
}
MECHANISMS = {
    "wrong-review-surface",
    "needless-complexity",
    "delegation-sprawl",
    "reopened-stopped-path",
    "stale-external-state",
    "ignored-oss-simplicity",
    "execution-lane-confusion",
    "scope-expansion",
    "context-overload",
    "overcomplicated-status",
    "asked-before-inventory",
    "ui-before-process",
    "taxonomy-drift",
    "missing-or-stale-user-testing-lineage",
    "incomplete-user-testing",
    "avoidable-approval-wait",
}
PREVENTION_MAP = {
    "wrong-review-surface": "Pre-tool surface check plus Site proof requirement",
    "needless-complexity": "Spec simplicity review, approved-block search, and dependency budget",
    "delegation-sprawl": "One-owner contract, concurrency limits, and task-count check",
    "reopened-stopped-path": "Correction latch and prevention-test gate",
    "stale-external-state": "State refresh, backoff, and materially different retry",
    "ignored-oss-simplicity": "PL1 building-block and license gate",
    "execution-lane-confusion": "Entrance receipt and source-identity preflight",
    "scope-expansion": "Scope-hash comparison before tools and at Stop",
    "context-overload": "Bounded context pointers and role summary",
    "overcomplicated-status": "Communication validator and concise receipt schema",
    "asked-before-inventory": "Stop gate for source and skill inventory",
    "ui-before-process": "PL2 contract dependency before PL4 work",
    "taxonomy-drift": "Canonical vocabulary validator",
    "missing-or-stale-user-testing-lineage": "Dual physical specification maps and inherited task-context validation",
    "incomplete-user-testing": "Inherited sub-journey and regression evidence with orchestrator acceptance",
    "avoidable-approval-wait": "Full routine approval posture in every implementation dispatch",
}


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def read_payload() -> dict[str, Any]:
    raw = sys.stdin.read().strip()
    if not raw:
        return {}
    try:
        value = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise SystemExit(f"invalid hook JSON: {exc}") from exc
    return value if isinstance(value, dict) else {}


def compact_text(value: Any) -> str:
    if isinstance(value, str):
        return value
    return json.dumps(value, sort_keys=True, ensure_ascii=False)


def normalized_failure(text: str) -> str:
    lowered = text.lower()
    lowered = re.sub(r"[0-9a-f]{7,64}", "<id>", lowered)
    lowered = re.sub(r"\b\d+\b", "<n>", lowered)
    lowered = re.sub(r"\s+", " ", lowered).strip()
    return hashlib.sha256(lowered.encode("utf-8")).hexdigest()[:20]


def default_state(run_id: str, project_id: str) -> dict[str, Any]:
    return {
        "version": 1,
        "runId": run_id,
        "projectId": project_id,
        "sprintId": "S015",
        "phase": "PL0",
        "sourceRef": None,
        "scopeHash": "unrecorded",
        "allowedSurfaces": [],
        "allowedPaths": [],
        "blockers": [],
        "exploredPaths": [],
        "skillInventory": [],
        "proof": [],
        "humanGate": None,
        "userTestingRequired": False,
        "actorRole": "worker",
        "correctionLatch": {
            "active": False,
            "mechanism": None,
            "preventionTestPassed": False,
        },
        "circuit": {"state": "closed", "reason": None},
        "updatedAt": utc_now(),
    }


def resolve_state_path(args: argparse.Namespace, payload: dict[str, Any]) -> Path:
    if args.state:
        return args.state.expanduser().resolve()
    configured = os.environ.get("SOLVYS_FACTORY_RUN_STATE")
    if configured:
        return Path(configured).expanduser().resolve()
    project = str(payload.get("project_id") or payload.get("projectId") or "unregistered")
    run = str(
        payload.get("session_id")
        or payload.get("thread_id")
        or payload.get("runId")
        or "current"
    )
    return (
        Path.home()
        / ".config"
        / "solvys-factory"
        / "projects"
        / safe_name(project)
        / "runs"
        / f"{safe_name(run)}.json"
    )


def safe_name(value: str) -> str:
    cleaned = re.sub(r"[^A-Za-z0-9._-]+", "-", value).strip("-.")
    return cleaned or "unknown"


def load_state(path: Path, payload: dict[str, Any]) -> dict[str, Any]:
    if path.exists():
        try:
            value = json.loads(path.read_text(encoding="utf-8"))
            if isinstance(value, dict):
                return value
        except (OSError, json.JSONDecodeError):
            pass
    return default_state(
        str(payload.get("runId") or payload.get("session_id") or path.stem),
        str(payload.get("projectId") or payload.get("project_id") or path.parents[1].name),
    )


def save_state(path: Path, state: dict[str, Any]) -> None:
    state["updatedAt"] = utc_now()
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(state, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    temporary.replace(path)


def input_text(payload: dict[str, Any]) -> str:
    tool_input = payload.get("tool_input") or payload.get("toolInput") or {}
    return " ".join(
        compact_text(value)
        for value in (
            payload.get("prompt", ""),
            payload.get("message", ""),
            payload.get("tool_name", ""),
            payload.get("toolName", ""),
            tool_input,
        )
        if value not in (None, "", {})
    )


def detect_pretool_mechanisms(payload: dict[str, Any], state: dict[str, Any]) -> list[str]:
    text = input_text(payload).lower()
    found: set[str] = set()
    phase = str(state.get("phase", "PL0"))
    allowed_surfaces = {str(item).lower() for item in state.get("allowedSurfaces", [])}

    if ("google chrome" in text or "safari" in text or "open -a chrome" in text) and (
        "chatgpt-site" in allowed_surfaces or "codex-in-app-browser" in allowed_surfaces
    ):
        found.add("wrong-review-surface")
    if any(token in text for token in ("create_thread", "spawn_agent", "subagent", "sub-agent")):
        found.add("delegation-sprawl")
    if phase in {"PL0", "PL1", "PL2"} and any(
        token in text
        for token in ("app/page.tsx", "src/components", "frontend/", "create ui", "build ui")
    ):
        found.add("ui-before-process")
    if state.get("correctionLatch", {}).get("active") and not state.get(
        "correctionLatch", {}
    ).get("preventionTestPassed"):
        found.add("reopened-stopped-path")
    incoming_scope = payload.get("scopeHash") or payload.get("scope_hash")
    if incoming_scope and state.get("scopeHash") not in ("unrecorded", incoming_scope):
        found.add("scope-expansion")
    if state.get("circuit", {}).get("state") == "open":
        found.add("execution-lane-confusion")
    return sorted(found)


def valid_human_gate(state: dict[str, Any]) -> bool:
    gate = state.get("humanGate")
    if not isinstance(gate, dict):
        return False
    return (
        gate.get("type") in GENUINE_GATES
        and bool(gate.get("evidence"))
        and bool(gate.get("smallestAction"))
        and gate.get("safeWorkContinues") is True
    )


def field(payload: dict[str, Any], state: dict[str, Any], *names: str) -> Any:
    for name in names:
        if payload.get(name) not in (None, ""):
            return payload[name]
        if state.get(name) not in (None, ""):
            return state[name]
    return None


def user_testing_required(payload: dict[str, Any], state: dict[str, Any]) -> bool:
    return field(payload, state, "userTestingRequired", "user_testing_required") is True


def validate_user_testing(payload: dict[str, Any], state: dict[str, Any], require_acceptance: bool) -> list[str]:
    cabinet = field(payload, state, "cabinetSpecMapPath", "cabinet_spec_map_path")
    technical = field(payload, state, "technicalSpecMapPath", "technical_spec_map_path")
    context = field(payload, state, "userTestingContextPath", "user_testing_context_path")
    record = field(payload, state, "userTestingRecordPath", "user_testing_record_path")
    missing = [label for label, value in (("canonical Cabinet map", cabinet), ("technical codebase map", technical), ("user-testing context", context)) if not isinstance(value, str) or not value.strip()]
    if require_acceptance and (not isinstance(record, str) or not record.strip()):
        missing.append("user-testing record")
    if missing:
        return ["missing " + ", ".join(missing)]
    validator = Path(__file__).resolve().parent.parent / ".claude" / "skills" / "solvys-user-testing" / "scripts" / "validate_user_testing.py"
    command = [sys.executable, str(validator), "--cabinet-map", str(cabinet), "--technical-map", str(technical), "--context", str(context)]
    if isinstance(record, str) and record.strip():
        command.extend(["--record", record])
    if require_acceptance:
        command.append("--require-acceptance")
    completed = subprocess.run(command, capture_output=True, text=True, check=False)
    try:
        result = json.loads(completed.stdout)
        return list(result.get("issues", [])) if isinstance(result, dict) else ["user-testing validator returned invalid output"]
    except json.JSONDecodeError:
        return [completed.stderr.strip() or "user-testing validator failed"]


def ordinary_work(payload: dict[str, Any]) -> bool:
    if payload.get("ordinaryImplementation") is True or payload.get("ordinary_implementation") is True:
        return True
    tool = str(payload.get("tool_name") or payload.get("toolName") or "").lower()
    text = input_text(payload).lower()
    if "validate_user_testing.py" in text or tool in {"read", "glob", "grep", "ls"}:
        return False
    return tool in {"bash", "shell", "exec", "write", "edit", "apply_patch", "computer", "browser"}


def stop_decision(payload: dict[str, Any], state: dict[str, Any]) -> tuple[str, list[str], str | None]:
    if user_testing_required(payload, state):
        role = str(field(payload, state, "actorRole", "actor_role") or "worker")
        claim = payload.get("completionClaim") is True or payload.get("completion_claim") is True
        handoff = payload.get("handoffStatus") or payload.get("handoff_status")
        if claim and role != "orchestrator":
            return "deny", ["incomplete-user-testing"], "Worker completion claims are blocked. Report ready-for-orchestrator-acceptance with the user-testing record."
        require_acceptance = claim or role == "orchestrator"
        if not claim and role != "orchestrator" and handoff != "ready-for-orchestrator-acceptance":
            return "deny", ["incomplete-user-testing"], "Normal final statements cannot close this task. Submit ready-for-orchestrator-acceptance with the user-testing record."
        testing_issues = validate_user_testing(payload, state, require_acceptance=require_acceptance)
        if testing_issues:
            mechanism = "missing-or-stale-user-testing-lineage" if any("map" in issue or "lineage" in issue or "revision" in issue or "digest" in issue for issue in testing_issues) else "incomplete-user-testing"
            return "deny", [mechanism], "User-testing gate blocked closure. " + "; ".join(testing_issues)
        return "allow", [], None
    if valid_human_gate(state):
        return "allow", [], None
    mechanisms: list[str] = []
    if not state.get("skillInventory"):
        mechanisms.append("asked-before-inventory")
    if len(set(state.get("exploredPaths", []))) < 3:
        mechanisms.append("stale-external-state")
    latch = state.get("correctionLatch", {})
    if latch.get("active") and not latch.get("preventionTestPassed"):
        mechanisms.append("reopened-stopped-path")
    if state.get("circuit", {}).get("state") == "open":
        mechanisms.append("execution-lane-confusion")
    if mechanisms:
        detail = ", ".join(sorted(set(mechanisms)))
        return "deny", sorted(set(mechanisms)), f"{HANDOFF_MESSAGE} Mechanism: {detail}."
    return "allow", [], None


def update_failure_state(payload: dict[str, Any], state: dict[str, Any]) -> list[str]:
    text = compact_text(payload.get("tool_response") or payload.get("toolResponse") or payload.get("error") or "")
    failed = bool(payload.get("is_error") or payload.get("isError") or payload.get("error"))
    if not failed or not text.strip():
        return []
    fingerprint = normalized_failure(text)
    blockers = state.setdefault("blockers", [])
    existing = next((item for item in blockers if item.get("fingerprint") == fingerprint), None)
    if existing:
        existing["count"] = int(existing.get("count", 1)) + 1
        existing["lastSeenAt"] = utc_now()
    else:
        existing = {
            "fingerprint": fingerprint,
            "count": 1,
            "firstSeenAt": utc_now(),
            "lastSeenAt": utc_now(),
            "evidence": text[:500],
        }
        blockers.append(existing)
    count = int(existing["count"])
    if count >= 3:
        state["circuit"] = {"state": "open", "reason": f"repeated failure {fingerprint}"}
        return ["stale-external-state"]
    if count >= 2:
        state["circuit"] = {"state": "repair", "reason": f"repeated failure {fingerprint}"}
        return ["stale-external-state"]
    return []


def response(event: str, decision: str, message: str | None, mechanisms: list[str]) -> dict[str, Any]:
    result: dict[str, Any] = {
        "decision": decision,
        "reason": message,
        "mechanisms": mechanisms,
    }
    if event in {"SessionStart", "UserPromptSubmit", "PostToolUse"}:
        result["additionalContext"] = message or DIRECTIVE
    return result


def append_event(path: Path, event: str, decision: str, mechanisms: list[str], message: str | None) -> None:
    record = {
        "version": 1,
        "event": event,
        "runId": path.stem,
        "occurredAt": utc_now(),
        "decision": decision,
        "mechanisms": mechanisms,
        "evidence": [str(path)],
        "message": message,
    }
    log = path.with_name(path.stem + ".events.jsonl")
    log.parent.mkdir(parents=True, exist_ok=True)
    with log.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(record, sort_keys=True) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--event", choices=["SessionStart", "UserPromptSubmit", "PreToolUse", "PostToolUse", "Stop"])
    parser.add_argument("--state", type=Path)
    parser.add_argument("--no-write", action="store_true")
    args = parser.parse_args()
    payload = read_payload()
    event = args.event or str(payload.get("hook_event_name") or payload.get("hookEventName") or "PreToolUse")
    state_path = resolve_state_path(args, payload)
    state = load_state(state_path, payload)

    decision = "allow"
    message: str | None = DIRECTIVE if event in {"SessionStart", "UserPromptSubmit"} else None
    mechanisms: list[str] = []

    if event == "PreToolUse":
        if user_testing_required(payload, state) and ordinary_work(payload):
            lineage_issues = validate_user_testing(payload, state, require_acceptance=False)
            if lineage_issues:
                mechanisms = ["missing-or-stale-user-testing-lineage"]
                decision = "deny"
                message = "Factory dispatch blocked ordinary work. " + "; ".join(lineage_issues)
        if not mechanisms:
            mechanisms = detect_pretool_mechanisms(payload, state)
        if mechanisms:
            decision = "deny"
            message = message or f"Factory prevention stopped this action. Mechanism: {', '.join(mechanisms)}."
    elif event == "PostToolUse":
        mechanisms = update_failure_state(payload, state)
        if mechanisms:
            decision = "warn"
            message = "Repeated failure detected. Enter repair mode and choose a materially different path."
    elif event == "Stop":
        decision, mechanisms, message = stop_decision(payload, state)

    if not args.no_write:
        save_state(state_path, state)
        append_event(state_path, event, decision, mechanisms, message)
    print(json.dumps(response(event, decision, message, mechanisms), ensure_ascii=False))
    return 2 if decision == "deny" else 0


if __name__ == "__main__":
    raise SystemExit(main())
