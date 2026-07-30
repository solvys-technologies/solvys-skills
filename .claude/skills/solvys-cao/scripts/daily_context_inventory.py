#!/usr/bin/env python3
"""Produce a read-only JSON inventory for the Solvys daily context sync."""

from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import subprocess
from typing import Any


DEFAULT_ROOT = Path("/Users/tifos/Documents/Codebases")
DEFAULT_REQUESTED_WORKSPACES = (
    Path("/Users/tifos/Desktop/SSFitness"),
    Path("/Users/tifos/Desktop/HRight"),
    Path("/Users/tifos/Documents/Fintheon"),
    Path(
        "/Users/tifos/Documents/Codex/2026-06-18/"
        "https-jobs-ashbyhq-com-tradeify-66abfad0"
    ),
)
AUTOMATIONS_ROOT = Path("/Users/tifos/.codex/automations")
INSTALLED_SKILLS = Path("/Users/tifos/.codex/skills")
CANON_SKILLS = DEFAULT_ROOT / "solvys-skills/.claude/skills"


def run(cwd: Path, *args: str) -> str:
    result = subprocess.run(
        args,
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return result.stdout.strip()


def discover_repos(root: Path) -> list[Path]:
    repos: list[Path] = []
    if (root / ".git").exists():
        return [root]
    if not root.is_dir():
        return repos
    for child in sorted(root.iterdir()):
        if child.is_dir() and (child / ".git").exists():
            repos.append(child)
    return repos


def repo_record(repo: Path, since: str) -> dict[str, Any]:
    commits = run(
        repo,
        "git",
        "log",
        f"--since={since}",
        "--date=iso-strict",
        "--format=%H%x09%ad%x09%s",
        "--max-count=100",
    ).splitlines()
    return {
        "path": str(repo),
        "branch": run(repo, "git", "branch", "--show-current"),
        "head": run(repo, "git", "rev-parse", "HEAD"),
        "status": run(repo, "git", "status", "--short").splitlines(),
        "commits": commits,
    }


def digest_tree(path: Path) -> str | None:
    if not path.is_dir():
        return None
    digest = hashlib.sha256()
    for file in sorted(p for p in path.rglob("*") if p.is_file()):
        if "__pycache__" in file.parts or file.name == ".DS_Store":
            continue
        digest.update(str(file.relative_to(path)).encode())
        digest.update(file.read_bytes())
    return digest.hexdigest()


def skill_drift() -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    if not CANON_SKILLS.is_dir():
        return records
    for source in sorted(CANON_SKILLS.glob("solvys-*")):
        if not source.is_dir():
            continue
        installed = INSTALLED_SKILLS / source.name
        source_digest = digest_tree(source)
        installed_digest = digest_tree(installed)
        records.append(
            {
                "skill": source.name,
                "source": source_digest,
                "installed": installed_digest,
                "state": (
                    "missing"
                    if installed_digest is None
                    else "in_sync"
                    if installed.is_symlink() and installed.resolve() == source.resolve()
                    else "same_content"
                    if source_digest == installed_digest
                    else "drift"
                ),
            }
        )
    return records


def automation_records() -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    if not AUTOMATIONS_ROOT.is_dir():
        return records
    for folder in sorted(p for p in AUTOMATIONS_ROOT.iterdir() if p.is_dir()):
        config = folder / "automation.toml"
        records.append(
            {
                "id": folder.name,
                "definition": str(config) if config.is_file() else None,
                "memory_files": [str(p) for p in sorted(folder.glob("*.md"))],
            }
        )
    return records


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", action="append", default=[])
    parser.add_argument("--repo", action="append", default=[])
    parser.add_argument("--since", default="28 hours ago")
    args = parser.parse_args()

    roots = [Path(value).expanduser() for value in args.root] or [DEFAULT_ROOT]
    repos = {repo.resolve() for root in roots for repo in discover_repos(root)}
    non_git_workspaces: list[str] = []
    missing_workspaces: list[str] = []
    requested_workspaces = [Path(value).expanduser() for value in args.repo]
    if not args.root and not args.repo:
        requested_workspaces.extend(DEFAULT_REQUESTED_WORKSPACES)
    for requested_path in requested_workspaces:
        requested = requested_path.resolve()
        if not requested.exists():
            missing_workspaces.append(str(requested))
            continue
        discovered = discover_repos(requested)
        if discovered:
            repos.update(repo.resolve() for repo in discovered)
        else:
            non_git_workspaces.append(str(requested))

    automations = automation_records()

    payload = {
        "since": args.since,
        "repos": [repo_record(repo, args.since) for repo in sorted(repos) if repo.is_dir()],
        "requested_non_git_workspaces": non_git_workspaces,
        "requested_missing_workspaces": missing_workspaces,
        "automations": automations,
        "automation_summary": {
            "directories": len(automations),
            "definitions": sum(1 for record in automations if record["definition"]),
            "memory_only": [
                record["id"] for record in automations if not record["definition"]
            ],
        },
        "solvys_skill_drift": skill_drift(),
    }
    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
