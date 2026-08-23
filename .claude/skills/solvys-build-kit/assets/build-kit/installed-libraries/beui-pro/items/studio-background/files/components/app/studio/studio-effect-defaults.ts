import type {
  StudioAnimationSettings,
  StudioEffectId,
  StudioPixelSettings,
} from "./studio-types";

export const DEFAULT_EFFECT_AMOUNTS: Record<StudioEffectId, number> = {
  pixelate: 40,
  dither: 72,
  posterize: 58,
  "edge-glow": 48,
  "pixel-sort": 42,
  led: 72,
  "rgb-split": 34,
  glitch: 42,
  scanlines: 28,
  grain: 18,
  duotone: 76,
};

export const DEFAULT_PIXEL_SETTINGS: StudioPixelSettings = {
  size: 34,
  density: 56,
  exposure: 50,
  scatter: 0,
  opacity: 100,
};

export const DEFAULT_ANIMATION: StudioAnimationSettings = {
  preset: "none",
  pace: 36,
  intensity: 28,
};

export const DEFAULT_ACTIVE_EFFECTS: StudioEffectId[] = ["grain"];
