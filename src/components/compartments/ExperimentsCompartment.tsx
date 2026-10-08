import React, { useState } from 'react';
import { EXPERIMENTS_DATA } from '../../data/experimentsData';
import { FlaskConical, Play, Plus, RotateCcw, Sparkles } from 'lucide-react';
import { OhmsLawExperimentView } from './OhmsLawExperimentView';
import { LengthExperimentView } from './LengthExperimentView';
import { AreaExperimentView } from './AreaExperimentView';

export const ExperimentsCompartment: React.FC = () => {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIMENTS_DATA[0].id);

  // Dynamic simulation parameters for remaining experiments:
  // Exp 2: Length
  const [simLength, setSimLength] = useState<number>(60);
  const [exp2Rows, setExp2Rows] = useState(EXPERIMENTS_DATA[1].data.defaultRows);

  // Exp 3: Area
  const [simArea, setSimArea] = useState<number>(0.5);
  const [exp3Rows, setExp3Rows] = useState(EXPERIMENTS_DATA[2].data.defaultRows);

  // Exp 4: Temperature
  const [simTemp, setSimTemp] = useState<number>(50);
  const [exp4Rows, setExp4Rows] = useState(EXPERIMENTS_DATA[3].data.defaultRows);

  // Exp 5: Material
  const [simMaterial, setSimMaterial] = useState<'Copper' | 'Aluminium' | 'Constantan' | 'Nichrome'>('Nichrome');
  const [exp5Rows, setExp5Rows] = useState(EXPERIMENTS_DATA[4].data.defaultRows);

  const currentExp = EXPERIMENTS_DATA.find((e) => e.id === selectedExpId) || EXPERIMENTS_DATA[0];

  // Helper to add simulated reading for other experiments
  const handleAddReading = () => {
    if (selectedExpId === 'exp-length') {
      const rVal = Number((simLength * 0.08).toFixed(2));
      const iVal = Number((4.0 / rVal).toFixed(2));
      const newRow = {
        length: simLength,
        v: '4.0',
        i: iVal.toFixed(2),
        r: rVal.toFixed(2),
        ratio: '0.08',
      };
      setExp2Rows([...exp2Rows, newRow]);
    } else if (selectedExpId === 'exp-area') {
      const rVal = Number((2.0 / simArea).toFixed(2));
      const iVal = Number((4.0 / rVal).toFixed(2));
      const newRow = {
        wire: `Simulated (${simArea} mm²)`,
        a: simArea.toFixed(2),
        v: '4.0',
        i: iVal.toFixed(2),
        r: rVal.toFixed(2),
        product: '2.00',
      };
      setExp3Rows([...exp3Rows, newRow]);
    } else if (selectedExpId === 'exp-temperature') {
      const rVal = Number((5.0 * (1 + 0.004 * (simTemp - 25))).toFixed(2));
      const iVal = Number((3.0 / rVal).toFixed(2));
      const newRow = {
        temp: simTemp,
        v: '3.0',
        i: iVal.toFixed(2),
        r: rVal.toFixed(2),
        delta: `+${(rVal - 5.0).toFixed(2)}`,
      };
      setExp4Rows([...exp4Rows, newRow]);
    }
  };

  const getActiveRows = () => {
    switch (selectedExpId) {
      case 'exp-length':
        return exp2Rows;
      case 'exp-area':
        return exp3Rows;
      case 'exp-temperature':
        return exp4Rows;
      case 'exp-material':
        return exp5Rows;
      default:
        return currentExp.data.defaultRows;
    }
  };

  const handleResetTable = () => {
    switch (selectedExpId) {
      case 'exp-length':
        setExp2Rows(EXPERIMENTS_DATA[1].data.defaultRows);
        break;
      case 'exp-area':
        setExp3Rows(EXPERIMENTS_DATA[2].data.defaultRows);
        break;
      case 'exp-temperature':
        setExp4Rows(EXPERIMENTS_DATA[3].data.defaultRows);
        break;
      case 'exp-material':
        setExp5Rows(EXPERIMENTS_DATA[4].data.defaultRows);
        break;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span>COMPARTMENT 4</span>
            <span aria-hidden="true">·</span>
            <span>AP SSC CLASS 10 OLABS &amp; EXPERIMENTS</span>
            <span aria-hidden="true">·</span>
            <span>STANDARD 10-HEADINGS FORMAT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Experiments &amp; Laboratory Procedures
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Perform every mandatory AP SSC physics lab experiment online. Adjust apparatus controls, record trial readings into standard tables, inspect coordinate graphs, and master the exact 10 exam headings.
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-slate-800">
          {EXPERIMENTS_DATA.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExpId(exp.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedExpId === exp.id
                  ? 'bg-amber-400 text-slate-900 font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white'
              }`}
            >
              {exp.id === 'exp-ohms-law' && <Sparkles className="w-3.5 h-3.5 text-slate-900" />}
              <span>{exp.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Render dedicated animated views */}
      {selectedExpId === 'exp-ohms-law' ? (
        <OhmsLawExperimentView />
      ) : selectedExpId === 'exp-length' ? (
        <LengthExperimentView />
      ) : selectedExpId === 'exp-area' ? (
        <AreaExperimentView />
      ) : (
        /* Presentation for other experiments with clean 10 headings */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          {/* Title & Badge */}
          <div className="border-b border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                AP SSC Laboratory Manual • Activity {currentExp.number}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{currentExp.title}</h2>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400">
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span>Simulated Virtual Apparatus Active</span>
            </div>
          </div>

          {/* 1. Aim */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">1</span>
              Aim
            </h3>
            <p className="text-sm text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
              {currentExp.data.aim}
            </p>
          </div>

          {/* 2. Required Materials */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">2</span>
              Required Materials
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
              {currentExp.data.requiredMaterials.map((mat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span>{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Formula */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">3</span>
              Equation / Working Formula
            </h3>
            <div className="p-4 bg-slate-950 rounded-xl border-2 border-amber-400/40 text-amber-300 font-mono font-extrabold text-base sm:text-lg tracking-wide shadow-xs">
              {currentExp.data.equation}
            </div>
          </div>

          {/* 4. Procedure */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">4</span>
              Procedure
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2.5 text-xs sm:text-sm text-slate-300">
              {currentExp.data.procedure.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-amber-400 font-bold shrink-0">{i + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Observation & 6. Conclusion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">5. Observation</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{currentExp.data.observation}</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/20">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">6. Conclusion</h4>
              <p className="text-xs text-slate-200 leading-relaxed">{currentExp.data.conclusion}</p>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="p-5 bg-slate-950/90 border border-amber-500/30 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5" />
                Simulated Laboratory Controls (Adjust & Record New Trials)
              </span>
              <button
                onClick={handleResetTable}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Table to Defaults
              </button>
            </div>

            {selectedExpId === 'exp-length' && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Wire Length (l):</span>
                    <span className="font-mono text-amber-400 font-bold">{simLength} cm</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={simLength}
                    onChange={(e) => setSimLength(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
                <button
                  onClick={handleAddReading}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Record Trial ({simLength}cm, R = {(simLength * 0.08).toFixed(2)}Ω)
                </button>
              </div>
            )}

            {selectedExpId === 'exp-area' && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Wire Cross-Sectional Area (A):</span>
                    <span className="font-mono text-cyan-400 font-bold">{simArea.toFixed(2)} mm²</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={simArea}
                    onChange={(e) => setSimArea(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
                <button
                  onClick={handleAddReading}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Record Trial ({simArea.toFixed(2)} mm², R = {(2.0 / simArea).toFixed(2)}Ω)
                </button>
              </div>
            )}

            {selectedExpId === 'exp-temperature' && (
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Bath Temperature (T):</span>
                    <span className="font-mono text-amber-400 font-bold">{simTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    step="5"
                    value={simTemp}
                    onChange={(e) => setSimTemp(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
                <button
                  onClick={handleAddReading}
                  className="w-full sm:w-auto px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Record Trial ({simTemp} °C)
                </button>
              </div>
            )}

            {selectedExpId === 'exp-material' && (
              <div className="text-xs text-slate-400">
                Comparative test for 4 standardized samples (Copper, Aluminium, Constantan, Nichrome). Inspect the recorded table below.
              </div>
            )}
          </div>

          {/* 7. Experimental Values Recorded – Table */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">7</span>
              Experimental Values Recorded – Table
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[11px]">
                  <tr>
                    {currentExp.data.tableColumns.map((col, i) => (
                      <th key={i} className="py-3 px-4 whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  {getActiveRows().map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-4 whitespace-nowrap font-medium text-slate-200">
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. Graph */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">8</span>
              Graph
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-400">{currentExp.data.graphDescription}</p>

              {/* Live Coordinate SVG Graph */}
              <div className="w-full h-64 bg-slate-900/60 rounded-lg p-3 border border-slate-800">
                <svg viewBox="0 0 420 220" className="w-full h-full">
                  {/* Axes */}
                  <line x1="50" y1="180" x2="390" y2="180" stroke="#64748b" strokeWidth="2" />
                  <line x1="50" y1="180" x2="50" y2="20" stroke="#64748b" strokeWidth="2" />

                  {/* Grid */}
                  {[40, 80, 120, 160].map((y) => (
                    <line key={y} x1="50" y1={y} x2="390" y2={y} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  ))}

                  {/* Plotted line */}
                  <line x1="50" y1="180" x2="370" y2="30" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* Data points along the line */}
                  {[
                    { x: 100, y: 155 },
                    { x: 160, y: 130 },
                    { x: 220, y: 105 },
                    { x: 280, y: 80 },
                    { x: 340, y: 55 },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#38bdf8" />
                      <circle cx={pt.x} cy={pt.y} r="6" fill="none" stroke="#0ea5e9" strokeWidth="1" />
                    </g>
                  ))}

                  {/* Slope triangle */}
                  <polygon points="220,105 280,105 280,80" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                  <text x="250" y="118" fill="#fbbf24" fontSize="9" textAnchor="middle">ΔX</text>
                  <text x="295" y="95" fill="#fbbf24" fontSize="9">ΔY</text>

                  <text x="390" y="200" fill="#94a3b8" fontSize="10" textAnchor="end">X-axis</text>
                  <text x="45" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">Y-axis</text>
                  <text x="200" y="50" fill="#34d399" fontSize="11" fontWeight="bold">Slope = Constant Ratio</text>
                </svg>
              </div>
            </div>
          </div>

          {/* 9. Study of the Graph */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">9</span>
              Study of the Graph
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs sm:text-sm text-slate-300">
              {currentExp.data.studyOfGraph.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-bold">✔</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Precautions */}
          <div>
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs">10</span>
              Two Very Important Precautions
            </h3>
            <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-xl space-y-2 text-xs text-amber-200">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400 shrink-0">Precaution 1:</span>
                <span>{currentExp.data.precautions[0]}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-400 shrink-0">Precaution 2:</span>
                <span>{currentExp.data.precautions[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

