import { create } from 'zustand';
import { buildResults } from './data/recommendations';
import { generateTryOnImage } from './lib/replicate';
import type { Mode, ResultItem, TryOnStyle } from './types';

type Point = { x: number; y: number };

type StylistState = {
  image: string | null;
  generatedImage: string | null;
  zoom: number;
  position: Point;
  mode: Mode;
  faceShape: 'oval' | 'round' | 'square' | 'heart';
  skinTone: 'fair' | 'medium' | 'deep';
  selectedStyle: ResultItem | null;
  results: ResultItem[];
  overlayOpacity: number;
  isLoading: boolean;
  isGenerating: boolean;
  generationError: string | null;
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
  runTryOn: (style: TryOnStyle) => Promise<void>;
  resetCanvas: () => void;
  toggleSidebar: () => void;
  refreshResults: () => void;
};

const initialMode: Mode = 'hairstyle';
const initialFace = 'oval';
const initialTone = 'medium';

export const useStylistStore = create<StylistState>((set, get) => ({
  image: null,
  generatedImage: null,
  zoom: 1,
  position: { x: 0, y: 0 },
  mode: initialMode,
  faceShape: initialFace,
  skinTone: initialTone,
  selectedStyle: null,
  results: buildResults(initialMode, initialFace, initialTone),
  overlayOpacity: 0.5,
  isLoading: false,
  isGenerating: false,
  generationError: null,
  error: null,
  isSidebarCollapsed: false,
  setImage: (image) =>
    set({
      image,
      generatedImage: null,
      error: image ? null : 'Upload an image to start styling.',
      generationError: null
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
  runTryOn: async (style) => {
    const { generatedImage, image } = get();
    const sourceImage = generatedImage ?? image;

    if (!sourceImage) {
      set({ generationError: 'Upload an image before running AI try-on.' });
      return;
    }

    set({ isGenerating: true, generationError: null, error: null });

    try {
      const output = await generateTryOnImage(sourceImage, style);
      set({ generatedImage: output, isGenerating: false, generationError: null, selectedStyle: null });
    } catch (error) {
      set({
        isGenerating: false,
        generationError: error instanceof Error ? error.message : 'AI try-on failed.'
      });
    }
  },
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
      generatedImage: null,
      selectedStyle: null,
      overlayOpacity: 0.5,
      error: state.image ? null : 'Upload an image to start styling.',
      generationError: null
    }))
}));
