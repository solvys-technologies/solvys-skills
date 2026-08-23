import type {
  StudioAnimationSettings,
  StudioEffectId,
  StudioMedia,
} from "./studio-types";

export const STUDIO_PREVIEW_FPS = 30;
export const STUDIO_EXPORT_FPS = 60;
export const STUDIO_PREVIEW_PIXEL_BUDGET = 1920 * 1080;

const MAX_PREVIEW_DPR = 2;
const MIN_PREVIEW_DPR = 0.5;
const TIME_DRIVEN_EFFECTS = new Set<StudioEffectId>([
  "glitch",
  "grain",
  "pixel-sort",
]);

export function getAdaptiveStudioDpr({
  width,
  height,
  devicePixelRatio,
  pixelBudget = STUDIO_PREVIEW_PIXEL_BUDGET,
}: {
  width: number;
  height: number;
  devicePixelRatio: number;
  pixelBudget?: number;
}) {
  const cssPixels = Math.max(1, width) * Math.max(1, height);
  const budgetDpr = Math.sqrt(Math.max(1, pixelBudget) / cssPixels);
  return Math.max(
    MIN_PREVIEW_DPR,
    Math.min(Math.max(1, devicePixelRatio), MAX_PREVIEW_DPR, budgetDpr),
  );
}

export function needsContinuousStudioFrames({
  activeEffects,
  animationPreset,
  effectsVisible,
  grain,
  mediaKind,
  renderContinuously,
}: {
  activeEffects: readonly StudioEffectId[];
  animationPreset: StudioAnimationSettings["preset"];
  effectsVisible: boolean;
  grain: number;
  mediaKind: StudioMedia["kind"] | null;
  renderContinuously: boolean;
}) {
  if (!renderContinuously) return false;
  if (mediaKind === null || mediaKind === "video") return true;
  if (animationPreset !== "none") return true;
  if (!effectsVisible) return false;
  if (grain > 0) return true;
  return activeEffects.some((effect) => TIME_DRIVEN_EFFECTS.has(effect));
}

type StudioFrameLoopOptions = {
  cancelFrame?: (frame: number) => void;
  getFps: () => number;
  onError?: (error: unknown) => void;
  render: (now: number) => void;
  requestFrame?: (callback: FrameRequestCallback) => number;
  shouldRun: () => boolean;
};

export type StudioFrameLoop = {
  dispose: () => void;
  sync: () => void;
};

export async function recordStudioCanvas(
  canvas: HTMLCanvasElement,
  durationMs: number,
  onRecordingChange: (recording: boolean) => void,
) {
  if (typeof MediaRecorder === "undefined") return null;
  const mimeType = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ].find((type) => MediaRecorder.isTypeSupported(type));
  if (!mimeType) return null;

  const stream = canvas.captureStream(STUDIO_EXPORT_FPS);
  const chunks: Blob[] = [];
  let recorder: MediaRecorder;
  try {
    recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 12_000_000,
    });
  } catch {
    for (const track of stream.getTracks()) track.stop();
    return null;
  }

  onRecordingChange(true);
  try {
    return await new Promise<Blob | null>((resolve) => {
      let settled = false;
      const settle = (blob: Blob | null) => {
        if (settled) return;
        settled = true;
        for (const track of stream.getTracks()) track.stop();
        resolve(blob);
      };
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size) chunks.push(event.data);
      });
      recorder.addEventListener(
        "stop",
        () => {
          const blob = new Blob(chunks, { type: mimeType });
          settle(blob.size ? blob : null);
        },
        { once: true },
      );
      recorder.addEventListener("error", () => settle(null), { once: true });
      try {
        recorder.start(250);
      } catch {
        settle(null);
        return;
      }
      window.setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, durationMs);
    });
  } finally {
    onRecordingChange(false);
  }
}

export function createStudioFrameLoop({
  cancelFrame = cancelAnimationFrame,
  getFps,
  onError,
  render,
  requestFrame = requestAnimationFrame,
  shouldRun,
}: StudioFrameLoopOptions): StudioFrameLoop {
  let disposed = false;
  let failed = false;
  let frame: number | null = null;
  let lastRenderedAt: number | null = null;

  const cancelPendingFrame = () => {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    lastRenderedAt = null;
  };

  const tick = (now: number) => {
    frame = null;
    if (disposed || failed || !shouldRun()) {
      lastRenderedAt = null;
      return;
    }

    const interval = 1000 / Math.max(1, getFps());
    const elapsed =
      lastRenderedAt === null ? Number.POSITIVE_INFINITY : now - lastRenderedAt;
    if (elapsed >= interval - 1) {
      lastRenderedAt =
        Number.isFinite(elapsed) && lastRenderedAt !== null
          ? now - (elapsed % interval)
          : now;
      try {
        render(now);
      } catch (error) {
        failed = true;
        lastRenderedAt = null;
        onError?.(error);
        return;
      }
    }

    if (!failed && shouldRun()) frame = requestFrame(tick);
  };

  return {
    sync() {
      if (disposed || failed) return;
      if (!shouldRun()) {
        cancelPendingFrame();
        return;
      }
      if (frame === null) frame = requestFrame(tick);
    },
    dispose() {
      disposed = true;
      cancelPendingFrame();
    },
  };
}
