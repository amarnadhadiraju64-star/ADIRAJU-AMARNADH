import React, { useState } from 'react';
import { Zap, Activity, Waves, Gauge, ArrowRight, Info, AlertTriangle } from 'lucide-react';

export const ElectronsCompartment: React.FC = () => {
  const [isCurrentFlowing, setIsCurrentFlowing] = useState<boolean>(true);
  const [appliedV, setAppliedV] = useState<number>(3); // Volts

  // Computed drift velocity: ~0.1 mm/s per volt
  const driftVelocityMmPerSec = Number((appliedV * 0.08).toFixed(2));
  // Signal propagation speed: speed of light in conductor ~ 2.0 x 10^8 m/s
  const signalSpeed = '2.0 × 10⁸ m/s (~67% speed of light)';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
            <span>SPECIAL COMPARTMENT 8</span>
            <span aria-hidden="true">·</span>
            <span>MICROSCOPIC PHYSICS</span>
            <span aria-hidden="true">·</span>
            <span>ELECTRONS, DRIFT & SIGNAL SPEED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Electricity Through Electrons: The Microscopic World
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Journey inside a metal wire to observe free electron drift, the true meaning of 1 Ampere, electrostatic potential difference, and the profound difference between electron drift speed and the near-instantaneous propagation of the electric field.
          </p>
        </div>
      </div>

      {/* 1. Charge on an Electron */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Concept 1</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            1. The Fundamental Charge on an Electron
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Elementary Electric Charge:</span>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400">
                e = −1.6 × 10⁻¹⁹ C
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>Why the Negative (−) Sign?</strong><br />
                The negative sign is a historical convention initiated by Benjamin Franklin before the discovery of subatomic particles. When J.J. Thomson discovered the electron in 1897, it was found to carry the exact unit of negative electric charge. Protons carry the identical magnitude with a positive sign: <strong>+1.6 × 10⁻¹⁹ C</strong>.
              </p>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-amber-400 font-bold block mb-1">How many electrons make 1 Coulomb?</span>
                <div>Q = n · e  ⇒  n = Q / e</div>
                <div>n = 1 C / (1.6 × 10⁻¹⁹ C) = <strong>6.25 × 10¹⁸ electrons</strong></div>
                <div className="text-slate-400 text-[11px] mt-1 italic">
                  6.25 billion billion electrons must pass to equal just 1 Coulomb of charge!
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Pulsing aura */}
              <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-ping" />
              <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-500 shadow-[0_0_30px_#06b6d4] flex flex-col items-center justify-center text-white border-2 border-cyan-300">
                <span className="text-3xl font-bold font-mono">e⁻</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold">Electron</span>
              </div>
            </div>
            <div className="mt-4 text-xs font-mono text-cyan-300">
              Charge: −1.602 × 10⁻¹⁹ C · Mass: 9.1 × 10⁻³¹ kg
            </div>
          </div>
        </div>
      </div>

      {/* 2. What is 1 Ampere? */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Concept 2</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            2. What is 1 Ampere? (Microscopic Charge Rate)
          </h2>
        </div>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Electric current is defined as <strong>I = Q / t</strong>. If a total electric charge of approximately <strong>1 Coulomb</strong> (which equals <strong>6.25 × 10¹⁸ free electrons</strong>) passes through a cross-section of a conductor in <strong>1 second</strong>, the electric current is defined as exactly <strong>1 Ampere</strong>.
          </p>

          {/* Animated cross-section simulation of 1 Ampere */}
          <div className="w-full bg-slate-950 rounded-xl border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Conductor Cross-Section Electron Stream</span>
              <span className="font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-500/30">
                Current: 1.0 Ampere = 1 C/s (6.25 × 10¹⁸ e⁻ / second)
              </span>
            </div>

            {/* Microscopic tube */}
            <div className="relative h-28 bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center">
              {/* Virtual vertical cross-section line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-400 shadow-[0_0_10px_#fbbf24] z-10 flex flex-col justify-between items-center py-1">
                <span className="text-[9px] font-bold text-slate-950 bg-amber-300 px-1 rounded">Plane A</span>
                <span className="text-[9px] font-bold text-slate-950 bg-amber-300 px-1 rounded">1 Sec</span>
              </div>

              {/* Drifting stream of electrons */}
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] flex items-center justify-center text-[9px] text-slate-950 font-bold absolute"
                  style={{
                    top: `${15 + (i % 4) * 20}px`,
                    left: `${(i * 4.2 + (Date.now() / 40)) % 100}%`,
                    transition: 'left 0.1s linear',
                  }}
                >
                  −
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>← Free electrons drift toward positive (+) terminal</span>
              <span>Conventional current (I) flows to the right (→)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Potential Difference & Water Analogy */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Concept 3</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            3. Potential Difference (Voltage) & The Water Flow Analogy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <h3 className="text-sm font-bold text-cyan-400">Scientific Definition: V = W / Q</h3>
            <p className="leading-relaxed">
              Potential difference is the amount of work done in moving a unit positive charge between two points against an electric field.
            </p>
            <p className="leading-relaxed">
              A battery does not create electrons; the electrons are already present inside the metallic conductor. The battery acts as an <strong>electrostatic pump</strong> that establishes an electric field, imparting energy (volts = Joules per Coulomb) to push electrons continuously through the circuit.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Waves className="w-4 h-4" />
              <span>The Water-Pipe Analogy (Educational Model)</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              • <strong>Water Tank Height / Pump Pressure:</strong> Analogous to <strong>Potential Difference (Voltage, V)</strong>. Higher pressure forces more water through.<br />
              • <strong>Water Flow Rate (litres per second):</strong> Analogous to <strong>Electric Current (Amperes, I)</strong>.<br />
              • <strong>Narrow Constricted Pipe / Roughness:</strong> Analogous to <strong>Electrical Resistance (Ohms, R)</strong>.
            </p>
            <div className="p-2.5 bg-amber-950/20 border border-amber-800/30 rounded-lg text-[11px] text-amber-200">
              ⚠️ <strong>Scientific Disclaimer:</strong> The water analogy is purely for qualitative intuition. Unlike water leaking from a broken pipe, electric charges cannot escape into the air easily because of air’s enormous dielectric insulation resistance.
            </div>
          </div>
        </div>
      </div>

      {/* 4. What is the Velocity of Electric Current? (CRITICAL AP SSC CONCEPT) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">Concept 4</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            4. What is the Velocity of Electric Current? (Drift vs. Signal Speed)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Crucial scientific distinction to prevent the most common misunderstanding in school physics.
          </p>
        </div>

        {/* Warning Callout against single velocity claim */}
        <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-xs sm:text-sm text-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-red-400 block mb-1">IMPORTANT PHYSICS FACT:</strong>
            Do <strong>NOT</strong> state that &quot;electric current has a single velocity&quot;! We must strictly distinguish between the <strong>Drift Velocity of individual electrons</strong> and the <strong>Propagation Velocity of the Electric Field (the electrical signal)</strong>.
          </div>
        </div>

        {/* Interactive Comparison Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Drift Velocity Card */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              1. Drift Velocity of Electrons (v_d)
            </span>
            <div className="text-2xl font-mono font-bold text-white">
              ~ 0.1 to 1 mm / second
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Inside a wire, free electrons constantly zip around randomly at thermal speeds of ~1,000,000 m/s in all directions with zero net forward motion. When voltage is applied, they acquire a very tiny net forward drift of only <strong>a fraction of a millimetre per second</strong> due to trillions of collisions per second with copper atoms!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-400">
              🐢 At 0.1 mm/s, an individual electron would take over <strong>2.5 hours</strong> to crawl through a 1-metre wire!
            </div>
          </div>

          {/* Electric Field Propagation Card */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              2. Electric Field / Signal Propagation Speed (c)
            </span>
            <div className="text-2xl font-mono font-bold text-white">
              ~ 300,000 km / second
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When you flip a wall switch, the <strong>electric field wave</strong> propagates through the conductor and surrounding space at nearly the speed of light (<strong>~2 × 10⁸ to 3 × 10⁸ m/s</strong>). This electromagnetic wave sets all free electrons along the entire circuit in motion virtually at the same instant!
            </p>
            <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] text-slate-400">
              ⚡ Like a long train: when the engine pushes, the very last wagon moves almost immediately, even though individual wheels turn at ordinary speeds.
            </div>
          </div>
        </div>

        {/* Interactive Interactive Conductor Simulator for Drift vs Signal */}
        <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-white block">Interactive Conductor Model</span>
              <span className="text-[11px] text-slate-400">Observe how the electric field activates instantly while electrons drift slowly.</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-300">Applied Voltage:</label>
              <input
                type="range"
                min="1"
                max="6"
                step="1"
                value={appliedV}
                onChange={(e) => setAppliedV(Number(e.target.value))}
                className="w-24 accent-amber-400 cursor-pointer"
              />
              <span className="font-mono text-amber-400 text-xs font-bold">{appliedV} V</span>
            </div>
          </div>

          {/* Conductor Visual */}
          <div className="w-full h-32 bg-slate-900 rounded-xl border border-slate-800 p-4 relative overflow-hidden flex flex-col justify-between">
            {/* Electric field lines spanning entire wire */}
            <div className="flex justify-between items-center text-[10px] font-mono text-amber-400 font-bold">
              <span>(+) High Potential</span>
              <span className="text-slate-400">Electric Field E ----------------------→ Propagates at ~3×10⁸ m/s</span>
              <span>(−) Low Potential</span>
            </div>

            {/* Drifting electron dots */}
            <div className="relative h-12 w-full flex items-center">
              {Array.from({ length: 18 }).map((_, i) => (
                <div
                  key={i}
                  className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] flex items-center justify-center text-[8px] text-slate-950 font-bold absolute"
                  style={{
                    left: `${(i * 5.5 + (Date.now() / 60) * driftVelocityMmPerSec) % 100}%`,
                    top: `${10 + (i % 3) * 10}px`,
                  }}
                >
                  −
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>Net Drift Velocity (v_d): <strong className="text-cyan-400 font-mono">{driftVelocityMmPerSec} mm/s</strong></span>
              <span>Signal Arrival Time: <strong className="text-emerald-400 font-mono">&lt; 0.00000001 s</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
