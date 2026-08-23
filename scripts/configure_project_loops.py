#!/usr/bin/env python3
"""Apply bounded Solvys Factory context to initialized project loops."""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path


BEGIN = "<!-- SOLVYS_FACTORY_LOOP_BEGIN -->"
END = "<!-- SOLVYS_FACTORY_LOOP_END -->"


def replace_block(text: str, block: str) -> str:
    managed = f"{BEGIN}\n{block.rstrip()}\n{END}"
    pattern = re.compile(rf"{re.escape(BEGIN)}.*?{re.escape(END)}", re.DOTALL)
    if pattern.search(text):
        return pattern.sub(managed, text, count=1).rstrip() + "\n"
    return managed + "\n\n" + text.lstrip()


def parse_registry(path: Path) -> tuple[Path, str, list[dict[str, str]]]:
    root: Path | None = None
    report_only_through = "unverified"
    projects: list[dict[str, str]] = []
    current: dict[str, str] | None = None
    in_projects = False
    for raw in path.read_text(encoding="utf-8").splitlines():
        stripped = raw.strip()
        if stripped.startswith("projectRecordsRoot:"):
            root = Path(stripped.split(":", 1)[1].strip())
        if stripped == "projects:":
            in_projects = True
            continue
        if stripped == "rollout:":
            in_projects = False
        if stripped.startswith("reportOnlyThrough:"):
            report_only_through = stripped.split(":", 1)[1].strip()
        if not in_projects:
            continue
        match = re.match(r"- id:\s*(.+)", stripped)
        if match:
            current = {"id": match.group(1).strip()}
            projects.append(current)
            continue
        if current and ":" in stripped:
            key, value = stripped.split(":", 1)
            current[key.strip()] = value.strip()
    if root is None:
        raise ValueError("registry is missing projectRecordsRoot")
    return root, report_only_through, projects


def open_infraction_fingerprints(record: Path) -> list[str]:
    ledger = record / "infraction-ledger.json"
    if not ledger.exists():
        return []
    try:
        entries = json.loads(ledger.read_text(encoding="utf-8")).get("entries", [])
    except (json.JSONDecodeError, OSError):
        return ["invalid-ledger: repair ledger before dispatch"]
    fingerprints = []
    for entry in entries:
        if entry.get("status") != "open":
            continue
        fingerprints.append(
            f"{entry.get('id', 'unknown')}:{entry.get('fingerprint', 'missing')} "
            f"[{entry.get('category', 'uncategorized')}] {entry.get('title', 'untitled')}"
        )
    return fingerprints


def project_block(project: dict[str, str], directive: str, report_only_through: str, fingerprints: list[str]) -> str:
    infraction_text = "none"
    if fingerprints:
        infraction_text = "\n".join(f"  - `{fingerprint}`" for fingerprint in fingerprints)
    return f"""# Solvys Factory loop context

{directive}

- Project: `{project['id']}`
- Manifest: `{project['manifest']}`
- Sprint: `{project.get('sprint', 'unverified')}`
- Development Contract: `{project.get('contract', 'unregistered')}`
- Loop mode: `{project.get('loopMode', 'report-only')}` through `{report_only_through}`
- Open infraction fingerprints:
{infraction_text}

Read the manifest, entrance receipt, current Development Contract, loop state,
`STATE.md`, and latest receipt before work. Inventory installed skills, current repository
truth, CLI tools, the approved browser lane, provider APIs, and approved OSS.
Use durable files for context. Keep prompt injection short.

Use the exact pinned Loop toolchain. Never use `latest`, `main`, or an `npx`
fallback. Retry at most three materially different safe paths. Enter repair
mode after the same normalized failure twice. Open the circuit after the third
identical failure, authority conflict, exhausted budget, or genuine human-only
authentication gate.

Recurring runs stay report-only through the date above. Symphony-ready work
may create a branch, commit, pull request, review comment, and proof. Auto-merge,
deployment, provider mutation, secrets, and destructive actions stay blocked."""


def configure_operational_files(record: Path) -> None:
    (record / "loop-budget.md").write_text(
        """# Loop Budget

- Max tokens per day: 100000
- Maximum distinct safe paths: 3
- Repair threshold: same normalized failure twice
- Circuit threshold: same normalized failure three times
- Global Symphony concurrency: 3
- Per-project Symphony concurrency: 1
- Auto-merge: false
- Recurring loop mode for first seven days: report-only
- Kill switch: open the circuit and stop dispatch when the cap is exhausted
""",
        encoding="utf-8",
    )
    (record / "gate.yaml").write_text(
        """version: 1
denylist:
  - ".env"
  - ".env.*"
  - "**/secrets/**"
  - "**/*_key*"
  - "**/*credentials*"
maxFiles: 25
autoMergeAllowlist: []
""",
        encoding="utf-8",
    )


def configure_agents(path: Path, block: str) -> None:
    path.write_text(
        replace_block(
            "# Project loop instructions\n",
            block
            + "\n\nRun repository validation only in the registered source checkout. "
            "Do not guess package-manager or test commands from this Project Records folder.",
        ),
        encoding="utf-8",
    )


def configure_text(path: Path, block: str) -> None:
    if not path.exists():
        return
    path.write_text(replace_block(path.read_text(encoding="utf-8"), block), encoding="utf-8")


def configure_verifier(path: Path, block: str) -> None:
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    directive_block = block + "\n\n"
    pattern = re.compile(rf"{re.escape(BEGIN)}.*?{re.escape(END)}\n*", re.DOTALL)
    text = pattern.sub("", text)
    marker = 'instructions = """'
    if marker in text:
        text = text.replace(marker, marker + "\n" + BEGIN + "\n" + directive_block + END, 1)
    else:
        text = f'instructions = """\n{BEGIN}\n{directive_block}{END}\nVerify the bounded task.\n"""\n\n' + text
    path.write_text(text.rstrip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--registry", required=True, type=Path)
    parser.add_argument("--canonical", required=True, type=Path)
    args = parser.parse_args()

    root, report_only_through, projects = parse_registry(args.registry.expanduser().resolve())
    directive = args.canonical.expanduser().resolve().read_text(encoding="utf-8").strip()
    configured: list[str] = []
    skipped: list[str] = []
    for project in projects:
        manifest = project.get("manifest", "missing")
        if manifest == "missing":
            skipped.append(project["id"])
            continue
        record = root / Path(manifest).parent
        if not record.exists():
            skipped.append(project["id"])
            continue
        block = project_block(project, directive, report_only_through, open_infraction_fingerprints(record))
        configure_agents(record / "AGENTS.md", block)
        for name in ("LOOP.md", "STATE.md", "loop-constraints.md"):
            configure_text(record / name, block)
        for skill in sorted((record / ".codex" / "skills").glob("*/SKILL.md")):
            configure_text(skill, block)
        configure_verifier(record / ".codex" / "agents" / "verifier.toml", block)
        configure_operational_files(record)
        configured.append(project["id"])

    print(json.dumps({"configured": configured, "skipped": skipped}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
