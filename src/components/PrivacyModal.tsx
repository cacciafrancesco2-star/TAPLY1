import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

interface PrivacyModalProps {
  onClose: () => void;
}

export default function PrivacyModal({ onClose }: PrivacyModalProps) {
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
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] border-b-8 border-brand-border"
      >
        <div className="p-6 bg-brand-primary flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" />
            <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">Privacy & Sicurezza</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Lock className="w-6 h-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">I tuoi dati sono al sicuro</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              In Taply, la tua privacy è la nostra priorità. Non vendiamo mai i tuoi dati a terzi. Le tue risposte ai quiz e i tuoi progressi servono solo a personalizzare la tua esperienza di apprendimento.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <Eye className="w-6 h-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">Cosa raccogliamo?</h3>
            </div>
            <ul className="space-y-3 text-slate-600 font-medium text-lg">
              <li className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary mt-2.5 shrink-0" />
                <span>Informazioni sul profilo (nome, email, avatar).</span>
              </li>
              <li className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary mt-2.5 shrink-0" />
                <span>Progressi del corso e statistiche di gioco.</span>
              </li>
              <li className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary mt-2.5 shrink-0" />
                <span>Interazioni con l'assistente virtuale per migliorare le risposte.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-brand-primary">
              <FileText className="w-6 h-6" />
              <h3 className="text-xl font-black uppercase tracking-tight">Termini di Utilizzo</h3>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-lg italic bg-slate-50 p-4 rounded-2xl border border-slate-100">
              L'app è destinata a scopo educativo. Utilizzandola, accetti di non caricare contenuti inappropriati e di rispettare la nostra community di studenti.
            </p>
          </section>
        </div>

        <div className="p-6 border-t-4 border-brand-border shrink-0">
          <button 
            onClick={onClose}
            className="w-full bg-brand-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 transition-all"
          >
            Ho Capito
          </button>
        </div>
      </motion.div>
    </div>
  );
}
