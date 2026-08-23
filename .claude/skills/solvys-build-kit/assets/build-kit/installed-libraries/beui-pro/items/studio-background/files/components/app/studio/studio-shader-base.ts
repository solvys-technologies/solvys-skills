export const STUDIO_VERTEX_SHADER = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const STUDIO_SHADER_BASE = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture;
uniform float uHasSource;
uniform float uSourceAspect;
uniform float uGenerator;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uPixelate;
uniform float uDither;
uniform float uRgbSplit;
uniform float uGlitch;
uniform float uScanlines;
uniform float uGrain;
uniform float uDuotone;
uniform float uEffectsVisible;
uniform float uBrightness;
uniform float uContrast;
uniform float uSaturation;
uniform float uHue;
uniform float uGrayscale;
uniform float uSepia;
uniform float uInvert;
uniform float uVignette;
uniform float uGlow;
uniform float uPosterize;
uniform float uEdgeGlow;
uniform float uPixelSort;
uniform float uLed;
uniform float uPixelSize;
uniform float uDensity;
uniform float uExposure;
uniform float uScatter;
uniform float uPixelOpacity;
uniform float uDitherAlgorithm;
uniform float uAnimationPreset;
uniform float uAnimationPace;
uniform float uAnimationIntensity;

out vec4 fragColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

float bayer8(vec2 p);

mat2 rotate2d(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

vec2 coverUv(vec2 uv, float sourceAspect, float canvasAspect) {
  vec2 result = uv;
  if (sourceAspect > canvasAspect) {
    float scale = canvasAspect / sourceAspect;
    result.x = (uv.x - 0.5) * scale + 0.5;
  } else {
    float scale = sourceAspect / canvasAspect;
    result.y = (uv.y - 0.5) * scale + 0.5;
  }
  return result;
}

`;
