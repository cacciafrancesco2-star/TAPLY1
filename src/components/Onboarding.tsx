import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Sparkles, Map as MapIcon, ShieldCheck } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const slides = [
  {
    title: 'Benvenuto in Taply',
    tagline: 'Colmiamo il divario digitale, insieme.',
    description: 'Taply è l\'app pensata per rendere la tecnologia semplice, accessibile e sicura per tutti, indipendentemente dall\'età.',
    icon: <Sparkles className="w-16 h-16 text-white" />,
    buttonText: 'Scopri di più',
  },
  {
    title: 'Il Nostro Obiettivo',
    tagline: 'Autonomia e Sicurezza Digitale.',
    description: 'Vogliamo darti gli strumenti per usare lo smartphone in totale libertà: dai messaggi ai social, senza paura di sbagliare.',
    icon: <ShieldCheck className="w-16 h-16 text-white" />,
    buttonText: 'Come funziona?',
  },
  {
    title: 'Impara Giocando',
    tagline: 'Un viaggio passo dopo passo.',
    description: 'Segui il percorso sulla mappa, supera le sfide e guadagna trofei. Ogni città sblocca nuove competenze digitali!',
    icon: <MapIcon className="w-16 h-16 text-white" />,
    buttonText: 'Inizia il Viaggio',
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col items-center justify-between p-8">
      <div className="w-full flex justify-end">
        <button 
          onClick={onComplete}
          className="text-slate-400 font-medium py-2 px-4"
        >
          Salta
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col items-center justify-center text-center max-w-sm"
        >
          <div className="mb-8 p-8 bg-brand-primary rounded-3xl shadow-2xl border-4 border-white/20">
            {slides[currentSlide].icon}
          </div>
          <h1 className="text-5xl mb-2 font-display font-black uppercase italic tracking-tighter text-brand-primary">{slides[currentSlide].title}</h1>
          <p className="text-brand-accent font-black text-xl mb-4 uppercase tracking-tight">
            {slides[currentSlide].tagline}
          </p>
          <p className="text-slate-600 text-lg leading-relaxed font-medium">
            {slides[currentSlide].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="w-full flex flex-col items-center gap-6 pb-8">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={`h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-12 bg-brand-secondary' : 'w-3 bg-white/20'
              }`}
            />
          ))}
        </div>
        
        <button 
          onClick={next}
          className="btn-primary w-full max-w-sm text-2xl py-6 rounded-2xl border-b-8 border-brand-accent"
        >
          {slides[currentSlide].buttonText}
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
