export type Mode = 'hairstyle' | 'outfit';

export type TryOnStyle = 'short_hair' | 'curly_hair' | 'casual_outfit' | 'formal_outfit';

export type ResultItem = {
  id: string;
  title: string;
  description: string;
  category: 'hairstyles' | 'colors' | 'outfits';
  overlay?: string;
  color?: string;
};
