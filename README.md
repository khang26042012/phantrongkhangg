# Galaxy Portfolio — Mysterious Galaxy

A personal portfolio website built with **Next.js 15**, **Three.js**, **React Three Fiber**, **GSAP**, and **Tailwind CSS**. Featuring a monochrome black & white aesthetic with a single pale-gold accent, dense post-processing effects, and a scroll-driven camera flight through a galaxy scene.

## Live Preview

Once deployed: https://phantrongkhangg.vercel.app

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict) |
| **3D Engine** | Three.js r0.182 |
| **3D React** | @react-three/fiber v9 + @react-three/drei |
| **Post-Processing** | @react-three/postprocessing (Bloom, ChromaticAberration, DepthOfField, Vignette) |
| **Animation** | GSAP + ScrollTrigger |
| **Smooth Scroll** | Lenis |
| **State** | Zustand |
| **Styling** | Tailwind CSS v4 |
| **Fonts** | Fraunces (display) + Inter (body) via next/font |
| **Deploy** | Vercel (auto-build on push) |

## Art Direction

- **Monochrome**: Black (#000000) to deep charcoal (#0A0A0A) with gray midtones
- **Single gold accent**: #E8D5A0 — used only for cursor glow, one crystal, hover states
- **Post-processing**: Bloom (low threshold, moderate intensity), subtle chromatic aberration, depth of field, vignette, film grain overlay
- **Custom shaders**: Starfield with depth fade + twinkle, planet with Fresnel rim light + gold accent point
- **Typography**: Fraunces serif for display, Inter sans for body — both with letter-by-letter reveal

## Structure

```
src/
+-- app/
|   +-- globals.css          # Tailwind + all custom styles
|   +-- layout.tsx           # Root layout with fonts + metadata
|   +-- page.tsx             # Main page (client component)
+-- components/
|   +-- GalaxyCanvas.tsx     # Legacy 2D canvas (kept for reference)
|   +-- Loader.tsx           # CSS-only loading screen
+-- data/
|   +-- mockData.ts          # Personal info, skills, projects, experience
+-- store/
|   +-- useAppStore.ts       # Zustand store (scroll progress, section state)
+-- three/
    +-- palette.ts           # Centralized color palette
    +-- StarField.tsx        # Custom shader starfield (4000 points)
    +-- Planet.tsx           # Fresnel rim-light planet with gold accent
    +-- Crystals.tsx         # Floating instanced crystals
    +-- CameraRig.tsx        # Scroll-driven Catmull-Rom spline camera
    +-- Effects.tsx          # Post-processing stack
    +-- GalaxyScene.tsx      # Main Canvas wrapper
```

## Sections

1. **Hero** — Distant galaxy view, name reveal with letter-by-letter animation
2. **About** — Bio + stats, camera moves closer to the planet
3. **Skills** — Floating crystals, skill bars with GSAP animation
4. **Projects** — 5 project cards with hover effects
5. **Experience** — Timeline of roles
6. **Contact** — Email + social links, camera near the surface

## Performance

- Mobile: reduced star count (1200 vs 4000), no post-processing, lower DPR
- Adaptive DPR via @react-three/drei
- CSS grain overlay instead of per-frame noise pass
- Client-only dynamic imports for all Three.js components (SSR-safe)

## Deploying

Push to `main` on GitHub — Vercel auto-builds.

## License

MIT — free for personal portfolio use.