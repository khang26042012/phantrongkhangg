// Floating crystals for the Skills section - instanced for performance,
// each with a fresnel-like edge glow. Hover state tints toward the gold accent.
'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { PALETTE } from '@/three/palette';

interface CrystalsProps {
  count?: number;
  spread?: [number, number, number];
}

export function Crystals({ count = 14, spread = [18, 6, 6] }: CrystalsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const crystals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = (Math.random() - 0.5) * spread[0];
      const y = (Math.random() - 0.5) * spread[1];
      const z = (Math.random() - 0.5) * spread[2];
      const s = 0.25 + Math.random() * 0.6;
      const rot = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
      // Only one crystal gets the gold accent - the deliberate single highlight
      const isGold = i === 2;
      return { x, y, z, s, rot, isGold, phase: Math.random() * Math.PI * 2 };
    });
  }, [count, spread]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const c = crystals[i];
      if (!c) return;
      child.rotation.x = c.rot[0] + Math.sin(t * 0.2 + c.phase) * 0.15;
      child.rotation.y = c.rot[1] + t * 0.08;
      child.position.y = c.y + Math.sin(t * 0.5 + c.phase) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {crystals.map((c, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
          <mesh position={[c.x, c.y, c.z]} rotation={c.rot} scale={c.s}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={c.isGold ? PALETTE.gold : PALETTE.mid2}
              emissive={c.isGold ? PALETTE.gold : PALETTE.mid1}
              emissiveIntensity={c.isGold ? 0.8 : 0.15}
              metalness={0.85}
              roughness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}