import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, Check, AlertCircle, Trophy, Zap, Star, Play, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson as LessonType } from '../constants';
import { cn } from '../lib/utils';

interface LessonProps {
  lesson: LessonType;
  initialSlide?: number;
  onClose: () => void;
  onComplete: (xp: number) => void;
  onProgressUpdate: (slideIndex: number) => void;
}

const DEFAULT_SLIDES = [
  {
    type: 'intro',
    title: 'Basi della navigazione',
    description: 'In questa lezione imparerai come navigare sul web in modo sicuro e consapevole.',
    icon: <Star className="w-16 h-16 text-brand-primary" />,
  },
  {
    type: 'video',
    title: 'Guarda il video',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    points: [
      'Controlla sempre l\'indirizzo del sito (URL)',
      'Cerca il lucchetto 🔒 accanto all\'indirizzo',
      'Non cliccare su pop-up sospetti',
    ],
  },
  {
    type: 'true-false',
    question: 'Tutti i siti che iniziano con "https" sono sicuri al 100%.',
    answer: false,
    explanation: 'HTTPS indica che la connessione è criptata, ma il sito potrebbe comunque essere malevolo.',
  },
  {
    type: 'fill-blank',
    question: 'Un\'email che ti chiede la password urgentemente è probabilmente un tentativo di ____.',
    options: ['phishing', 'abbonamento', 'aggiornamento', 'conferma'],
    answer: 'phishing',
    explanation: 'Il phishing è una tecnica usata per rubare dati sensibili fingendosi un ente affidabile.',
  },
  {
    type: 'multiple-choice',
    question: 'Cosa indica l\'icona del lucchetto nel browser?',
    options: [
      'Il sito è protetto da password',
      'La connessione è criptata e sicura',
      'Il sito è approvato dal governo',
      'Non puoi scaricare file da questo sito'
    ],
    answer: 1,
    explanation: 'Il lucchetto indica che i dati scambiati tra te e il sito sono protetti.',
  },
  {
    type: 'summary',
    title: 'Ottimo lavoro!',
    xp: 50,
    trophies: 1,
  }
];

export default function LessonScreen({ lesson, initialSlide = 0, onClose, onComplete, onProgressUpdate }: LessonProps) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const getSlidesForLesson = (lesson: LessonType) => {
    // Generate lesson-specific intro
    const introSlide = {
      type: 'intro' as const,
      title: lesson.title,
      description: `In questa lezione esploreremo insieme ${lesson.title.toLowerCase()}. Un passo importante per la tua indipendenza digitale!`,
      icon: <Star className="w-16 h-16 text-brand-primary" />,
    };

    const contentSlides: any[] = [];

    // 1. Initial Video
    contentSlides.push({
      type: 'video' as const,
      title: 'Diamo un\'occhiata',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      points: [
        `Capiremo come funziona ${lesson.title}`,
        'Vedremo i passaggi concreti da fare',
        'Analizzeremo eventuali rischi o consigli',
      ],
    });

    // 2. Interactive Simulation (for social media lessons)
    if (lesson.id.includes('social') || lesson.title.toLowerCase().includes('social')) {
      contentSlides.push({
        type: 'interaction' as const,
        title: 'Mettiti alla prova',
        instruction: 'Metti un "Like" a questo post toccando il cuore!',
        simulationType: 'instagram-like',
        explanation: 'Il cuore diventa rosso quando metti "Like". È un modo per dire che ti piace quello che vedi!',
      });
      contentSlides.push({
        type: 'interaction' as const,
        title: 'Impariamo a commentare',
        instruction: 'Tocca l\'icona del fumetto per vedere dove scrivere un commento.',
        simulationType: 'instagram-comment',
        explanation: 'L\'icona a forma di fumetto apre lo spazio per scrivere i tuoi pensieri.',
      });
    } else if (lesson.id.includes('phishing') || lesson.title.toLowerCase().includes('sicurezza')) {
       contentSlides.push({
        type: 'interaction' as const,
        title: 'Controlla l\'URL',
        instruction: 'Tocca l\'indirizzo del sito che ti sembra falso.',
        simulationType: 'url-check',
        explanation: 'Fai sempre attenzione agli errori di battitura negli indirizzi!',
      });
    }

    // 3. Quiz items (Multiple True/False and MCQ)
    contentSlides.push({
      type: 'true-false' as const,
      question: `È sempre necessario essere connessi per usare ${lesson.title}?`,
      answer: true,
      explanation: 'Molte funzioni moderne richiedono una connessione attiva per funzionare al meglio.',
    });

    contentSlides.push({
      type: 'multiple-choice' as const,
      question: `Qual è il vantaggio principale di ${lesson.title}?`,
      options: [
        'Risparmio di tempo',
        'Maggiore sicurezza',
        'Facilità d\'uso',
        'Tutte le precedenti'
      ],
      answer: 3,
      explanation: 'L\'obiettivo di queste tecnologie è rendere la vita più semplice e sicura.',
    });

    contentSlides.push({
      type: 'fill-blank' as const,
      question: `Utilizzare ${lesson.title} è un modo per comunicare in maniera ____ con gli altri.`,
      options: ['digitale', 'lenta', 'difficile', 'segreta'],
      answer: 'digitale',
      explanation: 'Il mondo digitale ci permette di restare in contatto con chiunque in ogni momento.',
    });

    contentSlides.push({
      type: 'true-false' as const,
      question: `Puoi imparare a usare ${lesson.title} in pochi minuti se ti eserciti.`,
      answer: true,
      explanation: 'Nessuno nasce esperto! Con la pratica diventerai bravissimo.',
    });

    contentSlides.push({
      type: 'multiple-choice' as const,
      question: `Cosa devi fare se non capisci un passaggio di ${lesson.title}?`,
      options: [
        'Rinunciare subito',
        'Chiedere a Taply o a un amico',
        'Ignorare il problema',
        'Spegnere il telefono'
      ],
      answer: 1,
      explanation: 'Chiedere aiuto è il modo più veloce per imparare e non commettere errori.',
    });

    // Final Summary
    const summarySlide = {
      type: 'summary' as const,
      title: 'Ottimo lavoro!',
      xp: lesson.xpReward,
      trophies: 1,
    };

    return [introSlide, ...contentSlides, summarySlide];
  };

  const slides: any[] = getSlidesForLesson(lesson);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      onProgressUpdate(nextSlide);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowExplanation(false);
    } else {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#FBBF24', '#F59E0B']
      });
      onComplete(lesson.xpReward);
    }
  };

  const checkAnswer = (answer: any) => {
    setSelectedOption(answer);
    const correct = answer === (slides[currentSlide] as any).answer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const renderSlide = () => {
    const slide = slides[currentSlide] as any;

    switch (slide.type) {
      case 'intro':
        return (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8 p-10 bg-brand-primary/10 rounded-full">
              {slide.icon}
            </div>
            <h2 className="text-2xl sm:text-4xl mb-4 font-display font-black uppercase italic tracking-tighter text-brand-primary leading-tight">{slide.title}</h2>
            <p className="text-brand-muted text-lg sm:text-xl leading-relaxed font-medium">{slide.description}</p>
          </div>
        );
      case 'video':
        return (
          <div className="flex flex-col w-full">
            <div className="aspect-video bg-slate-900 rounded-2xl mb-8 overflow-hidden shadow-xl relative w-full">
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <Play className="w-16 h-16 sm:w-20 sm:h-20" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl mb-4 font-display font-black uppercase italic tracking-tighter text-brand-primary">Punti chiave:</h3>
            <ul className="space-y-4 w-full">
              {slide.points.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4 text-base sm:text-lg text-slate-600 font-bold">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-brand-primary" />
                  </div>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );
      case 'true-false':
        return (
          <div className="flex flex-col w-full">
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-12 font-display font-black uppercase italic tracking-tighter text-slate-900 leading-tight">{slide.question}</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[true, false].map((val) => (
                <button
                  key={val.toString()}
                  disabled={showExplanation}
                  onClick={() => checkAnswer(val)}
                  className={cn(
                    "py-8 sm:py-10 rounded-2xl sm:rounded-3xl text-xl sm:text-2xl font-black uppercase italic tracking-tighter border-b-8 transition-all shadow-xl active:scale-95 flex flex-col items-center justify-center gap-2 relative overflow-hidden",
                    !showExplanation && "bg-white border-brand-border hover:border-brand-primary text-brand-primary",
                    showExplanation && val === slides[currentSlide].answer && "bg-green-500 border-green-700 text-white z-10 scale-105 shadow-green-200",
                    showExplanation && selectedOption === val && !isCorrect && "bg-red-500 border-red-700 text-white opacity-100",
                    showExplanation && val !== slides[currentSlide].answer && selectedOption !== val && "bg-white border-brand-border text-slate-300 opacity-50"
                  )}
                >
                  {showExplanation && val === slides[currentSlide].answer && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                      <Check className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                  {showExplanation && selectedOption === val && !isCorrect && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                      <X className="w-6 h-6 text-white" />
                    </motion.div>
                  )}
                  {val ? 'Vero' : 'Falso'}
                </button>
              ))}
            </div>
          </div>
        );
      case 'fill-blank':
        return (
          <div className="flex flex-col w-full">
            <h2 className="text-2xl sm:text-3xl mb-8 sm:mb-12 leading-relaxed font-display font-black uppercase italic tracking-tighter text-slate-900">
              {slide.question.split('____').map((part: string, i: number) => (
                <React.Fragment key={i}>
                  {part}
                  {i === 0 && (
                    <span className="inline-block min-w-[100px] border-b-4 sm:border-b-8 border-brand-primary mx-1 sm:mx-2 text-brand-primary font-black italic">
                      {selectedOption || '...'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {slide.options.map((opt: string) => (
                <button
                  key={opt}
                  disabled={showExplanation}
                  onClick={() => checkAnswer(opt)}
                  className={cn(
                    "p-4 sm:p-6 rounded-xl sm:rounded-2xl text-sm sm:text-base font-black uppercase tracking-widest border-b-4 transition-all shadow-lg active:scale-95 relative",
                    !showExplanation && "bg-white border-brand-border hover:border-brand-primary text-brand-primary",
                    showExplanation && opt === slides[currentSlide].answer && "bg-green-500 border-green-700 text-white z-10",
                    showExplanation && selectedOption === opt && !isCorrect && "bg-red-500 border-red-700 text-white",
                    showExplanation && opt !== slides[currentSlide].answer && selectedOption !== opt && "bg-white border-brand-border text-slate-300 opacity-50"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 'multiple-choice':
        return (
          <div className="flex flex-col w-full">
            <h2 className="text-2xl sm:text-3xl mb-8 font-display font-black uppercase italic tracking-tighter text-slate-900 leading-tight">{slide.question}</h2>
            <div className="space-y-3 sm:space-y-4">
              {slide.options.map((opt: string, i: number) => (
                <button
                  key={i}
                  disabled={showExplanation}
                  onClick={() => checkAnswer(i)}
                  className={cn(
                    "w-full min-h-[4rem] p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left font-bold text-sm sm:text-base border-b-4 transition-all shadow-lg flex items-center gap-3 sm:gap-4 active:scale-98 relative",
                    !showExplanation && "bg-white border-brand-border hover:border-brand-primary text-brand-primary",
                    showExplanation && i === slides[currentSlide].answer && "bg-green-500 border-green-700 text-white z-10",
                    showExplanation && selectedOption === i && !isCorrect && "bg-red-500 border-red-700 text-white",
                    showExplanation && i !== slides[currentSlide].answer && selectedOption !== i && "bg-white border-brand-border text-slate-300 opacity-50"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 font-black border text-xs transition-colors",
                    showExplanation && i === slides[currentSlide].answer ? "bg-white/20 border-white text-white" : "bg-brand-bg border-brand-border text-brand-muted"
                  )}>
                    {showExplanation && i === slides[currentSlide].answer ? <Check className="w-5 h-5" /> : (showExplanation && selectedOption === i && !isCorrect ? <X className="w-5 h-5" /> : String.fromCharCode(65 + i))}
                  </div>
                  <span className="flex-1 break-words leading-tight">{opt}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'interaction':
        return (
          <div className="flex flex-col w-full h-full max-w-sm">
            <h2 className="text-xl sm:text-2xl mb-6 font-display font-black uppercase italic tracking-tighter text-slate-900 leading-tight text-center">{slide.title}</h2>
            <div className="bg-slate-100 p-4 rounded-3xl mb-8 border-4 border-slate-200">
               <p className="text-center font-bold text-slate-600 italic">"{slide.instruction}"</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative">
              {/* Phone Mockup Frame */}
              <div className="w-[280px] h-[500px] bg-white rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
                <div className="h-6 w-full bg-slate-800 flex items-center justify-center pt-1">
                   <div className="w-16 h-2 bg-slate-700 rounded-full" />
                </div>
                
                {slide.simulationType.startsWith('instagram') && (
                  <div className="flex-1 flex flex-col">
                    {/* IG Header */}
                    <div className="p-3 border-b flex items-center justify-between">
                      <div className="font-black italic text-lg tracking-tighter">Tapgram</div>
                      <div className="flex gap-4">
                        <Heart className="w-5 h-5" />
                        <MessageCircle className="w-5 h-5 rotate-[-90deg]" />
                      </div>
                    </div>
                    
                    {/* IG Post */}
                    <div className="flex-1 overflow-y-auto bg-white pt-2">
                       <div className="flex items-center gap-2 px-3 mb-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
                            <div className="w-full h-full rounded-full bg-white p-[1px]">
                               <div className="w-full h-full rounded-full bg-slate-200" />
                            </div>
                         </div>
                         <div className="text-xs font-bold">leone_digital</div>
                       </div>
                       
                       <div className="aspect-square bg-slate-100 flex items-center justify-center">
                          <motion.div 
                            animate={{ scale: isCorrect && selectedOption === 'heart' ? [1, 1.4, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                             <Star className="w-24 h-24 text-brand-primary" />
                          </motion.div>
                       </div>
                       
                       <div className="p-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                             <div className="flex gap-4">
                               <motion.button 
                                 whileTap={{ scale: 0.8 }}
                                 onClick={() => {
                                   if (slide.simulationType === 'instagram-like') {
                                     setSelectedOption('heart');
                                     setIsCorrect(true);
                                     setShowExplanation(true);
                                   }
                                 }}
                                 className={cn(
                                   "transition-colors",
                                   (isCorrect && selectedOption === 'heart') ? "text-red-500 fill-red-500" : "text-slate-800"
                                 )}
                               >
                                 <Heart className={cn("w-6 h-6", (isCorrect && selectedOption === 'heart') && "fill-current")} />
                               </motion.button>
                               <button 
                                 onClick={() => {
                                   if (slide.simulationType === 'instagram-comment') {
                                     setSelectedOption('comment');
                                     setIsCorrect(true);
                                     setShowExplanation(true);
                                   }
                                 }}
                                 className={cn(
                                   "transition-colors",
                                   (isCorrect && selectedOption === 'comment') ? "text-brand-primary" : "text-slate-800"
                                 )}
                               >
                                 <MessageCircle className="w-6 h-6" />
                               </button>
                               <Send className="w-6 h-6" />
                             </div>
                             <Bookmark className="w-6 h-6" />
                          </div>
                          
                          <div className="text-xs font-bold">128 mi piace</div>
                          <div className="text-xs">
                             <span className="font-bold mr-2">leone_digital</span>
                             Oggi ho imparato come usare Instagram! 🎉 #taply #digitale
                          </div>
                       </div>
                    </div>
                  </div>
                )}
                
                {slide.simulationType === 'url-check' && (
                  <div className="flex-1 flex flex-col bg-slate-50">
                    <div className="bg-white p-3 border-b flex items-center gap-2">
                       <div className="flex-1 bg-slate-100 rounded-lg p-2 flex items-center justify-center gap-1 overflow-hidden">
                          <Lock className="w-3 h-3 text-slate-400" />
                          <button 
                             onClick={() => {
                               setIsCorrect(true);
                               setShowExplanation(true);
                             }}
                             className="text-[10px] truncate font-medium text-slate-600"
                          >
                             https://www.apple-support-fix.com/login
                          </button>
                       </div>
                       <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </div>
                    
                    <div className="p-6 flex flex-col items-center justify-center gap-6 mt-12">
                       <AlertCircle className="w-16 h-16 text-red-500" />
                       <div className="text-center">
                          <h4 className="font-black text-slate-900 mb-2 italic tracking-tighter">ATTENZIONE!</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-bold">Il tuo account Apple è stato bloccato. Clicca qui per risolvere.</p>
                       </div>
                       <div className="w-full bg-blue-600 p-3 rounded-lg text-white text-[10px] font-black text-center uppercase tracking-widest shadow-lg">
                          Risolvi Ora
                       </div>
                    </div>
                  </div>
                )}
              </div>
              
              {!showExplanation && (
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="absolute pointer-events-none"
                  style={{ 
                    top: slide.simulationType === 'instagram-like' ? '70%' : (slide.simulationType === 'instagram-comment' ? '70%' : '15%'),
                    left: slide.simulationType === 'instagram-like' ? '45%' : (slide.simulationType === 'instagram-comment' ? '55%' : '50%')
                  }}
                >
                  <motion.div className="w-12 h-12 bg-white/20 rounded-full border-2 border-brand-primary flex items-center justify-center backdrop-blur-sm">
                    <div className="w-4 h-4 bg-brand-primary rounded-full animate-ping" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="flex flex-col items-center text-center py-6 sm:py-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-brand-secondary rounded-full flex items-center justify-center mb-6 sm:mb-8 relative shadow-2xl border-4 border-white">
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-slate-900" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-10 h-10 sm:w-12 sm:h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-black text-xs sm:text-sm border-2 border-white"
              >
                +{lesson.xpReward}
              </motion.div>
            </div>
            <h2 className="text-4xl sm:text-5xl mb-3 sm:mb-4 font-display font-black uppercase italic tracking-tighter text-brand-primary">Fantastico!</h2>
            <p className="text-brand-muted text-base sm:text-xl mb-8 sm:mb-12 font-bold uppercase tracking-widest leading-tight px-4">Hai completato la lezione con successo.</p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-sm px-4">
              <div className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-xl border-b-8 border-brand-border">
                <p className="text-brand-primary font-black text-3xl sm:text-4xl italic tracking-tighter leading-none mb-1">+{lesson.xpReward}</p>
                <p className="text-brand-muted text-[8px] sm:text-[10px] uppercase font-black tracking-widest">XP Guadagnati</p>
              </div>
              <div className="bg-white p-4 sm:p-6 rounded-[2rem] shadow-xl border-b-8 border-brand-border">
                <p className="text-brand-secondary font-black text-3xl sm:text-4xl italic tracking-tighter leading-none mb-1">+1</p>
                <p className="text-brand-muted text-[8px] sm:text-[10px] uppercase font-black tracking-widest">Trofeo</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-brand-bg z-[60] flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center gap-4 bg-white border-b-4 border-brand-border">
        <button onClick={onClose} className="p-2 sm:p-3 bg-brand-bg rounded-xl sm:rounded-2xl text-brand-muted hover:text-brand-primary transition-colors">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="flex-1 h-3 sm:h-4 bg-brand-bg rounded-full overflow-hidden border border-brand-border">
          <motion.div 
            className="h-full bg-brand-primary"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-brand-accent font-black text-sm sm:text-base">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-accent" />
          <span>{lesson.energyCost}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-12 no-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-full max-w-2xl mx-auto flex flex-col items-center justify-center p-2"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer / Feedback */}
      <div className="p-6 sm:p-8 bg-white border-t-4 border-brand-border shadow-2xl">
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className={cn(
                "mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex gap-3 sm:gap-4 border-b-8",
                isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"
              )}
            >
              <div className="shrink-0">
                {isCorrect ? <Check className="w-8 h-8 sm:w-10 sm:h-10" /> : <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-lg sm:text-2xl mb-1 uppercase italic tracking-tighter leading-none">{isCorrect ? 'Corretto!' : 'Quasi...'}</p>
                <p className="text-sm sm:text-lg font-medium opacity-80 leading-tight sm:leading-snug break-words">{(slides[currentSlide] as any).explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={showExplanation || slides[currentSlide].type === 'intro' || slides[currentSlide].type === 'video' || slides[currentSlide].type === 'summary' ? handleNext : undefined}
          disabled={!showExplanation && slides[currentSlide].type !== 'intro' && slides[currentSlide].type !== 'video' && slides[currentSlide].type !== 'summary'}
          className={cn(
            "btn-primary w-full py-4 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl",
            (!showExplanation && slides[currentSlide].type !== 'intro' && slides[currentSlide].type !== 'video' && slides[currentSlide].type !== 'summary') && "opacity-50 grayscale cursor-not-allowed"
          )}
        >
          <span className="flex-1 text-center">
            {currentSlide === slides.length - 1 ? 'Completa' : (showExplanation ? 'Continua' : 'Avanti')}
          </span>
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      </div>
    </div>
  );
}
