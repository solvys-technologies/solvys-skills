---
name: solvys-avatar-forge
description: Create CSS-driven 8-bit mascot/avatar scenes like the Fintheon CAO. Use when designing, prototyping, or integrating pixel avatars with themed fur, suit, prop, desk, elevator, laptop, drawer, and accent colors controlled by CSS variables.
version: 0.1.0
---

# Solvys Avatar Forge

## Solvys Ponytail Chain

- After reading repo truth and tracing the real flow, run the ladder: necessary at all, existing repo seam, stdlib/native platform, installed dependency or maintained OSS, one-line/minimal code.
- Keep OSS-first pragmatic: adopt OSS only when license, maintenance, security, runtime fit, and integration cost beat owning custom code.
- For backend bugs, grep sibling callers and fix the root shared seam once; a tiny patch in the wrong path is still wrong.
- Never skip validation, auth/security, data-loss handling, accessibility, calibration knobs, explicit requirements, or proof.
- Non-trivial logic leaves the smallest runnable check or product proof that would catch a regression.


Build polished 8-bit avatar scenes that feel native to Solvys products: restrained, sharp, a little funny, and fully themeable through CSS variables.

Use this skill for avatar mascots, CAO-style workspace greetings, composer-top walk cycles, drawer reactions, desk/laptop scenes, and other product micro-scenes where the character must sit inside real UI hierarchy.

## Core Contract

- Prototype first in a standalone HTML file or isolated route before app integration.
- Keep the avatar CSS-driven unless the app already has a sprite/Canvas pipeline.
- Make color swaps through CSS variables. Never hardcode product-theme accents into body parts.
- Preserve UI hierarchy before animation flair. Composer, drawer, desk, laptop, and avatar layers must stack correctly.
- Use visible, inspectable pixel blocks. Avoid blurry transforms, gradients, shadows, and mascot gloss.
- The avatar may be expressive, but not cute-by-default. Push toward composed, sharp, robotic, suited, and slightly absurd.

## Theme Variables

Expose these tokens on the avatar root, then map them to app theme tokens:

```css
.solvys-avatar {
  --avatar-theme-color: var(--primary, #c79f4a);
  --avatar-fur: #e4d0ad;
  --avatar-fur-shadow: #b79b72;
  --avatar-ear-accent: var(--avatar-theme-color);
  --avatar-eye-iris: #b78b38;
  --avatar-eye-pupil: #050402;
  --avatar-suit: #56606c;
  --avatar-suit-shadow: #313842;
  --avatar-shirt: #050402;
  --avatar-attire-accent: var(--avatar-theme-color);
  --avatar-desk: var(--avatar-theme-color);
  --avatar-floor-number: var(--avatar-theme-color);
  --avatar-laptop: #5b6572;
  --avatar-laptop-edge: #111418;
  --avatar-briefcase-a: #111418;
  --avatar-briefcase-b: #4b535e;
  --avatar-briefcase-edge: #050402;
  --avatar-impact: var(--avatar-theme-color);
}
```

Rules:

- Fur, suit, shirt, iris, briefcase, desk, floor number, and accent colors should be swappable.
- Keep pure functional neutrals stable: outlines, pupils, laptop edge, key black gaps, and light grey highlights.
- If the user asks for brand-inspired prints, use generic two-tone geometry. Do not include brand logos or monograms.
- Use CSS vars for every repeated color, even in pseudo-elements and keyframe-visible states.

## Avatar Anatomy

Build from blocky parts with stable dimensions:

- `avatar-root`: positioned relative; defines tokens, scale, and scene phase classes.
- `avatar-body`: torso, suit, shirt, tie/accent, shoulders.
- `avatar-head`: fur block, snout, nose, ears, glasses, eyes.
- `avatar-arms`: separate left/right arm rigs so props stay attached during motion.
- `avatar-legs`: step rigs with equal-distance stride frames.
- `avatar-props`: briefcase, laptop, desk, elevator/floor plate, impact spokes.
- `avatar-occluders`: desk/composer masks that hide body parts behind UI surfaces.

For profile-to-front changes, swap sprite positioning or mirrored blocks. Do not skew the character unless the user explicitly wants smear-frame stylization.

## Scene Workflow

1. Define the scene in plain language:
   - entrance surface
   - walking path
   - prop interaction
   - seated/idle ending
   - UI surfaces that must occlude the avatar
2. Create a standalone prototype:
   - real-ish composer/input dimensions
   - test backdrop matching the destination UI
   - debug controls for replay and theme color
   - optional keyboard toggle such as `Opt + Right Cmd`
3. Tune timing from user-visible keyframes:
   - entrance
   - first step
   - walk stop
   - jump/slam/prop contact
   - landing
   - seat/desk arrival
   - prop open
   - laptop/drawer motion
   - final idle
4. Port only after the prototype is accepted.
5. Validate in the real app surface with screenshots at desktop and tablet widths.

## Motion Rules

- No teleportation. Every position change must be covered by a keyframe or phase change.
- No fade in/out for the character unless the scene explicitly disappears.
- Stride distance must be consistent once the avatar starts walking.
- Props stay physically attached to the hand until contact/release.
- For dramatic swings, rotate a hand/prop rig around the shoulder/hand origin. The prop should rotate with the arm, not orbit like a detached wheel.
- Use short impact effects from the actual contact point: thin spokes, not chunky starbursts.
- Use `steps()` only where it improves the pixel read. Natural motion can use linear/eased transforms if the sprite remains crisp.
- Add `prefers-reduced-motion` handling that either disables the scene or jumps to the final idle pose.

## Layering Rules

Treat the surrounding UI as the stage, not background decoration.

Stack typical desk/composer scenes like this:

1. composer/input bar or floor line
2. walking avatar and elevator while entering
3. desk surface/occluder once seated
4. laptop or drawer surface
5. final eyes/glasses/ears if they intentionally peek above the laptop

Drawer scenes:

- Drawers remain connected to the composer/input bar.
- Drawers slide in front of the avatar if opened after the greeting.
- Do not let avatar wrappers create masks, fades, or full-width strips that disturb composer/drawer geometry.

Desk scenes:

- The desk top owns the floor once the avatar sits.
- Lower body, legs, and torso must be hidden behind the desk when appropriate.
- Before the laptop opens, a small upper torso/head band may show behind the desk if the scene needs it.
- Final laptop state should not visually shrink the avatar; the laptop lid should cover the full body width.

## Fintheon CAO Reference

When working in Fintheon, the canonical shipped reference is:

- prototype: `cao-wolf-chat-prototype.html`
- app component: `frontend/components/narrative/NarrativeCaoWolfAvatar.tsx`
- app CSS: `frontend/components/narrative/cao-wolf-avatar.css`

The CAO scene contract:

- 8-bit robotic wolf in a suit.
- Elevator with themed floor number.
- Natural walk across the composer top.
- Briefcase slam, briefcase open, laptop slide/open.
- Final stack: desk, laptop, eyes/glasses, ears.
- Accent, desk, attire, ear, and floor colors follow the user's primary theme color.

## Acceptance Checklist

- Color tokens can swap fur, suit, shirt, eyes, props, desk, and accents without editing keyframes.
- Neutral greys/whites/blacks that should stay fixed do stay fixed.
- Character is visibly the intended animal/persona at rest and in profile.
- First step reads naturally; no dead first step.
- No extra baby step or pause before a jump/action beat.
- Prop stays attached to the hand until the intended release/contact frame.
- Desk/composer/drawer hierarchy is correct in screenshots.
- Final idle pose is the intended stack, with no stray torso/legs in front.
- `git diff --check` passes.
- Browser preview is inspected after significant animation changes.
