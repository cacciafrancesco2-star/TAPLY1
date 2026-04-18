import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, X, Calendar, Trophy } from 'lucide-react';

interface StreakModalProps {
  streak: number;
  onClose: () => void;
}

export default function StreakModal({ streak, onClose }: StreakModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-sm bg-white rounded-[3rem] overflow-hidden shadow-2xl border-b-8 border-brand-primary"
      >
        <div className="bg-brand-primary p-8 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 rounded-xl text-white hover:bg-white/30"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-xl rotate-3">
            <Flame className="w-14 h-14 text-brand-secondary fill-brand-secondary" />
          </div>
          
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter text-white leading-none">
            {streak} GIORN{streak === 1 ? 'O' : 'I'}!
          </h2>
          <p className="text-white/80 font-black uppercase tracking-widest text-[10px] mt-2">Serie Attuale</p>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-primary">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-brand-muted">Prossimo Obiettivo</p>
                <p className="font-bold text-slate-700">7 Giorni di fila</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-brand-primary">{Math.min(100, (streak / 7) * 100).toFixed(0)}%</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-brand-bg rounded-2xl border border-brand-border">
              <div className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-secondary">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-black uppercase tracking-widest text-brand-muted">Record Personale</p>
                <p className="font-bold text-slate-700">{streak} Giorni</p>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-500 text-sm mt-8 font-medium">
            Completa una lezione ogni giorno per mantenere vivo il fuoco!
          </p>

          <button
            onClick={onClose}
            className="w-full mt-8 py-5 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest text-sm border-b-4 border-blue-900 active:scale-95 transition-all"
          >
            Continua così!
          </button>
        </div>
      </motion.div>
    </div>
  );
}
