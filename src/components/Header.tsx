import React from 'react';
import { CompartmentId, Language } from '../types';
import { BookOpen, Search, Sun, Moon, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: CompartmentId | 'hub';
  setActiveTab: (tab: CompartmentId | 'hub') => void;
  onOpenFormulaDrawer: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  language?: Language;
  onToggleLanguage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenFormulaDrawer,
  searchQuery,
  setSearchQuery,
  theme,
  onToggleTheme,
  language = 'en',
  onToggleLanguage,
}) => {
  const isTe = language === 'te';

  return (
    <header className="sticky top-0 z-40 bg-[#0060c0] dark:bg-slate-950 text-white shadow-md border-b border-blue-500/40 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Zone 1: Title matching sci-amar64.netlify.app */}
          <button
            onClick={() => setActiveTab('hub')}
            className="text-left flex flex-col justify-center cursor-pointer group"
          >
            <span className="font-black text-lg sm:text-xl tracking-tight text-white leading-tight group-hover:text-amber-300 transition-colors">
              {isTe ? 'AP SSC భౌతిక శాస్త్రం' : 'Master Physics: Electricity'}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-blue-100 tracking-wide">
              {isTe ? 'స్టడీ హబ్ ' : 'Study Hub '}
              <em className="text-amber-300 not-italic">(Amar)</em>
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-xs xl:text-sm font-semibold text-blue-100">
            <button
              onClick={() => setActiveTab('hub')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'hub' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              {isTe ? 'స్టడీ హబ్' : 'Study Hub'}
            </button>
            <button
              onClick={() => setActiveTab('concepts')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'concepts' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-blue-100 hover:text-white'
              }`}
            >
              {isTe ? 'సిద్ధాంతం & భావనలు' : 'Theory & Concepts'}
            </button>
            <button
              onClick={() => setActiveTab('practice-tests')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'practice-tests' || activeTab === 'simulations' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'అసైన్‌మెంట్లు' : 'Assignments'}
            </button>
            <button
              onClick={() => setActiveTab('derivations')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'derivations' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'ఉత్పాదనలు' : 'Derivations'}
            </button>
            <button
              onClick={() => setActiveTab('experiments')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'experiments' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'ప్రయోగాలు' : 'Experiments'}
            </button>
            <button
              onClick={() => setActiveTab('differences')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'differences' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'తేడాలు' : 'Differences'}
            </button>
            <button
              onClick={() => setActiveTab('problems')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'problems' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'సాధించిన లెక్కలు (20)' : 'Solved (20)'}
            </button>
            <button
              onClick={() => setActiveTab('daily-life')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'daily-life' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'నిత్యజీవితంలో' : 'Daily Life'}
            </button>
            <button
              onClick={() => setActiveTab('electrons')}
              className={`hover:text-white transition-colors whitespace-nowrap pb-1 border-b-2 cursor-pointer ${
                activeTab === 'electrons' ? 'text-white border-amber-300 font-bold' : 'border-transparent text-sky-100 hover:text-white'
              }`}
            >
              {isTe ? 'ఎలక్ట్రాన్లు' : 'Electrons'}
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Toggle Button (EN / తెలుగు) */}
            <button
              onClick={onToggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all cursor-pointer shadow-xs ${
                isTe
                  ? 'bg-amber-400 text-slate-950 font-black border-amber-300 ring-2 ring-amber-300/40'
                  : 'bg-white/15 hover:bg-white/25 border-white/25 text-white font-bold'
              }`}
              title={isTe ? 'Switch to English' : 'తెలుగులోకి మార్చండి (Switch to Telugu)'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs">{isTe ? 'తెలుగు' : 'EN'}</span>
            </button>

            {/* Search Input on desktop */}
            <div className="relative hidden xl:block w-48">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-sky-200" />
              <input
                type="text"
                placeholder={isTe ? 'సూత్రాలను వెతకండి...' : 'Search formulas...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-sky-700/60 dark:bg-slate-900 border border-sky-400/40 dark:border-slate-700 rounded-lg text-white placeholder-sky-200 focus:outline-none focus:border-amber-300 transition-colors"
              />
            </div>

            {/* Formulas Drawer Button */}
            <button
              onClick={onOpenFormulaDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-xs whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isTe ? 'సూత్రాలు' : 'Formulas'}</span>
            </button>

            {/* Bright / Dark Mode Switcher */}
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-lg bg-sky-700/70 hover:bg-sky-700 dark:bg-slate-900 dark:hover:bg-slate-800 border border-sky-400/40 dark:border-slate-700 text-white transition-all cursor-pointer shadow-2xs"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Bright Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-100" />
                  <span className="hidden sm:inline text-[11px] font-semibold">Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline text-[11px] font-semibold text-amber-200">Bright</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
