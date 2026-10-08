import React, { useState, useMemo } from 'react';
import {
  Layers,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Info,
  Check,
  BookOpen,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Cpu,
  HelpCircle,
  Activity,
  Sliders,
  Copy
} from 'lucide-react';

export interface SeriesOLabTrialRow {
  sNo: number;
  v1: number; // Voltage across R1 (V)
  v2: number; // Voltage across R2 (V)
  v3: number; // Voltage across R3 (V)
  vTotal: number; // Measured V across all (V)
  iTotal: number; // Series Current I (A)
  rCalc: number; // Experimental Rs = Vtotal / I (Ω)
  rTheo: number; // Theoretical Rs = R1 + R2 + R3 (Ω)
}

const DEFAULT_SERIES_ROWS: SeriesOLabTrialRow[] = [
  { sNo: 1, v1: 2.0, v2: 4.0, v3: 0, vTotal: 6.0, iTotal: 1.0, rCalc: 6.0, rTheo: 6.0 },
  { sNo: 2, v1: 3.0, v2: 6.0, v3: 0, vTotal: 9.0, iTotal: 1.5, rCalc: 6.0, rTheo: 6.0 },
  { sNo: 3, v1: 4.0, v2: 8.0, v3: 0, vTotal: 12.0, iTotal: 2.0, rCalc: 6.0, rTheo: 6.0 },
];

export const SeriesCombinationOLabView: React.FC = () => {
  // Circuit Controls
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12); // Volts
  const [rheostatVal, setRheostatVal] = useState<number>(6); // Ohms (rheostat)
  const [r1, setR1] = useState<number>(2); // Resistor 1 (Ohms)
  const [r2, setR2] = useState<number>(4); // Resistor 2 (Ohms)
  const [r3, setR3] = useState<number>(0); // Resistor 3 (0 = 2-resistor mode)
  const [probeMode, setProbeMode] = useState<'r1' | 'r2' | 'r3' | 'total'>('total');
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<SeriesOLabTrialRow[]>(DEFAULT_SERIES_ROWS);

  // Theoretical equivalent resistance
  const theoreticalRs = useMemo(() => {
    return r1 + r2 + (r3 > 0 ? r3 : 0);
  }, [r1, r2, r3]);

  // Total circuit resistance including rheostat
  const totalCircuitResistance = useMemo(() => {
    return theoreticalRs + rheostatVal;
  }, [theoreticalRs, rheostatVal]);

  // Live Circuit Calculations
  const { currentAmp, v1Drop, v2Drop, v3Drop, vCombinationDrop, activeVoltmeterReading } = useMemo(() => {
    if (!isKeyClosed) {
      return {
        currentAmp: 0,
        v1Drop: 0,
        v2Drop: 0,
        v3Drop: 0,
        vCombinationDrop: 0,
        activeVoltmeterReading: 0,
      };
    }

    const current = Number((batteryVoltage / totalCircuitResistance).toFixed(3));
    const v1 = Number((current * r1).toFixed(2));
    const v2 = Number((current * r2).toFixed(2));
    const v3 = r3 > 0 ? Number((current * r3).toFixed(2)) : 0;
    const vTotal = Number((v1 + v2 + v3).toFixed(2));

    let measuredV = vTotal;
    if (probeMode === 'r1') measuredV = v1;
    else if (probeMode === 'r2') measuredV = v2;
    else if (probeMode === 'r3') measuredV = v3;
    else measuredV = vTotal;

    return {
      currentAmp: current,
      v1Drop: v1,
      v2Drop: v2,
      v3Drop: v3,
      vCombinationDrop: vTotal,
      activeVoltmeterReading: measuredV,
    };
  }, [isKeyClosed, batteryVoltage, totalCircuitResistance, r1, r2, r3, probeMode]);

  // Record reading into observation table
  const handleRecordTrial = () => {
    if (!isKeyClosed) {
      alert("Please insert the plug key to complete the circuit before recording readings!");
      return;
    }
    const rCalc = currentAmp > 0 ? Number((vCombinationDrop / currentAmp).toFixed(2)) : 0;
    const newRow: SeriesOLabTrialRow = {
      sNo: tableRows.length + 1,
      v1: v1Drop,
      v2: v2Drop,
      v3: v3Drop,
      vTotal: vCombinationDrop,
      iTotal: currentAmp,
      rCalc: rCalc,
      rTheo: theoreticalRs,
    };
    setTableRows([...tableRows, newRow]);
  };

  const handleResetTable = () => {
    setTableRows(DEFAULT_SERIES_ROWS);
  };

  const handleDeleteRow = (index: number) => {
    setTableRows(tableRows.filter((_, idx) => idx !== index).map((r, idx) => ({ ...r, sNo: idx + 1 })));
  };

  // Mean experimental resistance
  const meanResistance = useMemo(() => {
    if (tableRows.length === 0) return 0;
    const sum = tableRows.reduce((acc, row) => acc + row.rCalc, 0);
    return Number((sum / tableRows.length).toFixed(2));
  }, [tableRows]);

  const percentageError = useMemo(() => {
    if (theoreticalRs === 0 || meanResistance === 0) return 0;
    return Number((Math.abs(meanResistance - theoreticalRs) / theoreticalRs * 100).toFixed(2));
  }, [meanResistance, theoreticalRs]);

  const handleCopyNotes = () => {
    const notes = `OLAB ACTIVITY: DETERMINATION OF EQUIVALENT RESISTANCE IN SERIES COMBINATION
Aim: To determine the equivalent resistance of resistors connected in series and verify Rs = R1 + R2 + R3.
Formulae:
1. Current remains constant: I = I1 = I2 = I3 = V / Rs
2. Total Voltage: V = V1 + V2 + V3
3. Equivalent Resistance: Rs = R1 + R2 + R3
Theoretical Rs = ${theoreticalRs} Ω
Mean Experimental Rs = ${meanResistance} Ω
Percentage Error = ${percentageError}%
Conclusion: The equivalent resistance of a series combination is equal to the algebraic sum of individual resistances. Rs is greater than the highest individual resistance.`;
    navigator.clipboard.writeText(notes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* OLAB ACTIVITY HEADER BANNER */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-white font-mono">
                OLAB ACTIVITY 2
              </span>
              <span>·</span>
              <span>AP SSC &amp; CBSE CLASS 10 PHYSICS</span>
              <span>·</span>
              <span>EXPERIMENTAL WORKBENCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Equivalent Resistance of Resistors in Series Combination
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Determine the equivalent resistance $R_s$ of resistors joined end-to-end in series, verify that constant current $I$ flows throughout the single loop, and demonstrate that total voltage $V = V_1 + V_2 + V_3$.
            </p>
          </div>

          <button
            onClick={handleCopyNotes}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-2 transition-all cursor-pointer self-start md:self-center shrink-0"
          >
            {copiedNotes ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
            <span>{copiedNotes ? 'Copied Lab Record!' : 'Copy OLab Record'}</span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE WORKBENCH CONTROLS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Control Panel */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-400" />
                <span>Apparatus Controls</span>
              </h3>
              <button
                onClick={() => setIsKeyClosed(!isKeyClosed)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  isKeyClosed
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isKeyClosed ? 'bg-slate-950 animate-ping' : 'bg-rose-500'}`} />
                <span>{isKeyClosed ? 'PLUG KEY CLOSED (ON)' : 'PLUG KEY OPEN (OFF)'}</span>
              </button>
            </div>

            {/* Resistor Values Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                1. Select Resistor Values (R₁, R₂, R₃):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {/* R1 Selector */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1">Resistor R₁:</span>
                  <select
                    value={r1}
                    onChange={(e) => setR1(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs font-mono font-bold"
                  >
                    <option value={2}>2.0 Ω</option>
                    <option value={3}>3.0 Ω</option>
                    <option value={4}>4.0 Ω</option>
                    <option value={5}>5.0 Ω</option>
                    <option value={10}>10.0 Ω</option>
                  </select>
                </div>

                {/* R2 Selector */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1">Resistor R₂:</span>
                  <select
                    value={r2}
                    onChange={(e) => setR2(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs font-mono font-bold"
                  >
                    <option value={2}>2.0 Ω</option>
                    <option value={4}>4.0 Ω</option>
                    <option value={6}>6.0 Ω</option>
                    <option value={8}>8.0 Ω</option>
                    <option value={12}>12.0 Ω</option>
                  </select>
                </div>

                {/* R3 Selector (Optional) */}
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-bold block mb-1">Resistor R₃:</span>
                  <select
                    value={r3}
                    onChange={(e) => setR3(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-1.5 text-xs font-mono font-bold"
                  >
                    <option value={0}>None (0 Ω)</option>
                    <option value={2}>2.0 Ω</option>
                    <option value={4}>4.0 Ω</option>
                    <option value={5}>5.0 Ω</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Voltmeter Probe Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>2. Voltmeter Probe Position:</span>
                <span className="text-white font-mono font-bold">
                  Measuring: {probeMode.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setProbeMode('r1')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    probeMode === 'r1'
                      ? 'bg-slate-800 text-white border-slate-600 shadow-xs'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Across R₁ ({r1} Ω) → V₁
                </button>
                <button
                  onClick={() => setProbeMode('r2')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    probeMode === 'r2'
                      ? 'bg-slate-800 text-white border-slate-600 shadow-xs'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  Across R₂ ({r2} Ω) → V₂
                </button>
                {r3 > 0 && (
                  <button
                    onClick={() => setProbeMode('r3')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      probeMode === 'r3'
                        ? 'bg-slate-800 text-white border-slate-600 shadow-xs'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Across R₃ ({r3} Ω) → V₃
                  </button>
                )}
                <button
                  onClick={() => setProbeMode('total')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    probeMode === 'total'
                      ? 'bg-slate-800 text-white border-slate-600 shadow-xs'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  } ${r3 === 0 ? 'col-span-2' : ''}`}
                >
                  Across Entire Combination → V_total
                </button>
              </div>
            </div>

            {/* Battery Voltage Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>3. Battery DC Potential Difference (V_source):</span>
                <span className="text-white font-mono font-bold">{batteryVoltage} V</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={batteryVoltage}
                onChange={(e) => setBatteryVoltage(Number(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>2 V</span>
                <span>12 V (Standard)</span>
                <span>24 V</span>
              </div>
            </div>

            {/* Rheostat Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>4. Rheostat Resistance (Rh):</span>
                <span className="text-white font-mono font-bold">{rheostatVal} Ω</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={rheostatVal}
                onChange={(e) => setRheostatVal(Number(e.target.value))}
                className="w-full accent-slate-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 Ω (Max Current)</span>
                <span>25 Ω (Min Current)</span>
              </div>
            </div>

            {/* Action Record Button */}
            <div className="pt-2">
              <button
                onClick={handleRecordTrial}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-100 text-slate-950 flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 text-slate-950" />
                <span>Record Current Reading to Observation Table</span>
              </button>
            </div>
          </div>

          {/* Quick Verification Formula Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-2">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
              Theoretical Verification Principle
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-200">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Theoretical R_s:</span>
                <strong className="text-white text-sm font-mono">
                  {theoreticalRs} Ω
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  ({r1} + {r2}{r3 > 0 ? ` + ${r3}` : ''})
                </span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Voltage Sum Rule:</span>
                <strong className="text-white text-sm font-mono">
                  {v1Drop} + {v2Drop}{r3 > 0 ? ` + ${v3Drop}` : ''} = {vCombinationDrop} V
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  V = V₁ + V₂ + V₃
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Schematic Workbench & Meters */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dual Digital / Analog Meters */}
          <div className="grid grid-cols-2 gap-4">
            {/* Ammeter Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-black text-xs flex items-center justify-center border border-slate-700">
                    A
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase">Series Ammeter</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Connected in Series
                </span>
              </div>

              <div className="my-3 text-center">
                <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  {currentAmp} <span className="text-base text-slate-400 font-sans font-bold">A</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Identical current through R₁, R₂ &amp; R₃
                </span>
              </div>

              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (currentAmp / 3.0) * 100)}%` }}
                />
              </div>
            </div>

            {/* Voltmeter Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 font-black text-xs flex items-center justify-center border border-slate-700">
                    V
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase">Voltmeter Probe</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Connected in Parallel
                </span>
              </div>

              <div className="my-3 text-center">
                <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                  {activeVoltmeterReading} <span className="text-base text-slate-400 font-sans font-bold">V</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Probe: {probeMode === 'total' ? 'Across R_total' : `Across R_${probeMode.slice(1)}`}
                </span>
              </div>

              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-white h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (activeVoltmeterReading / 24.0) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Circuit Schematic SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                <span>Live Series Circuit Diagram</span>
              </span>
              <span className="font-mono text-slate-400 text-[11px]">
                {isKeyClosed ? '⚡ Current Circulating' : '⚪ Circuit Open'}
              </span>
            </div>

            <svg viewBox="0 0 680 300" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800">
              {/* Main Circuit Loop Wires */}
              <rect x="50" y="60" width="580" height="180" rx="12" fill="none" stroke="#475569" strokeWidth="3" />

              {/* Animated Current Dots when key is closed */}
              {isKeyClosed && (
                <>
                  <circle cx="120" cy="60" r="3.5" fill="#f8fafc">
                    <animate attributeName="cx" from="50" to="630" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="630" cy="150" r="3.5" fill="#f8fafc">
                    <animate attributeName="cy" from="60" to="240" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="500" cy="240" r="3.5" fill="#f8fafc">
                    <animate attributeName="cx" from="630" to="50" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="50" cy="150" r="3.5" fill="#f8fafc">
                    <animate attributeName="cy" from="240" to="60" dur="2s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {/* Bottom Branch Components */}
              {/* 1. DC Battery Eliminator */}
              <g transform="translate(140, 222)">
                <rect x="-10" y="-12" width="60" height="24" fill="#0f172a" stroke="#334155" rx="4" />
                <line x1="10" y1="-8" x2="10" y2="8" stroke="#f8fafc" strokeWidth="2" />
                <line x1="20" y1="-14" x2="20" y2="14" stroke="#f8fafc" strokeWidth="4" />
                <line x1="30" y1="-8" x2="30" y2="8" stroke="#f8fafc" strokeWidth="2" />
                <line x1="40" y1="-14" x2="40" y2="14" stroke="#f8fafc" strokeWidth="4" />
                <text x="5" y="-18" fill="#cbd5e1" fontSize="11" fontWeight="bold">+{batteryVoltage}V −</text>
              </g>

              {/* 2. Plug Key */}
              <g transform="translate(300, 240)">
                <circle cx="-15" cy="0" r="4" fill="#64748b" />
                <circle cx="15" cy="0" r="4" fill="#64748b" />
                {isKeyClosed ? (
                  <>
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#f8fafc" strokeWidth="3" />
                    <circle cx="0" cy="0" r="3" fill="#22c55e" />
                    <text x="-14" y="22" fill="#22c55e" fontSize="10" fontWeight="bold">Key (Closed)</text>
                  </>
                ) : (
                  <>
                    <line x1="-15" y1="0" x2="10" y2="-15" stroke="#ef4444" strokeWidth="3" />
                    <text x="-12" y="22" fill="#ef4444" fontSize="10" fontWeight="bold">Key (Open)</text>
                  </>
                )}
              </g>

              {/* 3. Rheostat (Rh) */}
              <g transform="translate(450, 240)">
                <rect x="-35" y="-10" width="70" height="20" fill="#1e293b" stroke="#64748b" rx="4" />
                <text x="-30" y="5" fill="#f8fafc" fontSize="11" fontFamily="monospace">Rh: {rheostatVal}Ω</text>
                <line x1="0" y1="10" x2="15" y2="22" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="15,22 10,20 13,17" fill="#94a3b8" />
              </g>

              {/* Top Branch: Series Resistors R1, R2, R3 */}
              {/* Ammeter in series */}
              <g transform="translate(120, 60)">
                <circle cx="0" cy="0" r="20" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
                <text x="0" y="6" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">A</text>
                <text x="0" y="32" fill="#94a3b8" fontSize="10" textAnchor="middle">{currentAmp}A</text>
              </g>

              {/* Resistor R1 */}
              <g transform="translate(240, 60)">
                <rect x="-35" y="-14" width="70" height="28" fill="#1e293b" stroke={probeMode === 'r1' || probeMode === 'total' ? '#f8fafc' : '#475569'} strokeWidth={probeMode === 'r1' ? '3' : '2'} rx="6" />
                <text x="0" y="-18" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">R₁ = {r1} Ω</text>
                <text x="0" y="6" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">V₁ = {v1Drop}V</text>
              </g>

              {/* Series Connection Wire */}
              <line x1="275" y1="60" x2="345" y2="60" stroke="#f8fafc" strokeWidth="4" />
              <circle cx="310" cy="60" r="3" fill="#cbd5e1" />

              {/* Resistor R2 */}
              <g transform="translate(380, 60)">
                <rect x="-35" y="-14" width="70" height="28" fill="#1e293b" stroke={probeMode === 'r2' || probeMode === 'total' ? '#f8fafc' : '#475569'} strokeWidth={probeMode === 'r2' ? '3' : '2'} rx="6" />
                <text x="0" y="-18" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">R₂ = {r2} Ω</text>
                <text x="0" y="6" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">V₂ = {v2Drop}V</text>
              </g>

              {/* Resistor R3 (if enabled) */}
              {r3 > 0 && (
                <>
                  <line x1="415" y1="60" x2="475" y2="60" stroke="#f8fafc" strokeWidth="4" />
                  <g transform="translate(510, 60)">
                    <rect x="-35" y="-14" width="70" height="28" fill="#1e293b" stroke={probeMode === 'r3' || probeMode === 'total' ? '#f8fafc' : '#475569'} strokeWidth={probeMode === 'r3' ? '3' : '2'} rx="6" />
                    <text x="0" y="-18" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">R₃ = {r3} Ω</text>
                    <text x="0" y="6" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">V₃ = {v3Drop}V</text>
                  </g>
                </>
              )}

              {/* Voltmeter Probe Connected in Parallel Across Selection */}
              <g transform="translate(340, 150)">
                {/* Probe wires depending on probeMode */}
                {probeMode === 'r1' && (
                  <>
                    <path d="M 0,-15 C 0,-60 -135,-60 -135,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 0,-15 C 0,-60 -65,-60 -65,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                  </>
                )}
                {probeMode === 'r2' && (
                  <>
                    <path d="M 0,-15 C 0,-60 5,-60 5,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 0,-15 C 0,-60 75,-60 75,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                  </>
                )}
                {probeMode === 'r3' && (
                  <>
                    <path d="M 0,-15 C 0,-60 135,-60 135,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 0,-15 C 0,-60 205,-60 205,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                  </>
                )}
                {probeMode === 'total' && (
                  <>
                    <path d="M 0,-15 C 0,-60 -135,-60 -135,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 0,-15 C 0,-60 75,-60 75,-76" fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="3,3" />
                  </>
                )}

                <circle cx="0" cy="0" r="22" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2.5" />
                <text x="0" y="6" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">V</text>
                <text x="0" y="32" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">
                  {activeVoltmeterReading} V
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* OBSERVATION TABLE */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Observation Table: Recorded Trials &amp; Verification</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare experimental equivalent resistance $R_s = V / I$ with theoretical sum $R_1 + R_2 + R_3$.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetTable}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                <th className="py-3 px-3 text-center">Trial</th>
                <th className="py-3 px-3 text-center">Current I (A)</th>
                <th className="py-3 px-3 text-center">V₁ across R₁ (V)</th>
                <th className="py-3 px-3 text-center">V₂ across R₂ (V)</th>
                <th className="py-3 px-3 text-center">Total V (V)</th>
                <th className="py-3 px-3 text-center font-bold text-white">Expt. R_s = V/I (Ω)</th>
                <th className="py-3 px-3 text-center text-slate-300">Theo. R_s (Ω)</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {tableRows.map((row, idx) => (
                <tr key={row.sNo} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-bold">{row.sNo}</td>
                  <td className="py-3 px-3 text-center text-white">{row.iTotal.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{row.v1.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{row.v2.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center text-white font-bold">{row.vTotal.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center text-white font-black">{row.rCalc.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center text-slate-300">{row.rTheo.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center font-sans text-xs">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center">
                    <button
                      onClick={() => handleDeleteRow(idx)}
                      className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete trial row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calculation Summary Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Mean Experimental Equivalent Resistance:</span>
            <strong className="text-white text-base font-mono font-black mt-0.5 block">
              R_s (Mean) = {meanResistance} Ω
            </strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Theoretical Calculated Resistance:</span>
            <strong className="text-white text-base font-mono font-black mt-0.5 block">
              R_s (Theo) = {theoreticalRs} Ω
            </strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[11px]">Percentage Difference:</span>
            <strong className="text-emerald-400 text-base font-mono font-black mt-0.5 block">
              {percentageError}% (Accurate)
            </strong>
          </div>
        </div>
      </div>

      {/* LAB MANUAL: PROCEDURE, PRECAUTIONS & VIVA VOCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Procedure & Precautions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>OLab Procedure &amp; Precautions</span>
          </h4>
          <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Clean the ends of connecting wires with sandpaper to remove insulating oxide layers.</li>
            <li>Connect the ammeter strictly in <strong>SERIES</strong> with the resistors so total current flows through it.</li>
            <li>Connect the voltmeter in <strong>PARALLEL</strong> across the resistors to measure voltage drop.</li>
            <li>Ensure the positive (+) terminals of both ammeter and voltmeter point toward the positive (+) terminal of the battery.</li>
            <li>Do not keep the plug key inserted continuously to prevent Joule heating of resistors.</li>
          </ol>
        </div>

        {/* Viva Voce / Exam Questions */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>OLab Viva Voce &amp; AP SSC Exam Questions</span>
          </h4>
          <div className="space-y-2.5 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-white block">Q1: Why is an ammeter connected in series and voltmeter in parallel?</strong>
              <p className="text-slate-300">
                An ammeter has very low resistance ($R \approx 0$) so it does not alter circuit current. A voltmeter has very high resistance ($R \approx \infty$) so it draws negligible current from the test points.
              </p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-white block">Q2: If one resistor burns out in a series circuit, what happens to the others?</strong>
              <p className="text-slate-300">
                The entire circuit breaks immediately and current stops everywhere because there is only one continuous conducting path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
