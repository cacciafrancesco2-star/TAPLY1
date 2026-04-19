import React from 'react';
import { motion } from 'motion/react';
import { X, Zap, Clock, Info } from 'lucide-react';
import { UserStats } from '../types';

interface EnergyModalProps {
  stats: UserStats;
  onClose: () => void;
}

export default function EnergyModal({ stats, onClose }: EnergyModalProps) {
  const regenRate = 1 * 60 * 60 * 1000; // 1 hour per unit
  const nextRechargeTime = stats.energy < stats.maxEnergy 
    ? stats.lastEnergyUpdate + regenRate - Date.now() 
    : 0;

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00:00";
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

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
        className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border-b-8 border-brand-border"
      >
        <div className="p-6 bg-yellow-400 flex justify-between items-center text-slate-900 shrink-0">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 fill-current" />
            <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">La tua Energia</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-black/10 rounded-xl hover:bg-black/20 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="text-7xl font-display font-black italic tracking-tighter text-slate-800 flex items-baseline">
              {stats.energy}
              <span className="text-3xl text-slate-300 mx-2">/</span>
              <span className="text-4xl text-slate-400">{stats.maxEnergy}</span>
            </div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-xs">Unità disponibili</p>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(stats.energy / stats.maxEnergy) * 100}%` }}
              className="h-full bg-yellow-400"
            />
          </div>

          <div className="bg-brand-bg rounded-3xl p-6 border-2 border-brand-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-5 h-5" />
                <span className="font-bold">Prossima ricarica</span>
              </div>
              <span className="font-black text-brand-primary">
                {stats.energy < stats.maxEnergy ? formatTime(nextRechargeTime) : "Massima"}
              </span>
            </div>
            <div className="flex gap-3 text-sm text-slate-500">
              <Info className="w-5 h-5 shrink-0 text-brand-primary" />
              <p className="font-medium">
                Ogni lezione consuma energia. Recuperi un'unità ogni ora automaticamente!
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t font-black">
          <button 
            onClick={onClose}
            className="w-full bg-slate-800 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            Continua a imparare
          </button>
        </div>
      </motion.div>
    </div>
  );
}
