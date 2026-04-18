/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { AppState, Level } from './types';
import { INITIAL_STATS, INITIAL_SETTINGS, MACRO_TOPICS, Lesson as LessonType } from './constants';
import Onboarding from './components/Onboarding';
import Quiz from './components/Quiz';
import Auth from './components/Auth';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import Map from './components/Map';
import AIChat from './components/AIChat';
import Profile from './components/Profile';
import Missions from './components/Missions';
import Premium from './components/Premium';
import TopicDrawer from './components/TopicDrawer';
import LessonScreen from './components/Lesson';
import Trophies from './components/Trophies';
import PrivacyModal from './components/PrivacyModal';
import SupportModal from './components/SupportModal';
import EnergyModal from './components/EnergyModal';
import StreakModal from './components/StreakModal';
import ResumeBanner from './components/ResumeBanner';
import StreakCelebration from './components/StreakCelebration';

import Landing from './components/Landing';

const INITIAL_STATE: AppState = {
  landingComplete: false,
  onboardingComplete: false,
  quizComplete: false,
  user: null,
  stats: INITIAL_STATS,
  settings: INITIAL_SETTINGS,
  completedLessons: [],
  lastSelectedTopicId: null,
  lessonProgress: {},
};

export default function App() {
  const [state, setState] = useLocalStorage<AppState>('taply_v7_final_responsive', INITIAL_STATE);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState<any | null>(null);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showEnergy, setShowEnergy] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [streakCelebration, setStreakCelebration] = useState(false);

  // Migration to ensure nested fields exist for old states
  useEffect(() => {
    if (state && (!state.lessonProgress || state.lastSelectedTopicId === undefined || state.settings?.allowSkipping === undefined)) {
      setState(prev => ({
        ...prev,
        lessonProgress: prev.lessonProgress || {},
        lastSelectedTopicId: prev.lastSelectedTopicId !== undefined ? prev.lastSelectedTopicId : null,
        settings: {
          ...prev.settings,
          allowSkipping: prev.settings?.allowSkipping ?? false
        }
      }));
    }
  }, [state, setState]);

  // One-time Energy Refill as requested
  useEffect(() => {
    setState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        energy: prev.stats.maxEnergy
      }
    }));
  }, []); // Only once on mount

  // Energy Regeneration Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        const now = Date.now();
        const elapsed = now - prev.stats.lastEnergyUpdate;
        const regenRate = 5 * 60 * 60 * 1000; // 5 hours for 5 units = 1 hour per unit
        const unitsToRegen = Math.floor(elapsed / (regenRate / 5));

        if (unitsToRegen > 0 && prev.stats.energy < prev.stats.maxEnergy) {
          const newEnergy = Math.min(prev.stats.maxEnergy, prev.stats.energy + unitsToRegen);
          return {
            ...prev,
            stats: {
              ...prev.stats,
              energy: newEnergy,
              lastEnergyUpdate: now - (elapsed % (regenRate / 5)),
            }
          };
        }
        return prev;
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [setState]);

  const handleLandingComplete = () => {
    setState({ ...state, landingComplete: true });
  };

  const handleOnboardingComplete = () => {
    setState(prev => ({ ...prev, onboardingComplete: true }));
  };

  const handleQuizComplete = (level: Level) => {
    setState(prev => ({ 
      ...prev, 
      quizComplete: true,
      stats: { ...prev.stats, level }
    }));
  };

  const handleAuthComplete = (userData: { name: string; email: string; isGuest: boolean }) => {
    setState(prev => ({
      ...prev,
      user: userData
    }));
  };

  useEffect(() => {
    if (state.lastSelectedTopicId) {
      const topic = MACRO_TOPICS.find(t => t.id === state.lastSelectedTopicId);
      if (topic) setSelectedTopic(topic);
    }
  }, []);

  const handleTopicClick = (topicInput: string | any) => {
    // If it's an object from Map.tsx, extract ID
    const topicId = typeof topicInput === 'string' ? topicInput : topicInput.id;
    const topic = MACRO_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    // Check if previous topics are completed
    const topicIndex = MACRO_TOPICS.findIndex(t => t.id === topic.id);
    const precedingTopics = MACRO_TOPICS.slice(0, topicIndex);
    const hasUncompletedPreceding = precedingTopics.some(t => 
      !t.lessons.every(l => state.completedLessons.includes(l.id))
    );

    if (hasUncompletedPreceding) {
      if (!state.settings.allowSkipping) {
        alert(`Il modulo "${topic.title}" è bloccato. Completa prima i moduli precedenti.`);
        return;
      }
      
      const confirmSkip = window.confirm(`Il modulo "${topic.title}" è bloccato. Vuoi saltare gli argomenti precedenti per sbloccarlo subito?`);
      if (confirmSkip) {
        const allPrecedingLessonIds = precedingTopics.flatMap(t => t.lessons.map(l => l.id));
        setState(prev => ({
          ...prev,
          completedLessons: Array.from(new Set([...prev.completedLessons, ...allPrecedingLessonIds])),
          lastSelectedTopicId: topic.id
        }));
        setSelectedTopic(topic);
      }
    } else {
      setState(prev => ({ ...prev, lastSelectedTopicId: topic.id }));
      setSelectedTopic(topic);
    }
  };

  const handleStartLesson = (lesson: any) => {
    // Standard consistency: ensure we have the full lesson object if needed
    if (!lesson || !lesson.id) return;

    // Check if this lesson is next in sequence within its topic
    const currentTopic = MACRO_TOPICS.find(t => t.lessons.some(l => l.id === lesson.id));
    const isResuming = state.lessonProgress?.[lesson.id] !== undefined;

    if (currentTopic) {
      const lessonIndex = currentTopic.lessons.findIndex(l => l.id === lesson.id);
      const precedingLessons = currentTopic.lessons.slice(0, lessonIndex);
      const hasUncompletedPreceding = precedingLessons.some(l => !state.completedLessons.includes(l.id));

      if (hasUncompletedPreceding && !isResuming) {
        if (!state.settings.allowSkipping) {
          alert(`La lezione "${lesson.title}" è bloccata. Completa prima i passaggi precedenti.`);
          return;
        }

        const confirmSkip = window.confirm(`La lezione "${lesson.title}" è bloccata. Vuoi saltare i passaggi precedenti di questo modulo per iniziarla subito?`);
        if (confirmSkip) {
          const precedingLessonIds = precedingLessons.map(l => l.id);
          setState(prev => ({
            ...prev,
            completedLessons: Array.from(new Set([...prev.completedLessons, ...precedingLessonIds]))
          }));
        } else {
          return;
        }
      }
    }

    if (state.stats.energy < lesson.energyCost && !isResuming) {
      setShowEnergy(true);
      return;
    }

    if (!isResuming) {
      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          energy: prev.stats.energy - lesson.energyCost
        }
      }));
    }
    
    setActiveLesson(lesson);
    // Don't close the topic drawer anymore
  };

  const handleProgressUpdate = (lessonId: string, slideIndex: number) => {
    setState(prev => ({
      ...prev,
      lessonProgress: {
        ...(prev.lessonProgress || {}),
        [lessonId]: {
          currentSlide: slideIndex,
          lastUpdated: Date.now()
        }
      }
    }));
  };

  const handleLessonComplete = (xp: number) => {
    if (!activeLesson) return;

    const today = new Date().toISOString().split('T')[0];
    
    setState(prev => {
      const isFirstTime = !prev.completedLessons.includes(activeLesson.id);
      const newCompleted = isFirstTime 
        ? [...prev.completedLessons, activeLesson.id] 
        : prev.completedLessons;
      
      let newStreak = prev.stats.streak;
      const lastDate = prev.stats.lastCompletionDate;

      if (lastDate !== today) {
        // First lesson of the day!
        if (!lastDate) {
          newStreak = 1;
        } else {
          const last = new Date(lastDate);
          const current = new Date(today);
          const diffTime = Math.abs(current.getTime() - last.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            newStreak = 1;
          }
        }
        setStreakCelebration(true);
      }

      // Clear the progress for THIS specific lesson upon completion
      const { [activeLesson.id]: _, ...remainingProgress } = (prev.lessonProgress || {});

      return {
        ...prev,
        completedLessons: newCompleted,
        lessonProgress: remainingProgress,
        stats: {
          ...prev.stats,
          xp: prev.stats.xp + xp,
          trophies: isFirstTime ? prev.stats.trophies + 1 : prev.stats.trophies,
          streak: newStreak,
          lastCompletionDate: today,
        }
      };
    });

    setActiveLesson(null);
  };

  const updateSettings = (newSettings: Partial<AppState['settings']>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  };

  const updateUser = (userData: Partial<AppState['user']>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null
    }));
  };

  // Render Logic
  if (!state.landingComplete) {
    return <Landing onStart={handleLandingComplete} />;
  }

  if (!state.onboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (!state.quizComplete) {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (!state.user) {
    return <Auth onComplete={handleAuthComplete} />;
  }

  const handleCloseTopicDrawer = () => {
    setSelectedTopic(null);
    setState(prev => ({ ...prev, lastSelectedTopicId: null }));
  };

  const handleClearProgress = (lessonId: string) => {
    if (window.confirm("Sei sicuro di voler ricominciare da capo questa lezione?")) {
      setState(prev => {
        const { [lessonId]: _, ...remaining } = prev.lessonProgress;
        return { ...prev, lessonProgress: remaining };
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        const updatedTopics = MACRO_TOPICS.map((topic, index) => {
          const prevTopic = MACRO_TOPICS[index - 1];
          const isPrevCompleted = !prevTopic || prevTopic.lessons.every(l => state.completedLessons.includes(l.id));
          
          return {
            ...topic,
            status: topic.lessons.every(l => state.completedLessons.includes(l.id))
              ? 'completed' as const
              : isPrevCompleted
                ? 'unlocked' as const
                : 'locked' as const
          };
        });
        return (
          <div className="relative">
            <ResumeBanner 
              progress={state.lessonProgress || {}} 
              onContinue={(id) => {
                const lesson = MACRO_TOPICS.flatMap(t => t.lessons).find(l => l.id === id);
                if (lesson) handleStartLesson(lesson);
              }}
              onClear={handleClearProgress}
            />
            <Map topics={updatedTopics} onTopicClick={handleTopicClick} />
          </div>
        );
      case 'missions':
        return <Missions />;
      case 'premium':
        return <Premium />;
      case 'ai':
        return <AIChat />;
      case 'profile':
        return <Profile state={state} onUpdateSettings={updateSettings} onUpdateUser={updateUser} />;
      case 'trophies':
        return <Trophies state={state} />;
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-brand-bg font-sans text-size-${state.settings.fontSize.toLowerCase()} theme-${state.settings.theme}`}>
      <TopBar 
        stats={state.stats} 
        onProfileClick={() => setActiveTab('profile')} 
        onTrophyClick={() => setActiveTab('trophies')}
        onPrivacyClick={() => setShowPrivacy(true)}
        onHelpClick={() => setShowSupport(true)}
        onEnergyClick={() => setShowEnergy(true)}
        onStreakClick={() => setShowStreak(true)}
      />
      
      <main className="pb-24 pt-20">
        {renderTabContent()}
      </main>

      <BottomBar activeTab={activeTab} onTabChange={setActiveTab} />

      <TopicDrawer 
        topic={selectedTopic} 
        completedLessons={state.completedLessons}
        onClose={handleCloseTopicDrawer} 
        onStartLesson={handleStartLesson} 
      />

      {activeLesson && (
        <LessonScreen 
          lesson={activeLesson}
          initialSlide={state.lessonProgress?.[activeLesson.id]?.currentSlide || 0}
          onClose={() => setActiveLesson(null)} 
          onComplete={handleLessonComplete}
          onProgressUpdate={(slideIndex) => handleProgressUpdate(activeLesson.id, slideIndex)}
        />
      )}

      <AnimatePresence>
        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} />}
        {showSupport && <SupportModal onClose={() => setShowSupport(false)} onOpenChat={() => setActiveTab('ai')} />}
        {showEnergy && <EnergyModal stats={state.stats} onClose={() => setShowEnergy(false)} />}
        {showStreak && <StreakModal streak={state.stats.streak} onClose={() => setShowStreak(false)} />}
        {streakCelebration && (
          <StreakCelebration 
            streak={state.stats.streak} 
            onComplete={() => setStreakCelebration(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

