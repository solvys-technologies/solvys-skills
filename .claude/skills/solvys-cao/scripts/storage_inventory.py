#!/usr/bin/env python3
"""Produce a bounded, read-only storage inventory for the Terra daily task."""

from __future__ import annotations

from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import shutil
import subprocess


CODEX_HOME = Path(os.environ.get("CODEX_HOME", Path.home() / ".codex"))
CODEX_CONFIG = CODEX_HOME / "config.toml"
EXTERNAL = Path("/Volumes/Ext.")
MANAGED_WORKTREE_ROOT = EXTERNAL / "CodexWorktrees" / "managed"
FINTHEON_RUNTIME = (
    Path.home() / "Library" / "Application Support" / "Fintheon" / "runtime"
)
FINTHEON_LOGS = Path.home() / "Library" / "Logs" / "Fintheon"
CODEBASES_COMPAT = Path.home() / "Documents" / "Codebases"


def disk(
    path: Path, access_path: Path | None = None
) -> dict[str, int | float | str | bool]:
    if not path.exists():
        return {"path": str(path), "mounted": False}
    usage = shutil.disk_usage(path)
    probe = access_path or path
    return {
        "path": str(path),
        "accessProbe": str(probe),
        "mounted": True,
        "totalBytes": usage.total,
        "usedBytes": usage.used,
        "freeBytes": usage.free,
        "freePercent": round((usage.free / usage.total) * 100, 2),
        "readable": os.access(probe, os.R_OK),
        "writable": os.access(probe, os.W_OK),
    }


def file_tree_summary(path: Path, suffix: str | None = None) -> dict[str, int | str]:
    files = 0
    bytes_total = 0
    if not path.exists():
        return {"path": str(path), "files": 0, "bytes": 0}
    for root, _, names in os.walk(path):
        for name in names:
            if suffix and not name.endswith(suffix):
                continue
            candidate = Path(root) / name
            try:
                stat = candidate.stat()
            except OSError:
                continue
            if candidate.is_file():
                files += 1
                bytes_total += stat.st_size
    return {"path": str(path), "files": files, "bytes": bytes_total}


def bounded_du(
    path: Path, timeout_seconds: int = 12
) -> dict[str, int | str | bool | None]:
    if not path.exists():
        return {"path": str(path), "bytes": 0, "timedOut": False}
    try:
        result = subprocess.run(
            ["du", "-sk", str(path)],
            check=True,
            capture_output=True,
            text=True,
            timeout=timeout_seconds,
        )
        kilobytes = int(result.stdout.split()[0])
        return {"path": str(path), "bytes": kilobytes * 1024, "timedOut": False}
    except (OSError, ValueError, subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return {"path": str(path), "bytes": None, "timedOut": True}


def runtime_summary(path: Path) -> dict[str, int | str | bool | None]:
    manifest = path / ".solvys-runtime-manifest.json"
    if manifest.is_file():
        try:
            payload = json.loads(manifest.read_text(encoding="utf-8"))
            return {
                "path": str(path),
                "bytes": payload.get("deployedBytes"),
                "timedOut": False,
                "manifest": str(manifest),
                "sourceCommit": payload.get("sourceCommit"),
                "sourceBranch": payload.get("sourceBranch"),
                "deployedAt": payload.get("deployedAt"),
            }
        except (OSError, ValueError, TypeError):
            pass
    return bounded_du(path)


def codex_worktree_root_setting() -> dict[str, str | bool | None]:
    result: dict[str, str | bool | None] = {
        "config": str(CODEX_CONFIG),
        "key": "git-worktree-root",
        "value": None,
        "expected": str(MANAGED_WORKTREE_ROOT),
        "matchesExpected": False,
    }
    try:
        config_text = CODEX_CONFIG.read_text(encoding="utf-8")
    except OSError:
        return result
    match = re.search(
        r'^git-worktree-root\s*=\s*"([^"\n]+)"\s*(?:#.*)?$',
        config_text,
        flags=re.MULTILINE,
    )
    if match is not None:
        value = match.group(1)
        result["value"] = value
        result["matchesExpected"] = value == str(MANAGED_WORKTREE_ROOT)
    return result


def main() -> None:
    payload = {
        "measuredAt": datetime.now(timezone.utc).isoformat(),
        "internal": disk(Path("/"), Path.home()),
        "external": disk(EXTERNAL),
        "codex": {
            "sessions": file_tree_summary(CODEX_HOME / "sessions", ".jsonl"),
            "archivedSessions": file_tree_summary(
                CODEX_HOME / "archived_sessions", ".jsonl"
            ),
            "managedWorktrees": bounded_du(CODEX_HOME / "worktrees"),
            "generatedImages": bounded_du(CODEX_HOME / "generated_images"),
            "computerUse": bounded_du(CODEX_HOME / "computer-use"),
            "automations": file_tree_summary(CODEX_HOME / "automations", ".toml"),
        },
        "runtimeBundles": {
            "fintheon": runtime_summary(FINTHEON_RUNTIME),
            "fintheonLogs": bounded_du(FINTHEON_LOGS),
        },
        "storageOps": {
            "quarantine": bounded_du(
                EXTERNAL / "SolvysOps" / "storage" / "quarantine"
            ),
            "transcriptArchive": bounded_du(
                EXTERNAL / "SolvysOps" / "storage" / "transcript-archive"
            ),
        },
        "workspaceRoots": {
            "codebases": str(EXTERNAL / "Codebases"),
            "compatibilityCodebases": str(CODEBASES_COMPAT),
            "compatibilityIsSymlink": CODEBASES_COMPAT.is_symlink(),
            "compatibilityResolvesTo": str(CODEBASES_COMPAT.resolve(strict=False)),
            "managedWorktrees": str(MANAGED_WORKTREE_ROOT),
            "managedWorktreeSetting": codex_worktree_root_setting(),
            "explicitWorktrees": str(EXTERNAL / "CodexWorktrees"),
        },
    }
    print(json.dumps(payload, indent=2, sort_keys=True))


if __name__ == "__main__":
    main()
