import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Zap, AlertCircle } from 'lucide-react';
import { MACRO_TOPICS } from '../constants';
import { cn } from '../lib/utils';

interface ResumeBannerProps {
  progress: { [key: string]: { currentSlide: number; lastUpdated: number } };
  onContinue: (lessonId: string) => void;
  onClear: (lessonId: string) => void;
}

export default function ResumeBanner({ progress, onContinue, onClear }: ResumeBannerProps) {
  // Get the most recent progress
  const entries = Object.entries(progress);
  if (entries.length === 0) return null;

  // Sort by lastUpdated descending
  const sorted = entries.sort((a, b) => b[1].lastUpdated - a[1].lastUpdated);
  const [lessonId, data] = sorted[0];

  // Find the lesson object
  const lesson = MACRO_TOPICS.flatMap(t => t.lessons).find(l => l.id === lessonId);
  if (!lesson) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-24 left-6 right-6 z-[40] pointer-events-none"
    >
      <div className="bg-white/90 backdrop-blur-md border-2 border-brand-secondary/30 rounded-3xl p-5 relative overflow-hidden group shadow-2xl shadow-brand-secondary/20 pointer-events-auto max-w-sm mx-auto">
        {/* Background Accent */}
        <div className="absolute -right-4 -top-4 text-8xl opacity-[0.05] grayscale group-hover:rotate-12 transition-transform">🎓</div>

        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <AlertCircle className="w-7 h-7 text-slate-800" />
          </div>
          <div className="min-w-0">
            <h4 className="text-brand-primary font-black uppercase italic tracking-tighter text-lg leading-tight">Lezione interrotta!</h4>
            <p className="text-slate-600 text-xs font-bold leading-tight mt-1 truncate">
              Hai lasciato "{lesson.title}" a metà. Vuoi finire?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onContinue(lessonId)}
            className="flex items-center justify-center gap-2 bg-brand-primary text-white py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg active:scale-95 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            Riprendi
          </button>
          <button
            onClick={() => onClear(lessonId)}
            className="flex items-center justify-center gap-2 bg-white text-slate-400 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] border-b-4 border-slate-200 active:scale-95 transition-all hover:text-red-500 hover:border-red-200"
          >
            <RotateCcw className="w-4 h-4" />
            Ricomincia
          </button>
        </div>
      </div>
    </motion.div>
  );
}
