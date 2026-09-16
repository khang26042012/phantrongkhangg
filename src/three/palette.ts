// Centralized art-direction palette for the entire Three.js scene.
// Monochrome black & white with a single pale-gold accent.
import * as THREE from 'three';

export const PALETTE = {
  // Background gradient
  bgTop: new THREE.Color('#000000'),
  bgBottom: new THREE.Color('#0A0A0A'),

  // Midtones
  mid1: new THREE.Color('#1A1A1A'),
  mid2: new THREE.Color('#4D4D4D'),

  // Particles & stars
  star: new THREE.Color('#FFFFFF'),
  silver: new THREE.Color('#F0F0F5'),

  // Text
  text: new THREE.Color('#F5F5F5'),

  // The single pale-gold accent
  gold: new THREE.Color('#E8D5A0'),
} as const;

export const GOLD_HEX = '#E8D5A0';