# Bitwarden policy contract

The policy is a routing contract. It contains no credential values. Keep the
live file in the project Cabinet or in the local Factory configuration path.
Commit only the example shape and non-secret provenance.

## Required fields

```json
{
  "version": 2,
  "projectId": "project-slug",
  "backend": "bw",
  "readOnly": true,
  "allowedOrigins": ["https://login.example.com"],
  "bws": {
    "projectId": "40000000-0000-4000-8000-000000000000",
    "secretIds": {
      "username": "40000000-0000-4000-8000-000000000001",
      "password": "40000000-0000-4000-8000-000000000002",
      "totp": "40000000-0000-4000-8000-000000000003"
    },
    "accessTokenEnv": "BWS_ACCESS_TOKEN"
  },
  "bw": {
    "itemId": "40000000-0000-4000-8000-000000000004",
    "itemName": "project-repository-name",
    "keychainAccount": "solvys-project",
    "keychainService": "com.solvys.bitwarden.project",
    "appDataDir": "/Users/user/.config/solvys-factory/bitwarden/project",
    "syncOnRead": false
  },
  "metadata": {
    "repositoryName": "project-repository-name",
    "accountLabel": "project Google identity",
    "rotationOwner": "Solvys Factory",
    "expiry": "2026-12-31"
  },
  "solvysOverride": {
    "itemId": "40000000-0000-4000-8000-000000000005",
    "itemName": "Solvys Override",
    "providers": ["provider-name"],
    "allowedOrigins": ["https://provider.example.com"],
    "trigger": "primary-resource-absent"
  }
}
```

`backend` selects `bws` or `bw`. The selected backend's block is required. A
`bws` policy must use a machine-account project and read-only access token. A
`bw` policy must bind one item ID, the exact repository-name item title, and
one project-specific Keychain reference.
The helper rejects policies that set `readOnly` to false, use wildcard origins,
use a global `codex`/`bw-master` reference, or omit the target mapping.

## Repository-item and override rules

The `metadata.repositoryName` value and `bw.itemName` value must match exactly.
The item ID stays pinned, so a duplicate item with the same title cannot take
over retrieval.

The login item's Additional Options note is an active part of the policy. Read
it through `get-options` before a credential command. It may limit a provider,
name a text-contact fallback, or forbid a shared-account fallback. Keep its
contents out of receipts, prompts, source, logs, screenshots, and chat.

`solvysOverride` is optional. When present, it names the single shared item as
`Solvys Override`, its allowed providers, and exact provider origins. It can be
used only after the primary identity visibly lacks the requested resource.
The policy must never treat a missing page, a timeout, or an unverified UI as
proof that the primary identity lacks access.

## Runtime secret names

The Factory records names only:

- `BWS_ACCESS_TOKEN` for a Bitwarden Secrets Manager machine account.
- `BITWARDENCLI_APPDATA_DIR` for a project-isolated official Bitwarden CLI
  state directory.
- `SOLVYS_BITWARDEN_POLICY` for the policy path when a command flag is not used.

The `bw` fallback obtains the project-specific master password from the
approved Keychain item at runtime. The Factory does not store that value.

## Origin rule

Every retrieval requires `--target-url`. Parse its scheme, hostname, and port.
Require `https` and an exact match to one `allowedOrigins` entry. Never accept
wildcards, user info, an HTTP origin, or a redirect host that is not listed.

## Receipt fields

Store project ID, backend, policy path, target origin, account label, secret
names or IDs, scope, expiry, timestamp, tool version, proof rung, and human
gate. Leave values, tokens, cookies, MFA codes, and browser storage out.
