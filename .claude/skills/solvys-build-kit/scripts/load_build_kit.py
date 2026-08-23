#!/usr/bin/env python3
"""Load a selected Solvys Build Kit preset into an existing React repository."""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
MANIFEST_PATH = ASSET_ROOT / "manifest.json"
SAFE_NAMESPACE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def load_manifest() -> dict:
    return json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))


def project_has_react(package: dict) -> bool:
    groups = ("dependencies", "devDependencies", "peerDependencies")
    return any("react" in package.get(group, {}) for group in groups)


def selected_components(manifest: dict, preset: str) -> list[dict]:
    by_id = {component["id"]: component for component in manifest["components"]}
    return [by_id[component_id] for component_id in manifest["presets"][preset]]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--target", type=Path, help="Absolute path to an existing React repository")
    parser.add_argument("--preset", default="foundation", help="Build Kit preset")
    parser.add_argument("--namespace", default="solvys-build-kit", help="Directory under src")
    parser.add_argument("--dry-run", action="store_true", help="Print the load plan without writing")
    parser.add_argument("--replace", action="store_true", help="Back up and replace an existing loaded kit")
    parser.add_argument("--list", action="store_true", help="List presets and components")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    manifest = load_manifest()
    if args.list:
        print(json.dumps({"version": manifest["version"], "presets": manifest["presets"]}, indent=2))
        return 0
    if args.target is None:
        print("--target is required unless --list is used", file=sys.stderr)
        return 2
    if args.preset not in manifest["presets"]:
        print(f"unknown preset: {args.preset}", file=sys.stderr)
        return 2
    if not SAFE_NAMESPACE.fullmatch(args.namespace):
        print("--namespace must use lowercase letters, digits, and hyphens", file=sys.stderr)
        return 2

    target = args.target.expanduser().resolve()
    package_path = target / "package.json"
    source_root = target / "src"
    destination = (source_root / args.namespace).resolve()
    if not target.is_dir() or not package_path.is_file() or not source_root.is_dir():
        print("target must contain package.json and src/", file=sys.stderr)
        return 2
    if target not in destination.parents:
        print("resolved destination escaped the target repository", file=sys.stderr)
        return 2
    package = json.loads(package_path.read_text(encoding="utf-8"))
    if not project_has_react(package):
        print("target package.json does not declare React", file=sys.stderr)
        return 2

    components = selected_components(manifest, args.preset)
    relative_files = list(manifest["coreFiles"]) + [component["file"] for component in components]
    plan = {
        "kit": manifest["kit"], "version": manifest["version"], "preset": args.preset,
        "target": str(target), "destination": str(destination),
        "components": [component["id"] for component in components],
        "files": relative_files + ["src/index.ts"], "replace": args.replace,
    }
    if args.dry_run:
        print(json.dumps(plan, indent=2))
        return 0

    backup_root = target / ".solvys" / "build-kit-backups"
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    if destination.exists():
        if not args.replace:
            print(f"destination exists: {destination}; rerun with --replace after ownership review", file=sys.stderr)
            return 3
        backup = backup_root / timestamp / args.namespace
        backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.move(str(destination), str(backup))

    destination.mkdir(parents=True, exist_ok=False)
    copied: list[str] = []
    for relative in relative_files:
        source = ASSET_ROOT / relative
        output_relative = Path(relative).relative_to("src")
        output = destination / output_relative
        output.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, output)
        copied.append(str(output_relative))

    exports = ["export * from \"./contracts\";", "import \"./solvys-build-kit.css\";"]
    for component in components:
        stem = Path(component["file"]).stem
        exports.append(f'export {{ {component["export"]} }} from "./components/{stem}";')
    (destination / "index.ts").write_text("\n".join(exports) + "\n", encoding="utf-8")
    copied.append("index.ts")

    receipt_path = target / ".solvys" / "build-kit.receipt.json"
    receipt_path.parent.mkdir(parents=True, exist_ok=True)
    if receipt_path.exists():
        receipt_backup = backup_root / timestamp / "build-kit.receipt.json"
        receipt_backup.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(receipt_path, receipt_backup)
    receipt = {
        "schemaVersion": manifest.get("schemaVersion", 1), "kit": manifest["kit"], "version": manifest["version"],
        "preset": args.preset, "loadedAt": datetime.now(timezone.utc).isoformat(),
        "target": str(target), "destination": str(destination), "files": copied,
        "requiredPackages": manifest["runtime"]["required"],
        "optionalPackages": manifest["runtime"]["optional"],
        "approvedLibraries": manifest.get("approvedLibraries", []),
        "designSource": manifest.get("designSource", {}),
        "proofStatus": "pending",
    }
    receipt_path.write_text(json.dumps(receipt, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({**plan, "receipt": str(receipt_path), "status": "loaded"}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
