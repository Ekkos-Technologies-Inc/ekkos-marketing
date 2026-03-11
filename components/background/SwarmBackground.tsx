'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// ── Tuning ──
const BG_COLOR = 0x06060e;
const FOG_DENSITY = 0.035;
const BLOOM_STRENGTH = 0.45;
const BLOOM_RADIUS = 0.5;
const BLOOM_THRESHOLD = 0.6;
const SWIRL_STRENGTH = 0.35;
const DAMPING = 0.55;
const SPAWN_RADIUS_MIN = 1.5;
const SPAWN_RADIUS_MAX = 4.5;
const PARTICLE_COLOR = [0.0, 0.94, 1.0]; // cyan
const TRAIL_COLOR = [1.0, 0.72, 0.0]; // amber

// ── GPU velocity shader (swirl + curl noise only) ──
const velocityShader = /* glsl */ `
uniform float uTime;
uniform float uDelta;
uniform float uSwirlStrength;
uniform float uDamping;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 posData = texture2D(tPosition, uv);
    vec4 velData = texture2D(tVelocity, uv);

    vec3 pos = posData.xyz;
    vec3 vel = velData.xyz;

    float r = length(pos.xz);
    float theta = atan(pos.z, pos.x);

    // Swirl
    vec3 tangent = vec3(-sin(theta), 0.0, cos(theta));
    tangent.y += sin(pos.y * 2.5 + uTime * 0.8) * 0.4;
    vec3 swirlForce = tangent * uSwirlStrength / max(r, 0.4);

    // Curl noise
    float n1 = sin(pos.x * 3.1 + uTime * 0.7) * cos(pos.z * 2.7 + uTime * 0.5);
    float n2 = sin(pos.y * 4.3 - uTime * 0.9) * cos(pos.x * 2.1 + uTime * 0.3);
    float n3 = cos(pos.z * 3.7 + uTime * 0.6) * sin(pos.y * 2.9 - uTime * 0.4);
    vec3 curlForce = vec3(n2 - n3, n3 - n1, n1 - n2) * 0.15;

    // Gentle centering
    vec3 centerForce = -pos * 0.012;

    vel += (swirlForce + curlForce + centerForce) * uDelta;
    vel *= max(0.0, 1.0 - uDamping * uDelta);

    gl_FragColor = vec4(vel, 1.0);
}
`;

// ── GPU position shader ──
const positionShader = /* glsl */ `
uniform float uDelta;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 posData = texture2D(tPosition, uv);
    vec4 velData = texture2D(tVelocity, uv);

    vec3 pos = posData.xyz + velData.xyz * uDelta;

    // Soft boundary
    float dist = length(pos);
    if (dist > 6.0) {
        pos -= normalize(pos) * (dist - 6.0) * 0.3;
    }

    gl_FragColor = vec4(pos, 1.0);
}
`;

// ── Render shaders ──
const renderVert = /* glsl */ `
attribute vec2 reference;
uniform sampler2D tPosition;
uniform float uPixelRatio;

varying float vDist;

void main() {
    vec4 posData = texture2D(tPosition, reference);
    vec3 pos = posData.xyz;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;

    vDist = -mvPos.z;
    gl_PointSize = 2.5 * uPixelRatio;
}
`;

const renderFrag = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uTrailColor;

varying float vDist;

void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.05, d);
    float alpha = core * 0.25;
    vec3 color = mix(uTrailColor, uColor, smoothstep(0.45, 0.0, d));

    float distFade = smoothstep(11.0, 1.3, vDist);
    alpha *= distFade;

    gl_FragColor = vec4(color, alpha);
}
`;

function getTexSize() {
  if (typeof window === 'undefined') return 224;
  return window.innerWidth < 768 ? 158 : 224;
}

function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Reduced motion check
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const TEX_SIZE = getTexSize();
    const PARTICLE_COUNT = TEX_SIZE * TEX_SIZE;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // ── Scene ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG_COLOR);
    scene.fog = new THREE.FogExp2(BG_COLOR, FOG_DENSITY);

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    // ── Post-processing ──
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        BLOOM_STRENGTH,
        BLOOM_RADIUS,
        BLOOM_THRESHOLD
      )
    );
    composer.addPass(new OutputPass());

    // ── GPU Compute ──
    const gpuCompute = new GPUComputationRenderer(
      TEX_SIZE,
      TEX_SIZE,
      renderer
    );

    const posTex = gpuCompute.createTexture();
    const velTex = gpuCompute.createTexture();
    const posArray = posTex.image.data;
    const velArray = velTex.image.data;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i4 = i * 4;
      const phi = Math.random() * Math.PI * 2;
      const cosTheta = Math.random() * 2 - 1;
      const sinTheta = Math.sqrt(1 - cosTheta * cosTheta);
      const r =
        SPAWN_RADIUS_MIN +
        Math.random() * (SPAWN_RADIUS_MAX - SPAWN_RADIUS_MIN);

      posArray[i4] = sinTheta * Math.cos(phi) * r;
      posArray[i4 + 1] = cosTheta * r;
      posArray[i4 + 2] = sinTheta * Math.sin(phi) * r;
      posArray[i4 + 3] = 1.0;

      velArray[i4] = (Math.random() - 0.5) * 0.5;
      velArray[i4 + 1] = (Math.random() - 0.5) * 0.3;
      velArray[i4 + 2] = (Math.random() - 0.5) * 0.5;
      velArray[i4 + 3] = 1.0;
    }

    const posVar = gpuCompute.addVariable(
      'tPosition',
      positionShader,
      posTex
    );
    const velVar = gpuCompute.addVariable(
      'tVelocity',
      velocityShader,
      velTex
    );

    gpuCompute.setVariableDependencies(posVar, [posVar, velVar]);
    gpuCompute.setVariableDependencies(velVar, [posVar, velVar]);

    const sharedUniforms = {
      uTime: { value: 0 },
      uDelta: { value: 0.016 },
      uSwirlStrength: { value: SWIRL_STRENGTH },
      uDamping: { value: DAMPING },
    };

    for (const [key, val] of Object.entries(sharedUniforms)) {
      posVar.material.uniforms[key] = val;
      velVar.material.uniforms[key] = val;
    }

    posVar.wrapS = THREE.RepeatWrapping;
    posVar.wrapT = THREE.RepeatWrapping;
    velVar.wrapS = THREE.RepeatWrapping;
    velVar.wrapT = THREE.RepeatWrapping;

    const error = gpuCompute.init();
    if (error !== null) {
      console.error('GPUComputationRenderer init failed:', error);
      return;
    }

    // ── Render geometry ──
    const geometry = new THREE.BufferGeometry();
    const references = new Float32Array(PARTICLE_COUNT * 2);
    const dummyPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      references[i * 2] = (i % TEX_SIZE + 0.5) / TEX_SIZE;
      references[i * 2 + 1] =
        (Math.floor(i / TEX_SIZE) + 0.5) / TEX_SIZE;
    }

    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(dummyPositions, 3)
    );
    geometry.setAttribute(
      'reference',
      new THREE.BufferAttribute(references, 2)
    );

    const renderMat = new THREE.ShaderMaterial({
      uniforms: {
        tPosition: { value: null },
        uColor: { value: new THREE.Color(...PARTICLE_COLOR) },
        uTrailColor: { value: new THREE.Color(...TRAIL_COLOR) },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: renderVert,
      fragmentShader: renderFrag,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, renderMat);
    points.frustumCulled = false;
    scene.add(points);

    // ── Starfield ──
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      starPositions[i * 3 + 2] = -20 - Math.random() * 60;
    }
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      color: 0x445566,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let animId: number;

    function animate() {
      animId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      sharedUniforms.uTime.value = elapsed;
      sharedUniforms.uDelta.value = delta;

      gpuCompute.compute();
      renderMat.uniforms.tPosition.value =
        gpuCompute.getCurrentRenderTarget(posVar).texture;

      composer.render();
    }

    if (prefersReduced) {
      // Compute a single frame then stop
      sharedUniforms.uTime.value = 0;
      sharedUniforms.uDelta.value = 0.5;
      gpuCompute.compute();
      renderMat.uniforms.tPosition.value =
        gpuCompute.getCurrentRenderTarget(posVar).texture;
      composer.render();
    } else {
      animate();
    }

    // ── Resize ──
    function onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      renderMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}

export default SwarmCanvas;
