import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { MacroTopic, Lesson } from '../constants';
import { cn } from '../lib/utils';

interface TopicDrawerProps {
  topic: MacroTopic | null;
  completedLessons: string[];
  onClose: () => void;
  onStartLesson: (lesson: Lesson) => void;
}

export default function TopicDrawer({ topic, completedLessons, onClose, onStartLesson }: TopicDrawerProps) {
  if (!topic) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-50 bg-brand-bg flex flex-col"
      >
        {/* Header Bar */}
        <header className="fixed top-0 left-0 right-0 h-20 bg-brand-primary z-50 px-6 flex items-center gap-4 shadow-xl border-b-4 border-blue-800">
          <button 
            onClick={onClose}
            className="p-3 bg-white/20 rounded-2xl text-white hover:bg-white/30 transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-display font-black uppercase italic tracking-tighter text-white leading-none mb-1">
              {topic.title}
            </h1>
          </div>
        </header>

        {/* The Map Content */}
        <div className="flex-1 relative overflow-y-auto no-scrollbar bg-brand-bg">
          <div className="min-h-full pb-40 pt-32 relative">
            {/* Landscape Decorations (Sub-map style) */}
            <div className="absolute inset-x-0 inset-y-0 z-0 pointer-events-none opacity-40">
              <div className="absolute top-[10%] left-[10%] text-6xl">🌴</div>
              <div className="absolute top-[30%] right-[15%] text-5xl">🌺</div>
              <div className="absolute top-[50%] left-[12%] text-6xl">🌲</div>
              <div className="absolute top-[70%] right-[8%] text-5xl">🌿</div>
              <div className="absolute bottom-[10%] left-[20%] text-6xl">🏡</div>
            </div>

            {/* Central Path */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-48 sm:w-64 bg-[#F0D9B5]/40 -z-10 shadow-inner" />

            {/* Zig-zag Connections */}
            <div className="absolute inset-0 z-[5] pointer-events-none flex justify-center opacity-30">
              <svg className="w-full h-full max-w-sm sm:max-w-none" viewBox="0 0 400 3000" preserveAspectRatio="none">
                <path 
                  d="M200,0 C200,100 160,200 160,400 C160,600 240,800 240,1100 C240,1400 160,1700 160,2000 C160,2300 240,2600 240,2900" 
                  fill="none" 
                  stroke="#D1B894" 
                  strokeWidth="12" 
                  strokeDasharray="16 12" 
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Lesson Nodes */}
            <div className="flex flex-col items-center gap-32 sm:gap-48 py-10 relative z-10 w-full max-w-md mx-auto">
              {(() => {
                const nextLessonIndex = topic.lessons.findIndex(l => !completedLessons.includes(l.id));
                
                return topic.lessons.map((lesson, index) => {
                  const isEven = index % 2 === 0;
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isLocked = topic.status === 'locked' || (index > 0 && !completedLessons.includes(topic.lessons[index-1].id));
                  const isNext = index === nextLessonIndex;

                  return (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className={cn(
                        "relative flex flex-col items-center",
                        index === 0 ? "" : (index % 2 === 1 ? "translate-x-[-40px] sm:translate-x-[-40px]" : "translate-x-[40px] sm:translate-x-[40px]")
                      )}
                    >
                      <button
                        onClick={() => onStartLesson(lesson)}
                        className={cn(
                          "w-28 h-28 relative transition-all duration-300 active:scale-95 group rounded-t-3xl rounded-b-[2rem]",
                          "before:content-[''] before:absolute before:inset-0 before:bg-brand-primary before:rounded-t-3xl before:rounded-b-[2rem] before:border-b-8 before:border-blue-800 before:shadow-xl",
                          isLocked && !isNext && "before:bg-slate-300 before:border-slate-400 opacity-100",
                          isCompleted && "before:bg-[#58CC02] before:border-[#46A302] opacity-100",
                          isNext && "before:bg-brand-primary before:border-blue-800 opacity-100 shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                        )}
                      >
                        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-2">
                           {isCompleted ? (
                             <CheckCircle2 className="w-10 h-10" />
                           ) : (
                             <span className="text-4xl font-display font-black italic">{index + 1}</span>
                           )}
                        </div>
                      </button>

                      {/* Label */}
                      <div className="absolute top-full mt-4 flex flex-col items-center gap-2 text-center w-[180px]">
                        <h4 className={cn(
                          "text-sm font-black uppercase tracking-tight text-slate-800 leading-tight bg-white p-3 rounded-2xl shadow-lg border-2 border-slate-100",
                          !isCompleted && "text-slate-400"
                        )}>
                          {lesson.title}
                        </h4>
                        <div className="flex justify-center gap-2">
                          <span className="text-[10px] font-black text-brand-primary uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                            {lesson.energyCost}⚡
                          </span>
                          <span className="text-[10px] font-black text-brand-secondary uppercase bg-yellow-50 px-2 py-0.5 rounded-md">
                            {lesson.xpReward}XP
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
