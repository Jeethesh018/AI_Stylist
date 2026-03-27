import { motion } from 'framer-motion';
import type { ResultItem } from '../types';

type ResultCardProps = {
  item: ResultItem;
  selected: boolean;
  onSelect: (item: ResultItem) => void;
};

export const ResultCard = ({ item, selected, onSelect }: ResultCardProps) => (
  <motion.button
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onSelect(item)}
    className={`w-full rounded-2xl border p-4 text-left transition ${
      selected ? 'border-accent bg-accent/15 shadow-glow' : 'border-white/10 bg-white/5 hover:border-white/20'
    }`}
  >
    <div className="mb-2 flex items-center justify-between">
      <h4 className="font-semibold text-white">{item.title}</h4>
      {item.color && <span className="h-5 w-5 rounded-full border border-white/25" style={{ background: item.color }} />}
    </div>
    <p className="text-sm text-white/65">{item.description}</p>
  </motion.button>
);
