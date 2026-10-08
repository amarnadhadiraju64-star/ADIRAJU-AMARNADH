import React, { useState } from 'react';
import { DERIVATIONS_DATA } from '../../data/derivationsData';
import { DiagramSVGs } from '../DiagramSVGs';
import { ChevronRight, ChevronLeft, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { SeriesDerivationWhatsAppView } from './SeriesDerivationWhatsAppView';
import { ParallelDerivationWhatsAppView } from './ParallelDerivationWhatsAppView';
import { ThreeResistorCombinationsView } from './ThreeResistorCombinationsView';
import { ResistivityDerivationWhatsAppView } from './ResistivityDerivationWhatsAppView';

export const DerivationsCompartment: React.FC = () => {
  const [selectedDerivationId, setSelectedDerivationId] = useState<string>('series-derivation');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const currentDerivation = DERIVATIONS_DATA.find((d) => d.id === selectedDerivationId) || DERIVATIONS_DATA[0];

  const handleSelectDerivation = (id: string) => {
    setSelectedDerivationId(id);
    setActiveStepIndex(0);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner - Attractive Purple/Violet Derivation Theme */}
      <div className="bg-gradient-to-br from-purple-500/20 via-violet-500/10 to-indigo-900/10 border-2 border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-md shadow-purple-500/10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400 mb-2 tracking-wider">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">COMPARTMENT 3</span>
            <span aria-hidden="true">·</span>
            <span>MATHEMATICAL DERIVATIONS</span>
            <span aria-hidden="true">·</span>
            <span>STEP-BY-STEP PROOFS WITH ANIMATED SCHEMATICS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Complete Step-by-Step Derivations
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Follow rigorous mathematical derivations of key AP SSC physics equations. Step through each proof with animated circuit diagrams showing voltage drops and branching currents.
          </p>
        </div>

        {/* Derivations Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 pt-5 border-t border-purple-500/30">
          {DERIVATIONS_DATA.map((d) => (
            <button
              key={d.id}
              onClick={() => handleSelectDerivation(d.id)}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedDerivationId === d.id
                  ? 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-300 font-extrabold'
                  : 'bg-white dark:bg-slate-900 text-purple-950 dark:text-purple-200 border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/80 hover:border-purple-400'
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>
      </div>

      {/* Render dedicated Interactive Views */}
      {selectedDerivationId === 'resistivity-derivation' ? (
        <ResistivityDerivationWhatsAppView />
      ) : selectedDerivationId === 'series-derivation' ? (
        <SeriesDerivationWhatsAppView />
      ) : selectedDerivationId === 'parallel-derivation' ? (
        <ParallelDerivationWhatsAppView />
      ) : selectedDerivationId === 'three-resistors-combinations' ? (
        <ThreeResistorCombinationsView />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Derivation Steps Interactive Stepper */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">{currentDerivation.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{currentDerivation.description}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Target Formula</span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-amber-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-amber-400/40 inline-block shadow-xs">{currentDerivation.formula}</span>
              </div>
            </div>

            {/* Stepper Progress bar */}
            <div className="flex items-center gap-1.5 mb-6">
              {currentDerivation.steps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                    idx <= activeStepIndex ? 'bg-amber-400' : 'bg-slate-800'
                  }`}
                  title={`Step ${idx + 1}: ${s.title}`}
                />
              ))}
            </div>

            {/* Current Active Step Box */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/80 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Step {activeStepIndex + 1} of {currentDerivation.steps.length}: {currentDerivation.steps[activeStepIndex].title}
                </span>
                {currentDerivation.steps[activeStepIndex].highlight && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-400/30">
                    Key Equation
                  </span>
                )}
              </div>

              {/* Mathematical Equation */}
              <div className="my-3.5 p-4 bg-slate-900 rounded-xl border-2 border-amber-400/40 text-amber-300 font-mono text-base sm:text-lg font-extrabold tracking-wide whitespace-pre-line shadow-xs">
                {currentDerivation.steps[activeStepIndex].math}
              </div>

              {/* Plain English Explanation */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                {currentDerivation.steps[activeStepIndex].explanation}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeStepIndex === 0
                    ? 'text-slate-600 bg-slate-950 cursor-not-allowed'
                    : 'text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Step
              </button>

              <span className="text-xs text-slate-500 font-mono">
                {activeStepIndex + 1} / {currentDerivation.steps.length}
              </span>

              <button
                disabled={activeStepIndex === currentDerivation.steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(currentDerivation.steps.length - 1, prev + 1))}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeStepIndex === currentDerivation.steps.length - 1
                    ? 'text-slate-600 bg-slate-950 cursor-not-allowed'
                    : 'text-slate-950 bg-amber-400 hover:bg-amber-300'
                }`}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full Derivation Overview Accordion / List */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Complete Mathematical Breakdown (All Steps)
            </h3>
            <div className="space-y-3">
              {currentDerivation.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                    activeStepIndex === idx
                      ? 'bg-slate-950 border-amber-400/50 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                    <span>{idx + 1}. {step.title}</span>
                    <span className="text-amber-400 font-mono text-[11px]">{step.math.split('\n')[0].substring(0, 30)}...</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{step.explanation}</div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-5 p-4 bg-emerald-950/20 border border-emerald-800/30 rounded-xl text-xs text-emerald-300">
              <strong className="text-emerald-400 block mb-1">Final Conclusion:</strong>
              {currentDerivation.conclusion}
            </div>
          </div>
        </div>

        {/* Right Column: Animated Visual Diagram */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-1">Interactive Circuit Diagram</h3>
            <p className="text-xs text-slate-400 mb-4">
              Scientific schematic illustrating the physical principles of this derivation.
            </p>

            {/* Visual for Series Combination: Veq -> V1 + V2 + V3 */}
            {currentDerivation.visualType === 'series' && (
              <div className="space-y-4">
                <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-4">
                  <svg viewBox="0 0 360 260" className="w-full h-64">
                    {/* Background */}
                    <rect width="360" height="260" rx="8" fill="#020617" />

                    {/* Circuit Wire Loop */}
                    <path d="M40 180 L40 90 L60 90" stroke="#64748b" strokeWidth="2.5" fill="none" />
                    {/* Resistor R1 */}
                    <path d="M60 90 L67 78 L80 102 L93 78 L106 102 L113 90" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <line x1="113" y1="90" x2="140" y2="90" stroke="#64748b" strokeWidth="2.5" />

                    {/* Resistor R2 */}
                    <path d="M140 90 L147 78 L160 102 L173 78 L186 102 L193 90" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <line x1="193" y1="90" x2="220" y2="90" stroke="#64748b" strokeWidth="2.5" />

                    {/* Resistor R3 */}
                    <path d="M220 90 L227 78 L240 102 L253 78 L266 102 L273 90" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <path d="M273 90 L320 90 L320 180 L40 180" stroke="#64748b" strokeWidth="2.5" fill="none" />

                    {/* Battery at bottom */}
                    <line x1="170" y1="168" x2="170" y2="192" stroke="#ef4444" strokeWidth="4" />
                    <line x1="185" y1="174" x2="185" y2="186" stroke="#3b82f6" strokeWidth="2.5" />
                    <text x="178" y="210" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">Battery V_eq</text>

                    {/* Same current I flowing indicator */}
                    <circle cx="295" cy="135" r="4" fill="#10b981" />
                    <text x="310" y="140" fill="#34d399" fontSize="11" fontWeight="bold">I (Same)</text>

                    {/* IMPORTANT VISUAL REQUIREMENT: Animated Voltage Split Labels */}
                    <g transform="translate(0, 0)">
                      {/* V1 bracket */}
                      <rect x="58" y="40" width="58" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="87" y="56" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">V₁ = I·R₁</text>
                      <line x1="87" y1="64" x2="87" y2="76" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

                      {/* V2 bracket */}
                      <rect x="138" y="40" width="58" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="167" y="56" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">V₂ = I·R₂</text>
                      <line x1="167" y1="64" x2="167" y2="76" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />

                      {/* V3 bracket */}
                      <rect x="218" y="40" width="58" height="24" rx="4" fill="#1e293b" stroke="#38bdf8" />
                      <text x="247" y="56" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">V₃ = I·R₃</text>
                      <line x1="247" y1="64" x2="247" y2="76" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    </g>

                    {/* Total Voltage split equation visual */}
                    <rect x="50" y="225" width="260" height="26" rx="5" fill="#0f172a" stroke="#f59e0b" />
                    <text x="180" y="242" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">
                      V_eq splits into: V₁ + V₂ + V₃
                    </text>
                  </svg>
                </div>
                <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs text-amber-200">
                  ⚡ <strong>Visual Insight:</strong> Notice how battery potential difference V_eq is shared across all three resistors. The largest resistor takes the biggest share of voltage (V ∝ R).
                </div>
              </div>
            )}

            {/* Visual for Parallel Combination: I -> I1 + I2 + I3 */}
            {currentDerivation.visualType === 'parallel' && (
              <div className="space-y-4">
                <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-4">
                  <svg viewBox="0 0 360 260" className="w-full h-64">
                    <rect width="360" height="260" rx="8" fill="#020617" />

                    {/* Main bus wires */}
                    <line x1="30" y1="130" x2="90" y2="130" stroke="#64748b" strokeWidth="3" />
                    {/* Junction A */}
                    <circle cx="90" cy="130" r="5" fill="#f59e0b" />
                    <text x="85" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">A</text>

                    {/* Distribution column */}
                    <line x1="90" y1="50" x2="90" y2="210" stroke="#64748b" strokeWidth="3" />

                    {/* Branch 1 */}
                    <line x1="90" y1="50" x2="130" y2="50" stroke="#64748b" strokeWidth="2.5" />
                    <path d="M130 50 L137 40 L149 60 L161 40 L173 60 L180 50" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <line x1="180" y1="50" x2="230" y2="50" stroke="#64748b" strokeWidth="2.5" />

                    {/* Branch 2 */}
                    <line x1="90" y1="130" x2="130" y2="130" stroke="#64748b" strokeWidth="2.5" />
                    <path d="M130 130 L137 120 L149 140 L161 120 L173 140 L180 130" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <line x1="180" y1="130" x2="230" y2="130" stroke="#64748b" strokeWidth="2.5" />

                    {/* Branch 3 */}
                    <line x1="90" y1="210" x2="130" y2="210" stroke="#64748b" strokeWidth="2.5" />
                    <path d="M130 210 L137 200 L149 220 L161 200 L173 220 L180 210" stroke="#38bdf8" strokeWidth="3" fill="none" />
                    <line x1="180" y1="210" x2="230" y2="210" stroke="#64748b" strokeWidth="2.5" />

                    {/* Junction B & right bus */}
                    <line x1="230" y1="50" x2="230" y2="210" stroke="#64748b" strokeWidth="3" />
                    <circle cx="230" cy="130" r="5" fill="#f59e0b" />
                    <text x="238" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">B</text>
                    <line x1="230" y1="130" x2="330" y2="130" stroke="#64748b" strokeWidth="3" />

                    {/* IMPORTANT VISUAL REQUIREMENT: Animated Arrows showing Current Splitting */}
                    {/* Branch 1 arrow & label */}
                    <polygon points="112,46 122,50 112,54" fill="#f59e0b" />
                    <text x="155" y="32" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">I₁ = V/R₁</text>

                    {/* Branch 2 arrow & label */}
                    <polygon points="112,126 122,130 112,134" fill="#f59e0b" />
                    <text x="155" y="112" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">I₂ = V/R₂</text>

                    {/* Branch 3 arrow & label */}
                    <polygon points="112,206 122,210 112,214" fill="#f59e0b" />
                    <text x="155" y="192" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">I₃ = V/R₃</text>

                    {/* Main Current In and Out */}
                    <polygon points="50,126 60,130 50,134" fill="#10b981" />
                    <text x="55" y="118" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Total I</text>

                    <polygon points="270,126 280,130 270,134" fill="#10b981" />
                    <text x="275" y="118" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Total I</text>

                    <rect x="250" y="165" width="95" height="42" rx="4" fill="#1e293b" stroke="#38bdf8" />
                    <text x="297" y="182" fill="#e2e8f0" fontSize="9" textAnchor="middle">Current Conservation:</text>
                    <text x="297" y="198" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">I = I₁ + I₂ + I₃</text>
                  </svg>
                </div>
                <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded-xl text-xs text-cyan-200">
                  ⚡ <strong>Visual Insight:</strong> Notice that total current splits at junction A into three streams (I₁, I₂, I₃) and recombines at junction B. The voltage across all three branches is identical (V).
                </div>
              </div>
            )}

            {/* Visual for Resistivity & Ohm's law */}
            {(currentDerivation.visualType === 'resistivity' || currentDerivation.visualType === 'ohms_law') && (
              <div className="space-y-4">
                <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-4">
                  <DiagramSVGs type={currentDerivation.visualType} className="w-full h-56" />
                </div>
                <div className="p-3 bg-amber-950/20 border border-amber-800/30 rounded-xl text-xs text-amber-200">
                  ⚡ <strong>AP SSC Key Point:</strong> Make sure to state all physical conditions (like constant temperature) clearly in your exam answer sheet before writing the equations!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
