// Post-processing stack: Bloom, Chromatic Aberration, Depth of Field, Vignette.
// Noise/grain is handled as a CSS overlay layer for better control + no per-frame cost.
// Heavy effects are disabled on mobile via the device flag.
'use client';

import { useEffect, useRef } from 'react';
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

interface EffectsProps {
  quality: 'high' | 'low';
  device: 'mobile' | 'desktop';
}

export function Effects({ quality, device }: EffectsProps) {
  // Chromatic aberration offset - a tiny Vector2 keeps the fringing barely visible
  const offset = useRef(new THREE.Vector2(0.0006, 0.0004));

  useEffect(() => {
    // Recenter the offset on resize to keep it proportional
    const onResize = () => {
      const w = window.innerWidth;
      const factor = w > 768 ? 0.0008 : 0.0005;
      offset.current.set(factor, factor * 0.7);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isMobile = device === 'mobile';
  const isHigh = quality === 'high' && !isMobile;

  return (
    <EffectComposer multisampling={isHigh ? 4 : 0} enableNormalPass={false}>
      <Bloom
        intensity={isHigh ? 0.9 : 0.55}
        luminanceThreshold={0.18}
        luminanceSmoothing={0.55}
        radius={isHigh ? 0.85 : 0.6}
        mipmapBlur
      />
      <ChromaticAberration offset={offset.current} radialModulation modulationOffset={0.2} />
      {isHigh && (
        <DepthOfField
          focusDistance={0.02}
          focalLength={0.06}
          bokehScale={3}
          worldFocusDistance={14}
        />
      )}
      <Vignette offset={0.32} darkness={0.82} eskil={false} blendFunction={BlendFunction.MULTIPLY} />
    </EffectComposer>
  );
}