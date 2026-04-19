import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Hexagon, User, Menu, X, Settings, Shield, HelpCircle, LogOut, Zap } from 'lucide-react';
import { UserStats } from '../types';
import { cn } from '../lib/utils';

interface TopBarProps {
  stats: UserStats;
  onProfileClick: () => void;
  onTrophyClick: () => void;
  onPrivacyClick: () => void;
  onHelpClick: () => void;
  onEnergyClick: () => void;
  onStreakClick: () => void;
}

export default function TopBar({ stats, onProfileClick, onTrophyClick, onPrivacyClick, onHelpClick, onEnergyClick, onStreakClick }: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-brand-primary z-50 px-3 sm:px-6 flex items-center justify-between shadow-xl border-b-4 border-brand-primary-dark">
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2.5 sm:p-3 bg-white/20 rounded-2xl text-white hover:bg-white/30 transition-all active:scale-90"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          
          <h1 className="text-xl sm:text-3xl font-display font-black uppercase italic tracking-tighter text-white shrink-0">Taply</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Energy Button */}
          <button 
            onClick={onEnergyClick}
            className="h-10 sm:h-12 flex items-center gap-2 px-3 bg-white/10 rounded-[1.25rem] border border-white/20 shadow-inner active:scale-95 transition-all shrink-0"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
            <span className="text-base sm:text-xl font-black text-white">{stats.energy}</span>
          </button>

          {/* Streak Button */}
          <button 
            onClick={onStreakClick}
            className="w-16 sm:w-20 h-10 sm:h-12 flex items-center justify-center gap-1.5 bg-white/10 rounded-[1.25rem] border border-white/20 shadow-inner active:scale-95 transition-all shrink-0"
          >
            <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-brand-secondary fill-brand-secondary" />
            <span className="text-base sm:text-xl font-black text-white">{stats.streak}</span>
          </button>
          
          {/* Profile Button */}
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.25rem] bg-bg-card flex items-center justify-center text-brand-primary shadow-lg active:scale-90 transition-all overflow-hidden border-b-4 border-brand-border shrink-0"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </header>

      {/* Side Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="relative w-80 h-full bg-bg-card shadow-2xl flex flex-col border-r-8 border-brand-primary"
            >
              <div className="p-8 bg-brand-primary flex justify-between items-center shadow-lg">
                <h2 className="text-3xl font-display font-black uppercase italic tracking-tighter text-white">Taply</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-white/20 rounded-xl text-white hover:bg-white/30"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 p-6 space-y-4">
                {[
                  { icon: Settings, label: 'Impostazioni', onClick: onProfileClick },
                  { icon: Shield, label: 'Privacy & Sicurezza', onClick: onPrivacyClick },
                  { icon: HelpCircle, label: 'Aiuto & Supporto', onClick: onHelpClick },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      item.onClick?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full p-5 rounded-2xl flex items-center gap-4 text-text-main font-black uppercase tracking-widest text-xs hover:bg-brand-bg border border-transparent hover:border-brand-border transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center text-brand-primary">
                      <item.icon className="w-5 h-5" />
                    </div>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="p-6 border-t border-brand-border">
                <button className="w-full p-4 bg-red-50 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 border border-red-100">
                  <LogOut className="w-5 h-5" />
                  Esci
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
