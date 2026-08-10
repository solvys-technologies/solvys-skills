export type StudioUseCase = "hero" | "content" | "footer-cta";

export type StudioGeneratorId =
  | "signal"
  | "contour"
  | "flare"
  | "silk"
  | "waves"
  | "aurora"
  | "smoke"
  | "caustics"
  | "mesh"
  | "metaballs"
  | "flow"
  | "gradient"
  | "pixelblast"
  | "plasma"
  | "ripple-grid"
  | "iridescence"
  | "liquid-chrome"
  | "balatro"
  | "mesh-gradient"
  | "neural-glow"
  | "god-rays"
  | "voronoi"
  | "swirl";

export type StudioRatioId = "16:9" | "3:2" | "1:1" | "4:5";

export type StudioEffectId =
  | "pixelate"
  | "dither"
  | "posterize"
  | "edge-glow"
  | "pixel-sort"
  | "led"
  | "rgb-split"
  | "glitch"
  | "scanlines"
  | "grain"
  | "duotone";

export type StudioDitherAlgorithm = "bayer4" | "bayer8" | "noise";

export type StudioPixelSettings = {
  size: number;
  density: number;
  exposure: number;
  scatter: number;
  opacity: number;
};

export type StudioAnimationSettings = {
  preset:
    | "none"
    | "breathe"
    | "drift"
    | "sweep"
    | "pulse"
    | "orbit"
    | "twist"
    | "tide";
  pace: number;
  intensity: number;
};

export type StudioSettings = {
  speed: number;
  scale: number;
  detail: number;
  distortion: number;
  glow: number;
  grain: number;
  vignette: number;
  brightness: number;
  contrast: number;
  saturation: number;
  hue: number;
};

export type StudioCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primary: string;
  secondary: string;
};

export type StudioScene = {
  id: string;
  name: string;
  note: string;
  useCase: StudioUseCase;
  generator: StudioGeneratorId;
  colors: [string, string, string];
  settings: StudioSettings;
  copy: StudioCopy;
  featured?: boolean;
};

export type StudioMedia = {
  element: HTMLImageElement | HTMLVideoElement;
  kind: "image" | "video";
  name: string;
  url: string;
};

export type StudioRendererProps = {
  media: StudioMedia | null;
  generator: StudioGeneratorId;
  colors: [string, string, string];
  settings: StudioSettings;
  activeEffects?: StudioEffectId[];
  effectAmounts?: Record<StudioEffectId, number>;
  pixelSettings?: StudioPixelSettings;
  ditherAlgorithm?: StudioDitherAlgorithm;
  animation?: StudioAnimationSettings;
  paused: boolean;
  effectsVisible?: boolean;
  renderContinuously?: boolean;
  className?: string;
};

export type StudioRendererHandle = {
  exportPng: (
    filename?: string,
    width?: number,
    height?: number,
  ) => Promise<boolean>;
  exportWebm: (filename?: string, durationMs?: number) => Promise<boolean>;
};

export type StudioState = {
  scene: StudioScene;
  colors: [string, string, string];
  settings: StudioSettings;
  copy: StudioCopy;
  ratio: StudioRatioId;
  media: StudioMedia | null;
  paused: boolean;
  effectsVisible: boolean;
  activeEffects: StudioEffectId[];
  effectAmounts: Record<StudioEffectId, number>;
  pixelSettings: StudioPixelSettings;
  ditherAlgorithm: StudioDitherAlgorithm;
  animation: StudioAnimationSettings;
  previewContentVisible: boolean;
};
