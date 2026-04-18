import React from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, Play, Star } from 'lucide-react';
import { MacroTopic } from '../constants';
import { cn } from '../lib/utils';

interface MapProps {
  topics: MacroTopic[];
  onTopicClick: (topic: MacroTopic) => void;
}

export default function Map({ topics, onTopicClick }: MapProps) {
  return (
    <div className="relative min-h-screen pt-48 pb-40 px-6 overflow-x-hidden overflow-y-auto bg-[#FFF9E5] select-none no-scrollbar">
      {/* Landscape Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Mountains throughout the map */}
        <div className="absolute top-[3%] left-[5%] text-[12rem] opacity-[0.03] grayscale">🏔️</div>
        <div className="absolute top-[8%] left-[20%] text-[8rem] opacity-[0.05]">🏔️</div>
        <div className="absolute top-[12%] right-[10%] text-[10rem] opacity-[0.08]">🏔️</div>
        <div className="absolute top-[5%] right-[25%] text-[7rem] opacity-[0.04]">🏔️</div>
        <div className="absolute top-[30%] left-[10%] text-[8rem] opacity-[0.03]">🏔️</div>
        <div className="absolute top-[50%] right-[5%] text-[10rem] opacity-[0.04]">🏔️</div>
        <div className="absolute top-[70%] left-[15%] text-[7rem] opacity-[0.05]">🏔️</div>
        <div className="absolute top-[85%] right-[12%] text-[9rem] opacity-[0.03]">🏔️</div>

        {/* Grassy Banks on Sides */}
        <div className="absolute top-0 left-[-10%] w-[35%] h-full bg-[#7AC142] border-r-[12px] border-[#5A8F31]" />
        <div className="absolute top-0 right-[-10%] w-[35%] h-full bg-[#7AC142] border-l-[12px] border-[#5A8F31]" />
        
        {/* Denser Decorations */}
        <div className="absolute top-[8%] left-[12%] text-5xl">🌲</div>
        <div className="absolute top-[18%] left-[5%] text-4xl">🌳</div>
        <div className="absolute top-[28%] left-[15%] text-5xl opacity-40">⛰️</div>
        <div className="absolute top-[32%] left-[10%] text-5xl">🔥</div>
        <div className="absolute top-[45%] left-[4%] text-4xl opacity-60">🏡</div>
        <div className="absolute top-[55%] left-[15%] text-4xl">🪴</div>
        <div className="absolute top-[65%] left-[12%] text-4xl rotate-12">🌼</div>
        <div className="absolute top-[75%] left-[6%] text-5xl">🌲</div>
        <div className="absolute top-[85%] left-[18%] text-4xl opacity-30">⛺</div>
        <div className="absolute bottom-[10%] left-[14%] text-6xl">🌲</div>
        <div className="absolute bottom-[25%] left-[8%] text-4xl">🪴</div>

        <div className="absolute top-[10%] right-[8%] text-5xl">🌲</div>
        <div className="absolute top-[22%] right-[15%] text-4xl">🌳</div>
        <div className="absolute top-[35%] right-[20%] text-5xl opacity-30">⛰️</div>
        <div className="absolute top-[40%] right-[10%] text-5xl opacity-40">🏰</div>
        <div className="absolute top-[55%] right-[14%] text-4xl opacity-50">🛖</div>
        <div className="absolute top-[68%] right-[8%] text-5xl">🌻</div>
        <div className="absolute top-[78%] right-[18%] text-4xl">🪵</div>
        <div className="absolute bottom-[20%] right-[10%] text-4xl">🪵</div>
        <div className="absolute bottom-[5%] right-[15%] text-5xl">🌲</div>
        <div className="absolute bottom-[40%] right-[5%] text-4xl">🍎</div>

        {/* Floating River Elements or Ponds */}
        <div className="absolute top-[25%] left-[3%] w-24 h-24 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-[60%] right-[5%] w-40 h-40 bg-blue-300/10 rounded-full blur-[100px]" />

        {/* Rocks and Stones */}
        <div className="absolute top-[42%] left-[18%] text-2xl opacity-40">🪨</div>
        <div className="absolute top-[72%] right-[25%] text-xl opacity-30">💎</div>
        <div className="absolute bottom-[35%] left-[25%] text-2xl opacity-40">🪨</div>

        {/* Flying Birds */}
        {[0, 15, 30].map((delay, i) => (
          <motion.div
            key={i}
            initial={{ x: -100, y: 100 + i * 50 }}
            animate={{ x: '120vw', y: 50 + i * 30 }}
            transition={{ duration: 25 + i * 5, repeat: Infinity, delay, ease: "linear" }}
            className="absolute z-0 text-2xl opacity-40"
          >
            🐦
          </motion.div>
        ))}

        {/* Floating Clouds */}
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[5%] right-[20%] text-7xl opacity-20"
        >
          ☁️
        </motion.div>
        <motion.div 
          animate={{ x: [20, -20, 20] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[25%] left-[5%] text-8xl opacity-10"
        >
          ☁️
        </motion.div>
      </div>

      {/* The Central Path (Winding Road) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-48 sm:w-64 bg-[#F0D9B5] -z-10 shadow-inner" />
      
      {/* Connection Dashed Line */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex justify-center">
        <svg className="w-full h-full max-w-sm sm:max-w-none" viewBox="0 0 400 5000" preserveAspectRatio="none">
          <path 
            d="M200,0 C200,100 150,200 150,400 C150,600 250,800 250,1100 C250,1400 150,1700 150,2000 C150,2300 250,2600 250,2900 C250,3200 150,3500 150,3800 C150,4100 250,4400 250,4700" 
            fill="none" 
            stroke="#C4A47C" 
            strokeWidth="12" 
            strokeDasharray="16 12" 
            strokeLinecap="round"
            className="opacity-40"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-40 sm:gap-64 py-40 relative z-10 w-full max-w-md mx-auto">
        {topics.map((topic, index) => {
          const isEven = index % 2 === 0;
          const isLocked = topic.status === 'locked';
          const isCompleted = topic.status === 'completed';

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "relative flex flex-col items-center",
                index === 0 ? "" : (index % 2 === 1 ? "translate-x-[-50px]" : "translate-x-[50px]")
              )}
            >
              {/* Shield/Crest Node */}
              <div className="relative group">
                {/* Visual Base / Drop Shadow for the "Shield" */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-black/10 rounded-[2rem] blur-xl" />
                
                {/* Duolingo-style Progress Circle around node */}
                {!isLocked && (
                  <div className="absolute -inset-4 border-4 border-slate-200/50 rounded-full" />
                )}
                
                <button
                  onClick={() => onTopicClick(topic)}
                  className={cn(
                    "w-32 h-32 relative transition-all duration-300 active:scale-90",
                    "before:content-[''] before:absolute before:inset-0 before:bg-brand-primary before:rounded-t-3xl before:rounded-b-[2.5rem] before:border-b-[12px] before:border-blue-800 before:shadow-2xl",
                    isLocked && "before:bg-slate-300 before:border-slate-400 grayscale opacity-90",
                    isCompleted && "before:bg-[#58CC02] before:border-[#46A302]"
                  )}
                >
                  <div className="relative z-10 w-full h-full flex items-center justify-center text-white drop-shadow-lg">
                    <div className="p-4 bg-white/25 rounded-[2rem]">
                      {topic.id === 'tech-base' && <Play className="w-10 h-10 fill-current ml-1" />}
                      {topic.id === 'social-media' && <Play className="w-10 h-10 fill-current rotate-[135deg]" />}
                      {topic.id === 'phishing' && <Play className="w-10 h-10 fill-current -rotate-45" />}
                      {topic.id === 'cyber-safety' && <Play className="w-10 h-10 fill-current rotate-180" />}
                      {topic.id === 'e-government' && <Play className="w-10 h-10 fill-current rotate-90" />}
                      {topic.id === 'online-shopping' && <Play className="w-10 h-10 fill-current -rotate-90" />}
                      {/* Fallback */}
                      {!['tech-base', 'social-media', 'phishing', 'cyber-safety', 'e-government', 'online-shopping'].includes(topic.id) && <Play className="w-10 h-10 fill-current" />}
                    </div>
                  </div>
                </button>
              </div>

              {/* Topic Label */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="text-center w-[200px] bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 shadow-xl">
                  <h3 className={cn(
                    "text-lg font-black uppercase tracking-tight text-slate-800 leading-tight break-words",
                    isLocked && "text-slate-400"
                  )}>
                    {topic.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
