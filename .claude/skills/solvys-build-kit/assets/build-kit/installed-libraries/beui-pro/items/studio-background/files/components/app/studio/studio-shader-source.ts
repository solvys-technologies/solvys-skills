import { STUDIO_SHADER_BASE, STUDIO_VERTEX_SHADER } from "./studio-shader-base";
import { STUDIO_SHADER_EFFECTS } from "./studio-shader-effects";
import { STUDIO_SHADER_GENERATORS } from "./studio-shader-generators";
import type { StudioGeneratorId } from "./studio-types";

export { STUDIO_VERTEX_SHADER };

export const GENERATOR_INDEX: Record<StudioGeneratorId, number> = {
  signal: 0,
  contour: 1,
  flare: 2,
  silk: 3,
  waves: 4,
  aurora: 5,
  smoke: 6,
  caustics: 7,
  mesh: 8,
  metaballs: 9,
  flow: 10,
  gradient: 11,
  pixelblast: 12,
  plasma: 13,
  "ripple-grid": 14,
  iridescence: 15,
  "liquid-chrome": 16,
  balatro: 17,
  "mesh-gradient": 18,
  "neural-glow": 19,
  "god-rays": 20,
  voronoi: 21,
  swirl: 22,
};

const firstGeneratorBranch = STUDIO_SHADER_GENERATORS.indexOf(
  "  if (uGenerator < 0.5) {",
);
const generatorReturnBlock = STUDIO_SHADER_GENERATORS.indexOf(
  "\n\n  return clamp",
  firstGeneratorBranch,
);
const sourceFunctionStart = STUDIO_SHADER_GENERATORS.indexOf(
  "\n\nvec3 sourceAt",
  generatorReturnBlock,
);
const generatorHeader = STUDIO_SHADER_GENERATORS.slice(0, firstGeneratorBranch);
const generatorBranches = STUDIO_SHADER_GENERATORS.slice(
  firstGeneratorBranch,
  generatorReturnBlock,
);
const generatorTail = STUDIO_SHADER_GENERATORS.slice(
  generatorReturnBlock,
  sourceFunctionStart,
);
const onePassSourceFunction =
  STUDIO_SHADER_GENERATORS.slice(sourceFunctionStart);
const generatorMarkers = [
  ...generatorBranches.matchAll(
    /^ {2}(?:if \(uGenerator < [\d.]+\) \{|} else if \(uGenerator < [\d.]+\) \{|} else \{)$/gm,
  ),
];

function selectedGeneratorFunction(generator: StudioGeneratorId) {
  const generatorIndex = GENERATOR_INDEX[generator];
  const marker = generatorMarkers[generatorIndex];
  if (!marker || marker.index === undefined) {
    return STUDIO_SHADER_GENERATORS.slice(0, sourceFunctionStart);
  }
  const contentStart = marker.index + marker[0].length;
  const contentEnd =
    generatorMarkers[generatorIndex + 1]?.index ?? generatorBranches.length;
  const selectedBody = generatorBranches
    .slice(contentStart, contentEnd)
    .replace(/\n {2}}\s*$/, "");
  return generatorHeader + selectedBody + generatorTail;
}

const SOURCE_PASS_MAIN = `
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec3 color;
  if (uHasSource > 0.5) {
    float canvasAspect = uResolution.x / uResolution.y;
    color = texture(uTexture, coverUv(uv, uSourceAspect, canvasAspect)).rgb;
  } else {
    color = generatedSource(uv);
  }
  fragColor = vec4(color, 1.0);
}
`;

const EFFECTS_SOURCE_FUNCTION = `
vec3 sourceAt(vec2 uv) {
  return texture(uTexture, clamp(uv, 0.0, 1.0)).rgb;
}

`;

export function createStudioSourceFragmentShader(generator: StudioGeneratorId) {
  return (
    STUDIO_SHADER_BASE + selectedGeneratorFunction(generator) + SOURCE_PASS_MAIN
  );
}

export const STUDIO_EFFECTS_FRAGMENT_SHADER =
  STUDIO_SHADER_BASE + EFFECTS_SOURCE_FUNCTION + STUDIO_SHADER_EFFECTS;

export function createStudioFragmentShader(generator: StudioGeneratorId) {
  return (
    STUDIO_SHADER_BASE +
    selectedGeneratorFunction(generator) +
    onePassSourceFunction +
    STUDIO_SHADER_EFFECTS
  );
}

export const STUDIO_FRAGMENT_SHADER =
  STUDIO_SHADER_BASE + STUDIO_SHADER_GENERATORS + STUDIO_SHADER_EFFECTS;
