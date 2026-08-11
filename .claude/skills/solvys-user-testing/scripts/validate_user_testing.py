#!/usr/bin/env python3
"""Validate Solvys spec lineage and orchestrator-owned user-testing acceptance."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from typing import Any

ROUTINE_ACTIONS = {"implementation", "testing", "debugging", "restart", "validation"}
HUMAN_GATES = {
    "new-secret",
    "mfa-or-consent",
    "billing-or-paid-commitment",
    "client-decision",
    "rights",
    "irreversible-external-action",
}
REQUIRED_SKILLS = {"solvys-audit", "solvys-user-testing"}


def load(path: Path, label: str) -> dict[str, Any]:
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"cannot read {label}: {exc}") from exc
    if not isinstance(value, dict):
        raise ValueError(f"{label} root must be an object")
    return value


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def nonempty(value: Any) -> bool:
    return isinstance(value, str) and bool(value.strip())


def ids(items: Any, label: str, issues: list[str]) -> set[str]:
    if not isinstance(items, list) or not items:
        issues.append(f"{label} must contain at least one item")
        return set()
    result: set[str] = set()
    for index, item in enumerate(items, start=1):
        item_id = item.get("id") if isinstance(item, dict) else item
        if not nonempty(item_id):
            issues.append(f"{label} item {index} requires an id")
        elif item_id in result:
            issues.append(f"{label} contains duplicate id {item_id}")
        else:
            result.add(item_id)
    return result


def spec_revision(path: Path) -> str | None:
    text = path.read_text(encoding="utf-8")
    if path.suffix.lower() == ".json":
        value = json.loads(text)
        revision = value.get("revision") if isinstance(value, dict) else None
        return str(revision) if revision is not None else None
    match = re.search(r"(?im)^\s*(?:spec(?:ification)?\s+)?revision\s*:\s*([^\s#]+)", text)
    return match.group(1) if match else None


def resolve_path(value: Any, relative_to: Path, label: str, issues: list[str]) -> Path | None:
    if not nonempty(value):
        issues.append(f"{label} path is required")
        return None
    path = Path(value).expanduser()
    return path.resolve() if path.is_absolute() else (relative_to.parent / path).resolve()


def validate_context(cabinet_path: Path, technical_path: Path, context_path: Path) -> tuple[list[str], dict[str, Any], dict[str, Any]]:
    issues: list[str] = []
    cabinet = load(cabinet_path, "canonical Cabinet specification map")
    technical = load(technical_path, "technical codebase specification map")
    context = load(context_path, "user-testing context")

    if cabinet.get("version") != 1:
        issues.append("canonical Cabinet map version must equal 1")
    if technical.get("version") != 1:
        issues.append("technical codebase map version must equal 1")
    if context.get("version") != 1:
        issues.append("user-testing context version must equal 1")
    if "completionCriteria" in context or "completionCriteria" in technical.get("task", {}):
        issues.append("sprint context cannot define independent completion criteria")

    maps = context.get("specificationMaps")
    if not isinstance(maps, dict):
        issues.append("dual specification map lineage is required")
        return issues, technical, context
    revision = str(maps.get("revision", ""))
    link_id = maps.get("integrityLinkId")
    if not revision or not nonempty(link_id):
        issues.append("shared specification revision and integrity-link ID are required")
    if str(cabinet.get("revision", "")) != revision or str(technical.get("revision", "")) != revision:
        issues.append("canonical and technical specification map revisions must match context")
    if cabinet.get("integrityLinkId") != link_id or technical.get("integrityLinkId") != link_id:
        issues.append("canonical and technical specification maps must share the context integrity-link ID")

    cabinet_ref = maps.get("cabinet") if isinstance(maps.get("cabinet"), dict) else {}
    technical_ref = maps.get("technical") if isinstance(maps.get("technical"), dict) else {}
    declared_cabinet_path = resolve_path(cabinet_ref.get("path"), context_path, "canonical Cabinet map", issues)
    declared_technical_path = resolve_path(technical_ref.get("path"), context_path, "technical codebase map", issues)
    if declared_cabinet_path != cabinet_path.resolve():
        issues.append("context canonical Cabinet map path does not match the validated physical file")
    if declared_technical_path != technical_path.resolve():
        issues.append("context technical codebase map path does not match the validated physical file")
    if cabinet_ref.get("sha256") != digest(cabinet_path):
        issues.append("canonical Cabinet map digest is stale")
    if technical_ref.get("sha256") != digest(technical_path):
        issues.append("technical codebase map digest is stale")

    technical_link = cabinet.get("technicalMap") if isinstance(cabinet.get("technicalMap"), dict) else {}
    canonical_link = technical.get("canonicalMap") if isinstance(technical.get("canonicalMap"), dict) else {}
    linked_technical_path = resolve_path(technical_link.get("path"), cabinet_path, "canonical map technical link", issues)
    linked_cabinet_path = resolve_path(canonical_link.get("path"), technical_path, "technical map canonical link", issues)
    if linked_technical_path != technical_path.resolve() or linked_cabinet_path != cabinet_path.resolve():
        issues.append("specification maps do not cross-link their physical locations")
    if technical_link.get("sha256") != digest(technical_path):
        issues.append("canonical map technical digest is stale")
    for label, link in (("canonical technical link", technical_link), ("technical canonical link", canonical_link)):
        if str(link.get("revision", "")) != revision or link.get("integrityLinkId") != link_id:
            issues.append(f"{label} revision or integrity-link ID is stale")

    canonical_objective = cabinet.get("clientObjective") if isinstance(cabinet.get("clientObjective"), dict) else {}
    if canonical_objective.get("id") != context.get("parentObjectiveId") or not nonempty(canonical_objective.get("statement")):
        issues.append("canonical Cabinet map does not own the inherited parent objective")
    canonical_journeys = {item.get("id"): item for item in cabinet.get("userJourneys", []) if isinstance(item, dict)}
    if context.get("parentJourneyId") not in canonical_journeys or not nonempty(canonical_journeys.get(context.get("parentJourneyId"), {}).get("statement")):
        issues.append("canonical Cabinet map does not own the inherited full user journey")

    objectives = {item.get("id"): item for item in technical.get("objectives", []) if isinstance(item, dict)}
    objective = objectives.get(context.get("parentObjectiveId"))
    if not objective:
        issues.append("parent objective lineage is missing or unknown")
        return issues, technical, context
    journeys = {item.get("id"): item for item in objective.get("journeys", []) if isinstance(item, dict)}
    journey = journeys.get(context.get("parentJourneyId"))
    if not journey:
        issues.append("parent user journey lineage is missing or unknown")
        return issues, technical, context
    subjourneys = {item.get("id"): item for item in journey.get("subJourneys", []) if isinstance(item, dict)}
    subjourney = subjourneys.get(context.get("taskSubJourneyId"))
    if not subjourney:
        issues.append("task sub-journey lineage is missing or unknown")
        return issues, technical, context

    expected = {
        "acceptanceCriterionIds": ids(subjourney.get("acceptanceCriteria"), "sub-journey acceptance criteria", issues),
        "validationGateIds": ids(subjourney.get("validationGates"), "sub-journey validation gates", issues),
        "regressionJourneyIds": ids(journey.get("regressionJourneys"), "parent regression journeys", issues),
    }
    for key, required in expected.items():
        declared = context.get(key)
        declared_set = set(declared) if isinstance(declared, list) and all(nonempty(x) for x in declared) else set()
        if declared_set != required:
            issues.append(f"{key} must exactly inherit the authoritative set")

    resource_items = subjourney.get("resources")
    resource_ids = ids(resource_items, "sub-journey resources", issues)
    expected_resources = {
        item.get("id"): item.get("location")
        for item in resource_items or []
        if isinstance(item, dict) and item.get("id") in resource_ids and nonempty(item.get("location"))
    }
    if set(expected_resources) != resource_ids:
        issues.append("every authoritative resource requires a location")
    declared_resources = context.get("authoritativeResources")
    actual_resources = {
        item.get("id"): item.get("location")
        for item in declared_resources or []
        if isinstance(item, dict) and nonempty(item.get("id")) and nonempty(item.get("location"))
    }
    if actual_resources != expected_resources or not actual_resources:
        issues.append("authoritativeResources must exactly inherit resource IDs and locations")

    if context.get("progressRevision") != technical.get("progress", {}).get("revision"):
        issues.append("current progress state is missing or stale")
    if not isinstance(context.get("testDataBoundary"), dict) or not context["testDataBoundary"]:
        issues.append("test-data boundary is required")
    if not nonempty(context.get("acceptanceBranch")):
        issues.append("acceptance branch is required")
    if not nonempty(context.get("nextAction")):
        issues.append("next action is required")
    required_skills = set(context.get("requiredSkills", []))
    if not REQUIRED_SKILLS.issubset(required_skills):
        issues.append("required skills must include solvys-audit and solvys-user-testing")

    approval = context.get("approvalPosture")
    if not isinstance(approval, dict) or approval.get("routine") != "full":
        issues.append("routine approval posture must be full")
    elif not ROUTINE_ACTIONS.issubset(set(approval.get("actions", []))):
        issues.append("full approval posture must cover implementation, testing, debugging, restart, and validation")

    gates = context.get("genuineHumanOnlyGates")
    if not isinstance(gates, list):
        issues.append("genuineHumanOnlyGates must be a list")
    else:
        for index, gate in enumerate(gates, start=1):
            if not isinstance(gate, dict) or gate.get("type") not in HUMAN_GATES:
                issues.append(f"human gate {index} has an unsupported type")
                continue
            if not nonempty(gate.get("smallestHumanAction")):
                issues.append(f"human gate {index} requires the smallest human action")
            if gate.get("safeWorkContinues") is not True:
                issues.append(f"human gate {index} must keep safe work running")

    return issues, technical, context


def evidence_map(value: Any, label: str, expected: set[str], issues: list[str]) -> None:
    if not isinstance(value, list):
        issues.append(f"{label} evidence must be a list")
        return
    found: set[str] = set()
    for item in value:
        if not isinstance(item, dict) or not nonempty(item.get("id")):
            issues.append(f"{label} evidence contains an invalid item")
            continue
        found.add(item["id"])
        if item.get("status") != "passed":
            issues.append(f"{label} {item['id']} is {item.get('status', 'not-run')}")
        if not isinstance(item.get("evidence"), list) or not any(nonempty(x) for x in item["evidence"]):
            issues.append(f"{label} {item['id']} requires evidence")
    if found != expected:
        issues.append(f"{label} evidence must exactly cover the inherited set")


def validate_record(record_path: Path, context_path: Path, context: dict[str, Any], require_acceptance: bool) -> list[str]:
    issues: list[str] = []
    record = load(record_path, "user-testing record")
    if record.get("version") != 1:
        issues.append("user-testing record version must equal 1")
    if record.get("contextSha256") != digest(context_path):
        issues.append("user-testing record context digest is stale")
    if record.get("workerStatus") != "ready-for-orchestrator-acceptance":
        issues.append("worker status must be ready-for-orchestrator-acceptance")
    if record.get("workerCompletionClaim") not in (None, False):
        issues.append("worker cannot declare completion")
    evidence_map(record.get("acceptanceCriteria"), "acceptance criterion", set(context.get("acceptanceCriterionIds", [])), issues)
    evidence_map(record.get("validationGates"), "validation gate", set(context.get("validationGateIds", [])), issues)
    evidence_map(record.get("regressionJourneys"), "regression journey", set(context.get("regressionJourneyIds", [])), issues)
    task = record.get("taskSubJourney")
    if not isinstance(task, dict) or task.get("id") != context.get("taskSubJourneyId"):
        issues.append("task sub-journey evidence does not match inherited context")
    elif task.get("status") != "passed" or not isinstance(task.get("evidence"), list) or not any(nonempty(x) for x in task["evidence"]):
        issues.append("task sub-journey has not passed with evidence")
    if require_acceptance:
        acceptance = record.get("orchestratorAcceptance")
        if not isinstance(acceptance, dict) or acceptance.get("status") != "accepted":
            issues.append("orchestrator acceptance is required")
        else:
            if not nonempty(acceptance.get("owner")):
                issues.append("orchestrator acceptance owner is required")
            if not isinstance(acceptance.get("evidence"), list) or not any(nonempty(x) for x in acceptance["evidence"]):
                issues.append("orchestrator acceptance evidence is required")
    return issues


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--cabinet-map", required=True, type=Path)
    parser.add_argument("--technical-map", required=True, type=Path)
    parser.add_argument("--context", required=True, type=Path)
    parser.add_argument("--record", type=Path)
    parser.add_argument("--require-acceptance", action="store_true")
    args = parser.parse_args()
    issues: list[str] = []
    try:
        context_issues, _technical, context = validate_context(args.cabinet_map, args.technical_map, args.context)
        issues.extend(context_issues)
        if args.require_acceptance and not args.record:
            issues.append("user-testing record is required for orchestrator acceptance")
        if args.record:
            issues.extend(validate_record(args.record, args.context, context, args.require_acceptance))
    except (ValueError, OSError, json.JSONDecodeError) as exc:
        issues.append(str(exc))
    print(json.dumps({"valid": not issues, "issues": issues}, sort_keys=True))
    return 0 if not issues else 2


if __name__ == "__main__":
    raise SystemExit(main())
