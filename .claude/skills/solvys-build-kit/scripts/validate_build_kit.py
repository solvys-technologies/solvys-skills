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
WEBSITE_BLOCK_PREFIXES = (
    "hero-", "pricing", "footer-", "features-", "content-", "trust-",
    "announcement-", "use-cases-", "how-it-works-", "logo-cloud-",
    "testimonials-", "image-gallery-", "navbar-", "newsletter-", "contact-",
    "integrations-", "feature-comparison", "about-", "careers-", "changelog-",
    "blog-", "team-", "faq-", "cta-",
)


def main() -> int:
    errors: list[str] = []
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"manifest error: {exc}", file=sys.stderr)
        return 1
    if manifest.get("schemaVersion") not in (1, 2):
        errors.append("manifest schemaVersion must be 1 or 2")
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

    source_registry = ASSET_ROOT / manifest.get("sourceRegistry", "library-sources.json")
    if not source_registry.is_file():
        errors.append(f"missing source registry: {source_registry}")
    else:
        try:
            registry = json.loads(source_registry.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            errors.append(f"source registry error: {exc}")
        else:
            registered_sources = registry.get("activeUpstreams", []) + registry.get("installedReferences", [])
            registry_ids = {source.get("id") for source in registered_sources}
            auto_update_ids = {source.get("id") for source in registered_sources if source.get("autoUpdate")}
            if auto_update_ids:
                errors.append("automatic updates must be disabled for the approved library snapshots")
            for approved in manifest.get("approvedLibraries", []):
                if approved.get("id") not in registry_ids:
                    errors.append(f"approved library missing from source registry: {approved.get('id')}")
                app_registry = approved.get("appRegistry")
                if app_registry and not (ASSET_ROOT / app_registry).is_file():
                    errors.append(f"approved app registry missing: {app_registry}")
            manifest_auto_update_ids = {library.get("id") for library in manifest.get("approvedLibraries", []) if library.get("autoUpdate")}
            if manifest_auto_update_ids:
                errors.append("manifest automatic updates must be disabled for the approved library snapshots")
            snapshot_root = ASSET_ROOT / "installed-libraries"
            for source_id in ("beui", "beui-pro", "evilcharts"):
                snapshot_manifest = snapshot_root / source_id / "library-manifest.json"
                if not snapshot_manifest.is_file():
                    errors.append(f"missing full library snapshot: {source_id}")
                    continue
                try:
                    snapshot = json.loads(snapshot_manifest.read_text(encoding="utf-8"))
                except (OSError, json.JSONDecodeError) as exc:
                    errors.append(f"library snapshot error for {source_id}: {exc}")
                    continue
                if snapshot.get("autoUpdate"):
                    errors.append(f"library snapshot must be manual for {source_id}")
                if snapshot.get("catalogItemCount") != len(snapshot.get("items", [])):
                    errors.append(f"library snapshot item count mismatch: {source_id}")
            for source_id in ("beui", "beui-pro"):
                full_registry_path = ASSET_ROOT / "installed-registries" / source_id / "registry.json"
                app_registry_path = ASSET_ROOT / "installed-registries" / source_id / "app-blocks.json"
                snapshot_manifest_path = snapshot_root / source_id / "library-manifest.json"
                if not full_registry_path.is_file() or not app_registry_path.is_file():
                    errors.append(f"missing app-block registry: {source_id}")
                    continue
                try:
                    full_registry = json.loads(full_registry_path.read_text(encoding="utf-8"))
                    app_registry = json.loads(app_registry_path.read_text(encoding="utf-8"))
                    snapshot = json.loads(snapshot_manifest_path.read_text(encoding="utf-8"))
                except (OSError, json.JSONDecodeError) as exc:
                    errors.append(f"app-block registry error for {source_id}: {exc}")
                    continue
                full_blocks = [item for item in full_registry.get("items", []) if item.get("type") == "registry:block"]
                app_blocks = app_registry.get("items", [])
                full_names = {item.get("name") for item in full_blocks}
                app_names = [item.get("name") for item in app_blocks]
                if app_registry.get("scope") != "app-blocks-only":
                    errors.append(f"app-block registry scope is invalid: {source_id}")
                if any(item.get("type") != "registry:block" for item in app_blocks):
                    errors.append(f"app-block registry contains non-block entries: {source_id}")
                if len(app_names) != len(set(app_names)):
                    errors.append(f"app-block registry contains duplicate names: {source_id}")
                if not set(app_names).issubset(full_names):
                    errors.append(f"app-block registry contains unknown items: {source_id}")
                if source_id == "beui-pro" and any(
                    any(str(name).startswith(prefix) or str(name) == prefix for prefix in WEBSITE_BLOCK_PREFIXES)
                    for name in app_names
                ):
                    errors.append("beui-pro app-block registry contains website blocks")
                app_receipt = snapshot.get("appBlockRegistry", {})
                if app_receipt.get("appBlockItemCount") != len(app_blocks):
                    errors.append(f"app-block manifest count mismatch: {source_id}")
                if app_receipt.get("excludedWebsiteBlockCount", 0) != len(full_blocks) - len(app_blocks):
                    errors.append(f"website exclusion count mismatch: {source_id}")
            for reference in registry.get("referenceInputs", []):
                if not reference.get("url") or not reference.get("mode"):
                    errors.append(f"reference input needs url and mode: {reference.get('id')}")

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

    if manifest.get("schemaVersion") == 2:
        if manifest.get("designSource", {}).get("editor") != "Pen.dev":
            errors.append("schema 2 design source must be Pen.dev")
        if "tanstack-chart-panel" not in ids:
            errors.append("schema 2 manifest must include tanstack-chart-panel")
        if "charting" not in presets:
            errors.append("schema 2 manifest must include charting preset")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Solvys Build Kit validation passed for {len(components)} components and {len(presets)} presets.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
