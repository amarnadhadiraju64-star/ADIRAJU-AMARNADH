import React, { useState } from 'react';
import { Language } from '../../types';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Home,
  ShieldCheck,
  Flame,
  Lightbulb,
  Table,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface BilingualElectricityModuleProps {
  language: Language;
}

export const BilingualElectricityModule: React.FC<BilingualElectricityModuleProps> = ({
  language
}) => {
  // Local mode override if user wants to toggle within this module
  const [localMode, setLocalMode] = useState<Language>(language);
  const activeLang = language === 'both' ? 'both' : (localMode || language);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const showEn = activeLang === 'en' || activeLang === 'both';
  const showTe = activeLang === 'te' || activeLang === 'both';
  const isSideBySide = activeLang === 'both';

  // 5 Quiz Questions in English & Telugu
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      questionEn: '1. What is the rate of flow of electric charges called, and what is its SI unit?',
      questionTe: '1. ప్రమాణ కాలంలో ప్రవహించే విద్యుత్ ఆవేశాల పరిమాణాన్ని ఏమంటారు, మరియు దాని SI ప్రమాణం ఏమిటి?',
      optionsEn: [
        'Electric Potential (Volt)',
        'Electric Current (Ampere)',
        'Electric Resistance (Ohm)',
        'Electric Power (Watt)'
      ],
      optionsTe: [
        'విద్యుత్ పొటెన్షియల్ (వోల్ట్)',
        'విద్యుత్ ప్రవాహం (ఆంపియర్)',
        'విద్యుత్ నిరోధం (ఓమ్)',
        'విద్యుత్ సామర్థ్యం (వాట్)'
      ],
      correctIndex: 1,
      explanationEn: 'Electric current (I = Q/t) is defined as the rate of flow of electric charges. Its SI unit is the Ampere (A), where 1 Ampere = 1 Coulomb / 1 second.',
      explanationTe: 'ప్రమాణ కాలంలో వాహకం యొక్క ఏదేని మధ్యచ్ఛేదం గుండా ప్రవహించే ఆవేశ పరిమాణాన్ని విద్యుత్ ప్రవాహం (I = Q/t) అంటారు. దీని SI ప్రమాణం ఆంపియర్ (A). 1 ఆంపియర్ = 1 కూలుంబ్ / 1 సెకను.'
    },
    {
      id: 2,
      questionEn: '2. A 12 V battery is connected across a resistor, and a current of 2.5 mA flows. What is the resistance of the resistor?',
      questionTe: '2. 12 V బ్యాటరీని ఒక నిరోధకానికి కలిపినప్పుడు 2.5 mA కరెంట్ ప్రవహిస్తుంది. ఆ నిరోధకం యొక్క నిరోధం ఎంత?',
      optionsEn: [
        '4.8 Ω',
        '480 Ω',
        '4800 Ω (4.8 kΩ)',
        '30 Ω'
      ],
      optionsTe: [
        '4.8 Ω',
        '480 Ω',
        '4800 Ω (4.8 kΩ)',
        '30 Ω'
      ],
      correctIndex: 2,
      explanationEn: 'From Ohm’s Law: R = V / I. Convert 2.5 mA = 2.5 × 10⁻³ A. R = 12 / (2.5 × 10⁻³) = 12,000 / 2.5 = 4800 Ω = 4.8 kΩ.',
      explanationTe: 'ఓమ్ నియమం ప్రకారం: R = V / I. ఇక్కడ V = 12 V, I = 2.5 mA = 2.5 × 10⁻³ A. కావున R = 12 / (2.5 × 10⁻³) = 12000 / 2.5 = 4800 Ω (4.8 kΩ).'
    },
    {
      id: 3,
      questionEn: '3. If the length of a uniform conducting wire is doubled and its radius is halved, its new resistance becomes:',
      questionTe: '3. ఒకే పదార్థంతో చేసిన ఏకరీతి తీగ పొడవును రెట్టింపు చేసి, దాని వ్యాసార్థాన్ని సగానికి తగ్గిస్తే, దాని కొత్త నిరోధం ఏమవుతుంది?',
      optionsEn: [
        '2 times',
        '4 times',
        '8 times',
        'Remains unchanged'
      ],
      optionsTe: [
        '2 రెట్లు',
        '4 రెట్లు',
        '8 రెట్లు',
        'మార్పు ఉండదు'
      ],
      correctIndex: 2,
      explanationEn: 'R = ρ · l / A = ρ · l / (π r²). If length is doubled (l\' = 2l) and radius is halved (r\' = r/2), then A\' = π(r/2)² = A/4. New resistance R\' = ρ · (2l) / (A/4) = 8 · (ρ l / A) = 8R.',
      explanationTe: 'నిరోధం R = ρ · l / A = ρ · l / (π r²). పొడవు రెట్టింపు (2l), వ్యాసార్థం సగం (r/2) అయితే వైశాల్యం నాలుగో వంతు (A/4) అవుతుంది. కాబట్టి R\' = (2) / (1/4) = 8 రెట్లు పెరుగుతుంది.'
    },
    {
      id: 4,
      questionEn: '4. Three resistors, each of resistance 2 Ω, are connected in parallel. What is their equivalent resistance?',
      questionTe: '4. ఒక్కొక్కటి 2 Ω ఉన్న మూడు నిరోధాలను సమాంతరంగా కలిపారు. వాటి ఫలిత నిరోధం ఎంత?',
      optionsEn: [
        '6 Ω',
        '2/3 Ω (≈ 0.67 Ω)',
        '3 Ω',
        '4/3 Ω'
      ],
      optionsTe: [
        '6 Ω',
        '2/3 Ω (≈ 0.67 Ω)',
        '3 Ω',
        '4/3 Ω'
      ],
      correctIndex: 1,
      explanationEn: 'In parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃ = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹. Inverting gives R_p = 2/3 Ω ≈ 0.67 Ω (always less than the smallest individual resistor).',
      explanationTe: 'సమాంతర సంధానంలో: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃ = 1/2 + 1/2 + 1/2 = 3/2. విలోమం చేస్తే R_p = 2/3 Ω ≈ 0.67 Ω అవుతుంది. ఇది అన్నింటికంటే తక్కువ నిరోధం.'
    },
    {
      id: 5,
      questionEn: '5. The commercial unit of electrical energy is kilowatt-hour (kWh). 1 kWh is equal to how many Joules?',
      questionTe: '5. విద్యుత్ శక్తి యొక్క వ్యాపార ప్రమాణం కిలోవాట్-గంట (kWh). 1 kWh ఎన్ని జౌళ్లకు సమానం?',
      optionsEn: [
        '3.6 × 10³ J',
        '3.6 × 10⁵ J',
        '3.6 × 10⁶ J (or 3,600,000 J)',
        '1000 J'
      ],
      optionsTe: [
        '3.6 × 10³ J',
        '3.6 × 10⁵ J',
        '3.6 × 10⁶ J (లేదా 3,600,000 J)',
        '1000 J'
      ],
      correctIndex: 2,
      explanationEn: '1 kWh = 1 kilowatt × 1 hour = 1000 Watts × 3600 seconds = 3,600,000 Joules = 3.6 × 10⁶ J (or 3.6 × 10⁶ W·s).',
      explanationTe: '1 kWh = 1 కిలోవాట్ × 1 గంట = 1000 వాట్లు × 3600 సెకన్లు = 3,600,000 జౌళ్లు = 3.6 × 10⁶ J (లేదా 3.6 × 10⁶ W·s).'
    }
  ];

  const handleSelectOption = (qId: number, oIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: oIdx
    }));
  };

  const handleCheckQuiz = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
    // Show all explanations
    const allExpl: Record<number, boolean> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      allExpl[q.id] = true;
    });
    setShowExplanations(allExpl);
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanations({});
    setQuizScore(null);
  };

  return (
    <div className="space-y-8 bg-slate-950/70 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-xl">
      {/* Module Title Header with Quick Dual Language Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30">
              Bilingual Study Hub • ద్విభాషా అధ్యయన మాడ్యూల్
            </span>
            <span aria-hidden="true">·</span>
            <span>English &amp; తెలుగు</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
            Electricity • విద్యుత్తు (Full Comprehensive Guide)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Read side-by-side or switch smoothly between English and Telugu for definitions, formulas, real-world applications, and the 5-question test.
          </p>
        </div>

        {/* Local View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 self-start md:self-center">
          <button
            onClick={() => setLocalMode('en')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeLang === 'en'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLocalMode('te')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeLang === 'te'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            తెలుగు
          </button>
          <button
            onClick={() => setLocalMode('both')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              activeLang === 'both'
                ? 'bg-amber-400 text-slate-950 font-black shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Both / ద్విభాష</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: LESSON OVERVIEW / పాఠం వివరణ
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-white pb-2 border-b border-slate-800">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>1. Lesson Overview / పాఠం వివరణ</span>
        </div>

        <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {showEn && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                🇬🇧 English Overview
              </span>
              <h3 className="text-base font-bold text-white">What is Electricity?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Electricity is a fundamental and versatile form of energy caused by the presence and flow of electric charges. In modern everyday life, electrical energy powers our lighting, communications, computing, fans, and transport.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When a potential difference (voltage) is applied across a metallic conductor, free electrons inside the metal lattice drift in a coordinated direction, creating an electric current that transfers energy through the circuit to perform work.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono">
                ⚡ Core Principle: Charge (Q) → Flow Rate (I = Q/t) driven by Voltage (V) against Resistance (R).
              </div>
            </div>
          )}

          {showTe && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                🇮🇳 తెలుగు వివరణ
              </span>
              <h3 className="text-base font-bold text-white">విద్యుత్తు అంటే ఏమిటి?</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                విద్యుత్తు అనేది విశ్వంలో అత్యంత కీలకమైన మరియు అనుకూలమైన శక్తి రూపం. ఇది విద్యుత్ ఆవేశాల ప్రవాహం వలన కలుగుతుంది. మన ఆధునిక సమాజంలో లైట్లు, ఫ్యాన్లు, కంప్యూటర్లు, పరిశ్రమలు మరియు రవాణా రంగానికి విద్యుత్ శక్తియే మూలాధారం.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ఒక లోహ వాహకం రెండు చివర్ల మధ్య పొటెన్షియల్ తేడా (వోల్టేజ్) కల్పించినప్పుడు, దానిలోని స్వేచ్ఛా ఎలక్ట్రాన్లు ఒక నిర్దిష్ట దిశలో కదులుతాయి. ఈ ఎలక్ట్రాన్ల ప్రవాహమే విద్యుత్ ప్రవాహంగా ఏర్పడి వివిధ పనులను నిర్వహిస్తుంది.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300/90 font-sans leading-relaxed">
                ⚡ ప్రధాన సూత్రం: ఆవేశం (Q) → ప్రవాహ రేటు (I = Q/t) వోల్టేజ్ (V) ద్వారా నిరోధం (R) కు ఎదురుగా నడుస్తుంది.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: KEY CONCEPTS & DEFINITIONS / ముఖ్యమైన భావనలు మరియు నిర్వచనాలు
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-white pb-2 border-b border-slate-800">
          <Zap className="w-5 h-5 text-amber-400" />
          <span>2. Key Concepts &amp; Definitions / ముఖ్యమైన భావనలు మరియు నిర్వచనాలు</span>
        </div>

        <div className="space-y-4">
          {/* Concept A: Electric Charge */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  A
                </span>
                <span>Electric Charge / విద్యుత్ ఆవేశం</span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                Q = n · e | Unit: Coulomb (C)
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>Definition:</strong> Electric charge is an intrinsic physical property of matter that causes it to experience an electrostatic force in an electromagnetic field.
                  </p>
                  <p className="text-slate-400 text-xs">
                    • 1 electron charge: e = 1.6 × 10⁻¹⁹ C.<br />
                    • 1 Coulomb contains 6.25 × 10¹⁸ electrons.
                  </p>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>నిర్వచనం:</strong> విద్యుదయస్కాంత క్షేత్రంలో ఉంచినప్పుడు పదార్థం స్థిరవిద్యుత్ బలాన్ని అనుభవించడానికి కారణమయ్యే ప్రాథమిక ధర్మాన్ని విద్యుత్ ఆవేశం (Q) అంటారు.
                  </p>
                  <p className="text-slate-300 text-xs">
                    • 1 ఎలక్ట్రాన్ ఆవేశం: e = 1.6 × 10⁻¹⁹ C.<br />
                    • 1 కూలుంబ్ ఆవేశంలో 6.25 × 10¹⁸ ఎలక్ట్రాన్లు ఉంటాయి.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Concept B: Electric Current */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  B
                </span>
                <span>Electric Current &amp; Formula / విద్యుత్ ప్రవాహం</span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                I = Q / t | Unit: Ampere (A) = C/s
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>Definition:</strong> Electric current is the rate of flow of electric charges passing through any cross-section of a conductor per unit time.
                  </p>
                  <p className="text-slate-400 text-xs">
                    • 1 Ampere: When 1 Coulomb of charge flows per 1 second (1 A = 1 C/s).<br />
                    • Measured using an Ammeter connected in SERIES.
                  </p>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>నిర్వచనం:</strong> వాహకంలో ఏదైనా మధ్యచ్ఛేదం గుండా ప్రమాణ కాలంలో ప్రవహించే ఆవేశ పరిమాణాన్ని విద్యుత్ ప్రవాహం (I = Q/t) అంటారు.
                  </p>
                  <p className="text-slate-300 text-xs">
                    • 1 ఆంపియర్: సెకనుకు 1 కూలుంబ్ ఆవేశం ప్రవహిస్తే 1 ఆంపియర్ అంటారు (1 A = 1 C/s).<br />
                    • దీనిని వలయంలో శ్రేణిలో కలిపిన అమ్మీటర్ ద్వారా కొలుస్తారు.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Concept C: Potential Difference */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  C
                </span>
                <span>Potential Difference / విద్యుత్ పొటెన్షియల్ తేడా (వోల్టేజ్)</span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                V = W / Q | Unit: Volt (V) = J/C
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>Definition:</strong> Potential difference between two points is the amount of work done in moving a unit positive charge from one point to the other across an electric field.
                  </p>
                  <p className="text-slate-400 text-xs">
                    • 1 Volt = 1 Joule / 1 Coulomb (1 V = 1 J/C).<br />
                    • Measured using a Voltmeter connected in PARALLEL.
                  </p>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>నిర్వచనం:</strong> విద్యుత్ క్షేత్రంలోని ఒక బిందువు నుండి మరొక బిందువుకు ప్రమాణ ధనావేశాన్ని తరలించడానికి జరిగిన పనిని ఆ రెండు బిందువుల మధ్య పొటెన్షియల్ తేడా (V = W/Q) అంటారు.
                  </p>
                  <p className="text-slate-300 text-xs">
                    • 1 వోల్ట్: 1 కూలుంబ్ ఆవేశాన్ని తరలించడానికి 1 జౌల్ పని జరిగితే 1 వోల్ట్ అంటారు (1 V = 1 J/C).<br />
                    • దీనిని వలయంలో సమాంతరంగా కలిపిన వోల్ట్‌మీటర్ ద్వారా కొలుస్తారు.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Concept D: Ohm's Law */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  D
                </span>
                <span>Ohm’s Law / ఓమ్ నియమం</span>
              </h4>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-500/30">
                V = I · R (at constant Temperature)
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>Statement:</strong> At constant temperature, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) applied across its terminals: <strong>V ∝ I ⟹ V = IR</strong>.
                  </p>
                  <p className="text-slate-400 text-xs">
                    • Constant of proportionality is Resistance (R).<br />
                    • V-I graph is a straight line passing through the origin for ohmic conductors.
                  </p>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>నియమం:</strong> స్థిర ఉష్ణోగ్రత వద్ద, లోహ వాహకం గుండా ప్రవహించే విద్యుత్ ప్రవాహం (I) దాని రెండు చివర్ల మధ్య గల పొటెన్షియల్ తేడాకు (V) ప్రత్యక్ష అనులోమానుపాతంలో ఉంటుంది: <strong>V ∝ I ⟹ V = IR</strong>.
                  </p>
                  <p className="text-slate-300 text-xs">
                    • ఇక్కడ అనుపాత స్థిరాంకం R నిరోధం.<br />
                    • V-I గ్రాఫ్ మూలబిందువు గుండా వెళ్లే సరళరేఖగా ఉంటుంది.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Concept E: Resistance & Factors */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  E
                </span>
                <span>Resistance &amp; Factors Affecting It / నిరోధం మరియు ప్రభావితం చేసే అంశాలు</span>
              </h4>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30">
                R = ρ · (l / A) | Unit: Ohm (Ω)
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>Definition:</strong> Resistance is the obstruction offered by a conductor to the flow of electric charges.
                  </p>
                  <div className="text-slate-300 text-xs space-y-0.5">
                    <strong>4 Factors Affecting Resistance:</strong>
                    <div>1. Length: Directly proportional (R ∝ l)</div>
                    <div>2. Area: Inversely proportional (R ∝ 1/A)</div>
                    <div>3. Material: Specific resistivity (ρ in Ω·m)</div>
                    <div>4. Temperature: Increases with temperature</div>
                  </div>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <p className="text-slate-200 leading-relaxed">
                    <strong>నిర్వచనం:</strong> వాహకం గుండా విద్యుత్ ఆవేశాల ప్రవాహాన్ని అడ్డుకునే సహజ ధర్మాన్ని నిరోధం (R = V/I) అంటారు.
                  </p>
                  <div className="text-slate-300 text-xs space-y-0.5">
                    <strong>నిరోధాన్ని ప్రభావితం చేసే 4 అంశాలు:</strong>
                    <div>1. పొడవు: అనులోమానుపాతం (R ∝ l) - పొడవు పెరిగితే నిరోధం పెరుగుతుంది</div>
                    <div>2. వైశాల్యం: విలోమానుపాతం (R ∝ 1/A) - మందం పెరిగితే నిరోధం తగ్గుతుంది</div>
                    <div>3. పదార్థ స్వభావం: విశిష్ట నిరోధం (ρ, ఓమ్-మీటర్)</div>
                    <div>4. ఉష్ణోగ్రత: ఉష్ణోగ్రత పెరిగితే లోహాల నిరోధం పెరుగుతుంది</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Concept F: Series vs Parallel Circuits */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
                  F
                </span>
                <span>Series vs Parallel Circuits / శ్రేణి మరియు సమాంతర సంధానాలు</span>
              </h4>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                R_s = ΣR | 1/R_p = Σ(1/R)
              </span>
            </div>

            <div className={`grid ${isSideBySide ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-3 text-xs sm:text-sm`}>
              {showEn && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇬🇧 English:</span>
                  <div>
                    <strong className="text-amber-400">Series Circuits (R_s = R₁ + R₂ + R₃):</strong>
                    <p className="text-slate-300 text-xs">
                      • Single continuous pathway.<br />
                      • Current (I) is identical through all resistors.<br />
                      • Voltage splits: V = V₁ + V₂ + V₃.<br />
                      • Equivalent resistance is greater than the largest individual resistor.
                    </p>
                  </div>
                  <div>
                    <strong className="text-cyan-400">Parallel Circuits (1/R_p = 1/R₁ + 1/R₂ + 1/R₃):</strong>
                    <p className="text-slate-300 text-xs">
                      • Multiple independent branches across common nodes.<br />
                      • Voltage (V) is identical across all branches.<br />
                      • Current branches: I = I₁ + I₂ + I₃.<br />
                      • Equivalent resistance is smaller than the smallest resistor. Used in house wiring!
                    </p>
                  </div>
                </div>
              )}
              {showTe && (
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">🇮🇳 తెలుగు:</span>
                  <div>
                    <strong className="text-amber-400">శ్రేణి సంధానం (R_s = R₁ + R₂ + R₃):</strong>
                    <p className="text-slate-300 text-xs">
                      • విద్యుత్ ప్రవాహానికి ఒకే ఒక మార్గం ఉంటుంది.<br />
                      • అన్ని నిరోధాలలో విద్యుత్ ప్రవాహం (I) సమానంగా ఉంటుంది.<br />
                      • వోల్టేజ్ విభజింపబడుతుంది: V = V₁ + V₂ + V₃.<br />
                      • ఫలిత నిరోధం అన్నింటికంటే గరిష్టంగా ఉంటుంది.
                    </p>
                  </div>
                  <div>
                    <strong className="text-cyan-400">సమాంతర సంధానం (1/R_p = 1/R₁ + 1/R₂ + 1/R₃):</strong>
                    <p className="text-slate-300 text-xs">
                      • బహుళ స్వతంత్ర మార్గాలు ఉంటాయి.<br />
                      • అన్ని శాఖల వద్ద పొటెన్షియల్ తేడా (V) సమానంగా ఉంటుంది.<br />
                      • కరెంట్ విభజింపబడుతుంది: I = I₁ + I₂ + I₃.<br />
                      • ఫలిత నిరోధం కనిష్టంగా ఉంటుంది. గృహ వైరింగ్‌కు వాడతారు!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: KEY FORMULAS SUMMARY / ముఖ్యమైన సూత్రాలు
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-white pb-2 border-b border-slate-800">
          <Table className="w-5 h-5 text-amber-400" />
          <span>3. Key Formulas Summary / ముఖ్యమైన సూత్రాలు</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                <th className="py-3 px-3 w-12 text-center">S.No</th>
                <th className="py-3 px-4 min-w-[200px]">Formula / సూత్రం</th>
                <th className="py-3 px-3 min-w-[100px]">SI Unit</th>
                <th className="py-3 px-4 min-w-[260px]">English Variable Breakdown</th>
                <th className="py-3 px-4 min-w-[260px]">తెలుగు చరరాశుల వివరణ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">1</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">Q = n · e</td>
                <td className="py-3 px-3 text-emerald-400">Coulomb (C)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Q = total charge, n = number of electrons, e = elementary charge (1.6 × 10⁻¹⁹ C)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Q = మొత్తం ఆవేశం, n = ఎలక్ట్రాన్ల సంఖ్య, e = ప్రాథమిక ఆవేశం (1.6 × 10⁻¹⁹ C)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">2</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">I = Q / t</td>
                <td className="py-3 px-3 text-emerald-400">Ampere (A)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">I = current, Q = charge (C), t = time (s)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">I = విద్యుత్ ప్రవాహం, Q = ఆవేశం (కూలుంబ్), t = కాలం (సెకన్లు)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">3</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">V = W / Q</td>
                <td className="py-3 px-3 text-emerald-400">Volt (V)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">V = potential difference, W = work done (J), Q = charge moved (C)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">V = పొటెన్షియల్ తేడా, W = జరిగిన పని (జౌల్), Q = తరలించిన ఆవేశం (కూలుంబ్)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">4</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">V = I · R</td>
                <td className="py-3 px-3 text-emerald-400">Volt (V) / Ohm (Ω)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">V = voltage, I = current (A), R = resistance (Ω) [Ohm’s Law]</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">V = వోల్టేజ్, I = కరెంట్, R = నిరోధం (ఓమ్) [ఓమ్ నియమం]</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">5</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">R = ρ · (l / A)</td>
                <td className="py-3 px-3 text-emerald-400">Ohm (Ω)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">R = resistance, ρ = resistivity (Ω·m), l = length (m), A = area (m²)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">R = నిరోధం, ρ = విశిష్ట నిరోధం (Ω·m), l = తీగ పొడవు, A = మధ్యచ్ఛేద వైశాల్యం</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">6</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">R_s = R₁ + R₂ + R₃</td>
                <td className="py-3 px-3 text-emerald-400">Ohm (Ω)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Series equivalent resistance (maximum resistance)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">శ్రేణి ఫలిత నిరోధం (నిరోధాల మొత్తం గరిష్టంగా ఉంటుంది)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">7</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">1/R_p = 1/R₁ + 1/R₂ + 1/R₃</td>
                <td className="py-3 px-3 text-emerald-400">Ohm (Ω)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Parallel equivalent resistance (minimum resistance)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">సమాంతర ఫలిత నిరోధం (నిరోధాల విలోమాల మొత్తం కనిష్టంగా ఉంటుంది)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">8</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">P = V · I = I²R = V²/R</td>
                <td className="py-3 px-3 text-emerald-400">Watt (W) = J/s</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">P = electric power, rate of electrical energy consumption</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">P = విద్యుత్ సామర్థ్యం, విద్యుత్ శక్తి వినియోగ రేటు (వాట్)</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">9</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">H = I² · R · t</td>
                <td className="py-3 px-3 text-emerald-400">Joule (J)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Joule’s law of heating: heat produced across resistor R in time t</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">జౌల్ తాపన నియమం: t కాలంలో నిరోధం R లో ఉత్పన్నమైన ఉష్ణరాశి</td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-3 px-3 text-center text-slate-400">10</td>
                <td className="py-3 px-4 font-bold text-amber-300 text-sm">1 kWh = 3.6 × 10⁶ J</td>
                <td className="py-3 px-3 text-emerald-400">Joule (J) / W·s</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">Commercial unit of electrical energy (1 Board of Trade Unit)</td>
                <td className="py-3 px-4 text-slate-300 font-sans text-xs">విద్యుత్ శక్తి వ్యాపార ప్రమాణం (1 యూనిట్ = 1 కిలోవాట్-గంట)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: REAL-WORLD EXAMPLES & APPLICATIONS / నిజ జీవిత ఉదాహరణలు
      ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm sm:text-base font-black text-white pb-2 border-b border-slate-800">
          <Home className="w-5 h-5 text-amber-400" />
          <span>4. Real-world Examples &amp; Applications / నిజ జీవిత ఉదాహరణలు</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example 1: Domestic Wiring */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Home className="w-4 h-4 text-blue-400" />
              <span>1. Domestic Household Parallel Wiring / గృహ సమాంతర వైరింగ్</span>
            </div>
            {showEn && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Why Parallel?</strong> Every household appliance operates independently on the rated 220 V line. If you switch off one light, all other rooms and fans continue running without interruption.
              </p>
            )}
            {showTe && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>ఎందుకు సమాంతర సంధానం?</strong> ప్రతి గృహ పరికరానికి స్థిరమైన 220 V వోల్టేజ్ లభిస్తుంది. ఒక గదిలో బల్బు ఆపివేసినా లేదా పాడైనా, ఇతర ఉపకరణాలు నిరంతరాయంగా పనిచేస్తాయి.
              </p>
            )}
          </div>

          {/* Example 2: Electric Fuse */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>2. Electric Fuse Safety Device / విద్యుత్ ఫ్యూజ్ భద్రతా సాధనం</span>
            </div>
            {showEn && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Principle:</strong> Made of lead-tin alloy with a low melting point. Connected in series with the live wire. If excessive current passes during overload or short-circuit, Joule heating (H = I²Rt) melts the wire to break the circuit safely.
              </p>
            )}
            {showTe && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>సూత్రం:</strong> తక్కువ ద్రవీభవన స్థానం కలిగిన లెడ్-టిన్ మిశ్రమంతో తయారుచేస్తారు. లైవ్ వైరుకు శ్రేణిలో కలుపుతారు. ఓవర్‌లోడ్ లేదా షార్ట్ సర్క్యూట్ వల్ల అధిక కరెంట్ ప్రవహించినప్పుడు, జౌల్ ఉష్ణోగ్రత వల్ల తీగ కరిగి వలయాన్ని తెంచుతుంది.
              </p>
            )}
          </div>

          {/* Example 3: Electric Heater & Geyser */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>3. Heating Appliances (Geyser, Iron) / హీటింగ్ ఉపకరణాలు (గీజర్, ఐరన్ బాక్స్)</span>
            </div>
            {showEn && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>Nichrome Alloy:</strong> Heating coils use Nichrome (nickel + chromium) because it has very high resistivity and does NOT oxidize (burn) even at red-hot temperatures (approx 1000°C).
              </p>
            )}
            {showTe && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>నైక్రోమ్ తీగ:</strong> హీటింగ్ కాయిల్స్‌కు నైక్రోమ్ (నికెల్ + క్రోమియం) వాడతారు. దీనికి అధిక విశిష్ట నిరోధం ఉంటుంది మరియు ఎర్రగా వేడెక్కినా సులభంగా ఆక్సీకరణం చెందదు (కాలిపోదు).
              </p>
            )}
          </div>

          {/* Example 4: Filament Lamp & Earthing */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>4. Tungsten Filament &amp; Earthing / టంగ్‌స్టన్ ఫిలమెంట్ &amp; ఎర్తింగ్</span>
            </div>
            {showEn && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>High Melting Point:</strong> Tungsten has a melting point of 3422°C, remaining solid while glowing white-hot. <strong>Earthing</strong> connects metal bodies of appliances to the ground, shielding humans from dangerous electric shocks.
              </p>
            )}
            {showTe && (
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong>గరిష్ట ద్రవీభవన స్థానం:</strong> టంగ్‌స్టన్ ద్రవీభవన స్థానం 3422°C కావున తెల్లగా ప్రకాశించినా కరగదు. <strong>ఎర్తింగ్</strong> ఉపకరణాల లోహ శరీరాలను నేలకు కలపడం ద్వారా ప్రాణాంతక విద్యుత్ షాక్‌ల నుండి మానవులను రక్షిస్తుంది.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: INTERACTIVE QUIZ (5 QUESTIONS) / క్విజ్ (5 ప్రశ్నలు)
      ========================================================================= */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-black text-white">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <span>5. Interactive Quiz (5 Questions) / క్విజ్ (5 ప్రశ్నలు)</span>
          </div>

          <div className="flex items-center gap-2">
            {quizScore !== null && (
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Score: {quizScore} / 5 ({Math.round((quizScore / 5) * 100)}%)
              </span>
            )}
            <button
              onClick={handleResetQuiz}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q) => {
            const userAns = selectedAnswers[q.id];
            const isAnswered = userAns !== undefined;
            const isCorrect = userAns === q.correctIndex;
            const isExplOpen = showExplanations[q.id] || false;

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
              >
                {/* Question Statement in English & Telugu */}
                <div className="space-y-1">
                  {showEn && (
                    <div className="text-sm font-bold text-white leading-relaxed">
                      {q.questionEn}
                    </div>
                  )}
                  {showTe && (
                    <div className="text-sm font-semibold text-amber-200/90 leading-relaxed font-sans">
                      {q.questionTe}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.optionsEn.map((optEn, oIdx) => {
                    const optTe = q.optionsTe[oIdx];
                    const isSelected = userAns === oIdx;
                    let optStyle = 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800';

                    if (quizScore !== null) {
                      if (oIdx === q.correctIndex) {
                        optStyle = 'bg-emerald-950/70 border-emerald-500/70 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optStyle = 'bg-rose-950/70 border-rose-500/70 text-rose-200 line-through';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-xs';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col gap-0.5 ${optStyle}`}
                      >
                        {showEn && <span>{optEn}</span>}
                        {showTe && (
                          <span className={`${isSelected && quizScore === null ? 'text-slate-900' : 'text-slate-400'} text-[11px]`}>
                            {optTe}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation toggle and step-by-step box */}
                <div className="pt-1 flex items-center justify-between">
                  <button
                    onClick={() =>
                      setShowExplanations((prev) => ({
                        ...prev,
                        [q.id]: !prev[q.id]
                      }))
                    }
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExplOpen ? 'Hide Explanation' : 'View Step-by-Step Explanation'}</span>
                    {isExplOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isAnswered && quizScore !== null && (
                    <span className="text-xs flex items-center gap-1 font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="text-rose-400 flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Step-by-Step Explanation in Both English & Telugu */}
                {isExplOpen && (
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-amber-400/30 space-y-2 text-xs animate-in fade-in duration-150">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                      💡 Detailed Solution &amp; Explanation / వివరణాత్మక పరిష్కారం:
                    </span>
                    {showEn && (
                      <div className="text-slate-200 leading-relaxed">
                        <strong className="text-slate-400">English:</strong> {q.explanationEn}
                      </div>
                    )}
                    {showTe && (
                      <div className="text-amber-200/90 leading-relaxed font-sans">
                        <strong className="text-slate-400">తెలుగు:</strong> {q.explanationTe}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <div className="text-xs text-slate-300">
            {Object.keys(selectedAnswers).length} of 5 questions answered.
          </div>
          <button
            onClick={handleCheckQuiz}
            disabled={Object.keys(selectedAnswers).length === 0}
            className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit Quiz &amp; View All Solutions</span>
          </button>
        </div>
      </section>
    </div>
  );
};
