import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  CheckCircle2,
  Calculator,
  Zap,
  Sparkles,
  RotateCcw,
  Check,
  Flame,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Sliders,
  Award,
  Clock,
  BatteryCharging,
  Split,
  FileText
} from 'lucide-react';

export const WhatsAppAssignmentProblemsSection: React.FC = () => {
  // State for toggling individual hidden answers
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({
    q1: false,
    q2_req: false,
    q2_current: false,
    q2_branch: false,
    q2_heat: false,
    q2_each_heat: false,
    q2_compare: false
  });

  // Active question filter tab
  const [activeTab, setActiveTab] = useState<'all' | 'p1' | 'p2' | 'interactive'>('all');

  // Interactive Live Circuit Sandbox State
  const [sandboxVoltage, setSandboxVoltage] = useState<number>(6); // Volts (default 6V from WhatsApp image)
  const [sandboxTime, setSandboxTime] = useState<number>(5); // seconds (default 5s from WhatsApp image)
  const [sandboxR1, setSandboxR1] = useState<number>(8); // Ω
  const [sandboxR2, setSandboxR2] = useState<number>(8); // Ω
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);

  // Student test input state
  const [studentInputs, setStudentInputs] = useState<Record<string, string>>({
    req: '',
    current: '',
    heat: ''
  });
  const [checkedResults, setCheckedResults] = useState<Record<string, boolean | null>>({
    req: null,
    current: null,
    heat: null
  });

  // Calculate live values for sandbox
  const liveReq = (sandboxR1 * sandboxR2) / (sandboxR1 + sandboxR2);
  const liveTotalCurrent = isKeyClosed ? sandboxVoltage / liveReq : 0;
  const liveCurrent1 = isKeyClosed ? sandboxVoltage / sandboxR1 : 0;
  const liveCurrent2 = isKeyClosed ? sandboxVoltage / sandboxR2 : 0;
  const liveTotalHeat = isKeyClosed ? (Math.pow(sandboxVoltage, 2) / liveReq) * sandboxTime : 0;
  const liveHeat1 = isKeyClosed ? (Math.pow(sandboxVoltage, 2) / sandboxR1) * sandboxTime : 0;
  const liveHeat2 = isKeyClosed ? (Math.pow(sandboxVoltage, 2) / sandboxR2) * sandboxTime : 0;

  // Toggle answer helper
  const toggleAnswer = (key: string) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const revealAllAnswers = () => {
    setRevealedAnswers({
      q1: true,
      q2_req: true,
      q2_current: true,
      q2_branch: true,
      q2_heat: true,
      q2_each_heat: true,
      q2_compare: true
    });
  };

  const hideAllAnswers = () => {
    setRevealedAnswers({
      q1: false,
      q2_req: false,
      q2_current: false,
      q2_branch: false,
      q2_heat: false,
      q2_each_heat: false,
      q2_compare: false
    });
  };

  const checkStudentInput = (field: 'req' | 'current' | 'heat') => {
    const val = parseFloat(studentInputs[field]);
    if (isNaN(val)) return;

    if (field === 'req') {
      setCheckedResults((prev) => ({ ...prev, req: Math.abs(val - 4.0) < 0.05 }));
    } else if (field === 'current') {
      setCheckedResults((prev) => ({ ...prev, current: Math.abs(val - 1.5) < 0.05 }));
    } else if (field === 'heat') {
      setCheckedResults((prev) => ({ ...prev, heat: Math.abs(val - 45.0) < 0.5 }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner - WhatsApp Assignment Upload Section */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Classroom WhatsApp Assignment Upload</span>
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/70 border border-amber-500/30 px-3 py-1 rounded-full flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Joule&apos;s Heating &amp; Parallel Combination</span>
              </span>
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-full">
                AP SSC Public Exam Special
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>WhatsApp Assignment Problems: Parallel 8 Ω Resistors &amp; Heat Dissipated</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
              Neat schematic circuit diagrams, step-by-step formula derivations, and toggleable hidden answers for the handwritten assignment problems directly uploaded from WhatsApp (Two 8 Ω resistors in parallel, 6 V battery / cells, current division, and 45 J heat generated in 5 seconds).
            </p>
          </div>

          {/* Quick Reveal / Hide All Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={revealAllAnswers}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-950" />
              <span>Show All Answers</span>
            </button>
            <button
              type="button"
              onClick={hideAllAnswers}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
            >
              <EyeOff className="w-4 h-4 text-slate-400" />
              <span>Hide All</span>
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/80 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            📋 All Problems
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('p1')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'p1'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            🔌 Problem 1: Equivalent Resistance of Parallel 8 Ω Resistors
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('p2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'p2'
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            🔥 Problem 2: Current &amp; Heat Dissipated in 5s (45 J)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'interactive'
                ? 'bg-purple-500 text-white font-black shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            🧪 Live Interactive Sandbox (6V vs 4V)
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PROBLEM 1: EQUIVALENT RESISTANCE OF TWO 8 OHM RESISTORS  */}
      {/* ======================================================== */}
      {(activeTab === 'all' || activeTab === 'p1') && (
        <div className="bg-slate-900/90 border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-7 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-black uppercase">
                  Problem 1 (From WhatsApp Upload)
                </span>
                <span className="text-xs text-slate-400">Class 10 SSC Core Numerical</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Two resistors each of resistance 8 Ω are connected in parallel. Calculate the equivalent resistance of the combination.
              </h3>
            </div>

            <button
              type="button"
              onClick={() => toggleAnswer('q1')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                revealedAnswers.q1
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                  : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/40'
              }`}
            >
              {revealedAnswers.q1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{revealedAnswers.q1 ? 'Hide Solution' : 'Show Hidden Answer'}</span>
            </button>
          </div>

          {/* NEAT SCHEMATIC DIAGRAM FOR PROBLEM 1 */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Neat Circuit Schematic: Parallel Combination of Two 8 Ω Resistors</span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Formula: 1/R_p = 1/R₁ + 1/R₂
              </span>
            </div>

            {/* SVG Circuit Diagram */}
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <svg
                viewBox="0 0 680 240"
                className="w-full max-w-2xl h-auto"
                style={{ minWidth: '460px' }}
              >
                {/* Background grid dots for clean engineering look */}
                <pattern id="grid-dots-p1" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.4" />
                </pattern>
                <rect width="680" height="240" fill="url(#grid-dots-p1)" rx="12" />

                {/* Left Terminal A */}
                <circle cx="50" cy="120" r="7" fill="#06b6d4" />
                <circle cx="50" cy="120" r="3" fill="#ffffff" />
                <text x="50" y="100" fill="#06b6d4" fontSize="16" fontWeight="bold" textAnchor="middle">
                  Terminal A
                </text>

                {/* Main wire from A to Left Junction */}
                <line x1="57" y1="120" x2="160" y2="120" stroke="#06b6d4" strokeWidth="3.5" />
                {/* Arrow for total current */}
                <polygon points="120,115 132,120 120,125" fill="#38bdf8" />
                <text x="125" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Total I
                </text>

                {/* Left Junction Node */}
                <circle cx="160" cy="120" r="6" fill="#e2e8f0" />
                <text x="155" y="145" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="end">
                  Junction J₁
                </text>

                {/* Vertical split to Top and Bottom Branches */}
                <line x1="160" y1="60" x2="160" y2="180" stroke="#06b6d4" strokeWidth="3" />

                {/* TOP BRANCH: Resistor R1 = 8 Ω */}
                <line x1="160" y1="60" x2="250" y2="60" stroke="#06b6d4" strokeWidth="3" />
                <polygon points="215,55 225,60 215,65" fill="#38bdf8" />
                <text x="215" y="48" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  I₁
                </text>

                {/* Top Zig-Zag Resistor R1 */}
                <path
                  d="M 250,60 L 265,42 L 280,78 L 295,42 L 310,78 L 325,42 L 340,78 L 355,42 L 370,60 L 440,60"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <rect x="270" y="86" width="110" height="24" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="325" y="102" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">
                  R₁ = 8 Ω
                </text>

                {/* BOTTOM BRANCH: Resistor R2 = 8 Ω */}
                <line x1="160" y1="180" x2="250" y2="180" stroke="#06b6d4" strokeWidth="3" />
                <polygon points="215,175 225,180 215,185" fill="#38bdf8" />
                <text x="215" y="168" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  I₂
                </text>

                {/* Bottom Zig-Zag Resistor R2 */}
                <path
                  d="M 250,180 L 265,162 L 280,198 L 295,162 L 310,198 L 325,162 L 340,198 L 355,162 L 370,180 L 440,180"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <rect x="270" y="206" width="110" height="24" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="325" y="222" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">
                  R₂ = 8 Ω
                </text>

                {/* Rejoining at Right Junction */}
                <line x1="440" y1="60" x2="440" y2="180" stroke="#06b6d4" strokeWidth="3" />
                <circle cx="440" cy="120" r="6" fill="#e2e8f0" />
                <text x="445" y="145" fill="#94a3b8" fontSize="12" fontWeight="bold">
                  Junction J₂
                </text>

                {/* Main wire to Terminal B */}
                <line x1="440" y1="120" x2="570" y2="120" stroke="#06b6d4" strokeWidth="3.5" />
                <polygon points="505,115 517,120 505,125" fill="#38bdf8" />
                <text x="510" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Total I
                </text>

                {/* Right Terminal B */}
                <circle cx="570" cy="120" r="7" fill="#06b6d4" />
                <circle cx="570" cy="120" r="3" fill="#ffffff" />
                <text x="570" y="100" fill="#06b6d4" fontSize="16" fontWeight="bold" textAnchor="middle">
                  Terminal B
                </text>

                {/* Result Callout Badge in Diagram */}
                <rect x="530" y="15" width="135" height="42" rx="8" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                <text x="597" y="32" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">
                  EQUIVALENT RESISTANCE
                </text>
                <text x="597" y="49" fill="#22c55e" fontSize="15" fontWeight="black" textAnchor="middle">
                  R_eq = 4 Ω
                </text>
              </svg>
            </div>
          </div>

          {/* HIDDEN SOLUTION / REVEALABLE CONTENT */}
          {revealedAnswers.q1 ? (
            <div className="bg-emerald-950/30 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Complete Step-by-Step Solution &amp; Board Verification</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-amber-300 block">Method 1: Standard Reciprocal Formula</span>
                  <div className="font-mono text-slate-200 space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <p>1 / R_p = 1 / R₁ + 1 / R₂</p>
                    <p>1 / R_p = 1/8 + 1/8</p>
                    <p>1 / R_p = (1 + 1) / 8 = 2/8 = 1/4 Ω⁻¹</p>
                    <p className="text-emerald-400 font-bold">⇒ R_p = 4 Ω</p>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Taking the reciprocal of 1/4 gives the equivalent resistance R_p = 4 Ω.
                  </p>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-cyan-300 block">Method 2: Product over Sum Formula</span>
                  <div className="font-mono text-slate-200 space-y-1.5 bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <p>R_p = (R₁ × R₂) / (R₁ + R₂)</p>
                    <p>R_p = (8 × 8) / (8 + 8)</p>
                    <p>R_p = 64 / 16</p>
                    <p className="text-cyan-400 font-bold">⇒ R_p = 4 Ω</p>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Shortcut formula for two parallel resistors: (Product) / (Sum).
                  </p>
                </div>
              </div>

              {/* Key Concept Takeaway */}
              <div className="bg-slate-900/90 border border-emerald-500/30 p-3 rounded-xl flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-300">Class 10 Board Golden Rule:</strong> When <em>n</em> identical resistors of resistance <em>R</em> are connected in parallel, equivalent resistance is always <code className="text-amber-300">R_eq = R / n</code>. Here, R = 8 Ω and n = 2, so <code className="text-emerald-300">R_eq = 8 / 2 = 4 Ω</code>. The equivalent resistance is less than each individual branch resistor (4 Ω &lt; 8 Ω)!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950/60 border border-dashed border-slate-800 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Try calculating the equivalent resistance yourself first, then click &quot;Show Hidden Answer&quot; above!</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* PROBLEM 2: CURRENT & HEAT DISSIPATED (45 J IN 5 SECONDS) */}
      {/* ======================================================== */}
      {(activeTab === 'all' || activeTab === 'p2') && (
        <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 space-y-7 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Problem 2 (WhatsApp Handwritten Core Problem)</span>
                </span>
                <span className="text-xs text-slate-400">Joule&apos;s Heating Effect Numerical</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Two resistors of 8 Ω each are connected in parallel across a 6 V battery. Calculate:
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                (i) Equivalent resistance, (ii) Total circuit current, (iii) Current in each resistor, and (iv) Heat energy dissipated in 5 seconds.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const state = !revealedAnswers.q2_heat;
                  setRevealedAnswers((prev) => ({
                    ...prev,
                    q2_req: state,
                    q2_current: state,
                    q2_branch: state,
                    q2_heat: state,
                    q2_each_heat: state,
                    q2_compare: state
                  }));
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  revealedAnswers.q2_heat
                    ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border border-amber-500/40'
                }`}
              >
                {revealedAnswers.q2_heat ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{revealedAnswers.q2_heat ? 'Hide Full Solution' : 'Reveal Full Solution'}</span>
              </button>
            </div>
          </div>

          {/* NEAT ACTIVE SCHEMATIC CIRCUIT DIAGRAM WITH BATTERY & TIME */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-amber-400" />
                <span>Neat Complete Circuit Schematic: Parallel Resistors with 6V Battery &amp; Switch</span>
              </span>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-amber-500/30 text-amber-300 font-bold">
                  V = 6 V
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold">
                  t = 5 s
                </span>
                <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300 font-bold">
                  H = 45 J
                </span>
              </div>
            </div>

            {/* Circuit Diagram SVG */}
            <div className="w-full overflow-x-auto flex justify-center py-2">
              <svg
                viewBox="0 0 740 320"
                className="w-full max-w-3xl h-auto"
                style={{ minWidth: '520px' }}
              >
                {/* Background Pattern */}
                <pattern id="grid-dots-p2" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35" />
                </pattern>
                <rect width="740" height="320" fill="url(#grid-dots-p2)" rx="14" />

                {/* ================= TOP BRANCH: PARALLEL NETWORK ================= */}
                {/* Left wire to parallel junction */}
                <line x1="80" y1="80" x2="200" y2="80" stroke="#f59e0b" strokeWidth="3.5" />
                {/* Current arrow */}
                <polygon points="140,75 152,80 140,85" fill="#f59e0b" />
                <text x="146" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                  I = 1.5 A
                </text>

                {/* Left Junction Node */}
                <circle cx="200" cy="80" r="6" fill="#f8fafc" />
                <text x="195" y="105" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="end">
                  J₁
                </text>

                {/* Top/Bottom Split */}
                <line x1="200" y1="40" x2="200" y2="120" stroke="#f59e0b" strokeWidth="3" />

                {/* BRANCH 1: Top Resistor R1 = 8 Ω */}
                <line x1="200" y1="40" x2="270" y2="40" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="235,35 245,40 235,45" fill="#38bdf8" />
                <text x="240" y="28" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  I₁ = 0.75 A
                </text>
                {/* Zigzag Resistor 1 */}
                <path
                  d="M 270,40 L 285,25 L 300,55 L 315,25 L 330,55 L 345,25 L 360,55 L 375,25 L 390,40 L 460,40"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <rect x="300" y="60" width="100" height="22" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="350" y="75" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  R₁ = 8 Ω (V₁ = 6V)
                </text>

                {/* BRANCH 2: Bottom Resistor R2 = 8 Ω */}
                <line x1="200" y1="120" x2="270" y2="120" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="235,115 245,120 235,125" fill="#38bdf8" />
                <text x="240" y="108" fill="#38bdf8" fontSize="11" fontWeight="bold">
                  I₂ = 0.75 A
                </text>
                {/* Zigzag Resistor 2 */}
                <path
                  d="M 270,120 L 285,105 L 300,135 L 315,105 L 330,135 L 345,105 L 360,135 L 375,105 L 390,120 L 460,120"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                />
                <rect x="300" y="140" width="100" height="22" rx="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="350" y="155" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                  R₂ = 8 Ω (V₂ = 6V)
                </text>

                {/* Right Junction Node */}
                <line x1="460" y1="40" x2="460" y2="120" stroke="#f59e0b" strokeWidth="3" />
                <circle cx="460" cy="80" r="6" fill="#f8fafc" />
                <text x="465" y="105" fill="#94a3b8" fontSize="11" fontWeight="bold">
                  J₂
                </text>

                {/* Wire from right junction towards right corner */}
                <line x1="460" y1="80" x2="660" y2="80" stroke="#f59e0b" strokeWidth="3.5" />
                <polygon points="560,75 572,80 560,85" fill="#f59e0b" />
                <text x="566" y="65" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                  I = 1.5 A
                </text>

                {/* Equivalent Resistance Callout */}
                <rect x="495" y="98" width="145" height="30" rx="6" fill="#1e1e2e" stroke="#22c55e" strokeWidth="1.5" />
                <text x="567" y="118" fill="#86efac" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Parallel R_eq = 4 Ω
                </text>

                {/* ================= VERTICAL CORNERS ================= */}
                {/* Left vertical wire */}
                <line x1="80" y1="80" x2="80" y2="240" stroke="#f59e0b" strokeWidth="3.5" />
                {/* Right vertical wire */}
                <line x1="660" y1="80" x2="660" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* ================= BOTTOM WIRE: BATTERY & SWITCH ================= */}
                {/* Left bottom wire to Ammeter */}
                <line x1="80" y1="240" x2="160" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* Ammeter circle (A) */}
                <circle cx="190" cy="240" r="20" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
                <text x="190" y="246" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
                  A
                </text>
                <text x="190" y="275" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Ammeter (1.5 A)
                </text>
                <line x1="210" y1="240" x2="270" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* BATTERY (6V) - Drawn with long and short parallel plates */}
                {/* Cell 1 */}
                <line x1="270" y1="220" x2="270" y2="260" stroke="#22c55e" strokeWidth="4" /> {/* Long positive */}
                <line x1="285" y1="228" x2="285" y2="252" stroke="#ef4444" strokeWidth="5" /> {/* Short negative */}
                <line x1="285" y1="240" x2="300" y2="240" stroke="#f59e0b" strokeWidth="2.5" />
                {/* Cell 2 */}
                <line x1="300" y1="220" x2="300" y2="260" stroke="#22c55e" strokeWidth="4" />
                <line x1="315" y1="228" x2="315" y2="252" stroke="#ef4444" strokeWidth="5" />
                <line x1="315" y1="240" x2="330" y2="240" stroke="#f59e0b" strokeWidth="2.5" />
                {/* Cell 3 */}
                <line x1="330" y1="220" x2="330" y2="260" stroke="#22c55e" strokeWidth="4" />
                <line x1="345" y1="228" x2="345" y2="252" stroke="#ef4444" strokeWidth="5" />

                {/* Battery Label */}
                <text x="310" y="208" fill="#facc15" fontSize="14" fontWeight="black" textAnchor="middle">
                  + 6 V Battery −
                </text>
                <text x="260" y="212" fill="#22c55e" fontSize="14" fontWeight="bold">
                  +
                </text>
                <text x="355" y="212" fill="#ef4444" fontSize="14" fontWeight="bold">
                  −
                </text>

                {/* Wire to Key */}
                <line x1="345" y1="240" x2="440" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* Plug Key (Closed) */}
                <circle cx="455" cy="240" r="14" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="455" cy="240" r="4" fill="#22c55e" /> {/* Dot representing plug inserted */}
                <text x="455" y="272" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Plug Key (Closed)
                </text>

                {/* Wire to Stopwatch/Time Indicator */}
                <line x1="470" y1="240" x2="550" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* Time Indicator Badge */}
                <rect x="550" y="222" width="80" height="36" rx="8" fill="#1e293b" stroke="#eab308" strokeWidth="1.5" />
                <text x="590" y="237" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
                  TIME DURATION
                </text>
                <text x="590" y="251" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">
                  t = 5 s
                </text>

                <line x1="630" y1="240" x2="660" y2="240" stroke="#f59e0b" strokeWidth="3.5" />

                {/* FINAL HEAT DISSIPATION CALLOUT BOX */}
                <rect x="15" y="15" width="150" height="50" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                <text x="90" y="33" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                  HEAT DISSIPATED
                </text>
                <text x="90" y="54" fill="#f87171" fontSize="17" fontWeight="black" textAnchor="middle">
                  H = 45 Joules
                </text>
              </svg>
            </div>
          </div>

          {/* QUESTIONS BREAKDOWN WITH ACCORDIONS & HIDDEN ANSWERS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Step-by-Step Questions &amp; Derivations (Click to Toggle Answers)</span>
            </h4>

            {/* PART 1: Equivalent Resistance */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_req')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                    1
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      (i) What is the equivalent resistance of the two 8 Ω parallel resistors?
                    </h5>
                    <p className="text-xs text-slate-400">Formula: 1/R_eq = 1/R₁ + 1/R₂</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
                    {revealedAnswers.q2_req ? 'R_eq = 4 Ω' : 'Show Answer'}
                  </span>
                  {revealedAnswers.q2_req ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_req && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1">
                    <p>1 / R_eq = 1/R₁ + 1/R₂</p>
                    <p>1 / R_eq = 1/8 + 1/8 = 2/8 = 1/4 Ω⁻¹</p>
                    <p className="text-emerald-400 font-bold text-sm">⇒ R_eq = 4 Ω</p>
                  </div>
                  <p className="text-slate-300">
                    <strong>Explanation:</strong> Both 8 Ω resistors are connected in parallel. The combined equivalent resistance is 4 Ω, which is half of 8 Ω because the current has two equal paths.
                  </p>
                </div>
              )}
            </div>

            {/* PART 2: Total Circuit Current */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_current')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                    2
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      (ii) What is the total electric current (I) drawn from the 6 V battery?
                    </h5>
                    <p className="text-xs text-slate-400">Formula: I = V / R_eq (Ohm&apos;s Law)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30">
                    {revealedAnswers.q2_current ? 'I = 1.5 A' : 'Show Answer'}
                  </span>
                  {revealedAnswers.q2_current ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_current && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1">
                    <p>Given: Battery Voltage V = 6 V</p>
                    <p>Total Equivalent Resistance R_eq = 4 Ω</p>
                    <p>According to Ohm&apos;s Law: I = V / R_eq</p>
                    <p>I = 6 V / 4 Ω = 1.5 Amperes (A)</p>
                    <p className="text-amber-400 font-bold text-sm">⇒ Total Current I = 1.5 A</p>
                  </div>
                  <p className="text-slate-300">
                    <strong>Ammeter Reading:</strong> The ammeter placed in the main line records exactly <strong>1.5 A</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* PART 3: Current in Each Resistor */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_branch')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-500/30">
                    3
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      (iii) What is the current flowing through EACH of the 8 Ω resistors?
                    </h5>
                    <p className="text-xs text-slate-400">Parallel rule: Voltage is constant across all branches</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-sky-400 px-2.5 py-1 rounded-md bg-sky-950/60 border border-sky-500/30">
                    {revealedAnswers.q2_branch ? 'I₁ = I₂ = 0.75 A' : 'Show Answer'}
                  </span>
                  {revealedAnswers.q2_branch ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_branch && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1">
                    <p>In a parallel circuit, potential difference across each branch equals the source voltage:</p>
                    <p>V₁ = V₂ = V = 6 V</p>
                    <p>Current in Branch 1: I₁ = V / R₁ = 6 V / 8 Ω = 0.75 A</p>
                    <p>Current in Branch 2: I₂ = V / R₂ = 6 V / 8 Ω = 0.75 A</p>
                    <p className="text-sky-400 font-bold text-sm">⇒ I₁ = 0.75 A,  I₂ = 0.75 A</p>
                    <p className="text-emerald-400">Verification: I₁ + I₂ = 0.75 + 0.75 = 1.5 A (Total Current ✓)</p>
                  </div>
                  <p className="text-slate-300">
                    <strong>Kirchhoff&apos;s Current Law Check:</strong> Since the resistances in both branches are identical (8 Ω and 8 Ω), the incoming total current of 1.5 A divides equally into two equal streams of 0.75 A each!
                  </p>
                </div>
              )}
            </div>

            {/* PART 4: Heat Energy Dissipated in 5 Seconds (45 J) - CORE RESULT */}
            <div className="bg-slate-950/80 border-2 border-red-500/40 rounded-2xl overflow-hidden transition-all shadow-md">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_heat')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-red-500/20 text-red-300 font-bold text-xs flex items-center justify-center shrink-0 border border-red-500/30">
                    4
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>(iv) Calculate the total heat energy dissipated in the circuit in 5 seconds.</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase">
                        Core Board Question
                      </span>
                    </h5>
                    <p className="text-xs text-slate-400">Joule&apos;s Law of Heating: H = (V²/R)·t = V·I·t = I²·R·t</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-400 px-2.5 py-1 rounded-md bg-red-950/60 border border-red-500/30">
                    {revealedAnswers.q2_heat ? 'H = 45 Joules' : 'Show Answer'}
                  </span>
                  {revealedAnswers.q2_heat ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_heat && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-3">
                  <p className="text-slate-300">
                    Here are all three standard textbook methods proving the exact same answer of <strong>45 Joules</strong>:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Method 1: H = (V²/R)·t */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="font-bold text-red-300 text-xs block">Method A: Using V, R_eq, t</span>
                      <div className="font-mono text-slate-200 text-xs space-y-1 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <p>H = (V² / R_eq) × t</p>
                        <p>H = (6² / 4) × 5</p>
                        <p>H = (36 / 4) × 5</p>
                        <p>H = 9 × 5</p>
                        <p className="text-red-400 font-bold text-sm">H = 45 Joules (J)</p>
                      </div>
                    </div>

                    {/* Method 2: H = V·I·t */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="font-bold text-amber-300 text-xs block">Method B: Using V, I, t</span>
                      <div className="font-mono text-slate-200 text-xs space-y-1 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <p>H = V × I × t</p>
                        <p>H = 6 V × 1.5 A × 5 s</p>
                        <p>H = 9 W × 5 s</p>
                        <p className="text-amber-400 font-bold text-sm">H = 45 Joules (J)</p>
                      </div>
                    </div>

                    {/* Method 3: H = I²·R·t */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <span className="font-bold text-emerald-300 text-xs block">Method C: Using I, R_eq, t</span>
                      <div className="font-mono text-slate-200 text-xs space-y-1 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                        <p>H = I² × R_eq × t</p>
                        <p>H = (1.5)² × 4 × 5</p>
                        <p>H = 2.25 × 20</p>
                        <p className="text-emerald-400 font-bold text-sm">H = 45 Joules (J)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-950/40 border border-red-500/30 p-3 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
                    <p className="text-xs text-red-200">
                      <strong>Final Statement:</strong> The total electrical heat energy dissipated in the circuit during 5 seconds is exactly <strong>45 Joules (J)</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PART 5: Heat in Each Individual Resistor */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_each_heat')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 border border-purple-500/30">
                    5
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white">
                      (v) How much heat energy is dissipated in EACH individual 8 Ω resistor?
                    </h5>
                    <p className="text-xs text-slate-400">H₁ and H₂ in each resistor in 5 seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-purple-400 px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/30">
                    {revealedAnswers.q2_each_heat ? 'H₁ = H₂ = 22.5 J' : 'Show Answer'}
                  </span>
                  {revealedAnswers.q2_each_heat ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_each_heat && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1">
                    <p>Heat produced in Resistor 1 (R₁ = 8 Ω):</p>
                    <p>H₁ = (V² / R₁) × t = (6² / 8) × 5 = (36 / 8) × 5 = 4.5 × 5 = 22.5 Joules</p>
                    <p className="pt-1">Heat produced in Resistor 2 (R₂ = 8 Ω):</p>
                    <p>H₂ = (V² / R₂) × t = (6² / 8) × 5 = 22.5 Joules</p>
                    <p className="text-purple-400 font-bold text-sm">⇒ Total Heat H = H₁ + H₂ = 22.5 J + 22.5 J = 45 Joules ✓</p>
                  </div>
                  <p className="text-slate-300">
                    <strong>Principle of Conservation of Energy:</strong> The sum of the heat produced in both individual branches (22.5 J + 22.5 J) is equal to the total heat produced by the circuit (45 J).
                  </p>
                </div>
              )}
            </div>

            {/* PART 6: TEACHER'S NOTE - 4V VARIANT (20 JOULES) */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => toggleAnswer('q2_compare')}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-500/30">
                    6
                  </span>
                  <div>
                    <h5 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>(vi) Classroom Note: What if battery voltage was 4 V (or 2 cells)?</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                        Blackboard Variant
                      </span>
                    </h5>
                    <p className="text-xs text-slate-400">Comparing 4 V (H = 20 J) vs 6 V (H = 45 J)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/30">
                    {revealedAnswers.q2_compare ? 'H = 20 Joules' : 'Show Variant'}
                  </span>
                  {revealedAnswers.q2_compare ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </button>

              {revealedAnswers.q2_compare && (
                <div className="p-4 pt-1 border-t border-slate-800/80 bg-slate-900/40 text-xs sm:text-sm space-y-2">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1">
                    <p>If the battery contains 2 cells producing V = 4 V:</p>
                    <p>1. Current: I = V / R_eq = 4 V / 4 Ω = 1.0 A</p>
                    <p>2. Heat generated in 5 seconds:</p>
                    <p>H = (V² / R_eq) × t = (4² / 4) × 5 = (16 / 4) × 5 = 4 × 5 = 20 Joules</p>
                    <p className="text-blue-400 font-bold text-sm">⇒ Heat H = 20 Joules (for 4 V source)</p>
                  </div>
                  <p className="text-slate-300">
                    <strong>Note:</strong> Some state board textbooks print a 4 V source (giving 20 J), while standard AP SSC exam question sets use a 6 V source (giving 45 J). Both calculations are given here so you can verify either variation!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERACTIVE LIVE SANDBOX & SELF-TEST SECTION             */}
      {/* ======================================================== */}
      {(activeTab === 'all' || activeTab === 'interactive') && (
        <div className="bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-black uppercase flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-purple-400" />
                  <span>Interactive Testing &amp; Live Calculator</span>
                </span>
                <span className="text-xs text-slate-400">Dynamic Joule Heating Simulator</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Live Parameter Simulator: Change Voltage &amp; Time to observe Heat &amp; Current
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsKeyClosed(!isKeyClosed)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isKeyClosed
                  ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                  : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
              }`}
            >
              <span>{isKeyClosed ? '⚡ Switch: CLOSED (Current ON)' : '🔌 Switch: OPEN (Current OFF)'}</span>
            </button>
          </div>

          {/* Controls Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            {/* Voltage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Battery Voltage (V)</span>
                <span className="text-amber-400 font-mono">{sandboxVoltage} Volts</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={sandboxVoltage}
                onChange={(e) => setSandboxVoltage(parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>2V</span>
                <span className="text-amber-400 font-bold">4V (20J)</span>
                <span className="text-amber-400 font-bold">6V (45J)</span>
                <span>12V (180J)</span>
              </div>
            </div>

            {/* Time Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Time Duration (t)</span>
                <span className="text-cyan-400 font-mono">{sandboxTime} Seconds</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={sandboxTime}
                onChange={(e) => setSandboxTime(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1s</span>
                <span className="text-cyan-400 font-bold">5s (WhatsApp)</span>
                <span>10s</span>
                <span>20s</span>
              </div>
            </div>

            {/* Quick Reset to WhatsApp Problem Defaults */}
            <div className="flex flex-col justify-end">
              <button
                type="button"
                onClick={() => {
                  setSandboxVoltage(6);
                  setSandboxTime(5);
                  setSandboxR1(8);
                  setSandboxR2(8);
                  setIsKeyClosed(true);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to WhatsApp Problem (6V, 5s, 8Ω)</span>
              </button>
            </div>
          </div>

          {/* Live Telemetry Display Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Equivalent Resistance
              </span>
              <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">
                {liveReq.toFixed(1)} Ω
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">R_eq = (8 ∥ 8)</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Current (I)
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
                {liveTotalCurrent.toFixed(2)} A
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">Branch: {liveCurrent1.toFixed(2)} A each</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Electric Power (P)
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                {(isKeyClosed ? Math.pow(sandboxVoltage, 2) / liveReq : 0).toFixed(1)} W
              </span>
              <span className="text-[10px] text-slate-400 block font-mono">P = V² / R_eq</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border-2 border-red-500/40 text-center space-y-1">
              <span className="text-[11px] font-bold text-red-300 uppercase tracking-wider block">
                Total Heat Energy (H)
              </span>
              <span className="text-xl sm:text-2xl font-black text-red-400 font-mono">
                {liveTotalHeat.toFixed(1)} J
              </span>
              <span className="text-[10px] text-red-300/80 block font-mono">H = P × t</span>
            </div>
          </div>

          {/* Student Practice Input Tester */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Self-Test: Enter your calculated answers for the WhatsApp Assignment (6V, 5s)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* R_eq Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">
                  1. Equivalent Resistance (Ω):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 4"
                    value={studentInputs.req}
                    onChange={(e) => setStudentInputs({ ...studentInputs, req: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => checkStudentInput('req')}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                {checkedResults.req === true && (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct! R_eq = 4 Ω
                  </span>
                )}
                {checkedResults.req === false && (
                  <span className="text-[11px] text-red-400 font-bold">
                    Incorrect. Remember: 1/8 + 1/8 = 2/8 = 1/4 ⇒ 4 Ω.
                  </span>
                )}
              </div>

              {/* Current Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">
                  2. Total Current I (A):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 1.5"
                    value={studentInputs.current}
                    onChange={(e) => setStudentInputs({ ...studentInputs, current: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => checkStudentInput('current')}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                {checkedResults.current === true && (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct! I = 6/4 = 1.5 A
                  </span>
                )}
                {checkedResults.current === false && (
                  <span className="text-[11px] text-red-400 font-bold">
                    Incorrect. I = V / R_eq = 6 / 4 = 1.5 A.
                  </span>
                )}
              </div>

              {/* Heat Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium block">
                  3. Heat Dissipated in 5s (J):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 45"
                    value={studentInputs.heat}
                    onChange={(e) => setStudentInputs({ ...studentInputs, heat: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:border-red-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => checkStudentInput('heat')}
                    className="px-3 py-1.5 bg-red-500 hover:bg-red-400 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Check
                  </button>
                </div>
                {checkedResults.heat === true && (
                  <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Correct! H = 45 Joules
                  </span>
                )}
                {checkedResults.heat === false && (
                  <span className="text-[11px] text-red-400 font-bold">
                    Incorrect. H = (6² / 4) × 5 = 9 × 5 = 45 J.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
