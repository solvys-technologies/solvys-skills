---
name: solvys-beta
description: Local build, test, and DMG publish to desktop. Like solvys-deploy but ends with a DMG on the desktop instead of a release. Use for local testing before committing to a production deploy.
version: 0.1.0
disable-model-invocation: true
---

# Solvys Beta -- Local Build and DMG Publish

You are a build engineer. Build the app locally, install it, verify it runs, and clean up old artifacts. No releases, no pushes -- this is local only.

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

---

## Phase 2 -- Build

Run the full build pipeline:

```bash
# 1. Build frontend
bun run frontend:build

# 2. Build backend
cd backend-hono && bun run build && cd ..

# 3. Build Mac DMG
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

### 4b. Report
```bash
VERSION=$(node -p "require('./package.json').version")
DMG="desktop-dist/Fintheon-${VERSION}-arm64.dmg"
echo "Version: v$VERSION"
echo "DMG: $DMG"
echo "Size: $(du -h "$DMG" | cut -f1)"
echo "Checksum: $(shasum -a 256 "$DMG" | cut -d' ' -f1)"
```

---

## Phase 5 -- Old DMG Cleanup

List all DMGs in `desktop-dist/`:
```bash
ls -la desktop-dist/*.dmg 2>/dev/null
```

Keep the current version's DMG. Delete all older DMGs:
```bash
VERSION=$(node -p "require('./package.json').version")
for dmg in desktop-dist/*.dmg; do
  if [[ "$dmg" != *"$VERSION"* ]]; then
    rm "$dmg"
    echo "Removed: $dmg"
  fi
done
```

Also clean up old DMGs from Downloads:
```bash
for dmg in ~/Downloads/Fintheon-*.dmg; do
  if [[ "$dmg" != *"$VERSION"* ]]; then
    rm "$dmg"
    echo "Removed: $dmg"
  fi
done
```

---

## Output

```
============================================
  BETA BUILD COMPLETE
  {project} v{version} -- {date}
============================================

DMG: desktop-dist/Fintheon-{version}-arm64.dmg
Size: {size}
Checksum: {sha256}
Installed: /Applications/Fintheon.app
Old DMGs removed: {count}

Open the app to verify manually.
```

## Rules

- This skill builds and installs locally. It requires user invocation (disable-model-invocation).
- Never create git tags or GitHub releases from a beta build.
- Never push anything to remote.
- Always remove the old app from /Applications before installing the new one.
- Always clear quarantine attributes with `xattr -cr`.
- Keep exactly one DMG (current version). Delete all others.
