// Zustand store - manages scroll progress, section state, loader visibility
import { create } from 'zustand';

export type SectionId = 'hero' | 'about' | 'skills' | 'projects' | 'experience' | 'contact';

interface AppStore {
  loaded: boolean;
  scrollProgress: number;
  currentSection: SectionId;
  mouse: { x: number; y: number };
  setLoaded: (v: boolean) => void;
  setScrollProgress: (v: number) => void;
  setCurrentSection: (s: SectionId) => void;
  setMouse: (x: number, y: number) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  loaded: false,
  scrollProgress: 0,
  currentSection: 'hero',
  mouse: { x: 0, y: 0 },
  setLoaded: (v) => set({ loaded: v }),
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setCurrentSection: (s) => set({ currentSection: s }),
  setMouse: (x, y) => set({ mouse: { x, y } }),
}));