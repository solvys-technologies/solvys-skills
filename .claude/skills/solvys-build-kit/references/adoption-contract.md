# Adoption contract

Complete this record before a mature product loads or replaces kit assemblies.

```yaml
buildKit:
  version: ""
  preset: ""
  sourceCommit: ""
  targetRepository: ""
  targetCommit: ""
  destination: ""
  owner: ""
  status: planned
approvedFoundation:
  primaryComponents: {source: "", revision: "", license: "", status: not_applicable}
  motion: {source: "", revision: "", license: "", status: not_applicable}
  visualization: {source: "", revision: "", license: "", status: not_applicable}
protectedZones: []
replacedOwners: []
proof:
  typecheck: pending
  componentContracts: pending
  desktopInteraction: pending
  mobileInteraction: pending
  keyboardAndFocus: pending
  reducedMotion: pending
  chatgptSite: pending
  humanReview: pending
rollback: {backupPath: "", restoreCommand: ""}
```

## No-fit exception

Record an exception only after the approved source hierarchy and current repository source have no eligible owner.

```yaml
noFitException:
  requestedSurface: ""
  searchedSources: []
  rejectionReasons: []
  customOwner: ""
  maintenanceCost: ""
  protectedZones: []
  acceptanceProof: []
```
