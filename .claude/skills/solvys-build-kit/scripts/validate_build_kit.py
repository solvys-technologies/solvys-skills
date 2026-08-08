#!/usr/bin/env python3
"""Validate the Solvys Build Kit manifest, sources, presets, and styling guardrails."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
MANIFEST_PATH = ASSET_ROOT / "manifest.json"
COMPONENT_ID = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DISALLOWED_CSS = ("linear-gradient", "radial-gradient", "backdrop-filter", "filter: blur", "text-shadow", "box-shadow")


def main() -> int:
    errors: list[str] = []
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"manifest error: {exc}", file=sys.stderr)
        return 1
    if manifest.get("schemaVersion") != 1:
        errors.append("manifest schemaVersion must be 1")
    if manifest.get("kit") != "solvys-build-kit":
        errors.append("manifest kit identity is invalid")

    components = manifest.get("components", [])
    ids = [component.get("id", "") for component in components]
    if len(ids) != len(set(ids)):
        errors.append("component IDs must be unique")
    for component in components:
        component_id = component.get("id", "")
        if not COMPONENT_ID.fullmatch(component_id):
            errors.append(f"invalid component ID: {component_id!r}")
        source = ASSET_ROOT / component.get("file", "")
        if not source.is_file():
            errors.append(f"missing component source: {source}")
        elif f'export function {component.get("export", "")}' not in source.read_text(encoding="utf-8"):
            errors.append(f"component export mismatch: {component_id}")
    for relative in manifest.get("coreFiles", []):
        if not (ASSET_ROOT / relative).is_file():
            errors.append(f"missing core source: {relative}")

    known = set(ids)
    presets = manifest.get("presets", {})
    if "all" not in presets or set(presets.get("all", [])) != known:
        errors.append("all preset must contain every component exactly once")
    for preset, component_ids in presets.items():
        if len(component_ids) != len(set(component_ids)):
            errors.append(f"preset contains duplicate components: {preset}")
        missing = sorted(set(component_ids) - known)
        if missing:
            errors.append(f"preset {preset} references unknown components: {missing}")

    css_path = ASSET_ROOT / "src" / "solvys-build-kit.css"
    css = css_path.read_text(encoding="utf-8") if css_path.is_file() else ""
    for token in DISALLOWED_CSS:
        if token in css:
            errors.append(f"disallowed CSS default: {token}")
    if "prefers-reduced-motion" not in css:
        errors.append("CSS must include a reduced-motion path")
    if ":focus-visible" not in css:
        errors.append("CSS must include visible keyboard focus")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Solvys Build Kit validation passed for {len(components)} components and {len(presets)} presets.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
