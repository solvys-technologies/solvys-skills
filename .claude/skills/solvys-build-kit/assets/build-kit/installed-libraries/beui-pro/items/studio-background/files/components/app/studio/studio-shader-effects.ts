export const STUDIO_SHADER_EFFECTS = `float bayer4(vec2 p) {
  ivec2 cell = ivec2(mod(floor(p), 4.0));
  int index = cell.y * 4 + cell.x;
  float matrix[16] = float[16](
    0.0, 8.0, 2.0, 10.0,
    12.0, 4.0, 14.0, 6.0,
    3.0, 11.0, 1.0, 9.0,
    15.0, 7.0, 13.0, 5.0
  );
  return (matrix[index] + 0.5) / 16.0;
}

float bayer8(vec2 p) {
  vec2 cell = mod(floor(p), 8.0);
  float x = cell.x;
  float y = cell.y;
  float value = mod(x, 2.0) * 32.0 + mod(y, 2.0) * 16.0;
  value += mod(floor(x / 2.0), 2.0) * 8.0;
  value += mod(floor(y / 2.0), 2.0) * 4.0;
  value += mod(floor(x / 4.0), 2.0) * 2.0;
  value += mod(floor(y / 4.0), 2.0);
  return (value + 0.5) / 64.0;
}

vec3 hueShift(vec3 color, float angle) {
  const mat3 toYiq = mat3(
    0.299, 0.587, 0.114,
    0.596, -0.275, -0.321,
    0.212, -0.523, 0.311
  );
  const mat3 toRgb = mat3(
    1.0, 0.956, 0.621,
    1.0, -0.272, -0.647,
    1.0, -1.107, 1.705
  );
  vec3 yiq = toYiq * color;
  float hue = atan(yiq.z, yiq.y) + angle;
  float chroma = length(yiq.yz);
  return clamp(toRgb * vec3(yiq.x, chroma * cos(hue), chroma * sin(hue)), 0.0, 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 treatedUv = uv;
  float visible = uEffectsVisible;
  float animated = 0.0;
  if (uAnimationPreset > 0.5) {
    float phase = uTime * mix(0.3, 3.2, uAnimationPace);
    animated = sin(phase);
    vec2 centeredUv = treatedUv - 0.5;
    if (uAnimationPreset < 1.5) {
      treatedUv = centeredUv * (1.0 + animated * 0.035 * uAnimationIntensity) + 0.5;
    } else if (uAnimationPreset < 2.5) {
      treatedUv += vec2(phase * 0.012, phase * -0.006) * uAnimationIntensity;
    } else if (uAnimationPreset < 3.5) {
      treatedUv.y += sin(uv.x * 7.0 - phase) * 0.035 * uAnimationIntensity;
    } else if (uAnimationPreset < 4.5) {
      float ring = sin(length(centeredUv) * 24.0 - phase * 2.0);
      treatedUv += normalize(centeredUv + vec2(0.0001)) * ring * 0.018 * uAnimationIntensity;
    } else if (uAnimationPreset < 5.5) {
      treatedUv = rotate2d(phase * 0.08 * uAnimationIntensity) * centeredUv + 0.5;
    } else if (uAnimationPreset < 6.5) {
      float twist = length(centeredUv) * animated * 0.8 * uAnimationIntensity;
      treatedUv = rotate2d(twist) * centeredUv + 0.5;
    } else {
      treatedUv += vec2(
        sin(uv.y * 6.0 + phase),
        cos(uv.x * 5.0 - phase * 0.8)
      ) * 0.022 * uAnimationIntensity;
    }
  }

  if (uGlitch * visible > 0.001) {
    float band = floor(uv.y * mix(18.0, 62.0, uGlitch));
    float jump = hash21(vec2(band, floor(uTime * 10.0)));
    float activation = step(0.72 - uGlitch * 0.22, jump);
    treatedUv.x += (jump - 0.5) * 0.13 * uGlitch * activation;
  }

  if (uPixelate * visible > 0.001) {
    float blockSize = mix(2.0, 42.0, uPixelSize) * mix(0.9, 1.1, animated * uAnimationIntensity + 0.5);
    vec2 cells = max(vec2(1.0), floor(uResolution / blockSize));
    treatedUv = (floor(treatedUv * cells) + 0.5) / cells;
  }

  vec3 color;
  if (uRgbSplit * visible > 0.001) {
    float offset = mix(0.001, 0.018, uRgbSplit);
    float red = sourceAt(treatedUv + vec2(offset, 0.0)).r;
    float green = sourceAt(treatedUv).g;
    float blue = sourceAt(treatedUv - vec2(offset, 0.0)).b;
    color = vec3(red, green, blue);
  } else {
    color = sourceAt(treatedUv);
  }

  color *= uBrightness;
  color = (color - 0.5) * uContrast + 0.5;
  float baseLuma = dot(color, vec3(0.2126, 0.7152, 0.0722));
  color = mix(vec3(baseLuma), color, uSaturation);
  color = hueShift(color, uHue);
  color = mix(color, vec3(baseLuma), uGrayscale);
  vec3 sepiaColor = vec3(
    dot(color, vec3(0.393, 0.769, 0.189)),
    dot(color, vec3(0.349, 0.686, 0.168)),
    dot(color, vec3(0.272, 0.534, 0.131))
  );
  color = mix(color, sepiaColor, uSepia);
  color = mix(color, 1.0 - color, uInvert);

  if (uPixelSort * visible > 0.001) {
    float sortAmount = uPixelSort * visible;
    float row = floor(uv.y * mix(48.0, 220.0, uDensity));
    float rowSeed = hash21(vec2(row, floor(uTime * 1.8)));
    float sourceLight = dot(color, vec3(0.2126, 0.7152, 0.0722));
    float sortGate = smoothstep(0.24, 0.78, sourceLight) * step(0.22, rowSeed);
    float direction = rowSeed > 0.5 ? 1.0 : -1.0;
    vec2 sortUv = treatedUv + vec2(
      direction * mix(0.006, 0.19, sortAmount) * sortGate,
      0.0
    );
    vec3 sorted = sourceAt(clamp(sortUv, 0.0, 1.0));
    float streak = smoothstep(0.08, 0.92, hash21(vec2(floor(uv.x * 9.0), row)));
    color = mix(color, sorted, sortAmount * sortGate * mix(0.45, 1.0, streak));
  }

  if (uPosterize * visible > 0.001) {
    float posterizeAmount = uPosterize * visible;
    float levels = floor(mix(10.0, 2.0, posterizeAmount) + 0.5);
    vec3 posterized = floor(color * levels + 0.5) / levels;
    color = mix(color, posterized, smoothstep(0.08, 0.4, posterizeAmount));
  }

  if (uGlow > 0.001) {
    vec2 texel = 2.5 / uResolution;
    vec3 bloom = sourceAt(treatedUv + vec2(texel.x, 0.0));
    bloom += sourceAt(treatedUv - vec2(texel.x, 0.0));
    bloom += sourceAt(treatedUv + vec2(0.0, texel.y));
    bloom += sourceAt(treatedUv - vec2(0.0, texel.y));
    color = mix(color, bloom * 0.25 + color * 0.2, uGlow * 0.55);
  }

  float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));

  if (uDuotone * visible > 0.001) {
    vec3 mapped = luminance < 0.5
      ? mix(uColorA, uColorB, luminance * 2.0)
      : mix(uColorB, uColorC, (luminance - 0.5) * 2.0);
    color = mix(color, mapped, uDuotone);
    luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
  }

  if (uEdgeGlow * visible > 0.001) {
    vec2 edgeTexel = mix(1.0, 3.2, uEdgeGlow) / uResolution;
    vec3 leftSample = sourceAt(clamp(treatedUv - vec2(edgeTexel.x, 0.0), 0.0, 1.0));
    vec3 rightSample = sourceAt(clamp(treatedUv + vec2(edgeTexel.x, 0.0), 0.0, 1.0));
    vec3 downSample = sourceAt(clamp(treatedUv - vec2(0.0, edgeTexel.y), 0.0, 1.0));
    vec3 upSample = sourceAt(clamp(treatedUv + vec2(0.0, edgeTexel.y), 0.0, 1.0));
    float horizontalEdge = length(rightSample - leftSample);
    float verticalEdge = length(upSample - downSample);
    float edgeStrength = smoothstep(0.08, 0.72, horizontalEdge + verticalEdge);
    vec3 edgeColor = mix(uColorB, uColorC, clamp(luminance + 0.2, 0.0, 1.0));
    color += edgeColor * edgeStrength * uEdgeGlow * 1.35;
    color *= 1.0 - edgeStrength * uEdgeGlow * 0.16;
  }

  if (uDither * visible > 0.001) {
    vec2 matrixPoint = gl_FragCoord.xy / mix(1.0, 4.2, uPixelSize);
    float threshold = uDitherAlgorithm < 0.5
      ? bayer4(matrixPoint)
      : uDitherAlgorithm < 1.5
        ? bayer8(matrixPoint)
        : hash21(floor(matrixPoint));
    float value = luminance + uExposure + (threshold - 0.5) * mix(0.12, 0.82, uDensity);
    vec3 dithered = value < 0.34 ? uColorA : value < 0.68 ? uColorB : uColorC;
    color = mix(color, dithered, uPixelOpacity * smoothstep(0.05, 0.32, uDither));
  }

  if (uLed * visible > 0.001) {
    float cellSize = mix(5.0, 44.0, uPixelSize);
    vec2 cell = floor(gl_FragCoord.xy / cellSize);
    vec2 point = fract(gl_FragCoord.xy / cellSize) - 0.5;
    point += (hash21(cell) - 0.5) * uScatter * 0.38;
    float radius = mix(0.08, 0.48, clamp(luminance + uExposure, 0.0, 1.0));
    float ring = abs(length(point) - radius * 0.7);
    float mask = 1.0 - smoothstep(0.035, 0.09, ring);
    vec3 ink = mix(uColorA, uColorC, luminance);
    color = mix(color, mix(uColorA, ink, mask), uPixelOpacity * uLed);
  }

  if (uScanlines * visible > 0.001) {
    float line = 0.5 + 0.5 * sin(gl_FragCoord.y * 3.14159);
    color *= 1.0 - line * uScanlines * 0.34;
  }

  if (uGrain * visible > 0.001) {
    float grain = hash21(gl_FragCoord.xy + floor(uTime * 24.0)) - 0.5;
    color += grain * uGrain * 0.22;
  }

  if (uVignette > 0.001) {
    float edge = smoothstep(0.82, 0.18, length((uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0)));
    color *= mix(1.0, edge, uVignette * 0.72);
  }

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
