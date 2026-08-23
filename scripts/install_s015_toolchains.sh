#!/usr/bin/env bash
set -euo pipefail

solvys_repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
solvys_target_home="${HOME:?HOME is required}"
solvys_verify_only=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target-home)
      solvys_target_home="$2"
      shift 2
      ;;
    --verify-only)
      solvys_verify_only=1
      shift
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 2
      ;;
  esac
done

solvys_loop_prefix="$solvys_target_home/.local/share/solvys-factory/toolchains/loop-0.1.2"
solvys_loop_packages=(
  "@cobusgreyling/loop@0.1.2"
  "@cobusgreyling/loop-audit@1.7.0"
  "@cobusgreyling/loop-context@1.5.0"
  "@cobusgreyling/loop-cost@1.2.0"
  "@cobusgreyling/loop-gate@1.0.0"
  "@cobusgreyling/loop-init@1.5.0"
  "@cobusgreyling/loop-mcp-server@1.1.0"
  "@cobusgreyling/loop-sync@1.0.0"
  "@cobusgreyling/loop-worktree@1.2.0"
)

verify_loop() {
  SOLVYS_LOOP_PREFIX="$solvys_loop_prefix" \
  SOLVYS_LOCK_FILE="$solvys_repo_root/factory/loops/toolchain-lock.json" \
  python3 - <<'PY'
import json
import os
from pathlib import Path

prefix = Path(os.environ["SOLVYS_LOOP_PREFIX"])
lock = json.loads(Path(os.environ["SOLVYS_LOCK_FILE"]).read_text(encoding="utf-8"))["tools"]
package_lock = json.loads((prefix / "package-lock.json").read_text(encoding="utf-8"))["packages"]
keys = [
    "loop-engineering", "loop-audit", "loop-context", "loop-cost", "loop-gate",
    "loop-init", "loop-mcp-server", "loop-sync", "loop-worktree",
]
for key in keys:
    expected = lock[key]
    installed = package_lock[f"node_modules/{expected['package']}"]
    if installed["version"] != expected["version"]:
        raise SystemExit(f"{expected['package']} version mismatch")
    if installed["integrity"] != expected["integrity"]:
        raise SystemExit(f"{expected['package']} integrity mismatch")
PY
}

if ! verify_loop 2>/dev/null; then
  if [[ "$solvys_verify_only" -eq 1 ]]; then
    echo "Pinned Loop toolchain is missing or altered." >&2
    exit 1
  fi
  mkdir -p "$solvys_loop_prefix"
  npm install --prefix "$solvys_loop_prefix" --save-exact --ignore-scripts "${solvys_loop_packages[@]}"
fi
verify_loop
npm audit --prefix "$solvys_loop_prefix" --audit-level=high >/dev/null

solvys_specify="$solvys_target_home/.local/bin/specify"
solvys_uv_receipt="$solvys_target_home/.local/share/uv/tools/specify-cli/uv-receipt.toml"
if [[ ! -x "$solvys_specify" ]] || [[ "$($solvys_specify --version 2>/dev/null)" != *"0.16.2"* ]] || ! grep -Fq 'github.com/github/spec-kit.git?rev=v0.16.2' "$solvys_uv_receipt" 2>/dev/null; then
  if [[ "$solvys_verify_only" -eq 1 ]]; then
    echo "Spec Kit v0.16.2 from the pinned Git tag is missing or altered." >&2
    exit 1
  fi
  uv tool install --force --from "git+https://github.com/github/spec-kit.git@v0.16.2" specify-cli
fi

echo "S015 toolchains verified: Loop 0.1.2 command family and Spec Kit 0.16.2."
