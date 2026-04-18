import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame } from 'lucide-react';
import { cn } from '../lib/utils';

interface StreakCelebrationProps {
  streak: number;
  onComplete: () => void;
}

export default function StreakCelebration({ streak, onComplete }: StreakCelebrationProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ backgroundColor: "rgba(15, 23, 42, 1)" }}
      animate={{ backgroundColor: "rgba(15, 23, 42, 1)" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          opacity: { duration: 2, repeat: Infinity },
          scale: { duration: 2, repeat: Infinity },
          duration: 1
        }}
        className="absolute inset-x-0 bottom-0 h-2/3 bg-orange-600/20 blur-[100px] rounded-full"
      />

      {/* Animated Fire Effect */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Flame Layers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 1.1 + (i * 0.1), 1],
              opacity: [0, 0.6, 0.9, 0.6],
              rotate: [0, 0, (i % 2 === 0 ? 5 : -5), 0],
              y: [20, 0, -i * 5, 0]
            }}
            transition={{ 
              duration: 1.2,
              times: [0, 0.3, 0.6, 1],
              delay: i * 0.15,
              repeat: Infinity,
              repeatDelay: 0.5,
              ease: "easeOut"
            }}
            className={cn(
              "absolute bottom-0 w-32 h-48 rounded-full blur-xl",
              i === 0 ? "bg-white w-12 h-20" : 
              i === 1 ? "bg-yellow-300 w-20 h-28 opacity-80" :
              i === 2 ? "bg-orange-400 w-24 h-36 opacity-60" :
              i === 3 ? "bg-orange-600 w-32 h-44 opacity-40" :
              "bg-red-700 w-36 h-52 opacity-20"
            )}
            style={{ 
              borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
              transformOrigin: 'bottom center'
            }}
          />
        ))}

        {/* Central Icon Container */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, delay: 0.2 }}
          className="relative z-20 w-40 h-40 bg-white rounded-[3rem] flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.5)] border-b-8 border-brand-secondary"
        >
          <Flame className="w-24 h-24 text-brand-secondary fill-brand-secondary" />
        </motion.div>
      </div>
      
      {/* Text Info */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center px-10 relative z-10"
      >
        <h2 className="text-5xl sm:text-7xl font-display font-black uppercase italic tracking-tighter text-white mb-4 leading-none drop-shadow-lg">
          {streak} GIORN{streak === 1 ? 'O' : 'I'}!
        </h2>
        <div className="bg-brand-secondary text-white px-8 py-4 rounded-3xl shadow-xl inline-block border-b-4 border-orange-700">
          <p className="text-xl sm:text-2xl font-black uppercase tracking-widest italic">
            LA TUA SERIE CONTINUA!
          </p>
        </div>
      </motion.div>

      {/* Sparks/Ember Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: (Math.random() - 0.5) * 200, 
            y: 300, 
            opacity: 1, 
            scale: Math.random() * 0.5 + 0.5 
          }}
          animate={{ 
            x: (Math.random() - 0.5) * 400, 
            y: -500,
            opacity: 0,
            rotate: 360
          }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity,
            delay: Math.random() * 2
          }}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-[1px]"
        />
      ))}
    </motion.div>
  );
}
