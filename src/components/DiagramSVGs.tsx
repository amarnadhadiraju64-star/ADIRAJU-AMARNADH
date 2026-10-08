import React, { useState } from 'react';
import { Zap, Play, Pause, RotateCcw, Sparkles, Flame, Shield, ArrowRight } from 'lucide-react';

interface DiagramProps {
  type: string;
  className?: string;
}

export const DiagramSVGs: React.FC<DiagramProps> = ({ type, className = 'w-full h-auto min-h-[170px]' }) => {
  // State for interactive diagrams
  // 1. Charge: toggle between like charges repel (+/+) vs opposite charges attract (+/-) vs (-/-)
  const [chargeMode, setChargeMode] = useState<'like_pos' | 'opposite' | 'like_neg'>('like_pos');

  // 2. Current: toggle electron speed (normal / slow / pause)
  const [isCurrentFlowing, setIsCurrentFlowing] = useState<boolean>(true);

  // 3. Resistance: toggle collision temperature (normal / high heat)
  const [heatLevel, setHeatLevel] = useState<'normal' | 'high'>('normal');

  // 4. Resistivity: toggle between Copper (Conductor) vs Nichrome (Alloy)
  const [resMaterial, setResMaterial] = useState<'copper' | 'nichrome'>('copper');

  // 5. Power: toggle circuit power ON / OFF
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);

  switch (type) {
    // -------------------------------------------------------------
    // 1. LIKE CHARGE & ELECTRIC CHARGE ANIMATED DIAGRAM
    // -------------------------------------------------------------
    case 'charge':
      return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center">
          {/* Interactive Mode Toggle Bar */}
          <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between gap-1.5 text-[11px]">
            <span className="font-bold text-slate-300 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Charge Interaction:</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setChargeMode('like_pos')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  chargeMode === 'like_pos'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                + & + (Like: Repel)
              </button>
              <button
                type="button"
                onClick={() => setChargeMode('opposite')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  chargeMode === 'opposite'
                    ? 'bg-blue-500 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                + & − (Opposite: Attract)
              </button>
              <button
                type="button"
                onClick={() => setChargeMode('like_neg')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  chargeMode === 'like_neg'
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                − & − (Like: Repel)
              </button>
            </div>
          </div>

          <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#ef4444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glowCyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="340" height="170" fill="#090d16" />

            {/* LIKE CHARGES: + and + REPEL */}
            {chargeMode === 'like_pos' && (
              <g>
                {/* Title */}
                <text x="170" y="20" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ⚡ LIKE CHARGES REPEL: Positive (+q) & Positive (+q)
                </text>

                {/* Curved Diverging Electric Field Lines curving AWAY from center */}
                <path d="M 85 85 Q 125 50 120 20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M 85 85 Q 125 120 120 150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M 255 85 Q 215 50 220 20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <path d="M 255 85 Q 215 120 220 150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="12" to="0" dur="1s" repeatCount="indefinite" />
                </path>

                {/* Neutral Point (Null Point where E = 0) in center */}
                <circle cx="170" cy="85" r="4" fill="#64748b" />
                <text x="170" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">Null Point (E = 0)</text>

                {/* Repulsive Force Arrows pushing apart */}
                {/* Left Repulsion Arrow */}
                <g>
                  <line x1="60" y1="85" x2="25" y2="85" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <polygon points="20,85 30,81 30,89" fill="#ef4444">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -4,0; 0,0" dur="1s" repeatCount="indefinite" />
                  </polygon>
                  <text x="40" y="76" fill="#ef4444" fontSize="10" fontWeight="bold">← F_repel</text>
                </g>

                {/* Right Repulsion Arrow */}
                <g>
                  <line x1="280" y1="85" x2="315" y2="85" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
                  <polygon points="320,85 310,81 310,89" fill="#ef4444">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 4,0; 0,0" dur="1s" repeatCount="indefinite" />
                  </polygon>
                  <text x="275" y="76" fill="#ef4444" fontSize="10" fontWeight="bold">F_repel →</text>
                </g>

                {/* Charge 1: Left Positive */}
                <circle cx="85" cy="85" r="32" fill="url(#glowRed)">
                  <animate attributeName="r" values="30;36;30" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="85" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                <text x="85" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">+</text>
                <text x="85" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">+q (Proton)</text>

                {/* Charge 2: Right Positive */}
                <circle cx="255" cy="85" r="32" fill="url(#glowRed)">
                  <animate attributeName="r" values="30;36;30" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="255" cy="85" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                <text x="255" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">+</text>
                <text x="255" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">+q (Proton)</text>

                {/* Law text banner */}
                <text x="170" y="156" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Fundamental Law: Like charges repel each other with electrostatic force F ∝ (q₁·q₂) / r²
                </text>
              </g>
            )}

            {/* OPPOSITE CHARGES: + and - ATTRACT */}
            {chargeMode === 'opposite' && (
              <g>
                <text x="170" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  🧲 OPPOSITE CHARGES ATTRACT: Positive (+q) & Negative (−e)
                </text>

                {/* Continuous Electric Field lines streaming from + to - */}
                <line x1="110" y1="85" x2="230" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
                <path d="M 85 63 Q 170 30 255 63" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.8s" repeatCount="indefinite" />
                </path>
                <path d="M 85 107 Q 170 140 255 107" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 3" fill="none">
                  <animate attributeName="stroke-dashoffset" from="14" to="0" dur="0.8s" repeatCount="indefinite" />
                </path>

                {/* Animated traveling field packet dots moving + -> - */}
                <circle cx="140" cy="85" r="3" fill="#fde047">
                  <animate attributeName="cx" from="108" to="232" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* Attractive Force Arrows pulling inward */}
                <g>
                  <line x1="108" y1="85" x2="135" y2="85" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="140,85 130,81 130,89" fill="#10b981">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 3,0; 0,0" dur="0.9s" repeatCount="indefinite" />
                  </polygon>
                  <text x="122" y="76" fill="#10b981" fontSize="9" fontWeight="bold">F_attract →</text>
                </g>
                <g>
                  <line x1="232" y1="85" x2="205" y2="85" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="200,85 210,81 210,89" fill="#10b981">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -3,0; 0,0" dur="0.9s" repeatCount="indefinite" />
                  </polygon>
                  <text x="218" y="76" fill="#10b981" fontSize="9" fontWeight="bold">← F_attract</text>
                </g>

                {/* Positive Charge */}
                <circle cx="85" cy="85" r="32" fill="url(#glowRed)" />
                <circle cx="85" cy="85" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
                <text x="85" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">+</text>
                <text x="85" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">+q (Proton)</text>

                {/* Negative Charge */}
                <circle cx="255" cy="85" r="32" fill="url(#glowBlue)" />
                <circle cx="255" cy="85" r="22" fill="#2563eb" stroke="#93c5fd" strokeWidth="2" />
                <text x="255" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">−</text>
                <text x="255" y="125" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">−e (Electron)</text>

                <text x="170" y="156" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Opposite charges attract with electrostatic force: e = 1.6 × 10⁻¹⁹ Coulomb
                </text>
              </g>
            )}

            {/* LIKE CHARGES: - and - REPEL */}
            {chargeMode === 'like_neg' && (
              <g>
                <text x="170" y="20" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle">
                  ⚡ LIKE CHARGES REPEL: Electron (−e) & Electron (−e)
                </text>

                <circle cx="170" cy="85" r="4" fill="#64748b" />
                <text x="170" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle">Null Point</text>

                {/* Left Repulsion Arrow */}
                <g>
                  <line x1="60" y1="85" x2="25" y2="85" stroke="#06b6d4" strokeWidth="2.5" />
                  <polygon points="20,85 30,81 30,89" fill="#06b6d4">
                    <animateTransform attributeName="transform" type="translate" values="0,0; -4,0; 0,0" dur="1s" repeatCount="indefinite" />
                  </polygon>
                  <text x="40" y="76" fill="#06b6d4" fontSize="10" fontWeight="bold">← F_repel</text>
                </g>

                {/* Right Repulsion Arrow */}
                <g>
                  <line x1="280" y1="85" x2="315" y2="85" stroke="#06b6d4" strokeWidth="2.5" />
                  <polygon points="320,85 310,81 310,89" fill="#06b6d4">
                    <animateTransform attributeName="transform" type="translate" values="0,0; 4,0; 0,0" dur="1s" repeatCount="indefinite" />
                  </polygon>
                  <text x="275" y="76" fill="#06b6d4" fontSize="10" fontWeight="bold">F_repel →</text>
                </g>

                {/* Charge 1: Negative */}
                <circle cx="85" cy="85" r="32" fill="url(#glowCyan)">
                  <animate attributeName="r" values="30;36;30" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="85" r="22" fill="#0891b2" stroke="#67e8f9" strokeWidth="2" />
                <text x="85" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">−</text>
                <text x="85" y="125" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">−e (Electron)</text>

                {/* Charge 2: Negative */}
                <circle cx="255" cy="85" r="32" fill="url(#glowCyan)">
                  <animate attributeName="r" values="30;36;30" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="255" cy="85" r="22" fill="#0891b2" stroke="#67e8f9" strokeWidth="2" />
                <text x="255" y="93" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">−</text>
                <text x="255" y="125" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">−e (Electron)</text>

                <text x="170" y="156" fill="#22d3ee" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Negative electrons repel each other strongly in atoms and conductor lattices
                </text>
              </g>
            )}
          </svg>
        </div>
      );

    // -------------------------------------------------------------
    // 2. ELECTRIC CURRENT ANIMATED DIAGRAM (Drifting Electrons)
    // -------------------------------------------------------------
    case 'current':
      return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center">
          <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px]">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              <span>Animated Electron Drift (v_d) & Conventional Current (I)</span>
            </span>
            <button
              type="button"
              onClick={() => setIsCurrentFlowing(!isCurrentFlowing)}
              className="px-2 py-0.5 rounded-md font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer flex items-center gap-1"
            >
              {isCurrentFlowing ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
              <span>{isCurrentFlowing ? 'Pause Drift' : 'Resume Flow'}</span>
            </button>
          </div>

          <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="metalCylinder" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            <rect width="340" height="170" fill="#090d16" />

            {/* High Potential (+) Terminal Plate (Left) */}
            <rect x="30" y="45" width="16" height="70" rx="3" fill="#ef4444" stroke="#fca5a5" strokeWidth="1" />
            <text x="38" y="85" fill="#ffffff" fontSize="16" fontWeight="black" textAnchor="middle">+</text>
            <text x="38" y="130" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">+ High V</text>

            {/* Low Potential (-) Terminal Plate (Right) */}
            <rect x="294" y="45" width="16" height="70" rx="3" fill="#2563eb" stroke="#93c5fd" strokeWidth="1" />
            <text x="302" y="85" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">−</text>
            <text x="302" y="130" fill="#60a5fa" fontSize="9" fontWeight="bold" textAnchor="middle">− Low V</text>

            {/* Cylindrical Conductor Tube */}
            <rect x="46" y="50" width="248" height="60" rx="6" fill="url(#metalCylinder)" stroke="#475569" strokeWidth="1.5" />

            {/* Cross-Section Area A Ellipse at center */}
            <ellipse cx="170" cy="80" rx="14" ry="28" fill="#0284c7" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
            <text x="170" y="40" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">
              Cross-section Area A
            </text>

            {/* Drifting Electrons moving RIGHT to LEFT toward (+) */}
            {isCurrentFlowing && (
              <>
                {[
                  { cy: 65, delay: '0s', dur: '2.4s' },
                  { cy: 80, delay: '0.4s', dur: '2.4s' },
                  { cy: 95, delay: '0.8s', dur: '2.4s' },
                  { cy: 62, delay: '1.2s', dur: '2.4s' },
                  { cy: 88, delay: '1.6s', dur: '2.4s' },
                  { cy: 75, delay: '2.0s', dur: '2.4s' },
                ].map((item, idx) => (
                  <g key={idx}>
                    <circle cx="280" cy={item.cy} r="6.5" fill="#3b82f6" stroke="#93c5fd" strokeWidth="1.5">
                      <animate attributeName="cx" from="284" to="54" dur={item.dur} begin={item.delay} repeatCount="indefinite" />
                    </circle>
                    <text x="280" y={item.cy + 3} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                      <animate attributeName="x" from="284" to="54" dur={item.dur} begin={item.delay} repeatCount="indefinite" />
                      −
                    </text>
                  </g>
                ))}
              </>
            )}

            {/* Conventional Current Arrow (Left to Right) */}
            <g>
              <line x1="90" y1="22" x2="250" y2="22" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="255,22 245,18 245,26" fill="#f59e0b">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
              </polygon>
              <text x="170" y="16" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">
                Conventional Current Direction (I) →
              </text>
            </g>

            {/* Electron Drift Arrow (Right to Left) */}
            <g>
              <line x1="250" y1="138" x2="90" y2="138" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
              <polygon points="85,138 95,134 95,142" fill="#60a5fa" />
              <text x="170" y="134" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">
                ← Actual Electron Drift (e⁻) at v_d ≈ 10⁻⁴ m/s
              </text>
            </g>

            {/* Formula in center bottom */}
            <text x="170" y="160" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
              I = Q / t  (1 Ampere = 1 Coulomb/second = 6.25 × 10¹⁸ e⁻/sec)
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------
    // 3. ELECTRIC RESISTANCE ANIMATED DIAGRAM (Lattice Collisions)
    // -------------------------------------------------------------
    case 'resistance':
      return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center">
          <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px]">
            <span className="font-bold text-rose-400 flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>Microscopic Origin: Thermal Lattice Collisions</span>
            </span>
            <button
              type="button"
              onClick={() => setHeatLevel(heatLevel === 'normal' ? 'high' : 'normal')}
              className="px-2 py-0.5 rounded-md font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer flex items-center gap-1"
            >
              <span>Vibration: {heatLevel === 'normal' ? 'Normal Temp' : '🔥 High Temp (R increases)'}</span>
            </button>
          </div>

          <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="340" height="170" fill="#090d16" />

            {/* Conductor Walls */}
            <line x1="20" y1="40" x2="320" y2="40" stroke="#64748b" strokeWidth="3" />
            <line x1="20" y1="125" x2="320" y2="125" stroke="#64748b" strokeWidth="3" />

            {/* Positive Metallic Lattice Ions vibrating in place */}
            {[
              { x: 55, y: 62 },
              { x: 115, y: 62 },
              { x: 175, y: 62 },
              { x: 235, y: 62 },
              { x: 295, y: 62 },
              { x: 85, y: 102 },
              { x: 145, y: 102 },
              { x: 205, y: 102 },
              { x: 265, y: 102 },
            ].map((ion, idx) => (
              <g key={idx}>
                {/* Vibrating wrapper */}
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={heatLevel === 'normal' ? '0,0; 1.2,-1.2; -1.2,1.2; 0,0' : '0,0; 2.5,-2.5; -2.5,2.5; 0,0'}
                    dur={heatLevel === 'normal' ? '0.25s' : '0.12s'}
                    repeatCount="indefinite"
                  />
                  <circle cx={ion.x} cy={ion.y} r="12" fill="#dc2626" fillOpacity="0.35" stroke="#ef4444" strokeWidth="1.5" />
                  <circle cx={ion.x} cy={ion.y} r="7" fill="#ef4444" />
                  <text x={ion.x} y={ion.y + 3.5} fill="#ffffff" fontSize="9" fontWeight="black" textAnchor="middle">+</text>
                </g>
              </g>
            ))}

            {/* Drifting Electron Zigzag Collision Path */}
            <path
              d="M 30 85 L 55 68 L 85 96 L 145 98 L 175 66 L 205 98 L 265 98 L 295 68 L 320 85"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="4 3"
              fill="none"
            >
              <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.8s" repeatCount="indefinite" />
            </path>

            {/* Animated Collision Sparks at impact nodes */}
            {[
              { cx: 55, cy: 68 },
              { cx: 145, cy: 98 },
              { cx: 205, cy: 98 },
              { cx: 295, cy: 68 },
            ].map((spark, sIdx) => (
              <circle key={sIdx} cx={spark.cx} cy={spark.cy} r="4" fill="#fbbf24">
                <animate attributeName="r" values="3;9;3" dur="0.8s" begin={`${sIdx * 0.25}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.2;1" dur="0.8s" begin={`${sIdx * 0.25}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Moving Electron dot */}
            <circle cx="175" cy="66" r="5" fill="#38bdf8" stroke="#fff" strokeWidth="1">
              <animate attributeName="cx" values="30;55;85;145;175;205;265;295;320" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="85;68;96;98;66;98;98;68;85" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Explanatory text */}
            <text x="170" y="24" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
              Lattice Ion Collisions Cause Resistance: R = V / I
            </text>
            <text x="170" y="145" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
              Kinetic Energy is lost in collisions and dissipated as heat (H = I²Rt)
            </text>
            <text x="170" y="160" fill="#94a3b8" fontSize="9" textAnchor="middle">
              Higher Temperature → Ions Vibrate Faster → More Collisions → Resistance R Increases
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------
    // 4. RESISTIVITY (SPECIFIC RESISTANCE) ANIMATED DIAGRAM
    // -------------------------------------------------------------
    case 'resistivity':
      return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center">
          <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex flex-wrap items-center justify-between text-[11px] gap-1">
            <span className="font-bold text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Specific Resistance (ρ): Material Comparison</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setResMaterial('copper')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  resMaterial === 'copper'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Copper (Low ρ: 1.62×10⁻⁸ Ω·m)
              </button>
              <button
                type="button"
                onClick={() => setResMaterial('nichrome')}
                className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
                  resMaterial === 'nichrome'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                Nichrome (High ρ: 1.1×10⁻⁶ Ω·m)
              </button>
            </div>
          </div>

          <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
            <rect width="340" height="170" fill="#090d16" />

            {/* 3D Conductor Cylinder representing length l and Area A */}
            <g transform="translate(10, 0)">
              {/* Cylinder Body */}
              <rect
                x="80"
                y="55"
                width="160"
                height="50"
                fill={resMaterial === 'copper' ? '#b45309' : '#475569'}
                fillOpacity="0.4"
                stroke={resMaterial === 'copper' ? '#f59e0b' : '#94a3b8'}
                strokeWidth="2"
              />
              {/* Back Ellipse */}
              <ellipse
                cx="80"
                cy="80"
                rx="14"
                ry="25"
                fill={resMaterial === 'copper' ? '#92400e' : '#334155'}
                stroke={resMaterial === 'copper' ? '#f59e0b' : '#94a3b8'}
                strokeWidth="2"
              />
              {/* Front Ellipse (Cross Section Area A) */}
              <ellipse
                cx="240"
                cy="80"
                rx="14"
                ry="25"
                fill={resMaterial === 'copper' ? '#d97706' : '#64748b'}
                stroke="#38bdf8"
                strokeWidth="2.5"
              >
                <animate attributeName="stroke-width" values="2;3.5;2" dur="1.5s" repeatCount="indefinite" />
              </ellipse>

              {/* Area A label */}
              <text x="260" y="84" fill="#38bdf8" fontSize="11" fontWeight="bold">
                Area A
              </text>

              {/* Length Dimension Indicator Bar */}
              <line x1="80" y1="122" x2="240" y2="122" stroke="#f59e0b" strokeWidth="2" />
              <line x1="80" y1="117" x2="80" y2="127" stroke="#f59e0b" strokeWidth="2" />
              <line x1="240" y1="117" x2="240" y2="127" stroke="#f59e0b" strokeWidth="2" />
              <text x="160" y="136" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">
                Length l (m)
              </text>

              {/* Drifting electron stream inside */}
              {[65, 80, 95].map((yVal, i) => (
                <circle key={i} cx="80" cy={yVal} r="3" fill="#38bdf8">
                  <animate
                    attributeName="cx"
                    from="80"
                    to="240"
                    dur={resMaterial === 'copper' ? '1.2s' : '2.6s'}
                    begin={`${i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* In-cylinder description */}
              <text x="160" y="84" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                {resMaterial === 'copper' ? 'Low ρ (Fast Drift)' : 'High ρ (Frequent Collisions)'}
              </text>
            </g>

            {/* Top Formula Banner */}
            <text x="170" y="24" fill="#c084fc" fontSize="12" fontWeight="black" textAnchor="middle">
              Resistivity: ρ = (R × A) / l   (SI Unit: Ω·m)
            </text>

            {/* Bottom Insight */}
            <text x="170" y="158" fill="#94a3b8" fontSize="10" textAnchor="middle">
              {resMaterial === 'copper'
                ? 'Copper: Outstanding conductor for domestic house wiring.'
                : 'Nichrome: High resistivity alloy (~60× copper) for heating appliances.'}
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------
    // 5. ELECTRIC POWER ANIMATED CIRCUIT DIAGRAM (Bulb Glowing)
    // -------------------------------------------------------------
    case 'power':
      return (
        <div className="w-full bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center">
          <div className="w-full bg-slate-900/90 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px]">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Electric Power: P = W/t = V × I = V²/R = I²R</span>
            </span>
            <button
              type="button"
              onClick={() => setIsPowerOn(!isPowerOn)}
              className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isPowerOn ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}
            >
              <span>{isPowerOn ? '⚡ Power ON (Active)' : '🔌 Power OFF'}</span>
            </button>
          </div>

          <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="bulbAura" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>

            <rect width="340" height="170" fill="#090d16" />

            {/* Circuit Outline */}
            {/* Battery to switch (bottom) */}
            <path d="M 60 110 L 170 110 L 280 110 L 280 75" stroke={isPowerOn ? '#0ea5e9' : '#475569'} strokeWidth="2.5" fill="none" />
            <path d="M 60 65 L 60 110" stroke={isPowerOn ? '#0ea5e9' : '#475569'} strokeWidth="2.5" fill="none" />
            {/* Top wire from battery to bulb */}
            <path d="M 60 65 L 140 65" stroke={isPowerOn ? '#ef4444' : '#475569'} strokeWidth="2.5" fill="none" />
            {/* From bulb to right rail */}
            <path d="M 200 65 L 280 65 L 280 75" stroke={isPowerOn ? '#0ea5e9' : '#475569'} strokeWidth="2.5" fill="none" />

            {/* BATTERY (Left) */}
            <g transform="translate(35, 75)">
              <rect x="0" y="0" width="30" height="25" rx="3" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="8" y1="5" x2="8" y2="20" stroke="#ef4444" strokeWidth="3" />
              <line x1="20" y1="8" x2="20" y2="17" stroke="#3b82f6" strokeWidth="2" />
              <text x="15" y="-4" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">12V DC</text>
            </g>

            {/* SWITCH (Bottom wire) */}
            <g transform="translate(170, 110)">
              <circle cx="-15" cy="0" r="3" fill="#f59e0b" />
              <circle cx="15" cy="0" r="3" fill="#f59e0b" />
              {isPowerOn ? (
                <line x1="-15" y1="0" x2="15" y2="0" stroke="#10b981" strokeWidth="3" />
              ) : (
                <line x1="-15" y1="0" x2="12" y2="-12" stroke="#ef4444" strokeWidth="3" />
              )}
              <text x="0" y="16" fill="#94a3b8" fontSize="8" textAnchor="middle">
                Key ({isPowerOn ? 'Closed' : 'Open'})
              </text>
            </g>

            {/* BULB / POWER LOAD (Center Top) */}
            <g transform="translate(170, 65)">
              {/* Radiant Light Aura when ON */}
              {isPowerOn && (
                <>
                  <circle cx="0" cy="0" r="32" fill="url(#bulbAura)">
                    <animate attributeName="r" values="28;42;28" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                  {/* Radiant Light Rays */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => {
                    const rad = (ang * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={Math.cos(rad) * 26}
                        y1={Math.sin(rad) * 26}
                        x2={Math.cos(rad) * 36}
                        y2={Math.sin(rad) * 36}
                        stroke="#fef08a"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
                      </line>
                    );
                  })}
                </>
              )}

              {/* Bulb Glass Globe */}
              <circle
                cx="0"
                cy="0"
                r="22"
                fill={isPowerOn ? '#fef08a' : '#1e293b'}
                fillOpacity={isPowerOn ? '0.35' : '0.8'}
                stroke={isPowerOn ? '#f59e0b' : '#64748b'}
                strokeWidth="2"
              />

              {/* Filament */}
              <path
                d="M -7 10 L -4 -4 L 0 4 L 4 -4 L 7 10"
                stroke={isPowerOn ? '#ffffff' : '#64748b'}
                strokeWidth="2.5"
                fill="none"
              />

              {/* Base */}
              <rect x="-6" y="20" width="12" height="6" fill="#64748b" rx="1" />
              <text x="0" y="-28" fill={isPowerOn ? '#fef08a' : '#64748b'} fontSize="10" fontWeight="bold" textAnchor="middle">
                {isPowerOn ? 'Glowing Bulb (100 W)' : 'Bulb OFF (0 W)'}
              </text>
            </g>

            {/* Animated Flowing Charges along Wires when Power is ON */}
            {isPowerOn && (
              <>
                <circle cx="100" cy="65" r="3" fill="#fde047">
                  <animate attributeName="cx" from="60" to="140" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="240" cy="65" r="3" fill="#fde047">
                  <animate attributeName="cx" from="200" to="280" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="280" cy="90" r="3" fill="#fde047">
                  <animate attributeName="cy" from="65" to="110" dur="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="220" cy="110" r="3" fill="#fde047">
                  <animate attributeName="cx" from="280" to="60" dur="1.2s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Bottom Formula & Unit Box */}
            <text x="170" y="148" fill="#f59e0b" fontSize="11" fontWeight="black" textAnchor="middle">
              P = W / t = V × I = V² / R = I² × R
            </text>
            <text x="170" y="162" fill="#38bdf8" fontSize="10" textAnchor="middle">
              SI Unit: Watt (W) = 1 Joule per second (1 J/s) = 1 Volt × 1 Ampere
            </text>
          </svg>
        </div>
      );

    // -------------------------------------------------------------
    // OTHER SUPPORTING DIAGRAMS WITH ENHANCED ANIMATIONS
    // -------------------------------------------------------------
    case 'voltage':
      return (
        <svg viewBox="0 0 340 170" className={className} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="voltFieldGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#dbeafe" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </radialGradient>
          </defs>
          <rect width="340" height="170" fill="#090d16" />

          {/* Electric Field Ellipse Boundary */}
          <ellipse cx="170" cy="85" rx="155" ry="72" fill="url(#voltFieldGlow)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="32" y="148" fill="#94a3b8" fontSize="10" fontWeight="bold">Electric field</text>

          {/* Point A on the left */}
          <circle cx="90" cy="85" r="5" fill="#ef4444" />
          <circle cx="90" cy="85" r="10" fill="#ef4444" fillOpacity="0.2">
            <animate attributeName="r" values="8;13;8" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <text x="75" y="89" fill="#ffffff" fontSize="13" fontWeight="bold">A</text>
          <text x="90" y="106" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">Point A</text>

          {/* Moving +q charge pushed towards Point A */}
          <g>
            <circle cx="230" cy="85" r="14" fill="#fee2e2" stroke="#dc2626" strokeWidth="2">
              <animate attributeName="cx" values="250;110;250" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="230" cy="85" r="10" fill="#ef4444">
              <animate attributeName="cx" values="250;110;250" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="230" y="90" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">
              <animate attributeName="x" values="250;110;250" dur="3s" repeatCount="indefinite" />
              +
            </text>
            <text x="248" y="92" fill="#ef4444" fontSize="13" fontStyle="italic" fontWeight="bold">
              <animate attributeName="x" values="268;128;268" dur="3s" repeatCount="indefinite" />
              q
            </text>

            {/* Leftward Force Arrow */}
            <line x1="210" y1="85" x2="160" y2="85" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round">
              <animate attributeName="x1" values="230;90;230" dur="3s" repeatCount="indefinite" />
              <animate attributeName="x2" values="180;40;180" dur="3s" repeatCount="indefinite" />
            </line>
            <polygon points="156,85 166,81 166,89" fill="#2563eb">
              <animateTransform attributeName="transform" type="translate" values="0,0; -70,0; 0,0" dur="3s" repeatCount="indefinite" />
            </polygon>
          </g>

          {/* Formula Badges */}
          <rect x="180" y="24" width="120" height="26" rx="4" fill="#1e293b" stroke="#64748b" />
          <text x="240" y="41" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">W = F × s</text>

          <text x="170" y="16" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            పొటెన్షియల్ డిఫరెన్స్ (Potential Difference)
          </text>
          <text x="170" y="162" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">
            V = W / q (1 Volt = 1 Joule / 1 Coulomb in moving +q to Point A)
          </text>
        </svg>
      );

    case 'kwh':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <rect x="60" y="30" width="200" height="95" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <rect x="85" y="45" width="150" height="35" rx="4" fill="#020617" stroke="#475569" />
          <text x="160" y="69" fill="#22c55e" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0 0 2 4 8 . 5</text>
          <text x="215" y="68" fill="#94a3b8" fontSize="9">kWh</text>
          <text x="160" y="105" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">APCPDCL / Domestic Energy Meter</text>
          <text x="160" y="145" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">1 kWh = 1 Unit = 3.6 × 10⁶ Joules (3.6 × 10⁶ W·s)</text>
        </svg>
      );

    case 'energy':
      return (
        <svg viewBox="0 0 340 175" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="340" height="175" rx="8" fill="#090d16" />
          
          {/* Header Bar */}
          <rect x="10" y="10" width="320" height="28" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="20" y="28" fill="#f59e0b" fontSize="10.5" fontWeight="bold">⚡ Electrical Energy: W = E = Power × Time = P · t</text>
          
          {/* Three Unit Systems Grid */}
          {/* Box 1: SI & MKS */}
          <g transform="translate(15, 46)">
            <rect width="98" height="64" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="49" y="18" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">SI & MKS UNIT</text>
            <text x="49" y="38" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">JOULE (J)</text>
            <text x="49" y="54" fill="#94a3b8" fontSize="8" textAnchor="middle">1 J = 1 W·s = 1 N·m</text>
          </g>

          {/* Box 2: CGS */}
          <g transform="translate(121, 46)">
            <rect width="98" height="64" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" />
            <text x="49" y="18" fill="#a5b4fc" fontSize="10" fontWeight="bold" textAnchor="middle">CGS UNIT</text>
            <text x="49" y="38" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">ERG</text>
            <text x="49" y="54" fill="#94a3b8" fontSize="8" textAnchor="middle">1 J = 10⁷ ergs</text>
          </g>

          {/* Box 3: Commercial */}
          <g transform="translate(227, 46)">
            <rect width="98" height="64" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="49" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">COMMERCIAL</text>
            <text x="49" y="38" fill="#ffffff" fontSize="14" fontWeight="black" textAnchor="middle">1 kWh (Unit)</text>
            <text x="49" y="54" fill="#94a3b8" fontSize="8" textAnchor="middle">1000 W × 1 Hour</text>
          </g>

          {/* Golden Conversion Banner at Bottom */}
          <g transform="translate(15, 118)">
            <rect width="310" height="46" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
            <text x="155" y="18" fill="#c7d2fe" fontSize="10" fontWeight="semibold" textAnchor="middle">
              1 kWh = 1 kW × 1 h = 1000 W × 3600 s = 3,600,000 W·s
            </text>
            <text x="155" y="36" fill="#fde047" fontSize="12" fontWeight="black" textAnchor="middle">
              ★ 1 kWh = 3.6 × 10⁶ Joules (J) = 3.6 × 10⁶ Watt·seconds (W·s)
            </text>
          </g>
        </svg>
      );

    case 'ohms_law':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <rect x="40" y="35" width="130" height="90" fill="none" stroke="#64748b" strokeWidth="2" rx="4" />
          <line x1="30" y1="75" x2="50" y2="75" stroke="#ef4444" strokeWidth="4" />
          <line x1="35" y1="85" x2="45" y2="85" stroke="#3b82f6" strokeWidth="2.5" />
          <path d="M85 35 L90 28 L97 42 L105 28 L113 42 L120 35" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <circle cx="105" cy="18" r="11" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="105" y="22" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">V</text>
          <circle cx="170" cy="80" r="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="170" y="84" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
          <line x1="200" y1="125" x2="295" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="200" y1="125" x2="200" y2="40" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="200" y1="125" x2="285" y2="50" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="295" y="138" fill="#94a3b8" fontSize="9">I (Current)</text>
          <text x="195" y="35" fill="#94a3b8" fontSize="9">V (Voltage)</text>
          <text x="250" y="70" fill="#38bdf8" fontSize="9" fontWeight="bold">Slope = R</text>
          <text x="160" y="152" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">V ∝ I  ⇒  Straight line passing through (0,0)</text>
        </svg>
      );

    case 'joule':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <path d="M50 80 Q 75 40 100 80 Q 125 120 150 80 Q 175 40 200 80 Q 225 120 250 80 L 270 80" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" fill="none">
            <animate attributeName="stroke" values="#ef4444;#f59e0b;#ef4444" dur="1.2s" repeatCount="indefinite" />
          </path>
          <path d="M100 60 Q 95 40 105 25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none">
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M150 60 Q 145 40 155 25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none">
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <path d="M200 60 Q 195 40 205 25" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" fill="none">
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <text x="160" y="20" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Joule Heat (H) = I² · R · t = I²Rt</text>
          <text x="160" y="125" fill="#ef4444" fontSize="11" textAnchor="middle" fontWeight="bold">High Resistance Nichrome Coil Glazes Red Hot (Heat H ∝ I²)</text>
          <text x="160" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">SI Unit: Joule (J) | H = I² · R · t = V · I · t = P · t</text>
        </svg>
      );

    case 'series':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <path d="M30 110 L30 60 L60 60" stroke="#64748b" strokeWidth="2" fill="none" />
          <path d="M60 60 L65 52 L73 68 L81 52 L89 68 L95 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="95" y1="60" x2="130" y2="60" stroke="#64748b" strokeWidth="2" />
          <path d="M130 60 L135 52 L143 68 L151 52 L159 68 L165 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="165" y1="60" x2="200" y2="60" stroke="#64748b" strokeWidth="2" />
          <path d="M200 60 L205 52 L213 68 L221 52 L229 68 L235 60" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <path d="M235 60 L280 60 L280 110 L30 110" stroke="#64748b" strokeWidth="2" fill="none" />
          <line x1="145" y1="102" x2="145" y2="118" stroke="#ef4444" strokeWidth="3.5" />
          <line x1="155" y1="106" x2="155" y2="114" stroke="#3b82f6" strokeWidth="2" />
          {/* Animated current charges flowing in single loop */}
          <circle cx="45" cy="60" r="3" fill="#fde047">
            <animate attributeName="cx" from="30" to="280" dur="2s" repeatCount="indefinite" />
          </circle>
          <text x="77" y="42" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">R₁ (V₁)</text>
          <text x="147" y="42" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">R₂ (V₂)</text>
          <text x="217" y="42" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">R₃ (V₃)</text>
          <text x="160" y="85" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Single Current Path (I)  |  V_eq = V₁ + V₂ + V₃</text>
          <text x="160" y="145" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">Rₛ = R₁ + R₂ + R₃ (Maximum Resistance)</text>
        </svg>
      );

    case 'parallel':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="30" y1="80" x2="80" y2="80" stroke="#64748b" strokeWidth="2" />
          <line x1="80" y1="35" x2="80" y2="125" stroke="#64748b" strokeWidth="2.5" />
          <line x1="80" y1="35" x2="115" y2="35" stroke="#64748b" strokeWidth="2" />
          <path d="M115 35 L120 28 L128 42 L136 28 L144 42 L150 35" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="150" y1="35" x2="190" y2="35" stroke="#64748b" strokeWidth="2" />
          <line x1="80" y1="80" x2="115" y2="80" stroke="#64748b" strokeWidth="2" />
          <path d="M115 80 L120 73 L128 87 L136 73 L144 87 L150 80" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="150" y1="80" x2="190" y2="80" stroke="#64748b" strokeWidth="2" />
          <line x1="80" y1="125" x2="115" y2="125" stroke="#64748b" strokeWidth="2" />
          <path d="M115 125 L120 118 L128 132 L136 118 L144 132 L150 125" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <line x1="150" y1="125" x2="190" y2="125" stroke="#64748b" strokeWidth="2" />
          <line x1="190" y1="35" x2="190" y2="125" stroke="#64748b" strokeWidth="2.5" />
          <line x1="190" y1="80" x2="240" y2="80" stroke="#64748b" strokeWidth="2" />
          <text x="96" y="28" fill="#f59e0b" fontSize="9" fontWeight="bold">I₁ →</text>
          <text x="96" y="73" fill="#f59e0b" fontSize="9" fontWeight="bold">I₂ →</text>
          <text x="96" y="118" fill="#f59e0b" fontSize="9" fontWeight="bold">I₃ →</text>
          <text x="275" y="60" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">Total Current:</text>
          <text x="275" y="78" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">I = I₁ + I₂ + I₃</text>
          <text x="275" y="105" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃</text>
          <text x="275" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">Same Voltage (220V)</text>
        </svg>
      );

    case 'shock':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="30" y1="35" x2="140" y2="35" stroke="#ef4444" strokeWidth="3" />
          <text x="65" y="25" fill="#ef4444" fontSize="10" fontWeight="bold">Live Wire (220 V)</text>
          <circle cx="150" cy="50" r="10" fill="#fca5a5" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="150" y1="60" x2="150" y2="105" stroke="#fca5a5" strokeWidth="2.5" />
          <line x1="150" y1="70" x2="140" y2="37" stroke="#fca5a5" strokeWidth="2.5" />
          <line x1="150" y1="105" x2="135" y2="135" stroke="#fca5a5" strokeWidth="2.5" />
          <line x1="150" y1="105" x2="165" y2="135" stroke="#fca5a5" strokeWidth="2.5" />
          <path d="M142 50 L148 85 L142 120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" fill="none" />
          <line x1="120" y1="135" x2="180" y2="135" stroke="#22c55e" strokeWidth="2" />
          <line x1="130" y1="140" x2="170" y2="140" stroke="#22c55e" strokeWidth="1.5" />
          <line x1="140" y1="145" x2="160" y2="145" stroke="#22c55e" strokeWidth="1" />
          <rect x="200" y="25" width="105" height="115" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="252" y="44" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Safety Shield</text>
          <text x="252" y="65" fill="#e2e8f0" fontSize="9" textAnchor="middle">✓ Earth Wire connected</text>
          <text x="252" y="85" fill="#e2e8f0" fontSize="9" textAnchor="middle">✓ Rubber Footwear</text>
          <text x="252" y="105" fill="#e2e8f0" fontSize="9" textAnchor="middle">✓ Proper Insulation</text>
          <text x="252" y="125" fill="#e2e8f0" fontSize="9" textAnchor="middle">✓ MCB / ELCB Trip</text>
        </svg>
      );

    case 'short_circuit':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="30" y1="40" x2="280" y2="40" stroke="#ef4444" strokeWidth="2.5" />
          <text x="50" y="32" fill="#ef4444" fontSize="10" fontWeight="bold">Live Wire (L)</text>
          <line x1="30" y1="120" x2="280" y2="120" stroke="#3b82f6" strokeWidth="2.5" />
          <text x="55" y="135" fill="#60a5fa" fontSize="10" fontWeight="bold">Neutral Wire (N)</text>
          <circle cx="250" cy="80" r="16" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="250" y="84" fill="#f59e0b" fontSize="9" textAnchor="middle">Load</text>
          <line x1="250" y1="40" x2="250" y2="64" stroke="#64748b" strokeWidth="2" />
          <line x1="250" y1="96" x2="250" y2="120" stroke="#64748b" strokeWidth="2" />
          <line x1="140" y1="40" x2="140" y2="120" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="4 2" />
          <polygon points="140,75 145,68 152,72 144,79 150,86 138,82 133,88 136,78 128,73 137,70" fill="#f59e0b">
            <animate attributeName="fill" values="#f59e0b;#ef4444;#f59e0b" dur="0.3s" repeatCount="indefinite" />
          </polygon>
          <text x="140" y="105" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">R ≈ 0 Ω</text>
          <rect x="70" y="33" width="28" height="14" rx="3" fill="#020617" stroke="#f8fafc" strokeWidth="1" />
          <line x1="72" y1="40" x2="96" y2="40" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 2" />
          <text x="84" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle">Fuse (Melts!)</text>
          <text x="160" y="152" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">R → 0  ⇒  I Surge → Massive Heating (H=I²Rt) → Fire Risk</text>
        </svg>
      );

    case 'ohmic':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="60" y1="130" x2="270" y2="130" stroke="#94a3b8" strokeWidth="2" />
          <line x1="60" y1="130" x2="60" y2="25" stroke="#94a3b8" strokeWidth="2" />
          <text x="270" y="145" fill="#94a3b8" fontSize="10">I (Current, A)</text>
          <text x="50" y="22" fill="#94a3b8" fontSize="10">V (V)</text>
          <line x1="60" y1="130" x2="240" y2="35" stroke="#10b981" strokeWidth="3" />
          <circle cx="60" cy="130" r="4" fill="#10b981" />
          <circle cx="120" cy="98" r="4" fill="#10b981" />
          <circle cx="180" cy="67" r="4" fill="#10b981" />
          <circle cx="240" cy="35" r="4" fill="#10b981" />
          <text x="165" y="70" fill="#34d399" fontSize="11" fontWeight="bold">Linear Slope = R</text>
          <text x="160" y="152" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">Ohmic: Metallic conductors at constant temperature (Copper, Nichrome)</text>
        </svg>
      );

    case 'non_ohmic':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="60" y1="130" x2="270" y2="130" stroke="#94a3b8" strokeWidth="2" />
          <line x1="60" y1="130" x2="60" y2="25" stroke="#94a3b8" strokeWidth="2" />
          <text x="270" y="145" fill="#94a3b8" fontSize="10">I (A)</text>
          <text x="50" y="22" fill="#94a3b8" fontSize="10">V (V)</text>
          <path d="M60 130 Q 150 115 240 45" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
          <text x="245" y="42" fill="#fbbf24" fontSize="10" fontWeight="bold">Bulb filament</text>
          <path d="M60 130 L 140 130 Q 170 125 190 35" stroke="#ec4899" strokeWidth="2.5" fill="none" />
          <text x="195" y="32" fill="#f472b6" fontSize="10" fontWeight="bold">Diode / LED</text>
          <text x="160" y="152" fill="#f8fafc" fontSize="10" textAnchor="middle" fontWeight="bold">Non-Ohmic: V/I varies with temperature and applied voltage</text>
        </svg>
      );

    case 'ampere':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <rect x="20" y="45" width="280" height="55" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Animated charges passing cross section */}
          <ellipse cx="160" cy="72" rx="12" ry="24" fill="#0284c7" fillOpacity="0.3" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <text x="160" y="36" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Cross-section (1 Second)</text>
          <circle cx="100" cy="72" r="6" fill="#3b82f6">
            <animate attributeName="cx" from="50" to="270" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="72" r="6" fill="#3b82f6">
            <animate attributeName="cx" from="50" to="270" dur="1.4s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="72" r="6" fill="#3b82f6">
            <animate attributeName="cx" from="50" to="270" dur="1.4s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <text x="160" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
            1 Ampere = 1 Coulomb / 1 Second
          </text>
          <text x="160" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Flow rate of 6.25 × 10¹⁸ electrons per second across conductor
          </text>
        </svg>
      );

    case 'volt':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          {/* Work done moving +1 C */}
          <circle cx="65" cy="80" r="22" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
          <text x="65" y="86" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
          <circle cx="255" cy="80" r="22" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
          <text x="255" y="86" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
          <path d="M 90 80 Q 160 30 230 80" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 2" fill="none">
            <animate attributeName="stroke-dashoffset" from="12" to="0" dur="0.8s" repeatCount="indefinite" />
          </path>
          <circle cx="160" cy="55" r="8" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5">
            <animate attributeName="cx" values="90;160;230" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="80;55;80" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="160" y="40" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">+1 C Charge</text>
          <text x="160" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
            1 Volt = 1 Joule / 1 Coulomb (1 V = 1 J·C⁻¹)
          </text>
          <text x="160" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Work done in moving 1 Coulomb charge between two test points
          </text>
        </svg>
      );

    case 'ohm':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <line x1="30" y1="80" x2="80" y2="80" stroke="#94a3b8" strokeWidth="2.5" />
          <path d="M80 80 L90 60 L110 100 L130 60 L150 100 L170 60 L190 100 L210 60 L230 100 L240 80" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="240" y1="80" x2="290" y2="80" stroke="#94a3b8" strokeWidth="2.5" />
          <text x="160" y="45" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">1 Ω (Ohm)</text>
          <text x="160" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
            1 Ohm = 1 Volt / 1 Ampere (1 Ω = 1 V / 1 A)
          </text>
          <text x="160" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Opposition offering 1 A current when 1 V potential difference is applied
          </text>
        </svg>
      );

    case 'watt':
      return (
        <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="160" rx="8" fill="#090d16" />
          <circle cx="160" cy="70" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <path d="M150 70 Q155 52 160 52 Q165 52 170 70" fill="none" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="160" y1="35" x2="160" y2="28" stroke="#f59e0b" strokeWidth="2" />
          <line x1="185" y1="45" x2="190" y2="40" stroke="#f59e0b" strokeWidth="2" />
          <line x1="135" y1="45" x2="130" y2="40" stroke="#f59e0b" strokeWidth="2" />
          <text x="160" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
            1 Watt = 1 Joule / 1 Second = 1 Volt × 1 Ampere
          </text>
          <text x="160" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Rate of consuming or expending 1 Joule of energy per second
          </text>
        </svg>
      );

    default:
      return null;
  }
};
