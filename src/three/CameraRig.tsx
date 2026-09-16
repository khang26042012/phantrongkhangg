// Camera rig: a single camera that flies along a Catmull-Rom spline
// driven by scroll progress. Smooth lookAt keeps the subject centered.
'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/store/useAppStore';

interface CameraRigProps {
  // Keyframe positions (P = position, L = look target) along the scroll path
  path?: { position: [number, number, number]; look: [number, number, number] }[];
}

export function CameraRig({ path }: CameraRigProps) {
  const { camera } = useThree();
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  // Default: a vertical journey from a distant hero view down into the contact workspace
  const defaultPath = useMemo(() => {
    const stops: { position: [number, number, number]; look: [number, number, number] }[] = [
      // Hero - far out, looking at the galaxy core
      { position: [0, 2, 22], look: [0, 0, 0] },
      // About - closer, planet comes into frame
      { position: [6, 1.5, 14], look: [0, 0, 0] },
      // Skills - drifting past the crystals
      { position: [-4, -1, 10], look: [0, 0, 0] },
      // Projects - angled wide
      { position: [5, 3, 8], look: [0, 0, 0] },
      // Experience - side profile
      { position: [-6, 0, 7], look: [0, 0, 0] },
      // Contact - near the surface
      { position: [0, -2, 6], look: [0, 0, 0] },
    ];
    return stops;
  }, []);

  const points = useMemo(
    () => path ?? defaultPath,
    [path, defaultPath]
  );

  const positionCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p.position)),
      false,
      'catmullrom',
      0.4
    );
  }, [points]);

  const lookCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p.look)),
      false,
      'catmullrom',
      0.4
    );
  }, [points]);

  // Smoothed progress to avoid jitter
  const smoothProgress = useRef(0);
  const lookTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const t = Math.min(Math.max(scrollProgress / 100, 0), 1);
    smoothProgress.current += (t - smoothProgress.current) * Math.min(1, delta * 3.5);

    const p = positionCurve.getPointAt(smoothProgress.current);
    const l = lookCurve.getPointAt(smoothProgress.current);

    // Subtle idle breathing so the camera is never perfectly still
    const breathe = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;

    camera.position.x = p.x + breathe;
    camera.position.y = p.y + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    camera.position.z = p.z;

    lookTarget.current.lerp(l, Math.min(1, delta * 4));
    camera.lookAt(lookTarget.current);
  });

  useEffect(() => {
    // Ensure the camera starts at the first keyframe
    const first = points[0];
    camera.position.set(...first.position);
    lookTarget.current.set(...first.look);
    camera.lookAt(lookTarget.current);
  }, [camera, points]);

  return null;
}