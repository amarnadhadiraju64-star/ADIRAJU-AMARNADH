import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Zap,
  RotateCcw,
  Check,
  Copy,
  TrendingUp,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

export interface AreaTrialRow {
  sNo: number;
  gauge: string;
  area: number; // in mm²
  voltage: number; // in V
  current: number; // in A
  resistance: number; // in Ω
  product: number; // R * A in Ω·mm²
}

const DEFAULT_AREA_ROWS: AreaTrialRow[] = [
  { sNo: 1, gauge: 'Thin Wire (SWG 36)', area: 0.20, voltage: 4.0, current: 0.40, resistance: 10.00, product: 2.00 },
  { sNo: 2, gauge: 'Medium Wire (SWG 30)', area: 0.40, voltage: 4.0, current: 0.80, resistance: 5.00, product: 2.00 },
  { sNo: 3, gauge: 'Thick Wire (SWG 24)', area: 0.80, voltage: 4.0, current: 1.60, resistance: 2.50, product: 2.00 },
  { sNo: 4, gauge: 'Heavy Wire (SWG 20)', area: 1.60, voltage: 4.0, current: 3.20, resistance: 1.25, product: 2.00 },
];

export const AreaExperimentView: React.FC = () => {
  const [selectedWireIdx, setSelectedWireIdx] = useState<number>(0);
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);

  const currentWire = DEFAULT_AREA_ROWS[selectedWireIdx];

  const currentAmps = useMemo(() => {
    if (!isKeyClosed) return 0;
    return currentWire.current;
  }, [isKeyClosed, currentWire]);

  const copyLabRecord = () => {
    const text = `AP SSC CLASS 10 PHYSICS - LAB RECORD
EXPERIMENT: RESISTANCE OF CONDUCTOR DEPENDS ON CROSS-SECTION AREA (R ∝ 1/A)

1. AIM:
To prove experimentally that the electrical resistance (R) of a conductor is inversely proportional to its cross-sectional area (A) at constant length, material, and temperature (R ∝ 1/A).

2. REQUIRED MATERIALS:
4V Battery, Plug key, DC Ammeter (0-5A), DC Voltmeter (0-5V), Connecting wires, Screw gauge, and four Nichrome wires of same length (50 cm) but different thickness: Thin (0.2 mm²), Medium (0.4 mm²), Thick (0.8 mm²), Heavy (1.6 mm²).

3. PROCEDURE:
1. Connect battery, ammeter, test terminals, and plug key in series.
2. Connect voltmeter in parallel across terminals A and B.
3. Clamp the thin wire (0.2 mm²) into the terminal gap.
4. Close the plug key, record voltmeter (V) and ammeter (I) readings, and calculate R₁ = V / I.
5. Replace sequentially with medium (0.4 mm²), thick (0.8 mm²), and heavy (1.6 mm²) wires of identical length (50 cm).
6. Tabulate the values and compute the product R × A for each wire.
7. Plot a graph between Resistance (R) on Y-axis and 1/Area (1/A) on X-axis.

4. OBSERVATION & TABLE:
• Thin (0.2 mm²): V = 4.0 V, I = 0.40 A  ⇒  R = 10.00 Ω  ⇒  R × A = 2.00
• Medium (0.4 mm²): V = 4.0 V, I = 0.80 A  ⇒  R = 5.00 Ω  ⇒  R × A = 2.00
• Thick (0.8 mm²): V = 4.0 V, I = 1.60 A  ⇒  R = 2.50 Ω  ⇒  R × A = 2.00
• Heavy (1.6 mm²): V = 4.0 V, I = 3.20 A  ⇒  R = 1.25 Ω  ⇒  R × A = 2.00
Product R × A remains constant (2.00 Ω·mm²). Graph of R vs 1/A is a straight line through origin.

5. CONCLUSION:
The resistance of a conductor is inversely proportional to its cross-sectional area (R ∝ 1/A).
Thicker wire offers LESS resistance; thinner wire offers MORE resistance.`;

    navigator.clipboard.writeText(text);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
            <FlaskConical className="w-4 h-4 text-amber-400" />
            <span>AP SSC Class 10 Physics • Mandatory Lab Activity 3</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Resistance of a Conductor Depends on Cross-Section Area
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Simple, compact, and highly memorable structure for board exams.
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
        </div>
      </div>

      {/* 1. AIM */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            1
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Aim
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          To prove experimentally that the electrical resistance (<strong className="text-blue-600 dark:text-amber-400">R</strong>) of a conductor is inversely proportional to its cross-sectional area (<strong className="text-blue-600 dark:text-amber-400">A</strong>) at constant length, material, and temperature (<span className="font-mono font-bold text-blue-700 dark:text-amber-300">R ∝ 1/A</span>).
        </p>
      </div>

      {/* 2. REQUIRED MATERIALS */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            2
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Required Materials
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
          {[
            { name: '4 V Battery Source', desc: 'Provides constant voltage (4.0 V)' },
            { name: 'Plug Key (Switch)', desc: 'For controlling current flow' },
            { name: 'DC Ammeter (0–5 A)', desc: 'Measures circuit current in series' },
            { name: 'DC Voltmeter (0–5 V)', desc: 'Measures potential difference in parallel' },
            { name: 'Four Nichrome Wires', desc: 'Same length (50 cm), different thickness: 0.2, 0.4, 0.8, 1.6 mm²' },
            { name: 'Screw Gauge & Wires', desc: 'To measure diameter and complete connections' },
          ].map((m, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white block font-bold">{m.name}</strong>
              <span className="text-slate-500 dark:text-slate-400 text-xs">{m.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ANIMATED DIAGRAM (Interactive Apparatus) */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
              ⚡
            </span>
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              Animated Diagram (Interactive Apparatus)
            </h3>
          </div>
          <span className="text-xs font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-700">
            Click Wire Thickness to Switch Live Circuit
          </span>
        </div>

        {/* Thickness Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {DEFAULT_AREA_ROWS.map((row, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWireIdx(idx)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                selectedWireIdx === idx
                  ? 'bg-blue-600 dark:bg-amber-400 text-white dark:text-slate-950 border-transparent shadow-md font-bold'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              <div className="text-xs font-bold line-clamp-1">{row.gauge}</div>
              <div className="text-[11px] font-mono mt-0.5 opacity-90">
                A = {row.area.toFixed(2)} mm² (R = {row.resistance.toFixed(2)} Ω)
              </div>
            </button>
          ))}
        </div>

        {/* Animated SVG Diagram */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-4 sm:p-6 flex flex-col items-center">
          <svg viewBox="0 0 650 310" className="w-full max-w-2xl h-auto select-none">
            {/* Wires */}
            <path d="M 120 70 L 260 70" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 330 70 L 490 70" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 490 70 L 490 220" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 490 220 L 120 220" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 120 220 L 120 70" stroke="#64748b" strokeWidth="4" fill="none" strokeLinecap="round" />

            {/* Battery */}
            <g transform="translate(90, 115)">
              <rect x="0" y="0" width="60" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <line x1="30" y1="12" x2="30" y2="48" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
              <line x1="20" y1="20" x2="20" y2="40" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
              <text x="30" y="-8" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">+ (4V Battery) -</text>
            </g>

            {/* Plug Key */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="70" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="18" cy="20" r="4" fill="#f59e0b" />
              <circle cx="52" cy="20" r="4" fill="#f59e0b" />
              {isKeyClosed ? (
                <rect x="22" y="16" width="26" height="8" rx="2" fill="#10b981" />
              ) : (
                <line x1="18" y1="20" x2="44" y2="6" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              )}
              <text x="35" y="-8" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
                Plug Key ({isKeyClosed ? 'Closed' : 'Open'})
              </text>
            </g>

            {/* Variable Cross-Section Nichrome Wire clamped across A & B */}
            <g transform="translate(420, 25)">
              <circle cx="0" cy="45" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              <circle cx="140" cy="45" r="7" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              <text x="0" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">A</text>
              <text x="140" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">B</text>

              {/* Wire with animated thickness matching chosen area */}
              {/* Thickness: 3px for thin, 6px for medium, 12px for thick, 18px for heavy */}
              <line
                x1="0"
                y1="45"
                x2="140"
                y2="45"
                stroke={isKeyClosed ? '#f59e0b' : '#64748b'}
                strokeWidth={selectedWireIdx === 0 ? '3' : selectedWireIdx === 1 ? '6' : selectedWireIdx === 2 ? '11' : '17'}
                strokeLinecap="round"
              />

              <rect x="15" y="60" width="110" height="22" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
              <text x="70" y="75" fill="#38bdf8" fontSize="11" fontWeight="black" textAnchor="middle">
                Area A = {currentWire.area} mm²
              </text>
            </g>

            {/* Voltmeter in Parallel */}
            <g transform="translate(450, 110)">
              <path d="M -30 -40 L -30 0 L 10 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <path d="M 110 -40 L 110 0 L 70 0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
              <circle cx="40" cy="0" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="40" y="6" fill="#38bdf8" fontSize="16" fontWeight="black" textAnchor="middle">V</text>
              <text x="40" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Voltmeter</text>
              <text x="40" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                {isKeyClosed ? '4.0 V' : '0.0 V'}
              </text>
            </g>

            {/* Ammeter in Series */}
            <g transform="translate(300, 220)">
              <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <text x="0" y="6" fill="#10b981" fontSize="16" fontWeight="black" textAnchor="middle">A</text>
              <text x="0" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">DC Ammeter</text>
              <text x="0" y="55" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                {isKeyClosed ? `${currentAmps.toFixed(2)} A` : '0.00 A'}
              </text>
            </g>

            {/* Flowing Charge Animation: speed is proportional to current */}
            {isKeyClosed && (
              <>
                <circle cx="180" cy="70" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="120" to="260" dur={`${Math.max(0.4, 2.5 - currentAmps * 0.6)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="70" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="330" to="490" dur={`${Math.max(0.4, 2.5 - currentAmps * 0.6)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="490" cy="140" r="3.5" fill="#fde047">
                  <animate attributeName="cy" from="70" to="220" dur={`${Math.max(0.4, 2.5 - currentAmps * 0.6)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="360" cy="220" r="3.5" fill="#fde047">
                  <animate attributeName="cx" from="490" to="120" dur={`${Math.max(0.4, 2.5 - currentAmps * 0.6)}s`} repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="150" r="3.5" fill="#fde047">
                  <animate attributeName="cy" from="220" to="70" dur={`${Math.max(0.4, 2.5 - currentAmps * 0.6)}s`} repeatCount="indefinite" />
                </circle>
              </>
            )}
          </svg>

          {/* Real-time status cards */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-center">
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Area A</span>
              <span className="text-sm font-black font-mono text-amber-400">{currentWire.area} mm²</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Voltage V</span>
              <span className="text-sm font-black font-mono text-cyan-400">4.0 V</span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Current I</span>
              <span className="text-sm font-black font-mono text-emerald-400">
                {isKeyClosed ? `${currentAmps.toFixed(2)} A` : '0.00 A'}
              </span>
            </div>
            <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-semibold">Resistance R</span>
              <span className="text-sm font-black font-mono text-purple-400">
                {isKeyClosed ? `${currentWire.resistance.toFixed(2)} Ω` : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PROCEDURE */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            3
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Procedure
          </h3>
        </div>
        <ol className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {[
            'Set up the circuit with battery, ammeter, plug key, and test terminals in series.',
            'Connect voltmeter across terminals A and B in parallel.',
            'Clamp the thin wire (0.20 mm²) of length 50 cm between terminals A and B.',
            'Close the plug key, note current I and voltage V, and calculate R₁ = V / I.',
            'Substitute medium (0.40 mm²), thick (0.80 mm²), and heavy (1.60 mm²) wires of identical 50 cm length sequentially.',
            'Record values into the table and calculate the product R × A for each wire.',
            'Plot a graph of Resistance (R) on Y-axis vs (1 / A) on X-axis.',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600 dark:bg-amber-400 text-white dark:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 4. OBSERVATION & TABLE */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3.5">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            4
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Observation &amp; Table
          </h3>
        </div>

        {/* Compact Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800">
                <th className="py-2.5 px-3">S.No</th>
                <th className="py-2.5 px-3">Wire Gauge</th>
                <th className="py-2.5 px-3">Area A (mm²)</th>
                <th className="py-2.5 px-3">Voltage V (V)</th>
                <th className="py-2.5 px-3">Current I (A)</th>
                <th className="py-2.5 px-3">Resistance R (Ω)</th>
                <th className="py-2.5 px-3">Product R × A (Ω·mm²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-slate-700 dark:text-slate-300">
              {DEFAULT_AREA_ROWS.map((r, i) => (
                <tr
                  key={r.sNo}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                    selectedWireIdx === i ? 'bg-amber-50 dark:bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  <td className="py-2.5 px-3">{r.sNo}</td>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white font-bold">{r.gauge}</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-amber-400">{r.area.toFixed(2)}</td>
                  <td className="py-2.5 px-3">{r.voltage.toFixed(1)}</td>
                  <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{r.current.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-purple-600 dark:text-purple-400 font-bold">{r.resistance.toFixed(2)} Ω</td>
                  <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">{r.product.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Graph Summary */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs sm:text-sm">
          <div>
            <strong>Graph Insight:</strong> Graph of Resistance (R) against (1/A) is a straight line through origin (0, 0), proving <strong>R ∝ 1/A</strong>.
          </div>
          <div className="font-mono font-bold text-blue-600 dark:text-amber-400 shrink-0 ml-2">
            R · A = 2.00 Ω·mm² (Constant)
          </div>
        </div>
      </div>

      {/* 5. CONCLUSION */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-amber-400 uppercase tracking-wider">
          <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-amber-400/20 text-blue-700 dark:text-amber-300 flex items-center justify-center font-black text-xs">
            5
          </span>
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Conclusion
          </h3>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500/40 text-slate-900 dark:text-white space-y-1.5">
          <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-400">
            “The electrical resistance of a conductor is inversely proportional to its cross-sectional area (thickness).”
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">R ∝ 1 / A</span>
            <br />
            • A <strong>thicker wire</strong> has more room for electrons to drift with fewer bottleneck collisions, so it has <strong>lower resistance</strong> and draws <strong>higher current</strong>.
            <br />
            • A <strong>thinner wire</strong> has a narrow cross-section, causing more resistance and lower current.
          </p>
        </div>
      </div>
    </div>
  );
};
