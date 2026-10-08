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
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  Split,
  Power,
  Truck,
  Car,
  AlertTriangle
} from 'lucide-react';
import { ThreeResistorCombinationsView } from './ThreeResistorCombinationsView';

export const ParallelDerivationWhatsAppView: React.FC = () => {
  // Circuit interactivity
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12); // Volts
  const [r1, setR1] = useState<number>(3); // Ohms
  const [r2, setR2] = useState<number>(6); // Ohms
  const [r3, setR3] = useState<number>(12); // Ohms

  // Independent branch switches (to test multi-path rule from WhatsApp photo)
  const [branch1Active, setBranch1Active] = useState<boolean>(true);
  const [branch2Active, setBranch2Active] = useState<boolean>(true);
  const [branch3Active, setBranch3Active] = useState<boolean>(true);

  // Vehicle Headlight Simulation State (Heavy Vehicles Application)
  const [headlightWiringMode, setHeadlightWiringMode] = useState<'parallel' | 'series'>('parallel');
  const [leftHeadlightIntact, setLeftHeadlightIntact] = useState<boolean>(true);
  const [rightHeadlightIntact, setRightHeadlightIntact] = useState<boolean>(true);

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

  // Electrical computations for parallel combination
  const { rEquivalent, invReq, i1, i2, i3, iTotal, minR } = useMemo(() => {
    const activeInv1 = branch1Active && r1 > 0 ? 1 / r1 : 0;
    const activeInv2 = branch2Active && r2 > 0 ? 1 / r2 : 0;
    const activeInv3 = branch3Active && r3 > 0 ? 1 / r3 : 0;
    const totalInv = activeInv1 + activeInv2 + activeInv3;

    const rEq = totalInv > 0 ? 1 / totalInv : 0;

    const current1 = isKeyClosed && branch1Active && r1 > 0 ? batteryVoltage / r1 : 0;
    const current2 = isKeyClosed && branch2Active && r2 > 0 ? batteryVoltage / r2 : 0;
    const current3 = isKeyClosed && branch3Active && r3 > 0 ? batteryVoltage / r3 : 0;
    const totalCurrent = isKeyClosed ? current1 + current2 + current3 : 0;

    const activeResistors = [
      branch1Active ? r1 : Infinity,
      branch2Active ? r2 : Infinity,
      branch3Active ? r3 : Infinity,
    ].filter((val) => val !== Infinity);

    const smallestR = activeResistors.length > 0 ? Math.min(...activeResistors) : 0;

    return {
      rEquivalent: rEq,
      invReq: totalInv,
      i1: current1,
      i2: current2,
      i3: current3,
      iTotal: totalCurrent,
      minR: smallestR,
    };
  }, [isKeyClosed, batteryVoltage, r1, r2, r3, branch1Active, branch2Active, branch3Active]);

  // Copy notes in simple memorized language
  const handleCopyNotes = () => {
    const text = `RESISTORS CONNECTED IN PARALLEL COMBINATION (AP SSC CLASS 10 PHYSICS)

MATHEMATICAL DERIVATION OF 1/Req = 1/R1 + 1/R2 + 1/R3:
-------------------------------------------------------
1. In a parallel combination, all resistors are connected across two common junction points.
2. The potential difference (V) across each resistor is the same and equal to the applied voltage (V).
3. The total current (i) entering the junction splits into individual branch currents:
   [ i_eq = i1 + i2 + i3 ]

4. Applying Ohm's Law (V = i · R  =>  i = V / R):
   Across Resistor R1:  i1 = V / R1   ---- ①
   Across Resistor R2:  i2 = V / R2   ---- ②
   Across Resistor R3:  i3 = V / R3   ---- ③
   For Equivalent Circuit: i_eq = V / R_eq -- ④

5. Substituting ①, ②, ③, and ④ into the current sum equation:
   V / R_eq = (V / R1) + (V / R2) + (V / R3)
   V · (1 / R_eq) = V · (1 / R1 + 1 / R2 + 1 / R3)

6. Dividing both sides by common voltage (V != 0):
   [ 1 / R_eq = 1 / R1 + 1 / R2 + 1 / R3 ]

FUNDAMENTAL PRINCIPLES & APPLICATIONS (MEMORIZED SIMPLE LANGUAGE):
-----------------------------------------------------------------
1. RECIPROCAL FORMULA:
   In a parallel combination, the reciprocal of equivalent resistance is equal to the sum of reciprocals of resistances of all individual resistors:
   1/R_eq = 1/R1 + 1/R2 + 1/R3.

2. EQUIVALENT RESISTANCE IS ALWAYS LESS:
   The equivalent resistance is always strictly LESS than the individual resistance of any resistor in the combination (R_eq < R1, R_eq < R2, R_eq < R3).
   Therefore, by parallel combination, total electrical resistance in a circuit can be decreased.

3. MULTI-PATH CIRCUIT & INDEPENDENCE:
   Parallel combination is a multi-path circuit. If one branch/circuit opens or breaks down, the other circuits remain closed and current continues flowing through them.

4. WHY DOMESTIC APPLIANCES ARE CONNECTED IN PARALLEL:
   All household appliances (lights, fans, refrigerator, television) are connected in parallel because:
   - Each appliance receives the same full line voltage (230 V).
   - Each appliance has its own independent on/off switch.
   - If one appliance is switched off or burns out, all other appliances keep working uninterrupted.

5. CONSTANT VOLTAGE & CURRENT DIVISION:
   In parallel combination, voltage across each resistor is identical (V1 = V2 = V3 = V), while total electric current splits among branches in inverse ratio to resistance: i = i1 + i2 + i3.

6. MULTIPLE CIRCUITS ADVANTAGE IN DOMESTIC APPLIANCES:
   Parallel connection creates multiple independent closed loops. This allows high-power devices (heaters, geysers) to draw high current and low-power devices (LED bulbs, TV) to draw low current simultaneously, without causing voltage drops or chain failures.

7. WHY HEADLIGHTS IN HEAVY VEHICLES ARE CONNECTED IN PARALLEL:
   Automotive headlights (cars, trucks, buses) are ALWAYS connected in parallel across the 12 V / 24 V battery:
   - Highway Safety Redundancy: If one headlight filament blows at night, the second headlight stays at 100% brightness, preventing complete blackout and fatal crashes.
   - Full Lumens: Both bulbs get full battery voltage (12 V/24 V). (If wired in series, voltage would split to 6 V each, making headlights dangerously dim).

8. THREE 2-OHM RESISTORS IN 4 COMBINATIONS:
   - Case 1 (All 3 in Series): R_eq = 2 + 2 + 2 = 6 Ω (Maximum Resistance)
   - Case 2 (All 3 in Parallel): 1/R_eq = 1/2 + 1/2 + 1/2 = 3/2  =>  R_eq = 2/3 Ω = 0.67 Ω (Minimum Resistance)
   - Case 3 (Two in Parallel + One in Series): (2 ∥ 2) + 2 = 1 + 2 = 3 Ω
   - Case 4 (Two in Series ∥ One in Parallel): (2 + 2) ∥ 2 = 4 ∥ 2 = 4/3 Ω = 1.33 Ω`;

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
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                AP SSC Core Physics Proof
              </span>
              <span>·</span>
              <span>Class 10 Textbook &amp; WhatsApp Notebook Notes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resistors in Parallel Combination: 1/R = 1/R₁ + 1/R₂ + 1/R₃
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete mathematical derivation with <strong>all steps shown inside the animated diagram</strong>, featuring legible typography, interactive multi-path circuit simulation, and the exam principles in simple language.
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
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Scientific Schematic • Animated Lab Circuit
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span>Animated Diagram: Resistors Connected in Parallel Combination</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Featuring parallel branches R₁, R₂, R₃ across common junctions, branch currents i₁, i₂, i₃, and master voltmeter V.
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
          <svg viewBox="0 0 1020 900" className="w-full h-auto select-none">
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

              <linearGradient id="notebookParallelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#080c16" />
                <stop offset="100%" stopColor="#02040a" />
              </linearGradient>
              <linearGradient id="derivationChalkboardGradParallel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0a1224" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>
            </defs>

            {/* Background Canvas */}
            <rect width="1020" height="900" rx="16" fill="url(#notebookParallelGrad)" />

            {/* Title watermark matching the WhatsApp notebook */}
            <text x="510" y="26" fill="#64748b" fontSize="15" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              Resistors connected in parallel combination
            </text>

            {/* Left margin note indicator */}
            <text x="75" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">
              ② Req &lt; individual (Resistance decreases)
            </text>

            {/* Right margin note indicator */}
            <text x="945" y="45" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="end">
              Multi-path Circuit (Independent branches)
            </text>

            {/* ========================================================================= */}
            {/* MAIN CIRCUIT LOOP WIRE RAILS */}
            {/* Left rail at x=70, Junction A at (170, 160), Junction B at (850, 160), Right rail at x=950, Bottom rail at y=830 */}
            {/* ========================================================================= */}

            {/* Outer wire from battery to Junction A and from Junction B back to battery */}
            <path
              d="M 70 830 L 70 160 L 170 160 M 850 160 L 950 160 L 950 830 L 70 830"
              fill="none"
              stroke="#334155"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ========================================================================= */}
            {/* 3 PARALLEL BRANCHES BETWEEN JUNCTION A (170, 160) AND JUNCTION B (850, 160) */}
            {/* ========================================================================= */}

            {/* Branch 1 (Top Branch: y=85) */}
            <path
              d="M 170 160 L 250 85 L 390 85 M 510 85 L 770 85 L 850 160"
              fill="none"
              stroke={branch1Active ? '#334155' : '#1e293b'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Branch 2 (Middle Branch: y=160) */}
            <path
              d="M 170 160 L 390 160 M 510 160 L 850 160"
              fill="none"
              stroke={branch2Active ? '#334155' : '#1e293b'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Branch 3 (Bottom Branch: y=235) */}
            <path
              d="M 170 160 L 250 235 L 390 235 M 510 235 L 770 235 L 850 160"
              fill="none"
              stroke={branch3Active ? '#334155' : '#1e293b'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Junction Dots A and B */}
            <circle cx="170" cy="160" r="7" fill="#f59e0b" />
            <text x="170" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Junction A</text>

            <circle cx="850" cy="160" r="7" fill="#f59e0b" />
            <text x="850" y="145" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Junction B</text>

            {/* ========================================================================= */}
            {/* ANIMATED GLOWING CURRENT FLOW */}
            {/* ========================================================================= */}
            {isKeyClosed && (
              <>
                {/* Main loop from battery to Junction A */}
                <path
                  d="M 70 830 L 70 160 L 170 160"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />

                {/* Branch 1 Current flow (i1) */}
                {branch1Active && (
                  <path
                    d="M 170 160 L 250 85 L 390 85 M 510 85 L 770 85 L 850 160"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="flowing-current"
                  />
                )}

                {/* Branch 2 Current flow (i2) */}
                {branch2Active && (
                  <path
                    d="M 170 160 L 390 160 M 510 160 L 850 160"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="flowing-current"
                  />
                )}

                {/* Branch 3 Current flow (i3) */}
                {branch3Active && (
                  <path
                    d="M 170 160 L 250 235 L 390 235 M 510 235 L 770 235 L 850 160"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="flowing-current"
                  />
                )}

                {/* Main loop from Junction B back to battery */}
                <path
                  d="M 850 160 L 950 160 L 950 830 L 70 830"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="9 7"
                  className="flowing-current"
                />
              </>
            )}

            {/* Current Direction Arrows matching WhatsApp photo */}
            <g opacity={isKeyClosed ? 1 : 0.25} fill="#f59e0b">
              {/* Total current i entering */}
              <polygon points="115,156 128,160 115,164" />
              <text x="120" y="150" fill="#f59e0b" fontSize="15" fontWeight="bold" fontStyle="italic">i</text>

              {/* Branch 1 current i1 */}
              <polygon points="275,81 288,85 275,89" fill="#38bdf8" />
              <text x="268" y="75" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">i₁</text>

              {/* Branch 2 current i2 */}
              <polygon points="275,156 288,160 275,164" fill="#38bdf8" />
              <text x="268" y="150" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">i₂</text>

              {/* Branch 3 current i3 */}
              <polygon points="275,231 288,235 275,239" fill="#38bdf8" />
              <text x="268" y="225" fill="#38bdf8" fontSize="14" fontWeight="bold" fontStyle="italic">i₃</text>

              {/* Recombining into total current i at right */}
              <polygon points="885,156 898,160 885,164" />
              <text x="890" y="150" fill="#f59e0b" fontSize="15" fontWeight="bold" fontStyle="italic">i</text>

              {/* Bottom rail returning to battery */}
              <polygon points="220,826 205,830 220,834" />
              <text x="180" y="855" fill="#f59e0b" fontSize="15" fontWeight="bold" fontStyle="italic">i</text>
            </g>

            {/* ========================================================================= */}
            {/* RESISTORS R1, R2, R3 */}
            {/* ========================================================================= */}

            {/* Resistor R1 (Branch 1) */}
            <g transform="translate(390, 70)">
              <path
                d="M 0 15 L 15 15 L 22 3 L 38 27 L 54 3 L 70 27 L 86 3 L 102 27 L 109 15 L 120 15"
                fill="none"
                stroke={branch1Active ? '#38bdf8' : '#475569'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="60" y="-5" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">
                R₁ = {r1} Ω
              </text>
            </g>

            {/* Resistor R2 (Branch 2) */}
            <g transform="translate(390, 145)">
              <path
                d="M 0 15 L 15 15 L 22 3 L 38 27 L 54 3 L 70 27 L 86 3 L 102 27 L 109 15 L 120 15"
                fill="none"
                stroke={branch2Active ? '#38bdf8' : '#475569'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="60" y="-5" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">
                R₂ = {r2} Ω
              </text>
            </g>

            {/* Resistor R3 (Branch 3) */}
            <g transform="translate(390, 220)">
              <path
                d="M 0 15 L 15 15 L 22 3 L 38 27 L 54 3 L 70 27 L 86 3 L 102 27 L 109 15 L 120 15"
                fill="none"
                stroke={branch3Active ? '#38bdf8' : '#475569'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="60" y="-5" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">
                R₃ = {r3} Ω
              </text>
            </g>

            {/* ========================================================================= */}
            {/* VOLTMETERS ACROSS EACH RESISTOR (Underneath each branch) */}
            {/* ========================================================================= */}

            {/* Voltmeter across R1 */}
            <g transform="translate(450, 120)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="4" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">V</text>
            </g>

            {/* Voltmeter across R2 */}
            <g transform="translate(450, 195)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="4" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">V</text>
            </g>

            {/* Voltmeter across R3 */}
            <g transform="translate(450, 270)">
              <circle cx="0" cy="0" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              <text x="0" y="4" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">V</text>
            </g>

            {/* Callouts on right side of branches matching notebook ①, ②, ③ */}
            <g transform="translate(540, 70)">
              <rect x="0" y="0" width="220" height="28" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              <text x="110" y="19" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V = i₁·R₁  ⇒  i₁ = V/R₁ → ①
              </text>
            </g>

            <g transform="translate(540, 145)">
              <rect x="0" y="0" width="220" height="28" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              <text x="110" y="19" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V = i₂·R₂  ⇒  i₂ = V/R₂ → ②
              </text>
            </g>

            <g transform="translate(540, 220)">
              <rect x="0" y="0" width="220" height="28" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              <text x="110" y="19" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                V = i₃·R₃  ⇒  i₃ = V/R₃ → ③
              </text>
            </g>

            {/* ========================================================================= */}
            {/* ALL STEPS OF THE DERIVATION SHOWN INSIDE THE CIRCUIT DIAGRAM (HIGH LEGIBILITY) */}
            {/* ========================================================================= */}
            <g transform="translate(100, 310)">
              {/* Derivation Chalkboard Card */}
              <rect
                x="0"
                y="0"
                width="820"
                height="480"
                rx="14"
                fill="url(#derivationChalkboardGradParallel)"
                stroke="#0284c7"
                strokeWidth="2.5"
              />

              {/* Header inside chalkboard */}
              <g transform="translate(410, 24)">
                <rect x="-210" y="-14" width="420" height="28" rx="6" fill="#1e293b" stroke="#0284c7" strokeWidth="1" />
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

              {/* STEP 1: Apply Ohm's Law */}
              <text
                x="410"
                y="55"
                fill="#e2e8f0"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 1: Apply Ohm’s Law (V = i · R  ⇒  i = V / R) to each branch and equivalent circuit:
              </text>

              {/* 4 Equation Badges for Step 1 */}
              <g transform="translate(20, 68)">
                {/* Equation 1 */}
                <rect x="0" y="0" width="180" height="38" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="90" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  i₁ = V / R₁  → ①
                </text>

                {/* Equation 2 */}
                <rect x="195" y="0" width="180" height="38" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="285" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  i₂ = V / R₂  → ②
                </text>

                {/* Equation 3 */}
                <rect x="390" y="0" width="180" height="38" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <text x="480" y="24" fill="#38bdf8" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  i₃ = V / R₃  → ③
                </text>

                {/* Equation 4 */}
                <rect x="585" y="0" width="195" height="38" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="682" y="24" fill="#fbbf24" fontSize={fontSizes.badgeEq} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  i_eq = V / R_eq  → ④
                </text>
              </g>

              {/* STEP 2: Total Current in Parallel Combination */}
              <text
                x="410"
                y="134"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 2: Total current equals sum of branch currents (Conservation of Charge):
              </text>

              {/* Boxed Equation [ i_equivalent = i1 + i2 + i3 ] */}
              <g transform="translate(60, 146)">
                <rect
                  x="0"
                  y="0"
                  width="700"
                  height="50"
                  rx="8"
                  fill="#78350f"
                  fillOpacity="0.45"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                <text
                  x="350"
                  y="33"
                  fill="#fbbf24"
                  fontSize={fontSizes.step2Box}
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="monospace"
                  letterSpacing="1"
                >
                  [ i_eq = i₁ + i₂ + i₃ ]
                </text>
              </g>

              {/* STEP 3: Substitute Equations 1, 2, 3, 4 */}
              <text
                x="410"
                y="226"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 3: Substitute expressions from ①, ②, ③, and ④ into the current equation:
              </text>
              <text
                x="410"
                y="258"
                fill="#38bdf8"
                fontSize={fontSizes.step34Eq}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                V / R_eq = (V / R₁) + (V / R₂) + (V / R₃)
              </text>

              {/* STEP 4: Factor out common voltage (V) */}
              <text
                x="410"
                y="300"
                fill="#cbd5e1"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 4: Factor out common potential difference (V) on the right-hand side:
              </text>
              <text
                x="410"
                y="332"
                fill="#38bdf8"
                fontSize={fontSizes.step34Eq}
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                V · (1 / R_eq) = V · (1 / R₁ + 1 / R₂ + 1 / R₃)
              </text>

              {/* STEP 5: Boxed Final Result [ 1/R_eq = 1/R1 + 1/R2 + 1/R3 ] */}
              <text
                x="410"
                y="374"
                fill="#34d399"
                fontSize={fontSizes.stepTitle}
                fontWeight="bold"
                textAnchor="middle"
              >
                Step 5: Cancel common voltage (V ≠ 0) on both sides → Final Equivalent Formula:
              </text>

              <g transform="translate(60, 386)">
                <rect
                  x="0"
                  y="0"
                  width="700"
                  height="54"
                  rx="10"
                  fill="#064e3b"
                  fillOpacity="0.6"
                  stroke="#10b981"
                  strokeWidth="3"
                />
                <text
                  x="350"
                  y="37"
                  fill="#34d399"
                  fontSize={fontSizes.step5Box}
                  fontWeight="900"
                  textAnchor="middle"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                >
                  [ 1 / R_eq = 1 / R₁ + 1 / R₂ + 1 / R₃ ]
                </text>
              </g>

              {/* Live Evaluation Bar inside the diagram */}
              <g transform="translate(40, 448)">
                <rect x="0" y="0" width="740" height="28" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="370" y="18" fill="#e2e8f0" fontSize={fontSizes.liveProof} fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  Live Values: 1/Req = 1/{r1} + 1/{r2} + 1/{r3} = {invReq.toFixed(3)} Ω⁻¹  ⇒  Req = {rEquivalent.toFixed(2)} Ω &lt; smallest resistor ({minR} Ω)
                </text>
              </g>
            </g>

            {/* ========================================================================= */}
            {/* AMMETER (A), BATTERY & PLUG KEY (Bottom Rail at y=830) */}
            {/* ========================================================================= */}

            {/* Ammeter (A) on bottom rail at (250, 830) */}
            <g transform="translate(250, 830)">
              <circle cx="0" cy="0" r="24" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="7" fill="#38bdf8" fontSize="18" fontWeight="bold" textAnchor="middle">A</text>
              <text x="-32" y="4" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
              <text x="26" y="4" fill="#3b82f6" fontSize="14" fontWeight="bold">−</text>
              <text x="0" y="36" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                i = {iTotal.toFixed(2)} A
              </text>
            </g>

            {/* Battery: cells in series -||||- at (510, 830) */}
            <g transform="translate(510, 830)">
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

            {/* Key: -( • )- labeled 'Key' at (730, 830) */}
            <g transform="translate(730, 830)">
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

            {/* Circuit Open Alert Banner inside SVG if key is open */}
            {!isKeyClosed && (
              <g transform="translate(260, 785)">
                <rect x="0" y="0" width="500" height="34" rx="6" fill="#450a0a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="250" y="22" fill="#fca5a5" fontSize="12" fontWeight="black" textAnchor="middle">
                  ⚠ MAIN SWITCH OPEN: No current flows from battery (i = 0 A).
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Multi-Path Interactive Branch Controllers (Live Test of WhatsApp Right-Margin Principle) */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Split className="w-4 h-4 text-cyan-400" />
              Multi-Path Testing: Toggle Branch Switches &amp; Adjust Resistors
            </span>
            <div className="text-xs font-mono text-slate-300">
              Equivalent Resistance: <strong className="text-emerald-400 text-sm font-black">{rEquivalent.toFixed(2)} Ω</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Branch 1 Controls */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">Branch 1 (R₁)</span>
                <button
                  onClick={() => setBranch1Active(!branch1Active)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    branch1Active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{branch1Active ? 'Closed (ON)' : 'Open (OFF)'}</span>
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistance R₁:</span>
                <span className="font-mono text-cyan-400 font-bold">{r1} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={r1}
                onChange={(e) => setR1(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Current i₁:</span>
                <span className="text-cyan-300 font-bold">{i1.toFixed(2)} A</span>
              </div>
            </div>

            {/* Branch 2 Controls */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">Branch 2 (R₂)</span>
                <button
                  onClick={() => setBranch2Active(!branch2Active)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    branch2Active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{branch2Active ? 'Closed (ON)' : 'Open (OFF)'}</span>
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistance R₂:</span>
                <span className="font-mono text-cyan-400 font-bold">{r2} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={r2}
                onChange={(e) => setR2(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Current i₂:</span>
                <span className="text-cyan-300 font-bold">{i2.toFixed(2)} A</span>
              </div>
            </div>

            {/* Branch 3 Controls */}
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">Branch 3 (R₃)</span>
                <button
                  onClick={() => setBranch3Active(!branch3Active)}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    branch3Active
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  <Power className="w-3 h-3" />
                  <span>{branch3Active ? 'Closed (ON)' : 'Open (OFF)'}</span>
                </button>
              </div>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Resistance R₃:</span>
                <span className="font-mono text-cyan-400 font-bold">{r3} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                value={r3}
                onChange={(e) => setR3(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Current i₃:</span>
                <span className="text-cyan-300 font-bold">{i3.toFixed(2)} A</span>
              </div>
            </div>
          </div>

          {/* Demonstration Callout of WhatsApp Note */}
          <div className="p-3 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="text-cyan-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong>Multi-Path Proof:</strong> Total Current i ({iTotal.toFixed(2)} A) = i₁({i1.toFixed(2)} A) + i₂({i2.toFixed(2)} A) + i₃({i3.toFixed(2)} A).
                Notice that opening any branch switch stops current only in that branch; the other branches continue operating!
              </span>
            </div>
            <div className="text-amber-400 font-bold whitespace-nowrap">
              R_eq ({rEquivalent.toFixed(2)} Ω) &lt; {minR} Ω (Smallest branch)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CORE STATEMENTS & APPLICATIONS (FROM THE WHATSAPP NOTEBOOK) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-5">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
            Exam Scoring Points • In Simple Memorized Language
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Key Principles of Resistors in Parallel Combination
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            The 5 fundamental points from the handwritten notebook photo, written in clear, simple language for AP SSC Class 10 board exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Statement 1: Reciprocal Formula (Bottom of WhatsApp photo) */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-amber-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                1
              </span>
              <span>Reciprocal of Equivalent Resistance is Sum of Reciprocals</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “In a parallel combination of resistors, the reciprocal of the equivalent resistance is equal to the sum of the reciprocals of the individual resistances of all resistors.”
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 font-bold text-center">
              1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ + ... + 1/Rₙ
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              <strong>Simple meaning:</strong> You add the fractions (reciprocals) of each resistor, then flip the result to find the equivalent resistance.
            </p>
          </div>

          {/* Statement 2: Always Less than individual (Left margin of WhatsApp photo) */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-emerald-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                2
              </span>
              <span>Equivalent Resistance is Always Less than Individual Resistance</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “The equivalent resistance in a parallel combination is always less than the individual resistance of any resistor in the combination.”
            </div>
            <div className="p-2 bg-slate-900/90 rounded border border-slate-800 font-mono text-xs text-emerald-300 font-bold text-center">
              R_eq &lt; R₁ &nbsp;,&nbsp; R_eq &lt; R₂ &nbsp;,&nbsp; R_eq &lt; R₃
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              <strong>Example:</strong> If 3 Ω, 6 Ω, and 12 Ω are in parallel, R_eq = 1.71 Ω, which is strictly smaller than 3 Ω (the smallest individual resistor)!
            </p>
          </div>

          {/* Statement 3: Decreasing Resistance in a Circuit (Left margin of WhatsApp photo) */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-cyan-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                3
              </span>
              <span>Resistance of Circuit is Decreased</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “Therefore, by connecting resistors in parallel, the total resistance of an electrical circuit can be decreased.”
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>Why &amp; When used:</strong> Connecting resistors in parallel provides multiple alternate pathways for charge, effectively increasing the cross-sectional area of conduction (<span className="font-mono text-amber-300 font-bold">R ∝ 1/A</span>). This allows a <strong>larger total current to flow</strong> from the source.
            </p>
          </div>

          {/* Statement 4: Multi-path Circuit & Independent Operation (Right margin of WhatsApp photo) */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-rose-500/30 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-rose-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                4
              </span>
              <span>Multi-Path Circuit &amp; Independent Branches</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “A parallel combination is a multi-path circuit. If one circuit/branch opens or breaks down, the other circuits remain closed.”
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              <strong>Crucial Difference from Series:</strong> In series, a single break stops all current. In parallel, each branch is an independent closed loop. If one resistor or light bulb is disconnected, current continues to flow through all other branches without interruption!
            </p>
          </div>

          {/* Statement 5: Domestic Wiring Application */}
          <div className="bg-slate-950 p-5 rounded-xl border-2 border-purple-500/40 md:col-span-2 space-y-3 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-950 to-purple-950/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-6 h-6 rounded-full bg-purple-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                  5
                </span>
                <span>Why All Household Electrical Appliances are Connected in Parallel</span>
              </div>
              <span className="text-[10px] bg-purple-400/20 text-purple-300 font-bold px-2.5 py-0.5 rounded-full border border-purple-400/40">
                Real-World Application • Board Exam Favorite
              </span>
            </div>

            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “All domestic electrical appliances in houses are connected in parallel combination across the mains supply.”
            </div>

            {/* 3 Clear Reasons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-amber-300 block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                  1. Same Rated Voltage
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Every appliance receives the full mains potential difference (230 V), allowing bulbs and heaters to operate at full power.
                </p>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-300 block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                  2. Independent Switching
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Each appliance can be switched ON or OFF independently without affecting any other appliance in the house.
                </p>
              </div>

              <div className="bg-slate-900/70 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-300 block flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  3. No Chain Failure
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  If one appliance gets damaged or burns out, its circuit opens, but all other appliances in the home continue to function smoothly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Memory Aid Summary Banner */}
        <div className="p-4 bg-cyan-400/10 border border-cyan-400/30 rounded-xl space-y-1 text-center">
          <span className="text-xs text-cyan-300 font-bold">
            🧠 5-Point Memory Formula for Parallel Combination:
          </span>
          <p className="text-xs text-slate-200">
            <strong>1. Reciprocal Sum</strong> (<span className="font-mono text-cyan-300">1/R = 1/R₁+1/R₂+1/R₃</span>) &nbsp;•&nbsp;
            <strong>2. Less Than Smallest</strong> (<span className="font-mono text-emerald-300">R_eq &lt; individual</span>) &nbsp;•&nbsp;
            <strong>3. Decreased</strong> (total circuit resistance drops) &nbsp;•&nbsp;
            <strong>4. Multi-Path</strong> (if one branch opens, others remain ON) &nbsp;•&nbsp;
            <strong>5. Home Wiring</strong> (full 230 V &amp; independent switches).
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONCEPT: MULTIPLE CIRCUITS IN PARALLEL & DOMESTIC APPLIANCES ADVANTAGES */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
            Core Electrical Concept &amp; Household Architecture
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>The Concept of Multiple Circuits in Parallel Combination</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Why parallel arrangement creates <strong>independent closed loops (“multiple circuits”)</strong> and how this provides immense practical advantages for domestic appliances.
          </p>
        </div>

        {/* Conceptual Visual Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-4 h-4 text-amber-400" />
              What Does "Multiple Circuits" Mean?
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In a parallel combination, each electrical appliance is connected across the common phase (live) and neutral wire terminals. This forms a <strong>separate, independent closed circuit loop</strong> for every individual device.
            </p>
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300">
              Mains (230 V) ──┬──[ Appliance 1 + Switch 1 ]──┬── Neutral
                              ├──[ Appliance 2 + Switch 2 ]──┤
                              └──[ Appliance 3 + Switch 3 ]──┘
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Because all branches share the same supply junctions, current drawn by each appliance flows through its own dedicated path without travelling through any other appliance.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              4 Invaluable Advantages for Home Appliances
            </span>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-white">Independent Switching:</strong> You can turn ON your bedroom study lamp without turning on the air conditioner or water heater.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-white">Full Rated Voltage (230 V):</strong> Every device operates at its intended full potential difference, delivering rated lumens and heating output.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-white">Independent Current Demand (I = P/V):</strong> A 2000 W geyser draws 8.7 A while a 10 W LED bulb draws 0.04 A without bottlenecking or flickering.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-white">No Chain Failure / Fault Isolation:</strong> If a light bulb burns out, its circuit opens, but your refrigerator, computer, and fan keep running safely!
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Table: Parallel vs Series for Household Wiring */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3 text-emerald-400">Parallel Wiring (Used in Homes)</th>
                <th className="p-3 text-rose-400">Series Wiring (Why It Fails for Homes)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-white">Switch Control</td>
                <td className="p-3 text-emerald-300">Independent switch for every appliance.</td>
                <td className="p-3 text-rose-300">One switch turns ALL appliances ON or OFF together.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Voltage Distribution</td>
                <td className="p-3 text-emerald-300">Every appliance gets full 230 V line voltage.</td>
                <td className="p-3 text-rose-300">Voltage divides (V = V₁ + V₂ + ...); bulbs glow very dimly.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">If One Bulb Blows</td>
                <td className="p-3 text-emerald-300">Only that bulb stops; all other devices continue working!</td>
                <td className="p-3 text-rose-300">Circuit opens; whole house goes pitch dark instantly!</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-white">Total Resistance</td>
                <td className="p-3 text-emerald-300">Decreases (1/R_eq sum); allows sufficient total current.</td>
                <td className="p-3 text-rose-300">Increases heavily (R_eq = R₁+R₂); restricts current flow.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REAL-WORLD APPLICATION: HEADLIGHTS IN HEAVY VEHICLES (TRUCKS, BUSES, CARS) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Automotive Engineering &amp; Road Safety</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Why Headlights in Heavy Vehicles are Always Connected in Parallel
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              In heavy trucks, intercity buses, and passenger cars, the front headlights are wired strictly in <strong>parallel across the 12 V or 24 V vehicle battery</strong>. Test what happens during a night-time bulb failure below!
            </p>
          </div>

          {/* Interactive Wiring Mode Selector for Headlights */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => {
                setHeadlightWiringMode('parallel');
                setLeftHeadlightIntact(true);
                setRightHeadlightIntact(true);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                headlightWiringMode === 'parallel'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Parallel (Real-World Safe)
            </button>
            <button
              onClick={() => {
                setHeadlightWiringMode('series');
                setLeftHeadlightIntact(true);
                setRightHeadlightIntact(true);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                headlightWiringMode === 'series'
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Series (Dangerous Test)
            </button>
          </div>
        </div>

        {/* Headlight Simulation Lab */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-200">Vehicle Battery: 24 V Heavy Duty Truck Battery</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-black uppercase ${
                headlightWiringMode === 'parallel' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              }`}>
                {headlightWiringMode === 'parallel' ? 'Parallel Circuit Mode' : 'Series Circuit Mode'}
              </span>
            </div>

            {/* Test Button: Burnout simulation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLeftHeadlightIntact(!leftHeadlightIntact)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  leftHeadlightIntact
                    ? 'bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{leftHeadlightIntact ? 'Simulate Left Bulb Blowout' : 'Replace Left Bulb'}</span>
              </button>

              <button
                onClick={() => {
                  setLeftHeadlightIntact(true);
                  setRightHeadlightIntact(true);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                title="Reset Bulbs"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Visual Truck Headlights Presentation */}
          {(() => {
            const isParallel = headlightWiringMode === 'parallel';
            // In parallel: left bulb works if intact; right bulb works if intact.
            // In series: both require BOTH intact to conduct current!
            const seriesConducting = leftHeadlightIntact && rightHeadlightIntact;
            const leftGlows = isParallel ? leftHeadlightIntact : seriesConducting;
            const rightGlows = isParallel ? rightHeadlightIntact : seriesConducting;

            // Voltage received:
            // Parallel: full 24V each
            // Series: splits to 12V each (dim!)
            const leftVolt = leftGlows ? (isParallel ? 24 : 12) : 0;
            const rightVolt = rightGlows ? (isParallel ? 24 : 12) : 0;

            return (
              <div className="space-y-4">
                {/* Night Highway Road Simulation Canvas */}
                <div className="relative w-full h-56 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
                  {/* Road Asphalt and Lane Marking */}
                  <div className="absolute inset-0 bg-radial from-slate-900 via-slate-950 to-black">
                    <div className="absolute top-1/2 left-0 right-0 h-1 border-t-2 border-dashed border-slate-700/50" />
                  </div>

                  {/* Truck Grille Frame */}
                  <div className="relative z-10 w-72 h-36 rounded-2xl bg-slate-900 border-2 border-slate-700 p-4 flex flex-col justify-between shadow-2xl">
                    <div className="text-[10px] text-center font-bold tracking-widest text-slate-500 uppercase">
                      HEAVY COMMERCIAL TRUCK • 24 V
                    </div>

                    {/* Headlights Row */}
                    <div className="flex items-center justify-between px-2">
                      {/* Left Headlight */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${
                            leftGlows
                              ? isParallel
                                ? 'bg-amber-300 border-amber-200 shadow-[0_0_35px_#fde047]'
                                : 'bg-amber-600/70 border-amber-500 shadow-[0_0_15px_#d97706]'
                              : 'bg-slate-950 border-slate-800 opacity-60'
                          }`}
                        >
                          <Lightbulb className={`w-7 h-7 ${leftGlows ? 'text-slate-950' : 'text-slate-700'}`} />
                          {/* Light beam projection */}
                          {leftGlows && (
                            <div
                              className={`absolute -left-28 -top-8 w-28 h-28 pointer-events-none opacity-40 blur-lg ${
                                isParallel ? 'bg-yellow-300' : 'bg-amber-600'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-slate-300">Left Light</span>
                        <span className={`text-[9px] font-mono font-bold ${leftGlows ? (isParallel ? 'text-emerald-400' : 'text-amber-400') : 'text-rose-400'}`}>
                          {leftGlows ? `${leftVolt} V (${isParallel ? '100% Bright' : 'Dim 50%'})` : 'OFF (Blown)'}
                        </span>
                      </div>

                      {/* Vehicle Radiator Grille */}
                      <div className="space-y-1 w-24">
                        <div className="h-1 bg-slate-700 rounded" />
                        <div className="h-1 bg-slate-700 rounded" />
                        <div className="h-1 bg-slate-700 rounded" />
                        <div className="h-1 bg-slate-700 rounded" />
                      </div>

                      {/* Right Headlight */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${
                            rightGlows
                              ? isParallel
                                ? 'bg-amber-300 border-amber-200 shadow-[0_0_35px_#fde047]'
                                : 'bg-amber-600/70 border-amber-500 shadow-[0_0_15px_#d97706]'
                              : 'bg-slate-950 border-slate-800 opacity-60'
                          }`}
                        >
                          <Lightbulb className={`w-7 h-7 ${rightGlows ? 'text-slate-950' : 'text-slate-700'}`} />
                          {/* Light beam projection */}
                          {rightGlows && (
                            <div
                              className={`absolute -right-28 -top-8 w-28 h-28 pointer-events-none opacity-40 blur-lg ${
                                isParallel ? 'bg-yellow-300' : 'bg-amber-600'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[10px] font-bold mt-1 text-slate-300">Right Light</span>
                        <span className={`text-[9px] font-mono font-bold ${rightGlows ? (isParallel ? 'text-emerald-400' : 'text-amber-400') : 'text-rose-400'}`}>
                          {rightGlows ? `${rightVolt} V (${isParallel ? '100% Bright' : 'Dim 50%'})` : 'OFF (Blown)'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Callout Box */}
                {isParallel ? (
                  <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>PARALLEL CONNECTION ADVANTAGE (SAFE AUTOMOTIVE STANDARD):</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {!leftHeadlightIntact ? (
                        <span className="text-emerald-300 font-semibold">
                          🛡️ Even though the Left bulb is blown, the Right headlight remains <strong>100% brightly lit at full 24 V</strong>. The truck driver can clearly see the road and safely drive to a service stop!
                        </span>
                      ) : (
                        <span>
                          Both headlights receive the full <strong>24 V battery potential</strong>, producing maximum bright white light for high-speed highway driving. Each headlight is an independent circuit branch!
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 bg-rose-950/30 border border-rose-500/40 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>WHY VEHICLE HEADLIGHTS MUST NEVER BE CONNECTED IN SERIES:</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {!leftHeadlightIntact ? (
                        <span className="text-rose-300 font-semibold">
                          🚨 CRITICAL DANGER: When the Left bulb blows, the single series circuit breaks completely. <strong>Both headlights black out instantly</strong>, plunging the vehicle into total darkness at highway speed!
                        </span>
                      ) : (
                        <span>
                          ⚠️ In series, the 24 V battery voltage divides equally: each headlight receives only <strong>12 V instead of 24 V</strong>. Both headlights glow very dimly, creating severe night-driving hazard!
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Two Core Exam Reasons Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Reason 1: Road Safety &amp; Redundancy
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                If headlights were in series and one bulb failed, both would immediately go dark, causing catastrophic crashes on dark highways. In parallel, if one bulb blows, the other stays fully illuminated!
              </p>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Reason 2: Full Operating Voltage &amp; Lumens
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Connected in parallel, both bulbs receive the full vehicle battery voltage (12 V or 24 V) to cast bright, high-beam visibility across the highway.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CONNECTING THREE 2-OHM RESISTORS IN ALL 4 COMBINATIONS */}
      {/* ========================================================================= */}
      <ThreeResistorCombinationsView />
    </div>
  );
};
