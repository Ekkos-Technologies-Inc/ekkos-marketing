'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Simplex 3D noise (GLSL) ────────────────────────────────────────────────
const NOISE_GLSL = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

// ─── Tiny scattered particles (full-viewport coverage) ──────────────────────
const tinyVertexShader = /* glsl */ `
${NOISE_GLSL}

uniform float uTime;
uniform vec2 uMouse;
attribute float aRandom;
attribute float aSpeed;
attribute float aBrightness;

varying float vAlpha;
varying float vRandom;
varying float vMouseProximity;

void main() {
  vec3 pos = position;

  // Gentle drifting motion — each particle moves independently
  float t = uTime * aSpeed;
  pos.x += sin(t * 0.7 + aRandom * 6.28) * 0.3;
  pos.y += cos(t * 0.5 + aRandom * 4.17) * 0.25;
  pos.z += sin(t * 0.6 + aRandom * 5.33) * 0.2;

  // Subtle noise warp for organic feel
  float n = snoise(pos * 0.15 + uTime * 0.05) * 0.4;
  pos.y += n;

  // Mouse — dust floating away gently
  vec2 mouseWorld = uMouse * vec2(14.0, 10.0);
  vec2 toParticle = pos.xy - mouseWorld;
  float dist = length(toParticle);
  float strength = smoothstep(3.5, 0.5, dist) * 0.15;
  vec2 drift = normalize(toParticle + vec2(0.001)) * strength;
  // Add slight upward float like real dust
  drift.y += strength * 0.4;
  pos.xy += drift;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  // Dust-sized particles
  float size = mix(0.2, 0.8, aRandom);
  gl_PointSize = size * (150.0 / -mvPosition.z);

  // Twinkle effect
  float twinkle = sin(uTime * (1.5 + aRandom * 3.0) + aRandom * 6.28) * 0.5 + 0.5;
  vAlpha = aBrightness * (0.3 + twinkle * 0.7);
  // Subtle brighten near cursor
  vAlpha += strength * 0.2;
  vRandom = aRandom;
  vMouseProximity = strength;
}
`;

const tinyFragmentShader = /* glsl */ `
varying float vAlpha;
varying float vRandom;
varying float vMouseProximity;

void main() {
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float strength = 1.0 - dist * 2.0;
  strength = pow(strength, 2.0);

  // Green / emerald / teal palette
  vec3 emerald = vec3(0.20, 0.83, 0.50);
  vec3 green   = vec3(0.13, 0.70, 0.40);
  vec3 teal    = vec3(0.15, 0.75, 0.65);
  vec3 mint    = vec3(0.60, 0.95, 0.75);
  vec3 lime    = vec3(0.55, 0.90, 0.30);

  // Mix colors based on randomness
  vec3 color = mix(green, emerald, smoothstep(0.0, 0.45, vRandom));
  color = mix(color, teal, smoothstep(0.45, 0.75, vRandom));
  // A few bright mint sparkles
  color = mix(color, mint, smoothstep(0.90, 1.0, vRandom) * 0.5);
  // Subtle shift toward lime near cursor
  color = mix(color, lime, vMouseProximity * 0.4);

  gl_FragColor = vec4(color, strength * vAlpha * 0.75);
}
`;

// ─── Particle Field (fills viewport) ─────────────────────────────────────────
function ParticleField({ count = 150000, mouse }: { count?: number; mouse: React.RefObject<{ x: number; y: number }> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  // Smoothed mouse for lerp (avoids jerky particle movement)
  const smoothMouse = useRef({ x: 0, y: 0 });

  const { positions, randoms, speeds, brightnesses } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    const spd = new Float32Array(count);
    const brt = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Wide spread — covers the full viewport with depth
      pos[i * 3]     = (Math.random() - 0.5) * 40;  // x: wide
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;  // y: tall
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;  // z: depth layers

      rnd[i] = Math.random();
      spd[i] = 0.15 + Math.random() * 0.6;
      // Most particles dim, a few bright
      brt[i] = Math.random() < 0.15 ? 0.6 + Math.random() * 0.4 : 0.1 + Math.random() * 0.25;
    }
    return { positions: pos, randoms: rnd, speeds: spd, brightnesses: brt };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Smooth lerp toward actual mouse position
      const m = mouse.current;
      if (m) {
        smoothMouse.current.x += (m.x - smoothMouse.current.x) * 0.04;
        smoothMouse.current.y += (m.y - smoothMouse.current.y) * 0.04;
        matRef.current.uniforms.uMouse.value.set(smoothMouse.current.x, smoothMouse.current.y);
      }
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} count={count} itemSize={1} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} count={count} itemSize={1} />
        <bufferAttribute attach="attributes-aBrightness" args={[brightnesses, 1]} count={count} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={tinyVertexShader}
        fragmentShader={tinyFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Scene ──────────────────────────────────────────────────────────────────
function Scene({ mouse, count }: { mouse: React.RefObject<{ x: number; y: number }>; count: number }) {
  return <ParticleField count={count} mouse={mouse} />;
}

// ─── Exported Component ─────────────────────────────────────────────────────
export function PulseHero3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Use window-level listener so mouse tracking works even when
  // content overlays (z-10) sit above the canvas container (z-0)
  useEffect(() => {
    if (!mounted) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Normalize to -1..1 relative to the canvas container
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerLeave = (e: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Only reset when cursor actually leaves the container bounds
      const { clientX, clientY } = e;
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        mouseRef.current.x = 0;
        mouseRef.current.y = 0;
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene mouse={mouseRef} count={isMobile ? 80000 : 150000} />
      </Canvas>
    </div>
  );
}
