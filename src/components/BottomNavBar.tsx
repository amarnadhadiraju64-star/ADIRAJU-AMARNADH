import React from 'react';
import { Home, BookOpen, Compass, Calculator } from 'lucide-react';
import { CompartmentId, Language } from '../types';

interface BottomNavBarProps {
  currentView: 'hub' | CompartmentId;
  onNavigate: (view: 'hub' | CompartmentId) => void;
  language?: Language;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  onNavigate,
  language = 'en',
}) => {
  const isTe = language === 'te';

  const tabs = [
    {
      id: 'hub' as const,
      label: isTe ? 'స్టడీ హబ్' : 'Study Hub',
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'concepts' as const,
      label: isTe ? 'సిద్ధాంతం' : 'Theory & Concepts',
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: 'derivations' as const,
      label: isTe ? 'ఉత్పాదనలు' : 'Animated Derivations',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'problems' as const,
      label: isTe ? 'లెక్కలు' : 'Solved Problems',
      icon: <Calculator className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1.5 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentView === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                onNavigate(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex flex-col items-center justify-center py-1 px-2 min-w-[70px] cursor-pointer group transition-all"
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#dbeafe] dark:bg-sky-950 text-[#0060c0] dark:text-sky-400 font-bold scale-105 shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-tight transition-colors line-clamp-1 ${
                  isActive
                    ? 'font-bold text-[#0060c0] dark:text-sky-400'
                    : 'font-medium text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
