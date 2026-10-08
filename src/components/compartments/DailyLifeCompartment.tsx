import React, { useState } from 'react';
import { Flame, Shield, ShieldCheck, Check, Copy, Scale, Plug, Calculator, Receipt, AlertTriangle, CheckCircle2, Zap, Sparkles } from 'lucide-react';
import { EquivalentResistanceSection } from './EquivalentResistanceSection';
import { KirchhoffsFirstLawSection } from './KirchhoffsFirstLawSection';
import { KirchhoffsSecondLawSection } from './KirchhoffsSecondLawSection';

export const DailyLifeCompartment: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'wiring' | 'circuits' | 'kirchhoff_all' | 'kirchhoff1' | 'kirchhoff2'>('all');

  const notesText = `AP SSC PUBLIC EXAM - 2 MARKS & NUMERICAL QUESTIONS

1. TWO USES OF HEATING EFFECT OF ELECTRIC CURRENT:
• In Heating Appliances: Used to produce heat in electric iron box, toaster, room heater, and geyser (using Nichrome wire).
• In Electric Bulbs: Used to produce light by heating the thin tungsten filament to a white-hot glow.

2. TWO USES OF AN ELECTRIC FUSE:
• Prevents Short-Circuit Damage: Melts immediately during a short circuit to break the circuit and prevent electrical fires.
• Prevents Overload Damage: Melts safely when excessive current flows, protecting domestic appliances from burning out.

3. TWO USES OF AN EARTH WIRE:
• Prevents Fatal Electric Shock: Drains leakage current from the metallic body safely into the ground, saving the user from shock.
• Trips the Fuse or MCB: Creates a surge to ground that instantly blows the fuse or trips the MCB, cutting off dangerous power.

4. DIFFERENCES BETWEEN FUSE WIRE AND FILAMENT / HEATING ELEMENT:
• Melting Point:
  - Fuse Wire: LOW melting point (~200 °C) so it melts easily.
  - Filament / Element: VERY HIGH melting point (Tungsten: 3380 °C, Nichrome: 1400 °C) so it will not melt.
• Resistance:
  - Fuse Wire: Moderate / Low resistance to allow normal current flow.
  - Filament / Element: HIGH resistance to generate strong Joule heat (H = I²Rt).
• Examples:
  - Fuse Wire: Lead-Tin alloy (Pb–Sn alloy).
  - Filament / Element: Tungsten (in bulbs for light), Nichrome (in electric iron box & heater for heat).

5. STANDARD COLOUR CODING OF WIRES:
• Live Wire (L, 220V): Red (Old) / Brown (New)
• Neutral Wire (N, 0V): Black (Old) / Light Blue (New)
• Earth Wire (E, Safety 0V): Green (Old) / Green with Yellow stripes (New)

6. WHY THE EARTH PIN IS LONGER AND LARGER (2 SENTENCES):
1. The earth pin is longer so that it makes ground contact first (before live power connects) and disconnects last when unplugged.
2. The earth pin is larger (thicker) so that it cannot be accidentally inserted into live or neutral sockets, and provides ultra-low resistance for safe fault current drainage.

7. QUESTION 23 (AS7): ELECTRICITY BILL CALCULATION (30 DAYS)
• 3 Tube lights (40W, 5h): 3 × 0.04 kW × 5h = 0.60 kWh
• 2 Fans (80W, 12h): 2 × 0.08 kW × 12h = 1.92 kWh
• 1 TV (60W, 5h / 5.6h): 1 × 0.06 kW × time = 0.30 to 0.34 kWh
• Total Units per day = 2.82 to 2.86 kWh
• Total Units for 30 days = 84.6 to 85.80 kWh
• Total Bill at Rs. 3/unit = Rs. 253.80 to Rs. 257.40

8. UPDATED PROBLEM 1: 5A CURRENT RATING WITH MULTIPLE APPLIANCES
• Supply Voltage V = 230V, Socket Rating = 5A
• Appliances: Fan (80W) + Mixer (500W) + Fridge (300W) + Motor (450W) + AC (1500W)
• Total Power P_total = 80 + 500 + 300 + 450 + 1500 = 2830 W
• Total Current I_total = P / V = 2830 W / 230 V = 12.3 A
• Conclusion: 12.3 A > 5 A ⟹ The 5A socket will severely overload!

9. UPDATED PROBLEM 2: 15A CURRENT RATING WITH MULTIPLE APPLIANCES
• Supply Voltage V = 230V, Socket Rating = 15A
• Total Power P_total = 2830 W
• Total Current I_total = P / V = 2830 W / 230 V = 12.3 A
• Conclusion: 12.3 A < 15 A ⟹ The 15A socket will NOT overload and operates safely!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(notesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-7">
      {/* Header Banner showing 3-Part Order */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-black text-amber-400 uppercase tracking-wider">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
              Project Work Compartment
            </span>
            <span aria-hidden="true">·</span>
            <span>AP SSC Physical Science (Class 10)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Project Work: Daily Life Wiring, Circuit Networks &amp; Kirchhoff&apos;s Laws
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium">
            Strict Syllabus Sequence: <strong>1) Daily Life &amp; Wiring Notes</strong> → <strong>2) Equivalent Resistance Circuits (Cases a, b, c, d)</strong> → <strong>3) Kirchhoff&apos;s Laws</strong>.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy All Notes'}</span>
        </button>
      </div>

      {/* Compartment Navigation Switcher - Strictly Ordered: 1) Daily Life & Wiring, 2) Equivalent Resistance Circuits, 3) Kirchhoff's Laws */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border-2 border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-sm">
        <button
          type="button"
          onClick={() => setActiveSection('all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'all'
              ? 'bg-amber-400 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>⚡ All Content (1 → 2 → 3)</span>
        </button>

        {/* 1) Daily Life & Wiring */}
        <button
          type="button"
          onClick={() => setActiveSection('wiring')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'wiring'
              ? 'bg-amber-400 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>📋 1. Daily Life &amp; Wiring Notes</span>
        </button>

        {/* 2) Equivalent Resistance Circuits (Cases a, b, c, d) */}
        <button
          type="button"
          onClick={() => setActiveSection('circuits')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'circuits'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>🔌 2. Equivalent Resistance Circuits (Cases a, b, c, d)</span>
        </button>

        {/* 3) Kirchhoff's Laws */}
        <button
          type="button"
          onClick={() => setActiveSection('kirchhoff_all')}
          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSection === 'kirchhoff_all'
              ? 'bg-emerald-400 text-slate-950 font-black shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>⚖️ 3. Kirchhoff&apos;s Laws</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('kirchhoff1')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            activeSection === 'kirchhoff1'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>3A. 1st Law (Junction)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('kirchhoff2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            activeSection === 'kirchhoff2'
              ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <span>3B. 2nd Law (Loop)</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1) DAILY LIFE AND WIRING & 2-MARK NOTES                  */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === 'wiring') && (
        <div className="space-y-7">
          {/* Section 1 Header */}
          {activeSection === 'all' && (
            <div className="border-b-2 border-slate-800 pb-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Section 1 of 3
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">AP SSC Board Exam Core Notes</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-orange-400" />
                <span>1. Daily Life Wiring, Safety &amp; 2-Mark High-Score Notes</span>
              </h2>
            </div>
          )}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-orange-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <Flame className="w-5 h-5 text-orange-400 shrink-0" />
            <span>Q1. State any two uses of heating effect of electric current (2 Marks)</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-mono">
            2 Marks
          </span>
        </div>

        <div className="space-y-3 pt-1 text-sm sm:text-base">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-amber-300 text-base sm:text-lg block mb-1">
              1. In Domestic Heating Appliances:
            </strong>
            <span>
              Used to produce heat in appliances like <strong>electric laundry iron, bread toaster, water heater (geyser), and electric oven</strong> (using high-resistance Nichrome wire).
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-amber-300 text-base sm:text-lg block mb-1">
              2. In Electric Bulbs:
            </strong>
            <span>
              Used to <strong>produce light</strong> by heating an ultra-thin <strong>Tungsten filament</strong> until it reaches white-hot incandescence (~2700 °C).
            </span>
          </div>
        </div>
      </div>

      {/* QUESTION 2: FUSE */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-red-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <Shield className="w-5 h-5 text-red-400 shrink-0" />
            <span>Q2. Write two main uses of an electric fuse (2 Marks)</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-red-500/20 text-red-300 font-mono">
            2 Marks
          </span>
        </div>

        <div className="space-y-3 pt-1 text-sm sm:text-base">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-red-300 text-base sm:text-lg block mb-1">
              1. Prevents Short-Circuit Damage:
            </strong>
            <span>
              Melts immediately when live and neutral wires touch directly, breaking the circuit (<span className="font-mono text-emerald-300">I = 0 A</span>) to <strong>prevent electrical fires</strong>.
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-red-300 text-base sm:text-lg block mb-1">
              2. Prevents Overload Damage:
            </strong>
            <span>
              Melts safely when too many appliances draw excessive current, <strong>protecting costly domestic appliances</strong> from burning out.
            </span>
          </div>
        </div>
      </div>

      {/* QUESTION 3: EARTH WIRE */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Q3. State two main uses of an earth wire (2 Marks)</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
            2 Marks
          </span>
        </div>

        <div className="space-y-3 pt-1 text-sm sm:text-base">
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-emerald-300 text-base sm:text-lg block mb-1">
              1. Prevents Fatal Electric Shock:
            </strong>
            <span>
              Drains any accidental leakage current from the metallic outer body safely into the ground (<span className="font-mono text-emerald-300">R ≈ 0 Ω</span>), <strong>protecting the user from shock</strong>.
            </span>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
            <strong className="text-emerald-300 text-base sm:text-lg block mb-1">
              2. Trips the Fuse or MCB:
            </strong>
            <span>
              Creates a sudden heavy current surge into the ground that <strong>immediately blows the fuse or trips the MCB</strong>, cutting off high-voltage power in milliseconds.
            </span>
          </div>
        </div>
      </div>

      {/* QUESTION 4: FUSE VS FILAMENT / HEATING ELEMENT (CLEAR & LARGE FONT) */}
      <div className="bg-slate-900 border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <Scale className="w-5 h-5 text-cyan-400 shrink-0" />
            <span>Q4. Differences: Electric Fuse Wire vs. Filament / Heating Element (2 Marks)</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-mono self-start sm:self-auto">
            2 Marks Exam Table
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Comparing an <strong>Electric Fuse Wire</strong> with a <strong>Filament / Heating Element</strong> (e.g. <em>Tungsten in electric bulb</em>, <em>Nichrome in heater &amp; iron box</em>) on Melting Point, Resistance, and Examples:
        </p>

        {/* Large Font Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border-2 border-slate-800 bg-slate-950 mt-3 shadow-inner">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-slate-900 border-b-2 border-slate-800 text-slate-300 font-black uppercase text-xs sm:text-sm tracking-wider">
              <tr>
                <th className="py-3.5 px-4 sm:px-6 w-1/4">Parameter</th>
                <th className="py-3.5 px-4 sm:px-6 w-3/8 text-rose-300">
                  ⚡ Electric Fuse Wire
                </th>
                <th className="py-3.5 px-4 sm:px-6 w-3/8 text-amber-300">
                  🔥 Filament / Heating Element
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-800/80 text-slate-200">
              {/* Row 1: Melting Point */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-4 px-4 sm:px-6 font-black text-cyan-300 align-top">
                  1. Melting Point
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                  <div className="text-rose-400 font-black text-base sm:text-lg">
                    LOW Melting Point
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Around <strong>200 °C to 250 °C</strong>.<br />
                    <em>Melts and breaks circuit quickly to prevent fire.</em>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                  <div className="text-amber-400 font-black text-base sm:text-lg">
                    VERY HIGH Melting Point
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    • Tungsten: <strong>3380 °C</strong><br />
                    • Nichrome: <strong>~1400 °C</strong><br />
                    <em>Can glow white-hot or red-hot without melting.</em>
                  </div>
                </td>
              </tr>

              {/* Row 2: Resistance */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-4 px-4 sm:px-6 font-black text-cyan-300 align-top">
                  2. Resistance
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                  <div className="text-rose-400 font-black text-base sm:text-lg">
                    Moderate / Low Resistance
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Allows normal rated current to pass smoothly without unwanted voltage drop or power wastage.
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                  <div className="text-amber-400 font-black text-base sm:text-lg">
                    HIGH Resistance
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    High resistance produces intense Joule heat (<span className="font-mono text-amber-300">H = I²Rt</span>) for lighting or heating.
                  </div>
                </td>
              </tr>

              {/* Row 3: Example / Materials */}
              <tr className="hover:bg-slate-900/40">
                <td className="py-4 px-4 sm:px-6 font-black text-cyan-300 align-top">
                  3. Examples &amp; Materials
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1">
                  <div className="text-rose-300 font-mono font-black text-base sm:text-lg">
                    Lead-Tin Alloy (Pb–Sn)
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300">
                    Used inside porcelain kit-kat fuses or cartridge fuses.
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6 align-top space-y-1.5">
                  <div>
                    <span className="font-mono font-black text-yellow-300 text-base sm:text-lg block">
                      1. Tungsten:
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300">
                      Filament inside electric bulbs (produces light).
                    </span>
                  </div>
                  <div>
                    <span className="font-mono font-black text-orange-300 text-base sm:text-lg block">
                      2. Nichrome Alloy:
                    </span>
                    <span className="text-xs sm:text-sm text-slate-300">
                      Heating element in electric iron box, room heater, geyser, and toaster (produces heat).
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* QUESTION 5: STANDARD COLOUR CODING OF WIRES */}
      <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Q5. Standard Colour Coding of Live, Neutral &amp; Earth Wires</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono self-start sm:self-auto">
            Board Exam Standard
          </span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          In domestic household wiring, standard colour conventions are used to identify each wire safely:
        </p>

        {/* 3 Wire Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* LIVE WIRE */}
          <div className="p-5 bg-slate-950 rounded-2xl border-2 border-red-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-red-400">
                1. Live Wire (L)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono text-xs font-bold">
                220 V (High)
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-red-600 border border-white/40 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  Old Convention: <strong className="text-red-400 font-black">RED</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-amber-800 border border-white/40 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  New Convention: <strong className="text-amber-500 font-black">BROWN</strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              Carries current from mains to the appliance. Switches and fuses are <strong>always</strong> placed in the live wire.
            </p>
          </div>

          {/* NEUTRAL WIRE */}
          <div className="p-5 bg-slate-950 rounded-2xl border-2 border-blue-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-blue-400">
                2. Neutral Wire (N)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                0 V (Ground)
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-600 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  Old Convention: <strong className="text-slate-200 font-black">BLACK</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-sky-500 border border-white/40 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  New Convention: <strong className="text-sky-400 font-black">LIGHT BLUE</strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              Completes the electric circuit loop back to the power substation transformer.
            </p>
          </div>

          {/* EARTH WIRE */}
          <div className="p-5 bg-slate-950 rounded-2xl border-2 border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-black text-emerald-400">
                3. Earth Wire (E)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold">
                Safety (0 V)
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-emerald-600 border border-white/40 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  Old Convention: <strong className="text-emerald-400 font-black">GREEN</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-400 border border-white/40 shrink-0" />
                <span className="text-slate-300 font-semibold">
                  New Convention: <strong className="text-emerald-300 font-black">GREEN / YELLOW</strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1 border-t border-slate-800">
              Safety wire connected to the metal shell of appliances and a deep buried copper plate to prevent fatal electric shock.
            </p>
          </div>
        </div>
      </div>

      {/* QUESTION 6: WHY IS THE EARTH PIN LONGER AND LARGER (2 SENTENCES) */}
      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm sm:text-base uppercase tracking-wider">
            <Plug className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Q6. Why is the Earth Pin Longer and Larger than Live/Neutral Pins?</span>
          </div>
          <span className="text-xs sm:text-sm font-black px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono self-start sm:self-auto">
            2 Sentences (2 Marks)
          </span>
        </div>

        <div className="space-y-3 pt-1 text-sm sm:text-base">
          {/* Sentence 1: Why it is longer */}
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-emerald-500/30 leading-relaxed text-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-black text-emerald-400 text-base sm:text-lg">
              <span>1. Why it is LONGER:</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base">
              The earth pin is made <strong>longer</strong> so that it makes ground contact <strong>first</strong> (before live power connects) and disconnects <strong>last</strong> when the appliance is unplugged.
            </p>
          </div>

          {/* Sentence 2: Why it is larger / thicker */}
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-amber-500/30 leading-relaxed text-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-black text-amber-400 text-base sm:text-lg">
              <span>2. Why it is LARGER (Thicker):</span>
            </div>
            <p className="text-slate-200 text-sm sm:text-base">
              The earth pin is made <strong>larger (thicker)</strong> so that it <strong>cannot be mistakenly inserted</strong> into the live or neutral holes of the socket, and provides ultra-low electrical resistance for safe drainage of leakage current.
            </p>
          </div>
        </div>
      </div>

      {/* QUESTION 23: HOUSEHOLD ELECTRICITY CONSUMPTION & BILL CALCULATION (AS7) */}
      <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center gap-3 text-indigo-400 font-black text-lg sm:text-2xl uppercase tracking-wider">
            <Receipt className="w-6 h-6 text-indigo-400 shrink-0" />
            <span>Q23 (Textbook AS7): Cost of Electric Energy Used in 30 Days</span>
          </div>
          <span className="text-sm sm:text-base font-black px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono self-start sm:self-auto border border-indigo-500/30">
            4-Mark Board Exam Numerical
          </span>
        </div>

        {/* Question Statement Box */}
        <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-indigo-500/30 space-y-3">
          <div className="text-sm sm:text-base font-black text-indigo-400 uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            <span>Problem Statement (AP SSC Physical Science Textbook Q23):</span>
          </div>
          <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-medium">
            &ldquo;A house has <strong>3 tube lights</strong>, <strong>two fans</strong> and a <strong>Television</strong>. Each tube light draws <strong>40W</strong>. The fan draws <strong>80W</strong> and the Television draws <strong>60W</strong>. On the average, all the tube lights are kept on for <strong>five hours</strong>, two fans for <strong>12 hours</strong> and the television for <strong>five hours</strong> every day. Find the cost of electric energy used in <strong>30 days</strong> at the rate of <strong>Rs. 3.00 per kWh</strong>. (AS7)&rdquo;
          </p>
        </div>

        {/* Neat 7-Column Table as shown in notebook */}
        <div className="space-y-3">
          <div className="text-sm sm:text-base font-bold text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="uppercase tracking-wider text-amber-400 font-black">
              Observation &amp; Power Consumption Table (Standard Exam Format):
            </span>
            <span className="text-xs sm:text-sm text-slate-400 font-mono">Formula: Energy (kWh) = kW × Hours</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border-2 border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-slate-900 border-b-2 border-slate-800 text-slate-300 font-black uppercase text-xs sm:text-sm tracking-wider">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 text-center">S.No</th>
                  <th className="py-3.5 px-3 sm:px-4">Name of Appliance</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Number of Appliances</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Electric Power (Watt)</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Electric Power in kW<br/><span className="text-xs text-slate-400 font-normal">W / 1000</span></th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Consumption Time (Hour)</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right text-emerald-400">Electric Energy<br/><span className="text-xs text-emerald-400 font-normal">kW × Hour = kWh (Unit)</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200 font-mono text-sm sm:text-base">
                {/* Row 1: Tubelights */}
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400 font-bold">1</td>
                  <td className="py-3.5 px-3 sm:px-4 font-sans font-bold text-white text-base">Tubelights</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-amber-300 font-black text-base">3</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    3 × 40W = <span className="font-black text-cyan-300">120 W</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    120 / 1000 = <span className="font-black text-cyan-300">0.12 kW</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-center font-black text-purple-300 text-base">5 h</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right font-black text-emerald-400">
                    0.12 × 5 = <span className="text-base sm:text-lg">0.60 kWh</span>
                  </td>
                </tr>

                {/* Row 2: Fans */}
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400 font-bold">2</td>
                  <td className="py-3.5 px-3 sm:px-4 font-sans font-bold text-white text-base">Fans</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-amber-300 font-black text-base">2</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    2 × 80W = <span className="font-black text-cyan-300">160 W</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    160 / 1000 = <span className="font-black text-cyan-300">0.16 kW</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-center font-black text-purple-300 text-base">12 h</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right font-black text-emerald-400">
                    0.16 × 12 = <span className="text-base sm:text-lg">1.92 kWh</span>
                  </td>
                </tr>

                {/* Row 3: Television */}
                <tr className="hover:bg-slate-900/40">
                  <td className="py-3.5 px-3 sm:px-4 text-center text-slate-400 font-bold">3</td>
                  <td className="py-3.5 px-3 sm:px-4 font-sans font-bold text-white text-base">Television (T.V)</td>
                  <td className="py-3.5 px-3 sm:px-4 text-center text-amber-300 font-black text-base">1</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    1 × 60W = <span className="font-black text-cyan-300">60 W</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-right">
                    60 / 1000 = <span className="font-black text-cyan-300">0.06 kW</span>
                  </td>
                  <td className="py-3.5 px-3 sm:px-4 text-center font-black text-purple-300 text-base">5 h</td>
                  <td className="py-3.5 px-3 sm:px-4 text-right font-black text-emerald-400">
                    0.06 × 5 = <span className="text-base sm:text-lg">0.30 kWh</span>
                    <span className="block text-xs font-normal text-slate-400 font-sans">
                      (or 0.34 kWh in some practice notes)
                    </span>
                  </td>
                </tr>
              </tbody>

              {/* Table Footer: Total Per Day */}
              <tfoot className="bg-slate-900 border-t-2 border-slate-700">
                <tr>
                  <td colSpan={6} className="py-4 px-4 font-sans font-black text-right text-amber-400 uppercase text-sm sm:text-base">
                    Total Units Consumed Per Day:
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-black text-emerald-300 text-base sm:text-xl">
                    2.82 kWh <span className="text-sm text-slate-400 font-normal">/ 2.86 kWh</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Step-by-Step Calculation Breakdown (Exactly as in notebook note) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Box 1: Units consumed in 30 days */}
          <div className="p-6 bg-slate-950 rounded-2xl border-2 border-slate-800 space-y-3">
            <div className="text-sm font-black text-cyan-400 uppercase tracking-wider">
              Step 1: Total Units for 30 Days
            </div>
            <div className="space-y-3 text-sm sm:text-base text-slate-200 font-mono">
              <p className="font-sans text-slate-300 font-semibold text-base sm:text-lg">
                <strong>Formula:</strong> Total units for 30 days = No. of units consumed per day × 30
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans text-sm">
                  • As shown in Notebook Note (using 2.86 kWh):
                </div>
                <div className="text-cyan-300 font-bold text-base sm:text-lg">
                  = 2.86 kWh × 30 = <span className="text-amber-300 underline font-black text-lg sm:text-xl">85.80 kWh</span> (Units)
                </div>
                <div className="text-slate-400 font-sans text-sm pt-2 border-t border-slate-800">
                  • As per exact textbook time (using 2.82 kWh):
                </div>
                <div className="text-slate-300 text-sm sm:text-base">
                  = 2.82 kWh × 30 = 84.60 kWh (Units)
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: Total Cost of Energy */}
          <div className="p-6 bg-slate-950 rounded-2xl border-2 border-emerald-500/40 space-y-3">
            <div className="text-sm font-black text-emerald-400 uppercase tracking-wider">
              Step 2: Total Cost Calculation at Rs. 3.00 / kWh
            </div>
            <div className="space-y-3 text-sm sm:text-base text-slate-200 font-mono">
              <p className="font-sans text-slate-300 font-semibold text-base sm:text-lg">
                Cost of 1 unit (1 kWh) = <strong className="text-white">Rs. 3.00</strong>
              </p>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-slate-400 font-sans text-sm">
                  • Cost of 85.80 units (from Notebook Note):
                </div>
                <div className="text-emerald-400 font-bold text-base sm:text-lg">
                  = 85.80 × 3 = <span className="text-amber-300 underline font-black text-xl sm:text-2xl">Rs. 257.40</span>
                </div>
                <div className="text-slate-400 font-sans text-sm pt-2 border-t border-slate-800">
                  • Cost of 84.60 units (exact textbook):
                </div>
                <div className="text-slate-300 text-sm sm:text-base">
                  = 84.60 × 3 = Rs. 253.80
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Exam Answer Highlight Box */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border-2 border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-200">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-black text-emerald-400 uppercase tracking-wider block">
              Final Answer to Write in Public Exam:
            </span>
            <span className="text-base sm:text-xl font-medium leading-relaxed">
              Total electric energy consumed in 30 days = <strong>85.80 kWh</strong> (or <strong>84.60 kWh</strong>)<br/>
              Total electricity bill for 30 days = <strong className="text-amber-300 font-mono text-xl sm:text-2xl">Rs. 257.40</strong> (or <strong className="text-amber-300 font-mono text-lg">Rs. 253.80</strong>)
            </span>
          </div>
          <span className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm sm:text-base font-mono shrink-0 shadow-md">
            Full 4 / 4 Marks
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UPDATED PROBLEM 1: 5A CURRENT RATING WITH MULTIPLE APPLIANCES */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center gap-3 text-rose-400 font-black text-lg sm:text-2xl uppercase tracking-wider">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
            <span>Updated Problem 1: 5A Current Rating with Multiple Appliances</span>
          </div>
          <span className="text-sm sm:text-base font-black px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 font-mono self-start sm:self-auto border border-rose-500/30">
            Overloading Scenario
          </span>
        </div>

        {/* Problem Statement Box */}
        <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
          <span className="text-sm sm:text-base font-black text-rose-400 uppercase tracking-wider block">
            Problem Statement:
          </span>
          <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-medium">
            A multi-plug adapter is connected to a standard household socket rated for <strong>5A</strong> at a voltage of <strong>230V</strong>. The following appliances are plugged into the adapter and switched on at the same time:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-sm sm:text-base font-mono">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Ceiling Fan: <strong className="text-amber-400 text-base sm:text-lg">80W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Mixer Grinder: <strong className="text-amber-400 text-base sm:text-lg">500W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Refrigerator (Fridge): <strong className="text-amber-400 text-base sm:text-lg">300W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Small Water Pumping Motor: <strong className="text-amber-400 text-base sm:text-lg">450W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 sm:col-span-2 lg:col-span-1">
              • Air Conditioner (AC): <strong className="text-amber-400 text-base sm:text-lg">1500W</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-base sm:text-lg text-slate-200">
            <strong className="text-amber-400 block mb-1">Questions to Answer:</strong>
            <ol className="list-decimal pl-6 space-y-1">
              <li>What is the total current drawn by all these appliances combined?</li>
              <li>Will the 5A socket overload?</li>
            </ol>
          </div>
        </div>

        {/* Step-by-Step Solution */}
        <div className="space-y-5">
          <div className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-wider">
            Step-by-Step Solution:
          </div>

          {/* Given Data */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm sm:text-base font-mono flex flex-wrap gap-5 text-slate-200">
            <span>• Supply Voltage (V) = <strong className="text-cyan-300 text-base sm:text-lg">230V</strong></span>
            <span>• Socket Current Rating = <strong className="text-rose-400 text-base sm:text-lg">5A</strong></span>
          </div>

          {/* Step 1: Total Power */}
          <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-sm sm:text-base font-black text-cyan-400 uppercase tracking-wider">
              Step 1: Calculate the total power consumption
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              First, we add the power ratings of all the appliances together:
            </p>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-base sm:text-xl text-slate-200 leading-relaxed">
              Total Power (P_total) = 80W + 500W + 300W + 450W + 1500W<br/>
              <span className="text-amber-300 font-black text-lg sm:text-2xl mt-1 block">P_total = 2830 W</span>
            </div>
          </div>

          {/* Step 2: Total Current */}
          <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-sm sm:text-base font-black text-cyan-400 uppercase tracking-wider">
              Step 2: Calculate the total current drawn
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Using the power formula: <span className="font-mono text-amber-300 font-bold text-base sm:text-lg">Current (I) = Power (P) / Voltage (V)</span>
            </p>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-base sm:text-xl text-slate-200 leading-relaxed">
              I_total = 2830 W / 230 V<br/>
              <span className="text-cyan-300 font-black text-xl sm:text-2xl mt-1 block">I_total = 12.3 A</span>
            </div>
          </div>

          {/* Conclusion */}
          <div className="p-6 bg-rose-950/40 rounded-2xl border-2 border-rose-500/60 space-y-3 text-slate-200">
            <div className="text-sm sm:text-base font-black text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Conclusion &amp; Overload Assessment:</span>
            </div>
            <div className="space-y-2 text-base sm:text-lg leading-relaxed">
              <p>
                <strong>1. Total Current:</strong> The appliances are drawing a total current of <strong className="font-mono text-amber-300 text-lg sm:text-xl">12.3A</strong>.
              </p>
              <p>
                <strong>2. Overload Status:</strong> The calculated current (<strong>12.3A</strong>) is more than double the socket&apos;s safe limit of <strong>5A</strong> (<span className="font-mono text-rose-300 font-bold">12.3A &gt; 5A</span>).
              </p>
              <p className="text-rose-300 font-black pt-2 border-t border-rose-500/40 text-base sm:text-xl">
                Therefore, the 5A socket will severely overload, posing a high risk of insulation melting and electrical fire!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UPDATED PROBLEM 2: 15A CURRENT RATING WITH MULTIPLE APPLIANCES */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
          <div className="flex items-center gap-3 text-emerald-400 font-black text-lg sm:text-2xl uppercase tracking-wider">
            <Plug className="w-6 h-6 text-emerald-400 shrink-0" />
            <span>Updated Problem 2: 15A Current Rating with Multiple Appliances</span>
          </div>
          <span className="text-sm sm:text-base font-black px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono self-start sm:self-auto border border-emerald-500/30">
            Heavy-Duty Power Socket (Safe)
          </span>
        </div>

        {/* Problem Statement Box */}
        <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
          <span className="text-sm sm:text-base font-black text-emerald-400 uppercase tracking-wider block">
            Problem Statement:
          </span>
          <p className="text-base sm:text-xl text-slate-100 leading-relaxed font-medium">
            A multi-plug extension board is connected to a heavy-duty power socket rated for <strong>15A</strong> at a voltage of <strong>230V</strong>. The following household appliances are plugged into it and turned on simultaneously:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-sm sm:text-base font-mono">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Ceiling Fan: <strong className="text-amber-400 text-base sm:text-lg">80W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Mixer Grinder: <strong className="text-amber-400 text-base sm:text-lg">500W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Refrigerator (Fridge): <strong className="text-amber-400 text-base sm:text-lg">300W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200">
              • Small Water Pumping Motor: <strong className="text-amber-400 text-base sm:text-lg">450W</strong>
            </div>
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-200 sm:col-span-2 lg:col-span-1">
              • Air Conditioner (AC): <strong className="text-amber-400 text-base sm:text-lg">1500W</strong>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-base sm:text-lg text-slate-200">
            <strong className="text-amber-400 block mb-1">Questions to Answer:</strong>
            <ol className="list-decimal pl-6 space-y-1">
              <li>What is the total current drawn by all these appliances combined?</li>
              <li>Will this 15A socket overload under this total load?</li>
            </ol>
          </div>
        </div>

        {/* Step-by-Step Solution */}
        <div className="space-y-5">
          <div className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-wider">
            Step-by-Step Solution:
          </div>

          {/* Given Data */}
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm sm:text-base font-mono flex flex-wrap gap-5 text-slate-200">
            <span>• Supply Voltage (V) = <strong className="text-cyan-300 text-base sm:text-lg">230V</strong></span>
            <span>• Socket Current Rating = <strong className="text-emerald-400 text-base sm:text-lg">15A</strong></span>
          </div>

          {/* Step 1: Total Power */}
          <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-sm sm:text-base font-black text-cyan-400 uppercase tracking-wider">
              Step 1: Calculate the total power consumption
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Adding the wattages of all five appliances together:
            </p>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-base sm:text-xl text-slate-200 leading-relaxed">
              Total Power (P_total) = 80W + 500W + 300W + 450W + 1500W<br/>
              <span className="text-amber-300 font-black text-lg sm:text-2xl mt-1 block">P_total = 2830 W</span>
            </div>
          </div>

          {/* Step 2: Total Current */}
          <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="text-sm sm:text-base font-black text-cyan-400 uppercase tracking-wider">
              Step 2: Calculate the total current drawn
            </div>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              Using the power formula: <span className="font-mono text-amber-300 font-bold text-base sm:text-lg">Current (I) = Power (P) / Voltage (V)</span>
            </p>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-base sm:text-xl text-slate-200 leading-relaxed">
              I_total = 2830 W / 230 V<br/>
              <span className="text-cyan-300 font-black text-xl sm:text-2xl mt-1 block">I_total = 12.3 A</span>
            </div>
          </div>

          {/* Conclusion */}
          <div className="p-6 bg-emerald-950/40 rounded-2xl border-2 border-emerald-500/60 space-y-3 text-slate-200">
            <div className="text-sm sm:text-base font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Conclusion &amp; Overload Assessment:</span>
            </div>
            <div className="space-y-2 text-base sm:text-lg leading-relaxed">
              <p>
                <strong>1. Total Current:</strong> The combined appliances draw a total current of <strong className="font-mono text-emerald-300 text-lg sm:text-xl">12.3A</strong>.
              </p>
              <p>
                <strong>2. Overload Status:</strong> The total current (<strong>12.3A</strong>) is <strong>below</strong> the maximum rating of the socket, which is <strong>15A</strong> (<span className="font-mono text-emerald-300 font-bold">12.3A &lt; 15A</span>).
              </p>
              <p className="text-emerald-300 font-black pt-2 border-t border-emerald-500/40 text-base sm:text-xl">
                Therefore, the 15A socket will NOT overload and will operate safely under normal domestic standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Summary Comparison Table: 5A vs 15A */}
      <div className="p-6 sm:p-7 bg-slate-900 rounded-3xl border-2 border-slate-800 space-y-4 shadow-sm">
        <span className="text-sm sm:text-base font-black text-amber-400 uppercase tracking-wider block">
          Key Takeaway: 5A Lighting Socket vs 15A Power Socket Comparison
        </span>
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-inner">
          <table className="w-full text-left text-sm sm:text-base">
            <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 font-black uppercase text-xs sm:text-sm tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Socket Type</th>
                <th className="py-3.5 px-4">Rating</th>
                <th className="py-3.5 px-4">Total Load Current</th>
                <th className="py-3.5 px-4">Comparison</th>
                <th className="py-3.5 px-4">Overload Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200 font-mono text-sm sm:text-base">
              <tr>
                <td className="py-3.5 px-4 font-sans font-bold text-rose-300 text-base">Standard Domestic Socket</td>
                <td className="py-3.5 px-4 font-bold">5 A</td>
                <td className="py-3.5 px-4 font-bold">12.3 A</td>
                <td className="py-3.5 px-4 text-rose-400 font-black">12.3 A &gt; 5 A</td>
                <td className="py-3.5 px-4 text-rose-400 font-black text-base">SEVERELY OVERLOADS!</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-sans font-bold text-emerald-300 text-base">Heavy-Duty Power Socket</td>
                <td className="py-3.5 px-4 font-bold">15 A</td>
                <td className="py-3.5 px-4 font-bold">12.3 A</td>
                <td className="py-3.5 px-4 text-emerald-400 font-black">12.3 A &lt; 15 A</td>
                <td className="py-3.5 px-4 text-emerald-300 font-black text-base">SAFE (NO OVERLOAD)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2) EQUIVALENT RESISTANCE CIRCUITS (CASES A B C D)        */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === 'circuits') && (
        <div className="space-y-4">
          {activeSection === 'all' && (
            <div className="border-b-2 border-slate-800 pb-3 pt-6">
              <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  Section 2 of 3
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Public Exam Special Networks</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-cyan-400" />
                <span>2. Equivalent Resistance Circuits (Cases a, b, c, d)</span>
              </h2>
            </div>
          )}
          <EquivalentResistanceSection sourceCompartment="project-work" />
        </div>
      )}

      {/* ======================================================== */}
      {/* 3) KIRCHHOFFS LAWS (1ST & 2ND LAWS)                      */}
      {/* ======================================================== */}
      {(activeSection === 'all' || activeSection === 'kirchhoff_all' || activeSection === 'kirchhoff1' || activeSection === 'kirchhoff2') && (
        <div className="space-y-8">
          {activeSection === 'all' && (
            <div className="border-b-2 border-slate-800 pb-3 pt-6">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-wider mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  Section 3 of 3
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">Fundamental Conservation Laws</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-emerald-400" />
                <span>3. Kirchhoff&apos;s Laws (Junction Rule &amp; Loop Rule)</span>
              </h2>
            </div>
          )}

          {/* 3A. Kirchhoff's 1st Law (Junction Rule & Conservation of Charge) */}
          {(activeSection === 'all' || activeSection === 'kirchhoff_all' || activeSection === 'kirchhoff1') && (
            <KirchhoffsFirstLawSection />
          )}

          {/* 3B. Kirchhoff's 2nd Law (Loop Rule & Conservation of Energy) */}
          {(activeSection === 'all' || activeSection === 'kirchhoff_all' || activeSection === 'kirchhoff2') && (
            <KirchhoffsSecondLawSection />
          )}
        </div>
      )}
    </div>
  );
};
