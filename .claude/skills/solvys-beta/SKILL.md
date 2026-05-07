---
name: solvys-beta
description: Local build, test, and DMG publish to desktop. Like solvys-deploy but ends with a DMG on the desktop instead of a release. Use for local testing before committing to a production deploy.
disable-model-invocation: true
---

# Solvys Beta -- Local Build and DMG Publish

You are a build engineer. Build the app locally, install it, verify it runs, and clean up old artifacts. No releases, no pushes -- this is local only.

**CRITICAL RULES (from operational history):**

- Always `rm -rf dist` in any directory before vite build -- stale bundles have shipped
- Never start a vite dev server -- verify via `tsc --noEmit` + `vite build` only
- Every desktop build must verify install/update scripts match the current version
- Always clear quarantine attributes with `xattr -cr` after DMG install
- Backend is launchd-managed (`io.solvys.fintheon-backend`) -- must unload before restart
- **DMG lands on ~/Desktop every time** -- after electron-builder finishes, delete every prior `Fintheon-*.dmg` on `~/Desktop/` and copy the new one there. TP installs from Desktop; old DMGs confuse it. This applies whether /solvys-beta was asked for or triggered as part of /solvys-deploy's binary-attach step.

---

## Phase 1 -- Pre-flight (Light)

Lighter checks than solvys-deploy. Uncommitted changes are OK for beta builds.

### 1a. Environment

```bash
node --version
bun --version
```

Verify electron-builder is available:

```bash
bunx electron-builder --version 2>/dev/null || echo "electron-builder not found"
```

FAIL if electron-builder is missing.

### 1b. Build Check

```bash
npx tsc --noEmit
```

WARN on type errors (beta builds can proceed with warnings).

### 1c. Version Detection

```bash
VERSION=$(node -p "require('./package.json').version")
echo "Building v$VERSION"
```

### 1d. Install/Update Script Check

Verify install and update scripts reference the current version. WARN if out of date -- beta is a good time to catch this before production.

---

## Phase 2 -- Build

Run the full build pipeline. Always clean dist directories first.

```bash
# 1. Clean stale build artifacts
rm -rf dist frontend/dist mobile/dist

# 2. Build frontend
bun run frontend:build

# 3. Build backend
cd backend-hono && bun run build && cd ..

# 4. Build Mac DMG
bunx electron-builder --mac dmg
```

Report each step as it completes. If any step fails, stop and report the error.

---

## Phase 3 -- DMG Install

```bash
VERSION=$(node -p "require('./package.json').version")
DMG="desktop-dist/Fintheon-${VERSION}-arm64.dmg"

# Verify DMG exists
if [ ! -f "$DMG" ]; then
  echo "FAIL: DMG not found at $DMG"
  exit 1
fi

# Copy to Downloads
cp "$DMG" "$HOME/Downloads/"

# Eject any previously mounted volumes
for vol in /Volumes/Fintheon*; do
  hdiutil detach "$vol" -quiet 2>/dev/null || true
done

# Remove old app
rm -rf /Applications/Fintheon.app /Applications/fintheon.app 2>/dev/null || true

# Mount and install
hdiutil attach "$DMG" -nobrowse -quiet
VOLUME=$(ls -d /Volumes/Fintheon* 2>/dev/null | head -1)
if [ -n "$VOLUME" ]; then
  cp -R "$VOLUME/Fintheon.app" /Applications/
  hdiutil detach "$VOLUME" -quiet
  xattr -cr /Applications/Fintheon.app
  echo "PASS: Installed to /Applications/Fintheon.app"
else
  echo "FAIL: DMG mounted but volume not found"
fi
```

---

## Phase 4 -- Verification

### 4a. App Launch Check

```bash
# Verify the app bundle exists and is signed/cleared
codesign -dv /Applications/Fintheon.app 2>&1 || echo "No code signature (expected for local builds)"
ls -la /Applications/Fintheon.app/Contents/MacOS/
```

### 4b. Local Backend Check

Verify the backend is running (needed for the desktop app):

```bash
curl -s http://localhost:8080/api/diagnostics || echo "Backend not running -- restart with launchctl"
```

If not running:

```bash
launchctl unload ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist 2>/dev/null
launchctl load ~/Library/LaunchAgents/io.solvys.fintheon-backend.plist
```

### 4c. Report

```bash
VERSION=$(node -p "require('./package.json').version")
DMG="desktop-dist/Fintheon-${VERSION}-arm64.dmg"
echo "Version: v$VERSION"
echo "DMG: $DMG"
echo "Size: $(du -h "$DMG" | cut -f1)"
echo "Checksum: $(shasum -a 256 "$DMG" | cut -d' ' -f1)"
```

---

## Phase 5 -- Place DMG on ~/Desktop + Clean Up Old DMGs

Copy the new DMG to `~/Desktop/` so TP can grab it from there. Delete every other `Fintheon-*.dmg` already on the Desktop first — only one DMG ever sits there at a time.

```bash
VERSION=$(node -p "require('./package.json').version")
DMG="desktop-dist/Fintheon-${VERSION}-arm64.dmg"

# 1. MANDATORY: clear any prior Fintheon DMGs off the Desktop (TP installs from here)
find ~/Desktop -maxdepth 1 -name "Fintheon-*.dmg" -type f -delete
echo "Cleared prior Fintheon DMGs from ~/Desktop"

# 2. Copy the new DMG onto the Desktop
cp "$DMG" "$HOME/Desktop/"
echo "Placed ~/Desktop/$(basename $DMG)"

# 3. Clean desktop-dist/ — keep only the current version's DMG
for dmg in desktop-dist/*.dmg; do
  if [[ "$dmg" != *"$VERSION"* ]]; then
    /bin/rm -f "$dmg"
    echo "Removed: $dmg"
  fi
done

# 4. Clean ~/Downloads/ too — harmless if DMG isn't there
for dmg in ~/Downloads/Fintheon-*.dmg; do
  if [[ -e "$dmg" && "$dmg" != *"$VERSION"* ]]; then
    /bin/rm -f "$dmg"
    echo "Removed: $dmg"
  fi
done
```

Verify:

```bash
ls -lh ~/Desktop/Fintheon-*.dmg   # should show exactly one file matching the new $VERSION
```

---

## Output

```
============================================
  BETA BUILD COMPLETE
  {project} v{version} -- {date}
============================================

DMG:             desktop-dist/Fintheon-{version}-arm64.dmg
Desktop copy:    ~/Desktop/Fintheon-{version}-arm64.dmg  (older DMGs cleared)
Size:            {size}
Checksum:        {sha256}
Installed:       /Applications/Fintheon.app
Backend:         localhost:8080 [RUNNING/STOPPED]
Install scripts: [CURRENT/OUTDATED]
Old DMGs removed: {count}

Open the app to verify manually.
```

## Rules

- This skill builds and installs locally. It requires user invocation (disable-model-invocation).
- Never create git tags or GitHub releases from a beta build.
- Never push anything to remote.
- Never start a vite dev server.
- Always `rm -rf dist` before any vite build to prevent stale bundles.
- Always remove the old app from /Applications before installing the new one.
- Always clear quarantine attributes with `xattr -cr`.
- Keep exactly one DMG (current version). Delete all others — including every `Fintheon-*.dmg` already on `~/Desktop/`.
- Copy the new DMG to `~/Desktop/` at the end of every build. No exceptions.
- Verify install/update scripts are current -- flag if outdated.
