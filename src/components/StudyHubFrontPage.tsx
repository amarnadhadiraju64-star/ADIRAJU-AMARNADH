import React from 'react';
import {
  BookOpen,
  Calculator,
  Film,
  FlaskConical,
  Brain,
  Scale,
  GraduationCap,
  LayoutGrid,
  Folder,
  Zap
} from 'lucide-react';
import { CompartmentId, Language } from '../types';

interface StudyHubFrontPageProps {
  onNavigate: (compartment: CompartmentId | 'formulas' | 'flashcards') => void;
  overallProgress?: number;
  language?: Language;
}

export const StudyHubFrontPage: React.FC<StudyHubFrontPageProps> = ({
  onNavigate,
  overallProgress = 45,
  language = 'en',
}) => {
  const isTe = language === 'te';

  return (
    <div className="w-full max-w-xl mx-auto px-4 pb-24 pt-3 space-y-5 animate-in fade-in duration-300">
      {/* ======================================================== */}
      {/* 1. HERO CARD (Matching sci-amar64.netlify.app in WhatsApp) */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0060c0] text-white p-5 sm:p-6 shadow-xl shadow-blue-900/20">
        {/* Subtle Decorative Star Watermark */}
        <div className="absolute -right-6 -bottom-6 w-52 h-52 opacity-20 pointer-events-none select-none">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="6" className="w-full h-full text-white">
            <polygon points="100,10 125,75 195,75 137,117 159,185 100,143 41,185 63,117 5,75 75,75" />
          </svg>
        </div>

        <div className="relative z-10 space-y-2">
          {/* Main Title matching WhatsApp image: Master Physics: Electricity (Amar) */}
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {isTe ? 'AP SSC భౌతిక శాస్త్రం: విద్యుత్ ' : 'Master Physics: Electricity '}
            <em className="text-[#facc15] not-italic font-bold">({isTe ? 'అమర్' : 'Amar'})</em>
          </h1>

          {/* Subtitle matching WhatsApp image */}
          <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed max-w-md">
            {isTe
              ? 'AP SSC మరియు సమానమైన పరీక్షల కొరకు సంపూర్ణ అభ్యాస సామగ్రి.'
              : 'Complete material for AP SSC and Equivalent Exams.'}
          </p>

          {/* Progress Section */}
          <div className="pt-4 mt-3 border-t border-white/20 space-y-1.5 max-w-sm">
            <div className="flex items-center justify-between text-xs font-semibold text-blue-100">
              <span className="text-[11px] font-bold tracking-wide uppercase">
                {isTe ? 'మొత్తం పురోగతి' : 'Overall Progress'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-white font-mono">
                {overallProgress}%
              </span>

              {/* Progress bar with yellow track */}
              <div className="flex-1 h-3.5 rounded-full bg-[#003875] overflow-hidden p-0.5 border border-blue-400/30">
                <div
                  className="h-full rounded-full bg-[#f59e0b] shadow-sm transition-all duration-500 ease-out"
                  style={{ width: `${Math.max(10, overallProgress)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SECTION TITLE: Study Hub */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {isTe ? 'స్టడీ హబ్' : 'Study Hub'}
        </h2>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
          {isTe ? '10 విభాగాలు' : '10 Modules'}
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. 10 STUDY HUB CARDS (2 Columns matching WhatsApp) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
        {/* Card 1: Theory & Concepts (Solid Blue) */}
        <button
          type="button"
          onClick={() => onNavigate('concepts')}
          className="h-28 sm:h-32 rounded-2xl bg-[#0060c0] hover:bg-[#0052a6] text-white p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-md transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/25 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'సిద్ధాంతం & భావనలు' : 'Theory & Concepts'}
          </span>
        </button>

        {/* Card 2: Formulas with Units (Pale Blue) */}
        <button
          type="button"
          onClick={() => onNavigate('formulas')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f0f7ff] hover:bg-[#e0efff] border border-[#d6e7fc] text-[#034085] p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#dbeafe] flex items-center justify-center text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
            <Calculator className="w-5 h-5 text-[#0284c7]" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'సూత్రాలు & ప్రమాణాలు' : 'Formulas with Units'}
          </span>
        </button>

        {/* Card 3: Animated Derivations (Pale Slate) */}
        <button
          type="button"
          onClick={() => onNavigate('derivations')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-slate-200 text-slate-800 p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-700 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-slate-700" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'యానిమేటెడ్ ఉత్పాదనలు' : 'Animated Derivations'}
          </span>
        </button>

        {/* Card 4: Experiments (Solid Bright Amber) */}
        <button
          type="button"
          onClick={() => onNavigate('experiments')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f59e0b] hover:bg-[#d97706] text-slate-950 p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-md transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/35 flex items-center justify-center text-slate-950 shrink-0 group-hover:scale-105 transition-transform">
            <FlaskConical className="w-5 h-5 text-slate-950" />
          </div>
          <span className="font-black text-sm sm:text-base leading-tight">
            {isTe ? 'ప్రయోగాలు' : 'Experiments'}
          </span>
        </button>

        {/* Card 5: Solved Problems (Pale Cream / Soft Amber) */}
        <button
          type="button"
          onClick={() => onNavigate('problems')}
          className="h-28 sm:h-32 rounded-2xl bg-[#fefce8] hover:bg-[#fef9c3] border border-[#fef08a] text-[#78350f] p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] shrink-0 group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5 text-[#d97706]" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'సాధించిన సమస్యలు' : 'Solved Problems'}
          </span>
        </button>

        {/* Card 6: Differences (Pale Slate) */}
        <button
          type="button"
          onClick={() => onNavigate('differences')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-slate-200 text-slate-800 p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
            <Scale className="w-5 h-5 text-[#0284c7]" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'తేడాలు & పోలికలు' : 'Differences'}
          </span>
        </button>

        {/* Card 7: Electron Physics (Microscopic) */}
        <button
          type="button"
          onClick={() => onNavigate('electrons')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f0f9ff] hover:bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-[#0284c7]" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'ఎలక్ట్రాన్ భౌతికశాస్త్రం' : 'Electron Physics'}
          </span>
        </button>

        {/* Card 8: Previous Exams (1, 2, 4, 8M) (Dark Slate Navy) */}
        <button
          type="button"
          onClick={() => onNavigate('practice-tests')}
          className="h-28 sm:h-32 rounded-2xl bg-[#475569] hover:bg-[#334155] text-white p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-md transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'మునుపటి పరీక్షా ప్రశ్నలు' : 'Previous Exams (1, 2, 4, 8M)'}
          </span>
        </button>

        {/* Card 9: Assignments (Pale Slate) */}
        <button
          type="button"
          onClick={() => onNavigate('practice-tests')}
          className="h-28 sm:h-32 rounded-2xl bg-[#f1f5f9] hover:bg-[#e2e8f0] border border-slate-200 text-slate-800 p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-xs transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-slate-700 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
            <LayoutGrid className="w-5 h-5 text-slate-700" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'అసైన్‌మెంట్లు' : 'Assignments'}
          </span>
        </button>

        {/* Card 10: Project Work (Solid Rich Blue) */}
        <button
          type="button"
          onClick={() => onNavigate('daily-life')}
          className="h-28 sm:h-32 rounded-2xl bg-[#0055b3] hover:bg-[#004494] text-white p-3.5 sm:p-4 text-left flex flex-col justify-between shadow-md transition-all active:scale-97 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
            <Folder className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-sm sm:text-base leading-tight">
            {isTe ? 'ప్రాజెక్ట్ వర్క్' : 'Project Work'}
          </span>
        </button>
      </div>
    </div>
  );
};
