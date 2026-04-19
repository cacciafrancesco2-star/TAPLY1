import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="fixed inset-0 bg-brand-primary z-[60] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Decorative background elements code-inspired */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div 
          variants={{
            hidden: { scale: 0, rotate: -45 },
            visible: { 
              scale: 1, 
              rotate: -6,
              transition: { type: "spring", stiffness: 200, damping: 15 }
            }
          }}
          className="w-40 h-40 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center mb-10 border-b-[12px] border-slate-200"
        >
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }} 
             transition={{ duration: 2, repeat: Infinity }}
             className="text-8xl font-black text-brand-primary italic tracking-tighter"
           >
             T
           </motion.div>
        </motion.div>

        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="text-7xl font-display font-black uppercase italic tracking-tighter text-white mb-4 drop-shadow-2xl"
        >
          Taply
        </motion.h1>
        
        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="text-blue-100 text-xl font-bold max-w-xs mb-12 uppercase tracking-widest leading-relaxed"
        >
          Il tuo viaggio nel mondo digitale comincia qui
        </motion.p>

        <motion.button
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative flex items-center gap-4 bg-white px-10 py-6 rounded-3xl shadow-2xl border-b-[12px] border-slate-200 transition-all active:border-b-0 active:translate-y-2"
        >
          <span className="text-2xl font-black uppercase tracking-widest text-brand-primary italic">Inizia</span>
          <div className="bg-brand-primary p-2 rounded-xl text-white group-hover:translate-x-2 transition-transform">
            <ArrowRight className="w-6 h-6" />
          </div>
        </motion.button>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          className="mt-20 flex items-center gap-2 text-white/50 font-black uppercase tracking-widest text-[10px]"
        >
           <Sparkles className="w-4 h-4" />
           <span>By Digital Inclusion Team</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
