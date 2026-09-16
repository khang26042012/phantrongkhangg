// Soft-glow starfield with a custom shader: depth fade + twinkle.
// Uses additive blending so overlapping stars bloom naturally.
'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE } from '@/three/palette';

interface StarFieldProps {
  count?: number;
  radius?: number;
  spread?: number;
}

const STAR_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  varying float vAlpha;
  varying float vSize;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Depth-based size attenuation + twinkle
    float dist = length(mvPosition.xyz);
    float twinkle = 0.75 + 0.25 * sin(aPhase + position.x * 0.05 + position.y * 0.05);
    float size = aSize * twinkle * (260.0 / dist);
    gl_PointSize = clamp(size, 1.0, 12.0);

    // Depth fade: distant stars dimmer
    vAlpha = smoothstep(80.0, 10.0, dist);
    vSize = size;
  }
`;

const STAR_FRAGMENT = /* glsl */ `
  varying float vAlpha;
  varying float vSize;
  uniform vec3 uColor;
  uniform float uGlobalAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Soft radial glow falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow = pow(glow, 2.0);

    float a = glow * vAlpha * uGlobalAlpha;
    if (a < 0.003) discard;

    gl_FragColor = vec4(uColor, a);
  }
`;

export function StarField({ count = 4000, radius = 60, spread = 1.6 }: StarFieldProps) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: PALETTE.star.clone() },
      uGlobalAlpha: { value: 0.9 },
    }),
    []
  );

  const { positions, sizes, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.pow(Math.random(), spread);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 3.5 + 0.5;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, sizes, phases };
  }, [count, radius, spread]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={STAR_VERTEX}
        fragmentShader={STAR_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}