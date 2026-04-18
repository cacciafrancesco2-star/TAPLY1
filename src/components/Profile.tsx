import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Award, Calendar, ChevronRight, LogOut, Trash2, Globe, Bell, Volume2, Type, Palette, Check } from 'lucide-react';
import { AppState, UserSettings } from '../types';
import { cn } from '../lib/utils';

interface ProfileProps {
  state: AppState;
  onUpdateSettings: (settings: Partial<AppState['settings']>) => void;
  onUpdateUser: (userData: Partial<AppState['user']>) => void;
}

const THEMES: { id: UserSettings['theme']; label: string; color: string }[] = [
  { id: 'light', label: 'Chiaro', color: '#FFF9E5' },
  { id: 'dark', label: 'Scuro', color: '#0F172A' },
  { id: 'warm', label: 'Caldo', color: '#FFF7ED' },
  { id: 'high-contrast', label: 'Contrasto', color: '#000000' },
];

const AVATAR_SEEDS = [
  { id: '1', seed: 'Aneka', label: 'Anna' },
  { id: '2', seed: 'Leo', label: 'Leo' },
  { id: '3', seed: 'Sasha', label: 'Sasha' },
  { id: '4', seed: 'Oliver', label: 'Oliver' },
  { id: '5', seed: 'Maddie', label: 'Maddie' },
  { id: '6', seed: 'Sawyer', label: 'Sawyer' },
  { id: '7', seed: 'Max', label: 'Max' },
  { id: '8', seed: 'Felix', label: 'Felix' },
  { id: '9', seed: 'Aidan', label: 'Marco' },
  { id: '10', seed: 'Jack', label: 'Giacomo' },
  { id: '11', seed: 'Caleb', label: 'Caleb' },
  { id: '12', seed: 'Harley', label: 'Andrea' },
];

export default function Profile({ state, onUpdateSettings, onUpdateUser }: ProfileProps) {
  const { stats, settings, user } = state;
  const [showAvatarPicker, setShowAvatarPicker] = React.useState(false);

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 px-6 overflow-y-auto">
      {/* Header Info */}
      <div className="bg-brand-primary rounded-[2.5rem] p-8 shadow-2xl mb-8 relative overflow-hidden border-b-8 border-brand-primary-dark">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={() => setShowAvatarPicker(true)}
            className="w-24 h-24 rounded-3xl bg-white/20 border-4 border-white/30 shadow-lg flex items-center justify-center overflow-hidden relative group active:scale-95 transition-all"
          >
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.avatar || user?.name || 'Guest'}`} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest transition-opacity">
              Cambia
            </div>
          </button>
          <div>
            <h2 className="text-3xl mb-1 font-display font-black uppercase italic tracking-tighter text-white">{user?.name || 'Ospite'}</h2>
            
            {/* Level Bar */}
            <div className="w-full max-w-[240px] mt-4">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex flex-col">
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">
                    Livello Attuale
                  </span>
                  <span className="text-brand-secondary text-2xl font-display font-black italic tracking-tighter drop-shadow-md">
                    {Math.floor(stats.xp / 100) + 1}
                  </span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">
                    Progressi XP
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white text-xl font-black italic tracking-tighter">
                      {stats.xp % 100}
                    </span>
                    <span className="text-white/40 text-[11px] font-black uppercase tracking-widest">
                      / 100
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-4 bg-black/40 rounded-full border-2 border-white/10 overflow-hidden p-1 shadow-inner relative group">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stats.xp % 100}%` }}
                  className="h-full bg-brand-secondary rounded-full shadow-[0_0_20px_rgba(251,191,36,0.7)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-black text-brand-secondary italic tracking-tighter">{stats.streak}</p>
            <p className="text-[10px] uppercase font-black text-white/50 tracking-widest">Streak</p>
          </div>
          <div className="text-center border-x border-white/10">
            <p className="text-3xl font-black text-brand-secondary italic tracking-tighter">{stats.trophies}</p>
            <p className="text-[10px] uppercase font-black text-white/50 tracking-widest">Trofei</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-brand-secondary italic tracking-tighter">{state.completedLessons.length}</p>
            <p className="text-[10px] uppercase font-black text-white/50 tracking-widest">Lezioni</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        <section>
          <h3 className="text-xl mb-4 ml-2 flex items-center gap-2 font-display font-black uppercase italic tracking-tighter text-text-main">
            <Settings className="w-5 h-5 text-brand-primary" />
            Impostazioni App
          </h3>
          <div className="bg-bg-card rounded-[2rem] shadow-xl overflow-hidden border-b-8 border-brand-border">
            {/* Font Size */}
            <div className="p-6 border-b border-brand-bg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm border border-brand-primary/5">
                    <Type className="w-5 h-5" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs text-brand-muted">Dimensione testo</span>
                </div>
                <div className="flex items-center gap-3">
                   {/* Compact Preview Chip */}
                   <div className="bg-brand-bg px-3 py-1.5 rounded-xl border border-brand-border shadow-inner flex items-center justify-center min-w-[50px]">
                      <span className={cn(
                        "font-bold text-brand-primary transition-all duration-300",
                        settings.fontSize === 'S' && "text-[10px]",
                        settings.fontSize === 'M' && "text-[13px]",
                        settings.fontSize === 'L' && "text-[16px]",
                        settings.fontSize === 'XL' && "text-[19px]",
                        settings.fontSize === 'XXL' && "text-[22px]"
                      )}>Aa</span>
                   </div>
                   <div className="bg-brand-primary text-white px-3 py-1 rounded-lg shadow-md border-b-2 border-brand-primary-dark">
                      <span className="font-black text-[10px] italic uppercase">{settings.fontSize}</span>
                   </div>
                </div>
              </div>
              
              <div className="px-1">
                <input 
                  type="range" 
                  min="0" 
                  max="4" 
                  step="1"
                  value={['S', 'M', 'L', 'XL', 'XXL'].indexOf(settings.fontSize)}
                  onChange={(e) => {
                    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
                    onUpdateSettings({ fontSize: sizes[parseInt(e.target.value)] as any });
                  }}
                  className="w-full h-4 bg-brand-bg rounded-full appearance-none accent-brand-primary cursor-pointer border-2 border-brand-border shadow-inner focus:outline-none"
                />
                <div className="flex justify-between mt-2 px-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size, i) => (
                    <span key={i} className={cn(
                      "text-[9px] font-black transition-colors duration-200",
                      ['S', 'M', 'L', 'XL', 'XXL'].indexOf(settings.fontSize) === i ? "text-brand-primary scale-110" : "text-slate-300"
                    )}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="p-6 border-b border-brand-bg">
              <div className="flex items-center gap-3 mb-6">
                <Palette className="w-5 h-5 text-brand-primary" />
                <span className="font-black uppercase tracking-widest text-xs text-brand-muted">Tema Colori</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onUpdateSettings({ theme: t.id })}
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border-2 transition-all active:scale-95 border-b-6",
                      settings.theme === t.id 
                        ? "border-brand-primary bg-brand-primary/5 shadow-xl scale-[1.02]" 
                        : "border-brand-bg bg-brand-bg/50"
                    )}
                  >
                    <div 
                      className="w-14 h-14 rounded-2xl shadow-inner flex items-center justify-center shrink-0 border-2 border-black/5" 
                      style={{ backgroundColor: t.color }}
                    >
                      {settings.theme === t.id && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <Check className={cn("w-7 h-7", t.id === 'light' || t.id === 'warm' ? "text-slate-900" : t.id === 'dark' ? "text-white" : "text-yellow-400")} />
                        </motion.div>
                      )}
                    </div>
                    <span className={cn(
                      "font-black uppercase tracking-widest text-[11px] text-center",
                      settings.theme === t.id ? "text-brand-primary" : "text-brand-muted"
                    )}>
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div className="p-6 border-b border-brand-bg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-brand-primary" />
                  <span className="font-black uppercase tracking-widest text-xs text-brand-muted">Volume Feedback</span>
                </div>
                <span className="text-brand-muted font-black">{settings.soundVolume}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={settings.soundVolume}
                onChange={(e) => onUpdateSettings({ soundVolume: parseInt(e.target.value) })}
                className="w-full h-3 bg-brand-bg rounded-full appearance-none accent-brand-primary cursor-pointer border border-brand-border"
              />
            </div>

            {/* Notifications */}
            <div className="p-6 flex items-center justify-between border-b border-brand-bg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-brand-primary" />
                <span className="font-black uppercase tracking-widest text-xs text-brand-muted">Notifiche</span>
              </div>
              <button 
                onClick={() => onUpdateSettings({ notifications: !settings.notifications })}
                className={cn(
                  "w-16 h-9 rounded-full transition-all relative p-1 border-b-4",
                  settings.notifications ? "bg-brand-primary border-blue-800" : "bg-brand-bg border-brand-border"
                )}
              >
                <div className={cn(
                  "w-6 h-6 bg-white rounded-full transition-all shadow-lg",
                  settings.notifications ? "translate-x-7" : "translate-x-0"
                )} />
              </button>
            </div>

            {/* Skipping Content */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-brand-primary" />
                <span className="font-black uppercase tracking-widest text-xs text-brand-muted">Permetti di saltare</span>
              </div>
              <button 
                onClick={() => onUpdateSettings({ allowSkipping: !settings.allowSkipping })}
                className={cn(
                  "w-16 h-9 rounded-full transition-all relative p-1 border-b-4",
                  settings.allowSkipping ? "bg-brand-primary border-blue-800" : "bg-brand-bg border-brand-border"
                )}
              >
                <div className={cn(
                  "w-6 h-6 bg-white rounded-full transition-all shadow-lg",
                  settings.allowSkipping ? "translate-x-7" : "translate-x-0"
                )} />
              </button>
            </div>
          </div>
        </section>

        <section className="pt-4">
          <button className="w-full p-6 bg-red-50 text-red-500 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 transition-all border-b-4 border-red-100">
            <LogOut className="w-5 h-5" />
            Esci dall'account
          </button>
          <button className="w-full p-6 mt-4 text-brand-muted/30 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-all">
            <Trash2 className="w-5 h-5" />
            Elimina account
          </button>
        </section>
      </div>
      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAvatarPicker(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-bg-card rounded-[2.5rem] shadow-2xl p-8 border-b-8 border-brand-border flex flex-col max-h-[85vh]"
            >
              <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter text-brand-primary mb-6 text-center shrink-0">Scegli Personaggio</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-8 overflow-y-auto pr-2 custom-scrollbar">
                {AVATAR_SEEDS.map((char) => (
                  <div key={char.id} className="p-1.5 flex items-center justify-center">
                    <button
                      onClick={() => {
                        onUpdateUser({ avatar: char.seed });
                        setShowAvatarPicker(false);
                      }}
                      className={cn(
                        "w-full aspect-square rounded-[1.25rem] bg-brand-bg border-4 border-brand-border flex items-center justify-center overflow-hidden transition-all hover:border-brand-primary active:scale-95 shadow-sm",
                        user?.avatar === char.seed && "border-brand-primary ring-4 ring-brand-primary/20 bg-brand-primary/5 shadow-md"
                      )}
                    >
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${char.seed}`} 
                        alt={char.label} 
                        className="w-12 h-12 object-cover"
                      />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowAvatarPicker(false)}
                className="w-full bg-slate-100 text-slate-400 py-4 rounded-2xl font-black uppercase tracking-widest active:scale-95 transition-all"
              >
                Annulla
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
