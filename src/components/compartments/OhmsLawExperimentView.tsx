import React, { useState, useMemo } from 'react';
import {
  FlaskConical,
  Play,
  Pause,
  RotateCcw,
  Plus,
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
  Cpu,
  Trash2
} from 'lucide-react';

export interface OhmsLawTrialRow {
  sNo: number;
  v: number; // Potential Difference in Volts
  i: number; // Current in Amperes
  r: number; // Resistance R = V / I in Ohms
}

const DEFAULT_OHMS_LAW_ROWS: OhmsLawTrialRow[] = [
  { sNo: 1, v: 1.0, i: 0.20, r: 5.00 },
  { sNo: 2, v: 2.0, i: 0.40, r: 5.00 },
  { sNo: 3, v: 3.0, i: 0.60, r: 5.00 },
  { sNo: 4, v: 4.0, i: 0.80, r: 5.00 },
  { sNo: 5, v: 5.0, i: 1.00, r: 5.00 },
];

export const OhmsLawExperimentView: React.FC = () => {
  // Apparatus interactive state
  const [isKeyClosed, setIsKeyClosed] = useState<boolean>(true);
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 (max rheostat resistance) to 100 (min rheostat resistance)
  const [copiedNotes, setCopiedNotes] = useState<boolean>(false);
  const [tableRows, setTableRows] = useState<OhmsLawTrialRow[]>(DEFAULT_OHMS_LAW_ROWS);

  // Constant parameters
  const resistanceFixed = 5.0; // Fixed resistor R = 5.0 ohms
  const batteryEmf = 6.0; // Battery EMF = 6.0 V

  // Rheostat resistance: sliderPos 0 -> 25 ohms, sliderPos 100 -> 1 ohm
  const rheostatResistance = useMemo(() => {
    return Number((25.0 - (sliderPos / 100) * 24.0).toFixed(2));
  }, [sliderPos]);

  // Live circuit electrical calculations
  const { currentAmp, voltageVolt, resistanceCalc } = useMemo(() => {
    if (!isKeyClosed) {
      return { currentAmp: 0, voltageVolt: 0, resistanceCalc: 0 };
    }
    const totalR = resistanceFixed + rheostatResistance;
    const current = Number((batteryEmf / totalR).toFixed(2));
    const voltage = Number((current * resistanceFixed).toFixed(2));
    const rCalc = current > 0 ? Number((voltage / current).toFixed(2)) : 0;
    return {
      currentAmp: current,
      voltageVolt: voltage,
      resistanceCalc: rCalc,
    };
  }, [isKeyClosed, rheostatResistance]);

  // Mean resistance from the table
  const meanResistance = useMemo(() => {
    if (tableRows.length === 0) return 0;
    const sum = tableRows.reduce((acc, row) => acc + row.r, 0);
    return Number((sum / tableRows.length).toFixed(2));
  }, [tableRows]);

  // Add current simulated reading to table
  const handleRecordTrial = () => {
    if (!isKeyClosed) {
      alert("Plug key is OPEN! Close the plug key to pass current before recording readings.");
      return;
    }
    const newTrial: OhmsLawTrialRow = {
      sNo: tableRows.length + 1,
      v: voltageVolt,
      i: currentAmp,
      r: Number((voltageVolt / currentAmp).toFixed(2)),
    };
    setTableRows([...tableRows, newTrial]);
  };

  const handleResetTable = () => {
    setTableRows(DEFAULT_OHMS_LAW_ROWS);
  };

  const handleDeleteRow = (index: number) => {
    const updated = tableRows.filter((_, idx) => idx !== index).map((row, idx) => ({
      ...row,
      sNo: idx + 1,
    }));
    setTableRows(updated);
  };

  // Copy full notes to clipboard
  const handleCopyNotes = () => {
    const notesText = `AP SSC CLASS 10 PHYSICS - EXPERIMENT NOTES
EXPERIMENT: TO VERIFY OHM'S LAW

1. AIM:
To determine the resistance of a given resistor by plotting a graph of potential difference (V) versus electric current (I) and to verify Ohm's law (V ∝ I at constant temperature).

2. REQUIRED MATERIALS:
- DC Battery (or 3-4 dry cells of 1.5 V each)
- Unknown Resistor / Nichrome wire (R)
- DC Ammeter (0-1.5 A)
- DC Voltmeter (0-6 V)
- Rheostat (variable resistor)
- Plug Key (one-way switch)
- Insulated copper connecting wires and sandpaper

3. FORMULA:
R = V / I
Where:
- V = Potential difference across the resistor (in Volts, V)
- I = Electric current flowing through the resistor (in Amperes, A)
- R = Resistance of the given resistor (in Ohms, Ω)
Statement: At constant temperature, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) applied across its ends (V ∝ I).

4. PROCEDURE:
1. Clean the ends of the connecting wires with sandpaper to remove insulation or oxide layers.
2. Connect the battery, plug key, rheostat, ammeter, and given resistor in series as shown in the circuit diagram.
3. Connect the voltmeter strictly in parallel across the ends of the given resistor with proper polarity (+ to +, − to −).
4. Note the least count and zero error of the ammeter and voltmeter.
5. Close the plug key and adjust the rheostat slider to set a small initial current.
6. Record the reading of current (I) from the ammeter and potential difference (V) from the voltmeter.
7. Move the rheostat slider to 4-5 different positions, recording V and I values in each position.
8. Calculate the ratio R = V / I for each trial.
9. Plot a graph taking Current (I) on the X-axis and Potential difference (V) on the Y-axis.

5. OBSERVATION:
- As the potential difference (V) increases, the electric current (I) increases in direct proportion.
- The ratio R = V / I calculated for all observations remains practically constant within experimental limits (Mean R ≈ 5.0 Ω).
- The graph plotted between V and I is a straight line passing through the origin (0, 0).

6. CONCLUSION:
- The ratio V / I = Constant, which proves that at constant temperature, V ∝ I. Hence, Ohm's law is experimentally verified.
- The resistance of the given resistor is found to be constant, and equals the slope of the V vs I graph (R = ΔV / ΔI).

7. TABLE:
S.No | V (Volts) | I (Amperes) | R = V / I (Ω)
1    | 1.0       | 0.20        | 5.00
2    | 2.0       | 0.40        | 5.00
3    | 3.0       | 0.60        | 5.00
4    | 4.0       | 0.80        | 5.00
5    | 5.0       | 1.00        | 5.00
Mean Resistance R = 5.00 Ω

8. GRAPH (V vs I):
- X-axis: Current I (A)
- Y-axis: Potential Difference V (V)
- Nature of graph: Straight line passing through the origin (0, 0).
- Slope = ΔV / ΔI = R (Resistance of conductor).

9. DIAGRAM:
Circuit comprises Battery, Plug Key, Rheostat, Ammeter in series with Resistor (R), and Voltmeter in parallel across R.

10. PRECAUTIONS:
1. All circuit connections must be clean and tight.
2. Pass current only while taking readings; remove the plug key immediately after reading to avoid heating the resistor.`;

    navigator.clipboard.writeText(notesText);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2500);
  };

  // Needle angles for meters (-45 deg to +45 deg)
  const ammeterAngle = useMemo(() => {
    if (!isKeyClosed) return -45;
    // max scale 1.5 A
    const fraction = Math.min(Math.max(currentAmp / 1.5, 0), 1);
    return -45 + fraction * 90;
  }, [currentAmp, isKeyClosed]);

  const voltmeterAngle = useMemo(() => {
    if (!isKeyClosed) return -45;
    // max scale 6.0 V
    const fraction = Math.min(Math.max(voltageVolt / 6.0, 0), 1);
    return -45 + fraction * 90;
  }, [voltageVolt, isKeyClosed]);

  return (
    <div className="space-y-8">
      {/* Title & Action Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                AP SSC Class 10 Physics Lab Manual
              </span>
              <span>·</span>
              <span>Activity 1</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Ohm’s Law Experiment Notes &amp; OLab
            </h1>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Complete standardized laboratory practical notes with all 10 prescribed side headings, interactive animated circuit apparatus, live <span className="font-mono text-amber-300 font-bold">V vs I</span> coordinate graphing, and clean exam-ready formatting.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCopyNotes}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {copiedNotes ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span>Notes Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Exam Notes</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick jump anchor pill bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold py-1 px-2">10 Exam Headings:</span>
          {[
            { n: 1, label: 'Aim' },
            { n: 2, label: 'Required Materials' },
            { n: 3, label: 'Formula R = V/I' },
            { n: 4, label: 'Procedure' },
            { n: 5, label: 'Observation' },
            { n: 6, label: 'Conclusion' },
            { n: 7, label: 'Table (V, I, R=V/I)' },
            { n: 8, label: 'GRAPH V vs I' },
            { n: 9, label: 'Diagram (Animated)' },
            { n: 10, label: 'Precautions (Two)' },
          ].map((h) => (
            <span
              key={h.n}
              className="bg-slate-950/80 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md font-medium"
            >
              <strong className="text-amber-400">{h.n}.</strong> {h.label}
            </span>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. AIM */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            1
          </span>
          <span className="text-amber-400 uppercase tracking-wide">Aim</span>
        </h2>
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
          <p className="font-semibold text-white">
            To determine the resistance of a given resistor by plotting a graph of potential difference (<span className="text-amber-400 font-mono">V</span>) versus electric current (<span className="text-cyan-400 font-mono">I</span>) and to experimentally verify <strong className="text-amber-300">Ohm’s law</strong> (<span className="font-mono text-emerald-400">V ∝ I</span> at constant temperature).
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REQUIRED MATERIALS */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            2
          </span>
          <span className="text-amber-400 uppercase tracking-wide">Required Materials</span>
        </h2>
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
            {[
              { name: 'DC Battery / Power Supply', detail: '6 V DC or 3–4 dry cells (1.5 V each in series)' },
              { name: 'Unknown Resistor', detail: 'A standard nichrome resistance wire (R ≈ 5 Ω)' },
              { name: 'DC Ammeter', detail: 'Range 0–1.5 A or 0–3 A (connected in Series)' },
              { name: 'DC Voltmeter', detail: 'Range 0–6 V or 0–10 V (connected in Parallel)' },
              { name: 'Rheostat (Variable Resistor)', detail: '0–50 Ω wire-wound rheostat to vary current' },
              { name: 'Plug Key (One-way Switch)', detail: 'To make and break the circuit safely' },
              { name: 'Connecting Wires & Sandpaper', detail: 'Insulated thick copper wires and sandpaper to clean terminal ends' },
            ].map((mat, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-slate-800 p-3 rounded-lg flex items-start gap-2.5"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <div>
                  <span className="font-bold text-slate-100 block">{mat.name}</span>
                  <span className="text-slate-400 text-xs">{mat.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FORMULA R = V / I */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            3
          </span>
          <span className="text-amber-400 uppercase tracking-wide">Formula: R = V / I</span>
        </h2>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
          {/* Main Formula Highlight Card */}
          <div className="bg-amber-400/10 border-2 border-amber-400/50 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider block mb-1">
                Working Formula for Resistance:
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-black text-amber-300 tracking-wider">
                R = V / I
              </div>
            </div>
            <div className="text-xs sm:text-sm text-slate-300 space-y-1 sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-6">
              <div><strong className="text-amber-400 font-mono">V</strong> = Potential Difference across resistor (Volts, <strong className="text-white">V</strong>)</div>
              <div><strong className="text-cyan-400 font-mono">I</strong> = Electric Current through resistor (Amperes, <strong className="text-white">A</strong>)</div>
              <div><strong className="text-emerald-400 font-mono">R</strong> = Electrical Resistance of resistor (Ohms, <strong className="text-white">Ω</strong>)</div>
            </div>
          </div>

          {/* Statement & Principle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">Ohm’s Law Statement:</span>
              <p className="text-slate-300 leading-relaxed">
                At constant temperature, the electric current (<span className="text-cyan-400 font-mono">I</span>) flowing through a metallic conductor is directly proportional to the potential difference (<span className="text-amber-400 font-mono">V</span>) applied across its ends:
                <br />
                <span className="font-mono font-bold text-amber-300 text-sm mt-1 block">V ∝ I &nbsp;⇒&nbsp; V = I · R &nbsp;⇒&nbsp; R = V / I = Constant</span>
              </p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">SI Unit & Equivalent Units:</span>
              <p className="text-slate-300 leading-relaxed">
                SI Unit of Resistance is the <strong>Ohm (Ω)</strong>.
                <br />
                <span className="font-mono text-slate-200 mt-1 block font-semibold">
                  1 Ohm (1 Ω) = 1 Volt / 1 Ampere = 1 V / 1 A = 1 V·A⁻¹
                </span>
                <span className="text-slate-400 text-xs block mt-1">
                  1 Ω is the resistance of a conductor when 1 Volt potential difference causes 1 Ampere current to flow.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROCEDURE */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            4
          </span>
          <span className="text-amber-400 uppercase tracking-wide">Procedure</span>
        </h2>
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-3 text-xs sm:text-sm text-slate-200">
          {[
            {
              step: 1,
              title: 'Clean the wire leads',
              desc: 'Clean the ends of all connecting wires with sandpaper to eliminate insulating oxide layers and ensure flawless electrical contact.',
            },
            {
              step: 2,
              title: 'Assemble the Series Circuit',
              desc: 'Connect the DC battery, plug key, rheostat, DC ammeter, and the given unknown resistor (R) in series, observing polarity (+ to +, − to −).',
            },
            {
              step: 3,
              title: 'Connect the Voltmeter in Parallel',
              desc: 'Connect the DC voltmeter strictly in parallel across the terminals of the unknown resistor (R) such that positive terminal of voltmeter connects to positive side of resistor.',
            },
            {
              step: 4,
              title: 'Check Zero Error & Least Count',
              desc: 'Inspect both meters for zero error (adjust screw if needed) and calculate the least count of the ammeter and voltmeter.',
            },
            {
              step: 5,
              title: 'Insert Plug Key & Set Minimum Current',
              desc: 'Insert the plug key to close the circuit. Adjust the rheostat slider to set a small initial current reading on the ammeter.',
            },
            {
              step: 6,
              title: 'Record Readings',
              desc: 'Note down the exact value of current (I) from the ammeter and potential difference (V) from the voltmeter.',
            },
            {
              step: 7,
              title: 'Obtain Multiple Trials',
              desc: 'Shift the rheostat slider gradually to 4–5 different positions to obtain different pairs of V and I values.',
            },
            {
              step: 8,
              title: 'Compute Resistance Ratio',
              desc: 'For each trial, calculate the ratio R = V / I and find the average (mean) resistance of the wire.',
            },
            {
              step: 9,
              title: 'Plot the V vs I Graph',
              desc: 'Plot a coordinate graph with Current (I) along the horizontal X-axis and Potential Difference (V) along the vertical Y-axis.',
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
              <span className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                {item.step}
              </span>
              <div>
                <strong className="text-amber-300 font-semibold block">{item.title}:</strong>
                <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OBSERVATION */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            5
          </span>
          <span className="text-amber-400 uppercase tracking-wide">Observation</span>
        </h2>
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-3 text-xs sm:text-sm text-slate-200">
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <span className="text-amber-400 text-base font-bold">1.</span>
            <p className="leading-relaxed">
              As the potential difference (<span className="text-amber-400 font-mono">V</span>) across the resistor increases, the electric current (<span className="text-cyan-400 font-mono">I</span>) flowing through it increases in direct proportion.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <span className="text-amber-400 text-base font-bold">2.</span>
            <p className="leading-relaxed">
              The calculated ratio of potential difference to current, <strong className="text-amber-300 font-mono">R = V / I</strong>, remains practically constant for all observations within experimental error limits (<span className="text-emerald-400 font-mono font-bold">R ≈ 5.00 Ω</span>).
            </p>
          </div>
          <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
            <span className="text-amber-400 text-base font-bold">3.</span>
            <p className="leading-relaxed">
              The coordinate graph plotted between Potential Difference (<span className="text-amber-400 font-mono">V</span>) on the Y-axis and Current (<span className="text-cyan-400 font-mono">I</span>) on the X-axis is a <strong>straight line passing directly through the origin (0, 0)</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CONCLUSION */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center text-xs font-black">
            6
          </span>
          <span className="text-emerald-400 uppercase tracking-wide">Conclusion</span>
        </h2>
        <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-3 text-xs sm:text-sm text-slate-200">
          <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Ohm’s Law is Verified:</span>
            </div>
            <p className="text-slate-200 leading-relaxed pl-6">
              Since the ratio <strong className="font-mono text-emerald-300">V / I</strong> is constant, it confirms that at constant temperature, the electric current passing through a metallic conductor is directly proportional to the potential difference across its ends (<strong className="text-amber-300 font-mono">V ∝ I</strong>). Hence, <strong>Ohm’s law is successfully verified</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">Resistance from Slope:</span>
            <p className="text-slate-300 leading-relaxed">
              The electrical resistance of the given unknown resistor is constant and is given by the slope of the <span className="font-mono text-amber-300">V vs I</span> graph:
              <br />
              <span className="font-mono text-emerald-400 font-bold text-sm mt-1 block">
                Resistance R = Slope = ΔV / ΔI = 5.00 Ω
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TABLE WITH COLUMNS: SERIAL NUMBER, V, I, R == V/I */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
              7
            </span>
            <span className="text-amber-400 uppercase tracking-wide">
              Table: Serial Number, V, I, R = V/I
            </span>
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRecordTrial}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record Live Reading ({voltageVolt.toFixed(2)}V, {currentAmp.toFixed(2)}A)</span>
            </button>
            <button
              onClick={handleResetTable}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Observation Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider text-[11px] sm:text-xs">
              <tr>
                <th className="py-3.5 px-4 text-center w-24">Serial Number (S.No)</th>
                <th className="py-3.5 px-4 text-center">
                  <span className="text-amber-400">Potential Difference V</span>
                  <span className="block text-[10px] text-slate-400 font-normal font-mono">(Volts, V)</span>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <span className="text-cyan-400">Current I</span>
                  <span className="block text-[10px] text-slate-400 font-normal font-mono">(Amperes, A)</span>
                </th>
                <th className="py-3.5 px-4 text-center">
                  <span className="text-emerald-400">Resistance R = V / I</span>
                  <span className="block text-[10px] text-slate-400 font-normal font-mono">(Ohms, Ω)</span>
                </th>
                <th className="py-3.5 px-3 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono text-slate-200">
              {tableRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 text-center font-bold text-amber-400">{row.sNo}</td>
                  <td className="py-3 px-4 text-center font-semibold text-amber-300">{row.v.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center font-semibold text-cyan-300">{row.i.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-300 bg-emerald-950/10">
                    {row.r.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleDeleteRow(idx)}
                      title="Delete this trial"
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer with Mean Calculation */}
            <tfoot className="bg-slate-900/90 border-t-2 border-slate-800 font-mono text-xs sm:text-sm">
              <tr>
                <td colSpan={3} className="py-3.5 px-4 text-right font-bold text-slate-300 uppercase tracking-wide">
                  Mean Resistance (R_mean = ΣR / n):
                </td>
                <td className="py-3.5 px-4 text-center font-black text-emerald-400 bg-emerald-950/30 text-sm sm:text-base border-x border-emerald-500/30">
                  {meanResistance.toFixed(2)} Ω
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="text-[11px] text-slate-400 italic">
          * Note: The calculated ratio R = V / I is practically constant in every observation, validating Ohm’s Law.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 8. GRAPH V VS I */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
              8
            </span>
            <span className="text-amber-400 uppercase tracking-wide">GRAPH V vs I</span>
          </h2>
          <span className="text-xs bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-amber-300 font-mono font-medium">
            Straight Line through Origin: Slope = ΔV / ΔI = R
          </span>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* SVG Coordinate Graph */}
            <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6">
              <svg viewBox="0 0 540 340" className="w-full h-72 sm:h-80 select-none">
                <defs>
                  {/* Grid pattern */}
                  <pattern id="graphGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                  </pattern>
                  <linearGradient id="lineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>

                {/* Grid Background */}
                <rect x="70" y="20" width="440" height="260" fill="url(#graphGrid)" />

                {/* Coordinate Axes */}
                {/* Horizontal X Axis (Current I in Amperes) */}
                <line x1="70" y1="280" x2="520" y2="280" stroke="#94a3b8" strokeWidth="2.5" />
                <polygon points="525,280 515,275 515,285" fill="#94a3b8" />

                {/* Vertical Y Axis (Potential Difference V in Volts) */}
                <line x1="70" y1="280" x2="70" y2="15" stroke="#94a3b8" strokeWidth="2.5" />
                <polygon points="70,10 65,20 75,20" fill="#94a3b8" />

                {/* Origin Label (0,0) */}
                <text x="56" y="295" fill="#94a3b8" fontSize="12" fontWeight="bold">0</text>

                {/* X Axis Ticks (Current I in Amperes: 0.2, 0.4, 0.6, 0.8, 1.0, 1.2 A) */}
                {[
                  { val: '0.2', x: 140 },
                  { val: '0.4', x: 210 },
                  { val: '0.6', x: 280 },
                  { val: '0.8', x: 350 },
                  { val: '1.0', x: 420 },
                  { val: '1.2', x: 490 },
                ].map((t, i) => (
                  <g key={i}>
                    <line x1={t.x} y1="280" x2={t.x} y2="285" stroke="#94a3b8" strokeWidth="1.5" />
                    <text x={t.x} y="300" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontFamily="monospace">
                      {t.val}
                    </text>
                  </g>
                ))}

                {/* Y Axis Ticks (Potential Difference V in Volts: 1, 2, 3, 4, 5, 6 V) */}
                {[
                  { val: '1', y: 240 },
                  { val: '2', y: 200 },
                  { val: '3', y: 160 },
                  { val: '4', y: 120 },
                  { val: '5', y: 80 },
                  { val: '6', y: 40 },
                ].map((t, i) => (
                  <g key={i}>
                    <line x1="65" y1={t.y} x2="70" y2={t.y} stroke="#94a3b8" strokeWidth="1.5" />
                    <text x="54" y={t.y + 4} fill="#cbd5e1" fontSize="11" textAnchor="end" fontFamily="monospace">
                      {t.val}
                    </text>
                  </g>
                ))}

                {/* Axis Labels */}
                <text x="300" y="325" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  Current I (Amperes, A) → [X-Axis]
                </text>
                <text
                  x="-150"
                  y="26"
                  transform="rotate(-90)"
                  fill="#fbbf24"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  Potential Difference V (Volts, V) → [Y-Axis]
                </text>

                {/* Slope Right Triangle (between point 2: 0.4A, 2V and point 4: 0.8A, 4V) */}
                <polygon
                  points="210,200 350,200 350,120"
                  fill="#f59e0b"
                  fillOpacity="0.12"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                {/* ΔI line */}
                <text x="280" y="215" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  ΔI = 0.40 A
                </text>
                {/* ΔV line */}
                <text x="360" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold" fontFamily="monospace">
                  ΔV = 2.0 V
                </text>

                {/* Best fit straight line passing through Origin */}
                <line x1="70" y1="280" x2="490" y2="40" stroke="url(#lineGrad)" strokeWidth="3.5" />

                {/* Plotted experimental data points from Table */}
                {tableRows.slice(0, 6).map((pt, i) => {
                  // Coordinate conversion:
                  // X: 70 is 0.0 A, 420 is 1.0 A => dx = (x / 1.0) * 350
                  // Y: 280 is 0.0 V, 80 is 5.0 V => dy = (v / 5.0) * 200
                  const px = 70 + (pt.i / 1.0) * 350;
                  const py = 280 - (pt.v / 5.0) * 200;
                  return (
                    <g key={i}>
                      {/* Glow halo */}
                      <circle cx={px} cy={py} r="8" fill="#38bdf8" fillOpacity="0.25" />
                      {/* Inner point */}
                      <circle cx={px} cy={py} r="4.5" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
                      {/* Coordinate text badge */}
                      <rect
                        x={px - 28}
                        y={py - 24}
                        width="56"
                        height="18"
                        rx="4"
                        fill="#020617"
                        stroke="#0284c7"
                        strokeWidth="1"
                      />
                      <text
                        x={px}
                        y={py - 12}
                        fill="#38bdf8"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        ({pt.i.toFixed(2)}, {pt.v.toFixed(1)})
                      </text>
                    </g>
                  );
                })}

                {/* Slope equation badge overlay inside graph */}
                <g transform="translate(110, 45)">
                  <rect width="180" height="52" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="12" y="20" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    Slope = ΔV / ΔI = R
                  </text>
                  <text x="12" y="38" fill="#34d399" fontSize="12" fontWeight="black" fontFamily="monospace">
                    R = 2.0 / 0.40 = 5.00 Ω
                  </text>
                </g>
              </svg>
            </div>

            {/* Graph Theory & Exam Points */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 text-xs uppercase tracking-wider block">
                  Key Graph Inferences:
                </span>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>The <strong className="text-white">V vs I</strong> graph is a straight line passing through the origin <strong className="text-amber-400 font-mono">(0, 0)</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>A straight line through origin mathematically proves that <strong className="text-emerald-300 font-mono">V ∝ I</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">✔</span>
                    <span>The <strong className="text-amber-300">Slope of V-I graph</strong> represents Resistance: <span className="font-mono text-white">R = ΔV / ΔI</span>.</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                <strong className="text-amber-400 font-bold block">Exam Note on Graph:</strong>
                <p className="leading-relaxed">
                  If the graph is plotted with <span className="font-mono font-bold">I</span> on Y-axis and <span className="font-mono font-bold">V</span> on X-axis, the slope gives <span className="font-mono font-bold">1 / R</span> (Conductance). Always specify axes clearly in the exam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. DIAGRAM (WITH ANIMATED DIAGRAM) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
                9
              </span>
              <span className="text-amber-400 uppercase tracking-wide">Diagram (Animated Laboratory Circuit)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Interactive circuit schematic with real-time deflecting ammeter/voltmeter needles, toggleable plug key, and animated moving current flow.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsKeyClosed(!isKeyClosed)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isKeyClosed
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  : 'bg-rose-500 hover:bg-rose-400 text-white'
              }`}
            >
              {isKeyClosed ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Key Inserted (Circuit ON)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Key Open (Click to Close Key)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Animated Circuit Canvas Container */}
        <div className="bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 space-y-4">
          {/* Animated SVG Diagram */}
          <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <svg viewBox="0 0 760 410" className="w-full h-auto select-none">
              <defs>
                <style>{`
                  @keyframes dashLoop {
                    from { stroke-dashoffset: 24; }
                    to { stroke-dashoffset: 0; }
                  }
                  .current-flow {
                    animation: dashLoop 0.8s linear infinite;
                  }
                `}</style>

                {/* Gradients */}
                <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <linearGradient id="meterFaceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Plate */}
              <rect width="760" height="410" rx="12" fill="#090d16" />

              {/* ========================================================================= */}
              {/* MAIN CIRCUIT WIRES (Base Dark Tracks) */}
              {/* Series Loop: Battery(+) -> Key -> Rheostat -> Ammeter -> Resistor -> Battery(-) */}
              {/* ========================================================================= */}
              {/* Top loop rail */}
              <path
                d="M 120 70 L 220 70 L 310 70 L 450 70 L 590 70 L 680 70 L 680 230 L 600 230"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Bottom return loop rail */}
              <path
                d="M 380 230 L 120 230 L 120 70"
                fill="none"
                stroke="#334155"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Parallel Voltmeter branches from terminals X (400) and Y (580) */}
              <path
                d="M 400 230 L 400 330 L 440 330"
                fill="none"
                stroke="#334155"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 580 230 L 580 330 L 540 330"
                fill="none"
                stroke="#334155"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* ========================================================================= */}
              {/* ANIMATED GLOWING CURRENT FLOW (Only when key is closed) */}
              {/* ========================================================================= */}
              {isKeyClosed && (
                <>
                  {/* Top rail current (Conventional: Left to Right) */}
                  <path
                    d="M 120 70 L 680 70 L 680 230 L 600 230"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="current-flow"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Bottom return rail current (Right to Left) */}
                  <path
                    d="M 380 230 L 120 230 L 120 70"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3.5"
                    strokeDasharray="8 6"
                    className="current-flow"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Parallel voltmeter branch flow */}
                  <path
                    d="M 400 230 L 400 330 L 440 330"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="current-flow"
                  />
                  <path
                    d="M 540 330 L 580 330 L 580 230"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    className="current-flow"
                  />
                </>
              )}

              {/* Direction Arrows along wire */}
              <g fill="#f59e0b" opacity={isKeyClosed ? 1 : 0.3}>
                {/* Top rail rightwards arrows */}
                <polygon points="175,66 185,70 175,74" />
                <polygon points="400,66 410,70 400,74" />
                <polygon points="630,66 640,70 630,74" />
                {/* Right rail downward arrow */}
                <polygon points="676,140 680,150 684,140" />
                {/* Bottom rail leftward arrows */}
                <polygon points="265,226 255,230 265,234" />
                {/* Left rail upward arrow */}
                <polygon points="116,160 120,150 124,160" />
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 1: DC BATTERY (Left Side: x=80..160, y=50..90) */}
              {/* ========================================================================= */}
              <g transform="translate(70, 40)">
                <rect x="0" y="0" width="80" height="60" rx="8" fill="url(#batteryGrad)" stroke="#475569" strokeWidth="1.5" />
                {/* Battery Cells Lines */}
                <line x1="28" y1="12" x2="28" y2="48" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <line x1="38" y1="20" x2="38" y2="40" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="48" y1="12" x2="48" y2="48" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                <line x1="58" y1="20" x2="58" y2="40" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

                {/* Polarities */}
                <text x="14" y="24" fill="#ef4444" fontSize="14" fontWeight="black">+</text>
                <text x="68" y="24" fill="#3b82f6" fontSize="16" fontWeight="black">−</text>
                <text x="40" y="55" fill="#f8fafc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Battery (6V)
                </text>
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 2: PLUG KEY (Switch) (x=190..250, y=45) */}
              {/* ========================================================================= */}
              <g transform="translate(195, 45)">
                {/* Wooden base block */}
                <rect x="0" y="5" width="55" height="40" rx="4" fill="#78350f" stroke="#92400e" strokeWidth="1" />
                {/* Brass blocks */}
                <rect x="6" y="12" width="18" height="26" rx="2" fill="#d97706" />
                <rect x="31" y="12" width="18" height="26" rx="2" fill="#d97706" />

                {/* Plug Key Inserted / Removed */}
                {isKeyClosed ? (
                  /* Plug inserted */
                  <g>
                    <circle cx="27.5" cy="25" r="7" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                    <circle cx="27.5" cy="25" r="3" fill="#b45309" />
                  </g>
                ) : (
                  /* Hole open with removed plug above */
                  <g>
                    <circle cx="27.5" cy="25" r="5" fill="#1e1b4b" stroke="#78350f" strokeWidth="1" />
                    {/* Floating plug key */}
                    <g transform="translate(20, -18)">
                      <circle cx="7" cy="7" r="6" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
                      <line x1="7" y1="13" x2="7" y2="20" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                    </g>
                  </g>
                )}

                <text x="27" y="56" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Key (K) {isKeyClosed ? 'Closed' : 'Open'}
                </text>
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 3: RHEOSTAT (Variable Resistor) (x=290..400, y=40) */}
              {/* ========================================================================= */}
              <g transform="translate(290, 35)">
                {/* Ceramic tube body */}
                <rect x="15" y="24" width="90" height="22" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1" />
                {/* Coil wire winding lines */}
                {[20, 27, 34, 41, 48, 55, 62, 69, 76, 83, 90, 97].map((cx, i) => (
                  <line key={i} x1={cx} y1="24" x2={cx} y2="46" stroke="#94a3b8" strokeWidth="1.5" />
                ))}

                {/* Metal slide bar on top */}
                <rect x="10" y="10" width="100" height="5" rx="2" fill="#cbd5e1" />

                {/* Sliding Contact Knob (moves based on sliderPos: 0% -> x=20, 100% -> x=100) */}
                <g transform={`translate(${20 + (sliderPos / 100) * 80}, 0)`}>
                  {/* Slider Knob */}
                  <rect x="-7" y="6" width="14" height="12" rx="3" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                  {/* Downward arrow pointer to coil */}
                  <polygon points="-4,18 4,18 0,25" fill="#f59e0b" />
                </g>

                <text x="60" y="65" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Rheostat (Rh: {rheostatResistance.toFixed(1)} Ω)
                </text>
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 4: AMMETER IN SERIES (x=460..540, y=25..95) */}
              {/* ========================================================================= */}
              <g transform="translate(470, 25)">
                {/* Outer Bezel */}
                <circle cx="45" cy="45" r="38" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
                {/* Dial Face */}
                <circle cx="45" cy="45" r="33" fill="url(#meterFaceGrad)" />

                {/* Calibrated Ticks on dial */}
                {[-45, -22.5, 0, 22.5, 45].map((angle, i) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x1 = 45 + 31 * Math.cos(rad);
                  const y1 = 45 + 31 * Math.sin(rad);
                  const x2 = 45 + 24 * Math.cos(rad);
                  const y2 = 45 + 24 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1.5" />;
                })}

                {/* Center Pivot */}
                <circle cx="45" cy="45" r="4" fill="#0f172a" />

                {/* Deflecting Needle Pointer */}
                <line
                  x1="45"
                  y1="45"
                  x2="45"
                  y2="20"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${ammeterAngle}, 45, 45)`}
                />

                {/* 'A' symbol and digital readout */}
                <text x="45" y="38" fill="#0284c7" fontSize="16" fontWeight="900" textAnchor="middle">A</text>
                <text x="45" y="60" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {currentAmp.toFixed(2)} A
                </text>

                {/* Polarity terminals */}
                <circle cx="10" cy="45" r="3" fill="#ef4444" />
                <text x="10" y="38" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
                <circle cx="80" cy="45" r="3" fill="#3b82f6" />
                <text x="80" y="38" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">−</text>

                <text x="45" y="98" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Ammeter (in Series)
                </text>
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 5: UNKNOWN RESISTOR (R) (Bottom Track: x=400..580, y=215..245) */}
              {/* ========================================================================= */}
              <g transform="translate(400, 205)">
                {/* Terminal Posts X and Y */}
                <circle cx="0" cy="25" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x="-4" y="10" fill="#fbbf24" fontSize="12" fontWeight="black">X (+)</text>

                <circle cx="180" cy="25" r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <text x="180" y="10" fill="#fbbf24" fontSize="12" fontWeight="black">Y (−)</text>

                {/* Resistor body (Zigzag nichrome wire representation) */}
                <path
                  d="M 0 25 L 20 25 L 30 10 L 45 40 L 60 10 L 75 40 L 90 10 L 105 40 L 120 10 L 135 40 L 150 10 L 160 25 L 180 25"
                  fill="none"
                  stroke={isKeyClosed ? '#f59e0b' : '#64748b'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Resistor Label Badge */}
                <rect x="50" y="48" width="80" height="22" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                <text x="90" y="63" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Resistor (R = 5 Ω)
                </text>
              </g>

              {/* ========================================================================= */}
              {/* COMPONENT 6: VOLTMETER IN PARALLEL (Underneath Resistor: x=450..530, y=290) */}
              {/* ========================================================================= */}
              <g transform="translate(450, 285)">
                {/* Outer Bezel */}
                <circle cx="45" cy="45" r="38" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" />
                {/* Dial Face */}
                <circle cx="45" cy="45" r="33" fill="url(#meterFaceGrad)" />

                {/* Calibrated Ticks on dial */}
                {[-45, -22.5, 0, 22.5, 45].map((angle, i) => {
                  const rad = (angle - 90) * (Math.PI / 180);
                  const x1 = 45 + 31 * Math.cos(rad);
                  const y1 = 45 + 31 * Math.sin(rad);
                  const x2 = 45 + 24 * Math.cos(rad);
                  const y2 = 45 + 24 * Math.sin(rad);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="1.5" />;
                })}

                {/* Center Pivot */}
                <circle cx="45" cy="45" r="4" fill="#0f172a" />

                {/* Deflecting Needle Pointer */}
                <line
                  x1="45"
                  y1="45"
                  x2="45"
                  y2="20"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${voltmeterAngle}, 45, 45)`}
                />

                {/* 'V' symbol and digital readout */}
                <text x="45" y="38" fill="#b45309" fontSize="16" fontWeight="900" textAnchor="middle">V</text>
                <text x="45" y="60" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  {voltageVolt.toFixed(2)} V
                </text>

                {/* Polarity terminals */}
                <circle cx="10" cy="45" r="3" fill="#ef4444" />
                <text x="10" y="38" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">+</text>
                <circle cx="80" cy="45" r="3" fill="#3b82f6" />
                <text x="80" y="38" fill="#3b82f6" fontSize="9" fontWeight="bold" textAnchor="middle">−</text>

                <text x="45" y="98" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Voltmeter (in Parallel)
                </text>
              </g>

              {/* Status Indicator Badge on Bottom Left */}
              <g transform="translate(30, 340)">
                <rect
                  x="0"
                  y="0"
                  width="220"
                  height="45"
                  rx="8"
                  fill="#0f172a"
                  stroke={isKeyClosed ? '#10b981' : '#f43f5e'}
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="22" r="6" fill={isKeyClosed ? '#10b981' : '#f43f5e'} filter="url(#glow)" />
                <text x="35" y="18" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {isKeyClosed ? 'CIRCUIT ACTIVE (ON)' : 'CIRCUIT BROKEN (OFF)'}
                </text>
                <text x="35" y="33" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  {isKeyClosed ? `I = ${currentAmp.toFixed(2)} A | V = ${voltageVolt.toFixed(2)} V` : 'Plug key unplugged'}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Apparatus Controls Directly Below Animated Diagram */}
          <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Interactive Rheostat & Circuit Controls
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-mono">
                  Rheostat Resistance: <strong className="text-amber-300">{rheostatResistance.toFixed(1)} Ω</strong>
                </span>
              </div>
            </div>

            {/* Slider bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Maximum Resistance (Min Current)</span>
                <span className="font-bold text-amber-400">Drag to Vary Current & Voltage</span>
                <span>Minimum Resistance (Max Current)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={sliderPos}
                disabled={!isKeyClosed}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 disabled:opacity-40"
              />
            </div>

            {/* Quick voltage presets & record button */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Quick Trial Presets:</span>
                {[
                  { label: 'Trial 1 (1.0 V)', pos: 0 },
                  { label: 'Trial 2 (2.0 V)', pos: 25 },
                  { label: 'Trial 3 (3.0 V)', pos: 50 },
                  { label: 'Trial 4 (4.0 V)', pos: 75 },
                  { label: 'Trial 5 (5.0 V)', pos: 100 },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    disabled={!isKeyClosed}
                    onClick={() => setSliderPos(preset.pos)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono text-[11px] disabled:opacity-40 cursor-pointer transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleRecordTrial}
                disabled={!isKeyClosed}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Record This Reading to Table ({voltageVolt.toFixed(2)} V, {currentAmp.toFixed(2)} A)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. PRECAUTIONS (JUST TWO IN SIMPLE AND EASILY REMEMBERED WAY) */}
      {/* ========================================================================= */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center text-xs font-black">
            10
          </span>
          <span className="text-amber-400 uppercase tracking-wide">
            Precautions (Just Two in Simple & Easily Remembered Way)
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Precaution 1 */}
          <div className="bg-amber-950/20 border-2 border-amber-500/40 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                1
              </span>
              <span>Precaution 1 (Clean & Tight Contacts)</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “All circuit connections must be clean and tight.”
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed pt-1">
              <strong>Why:</strong> Loose contacts create unwanted contact resistance that disrupts the circuit current and gives erroneous voltmeter readings.
            </p>
          </div>

          {/* Precaution 2 */}
          <div className="bg-amber-950/20 border-2 border-amber-500/40 p-5 rounded-2xl space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shrink-0">
                2
              </span>
              <span>Precaution 2 (Prevent Wire Heating)</span>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white leading-snug">
              “Pass current only while taking readings; remove the plug key immediately after reading.”
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed pt-1">
              <strong>Why:</strong> Continuous current heats the resistor (<span className="font-mono">H = I²Rt</span>), which increases its resistance and violates the condition of constant temperature.
            </p>
          </div>
        </div>

        {/* Quick Memory Aid Pill */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
          <span className="text-xs text-slate-300">
            🎯 <strong className="text-amber-400">Exam Memory Tip:</strong> Remember just two words: <span className="underline decoration-amber-400 font-bold text-white">TIGHT</span> (connections) and <span className="underline decoration-amber-400 font-bold text-white">COLD</span> (do not let resistor heat up by removing key).
          </span>
        </div>
      </section>
    </div>
  );
};
