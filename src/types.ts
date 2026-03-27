export type Mode = 'hairstyle' | 'outfit';

export type ResultItem = {
  id: string;
  title: string;
  description: string;
  category: 'hairstyles' | 'colors' | 'outfits';
  overlay?: string;
  color?: string;
};
