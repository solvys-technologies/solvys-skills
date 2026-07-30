# Bookmark Skills Validation Queue

This queue captures bookmark-driven skills additions that should be tested before being folded into broader Solvys workflows.

## Adopt Now

### Browserbase / browser-to-api planning check

- Status: `SKILLS-ADDITION`
- Why now: bookmark-driven work often hits scraping, auth-gated research, and third-party workflow capture. The first planning pass should decide whether browser driving, browser-to-API extraction, or a direct API path is the right move.
- Add to planning language: "For this source, decide first whether the stable path is browser automation, browser-to-api extraction, or a direct API integration."
- Source: `@derekmeegan` browser-to-api and `@JaySahnan` company-research reference

### README presentation upgrades

- Status: `SKILLS-ADDITION`
- Why now: stronger repo presentation helps agents and humans pick the right skill faster.
- Adopted in this pass: bookmark workflow section and compatibility note.
- Source: `@reallynattu`

## Validate First

### Kappaemme complexity hotspot workflow

- Status: `TEST / VALIDATE`
- Validation target: confirm whether the workflow reliably flags render-heavy paths, repeated lookups, and N+1 style hotspots without producing noisy generic advice.
- Good fit if validated: code-review or performance-audit skills.
- Source: `@Kappaemme1926`

### OfficeCLI deterministic document editing

- Status: `TEST / VALIDATE`
- Validation target: confirm whether the binary can create and update `.docx`, `.xlsx`, and `.pptx` files with deterministic JSON output in this local environment.
- Good fit if validated: document-production, spreadsheet, and presentation workflows.
- Source: `@_vmlops`

## Pass For Now

### Runtime-specific skill packs

- Status: `PASS / ARCHIVE`
- Reason: useful ideas can be borrowed, but Solvys skills should stay runtime-neutral and should not imply a single active agent runtime.

## Planning Reminder

When a bookmark is selected during sprint planning, use the explicit pickup sentence:

> Per your bookmarks, we could use ____, a ____ repo/platform/tool that ____. Link: ____.
