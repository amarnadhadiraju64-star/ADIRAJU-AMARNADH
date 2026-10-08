import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Sliders,
  Copy,
  Check,
  Pause,
  Play,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Lightbulb,
  Maximize2
} from 'lucide-react';

export const SeriesDerivationWhatsAppView: React.FC = () => {
  // Circuit interactivity
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12); // Volts
  const [r1, setR1] = useState<number>(2); // Ohms
  const [r2, setR2] = useState<number>(4); // Ohms
  const [r3, setR3] = useState<number>(6); // Ohms
  const [copied, setCopied] = useState<boolean>(false);
  const [diagramFontSize, setDiagramFontSize] = useState<'large' | 'xl' | 'xxl'>('xl');

  // Dynamic font sizing for crystal-clear legibility inside the diagram
  const fontSizes = useMemo(() => {
    switch (diagramFontSize) {
      case 'xxl':
        return {
          stepTitle: 16,
          badgeEq: 18,
          step2Box: 28,
          step34Eq: 26,
          step5Box: 36,
          liveProof: 16,
        };
      case 'xl':
        return {
          stepTitle: 15,
          badgeEq: 17,
          step2Box: 25,
          step34Eq: 24,
          step5Box: 32,
          liveProof: 15,
        };
      case 'large':
      default:
        return {
          stepTitle: 14,
          badgeEq: 16,
          step2Box: 22,
          step34Eq: 21,
          step5Box: 28,
          liveProof: 14,
        };
    }
  }, [diagramFontSize]);

  // Electrical computations
  const rEquivalent = useMemo(() => r1 + r2 + r3, [r1, r2, r3]);

  const { currentAmp, v1, v2, v3, vEq } = useMemo(() => {
    if (!isKeyClosed || rEquivalent === 0) {
      return { currentAmp: 0, v1: 0, v2: 0, v3: 0, vEq: 0 };
    }
    const i = Number((batteryVoltage / rEquivalent).toFixed(2));
    const volt1 = Number((i * r1).toFixed(2));
    const volt2 = Number((i * r2).toFixed(2));
    const volt3 = Number((i * r3).toFixed(2));
    const totalV = Number((volt1 + volt2 + volt3).toFixed(2));
    return {
      currentAmp: i,
      v1: volt1,
      v2: volt2,
      v3: volt3,
      vEq: totalV,
    };
  }, [isKeyClosed, batteryVoltage, rEquivalent, r1, r2, r3]);

  // Copy notes in simple memorized language
  const handleCopyNotes = () => {
    const text = `RESISTORS IN SERIES COMBINATION (AP SSC CLASS 10 PHYSICS)

DERIVATION OF R = R1 + R2 + R3:
---------------------------------------------
1. In a series combination, all resistors are connected end-to-end.
2. The same electric current (i) flows through all resistors:
   i1 = i2 = i3 = i
3. The total potential difference (V_equivalent) across the combination equals the sum of potential differences across individual resistors:
   [ V_equivalent = V1 + V2 + V3 ]

4. According to Ohm's Law (V = i · R):
   V1 = i · R1   ---- ①
   V2 = i · R2   ---- ②
   V3 = i · R3   ---- ③
   V_eq = i · R_eq  -- ④

5. Substituting ①, ②, ③, and ④ in the voltage equation:
   V_eq = V1 + V2 + V3
   i · R_eq = i · R1 + i · R2 + i · R3
   i · R_eq = i · (R1 + R2 + R3)

6. Dividing both sides by common current (i):
   [ R_eq = R1 + R2 + R3 ]

FOUR FUNDAMENTAL STATEMENTS & APPLICATIONS (MEMORIZED SIMPLE LANGUAGE):
-----------------------------------------------------------------------
1. EQUIVALENT RESISTANCE IS SUM OF INDIVIDUAL RESISTANCES:
   In a series combination, the equivalent resistance (R_eq) is equal to the sum of the individual resistances of all resistors (R_eq = R1 + R2 + R3).

2. EQUIVALENT RESISTANCE IS ALWAYS GREATER:
   The equivalent resistance is always greater than any individual resistance in the combination (R_eq > R1, R_eq > R2, R_eq > R3).

3. TOTAL RESISTANCE IN CIRCUIT INCREASES:
   Therefore, the total electrical resistance in a circuit is increased by connecting resistors in a series combination.

4. SINGLE PATH & OPEN CIRCUIT RULE:
   A series combination provides only a single path for the flow of electric current through all resistors. If the circuit opens (or breaks) at any point, no current flows through all resistors.

5. WHY ELECTRIC FUSE IS ALWAYS CONNECTED IN SERIES:
   An electric fuse is always connected in series so that the entire electric current must pass through it. When excessive current flows due to an overload or short-circuit, the fuse wire melts and breaks the circuit, immediately stopping current flow and protecting appliances from damage.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner matching WhatsApp Notebook */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                AP SSC Core Physics Proof
              </span>
              <span>·</span>
              <span>Class 10 Textbook & Class Notes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resistors in Series Combination: R = R₁ + R₂ + R₃
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete step-by-step mathematical proof, clear animated circuit diagram matching the handwritten notebook notes, and the 4 fundamental exam statements written in memorized simple language.
            </p>
          </div>

          <button
            onClick={handleCopyNotes}
            className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-950" />
                <span>Notes Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Memorized Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ANIMATED CIRCUIT DIAGRAM (Matching the exact WhatsApp Image) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Scientific Schematic • Animated Lab Circuit
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Animated Diagram: Resistors in Series Combination</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Featuring series resistors R₁, R₂, R₃, individual voltmeters V₁, V₂, V₃, master voltmeter V_eq, and ammeter (A).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Diagram Font Size Booster Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 px-2 font-medium">Text Size:</span>
              <button
                onClick={() => setDiagramFontSize('large')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  diagramFontSize === 'large'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Large
              </button>
              <button
                onClick={() => setDiagramFontSize('xl')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  diagramFontSize === 'xl'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Extra Large (XL)
              </button>
              <button
                onClick={() => setDiagramFontSize('xxl')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  diagramFontSize === 'xxl'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Maximum (XXL)
              </button>
            </div>

            {/* Key Switch Button */}
            <button
              onClick={() => setIsKeyClosed(!isKeyClosed)}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm ${
                isKeyClosed
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-rose-500 hover:bg-rose-400 text-white animate-pulse'
              }`}
            >
              {isKeyClosed ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Key Closed (Circuit ON)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Key Open (Circuit Broken - Click to Close)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* SVG Animated Circuit Canvas */}
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
          <svg viewBox="0 0 960 840" className="w-full h-auto select-none">
            <defs>
              <style>{`
                @keyframes currentDash {
                  from { stroke-dashoffset: 24; }
                  to { stroke-dashoffset: 0; }
                }
                .flowing-current {
                  animation: currentDash 0.75s linear infinite;
                }
              `}</style>

              <linearGradient id="notebookGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#080c16" />
                <stop offset="100%" stopColor="#02040a" />
              </linearGradient>
              <linearGradient id="derivationChalkboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a1122" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>
            </defs>

            {/* Background Canvas */}
            <rect width="960" height="840" rx="16" fill="url(#notebookGrad)" />

            {/* Title watermark matching the WhatsApp notebook */}
            <text x="480" y="26" fill="#64748b" fontSize="15" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              Resistors in Series combination
            </text>

            {/* ========================================================================= */}
            {/* BASE CIRCUIT WIRE LOOPS */}
            {/* Left rail at x=70, Top rail at y=140, Right rail at x=890, Bottom rail at y=760 */}
            {/* ========================================================================= */}

            {/* Main Circuit Loop Wires */}
            <path
              d="M 70 760 L 70 140 L 160 140 M 270 140 L 380 140 M 490 140 L 600 140 M 710 140 L 890 140 L 890 760 L 70 760"
              fill="none"
              stroke="#334155"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Master Overarching Voltmeter V_eq bridge (from before R1 at x=150 to after R3 at x=810) */}
            <path
              d="M 150 140 L 150 65 L 440 65 M 520 65 L 810 65 L 810 140"
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Terminal contact dots for V_eq */}
            <circle cx="150" cy="140" r="5" fill="#f59e0b" />
            <circle cx="810" cy="140" r="5" fill="#f59e0b" />

            {/* Individual Voltmeter branches underneath each resistor: */}
            {/* V1 branch across R1 (from 160 to 270, drops to y=205) */}
            <path d="M 160 140 L 160 205 L 195 205 M 235 205 L 270 205 L 270 140" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="160" cy="140" r="4.5" fill="#38bdf8" />
            <circle cx="270" cy="140" r="4.5" fill="#38bdf8" />

            {/* V2 branch across R2 (from 380 to 490, drops to y=205) */}
            <path d="M 380 140 L 380 205 L 415 205 M 455 205 L 490 205 L 490 140" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="380" cy="140" r="4.5" fill="#38bdf8" />
            <circle cx="490" cy="140" r="4.5" fill="#38bdf8" />

            {/* V3 branch across R3 (from 600 to 710, drops to y=205) */}
            <path d="M 600 140 L 600 205 L 635 205 M 675 205 L 710 205 L 710 140" fill="none" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="600" cy="140" r="4.5" fill="#38bdf8" />
            <circle cx="710" cy="140" r="4.5" fill="#38bdf8" />

            {/* ========================================================================= */}
            {/* ANIMATED GLOWING CURRENT FLOW (Only when key is closed) */}
            {/* ========================================================================= */}
            {isKeyClosed && (
              <>
                {/* Left rail going UP */}
                <line
                  x1="70"
                  y1="760"
                  x2="70"
                  y2="140"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />
                {/* Top rail going RIGHT across all resistors */}
                <path
                  d="M 70 140 L 160 140 M 270 140 L 380 140 M 490 140 L 600 140 M 710 140 L 890 140"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />
                {/* Right rail going DOWN */}
                <line
                  x1="890"
                  y1="140"
                  x2="890"
                  y2="760"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />
                {/* Bottom rail going LEFT back to battery */}
                <line
                  x1="890"
                  y1="760"
                  x2="70"
                  y2="760"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />
              </>
            )}

            {/* Direction Arrows matching the WhatsApp photo */}
            <g opacity={isKeyClosed ? 1 : 0.25} fill="#f59e0b">
              {/* Current i arrow pointing UP on left */}
              <polygon points="66,330 70,315 74,330" />
              <text x="44" y="330" fill="#f59e0b" fontSize="16" fontWeight="bold" fontStyle="italic">i</text>

              {/* Current i arrow pointing RIGHT on top */}
              <polygon points="320,136 333,140 320,144" />
              <polygon points="540,136 553,140 540,144" />
              <polygon points="795,136 808,140 795,144" />
              <text x="815" y="132" fill="#f59e0b" fontSize="16" fontWeight="bold" fontStyle="italic">i</text>

              {/* Current i arrow pointing DOWN on right */}
              <polygon points="886,450 890,465 894,450" />
              <text x="910" y="465" fill="#f59e0b" fontSize="16" fontWeight="bold" fontStyle="italic">i</text>

              {/* Current i arrow pointing LEFT on bottom */}
              <polygon points="235,756 220,760 235,764" />
              <text x="195" y="785" fill="#f59e0b" fontSize="16" fontWeight="bold" fontStyle="italic">i</text>
            </g>

            {/* ========================================================================= */}
            {/* RESISTORS R1, R2, R3 (Top Rail) with High-Legibility Font */}
            {/* ========================================================================= */}

            {/* Resistor R1 */}
            <g transform="translate(160, 125)">
              <path
                d="M 0 15 L 14 15 L 21 3 L 36 27 L 51 3 L 66 27 L 81 3 L 96 27 L 103 15 L 110 15"
                fill="none"
                stroke={isKeyClosed ? '#38bdf8' : '#64748b'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="55" y="-6" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
                R₁ = {r1} Ω
              </text>
            </g>

            {/* Resistor R2 */}
            <g transform="translate(380, 125)">
              <path
                d="M 0 15 L 14 15 L 21 3 L 36 27 L 51 3 L 66 27 L 81 3 L 96 27 L 103 15 L 110 15"
                fill="none"
                stroke={isKeyClosed ? '#38bdf8' : '#64748b'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="55" y="-6" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
                R₂ = {r2} Ω
              </text>
            </g>

            {/* Resistor R3 */}
            <g transform="translate(600, 125)">
              <path
                d="M 0 15 L 14 15 L 21 3 L 36 27 L 51 3 L 66 27 L 81 3 L 96 27 L 103 15 L 110 15"
                fill="none"
                stroke={isKeyClosed ? '#38bdf8' : '#64748b'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="55" y="-6" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
                R₃ = {r3} Ω
              </text>
            </g>

            {/* ========================================================================= */}
            {/* VOLTMETERS: V1, V2, V3 (Connected in Parallel Underneath Each Resistor) */}
            {/* ========================================================================= */}

            {/* Voltmeter V1 */}
            <g transform="translate(215, 205)">
              <circle cx="0" cy="0" r="19" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="5" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">V₁</text>
              <text x="-27" y="-5" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
              <text x="21" y="-5" fill="#3b82f6" fontSize="14" fontWeight="bold">−</text>
              {/* Formula Callout: V1 = i R1 -> ① */}
              <text x="0" y="34" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V₁ = i · R₁ → ①
              </text>
            </g>

            {/* Voltmeter V2 */}
            <g transform="translate(435, 205)">
              <circle cx="0" cy="0" r="19" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="5" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">V₂</text>
              <text x="-27" y="-5" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
              <text x="21" y="-5" fill="#3b82f6" fontSize="14" fontWeight="bold">−</text>
              {/* Formula Callout: V2 = i R2 -> ② */}
              <text x="0" y="34" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V₂ = i · R₂ → ②
              </text>
            </g>

            {/* Voltmeter V3 */}
            <g transform="translate(655, 205)">
              <circle cx="0" cy="0" r="19" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="5" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">V₃</text>
              <text x="-27" y="-5" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
              <text x="21" y="-5" fill="#3b82f6" fontSize="14" fontWeight="bold">−</text>
              {/* Formula Callout: V3 = i R3 -> ③ */}
              <text x="0" y="34" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V₃ = i · R₃ → ③
              </text>
            </g>

            {/* ========================================================================= */}
            {/* OVERARCHING VOLTMETER V_eq (Connected across whole combination on top) */}
            {/* ========================================================================= */}
            <g transform="translate(480, 65)">
              <circle cx="0" cy="0" r="23" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="0" y="6" fill="#f59e0b" fontSize="16" fontWeight="bold" textAnchor="middle">V</text>
              <text x="-33" y="4" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
              <text x="27" y="4" fill="#3b82f6" fontSize="14" fontWeight="bold">−</text>

              {/* Callout Tag: Veq = i Req -> ④ matching WhatsApp notebook */}
              <g transform="translate(50, -16)">
                <rect x="0" y="0" width="220" height="32" rx="7" fill="#020617" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="110" y="21" fill="#fbbf24" fontSize="15" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  V_eq = i · R_eq → ④
                </text>
              </g>
              <text x="0" y="-30" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">
                Total Voltmeter ({vEq.toFixed(1)} V)
              </text>
            </g>

            {/* ========================================================================= */}
            {/* ALL STEPS OF THE DERIVATION SHOWN INSIDE THE CIRCUIT DIAGRAM (HIGH LEGIBILITY) */}
            {/* ========================================================================= */}
            <g transform="translate(115, 255)">
              {/* Derivation Chalkboard Card */}
              <rect
                x="0"
                y="0"
                width="730"
                height="455"
                rx="14"
                fill="url(#derivationChalkboardGrad)"
                stroke="#2563eb"
                strokeWidth="2.5"
              />

              {/* Header inside chalkboard */}
              <g transform="translate(365, 24)">
                <rect x="-190" y="-14" width="380" height="28" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                <text
                  x="0"
                  y="4"
                  fill="#f59e0b"
                  fontSize="13"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="1.5"
                >
                  ALL DERIVATION STEPS INSIDE CIRCUIT (NOTEBOOK PROOF)
                </text>
              </g>

              {/* STEP 1: Apply Ohm's Law (V = i * R) */}
              <text
                x="365"
                y="55"
                fill="#e2e8f0"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 1: Apply Ohm’s Law (V = i · R) across each resistor &amp; equivalent circuit:
              </text>

              {/* 4 Equation Badges for Step 1 */}
              <g transform="translate(25, 68)">
                {/* Equation 1 */}
                <rect x="0" y="0" width="155" height="36" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="77" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  V₁ = i · R₁  → ①
                </text>

                {/* Equation 2 */}
                <rect x="170" y="0" width="155" height="36" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="247" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  V₂ = i · R₂  → ②
                </text>

                {/* Equation 3 */}
                <rect x="340" y="0" width="155" height="36" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="417" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  V₃ = i · R₃  → ③
                </text>

                {/* Equation 4 */}
                <rect x="510" y="0" width="170" height="36" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="595" y="24" fill="#fbbf24" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  V_eq = i · R_eq  → ④
                </text>
              </g>

              {/* STEP 2: Total Potential Difference Equation */}
              <text
                x="365"
                y="130"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 2: Total potential difference equals sum of individual voltage drops:
              </text>

              {/* Boxed Equation [ V_equivalent = V1 + V2 + V3 ] */}
              <g transform="translate(45, 142)">
                <rect
                  x="0"
                  y="0"
                  width="640"
                  height="48"
                  rx="8"
                  fill="#78350f"
                  fillOpacity="0.45"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <text
                  x="320"
                  y="32"
                  fill="#fbbf24"
                  fontSize={fontSizes.step2Box}
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  [ V_equivalent = V₁ + V₂ + V₃ ]
                </text>
              </g>

              {/* STEP 3: Substitute Equations 1, 2, 3, 4 */}
              <text
                x="365"
                y="218"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 3: Substitute expressions from ①, ②, ③, and ④ into total voltage equation:
              </text>
              <text
                x="365"
                y="248"
                fill="#38bdf8"
                fontSize={fontSizes.step34Eq}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                i · R_eq = i · R₁ + i · R₂ + i · R₃
              </text>

              {/* STEP 4: Factor out common current (i) */}
              <text
                x="365"
                y="288"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 4: Factor out common current (i) on the right-hand side:
              </text>
              <text
                x="365"
                y="318"
                fill="#38bdf8"
                fontSize={fontSizes.step34Eq}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                i · R_eq = i · (R₁ + R₂ + R₃)
              </text>

              {/* STEP 5: Boxed Final Result [ R_eq = R1 + R2 + R3 ] */}
              <text
                x="365"
                y="358"
                fill="#34d399"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 5: Cancel common current (i ≠ 0) on both sides → Final Equivalent Resistance:
              </text>

              <g transform="translate(45, 370)">
                <rect
                  x="0"
                  y="0"
                  width="640"
                  height="54"
                  rx="10"
                  fill="#064e3b"
                  fillOpacity="0.6"
                  stroke="#10b981"
                  strokeWidth="3"
                />
                <text
                  x="320"
                  y="37"
                  fill="#34d399"
                  fontSize={fontSizes.step5Box}
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                >
                  [ R_eq = R₁ + R₂ + R₃ ]
                </text>
              </g>

              {/* Live Evaluation Bar inside the diagram */}
              <g transform="translate(45, 434)">
                <rect x="0" y="0" width="640" height="28" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="320" y="18" fill="#e2e8f0" fontSize={fontSizes.liveProof} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  Live Values: {rEquivalent} Ω = {r1} Ω + {r2} Ω + {r3} Ω  |  Current i = {currentAmp.toFixed(2)} A  |  V_eq = {vEq.toFixed(1)} V
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* AMMETER (A) ON LEFT VERTICAL RAIL */}
            {/* ========================================================================= */}
            <g transform="translate(70, 460)">
              <circle cx="0" cy="0" r="26" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="7" fill="#38bdf8" fontSize="20" fontWeight="bold" textAnchor="middle">A</text>
              <text x="0" y="-34" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
              <text x="0" y="42" fill="#3b82f6" fontSize="15" fontWeight="bold" textAnchor="middle">−</text>
              <text x="0" y="60" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                i = {currentAmp.toFixed(2)} A
              </text>
            </g>

            {/* ========================================================================= */}
            {/* BATTERY & PLUG KEY (Bottom Rail at y=760) */}
            {/* ========================================================================= */}

            {/* Battery: cells in series -||||- at (380, 760) */}
            <g transform="translate(380, 760)">
              <line x1="-45" y1="0" x2="-28" y2="0" stroke="#334155" strokeWidth="4.5" />
              {/* Cell 1 */}
              <line x1="-28" y1="-22" x2="-28" y2="22" stroke="#ef4444" strokeWidth="4.5" />
              <line x1="-18" y1="-13" x2="-18" y2="13" stroke="#3b82f6" strokeWidth="3" />
              {/* Cell 2 */}
              <line x1="-8" y1="-22" x2="-8" y2="22" stroke="#ef4444" strokeWidth="4.5" />
              <line x1="2" y1="-13" x2="2" y2="13" stroke="#3b82f6" strokeWidth="3" />
              {/* Cell 3 */}
              <line x1="12" y1="-22" x2="12" y2="22" stroke="#ef4444" strokeWidth="4.5" />
              <line x1="22" y1="-13" x2="22" y2="13" stroke="#3b82f6" strokeWidth="3" />
              <line x1="22" y1="0" x2="45" y2="0" stroke="#334155" strokeWidth="4.5" />

              <text x="-36" y="-26" fill="#ef4444" fontSize="15" fontWeight="bold">+</text>
              <text x="29" y="-26" fill="#3b82f6" fontSize="17" fontWeight="bold">−</text>
              <text x="0" y="36" fill="#cbd5e1" fontSize="14" fontWeight="bold" textAnchor="middle">
                Battery ({batteryVoltage} V)
              </text>
            </g>

            {/* Key: -( • )- labeled 'Key' at (600, 760) */}
            <g transform="translate(600, 760)">
              <path d="M -32 0 L -15 0 M -15 -14 Q -7 0 -15 14 M 15 -14 Q 7 0 15 14 M 15 0 L 32 0" stroke="#94a3b8" strokeWidth="2.5" fill="none" />
              {isKeyClosed ? (
                /* Closed key: dot inside */
                <circle cx="0" cy="0" r="5.5" fill="#f59e0b" />
              ) : (
                /* Open key: empty */
                <circle cx="0" cy="0" r="4" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
              )}
              <text x="0" y="32" fill={isKeyClosed ? '#10b981' : '#f43f5e'} fontSize="14" fontWeight="bold" textAnchor="middle">
                Key ({isKeyClosed ? 'Closed' : 'Open'})
              </text>
            </g>

            {/* Open Circuit Alert Banner inside SVG if key is open */}
            {!isKeyClosed && (
              <g transform="translate(230, 715)">
                <rect x="0" y="0" width="500" height="34" rx="6" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="250" y="22" fill="#fca5a5" fontSize="12" fontWeight="black" textAnchor="middle">
                  ⚠ CIRCUIT OPEN: Single path broken! No current flows through any resistor (i = 0 A).
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Live Interactive Controls for R1, R2, R3 & Battery */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" />
              Interactive Circuit Experimentation (Try Different Values)
            </span>
            <div className="text-xs font-mono text-slate-300">
              Equivalent Resistance: <strong className="text-emerald-400 text-sm font-black">{rEquivalent} Ω</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* R1 slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistor R₁:</span>
                <span className="font-mono text-cyan-400 font-bold">{r1} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={r1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 block">V₁ drop = {v1.toFixed(1)} V</span>
            </div>

            {/* R2 slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistor R₂:</span>
                <span className="font-mono text-cyan-400 font-bold">{r2} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={r2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 block">V₂ drop = {v2.toFixed(1)} V</span>
            </div>

            {/* R3 slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistor R₃:</span>
                <span className="font-mono text-cyan-400 font-bold">{r3} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={r3}
                onChange={(e) => setR3(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 block">V₃ drop = {v3.toFixed(1)} V</span>
            </div>
          </div>

          {/* Verification Callout */}
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Live Proof:</strong> R_eq ({rEquivalent} Ω) = R₁({r1} Ω) + R₂({r2} Ω) + R₃({r3} Ω).
                Total Voltage V_eq ({vEq.toFixed(1)} V) = V₁({v1.toFixed(1)} V) + V₂({v2.toFixed(1)} V) + V₃({v3.toFixed(1)} V).
              </span>
            </div>
            <div className="text-amber-400 font-bold whitespace-nowrap">
              R_eq ({rEquivalent} Ω) &gt; {Math.max(r1, r2, r3)} Ω (Greatest individual)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE STATEMENTS & APPLICATIONS (WRITTEN IN MEMORIZED SIMPLE LANGUAGE) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Exam Scoring Points • In Simple Memorized Language
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Key Principles of Resistors in Series Combination
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            5 fundamental points formatted for effortless memory, deep conceptual clarity, and maximum marks in AP SSC Class 10 board exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Statement 1 */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-amber-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                1
              </span>
              <span>Equivalent Resistance is Sum of Individual Resistances</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “In a series combination, the equivalent resistance of all resistors is equal to the sum of the individual resistances of all resistors.”
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs text-amber-300 font-bold text-center">
              R_eq = R₁ + R₂ + R₃ + ... + Rₙ
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              <strong>Simple meaning:</strong> You just directly add up the values of each resistor connected in line.
            </p>
          </div>

          {/* Statement 2 */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-emerald-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                2
              </span>
              <span>Equivalent Resistor is Always Greater</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “The equivalent resistance is always greater than any individual resistance in the series combination.”
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs text-emerald-300 font-bold text-center">
              R_eq &gt; R₁ &nbsp;,&nbsp; R_eq &gt; R₂ &nbsp;,&nbsp; R_eq &gt; R₃
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              <strong>Example:</strong> If 2 Ω, 4 Ω, and 6 Ω are in series, R_eq = 12 Ω, which is strictly greater than 6 Ω (the biggest individual resistor).
            </p>
          </div>

          {/* Statement 3 */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-cyan-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                3
              </span>
              <span>Resistance in Circuit is Increased</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “Therefore, the total resistance in a circuit is increased by a series combination of resistors.”
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>Why & When used:</strong> Connecting resistors in series effectively increases the overall length of the resistive path (<span className="font-mono text-amber-300 font-bold">R ∝ l</span>). This is done intentionally in electrical circuits whenever we want to <strong>reduce or limit high current</strong> to protect delicate electrical components.
            </p>
          </div>

          {/* Statement 4 */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-rose-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-rose-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                4
              </span>
              <span>Single Path & Open Circuit Vulnerability</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “A series combination provides a single path to the flow of electric current through resistors. If the circuit opens, no current flows through all resistors.”
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>Real-Life Consequence:</strong> In decorative festive serial lights (fairy bulbs) connected in series, if just <em>one bulb burns out or is removed</em>, the circuit becomes OPEN and <strong>all the remaining bulbs immediately stop glowing</strong>!
            </p>
          </div>

          {/* Statement 5: Why Electric Fuse is Connected in Series (Simple Answer Only) */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-purple-500/40 md:col-span-2 space-y-3 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-purple-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                  5
                </span>
                <span>Why an Electric Fuse is Always Connected in Series</span>
              </div>
              <span className="text-[10px] bg-purple-400/20 text-purple-300 font-bold px-2.5 py-0.5 rounded-full border border-purple-400/40">
                Simple Answer
              </span>
            </div>

            <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-white text-sm sm:text-base font-semibold leading-relaxed">
              An electric fuse is always connected in series so that the entire electric current must pass through it. When excessive current flows due to an overload or short-circuit, the fuse wire melts and breaks the circuit, immediately stopping current flow and protecting appliances from damage.
            </div>
          </div>
        </div>

        {/* Quick Memory Aid Summary Banner */}
        <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl space-y-1 text-center">
          <span className="text-xs text-amber-300 font-bold">
            🧠 5-Point Memory Formula for Exams:
          </span>
          <p className="text-xs text-slate-200">
            <strong>1. Sum</strong> (<span className="font-mono text-amber-300">R = R₁+R₂+R₃</span>) &nbsp;•&nbsp;
            <strong>2. Greater</strong> (<span className="font-mono text-emerald-300">R_eq &gt; individual</span>) &nbsp;•&nbsp;
            <strong>3. Increased</strong> (total circuit resistance rises) &nbsp;•&nbsp;
            <strong>4. Single Path</strong> (if open, all current stops) &nbsp;•&nbsp;
            <strong>5. Fuse in Series</strong> (melts during overload to open circuit &amp; protect appliances).
          </p>
        </div>
      </section>
    </div>
  );
};
