import React from 'react';
import { Home, BookOpen, Trophy, Star, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home', hasNotification: false },
  { id: 'missions', icon: BookOpen, label: 'Lezioni', hasNotification: true },
  { id: 'trophies', icon: Trophy, label: 'Trofei', hasNotification: true },
  { id: 'premium', icon: Star, label: 'Premium', hasNotification: true },
  { id: 'ai', icon: MessageCircle, label: 'Chat', hasNotification: true },
];

export default function BottomBar({ activeTab, onTabChange }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-brand-primary z-40 px-6 flex items-center justify-around border-t-4 border-brand-primary-dark shadow-2xl mx-4 mb-4 rounded-[2.5rem]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex flex-col items-center gap-1 relative group"
          >
            <div className={cn(
              "p-3 rounded-2xl transition-all duration-300 relative",
              isActive 
                ? "bg-bg-card text-brand-primary scale-110 shadow-xl" 
                : "text-white/60 hover:text-white"
            )}>
              <Icon className={cn("w-7 h-7", isActive && "fill-brand-primary/20")} />
              
              {/* Notification Dot */}
              {tab.hasNotification && !isActive && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-brand-secondary rounded-full border-2 border-brand-primary" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
