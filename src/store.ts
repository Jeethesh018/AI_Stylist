import { create } from 'zustand';
import { buildResults } from './data/recommendations';
import type { Mode, ResultItem } from './types';

type Point = { x: number; y: number };

type StylistState = {
  image: string | null;
  zoom: number;
  position: Point;
  mode: Mode;
  faceShape: 'oval' | 'round' | 'square' | 'heart';
  skinTone: 'fair' | 'medium' | 'deep';
  selectedStyle: ResultItem | null;
  results: ResultItem[];
  overlayOpacity: number;
  isLoading: boolean;
  error: string | null;
  isSidebarCollapsed: boolean;
  setImage: (image: string | null) => void;
  setZoom: (zoom: number) => void;
  setPosition: (position: Point) => void;
  setMode: (mode: Mode) => void;
  setFaceShape: (faceShape: StylistState['faceShape']) => void;
  setSkinTone: (skinTone: StylistState['skinTone']) => void;
  setSelectedStyle: (style: ResultItem) => void;
  setOverlayOpacity: (value: number) => void;
  resetCanvas: () => void;
  toggleSidebar: () => void;
  refreshResults: () => void;
};

const initialMode: Mode = 'hairstyle';
const initialFace = 'oval';
const initialTone = 'medium';

export const useStylistStore = create<StylistState>((set, get) => ({
  image: null,
  zoom: 1,
  position: { x: 0, y: 0 },
  mode: initialMode,
  faceShape: initialFace,
  skinTone: initialTone,
  selectedStyle: null,
  results: buildResults(initialMode, initialFace, initialTone),
  overlayOpacity: 0.5,
  isLoading: false,
  error: null,
  isSidebarCollapsed: false,
  setImage: (image) =>
    set({
      image,
      error: image ? null : 'Upload an image to start styling.'
    }),
  setZoom: (zoom) => set({ zoom: Math.min(2.5, Math.max(0.4, zoom)) }),
  setPosition: (position) => set({ position }),
  setMode: (mode) => {
    set({ mode, isLoading: true });
    window.setTimeout(() => {
      const { faceShape, skinTone } = get();
      set({
        results: buildResults(mode, faceShape, skinTone),
        selectedStyle: null,
        isLoading: false
      });
    }, 250);
  },
  setFaceShape: (faceShape) => {
    set({ faceShape });
    get().refreshResults();
  },
  setSkinTone: (skinTone) => {
    set({ skinTone });
    get().refreshResults();
  },
  setSelectedStyle: (selectedStyle) => set({ selectedStyle }),
  setOverlayOpacity: (overlayOpacity) => set({ overlayOpacity }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  refreshResults: () => {
    const { mode, faceShape, skinTone } = get();
    set({
      results: buildResults(mode, faceShape, skinTone),
      selectedStyle: null
    });
  },
  resetCanvas: () =>
    set((state) => ({
      zoom: 1,
      position: { x: 0, y: 0 },
      selectedStyle: null,
      overlayOpacity: 0.5,
      error: state.image ? null : 'Upload an image to start styling.'
    }))
}));
