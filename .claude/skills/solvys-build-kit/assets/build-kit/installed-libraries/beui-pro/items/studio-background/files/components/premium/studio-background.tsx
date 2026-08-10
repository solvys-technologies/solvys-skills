"use client";

import { forwardRef } from "react";
import {
  DEFAULT_ACTIVE_EFFECTS,
  DEFAULT_ANIMATION,
  DEFAULT_EFFECT_AMOUNTS,
  DEFAULT_PIXEL_SETTINGS,
} from "@/components/app/studio/studio-effect-defaults";
import { StudioRenderer } from "@/components/app/studio/studio-renderer";
import { DEFAULT_STUDIO_SETTINGS } from "@/components/app/studio/studio-runtime-defaults";
import type {
  StudioAnimationSettings,
  StudioDitherAlgorithm,
  StudioEffectId,
  StudioGeneratorId,
  StudioPixelSettings,
  StudioRendererHandle,
  StudioSettings,
} from "@/components/app/studio/studio-types";
import { cn } from "@/lib/utils";

export type StudioBackgroundPreset = {
  version: 3;
  generator: StudioGeneratorId;
  colors: [string, string, string];
  settings?: Partial<StudioSettings>;
  activeEffects?: StudioEffectId[];
  effectAmounts?: Partial<Record<StudioEffectId, number>>;
  pixelSettings?: Partial<StudioPixelSettings>;
  ditherAlgorithm?: StudioDitherAlgorithm;
  animation?: Partial<StudioAnimationSettings>;
};

export type StudioBackgroundProps = {
  preset: StudioBackgroundPreset;
  paused?: boolean;
  className?: string;
};

export const StudioBackground = forwardRef<
  StudioRendererHandle,
  StudioBackgroundProps
>(function StudioBackground({ preset, paused = false, className }, ref) {
  return (
    <StudioRenderer
      ref={ref}
      media={null}
      generator={preset.generator}
      colors={preset.colors}
      settings={{ ...DEFAULT_STUDIO_SETTINGS, ...preset.settings }}
      activeEffects={preset.activeEffects ?? DEFAULT_ACTIVE_EFFECTS}
      effectAmounts={{ ...DEFAULT_EFFECT_AMOUNTS, ...preset.effectAmounts }}
      pixelSettings={{ ...DEFAULT_PIXEL_SETTINGS, ...preset.pixelSettings }}
      ditherAlgorithm={preset.ditherAlgorithm ?? "bayer4"}
      animation={{ ...DEFAULT_ANIMATION, ...preset.animation }}
      effectsVisible
      paused={paused}
      className={cn("absolute inset-0", className)}
    />
  );
});

StudioBackground.displayName = "StudioBackground";
