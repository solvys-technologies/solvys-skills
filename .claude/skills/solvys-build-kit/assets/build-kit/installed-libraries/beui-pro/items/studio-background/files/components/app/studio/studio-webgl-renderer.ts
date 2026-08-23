import { Mesh, Program, Renderer, RenderTarget, Texture, Triangle } from "ogl";
import { getAdaptiveStudioDpr } from "./studio-render-performance";
import {
  createStudioSourceFragmentShader,
  STUDIO_EFFECTS_FRAGMENT_SHADER,
  STUDIO_VERTEX_SHADER,
} from "./studio-shader-source";
import type { StudioGeneratorId, StudioMedia } from "./studio-types";

export type StudioUniform = { value: unknown };

export type StudioWebglResources = {
  canvas: HTMLCanvasElement;
  dispose: () => void;
  program: InstanceType<typeof Program>;
  render: () => boolean;
  renderer: InstanceType<typeof Renderer>;
  resize: (width?: number, height?: number, dpr?: number) => void;
  setGenerator: (generator: StudioGeneratorId) => void;
  texture: InstanceType<typeof Texture>;
};

export const STUDIO_WEBGL_CONTEXT_ATTRIBUTES = {
  alpha: false,
  antialias: false,
  depth: false,
  failIfMajorPerformanceCaveat: true,
  powerPreference: "high-performance",
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  stencil: false,
} as const satisfies WebGLContextAttributes;

const SOFTWARE_RENDERER_PATTERN =
  /swiftshader|llvmpipe|software rasterizer|microsoft basic render/i;

export function isSoftwareWebglRenderer(rendererName: string) {
  return SOFTWARE_RENDERER_PATTERN.test(rendererName);
}

function getWebglRendererName(gl: WebGL2RenderingContext) {
  const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  return String(
    debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER),
  );
}

export function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return new Float32Array([
    ((value >> 16) & 255) / 255,
    ((value >> 8) & 255) / 255,
    (value & 255) / 255,
  ]);
}

export function studioMediaAspect(media: StudioMedia | null) {
  if (!media) return 1;
  if (media.kind === "image") {
    const image = media.element as HTMLImageElement;
    return image.naturalWidth / Math.max(1, image.naturalHeight);
  }
  const video = media.element as HTMLVideoElement;
  return video.videoWidth / Math.max(1, video.videoHeight);
}

function createSharedUniforms() {
  return {
    uResolution: { value: new Float32Array([1, 1]) },
    uPointer: { value: new Float32Array([0.5, 0.5]) },
    uTime: { value: 0 },
    uHasSource: { value: 0 },
    uSourceAspect: { value: 1 },
    uGenerator: { value: 0 },
    uColorA: { value: hexToRgb("#060707") },
    uColorB: { value: hexToRgb("#6f7773") },
    uColorC: { value: hexToRgb("#f2f6f1") },
    uSpeed: { value: 0.34 },
    uScale: { value: 0.48 },
    uDetail: { value: 0.54 },
    uDistortion: { value: 0.42 },
    uGlow: { value: 0.34 },
    uGrain: { value: 0.12 },
    uVignette: { value: 0.22 },
    uBrightness: { value: 1 },
    uContrast: { value: 1.04 },
    uSaturation: { value: 1 },
    uHue: { value: 0 },
    uGrayscale: { value: 0 },
    uSepia: { value: 0 },
    uInvert: { value: 0 },
    uPixelate: { value: 0 },
    uDither: { value: 0 },
    uPosterize: { value: 0 },
    uEdgeGlow: { value: 0 },
    uPixelSort: { value: 0 },
    uLed: { value: 0 },
    uRgbSplit: { value: 0 },
    uGlitch: { value: 0 },
    uScanlines: { value: 0 },
    uDuotone: { value: 0 },
    uPixelSize: { value: 0.34 },
    uDensity: { value: 0.56 },
    uExposure: { value: 0 },
    uScatter: { value: 0 },
    uPixelOpacity: { value: 1 },
    uDitherAlgorithm: { value: 0 },
    uAnimationPreset: { value: 0 },
    uAnimationPace: { value: 0.36 },
    uAnimationIntensity: { value: 0.28 },
    uEffectsVisible: { value: 1 },
  };
}

export function createStudioWebglResources({
  container,
  generator,
}: {
  container: HTMLDivElement;
  generator: StudioGeneratorId;
}): StudioWebglResources {
  const canvas = document.createElement("canvas");
  const requestedContext = canvas.getContext(
    "webgl2",
    STUDIO_WEBGL_CONTEXT_ATTRIBUTES,
  ) as WebGL2RenderingContext | null;
  if (!requestedContext) {
    throw new Error("A hardware-accelerated WebGL2 context is unavailable");
  }
  if (isSoftwareWebglRenderer(getWebglRendererName(requestedContext))) {
    requestedContext.getExtension("WEBGL_lose_context")?.loseContext();
    throw new Error("Studio cannot run safely on a software WebGL renderer");
  }

  const renderer = new Renderer({
    canvas,
    webgl: 2,
    alpha: false,
    antialias: false,
    depth: false,
    dpr: 1,
    powerPreference: "high-performance",
    premultipliedAlpha: false,
    stencil: false,
  });
  const gl = renderer.gl;
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
  });
  container.appendChild(canvas);

  const texture = new Texture(gl, {
    image: new Uint8Array([8, 8, 8, 255]),
    width: 1,
    height: 1,
    generateMipmaps: false,
  });
  const geometry = new Triangle(gl);
  const sharedUniforms = createSharedUniforms();
  const sourceProgram = new Program(gl, {
    vertex: STUDIO_VERTEX_SHADER,
    fragment: createStudioSourceFragmentShader(generator),
    uniforms: {
      ...sharedUniforms,
      uTexture: { value: texture },
    },
    cullFace: false,
    depthTest: false,
    depthWrite: false,
  });
  const sourceMesh = new Mesh(gl, { geometry, program: sourceProgram });
  const sourceTarget = new RenderTarget(gl, {
    width: 1,
    height: 1,
    depth: false,
  });
  const program = new Program(gl, {
    vertex: STUDIO_VERTEX_SHADER,
    fragment: STUDIO_EFFECTS_FRAGMENT_SHADER,
    uniforms: {
      ...sharedUniforms,
      uTexture: { value: sourceTarget.texture },
    },
    cullFace: false,
    depthTest: false,
    depthWrite: false,
  });
  const effectsMesh = new Mesh(gl, { geometry, program });
  const unbindProgram = gl.useProgram.bind(gl);
  let activeGenerator = generator;
  let disposed = false;

  const resize = (width?: number, height?: number, dpr?: number) => {
    const bounds = container.getBoundingClientRect();
    const nextWidth = Math.max(1, Math.round(width ?? bounds.width));
    const nextHeight = Math.max(1, Math.round(height ?? bounds.height));
    renderer.dpr =
      dpr ??
      getAdaptiveStudioDpr({
        width: nextWidth,
        height: nextHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
      });
    renderer.setSize(nextWidth, nextHeight);
    sourceTarget.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    const resolution = program.uniforms.uResolution.value as Float32Array;
    resolution[0] = gl.drawingBufferWidth;
    resolution[1] = gl.drawingBufferHeight;
  };

  return {
    canvas,
    program,
    renderer,
    resize,
    setGenerator(nextGenerator) {
      if (disposed || nextGenerator === activeGenerator) return;
      sourceProgram.setShaders({
        vertex: STUDIO_VERTEX_SHADER,
        fragment: createStudioSourceFragmentShader(nextGenerator),
      });
      if (!gl.getProgramParameter(sourceProgram.program, gl.LINK_STATUS)) {
        throw new Error(
          gl.getProgramInfoLog(sourceProgram.program) ??
            "Unable to compile the selected Studio shader",
        );
      }
      unbindProgram(null);
      renderer.state.currentProgram = null;
      activeGenerator = nextGenerator;
    },
    texture,
    render() {
      if (disposed || gl.isContextLost()) return false;
      renderer.render({ scene: sourceMesh, target: sourceTarget });
      renderer.render({ scene: effectsMesh });
      return true;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      sourceProgram.remove();
      program.remove();
      geometry.remove();
      gl.deleteTexture(texture.texture);
      for (const targetTexture of sourceTarget.textures) {
        gl.deleteTexture(targetTexture.texture);
      }
      gl.deleteFramebuffer(sourceTarget.buffer);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    },
  };
}
