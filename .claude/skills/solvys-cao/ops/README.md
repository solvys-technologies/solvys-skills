# CAO Storage Operations

These files define policy and inventory inputs for the Terra daily storage
task. The user-facing inventory and every action receipt stay inside the
scheduled Codex task.

- `storage-policy.json` is the approved machine-readable boundary.
- `tranche-registry.json` records execution lanes and workspace lifecycle.
- `../scripts/storage_inventory.py` performs read-only bounded measurement.

Sanitation roots are closed by default. Terra may act only on an exact path
derived from an enabled `sanitationRules` entry or an explicit
`tranche-registry.json` `sanitationPaths` value. Parent roots are classification
boundaries, not blanket recursive-delete authority. `hardDenyRoots` always win.

The scheduled task may read these files. It does not write reports here.
Policy changes happen in an explicitly authorized CAO session, never from
inside the scheduled task.
