// Loading screen: a particle vortex + 'Đang xuyên qua hư không...' text.
// Pure CSS animation, no Three.js dependency so it can render before the Canvas is ready.
'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

export function Loader() {
  const loaded = useAppStore((s) => s.loaded);
  return (
    <div className={'loader' + (loaded ? ' loader--done' : '')} aria-hidden={loaded}>
      <div className="loader__vortex">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} className="loader__particle" style={{ ['--i' as any]: i }} />
        ))}
      </div>
      <div className="loader__text">
        <span className="loader__label">
          Đang xuyên qua hư không...
        </span>
        <span className="loader__bar">
          <span className="loader__bar-fill" />
        </span>
      </div>
    </div>
  );
}