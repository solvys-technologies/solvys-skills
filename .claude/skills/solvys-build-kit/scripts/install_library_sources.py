#!/usr/bin/env python3
"""Install and snapshot the supplied Solvys Build Kit library sources."""

from __future__ import annotations

import argparse
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


SKILL_ROOT = Path(__file__).resolve().parent.parent
ASSET_ROOT = SKILL_ROOT / "assets" / "build-kit"
INSTALL_ROOT = ASSET_ROOT / "installed-registries"
RECEIPT_PATH = INSTALL_ROOT / "install-receipt.json"


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def fetch(url: str, token_env: str | None = None) -> bytes:
    headers = {
        "Accept": "application/json, text/plain, */*",
        "User-Agent": "solvys-build-kit-source-installer/2.0",
    }
    token = os.environ.get(token_env or "")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = Request(url, headers=headers)
    with urlopen(request, timeout=30) as response:
        return response.read()


def write_snapshot(namespace: str, filename: str, url: str, token_env: str | None = None) -> dict:
    target = INSTALL_ROOT / namespace / filename
    try:
        body = fetch(url, token_env)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(body)
        return {
            "url": url,
            "path": str(target.relative_to(ASSET_ROOT)),
            "status": "installed",
            "bytes": len(body),
        }
    except (HTTPError, URLError, TimeoutError, OSError) as exc:
        status = "awaiting-credentials" if isinstance(exc, HTTPError) and exc.code in {401, 403} and token_env else "unavailable"
        return {"url": url, "status": status, "detail": str(exc)}


def npm_inventory() -> dict:
    package_path = ASSET_ROOT / "package.json"
    package = json.loads(package_path.read_text(encoding="utf-8"))
    return {
        "dependencies": package.get("dependencies", {}),
        "devDependencies": package.get("devDependencies", {}),
    }


def install_sources() -> dict:
    results: dict[str, dict] = {}
    results["beui"] = {
        "mode": "registry-catalog",
        "autoUpdate": True,
        "snapshot": write_snapshot("beui", "registry.json", "https://beui.dev/r/registry.json"),
    }
    results["beui-pro"] = {
        "mode": "private-registry-catalog",
        "autoUpdate": True,
        "credentialEnv": "BEUI_PRO_TOKEN",
        "snapshot": write_snapshot("beui-pro", "registry.json", "https://pro.beui.dev/r/registry.json", "BEUI_PRO_TOKEN"),
    }
    results["evilcharts"] = {
        "mode": "registry-catalog",
        "autoUpdate": True,
        "snapshot": write_snapshot("evilcharts", "registry.json", "https://evilcharts.com/r/registry.json?raw=1"),
    }
    mapcn_urls = {
        "registry.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/registry.json",
        "map.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/map.json",
        "analytics-card.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/analytics-card.json",
        "analytics-map.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/analytics-map.json",
        "choropleth.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/choropleth.json",
        "heatmap.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/heatmap.json",
        "store-locator.json": "https://raw.githubusercontent.com/AnmolSaini16/mapcn/main/public/r/store-locator.json",
    }
    results["mapcn"] = {
        "mode": "github-shadcn-registry",
        "autoUpdate": False,
        "license": "MIT",
        "snapshots": {name: write_snapshot("mapcn", name, url) for name, url in mapcn_urls.items()},
    }
    results["aceternity-ui"] = {
        "mode": "shadcn-registry",
        "autoUpdate": False,
        "snapshots": {
            "bento-grid.json": write_snapshot("aceternity-ui", "bento-grid.json", "https://ui.aceternity.com/registry/bento-grid.json"),
            "terminal.json": write_snapshot("aceternity-ui", "terminal.json", "https://ui.aceternity.com/registry/terminal.json"),
        },
    }
    free_aicss = [
        "thinking-state",
        "thinking-reasoning",
        "orbs",
        "text-response",
        "streaming-text",
        "code-block",
        "task-list",
        "data-table",
        "ai-agent-input",
    ]
    results["aicss"] = {
        "mode": "source-registry-free-catalog",
        "autoUpdate": False,
        "licensePolicy": "licensed-components-remain-gated",
        "snapshots": {name: write_snapshot("aicss", f"{name}.json", f"https://www.aicss.dev/r/{name}") for name in free_aicss},
    }
    results["npm"] = {
        "mode": "pinned-install",
        "autoUpdate": False,
        "inventory": npm_inventory(),
    }
    results["reference-only"] = {
        "bakai-lab": {"status": "reference-only-no-package", "url": "https://www.bakai.me/lab"},
        "grainient": {"status": "license-gated-asset-service", "url": "https://grainient.supply/"},
        "basit-designs-x": {"status": "reference-only-image-post", "url": "https://x.com/basit_designs/status/2086046675282624551?s=12"},
        "openui-examples": {"status": "installed-via-npm", "url": "https://github.com/thesysdev/openui/tree/main/examples"},
        "create-ui": {"status": "installed-via-cli", "url": "https://createui.co/docs/components"},
        "generative-loaders": {"status": "installed-via-npm", "url": "https://generativeloaders.com/"},
        "thinking-orbs": {"status": "installed-via-npm", "url": "https://orbs.jakubantalik.com/"},
    }
    return results


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Fetch public registries and write the install receipt")
    args = parser.parse_args()
    if not args.apply:
        parser.error("use --apply to write the source layer")
    INSTALL_ROOT.mkdir(parents=True, exist_ok=True)
    receipt = {
        "schemaVersion": 1,
        "kit": "solvys-build-kit",
        "generatedAt": now(),
        "secretPolicy": "private credentials are process-only and never written to snapshots or receipts",
        "sources": install_sources(),
    }
    RECEIPT_PATH.write_text(json.dumps(receipt, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    summary = {"receipt": str(RECEIPT_PATH), "autoUpdateSources": ["beui", "beui-pro", "evilcharts"], "privateCredentialUsed": bool(os.environ.get("BEUI_PRO_TOKEN"))}
    print(json.dumps(summary, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
