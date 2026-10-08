import React, { useState, useMemo } from 'react';
import { PROBLEMS_DATA } from '../../data/problemsData';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  BookMarked,
  Calculator,
  Search,
  Check,
  ChevronDown,
  Sparkles,
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const ProblemsCompartment: React.FC = () => {
  const [levelFilter, setLevelFilter] = useState<'all' | 1 | 2 | 3>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleAnswers, setVisibleAnswers] = useState<Record<number, boolean>>({});
  const [userInputs, setUserInputs] = useState<Record<number, string>>({});

  const toggleAnswer = (id: number) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShowAll = () => {
    const allVisible: Record<number, boolean> = {};
    PROBLEMS_DATA.forEach((p) => {
      allVisible[p.id] = true;
    });
    setVisibleAnswers(allVisible);
  };

  const handleHideAll = () => {
    setVisibleAnswers({});
  };

  const handleInputChange = (id: number, val: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  // Filtered by level & search query, strictly ordered: Level 1 (Simple) -> Level 2 (Moderate) -> Level 3 (Higher Order)
  const filteredProblems = useMemo(() => {
    return PROBLEMS_DATA.filter((p) => {
      const matchesLevel = levelFilter === 'all' || p.level === levelFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.statement.toLowerCase().includes(q) ||
        p.topic.toLowerCase().includes(q) ||
        (p.questionNumber && `q${p.questionNumber}`.includes(q)) ||
        (p.textbookRef && p.textbookRef.toLowerCase().includes(q)) ||
        p.finalAnswer.toLowerCase().includes(q);
      return matchesLevel && matchesSearch;
    });
  }, [levelFilter, searchQuery]);

  const countLevel1 = PROBLEMS_DATA.filter((p) => p.level === 1).length;
  const countLevel2 = PROBLEMS_DATA.filter((p) => p.level === 2).length;
  const countLevel3 = PROBLEMS_DATA.filter((p) => p.level === 3).length;

  return (
    <div className="space-y-8">
      {/* Header Banner - Andhra Pradesh Physical Science Electricity Textbook Exercises */}
      <div className="bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Andhra Pradesh Physical Science • Electricity
            </span>
            <span aria-hidden="true">·</span>
            <span>Official Textbook Exercises &amp; Board PYQs</span>
            <span aria-hidden="true">·</span>
            <span>{PROBLEMS_DATA.length} Complete Questions</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Textbook Solved Problems & Simple Step-by-Step Solutions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            All {PROBLEMS_DATA.length} exercise problems from your Andhra Pradesh Class 10 Physical Science textbook (Pages 276 &amp; 278) and Board Exam questions, systematically arranged in increasing difficulty order: <strong>Simple (Level 1) → Moderate (Level 2) → Higher Order HOTS (Level 3)</strong>. Solutions are hidden by default so you can test your knowledge first!
          </p>

          {/* Quick Stats Pill Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Simple: {countLevel1} Problems
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Moderate: {countLevel2} Problems
            </span>
            <span className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              Higher Order (HOTS): {countLevel3} Problems
            </span>
          </div>
        </div>

        {/* Global Action Bar: Search, Level Tabs & Show/Hide All */}
        <div className="mt-6 pt-5 border-t border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setLevelFilter('all')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                levelFilter === 'all'
                  ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({PROBLEMS_DATA.length}) Problems
            </button>
            <button
              onClick={() => setLevelFilter(1)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                levelFilter === 1
                  ? 'bg-emerald-500 text-white font-black shadow-xs'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Simple ({countLevel1})
            </button>
            <button
              onClick={() => setLevelFilter(2)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                levelFilter === 2
                  ? 'bg-blue-600 text-white font-black shadow-xs'
                  : 'text-slate-400 hover:text-blue-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              Moderate ({countLevel2})
            </button>
            <button
              onClick={() => setLevelFilter(3)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                levelFilter === 3
                  ? 'bg-purple-600 text-white font-black shadow-xs'
                  : 'text-slate-400 hover:text-purple-400'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              Higher Order ({countLevel3})
            </button>
          </div>

          {/* Search Input & Bulk Toggle Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problem (e.g. Q6, copper, 176)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <button
              onClick={handleShowAll}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reveal all hidden solutions"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Show All</span>
            </button>
            <button
              onClick={handleHideAll}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Hide all solutions"
            >
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              <span>Hide All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-6">
        {filteredProblems.map((prob) => {
          const isAnswerShown = visibleAnswers[prob.id] || false;

          let badgeColor = 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40';
          let borderHover = 'hover:border-emerald-500/40';
          if (prob.level === 2) {
            badgeColor = 'bg-blue-950/60 text-blue-300 border-blue-500/40';
            borderHover = 'hover:border-blue-500/40';
          } else if (prob.level === 3) {
            badgeColor = 'bg-purple-950/60 text-purple-300 border-purple-500/40';
            borderHover = 'hover:border-purple-500/40';
          }

          return (
            <div
              key={prob.id}
              className={`bg-slate-900 border border-slate-800 ${borderHover} rounded-3xl p-6 sm:p-7 shadow-xs transition-all space-y-5`}
            >
              {/* Problem Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs tracking-wider shadow-xs">
                    Textbook Q{prob.questionNumber || prob.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                    {prob.levelLabel}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    {prob.topic}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                  <BookMarked className="w-3.5 h-3.5 text-amber-400" />
                  <span>{prob.textbookRef || 'Andhra Pradesh Physical Science'}</span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="space-y-3">
                <div className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed whitespace-pre-line bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
                  {prob.statement}
                </div>

                {/* Visual Graph Diagram for V-I Graph Problem */}
                {prob.graphType === 'vi_slopes' && (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                      Exam Question Diagram (V-I Graph of 3 Nichrome Samples):
                    </span>
                    <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-400 shadow-md inline-block">
                      <svg viewBox="0 0 280 220" className="w-56 sm:w-64 h-auto select-none">
                        <defs>
                          <marker id="arrowY" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                            <path d="M 0 8 L 4 0 L 8 8 Z" fill="#0f172a" />
                          </marker>
                          <marker id="arrowX" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#0f172a" />
                          </marker>
                        </defs>

                        {/* Y Axis (Current I) with arrow */}
                        <line x1="50" y1="180" x2="50" y2="25" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrowY)" />
                        {/* X Axis (Potential Difference V) with arrow */}
                        <line x1="50" y1="180" x2="250" y2="180" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrowX)" />

                        {/* Axis Labels */}
                        <text x="32" y="32" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a">
                          I
                        </text>
                        <text x="255" y="196" fontSize="18" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a">
                          V
                        </text>

                        {/* 3 Radiating Resistance Lines from Origin (50, 180) */}
                        {/* Line R3: steepest */}
                        <line x1="50" y1="180" x2="115" y2="40" stroke="#0f172a" strokeWidth="2.5" />
                        <text x="115" y="32" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                          R₃
                        </text>

                        {/* Line R1: middle */}
                        <line x1="50" y1="180" x2="180" y2="52" stroke="#0f172a" strokeWidth="2.5" />
                        <text x="190" y="44" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                          R₁
                        </text>

                        {/* Line R2: lowest slope */}
                        <line x1="50" y1="180" x2="230" y2="98" stroke="#0f172a" strokeWidth="2.5" />
                        <text x="244" y="98" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                          R₂
                        </text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Visual Graph Diagram for Fig 12.34 (Two Wires A and B in Series) */}
                {prob.graphType === 'vi_two_wires_series' && (
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                      Fig. 12.34: V-I Graphs for Wires A and B (Board Exam 2016)
                    </span>
                    <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-slate-400 shadow-md inline-block">
                      <svg viewBox="0 0 280 230" className="w-56 sm:w-64 h-auto select-none">
                        <defs>
                          <marker id="arrowY2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                            <path d="M 0 8 L 4 0 L 8 8 Z" fill="#0f172a" />
                          </marker>
                          <marker id="arrowX2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                            <path d="M 0 0 L 8 4 L 0 8 Z" fill="#0f172a" />
                          </marker>
                        </defs>

                        {/* Vertical Y Axis (Potential Difference V) */}
                        <line x1="50" y1="185" x2="50" y2="25" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrowY2)" />
                        {/* Horizontal X Axis (Current I) */}
                        <line x1="50" y1="185" x2="250" y2="185" stroke="#0f172a" strokeWidth="2.5" markerEnd="url(#arrowX2)" />

                        {/* Axis Labels as shown in Fig 12.34 */}
                        <text x="36" y="85" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="end">
                          V
                        </text>
                        <line x1="42" y1="92" x2="42" y2="105" stroke="#0f172a" strokeWidth="1.5" />
                        <path d="M 39 96 L 42 90 L 45 96 Z" fill="#0f172a" />

                        <text x="160" y="210" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a" textAnchor="middle">
                          → I
                        </text>

                        {/* Wire A: Steeper Line */}
                        <line x1="50" y1="185" x2="160" y2="45" stroke="#0f172a" strokeWidth="2.5" />
                        <text x="170" y="42" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a">
                          A
                        </text>

                        {/* Wire B: Lower Line */}
                        <line x1="50" y1="185" x2="225" y2="105" stroke="#0f172a" strokeWidth="2.5" />
                        <text x="235" y="105" fontSize="16" fontWeight="bold" fontFamily="sans-serif" fill="#0f172a">
                          B
                        </text>
                      </svg>
                    </div>
                  </div>
                )}

                {/* Visual Schematic Diagram for Three 2 Ω Resistors Maximum Combinations */}
                {prob.graphType === 'three_resistor_combinations' && (
                  <div className="p-4 sm:p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                          Visual Circuit Blueprint • 4 Unique Combinations
                        </span>
                        <p className="text-xs text-slate-300">
                          Three identical 2 Ω resistors with equal length ($l_1 = l_2 = l_3$). Exactly 4 topologies exist:
                        </p>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 self-start sm:self-auto">
                        n = 3, R = 2 Ω
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {/* Card 1: All Series */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">1. All 3 in Series</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                            Maximum: 6 Ω
                          </span>
                        </div>
                        <div className="py-2.5 px-3 bg-slate-950 rounded-lg border border-slate-800/80 text-center font-mono text-xs text-slate-200">
                          <span className="text-slate-400">●───</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                          <span className="text-slate-400">───</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                          <span className="text-slate-400">───</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                          <span className="text-slate-400">───●</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400">
                          R_eq = 2 + 2 + 2 = <strong className="text-white">6 Ω</strong> (Effective length tripled)
                        </p>
                      </div>

                      {/* Card 2: All Parallel */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">2. All 3 in Parallel</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-950/80 text-blue-300 border border-blue-500/30">
                            Minimum: 2/3 Ω (0.67 Ω)
                          </span>
                        </div>
                        <div className="py-1.5 px-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 space-y-1 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-slate-400">┌───</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold text-[11px]">2 Ω</span>
                            <span className="text-slate-400">───┐</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-slate-400">├───</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold text-[11px]">2 Ω</span>
                            <span className="text-slate-400">───┤</span>
                          </div>
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-slate-400">└───</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold text-[11px]">2 Ω</span>
                            <span className="text-slate-400">───┘</span>
                          </div>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400">
                          1/R_eq = 1/2 + 1/2 + 1/2 = 3/2 ⟹ <strong className="text-white">R_eq = 2/3 Ω</strong>
                        </p>
                      </div>

                      {/* Card 3: Two Parallel + One Series */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">3. (2 ∥ 2) in Series with 2</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">
                            Equivalent: 3 Ω
                          </span>
                        </div>
                        <div className="py-2 px-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 flex items-center justify-center gap-1.5">
                          <div className="flex flex-col gap-0.5 text-[10px]">
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                          </div>
                          <span className="text-slate-400 text-xs">(1 Ω) ───</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-bold text-xs">2 Ω</span>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400">
                          R_p = (2×2)/(2+2) = 1 Ω ⟹ R_eq = 1 + 2 = <strong className="text-white">3 Ω</strong>
                        </p>
                      </div>

                      {/* Card 4: Two Series in Parallel with One */}
                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">4. (2 + 2) in Parallel with 2</span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                            Equivalent: 4/3 Ω (1.33 Ω)
                          </span>
                        </div>
                        <div className="py-2 px-3 bg-slate-950 rounded-lg border border-slate-800/80 font-mono text-xs text-slate-200 flex flex-col items-center justify-center gap-1">
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-slate-400">┌─</span>
                            <span className="px-1 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                            <span className="text-slate-400">─</span>
                            <span className="px-1 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                            <span className="text-slate-400">─┐ (4 Ω)</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px]">
                            <span className="text-slate-400">└───</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-white font-bold">2 Ω</span>
                            <span className="text-slate-400">───┘ (2 Ω)</span>
                          </div>
                        </div>
                        <p className="text-[11px] font-mono text-slate-400">
                          R_eq = (4 × 2) / (4 + 2) = 8 / 6 = <strong className="text-white">4/3 Ω ≈ 1.33 Ω</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Multiple Choice Options (if available for Q1, Q2, Q3, Q4) */}
                {prob.options && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {prob.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono font-bold text-slate-300"
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interactive Try-Yourself Box & Reveal Button */}
              <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <label className="text-xs text-slate-400 block mb-1">
                    ✍️ <strong>Your Practice Answer / Notes:</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Calculate and enter your answer here (e.g. 25 Ω or 4 A)..."
                    value={userInputs[prob.id] || ''}
                    onChange={(e) => handleInputChange(prob.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => toggleAnswer(prob.id)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap self-end sm:self-auto shadow-xs ${
                    isAnswerShown
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                      : 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-black'
                  }`}
                >
                  {isAnswerShown ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Hide Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>View Simple Solution</span>
                    </>
                  )}
                </button>
              </div>

              {/* HIDDEN SIMPLE SOLUTION (Rendered only when revealed) */}
              {isAnswerShown && (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border-2 border-amber-400/40 space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Simple Step-by-Step Solution
                    </span>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
                      Verified Board Format
                    </span>
                  </div>

                  {/* 1. Given Data */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      1. Given Data:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono">
                      {prob.given.map((g, i) => (
                        <div key={i} className="flex justify-between items-center py-0.5">
                          <span className="text-slate-400">{g.label}:</span>
                          <span className="text-amber-300 font-bold">{g.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Formula */}
                  <div>
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      2. Formula Used:
                    </span>
                    <div className="py-2.5 px-3.5 bg-slate-900 rounded-xl border-2 border-amber-400/40 text-amber-300 font-mono font-extrabold text-sm sm:text-base tracking-wide shadow-xs">
                      {prob.formula}
                    </div>
                  </div>

                  {/* 3. Substitution */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      3. Value Substitution:
                    </span>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300 font-mono text-xs">
                      {prob.substitution}
                    </div>
                  </div>

                  {/* 4. Simple Calculation */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      4. Calculation Steps:
                    </span>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-xs font-mono text-slate-200">
                      {prob.calculation.map((step, i) => (
                        <div key={i} className="leading-relaxed">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5. Final Answer Box */}
                  <div className="p-4 bg-emerald-950/40 border-2 border-emerald-500/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        5. Final Answer:
                      </span>
                      <span className="text-base sm:text-lg font-mono font-black text-white">
                        {prob.finalAnswer}
                      </span>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        6. Unit:
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-900/60 px-2.5 py-1 rounded-lg border border-emerald-500/40 inline-block">
                        {prob.unit}
                      </span>
                    </div>
                  </div>

                  {/* Explanation Tip */}
                  {prob.explanationTip && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed">
                      💡 <strong>Board Exam Tip:</strong> {prob.explanationTip}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredProblems.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No Matching Problems Found</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or select "All 18 Problems".
            </p>
            <button
              onClick={() => {
                setLevelFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold bg-amber-400 text-slate-950 rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
