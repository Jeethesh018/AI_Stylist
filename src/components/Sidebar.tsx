import { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ImageUp, Palette, Shirt, Sparkles, UserRound } from 'lucide-react';
import { useStylistStore } from '../store';
import type { TryOnStyle } from '../types';

type SidebarProps = { mobile?: boolean };

const labelClass = 'mb-2 text-xs uppercase tracking-wide text-white/45';

const aiButtons: Array<{ id: TryOnStyle; label: string }> = [
  { id: 'short_hair', label: 'Short Hair' },
  { id: 'curly_hair', label: 'Curly Hair' },
  { id: 'casual_outfit', label: 'Casual Outfit' },
  { id: 'formal_outfit', label: 'Formal Outfit' }
];

export const Sidebar = ({ mobile = false }: SidebarProps) => {
  const {
    mode,
    faceShape,
    skinTone,
    setImage,
    setMode,
    setFaceShape,
    setSkinTone,
    runTryOn,
    isGenerating,
    isSidebarCollapsed,
    toggleSidebar
  } = useStylistStore();

  const collapsed = mobile ? false : isSidebarCollapsed;

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files ?? [];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : '100%' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.34 }}
      className={`glass relative h-full shrink-0 rounded-2xl p-4 ${mobile ? 'w-full' : ''}`}
    >
      {!mobile && (
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 rounded-full border border-white/15 bg-zinc-900 p-1 text-white/75 hover:text-white"
        >
          <ChevronLeft className={`h-4 w-4 transition ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      )}

      <div className="space-y-5 overflow-hidden">
        <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-3 hover:border-accent/60">
          <ImageUp className="h-4 w-4 text-accent" />
          {!collapsed && <span className="text-sm font-medium">Upload Image</span>}
          <input className="hidden" type="file" accept="image/*" onChange={handleUpload} />
        </label>

        {!collapsed && (
          <>
            <div>
              <p className={labelClass}>AI Try-On</p>
              <div className="grid grid-cols-2 gap-2">
                {aiButtons.map((btn) => (
                  <motion.button
                    key={btn.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => void runTryOn(btn.id)}
                    disabled={isGenerating}
                    className="rounded-xl border border-accent/30 bg-accent/10 px-2 py-2 text-xs text-accent hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    <Sparkles className="mx-auto mb-1 h-3.5 w-3.5" />
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Mode</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('hairstyle')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    mode === 'hairstyle' ? 'bg-accent text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <UserRound className="h-4 w-4" /> Hairstyle
                </button>
                <button
                  onClick={() => setMode('outfit')}
                  className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    mode === 'outfit' ? 'bg-accent text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Shirt className="h-4 w-4" /> Outfit
                </button>
              </div>
            </div>

            <div>
              <p className={labelClass}>Face Shape</p>
              <div className="grid grid-cols-2 gap-2">
                {['oval', 'round', 'square', 'heart'].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setFaceShape(shape as 'oval' | 'round' | 'square' | 'heart')}
                    className={`rounded-xl px-3 py-2 text-sm capitalize ${
                      faceShape === shape ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/65 hover:bg-white/10'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClass}>Skin Tone</p>
              <div className="grid grid-cols-3 gap-2">
                {['fair', 'medium', 'deep'].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSkinTone(tone as 'fair' | 'medium' | 'deep')}
                    className={`rounded-xl px-2 py-2 text-xs capitalize ${
                      skinTone === tone ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/65 hover:bg-white/10'
                    }`}
                  >
                    <Palette className="mx-auto mb-1 h-3.5 w-3.5" />
                    {tone}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </motion.aside>
  );
};
