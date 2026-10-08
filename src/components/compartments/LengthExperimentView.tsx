import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  CheckCircle2,
  Zap,
  Sliders,
  Sparkles,
  Info,
  Check,
  Copy,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Plus
} from 'lucide-react';

export interface LengthTrialRow {
  sNo: number;
  length: number; // Length l in cm
  voltage: number; // Voltage V in Volts
  current: number; // Current I in Amperes
  resistance: number; // R = V / I in Ohms
  ratio: number; // R / l in Ohms/cm
}

const DEFAULT_LENGTH_ROWS: LengthTrialRow[] = [
  { sNo: 1, length: 25, voltage: 4.0, current: 2.0, resistance: 2.0, ratio: 0.08 },
  { sNo: 2, length: 50, voltage: 4.0, current: 1.0, resistance: 4.0, ratio: 0.08 },
  { sNo: 3, length: 75, voltage: 4.0, current: 0.67, resistance: 6.0, ratio: 0.08 },
  { sNo: 4, length: 100, voltage: 4.0, current: 0.5, resistance: 8.0, ratio: 0.08 },
];

export const LengthExperimentView: React.FC = () => {
  // Apparatus state
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [wireLength, setWireLength] = useState<number>(50); // in cm (from 20 to 100 cm)
  const [tableRows, setTableRows] = useState<LengthTrialRow[]>(DEFAULT_LENGTH_ROWS);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);

  // Electrical parameters
  const batteryVoltage = 4.0; // Fixed voltage 4.0 V
  const resistancePerCm = 0.08; // 0.08 ohms/cm for standard Nichrome SWG 30 wire

  // Calculated live values
  const currentResistance = useMemo(() => {
    return Number((wireLength * resistancePerCm).toFixed(2));
  }, [wireLength]);

  const currentAmps = useMemo(() => {
    if (!isKeyClosed || currentResistance === 0) return 0;
    return Number((batteryVoltage / currentResistance).toFixed(2));
  }, [isKeyClosed, currentResistance]);

  const currentRatio = useMemo(() => {
    if (wireLength === 0) return 0;
    return Number((currentResistance / wireLength).toFixed(3));
  }, [currentResistance, wireLength]);

  // Add current slider setting to the observation table
  const handleRecordReading = () => {
    const existingIndex = tableRows.findIndex((r) => r.length === wireLength);
    const newRow: LengthTrialRow = {
      sNo: tableRows.length + 1,
      length: wireLength,
      voltage: batteryVoltage,
      current: currentAmps,
      resistance: currentResistance,
      ratio: Number((currentResistance / wireLength).toFixed(3)),
    };

    if (existingIndex !== -1) {
      const updated = [...tableRows];
      updated[existingIndex] = { ...newRow, sNo: existingIndex + 1 };
      setTableRows(updated);
    } else {
      setTableRows([...tableRows, newRow].sort((a, b) => a.length - b.length).map((r, i) => ({ ...r, sNo: i + 1 })));
    }
  };

  const handleReset = () => {
    setWireLength(50);
    setIsKeyClosed(true);
    setTableRows(DEFAULT_LENGTH_ROWS);
  };

  const copyLabRecord = () => {
    const text = `AP SSC CLASS 10 PHYSICS - LAB RECORD
EXPERIMENT: RESISTANCE OF A CONDUCTOR DEPENDS ON ITS LENGTH (R ∝ l)

1. AIM:
To prove that the electrical resistance (R) of a conductor is directly proportional to its length (l) at constant cross-sectional area, material, and temperature.

2. REQUIRED MATERIALS:
Battery (4V), Plug key, DC Ammeter (0-3A), DC Voltmeter (0-5V), Connecting wires, Meter scale, and Nichrome wires of same thickness but different lengths (25cm, 50cm, 75cm, 100cm).

3. FORMULA:
• R ∝ l (at constant A, ρ, and T)
• R₁ / R₂ = l₁ / l₂
• R = ρ (l / A)
• Ratio R / l = Constant

4. PROCEDURE:
1. Connect the battery, ammeter, test terminals, and plug key in series.
2. Connect the voltmeter in parallel across the ends of the test wire.
3. Insert a nichrome wire of length 25 cm between the terminals.
4. Close the plug key and note the voltmeter (V) and ammeter (I) readings.
5. Calculate resistance R = V / I.
6. Repeat the experiment with wires of lengths 50 cm, 75 cm, and 100 cm.
7. Record all values in the tabular column and calculate R / l.
8. Plot a graph between Length (l) on X-axis and Resistance (R) on Y-axis.

5. OBSERVATION:
As the length of the wire increases, the ammeter current decreases and measured resistance increases proportionally.
The ratio R / l remains constant (~0.08 Ω/cm).

6. CONCLUSION:
The resistance of a conductor is directly proportional to its length (R ∝ l). If length is doubled, resistance doubles.`;

    navigator.clipboard.writeText(text);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Title & Copy Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span>AP SSC Class 10 Physics • Mandatory Lab Activity</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Resistance of a Conductor Depends on Length of the Conductor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Complete experiment structured with all mandatory board exam sub-headings.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={copyLabRecord}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all shadow-xs cursor-pointer"
          >
            {copiedNotes ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedNotes ? 'Copied to Clipboard!' : 'Copy Lab Record'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Reset Experiment"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SUB-HEADING 1: AIM */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            1
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Aim
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          To prove experimentally that the electrical resistance (<strong className="text-blue-600 dark:text-amber-400 font-bold">R</strong>) of a conductor is directly proportional to its length (<strong className="text-blue-600 dark:text-amber-400 font-bold">l</strong>), keeping the material, cross-sectional area, and temperature constant (<span className="font-mono font-bold text-blue-700 dark:text-amber-300">R ∝ l</span>).
        </p>
      </div>

      {/* SUB-HEADING 2: REQUIRED MATERIALS */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            2
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Required Materials
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          {[
            { name: '4 V DC Battery Source', desc: 'Provides steady electromotive force' },
            { name: 'Plug Key (Switch)', desc: 'To close and open the circuit safely' },
            { name: 'DC Ammeter (0–3 A)', desc: 'Connected in series to measure current I' },
            { name: 'DC Voltmeter (0–5 V)', desc: 'Connected in parallel across test wire' },
            { name: 'Four Nichrome Wires', desc: 'Identical thickness, lengths: 25 cm, 50 cm, 75 cm, 100 cm' },
            { name: 'Meter Scale & Connecting Wires', desc: 'For measuring lengths and connecting circuit' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-amber-400 mt-1.5 shrink-0" />
              <div>
                <strong className="text-slate-900 dark:text-white block font-bold">{item.name}</strong>
                <span className="text-slate-500 dark:text-slate-400 text-xs">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUB-HEADING 6: ANIMATED DIAGRAM (Interactive Apparatus OLab) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
              6
            </span>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Animated Diagram (Interactive OLab)
            </h3>
          </div>
          <span className="text-xs bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-amber-300 font-bold px-3 py-1 rounded-full border border-blue-200 dark:border-slate-700">
            Interactive Wire Slider Active
          </span>
        </div>

        {/* Live Controls: Slider for Length & Switch Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* Wire Length Slider */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">
                Adjust Conductor Length (<span className="font-mono text-blue-600 dark:text-amber-400">l</span>):
              </span>
              <span className="text-base font-black font-mono text-blue-600 dark:text-amber-400">
                {wireLength} cm
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              step={5}
              value={wireLength}
              onChange={(e) => setWireLength(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-amber-400"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>20 cm (Min Length)</span>
              <span>50 cm</span>
              <span>75 cm</span>
              <span>100 cm (Max Length)</span>
            </div>
          </div>

          {/* Switch & Action */}
          <div className="flex flex-row md:flex-col justify-between items-center gap-2">
            <button
              onClick={() => setIsKeyClosed(!isKeyClosed)}
              className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                isKeyClosed
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isKeyClosed ? 'Plug Key: CLOSED (ON)' : 'Plug Key: OPEN (OFF)'}</span>
            </button>

            <button
              onClick={handleRecordReading}
              className="w-full py-2 px-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Trial ({wireLength} cm)</span>
            </button>
          </div>
        </div>

        {/* Animated Interactive SVG Schematic */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-4 sm:p-6 flex flex-col items-center">
          <svg viewBox="0 0 650 320" className="w-full max-w-2xl h-auto select-none">
            <defs>
              {/* Battery gradient */}
              <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              {/* Nichrome Wire Glow */}
              <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Circuit Outline Wires */}
            {/* Top wire from battery to switch */}
            <path
              d="M 120 70 L 260 70"
              stroke="#64748b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Top wire from switch to test terminal A */}
            <path
              d="M 330 70 L 490 70"
              stroke="#64748b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Right side wire from terminal B down to ammeter */}
            <path
              d="M 490 70 L 490 220"
              stroke="#64748b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bottom wire from ammeter back to battery */}
            <path
              d="M 490 220 L 120 220"
              stroke="#64748b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Left wire to complete loop through battery */}
            <path
              d="M 120 220 L 120 70"
              stroke="#64748b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* BATTERY (Left) */}
            <g transform="translate(90, 115)">
              <rect x="0" y="0" width="60" height="60" rx="8" fill="url(#batteryGrad)" stroke="#475569" strokeWidth="2" />
              {/* Terminal plates */}
              <line x1="30" y1="12" x2="30" y2="48" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <line x1="20" y1="20" x2="20" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <text x="30" y="-8" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">+ (4V Battery) -</text>
            </g>

            {/* PLUG KEY (Top Center) */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="70" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="18" cy="20" r="4" fill="#f59e0b" />
              <circle cx="52" cy="20" r="4" fill="#f59e0b" />
              {isKeyClosed ? (
                // Key plugged in
                <rect x="22" y="16" width="26" height="8" rx="2" fill="#10b981" />
              ) : (
                // Key removed (open)
                <line x1="18" y1="20" x2="44" y2="6" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              )}
              <text x="35" y="-8" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                Plug Key ({isKeyClosed ? 'Closed' : 'Open'})
              </text>
            </g>

            {/* TEST NICHROME WIRE (Top Right Section: Terminals A & B) */}
            {/* The wire length physically stretches from min width 70px to max width 180px */}
            <g transform="translate(420, 25)">
              {/* Terminal clamps */}
              <circle cx="0" cy="45" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              <circle cx={140} cy="45" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              <text x="0" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
              <text x="140" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>

              {/* Nichrome Wire with variable visual coils / length representation */}
              <path
                d={`M 0 45 Q 35 ${45 - (wireLength / 100) * 18}, 70 45 T 140 45`}
                stroke={isKeyClosed ? '#f59e0b' : '#94a3b8'}
                strokeWidth={isKeyClosed ? '4' : '3'}
                fill="none"
                filter={isKeyClosed ? 'url(#wireGlow)' : undefined}
              />

              {/* Length label */}
              <rect x="25" y="60" width="90" height="22" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
              <text x="70" y="75" fill="#38bdf8" fontSize="11" fontWeight="black" textAnchor="middle">
                Length l = {wireLength} cm
              </text>
            </g>

            {/* VOLTMETER (Connected in Parallel across A and B) */}
            <g transform="translate(450, 110)">
              {/* Voltmeter drop wires */}
              <path d="M -30 -40 L -30 0 L 10 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <path d="M 110 -40 L 110 0 L 70 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />

              {/* Meter Circle */}
              <circle cx="40" cy="0" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="40" y="6" fill="#38bdf8" fontSize="16" fontWeight="black" textAnchor="middle">V</text>
              <text x="40" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Voltmeter</text>
              <text x="40" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                {isKeyClosed ? `${batteryVoltage.toFixed(1)} V` : '0.0 V'}
              </text>
            </g>

            {/* AMMETER (Connected in Series on bottom wire) */}
            <g transform="translate(300, 220)">
              <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <text x="0" y="6" fill="#10b981" fontSize="16" fontWeight="black" textAnchor="middle">A</text>
              <text x="0" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">DC Ammeter</text>
              <text x="0" y="55" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                {isKeyClosed ? `${currentAmps.toFixed(2)} A` : '0.00 A'}
              </text>
            </g>

            {/* Flowing Charge Animation Dots */}
            {isKeyClosed && (
              <>
                <circle cx="180" cy="70" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="120" to="260" dur={`${Math.max(0.6, 2.5 - currentAmps * 0.8)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="70" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="330" to="490" dur={`${Math.max(0.6, 2.5 - currentAmps * 0.8)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="490" cy="140" r="3.5" fill="#fde047">
                  <animate attributeName="cy" from="70" to="220" dur={`${Math.max(0.6, 2.5 - currentAmps * 0.8)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="360" cy="220" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="490" to="120" dur={`${Math.max(0.6, 2.5 - currentAmps * 0.8)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="150" r="3.5" fill="#fde047">
                  <animate attributeName="cy" from="220" to="70" dur={`${Math.max(0.6, 2.5 - currentAmps * 0.8)}s`} repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>

          {/* Real-Time Live Readout Badges */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-center">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Length (l)</span>
              <span className="text-sm font-black font-mono text-amber-400">{wireLength} cm</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Voltage (V)</span>
              <span className="text-sm font-black font-mono text-cyan-400">
                {isKeyClosed ? `${batteryVoltage.toFixed(1)} V` : '0.0 V'}
              </span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Current (I = V/R)</span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {isKeyClosed ? `${currentAmps.toFixed(2)} A` : '0.00 A'}
              </span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Resistance (R = V/I)</span>
              <span className="text-sm font-black font-mono text-purple-400">
                {isKeyClosed ? `${currentResistance.toFixed(2)} Ω` : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-HEADING 3: PROCEDURE */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            3
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Procedure
          </h3>
        </div>

        <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
          {[
            'Set up the electrical circuit by connecting the 4V DC battery, ammeter, plug key, and test terminals in series.',
            'Connect the voltmeter in parallel across the terminals A and B of the test wire.',
            'Clamp the first uniform nichrome wire of length l₁ = 25 cm into the gap between terminals A and B.',
            'Close the plug key and record the reading of the ammeter (I) and the voltmeter (V).',
            'Calculate the resistance of the wire using Ohm’s law formula: R₁ = V / I.',
            'Repeat the identical measurement procedure by replacing the wire with lengths of 50 cm, 75 cm, and 100 cm cut from the same spool.',
            'Tabulate all observed values in the observation table and calculate the ratio R / l for every trial.',
            'Plot a graph between the Length of the conductor (l) on the X-axis and Resistance (R) on the Y-axis.',
          ].map((step, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-amber-400 text-white dark:text-slate-950 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* SUB-HEADING 4: OBSERVATION */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            4
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Observation
          </h3>
        </div>

        {/* Observation Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="py-3 px-4">S.No</th>
                <th className="py-3 px-4">Length of Wire l (cm)</th>
                <th className="py-3 px-4">Voltage V (V)</th>
                <th className="py-3 px-4">Current I (A)</th>
                <th className="py-3 px-4">Resistance R = V/I (Ω)</th>
                <th className="py-3 px-4">Ratio R / l (Ω/cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono">
              {tableRows.map((row) => (
                <tr
                  key={row.sNo}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                    row.length === wireLength ? 'bg-amber-50 dark:bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-3 px-4">{row.sNo}</td>
                  <td className="py-3 px-4 text-blue-600 dark:text-amber-400 font-bold">{row.length} cm</td>
                  <td className="py-3 px-4">{row.voltage.toFixed(1)}</td>
                  <td className="py-3 px-4">{row.current.toFixed(2)}</td>
                  <td className="py-3 px-4 font-bold text-purple-600 dark:text-purple-400">{row.resistance.toFixed(2)} Ω</td>
                  <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-bold">{row.ratio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Coordinate Graph Analysis */}
        <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wide mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Graph Analysis: R versus l</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Straight Line Passing Through Origin (0, 0)
            </h4>
            <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 space-y-1.5 leading-relaxed">
              <li>• When Resistance (R) is plotted on the Y-axis and Length (l) on the X-axis, the graph is a <strong>straight line</strong> passing through the origin.</li>
              <li>• A straight line through the origin directly verifies direct proportionality: <strong>R ∝ l</strong>.</li>
              <li>• Slope of the line = <strong>ΔR / Δl = 0.08 Ω/cm = ρ / A</strong> (constant resistance per unit length).</li>
            </ul>
          </div>

          {/* SVG Graph Drawing */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-center">
            <svg viewBox="0 0 260 180" className="w-full max-w-[240px] h-auto select-none">
              {/* Grid lines */}
              <line x1="40" y1="30" x2="230" y2="30" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="40" y1="70" x2="230" y2="70" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="40" y1="110" x2="230" y2="110" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />

              <line x1="90" y1="20" x2="90" y2="140" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="140" y1="20" x2="140" y2="140" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="190" y1="20" x2="190" y2="140" stroke="#334155" strokeWidth="0.8" strokeDasharray="2 2" />

              {/* Axes */}
              <line x1="40" y1="140" x2="240" y2="140" stroke="#94a3b8" strokeWidth="2" />
              <line x1="40" y1="140" x2="40" y2="15" stroke="#94a3b8" strokeWidth="2" />

              {/* Axis labels */}
              <text x="235" y="155" fill="#94a3b8" fontSize="10" textAnchor="end">Length l (cm)</text>
              <text x="25" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">R (Ω)</text>
              <text x="32" y="152" fill="#94a3b8" fontSize="9">O</text>

              {/* R vs l Linear Plot */}
              <line x1="40" y1="140" x2="215" y2="25" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />

              {/* Data points */}
              <circle cx="85" cy="110" r="3.5" fill="#38bdf8" />
              <circle cx="130" cy="80" r="3.5" fill="#38bdf8" />
              <circle cx="175" cy="50" r="3.5" fill="#38bdf8" />
              <circle cx="215" cy="25" r="3.5" fill="#38bdf8" />
            </svg>
          </div>
        </div>

        {/* Observation Statement */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-slate-950 border border-blue-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
          <strong>Observation Statement:</strong> As the length of the conductor increases (25 cm → 50 cm → 75 cm → 100 cm), the current (I) flowing in the circuit decreases proportionally, and the measured resistance (R) increases. The ratio <span className="font-mono font-bold text-blue-600 dark:text-amber-400">R / l = 0.08 Ω/cm</span> remains strictly constant throughout all trials.
        </div>
      </div>

      {/* SUB-HEADING 5: CONCLUSION */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            5
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Conclusion
          </h3>
        </div>

        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500/40 text-slate-900 dark:text-white space-y-2">
          <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400">
            “The electrical resistance of a conductor is directly proportional to its length.”
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            At constant cross-sectional area, material, and temperature, the resistance of a conductor is directly proportional to its length (<span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">R ∝ l</span>).
            <br />
            &bull; If the length of the conductor is <strong>doubled</strong>, its resistance <strong>doubles</strong>.
            <br />
            &bull; If the length of the conductor is <strong>halved</strong>, its resistance is <strong>halved</strong>.
          </p>
        </div>
      </div>

      {/* SUB-HEADING 7: FORMULA */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            7
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Formula
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Formula Card 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              1. Direct Proportionality
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-blue-600 dark:text-amber-400">
              R ∝ l
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Valid at constant material (ρ), cross-sectional area (A), and temperature (T).
            </p>
          </div>

          {/* Formula Card 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              2. Two-Conductor Comparison
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
              R₁ / R₂ = l₁ / l₂
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Essential ratio formula used to solve AP SSC numerical problems.
            </p>
          </div>

          {/* Formula Card 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              3. General Resistivity Law
            </span>
            <div className="text-xl sm:text-2xl font-black font-mono text-purple-600 dark:text-purple-400">
              R = ρ · (l / A)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Where ρ is resistivity in Ω·m, l is length in m, and A is area in m².
            </p>
          </div>
        </div>

        {/* Quick Solved Board Exam Example */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1">
          <strong className="text-amber-800 dark:text-amber-300 block font-bold">
            💡 AP SSC Exam Numerical Example:
          </strong>
          <p>
            <strong>Question:</strong> A uniform wire of length 50 cm has a resistance of 4.0 Ω. What will be its resistance if the wire is stretched or cut to a length of 150 cm without changing its thickness?
          </p>
          <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950 font-mono text-xs text-blue-700 dark:text-amber-300 mt-1 border border-amber-200 dark:border-slate-800">
            Formula: R₂ / R₁ = l₂ / l₁ &nbsp;⇒&nbsp; R₂ = R₁ × (l₂ / l₁) = 4.0 × (150 / 50) = 4.0 × 3 = <strong>12.0 Ω</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
