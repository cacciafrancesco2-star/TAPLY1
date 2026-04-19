import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Level } from '../types';

interface QuizProps {
  onComplete: (level: Level) => void;
}

const questions = [
  {
    id: 1,
    text: 'Quanto spesso usi internet?',
    options: ['Raramente', 'Qualche volta a settimana', 'Ogni giorno', 'Sempre connesso'],
  },
  {
    id: 2,
    text: 'Hai mai ricevuto una notizia falsa su WhatsApp?',
    options: ['Sì, spesso', 'Qualche volta', 'No, mai', 'Non saprei riconoscerla'],
  },
  {
    id: 3,
    text: 'Sai cos\'è il phishing?',
    options: ['Sì, lo conosco bene', 'Ne ho sentito parlare', 'No, mai sentito', 'Ho un\'idea vaga'],
  },
  {
    id: 4,
    text: 'Usi i social media?',
    options: ['No, nessuno', 'Solo uno (es. Facebook)', 'Due o tre', 'Molti'],
  },
  {
    id: 5,
    text: 'Come verifichi se una notizia è vera?',
    options: ['Controllo la fonte', 'Chiedo ad amici', 'Se è su internet è vera', 'Non la verifico'],
  },
  {
    id: 6,
    text: 'Hai mai cliccato su un link sospetto?',
    options: ['Sì, purtroppo', 'No, sto attento', 'Non saprei dirlo', 'Solo se fidato'],
  },
  {
    id: 7,
    text: 'Conosci le impostazioni privacy del tuo smartphone?',
    options: ['Sì, le gestisco', 'Un po\'', 'No, non so dove siano', 'Le trovo complicate'],
  },
];

export default function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    const newAnswers = [...answers, index];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateLevel = (): Level => {
    const score = answers.reduce((acc, val) => acc + val, 0);
    if (score < 7) return 'Principiante';
    if (score < 14) return 'Intermedio';
    return 'Avanzato';
  };

  const level = calculateLevel();

  if (showResult) {
    return (
      <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-[3rem] shadow-2xl max-w-sm w-full border-b-8 border-brand-border"
        >
          <div className="w-20 h-20 bg-brand-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl border-b-4 border-blue-800">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl mb-2 font-display font-black uppercase italic tracking-tighter text-slate-800">Quiz Completato!</h2>
          <p className="text-slate-500 mb-8 font-medium">Abbiamo analizzato le tue risposte per creare un piano su misura.</p>
          
          <div className="bg-brand-bg p-6 rounded-[2rem] mb-8 border-4 border-brand-border relative overflow-hidden flex items-center justify-center min-h-[100px]">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-primary/5 rounded-full -mr-8 -mt-8" />
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted mb-1 font-black">Il tuo livello è</p>
              <p className="text-3xl sm:text-4xl font-display font-black text-brand-primary uppercase italic tracking-tighter whitespace-nowrap leading-none">
                {level}
              </p>
            </div>
          </div>
          
          <p className="text-slate-600 mb-10 leading-relaxed font-medium text-lg">
            Ottimo inizio! Il percorso è pronto per te.
          </p>
          
          <button 
            onClick={() => onComplete(level)}
            className="w-full bg-brand-primary text-white py-6 rounded-2xl font-black uppercase tracking-widest text-xl shadow-lg border-b-8 border-blue-800 active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center gap-3"
          >
            Inizia Ora
            <ChevronRight className="w-8 h-8" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-brand-bg z-50 flex flex-col p-8 overflow-y-auto">
      <div className="w-full mb-12 shrink-0">
        <div className="flex justify-between items-end mb-2">
          <span className="text-brand-primary font-black uppercase tracking-widest text-xs italic">Domanda {currentStep + 1} di {questions.length}</span>
          <span className="text-brand-muted text-sm font-black">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-3 bg-brand-bg rounded-full overflow-hidden border border-brand-border">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="text-4xl mb-10 leading-tight font-display font-black uppercase italic tracking-tighter text-slate-900">
            {questions[currentStep].text}
          </h2>
          
          <div className="grid gap-4 pb-20">
            {questions[currentStep].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="bg-white p-6 rounded-2xl text-left text-xl font-black border-b-8 border-brand-border hover:bg-brand-bg hover:border-brand-primary transition-all shadow-xl active:scale-98 flex items-center gap-4 text-slate-700 min-h-[100px]"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-bg flex items-center justify-center shrink-0 text-brand-primary font-black border border-brand-border">
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
