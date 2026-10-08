import React, { useState } from 'react';
import { DIFFERENCES_DATA } from '../../data/differencesData';
import { DiagramSVGs } from '../DiagramSVGs';
import { Scale, Sparkles } from 'lucide-react';

export const DifferencesCompartment: React.FC = () => {
  const [selectedDiffId, setSelectedDiffId] = useState<string>(DIFFERENCES_DATA[0].id);

  const currentDiff = DIFFERENCES_DATA.find((d) => d.id === selectedDiffId) || DIFFERENCES_DATA[0];

  return (
    <div className="space-y-8">
      {/* Header Banner - Clean Differences Theme */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2 tracking-wider">
            <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">COMPARTMENT 5</span>
            <span aria-hidden="true">·</span>
            <span>CORE COMPARISONS &amp; DIFFERENCES</span>
            <span aria-hidden="true">·</span>
            <span>AP SSC BOARD EXAM FOCUS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Scientific Differences &amp; Comparison Tables
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Side-by-side comparative analysis of commonly confused physical terms. Each table includes definition, mathematical formulas, SI units, physical conditions, circuit diagrams, and exam takeaways.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-slate-800">
          {DIFFERENCES_DATA.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDiffId(d.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedDiffId === d.id
                  ? 'bg-amber-400 text-slate-950 shadow-sm font-extrabold'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
            >
              {d.title.split('vs.')[0].replace(/^[A-E]\)\s*/, '')} vs. {d.itemB}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Details Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1 tracking-wider uppercase">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>EXAM COMPARISON TOPIC</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{currentDiff.title}</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentDiff.summary}</p>
        </div>

        {/* Dual Diagrams for Series vs Parallel or Ohmic vs Non-Ohmic */}
        {currentDiff.id === 'series-vs-parallel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 block mb-2">Series Circuit (Single Loop)</span>
              <DiagramSVGs type="series" className="w-full h-40" />
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 block mb-2">Parallel Circuit (Branching Paths)</span>
              <DiagramSVGs type="parallel" className="w-full h-40" />
            </div>
          </div>
        )}

        {currentDiff.id === 'ohmic-vs-non-ohmic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block mb-2">Ohmic (Linear V-I Graph)</span>
              <DiagramSVGs type="ohmic" className="w-full h-40" />
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-pink-400 block mb-2">Non-Ohmic (Curved V-I Graph)</span>
              <DiagramSVGs type="non_ohmic" className="w-full h-40" />
            </div>
          </div>
        )}

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                <th className="py-3.5 px-4 w-1/4">Parameter / Aspect</th>
                <th className="py-3.5 px-4 w-3/8 text-cyan-400 font-bold">{currentDiff.itemA}</th>
                <th className="py-3.5 px-4 w-3/8 text-amber-400 font-bold">{currentDiff.itemB}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {currentDiff.rows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-300 bg-slate-900/20">
                    {row.parameter}
                  </td>
                  <td className="py-3 px-4 text-slate-200 leading-relaxed">
                    {row.conceptA}
                  </td>
                  <td className="py-3 px-4 text-slate-200 leading-relaxed">
                    {row.conceptB}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AP SSC Exam Takeaway Box */}
        <div className="p-4 bg-amber-950/20 border border-amber-800/30 rounded-xl flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-200">
            <strong className="text-amber-400 block mb-0.5">High-Scoring Exam Takeaway:</strong>
            {currentDiff.keyExamTakeaway}
          </div>
        </div>
      </div>
    </div>
  );
};
