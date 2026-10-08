import React, { useState } from 'react';
import { HandwrittenBoardQuestionsSection } from './HandwrittenBoardQuestionsSection';
import { WhatsAppAssignmentProblemsSection } from './WhatsAppAssignmentProblemsSection';
import {
  ClipboardCheck,
  BookOpen,
  Sparkles,
  Zap
} from 'lucide-react';

export const PracticeTestsCompartment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'whatsapp' | 'notebook'>('all');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950/70 to-slate-950 border-2 border-sky-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-black text-sky-400 uppercase tracking-wider">
              <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-sky-400" />
                <span>Compartment 2 · Assignment Compartment</span>
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300 font-bold">AP SSC Board Curated</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Classroom Assignments &amp; Homework Tasks
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Curated board assignments featuring official WhatsApp uploaded numerical problems (two 8Ω resistors in parallel, 6V potential, and 45 J heat dissipation) and classroom notebook tasks with interactive hidden answers and step-by-step verified solutions.
            </p>
          </div>

          {/* Quick Stat Counters */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-center min-w-[95px]">
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">
                2
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Qs</span>
            </div>
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-center min-w-[95px]">
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">
                3
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notebook Tasks</span>
            </div>
            <div className="p-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-center min-w-[95px]">
              <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono block">
                100%
              </span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Hidden Solutions</span>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border-2 border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>⚡ All Assignments</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>⚡ WhatsApp Assignment (8Ω &amp; 45J Heat)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notebook')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'notebook'
                ? 'bg-sky-400 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📋 Notebook Tasks &amp; Matching Solutions</span>
          </button>
        </div>

        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1.5 rounded-lg hidden lg:inline-block">
          ★ AP SSC Board Standard
        </span>
      </div>

      {/* Render WhatsApp Uploaded Assignment Section (Two 8Ω Resistors, Current & 45J Heat Dissipated) */}
      {(activeTab === 'all' || activeTab === 'whatsapp') && (
        <WhatsAppAssignmentProblemsSection />
      )}

      {/* Render Handwritten Board Questions Section */}
      {(activeTab === 'all' || activeTab === 'notebook') && (
        <HandwrittenBoardQuestionsSection />
      )}
    </div>
  );
};
