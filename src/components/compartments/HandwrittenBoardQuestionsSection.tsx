import React, { useState } from 'react';
import {
  HelpCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Zap,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Flame,
  Check,
  X,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MatchItem {
  id: number;
  term: string;
  correctKey: string;
  explanation: string;
}

export const HandwrittenBoardQuestionsSection: React.FC = () => {
  // Question 1: Resistor Combinations state
  const [showResistorAnswer, setShowResistorAnswer] = useState<boolean>(false);
  const [selectedResistorCombo, setSelectedResistorCombo] = useState<number>(0);

  // Question 2: Match Units state
  const [showUnitsAnswer, setShowUnitsAnswer] = useState<boolean>(false);
  const [userUnitMatches, setUserUnitMatches] = useState<Record<number, string>>({});
  const [isUnitsChecked, setIsUnitsChecked] = useState<boolean>(false);

  // Question 3: Match Formulas state
  const [showFormulasAnswer, setShowFormulasAnswer] = useState<boolean>(false);
  const [userFormulaMatches, setUserFormulaMatches] = useState<Record<number, string>>({});
  const [isFormulasChecked, setIsFormulasChecked] = useState<boolean>(false);

  // Units Match Data
  const unitsData: MatchItem[] = [
    {
      id: 1,
      term: 'Electric charge',
      correctKey: 'g',
      explanation: 'SI unit of electric charge (q) is Coulomb (C). 1 C = 6.25 × 10¹⁸ electrons.'
    },
    {
      id: 2,
      term: 'Electric current',
      correctKey: 'f',
      explanation: 'SI unit of electric current (I) is Ampere (A). 1 A = 1 Coulomb / second.'
    },
    {
      id: 3,
      term: 'Resistance',
      correctKey: 'b',
      explanation: 'SI unit of electrical resistance (R) is Ohm (Ω). 1 Ω = 1 Volt / 1 Ampere.'
    },
    {
      id: 4,
      term: 'Specific resistivity',
      correctKey: 'a',
      explanation: 'SI unit of specific resistivity (ρ) is ohm-m (Ω·m). It is an intrinsic property of the material.'
    },
    {
      id: 5,
      term: 'Electric power',
      correctKey: 'd',
      explanation: 'SI unit of electric power (P) is Watt (W). 1 W = 1 Joule / second = 1 V × 1 A.'
    },
    {
      id: 6,
      term: 'Electric energy',
      correctKey: 'c',
      explanation: 'Commercial unit of electric energy (E) is kilowatt-hour (kWh). 1 kWh = 3.6 × 10⁶ Joules.'
    },
    {
      id: 7,
      term: 'Potential difference',
      correctKey: 'e',
      explanation: 'SI unit of potential difference (V) is Volt (V). 1 Volt = 1 Joule / 1 Coulomb.'
    }
  ];

  const unitsOptions = [
    { key: 'a', label: 'ohm-m (Ω·m)' },
    { key: 'b', label: 'ohm (Ω)' },
    { key: 'c', label: 'kWh' },
    { key: 'd', label: 'Watt (W)' },
    { key: 'e', label: 'Volt (V)' },
    { key: 'f', label: 'Ampere (A)' },
    { key: 'g', label: 'Coulomb (C)' }
  ];

  // Formulas Match Data
  const formulasData: MatchItem[] = [
    {
      id: 1,
      term: 'Electric charge',
      correctKey: 'g',
      explanation: 'q = i × t. Since current I = q/t, total charge q = I × t.'
    },
    {
      id: 2,
      term: 'Electric current',
      correctKey: 'c',
      explanation: 'I = q / t. Rate of flow of electric charges across a conductor cross-section.'
    },
    {
      id: 3,
      term: 'Potential difference',
      correctKey: 'e',
      explanation: 'V = W / q. Work done in displacing unit positive charge between two points.'
    },
    {
      id: 4,
      term: 'Resistance',
      correctKey: 'b',
      explanation: 'R = ρ(l / A). Resistance is directly proportional to length (l) and inversely to cross-section (A).'
    },
    {
      id: 5,
      term: 'Specific resistivity',
      correctKey: 'a',
      explanation: 'ρ = R(A / l). Rearranging R = ρ(l/A) yields ρ = R × A / l.'
    },
    {
      id: 6,
      term: 'Electric power',
      correctKey: 'd',
      explanation: 'P = V × I. Power is the product of potential difference and electric current.'
    },
    {
      id: 7,
      term: 'Electrical energy',
      correctKey: 'i',
      explanation: 'E = P × t. Electrical energy consumed is power multiplied by time elapsed.'
    },
    {
      id: 8,
      term: 'Joule Heat',
      correctKey: 'f',
      explanation: 'H = I²Rt. Heat produced in a conductor is proportional to current squared, resistance, and time.'
    }
  ];

  const formulasOptions = [
    { key: 'a', label: 'R(A / l)' },
    { key: 'b', label: 'ρ(l / A)' },
    { key: 'c', label: 'q / t' },
    { key: 'd', label: 'V × I' },
    { key: 'e', label: 'W / q' },
    { key: 'f', label: 'I²Rt' },
    { key: 'g', label: 'i × t' },
    { key: 'i', label: 'P × t' }
  ];

  // Resistor Combinations Data
  const resistorCombinations = [
    {
      id: 1,
      title: 'Combination 1: All Three in Series',
      formula: 'R_s = R₁ + R₂ + R₃ = 2 + 2 + 2 = 6 Ω',
      result: '6 Ω',
      badge: 'Maximum Resistance (R_max)',
      diagramType: 'series',
      steps: [
        'Resistors R₁ (2 Ω), R₂ (2 Ω), and R₃ (2 Ω) are connected end-to-end.',
        'Total equivalent resistance: R_series = 2 Ω + 2 Ω + 2 Ω = 6 Ω.',
        'This produces the MAXIMUM possible resistance from three 2 Ω resistors.'
      ]
    },
    {
      id: 2,
      title: 'Combination 2: All Three in Parallel',
      formula: '1/R_p = 1/R₁ + 1/R₂ + 1/R₃ = 1/2 + 1/2 + 1/2 = 3/2 ⇒ R_p = 2/3 Ω ≈ 0.67 Ω',
      result: '2/3 Ω (0.67 Ω)',
      badge: 'Minimum Resistance (R_min)',
      diagramType: 'parallel',
      steps: [
        'All three resistors are connected between two common junction points.',
        '1/R_p = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹.',
        'Inverting gives: R_parallel = 2/3 Ω = 0.667 Ω.',
        'This produces the MINIMUM possible resistance from three 2 Ω resistors.'
      ]
    },
    {
      id: 3,
      title: 'Combination 3: Two in Parallel, in Series with the Third',
      formula: 'R = (R₁ ∥ R₂) + R₃ = (2 ∥ 2) + 2 = 1 + 2 = 3 Ω',
      result: '3 Ω',
      badge: 'Mixed Combination A',
      diagramType: 'parallel_series',
      steps: [
        'Step 1: Calculate parallel combination of two 2 Ω resistors: R_p = (2 × 2) / (2 + 2) = 4 / 4 = 1 Ω.',
        'Step 2: Add the third 2 Ω resistor in series with this parallel branch: R_total = R_p + R₃ = 1 Ω + 2 Ω = 3 Ω.'
      ]
    },
    {
      id: 4,
      title: 'Combination 4: Two in Series, in Parallel with the Third',
      formula: 'R = (R₁ + R₂) ∥ R₃ = (2 + 2) ∥ 2 = 4 ∥ 2 = (4 × 2)/(4 + 2) = 8/6 = 4/3 Ω ≈ 1.33 Ω',
      result: '4/3 Ω (1.33 Ω)',
      badge: 'Mixed Combination B',
      diagramType: 'series_parallel',
      steps: [
        'Step 1: Calculate series combination of two 2 Ω resistors: R_s = 2 Ω + 2 Ω = 4 Ω.',
        'Step 2: This 4 Ω branch is connected in parallel with the third 2 Ω resistor:',
        '1/R_total = 1/4 + 1/2 = 3/4 ⇒ R_total = 4/3 Ω = 1.33 Ω.'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-2 border-amber-400/40 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Handwritten Notebook Exam Practice</span>
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                AP SSC Core Board Standard
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Classroom Notebook Questions &amp; Hidden Answers</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              Solve the 3 handwritten problems directly from your teacher&apos;s exam notebook page. Attempt each question yourself first, then click <strong>&quot;Show Hidden Answer&quot;</strong> to reveal the complete step-by-step verification and formula derivations!
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 border border-amber-400/30 rounded-2xl text-center shrink-0 self-start sm:self-auto">
            <span className="text-2xl font-black text-amber-400 font-mono block">3</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Notebook Tasks</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* QUESTION 1: THREE 2 OHM RESISTORS COMBINATIONS */}
      {/* ======================================================== */}
      <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-md">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/40 font-mono font-black flex items-center justify-center text-sm shrink-0">
              Q1
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                Numerical Problem · Resistor Combinations
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Arrange three 2 Ω resistors with equal length in maximum number of combinations and find total resistance of each combination.
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowResistorAnswer(!showResistorAnswer)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm ${
              showResistorAnswer
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30'
            }`}
          >
            {showResistorAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showResistorAnswer ? 'Hide Solution' : '👁️ Show Hidden Answer'}</span>
          </button>
        </div>

        {/* Question Statement Box */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="text-xs uppercase font-bold text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Problem Formulation (AP SSC 4-Marks Question):</span>
          </div>
          <div className="bg-slate-900 border-l-4 border-amber-400 p-4 rounded-r-xl font-medium text-slate-200 text-sm sm:text-base leading-relaxed">
            &quot;Arrange three 2 Ω resistors with equal length in maximum number of combinations and find out total resistance of each combination.&quot;
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span>Given: <strong className="text-white font-mono">R₁ = 2 Ω, R₂ = 2 Ω, R₃ = 2 Ω</strong></span>
            <span>·</span>
            <span>Question asks for: <strong className="text-amber-300">Total number of combinations (4) &amp; Equivalent Resistance for each</strong></span>
          </div>
        </div>

        {/* Hidden Answer / Revealed Solution */}
        {showResistorAnswer ? (
          <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between gap-3 border-b border-emerald-500/30 pb-3">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Complete Step-by-Step Board Solution (All 4 Combinations)</span>
              </span>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                4 Unique Combinations Found
              </span>
            </div>

            {/* Quick Answer Summary Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {resistorCombinations.map((combo, cIdx) => (
                <button
                  key={combo.id}
                  type="button"
                  onClick={() => setSelectedResistorCombo(cIdx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedResistorCombo === cIdx
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-md ring-1 ring-emerald-400/50'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Combination {combo.id}
                  </span>
                  <span className="font-mono text-base font-black text-amber-300 block">
                    {combo.result}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                    {combo.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Combination Detailed Explanation */}
            {resistorCombinations[selectedResistorCombo] && (
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{resistorCombinations[selectedResistorCombo].title}</span>
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    R_eq = {resistorCombinations[selectedResistorCombo].result}
                  </span>
                </div>

                <div className="py-2.5 px-3.5 bg-slate-900 border border-slate-800 rounded-lg font-mono text-xs sm:text-sm font-bold text-emerald-300">
                  {resistorCombinations[selectedResistorCombo].formula}
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {resistorCombinations[selectedResistorCombo].steps.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">→</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Conclusion for Board Exam */}
            <div className="p-3.5 bg-slate-950 border border-amber-500/30 rounded-xl text-xs text-slate-300 space-y-1">
              <strong className="text-amber-300 block">★ AP SSC Final Board Answer Summary:</strong>
              <p>
                From three 2 Ω resistors, exactly <strong>4 distinct combinations</strong> can be arranged:
                <br />
                <strong>1. Series:</strong> 6 Ω (Maximum) · <strong>2. Parallel:</strong> 2/3 Ω ≈ 0.67 Ω (Minimum) · <strong>3. Parallel + Series:</strong> 3 Ω · <strong>4. Series + Parallel:</strong> 4/3 Ω ≈ 1.33 Ω.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-950/50 border border-dashed border-slate-800 rounded-2xl p-6 text-center space-y-2">
            <span className="text-xs font-mono text-slate-500 block">
              🔒 Solution is currently hidden.
            </span>
            <p className="text-xs text-slate-400">
              Calculate the combinations on your rough paper first! How many combinations can you build? What is the equivalent resistance of each?
            </p>
            <button
              type="button"
              onClick={() => setShowResistorAnswer(true)}
              className="mt-2 px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reveal Hidden Answer</span>
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* QUESTION 2: MATCH THE FOLLOWING (TERMS & UNITS) */}
      {/* ======================================================== */}
      <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-cyan-400/20 text-cyan-400 border border-cyan-400/40 font-mono font-black flex items-center justify-center text-sm shrink-0">
              Q2
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                Match the Following · Terms &amp; Units
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Match the following terms between Physical Quantities and their Units:
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsUnitsChecked(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Check Matches</span>
            </button>
            <button
              type="button"
              onClick={() => setShowUnitsAnswer(!showUnitsAnswer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                showUnitsAnswer
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30'
              }`}
            >
              {showUnitsAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showUnitsAnswer ? 'Hide Answer' : '👁️ Show Hidden Answer'}</span>
            </button>
          </div>
        </div>

        {/* Notebook Match Table Representation */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Select the correct matching unit (a–g) for each quantity:</span>
            <span className="font-mono text-cyan-300">7 Quantities</span>
          </div>

          <div className="space-y-2.5">
            {unitsData.map((item) => {
              const selectedOpt = userUnitMatches[item.id];
              const isCorrect = selectedOpt === item.correctKey;
              const showResult = isUnitsChecked || showUnitsAnswer;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    showResult && isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : showResult && selectedOpt && !isCorrect
                      ? 'bg-rose-950/30 border-rose-500/50'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {item.id}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {item.term}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-mono hidden sm:inline">( )</span>
                    <select
                      value={userUnitMatches[item.id] || ''}
                      onChange={(e) =>
                        setUserUnitMatches((prev) => ({
                          ...prev,
                          [item.id]: e.target.value
                        }))
                      }
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-amber-400 focus:outline-hidden cursor-pointer"
                    >
                      <option value="">Select Unit...</option>
                      {unitsOptions.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                          ({opt.key}) {opt.label}
                        </option>
                      ))}
                    </select>

                    {showResult && (
                      <span className="ml-1 text-xs font-mono font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Check className="w-4 h-4" /> ({item.correctKey})
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <X className="w-4 h-4" /> Ans: ({item.correctKey})
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hidden Answer Key Section */}
        {showUnitsAnswer && (
          <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hidden Answer Key &amp; Explanations (Notebook Verification)</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  const correctMap: Record<number, string> = {};
                  unitsData.forEach((u) => {
                    correctMap[u.id] = u.correctKey;
                  });
                  setUserUnitMatches(correctMap);
                  setIsUnitsChecked(true);
                }}
                className="text-xs text-emerald-300 hover:text-white underline cursor-pointer"
              >
                Auto-fill All Correct Answers
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {unitsData.map((u) => (
                <div key={u.id} className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      ({u.id}) {u.term}
                    </span>
                    <span className="font-mono font-black text-amber-300">
                      → ({u.correctKey}) {unitsOptions.find((o) => o.key === u.correctKey)?.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{u.explanation}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-mono font-bold text-emerald-300 text-center">
              Answer Sequence: 1-(g), 2-(f), 3-(b), 4-(a), 5-(d), 6-(c), 7-(e)
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* QUESTION 3: MATCH THE FOLLOWING (TERMS & FORMULAS) */}
      {/* ======================================================== */}
      <div className="bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-purple-400/20 text-purple-400 border border-purple-400/40 font-mono font-black flex items-center justify-center text-sm shrink-0">
              Q3
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block">
                Match the Following · Terms &amp; Formulas
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Match the following terms with their Mathematical Formulas:
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFormulasChecked(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Check Matches</span>
            </button>
            <button
              type="button"
              onClick={() => setShowFormulasAnswer(!showFormulasAnswer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm ${
                showFormulasAnswer
                  ? 'bg-amber-400 text-slate-950 font-black'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-400/30'
              }`}
            >
              {showFormulasAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showFormulasAnswer ? 'Hide Answer' : '👁️ Show Hidden Answer'}</span>
            </button>
          </div>
        </div>

        {/* Notebook Match Table Representation */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Select the matching formula (a–i) for each term:</span>
            <span className="font-mono text-purple-300">8 Formulas</span>
          </div>

          <div className="space-y-2.5">
            {formulasData.map((item) => {
              const selectedOpt = userFormulaMatches[item.id];
              const isCorrect = selectedOpt === item.correctKey;
              const showResult = isFormulasChecked || showFormulasAnswer;

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    showResult && isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/50'
                      : showResult && selectedOpt && !isCorrect
                      ? 'bg-rose-950/30 border-rose-500/50'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {item.id}
                    </span>
                    <span className="font-bold text-white text-sm">
                      {item.term}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-mono hidden sm:inline">( )</span>
                    <select
                      value={userFormulaMatches[item.id] || ''}
                      onChange={(e) =>
                        setUserFormulaMatches((prev) => ({
                          ...prev,
                          [item.id]: e.target.value
                        }))
                      }
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:border-purple-400 focus:outline-hidden cursor-pointer"
                    >
                      <option value="">Select Formula...</option>
                      {formulasOptions.map((opt) => (
                        <option key={opt.key} value={opt.key}>
                          ({opt.key}) {opt.label}
                        </option>
                      ))}
                    </select>

                    {showResult && (
                      <span className="ml-1 text-xs font-mono font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-400 flex items-center gap-0.5">
                            <Check className="w-4 h-4" /> ({item.correctKey})
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center gap-0.5">
                            <X className="w-4 h-4" /> Ans: ({item.correctKey})
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hidden Answer Key Section */}
        {showFormulasAnswer && (
          <div className="bg-purple-950/20 border-2 border-purple-500/40 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Hidden Formula Key &amp; Physics Derivations</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  const correctMap: Record<number, string> = {};
                  formulasData.forEach((f) => {
                    correctMap[f.id] = f.correctKey;
                  });
                  setUserFormulaMatches(correctMap);
                  setIsFormulasChecked(true);
                }}
                className="text-xs text-purple-300 hover:text-white underline cursor-pointer"
              >
                Auto-fill All Correct Answers
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {formulasData.map((f) => (
                <div key={f.id} className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">
                      ({f.id}) {f.term}
                    </span>
                    <span className="font-mono font-black text-amber-300">
                      → ({f.correctKey}) {formulasOptions.find((o) => o.key === f.correctKey)?.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{f.explanation}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs font-mono font-bold text-purple-300 text-center">
              Answer Sequence: 1-(g), 2-(c), 3-(e), 4-(b), 5-(a), 6-(d), 7-(i), 8-(f)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
