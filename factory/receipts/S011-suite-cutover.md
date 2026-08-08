# S011 - Solvys Factory suite cutover

Date: 2026-08-08
State: accepted for daily integration

## Outcome

The `solvys-skills` repository now carries the turnkey Solvys Factory suite:
the Operations Handbook, PL/PM/DEV/CAO signs, mandatory first-install
orientation, Welcome Mat entrance, Stack Interview contract, schemas,
templates, model lanes, work windows, proof gates, and global installer.

## Distribution boundary

The repository carries reusable doctrine and blank records. Live client paths,
provider IDs, account identities, task IDs, credentials, branches, and custody
state stay in each team's protected local Factory instance.

## Proof

- Every packaged skill passed the skill-creator validator.
- Solvys CAO canon validation passed.
- JSON and YAML records parsed successfully.
- Shell scripts passed syntax validation.
- The installer passed in a disposable isolated home.
- The installer registered the suite and mandatory orientation on the primary
  development Mac without replacing unknown state in place.
- Repository scans found no credential values, private keys, client provider
  identifiers, or live task IDs in the distributable suite.

## Protected zones

- Product operations remain paused until TP gives the recommencement cue.
- Dirty or active product worktrees were not mutated.
- Client/provider state stays in protected local Cabinet custody.
- Replaced global skill paths remain recoverable in timestamped installer
  backups.
