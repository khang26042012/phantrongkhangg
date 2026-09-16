// A dark planet with a fresnel rim light - the signature 'monochrome sphere with rim glow' effect.
// Fresnel computed manually so it stays sharp at grazing angles.
'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PALETTE } from '@/three/palette';

const PLANET_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    vec4 viewPos = viewMatrix * worldPos;
    vViewDir = normalize(-viewPos.xyz);
    gl_Position = projectionMatrix * viewPos;
  }
`;

const PLANET_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;

  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uAccentColor;
  uniform float uAccentStrength;
  uniform float uTime;

  // Cheap hash-based noise for surface mottling
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vViewDir), 0.0), 2.5);

    // Surface detail from world position
    vec2 surf = vWorldPos.xy * 0.5 + vWorldPos.z * 0.3;
    float mottle = noise(surf + uTime * 0.02) * 0.5 + noise(surf * 2.0) * 0.25;
    vec3 base = mix(uBaseColor, uRimColor * 0.25, mottle);

    // Rim light - the hero effect
    vec3 rim = uRimColor * fresnel * 1.2;

    // Single gold accent point - a bright spot that drifts slowly
    vec3 accentDir = normalize(vec3(sin(uTime * 0.15), 0.4, cos(uTime * 0.15)));
    float accent = pow(max(dot(vNormal, accentDir), 0.0), 30.0);
    vec3 goldSpot = uAccentColor * accent * uAccentStrength;

    vec3 color = base + rim + goldSpot;

    // Soft ambient floor so the dark side isn't pure black
    float ambient = 0.04;
    color = max(color, uBaseColor * ambient + 0.015);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function Planet({ position = [0, 0, 0] as [number, number, number], scale = 1 }) {
  const uniforms = useMemo(
    () => ({
      uBaseColor: { value: new THREE.Color('#0d0d0f') },
      uRimColor: { value: PALETTE.silver.clone() },
      uAccentColor: { value: PALETTE.gold.clone() },
      uAccentStrength: { value: 0.9 },
      uTime: { value: 0 },
    }),
    []
  );

  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[3.2, 64]} />
      <shaderMaterial uniforms={uniforms} vertexShader={PLANET_VERTEX} fragmentShader={PLANET_FRAGMENT} />
    </mesh>
  );
}