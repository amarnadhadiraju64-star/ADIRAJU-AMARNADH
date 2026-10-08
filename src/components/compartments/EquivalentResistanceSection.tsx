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
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export interface EquivalentResistanceSectionProps {
  sourceCompartment?: 'project-work' | 'assignment';
}

export const EquivalentResistanceSection: React.FC<EquivalentResistanceSectionProps> = ({
  sourceCompartment = 'project-work'
}) => {
  // State for toggling hidden solutions for individual problems
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({
    a: false,
    b: false,
    c: false,
    d: false
  });

  // User input answers for practice mode
  const [userInputs, setUserInputs] = useState<Record<string, string>>({
    a: '',
    b: '',
    c: '',
    d: ''
  });

  const [activeTab, setActiveTab] = useState<'all' | 'a' | 'b' | 'c' | 'd'>('all');

  const toggleSolution = (caseKey: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [caseKey]: !prev[caseKey]
    }));
  };

  const revealAll = () => {
    setRevealedSolutions({
      a: true,
      b: true,
      c: true,
      d: true
    });
  };

  const hideAll = () => {
    setRevealedSolutions({
      a: false,
      b: false,
      c: false,
      d: false
    });
  };

  // Helper to render realistic resistor zig-zag inside SVG
  // Can be rendered horizontally, vertically, or diagonally
  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-7 space-y-6 text-white shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider mb-1">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{sourceCompartment === 'project-work' ? 'Project Work Compartment' : 'Assignment Compartment'}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-cyan-400 font-bold">AP SSC Public Exam Special</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Find the Equivalent Resistance between A and B (Cases a, b, c, d)</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-relaxed">
            Standard Board &amp; Sarthaks Physics network problems with neat electrical schematic diagrams and toggleable hidden solutions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={revealAll}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-950" />
            <span>Show All Answers</span>
          </button>
          <button
            type="button"
            onClick={hideAll}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700"
          >
            <EyeOff className="w-4 h-4" />
            <span>Hide All</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        <span className="text-slate-400 font-bold uppercase tracking-wider mr-1">View Case:</span>
        {[
          { id: 'all', label: 'All Cases (a–d)' },
          { id: 'a', label: 'Case (a): Triangular Delta' },
          { id: 'b', label: 'Case (b): Ladder Network' },
          { id: 'c', label: 'Case (c): A-Frame Bridge' },
          { id: 'd', label: 'Case (d): Diagonal Bridge' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PROBLEMS GRID */}
      <div className="space-y-8">
        {/* ========================================================
            CASE (a): TRIANGULAR / DELTA NETWORK
           ======================================================== */}
        {(activeTab === 'all' || activeTab === 'a') && (
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 transition-all">
            {/* Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-black text-base flex items-center justify-center shrink-0">
                  (a)
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Case (a): Triangular Network (Delta Circuit)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Resistors: R_AC = 10 Ω, R_CB = 20 Ω, R_AB = 60 Ω
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  Target: R_AB = ?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSolution('a')}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    revealedSolutions.a
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {revealedSolutions.a ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Hidden Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circuit Diagram & Question Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Diagram Card */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Circuit Schematic (a)
                </span>

                {/* SVG Circuit Diagram */}
                <div className="w-full max-w-[340px] pt-4 pb-2">
                  <svg viewBox="0 0 340 220" className="w-full h-auto drop-shadow-md">
                    <defs>
                      <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#06b6d4" />
                      </filter>
                    </defs>

                    {/* Background Grid Accent */}
                    <line x1="20" y1="180" x2="320" y2="180" stroke="#1e293b" strokeDasharray="4 4" />
                    <line x1="170" y1="30" x2="170" y2="180" stroke="#1e293b" strokeDasharray="4 4" />

                    {/* Bottom Line Leads from external terminals */}
                    <line x1="20" y1="180" x2="70" y2="180" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                    <line x1="270" y1="180" x2="320" y2="180" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

                    {/* Bottom Resistor (60 Ohm) between node A(70,180) and B(270,180) */}
                    <line x1="70" y1="180" x2="120" y2="180" stroke="#f59e0b" strokeWidth="3" />
                    {/* Resistor zig-zag */}
                    <path
                      d="M 120 180 L 127 168 L 137 192 L 147 168 L 157 192 L 167 168 L 177 192 L 187 168 L 197 192 L 207 168 L 217 192 L 220 180"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    <line x1="220" y1="180" x2="270" y2="180" stroke="#f59e0b" strokeWidth="3" />

                    {/* Resistor Label 60 Ohm */}
                    <rect x="145" y="196" width="50" height="20" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                    <text x="170" y="210" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      60 Ω
                    </text>

                    {/* Left Leg: from node A(70, 180) to Apex C(170, 40) */}
                    <line x1="70" y1="180" x2="105" y2="131" stroke="#06b6d4" strokeWidth="3" />
                    {/* Diagonal zig-zag for 10 Ohm */}
                    <g transform="translate(105, 131) rotate(-54.5)">
                      <line x1="0" y1="0" x2="15" y2="0" stroke="#06b6d4" strokeWidth="3" />
                      <path
                        d="M 15 0 L 20 -8 L 27 8 L 34 -8 L 41 8 L 48 -8 L 55 8 L 60 0"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <line x1="60" y1="0" x2="75" y2="0" stroke="#06b6d4" strokeWidth="3" />
                    </g>
                    <line x1="148" y1="71" x2="170" y2="40" stroke="#06b6d4" strokeWidth="3" />

                    {/* Label 10 Ohm */}
                    <rect x="75" y="85" width="48" height="20" rx="5" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                    <text x="99" y="99" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      10 Ω
                    </text>

                    {/* Right Leg: from Apex C(170, 40) to node B(270, 180) */}
                    <line x1="170" y1="40" x2="192" y2="71" stroke="#10b981" strokeWidth="3" />
                    {/* Diagonal zig-zag for 20 Ohm */}
                    <g transform="translate(192, 71) rotate(54.5)">
                      <line x1="0" y1="0" x2="15" y2="0" stroke="#10b981" strokeWidth="3" />
                      <path
                        d="M 15 0 L 20 -8 L 27 8 L 34 -8 L 41 8 L 48 -8 L 55 8 L 60 0"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                      <line x1="60" y1="0" x2="75" y2="0" stroke="#10b981" strokeWidth="3" />
                    </g>
                    <line x1="235" y1="131" x2="270" y2="180" stroke="#10b981" strokeWidth="3" />

                    {/* Label 20 Ohm */}
                    <rect x="218" y="85" width="48" height="20" rx="5" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                    <text x="242" y="99" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      20 Ω
                    </text>

                    {/* Node C Circle */}
                    <circle cx="170" cy="40" r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="170" y="26" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle">
                      C
                    </text>

                    {/* Node A Circle */}
                    <circle cx="70" cy="180" r="5.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    {/* External Terminal A */}
                    <circle cx="20" cy="180" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="12" y="166" fill="#38bdf8" fontSize="15" fontWeight="900">
                      A
                    </text>

                    {/* Node B Circle */}
                    <circle cx="270" cy="180" r="5.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    {/* External Terminal B */}
                    <circle cx="320" cy="180" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="318" y="166" fill="#38bdf8" fontSize="15" fontWeight="900">
                      B
                    </text>
                  </svg>
                </div>

                <div className="text-center text-xs text-slate-400 font-medium">
                  Delta triangle with vertices A, B, and apex C.
                </div>
              </div>

              {/* Analysis & Quick Test */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    Circuit Analysis Strategy:
                  </span>
                  <ol className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed font-medium">
                    <li>
                      Identify the path from A to B through top node C: this has <strong className="text-white">10 Ω</strong> and <strong className="text-white">20 Ω</strong> in <em>series</em>.
                    </li>
                    <li>
                      Calculate equivalent series resistance <span className="font-mono text-cyan-300 font-bold">R_ACB = 10 + 20 = 30 Ω</span>.
                    </li>
                    <li>
                      This series branch is in <em>parallel</em> with the bottom <strong className="text-white">60 Ω</strong> resistor directly across terminals A and B.
                    </li>
                  </ol>
                </div>

                {/* Self Practice Input */}
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-300 font-medium">Your answer for R_AB:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 20"
                      value={userInputs.a}
                      onChange={(e) => setUserInputs({ ...userInputs, a: e.target.value })}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center font-bold focus:outline-none focus:border-cyan-400"
                    />
                    <span className="text-slate-400 font-mono font-bold">Ω</span>
                    {userInputs.a.trim() === '20' && (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold text-xs">
                        <Check className="w-4 h-4" /> Correct!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Solution (Toggleable Hidden Answer) */}
            {revealedSolutions.a && (
              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                  <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complete Step-by-Step Derivation &amp; Solution (a)</span>
                  </span>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Final Ans: 20 Ω
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  {/* Step 1 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-cyan-300 uppercase tracking-wider text-xs">
                      Step 1: Upper Series Branch (Path A → C → B)
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      Current passing through the 10 Ω resistor has only one path to reach terminal B through apex C, which continues through the 20 Ω resistor. Therefore, they are in series:
                    </p>
                    <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-amber-300 text-sm font-bold border border-slate-800">
                      R_ACB = R_AC + R_CB<br />
                      R_ACB = 10 Ω + 20 Ω = 30 Ω
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-cyan-300 uppercase tracking-wider text-xs">
                      Step 2: Parallel Combination across Terminals A &amp; B
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      The upper branch (R_ACB = 30 Ω) is connected directly across terminals A and B, in parallel with the 60 Ω resistor (R_AB):
                    </p>
                    <div className="p-2.5 bg-slate-900 rounded-lg font-mono text-cyan-300 text-sm font-bold border border-slate-800">
                      1 / R_eq = (1 / 30) + (1 / 60) = (2 + 1) / 60 = 3 / 60 = 1 / 20<br />
                      R_eq = (30 × 60) / (30 + 60) = 1800 / 90 = 20 Ω
                    </div>
                  </div>
                </div>

                {/* Final Result Callout */}
                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-sm">
                    Equivalent Resistance between terminals A and B:
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-300 bg-slate-950 px-4 py-1.5 rounded-lg border border-emerald-500/60 shadow-inner">
                    R_AB = 20 Ω
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            CASE (b): LADDER NETWORK
           ======================================================== */}
        {(activeTab === 'all' || activeTab === 'b') && (
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 transition-all">
            {/* Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-black text-base flex items-center justify-center shrink-0">
                  (b)
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Case (b): Two-Stage Ladder Network
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Resistors: Series 6 Ω, Shunt 4 Ω, Top 3 Ω, Right Shunt 1 Ω
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  Target: R_AB = ?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSolution('b')}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    revealedSolutions.b
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {revealedSolutions.b ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Hidden Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circuit Diagram & Question Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Diagram Card */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Circuit Schematic (b)
                </span>

                {/* SVG Circuit Diagram */}
                <div className="w-full max-w-[360px] pt-4 pb-2">
                  <svg viewBox="0 0 360 210" className="w-full h-auto drop-shadow-md">
                    {/* Bottom Return Rail (Terminal B to Right end) */}
                    <line x1="20" y1="170" x2="310" y2="170" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />

                    {/* External Terminal B */}
                    <circle cx="20" cy="170" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="12" y="156" fill="#38bdf8" fontSize="15" fontWeight="900">
                      B
                    </text>

                    {/* External Terminal A */}
                    <circle cx="20" cy="50" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="12" y="38" fill="#38bdf8" fontSize="15" fontWeight="900">
                      A
                    </text>
                    <line x1="26" y1="50" x2="60" y2="50" stroke="#38bdf8" strokeWidth="3" />

                    {/* Resistor 6 Ohm (horizontal series) */}
                    <line x1="60" y1="50" x2="75" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 75 50 L 80 40 L 87 60 L 94 40 L 101 60 L 108 40 L 115 60 L 122 40 L 129 60 L 134 50"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="134" y1="50" x2="160" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="90" y="22" width="38" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                    <text x="109" y="35" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      6 Ω
                    </text>

                    {/* Node 1 Junction at (160, 50) and (160, 170) */}
                    <circle cx="160" cy="50" r="4.5" fill="#ffffff" />
                    <circle cx="160" cy="170" r="4.5" fill="#ffffff" />

                    {/* Resistor 4 Ohm (vertical shunt) */}
                    <line x1="160" y1="50" x2="160" y2="75" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 160 75 L 150 82 L 170 90 L 150 98 L 170 106 L 150 114 L 170 122 L 150 130 L 170 138 L 160 145"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="160" y1="145" x2="160" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="172" y="100" width="38" height="18" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                    <text x="191" y="113" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      4 Ω
                    </text>

                    {/* Top branch from node 1 (160, 50) to right node 2 (310, 50) with 3 Ohm */}
                    <line x1="160" y1="50" x2="200" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 200 50 L 205 40 L 212 60 L 219 40 L 226 60 L 233 40 L 240 60 L 247 40 L 254 60 L 259 50"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="259" y1="50" x2="310" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="215" y="22" width="38" height="18" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                    <text x="234" y="35" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      3 Ω
                    </text>

                    {/* Right vertical branch (310, 50) to (310, 170) with 1 Ohm */}
                    <circle cx="310" cy="50" r="4" fill="#ffffff" />
                    <circle cx="310" cy="170" r="4" fill="#ffffff" />
                    <line x1="310" y1="50" x2="310" y2="80" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 310 80 L 300 87 L 320 95 L 300 103 L 320 111 L 300 119 L 320 127 L 300 135 L 310 142"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="310" y1="142" x2="310" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="318" y="100" width="38" height="18" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                    <text x="337" y="113" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      1 Ω
                    </text>
                  </svg>
                </div>

                <div className="text-center text-xs text-slate-400 font-medium">
                  Two-mesh ladder solved by reducing from rightmost branch backwards to A–B.
                </div>
              </div>

              {/* Analysis & Quick Test */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Reduction Strategy (Right-to-Left):
                  </span>
                  <ol className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed font-medium">
                    <li>
                      Begin at the farthest branch: top <strong className="text-white">3 Ω</strong> and right vertical <strong className="text-white">1 Ω</strong> are in <em>series</em>: <span className="font-mono text-cyan-300 font-bold">3 + 1 = 4 Ω</span>.
                    </li>
                    <li>
                      This 4 Ω is in <em>parallel</em> with the middle vertical <strong className="text-white">4 Ω</strong>: <span className="font-mono text-cyan-300 font-bold">(4 × 4) / (4 + 4) = 2 Ω</span>.
                    </li>
                    <li>
                      Finally, this 2 Ω equivalent is in <em>series</em> with input resistor <strong className="text-white">6 Ω</strong>: <span className="font-mono text-cyan-300 font-bold">6 + 2 = 8 Ω</span>.
                    </li>
                  </ol>
                </div>

                {/* Self Practice Input */}
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-300 font-medium">Your answer for R_AB:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 8"
                      value={userInputs.b}
                      onChange={(e) => setUserInputs({ ...userInputs, b: e.target.value })}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center font-bold focus:outline-none focus:border-amber-400"
                    />
                    <span className="text-slate-400 font-mono font-bold">Ω</span>
                    {userInputs.b.trim() === '8' && (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold text-xs">
                        <Check className="w-4 h-4" /> Correct!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Solution (Toggleable Hidden Answer) */}
            {revealedSolutions.b && (
              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                  <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complete Step-by-Step Derivation &amp; Solution (b)</span>
                  </span>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Final Ans: 8 Ω
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {/* Step 1 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 uppercase tracking-wider text-xs">
                      Step 1: Right Branch Series
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      The 3 Ω and 1 Ω resistors carry identical current:
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-amber-300 text-xs font-bold border border-slate-800">
                      R_right = 3 Ω + 1 Ω<br />
                      R_right = 4 Ω
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-cyan-300 uppercase tracking-wider text-xs">
                      Step 2: Parallel Shunt Reduction
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      R_right (4 Ω) is in parallel with the 4 Ω vertical resistor:
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 text-xs font-bold border border-slate-800">
                      R_p = (4 × 4) / (4 + 4)<br />
                      R_p = 16 / 8 = 2 Ω
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-300 uppercase tracking-wider text-xs">
                      Step 3: Total Equivalent R_AB
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      Input 6 Ω resistor is in series with R_p:
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-emerald-300 text-xs font-bold border border-slate-800">
                      R_AB = 6 Ω + R_p<br />
                      R_AB = 6 Ω + 2 Ω = 8 Ω
                    </div>
                  </div>
                </div>

                {/* Final Result Callout */}
                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-sm">
                    Equivalent Resistance between terminals A and B:
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-300 bg-slate-950 px-4 py-1.5 rounded-lg border border-emerald-500/60 shadow-inner">
                    R_AB = 8 Ω
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            CASE (c): A-FRAME SHAPED NETWORK
           ======================================================== */}
        {(activeTab === 'all' || activeTab === 'c') && (
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 transition-all">
            {/* Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 font-black text-base flex items-center justify-center shrink-0">
                  (c)
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Case (c): A-Frame Shaped Resistor Network
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Resistors: Lower legs 5 Ω &amp; 3 Ω, Bridge 3 Ω, Upper peak 2 Ω &amp; 4 Ω
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  Target: R_AB = ?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSolution('c')}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    revealedSolutions.c
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {revealedSolutions.c ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Hidden Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circuit Diagram & Question Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Diagram Card */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Circuit Schematic (c)
                </span>

                {/* SVG Circuit Diagram */}
                <div className="w-full max-w-[340px] pt-4 pb-2">
                  <svg viewBox="0 0 340 230" className="w-full h-auto drop-shadow-md">
                    {/* External Terminal A and lead */}
                    <circle cx="40" cy="200" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="24" y="205" fill="#38bdf8" fontSize="15" fontWeight="900">
                      A
                    </text>

                    {/* Lower Left Leg Resistor: 5 Ohm */}
                    <line x1="45" y1="195" x2="65" y2="165" stroke="#38bdf8" strokeWidth="3" />
                    <g transform="translate(65, 165) rotate(-56)">
                      <path
                        d="M 0 0 L 10 0 L 15 -7 L 22 7 L 29 -7 L 36 7 L 43 -7 L 50 0 L 60 0"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </g>
                    <line x1="99" y1="115" x2="110" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="50" y="130" width="38" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                    <text x="69" y="143" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      5 Ω
                    </text>

                    {/* Junction J1 at (110, 100) */}
                    <circle cx="110" cy="100" r="4.5" fill="#ffffff" />

                    {/* Horizontal Bridge Resistor between J1(110, 100) and J2(230, 100): 3 Ohm */}
                    <line x1="110" y1="100" x2="140" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 140 100 L 145 92 L 152 108 L 159 92 L 166 108 L 173 92 L 180 108 L 187 92 L 194 108 L 200 100"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="200" y1="100" x2="230" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="151" y="112" width="38" height="18" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                    <text x="170" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      3 Ω
                    </text>

                    {/* Junction J2 at (230, 100) */}
                    <circle cx="230" cy="100" r="4.5" fill="#ffffff" />

                    {/* Upper Left peak: J1(110, 100) to Apex(170, 30): 2 Ohm */}
                    <line x1="110" y1="100" x2="125" y2="82" stroke="#38bdf8" strokeWidth="3" />
                    <g transform="translate(125, 82) rotate(-49)">
                      <path
                        d="M 0 0 L 10 0 L 15 -6 L 22 6 L 29 -6 L 36 6 L 43 -6 L 48 0 L 55 0"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </g>
                    <line x1="161" y1="40" x2="170" y2="30" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="110" y="44" width="38" height="18" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                    <text x="129" y="57" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      2 Ω
                    </text>

                    {/* Apex at (170, 30) */}
                    <circle cx="170" cy="30" r="4.5" fill="#ffffff" />

                    {/* Upper Right peak: Apex(170, 30) to J2(230, 100): 4 Ohm */}
                    <line x1="170" y1="30" x2="185" y2="47" stroke="#38bdf8" strokeWidth="3" />
                    <g transform="translate(185, 47) rotate(49)">
                      <path
                        d="M 0 0 L 10 0 L 15 -6 L 22 6 L 29 -6 L 36 6 L 43 -6 L 48 0 L 55 0"
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </g>
                    <line x1="221" y1="89" x2="230" y2="100" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="192" y="44" width="38" height="18" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                    <text x="211" y="57" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      4 Ω
                    </text>

                    {/* Lower Right Leg Resistor: J2(230, 100) to Terminal B(300, 200): 3 Ohm */}
                    <line x1="230" y1="100" x2="245" y2="121" stroke="#38bdf8" strokeWidth="3" />
                    <g transform="translate(245, 121) rotate(56)">
                      <path
                        d="M 0 0 L 10 0 L 15 -7 L 22 7 L 29 -7 L 36 7 L 43 -7 L 50 0 L 60 0"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </g>
                    <line x1="278" y1="169" x2="300" y2="200" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="252" y="130" width="38" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                    <text x="271" y="143" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      3 Ω
                    </text>

                    {/* External Terminal B */}
                    <circle cx="300" cy="200" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="312" y="205" fill="#38bdf8" fontSize="15" fontWeight="900">
                      B
                    </text>
                  </svg>
                </div>

                <div className="text-center text-xs text-slate-400 font-medium">
                  A-frame circuit with upper triangular apex in parallel with crossbar.
                </div>
              </div>

              {/* Analysis & Quick Test */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                    Reduction Strategy:
                  </span>
                  <ol className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed font-medium">
                    <li>
                      Top apex resistors (<strong className="text-white">2 Ω</strong> and <strong className="text-white">4 Ω</strong>) are in <em>series</em>: <span className="font-mono text-cyan-300 font-bold">2 + 4 = 6 Ω</span>.
                    </li>
                    <li>
                      This top 6 Ω branch is in <em>parallel</em> with the horizontal crossbar <strong className="text-white">3 Ω</strong>: <span className="font-mono text-cyan-300 font-bold">(6 × 3) / (6 + 3) = 18 / 9 = 2 Ω</span>.
                    </li>
                    <li>
                      Entire circuit from A to B is a single <em>series chain</em>: Left Leg (<strong className="text-white">5 Ω</strong>) + Middle Block (<strong className="text-white">2 Ω</strong>) + Right Leg (<strong className="text-white">3 Ω</strong>): <span className="font-mono text-cyan-300 font-bold">5 + 2 + 3 = 10 Ω</span>.
                    </li>
                  </ol>
                </div>

                {/* Self Practice Input */}
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-300 font-medium">Your answer for R_AB:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 10"
                      value={userInputs.c}
                      onChange={(e) => setUserInputs({ ...userInputs, c: e.target.value })}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center font-bold focus:outline-none focus:border-purple-400"
                    />
                    <span className="text-slate-400 font-mono font-bold">Ω</span>
                    {userInputs.c.trim() === '10' && (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold text-xs">
                        <Check className="w-4 h-4" /> Correct!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Solution (Toggleable Hidden Answer) */}
            {revealedSolutions.c && (
              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                  <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complete Step-by-Step Derivation &amp; Solution (c)</span>
                  </span>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Final Ans: 10 Ω
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs sm:text-sm">
                  {/* Step 1 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-purple-300 uppercase tracking-wider text-xs">
                      Step 1: Top Apex Series
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      Current passing through top 2 Ω resistor must flow through 4 Ω:
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-purple-300 text-xs font-bold border border-slate-800">
                      R_top = 2 Ω + 4 Ω<br />
                      R_top = 6 Ω
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-cyan-300 uppercase tracking-wider text-xs">
                      Step 2: Crossbar Parallel
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      R_top (6 Ω) is in parallel with horizontal bridge (3 Ω):
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-cyan-300 text-xs font-bold border border-slate-800">
                      R_mid = (6 × 3) / (6 + 3)<br />
                      R_mid = 18 / 9 = 2 Ω
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-emerald-300 uppercase tracking-wider text-xs">
                      Step 3: Total Series Chain
                    </div>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      Sum of left leg, reduced middle, and right leg:
                    </p>
                    <div className="p-2 bg-slate-900 rounded-lg font-mono text-emerald-300 text-xs font-bold border border-slate-800">
                      R_AB = 5 Ω + 2 Ω + 3 Ω<br />
                      R_AB = 10 Ω
                    </div>
                  </div>
                </div>

                {/* Final Result Callout */}
                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-sm">
                    Equivalent Resistance between terminals A and B:
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-300 bg-slate-950 px-4 py-1.5 rounded-lg border border-emerald-500/60 shadow-inner">
                    R_AB = 10 Ω
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            CASE (d): SQUARE BRIDGE WITH DIAGONAL
           ======================================================== */}
        {(activeTab === 'all' || activeTab === 'd') && (
          <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 transition-all">
            {/* Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 font-black text-base flex items-center justify-center shrink-0">
                  (d)
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Case (d): Square Bridge with Diagonal Resistor
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Resistors: Bottom 10 Ω, Left 3 Ω, Top 7 Ω, Diagonal 10 Ω, Right 5 Ω
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                  Target: R_AB = ?
                </span>
                <button
                  type="button"
                  onClick={() => toggleSolution('d')}
                  className={`px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    revealedSolutions.d
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
                  }`}
                >
                  {revealedSolutions.d ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide Solution</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Show Hidden Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Circuit Diagram & Question Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              {/* Diagram Card */}
              <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Circuit Schematic (d)
                </span>

                {/* SVG Circuit Diagram */}
                <div className="w-full max-w-[340px] pt-4 pb-2">
                  <svg viewBox="0 0 340 220" className="w-full h-auto drop-shadow-md">
                    {/* Node A (bottom-left) at (70, 170) */}
                    {/* Node B (bottom-right) at (250, 170) */}
                    {/* Node C (top-left) at (70, 50) */}
                    {/* Node D (top-right) at (250, 50) */}

                    {/* External Terminal Leads */}
                    <line x1="20" y1="170" x2="70" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="250" y1="170" x2="300" y2="170" stroke="#38bdf8" strokeWidth="3" />

                    <circle cx="20" cy="170" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="12" y="156" fill="#38bdf8" fontSize="15" fontWeight="900">
                      A
                    </text>

                    <circle cx="300" cy="170" r="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="298" y="156" fill="#38bdf8" fontSize="15" fontWeight="900">
                      B
                    </text>

                    {/* Bottom Resistor between A(70, 170) and B(250, 170): 10 Ohm */}
                    <line x1="70" y1="170" x2="115" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 115 170 L 120 160 L 127 180 L 134 160 L 141 180 L 148 160 L 155 180 L 162 160 L 169 180 L 176 160 L 183 180 L 190 170"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="190" y1="170" x2="250" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="135" y="186" width="42" height="18" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                    <text x="156" y="199" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      10 Ω
                    </text>

                    {/* Left Resistor between A(70, 170) and C(70, 50): 3 Ohm */}
                    <line x1="70" y1="170" x2="70" y2="135" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 70 135 L 60 128 L 80 121 L 60 114 L 80 107 L 60 100 L 80 93 L 60 86 L 70 80"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="70" y1="80" x2="70" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="25" y="98" width="38" height="18" rx="4" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                    <text x="44" y="111" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      3 Ω
                    </text>

                    {/* Top Resistor between C(70, 50) and D(250, 50): 7 Ohm */}
                    <line x1="70" y1="50" x2="115" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 115 50 L 120 40 L 127 60 L 134 40 L 141 60 L 148 40 L 155 60 L 162 40 L 169 60 L 176 40 L 183 60 L 190 50"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="190" y1="50" x2="250" y2="50" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="135" y="22" width="38" height="18" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                    <text x="154" y="35" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      7 Ω
                    </text>

                    {/* Right Resistor between D(250, 50) and B(250, 170): 5 Ohm */}
                    <line x1="250" y1="50" x2="250" y2="85" stroke="#38bdf8" strokeWidth="3" />
                    <path
                      d="M 250 85 L 240 92 L 260 99 L 240 106 L 260 113 L 240 120 L 260 127 L 240 134 L 250 140"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <line x1="250" y1="140" x2="250" y2="170" stroke="#38bdf8" strokeWidth="3" />
                    <rect x="258" y="103" width="38" height="18" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                    <text x="277" y="116" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      5 Ω
                    </text>

                    {/* Diagonal Resistor between A(70, 170) and D(250, 50): 10 Ohm */}
                    <line x1="70" y1="170" x2="115" y2="140" stroke="#e11d48" strokeWidth="2.5" />
                    <g transform="translate(115, 140) rotate(-33.7)">
                      <path
                        d="M 0 0 L 15 0 L 20 -7 L 27 7 L 34 -7 L 41 7 L 48 -7 L 55 7 L 62 -7 L 69 7 L 76 -7 L 81 0 L 95 0"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </g>
                    <line x1="205" y1="80" x2="250" y2="50" stroke="#e11d48" strokeWidth="2.5" />
                    <rect x="135" y="93" width="42" height="18" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1" />
                    <text x="156" y="106" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      10 Ω
                    </text>

                    {/* Junction circles */}
                    <circle cx="70" cy="170" r="4.5" fill="#ffffff" />
                    <circle cx="250" cy="170" r="4.5" fill="#ffffff" />
                    <circle cx="70" cy="50" r="4.5" fill="#ffffff" />
                    <text x="60" y="44" fill="#ffffff" fontSize="11" fontWeight="900">C</text>
                    <circle cx="250" cy="50" r="4.5" fill="#ffffff" />
                    <text x="260" y="44" fill="#ffffff" fontSize="11" fontWeight="900">D</text>
                  </svg>
                </div>

                <div className="text-center text-xs text-slate-400 font-medium">
                  Bridge circuit with diagonal 10 Ω bridging from terminal node A to top-right node D.
                </div>
              </div>

              {/* Analysis & Quick Test */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                    Reduction Strategy:
                  </span>
                  <ol className="text-xs sm:text-sm text-slate-300 space-y-1.5 list-decimal pl-4 leading-relaxed font-medium">
                    <li>
                      Path through top-left: Left (<strong className="text-white">3 Ω</strong>) and Top (<strong className="text-white">7 Ω</strong>) connect node A to node D in <em>series</em>: <span className="font-mono text-cyan-300 font-bold">3 + 7 = 10 Ω</span>.
                    </li>
                    <li>
                      This 10 Ω branch is in <em>parallel</em> with the diagonal <strong className="text-white">10 Ω</strong> across A and D: <span className="font-mono text-cyan-300 font-bold">(10 × 10) / (10 + 10) = 5 Ω</span>.
                    </li>
                    <li>
                      Path continues from D to B via Right (<strong className="text-white">5 Ω</strong>), so branch ADB is: <span className="font-mono text-cyan-300 font-bold">5 + 5 = 10 Ω</span>.
                    </li>
                    <li>
                      Finally, branch ADB (10 Ω) is in <em>parallel</em> with the bottom <strong className="text-white">10 Ω</strong> between A and B: <span className="font-mono text-cyan-300 font-bold">(10 × 10) / (10 + 10) = 5 Ω</span>.
                    </li>
                  </ol>
                </div>

                {/* Self Practice Input */}
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs sm:text-sm">
                  <span className="text-slate-300 font-medium">Your answer for R_AB:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 5"
                      value={userInputs.d}
                      onChange={(e) => setUserInputs({ ...userInputs, d: e.target.value })}
                      className="w-20 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-center font-bold focus:outline-none focus:border-rose-400"
                    />
                    <span className="text-slate-400 font-mono font-bold">Ω</span>
                    {userInputs.d.trim() === '5' && (
                      <span className="text-emerald-400 flex items-center gap-1 font-bold text-xs">
                        <Check className="w-4 h-4" /> Correct!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Solution (Toggleable Hidden Answer) */}
            {revealedSolutions.d && (
              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2.5">
                  <span className="text-xs sm:text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Complete Step-by-Step Derivation &amp; Solution (d)</span>
                  </span>
                  <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                    Final Ans: 5 Ω
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
                  {/* Step 1 */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                      Step 1: Path A → C → D
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      3 Ω and 7 Ω in series:
                    </p>
                    <div className="p-1.5 bg-slate-900 rounded font-mono text-rose-300 text-xs font-bold border border-slate-800">
                      R_ACD = 3 + 7 = 10 Ω
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="font-bold text-cyan-300 uppercase tracking-wider text-[11px]">
                      Step 2: Parallel with Diagonal
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      R_ACD (10 Ω) || Diagonal (10 Ω):
                    </p>
                    <div className="p-1.5 bg-slate-900 rounded font-mono text-cyan-300 text-xs font-bold border border-slate-800">
                      R_AD = (10 × 10) / 20 = 5 Ω
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                      Step 3: Upper Path ADB
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      R_AD (5 Ω) in series with Right (5 Ω):
                    </p>
                    <div className="p-1.5 bg-slate-900 rounded font-mono text-amber-300 text-xs font-bold border border-slate-800">
                      R_ADB = 5 + 5 = 10 Ω
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
                      Step 4: Total R_AB Across A &amp; B
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Upper ADB (10 Ω) || Bottom (10 Ω):
                    </p>
                    <div className="p-1.5 bg-slate-900 rounded font-mono text-emerald-300 text-xs font-bold border border-slate-800">
                      R_AB = (10 × 10) / 20 = 5 Ω
                    </div>
                  </div>
                </div>

                {/* Final Result Callout */}
                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-bold text-white text-sm">
                    Equivalent Resistance between terminals A and B:
                  </span>
                  <span className="font-mono font-black text-xl text-emerald-300 bg-slate-950 px-4 py-1.5 rounded-lg border border-emerald-500/60 shadow-inner">
                    R_AB = 5 Ω
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Summary Scorecard of all 4 circuits */}
      <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border-2 border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Master Summary Table: Equivalent Resistance R_AB</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Sarthaks &amp; Board Reference
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Case</th>
                <th className="py-2.5 px-3">Circuit Topology</th>
                <th className="py-2.5 px-3">Intermediate Steps</th>
                <th className="py-2.5 px-3">Equivalent Resistance (R_AB)</th>
                <th className="py-2.5 px-3 text-right">Hidden Answer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="py-2.5 px-3 font-black text-cyan-400 font-mono">(a)</td>
                <td className="py-2.5 px-3 font-medium">Triangular Delta</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">R_ACB = 30 Ω in parallel with 60 Ω</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-400 text-base">20 Ω</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSolution('a')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                  >
                    {revealedSolutions.a ? 'Hide' : 'Reveal'}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-black text-amber-400 font-mono">(b)</td>
                <td className="py-2.5 px-3 font-medium">Two-stage Ladder</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">Right (3+1=4 Ω) || 4 Ω = 2 Ω; 6+2 = 8 Ω</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-400 text-base">8 Ω</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSolution('b')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                  >
                    {revealedSolutions.b ? 'Hide' : 'Reveal'}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-black text-purple-400 font-mono">(c)</td>
                <td className="py-2.5 px-3 font-medium">A-Frame Network</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">(2+4=6 Ω) || 3 Ω = 2 Ω; 5+2+3 = 10 Ω</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-400 text-base">10 Ω</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSolution('c')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                  >
                    {revealedSolutions.c ? 'Hide' : 'Reveal'}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-black text-rose-400 font-mono">(d)</td>
                <td className="py-2.5 px-3 font-medium">Diagonal Bridge</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">(3+7=10 Ω) || 10 Ω = 5 Ω; 5+5=10 Ω; 10 || 10 = 5 Ω</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-400 text-base">5 Ω</td>
                <td className="py-2.5 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => toggleSolution('d')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline cursor-pointer"
                  >
                    {revealedSolutions.d ? 'Hide' : 'Reveal'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
