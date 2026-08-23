export const STUDIO_SHADER_GENERATORS = `vec3 generatedSource(vec2 uv) {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  float t = uTime * 0.12;
  vec3 color;

  if (uGenerator < 0.5) {
    vec2 warp = vec2(
      fbm(p * 2.2 + vec2(t, -t * 0.6)),
      fbm(p * 2.0 + vec2(-t * 0.7, t))
    );
    vec2 q = p + (warp - 0.5) * 0.72;
    float ring = abs(sin(length(q - vec2(0.16, -0.04)) * 13.0 - t * 3.0));
    float veil = smoothstep(0.88, 0.18, ring) * smoothstep(1.0, 0.08, length(q));
    color = mix(uColorA, uColorB, fbm(q * 2.7 + t));
    color = mix(color, uColorC, veil * 0.78);
  } else if (uGenerator < 1.5) {
    float field = fbm(p * 3.2 + vec2(t * 0.8, -t));
    float contour = abs(fract(field * 7.0 - t * 0.8) - 0.5) * 2.0;
    float line = 1.0 - smoothstep(0.04, 0.22, contour);
    color = mix(uColorA, uColorB, field);
    color = mix(color, uColorC, line * 0.9);
  } else if (uGenerator < 2.5) {
    vec2 q = p;
    q.x += sin(q.y * 3.0 + t) * 0.16;
    float beam = exp(-abs(q.x * 2.2 + q.y * 0.7)) * 0.9;
    float flare = 0.055 / max(0.03, length(q - vec2(-0.2, 0.06)));
    float haze = fbm(q * 2.4 + t) * 0.35;
    color = mix(uColorA, uColorB, clamp(beam + haze, 0.0, 1.0));
    color += uColorC * min(flare, 0.7);
  } else if (uGenerator < 3.5) {
    // Matches the premium auth Silk component: nested sinusoidal folds with
    // fine grain, rather than a generic domain-warped fluid surface.
    vec2 tex = uv;
    float tOffset = uTime * 0.5;
    tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
    float pattern = 0.6 + 0.4 * sin(
      5.0 * (
        tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset
      ) + sin(20.0 * (tex.x + tex.y - 0.1 * tOffset))
    );
    float silkGrain = hash21(gl_FragCoord.xy) / 15.0;
    color = mix(uColorA, uColorB, clamp(pattern, 0.0, 1.0));
    color = mix(color, uColorC, smoothstep(0.86, 1.0, pattern) * 0.32);
    color -= silkGrain * 0.11;
  } else if (uGenerator < 4.5) {
    float waveA = sin(dot(p, normalize(vec2(1.0, 0.32))) * 5.0 - t * 2.0);
    float waveB = sin(dot(p, normalize(vec2(0.75, -0.66))) * 8.0 + t * 1.35) * 0.48;
    float waveC = sin(dot(p, normalize(vec2(-0.2, 1.0))) * 13.0 - t * 2.6) * 0.18;
    float height = waveA + waveB + waveC;
    float slope = abs(cos(dot(p, vec2(4.8, 1.55)) - t * 2.0));
    color = mix(uColorA, uColorB, smoothstep(-1.2, 1.25, height));
    color = mix(color, uColorC, pow(slope, 12.0) * 0.62);
  } else if (uGenerator < 5.5) {
    float curtain = sin(p.x * 5.0 + fbm(p * 2.0 + t) * 4.0 - t * 1.4);
    float glow = pow(max(0.0, curtain), 4.0) * smoothstep(0.8, -0.7, p.y);
    float haze = fbm(vec2(p.x * 2.0, p.y * 0.7) + vec2(t, -t * 0.2));
    color = mix(uColorA, uColorB, haze * 0.55);
    color = mix(color, uColorC, glow);
  } else if (uGenerator < 6.5) {
    vec2 smokeWarp = vec2(
      fbm(p * 1.25 + vec2(0.0, -t * 0.45)),
      fbm(p * 1.4 + vec2(t * 0.18, -t * 0.35))
    ) - 0.5;
    vec2 smokeUv = p + smokeWarp * 0.75 + vec2(0.0, -t * 0.16);
    float cloud = fbm(smokeUv * 2.0);
    cloud += fbm(smokeUv * 4.4 + smokeWarp) * 0.42;
    color = mix(uColorA, uColorB, smoothstep(0.25, 1.15, cloud));
    color = mix(color, uColorC, smoothstep(0.9, 1.35, cloud) * 0.48);
  } else if (uGenerator < 7.5) {
    vec2 q = p * 4.2 + vec2(fbm(p * 2.0 + t), fbm(p * 2.3 - t)) * 1.4;
    float caustic = abs(sin(q.x + sin(q.y + t)) * sin(q.y * 1.25 + sin(q.x - t)));
    float light = pow(1.0 - clamp(caustic, 0.0, 1.0), 9.0);
    color = mix(uColorA, uColorB, fbm(p * 2.0 + t) * 0.7);
    color = mix(color, uColorC, light);
  } else if (uGenerator < 8.5) {
    float a = 0.05 / max(0.04, length(p - vec2(sin(t) * 0.35, cos(t * 0.7) * 0.22)));
    float b = 0.06 / max(0.04, length(p - vec2(cos(t * 0.6) * 0.45, sin(t) * 0.3)));
    float mesh = clamp(a + b + fbm(p * 1.8 + t) * 0.45, 0.0, 1.0);
    color = mix(uColorA, uColorB, mesh);
    color = mix(color, uColorC, smoothstep(0.62, 1.0, mesh));
  } else if (uGenerator < 9.5) {
    vec2 a = p - vec2(sin(t * 1.3) * 0.34, cos(t) * 0.22);
    vec2 b = p - vec2(cos(t * 0.9) * 0.4, sin(t * 1.2) * 0.28);
    vec2 c = p - vec2(sin(t * 0.7 + 2.0) * 0.3, cos(t * 1.4) * 0.32);
    float field = 0.08 / dot(a, a) + 0.07 / dot(b, b) + 0.06 / dot(c, c);
    float shape = smoothstep(0.72, 1.35, field);
    color = mix(uColorA, uColorB, smoothstep(0.2, 1.5, field));
    color = mix(color, uColorC, shape);
  } else if (uGenerator < 10.5) {
    float e = 0.025;
    vec2 samplePoint = p * 1.35 + vec2(t * 0.25, -t * 0.18);
    float dx = fbm(samplePoint + vec2(e, 0.0)) - fbm(samplePoint - vec2(e, 0.0));
    float dy = fbm(samplePoint + vec2(0.0, e)) - fbm(samplePoint - vec2(0.0, e));
    vec2 curl = vec2(dy, -dx) / (2.0 * e);
    vec2 advected = p + curl * 0.42;
    float stream = sin(advected.x * 8.0 + advected.y * 2.4 + fbm(advected * 2.2) * 4.0 - t * 1.7);
    float threads = pow(1.0 - abs(stream), 4.5);
    float body = fbm(advected * 1.35 + vec2(t * 0.16, 0.0));
    color = mix(uColorA, uColorB, smoothstep(0.16, 0.86, body));
    color = mix(color, uColorC, threads * 0.78);
  } else if (uGenerator < 11.5) {
    // Port of the premium Grainient shader's warped three-color blend.
    float grainientTime = uTime * 0.25;
    vec2 grainientUv = uv;
    vec2 tuv = grainientUv - 0.5;
    tuv /= 0.9;
    float degree = noise(vec2(grainientTime * 0.1, tuv.x * tuv.y) * 2.0);
    tuv.y *= 1.0 / aspect;
    tuv = rotate2d(radians((degree - 0.5) * 500.0 + 180.0)) * tuv;
    tuv.y *= aspect;
    float warpTime = grainientTime * 2.0;
    tuv.x += sin(tuv.y * 5.0 + warpTime) / 50.0;
    tuv.y += sin(tuv.x * 7.5 + warpTime) / 25.0;
    float blendX = tuv.x;
    vec3 layer1 = mix(uColorC, uColorB, smoothstep(-0.35, 0.25, blendX));
    vec3 layer2 = mix(uColorB, uColorA, smoothstep(-0.35, 0.25, blendX));
    color = mix(layer1, layer2, smoothstep(0.55, -0.35, tuv.y));
    float gradientGrain = hash21(grainientUv * 2.0 + floor(uTime * 3.0));
    color += (gradientGrain - 0.5) * 0.1;
    color = (color - 0.5) * 1.5 + 0.5;
  } else if (uGenerator < 12.5) {
    float pixelSize = mix(4.0, 9.0, 0.5 + 0.5 * sin(t * 0.4));
    vec2 pixelId = floor(gl_FragCoord.xy / pixelSize);
    vec2 centered = (pixelId * pixelSize - uResolution * 0.5) / uResolution.y;
    float field = fbm(centered * 3.2 + vec2(t * 0.3, -t * 0.12));
    float ripple = 0.5 + 0.5 * sin(length(centered - vec2(0.24, 0.05)) * 22.0 - t * 2.4);
    float threshold = bayer8(pixelId);
    float mask = step(threshold, field * 0.62 + ripple * 0.34 - 0.18);
    color = mix(uColorA, uColorB, field * 0.36);
    color = mix(color, uColorC, mask);
  } else if (uGenerator < 13.5) {
    // Layered interference fields create soft, continuously folding plasma.
    vec2 q = p * 3.1;
    float plasma = sin(q.x + t * 2.1);
    plasma += sin(q.y * 1.35 - t * 1.7);
    plasma += sin((q.x + q.y) * 0.72 + t * 1.3);
    plasma += sin(length(q + vec2(sin(t), cos(t))) * 1.8 - t * 2.4);
    plasma = 0.5 + 0.125 * plasma;
    color = mix(uColorA, uColorB, smoothstep(0.08, 0.7, plasma));
    color = mix(color, uColorC, smoothstep(0.68, 1.0, plasma));
  } else if (uGenerator < 14.5) {
    // A dimensional grid with radial wave displacement and lit intersections.
    vec2 q = p * 5.2;
    float distanceToWave = length(p - vec2(sin(t * 0.8), cos(t * 0.65)) * 0.22);
    float wave = sin(distanceToWave * 22.0 - t * 4.0);
    q += normalize(p + vec2(0.0001)) * wave * 0.32;
    vec2 grid = abs(fract(q) - 0.5);
    float lines = 1.0 - smoothstep(0.035, 0.12, min(grid.x, grid.y));
    float nodes = 1.0 - smoothstep(0.04, 0.22, length(grid));
    float depth = 0.5 + 0.5 * wave;
    color = mix(uColorA, uColorB, depth * 0.48);
    color = mix(color, uColorC, max(lines * 0.72, nodes));
  } else if (uGenerator < 15.5) {
    // Thin-film color shifts: layered phase fields mimic an iridescent surface.
    vec2 q = p + vec2(
      fbm(p * 2.0 + t * 0.35),
      fbm(p * 2.3 - t * 0.28)
    ) * 0.42;
    float film = sin(q.x * 7.0 + q.y * 4.0 + fbm(q * 3.0) * 5.0 - t * 1.7);
    float phaseA = 0.5 + 0.5 * sin(film * 2.4 + t * 0.35);
    float phaseB = 0.5 + 0.5 * sin(film * 2.4 + 2.094 + t * 0.35);
    float phaseC = 0.5 + 0.5 * sin(film * 2.4 + 4.188 + t * 0.35);
    color = uColorA * phaseA + uColorB * phaseB + uColorC * phaseC;
    color += uColorC * pow(1.0 - abs(film), 9.0) * 0.34;
  } else if (uGenerator < 16.5) {
    // High-contrast warped reflections form a fluid, polished metal surface.
    vec2 q = p;
    q += vec2(fbm(p * 1.8 + t * 0.4), fbm(p * 2.1 - t * 0.3)) - 0.5;
    float folds = sin(q.x * 9.0 + fbm(q * 3.2) * 7.0 + t * 1.2);
    folds += sin(q.y * 13.0 - q.x * 3.0 - t * 1.6) * 0.55;
    float metal = smoothstep(-1.15, 1.25, folds);
    float specular = pow(1.0 - abs(sin(folds * 2.2)), 18.0);
    vec3 darkMetal = mix(uColorA, uColorB, metal * 0.62);
    color = mix(darkMetal, uColorC, smoothstep(0.58, 0.96, metal));
    color += uColorC * specular * 0.72;
  } else if (uGenerator < 17.5) {
    // Rotating card-table waves with a tactile woven line treatment.
    vec2 q = rotate2d(t * 0.23) * p;
    float warp = sin(q.x * 4.2 + t) + sin(q.y * 5.0 - t * 1.3);
    q += vec2(sin(q.y * 3.0 + t), cos(q.x * 3.5 - t)) * 0.17;
    float ribbon = sin((q.x + q.y) * 8.0 + warp * 1.6);
    float weave = 0.5 + 0.5 * sin(q.x * 34.0 + sin(q.y * 5.0) * 3.0);
    float body = smoothstep(-0.9, 0.9, ribbon);
    color = mix(uColorA, uColorB, body);
    color = mix(color, uColorC, smoothstep(0.7, 1.0, body) * 0.72);
    color *= mix(0.82, 1.08, weave);
  } else if (uGenerator < 18.5) {
    // Five independently moving light fields form a deep aurora mesh without
    // relying on the Paper shader runtime.
    vec2 q = p * 0.92;
    vec2 p1 = vec2(-0.58 + sin(t * 0.8) * 0.18, -0.28 + cos(t * 0.7) * 0.16);
    vec2 p2 = vec2(0.52 + cos(t * 0.55) * 0.22, -0.16 + sin(t) * 0.2);
    vec2 p3 = vec2(sin(t * 0.45) * 0.28, 0.48 + cos(t * 0.62) * 0.16);
    vec2 p4 = vec2(-0.28 + cos(t * 0.7) * 0.3, 0.18 + sin(t * 0.5) * 0.2);
    float w1 = exp(-dot(q - p1, q - p1) * 3.4);
    float w2 = exp(-dot(q - p2, q - p2) * 3.0);
    float w3 = exp(-dot(q - p3, q - p3) * 3.8);
    float w4 = exp(-dot(q - p4, q - p4) * 4.8);
    float haze = fbm(q * 1.35 + vec2(t * 0.08, -t * 0.06));
    color = uColorA;
    color = mix(color, uColorB, clamp(w1 * 0.78 + w3 * 0.62 + haze * 0.16, 0.0, 1.0));
    color = mix(color, uColorC, clamp(w2 * 0.82 + w4 * 0.48, 0.0, 1.0));
    color += mix(uColorB, uColorC, 0.5) * pow(max(0.0, w1 + w2 - 0.72), 2.0) * 0.28;
  } else if (uGenerator < 19.5) {
    // Warped ridges read as a luminous neural field rather than generic noise.
    vec2 q = p * 1.65;
    vec2 warp = vec2(
      fbm(q * 1.2 + vec2(t * 0.22, 0.0)),
      fbm(q * 1.35 + vec2(0.0, -t * 0.18))
    ) - 0.5;
    q += warp * 1.15;
    float field = fbm(q * 2.0 + warp * 0.7);
    float ridges = 1.0 - abs(sin((field + q.x * 0.18 - q.y * 0.12) * 13.0 - t));
    float vein = pow(clamp(ridges, 0.0, 1.0), 9.0);
    float bloom = pow(clamp(ridges, 0.0, 1.0), 2.8);
    color = mix(uColorA, uColorB, smoothstep(0.12, 0.86, field) * 0.72 + bloom * 0.18);
    color = mix(color, uColorC, vein);
  } else if (uGenerator < 20.5) {
    // Soft volumetric rays radiate from a moving off-canvas light source.
    vec2 origin = vec2(-0.22 + sin(t * 0.45) * 0.12, -0.82);
    vec2 ray = p - origin;
    float angle = atan(ray.y, ray.x);
    float radius = length(ray);
    float turbulence = fbm(vec2(angle * 2.2, radius * 0.75 - t * 0.25));
    float beams = pow(max(0.0, sin(angle * 13.0 + turbulence * 4.2 + t * 0.5)), 10.0);
    float cone = smoothstep(1.7, 0.12, radius) * smoothstep(-0.2, 0.55, ray.y);
    float ambient = fbm(p * 1.4 + vec2(0.0, -t * 0.08)) * 0.28;
    color = mix(uColorA, uColorB, ambient + beams * cone * 0.55);
    color = mix(color, uColorC, beams * cone * 0.88);
  } else if (uGenerator < 21.5) {
    // Animated cellular distances produce dimensional glass-like Voronoi cells.
    vec2 q = p * 3.6;
    vec2 cell = floor(q);
    vec2 local = fract(q);
    float nearest = 10.0;
    float secondNearest = 10.0;
    float cellTone = 0.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 offset = vec2(float(x), float(y));
        vec2 id = cell + offset;
        vec2 point = vec2(hash21(id), hash21(id + 31.73));
        point = 0.5 + 0.42 * sin(t * 0.9 + 6.2831 * point);
        float distanceToPoint = length(offset + point - local);
        if (distanceToPoint < nearest) {
          secondNearest = nearest;
          nearest = distanceToPoint;
          cellTone = hash21(id + 8.31);
        } else if (distanceToPoint < secondNearest) {
          secondNearest = distanceToPoint;
        }
      }
    }
    float edge = smoothstep(0.12, 0.015, secondNearest - nearest);
    float core = smoothstep(0.74, 0.08, nearest);
    color = mix(uColorA, uColorB, cellTone * 0.62 + core * 0.22);
    color = mix(color, uColorC, edge * 0.9);
  } else {
    // Polar domain warping creates broad silk-like spiral bands with depth.
    vec2 q = p;
    float radius = length(q);
    float angle = atan(q.y, q.x);
    float warp = fbm(vec2(angle * 1.8, radius * 2.8 - t * 0.35));
    float spiral = sin(angle * 5.0 + radius * 15.0 - t * 1.6 + warp * 5.0);
    float band = smoothstep(-0.9, 0.88, spiral);
    float highlight = pow(1.0 - abs(spiral), 8.0);
    color = mix(uColorA, uColorB, band);
    color = mix(color, uColorC, highlight * 0.78 + smoothstep(0.8, 0.05, radius) * 0.08);
  }

  return clamp(color, 0.0, 1.0);
}

vec3 sourceAt(vec2 uv) {
  if (uHasSource > 0.5) {
    float canvasAspect = uResolution.x / uResolution.y;
    return texture(uTexture, coverUv(uv, uSourceAspect, canvasAspect)).rgb;
  }
  return generatedSource(uv);
}

`;
