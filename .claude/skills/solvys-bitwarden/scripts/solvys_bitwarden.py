#!/usr/bin/env python3
"""Scoped, read-only Bitwarden access for Solvys Factory tasks."""

from __future__ import annotations

import argparse
import contextlib
import fcntl
import json
import os
import re
import shutil
import stat
import subprocess
import sys
from pathlib import Path
from typing import NoReturn
from urllib.parse import urlsplit


UUID_RE = re.compile(r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$")


class PolicyError(RuntimeError):
    pass


def fail(message: str) -> NoReturn:
    raise PolicyError(message)


def exact_origin(url: str) -> str:
    parsed = urlsplit(url)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
        fail("target and allowed origins must use https without user info")
    host = parsed.hostname.lower().rstrip(".")
    if "*" in host:
        fail("wildcard origins are forbidden")
    try:
        port = parsed.port
    except ValueError:
        fail("target origin has an invalid port")
    if port in (None, 443):
        return f"https://{host}"
    return f"https://{host}:{port}"


def load_policy(path: str) -> dict:
    policy_path = Path(path).expanduser()
    if not policy_path.is_file():
        fail(f"policy file not found: {policy_path}")
    try:
        policy = json.loads(policy_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"policy is unreadable: {exc}")
    if not isinstance(policy, dict) or policy.get("version") not in {1, 2}:
        fail("policy version must be 1 or 2")
    if not isinstance(policy.get("projectId"), str) or not policy["projectId"]:
        fail("policy projectId is required")
    if policy.get("backend") not in {"bws", "bw"}:
        fail("policy backend must be bws or bw")
    if policy.get("readOnly") is not True:
        fail("policy must be read-only")
    if policy.get("version") == 2 and policy.get("solvysOverride") is not None and policy.get("backend") != "bw":
        fail("version 2 solvysOverride requires the official bw backend")
    origins = policy.get("allowedOrigins")
    if not isinstance(origins, list) or not origins:
        fail("policy needs at least one allowed origin")
    for origin in origins:
        if not isinstance(origin, str) or origin != exact_origin(origin):
            fail("allowed origins must be exact https origins")
    selected = policy[policy["backend"]]
    if not isinstance(selected, dict):
        fail(f"{policy['backend']} policy block is required")
    if policy["backend"] == "bws":
        project_id = selected.get("projectId")
        ids = selected.get("secretIds")
        if not UUID_RE.fullmatch(str(project_id or "")):
            fail("bws projectId must be a UUID")
        if not isinstance(ids, dict) or not {"username", "password"}.issubset(ids):
            fail("bws secretIds must include username and password")
        if any(not UUID_RE.fullmatch(str(value)) for value in ids.values()):
            fail("bws secret IDs must be UUIDs")
        if selected.get("accessTokenEnv") != "BWS_ACCESS_TOKEN":
            fail("bws accessTokenEnv must be BWS_ACCESS_TOKEN")
    else:
        item_id = selected.get("itemId")
        if not UUID_RE.fullmatch(str(item_id or "")):
            fail("bw itemId must be a UUID")
        if not selected.get("keychainAccount") or not selected.get("keychainService"):
            fail("bw needs a project-specific Keychain account and service")
        if selected.get("keychainAccount") == "codex" or selected.get("keychainService") == "bw-master":
            fail("the shared codex/bw-master Keychain reference is forbidden")
        app_data = selected.get("appDataDir")
        if not isinstance(app_data, str) or not os.path.isabs(os.path.expanduser(app_data)):
            fail("bw appDataDir must be an absolute path")
        if policy["version"] == 2:
            item_name = selected.get("itemName")
            metadata = policy.get("metadata")
            repository_name = metadata.get("repositoryName") if isinstance(metadata, dict) else None
            if not isinstance(item_name, str) or not item_name:
                fail("version 2 bw policy needs an itemName")
            if not isinstance(repository_name, str) or not repository_name:
                fail("version 2 bw policy needs metadata.repositoryName")
            if item_name != repository_name:
                fail("bw itemName must match metadata.repositoryName")
            override = policy.get("solvysOverride")
            if override is not None:
                if not isinstance(override, dict):
                    fail("solvysOverride must be an object")
                if not UUID_RE.fullmatch(str(override.get("itemId") or "")):
                    fail("solvysOverride itemId must be a UUID")
                if override.get("itemName") != "Solvys Override":
                    fail("solvysOverride itemName must be Solvys Override")
                providers = override.get("providers")
                if not isinstance(providers, list) or not providers or not all(isinstance(value, str) and value for value in providers):
                    fail("solvysOverride needs at least one provider")
                origins = override.get("allowedOrigins")
                if not isinstance(origins, list) or not origins:
                    fail("solvysOverride needs at least one allowed origin")
                for origin in origins:
                    if not isinstance(origin, str) or origin != exact_origin(origin):
                        fail("solvysOverride origins must be exact https origins")
                if override.get("trigger") != "primary-resource-absent":
                    fail("solvysOverride trigger must be primary-resource-absent")
    return policy


def require_target(policy: dict, target_url: str, credential: str = "primary") -> str:
    origin = exact_origin(target_url)
    origins = policy["allowedOrigins"]
    if credential == "solvys-override":
        if policy["backend"] != "bw":
            fail("solvysOverride requires the official bw backend")
        override = policy.get("solvysOverride")
        if not isinstance(override, dict):
            fail("solvysOverride is not configured for this project")
        origins = override["allowedOrigins"]
    if origin not in origins:
        fail(f"target origin is not allowed: {origin}")
    return origin


def credential_config(policy: dict, credential: str) -> dict:
    if credential == "primary":
        return policy[policy["backend"]]
    if credential != "solvys-override":
        fail("credential selector is invalid")
    if policy["backend"] != "bw":
        fail("solvysOverride requires the official bw backend")
    override = policy.get("solvysOverride")
    if not isinstance(override, dict):
        fail("solvysOverride is not configured for this project")
    return override


def command_exists(name: str) -> bool:
    return shutil.which(name) is not None


def minimal_env() -> dict[str, str]:
    return {key: os.environ[key] for key in ("PATH", "HOME", "TMPDIR", "LANG") if key in os.environ}


def run_command(args: list[str], *, env: dict[str, str] | None = None) -> str:
    try:
        result = subprocess.run(
            args,
            env=env,
            check=True,
            capture_output=True,
            text=True,
            timeout=45,
        )
    except FileNotFoundError:
        fail(f"required command is unavailable: {args[0]}")
    except subprocess.TimeoutExpired:
        fail(f"Bitwarden command timed out: {args[0]}")
    except subprocess.CalledProcessError as exc:
        # Do not echo stderr. Bitwarden can include account or server details.
        fail(f"Bitwarden command failed: {args[0]} (exit {exc.returncode})")
    return result.stdout


def json_command(args: list[str], *, env: dict[str, str] | None = None) -> dict:
    output = run_command(args, env=env)
    try:
        value = json.loads(output)
    except json.JSONDecodeError:
        fail(f"Bitwarden returned invalid JSON: {args[0]}")
    if not isinstance(value, dict):
        fail(f"Bitwarden returned an unexpected object: {args[0]}")
    return value


def bws_secret(policy: dict, secret_id: str) -> str:
    if not command_exists("bws"):
        fail("bws is not installed in the authorized execution environment")
    env_name = policy["bws"]["accessTokenEnv"]
    if not os.environ.get(env_name):
        fail(f"{env_name} is missing from the authorized execution environment")
    child_env = minimal_env()
    child_env[env_name] = os.environ[env_name]
    value = json_command(["bws", "secret", "get", secret_id], env=child_env)
    expected_project = policy["bws"]["projectId"]
    if value.get("projectId") != expected_project or value.get("id") != secret_id:
        fail("Bitwarden secret is outside the project policy")
    secret_value = value.get("value")
    if not isinstance(secret_value, str) or not secret_value:
        fail("Bitwarden secret has no value")
    return secret_value


@contextlib.contextmanager
def bw_session(policy: dict):
    if not command_exists("bw"):
        fail("bw is not installed in the authorized execution environment")
    cfg = policy["bw"]
    app_data = Path(os.path.expanduser(cfg["appDataDir"]))
    app_data.mkdir(mode=0o700, parents=True, exist_ok=True)
    if stat.S_IMODE(app_data.stat().st_mode) & 0o077:
        fail("bw appDataDir must be private to the project owner")
    lock_path = app_data / ".solvys-lock"
    lock_path.touch(mode=0o600, exist_ok=True)
    lock_path.chmod(0o600)
    with lock_path.open("a+") as lock_file:
        try:
            fcntl.flock(lock_file.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            fail("project Bitwarden CLI is already in use; reuse its handoff")
        env = minimal_env()
        env["BITWARDENCLI_APPDATA_DIR"] = str(app_data)
        keychain = run_command([
            "security", "find-generic-password", "-a", cfg["keychainAccount"],
            "-s", cfg["keychainService"], "-w",
        ], env=minimal_env()).rstrip("\n")
        if not keychain:
            fail("project Bitwarden Keychain entry returned no value")
        env["SOLVYS_BW_MASTER"] = keychain
        session = run_command([
            "bw", "unlock", "--passwordenv", "SOLVYS_BW_MASTER", "--raw",
            "--nointeraction",
        ], env=env).strip()
        if not session:
            fail("Bitwarden CLI returned no session")
        try:
            if cfg.get("syncOnRead") is True:
                run_command(["bw", "sync", "--session", session, "--nointeraction"], env=env)
            yield env, session
        finally:
            with contextlib.suppress(Exception):
                run_command(["bw", "lock", "--session", session, "--nointeraction"], env=env)
            env.pop("SOLVYS_BW_MASTER", None)
            session = ""
            fcntl.flock(lock_file.fileno(), fcntl.LOCK_UN)


def validate_bw_item(item: dict, item_config: dict, target_origin: str) -> dict:
    if not item.get("id") or item.get("id") != item_config["itemId"]:
        fail("Bitwarden item ID does not match policy")
    if item.get("name") != item_config.get("itemName"):
        fail("Bitwarden item name does not match policy")
    login = item.get("login") or {}
    uris = login.get("uris") or []
    matching_url = None
    for uri in uris:
        candidate = uri.get("uri") if isinstance(uri, dict) else None
        if isinstance(candidate, str):
            with contextlib.suppress(PolicyError, ValueError):
                if exact_origin(candidate) == target_origin:
                    matching_url = candidate
                    break
    if matching_url is None:
        fail("Bitwarden item has no URI matching the target origin")
    username = login.get("username")
    password = login.get("password")
    if not isinstance(username, str) or not isinstance(password, str) or not password:
        fail("Bitwarden item has no usable login")
    return {"url": matching_url, "username": username, "password": password}


def bw_login(policy: dict, target_origin: str, credential: str = "primary") -> dict:
    item_config = credential_config(policy, credential)
    with bw_session(policy) as (env, session):
        item = json_command([
            "bw", "get", "item", item_config["itemId"], "--session", session,
            "--nointeraction",
        ], env=env)
    return validate_bw_item(item, item_config, target_origin)


def bw_totp(policy: dict, target_origin: str, credential: str = "primary") -> str:
    item_config = credential_config(policy, credential)
    with bw_session(policy) as (env, session):
        item = json_command([
            "bw", "get", "item", item_config["itemId"], "--session", session,
            "--nointeraction",
        ], env=env)
        validate_bw_item(item, item_config, target_origin)
        code = run_command([
            "bw", "get", "totp", item_config["itemId"], "--session", session,
            "--nointeraction",
        ], env=env).strip()
    if not code or not re.fullmatch(r"[0-9]{6,10}", code):
        fail("Bitwarden did not return a usable one-time code")
    return code


def bw_options(policy: dict, target_origin: str, credential: str = "primary") -> str:
    item_config = credential_config(policy, credential)
    with bw_session(policy) as (env, session):
        item = json_command([
            "bw", "get", "item", item_config["itemId"], "--session", session,
            "--nointeraction",
        ], env=env)
    validate_bw_item(item, item_config, target_origin)
    notes = item.get("notes")
    if notes is None:
        return ""
    if not isinstance(notes, str):
        fail("Bitwarden item notes are invalid")
    return notes


def resolve_login(policy: dict, target_url: str, credential: str = "primary") -> dict:
    target_origin = require_target(policy, target_url, credential)
    if policy["backend"] == "bw":
        return bw_login(policy, target_origin, credential)
    if credential != "primary":
        fail("solvysOverride requires the official bw backend")
    ids = policy["bws"]["secretIds"]
    return {
        "url": target_url,
        "username": bws_secret(policy, ids["username"]),
        "password": bws_secret(policy, ids["password"]),
    }


def status(policy: dict) -> dict:
    selected = policy[policy["backend"]]
    return {
        "projectId": policy["projectId"],
        "backend": policy["backend"],
        "readOnly": policy["readOnly"],
        "allowedOrigins": policy["allowedOrigins"],
        "policySecretValues": False,
        "toolAvailable": command_exists(policy["backend"]),
        "accessTokenPresent": bool(os.environ.get(selected.get("accessTokenEnv", ""))) if policy["backend"] == "bws" else None,
        "itemIdBound": bool(selected.get("itemId")) if policy["backend"] == "bw" else None,
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scoped Solvys Bitwarden helper")
    parser.add_argument("--policy", default=os.environ.get("SOLVYS_BITWARDEN_POLICY"))
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("status")
    command_parser = sub.add_parser("get-options")
    command_parser.add_argument("--target-url", required=True)
    command_parser.add_argument("--credential", choices=("primary", "solvys-override"), default="primary")
    for command in ("get-login", "get-username", "get-password", "get-totp"):
        command_parser = sub.add_parser(command)
        command_parser.add_argument("--target-url", required=True)
        command_parser.add_argument("--credential", choices=("primary", "solvys-override"), default="primary")
        command_parser.add_argument("--options-reviewed", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if not args.policy:
        fail("--policy or SOLVYS_BITWARDEN_POLICY is required")
    policy = load_policy(args.policy)
    if args.command == "status":
        print(json.dumps(status(policy), sort_keys=True))
        return 0
    if args.command == "get-options":
        target_origin = require_target(policy, args.target_url, args.credential)
        if policy["backend"] != "bw":
            fail("Additional Options retrieval requires an official bw login item")
        print(bw_options(policy, target_origin, args.credential))
        return 0
    if policy["version"] == 2 and not args.options_reviewed:
        fail("read Additional Options first, then use --options-reviewed")
    if args.command == "get-totp":
        target_origin = require_target(policy, args.target_url, args.credential)
        if policy["backend"] != "bw":
            fail("current TOTP retrieval requires an official bw login item")
        print(bw_totp(policy, target_origin, args.credential))
        return 0
    login = resolve_login(policy, args.target_url, args.credential)
    if args.command == "get-login":
        print(json.dumps(login, separators=(",", ":")))
    elif args.command == "get-username":
        print(login["username"])
    elif args.command == "get-password":
        print(login["password"])
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except PolicyError as exc:
        print(f"solvys-bitwarden: {exc}", file=sys.stderr)
        raise SystemExit(2)
