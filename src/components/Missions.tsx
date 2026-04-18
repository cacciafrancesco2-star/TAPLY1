import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Trophy, Zap, Star, Target, Users, Flame } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Missions() {
  const dailyMissions = [
    { id: 1, title: 'Completa 2 lezioni', progress: 1, total: 2, reward: 20, icon: <Zap className="w-5 h-5" /> },
    { id: 2, title: '5 risposte corrette di fila', progress: 3, total: 5, reward: 15, icon: <Flame className="w-5 h-5" /> },
    { id: 3, title: 'Usa l\'AI Chat per un dubbio', progress: 0, total: 1, reward: 10, icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-brand-bg pt-24 pb-32 px-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-4xl mb-2">Missioni</h2>
        <p className="text-slate-500">Completa gli obiettivi per guadagnare XP extra!</p>
      </div>

      <div className="space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-primary" />
              Sfide Giornaliere
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reset in 12h</span>
          </div>
          
          <div className="space-y-4">
            {dailyMissions.map((mission) => (
              <div key={mission.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                    {mission.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{mission.title}</h4>
                    <p className="text-slate-400 text-sm font-medium">{mission.progress}/{mission.total} completati</p>
                  </div>
                  <div className="bg-brand-accent/20 px-3 py-1 rounded-full flex items-center gap-1">
                    <span className="text-brand-secondary font-black text-sm">+{mission.reward}</span>
                    <span className="text-[10px] font-bold text-brand-secondary">XP</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(mission.progress / mission.total) * 100}%` }}
                    className="h-full bg-brand-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-secondary" />
              Classifica Settimanale
            </h3>
            <span className="bg-brand-secondary/10 text-brand-secondary text-[10px] font-black px-3 py-1 rounded-full uppercase">Lega Bronzo</span>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden">
            {[
              { name: 'Marco R.', xp: 1250, rank: 1, avatar: '1' },
              { name: 'Elena G.', xp: 1100, rank: 2, avatar: '2' },
              { name: 'Tu', xp: 850, rank: 3, avatar: '3', isMe: true },
              { name: 'Giuseppe L.', xp: 720, rank: 4, avatar: '4' },
              { name: 'Anna M.', xp: 600, rank: 5, avatar: '5' },
            ].map((user, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-5 flex items-center gap-4 border-b border-slate-50 last:border-none",
                  user.isMe && "bg-brand-primary/5"
                )}
              >
                <span className={cn(
                  "w-6 text-center font-black text-lg",
                  user.rank === 1 ? "text-brand-secondary" : "text-slate-300"
                )}>
                  {user.rank}
                </span>
                <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} alt="Avatar" />
                </div>
                <div className="flex-1">
                  <p className={cn("font-bold", user.isMe ? "text-brand-primary" : "text-slate-700")}>
                    {user.name}
                  </p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{user.xp} XP</p>
                </div>
                {user.rank <= 3 && (
                  <Trophy className={cn(
                    "w-5 h-5",
                    user.rank === 1 ? "text-brand-secondary fill-brand-secondary" : "text-slate-300"
                  )} />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
