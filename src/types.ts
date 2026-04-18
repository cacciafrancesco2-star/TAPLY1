export type Level = 'Principiante' | 'Intermedio' | 'Avanzato';

export interface UserStats {
  energy: number;
  maxEnergy: number;
  xp: number;
  streak: number;
  level: Level;
  trophies: number;
  lastEnergyUpdate: number;
  lastCompletionDate?: string; // ISO date string YYYY-MM-DD
}

export interface UserSettings {
  fontSize: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  theme: 'light' | 'dark' | 'high-contrast' | 'warm';
  soundVolume: number;
  notifications: boolean;
  language: 'IT' | 'EN' | 'ES';
  allowSkipping: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  energyCost: number;
  xpReward: number;
}

export interface MacroTopic {
  id: string;
  title: string;
  topic: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed' | 'in-progress';
  lessons: Lesson[];
}

export interface Slide {
  type: 'intro' | 'video' | 'true-false' | 'fill-blank' | 'analyze' | 'multiple-choice' | 'summary';
  content: any;
}

export interface AppState {
  landingComplete: boolean;
  onboardingComplete: boolean;
  quizComplete: boolean;
  user: {
    name: string;
    email: string;
    isGuest: boolean;
    avatar?: string;
  } | null;
  stats: UserStats;
  settings: UserSettings;
  completedLessons: string[];
  lastSelectedTopicId: string | null;
  lessonProgress: {
    [lessonId: string]: {
      currentSlide: number;
      lastUpdated: number;
    };
  };
}
