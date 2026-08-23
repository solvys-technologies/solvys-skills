"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_ACTIVE_EFFECTS,
  DEFAULT_ANIMATION,
  DEFAULT_EFFECT_AMOUNTS,
  DEFAULT_PIXEL_SETTINGS,
} from "./studio-effect-defaults";
import {
  createStudioFrameLoop,
  needsContinuousStudioFrames,
  recordStudioCanvas,
  STUDIO_EXPORT_FPS,
  STUDIO_PREVIEW_FPS,
  type StudioFrameLoop,
} from "./studio-render-performance";
import { GENERATOR_INDEX } from "./studio-shader-source";
import type { StudioRendererHandle, StudioRendererProps } from "./studio-types";
import {
  createStudioWebglResources,
  hexToRgb,
  type StudioUniform,
  type StudioWebglResources,
  studioMediaAspect,
} from "./studio-webgl-renderer";

type RendererContext = StudioWebglResources & {
  loop: StudioFrameLoop;
};

const EFFECT_UNIFORM = {
  pixelate: "uPixelate",
  dither: "uDither",
  posterize: "uPosterize",
  "edge-glow": "uEdgeGlow",
  "pixel-sort": "uPixelSort",
  led: "uLed",
  "rgb-split": "uRgbSplit",
  glitch: "uGlitch",
  scanlines: "uScanlines",
  duotone: "uDuotone",
} as const;

const MOTION_INDEX = {
  none: 0,
  breathe: 1,
  drift: 2,
  sweep: 3,
  pulse: 4,
  orbit: 5,
  twist: 6,
  tide: 7,
} as const;
const DITHER_INDEX = { bayer4: 0, bayer8: 1, noise: 2 } as const;

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export const StudioRenderer = forwardRef<
  StudioRendererHandle,
  StudioRendererProps
>(function StudioRenderer(
  {
    media,
    generator,
    colors,
    settings,
    activeEffects = DEFAULT_ACTIVE_EFFECTS,
    effectAmounts = DEFAULT_EFFECT_AMOUNTS,
    pixelSettings = DEFAULT_PIXEL_SETTINGS,
    ditherAlgorithm = "bayer4",
    animation = DEFAULT_ANIMATION,
    paused,
    effectsVisible = true,
    renderContinuously = true,
    className,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<RendererContext | null>(null);
  const initialGeneratorRef = useRef(generator);
  const mediaRef = useRef(media);
  const pausedRef = useRef(paused);
  const timeRef = useRef({ elapsed: 0, previous: 0 });
  const exportingPngRef = useRef(false);
  const exportingVideoRef = useRef(false);
  const continuousFramesRef = useRef(
    needsContinuousStudioFrames({
      activeEffects,
      animationPreset: animation.preset,
      effectsVisible,
      grain: settings.grain,
      mediaKind: media?.kind ?? null,
      renderContinuously,
    }),
  );
  const [rendererError, setRendererError] = useState(false);

  useImperativeHandle(ref, () => ({
    async exportPng(filename = "beui-studio.png", width = 3840, height = 2160) {
      const context = contextRef.current;
      if (!context) return false;
      const bounds = context.canvas.getBoundingClientRect();
      let blob: Blob | null = null;
      exportingPngRef.current = true;
      context.loop.sync();
      try {
        context.resize(width, height, 1);
        context.render();
        context.renderer.gl.finish();
        blob = await new Promise<Blob | null>((resolve) =>
          context.canvas.toBlob(resolve, "image/png"),
        );
      } finally {
        context.resize(bounds.width, bounds.height);
        context.render();
        exportingPngRef.current = false;
        context.loop.sync();
      }
      if (!blob) return false;
      triggerDownload(blob, filename);
      return true;
    },
    async exportWebm(filename = "beui-studio.webm", durationMs = 5000) {
      const context = contextRef.current;
      if (!context) return false;
      const blob = await recordStudioCanvas(
        context.canvas,
        durationMs,
        (recording) => {
          exportingVideoRef.current = recording;
          context.loop.sync();
        },
      );
      if (!blob) return false;
      triggerDownload(blob, filename);
      return true;
    },
  }));

  useEffect(() => {
    mediaRef.current = media;
    const context = contextRef.current;
    if (!context) return;
    const uniforms = context.program.uniforms as Record<string, StudioUniform>;
    if (media) {
      context.texture.image = media.element;
      context.texture.needsUpdate = true;
      uniforms.uHasSource.value = 1;
      uniforms.uSourceAspect.value = studioMediaAspect(media);
    } else {
      uniforms.uHasSource.value = 0;
    }
    context.render();
    context.loop.sync();
  }, [media]);

  useEffect(() => {
    pausedRef.current = paused;
    contextRef.current?.loop.sync();
  }, [paused]);

  useEffect(() => {
    continuousFramesRef.current = needsContinuousStudioFrames({
      activeEffects,
      animationPreset: animation.preset,
      effectsVisible,
      grain: settings.grain,
      mediaKind: media?.kind ?? null,
      renderContinuously,
    });
    contextRef.current?.loop.sync();
  }, [
    activeEffects,
    animation.preset,
    effectsVisible,
    media?.kind,
    renderContinuously,
    settings.grain,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let resources: StudioWebglResources;
    try {
      resources = createStudioWebglResources({
        container,
        generator: initialGeneratorRef.current,
      });
    } catch {
      setRendererError(true);
      return;
    }
    const { program, resize, texture } = resources;
    let pageVisible = !document.hidden;
    let stageVisible = true;
    const render = (now: number) => {
      const timing = timeRef.current;
      if (!timing.previous) timing.previous = now;
      if (!pausedRef.current)
        timing.elapsed += Math.min(40, now - timing.previous);
      timing.previous = now;
      (program.uniforms.uTime as StudioUniform).value = timing.elapsed / 1000;
      if (mediaRef.current?.kind === "video") texture.needsUpdate = true;
      if (!resources.render()) {
        throw new Error("The Studio WebGL context is unavailable");
      }
    };
    const loop = createStudioFrameLoop({
      getFps: () =>
        exportingVideoRef.current ? STUDIO_EXPORT_FPS : STUDIO_PREVIEW_FPS,
      onError: () => setRendererError(true),
      render,
      shouldRun: () =>
        !exportingPngRef.current &&
        pageVisible &&
        stageVisible &&
        (exportingVideoRef.current ||
          (!pausedRef.current && continuousFramesRef.current)),
    });
    contextRef.current = { ...resources, loop };
    if (mediaRef.current) {
      texture.image = mediaRef.current.element;
      texture.needsUpdate = true;
      (program.uniforms.uHasSource as StudioUniform).value = 1;
      (program.uniforms.uSourceAspect as StudioUniform).value =
        studioMediaAspect(mediaRef.current);
    }
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    const intersectionObserver =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            stageVisible = entry?.isIntersecting ?? true;
            loop.sync();
          });
    intersectionObserver?.observe(container);
    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      loop.sync();
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      loop.dispose();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      setRendererError(true);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    resources.canvas.addEventListener("webglcontextlost", handleContextLost);
    setRendererError(false);
    resize();
    loop.sync();
    return () => {
      loop.dispose();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resources.canvas.removeEventListener(
        "webglcontextlost",
        handleContextLost,
      );
      contextRef.current = null;
      resources.dispose();
    };
  }, []);

  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;
    try {
      context.setGenerator(generator);
      const uniforms = context.program.uniforms as Record<
        string,
        StudioUniform
      >;
      uniforms.uGenerator.value = GENERATOR_INDEX[generator];
      uniforms.uColorA.value = hexToRgb(colors[0]);
      uniforms.uColorB.value = hexToRgb(colors[1]);
      uniforms.uColorC.value = hexToRgb(colors[2]);
      uniforms.uSpeed.value = settings.speed / 100;
      uniforms.uScale.value = settings.scale / 100;
      uniforms.uDetail.value = settings.detail / 100;
      uniforms.uDistortion.value = settings.distortion / 100;
      uniforms.uGlow.value = settings.glow / 100;
      uniforms.uGrain.value = activeEffects.includes("grain")
        ? Math.max(settings.grain, effectAmounts.grain) / 100
        : settings.grain / 100;
      uniforms.uVignette.value = settings.vignette / 100;
      uniforms.uBrightness.value = settings.brightness / 100;
      uniforms.uContrast.value = settings.contrast / 100;
      uniforms.uSaturation.value = settings.saturation / 100;
      uniforms.uHue.value = (settings.hue / 180) * Math.PI;
      for (const [effect, uniform] of Object.entries(EFFECT_UNIFORM)) {
        uniforms[uniform].value = activeEffects.includes(
          effect as keyof typeof EFFECT_UNIFORM,
        )
          ? effectAmounts[effect as keyof typeof EFFECT_UNIFORM] / 100
          : 0;
      }
      uniforms.uPixelSize.value = pixelSettings.size / 100;
      uniforms.uDensity.value = pixelSettings.density / 100;
      uniforms.uExposure.value = (pixelSettings.exposure - 50) / 100;
      uniforms.uScatter.value = pixelSettings.scatter / 100;
      uniforms.uPixelOpacity.value = pixelSettings.opacity / 100;
      uniforms.uDitherAlgorithm.value = DITHER_INDEX[ditherAlgorithm];
      uniforms.uAnimationPreset.value = MOTION_INDEX[animation.preset];
      uniforms.uAnimationPace.value = animation.pace / 100;
      uniforms.uAnimationIntensity.value = animation.intensity / 100;
      uniforms.uEffectsVisible.value = effectsVisible ? 1 : 0;
      if (!context.render()) {
        throw new Error("The Studio WebGL context is unavailable");
      }
    } catch {
      context.loop.dispose();
      setRendererError(true);
    }
  }, [
    activeEffects,
    animation,
    colors,
    ditherAlgorithm,
    effectAmounts,
    effectsVisible,
    generator,
    pixelSettings,
    settings,
  ]);

  const updatePointer = (clientX: number, clientY: number) => {
    const context = contextRef.current;
    if (!context) return;
    const bounds = context.canvas.getBoundingClientRect();
    const pointer = (context.program.uniforms.uPointer as StudioUniform)
      .value as Float32Array;
    pointer[0] = (clientX - bounds.left) / Math.max(1, bounds.width);
    pointer[1] = 1 - (clientY - bounds.top) / Math.max(1, bounds.height);
  };

  return (
    <div
      ref={containerRef}
      data-studio-renderer-state={rendererError ? "unavailable" : "ready"}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onPointerLeave={() => {
        const pointer = (
          contextRef.current?.program.uniforms.uPointer as StudioUniform
        )?.value as Float32Array | undefined;
        if (pointer) pointer.set([0.5, 0.5]);
      }}
      className={cn(
        "relative size-full overflow-hidden bg-[#080909]",
        className,
      )}
    />
  );
});

StudioRenderer.displayName = "StudioRenderer";

export type {
  StudioGeneratorId,
  StudioMedia,
  StudioRendererHandle,
  StudioRendererProps,
  StudioSettings,
} from "./studio-types";
