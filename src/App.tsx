import { motion } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { CanvasEditor } from './components/CanvasEditor';
import { RightPanel } from './components/RightPanel';

function App() {
  return (
    <div className="min-h-screen p-4 text-white md:p-5">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-3"
      >
        <div>
          <h1 className="text-lg font-semibold">AI Stylist Designer</h1>
          <p className="text-sm text-white/55">Premium hairstyle + outfit simulation workspace.</p>
        </div>
        <span className="rounded-full border border-accent/50 bg-accent/20 px-3 py-1 text-xs text-accent">Studio Mode</span>
      </motion.header>

      <div className="hidden h-[calc(100vh-110px)] gap-4 lg:flex">
        <Sidebar />
        <CanvasEditor />
        <RightPanel />
      </div>

      <div className="space-y-3 lg:hidden">
        <Sidebar mobile />
        <CanvasEditor />
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="sticky bottom-2">
          <RightPanel mobile />
        </motion.div>
      </div>
    </div>
  );
}

export default App;
