import React, { useState } from 'react';
import { CompartmentId, Language } from './types';
import { Header } from './components/Header';
import { FormulaDrawer } from './components/FormulaDrawer';
import { StudyHubFrontPage } from './components/StudyHubFrontPage';
import { BottomNavBar } from './components/BottomNavBar';
import { ConceptsCompartment } from './components/compartments/ConceptsCompartment';
import { PracticeTestsCompartment } from './components/compartments/PracticeTestsCompartment';
import { DerivationsCompartment } from './components/compartments/DerivationsCompartment';
import { ExperimentsCompartment } from './components/compartments/ExperimentsCompartment';
import { DifferencesCompartment } from './components/compartments/DifferencesCompartment';
import { ProblemsCompartment } from './components/compartments/ProblemsCompartment';
import { DailyLifeCompartment } from './components/compartments/DailyLifeCompartment';
import { ElectronsCompartment } from './components/compartments/ElectronsCompartment';
import {
  BookOpen,
  FlaskConical,
  Compass,
  Scale,
  Calculator,
  Home,
  Zap,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ArrowLeft
} from 'lucide-react';

interface CompartmentCardDef {
  id: CompartmentId;
  number: number;
  icon: React.ReactNode;
  title: string;
  titleTe: string;
  subtitle: string;
  tag: string;
  description: string;
}

const COMPARTMENTS_LIST: CompartmentCardDef[] = [
  {
    id: 'concepts',
    number: 1,
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Theory & Concepts',
    titleTe: 'సిద్ధాంతం & భావనలు',
    subtitle: '20 Fundamental Topics (A–T)',
    tag: '20 Topics',
    description: 'Definitions, formulas, SI & MKS units, 1 kWh conversion (3.6 × 10⁶ J / W·s), simple meanings, practical examples, and circuit schematics.',
  },
  {
    id: 'practice-tests',
    number: 2,
    icon: <ClipboardCheck className="w-5 h-5" />,
    title: 'Assignments & Practice Tasks',
    titleTe: 'అసైన్‌మెంట్లు & అభ్యాస పనులు',
    subtitle: 'WhatsApp Problems & Notebook Tasks',
    tag: 'Assignments',
    description: 'Official WhatsApp uploaded circuit problems with neat schematics & hidden answers, and classroom notebook tasks.',
  },
  {
    id: 'derivations',
    number: 3,
    icon: <Compass className="w-5 h-5" />,
    title: 'Animated Derivations',
    titleTe: 'యానిమేటెడ్ ఉత్పాదనలు',
    subtitle: 'Step-by-Step Proofs',
    tag: 'Animated Derivations',
    description: 'Resistivity ρ = RA/l, Ohm’s law, Series Rs with voltage splitting, Parallel Rp with current branching.',
  },
  {
    id: 'experiments',
    number: 4,
    icon: <FlaskConical className="w-5 h-5" />,
    title: 'Experiments',
    titleTe: 'ప్రయోగాలు',
    subtitle: '10 Fixed Headings Standard',
    tag: 'Lab Experiments',
    description: 'Verify Ohm’s law, resistance vs length, area, temperature, and materials. Interactive tables & graphs.',
  },
  {
    id: 'differences',
    number: 5,
    icon: <Scale className="w-5 h-5" />,
    title: 'Differences',
    titleTe: 'తేడాలు & పోలికలు',
    subtitle: '6 High-Scoring Comparisons',
    tag: '6 Key Tables',
    description: 'Series vs Parallel, p.d. vs EMF, Resistance vs Resistivity, Conductor vs Resistor, Ohmic vs Non-Ohmic, Fuse vs Filament.',
  },
  {
    id: 'problems',
    number: 6,
    icon: <Calculator className="w-5 h-5" />,
    title: 'Solved Problems & Exercises',
    titleTe: 'సాధించిన సమస్యలు & లెక్కలు',
    subtitle: '21 Problems with Hidden Solutions',
    tag: '21 Exercises & PYQs',
    description: 'All 18 official AP SSC textbook exercises + Question 23 (Electricity Bill) + 2019 & 2016 Board V-I graph questions with toggleable hidden solutions.',
  },
  {
    id: 'daily-life',
    number: 7,
    icon: <Home className="w-5 h-5" />,
    title: 'Project Work & Daily Life',
    titleTe: 'ప్రాజెక్ట్ వర్క్ & నిత్యజీవితంలో విద్యుత్',
    subtitle: 'Wiring · Circuits · Kirchhoff',
    tag: '3 Core Sections',
    description: '1) Daily Life & Wiring notes, 2) Equivalent resistance circuits (Cases a–d) with hidden solutions, 3) Kirchhoff’s laws with animated junction & loop conservation.',
  },
  {
    id: 'electrons',
    number: 8,
    icon: <Zap className="w-5 h-5" />,
    title: 'Electron Physics',
    titleTe: 'ఎలక్ట్రాన్ భౌతికశాస్త్రం',
    subtitle: 'Microscopic Physics',
    tag: 'Microscopic Drift',
    description: 'Charge on electron, meaning of 1 Ampere, water pump analogy, and electron drift vs electric signal velocity.',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<CompartmentId | 'hub'>('hub');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isFormulaDrawerOpen, setIsFormulaDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [completedTabs, setCompletedTabs] = useState<Set<CompartmentId>>(new Set(['concepts']));

  const isTe = language === 'te';

  const handleTabChange = (tab: CompartmentId | 'hub') => {
    setActiveTab(tab);
    if (tab !== 'hub') {
      setCompletedTabs((prev) => new Set([...prev, tab]));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHubNavigate = (target: CompartmentId | 'formulas' | 'flashcards') => {
    if (target === 'formulas') {
      setIsFormulaDrawerOpen(true);
      return;
    }
    if (target === 'flashcards') {
      handleTabChange('concepts');
      return;
    }
    handleTabChange(target);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  const currentCompartmentIndex = COMPARTMENTS_LIST.findIndex((c) => c.id === activeTab);
  const prevCompartment =
    currentCompartmentIndex > 0 ? COMPARTMENTS_LIST[currentCompartmentIndex - 1] : null;
  const nextCompartment =
    currentCompartmentIndex >= 0 && currentCompartmentIndex < COMPARTMENTS_LIST.length - 1
      ? COMPARTMENTS_LIST[currentCompartmentIndex + 1]
      : null;

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Header Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenFormulaDrawer={() => setIsFormulaDrawerOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        language={language}
        onToggleLanguage={toggleLanguage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ======================================================== */}
      {/* 1. FRONT PAGE / STUDY HUB (Matching WhatsApp screenshot) */}
      {/* ======================================================== */}
      {activeTab === 'hub' ? (
        <main className="flex-1 w-full pt-2">
          <StudyHubFrontPage
            onNavigate={handleHubNavigate}
            overallProgress={45}
            language={language}
          />
        </main>
      ) : (
        /* ======================================================== */
        /* 2. SPECIFIC COMPARTMENT VIEW WORKSPACE */
        /* ======================================================== */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
          {/* Back to Study Hub Header Button */}
          <div className="mb-6 flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleTabChange('hub')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-slate-800 text-[#0060c0] dark:text-sky-400 font-bold text-xs sm:text-sm border border-blue-200/60 dark:border-slate-800 transition-all cursor-pointer shadow-2xs group"
            >
              <ArrowLeft className="w-4 h-4 text-[#0060c0] dark:text-sky-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>{isTe ? '← స్టడీ హబ్‌కి తిరిగి వెళ్లండి' : '← Back to Study Hub'}</span>
            </button>

            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-lg">
              {(() => {
                const found = COMPARTMENTS_LIST.find((c) => c.id === activeTab);
                if (!found) return isTe ? 'విభాగం' : 'Module';
                return isTe ? found.titleTe : found.title;
              })()}
            </span>
          </div>

          {activeTab === 'concepts' && (
            <ConceptsCompartment searchQuery={searchQuery} language={language} />
          )}
          {(activeTab === 'practice-tests' || activeTab === 'simulations') && (
            <PracticeTestsCompartment />
          )}
          {activeTab === 'derivations' && <DerivationsCompartment />}
          {activeTab === 'experiments' && <ExperimentsCompartment />}
          {activeTab === 'differences' && <DifferencesCompartment />}
          {activeTab === 'problems' && <ProblemsCompartment />}
          {activeTab === 'daily-life' && <DailyLifeCompartment />}
          {activeTab === 'electrons' && <ElectronsCompartment />}

          {/* Bottom Pager Controls: Previous, Home, Next */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {prevCompartment ? (
                <button
                  type="button"
                  onClick={() => handleTabChange(prevCompartment.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-500" />
                  <span>
                    {isTe
                      ? `మునుపటిది: ${prevCompartment.titleTe}`
                      : `Previous: ${prevCompartment.title}`}
                  </span>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleTabChange('hub')}
                className="px-4 py-2.5 text-xs font-bold text-white bg-[#0060c0] hover:bg-[#0050a0] rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Home className="w-3.5 h-3.5 text-white" />
                <span>{isTe ? 'స్టడీ హబ్‌కి తిరిగి వెళ్ళు' : 'Return to Study Hub'}</span>
              </button>
              <button
                type="button"
                onClick={() => setIsFormulaDrawerOpen(true)}
                className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isTe ? 'సూత్రాల పట్టిక' : 'Formula Quick Ref'}</span>
              </button>
            </div>

            <div>
              {nextCompartment ? (
                <button
                  type="button"
                  onClick={() => handleTabChange(nextCompartment.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>
                    {isTe
                      ? `తదుపరిది: ${nextCompartment.titleTe}`
                      : `Next: ${nextCompartment.title}`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      )}

      {/* Formula Reference Drawer Modal */}
      <FormulaDrawer
        isOpen={isFormulaDrawerOpen}
        onClose={() => setIsFormulaDrawerOpen(false)}
      />

      {/* Fixed Bottom Navigation Bar matching screenshot */}
      <BottomNavBar
        currentView={activeTab}
        onNavigate={handleTabChange}
        language={language}
      />
    </div>
  );
}
