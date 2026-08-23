# Dual Project Specification Map Contract

Every project keeps two physical maps. A pointer without both readable files fails custody.

## Canonical Cabinet map

Store this human-readable JSON document in the project's Codex Cabinet documentation:

```json
{
  "version": 1,
  "project": "project-id",
  "revision": "12",
  "integrityLinkId": "project-id-spec-12",
  "clientObjective": {"id": "objective-id", "statement": "Observable client outcome"},
  "userJourneys": [{"id": "journey-id", "statement": "Full entry-to-result journey"}],
  "technicalMap": {
    "path": "/absolute/codebase/project-specification-map.json",
    "revision": "12",
    "integrityLinkId": "project-id-spec-12",
    "sha256": "64-lowercase-hex"
  }
}
```

## Technical codebase map

Store this machine-readable JSON document inside the respective internal, external, or exported codebase folder:

```json
{
  "version": 1,
  "project": "project-id",
  "revision": "12",
  "integrityLinkId": "project-id-spec-12",
  "canonicalMap": {
    "path": "/absolute/Codex-Cabinet/project-specification-map.json",
    "revision": "12",
    "integrityLinkId": "project-id-spec-12"
  },
  "objectives": [{
    "id": "objective-id",
    "journeys": [{
      "id": "journey-id",
      "subJourneys": [{
        "id": "task-sub-journey-id",
        "acceptanceCriteria": [{"id": "criterion-id"}],
        "validationGates": [{"id": "gate-id"}],
        "resources": [{"id": "resource-id", "location": "/authoritative/location"}]
      }],
      "regressionJourneys": [{"id": "regression-id"}]
    }]
  }],
  "progress": {"revision": "progress-7", "state": "in-progress"}
}
```

## Compact worktree context

Send only the current task package. Do not send a generic transcript.

```json
{
  "version": 1,
  "specificationMaps": {
    "revision": "12",
    "integrityLinkId": "project-id-spec-12",
    "cabinet": {"path": "/absolute/Codex-Cabinet/project-specification-map.json", "sha256": "64-lowercase-hex"},
    "technical": {"path": "/absolute/codebase/project-specification-map.json", "sha256": "64-lowercase-hex"}
  },
  "parentObjectiveId": "objective-id",
  "parentJourneyId": "journey-id",
  "taskSubJourneyId": "task-sub-journey-id",
  "acceptanceCriterionIds": ["criterion-id"],
  "validationGateIds": ["gate-id"],
  "authoritativeResources": [{"id": "resource-id", "location": "/authoritative/location"}],
  "progressRevision": "progress-7",
  "regressionJourneyIds": ["regression-id"],
  "testDataBoundary": {"mode": "fixture", "allowed": ["named-fixture"]},
  "approvalPosture": {"routine": "full", "actions": ["implementation", "testing", "debugging", "restart", "validation"]},
  "genuineHumanOnlyGates": [],
  "requiredSkills": ["solvys-audit", "solvys-user-testing"],
  "acceptanceBranch": "2026-08-11",
  "nextAction": "Run the inherited sub-journey."
}
```
