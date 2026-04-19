import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy as TrophyIcon, X, Lock, CheckCircle2 } from 'lucide-react';
import { TROPHIES } from '../constants';
import { cn } from '../lib/utils';
import { AppState } from '../types';

interface TrophiesProps {
  state: AppState;
}

export default function Trophies({ state }: TrophiesProps) {
  const [selectedTrophy, setSelectedTrophy] = useState<typeof TROPHIES[0] | null>(null);
  const { completedLessons } = state;

  // Logic to check if trophy is earned or what is the progress
  const getTrophyStatus = (id: string) => {
    switch (id) {
      case 'mago': {
        const total = 7;
        const current = completedLessons.filter(id => ['tasti-base', 'accensione', 'touch-screen', 'wifi', 'suoni', 'batteria', 'appstore'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'influencer': {
        const total = 7;
        const current = completedLessons.filter(id => ['whatsapp-basi', 'facebook-privacy', 'condivisione-foto', 'videochiamate', 'gruppi', 'storie', 'vocali'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'truffe': {
        const total = 7;
        const current = completedLessons.filter(id => ['email-sospette', 'link-pericolosi', 'protezione-dati', 'smishing', 'vishing', 'fonti', 'segnalazione'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'sicurezza': {
        const total = 7;
        const current = completedLessons.filter(id => ['passwords', '2fa', 'incognito', 'cookies', 'vpn', 'updates', 'backup'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'cittadino': {
        const total = 7;
        const current = completedLessons.filter(id => ['spid', 'cieid', 'sanita', 'pagopa', 'appio', 'prenotazioni', 'anagrafe'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'shopper': {
        const total = 7;
        const current = completedLessons.filter(id => ['siti-affidabili', 'pagamenti', 'diritti', 'tracking', 'recensioni', 'prepagate', 'resi'].includes(id)).length;
        return { isEarned: current >= total, progress: current, total };
      }
      case 'creativo': {
        const isEarned = (state.user?.avatar !== undefined && state.user.avatar !== '');
        return { isEarned, progress: isEarned ? 1 : 0, total: 1 };
      }
      case 'suono': {
        const isEarned = state.settings.soundVolume !== 80 || !state.settings.notifications;
        return { isEarned, progress: isEarned ? 1 : 0, total: 1 };
      }
      case 'fretta': {
        const total = 3;
        const current = state.stats.lastCompletionDate === new Date().toISOString().split('T')[0] ? completedLessons.length % 4 : 0;
        return { isEarned: current >= total, progress: current % total, total };
      }
      case 'computer': {
        const total = 42;
        const current = completedLessons.length;
        return { isEarned: current >= total, progress: current, total };
      }
      default:
        return { isEarned: false, progress: 0, total: 1 };
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 px-6 overflow-y-auto">
      <div className="flex items-center gap-4 mb-8 bg-white/50 p-6 rounded-[2rem] border-b-4 border-brand-border theme-dark:bg-slate-800/50">
        <div className="w-16 h-16 bg-brand-secondary rounded-2xl flex items-center justify-center shadow-lg border-2 border-white shrink-0">
          <TrophyIcon className="w-10 h-10 text-slate-800" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl sm:text-3xl font-display font-black uppercase italic tracking-tighter text-brand-primary truncate">I Tuoi Trofei</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-3 bg-brand-bg/50 rounded-full border border-brand-border overflow-hidden p-0.5">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${(state.stats.trophies / TROPHIES.length) * 100}%` }}
                 className="h-full bg-brand-secondary rounded-full"
               />
            </div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-[9px] whitespace-nowrap">{state.stats.trophies}/{TROPHIES.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-y-10 gap-x-4">
        {TROPHIES.map((trophy, index) => {
          const status = getTrophyStatus(trophy.id);
          return (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={() => setSelectedTrophy(trophy)}
            >
              <div className="relative mb-3">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all border-4 relative",
                  status.isEarned 
                    ? "bg-brand-secondary border-white ring-4 ring-brand-secondary/20 shadow-brand-secondary/30" 
                    : "bg-slate-200 border-slate-300 grayscale opacity-60 theme-dark:bg-slate-700 theme-dark:border-slate-600"
                )}>
                  <span className="text-3xl">{trophy.icon}</span>
                  {!status.isEarned && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-[2rem]">
                      <Lock className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </div>
                {status.isEarned && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md z-10"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-tight leading-tight max-w-[80px] h-8 flex items-center justify-center",
                status.isEarned ? "text-text-main" : "text-slate-400"
              )}>
                {trophy.title}
              </span>
              
              {/* Progress bar for all trophies */}
              <div className="w-14 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden border border-black/5 theme-dark:bg-slate-700 relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (status.progress / status.total) * 100)}%` }}
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    status.isEarned ? "bg-green-500" : "bg-brand-primary"
                  )}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTrophy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrophy(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-bg-card rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-brand-border"
            >
              <button 
                onClick={() => setSelectedTrophy(null)}
                className="absolute top-4 right-4 p-2 bg-brand-bg rounded-xl text-brand-muted hover:text-brand-primary"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <div className={cn(
                  "w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-4",
                  getTrophyStatus(selectedTrophy.id).isEarned ? "bg-brand-secondary border-white" : "bg-slate-200 border-slate-300 grayscale"
                )}>
                  <span className="text-5xl">{selectedTrophy.icon}</span>
                </div>
                <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-brand-primary mb-2">
                  {selectedTrophy.title}
                </h3>
                <p className="text-text-main opacity-70 font-medium leading-relaxed mb-6">
                  {selectedTrophy.description}
                </p>

                {!getTrophyStatus(selectedTrophy.id).isEarned && (
                   <div className="bg-brand-bg p-4 rounded-2xl border-2 border-dashed border-brand-border mb-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-muted mb-2">Progresso</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-3 bg-white/50 rounded-full overflow-hidden border border-brand-border">
                          <div 
                            className="h-full bg-brand-primary" 
                            style={{ width: `${(getTrophyStatus(selectedTrophy.id).progress / getTrophyStatus(selectedTrophy.id).total) * 100}%` }}
                          />
                        </div>
                        <span className="font-black text-brand-primary text-xs">
                          {getTrophyStatus(selectedTrophy.id).progress}/{getTrophyStatus(selectedTrophy.id).total}
                        </span>
                      </div>
                   </div>
                )}
                
                <div className="mt-2 pt-6 border-t border-brand-bg">
                  <button 
                    onClick={() => setSelectedTrophy(null)}
                    className="btn-primary w-full py-4 rounded-2xl border-b-4 uppercase font-black tracking-widest text-sm"
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
