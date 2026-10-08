import React, { useState } from 'react';
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
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Activity,
  Flame,
  TrendingDown,
  TrendingUp,
  Compass
} from 'lucide-react';

interface LoopPreset {
  id: string;
  name: string;
  description: string;
  emf: number; // Volts
  r1: number; // Ohms
  r2: number; // Ohms
  r3?: number; // Ohms (optional)
  note: string;
}

export const KirchhoffsSecondLawSection: React.FC = () => {
  // Animation control
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [traversalStep, setTraversalStep] = useState<number>(0); // 0: All, 1: Battery (A->B), 2: R1 (B->C), 3: R2 (C->D)

  // Active preset
  const [activePresetId, setActivePresetId] = useState<string>('preset1');

  // Interactive circuit parameters
  const [emf, setEmf] = useState<number>(12); // Battery EMF in Volts
  const [r1, setR1] = useState<number>(2); // Resistor 1 in Ohms
  const [r2, setR2] = useState<number>(4); // Resistor 2 in Ohms
  const [r3, setR3] = useState<number>(0); // Optional Resistor 3 in Ohms

  // Unknown EMF quiz solver state
  const [studentEmfAnswer, setStudentEmfAnswer] = useState<string>('');
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Hidden solutions state for practice questions
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({
    kvl_q1: false,
    kvl_q2: false,
    kvl_q3: false
  });

  // Presets definition
  const presets: LoopPreset[] = [
    {
      id: 'preset1',
      name: 'Standard Textbook Loop (12V = 4V + 8V)',
      description: 'Classic AP SSC Board closed loop: 12V battery with 2 Ω and 4 Ω resistors in series.',
      emf: 12,
      r1: 2,
      r2: 4,
      r3: 0,
      note: 'I = 2A ⟹ V₁ = 4V, V₂ = 8V. Total Drop = 4 + 8 = 12V = EMF.'
    },
    {
      id: 'preset2',
      name: '3-Resistor Loop (24V = 6V + 8V + 10V)',
      description: 'Three resistors (3 Ω, 4 Ω, 5 Ω) across a 24V source proving multi-component energy conservation.',
      emf: 24,
      r1: 3,
      r2: 4,
      r3: 5,
      note: 'I = 2A ⟹ V₁ = 6V, V₂ = 8V, V₃ = 10V. Total Drop = 24V = EMF.'
    },
    {
      id: 'preset3',
      name: 'Class 10 Core Board Numerical (6V = 2V + 4V)',
      description: 'Standard 6V cell powering a 1 Ω and 2 Ω resistor loop.',
      emf: 6,
      r1: 1,
      r2: 2,
      r3: 0,
      note: 'I = 2A ⟹ V₁ = 2V, V₂ = 4V. Total Drop = 6V = EMF.'
    },
    {
      id: 'preset_unknown',
      name: 'Board PYQ: Find Source EMF (V₁ = 5V, V₂ = 7V)',
      description: 'Given voltage drop across R₁ is 5V and across R₂ is 7V. Find the total EMF of the battery.',
      emf: 12,
      r1: 2.5,
      r2: 3.5,
      r3: 0,
      note: 'EMF = V₁ + V₂ = 5V + 7V = 12V!'
    }
  ];

  // Handle selecting a preset
  const handleSelectPreset = (preset: LoopPreset) => {
    setActivePresetId(preset.id);
    setEmf(preset.emf);
    setR1(preset.r1);
    setR2(preset.r2);
    setR3(preset.r3 || 0);
    if (preset.id === 'preset_unknown') {
      setStudentEmfAnswer('');
      setIsAnswerChecked(false);
      setIsAnswerCorrect(null);
    }
  };

  // Calculations
  const rTotal = r1 + r2 + (r3 || 0);
  const current = rTotal > 0 ? emf / rTotal : 0;
  const v1 = current * r1;
  const v2 = current * r2;
  const v3 = current * (r3 || 0);
  const totalDrop = v1 + v2 + v3;
  const isEnergyConserved = Math.abs(emf - totalDrop) < 0.05;

  // Power calculations (Energy Conservation: Power supplied = Power dissipated)
  const powerSupplied = emf * current;
  const powerDissipated = Math.pow(current, 2) * rTotal;

  // Animation duration
  const animDuration = animSpeed === 'fast' ? '1.2s' : animSpeed === 'slow' ? '4s' : '2.2s';

  const toggleSolution = (key: string) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const checkStudentQuiz = () => {
    const val = parseFloat(studentEmfAnswer);
    if (isNaN(val)) return;
    setIsAnswerChecked(true);
    setIsAnswerCorrect(Math.abs(val - 12.0) < 0.1);
  };

  return (
    <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 sm:p-7 space-y-7 text-white shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Project Work Compartment Special</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span>Law of Conservation of Energy</span>
            </span>
            <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              KVL / Loop Rule (∑V = EMF)
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>Kirchhoff&apos;s Second Law (Loop Rule / Voltage Law)</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            <strong>Statement:</strong> In any closed loop of an electrical circuit, the algebraic sum of the potential differences across all circuit elements is equal to zero (<strong>∑ΔV = 0</strong>), which means: <span className="text-amber-300 font-bold">Sum of Potential Differences (Voltage Drops) = Electromotive Force (EMF) of the Source (∑V = EMF)</span>. This law is based strictly on the fundamental <strong>Law of Conservation of Energy</strong>.
          </p>
        </div>

        {/* Animation & Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-slate-950" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'Pause Tracing' : 'Play Tracing'}</span>
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
                animSpeed === 'normal' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              type="button"
              onClick={() => setAnimSpeed('fast')}
              className={`px-2 py-1 rounded-lg font-bold cursor-pointer ${
                animSpeed === 'fast' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'
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
          Select Numerical Loop Example or Board Exam Case:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activePresetId === p.id
                  ? 'bg-amber-950/60 border-amber-400/80 shadow-md ring-1 ring-amber-400/40'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div>
                <span className={`text-xs font-black block ${activePresetId === p.id ? 'text-amber-300' : 'text-white'}`}>
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
      {/* ANIMATED CLOSED LOOP CIRCUIT DIAGRAM (VECTOR SVG)        */}
      {/* ======================================================== */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 sm:p-7 relative overflow-hidden space-y-4">
        {/* CSS for animated loop traversal */}
        <style>{`
          @keyframes clockwise-loop-flow {
            0% { stroke-dashoffset: 80; }
            100% { stroke-dashoffset: 0; }
          }
          .loop-tracer {
            stroke-dasharray: 10 14;
            animation: clockwise-loop-flow ${animDuration} linear infinite;
          }
        `}</style>

        {/* Live Energy Balance Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Live Closed Loop Traversal: Node A → B → C → D → A
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
              EMF (Source) = +{emf.toFixed(1)} V
            </span>
            <span className="text-slate-500 font-black">=</span>
            <span className="px-3 py-1 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-bold">
              Sum of Drops (V₁ + V₂) = {totalDrop.toFixed(1)} V
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-300 font-bold">
              Net Loop Change = 0.0 V
            </span>
          </div>
        </div>

        {/* SVG Circuit Diagram */}
        <div className="w-full overflow-x-auto flex justify-center py-2">
          <svg
            viewBox="0 0 840 440"
            className="w-full max-w-4xl h-auto select-none"
            style={{ minWidth: '600px' }}
          >
            {/* Background Pattern */}
            <defs>
              <pattern id="grid-dots-kvl" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#334155" opacity="0.35" />
              </pattern>
              {/* Radial glow for battery */}
              <radialGradient id="battery-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#022c22" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="840" height="440" fill="url(#grid-dots-kvl)" rx="16" />

            {/* Traversal loop direction arrow circular indicator in the center */}
            <circle cx="420" cy="220" r="65" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" />
            {/* Clockwise curved arrow in center */}
            <path
              d="M 420,155 A 65,65 0 0,1 485,220"
              fill="none"
              stroke="#eab308"
              strokeWidth="3.5"
            />
            <polygon points="485,220 478,210 492,212" fill="#eab308" />
            <text x="420" y="215" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">
              TRAVERSAL
            </text>
            <text x="420" y="235" fill="#ffffff" fontSize="11" fontWeight="mono" textAnchor="middle">
              Clockwise ↻
            </text>

            {/* ======================================================== */}
            {/* CLOSED RECTANGULAR WIRE LOOP (A -> B -> C -> D -> A)     */}
            {/* Loop perimeter: Left: 140, Top: 80, Right: 700, Bottom: 360 */}
            {/* ======================================================== */}

            {/* Underwire (Copper solid path) */}
            <rect
              x="140"
              y="80"
              width="560"
              height="280"
              rx="18"
              fill="none"
              stroke="#334155"
              strokeWidth="6"
            />

            {/* Animated Loop Traversal Tracer (Yellow/Cyan flowing electrons) */}
            {isPlaying && (
              <rect
                x="140"
                y="80"
                width="560"
                height="280"
                rx="18"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                className="loop-tracer"
              />
            )}

            {/* Four Loop Vertices (A, B, C, D) */}
            {/* Vertex A (Bottom-Left: 140, 360) */}
            <circle cx="140" cy="360" r="8" fill="#06b6d4" />
            <circle cx="140" cy="360" r="3" fill="#ffffff" />
            <text x="115" y="385" fill="#38bdf8" fontSize="16" fontWeight="black">
              Node A
            </text>

            {/* Vertex B (Top-Left: 140, 80) */}
            <circle cx="140" cy="80" r="8" fill="#06b6d4" />
            <circle cx="140" cy="80" r="3" fill="#ffffff" />
            <text x="115" y="65" fill="#38bdf8" fontSize="16" fontWeight="black">
              Node B
            </text>

            {/* Vertex C (Top-Right: 700, 80) */}
            <circle cx="700" cy="80" r="8" fill="#06b6d4" />
            <circle cx="700" cy="80" r="3" fill="#ffffff" />
            <text x="715" y="65" fill="#38bdf8" fontSize="16" fontWeight="black">
              Node C
            </text>

            {/* Vertex D (Bottom-Right: 700, 360) */}
            <circle cx="700" cy="360" r="8" fill="#06b6d4" />
            <circle cx="700" cy="360" r="3" fill="#ffffff" />
            <text x="715" y="385" fill="#38bdf8" fontSize="16" fontWeight="black">
              Node D
            </text>

            {/* ======================================================== */}
            {/* BOTTOM BRANCH (D to A): BATTERY (EMF SOURCE) & KEY       */}
            {/* Current flows from Positive (+) terminal to Negative (-) */}
            {/* ======================================================== */}
            <rect x="330" y="325" width="180" height="70" rx="12" fill="#064e3b" stroke="#22c55e" strokeWidth="2" />

            {/* Battery Cells Plates */}
            {/* Cell 1: Long positive, short negative */}
            <line x1="390" y1="340" x2="390" y2="380" stroke="#22c55e" strokeWidth="4.5" />
            <line x1="405" y1="348" x2="405" y2="372" stroke="#ef4444" strokeWidth="6" />
            <line x1="405" y1="360" x2="425" y2="360" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Cell 2 */}
            <line x1="425" y1="340" x2="425" y2="380" stroke="#22c55e" strokeWidth="4.5" />
            <line x1="440" y1="348" x2="440" y2="372" stroke="#ef4444" strokeWidth="6" />

            <text x="375" y="348" fill="#22c55e" fontSize="15" fontWeight="black">
              +
            </text>
            <text x="455" y="348" fill="#ef4444" fontSize="15" fontWeight="black">
              −
            </text>

            <text x="420" y="390" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
              EMF SOURCE (Energy Supplier)
            </text>
            <text x="420" y="415" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">
              EMF (ℰ) = +{emf.toFixed(1)} V
            </text>

            {/* Arrow on bottom branch showing conventional current I */}
            <polygon points="260,355 245,360 260,365" fill="#38bdf8" />
            <text x="252" y="348" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
              I = {current.toFixed(2)} A
            </text>

            {/* Plug Key (Closed) on bottom branch */}
            <circle cx="560" cy="360" r="12" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="560" cy="360" r="4" fill="#22c55e" />
            <text x="560" y="388" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
              Key (K) Closed
            </text>

            {/* Potential Gain Badge at Battery */}
            <rect x="290" y="275" width="260" height="32" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="1.5" />
            <text x="420" y="295" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">
              POTENTIAL RISE: ΔV_battery = +{emf.toFixed(1)} V
            </text>

            {/* ======================================================== */}
            {/* TOP BRANCH (B to C): RESISTOR R1                         */}
            {/* ======================================================== */}
            {/* Current flows Left-to-Right (B to C) */}
            <polygon points="250,75 265,80 250,85" fill="#38bdf8" />
            <text x="257" y="68" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
              I = {current.toFixed(2)} A
            </text>

            {/* Resistor R1 Zig-zag */}
            <path
              d="M 330,80 L 345,65 L 360,95 L 375,65 L 390,95 L 405,65 L 420,95 L 435,65 L 450,80 L 510,80"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* R1 Callout Box */}
            <rect x="345" y="15" width="160" height="46" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
            <text x="425" y="33" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
              RESISTOR R₁ = {r1.toFixed(1)} Ω
            </text>
            <text x="425" y="51" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
              Drop V₁ = −{v1.toFixed(1)} V (I·R₁)
            </text>

            {/* Potential Drop Badge at Top */}
            <rect x="330" y="105" width="190" height="26" rx="6" fill="#1e1e2e" stroke="#f59e0b" strokeWidth="1" />
            <text x="425" y="122" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
              POTENTIAL DROP: V₁ = {v1.toFixed(1)} V
            </text>

            {/* ======================================================== */}
            {/* RIGHT BRANCH (C to D): RESISTOR R2                        */}
            {/* ======================================================== */}
            {/* Current flows Top-to-Bottom (C to D) */}
            <polygon points="695,160 700,175 705,160" fill="#38bdf8" />
            <text x="735" y="172" fill="#38bdf8" fontSize="12" fontWeight="bold">
              I = {current.toFixed(2)} A
            </text>

            {/* Resistor R2 Zig-zag on vertical branch */}
            <path
              d="M 700,190 L 685,205 L 715,220 L 685,235 L 715,250 L 685,265 L 715,280 L 700,295"
              fill="none"
              stroke="#ec4899"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* R2 Callout Box */}
            <rect x="670" y="200" width="155" height="46" rx="8" fill="#831843" stroke="#ec4899" strokeWidth="2" />
            <text x="747" y="218" fill="#fbcfe8" fontSize="11" fontWeight="bold" textAnchor="middle">
              RESISTOR R₂ = {r2.toFixed(1)} Ω
            </text>
            <text x="747" y="236" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
              Drop V₂ = −{v2.toFixed(1)} V (I·R₂)
            </text>

            {/* Potential Drop Badge at Right */}
            <rect x="670" y="255" width="155" height="26" rx="6" fill="#1e1e2e" stroke="#ec4899" strokeWidth="1" />
            <text x="747" y="272" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">
              POTENTIAL DROP: V₂ = {v2.toFixed(1)} V
            </text>

            {/* ======================================================== */}
            {/* OPTIONAL RESISTOR R3 ON LEFT BRANCH (A to B)             */}
            {/* ======================================================== */}
            {r3 > 0 && (
              <>
                <path
                  d="M 140,190 L 125,205 L 155,220 L 125,235 L 155,250 L 125,265 L 155,280 L 140,295"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                <rect x="15" y="205" width="115" height="44" rx="8" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
                <text x="72" y="223" fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  R₃ = {r3.toFixed(1)} Ω
                </text>
                <text x="72" y="239" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">
                  V₃ = −{v3.toFixed(1)} V
                </text>
              </>
            )}

            {/* Bottom-left Formula Verification Stamp */}
            <rect x="25" y="15" width="220" height="52" rx="10" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
            <text x="135" y="34" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">
              KIRCHHOFF&apos;S LOOP VERIFICATION
            </text>
            <text x="135" y="53" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">
              EMF = V₁ + V₂ = {emf.toFixed(1)} V ✓
            </text>
          </svg>
        </div>

        {/* Potential Step-Ladder Visualization */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Energy Step-Ladder Around Loop ABCDA: Net Work Done = 0 Joules</span>
            </span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              + {emf.toFixed(1)}V (Gain) − {v1.toFixed(1)}V (Drop) − {v2.toFixed(1)}V (Drop) = 0.0 V
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
            {/* Step 1: Battery Gain */}
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl space-y-1">
              <span className="text-[10px] text-emerald-300 font-bold uppercase block">1. Path D → A (Battery)</span>
              <span className="text-lg font-black text-emerald-400 font-mono block">+{emf.toFixed(1)} V</span>
              <p className="text-[11px] text-slate-300">
                Charge gains chemical energy: <code className="text-emerald-300">+q·ℰ</code>
              </p>
            </div>

            {/* Step 2: Wire A -> B */}
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">2. Path A → B (Wire)</span>
              <span className="text-lg font-black text-slate-400 font-mono block">0.0 V</span>
              <p className="text-[11px] text-slate-400">
                Ideal connecting wire (Resistance ≈ 0 Ω)
              </p>
            </div>

            {/* Step 3: Resistor R1 Drop */}
            <div className="bg-amber-950/60 border border-amber-500/40 p-3 rounded-xl space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase block">3. Path B → C (Resistor R₁)</span>
              <span className="text-lg font-black text-amber-400 font-mono block">−{v1.toFixed(1)} V</span>
              <p className="text-[11px] text-slate-300">
                Energy lost as heat: <code className="text-amber-300">−q·(I·R₁)</code>
              </p>
            </div>

            {/* Step 4: Resistor R2 Drop */}
            <div className="bg-rose-950/60 border border-rose-500/40 p-3 rounded-xl space-y-1">
              <span className="text-[10px] text-rose-300 font-bold uppercase block">4. Path C → D (Resistor R₂)</span>
              <span className="text-lg font-black text-rose-400 font-mono block">−{v2.toFixed(1)} V</span>
              <p className="text-[11px] text-slate-300">
                Energy lost as heat: <code className="text-rose-300">−q·(I·R₂)</code>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SOLVE FOR UNKNOWN EMF QUIZ (BOARD EXAM PYQ)              */}
      {/* ======================================================== */}
      {activePresetId === 'preset_unknown' && (
        <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>AP SSC Board Numerical: Find the Source EMF from Voltage Drops</span>
            </h4>
            <span className="text-xs font-mono bg-amber-950 px-2.5 py-0.5 rounded border border-amber-500/40 text-amber-200">
              2 Marks Question
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200">
            A battery of unknown EMF (ℰ) is connected across two resistors in series. A voltmeter measures a potential difference of <code className="text-amber-300 font-bold">V₁ = 5 V</code> across the first resistor and <code className="text-rose-300 font-bold">V₂ = 7 V</code> across the second resistor. By applying Kirchhoff&apos;s Second Law, calculate the EMF of the battery.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-bold">EMF (ℰ) =</span>
              <input
                type="text"
                placeholder="Enter value in Volts"
                value={studentEmfAnswer}
                onChange={(e) => setStudentEmfAnswer(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white font-mono w-40 focus:border-amber-400 focus:outline-none"
              />
              <span className="text-xs text-slate-400">Volts (V)</span>
            </div>

            <button
              type="button"
              onClick={checkStudentQuiz}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
            >
              Verify Answer
            </button>
          </div>

          {isAnswerChecked && isAnswerCorrect === true && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Correct! Source EMF = 12 Volts (V)</span>
              </div>
              <p className="font-mono text-slate-200">
                Formula: ∑V = EMF ⟹ ℰ = V₁ + V₂ ⟹ ℰ = 5 V + 7 V = <strong>12 Volts</strong>!
              </p>
            </div>
          )}

          {isAnswerChecked && isAnswerCorrect === false && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 rounded-xl text-xs text-red-300">
              Incorrect. By Kirchhoff&apos;s Second Law, EMF = V₁ + V₂. So EMF = 5 + 7 = 12 V.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* INTERACTIVE DYNAMIC SLIDERS SANDBOX                      */}
      {/* ======================================================== */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>Interactive Custom Circuit Sandbox: Adjust EMF &amp; Resistors</span>
          </h4>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/30">
            Real-Time Law of Conservation Validation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* EMF Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-emerald-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-emerald-300">Source EMF (ℰ)</span>
              <span className="text-emerald-400 font-mono">{emf} Volts</span>
            </div>
            <input
              type="range"
              min="2"
              max="24"
              step="1"
              value={emf}
              onChange={(e) => {
                setEmf(parseFloat(e.target.value));
                setActivePresetId('custom');
              }}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>2V</span>
              <span>6V</span>
              <span>12V</span>
              <span>24V</span>
            </div>
          </div>

          {/* R1 Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-amber-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-amber-300">Resistor R₁</span>
              <span className="text-amber-400 font-mono">{r1.toFixed(1)} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={r1}
              onChange={(e) => {
                setR1(parseFloat(e.target.value));
                setActivePresetId('custom');
              }}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Drop V₁ = {(current * r1).toFixed(1)} V</span>
          </div>

          {/* R2 Slider */}
          <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-rose-500/20">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-rose-300">Resistor R₂</span>
              <span className="text-rose-400 font-mono">{r2.toFixed(1)} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={r2}
              onChange={(e) => {
                setR2(parseFloat(e.target.value));
                setActivePresetId('custom');
              }}
              className="w-full accent-rose-400 cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block font-mono">Drop V₂ = {(current * r2).toFixed(1)} V</span>
          </div>
        </div>

        {/* Live Energy Conservation Telemetry Banner */}
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-slate-300">
              <strong>Conservation of Energy Check:</strong> Electric Power Supplied (P = ℰ·I) = Heat Power Dissipated (P = I²·R_total):
            </span>
          </div>
          <span className="font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30 shrink-0">
            {powerSupplied.toFixed(1)} W Supplied = {powerDissipated.toFixed(1)} W Dissipated (100% Balanced ✓)
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DEEP CONCEPTUAL BREAKDOWN & LAW OF CONSERVATION OF ENERGY */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card 1: Core Physics & Sign Conventions */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span>1. Kirchhoff&apos;s Second Law &amp; Standard Sign Conventions</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Gustav Kirchhoff&apos;s <strong>Second Law</strong> (also called the <strong>Loop Rule</strong> or <strong>Kirchhoff&apos;s Voltage Law (KVL)</strong>) applies to any closed conducting loop in a circuit:
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-1.5">
            <p className="text-amber-400 font-bold">∑ ΔV = 0 (Around any closed loop, total change in potential is zero)</p>
            <p className="pt-1 text-slate-300">Standard Sign Conventions for Loop Traversal:</p>
            <p>• <strong>Through a resistor in direction of current:</strong> Potential drops ⟹ <span className="text-rose-400">ΔV = −I·R</span></p>
            <p>• <strong>Through a resistor against direction of current:</strong> Potential rises ⟹ <span className="text-emerald-400">ΔV = +I·R</span></p>
            <p>• <strong>Through a cell from negative to positive terminal:</strong> Potential rises ⟹ <span className="text-emerald-400">ΔV = +ℰ</span></p>
            <p>• <strong>Through a cell from positive to negative terminal:</strong> Potential drops ⟹ <span className="text-rose-400">ΔV = −ℰ</span></p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Following clockwise loop ABCDA: <code className="text-emerald-300">+ℰ − I·R₁ − I·R₂ = 0 ⟹ ℰ = I·R₁ + I·R₂ = V₁ + V₂</code>!
          </p>
        </div>

        {/* Card 2: Why KVL is Based on Law of Conservation of Energy */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Scale className="w-5 h-5 text-cyan-400" />
            <span>2. Why KVL is Based on Law of Conservation of Energy</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Electric potential difference (V) is defined as work done per unit electric charge: <code className="text-amber-300">V = W / q ⟹ W = q × V</code>.
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-1.5">
            <p>1. Work done on charge q by battery EMF source:</p>
            <p className="text-emerald-400">W_supplied = q × ℰ (Energy added to the charge)</p>
            <p className="pt-1">2. Work done (energy lost as heat) passing through resistors:</p>
            <p className="text-rose-400">W_lost = q × V₁ + q × V₂ = q × (I·R₁ + I·R₂)</p>
            <p className="pt-1 text-cyan-300 font-bold">By Law of Conservation of Energy:</p>
            <p className="text-cyan-400 font-black">Net Work in Closed Loop = 0 ⟹ W_supplied − W_lost = 0</p>
            <p className="text-amber-300 font-bold">q × ℰ = q × (V₁ + V₂) ⟹ ℰ = V₁ + V₂ (EMF = Sum of p.d.)</p>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong>Board Exam Takeaway:</strong> Electrostatic force is a <em>conservative force</em>. Moving a test charge completely around any closed path returns it to its original electrical potential energy, proving that total energy is strictly conserved.
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PRACTICE BOARD NUMERICALS WITH HIDDEN SOLUTIONS          */}
      {/* ======================================================== */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>AP SSC Public Exam Practice Numericals (Click to Reveal Hidden Answers)</span>
        </h4>

        {/* Question 1 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('kvl_q1')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/30">
                Q1
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  State Kirchhoff&apos;s Loop Rule (Second Law) and write its formula. On what conservation law is it based?
                </h5>
                <p className="text-xs text-slate-400">Standard 2-Marks Board Question</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/30">
                {revealedSolutions.kvl_q1 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.kvl_q1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.kvl_q1 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                <p className="text-slate-200">
                  <strong>Statement:</strong> In any closed conducting loop of a circuit, the algebraic sum of the changes in electrical potential is equal to zero (or the total electromotive force supplied is equal to the sum of potential drops across all resistors).
                </p>
                <p className="font-mono text-amber-400 font-bold">
                  Mathematical form: ∑ ΔV = 0  or  EMF (ℰ) = V₁ + V₂ + ... = ∑ (I·R)
                </p>
                <p className="text-slate-300">
                  <strong>Underlying Principle:</strong> It is based on the <strong>Law of Conservation of Energy</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Question 2 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('kvl_q2')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 border border-cyan-500/30">
                Q2
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  A closed circuit has a 12 V battery connected in series with resistors of 3 Ω and 9 Ω. Calculate the current and find the potential difference across each resistor.
                </h5>
                <p className="text-xs text-slate-400">Numerical Problem verifying ∑V = EMF</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
                {revealedSolutions.kvl_q2 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.kvl_q2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.kvl_q2 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-slate-200 space-y-1.5">
                <p>Given: EMF = 12 V, R₁ = 3 Ω, R₂ = 9 Ω</p>
                <p>1. Total Resistance R_total = R₁ + R₂ = 3 + 9 = 12 Ω</p>
                <p>2. Electric Current I = EMF / R_total = 12 V / 12 Ω = 1.0 A</p>
                <p>3. Potential Difference across R₁: V₁ = I × R₁ = 1.0 A × 3 Ω = 3.0 V</p>
                <p>4. Potential Difference across R₂: V₂ = I × R₂ = 1.0 A × 9 Ω = 9.0 V</p>
                <p className="text-emerald-400 font-bold">
                  Verification by KVL: V₁ + V₂ = 3 V + 9 V = 12 V = EMF (Verified ✓)
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Question 3 */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSolution('kvl_q3')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                Q3
              </span>
              <div>
                <h5 className="text-sm font-bold text-white">
                  Compare Kirchhoff&apos;s First Law (Junction Rule) and Second Law (Loop Rule) on the basis of their conservation principles.
                </h5>
                <p className="text-xs text-slate-400">High-Scoring Comparison Table Question</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30">
                {revealedSolutions.kvl_q3 ? 'Hide Answer' : 'Show Hidden Answer'}
              </span>
              {revealedSolutions.kvl_q3 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>

          {revealedSolutions.kvl_q3 && (
            <div className="p-4 pt-1 border-t border-slate-800 bg-slate-900/40 text-xs sm:text-sm space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="p-2.5 font-bold">Feature</th>
                      <th className="p-2.5 font-bold text-emerald-300">Kirchhoff&apos;s 1st Law (KCL)</th>
                      <th className="p-2.5 font-bold text-amber-300">Kirchhoff&apos;s 2nd Law (KVL)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-400">Alternate Name</td>
                      <td className="p-2.5">Junction Rule / Current Law</td>
                      <td className="p-2.5">Loop Rule / Mesh Rule / Voltage Law</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-400">Mathematical Form</td>
                      <td className="p-2.5 font-mono text-emerald-400">∑ I = 0 (∑I_in = ∑I_out)</td>
                      <td className="p-2.5 font-mono text-amber-400">∑ ΔV = 0 (EMF = ∑V)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-400">Underlying Conservation Law</td>
                      <td className="p-2.5 font-bold text-cyan-300">Law of Conservation of CHARGE</td>
                      <td className="p-2.5 font-bold text-cyan-300">Law of Conservation of ENERGY</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-400">Where Applied</td>
                      <td className="p-2.5">At any junction/node in a circuit</td>
                      <td className="p-2.5">Around any closed loop or mesh</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
