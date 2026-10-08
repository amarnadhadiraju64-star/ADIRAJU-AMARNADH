import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Pause,
  Play,
  HelpCircle,
  Layers,
  Sliders,
  Maximize2,
  Grid,
  Info,
  BookOpen,
  Split,
  Activity
} from 'lucide-react';

interface CombinationInfo {
  id: string;
  shortName: string;
  name: string;
  targetResistance: string;
  fractionResistance: string;
  targetValue: number;
  circuitTopology: string;
  examQuestion: string;
  tag: string;
  strategy: string;
  derivationSteps: {
    stage: string;
    formula: string;
    substitution: string;
    explanation: string;
  }[];
  finalBox: string;
  reason: string;
}

const COMBINATIONS: CombinationInfo[] = [
  {
    id: 'case-1-series',
    shortName: 'Case 1: All Series',
    name: 'Case 1: All 3 Resistors Connected in Series',
    targetResistance: '6 Ω',
    fractionResistance: '6 Ω',
    targetValue: 6,
    circuitTopology: 'R₁ + R₂ + R₃ (End-to-End Single Pathway)',
    examQuestion: '“How will you connect three 2 Ω resistors to obtain a maximum equivalent resistance of 6 Ω?”',
    tag: 'Maximum Resistance',
    strategy: 'To get maximum resistance, connect all resistors in series so that the individual resistances simply add up.',
    derivationSteps: [
      {
        stage: 'Step 1: Formula for Series Combination',
        formula: 'R_eq = R₁ + R₂ + R₃',
        substitution: 'R_eq = 2 Ω + 2 Ω + 2 Ω',
        explanation: 'Because there is only one continuous path, current i is identical through all three resistors. Total voltage is the sum of voltage drops (V = V₁ + V₂ + V₃).'
      },
      {
        stage: 'Step 2: Calculate Equivalent Resistance',
        formula: 'R_eq = 2 + 2 + 2',
        substitution: 'R_eq = 6 Ω',
        explanation: 'Adding the three equal values gives 6 Ω. This is the maximum possible resistance that can be obtained from three 2 Ω resistors.'
      }
    ],
    finalBox: 'R_eq = 6 Ω  (Maximum Resistance)',
    reason: 'Series combination maximizes circuit resistance because the effective length of the resistive path is tripled.'
  },
  {
    id: 'case-2-parallel',
    shortName: 'Case 2: All Parallel',
    name: 'Case 2: All 3 Resistors Connected in Parallel',
    targetResistance: '0.67 Ω',
    fractionResistance: '2/3 Ω',
    targetValue: 2 / 3,
    circuitTopology: 'R₁ ∥ R₂ ∥ R₃ (All Connected Across Common Junctions A & B)',
    examQuestion: '“How will you connect three 2 Ω resistors to obtain a minimum equivalent resistance of 2/3 Ω (0.67 Ω)?”',
    tag: 'Minimum Resistance',
    strategy: 'To get minimum resistance, connect all resistors in parallel across two common junction points.',
    derivationSteps: [
      {
        stage: 'Step 1: Formula for Parallel Combination',
        formula: '1 / R_eq = 1 / R₁ + 1 / R₂ + 1 / R₃',
        substitution: '1 / R_eq = 1/2 + 1/2 + 1/2',
        explanation: 'Each resistor is connected directly across the full applied voltage V. Total current splits into three equal branches: I = I₁ + I₂ + I₃.'
      },
      {
        stage: 'Step 2: Add Reciprocals (Common Denominator = 2)',
        formula: '1 / R_eq = (1 + 1 + 1) / 2',
        substitution: '1 / R_eq = 3 / 2 Ω⁻¹',
        explanation: 'Adding the three identical fractions 1/2 + 1/2 + 1/2 yields 3/2.'
      },
      {
        stage: 'Step 3: Invert Reciprocal to Find R_eq',
        formula: 'R_eq = 2 / 3 Ω',
        substitution: 'R_eq ≈ 0.667 Ω ≈ 0.67 Ω',
        explanation: 'Inverting 3/2 gives R_eq = 2/3 Ω. Notice that 2/3 Ω is less than the smallest individual resistor (0.67 Ω < 2 Ω).'
      }
    ],
    finalBox: 'R_eq = 2/3 Ω ≈ 0.67 Ω  (Minimum Resistance)',
    reason: 'Parallel combination minimizes circuit resistance because it provides 3 simultaneous pathways for electrons, tripling the effective cross-sectional area.'
  },
  {
    id: 'case-3-parallel-series',
    shortName: 'Case 3: (2 ∥ 2) + 2',
    name: 'Case 3: Two Resistors in Parallel, in Series with Third',
    targetResistance: '3 Ω',
    fractionResistance: '3 Ω',
    targetValue: 3,
    circuitTopology: '(R₁ ∥ R₂) + R₃ (Parallel Pair Followed by Series Resistor)',
    examQuestion: '“Show how three resistors of resistance 2 Ω each can be connected to give an equivalent resistance of 3 Ω.”',
    tag: 'Board Exam Favorite',
    strategy: 'Notice that 3 Ω is greater than 2 Ω by 1 Ω. Two 2 Ω resistors connected in parallel give exactly 1 Ω. Adding the third 2 Ω in series gives 1 Ω + 2 Ω = 3 Ω!',
    derivationSteps: [
      {
        stage: 'Step 1: Simplify the Parallel Pair (R₁ ∥ R₂)',
        formula: '1 / R_p = 1 / R₁ + 1 / R₂ = 1/2 + 1/2',
        substitution: '1 / R_p = 2 / 2 = 1 Ω⁻¹  ⇒  R_p = 1 Ω',
        explanation: 'When two identical 2 Ω resistors are connected in parallel, their equivalent resistance is halved: R_p = 2 / 2 = 1 Ω.'
      },
      {
        stage: 'Step 2: Add R₃ in Series with Equivalent Parallel Group R_p',
        formula: 'R_eq = R_p + R₃',
        substitution: 'R_eq = 1 Ω + 2 Ω = 3 Ω',
        explanation: 'The parallel pair acts as a single 1 Ω block in series with R₃ (2 Ω). Simply add their resistances together.'
      }
    ],
    finalBox: 'R_eq = 1 Ω + 2 Ω = 3 Ω',
    reason: 'Two parallel resistors halve their resistance to 1 Ω; adding 2 Ω in series yields the desired 3 Ω.'
  },
  {
    id: 'case-4-series-parallel',
    shortName: 'Case 4: (2 + 2) ∥ 2',
    name: 'Case 4: Two Resistors in Series, in Parallel with Third',
    targetResistance: '1.33 Ω',
    fractionResistance: '4/3 Ω',
    targetValue: 4 / 3,
    circuitTopology: '(R₁ + R₂) ∥ R₃ (Series Branch in Parallel with Single Resistor)',
    examQuestion: '“Show how three resistors of resistance 2 Ω each can be connected to give an equivalent resistance of 4/3 Ω (1.33 Ω).”',
    tag: 'Board Exam Favorite',
    strategy: 'Notice that 4/3 Ω is less than 2 Ω. Connecting two 2 Ω resistors in series gives a 4 Ω branch. Connecting 4 Ω in parallel with 2 Ω gives (4 × 2)/(4 + 2) = 8/6 = 4/3 Ω!',
    derivationSteps: [
      {
        stage: 'Step 1: Calculate Resistance of Top Series Branch (R₁ + R₂)',
        formula: 'R_s = R₁ + R₂',
        substitution: 'R_s = 2 Ω + 2 Ω = 4 Ω',
        explanation: 'R₁ and R₂ are connected end-to-end in the top branch, so their resistances add up to 4 Ω.'
      },
      {
        stage: 'Step 2: Connect Series Branch (4 Ω) in Parallel with R₃ (2 Ω)',
        formula: '1 / R_eq = 1 / R_s + 1 / R₃ = 1/4 + 1/2',
        substitution: '1 / R_eq = 1/4 + 2/4 = 3/4 Ω⁻¹',
        explanation: 'Convert 1/2 into equivalent fraction with denominator 4: 1/2 = 2/4. Then 1/4 + 2/4 = 3/4.'
      },
      {
        stage: 'Step 3: Invert Reciprocal to Find Final Equivalent Resistance',
        formula: 'R_eq = 4 / 3 Ω',
        substitution: 'R_eq = 4/3 Ω ≈ 1.333 Ω ≈ 1.33 Ω',
        explanation: 'Inverting 3/4 yields R_eq = 4/3 Ω = 1.33 Ω. Alternatively, using Product/Sum: (4 × 2)/(4 + 2) = 8/6 = 4/3 Ω.'
      }
    ],
    finalBox: 'R_eq = 4/3 Ω ≈ 1.33 Ω',
    reason: 'A 4 Ω series branch in parallel with 2 Ω yields a fractional intermediate resistance of exactly 4/3 Ω.'
  }
];

export const ThreeResistorCombinationsView: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1-series');
  const [viewMode, setViewMode] = useState<'single' | 'gallery'>('single');
  const [isCurrentFlowing, setIsCurrentFlowing] = useState<boolean>(true);
  const [animSpeed, setAnimSpeed] = useState<'normal' | 'slow'>('normal');
  const [testVoltage, setTestVoltage] = useState<number>(12); // Applied Volts
  const [copied, setCopied] = useState<boolean>(false);

  const activeCase = COMBINATIONS.find((c) => c.id === selectedCaseId) || COMBINATIONS[0];

  // Live circuit electrical computations for the active case
  const liveCircuitMetrics = useMemo(() => {
    const v = testVoltage;
    const rEq = activeCase.targetValue;
    const totalCurrent = v / rEq;

    let branch1Current = 0;
    let branch2Current = 0;
    let branch3Current = 0;
    let vDrop1 = 0;
    let vDrop2 = 0;
    let vDrop3 = 0;

    if (activeCase.id === 'case-1-series') {
      // Series: same current through all
      branch1Current = totalCurrent;
      branch2Current = totalCurrent;
      branch3Current = totalCurrent;
      vDrop1 = totalCurrent * 2;
      vDrop2 = totalCurrent * 2;
      vDrop3 = totalCurrent * 2;
    } else if (activeCase.id === 'case-2-parallel') {
      // Parallel: same voltage across all
      branch1Current = v / 2;
      branch2Current = v / 2;
      branch3Current = v / 2;
      vDrop1 = v;
      vDrop2 = v;
      vDrop3 = v;
    } else if (activeCase.id === 'case-3-parallel-series') {
      // (R1 || R2) + R3
      // Total current passes through R3 and splits equally between R1 and R2
      branch3Current = totalCurrent;
      branch1Current = totalCurrent / 2;
      branch2Current = totalCurrent / 2;
      vDrop3 = totalCurrent * 2;
      vDrop1 = branch1Current * 2;
      vDrop2 = branch2Current * 2;
    } else if (activeCase.id === 'case-4-series-parallel') {
      // (R1 + R2) || R3
      // Top branch has 4 Ω; bottom has 2 Ω
      const topCurrent = v / 4;
      const bottomCurrent = v / 2;
      branch1Current = topCurrent;
      branch2Current = topCurrent;
      branch3Current = bottomCurrent;
      vDrop1 = topCurrent * 2;
      vDrop2 = topCurrent * 2;
      vDrop3 = v;
    }

    return {
      totalCurrent,
      branch1Current,
      branch2Current,
      branch3Current,
      vDrop1,
      vDrop2,
      vDrop3,
      power: v * totalCurrent
    };
  }, [testVoltage, activeCase]);

  const handleCopyAllNotes = () => {
    const text = `
========================================================================
CONNECTING THREE 2 Ω RESISTORS IN ALL 4 COMBINATIONS (AP SSC / CBSE CLASS 10)
========================================================================
Given: Three identical resistors of resistance R₁ = 2 Ω, R₂ = 2 Ω, R₃ = 2 Ω.

------------------------------------------------------------------------
1. CASE 1: ALL THREE IN SERIES (MAXIMUM RESISTANCE = 6 Ω)
------------------------------------------------------------------------
• Arrangement: R₁ + R₂ + R₃ connected end-to-end.
• Derivation:
  R_eq = R₁ + R₂ + R₃
  R_eq = 2 Ω + 2 Ω + 2 Ω = 6 Ω
• Result: R_eq = 6 Ω (Maximum possible resistance).

------------------------------------------------------------------------
2. CASE 2: ALL THREE IN PARALLEL (MINIMUM RESISTANCE = 0.67 Ω)
------------------------------------------------------------------------
• Arrangement: R₁ ∥ R₂ ∥ R₃ connected across common junction points A & B.
• Derivation:
  1 / R_eq = 1/R₁ + 1/R₂ + 1/R₃
  1 / R_eq = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹
  Inverting both sides:
  R_eq = 2/3 Ω ≈ 0.67 Ω
• Result: R_eq = 2/3 Ω ≈ 0.67 Ω (Minimum possible resistance, strictly < 2 Ω).

------------------------------------------------------------------------
3. CASE 3: TWO IN PARALLEL, IN SERIES WITH THIRD (TARGET = 3 Ω)
------------------------------------------------------------------------
• Arrangement: (R₁ ∥ R₂) + R₃
• Derivation:
  Step A: Equivalent of parallel pair (R₁ ∥ R₂):
          1/R_p = 1/2 + 1/2 = 2/2 = 1 Ω⁻¹  ⇒  R_p = 1 Ω
  Step B: Add third resistor R₃ in series with R_p:
          R_eq = R_p + R₃ = 1 Ω + 2 Ω = 3 Ω
• Result: R_eq = 3 Ω (Most frequent board exam numerical!).

------------------------------------------------------------------------
4. CASE 4: TWO IN SERIES, IN PARALLEL WITH THIRD (TARGET = 4/3 Ω = 1.33 Ω)
------------------------------------------------------------------------
• Arrangement: (R₁ + R₂) ∥ R₃
• Derivation:
  Step A: Series branch resistance R_s = R₁ + R₂ = 2 Ω + 2 Ω = 4 Ω
  Step B: Connect R_s (4 Ω) in parallel with R₃ (2 Ω):
          1/R_eq = 1/R_s + 1/R₃ = 1/4 + 1/2 = 1/4 + 2/4 = 3/4 Ω⁻¹
          Inverting: R_eq = 4/3 Ω ≈ 1.33 Ω
• Result: R_eq = 4/3 Ω ≈ 1.33 Ω.

========================================================================
SUMMARY STRATEGY FOR BOARD EXAMS:
Target 6 Ω    ⇒ Connect ALL in SERIES
Target 0.67 Ω ⇒ Connect ALL in PARALLEL
Target 3 Ω    ⇒ TWO in PARALLEL, then in SERIES with third
Target 1.33 Ω ⇒ TWO in SERIES, then in PARALLEL with third
========================================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Helper to render an animated circuit SVG diagram for any case
  const renderCircuitSVG = (caseId: string, isCompact: boolean = false) => {
    const height = isCompact ? 190 : 250;
    const animDuration = animSpeed === 'slow' ? '1.8s' : '0.9s';

    return (
      <svg
        viewBox="0 0 620 250"
        className="w-full h-auto select-none rounded-xl"
        style={{ maxHeight: height }}
      >
        <defs>
          <style>{`
            @keyframes electronPulse {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
            .dash-flow {
              animation: electronPulse ${animDuration} linear infinite;
            }
          `}</style>

          {/* Gradients */}
          <linearGradient id="chalkboardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#091428" />
            <stop offset="100%" stopColor="#030816" />
          </linearGradient>
          <linearGradient id="emeraldBadgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#064e3b" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {/* Blueprint Circuit Background */}
        <rect width="620" height="250" rx="12" fill="#040914" stroke="#1e293b" strokeWidth="1.5" />

        {/* Fine grid lines */}
        <path
          d="M 60 0 L 60 250 M 120 0 L 120 250 M 180 0 L 180 250 M 240 0 L 240 250 M 300 0 L 300 250 M 360 0 L 360 250 M 420 0 L 420 250 M 480 0 L 480 250 M 540 0 L 540 250"
          stroke="#0f172a"
          strokeWidth="0.8"
        />
        <path
          d="M 0 50 L 620 50 M 0 100 L 620 100 M 0 150 L 620 150 M 0 200 L 620 200"
          stroke="#0f172a"
          strokeWidth="0.8"
        />

        {/* Terminals A (+) and B (-) */}
        <g>
          <circle cx="36" cy="125" r="9" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="36" cy="125" r="4" fill="#f59e0b" />
          <text x="36" y="103" fill="#f59e0b" fontSize="13" fontWeight="900" textAnchor="middle">
            A (+)
          </text>

          <circle cx="584" cy="125" r="9" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <circle cx="584" cy="125" r="4" fill="#38bdf8" />
          <text x="584" y="103" fill="#38bdf8" fontSize="13" fontWeight="900" textAnchor="middle">
            B (−)
          </text>
        </g>

        {/* ========================================================================= */}
        {/* CASE 1: ALL 3 IN SERIES */}
        {/* ========================================================================= */}
        {caseId === 'case-1-series' && (
          <g>
            {/* Base Wire Path */}
            <path
              d="M 36 125 L 90 125 M 190 125 L 240 125 M 340 125 L 390 125 M 490 125 L 584 125"
              fill="none"
              stroke="#334155"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Animated Current Path */}
            {isCurrentFlowing && (
              <path
                d="M 36 125 L 90 125 M 190 125 L 240 125 M 340 125 L 390 125 M 490 125 L 584 125"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeDasharray="8 6"
                className="dash-flow"
              />
            )}

            {/* Direction Arrows */}
            <path d="M 60 122 L 68 125 L 60 128" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 215 122 L 223 125 L 215 128" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 365 122 L 373 125 L 365 128" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 535 122 L 543 125 L 535 128" fill="none" stroke="#f59e0b" strokeWidth="2" />

            {/* Resistor 1: 2 Ω */}
            <g transform="translate(90, 110)">
              <rect x="0" y="-2" width="100" height="34" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path
                d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="50" y="-8" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                R₁ = 2 Ω
              </text>
            </g>

            {/* Resistor 2: 2 Ω */}
            <g transform="translate(240, 110)">
              <rect x="0" y="-2" width="100" height="34" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path
                d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="50" y="-8" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                R₂ = 2 Ω
              </text>
            </g>

            {/* Resistor 3: 2 Ω */}
            <g transform="translate(390, 110)">
              <rect x="0" y="-2" width="100" height="34" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <path
                d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text x="50" y="-8" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                R₃ = 2 Ω
              </text>
            </g>

            {/* Calculation & Final Resistance Chalkboard inside the diagram */}
            <g transform="translate(90, 175)">
              <rect x="0" y="0" width="400" height="58" rx="8" fill="url(#chalkboardGrad)" stroke="#10b981" strokeWidth="1.8" />
              <text x="15" y="24" fill="#94a3b8" fontSize="12" fontWeight="bold">
                Formula: R_eq = R₁ + R₂ + R₃ = 2 + 2 + 2
              </text>
              <text x="15" y="47" fill="#34d399" fontSize="17" fontWeight="900" fontFamily="monospace">
                Final R_eq = 6 Ω  (MAXIMUM RESISTANCE)
              </text>
              <rect x="300" y="10" width="85" height="38" rx="6" fill="#064e3b" stroke="#34d399" strokeWidth="1.2" />
              <text x="342" y="26" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">RESULT</text>
              <text x="342" y="41" fill="#ffffff" fontSize="14" textAnchor="middle" fontWeight="900">6 Ω</text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* CASE 2: ALL 3 IN PARALLEL */}
        {/* ========================================================================= */}
        {caseId === 'case-2-parallel' && (
          <g>
            {/* Trunk wire from A to Junction 1 */}
            <path d="M 36 125 L 140 125" fill="none" stroke="#334155" strokeWidth="4" />
            {/* Trunk wire from Junction 2 to B */}
            <path d="M 440 125 L 584 125" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Branching rail wires */}
            <path
              d="M 140 125 L 180 50 L 220 50 M 320 50 L 400 50 L 440 125
                 M 140 125 L 220 125 M 320 125 L 440 125
                 M 140 125 L 180 200 L 220 200 M 320 200 L 400 200 L 440 125"
              fill="none"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated Current through all 3 branches */}
            {isCurrentFlowing && (
              <>
                <path d="M 36 125 L 140 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
                <path
                  d="M 140 125 L 180 50 L 220 50 M 320 50 L 400 50 L 440 125
                     M 140 125 L 220 125 M 320 125 L 440 125
                     M 140 125 L 180 200 L 220 200 M 320 200 L 400 200 L 440 125"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="dash-flow"
                />
                <path d="M 440 125 L 584 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
              </>
            )}

            {/* Junction Nodes */}
            <circle cx="140" cy="125" r="6" fill="#f59e0b" />
            <text x="140" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Node 1</text>

            <circle cx="440" cy="125" r="6" fill="#f59e0b" />
            <text x="440" y="145" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Node 2</text>

            {/* Top Branch Resistor R1 */}
            <g transform="translate(220, 35)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Branch 1: R₁ = 2 Ω</text>
            </g>

            {/* Middle Branch Resistor R2 */}
            <g transform="translate(220, 110)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Branch 2: R₂ = 2 Ω</text>
            </g>

            {/* Bottom Branch Resistor R3 */}
            <g transform="translate(220, 185)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Branch 3: R₃ = 2 Ω</text>
            </g>

            {/* Calculation Badge inside diagram */}
            <g transform="translate(460, 65)">
              <rect x="0" y="0" width="145" height="120" rx="8" fill="url(#chalkboardGrad)" stroke="#10b981" strokeWidth="1.8" />
              <text x="72" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">1/Req = 1/2+1/2+1/2</text>
              <text x="72" y="44" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">1/Req = 3/2 Ω⁻¹</text>
              <line x1="15" y1="56" x2="130" y2="56" stroke="#334155" strokeWidth="1" />
              <text x="72" y="74" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Invert Reciprocal:</text>
              <text x="72" y="94" fill="#34d399" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">Req = 2/3 Ω</text>
              <text x="72" y="110" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">≈ 0.67 Ω</text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* CASE 3: TWO IN PARALLEL + ONE IN SERIES */}
        {/* ========================================================================= */}
        {caseId === 'case-3-parallel-series' && (
          <g>
            {/* Trunk wire from A to Parallel Node 1 */}
            <path d="M 36 125 L 90 125" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Parallel pair loop */}
            <path
              d="M 90 125 L 130 65 L 160 65 M 260 65 L 290 65 L 325 125
                 M 90 125 L 130 185 L 160 185 M 260 185 L 290 185 L 325 125"
              fill="none"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Series connecting wire from Node 2 to R3 to B */}
            <path d="M 325 125 L 390 125 M 490 125 L 584 125" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Animated Current */}
            {isCurrentFlowing && (
              <>
                <path d="M 36 125 L 90 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
                <path
                  d="M 90 125 L 130 65 L 160 65 M 260 65 L 290 65 L 325 125
                     M 90 125 L 130 185 L 160 185 M 260 185 L 290 185 L 325 125"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="dash-flow"
                />
                <path d="M 325 125 L 390 125 M 490 125 L 584 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
              </>
            )}

            {/* Nodes */}
            <circle cx="90" cy="125" r="5" fill="#f59e0b" />
            <circle cx="325" cy="125" r="5" fill="#f59e0b" />

            {/* Parallel Top: R1 */}
            <g transform="translate(160, 50)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">R₁ = 2 Ω</text>
            </g>

            {/* Parallel Bottom: R2 */}
            <g transform="translate(160, 170)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">R₂ = 2 Ω</text>
            </g>

            {/* Parallel Equivalent Callout Box in the middle */}
            <g transform="translate(175, 107)">
              <rect x="0" y="0" width="90" height="34" rx="6" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
              <text x="45" y="16" fill="#94a3b8" fontSize="10" textAnchor="middle">2 Ω ∥ 2 Ω</text>
              <text x="45" y="29" fill="#38bdf8" fontSize="12" fontWeight="900" textAnchor="middle">Rp = 1 Ω</text>
            </g>

            {/* Series Resistor: R3 */}
            <g transform="translate(390, 110)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-8" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">R₃ = 2 Ω (in series)</text>
            </g>

            {/* Final Calculation Chalkboard inside diagram */}
            <g transform="translate(350, 170)">
              <rect x="0" y="0" width="245" height="65" rx="8" fill="url(#chalkboardGrad)" stroke="#10b981" strokeWidth="1.8" />
              <text x="15" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold">Step 1: Rp = (2 × 2)/(2 + 2) = 1 Ω</text>
              <text x="15" y="44" fill="#38bdf8" fontSize="11" fontWeight="bold">Step 2: Req = Rp + R₃ = 1 + 2</text>
              <text x="15" y="60" fill="#34d399" fontSize="16" fontWeight="900" fontFamily="monospace">Final R_eq = 3 Ω</text>
            </g>
          </g>
        )}

        {/* ========================================================================= */}
        {/* CASE 4: TWO IN SERIES + ONE IN PARALLEL */}
        {/* ========================================================================= */}
        {caseId === 'case-4-series-parallel' && (
          <g>
            {/* Trunk wire from A to Node 1 */}
            <path d="M 36 125 L 95 125" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Branching: Top Series pair and Bottom Single */}
            <path
              d="M 95 125 L 135 60 L 155 60 M 245 60 L 275 60 M 365 60 L 400 60 L 440 125
                 M 95 125 L 135 180 L 220 180 M 320 180 L 400 180 L 440 125"
              fill="none"
              stroke="#334155"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Trunk from Node 2 to B */}
            <path d="M 440 125 L 584 125" fill="none" stroke="#334155" strokeWidth="4" />

            {/* Animated Current */}
            {isCurrentFlowing && (
              <>
                <path d="M 36 125 L 95 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
                <path
                  d="M 95 125 L 135 60 L 155 60 M 245 60 L 275 60 M 365 60 L 400 60 L 440 125
                     M 95 125 L 135 180 L 220 180 M 320 180 L 400 180 L 440 125"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="dash-flow"
                />
                <path d="M 440 125 L 584 125" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 6" className="dash-flow" />
              </>
            )}

            {/* Nodes */}
            <circle cx="95" cy="125" r="5" fill="#f59e0b" />
            <circle cx="440" cy="125" r="5" fill="#f59e0b" />

            {/* Top Branch Resistor 1 */}
            <g transform="translate(155, 45)">
              <path d="M 0 15 L 10 15 L 14 3 L 24 27 L 34 3 L 44 27 L 54 3 L 64 27 L 74 3 L 80 15 L 90 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="45" y="-6" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">R₁ = 2 Ω</text>
            </g>

            {/* Top Branch Resistor 2 */}
            <g transform="translate(275, 45)">
              <path d="M 0 15 L 10 15 L 14 3 L 24 27 L 34 3 L 44 27 L 54 3 L 64 27 L 74 3 L 80 15 L 90 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="45" y="-6" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">R₂ = 2 Ω</text>
            </g>

            {/* Top branch total callout */}
            <rect x="200" y="90" width="140" height="24" rx="4" fill="#0f172a" stroke="#0284c7" strokeWidth="1" />
            <text x="270" y="106" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
              Top Branch = 2 + 2 = 4 Ω
            </text>

            {/* Bottom Branch: R3 */}
            <g transform="translate(220, 165)">
              <path d="M 0 15 L 10 15 L 16 3 L 28 27 L 40 3 L 52 27 L 64 3 L 76 27 L 88 3 L 94 15 L 100 15" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="50" y="-6" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Bottom: R₃ = 2 Ω</text>
            </g>

            {/* Chalkboard Box on the right */}
            <g transform="translate(460, 65)">
              <rect x="0" y="0" width="145" height="120" rx="8" fill="url(#chalkboardGrad)" stroke="#10b981" strokeWidth="1.8" />
              <text x="72" y="24" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">Parallel: 4 Ω ∥ 2 Ω</text>
              <text x="72" y="44" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">1/Req = 1/4 + 1/2</text>
              <text x="72" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">= 1/4 + 2/4 = 3/4</text>
              <line x1="15" y1="70" x2="130" y2="70" stroke="#334155" strokeWidth="1" />
              <text x="72" y="86" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Invert Reciprocal:</text>
              <text x="72" y="103" fill="#34d399" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="monospace">Req = 4/3 Ω</text>
              <text x="72" y="116" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">≈ 1.33 Ω</text>
            </g>
          </g>
        )}
      </svg>
    );
  };

  return (
    <section className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 sm:p-7 space-y-6 shadow-xl">
      {/* ========================================================================= */}
      {/* SECTION HEADER & CONTROL TOOLBAR */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>AP SSC &amp; CBSE Class 10 Core Derivation • 3 Resistors in All Combinations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Connecting Three 2 Ω Resistors in Various Combinations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
            There are exactly <strong>4 distinct ways</strong> to connect three 2 Ω resistors. Explore the animated circuit diagrams showing how electric current splits, with full mathematical proofs for finding the final equivalent resistance (<strong>6 Ω, 0.67 Ω, 3 Ω, and 1.33 Ω</strong>).
          </p>
        </div>

        {/* Global Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('single')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Interactive Study</span>
            </button>
            <button
              onClick={() => setViewMode('gallery')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>All 4 Gallery</span>
            </button>
          </div>

          {/* Copy Notes Button */}
          <button
            onClick={handleCopyAllNotes}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Memorized Notes'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 COMBINATION SELECTOR TABS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {COMBINATIONS.map((c, idx) => {
          const isSelected = c.id === selectedCaseId && viewMode === 'single';
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setViewMode('single');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-amber-400/20 to-amber-500/5 border-amber-400 ring-2 ring-amber-400/30 shadow-lg'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Case {idx + 1}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded font-black font-mono shadow-xs ${
                    isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-amber-300'
                  }`}
                >
                  R_eq = {c.targetResistance}
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white line-clamp-1 mb-1">
                {c.shortName.replace(`Case ${idx + 1}: `, '')}
              </span>
              <span className="text-[10px] text-slate-400 line-clamp-1">
                {c.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: INTERACTIVE STUDY (ANIMATED DIAGRAM + DERIVATION MATH) */}
      {/* ========================================================================= */}
      {viewMode === 'single' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 Cols): Animated Circuit Schematic */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-4 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                    Interactive Animated Circuit
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    {activeCase.name}
                  </h3>
                </div>

                {/* Circuit Flow Controls */}
                <div className="flex items-center gap-2">
                  {/* Speed toggle */}
                  <button
                    onClick={() => setAnimSpeed(animSpeed === 'normal' ? 'slow' : 'normal')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-semibold cursor-pointer"
                  >
                    Speed: <span className="text-amber-400">{animSpeed === 'normal' ? '1x' : '0.5x'}</span>
                  </button>

                  {/* Play/Pause */}
                  <button
                    onClick={() => setIsCurrentFlowing(!isCurrentFlowing)}
                    className={`text-[11px] px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrentFlowing
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCurrentFlowing ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                    <span>{isCurrentFlowing ? 'Current Flowing' : 'Paused'}</span>
                  </button>
                </div>
              </div>

              {/* The SVG Circuit Diagram */}
              <div className="w-full bg-slate-950 rounded-xl border border-slate-800/90 p-1 sm:p-2 overflow-hidden shadow-inner">
                {renderCircuitSVG(activeCase.id)}
              </div>

              {/* Live Test Circuit Experimenter Banner */}
              <div className="bg-slate-900/80 rounded-xl border border-slate-800 p-3 sm:p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Test Source (Apply Potential Difference across A &amp; B)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[6, 12, 24].map((v) => (
                      <button
                        key={v}
                        onClick={() => setTestVoltage(v)}
                        className={`text-[10px] px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                          testVoltage === v
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {v} V
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">2V</span>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    step="1"
                    value={testVoltage}
                    onChange={(e) => setTestVoltage(Number(e.target.value))}
                    className="flex-1 accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <span className="text-xs font-mono text-slate-400">24V</span>
                  <span className="px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-xs border border-amber-400/30">
                    V = {testVoltage} V
                  </span>
                </div>

                {/* Live Output Readings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center font-mono">
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Total Current (I)</span>
                    <span className="text-xs sm:text-sm font-bold text-amber-400">
                      {liveCircuitMetrics.totalCurrent.toFixed(2)} A
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Branch 1 (R₁)</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300">
                      {liveCircuitMetrics.branch1Current.toFixed(2)} A
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Branch 2 (R₂)</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300">
                      {liveCircuitMetrics.branch2Current.toFixed(2)} A
                    </span>
                  </div>
                  <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-sans">Branch 3 (R₃)</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-300">
                      {liveCircuitMetrics.branch3Current.toFixed(2)} A
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 Cols): Step-by-Step Finding Final Resistance */}
            <div className="lg:col-span-5 space-y-4">
              {/* Derivation Steps Card */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Mathematical Derivation
                    </span>
                    <h4 className="text-sm font-bold text-white">Finding Final Resistance</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Equivalent</span>
                    <span className="text-sm font-mono font-black text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-500/40 shadow-xs">
                      {activeCase.targetResistance}
                    </span>
                  </div>
                </div>

                {/* Circuit Strategy Banner */}
                <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl space-y-1">
                  <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    Connecting Strategy:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeCase.strategy}
                  </p>
                </div>

                {/* Step-by-Step Breakdown */}
                <div className="space-y-3">
                  {activeCase.derivationSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400 font-sans">
                          {step.stage}
                        </span>
                        <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                          Step {sIdx + 1}
                        </span>
                      </div>

                      {/* Formula & Substitution */}
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono space-y-1">
                        <div className="text-xs text-slate-400">{step.formula}</div>
                        <div className="text-sm font-bold text-amber-300">{step.substitution}</div>
                      </div>

                      <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                        {step.explanation}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final Result Box */}
                <div className="p-3.5 bg-gradient-to-r from-emerald-950/70 to-teal-950/70 rounded-xl border-2 border-emerald-500/60 shadow-lg text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">
                    Final Equivalent Resistance
                  </span>
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300 tracking-wide">
                    {activeCase.finalBox}
                  </div>
                  <p className="text-[11px] text-emerald-200/80 font-sans">
                    {activeCase.reason}
                  </p>
                </div>
              </div>

              {/* Board Exam Standard Question Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  <span>Standard Board Exam Question:</span>
                </div>
                <blockquote className="text-xs font-semibold text-white bg-slate-900 p-2.5 rounded-lg border-l-4 border-amber-400 leading-relaxed italic">
                  {activeCase.examQuestion}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* VIEW MODE 2: GALLERY MODE (ALL 4 COMBINATIONS SIDE-BY-SIDE) */
        /* ========================================================================= */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {COMBINATIONS.map((c, idx) => (
              <div
                key={c.id}
                className="bg-slate-950 rounded-2xl border border-slate-800 p-4 space-y-3 shadow-lg hover:border-slate-700 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-400/30">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white">{c.name}</h3>
                  </div>
                  <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40">
                    {c.targetResistance}
                  </span>
                </div>

                {/* Compact Animated SVG */}
                <div className="bg-slate-950 rounded-xl border border-slate-800/80 p-1 overflow-hidden shadow-inner">
                  {renderCircuitSVG(c.id, true)}
                </div>

                {/* Mathematical Summary */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
                  <div className="text-slate-400 font-sans text-[11px] font-semibold">
                    Topology: <span className="text-amber-300 font-mono">{c.circuitTopology}</span>
                  </div>
                  <div className="text-cyan-300 font-bold">
                    {c.derivationSteps[c.derivationSteps.length - 1].formula}
                  </div>
                  <div className="text-emerald-400 font-black text-sm">
                    {c.finalBox}
                  </div>
                </div>

                {/* Inspect Button */}
                <button
                  onClick={() => {
                    setSelectedCaseId(c.id);
                    setViewMode('single');
                  }}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 border border-slate-800"
                >
                  <span>Open Detailed Interactive View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUMMARY COMPARISON TABLE FOR BOARD EXAM REVISION */}
      {/* ========================================================================= */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg">
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Comprehensive Comparison of All 4 Combinations of Three 2 Ω Resistors
            </span>
          </div>
          <span className="text-[11px] text-amber-400 font-bold">
            Only 4 unique mathematical topologies exist!
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/50 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-bold">
              <tr>
                <th className="p-3.5">Case #</th>
                <th className="p-3.5">Circuit Connection</th>
                <th className="p-3.5">Mathematical Formula</th>
                <th className="p-3.5">Equivalent Resistance</th>
                <th className="p-3.5">Fraction vs Decimal</th>
                <th className="p-3.5">Board Exam Question Hint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5 font-sans font-bold text-amber-400">Case 1</td>
                <td className="p-3.5 font-sans text-white font-semibold">All 3 in Series</td>
                <td className="p-3.5 text-cyan-300">R_eq = R₁ + R₂ + R₃</td>
                <td className="p-3.5 font-black text-amber-400 text-sm">6 Ω</td>
                <td className="p-3.5 text-slate-300 font-sans">Integer (6 Ω)</td>
                <td className="p-3.5 font-sans text-slate-300">Asked when maximum resistance is needed.</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5 font-sans font-bold text-amber-400">Case 2</td>
                <td className="p-3.5 font-sans text-white font-semibold">All 3 in Parallel</td>
                <td className="p-3.5 text-cyan-300">1/R_eq = 1/2 + 1/2 + 1/2 = 3/2</td>
                <td className="p-3.5 font-black text-emerald-400 text-sm">0.67 Ω</td>
                <td className="p-3.5 text-slate-300 font-sans">2/3 Ω ≈ 0.67 Ω</td>
                <td className="p-3.5 font-sans text-slate-300">Asked when minimum resistance (&lt; 2 Ω) is needed.</td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5 font-sans font-bold text-amber-400">Case 3</td>
                <td className="p-3.5 font-sans text-white font-semibold">(Two in Parallel) + Series</td>
                <td className="p-3.5 text-cyan-300">R_eq = (2 ∥ 2) + 2 = 1 + 2</td>
                <td className="p-3.5 font-black text-cyan-400 text-sm">3 Ω</td>
                <td className="p-3.5 text-slate-300 font-sans">Integer (3 Ω)</td>
                <td className="p-3.5 font-sans text-slate-300 font-bold text-amber-300">
                  Most frequent question: “Connect to get 3 Ω”.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40 transition-colors">
                <td className="p-3.5 font-sans font-bold text-amber-400">Case 4</td>
                <td className="p-3.5 font-sans text-white font-semibold">(Two in Series) ∥ Parallel</td>
                <td className="p-3.5 text-cyan-300">1/R_eq = 1/4 + 1/2 = 3/4</td>
                <td className="p-3.5 font-black text-purple-400 text-sm">1.33 Ω</td>
                <td className="p-3.5 text-slate-300 font-sans">4/3 Ω ≈ 1.33 Ω</td>
                <td className="p-3.5 font-sans text-slate-300 font-bold text-purple-300">
                  Frequent question: “Connect to get 4/3 Ω (or 1.33 Ω)”.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Reverse-Engineering Strategy Footer */}
        <div className="p-4 bg-slate-900/70 border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Rule of Thumb:</span>
            <span>Target &gt; 2 Ω by integer $\to$ (Parallel Pair + Series). Target &lt; 2 Ω but &gt; 1 Ω $\to$ (Series Pair ∥ Single).</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Guaranteed 100% Score on Resistor Combinations</span>
          </div>
        </div>
      </div>
    </section>
  );
};
