import React, { useState } from 'react';
import { Table, Gauge, Lightbulb, ArrowUpRight, Info } from 'lucide-react';
import { ThreeDDeviceViewer, DeviceModelType } from '../ThreeDDeviceViewer';
import { Language } from '../../types';

interface ReferenceTablesSectionProps {
  searchQuery: string;
  language?: Language;
  onScrollToConcept?: (conceptId?: string) => void;
}

interface TermMasterRow {
  sNo: number;
  term: string;
  termTe?: string;
  symbol: string;
  formula: string;
  siUnit: string;
  mksUnit: string;
  unit: string;
  conceptId?: string;
  notes?: string;
}

interface MeasuringDeviceRow {
  sNo: number;
  term: string;
  device: string;
  connectionBadge: 'SERIES' | 'PARALLEL';
  connection: string;
  conceptId?: string;
}

interface DeviceCircuitSymbolRow {
  sNo: number;
  device: string;
  modelType: DeviceModelType;
  symbolName: string;
  notes: string;
  textNotation: string;
  conceptId?: string;
  renderSvg: () => React.ReactNode;
}

const MASTER_TERMS_TABLE: TermMasterRow[] = [
  {
    sNo: 1,
    term: 'Electric Charge',
    symbol: 'Q (or q)',
    formula: 'Q = I · t   or   Q = n · e',
    siUnit: 'coulomb (C)',
    mksUnit: 'ampere-second (A·s)',
    unit: 'coulomb (C) [1 C = 1 A·s; e = 1.6 × 10⁻¹⁹ C]',
    conceptId: 'charge',
    notes: 'Fundamental scalar property; 1 C contains 6.25 × 10¹⁸ electrons'
  },
  {
    sNo: 2,
    term: 'Electric Current',
    symbol: 'I',
    formula: 'I = Q / t   or   I = V / R',
    siUnit: 'ampere (A)',
    mksUnit: 'ampere (A) = C/s',
    unit: 'ampere (A) [Base SI & MKS unit; 1 A = 1 C/s]',
    conceptId: 'current',
    notes: 'Scalar quantity; rate of flow of electric charges from + to −'
  },
  {
    sNo: 3,
    term: 'Potential Difference (Voltage)',
    symbol: 'V',
    formula: 'V = W / Q   or   V = I · R',
    siUnit: 'volt (V)',
    mksUnit: 'joule/coulomb (J/C) = kg·m²/(A·s³)',
    unit: 'volt (V) [1 V = 1 J/C = 1 W/A = 1 kg·m²·s⁻³·A⁻¹]',
    conceptId: 'potential-difference',
    notes: 'Work done per unit positive charge moved between two points'
  },
  {
    sNo: 4,
    term: 'Electromotive Force (EMF)',
    symbol: 'ε (or EMF)',
    formula: 'EMF = W / Q   (Open circuit, I = 0)',
    siUnit: 'volt (V)',
    mksUnit: 'joule/coulomb (J/C) = kg·m²/(A·s³)',
    unit: 'volt (V) [1 V = 1 J/C; terminal voltage in open circuit]',
    conceptId: 'potential-difference',
    notes: 'Cause of electric current; maximum potential difference when I = 0'
  },
  {
    sNo: 5,
    term: 'Electric Resistance',
    symbol: 'R',
    formula: 'R = V / I = ρ · (l / A)',
    siUnit: 'ohm (Ω)',
    mksUnit: 'volt/ampere (V/A) = kg·m²/(A²·s³)',
    unit: 'ohm (Ω) [1 Ω = 1 V/A = 1 kg·m²·s⁻³·A⁻²]',
    conceptId: 'resistance',
    notes: 'Opposition to current flow; R = ρ × l / A in one line'
  },
  {
    sNo: 6,
    term: 'Specific Resistivity (Specific Resistance)',
    symbol: 'ρ (rho)',
    formula: 'ρ = (R · A) / l',
    siUnit: 'ohm-metre (Ω·m)',
    mksUnit: 'ohm-metre (Ω·m) = kg·m³/(A²·s³)',
    unit: 'ohm-metre (Ω·m) [1 Ω·m = (1 Ω × 1 m²)/1 m]',
    conceptId: 'resistivity',
    notes: 'Intrinsic material property; independent of wire length or thickness'
  },
  {
    sNo: 7,
    term: 'Electric Conductance',
    symbol: 'G',
    formula: 'G = 1 / R = I / V',
    siUnit: 'siemens (S)',
    mksUnit: 'ohm⁻¹ (Ω⁻¹ or mho) = A/V',
    unit: 'siemens (S) [1 S = 1 Ω⁻¹ = 1 A/V = 1 mho]',
    conceptId: 'resistance',
    notes: 'Reciprocal of electrical resistance; ease of current conduction'
  },
  {
    sNo: 8,
    term: 'Work Done / Electrical Energy',
    symbol: 'W (or E)',
    formula: 'E = W = V · Q = V · I · t = I² · R · t = (V²/R) · t = P · t',
    siUnit: 'joule (J)',
    mksUnit: 'newton-metre (N·m) = kg·m²/s² = W·s',
    unit: 'joule (J) [SI & MKS: 1 J = 1 N·m = 1 W·s = 1 kg·m²/s²]',
    conceptId: 'electrical-energy',
    notes: 'SI & MKS unit is Joule; 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ Joules (W·s)'
  },
  {
    sNo: 9,
    term: 'Electric Power',
    symbol: 'P',
    formula: 'P = W / t = V · I = I²R = V² / R',
    siUnit: 'watt (W)',
    mksUnit: 'joule/second (J/s) = kg·m²/s³ = V·A',
    unit: 'watt (W) [1 W = 1 J/s = 1 V·A = 1 kg·m²·s⁻³]',
    conceptId: 'power',
    notes: 'Starts with P = W / t; rate of doing electrical work'
  },
  {
    sNo: 10,
    term: 'Heat Energy (Joule Heating)',
    symbol: 'H',
    formula: 'H = I² · R · t = V · I · t = (V²/R) · t',
    siUnit: 'joule (J)',
    mksUnit: 'kg·m²/s² = newton-metre (N·m) = W·s',
    unit: 'joule (J) [1 calorie ≈ 4.184 J; 1 J ≈ 0.239 cal]',
    conceptId: 'joules-heating',
    notes: 'Thermal energy produced by electron collisions; Joule’s law of heating'
  },
  {
    sNo: 11,
    term: 'Series Equivalent Resistance',
    symbol: 'Rₛ',
    formula: 'Rₛ = R₁ + R₂ + R₃ + ... + Rₙ',
    siUnit: 'ohm (Ω)',
    mksUnit: 'volt/ampere (V/A) = kg·m²/(A²·s³)',
    unit: 'ohm (Ω) [Rₛ is greater than individual resistors]',
    conceptId: 'series-resistors',
    notes: 'Same current I flows through each resistor; Rₛ = R₁ + R₂ + ...'
  },
  {
    sNo: 12,
    term: 'Parallel Equivalent Resistance',
    symbol: 'Rₚ',
    formula: '1 / Rₚ = 1 / R₁ + 1 / R₂ + 1 / R₃',
    siUnit: 'ohm (Ω)',
    mksUnit: 'volt/ampere (V/A) = kg·m²/(A²·s³)',
    unit: 'ohm (Ω) [Rₚ is smaller than individual resistors]',
    conceptId: 'parallel-resistors',
    notes: 'Same voltage V across each branch; 1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃'
  },
  {
    sNo: 13,
    term: 'Commercial Unit of Electrical Energy',
    symbol: '1 kWh (1 Unit)',
    formula: 'E (kWh) = (Power in Watts × Hours) / 1000',
    siUnit: 'joule (J) [1 kWh = 3.6 × 10⁶ J]',
    mksUnit: 'watt-second (W·s) = 3.6 × 10⁶ kg·m²/s²',
    unit: 'kilowatt-hour (kWh) [1 kWh = 1 kW × 1 h = 1000 W × 3600 s = 3.6 × 10⁶ J]',
    conceptId: 'kwh',
    notes: 'Commercial billing unit; 1 Unit = 1 kWh = 3.6 × 10⁶ Joules (W·s)'
  },
  {
    sNo: 14,
    term: 'Elementary Charge of Electron',
    symbol: 'e (or e⁻)',
    formula: 'n = Q / e   (For Q = 1 C: n = 6.25 × 10¹⁸)',
    siUnit: 'coulomb (C)',
    mksUnit: 'ampere-second (A·s)',
    unit: 'coulomb (C) [Magnitude: e = 1.6 × 10⁻¹⁹ C = 1.6 × 10⁻¹⁹ A·s]',
    conceptId: 'charge',
    notes: 'Charge of 1 electron; smallest isolated charge in nature'
  }
];

const MEASURING_DEVICES_TABLE: MeasuringDeviceRow[] = [
  {
    sNo: 1,
    term: 'Electric Current',
    device: 'Ammeter',
    connectionBadge: 'SERIES',
    connection: 'Connected in Series',
    conceptId: 'current'
  },
  {
    sNo: 2,
    term: 'Electric Potential (Potential Difference)',
    device: 'Voltmeter',
    connectionBadge: 'PARALLEL',
    connection: 'Connected in Parallel',
    conceptId: 'potential-difference'
  },
  {
    sNo: 3,
    term: 'Electric Resistance',
    device: 'Ohmmeter',
    connectionBadge: 'PARALLEL',
    connection: 'Connected in Parallel',
    conceptId: 'resistance'
  }
];

const DEVICE_SYMBOLS_TABLE: DeviceCircuitSymbolRow[] = [
  {
    sNo: 1,
    device: 'An electric cell',
    modelType: 'cell',
    symbolName: 'Long thin line (+), short thick line (−)',
    notes: 'Single chemical cell providing 1.5 V potential difference. Long thin vertical line represents the positive terminal (+), and short thick vertical line represents the negative terminal (−).',
    textNotation: '—| ▌—',
    conceptId: 'potential-difference',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="20" y1="27" x2="95" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="20" cy="27" r="3" fill="#ef4444" />
        {/* Long thin positive plate (+) */}
        <line x1="95" y1="10" x2="95" y2="44" stroke="#f8fafc" strokeWidth="2" />
        <text x="82" y="20" fill="#ef4444" fontSize="12" fontWeight="bold">+</text>
        {/* Short thick negative plate (−) */}
        <line x1="118" y1="17" x2="118" y2="37" stroke="#f8fafc" strokeWidth="5" />
        <text x="132" y="20" fill="#38bdf8" fontSize="14" fontWeight="bold">−</text>
        {/* Right wire */}
        <line x1="118" y1="27" x2="200" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="200" cy="27" r="3" fill="#38bdf8" />
      </svg>
    )
  },
  {
    sNo: 2,
    device: 'A battery or a combination of cells',
    modelType: 'battery',
    symbolName: 'Combination of cells connected in series',
    notes: 'Two or more cells joined in series (positive plate of one connected to negative plate of next). Provides higher potential difference (e.g. 4.5 V or 6 V) for driving circuit current.',
    textNotation: '—| ▌ | ▌ | ▌—',
    conceptId: 'potential-difference',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="15" y1="27" x2="52" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="15" cy="27" r="3" fill="#ef4444" />
        {/* Cell 1: Long thin (+), short thick */}
        <text x="42" y="19" fill="#ef4444" fontSize="11" fontWeight="bold">+</text>
        <line x1="52" y1="11" x2="52" y2="43" stroke="#f8fafc" strokeWidth="2" />
        <line x1="72" y1="18" x2="72" y2="36" stroke="#f8fafc" strokeWidth="4.5" />
        {/* Connecting wire between cell 1 and 2 */}
        <line x1="72" y1="27" x2="98" y2="27" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Cell 2: Long thin, short thick */}
        <line x1="98" y1="11" x2="98" y2="43" stroke="#f8fafc" strokeWidth="2" />
        <line x1="118" y1="18" x2="118" y2="36" stroke="#f8fafc" strokeWidth="4.5" />
        {/* Connecting wire between cell 2 and 3 */}
        <line x1="118" y1="27" x2="144" y2="27" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Cell 3: Long thin, short thick (-) */}
        <line x1="144" y1="11" x2="144" y2="43" stroke="#f8fafc" strokeWidth="2" />
        <line x1="164" y1="18" x2="164" y2="36" stroke="#f8fafc" strokeWidth="4.5" />
        <text x="174" y="19" fill="#38bdf8" fontSize="13" fontWeight="bold">−</text>
        {/* Right wire */}
        <line x1="164" y1="27" x2="205" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="205" cy="27" r="3" fill="#38bdf8" />
      </svg>
    )
  },
  {
    sNo: 3,
    device: 'Plug key or switch (open)',
    modelType: 'plug_key_open',
    symbolName: 'Parentheses with empty space inside',
    notes: 'Laboratory switch in the open position (brass plug removed). There is a gap between terminals, so circuit is broken and no current flows.',
    textNotation: '—(   )—',
    conceptId: 'current',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="20" y1="27" x2="80" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="20" cy="27" r="3" fill="#38bdf8" />
        {/* Left curved bracket */}
        <path d="M80 14 C73 19, 73 35, 80 40" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Empty gap in center */}
        <text x="110" y="47" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="middle">OPEN (NO DOT)</text>
        {/* Right curved bracket */}
        <path d="M140 14 C147 19, 147 35, 140 40" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right wire */}
        <line x1="140" y1="27" x2="200" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="200" cy="27" r="3" fill="#38bdf8" />
      </svg>
    )
  },
  {
    sNo: 4,
    device: 'Plug key or switch (closed)',
    modelType: 'plug_key_closed',
    symbolName: 'Parentheses with solid dot inside (•)',
    notes: 'Laboratory switch in the closed position (brass plug inserted). The central dot (•) indicates metallic continuity bridging the gap, allowing current to flow continuously.',
    textNotation: '—( • )—',
    conceptId: 'current',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="20" y1="27" x2="80" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="20" cy="27" r="3" fill="#10b981" />
        {/* Left curved bracket */}
        <path d="M80 14 C73 19, 73 35, 80 40" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Central solid dot (•) */}
        <circle cx="110" cy="27" r="5" fill="#10b981" />
        <text x="110" y="47" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">CLOSED (DOT •)</text>
        {/* Right curved bracket */}
        <path d="M140 14 C147 19, 147 35, 140 40" fill="none" stroke="#f8fafc" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right wire */}
        <line x1="140" y1="27" x2="200" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="200" cy="27" r="3" fill="#10b981" />
      </svg>
    )
  },
  {
    sNo: 5,
    device: 'A wire joint',
    modelType: 'wire_joint',
    symbolName: 'T-intersection with solid black junction dot',
    notes: 'A solid junction where two or more wires are physically and electrically spliced together. The solid dot indicates that electric current branches or merges at this point.',
    textNotation: '—•— (with vertical line)',
    conceptId: 'parallel-resistors',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Horizontal wire */}
        <line x1="20" y1="36" x2="200" y2="36" stroke="#f8fafc" strokeWidth="2.5" />
        <circle cx="20" cy="36" r="3" fill="#38bdf8" />
        <circle cx="200" cy="36" r="3" fill="#38bdf8" />
        {/* Vertical wire meeting from top */}
        <line x1="110" y1="8" x2="110" y2="36" stroke="#f8fafc" strokeWidth="2.5" />
        <circle cx="110" cy="8" r="3" fill="#38bdf8" />
        {/* Prominent solid junction dot */}
        <circle cx="110" cy="36" r="6" fill="#f59e0b" />
        <text x="145" y="22" fill="#f59e0b" fontSize="10" fontWeight="bold">Joint Dot •</text>
      </svg>
    )
  },
  {
    sNo: 6,
    device: 'Wires crossing without joining',
    modelType: 'wire_crossing',
    symbolName: 'Vertical wire looping over horizontal wire with arch',
    notes: 'One insulated conductor bridges or leaps over another without electrical contact. No junction dot is drawn, showing that the two circuits remain completely independent.',
    textNotation: '—⌒— (No connection)',
    conceptId: 'series-resistors',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Continuous horizontal line */}
        <line x1="20" y1="32" x2="200" y2="32" stroke="#f8fafc" strokeWidth="2.5" />
        <circle cx="20" cy="32" r="3" fill="#ef4444" />
        <circle cx="200" cy="32" r="3" fill="#ef4444" />
        {/* Vertical line coming down from top */}
        <line x1="110" y1="6" x2="110" y2="20" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Semicircular jumping bridge arch over horizontal wire */}
        <path d="M110 20 C124 20, 124 44, 110 44" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
        {/* Vertical line continuing straight down below arch */}
        <line x1="110" y1="44" x2="110" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
        <circle cx="110" cy="6" r="3" fill="#38bdf8" />
        <circle cx="110" cy="50" r="3" fill="#38bdf8" />
        <text x="145" y="20" fill="#38bdf8" fontSize="9" fontWeight="bold">Bridge Arch</text>
      </svg>
    )
  },
  {
    sNo: 7,
    device: 'Electric bulb',
    modelType: 'bulb',
    symbolName: 'Curled tungsten filament loop / bulb with dome',
    notes: 'Standard schematic representation of an incandescent lamp or torch bulb. Shows the curled tungsten filament loop enclosed in a circular glass globe.',
    textNotation: '—( ∿ )— or —∿—',
    conceptId: 'power',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="15" y1="27" x2="80" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="15" cy="27" r="3" fill="#38bdf8" />
        {/* Right wire */}
        <line x1="140" y1="27" x2="205" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="205" cy="27" r="3" fill="#38bdf8" />
        {/* Bulb Circle Envelope */}
        <circle cx="110" cy="27" r="18" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
        {/* Curly filament loop: official NCERT pattern */}
        <path d="M98 27 Q104 12 110 12 Q116 12 122 27" fill="none" stroke="#fde047" strokeWidth="2.5" strokeLinecap="round" />
        {/* Radial light emission dashes */}
        <line x1="110" y1="4" x2="110" y2="1" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="126" y1="11" x2="128" y2="9" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="94" y1="11" x2="92" y2="9" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    sNo: 8,
    device: 'A resistor of resistance R',
    modelType: 'resistor',
    symbolName: 'Regular sharp zigzag resistance line',
    notes: 'A component with a fixed electrical resistance (R) that opposes the flow of electric charges. Represented by a uniform sharp zigzag path symbolizing electrical friction.',
    textNotation: '—/\\/\\/\\/\\—',
    conceptId: 'resistance',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left lead wire */}
        <line x1="15" y1="27" x2="55" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="15" cy="27" r="3" fill="#38bdf8" />
        {/* Uniform sharp zigzag line */}
        <path d="M55 27 L63 15 L75 39 L87 15 L99 39 L111 15 L123 39 L135 15 L147 39 L155 27 L165 27" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right lead wire */}
        <line x1="165" y1="27" x2="205" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="205" cy="27" r="3" fill="#38bdf8" />
        <text x="110" y="10" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">Resistance R</text>
      </svg>
    )
  },
  {
    sNo: 9,
    device: 'Variable resistance or rheostat',
    modelType: 'rheostat',
    symbolName: 'Resistor with diagonal arrow or top slider contact arrow',
    notes: 'A variable resistor used in laboratories to regulate current without changing voltage from the source. The textbook shows two equivalent symbols: a diagonal arrow across the zigzag, or a top arrow pointing to the coil.',
    textNotation: '—/\\/\\/↗— or with top arrow',
    conceptId: 'ohms-law',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left symbol: Diagonal Arrow */}
        <g transform="translate(0, 0)">
          <line x1="10" y1="27" x2="28" y2="27" stroke="#94a3b8" strokeWidth="2" />
          <path d="M28 27 L33 18 L41 36 L49 18 L57 36 L65 18 L73 36 L78 27 L88 27" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="36" y1="42" x2="74" y2="10" stroke="#f59e0b" strokeWidth="2.2" />
          <polygon points="74,10 64,13 68,19" fill="#f59e0b" />
          <line x1="88" y1="27" x2="98" y2="27" stroke="#94a3b8" strokeWidth="2" />
        </g>
        {/* "or" text */}
        <text x="110" y="30" fill="#94a3b8" fontSize="10" fontStyle="italic" fontWeight="bold" textAnchor="middle">or</text>
        {/* Right symbol: Top contact slider arrow */}
        <g transform="translate(112, 0)">
          <line x1="10" y1="27" x2="28" y2="27" stroke="#94a3b8" strokeWidth="2" />
          <path d="M28 27 L34 18 L44 36 L54 18 L64 36 L74 18 L84 36 L90 27 L98 27" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Top slider arrow */}
          <line x1="59" y1="7" x2="88" y2="7" stroke="#f59e0b" strokeWidth="2" />
          <line x1="59" y1="7" x2="59" y2="17" stroke="#f59e0b" strokeWidth="2" />
          <polygon points="59,20 56,15 62,15" fill="#f59e0b" />
          <line x1="90" y1="27" x2="100" y2="27" stroke="#94a3b8" strokeWidth="2" />
        </g>
      </svg>
    )
  },
  {
    sNo: 10,
    device: 'Ammeter',
    modelType: 'ammeter',
    symbolName: 'Circle with bold letter "A" and polarity (+ / −)',
    notes: 'Instrument used to measure electric current in a circuit. Always connected in SERIES because it has extremely low resistance ($R \\approx 0$), ensuring negligible drop in circuit current.',
    textNotation: '—(+)—( A )—(−)—',
    conceptId: 'ampere',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="15" y1="27" x2="85" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="15" cy="27" r="3" fill="#ef4444" />
        <text x="65" y="20" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
        {/* Ammeter Circle */}
        <circle cx="110" cy="27" r="21" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" />
        <text x="110" y="34" fill="#38bdf8" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">A</text>
        {/* Right wire */}
        <line x1="135" y1="27" x2="205" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="205" cy="27" r="3" fill="#38bdf8" />
        <text x="155" y="20" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">−</text>
      </svg>
    )
  },
  {
    sNo: 11,
    device: 'Voltmeter',
    modelType: 'voltmeter',
    symbolName: 'Circle with bold letter "V" and polarity (+ / −)',
    notes: 'Instrument used to measure electric potential difference across two points. Always connected in PARALLEL because it has extremely high resistance ($R \\approx \\infty$) to avoid drawing branch current.',
    textNotation: '—(+)—( V )—(−)—',
    conceptId: 'volt',
    renderSvg: () => (
      <svg viewBox="0 0 220 54" className="w-52 sm:w-56 h-13" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="54" rx="6" fill="#090d16" stroke="#1e293b" />
        {/* Left wire */}
        <line x1="15" y1="27" x2="85" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="15" cy="27" r="3" fill="#ef4444" />
        <text x="65" y="20" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">+</text>
        {/* Voltmeter Circle */}
        <circle cx="110" cy="27" r="21" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
        <text x="110" y="34" fill="#c084fc" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">V</text>
        {/* Right wire */}
        <line x1="135" y1="27" x2="205" y2="27" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="205" cy="27" r="3" fill="#38bdf8" />
        <text x="155" y="20" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">−</text>
      </svg>
    )
  }
];

export const ReferenceTablesSection: React.FC<ReferenceTablesSectionProps> = ({
  searchQuery,
  language = 'en',
  onScrollToConcept
}) => {
  const isTe = language === 'te';
  const [activeTableTab, setActiveTableTab] = useState<'all' | 'formulas' | 'devices' | 'symbols'>('all');

  const filteredTableRows = MASTER_TERMS_TABLE.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.term.toLowerCase().includes(q) ||
      (row.termTe && row.termTe.toLowerCase().includes(q)) ||
      row.symbol.toLowerCase().includes(q) ||
      row.formula.toLowerCase().includes(q) ||
      row.unit.toLowerCase().includes(q) ||
      row.siUnit.toLowerCase().includes(q) ||
      row.mksUnit.toLowerCase().includes(q) ||
      (row.notes && row.notes.toLowerCase().includes(q))
    );
  });

  const filteredDeviceRows = MEASURING_DEVICES_TABLE.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.term.toLowerCase().includes(q) ||
      row.device.toLowerCase().includes(q) ||
      row.connection.toLowerCase().includes(q)
    );
  });

  const filteredSymbolRows = DEVICE_SYMBOLS_TABLE.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.device.toLowerCase().includes(q) ||
      row.symbolName.toLowerCase().includes(q) ||
      row.notes.toLowerCase().includes(q) ||
      row.textNotation.toLowerCase().includes(q)
    );
  });

  return (
    <div id="reference-tables" className="space-y-6 pt-6 border-t-2 border-slate-800">
      {/* SECTION TITLE & BADGE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
            <Table className="w-3.5 h-3.5" />
            <span>{isTe ? 'సారాంశం & సూచనల పట్టికలు' : 'SUMMARY & REFERENCE COMPENDIUM'}</span>
            <span aria-hidden="true">·</span>
            <span>{isTe ? 'AP SSC 10వ తరగతి' : 'AP SSC CLASS 10'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {isTe
              ? 'సూచనల పట్టికలు: సూత్రాలు, కొలిచే సాధనాలు & వలయ సంకేతాలు'
              : 'Reference Tables: Formulas, Devices & Circuit Symbols'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isTe
              ? 'పరీక్షల పునశ్చరణ కోసం సిద్ధం చేసిన సమగ్ర సూత్రాలు, ప్రమాణాలు, కొలిచే సాధనాలు మరియు వలయ సంకేతాల పట్టిక.'
              : 'Quick reference compendium organized below the definitions for fast revision and exam preparation.'}
          </p>
        </div>

        {/* TABLE SELECTOR TABS */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTableTab('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTableTab === 'all'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {isTe ? '📑 అన్ని పట్టికలు (3)' : '📑 All Tables (3)'}
          </button>
          <button
            onClick={() => setActiveTableTab('formulas')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTableTab === 'formulas'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {isTe ? '📊 1. సూత్రాలు & ప్రమాణాలు' : '📊 1. Formulas & Units'}
          </button>
          <button
            onClick={() => setActiveTableTab('devices')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTableTab === 'devices'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {isTe ? '🔌 2. కొలిచే సాధనాలు' : '🔌 2. Measuring Devices'}
          </button>
          <button
            onClick={() => setActiveTableTab('symbols')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTableTab === 'symbols'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            {isTe ? '💡 3. వలయ సంకేతాలు' : '💡 3. Device Circuit Symbols'}
          </button>
        </div>
      </div>

      {/* TABLE 1: MASTER SUMMARY TABLE (Formulas, Symbols & Units) */}
      {(activeTableTab === 'all' || activeTableTab === 'formulas') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                <Table className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {isTe
                    ? '1. ప్రధాన పట్టిక: భౌతిక రాశులు, సంకేతాలు, సూత్రాలు & SI, MKS ప్రమాణాలు'
                    : '1. Master Reference Table: Physical Terms, Symbols, Formulas & Units'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isTe
                    ? 'ప్రామాణిక గణిత సమీకరణాలు, సంకేతాలు మరియు ప్రమాణాలు (పని/శక్తి వరుస సామర్థ్యానికి పైన).'
                    : 'Standard equations, symbols, and SI units with order of work done above power.'}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700 whitespace-nowrap self-start sm:self-auto font-medium">
              {isTe ? 'MKS / SI పద్ధతి' : 'MKS / SI System'}
            </span>
          </div>

          {/* Table container with horizontal scroll for mobile safety */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 shadow-inner">
            <table className="w-full text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900 border-b-2 border-slate-800 text-slate-200 font-bold uppercase text-xs sm:text-sm tracking-wide">
                  <th className="py-4 px-4 w-16 text-center">{isTe ? '1) క్ర.సం.' : '1) S.No'}</th>
                  <th className="py-4 px-5 min-w-[280px]">{isTe ? '2) భౌతిక రాశి (SI & MKS ప్రమాణాలు)' : '2) Physical Term / Quantity (SI & MKS Units)'}</th>
                  <th className="py-4 px-4 min-w-[120px] text-slate-200">{isTe ? '3) సంకేతం' : '3) Symbol'}</th>
                  <th className="py-4 px-5 min-w-[390px] text-slate-200">{isTe ? '4) సూత్రం' : '4) Formula'}</th>
                  <th className="py-4 px-5 min-w-[320px] text-slate-200">{isTe ? '5) SI & MKS ప్రమాణాలు & సమానతలు' : '5) SI & MKS Units & Equivalences'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTableRows.map((row) => (
                  <tr
                    key={row.sNo}
                    onClick={() => onScrollToConcept?.(row.conceptId)}
                    className="hover:bg-slate-900/70 transition-colors cursor-pointer group"
                    title="Click to jump to detailed explanation card above"
                  >
                    {/* Column 1: S.No */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-300 text-sm sm:text-base group-hover:text-white align-top">
                      {row.sNo}
                    </td>

                    {/* Column 2: Terms (Colorless neutral badges) */}
                    <td className="py-4 px-5 font-semibold text-white align-top">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">{row.term}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>

                      {/* MKS and SI Units attached to the physical term with no colors */}
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-md shadow-xs">
                          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-sans font-bold">SI:</span>
                          <span className="text-white font-semibold">{row.siUnit}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-md shadow-xs">
                          <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-sans font-bold">MKS:</span>
                          <span className="text-white font-semibold">{row.mksUnit}</span>
                        </span>
                      </div>

                      {row.notes && (
                        <span className="text-xs sm:text-sm text-slate-300 font-normal block mt-1.5 leading-relaxed">
                          {row.notes}
                        </span>
                      )}
                    </td>

                    {/* Column 3: Symbols (Colorless) */}
                    <td className="py-4 px-4 font-mono font-extrabold text-white text-base sm:text-lg align-top whitespace-nowrap">
                      {row.symbol}
                    </td>

                    {/* Column 4: Formulas (Colorless box and text) */}
                    <td className="py-4 px-5 whitespace-nowrap align-top">
                      <span className="inline-block py-2 px-3.5 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono font-bold text-sm sm:text-base md:text-lg tracking-wide shadow-xs whitespace-nowrap">
                        {row.formula}
                      </span>
                    </td>

                    {/* Column 5: SI & MKS Units Breakdown & Equivalences (Colorless boxes and text) */}
                    <td className="py-4 px-5 align-top">
                      <div className="space-y-2 min-w-[280px]">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                            SI Unit
                          </span>
                          <span className="font-mono font-bold text-white text-sm sm:text-base">
                            {row.siUnit}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded">
                            MKS Unit
                          </span>
                          <span className="font-mono font-bold text-white text-sm sm:text-base">
                            {row.mksUnit}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm font-mono text-slate-200 bg-slate-900 border border-slate-800 rounded-md p-2.5 leading-relaxed">
                          {row.unit}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span>💡 Tip: Click any row to scroll up to its detailed definition card.</span>
            <span>Showing {filteredTableRows.length} of {MASTER_TERMS_TABLE.length} terms</span>
          </div>
        </div>
      )}

      {/* TABLE 2: MEASURING DEVICES & CIRCUIT CONNECTIONS */}
      {(activeTableTab === 'all' || activeTableTab === 'devices') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  2. Electrical Measuring Devices & Circuit Connections
                </h3>
                <p className="text-xs text-slate-400">
                  AP SSC Board Exam Guide: Ammeter, Voltmeter, Ohmmeter and circuit connections.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-md border border-cyan-500/30 whitespace-nowrap self-start sm:self-auto">
              Circuit Connections Guide
            </span>
          </div>

          {/* Table container with horizontal scroll for mobile */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-3.5 w-14 text-center">1) S.No</th>
                  <th className="py-3.5 px-4 min-w-[200px]">2) Term / Quantity</th>
                  <th className="py-3.5 px-4 min-w-[180px] text-amber-400">3) Device Used to Measure</th>
                  <th className="py-3.5 px-4 min-w-[240px] text-cyan-300">4) How Connected in Circuit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredDeviceRows.map((row) => (
                  <tr
                    key={row.sNo}
                    onClick={() => onScrollToConcept?.(row.conceptId)}
                    className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                    title="Click to jump to detailed explanation card above"
                  >
                    {/* S.No */}
                    <td className="py-3.5 px-3.5 text-center font-mono font-bold text-slate-400 group-hover:text-cyan-400">
                      {row.sNo}
                    </td>

                    {/* Column 1: Term */}
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{row.term}</span>
                        <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </td>

                    {/* Column 2: Device Used to Measure */}
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-amber-300 text-sm sm:text-base tracking-wide">
                        {row.device}
                      </span>
                    </td>

                    {/* Column 3: How Connected in Circuit */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`inline-block py-1 px-2.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${
                            row.connectionBadge === 'SERIES'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}
                        >
                          {row.connectionBadge}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-200 font-medium">
                          {row.connection}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Exam takeaway callout */}
          <div className="mt-4 p-3.5 bg-cyan-950/20 border border-cyan-800/30 rounded-xl flex items-start gap-2.5 text-xs text-cyan-200">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300">Golden AP SSC Rule: </strong>
              An <strong>Ammeter</strong> is connected in <strong>SERIES</strong> because current is same everywhere in a series circuit and its resistance is low ($R \approx 0$). A <strong>Voltmeter</strong> is connected in <strong>PARALLEL</strong> because voltage drop is measured across two terminals and its resistance is high ($R \approx \infty$).
            </div>
          </div>
        </div>
      )}

      {/* TABLE 3: ELECTRICAL DEVICES & CIRCUIT SYMBOLS */}
      {(activeTableTab === 'all' || activeTableTab === 'symbols') && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  3. Symbols of Commonly Used Circuit Components & 3D Laboratory Appliances
                </h3>
                <p className="text-xs text-slate-400">
                  All 11 official textbook components (Table 11.1) with exact schematic circuit symbols and interactive 3D laboratory models.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-500/30 whitespace-nowrap self-start sm:self-auto">
              11 Official Textbook Symbols & 3D Models
            </span>
          </div>

          {/* Table container with horizontal scroll for mobile */}
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-300 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-3.5 w-14 text-center">Sl. No.</th>
                  <th className="py-3.5 px-4 min-w-[170px]">Components</th>
                  <th className="py-3.5 px-4 min-w-[220px] text-amber-400">Symbols</th>
                  <th className="py-3.5 px-4 min-w-[220px] text-cyan-300">Laboratory 3D Physical Model</th>
                  <th className="py-3.5 px-4 min-w-[240px] text-slate-400">Function & Laboratory Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredSymbolRows.map((row) => (
                  <tr
                    key={row.sNo}
                    onClick={() => onScrollToConcept?.(row.conceptId)}
                    className="hover:bg-slate-900/60 transition-colors cursor-pointer group"
                    title="Click to jump to related topic card above"
                  >
                    {/* S.No */}
                    <td className="py-3 px-3.5 text-center font-mono font-bold text-slate-400 group-hover:text-amber-400">
                      {row.sNo}
                    </td>

                    {/* Column 1: Device */}
                    <td className="py-3 px-4 font-semibold text-white">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm sm:text-base font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors">
                          {row.device}
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {row.symbolName}
                      </span>
                    </td>

                    {/* Column 2: Symbol */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        {/* High-definition SVG Circuit Symbol */}
                        <div className="rounded-lg overflow-hidden border border-slate-800 shadow-xs">
                          {row.renderSvg()}
                        </div>
                        <span className="text-[10px] font-mono font-bold text-amber-300/90 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800">
                          {row.textNotation}
                        </span>
                      </div>
                    </td>

                    {/* Column 3: Real 3D Physical Model */}
                    <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="w-48 sm:w-52 h-36">
                        <ThreeDDeviceViewer type={row.modelType} />
                      </div>
                    </td>

                    {/* Function / Exam Note */}
                    <td className="py-3 px-4 text-xs text-slate-300 leading-relaxed">
                      {row.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick symbol drawing tip callout */}
          <div className="mt-4 p-3.5 bg-amber-950/20 border border-amber-800/30 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300">AP SSC Exam Circuit Rule: </strong>
              Always remember to connect the <strong>Ammeter in series</strong>, the <strong>Voltmeter in parallel</strong>, and insert the <strong>Fuse on the live wire in series</strong> before sensitive appliances!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
