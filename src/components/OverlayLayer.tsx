import { motion } from 'framer-motion';

type OverlayLayerProps = {
  overlay?: string;
  opacity: number;
};

export const OverlayLayer = ({ overlay, opacity }: OverlayLayerProps) => {
  if (!overlay) return null;

  return (
    <motion.div
      key={overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.28 }}
      className="pointer-events-none absolute inset-0 rounded-[28px]"
      style={{ background: overlay }}
    />
  );
};
