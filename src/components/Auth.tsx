import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { cn } from '../lib/utils';

interface AuthProps {
  onComplete: (user: { name: string; email: string; isGuest: boolean }) => void;
}

export default function Auth({ onComplete }: AuthProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onComplete({
      name: formData.name || 'Utente Taply',
      email: formData.email || 'utente@esempio.it',
      isGuest: false
    });
  };

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col items-center justify-center p-8 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl border-b-8 border-brand-border"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter text-brand-primary">
            {isLogin ? 'Bentornato!' : 'Crea Account'}
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">
            Per salvare i tuoi progressi e sfidare gli amici
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input
                type="text"
                placeholder="Nome completo"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-brand-bg border-4 border-brand-border rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-brand-primary transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="email"
              placeholder="Indirizzo Email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-brand-bg border-4 border-brand-border rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-brand-primary transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-brand-bg border-4 border-brand-border rounded-2xl py-4 pl-12 pr-6 font-bold focus:outline-none focus:border-brand-primary transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-lg border-b-8 border-blue-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isLogin ? 'Entra' : 'Registrati'}
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="flex-1 h-1 bg-brand-border" />
          <span className="text-slate-400 font-black text-xs uppercase">Oppure</span>
          <div className="flex-1 h-1 bg-brand-border" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="p-4 bg-brand-bg rounded-2xl border-4 border-brand-border flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95">
            <Chrome className="w-5 h-5" />
            <span className="font-bold text-xs uppercase">Google</span>
          </button>
          <button className="p-4 bg-brand-bg rounded-2xl border-4 border-brand-border flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95">
            <Github className="w-5 h-5" />
            <span className="font-bold text-xs uppercase">GitHub</span>
          </button>
        </div>

        <p className="text-center mt-8 text-slate-500 font-semibold text-sm">
          {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-brand-primary font-black uppercase tracking-widest text-xs hover:underline"
          >
            {isLogin ? 'Registrati' : 'Accedi'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
