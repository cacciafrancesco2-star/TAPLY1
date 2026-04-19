import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { MacroTopic } from '../constants';
import { cn } from '../lib/utils';
import MapBackground from './MapBackground';

interface MapProps {
  topics: MacroTopic[];
  onTopicClick: (topic: MacroTopic) => void;
}

export default function Map({ topics, onTopicClick }: MapProps) {
  return (
    <div className="relative min-h-screen pt-48 pb-40 px-6 overflow-x-hidden overflow-y-auto select-none no-scrollbar">
      {/* Realistic nature background (no emojis) */}
      <MapBackground />

      {/* Dashed connection line — path silhouette removed, only dashes remain */}
      <div className="absolute inset-0 z-[5] pointer-events-none flex justify-center">
        <svg className="w-full h-full max-w-sm sm:max-w-none" viewBox="0 0 400 3000" preserveAspectRatio="none">
          <path
            d="M200,0 C200,150 160,250 160,500 C160,750 240,850 240,1100 C240,1350 160,1550 160,1800 C160,2050 240,2250 240,2500 C240,2750 200,2900 200,3000"
            fill="none"
            stroke="#D1B894"
            strokeWidth="12"
            strokeDasharray="16 12"
            strokeLinecap="round"
            className="opacity-60"
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-40 sm:gap-64 py-40 relative z-10 w-full max-w-md mx-auto">
        {topics.map((topic, index) => {
          const isLocked = topic.status === 'locked';
          const isCompleted = topic.status === 'completed';

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className={cn(
                'relative flex flex-col items-center',
                index === 0 ? '' : (index % 2 === 1 ? 'translate-x-[-40px] sm:translate-x-[-50px]' : 'translate-x-[40px] sm:translate-x-[50px]')
              )}
            >
              {/* Shield/Crest Node */}
              <div className="relative group">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[80%] h-[80%] bg-black/10 rounded-[2rem] blur-xl" />

                {!isLocked && (
                  <div className="absolute -inset-4 border-4 border-slate-200/50 rounded-full" />
                )}

                <button
                  onClick={() => onTopicClick(topic)}
                  className={cn(
                    'w-32 h-32 relative transition-all duration-300 active:scale-90',
                    "before:content-[''] before:absolute before:inset-0 before:bg-brand-primary before:rounded-t-3xl before:rounded-b-[2.5rem] before:border-b-[12px] before:border-blue-800 before:shadow-2xl",
                    isLocked && 'before:bg-slate-300 before:border-slate-400 grayscale opacity-90',
                    isCompleted && 'before:bg-[#58CC02] before:border-[#46A302]'
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
                      {!['tech-base', 'social-media', 'phishing', 'cyber-safety', 'e-government', 'online-shopping'].includes(topic.id) && <Play className="w-10 h-10 fill-current" />}
                    </div>
                  </div>
                </button>
              </div>

              {/* Topic Label */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="text-center w-[200px] bg-white border-2 border-slate-100 rounded-2xl px-4 py-3 shadow-xl">
                  <h3 className={cn(
                    'text-lg font-black uppercase tracking-tight text-slate-800 leading-tight break-words',
                    isLocked && 'text-slate-400'
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
