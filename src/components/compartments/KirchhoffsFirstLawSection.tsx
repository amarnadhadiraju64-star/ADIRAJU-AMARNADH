import React, { useState, useEffect } from 'react';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Eye,
  EyeOff,
  Sliders,
  Scale,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Activity,
  Atom
} from 'lucide-react';

interface PresetConfig {
  id: string;
  name: string;
  description: string;
  i1: number; // entering
  i2: number; // entering
  i3: number; // leaving
  i4: number; // leaving
  note: string;
}

export const KirchhoffsFirstLawSection: React.FC = () => {
  // Animation control
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');

  // Active Preset or Custom Sandbox
  const [activePresetId, setActivePresetId] = useState<string>('preset1');

  // Current values
  const [i1, setI1] = useState<number>(3.0); // Entering
  const [i2, setI2] = useState<number>(4.0); // Entering
  const [i3, setI3] = useState<number>(2.0); // Leaving
  const [i4, setI4] = useState<number>(5.0); // Leaving

  // For unknown current solver quiz
  const [unknownBranch, setUnknownBranch] = useState<'none' | 'i4'>('none');
  const [studentAnswer, setStudentAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Hidden solutions for practice numericals
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({
    practice1: false,
    practice2: false,
    practice3: false
  });

  // Presets definition
  const presets: PresetConfig[] = [
    {
      id: 'preset1',
      name: 'Standard Textbook Node (3A + 4A = 2A + 5A)',
      description: 'Classic AP SSC Board junction with two entering currents (3A & 4A) and two leaving currents (2A & 5A).',
      i1: 3.0,
      i2: 4.0,
      i3: 2.0,
      i4: 5.0,
      note: 'Total Entering = 3 + 4 = 7 A. Total Leaving = 2 + 5 = 7 A. ΣI = 0.'
    },
    {
      id: 'preset2',
      name: 'Parallel Resistor Node (1.5A = 0.75A + 0.75A)',
      description: 'Matches the classroom assignment circuit: main current of 1.5A entering junction J₁, splitting into two 0.75A branches.',
      i1: 1.5,
      i2: 0.0,
      i3: 0.75,
      i4: 0.75,
      note: 'Total Entering = 1.5 A. Total Leaving = 0.75 + 0.75 = 1.5 A.'
    },
    {
      id: 'preset3',
      name: 'High Current Industrial Node (8A + 6A = 5A + 9A)',
      description: 'Heavy domestic appliance junction node demonstrating conservation with larger ampere currents.',
      i1: 8.0,
      i2: 6.0,
      i3: 5.0,
      i4: 9.0,
      note: 'Total Entering = 8 + 6 = 14 A. Total Leaving = 5 + 9 = 14 A.'
    },
    {
      id: 'preset_unknown',
      name: 'Board PYQ: Find Unknown Current I₄',
      description: 'I₁ = 5 A (entering), I₂ = 3 A (entering), I₃ = 2 A (leaving). What is I₄ (leaving)?',
      i1: 5.0,
      i2: 3.0,
      i3: 2.0,
      i4: 6.0,
      note: 'Solve: 5 + 3 = 2 + I₄ ⟹ 8 = 2 + I₄ ⟹ I₄ = 6 A!'
    }
  ];

  // Select preset handler
  const handleSelectPreset = (preset: PresetConfig) => {
    setActivePresetId(preset.id);
    setI1(preset.i1);
    setI2(preset.i2);
    setI3(preset.i3);
    setI4(preset.i4);
    if (preset.id === 'preset_unknown') {
      setUnknownBranch('i4');
      setStudentAnswer('');
      setIsAnswerChecked(false);
      setIsAnswerCorrect(null);
    } else {
      setUnknownBranch('none');
    }
  };

  // Interactive slider update: when i1 or i2 or i3 changes, auto-adjust i4 to preserve conservation
  const handleI1Change = (val: number) => {
    setI1(val);
    setActivePresetId('custom');
    const newI4 = Math.max(0, val + i2 - i3);
    setI4(parseFloat(newI4.toFixed(1)));
  };

  const handleI2Change = (val: number) => {
    setI2(val);
    setActivePresetId('custom');
    const newI4 = Math.max(0, i1 + val - i3);
    setI4(parseFloat(newI4.toFixed(1)));
  };

  const handleI3Change = (val: number) => {
    setI3(val);
    setActivePresetId('custom');
    const newI4 = Math.max(0, i1 + i2 - val);
    setI4(parseFloat(newI4.toFixed(1)));
  };

  // Calculations
  const totalEntering = i1 + i2;
  const totalLeaving = i3 + i4;
  const isConserved = Math.abs(totalEntering - totalLeaving) < 0.01;
  const electronsPerSecond = totalEntering * 6.25 * Math.pow(10, 18);

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const checkStudentUnknown = () => {
    const val = parseFloat(studentAnswer);
    if (isNaN(val)) return;
    setIsAnswerChecked(true);
    setIsAnswerCorrect(Math.abs(val - 6.0) < 0.1);
  };

  // Animation duration multiplier
  const animDuration = animSpeed === 'fast' ? '1s' : animSpeed === 'slow' ? '3.5s' : '2s';

  return (
    <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-7 space-y-7 text-white shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Work Compartment Special</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Law of Conservation of Charge</span>
            </span>
            <span className="text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              AP SSC &amp; CBSE Public Exam Core
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Kirchhoff&apos;s First Law (Current Law / Junction Rule)</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            <strong>Statement:</strong> The algebraic sum of all electric currents meeting at any junction in an electrical network is zero (<strong>∑I = 0</strong>), which means: <span className="text-emerald-300 font-bold">Sum of Entering Currents = Sum of Leaving Currents (∑I_entering = ∑I_leaving)</span>. This law is based strictly on the fundamental <strong>Law of Conservation of Electric Charge</strong>.
          </p>
        </div>

        {/* Animation & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Flow' : 'Play Flow'}</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              type="button"
              onClick={() => setAnimSpeed('slow')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                animSpeed === 'slow' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Slow
            </button>
            <button
              type="button"
              onClick={() => setAnimSpeed('normal')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                animSpeed === 'normal' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setAnimSpeed('fast')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                animSpeed === 'fast' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fast
            </button>
          </div>
        </div>
      </div>

      {/* Preset Selection Buttons */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
          Select Numerical Example or Board Exam Case:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activePresetId === p.id
                  ? 'bg-emerald-950/60 border-emerald-400/80 shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div>
                <span className={`text-xs font-black block ${activePresetId === p.id ? 'text-emerald-300' : 'text-white'}`}>
                  {p.name}
                </span>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {p.description}
                </p>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 font-bold mt-2 pt-2 border-t border-slate-800/80 block">
                {p.note}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* ANIMATED JUNCTION DIAGRAM (VECTOR SVG WITH FLOWING ELECTRONS) */}
      {/* ======================================================== */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 sm:p-7 relative overflow-hidden space-y-4">
        {/* CSS for flowing electron animation */}
        <style>{`
          @keyframes flow-in-left {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes flow-in-bottom-left {
            0% { stroke-dashoffset: 40; }
            100% { stroke-dashoffset: 0; }
          }
          @keyframes flow-out-top-right {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -40; }
          }
          @keyframes flow-out-bottom-right {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -40; }
          }
          .electron-flow-in {
            stroke-dasharray: 8 12;
            animation: flow-in-left ${animDuration} linear infinite;
          }
          .electron-flow-out {
            stroke-dasharray: 8 12;
            animation: flow-out-top-right ${animDuration} linear infinite;
          }
        `}</style>

        {/* Telemetry Bar Above Diagram */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Animated Junction Node (J)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
              ∑I_in = {totalEntering.toFixed(1)} A
            </span>
            <span className="text-slate-500 font-black">=</span>
            <span className="px-3 py-1 rounded-lg bg-orange-950/80 border border-orange-500/40 text-orange-300 font-bold">
              ∑I_out = {totalLeaving.toFixed(1)} A
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold">
              Net Accumulation = 0 C/s
            </span>
          </div>
        </div>

        {/* SVG Animated Diagram */}
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <svg
            viewBox="0 0 840 440"
            className="w-full max-w-4xl h-auto select-none"
            style={{ minWidth: '600px' }}
          >
            {/* Engineering Grid Background */}
            <defs>
              <pattern id="grid-dots-kcl" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#334155" opacity="0.4" />
              </pattern>
              {/* Radial glow for central junction */}
              <radialGradient id="junction-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
              </radialGradient>
              {/* Arrowhead marker: Green Entering */}
              <marker id="arrow-in" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#22c55e" />
              </marker>
              {/* Arrowhead marker: Orange Leaving */}
              <marker id="arrow-out" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#f97316" />
              </marker>
            </defs>

            <rect width="840" height="440" fill="url(#grid-dots-kcl)" rx="16" />

            {/* Junction central glow disk */}
            <circle cx="420" cy="220" r="70" fill="url(#junction-glow)" />

            {/* ======================================================== */}
            {/* WIRE 1: ENTERING CURRENT I1 (Top-Left to Junction)        */}
            {/* ======================================================== */}
            {/* Solid underlying copper line */}
            <line x1="80" y1="100" x2="420" y2="220" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
            {/* Animated dashed charge flow (Green) */}
            {isPlaying && (
              <line
                x1="80"
                y1="100"
                x2="420"
                y2="220"
                stroke="#86efac"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="electron-flow-in"
              />
            )}
            {/* Direction Arrow on Wire 1 pointing towards Junction */}
            <polygon points="250,153 268,166 256,170" fill="#22c55e" />
            {/* Wire 1 Terminal Terminal Node */}
            <circle cx="80" cy="100" r="8" fill="#10b981" />
            <circle cx="80" cy="100" r="3" fill="#ffffff" />
            {/* Wire 1 Callout Card */}
            <rect x="50" y="35" width="165" height="52" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="132" y="55" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
              ENTERING BRANCH 1 (In)
            </text>
            <text x="132" y="75" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">
              I₁ = +{i1.toFixed(1)} A
            </text>

            {/* ======================================================== */}
            {/* WIRE 2: ENTERING CURRENT I2 (Bottom-Left to Junction)     */}
            {/* ======================================================== */}
            <line x1="80" y1="340" x2="420" y2="220" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
            {isPlaying && (
              <line
                x1="80"
                y1="340"
                x2="420"
                y2="220"
                stroke="#86efac"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="electron-flow-in"
              />
            )}
            {/* Direction Arrow on Wire 2 pointing towards Junction */}
            <polygon points="256,270 268,274 250,287" fill="#22c55e" />
            {/* Wire 2 Terminal Node */}
            <circle cx="80" cy="340" r="8" fill="#10b981" />
            <circle cx="80" cy="340" r="3" fill="#ffffff" />
            {/* Wire 2 Callout Card */}
            <rect x="50" y="355" width="165" height="52" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="132" y="375" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
              ENTERING BRANCH 2 (In)
            </text>
            <text x="132" y="395" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">
              I₂ = +{i2.toFixed(1)} A
            </text>

            {/* ======================================================== */}
            {/* WIRE 3: LEAVING CURRENT I3 (Junction to Top-Right)       */}
            {/* ======================================================== */}
            <line x1="420" y1="220" x2="760" y2="100" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
            {isPlaying && (
              <line
                x1="420"
                y1="220"
                x2="760"
                y2="100"
                stroke="#fdba74"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="electron-flow-out"
              />
            )}
            {/* Direction Arrow on Wire 3 pointing away from Junction */}
            <polygon points="575,170 592,160 584,179" fill="#f97316" />
            {/* Wire 3 Terminal Node */}
            <circle cx="760" cy="100" r="8" fill="#f97316" />
            <circle cx="760" cy="100" r="3" fill="#ffffff" />
            {/* Wire 3 Callout Card */}
            <rect x="625" y="35" width="165" height="52" rx="10" fill="#7c2d12" stroke="#f97316" strokeWidth="2" />
            <text x="707" y="55" fill="#fed7aa" fontSize="11" fontWeight="bold" textAnchor="middle">
              LEAVING BRANCH 3 (Out)
            </text>
            <text x="707" y="75" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">
              I₃ = −{i3.toFixed(1)} A
            </text>

            {/* ======================================================== */}
            {/* WIRE 4: LEAVING CURRENT I4 (Junction to Bottom-Right)    */}
            {/* ======================================================== */}
            <line x1="420" y1="220" x2="760" y2="340" stroke="#ea580c" strokeWidth="6" strokeLinecap="round" />
            {isPlaying && (
              <line
                x1="420"
                y1="220"
                x2="760"
                y2="340"
                stroke="#fdba74"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="electron-flow-out"
              />
            )}
            {/* Direction Arrow on Wire 4 pointing away from Junction */}
            <polygon points="584,261 592,280 575,270" fill="#f97316" />
            {/* Wire 4 Terminal Node */}
            <circle cx="760" cy="340" r="8" fill="#f97316" />
            <circle cx="760" cy="340" r="3" fill="#ffffff" />
            {/* Wire 4 Callout Card */}
            <rect x="625" y="355" width="165" height="52" rx="10" fill="#7c2d12" stroke="#f97316" strokeWidth="2" />
            <text x="707" y="375" fill="#fed7aa" fontSize="11" fontWeight="bold" textAnchor="middle">
              LEAVING BRANCH 4 (Out)
            </text>
            <text x="707" y="395" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">
              {unknownBranch === 'i4' ? 'I₄ = ? (Find Value)' : `I₄ = −${i4.toFixed(1)} A`}
            </text>

            {/* ======================================================== */}
            {/* CENTRAL JUNCTION NODE J                                  */}
            {/* ======================================================== */}
            <circle cx="420" cy="220" r="22" fill="#0f172a" stroke="#22c55e" strokeWidth="4" />
            <circle cx="420" cy="220" r="10" fill="#22c55e" />
            <text x="420" y="225" fill="#ffffff" fontSize="15" fontWeight="black" textAnchor="middle">
              J
            </text>
            <text x="420" y="260" fill="#4ade80" fontSize="13" fontWeight="bold" textAnchor="middle">
              Junction Node (J)
            </text>

            {/* Central Mathematical Formula Badge */}
            <rect x="290" y="15" width="260" height="42" rx="10" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
            <text x="420" y="32" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
              KIRCHHOFF&apos;S JUNCTION RULE
            </text>
            <text x="420" y="48" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
              ∑ I_entering = ∑ I_leaving
            </text>

            {/* Live Conservation Statement at Bottom Center */}
            <rect x="270" y="380" width="300" height="42" rx="10" fill="#1e1e2e" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="420" y="397" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">
              LAW OF CONSERVATION OF CHARGE
            </text>
            <text x="420" y="413" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              {totalEntering.toFixed(1)} A (In) = {totalLeaving.toFixed(1)} A (Out) ✓
            </text>
          </svg>
        </div>

        {/* Legend beneath the diagram */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-300" />
            <span><strong>Entering Currents (Positive Sign +):</strong> Moving towards node J</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-orange-500 border border-orange-300" />
            <span><strong>Leaving Currents (Negative Sign −):</strong> Moving away from node J</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
            <span><strong>Conservation:</strong> No charge accumulation (dq/dt = 0)</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SOLVE FOR UNKNOWN CURRENT I₄ (BOARD EXAM CHALLENGE)      */}
      {/* ======================================================== */}
      {activePresetId === 'preset_unknown' && (
        <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>AP SSC Board Question: Solve for Unknown Current I₄</span>
            </h4>
            <span className="text-xs font-mono bg-amber-950 px-2.5 py-0.5 rounded border border-amber-500/40 text-amber-200">
              2 Marks Question
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200">
            Currents entering junction: <code className="text-emerald-300 font-bold">I₁ = 5 A</code> and <code className="text-emerald-300 font-bold">I₂ = 3 A</code>.
            Current leaving junction: <code className="text-orange-300 font-bold">I₃ = 2 A</code> and <code className="text-orange-300 font-bold">I₄ = ?</code>.
            Calculate the numerical value of current <code className="text-amber-300 font-bold">I₄</code> leaving the junction.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-bold">I₄ =</span>
              <input
                type="text"
                placeholder="Enter value in Amperes"
                value={studentAnswer}
                onChange={(e) => setStudentAnswer(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono w-40 focus:border-amber-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">Amperes (A)</span>
            </div>

            <button
              type="button"
              onClick={checkStudentUnknown}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
            >
              Verify Answer
            </button>
          </div>

          {isAnswerChecked && isAnswerCorrect === true && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Correct! I₄ = 6 Amperes (A)</span>
              </div>
              <p className="font-mono text-slate-200">
                Formula: ∑I_in = ∑I_out ⟹ I₁ + I₂ = I₃ + I₄ ⟹ 5 + 3 = 2 + I₄ ⟹ 8 = 2 + I₄ ⟹ I₄ = 8 − 2 = <strong>6 A</strong>!
              </p>
            </div>
          )}

          {isAnswerChecked && isAnswerCorrect === false && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300">
              Incorrect. Remember: Total entering = 5 + 3 = 8 A. Therefore total leaving must be 8 A. Since I₃ = 2 A, I₄ = 8 − 2 = 6 A.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERACTIVE CURRENT SLIDERS SANDBOX                      */}
      {/* ======================================================== */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Interactive Custom Junction Sandbox: Adjust Values to Test Balance</span>
          </h4>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Auto-Balanced by Conservation Law
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* I1 Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-300">Entering I₁</span>
              <span className="text-emerald-400 font-mono">{i1.toFixed(1)} A</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={i1}
              onChange={(e) => handleI1Change(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Branch 1: Inflow</span>
          </div>

          {/* I2 Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-300">Entering I₂</span>
              <span className="text-emerald-400 font-mono">{i2.toFixed(1)} A</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={i2}
              onChange={(e) => handleI2Change(parseFloat(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Branch 2: Inflow</span>
          </div>

          {/* I3 Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-orange-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-orange-300">Leaving I₃</span>
              <span className="text-orange-400 font-mono">{i3.toFixed(1)} A</span>
            </div>
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={i3}
              onChange={(e) => handleI3Change(parseFloat(e.target.value))}
              className="w-full accent-orange-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Branch 3: Outflow</span>
          </div>

          {/* I4 Auto-Calculated */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-orange-500/20 flex flex-col justify-between">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-orange-300">Leaving I₄ (Balancing)</span>
              <span className="text-orange-400 font-mono">{i4.toFixed(1)} A</span>
            </div>
            <div className="h-6 flex items-center">
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-orange-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${Math.min(100, (i4 / 20) * 100)}%` }}
                />
              </div>
            </div>
            <span className="text-[10px] text-slate-400 block font-mono">I₄ = (I₁ + I₂) − I₃</span>
          </div>
        </div>

        {/* Microscopic Electron Rate Telemetry */}
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Atom className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-300">
              <strong>Microscopic Electron Rate:</strong> Current I = {totalEntering.toFixed(1)} A means charge flow rate:
            </span>
          </div>
          <span className="font-mono text-cyan-300 font-bold bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30 shrink-0">
            {(electronsPerSecond / 1e19).toFixed(2)} × 10¹⁹ electrons / second
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DEEP CONCEPTUAL BREAKDOWN & LAW OF CONSERVATION OF CHARGE */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Core Physics & Sign Convention */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>1. Kirchhoff&apos;s First Law &amp; Sign Conventions</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Gustav Kirchhoff formulated two laws that govern electrical networks. The <strong>First Law</strong>, also known as the <strong>Junction Rule</strong> or <strong>Kirchhoff&apos;s Current Law (KCL)</strong>, applies at any point or junction where two or more conductors meet:
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
            <p className="text-emerald-400 font-bold">∑ I = 0 (Algebraic sum of currents at a junction is zero)</p>
            <p className="pt-1">Sign Convention:</p>
            <p>• Currents directed <em>towards</em> junction = <strong>POSITIVE (+)</strong></p>
            <p>• Currents directed <em>away from</em> junction = <strong>NEGATIVE (−)</strong></p>
            <p className="pt-1 text-cyan-300">Equation: I₁ + I₂ − I₃ − I₄ = 0 ⟹ I₁ + I₂ = I₃ + I₄</p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            In physical terms, electrical charge cannot pile up, sink, or be destroyed at the wire junction. Therefore, all current that flows in must flow out.
          </p>
        </div>

        {/* Card 2: Law of Conservation of Electric Charge */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Scale className="w-5 h-5 text-cyan-400" />
            <span>2. Why KCL is Based on Law of Conservation of Charge</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Electric current is defined as the rate of flow of electric charge: <code className="text-amber-300">I = q / t</code>, or <code className="text-amber-300">q = I × t</code>.
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-1.5">
            <p>Let charge entering junction in time Δt be:</p>
            <p>q_entering = (I₁ + I₂) × Δt</p>
            <p className="pt-1">Let charge leaving junction in time Δt be:</p>
            <p>q_leaving = (I₃ + I₄) × Δt</p>
            <p className="pt-1 text-emerald-300 font-bold">By Law of Conservation of Electric Charge:</p>
            <p className="text-emerald-400 font-bold">q_entering = q_leaving ⟹ (I₁ + I₂) × Δt = (I₃ + I₄) × Δt</p>
            <p className="text-cyan-300 font-black">Dividing by Δt:  I₁ + I₂ = I₃ + I₄  (∑I_in = ∑I_out)</p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong>Exam Note:</strong> If asked in exam <em>&quot;On what fundamental conservation law is Kirchhoff&apos;s first law based?&quot;</em>, the answer is: <strong>Law of Conservation of Electric Charge</strong>.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PRACTICE BOARD NUMERICALS WITH HIDDEN SOLUTIONS          */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>AP SSC Public Exam Practice Numericals (Click to Reveal Hidden Answers)</span>
        </h4>

        {/* Question 1 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('practice1')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                Q1
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  State Kirchhoff&apos;s Junction Rule and write its mathematical equation.
                </h5>
                <p className="text-xs text-slate-400">Standard 2-Marks Theory Question</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30">
                {revealedSolutions.practice1 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.practice1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.practice1 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-slate-200">
                  <strong>Statement:</strong> At any junction in an electrical circuit, the sum of currents entering the junction is equal to the sum of currents leaving the junction.
                </p>
                <p className="font-mono text-emerald-400 font-bold">
                  Mathematical form: ∑ I = 0  or  ∑ I_entering = ∑ I_leaving
                </p>
                <p className="text-slate-300">
                  <strong>Underlying Law:</strong> It is a direct consequence of the <strong>Law of Conservation of Electric Charge</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('practice2')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                Q2
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  Three wires carry currents 2 A, 3 A, and 4 A towards a junction. Two wires leave the junction, one carrying 5 A. What is the current in the second leaving wire?
                </h5>
                <p className="text-xs text-slate-400">Numerical Problem with 3 entering and 2 leaving wires</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
                {revealedSolutions.practice2 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.practice2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.practice2 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1.5">
                <p>Given:</p>
                <p>Currents entering junction: I₁ = 2 A, I₂ = 3 A, I₃ = 4 A</p>
                <p>Total entering current = 2 + 3 + 4 = 9 A</p>
                <p>Currents leaving junction: I₄ = 5 A, I₅ = ?</p>
                <p className="text-cyan-400 font-bold">Applying Kirchhoff&apos;s Junction Rule:</p>
                <p>∑ I_in = ∑ I_out ⟹ 9 A = 5 A + I₅</p>
                <p>I₅ = 9 A − 5 A = 4 A</p>
                <p className="text-emerald-400 font-bold text-sm">⇒ Current in the second wire = 4 A (directed away from junction)</p>
              </div>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('practice3')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                Q3
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  How does Kirchhoff&apos;s Junction Rule verify the current division in parallel circuits (e.g. Two 8 Ω resistors with 6 V battery)?
                </h5>
                <p className="text-xs text-slate-400">Classroom Connection to the WhatsApp Assignment</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30">
                {revealedSolutions.practice3 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.practice3 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.practice3 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-slate-200">
                <p>
                  In the parallel circuit assignment:
                </p>
                <p className="font-mono text-cyan-300">
                  Total incoming current from the 6 V battery is I = 1.5 A.
                </p>
                <p className="font-mono text-emerald-300">
                  At junction J₁, this current splits into branch 1 (I₁ = 6/8 = 0.75 A) and branch 2 (I₂ = 6/8 = 0.75 A).
                </p>
                <p className="font-mono text-amber-300">
                  At junction J₁: I = I₁ + I₂ ⟹ 1.5 A = 0.75 A + 0.75 A (Verified ✓)
                </p>
                <p className="font-mono text-purple-300">
                  At junction J₂: The two currents re-combine: 0.75 A + 0.75 A = 1.5 A (Returning to battery ✓)
                </p>
                <p className="text-slate-300 pt-1">
                  This proves that Kirchhoff&apos;s First Law governs all parallel resistor networks in your syllabus!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
