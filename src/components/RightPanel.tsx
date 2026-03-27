import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStylistStore } from '../store';
import { ResultCard } from './ResultCard';
import type { ResultItem } from '../types';

type RightPanelProps = { mobile?: boolean };

const tabs: Array<ResultItem['category']> = ['hairstyles', 'colors', 'outfits'];

export const RightPanel = ({ mobile = false }: RightPanelProps) => {
  const { results, selectedStyle, setSelectedStyle, overlayOpacity, setOverlayOpacity, isLoading } = useStylistStore();
  const [activeTab, setActiveTab] = useState<ResultItem['category']>('hairstyles');

  const filtered = useMemo(() => results.filter((item) => item.category === activeTab), [activeTab, results]);

  return (
    <aside className={`glass flex h-full shrink-0 flex-col rounded-2xl p-4 ${mobile ? 'w-full max-h-[42vh]' : 'w-[320px]'}`}>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-xl px-2 py-2 text-xs capitalize ${
              tab === activeTab ? 'bg-accent text-black' : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="text-xs uppercase text-white/45">Overlay Opacity</p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={overlayOpacity}
          onChange={(event) => setOverlayOpacity(Number(event.target.value))}
          className="mt-2 w-full accent-accent"
        />
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))
            : filtered.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <ResultCard item={item} selected={selectedStyle?.id === item.id} onSelect={setSelectedStyle} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </aside>
  );
};
