import type { Mode, ResultItem } from '../types';

const hairstyleMap: Record<string, ResultItem[]> = {
  oval: [
    { id: 'soft-layers', title: 'Soft Layers', description: 'Balanced volume framing the jawline.', category: 'hairstyles', overlay: 'radial-gradient(circle at 50% 24%, rgba(155, 84, 35, 0.7), transparent 42%)' },
    { id: 'sleek-bob', title: 'Sleek Bob', description: 'Refined silhouette with clean lines.', category: 'hairstyles', overlay: 'linear-gradient(180deg, rgba(40, 29, 22, 0.65), transparent 45%)' }
  ],
  round: [
    { id: 'long-waves', title: 'Long Waves', description: 'Lengthens proportions with soft movement.', category: 'hairstyles', overlay: 'linear-gradient(180deg, rgba(91, 58, 35, 0.62), transparent 50%)' },
    { id: 'textured-shag', title: 'Textured Shag', description: 'Adds structure and directional lift.', category: 'hairstyles', overlay: 'radial-gradient(circle at 52% 26%, rgba(130, 74, 46, 0.6), transparent 43%)' }
  ],
  square: [
    { id: 'curtain-fringe', title: 'Curtain Fringe', description: 'Softens forehead and angular corners.', category: 'hairstyles', overlay: 'radial-gradient(circle at 50% 22%, rgba(96, 62, 46, 0.72), transparent 44%)' },
    { id: 'wavy-lob', title: 'Wavy Lob', description: 'Modern cut with flattering texture.', category: 'hairstyles', overlay: 'linear-gradient(180deg, rgba(110, 62, 39, 0.58), transparent 52%)' }
  ],
  heart: [
    { id: 'collarbone-cut', title: 'Collarbone Cut', description: 'Balances width with elegant fall.', category: 'hairstyles', overlay: 'linear-gradient(180deg, rgba(66, 45, 35, 0.65), transparent 48%)' },
    { id: 'side-swept', title: 'Side Swept', description: 'Asymmetry that harmonizes contours.', category: 'hairstyles', overlay: 'radial-gradient(circle at 42% 20%, rgba(91, 53, 33, 0.6), transparent 43%)' }
  ]
};

const colorMap: Record<string, ResultItem[]> = {
  fair: [
    { id: 'rose-gold', title: 'Rose Gold', description: 'Warm metallic hair color accents.', category: 'colors', color: '#eab5ad' },
    { id: 'champagne', title: 'Champagne', description: 'Light neutral palette for outfits.', category: 'colors', color: '#f7e7ce' }
  ],
  medium: [
    { id: 'honey-caramel', title: 'Honey Caramel', description: 'Rich warm tones for depth.', category: 'colors', color: '#c68b59' },
    { id: 'terracotta', title: 'Terracotta', description: 'Grounded earthy wardrobe palette.', category: 'colors', color: '#c16a4a' }
  ],
  deep: [
    { id: 'espresso', title: 'Espresso Shine', description: 'Luxurious deep brunette tones.', category: 'colors', color: '#3d251a' },
    { id: 'emerald-pop', title: 'Emerald Pop', description: 'High-contrast accent for statement looks.', category: 'colors', color: '#047857' }
  ]
};

const outfitBase: ResultItem[] = [
  { id: 'city-tailored', title: 'City Tailored', description: 'Blazer, fitted tee, wide-leg pant.', category: 'outfits' },
  { id: 'minimal-luxe', title: 'Minimal Luxe', description: 'Monochrome knitwear with premium sneakers.', category: 'outfits' },
  { id: 'creative-studio', title: 'Creative Studio', description: 'Structured overshirt with layered accessories.', category: 'outfits' }
];

export const buildResults = (mode: Mode, faceShape: string, skinTone: string): ResultItem[] => {
  const hair = hairstyleMap[faceShape] ?? hairstyleMap.oval;
  const colors = colorMap[skinTone] ?? colorMap.medium;

  if (mode === 'hairstyle') {
    return [...hair, ...colors, outfitBase[1]];
  }

  return [...outfitBase, ...colors, hair[0]];
};
