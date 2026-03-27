import { motion } from 'framer-motion';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

type ToolbarProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
};

const btn =
  'rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:border-accent/70 hover:text-white';

export const Toolbar = ({ onZoomIn, onZoomOut, onReset }: ToolbarProps) => (
  <div className="glass absolute left-1/2 top-4 z-30 flex -translate-x-1/2 items-center gap-2 rounded-2xl px-3 py-2">
    <motion.button whileTap={{ scale: 0.94 }} className={btn} onClick={onZoomOut}>
      <ZoomOut className="h-4 w-4" />
    </motion.button>
    <motion.button whileTap={{ scale: 0.94 }} className={btn} onClick={onZoomIn}>
      <ZoomIn className="h-4 w-4" />
    </motion.button>
    <motion.button whileTap={{ scale: 0.94 }} className={btn} onClick={onReset}>
      <RotateCcw className="h-4 w-4" />
    </motion.button>
  </div>
);
