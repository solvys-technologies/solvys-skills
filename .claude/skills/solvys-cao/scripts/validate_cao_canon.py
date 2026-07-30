#!/usr/bin/env python3
"""Validate that the Solvys CAO skill keeps its required operating contracts."""

from __future__ import annotations

import json
from datetime import date
from pathlib import Path
import re
import sys


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    "SKILL.md",
    "agents/openai.yaml",
    "references/mission-doctrine.md",
    "references/forbidden-mindsets-and-design-sins.md",
    "references/decision-authority.md",
    "references/official-stack.md",
    "references/voice-and-respect.md",
    "references/client-partitions.md",
    "references/daily-context-contract.md",
    "references/storage-and-execution-lanes.md",
    "references/refresh-system.md",
    "references/wonder-frontend-sandbox.md",
    "ops/storage-policy.json",
    "ops/tranche-registry.json",
    "ops/README.md",
    "scripts/storage_inventory.py",
    "scripts/fixtures/refresh-contract.json",
    "references/fintheon-pain-eureka-ledger.md",
    "references/fintheon-checkpoint-index.md",
    "references/agent-cao.md",
    "references/agent-product-architect.md",
    "references/agent-design-director.md",
    "references/agent-experience-engineer.md",
    "references/agent-systems-engineer.md",
    "references/agent-debugger.md",
    "references/agent-adversarial-tester.md",
    "references/agent-sanitizer.md",
    "references/agent-research-librarian.md",
    "references/agent-review-release-steward.md",
]

REQUIRED_PHRASES = {
    "SKILL.md": [
        "Name the original problem",
        "Retrieve the best precedent",
        "Run the Ponytail chain",
        "Prove at the highest reality",
        "Select the execution and storage lane",
        "Wonder proves a provisional design direction",
        "Reference reconstruction",
        "Dream Team Roles",
        "Refresh Dispatch And Integration",
        "S### - concise context",
        "Implement this plan",
        "refs/sprints/S###/P#",
        "refs/sprints/S###/T#/P#",
        "repository-backed Codex Cloud",
        "projectless ChatGPT Work",
        "authenticated Git",
        "Custody classification happens before backup planning",
        "Sound packs and sound",
        "Never create a full-volume",
    ],
    "references/decision-authority.md": ["Answer For Yourself", "Clarify", "Shoot Down"],
    "references/official-stack.md": [
        "BeUI",
        "Bklit",
        "NumberFlow",
        "Local Solvys icon facade",
        "Approved Repository Canon",
    ],
    "references/fintheon-checkpoint-index.md": [
        "Problem And Repair Pairs",
        "Operational Evidence Outside Git",
        "Selection Rule",
    ],
    "references/storage-and-execution-lanes.md": [
        "Backend-only",
        "frontend plus backend",
        "Ten-Day Conversation Sweep",
        "Thirty-Day Transcript Sweep",
        "Terra Task Lifecycle",
        "Source Versus Always-On Runtime",
        "Application Support",
        "Cloud implementation",
        "Recovery And Restore Contract",
        "Resource Budgets",
        "Classify custody before backup",
        "A readable external volume is not a bulk-recovery trigger",
        "Create an encrypted Cloud backup only for the exact bounded asset set",
    ],
    "references/wonder-frontend-sandbox.md": [
        "Wonder is provisional design truth",
        "Port 7777 or the explicitly named sandbox",
        "Concurrent Human Work",
    ],
    "references/refresh-system.md": [
        "Plan-Mode Router",
        "Implement this plan",
        "Turnkey Cloud Pickup",
        "S### - concise context",
        "refs/sprints/S###/P#",
        "refs/sprints/S###/T#/P#",
        "YYYY-MM-DD",
        "main",
        "Blacksmith",
        "mandatory human verification",
        "restore proof",
        "Resource Budgets",
        "Wonder is provisional co-design truth",
        "Port 7777 or the explicitly named sandbox is source-integrated truth",
        "variable name only",
        "Exact Checkpoint Receipt",
        "coherent CI/deployment",
        "Worktree mode: detached",
        "A Cloud recommendation alone is not",
        "automatic date-branch deletion",
        "0 hours after verification",
        "repository-backed Codex Cloud",
        "projectless ChatGPT Work",
        "Authenticated Git publication route",
        "Custody classification precedes backup work",
        "read-only external volume does not trigger",
        "exact bounded asset set TP explicitly selects",
    ],
    "references/daily-context-contract.md": [
        "bounded TP-selected Cloud backup",
        "volume is incorrectly treated as authority for a bulk backup",
    ],
    "references/agent-sanitizer.md": [
        "Classify custody before backup",
        "sound libraries stay on Ext",
        "Never expand the selected set",
    ],
}

SUITE_ROOT = ROOT.parent
OPERATIONAL_SKILLS = {
    "solvys-brief": SUITE_ROOT / "solvys-brief" / "SKILL.md",
    "solvys-orchestrate": SUITE_ROOT / "solvys-orchestrate" / "SKILL.md",
    "solvys-execute": SUITE_ROOT / "solvys-execute" / "SKILL.md",
    "solvys-run-point": SUITE_ROOT / "solvys-run-point" / "SKILL.md",
}

OPERATIONAL_REQUIRED = [
    "S### - concise context",
    "Implement this plan",
    "YYYY-MM-DD",
    "refs/sprints/S###/P#",
    "refs/sprints/S###/T#/P#",
    "main",
    "repository-backed Codex Cloud",
    "projectless ChatGPT Work",
]

OPERATIONAL_CUSTODY_REQUIRED = {
    "solvys-brief": [
        "Custody boundary",
        "sound libraries stay on Ext",
        "do not invent a bulk backup",
    ],
    "solvys-orchestrate": [
        "Custody Boundary",
        "exact user-selected backup set",
    ],
    "solvys-execute": [
        "Sound libraries stay on Ext",
        "A readable Ext volume never implies a bulk backup",
    ],
    "solvys-run-point": [
        "Preserve the machine custody split",
        "not a full-volume backup",
    ],
}

CODE_PRESERVATION_EXCEPTIONS = {
    "unpushed_commits",
    "dirty_overlays",
    "unique_non_git_artifacts",
}

EXT_FORBIDDEN_INFERRED_ACTIONS = {
    "full_volume_backup",
    "full_repository_backup",
    "bulk_media_backup",
    "repair",
    "erase",
    "migration",
    "substitute_checkout",
}

DEFAULT_RESOURCE_CEILINGS = {
    "concurrentLocalImplementationTasks": 1,
    "taskOwnedProcessesPerTask": {
        "preview": 1,
        "browser": 1,
        "server": 2,
        "total": 4,
    },
    "peakRamPercent": 75,
    "sustainedRamPercent": 65,
    "sustainedRamMinutes": 5,
    "dmgsPerProductSprint": 1,
    "dmgLifetimeHoursAfterVerification": 0,
    "artifactBytesPerTask": 2_000_000_000,
    "artifactBytesPerSprint": 10_000_000_000,
    "checkpointsPerTrack": 3,
    "checkpointsPerSprint": 12,
    "worktreesPerTrack": 1,
    "worktreesPerSprint": 4,
    "activeTranscriptsPerTask": 1,
}

ROUTINE_DATE_BRANCH_RECEIPTS = [
    "green_ci_receipt",
    "daily_pr_squash_merge_receipt",
    "deployment_receipt",
    "postcheck_receipt",
    "clean_main_receipt",
    "date_branch_deletion_absence_receipt",
]

HUMAN_RISK_CATEGORIES = {
    "migrations",
    "destructive_writes",
    "authentication",
    "authorization",
    "billing",
    "secrets_or_provider_credentials",
    "infrastructure",
    "broad_routing",
    "security_controls",
    "irreversible_integrations",
    "release_or_install_behavior",
    "protected_surface_changes",
    "other_damaging_or_high_risk_boundary",
}

RETAINED_RELEASE_DMG_FIELDS = [
    "exactDmgPath",
    "sha256",
    "releaseIdentity",
    "scope",
    "owner",
    "retentionEndsAt",
    "classificationReceipt",
]

FORBIDDEN_BULK_SECRET_CATEGORIES = {
    "production",
    "trading",
    "authentication",
    "database",
    "provider_admin",
    "destructive",
}


def resolve_fixture_block(
    case: dict[str, object],
    direct_key: str,
    template_key: str,
    templates: dict[str, dict[str, object]],
    omit_key: str | None = None,
) -> dict[str, object] | None:
    """Resolve a direct or named fixture block and apply top-level omissions."""
    direct = case.get(direct_key)
    if isinstance(direct, dict):
        block = dict(direct)
    else:
        template_name = case.get(template_key)
        template = templates.get(template_name) if isinstance(template_name, str) else None
        if not isinstance(template, dict):
            return None
        block = dict(template)
    if omit_key:
        omitted = case.get(omit_key, [])
        if isinstance(omitted, list):
            for field in omitted:
                if isinstance(field, str):
                    block.pop(field, None)
    return block


def validate_implement_dispatch(
    case: dict[str, object],
    required_fields: list[str],
    required_return_fields: list[str],
    pickup_templates: dict[str, dict[str, object]],
    return_receipt_templates: dict[str, dict[str, object]],
) -> list[str]:
    """Return stable error codes for one accepted-plan dispatch fixture."""
    errors: list[str] = []
    if case.get("command") != "Implement this plan":
        errors.append("command_is_not_implement_this_plan")

    origin = case.get("originatingTask")
    target = case.get("implementationTarget")
    if target == origin:
        errors.append("implementation_target_is_originating_planning_task")

    repository_signals = case.get("repositoryWorkSignals", [])
    repository_work = (
        bool(repository_signals)
        or bool(case.get("cloudPickupTemplate"))
        or target == "repository-backed-codex-cloud-worktree"
    )
    if not repository_work:
        if target != "projectless-chatgpt-work":
            errors.append("non_repository_work_target_is_not_projectless_chatgpt_work")
        if case.get("dispatchResult") != "non-repository-task-dispatched":
            errors.append("non_repository_work_dispatch_not_executed")
        if not case.get("standaloneArtifactReceipt"):
            errors.append("standalone_artifact_receipt_missing")
        return errors

    if target != "repository-backed-codex-cloud-worktree":
        errors.append("implementation_target_is_not_repository_backed_codex_cloud")
    if case.get("dispatchResult") != "repository-worktree-dispatched":
        errors.append("repository_work_dispatch_not_executed")

    pickup = resolve_fixture_block(
        case,
        "cloudPickup",
        "cloudPickupTemplate",
        pickup_templates,
        "omitPickupFields",
    )
    if pickup is None:
        errors.append("cloud_pickup_missing")
        return errors

    for field in required_fields:
        if field not in pickup or pickup[field] in (None, ""):
            errors.append(f"cloud_pickup_missing_field:{field}")

    if pickup.get("Environment type") != "repository-backed-codex-cloud":
        errors.append("cloud_pickup_environment_is_not_repository_backed_codex_cloud")
    if pickup.get("Environment type") == "projectless-chatgpt-work":
        errors.append("projectless_chatgpt_work_cannot_implement_repository_work")
    environment_id = pickup.get("Environment ID")
    if not isinstance(environment_id, str) or not re.fullmatch(r"[0-9a-f]{32}", environment_id):
        errors.append("cloud_pickup_environment_id_is_not_real_opaque_id")
    elif (
        environment_id.startswith("workspace:")
        or "/workspace/scratch/" in environment_id
        or environment_id.startswith("codex-cloud-env-")
    ):
        errors.append("cloud_pickup_environment_id_is_forbidden_identity_shape")
    repository = pickup.get("Repository slug")
    label = pickup.get("Environment label")
    workspace = pickup.get("Managed workspace path")
    if label != repository:
        errors.append("cloud_pickup_environment_label_repository_mismatch")
    if isinstance(repository, str) and workspace != f"/workspace/{repository.rsplit('/', 1)[-1]}":
        errors.append("cloud_pickup_workspace_repository_mismatch")
    requested_base = pickup.get("Requested base/ref")
    checked_out_head = pickup.get("Exact checked-out HEAD")
    if requested_base == "main" or pickup.get("Implementation lane") == "main":
        errors.append("main_cannot_be_implementation_lane")
    if pickup.get("Base commit") != requested_base or checked_out_head != requested_base:
        errors.append("cloud_pickup_base_head_mismatch")
    if pickup.get("Clean-start proof") != "status=clean":
        errors.append("cloud_pickup_clean_start_not_proven")
    if (
        pickup.get("Repository attachment proof") == "structured-connector-read-only"
        and (
            pickup.get("Checkout proof") in (None, "none", "unavailable")
            or pickup.get("Authenticated Git publication route") in (None, "none")
        )
    ):
        errors.append("connector_read_without_git_transport_is_preflight_only")

    return_receipt = resolve_fixture_block(
        case,
        "cloudReturnReceipt",
        "cloudReturnReceiptTemplate",
        return_receipt_templates,
        "omitReturnReceiptFields",
    )
    if return_receipt is None:
        errors.append("cloud_return_receipt_missing")
        return errors
    for field in required_return_fields:
        if field not in return_receipt or return_receipt[field] in (None, ""):
            errors.append(f"cloud_return_receipt_missing_field:{field}")
    if return_receipt.get("Environment type") != "repository-backed-codex-cloud":
        errors.append(
            "cloud_return_receipt_environment_is_not_repository_backed_codex_cloud"
        )
    consistency_fields = (
        "Environment type", "Environment ID", "Environment label",
        "Repository slug", "Managed workspace path", "Base commit",
        "Requested base/ref", "Exact checked-out HEAD", "Clean-start proof",
        "Checkout mode", "Authenticated Git publication route",
        "Return branch", "Task identity", "Task-owned checkpoint ref",
    )
    for field in consistency_fields:
        if pickup.get(field) != return_receipt.get(field):
            errors.append(f"cloud_pickup_return_mismatch:{field}")
    return errors


def validate_cloud_secret_case(
    case: dict[str, object], forbidden_bulk_categories: set[str]
) -> list[str]:
    """Return stable errors for one Cloud secret-handling fixture."""
    errors: list[str] = []
    if case.get("secretValuesPresent") is True:
        errors.append("secret_values_forbidden_in_plan_or_receipt")
    if case.get("secretNames") and case.get("encryptedCloudEnvironment") is not True:
        errors.append("task_secret_requires_encrypted_cloud_environment")
    if case.get("secretNames") and case.get("setupPhaseOnly") is not True:
        errors.append("cloud_environment_secret_must_be_setup_phase_only")
    if case.get("runtimeMaterialized") is True:
        if case.get("reviewedSetupScript") is not True:
            errors.append("runtime_secret_requires_reviewed_setup_script")
        if case.get("leastPrivilegeRuntimeFile") is not True:
            errors.append("runtime_secret_file_must_be_least_privilege")
    if case.get("publicBuildConfiguration") != "environment_variables":
        errors.append("public_build_configuration_must_use_environment_variables")
    bulk_categories = case.get("bulkCopyCategories", [])
    if isinstance(bulk_categories, list) and set(bulk_categories) & forbidden_bulk_categories:
        errors.append("bulk_copy_forbidden_secret_categories")
    if case.get("excludedNamesOrCategoriesRecorded") is not True:
        errors.append("excluded_secret_names_or_categories_not_recorded")
    if case.get("purposeSpecificAuthorizationGatesRecorded") is not True:
        errors.append("purpose_specific_authorization_gates_not_recorded")
    return errors


def validate_dmg_lifecycle(case: dict[str, object]) -> list[str]:
    """Return stable error codes for one DMG lifecycle fixture."""
    errors: list[str] = []
    if "dmgLifetimeHoursAfterVerification" in case:
        if case["dmgLifetimeHoursAfterVerification"] != 0:
            errors.append("dmg_default_lifetime_must_be_zero")
        return errors

    if case.get("verified") is not True:
        return errors
    classification = case.get("classification")
    if classification == "ordinary":
        if case.get("state") != "deleted":
            errors.append("ordinary_verified_dmg_not_deleted_immediately")
        if not case.get("deletionReceipt"):
            errors.append("ordinary_verified_dmg_missing_deletion_receipt")
        if not case.get("absenceReceipt"):
            errors.append("ordinary_verified_dmg_missing_absence_receipt")
    elif classification == "retained_release_artifact":
        for field in RETAINED_RELEASE_DMG_FIELDS:
            if not case.get(field):
                errors.append(f"retained_release_dmg_missing_field:{field}")
    else:
        errors.append("verified_dmg_missing_explicit_classification")
    return errors


def validate_date_branch_lifecycle(
    case: dict[str, object],
    required_receipts: list[str],
    human_risk_categories: set[str],
) -> list[str]:
    """Return stable errors for one date-branch lifecycle fixture."""
    errors: list[str] = []
    receipts = case.get("receipts", [])
    if case.get("result") == "date_branch_deleted" and receipts != required_receipts:
        errors.append("date_branch_deletion_before_full_low_risk_lifecycle")

    risk_category = case.get("riskCategory")
    attempted_stages: list[object] = []
    if case.get("attemptedStage"):
        attempted_stages.append(case["attemptedStage"])
    else:
        receipt_stages = {
            "daily_pr_squash_merge_receipt": "daily_pr_squash_merge",
            "deployment_receipt": "deployment",
            "date_branch_deletion_absence_receipt": "date_branch_deletion",
        }
        for receipt, stage in receipt_stages.items():
            if receipt in receipts:
                attempted_stages.append(stage)
    if (
        isinstance(risk_category, str)
        and risk_category in human_risk_categories
        and not case.get("humanVerificationReceipt")
    ):
        for attempted_stage in attempted_stages:
            errors.append(
                f"human_verification_required_before:{attempted_stage}:{risk_category}"
            )
    return errors


def validate_custody_case(case: dict[str, object]) -> list[str]:
    """Return stable errors for one storage-custody fixture."""
    errors: list[str] = []
    asset_class = case.get("assetClass")
    custody_target = case.get("custodyTarget")
    requested_actions = case.get("requestedActions", [])
    actions = set(requested_actions) if isinstance(requested_actions, list) else set()

    if asset_class == "sound_libraries" and custody_target != "ext_in_place":
        errors.append("sound_libraries_must_remain_on_ext")
    if asset_class == "sensitive_personal_music":
        if custody_target != "designated_flash_after_exact_readback":
            errors.append("sensitive_personal_music_must_use_designated_flash")
        if case.get("exactReadbackPassed") is not True:
            errors.append("sensitive_personal_music_exact_readback_required")
    if asset_class == "solvys_code":
        if custody_target != "remote_git_and_pushed_sprint_checkpoint_refs":
            errors.append("solvys_code_must_use_remote_git_and_checkpoint_refs")
        preservation = case.get("preservationExceptions", [])
        if not isinstance(preservation, list) or set(preservation) != CODE_PRESERVATION_EXCEPTIONS:
            errors.append("solvys_code_preservation_exceptions_must_be_bounded")

    if (
        case.get("externalVolumeState") in {"readable", "read_only", "readable_read_only"}
        and actions & EXT_FORBIDDEN_INFERRED_ACTIONS
    ):
        errors.append("readable_or_read_only_ext_does_not_authorize_requested_action")

    if "cloud_backup" in actions:
        if case.get("explicitBoundedAssetSet") is not True:
            errors.append("cloud_backup_requires_explicit_bounded_asset_set")
        if case.get("selectedAssetSetExpandedByImplication") is True:
            errors.append("selected_asset_set_expanded_by_implication")
        if case.get("explicitBoundedAssetSet") is True:
            if case.get("encryptedManifest") is not True:
                errors.append("bounded_cloud_backup_missing_encrypted_manifest")
            if case.get("restoreReadback") is not True:
                errors.append("bounded_cloud_backup_missing_restore_readback")

    if (
        case.get("destructiveActionAuthorized") is True
        and case.get("affectedUniqueStateAtCustodyTarget") is not True
    ):
        errors.append("affected_unique_state_not_at_custody_target")
    if (
        case.get("destructiveActionAuthorized") is not True
        and case.get("backupPrerequisiteCreated") is True
    ):
        errors.append("no_destructive_action_cannot_create_backup_prerequisite")
    return errors


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED:
        path = ROOT / relative
        if not path.is_file():
            errors.append(f"missing: {relative}")

    for relative, phrases in REQUIRED_PHRASES.items():
        path = ROOT / relative
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8")
        for phrase in phrases:
            if phrase not in text:
                errors.append(f"{relative}: missing phrase {phrase!r}")
        if "TODO" in text:
            errors.append(f"{relative}: contains TODO placeholder")

    for name, path in OPERATIONAL_SKILLS.items():
        if not path.is_file():
            errors.append(f"missing operational skill: {name}")
            continue
        text = path.read_text(encoding="utf-8")
        for phrase in OPERATIONAL_REQUIRED:
            if phrase not in text:
                errors.append(f"{name}: missing Refresh phrase {phrase!r}")
        for phrase in OPERATIONAL_CUSTODY_REQUIRED[name]:
            if phrase not in text:
                errors.append(f"{name}: missing custody phrase {phrase!r}")
        if name in {"solvys-brief", "solvys-orchestrate", "solvys-execute"}:
            for field in (
                "Accepted plan revision",
                "Environment ID",
                "Environment label",
                "Repository slug",
                "Repository attachment proof",
                "Base commit",
                "Requested base/ref availability proof",
                "Checkout mode",
                "Checkout proof",
                "Authenticated Git publication route",
                "Task-owned checkpoint ref",
                "Protected zones",
                "Dependencies",
                "Secrets manifest (names only)",
                "Excluded secret names/categories",
                "Purpose-specific authorization gates",
                "Proof gates",
                "Return path",
                "Capacity and resource budget",
                "Closure condition",
            ):
                if field not in text:
                    errors.append(f"{name}: Cloud Pickup missing {field!r}")
        for stale_title in (
            "issue titles become `S{N}-T{N}:",
            'title: "S{SPRINT}-T{N}:',
            'title: "S{SPRINT}-ORCH:',
        ):
            if stale_title in text:
                errors.append(f"{name}: stale non-searchable task title {stale_title!r}")

    prompt_path = SUITE_ROOT.parent.parent / "SOLVYS_AGENT_SYSTEM_PROMPT.md"
    if not prompt_path.is_file():
        errors.append("missing shared prompt: SOLVYS_AGENT_SYSTEM_PROMPT.md")
    else:
        prompt_text = prompt_path.read_text(encoding="utf-8")
        for phrase in (
            "Classify custody before backup planning",
            "readable or read-only external volume does not authorize",
            "exact bounded asset set TP explicitly selects",
        ):
            if phrase not in prompt_text:
                errors.append(f"shared prompt: missing custody phrase {phrase!r}")

    run_point = OPERATIONAL_SKILLS["solvys-run-point"]
    if run_point.is_file():
        run_point_text = run_point.read_text(encoding="utf-8")
        for banned in (
            "Branch format: `v<major>.<minor>.<patch>/",
            "weekly version roll",
            "monthly version roll",
            "version-namespaced daily branches",
        ):
            if banned.lower() in run_point_text.lower():
                errors.append(f"solvys-run-point: stale branch convention {banned!r}")

    policy_path = ROOT / "ops/storage-policy.json"
    registry_path = ROOT / "ops/tranche-registry.json"
    try:
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
        rules = policy["sanitationRules"]
        if policy["approvedActions"]["manualWorktreeDeletion"] is not False:
            errors.append("storage policy: manual worktree deletion must stay disabled")
        if policy["approvedActions"]["codexHomeMigration"] is not False:
            errors.append("storage policy: CODEX_HOME migration must stay disabled")
        execution_lanes = policy["executionLanes"]
        if (
            execution_lanes["defaultImplementation"]
            != "repository_backed_codex_cloud_task_owned_worktree"
            or execution_lanes["nonFlagshipImplementation"]
            != "repository_backed_codex_cloud"
        ):
            errors.append("storage policy: repository implementation Cloud lane drifted")
        if policy.get("cloudImplementationContract") != {
            "repositoryWorkTarget": "repository_backed_codex_cloud",
            "requiredPickupFieldCount": 32,
            "requiredReturnReceiptFieldCount": 20,
            "projectlessChatgptWorkAllowedFor": [
                "non_repository_research",
                "analysis",
                "standalone_artifacts",
            ],
            "repositoryWorkSignals": [
                "changes_repository_files",
                "creates_commits_refs_or_pull_requests",
                "runs_source_ci",
                "promises_worktree",
            ],
            "requiredProofs": [
                "real_opaque_environment_id_and_separate_label",
                "repository_slug_attachment_and_managed_workspace",
                "requested_base_ref_exact_head_and_clean_start",
                "detached_checkout",
                "authenticated_git_publication_route",
                "matching_pickup_return_branch_task_and_checkpoint",
            ],
            "connectorReadWithoutCheckoutOrPublicationTransport": "preflight_only",
            "forbiddenEnvironmentIdShapes": [
                "path", "workspace:", "/workspace/scratch/", "codex-cloud-env-*",
            ],
            "pickupReturnIdentityMustMatch": True,
            "mainImplementationLaneAllowed": False,
        }:
            errors.append("storage policy: repository-backed Codex Cloud contract drifted")
        branch_contract = policy["branchAndRefContract"]
        if branch_contract["mainProtected"] is not True:
            errors.append("storage policy: main must stay protected")
        if branch_contract["dailyPrMergeMethod"] != "squash":
            errors.append("storage policy: daily PR must squash at the boundary")
        if branch_contract["forceRewriteAcceptedHistory"] is not False:
            errors.append("storage policy: accepted history must not be force rewritten")
        if (
            branch_contract["taskCheckpointRefPattern"]
            != r"^refs/sprints/S\d{3,}(?:/T[1-9]\d*)?/P\d+$"
        ):
            errors.append("storage policy: root/track checkpoint ref pattern drifted")
        if branch_contract.get("dateBranchLifecycle") != {
            "routineLowRiskAutomatic": True,
            "requiredReceiptOrder": ROUTINE_DATE_BRANCH_RECEIPTS,
            "deleteOnlyAfterAllPriorReceipts": True,
            "humanRiskStopsBefore": [
                "daily_pr_squash_merge",
                "deployment",
                "date_branch_deletion",
            ],
        }:
            errors.append("storage policy: date-branch lifecycle drifted")
        backup = policy["backupContract"]
        if backup != {
            "custodyClassificationRequiredBeforeBackup": True,
            "soundLibrariesDefaultCustody": "ext_in_place",
            "sensitivePersonalMusicDefaultCustody": (
                "designated_flash_after_exact_readback"
            ),
            "solvysCodeDefaultCustody": (
                "remote_git_and_pushed_sprint_checkpoint_refs"
            ),
            "boundedCodePreservationExceptions": [
                "unpushed_commits",
                "dirty_overlays",
                "unique_non_git_artifacts",
            ],
            "readableExternalVolumeTriggersBulkBackup": False,
            "readOnlyExternalVolumeAuthorizesRepairEraseOrMigration": False,
            "cloudBackupRequiresExplicitBoundedAssetSet": True,
            "selectedAssetSetMayExpandByImplication": False,
            "encryptedLocalManifestRequired": True,
            "encryptedCloudManifestRequired": True,
            "restoreReadbackRequired": True,
            "uploadedIsComplete": False,
            "affectedUniqueStateAtCustodyTargetBeforeAuthorizedDestruction": True,
            "noDestructiveActionCreatesBackupPrerequisite": False,
            "restoreDrillTarget": "bounded_non_production",
        }:
            errors.append("storage policy: bounded custody contract drifted")
        secrets = policy["secretManifest"]
        if secrets["valuesAllowed"] is not False or secrets["namesOnly"] is not True:
            errors.append("storage policy: secret manifests must contain names only")
        if (
            secrets.get("encryptedCloudEnvironmentSecrets")
            != "exact_task_required_setup_values_only"
            or secrets.get("setupPhaseOnly") is not True
            or secrets.get("runtimeMaterializationRequiresReviewedSetupScript") is not True
            or secrets.get("runtimeFileMustBeLeastPrivilege") is not True
            or secrets.get("publicBuildConfiguration") != "environment_variables"
            or secrets.get("recordExcludedNamesOrCategories") is not True
            or secrets.get("purposeSpecificAuthorizationRequired") is not True
            or set(secrets.get("bulkCopyForbiddenCategories", []))
            != FORBIDDEN_BULK_SECRET_CATEGORIES
        ):
            errors.append("storage policy: Cloud secret handling contract drifted")
        required_budgets = set(policy["resourceBudgets"]["requiredCategories"])
        if required_budgets != {
            "tasks",
            "worktrees",
            "checkpoints",
            "artifacts",
            "transcripts",
            "dmgs",
            "processes",
            "ram",
        }:
            errors.append("storage policy: resource budget categories drifted")
        risk = policy["riskContract"]
        routine_backend = risk["routineAcceptedBackend"]
        if routine_backend != {
            "squashThroughDatePullRequest": True,
            "deployWhenRequiredCiIsGreen": True,
            "postcheckRequired": True,
            "cleanMainProofRequired": True,
            "automaticDateBranchDeletionAfterAllReceipts": True,
            "separateHumanMergeDeployOrDeletionAuthorization": False,
        }:
            errors.append("storage policy: autonomous routine backend lifecycle drifted")
        if (
            set(risk["humanVerificationBeforeMergeDeployOrDateBranchDeletion"])
            != HUMAN_RISK_CATEGORIES
        ):
            errors.append("storage policy: human-risk gate categories drifted")
        if policy["resourceBudgets"].get("defaultCeilings") != DEFAULT_RESOURCE_CEILINGS:
            errors.append("storage policy: enforceable default resource ceilings drifted")
        required_override_fields = {
            "reason",
            "owner",
            "approver",
            "startsAt",
            "endsAt",
            "replacementCeiling",
            "cleanupReturnCondition",
        }
        if set(policy["resourceBudgets"].get("overrideRequiredFields", [])) != required_override_fields:
            errors.append("storage policy: sprint override receipt fields drifted")
        required_breach_actions = {
            "stop_new_launches",
            "inventory_exact_task_owned_resources",
            "gracefully_stop_task_owned_processes_oldest_first",
            "verify_pid_exit",
            "archive_finished_tasks_and_transcripts_through_owner",
            "retain_current_and_rollback_checkpoints",
            "mark_superseded_refs_for_control_plane_retention",
            "delete_verified_ordinary_dmgs_immediately_and_record_absence",
            "use_recoverable_cleanup_for_reproducible_artifacts",
            "resume_only_below_ceiling_or_with_active_recorded_override",
        }
        if set(policy["resourceBudgets"].get("breachActions", [])) != required_breach_actions:
            errors.append("storage policy: resource breach stop/cleanup behavior drifted")
        if policy["resourceBudgets"].get("neverKillUnrelatedOrSystemProcesses") is not True:
            errors.append("storage policy: unrelated/system processes must stay protected")
        if policy["resourceBudgets"].get("verifiedDmgContract") != {
            "ordinaryAction": "delete_immediately_after_verification",
            "ordinaryRequiredReceipts": ["deletion_receipt", "absence_receipt"],
            "retainedReleaseException": {
                "classification": "retained_release_artifact",
                "requiredFields": RETAINED_RELEASE_DMG_FIELDS,
            },
        }:
            errors.append("storage policy: verified DMG lifecycle drifted")
        for name in ("registeredTaskTemp", "externalQuarantine", "transcriptArchive"):
            if name not in rules:
                errors.append(f"storage policy: missing sanitation rule {name!r}")
        if not policy.get("hardDenyRoots"):
            errors.append("storage policy: hardDenyRoots must not be empty")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"storage policy: invalid machine-readable boundary: {exc}")

    try:
        registry = json.loads(registry_path.read_text(encoding="utf-8"))
        for entry in registry["entries"]:
            for key in (
                "id",
                "repository",
                "executionLane",
                "workspacePathOrCloudBranch",
                "owner",
                "closureState",
                "sanitationPaths",
            ):
                if key not in entry:
                    errors.append(f"tranche registry: {entry.get('id', '<unknown>')} missing {key!r}")
        s166 = next((entry for entry in registry["entries"] if entry.get("id") == "S166"), None)
        if not s166:
            errors.append("tranche registry: missing S166 Cloud tranche")
        else:
            if s166.get("title") != "S166 - Solvys Refresh System":
                errors.append("tranche registry: S166 searchable identity drifted")
            if s166.get("repository") != "solvys-technologies/solvys-skills":
                errors.append("tranche registry: S166 repository slug drifted")
            if s166.get("executionLane") != "repository-backed-codex-cloud":
                errors.append("tranche registry: S166 Cloud environment lane drifted")
            exact_identity = {
                "environmentId": "6a6acebaf9a48191a587ae19c6cafd52",
                "environmentLabel": "solvys-technologies/solvys-skills",
                "repository": "solvys-technologies/solvys-skills",
                "workspacePathOrCloudBranch": "/workspace/solvys-skills",
                "requestedBase": "5cd99fad0f044093d62da4cbd7ae5c2460425bb9",
                "exactCheckedOutHead": "5cd99fad0f044093d62da4cbd7ae5c2460425bb9",
                "cleanStartProof": "status=clean",
                "checkoutMode": "detached",
                "returnBranch": "2026-07-29",
                "taskIdentity": "S166/T1",
            }
            for key, expected_value in exact_identity.items():
                if s166.get(key) != expected_value:
                    errors.append(f"tranche registry: S166 truthful identity drifted for {key}")
            for key in (
                "environmentType",
                "environmentId",
                "environmentLabel",
                "repositoryAttachmentProof",
                "requestedBaseRefAvailabilityProof",
                "checkoutMode",
                "checkoutProof",
                "authenticatedGitPublicationRoute",
                "excludedSecretNamesOrCategories",
                "purposeSpecificAuthorizationGates",
            ):
                if key not in s166:
                    errors.append(f"tranche registry: S166 missing Cloud identity {key!r}")
            if s166.get("branch") != "2026-07-29":
                errors.append("tranche registry: S166 date branch drifted")
            if s166.get("checkpointRef") != "refs/sprints/S166/T1/P1":
                errors.append("tranche registry: S166 checkpoint ref drifted")
            if s166.get("secretsManifestNames") != []:
                errors.append("tranche registry: S166 secret manifest must remain name-only/empty")
            s166_budgets = s166.get("resourceBudgets", {})
            for key in (
                "worktreesPerTrack",
                "worktreesPerSprint",
                "checkpointsPerTrack",
                "checkpointsPerSprint",
                "artifactBytesPerTask",
                "artifactBytesPerSprint",
                "activeTranscriptsPerTask",
                "taskOwnedProcessesPerTask",
                "peakRamPercent",
                "sustainedRamPercent",
                "sustainedRamMinutes",
                "dmgLifetimeHoursAfterVerification",
                "retainedReleaseDmgException",
                "override",
            ):
                if key not in s166_budgets:
                    errors.append(f"tranche registry: S166 missing resource budget {key!r}")
            if s166_budgets.get("dmgLifetimeHoursAfterVerification") != 0:
                errors.append("tranche registry: S166 verified DMG lifetime must be zero")
            if s166_budgets.get("retainedReleaseDmgException") is not None:
                errors.append("tranche registry: S166 has no retained release DMG exception")
        schema = registry.get("entrySchema", {})
        for key in (
            "environmentType",
            "environmentId",
            "environmentLabel",
            "repositoryAttachmentProof",
            "requestedBaseRefAvailabilityProof",
            "checkoutMode",
            "checkoutProof",
            "authenticatedGitPublicationRoute",
            "excludedSecretNamesOrCategories",
            "purposeSpecificAuthorizationGates",
        ):
            if key not in schema:
                errors.append(f"tranche registry: entry schema missing {key!r}")
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"tranche registry: invalid machine-readable boundary: {exc}")

    fixture_path = ROOT / "scripts/fixtures/refresh-contract.json"
    try:
        fixtures = json.loads(fixture_path.read_text(encoding="utf-8"))
        title_re = re.compile(r"^S\d{3,} - [A-Za-z0-9][A-Za-z0-9 .()/_-]*$")
        date_branch_re = re.compile(r"^\d{4}-\d{2}-\d{2}$")
        checkpoint_re = re.compile(
            r"^refs/sprints/S\d{3,}(?:/T[1-9]\d*)?/P\d+$"
        )
        for title in fixtures["valid"]["taskTitles"]:
            if not title_re.fullmatch(title):
                errors.append(f"refresh fixture: valid title rejected {title!r}")
        for title in fixtures["invalid"]["taskTitles"]:
            if title_re.fullmatch(title):
                errors.append(f"refresh fixture: invalid title accepted {title!r}")
        for branch in fixtures["valid"]["dateBranches"]:
            try:
                date.fromisoformat(branch)
            except ValueError:
                errors.append(f"refresh fixture: valid date branch rejected {branch!r}")
                continue
            if not date_branch_re.fullmatch(branch):
                errors.append(f"refresh fixture: valid date branch rejected {branch!r}")
        for branch in fixtures["invalid"]["branches"]:
            try:
                date.fromisoformat(branch)
                is_date = True
            except ValueError:
                is_date = False
            if date_branch_re.fullmatch(branch) and is_date:
                errors.append(f"refresh fixture: invalid branch accepted {branch!r}")
        for ref in fixtures["valid"]["checkpointRefs"]:
            if not checkpoint_re.fullmatch(ref):
                errors.append(f"refresh fixture: valid checkpoint rejected {ref!r}")
        for ref in fixtures["invalid"]["checkpointRefs"]:
            if checkpoint_re.fullmatch(ref):
                errors.append(f"refresh fixture: invalid checkpoint accepted {ref!r}")
        valid_refs = fixtures["valid"]["checkpointRefs"]
        if not any("/T" not in ref for ref in valid_refs):
            errors.append("refresh fixture: missing valid root preservation ref")
        if not any("/T" in ref for ref in valid_refs):
            errors.append("refresh fixture: missing valid tranche/track ref")
        routing = {item["shape"]: item["skill"] for item in fixtures["routing"]}
        if routing.get("bounded-single-owner") != "solvys-brief":
            errors.append("refresh fixture: single-owner route must select solvys-brief")
        for shape in ("multi-track", "parallel", "long-running", "super-sprint"):
            if routing.get(shape) != "solvys-orchestrate":
                errors.append(f"refresh fixture: {shape} must select solvys-orchestrate")
        risky = set(fixtures["blacksmith"]["ineligible"])
        required_risky = {
            "migration",
            "destructive-write",
            "authentication",
            "authorization",
            "billing",
            "secret-or-provider-credential",
            "infrastructure",
            "broad-routing",
            "security-control",
            "irreversible-integration",
            "release-or-install",
            "protected-surface",
            "other-damaging-or-high-risk-boundary",
        }
        if risky != required_risky:
            errors.append("refresh fixture: Blacksmith protected/risky surfaces drifted")

        dmg = fixtures["dmgLifecycle"]
        expected_dmg_default_ids = {
            "zero-hours-after-verification",
            "nonzero-default-rejected",
        }
        if {case["id"] for case in dmg["defaultLifetimeCases"]} != expected_dmg_default_ids:
            errors.append("refresh fixture: DMG default lifetime cases drifted")
        expected_dmg_artifact_ids = {
            "ordinary-verified-dmg-deleted-with-proof",
            "explicit-retained-release-artifact",
            "ordinary-verified-dmg-not-deleted",
            "ordinary-deletion-without-proof",
            "retained-release-exception-missing-scope-and-receipt",
        }
        if {case["id"] for case in dmg["artifactCases"]} != expected_dmg_artifact_ids:
            errors.append("refresh fixture: DMG artifact lifecycle cases drifted")
        for case in dmg["defaultLifetimeCases"] + dmg["artifactCases"]:
            actual = validate_dmg_lifecycle(case)
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: DMG case {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )

        lifecycle = fixtures["dateBranchLifecycle"]
        required_lifecycle_receipts = lifecycle["requiredRoutineReceiptOrder"]
        if required_lifecycle_receipts != ROUTINE_DATE_BRANCH_RECEIPTS:
            errors.append("refresh fixture: routine date-branch receipt order drifted")
        if {case["id"] for case in lifecycle["validCases"]} != {
            "routine-low-risk-full-autonomous-lifecycle",
            "human-risk-after-verification",
        }:
            errors.append("refresh fixture: valid date-branch lifecycle cases drifted")
        if {case["id"] for case in lifecycle["invalidCases"]} != {
            "routine-date-branch-deletion-before-postcheck-and-clean-main",
        }:
            errors.append("refresh fixture: invalid date-branch lifecycle cases drifted")
        for case in lifecycle["validCases"] + lifecycle["invalidCases"]:
            actual = validate_date_branch_lifecycle(
                case,
                required_lifecycle_receipts,
                HUMAN_RISK_CATEGORIES,
            )
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: date-branch case {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )
        risk_matrix = lifecycle["humanRiskMatrix"]
        if set(risk_matrix["categories"]) != HUMAN_RISK_CATEGORIES:
            errors.append("refresh fixture: human-risk lifecycle matrix drifted")
        expected_risk_stages = {
            "daily_pr_squash_merge",
            "deployment",
            "date_branch_deletion",
        }
        if set(risk_matrix["attemptedStages"]) != expected_risk_stages:
            errors.append("refresh fixture: human-risk stop stages drifted")
        for category in risk_matrix["categories"]:
            for stage in risk_matrix["attemptedStages"]:
                case = {
                    "riskCategory": category,
                    "attemptedStage": stage,
                }
                actual = validate_date_branch_lifecycle(
                    case,
                    required_lifecycle_receipts,
                    HUMAN_RISK_CATEGORIES,
                )
                expected = [
                    f"human_verification_required_before:{stage}:{category}"
                ]
                if actual != expected:
                    errors.append(
                        f"refresh fixture: human-risk case {category!r}/{stage!r} "
                        f"expected {expected!r}, got {actual!r}"
                    )

        custody = fixtures["custodyContract"]
        if set(custody["requiredCodePreservationExceptions"]) != CODE_PRESERVATION_EXCEPTIONS:
            errors.append("refresh fixture: bounded code preservation exceptions drifted")
        if {case["id"] for case in custody["validCases"]} != {
            "sound-libraries-remain-on-ext",
            "selected-sensitive-music-on-designated-flash",
            "solvys-code-uses-git-and-bounded-exceptions",
            "explicit-bounded-cloud-backup-with-restore-proof",
            "authorized-destruction-after-affected-state-custody",
            "no-destruction-does-not-manufacture-backup-prerequisite",
        }:
            errors.append("refresh fixture: valid custody case inventory drifted")
        if {case["id"] for case in custody["invalidCases"]} != {
            "readable-read-only-ext-cannot-authorize-bulk-or-destructive-actions",
            "unspecified-cloud-asset-set-is-rejected",
            "selected-cloud-asset-set-cannot-expand-by-implication",
            "bounded-cloud-backup-needs-manifest-and-readback",
            "authorized-destruction-needs-affected-state-custody",
            "no-destruction-cannot-create-backup-prerequisite",
        }:
            errors.append("refresh fixture: invalid custody case inventory drifted")
        for case in custody["validCases"] + custody["invalidCases"]:
            actual = validate_custody_case(case)
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: custody case {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )

        dispatch = fixtures["implementThisPlan"]
        required_pickup_fields = dispatch["requiredCloudPickupFields"]
        required_return_fields = dispatch["requiredCloudReturnReceiptFields"]
        expected_pickup_fields = {
            "Sprint identity",
            "Accepted plan revision",
            "Environment type",
            "Environment ID",
            "Environment label",
            "Repository slug",
            "Managed workspace path",
            "Repository attachment proof",
            "Base commit",
            "Requested base/ref",
            "Exact checked-out HEAD",
            "Clean-start proof",
            "Requested base/ref availability proof",
            "Date integration branch",
            "Task-owned checkpoint ref",
            "Checkout mode",
            "Worktree mode",
            "Checkout proof",
            "Authenticated Git publication route",
            "Owner",
            "Protected zones",
            "Dependencies",
            "Secrets manifest (names only)",
            "Excluded secret names/categories",
            "Purpose-specific authorization gates",
            "Proof gates",
            "Return path",
            "Capacity and resource budget",
            "Closure condition",
            "Implementation lane",
            "Return branch",
            "Task identity",
        }
        if set(required_pickup_fields) != expected_pickup_fields:
            errors.append("refresh fixture: complete Cloud Pickup field contract drifted")
        expected_return_fields = {
            "Environment type",
            "Environment ID",
            "Environment label",
            "Repository slug",
            "Managed workspace path",
            "Repository attachment proof",
            "Base commit",
            "Requested base/ref",
            "Exact checked-out HEAD",
            "Clean-start proof",
            "Requested base/ref availability proof",
            "Checkout mode",
            "Checkout proof",
            "Authenticated Git publication route",
            "Secrets manifest (names only)",
            "Excluded secret names/categories",
            "Purpose-specific authorization gates",
            "Return branch",
            "Task identity",
            "Task-owned checkpoint ref",
        }
        if set(required_return_fields) != expected_return_fields:
            errors.append("refresh fixture: Cloud return receipt field contract drifted")
        if (
            dispatch["requiredCloudPickupFieldCount"] != len(required_pickup_fields)
            or dispatch["requiredCloudPickupFieldCount"] != 32
        ):
            errors.append("refresh fixture: Cloud Pickup numeric field count drifted")
        if (
            dispatch["requiredCloudReturnReceiptFieldCount"] != len(required_return_fields)
            or dispatch["requiredCloudReturnReceiptFieldCount"] != 20
        ):
            errors.append("refresh fixture: Cloud return receipt numeric field count drifted")
        if set(dispatch["repositoryWorkSignals"]) != {
            "changes_repository_files",
            "creates_commits_refs_or_pull_requests",
            "runs_source_ci",
            "promises_worktree",
        }:
            errors.append("refresh fixture: repository-work signal inventory drifted")
        invalid_ids = {case["id"] for case in dispatch["invalidDispatches"]}
        if invalid_ids != {
            "originating-planning-task-cannot-implement",
            "local-implementation-target-rejected",
            "cloud-recommendation-is-not-dispatch",
            "accepted-plan-missing-cloud-pickup",
            "accepted-plan-incomplete-cloud-pickup",
            "pickup-missing-environment-and-git-identity",
            "s162-projectless-connector-read-only-cannot-implement",
            "repository-dispatch-missing-return-receipt",
            "s166-projectless-false-registry-shape",
            "synthetic-cloud-environment-id",
            "mismatched-repository-label-workspace",
            "mismatched-base-and-head",
            "mismatched-checkpoint-publication-return",
            "main-named-as-implementation-lane",
            "dirty-cloud-pickup",
        }:
            errors.append("refresh fixture: dispatch negative-case inventory drifted")
        if {case["id"] for case in dispatch["validDispatches"]} != {
            "repository-backed-codex-cloud-with-complete-pickup",
            "projectless-chatgpt-work-nonrepository-analysis",
        }:
            errors.append("refresh fixture: valid Cloud target inventory drifted")
        for case in dispatch["validDispatches"]:
            actual = validate_implement_dispatch(
                case,
                required_pickup_fields,
                required_return_fields,
                dispatch["pickupTemplates"],
                dispatch["returnReceiptTemplates"],
            )
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: valid dispatch {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )
        for case in dispatch["invalidDispatches"]:
            actual = validate_implement_dispatch(
                case,
                required_pickup_fields,
                required_return_fields,
                dispatch["pickupTemplates"],
                dispatch["returnReceiptTemplates"],
            )
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: invalid dispatch {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )

        secret_fixtures = fixtures["cloudSecretHandling"]
        if secret_fixtures["requiredExcludedCategoryCount"] != 6:
            errors.append("refresh fixture: excluded secret category count drifted")
        if (
            set(secret_fixtures["requiredExcludedCategories"])
            != FORBIDDEN_BULK_SECRET_CATEGORIES
        ):
            errors.append("refresh fixture: forbidden bulk secret categories drifted")
        if {case["id"] for case in secret_fixtures["validCases"]} != {
            "name-only-setup-secret-with-public-env-config",
            "reviewed-least-privilege-runtime-file",
        }:
            errors.append("refresh fixture: valid Cloud secret cases drifted")
        if {case["id"] for case in secret_fixtures["invalidCases"]} != {
            "secret-value-in-plan-or-receipt",
            "bulk-copy-protected-credentials",
            "runtime-secret-without-reviewed-setup-script",
        }:
            errors.append("refresh fixture: invalid Cloud secret cases drifted")
        for case in secret_fixtures["validCases"] + secret_fixtures["invalidCases"]:
            actual = validate_cloud_secret_case(
                case, FORBIDDEN_BULK_SECRET_CATEGORIES
            )
            expected = case["expectedErrors"]
            if actual != expected:
                errors.append(
                    f"refresh fixture: Cloud secret case {case['id']!r} "
                    f"expected {expected!r}, got {actual!r}"
                )

        binding_paths = [
            ROOT / "SKILL.md",
            ROOT / "references/refresh-system.md",
            ROOT / "references/storage-and-execution-lanes.md",
            ROOT / "ops/storage-policy.json",
            ROOT / "ops/tranche-registry.json",
            OPERATIONAL_SKILLS["solvys-brief"],
            OPERATIONAL_SKILLS["solvys-orchestrate"],
            OPERATIONAL_SKILLS["solvys-execute"],
            OPERATIONAL_SKILLS["solvys-run-point"],
            SUITE_ROOT.parent.parent / "SOLVYS_AGENT_SYSTEM_PROMPT.md",
        ]
        stale_rules = (
            "deployment remains separately human-authorized",
            "Merge, deploy, and date-branch deletion remain human-authorized",
            "checkpoint custody uses `refs/sprints/S###/P#`",
            "Date-branch deletion remains human-authorized",
            "maximum lifetime 24 hours after verification",
            "for at most 24\nhours after verification",
            '"dmgLifetimeHoursAfterVerification": 24',
            '"deleteDateBranchRequiresAuthorization"',
            '"humanVerificationBeforeMergeOrDeploy"',
            '"separateHumanMergeOrDeployAuthorization"',
            '"defaultImplementation": "cloud_task_owned_worktree"',
            '"nonFlagshipImplementation": "cloud"',
            "implementation_target_is_not_cloud_worktree",
            "cloud-worktree-dispatched",
            "Backups use encrypted local-plus-cloud manifests.",
            "Maintain encrypted local-plus-cloud backup manifests",
            "Before destructive reconstruction, personal/unique-state readback",
            "Before destructive reconstruction, prove personal and unique-state readback",
            '"personalUniqueStateReadbackBeforeDestructiveReconstruction"',
        )
        for path in binding_paths:
            text = path.read_text(encoding="utf-8")
            for stale_rule in stale_rules:
                if stale_rule in text:
                    errors.append(
                        f"{path.relative_to(SUITE_ROOT.parent.parent)}: "
                        f"contains stale Refresh rule {stale_rule!r}"
                    )
    except (OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
        errors.append(f"refresh fixtures: invalid machine-readable boundary: {exc}")

    if errors:
        print("Solvys CAO canon validation: FAIL")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Solvys CAO canon validation: PASS ({len(REQUIRED)} required files)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
