import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  Zap,
  RotateCcw,
  Sliders,
  AlertTriangle,
  Info,
  Plug,
  CheckCircle2,
  Activity,
  Droplets,
  Sun,
  FlaskConical,
  Split,
  Layers
} from 'lucide-react';
import { OhmsLawExperimentView } from './OhmsLawExperimentView';
import { SeriesDerivationWhatsAppView } from './SeriesDerivationWhatsAppView';
import { ParallelDerivationWhatsAppView } from './ParallelDerivationWhatsAppView';

export const OLabsCompartment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shock' | 'overload' | 'ohms_law' | 'series' | 'parallel'>('shock');

  // =========================================================================
  // SIMULATION 1: ELECTRIC SHOCK & EARTHING STATE
  // =========================================================================
  const [hasFault, setHasFault] = useState<boolean>(true); // Insulation failed, live touches body
  const [hasEarthing, setHasEarthing] = useState<boolean>(false); // Earth wire connected
  const [skinCondition, setSkinCondition] = useState<'dry' | 'wet'>('wet'); // Dry (100k ohm) vs Wet (1k ohm)
  const [isPersonTouching, setIsPersonTouching] = useState<boolean>(true); // Person touching metal body

  const humanResistance = skinCondition === 'dry' ? 100000 : 1000; // Ohms
  const earthResistance = 1.0; // Ohm (thick copper earth wire)
  const mainsVoltage = 220; // Volts

  // Current calculation when person touches
  let humanCurrent = 0; // in mA
  let earthCurrent = 0; // in A
  let isFuseBlown = false;

  if (hasFault) {
    if (hasEarthing) {
      // Huge surge to ground through earth wire -> blows fuse immediately!
      earthCurrent = mainsVoltage / earthResistance; // 220 A surge
      isFuseBlown = true;
      humanCurrent = 0; // Cut off instantly by fuse!
    } else if (isPersonTouching) {
      // No earth wire! Current flows through human body to ground
      humanCurrent = Number(((mainsVoltage / humanResistance) * 1000).toFixed(1)); // in mA
      isFuseBlown = false;
    }
  }

  // Shock severity assessment based on AP SSC syllabus
  const getShockSeverity = (currentMa: number) => {
    if (currentMa === 0) {
      return {
        level: 'Safe',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/60 border-emerald-500/50',
        desc: 'Zero current through body. Safe!'
      };
    }
    if (currentMa <= 1) {
      return {
        level: 'Barely Perceptible (1 mA)',
        color: 'text-cyan-300',
        bg: 'bg-cyan-950/60 border-cyan-500/50',
        desc: 'Faint tingling sensation. Safe.'
      };
    }
    if (currentMa <= 5) {
      return {
        level: 'Mild Shock (2 – 5 mA)',
        color: 'text-yellow-400',
        bg: 'bg-yellow-950/60 border-yellow-500/50',
        desc: 'Clear shock felt, muscles shudder but can let go.'
      };
    }
    if (currentMa <= 20) {
      return {
        level: 'Severe Muscle Contraction (10 – 20 mA)',
        color: 'text-amber-500',
        bg: 'bg-amber-950/60 border-amber-500/50',
        desc: 'Muscles contract involuntarily. "Cannot let go" of appliance!'
      };
    }
    if (currentMa <= 50) {
      return {
        level: 'Extreme Pain & Breathing Difficulty (20 – 50 mA)',
        color: 'text-orange-500',
        bg: 'bg-orange-950/60 border-orange-500/50',
        desc: 'Violent muscle contractions, severe breathing paralysis.'
      };
    }
    return {
      level: 'FATAL Ventricular Fibrillation (> 100 mA)',
      color: 'text-rose-500',
      bg: 'bg-rose-950/80 border-rose-500 animate-pulse',
      desc: 'Fatal cardiac arrest! Heart ventricles flutter uncontrollably. Danger of death within seconds!'
    };
  };

  const shockSeverity = getShockSeverity(humanCurrent);

  // =========================================================================
  // SIMULATION 2: ELECTRIC OVERLOADING & FUSE STATE
  // =========================================================================
  const FUSE_RATING = 16.0; // Amperes maximum safe limit

  interface Appliance {
    id: string;
    name: string;
    power: number; // Watts
    current: number; // Amperes = Power / 220V
    icon: string;
    isOn: boolean;
  }

  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: 'app1', name: 'Room Heater', power: 2000, current: 9.09, icon: '🔥', isOn: true },
    { id: 'app2', name: 'Water Geyser', power: 1800, current: 8.18, icon: '🚿', isOn: false },
    { id: 'app3', name: 'Electric Iron', power: 1000, current: 4.55, icon: '👔', isOn: true },
    { id: 'app4', name: 'Air Conditioner', power: 1500, current: 6.82, icon: '❄️', isOn: false },
    { id: 'app5', name: 'Electric Kettle', power: 1200, current: 5.45, icon: '🫖', isOn: false },
  ]);

  const [hasFuseProtection, setHasFuseProtection] = useState<boolean>(true);
  const [isOverloadFuseBlown, setIsOverloadFuseBlown] = useState<boolean>(false);

  const toggleAppliance = (id: string) => {
    if (isOverloadFuseBlown) return; // Cannot turn on if fuse is blown

    setAppliances((prev) => {
      const updated = prev.map((app) => (app.id === id ? { ...app, isOn: !app.isOn } : app));
      const totalI = updated.filter((a) => a.isOn).reduce((sum, a) => sum + a.current, 0);

      if (hasFuseProtection && totalI > FUSE_RATING) {
        setIsOverloadFuseBlown(true);
      }
      return updated;
    });
  };

  const activeAppliances = appliances.filter((a) => a.isOn);
  const totalActivePower = isOverloadFuseBlown ? 0 : activeAppliances.reduce((sum, a) => sum + a.power, 0);
  const totalActiveCurrent = isOverloadFuseBlown ? 0 : Number((totalActivePower / mainsVoltage).toFixed(2));
  const isOverloaded = totalActiveCurrent > FUSE_RATING;

  const handleResetOverload = () => {
    setIsOverloadFuseBlown(false);
    setAppliances(appliances.map((a, idx) => ({ ...a, isOn: idx === 0 })));
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Compartment 2 · Interactive Physics OLabs
              </span>
              <span aria-hidden="true">·</span>
              <span>5 Core OLabs Modules</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              OLabs: Interactive Circuit &amp; Safety Laboratory
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Hands-on interactive OLabs: <strong>Ohm’s Law OLab</strong> with real rheostat &amp; V-I plots, <strong>Series Combination OLab</strong> &amp; <strong>Parallel Combination OLab</strong> with live current branching, <strong>Electric Shock &amp; Earthing OLab</strong> safety physics, and <strong>Circuit Overload OLab</strong> with fuse protection.
            </p>
          </div>

          {/* Tab Switcher: 5 OLabs */}
          <div className="flex flex-wrap p-1.5 bg-slate-900/90 rounded-2xl border border-amber-500/30 gap-1.5 shrink-0 self-start md:self-center">
            <button
              onClick={() => setActiveTab('ohms_law')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'ohms_law'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-amber-400" />
              <span>Ohm’s Law OLab</span>
            </button>
            <button
              onClick={() => setActiveTab('series')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'series'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Series Combination OLab</span>
            </button>
            <button
              onClick={() => setActiveTab('parallel')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'parallel'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Split className="w-4 h-4 text-emerald-400" />
              <span>Parallel Combination OLab</span>
            </button>
            <button
              onClick={() => setActiveTab('shock')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'shock'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Electric Shock OLab</span>
            </button>
            <button
              onClick={() => setActiveTab('overload')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'overload'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Circuit Overload OLab</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OLAB 1: OHM'S LAW OLAB */}
      {/* ========================================================================= */}
      {activeTab === 'ohms_law' && (
        <div className="space-y-6">
          <OhmsLawExperimentView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* OLAB 2: SERIES COMBINATION OLAB */}
      {/* ========================================================================= */}
      {activeTab === 'series' && (
        <div className="space-y-6">
          <SeriesDerivationWhatsAppView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* OLAB 3: PARALLEL COMBINATION OLAB */}
      {/* ========================================================================= */}
      {activeTab === 'parallel' && (
        <div className="space-y-6">
          <ParallelDerivationWhatsAppView />
        </div>
      )}

      {/* ========================================================================= */}
      {/* OLAB 4: ELECTRIC SHOCK & EARTHING OLAB */}
      {/* ========================================================================= */}
      {activeTab === 'shock' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Control 1: Earthing Toggle */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                1. Safety Earth Wire (Green)
              </span>
              <button
                onClick={() => setHasEarthing(!hasEarthing)}
                className={`w-full py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  hasEarthing
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40'
                }`}
              >
                {hasEarthing ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>EARTHING CONNECTED (SAFE)</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4" />
                    <span>NO EARTHING (UNPROTECTED)</span>
                  </>
                )}
              </button>
            </div>

            {/* Control 2: Skin Condition Toggle */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                <span>2. Human Skin Condition</span>
                <span className="text-amber-400 font-mono font-black">
                  R = {skinCondition === 'dry' ? '100,000 Ω' : '1,000 Ω'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSkinCondition('dry')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    skinCondition === 'dry'
                      ? 'bg-cyan-500 text-slate-950 font-black shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Dry Skin</span>
                </button>
                <button
                  onClick={() => setSkinCondition('wet')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    skinCondition === 'wet'
                      ? 'bg-blue-600 text-white font-black shadow-xs'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>Wet Skin</span>
                </button>
              </div>
            </div>

            {/* Control 3: Insulation Fault Toggle */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                3. Insulation Fault in Iron Box
              </span>
              <button
                onClick={() => setHasFault(!hasFault)}
                className={`w-full py-2 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  hasFault
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{hasFault ? 'Fault: Live Wire Touches Metal Body' : 'Normal: Insulation Intact'}</span>
              </button>
            </div>
          </div>

          {/* Interactive OLab SVG Canvas */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-300 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>OLab Apparatus: Appliance Leakage &amp; Body Shock</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Mains Supply: 220 V AC · 50 Hz
              </div>
            </div>

            {/* SVG Illustration */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[700px] relative">
                <svg viewBox="0 0 700 380" className="w-full h-auto select-none rounded-2xl bg-slate-900/60 border border-slate-800">
                  {/* Grid */}
                  <defs>
                    <pattern id="shockGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="700" height="380" fill="url(#shockGrid)" />

                  {/* 1. POWER MAINS SOCKET (Left) */}
                  <g transform="translate(30, 80)">
                    <rect width="100" height="180" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                    <text x="50" y="28" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                      MAINS (220V)
                    </text>
                    {/* Live Terminal */}
                    <circle cx="35" cy="70" r="8" fill="#ef4444" />
                    <text x="35" y="74" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">L</text>
                    <text x="35" y="94" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">Live (220V)</text>

                    {/* Neutral Terminal */}
                    <circle cx="65" cy="70" r="8" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    <text x="65" y="74" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">N</text>
                    <text x="65" y="94" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">Neutral (0V)</text>

                    {/* Earth Terminal */}
                    <circle cx="50" cy="130" r="10" fill="#10b981" />
                    <text x="50" y="134" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">E</text>
                    <text x="50" y="155" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Earth (0V)</text>
                  </g>

                  {/* 2. ELECTRIC APPLIANCE (Metallic Iron Box) */}
                  <g transform="translate(240, 70)">
                    {/* Metal Body Shell */}
                    <rect
                      width="190"
                      height="190"
                      rx="16"
                      fill={hasFault && !hasEarthing ? '#7f1d1d' : '#1e293b'}
                      stroke={hasFault && !hasEarthing ? '#ef4444' : '#475569'}
                      strokeWidth={hasFault && !hasEarthing ? '3.5' : '2'}
                      className="transition-colors duration-300"
                    />
                    <text x="95" y="30" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="black">
                      ELECTRIC IRON BOX
                    </text>
                    <text x="95" y="48" textAnchor="middle" fill={hasFault && !hasEarthing ? '#fca5a5' : '#94a3b8'} fontSize="10">
                      Metallic Casing ({hasFault && !hasEarthing ? 'HOT AT 220V!' : 'Neutral Potential'})
                    </text>

                    {/* Heating Element Inside */}
                    <rect x="25" y="70" width="140" height="90" rx="8" fill="#0f172a" stroke="#334155" />
                    <path
                      d="M 40 115 L 55 95 L 70 135 L 85 95 L 100 135 L 115 95 L 130 135 L 145 115"
                      fill="none"
                      stroke={isFuseBlown ? '#475569' : '#f59e0b'}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <text x="95" y="85" textAnchor="middle" fill="#eab308" fontSize="10" fontWeight="bold">
                      Nichrome Element (R = 50 Ω)
                    </text>

                    {/* Fault Spark Point if insulation breaks */}
                    {hasFault && (
                      <g transform="translate(145, 115)">
                        <circle cx="0" cy="0" r="10" fill="#facc15" className="animate-ping" opacity="0.6" />
                        <path d="M -6 -6 L 0 0 L -3 3 L 6 8 L 0 2 L 4 -2 Z" fill="#ef4444" stroke="#ffffff" strokeWidth="0.5" />
                        <text x="18" y="4" fill="#f87171" fontSize="9" fontWeight="black">
                          INSULATION LEAKAGE!
                        </text>
                      </g>
                    )}
                  </g>

                  {/* 3. WIRES FROM SOCKET TO APPLIANCE */}
                  {/* Live Wire (Red) */}
                  <path
                    d="M 65 150 Q 150 145 265 185"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Neutral Wire (Black) */}
                  <path
                    d="M 95 150 Q 170 170 265 205"
                    fill="none"
                    stroke="#475569"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Earth Wire (Green) -> Connected to Metallic Shell */}
                  {hasEarthing ? (
                    <g>
                      <path
                        d="M 80 210 Q 150 255 240 240"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      {/* Heavy fault current animation through earth wire */}
                      {hasFault && (
                        <path
                          d="M 240 240 Q 150 255 80 210"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeDasharray="4 6"
                          className="animate-pulse"
                        />
                      )}
                      <circle cx="240" cy="240" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                      <text x="160" y="270" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                        Green Earth Wire (R &lt; 1 Ω)
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Cut Earth Wire */}
                      <path
                        d="M 80 210 Q 120 230 140 235"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="4 4"
                      />
                      <line x1="135" y1="225" x2="145" y2="245" stroke="#ef4444" strokeWidth="2.5" />
                      <line x1="145" y1="225" x2="135" y2="245" stroke="#ef4444" strokeWidth="2.5" />
                      <text x="140" y="260" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                        EARTH DISCONNECTED!
                      </text>
                    </g>
                  )}

                  {/* 4. HUMAN FIGURE TOUCHING THE METALLIC CASING */}
                  <g transform="translate(520, 80)">
                    {/* Head */}
                    <circle
                      cx="60"
                      cy="40"
                      r="22"
                      fill={humanCurrent > 50 ? '#f87171' : '#334155'}
                      stroke={humanCurrent > 50 ? '#ef4444' : '#64748b'}
                      strokeWidth="2.5"
                    />
                    {/* Eyes */}
                    <circle cx="53" cy="38" r="2.5" fill="#ffffff" />
                    <circle cx="67" cy="38" r="2.5" fill="#ffffff" />
                    {/* Expression */}
                    {humanCurrent > 20 ? (
                      <path d="M 52 50 Q 60 42 68 50" fill="none" stroke="#ffffff" strokeWidth="2" />
                    ) : (
                      <path d="M 54 48 Q 60 54 66 48" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                    )}

                    {/* Torso */}
                    <line x1="60" y1="62" x2="60" y2="150" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />

                    {/* Arm touching metal body */}
                    <path
                      d="M 60 85 Q 0 100 -90 120"
                      fill="none"
                      stroke={humanCurrent > 10 ? '#ef4444' : '#38bdf8'}
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                    {/* Hand contact node */}
                    <circle cx="-90" cy="120" r="6" fill={humanCurrent > 10 ? '#facc15' : '#38bdf8'} />
                    {humanCurrent > 10 && (
                      <circle cx="-90" cy="120" r="12" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
                    )}

                    {/* Legs down to ground */}
                    <line x1="60" y1="150" x2="40" y2="240" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
                    <line x1="60" y1="150" x2="80" y2="240" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />

                    {/* Ground line */}
                    <line x1="10" y1="240" x2="110" y2="240" stroke="#64748b" strokeWidth="3" />
                    <path d="M 40 245 L 80 245 M 50 250 L 70 250 M 55 255 L 65 255" stroke="#64748b" strokeWidth="2" />
                    <text x="60" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      Earth Ground (0 V)
                    </text>

                    {/* Human body current shock wave animation */}
                    {humanCurrent > 10 && (
                      <path
                        d="M -90 120 L 60 85 L 60 150 L 60 240"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeDasharray="4 6"
                        className="animate-pulse"
                      />
                    )}
                  </g>

                  {/* 5. LIVE CURRENT METERS & STATUS OVERLAY */}
                  <g transform="translate(240, 290)">
                    <rect width="280" height="70" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    <text x="140" y="22" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                      CURRENT MEASUREMENTS THROUGH BODY
                    </text>
                    <text x="20" y="48" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      Current (I = V / R):
                    </text>
                    <text x="260" y="48" textAnchor="end" fill={humanCurrent > 10 ? '#ef4444' : '#10b981'} fontSize="14" fontWeight="black" fontFamily="monospace">
                      {humanCurrent.toFixed(1)} mA
                    </text>
                  </g>
                </svg>
              </div>
            </div>

            {/* Physiological Impact Banner */}
            <div className={`mt-5 p-4 rounded-2xl border-2 flex items-center justify-between gap-4 ${shockSeverity.bg}`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-black tracking-wider text-slate-300">
                    Medical &amp; Physical Outcome:
                  </span>
                  <span className={`text-sm font-black ${shockSeverity.color}`}>
                    {shockSeverity.level}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200">
                  {shockSeverity.desc}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] text-slate-400 block font-mono">
                  Body Current
                </span>
                <span className={`font-mono text-xl sm:text-2xl font-black ${shockSeverity.color}`}>
                  {humanCurrent} mA
                </span>
              </div>
            </div>

            {/* Scientific Explanation Box for Board Exams */}
            <div className="mt-5 p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                <span>Board Exam Concept: How Earthing Saves Life</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-rose-400 block text-sm">Case 1: Without Earth Wire</strong>
                  <p>
                    When insulation breaks, the live wire charges the metal body to <strong>220 V</strong>. If a person touches it, their body provides the path to ground.
                  </p>
                  <p className="font-mono text-cyan-300 text-xs">
                    • Wet Skin: I = 220V / 1000Ω = <strong>220 mA</strong> (FATAL!)<br/>
                    • Dry Skin: I = 220V / 100,000Ω = <strong>2.2 mA</strong> (Shock felt)
                  </p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-emerald-400 block text-sm">Case 2: With Earth Wire (Green)</strong>
                  <p>
                    The earth wire provides an ultra-low resistance path (<strong>R &lt; 1 Ω</strong>).
                  </p>
                  <p className="text-slate-300">
                    Electric current strictly follows the path of least resistance. The surge of fault current flows safely through the earth wire into the ground, instantly <strong>blowing the fuse or tripping the MCB</strong> and saving the person!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OLAB 5: ELECTRIC OVERLOADING & FUSE PROTECTION */}
      {/* ========================================================================= */}
      {activeTab === 'overload' && (
        <div className="space-y-6">
          {/* Overload Controls & Fuse Switch */}
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-orange-400 tracking-wider">
                Household Power Line Limits
              </span>
              <p className="text-xs sm:text-sm text-slate-300">
                Supply Voltage = <strong>220 V</strong> | Fuse Safe Rating = <strong>16.0 Amperes</strong> (Power Circuit).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setHasFuseProtection(!hasFuseProtection)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  hasFuseProtection
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {hasFuseProtection ? 'Fuse Protection: ACTIVE' : 'Fuse Protection: BYPASSED'}
              </button>

              <button
                onClick={handleResetOverload}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Reset Circuit</span>
              </button>
            </div>
          </div>

          {/* Overload Status Alert */}
          {isOverloadFuseBlown ? (
            <div className="p-4 bg-emerald-950/60 border-2 border-emerald-500/60 rounded-2xl flex items-center gap-3 text-emerald-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong>Fuse Safely Melted &amp; Circuit Broken!</strong> The excessive current exceeded 16 A. The low-melting-point fuse wire melted immediately, stopping the current and preventing a domestic fire hazard! Click &quot;Reset Circuit&quot; to replace the fuse.
              </div>
            </div>
          ) : isOverloaded && !hasFuseProtection ? (
            <div className="p-4 bg-rose-950/80 border-2 border-rose-500 rounded-2xl flex items-center gap-3 text-rose-200 animate-pulse">
              <Flame className="w-6 h-6 text-rose-400 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong>DANGEROUS OVERLOAD DETECTED! (No Fuse Protection)</strong> Total current ({totalActiveCurrent} A) exceeds the safe wire rating of 16 A! The supply wires are overheating rapidly (H = I²Rt). Insulation is burning, creating an electrical fire hazard!
              </div>
            </div>
          ) : null}

          {/* Interactive Appliances Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-300">
              <span>Toggle High-Power Domestic Appliances (Connected in Parallel):</span>
              <span className="font-mono text-amber-400 font-bold">
                Total Current: {totalActiveCurrent} A / 16.0 A
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {appliances.map((app) => {
                const isThisOverloaded = isOverloaded && app.isOn && !isOverloadFuseBlown;

                return (
                  <button
                    key={app.id}
                    onClick={() => toggleAppliance(app.id)}
                    disabled={isOverloadFuseBlown}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between space-y-3 disabled:cursor-not-allowed ${
                      app.isOn && !isOverloadFuseBlown
                        ? isThisOverloaded
                          ? 'bg-rose-950/40 border-rose-500/70 shadow-md shadow-rose-900/20'
                          : 'bg-emerald-950/40 border-emerald-500/60 shadow-md shadow-emerald-950/20'
                        : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{app.icon}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                          app.isOn && !isOverloadFuseBlown
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {app.isOn && !isOverloadFuseBlown ? 'RUNNING' : 'OFF'}
                      </span>
                    </div>

                    <div>
                      <span className="font-bold text-sm text-white block">
                        {app.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {app.power} W ({app.current.toFixed(1)} A)
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300">
                      {app.isOn && !isOverloadFuseBlown ? 'Click to Turn Off' : 'Click to Turn On'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current & Thermal Meter Workbench */}
          <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs sm:text-sm font-black text-slate-200 uppercase tracking-wider">
                Live Circuit Current vs Fuse Limit Gauge
              </span>
              <span className="text-xs font-mono text-cyan-400">
                P_total = {totalActivePower} W
              </span>
            </div>

            {/* Progress Bar of Current */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300 font-bold">
                <span>0 A (No Load)</span>
                <span className="text-amber-400 font-black">
                  Current: {totalActiveCurrent} A {isOverloaded && '(OVERLOAD!)'}
                </span>
                <span className="text-rose-400 font-bold">Max Limit: 16.0 A</span>
              </div>

              <div className="w-full h-4 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative">
                {/* 16A limit marker */}
                <div className="absolute top-0 bottom-0 left-[66%] w-0.5 bg-rose-500 z-10" />

                {/* Filled current gauge */}
                <div
                  className={`h-full transition-all duration-300 ${
                    isOverloadFuseBlown
                      ? 'bg-slate-700 w-0'
                      : isOverloaded
                      ? 'bg-rose-500'
                      : totalActiveCurrent > 12
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                  }`}
                  style={{ width: `${Math.min((totalActiveCurrent / 24) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Scientific Explanation of Overloading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-black text-orange-400 uppercase tracking-wider block">
                  What Causes Overloading?
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Overloading occurs when too many electrical appliances of high power rating are switched on at the same time in a single circuit. Because appliances in a household are in <strong>parallel</strong>, the total current is the sum of all individual currents:
                </p>
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-amber-300">
                  I_total = I₁ + I₂ + I₃ + ... = P_total / 220V
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block">
                  How Does a Fuse Protect Against Overloading?
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  According to Joule&apos;s Law (<span className="font-mono text-amber-300">H = I²Rt</span>), large current generates tremendous heat. The electric fuse wire (made of Lead-Tin alloy) has a <strong>low melting point</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Before the domestic wiring can catch fire, the fuse wire melts and <strong>breaks the circuit safely</strong>!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SimulationsCompartment = OLabsCompartment;
