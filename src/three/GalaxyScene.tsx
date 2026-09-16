// Main Three.js scene: background, lighting, galaxy core, particles, crystals,
// camera rig and post-processing. This is the single client-only Canvas.
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { StarField } from '@/three/StarField';
import { Planet } from '@/three/Planet';
import { Crystals } from '@/three/Crystals';
import { CameraRig } from '@/three/CameraRig';
import { Effects } from '@/three/Effects';
import { useAppStore } from '@/store/useAppStore';

// --- Background gradient (vertical, black -> #0A0A0A) ---
function BackgroundGradient() {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#000000');
    grad.addColorStop(0.55, '#08080a');
    grad.addColorStop(1, '#0A0A0A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return <color attach="background" args={['#000000']} />;
}

// --- Mono lighting: a key rim light + soft fill, both near-white ---
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.18} color="#F0F0F5" />
      <directionalLight position={[8, 6, 10]} intensity={1.6} color="#F5F5F5" />
      <directionalLight position={[-6, -4, -8]} intensity={0.5} color="#4D4D4D" />
      <pointLight position={[0, 0, 6]} intensity={0.6} color="#E8D5A0" distance={20} />
    </>
  );
}

// --- Galaxy core: a soft glowing nebula behind the planet ---
function GalaxyCore() {
  return (
    <mesh position={[0, 0, -8]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[7, 0.15, 16, 200]} />
      <meshBasicMaterial color="#F0F0F5" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

// --- Device detection (runs once on mount) ---
function useDevice() {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('desktop');
  const [quality, setQuality] = useState<'high' | 'low'>('high');
  useEffect(() => {
    const mobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    setDevice(mobile ? 'mobile' : 'desktop');
    setQuality(mobile || lowMemory ? 'low' : 'high');
  }, []);
  return { device, quality };
}

// --- Scene content (inside Canvas) ---
function SceneContent({ device, quality }: { device: 'mobile' | 'desktop'; quality: 'high' | 'low' }) {
  const starCount = device === 'mobile' ? 1200 : 4000;
  return (
    <>
      <BackgroundGradient />
      <Lighting />
      <GalaxyCore />
      <StarField count={starCount} radius={55} spread={1.6} />
      <Planet position={[0, 0, 0]} scale={1} />
      <Crystals count={device === 'mobile' ? 8 : 14} />
      <CameraRig />
      <Effects quality={quality} device={device} />
      <AdaptiveDpr pixelated />
    </>
  );
}

export function GalaxyScene() {
  const [ready, setReady] = useState(false);
  const setLoaded = useAppStore((s) => s.setLoaded);
  const { device, quality } = useDevice();

  useEffect(() => {
    // The Canvas is fully mounted; signal the loader to fade out
    const t = setTimeout(() => {
      setReady(true);
      setLoaded(true);
    }, 800);
    return () => clearTimeout(t);
  }, [setLoaded]);

  return (
    <div className="galaxy-canvas" style={{ opacity: ready ? 1 : 0, transition: 'opacity 1.2s ease' }}>
      <Canvas
        dpr={[1, quality === 'high' ? 2 : 1.5]}
        gl={{
          antialias: quality === 'high',
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 2, 22], fov: 45, near: 0.1, far: 200 }}
        onCreated={() => {
          // Keep the color management consistent with our monochrome palette
          (window as any).__galaxyReady = true;
        }}
      >
        <SceneContent device={device} quality={quality} />
      </Canvas>
    </div>
  );
}