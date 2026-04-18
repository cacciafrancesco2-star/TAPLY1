import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
  onOpenChat: () => void;
}

export default function SupportModal({ onClose, onOpenChat }: SupportModalProps) {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // In a real app, this would send an email
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
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border-b-8 border-brand-border"
      >
        <div className="p-6 bg-brand-primary flex justify-between items-center text-white shrink-0">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-8 h-8" />
            <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">Aiuto & Supporto</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-black uppercase tracking-tight text-brand-primary">Parla con Taply AI</h3>
                  <button 
                    onClick={() => {
                      onOpenChat();
                      onClose();
                    }}
                    className="w-full p-6 bg-brand-bg border-4 border-brand-border rounded-3xl flex items-center gap-4 hover:border-brand-primary transition-all group active:scale-[0.98]"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-md group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <p className="font-black text-lg text-slate-800">Assistente Virtuale</p>
                      <p className="text-slate-500 font-medium">Ottieni risposte immediate</p>
                    </div>
                  </button>
                </div>

                <div className="relative flex items-center gap-4 py-4">
                  <div className="flex-1 h-1 bg-slate-100" />
                  <span className="text-slate-400 font-black text-xs uppercase">Oppure scrivici</span>
                  <div className="flex-1 h-1 bg-slate-100" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Oggetto</label>
                    <input 
                      type="text"
                      required
                      placeholder="E.g. Problema con una lezione..."
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-brand-bg border-4 border-brand-border rounded-2xl py-4 px-6 font-bold focus:outline-none focus:border-brand-primary transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Messaggio</label>
                    <textarea 
                      required
                      placeholder="Descrivi come possiamo aiutarti..."
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-bg border-4 border-brand-border rounded-2xl py-4 px-6 font-bold focus:outline-none focus:border-brand-primary transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-primary text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg shadow-lg border-b-8 border-blue-800 active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-3"
                  >
                    Invia Email
                    <Send className="w-6 h-6" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center text-green-600 shadow-xl border-b-8 border-green-200">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter text-slate-800">Messaggio Inviato!</h3>
                  <p className="text-slate-500 font-medium text-lg mt-2 max-w-xs mx-auto">
                    Abbiamo ricevuto la tua richiesta. Ti risponderemo via mail il prima possibile.
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="px-10 py-4 bg-brand-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-lg border-b-4 border-blue-800 active:translate-y-1 active:border-b-0 transition-all"
                >
                  Chiudi
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
