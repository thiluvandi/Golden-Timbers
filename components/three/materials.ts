import * as THREE from "three";

const NOISE_GLSL = `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123); }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * vnoise(p);
      p *= 2.02;
      amp *= 0.5;
    }
    return v;
  }
`;

const VARYING_INJECT = `
  varying vec3 vLocalPos;
`;

function withLocalPosition(shader: THREE.WebGLProgramParametersWithUniforms) {
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", `#include <common>\n${VARYING_INJECT}`)
    .replace(
      "#include <begin_vertex>",
      "#include <begin_vertex>\nvLocalPos = position;"
    );
}

/** Bark: rough vertical fissures + mottled fbm noise between two wood-brown tones. */
export function createBarkMaterial(colorA: string, colorB: string) {
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.95,
    metalness: 0.0,
  });

  material.onBeforeCompile = (shader) => {
    withLocalPosition(shader);
    shader.uniforms.uColorA = { value: new THREE.Color(colorA) };
    shader.uniforms.uColorB = { value: new THREE.Color(colorB) };
    shader.uniforms.uSeed = { value: Math.random() * 12.0 };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        ${VARYING_INJECT}
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uSeed;
        ${NOISE_GLSL}`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float bAngle = atan(vLocalPos.z, vLocalPos.x);
        float bAlong = vLocalPos.y;
        float bBody = fbm(vec2(bAngle * 2.4, bAlong * 1.3 + uSeed) * 3.0);
        float bFissure = fbm(vec2(bAngle * 42.0 + uSeed, bAlong * 2.4));
        float bMask = clamp(bBody * 0.6 + bFissure * 0.55, 0.0, 1.0);
        diffuseColor.rgb = mix(uColorA, uColorB, bMask);`
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        roughnessFactor = clamp(roughnessFactor * (0.75 + 0.4 * bFissure), 0.35, 1.0);`
      );

    material.userData.shader = shader;
  };

  return material;
}

/** Cross-section: concentric growth rings radiating from the heart, with a lighter sapwood band. */
export function createRingMaterial(radius: number, heart: string, mid: string, sapwood: string) {
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.55,
    metalness: 0.0,
  });

  material.onBeforeCompile = (shader) => {
    withLocalPosition(shader);
    shader.uniforms.uHeart = { value: new THREE.Color(heart) };
    shader.uniforms.uMid = { value: new THREE.Color(mid) };
    shader.uniforms.uSapwood = { value: new THREE.Color(sapwood) };
    shader.uniforms.uRadius = { value: radius };
    shader.uniforms.uSeed = { value: Math.random() * 12.0 };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        ${VARYING_INJECT}
        uniform vec3 uHeart;
        uniform vec3 uMid;
        uniform vec3 uSapwood;
        uniform float uRadius;
        uniform float uSeed;
        ${NOISE_GLSL}`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float rR = length(vLocalPos.xz);
        float rA = atan(vLocalPos.z, vLocalPos.x);
        float rWobble = fbm(vec2(rA * 2.5, rR * 1.5) + uSeed) * 0.05;
        float rRings = sin((rR + rWobble) * 24.0) * 0.5 + 0.5;
        rRings = smoothstep(0.32, 0.68, rRings);
        float rGrain = fbm(vec2(rA * 9.0, rR * 12.0 + uSeed)) * 0.18;
        vec3 rBase = mix(uHeart, uMid, clamp(rRings + rGrain, 0.0, 1.0));
        float rEdge = smoothstep(0.72, 0.94, rR / uRadius);
        rBase = mix(rBase, uSapwood, rEdge * 0.55);
        float rCenter = 1.0 - smoothstep(0.0, 0.1, rR);
        rBase = mix(rBase, uHeart * 0.7, rCenter);
        diffuseColor.rgb = rBase;`
      );

    material.userData.shader = shader;
  };

  return material;
}

/** Milled facet: smooth, planed grain — long directional streaks instead of bark noise. */
export function createMillMaterial(colorA: string, colorB: string) {
  const material = new THREE.MeshStandardMaterial({
    roughness: 0.32,
    metalness: 0.05,
  });

  material.onBeforeCompile = (shader) => {
    withLocalPosition(shader);
    shader.uniforms.uColorA = { value: new THREE.Color(colorA) };
    shader.uniforms.uColorB = { value: new THREE.Color(colorB) };
    shader.uniforms.uSeed = { value: Math.random() * 12.0 };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        ${VARYING_INJECT}
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uSeed;
        ${NOISE_GLSL}`
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float mAngle = atan(vLocalPos.z, vLocalPos.x);
        float mAlong = vLocalPos.y;
        float mStreak = fbm(vec2(mAlong * 1.1 + uSeed, mAngle * 30.0)) * 0.6
          + fbm(vec2(mAlong * 5.5 + uSeed, 0.0)) * 0.4;
        float mBands = sin(mAlong * 46.0 + mStreak * 5.0) * 0.5 + 0.5;
        mBands = smoothstep(0.28, 0.72, mBands);
        diffuseColor.rgb = mix(uColorA, uColorB, mBands * 0.55 + mStreak * 0.45);`
      );

    material.userData.shader = shader;
  };

  return material;
}
