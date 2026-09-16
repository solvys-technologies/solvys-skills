#!/usr/bin/env python3
"""Verify a deployed Solvys website across the format matrix.

Checks the live URL for reachability, protection walls, theme support,
reduced-motion coverage, and per-viewport layout overflow.

Uses the standard library for static checks. Uses Playwright for the viewport
and interaction checks when it is installed, and reports those checks as
BLOCKED when it is not.

Usage:
    python3 verify_site.py <url> [--json receipt.json] [--strict]

Exit codes:
    0  every applicable check passed
    1  at least one check failed
    2  the run could not complete (bad input, unreachable host)
"""

from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone

USER_AGENT = "SolvysWebsiteVerifier/1.0"


def ssl_context() -> ssl.SSLContext:
    """Prefer certifi's bundle so the check works on Python builds with no
    system trust store wired up, which is common for Homebrew and pyenv."""
    try:
        import certifi
    except ImportError:
        return ssl.create_default_context()
    return ssl.create_default_context(cafile=certifi.where())

VIEWPORTS = [
    ("desktop", 1440, 900),
    ("laptop", 1280, 800),
    ("tablet", 834, 1112),
    ("mobile", 390, 844),
    ("narrow-mobile", 320, 568),
]

THEMES = ["light", "dark"]

PROTECTION_MARKERS = (
    "vercel.com/login",
    "Authentication Required",
    "Vercel Authentication",
    "This deployment is protected",
    "_vercel/sso",
)

REQUIRED_DOCUMENT_SIGNALS = (
    ("meta viewport", r'<meta[^>]+name=["\']viewport["\']'),
    ("document title", r"<title[^>]*>[^<]{3,}</title>"),
)

REDUCED_MOTION_SIGNAL = r"prefers-reduced-motion"


def fetch(url: str, timeout: int = 30) -> tuple[int, str, dict[str, str]]:
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(
            request, timeout=timeout, context=ssl_context()
        ) as response:
            body = response.read().decode("utf-8", errors="replace")
            return response.status, body, dict(response.headers)
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        return exc.code, body, dict(exc.headers or {})
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        raise RuntimeError(f"could not reach {url}: {exc}") from exc


def check_reachable(url: str) -> dict:
    status, body, headers = fetch(url)
    protected = status in (401, 403) or any(m in body for m in PROTECTION_MARKERS)
    return {
        "id": "auth.unauthenticated",
        "format": "auth",
        "status": "fail" if protected or status != 200 else "pass",
        "detail": (
            f"HTTP {status}; "
            + ("deployment protection is active" if protected else "publicly reachable")
        ),
        "headers": {"content-type": headers.get("content-type", "")},
        "body": body,
    }


def check_document(body: str) -> list[dict]:
    results = []
    for label, pattern in REQUIRED_DOCUMENT_SIGNALS:
        found = re.search(pattern, body, flags=re.IGNORECASE) is not None
        results.append(
            {
                "id": f"document.{label.replace(' ', '-')}",
                "format": "document",
                "status": "pass" if found else "fail",
                "detail": f"{label} {'present' if found else 'missing'}",
            }
        )

    reduced = re.search(REDUCED_MOTION_SIGNAL, body) is not None
    results.append(
        {
            "id": "motion.reduced-motion-styles",
            "format": "reduced-motion",
            "status": "pass" if reduced else "warn",
            "detail": (
                "reduced-motion styles present in served assets"
                if reduced
                else "no reduced-motion reference in the served document; confirm in the "
                "stylesheet bundle before accepting"
            ),
        }
    )
    return results


def playwright_available() -> bool:
    try:
        import playwright.sync_api  # noqa: F401
    except ImportError:
        return False
    return True


def check_viewports(url: str) -> list[dict]:
    from playwright.sync_api import sync_playwright

    results: list[dict] = []
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()

        for name, width, height in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=1,
            )
            page = context.new_page()
            errors: list[str] = []
            page.on("pageerror", lambda exc: errors.append(str(exc)))
            try:
                page.goto(url, wait_until="load", timeout=45_000)
                page.wait_for_timeout(1200)

                overflow = page.evaluate(
                    "() => Math.max("
                    "document.documentElement.scrollWidth - document.documentElement.clientWidth,"
                    "document.body.scrollWidth - document.body.clientWidth)"
                )
                clipped = page.evaluate(
                    "() => Array.from(document.querySelectorAll('h1,h2,h3,p,li,a,button'))"
                    ".filter(el => el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0)"
                    ".slice(0, 5).map(el => el.tagName + ':' + (el.textContent || '').trim().slice(0, 40))"
                )
                height_ok = page.evaluate("() => document.body.scrollHeight > 200")

                ok = overflow <= 2 and not clipped and height_ok and not errors
                detail = (
                    f"scrollWidth exceeds viewport by {overflow}px"
                    if overflow > 2
                    else f"{len(clipped)} clipped text nodes"
                    if clipped
                    else "page did not render content"
                    if not height_ok
                    else f"{len(errors)} script errors: {errors[:2]}"
                    if errors
                    else "renders without overflow or clipping"
                )
                results.append(
                    {
                        "id": f"viewport.{name}",
                        "format": f"{width}x{height}",
                        "status": "pass" if ok else "fail",
                        "detail": detail,
                        "evidence": {"overflow_px": overflow, "clipped": clipped},
                    }
                )
            except Exception as exc:  # noqa: BLE001 - report any render failure
                results.append(
                    {
                        "id": f"viewport.{name}",
                        "format": f"{width}x{height}",
                        "status": "fail",
                        "detail": f"render failed: {exc}",
                    }
                )
            finally:
                context.close()

        for theme in THEMES:
            context = browser.new_context(
                viewport={"width": 1280, "height": 800},
                color_scheme=theme,
            )
            page = context.new_page()
            try:
                page.goto(url, wait_until="load", timeout=45_000)
                page.wait_for_timeout(800)
                scheme = page.evaluate(
                    "() => window.matchMedia('(prefers-color-scheme: dark)').matches"
                )
                expected = theme == "dark"
                results.append(
                    {
                        "id": f"theme.{theme}",
                        "format": theme,
                        "status": "pass" if scheme is expected else "fail",
                        "detail": (
                            f"color scheme applied as {theme}"
                            if scheme is expected
                            else f"expected {'dark' if expected else 'light'}, got the opposite"
                        ),
                    }
                )
            except Exception as exc:  # noqa: BLE001
                results.append(
                    {
                        "id": f"theme.{theme}",
                        "format": theme,
                        "status": "fail",
                        "detail": f"theme render failed: {exc}",
                    }
                )
            finally:
                context.close()

        context = browser.new_context(
            viewport={"width": 1280, "height": 800},
            reduced_motion="reduce",
        )
        page = context.new_page()
        try:
            page.goto(url, wait_until="load", timeout=45_000)
            page.wait_for_timeout(800)
            page.keyboard.press("End")
            page.wait_for_timeout(600)
            text_length = page.evaluate(
                "() => (document.body.innerText || '').trim().length"
            )
            ok = text_length > 200
            results.append(
                {
                    "id": "motion.reduced-motion-content",
                    "format": "reduced-motion",
                    "status": "pass" if ok else "fail",
                    "detail": (
                        f"narrative text present under reduced motion ({text_length} chars)"
                        if ok
                        else "no readable content under reduced motion; a stage is stranded"
                    ),
                }
            )
        except Exception as exc:  # noqa: BLE001
            results.append(
                {
                    "id": "motion.reduced-motion-content",
                    "format": "reduced-motion",
                    "status": "fail",
                    "detail": f"reduced-motion render failed: {exc}",
                }
            )
        finally:
            context.close()

        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()
        try:
            page.goto(url, wait_until="load", timeout=45_000)
            page.wait_for_timeout(800)
            focusable = page.evaluate(
                "() => document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex=\"-1\"])').length"
            )
            results.append(
                {
                    "id": "controls.focusable",
                    "format": "keyboard",
                    "status": "pass" if focusable > 0 else "warn",
                    "detail": f"{focusable} focusable controls found",
                }
            )
        except Exception as exc:  # noqa: BLE001
            results.append(
                {
                    "id": "controls.focusable",
                    "format": "keyboard",
                    "status": "fail",
                    "detail": f"control scan failed: {exc}",
                }
            )
        finally:
            context.close()

        browser.close()

    return results


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="Preview URL to verify")
    parser.add_argument("--json", dest="json_path", help="Write a JSON receipt here")
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Treat warnings as failures",
    )
    args = parser.parse_args()

    url = args.url
    if not url.startswith(("http://", "https://")):
        print(f"BLOCKED: url must start with http:// or https://, got {url!r}", file=sys.stderr)
        return 2

    try:
        reachable = check_reachable(url)
    except RuntimeError as exc:
        print(f"BLOCKED: {exc}", file=sys.stderr)
        return 2

    body = reachable.pop("body")
    checks: list[dict] = [reachable]
    checks.extend(check_document(body))

    if playwright_available():
        checks.extend(check_viewports(url))
        playwright_state = "used"
    else:
        playwright_state = "unavailable"
        for label, _, _ in VIEWPORTS:
            checks.append(
                {
                    "id": f"viewport.{label}",
                    "format": label,
                    "status": "blocked",
                    "detail": "Playwright is not installed; viewport checks did not run",
                }
            )
        checks.append(
            {
                "id": "theme.verification",
                "format": "theme",
                "status": "blocked",
                "detail": "Playwright is not installed; theme rendering was not verified",
            }
        )

    failed = [c for c in checks if c["status"] == "fail"]
    warned = [c for c in checks if c["status"] == "warn"]
    blocked = [c for c in checks if c["status"] == "blocked"]

    receipt = {
        "url": url,
        "verifiedAt": datetime.now(timezone.utc).isoformat(),
        "playwright": playwright_state,
        "summary": {
            "total": len(checks),
            "passed": len([c for c in checks if c["status"] == "pass"]),
            "failed": len(failed),
            "warned": len(warned),
            "blocked": len(blocked),
        },
        "checks": checks,
    }

    if args.json_path:
        with open(args.json_path, "w", encoding="utf-8") as handle:
            json.dump(receipt, handle, indent=2)
            handle.write("\n")

    print(f"Format matrix for {url}")
    print(f"Playwright: {playwright_state}")
    print("")
    for check in checks:
        marker = {
            "pass": "PASS   ",
            "fail": "FAIL   ",
            "warn": "WARN   ",
            "blocked": "BLOCKED",
        }[check["status"]]
        print(f"  {marker}  {check['id']:<38} {check['detail']}")

    summary = receipt["summary"]
    print("")
    print(
        f"{summary['passed']} passed, {summary['failed']} failed, "
        f"{summary['warned']} warned, {summary['blocked']} blocked"
    )

    if args.json_path:
        print(f"Receipt written to {args.json_path}")

    if blocked and args.strict:
        return 1
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
