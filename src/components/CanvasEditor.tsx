import { PointerEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { useStylistStore } from '../store';
import { OverlayLayer } from './OverlayLayer';
import { Toolbar } from './Toolbar';

export const CanvasEditor = () => {
  const {
    image,
    generatedImage,
    zoom,
    position,
    setPosition,
    setZoom,
    resetCanvas,
    selectedStyle,
    overlayOpacity,
    error,
    isGenerating,
    generationError
  } = useStylistStore();

  const displayImage = generatedImage ?? image;
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    start.current = { x: event.clientX - position.x, y: event.clientY - position.y };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    setPosition({ x: event.clientX - start.current.x, y: event.clientY - start.current.y });
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <section className="glass relative flex-1 overflow-hidden rounded-2xl p-5">
      <Toolbar onZoomIn={() => setZoom(zoom + 0.1)} onZoomOut={() => setZoom(zoom - 0.1)} onReset={resetCanvas} />

      <div
        className="grid-bg relative mt-12 h-[68vh] overflow-hidden rounded-[28px] border border-white/10 bg-black/30"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {!displayImage && (
          <div className="absolute inset-0 grid place-items-center text-center text-white/45">
            <div>
              <p className="mb-2 text-lg font-semibold">Drop an image to begin designing</p>
              <p className="text-sm">Use AI Try-On buttons to generate hairstyles and outfits.</p>
            </div>
          </div>
        )}

        {displayImage && (
          <motion.div
            style={{ x: position.x, y: position.y, scale: zoom }}
            className="absolute left-1/2 top-1/2 h-[82%] w-[60%] -translate-x-1/2 -translate-y-1/2"
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <img src={displayImage} alt="Styled model" className="h-full w-full rounded-[28px] object-cover shadow-panel" />
            <OverlayLayer overlay={selectedStyle?.overlay} opacity={overlayOpacity} />
          </motion.div>
        )}

        {isGenerating && (
          <div className="absolute inset-0 grid place-items-center bg-black/45 backdrop-blur-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-accent/35 bg-zinc-900/85 px-4 py-3 text-sm text-white">
              <LoaderCircle className="h-5 w-5 animate-spin text-accent" />
              Generating AI try-on preview...
            </div>
          </div>
        )}
      </div>

      {(error || generationError) && <p className="mt-3 text-sm text-amber-400">{generationError ?? error}</p>}
    </section>
  );
};
