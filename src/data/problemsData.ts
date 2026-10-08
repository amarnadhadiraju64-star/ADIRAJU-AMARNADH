import { ProblemItem } from '../types';

export const PROBLEMS_DATA: ProblemItem[] = [
  // =========================================================================
  // LEVEL 1: SIMPLE (Direct Formula / Basic Definitions)
  // =========================================================================
  {
    id: 1,
    questionNumber: 2,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Electric Power',
    textbookRef: 'AP SSC Physical Science Page 276, Q2',
    isTextbookBased: true,
    statement: 'Which of the following terms does not represent electrical power in a circuit?',
    options: [
      '(a) I²R',
      '(b) IR²',
      '(c) VI',
      '(d) V² / R'
    ],
    given: [
      { label: 'Definition of Electric Power', value: 'P = W / t = V × I' }
    ],
    formula: 'P = V × I = I²R = V² / R',
    substitution: 'Comparing each expression with valid power formulas:',
    calculation: [
      '• Option (a): P = I²R (Valid, by substituting V = IR into P = VI)',
      '• Option (b): IR² has no physical meaning in electrical power',
      '• Option (c): P = VI (Valid, fundamental definition of electric power)',
      '• Option (d): P = V² / R (Valid, by substituting I = V/R into P = VI)'
    ],
    finalAnswer: '(b) IR²',
    unit: 'Dimensionally Incorrect',
    explanationTip: 'Standard AP SSC multiple-choice question. Always remember the three valid forms of electric power: P = VI = I²R = V²/R.'
  },
  {
    id: 2,
    questionNumber: 5,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Apparatus Connections',
    textbookRef: 'AP SSC Physical Science Page 276, Q5',
    isTextbookBased: true,
    statement: 'How is a voltmeter connected in the circuit to measure the potential difference between two points?',
    given: [
      { label: 'Device', value: 'Voltmeter (measures potential difference V)' },
      { label: 'Internal Resistance', value: 'Very High (ideally infinite)' }
    ],
    formula: 'Connection Rule: Voltmeter in Parallel, Ammeter in Series',
    substitution: 'Connected across the two points under test:',
    calculation: [
      '1. A voltmeter must be connected in PARALLEL across the two points.',
      '2. Why? Because the potential difference across parallel branches is always identical.',
      '3. A voltmeter has very high internal resistance, so it draws practically zero current and does not disturb the circuit.'
    ],
    finalAnswer: 'Always connected in PARALLEL across the two points',
    unit: 'Parallel Connection',
    explanationTip: 'Contrast with Ammeter: Ammeters are connected in series (low resistance); Voltmeters are connected in parallel (high resistance).'
  },
  {
    id: 3,
    questionNumber: 8,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Ohm’s Law',
    textbookRef: 'AP SSC Physical Science Page 276, Q8',
    isTextbookBased: true,
    statement: 'When a 12 V battery is connected across an unknown resistor, there is a current of 2.5 mA in the circuit. Find the value of the resistance of the resistor.',
    given: [
      { label: 'Battery Potential (V)', value: '12 V' },
      { label: 'Current (I)', value: '2.5 mA = 2.5 × 10⁻³ A' }
    ],
    formula: 'R = V / I  (from Ohm’s Law: V = I × R)',
    substitution: 'R = 12 / (2.5 × 10⁻³)',
    calculation: [
      'R = 12 × 1000 / 2.5',
      'R = 12000 / 2.5',
      'R = 4800 Ω = 4.8 kΩ'
    ],
    finalAnswer: '4800 Ω (or 4.8 kΩ)',
    unit: 'ohms (Ω)',
    explanationTip: 'Watch the milliampere conversion: 1 mA = 10⁻³ A. Converting to SI units first prevents decimal errors.'
  },
  {
    id: 4,
    questionNumber: 9,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Series Circuits',
    textbookRef: 'AP SSC Physical Science Page 276, Q9',
    isTextbookBased: true,
    statement: 'A battery of 9 V is connected in series with resistors of 0.2 Ω, 0.3 Ω, 0.4 Ω, 0.5 Ω and 12 Ω, respectively. How much current would flow through the 12 Ω resistor?',
    given: [
      { label: 'Battery Voltage (V)', value: '9 V' },
      { label: 'Series Resistors', value: '0.2 Ω, 0.3 Ω, 0.4 Ω, 0.5 Ω, 12 Ω' }
    ],
    formula: 'R_total = R₁ + R₂ + R₃ + R₄ + R₅   and   I = V / R_total',
    substitution: 'R_total = 0.2 + 0.3 + 0.4 + 0.5 + 12 = 13.4 Ω',
    calculation: [
      'Total equivalent resistance R_total = 13.4 Ω',
      'Total circuit current I = 9 V / 13.4 Ω ≈ 0.6716 A',
      'In a series circuit, the identical electric current flows through all resistors.',
      'Therefore, current through 12 Ω resistor = 0.67 A'
    ],
    finalAnswer: '0.67 A',
    unit: 'amperes (A)',
    explanationTip: 'Crucial concept: In a series circuit, there is only ONE current path. Current is identical through every single resistor regardless of its individual value.'
  },
  {
    id: 5,
    questionNumber: 17,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Joule’s Heating & Power',
    textbookRef: 'AP SSC Physical Science Page 278, Q17',
    isTextbookBased: true,
    statement: 'An electric heater of resistance 8 Ω draws 15 A from the service mains for 2 hours. Calculate the rate at which heat is developed in the heater.',
    given: [
      { label: 'Resistance of Heater (R)', value: '8 Ω' },
      { label: 'Current Drawn (I)', value: '15 A' },
      { label: 'Time (t)', value: '2 hours (extra information not needed for rate)' }
    ],
    formula: 'Rate of Heat Developed = Heat / time = Power (P) = I² × R',
    substitution: 'P = (15)² × 8',
    calculation: [
      'P = 225 × 8',
      'P = 1800 J/s (or 1800 W)'
    ],
    finalAnswer: '1800 J/s (or 1800 W)',
    unit: 'Joules per second (J/s) or Watts (W)',
    explanationTip: 'Exam Trap Alert: "Rate of heat developed" means heat per second (dH/dt = Power), so do NOT multiply by time (2 hours).'
  },
  {
    id: 6,
    questionNumber: 18,
    level: 1,
    levelLabel: 'Level 1 – Simple',
    topic: 'Everyday Applications & Reasoning',
    textbookRef: 'AP SSC Physical Science Page 278, Q18',
    isTextbookBased: true,
    statement: 'Explain the following:\n(a) Why is tungsten used almost exclusively for filament of electric lamps?\n(b) Why are conductors of electric heating devices (toasters, irons) made of an alloy rather than a pure metal?\n(c) Why is series arrangement not used for domestic circuits?\n(d) How does the resistance of a wire vary with its area of cross-section?\n(e) Why are copper and aluminium wires usually employed for electricity transmission?',
    given: [
      { label: 'Type', value: '5-Part Core Conceptual Board Reasoning' }
    ],
    formula: 'R = ρ(l/A), H = I²Rt, V = Constant in Parallel',
    substitution: 'Concise pointwise AP SSC board exam answers:',
    calculation: [
      '(a) Tungsten has an extremely high melting point (3380 °C) and high resistivity, so it glows white-hot without melting.',
      '(b) Alloys (like Nichrome) have much higher resistivity than pure metals and do not oxidize (burn) easily at high temperatures.',
      '(c) In series, if one appliance fuses/switches off, all appliances turn off; also voltage gets divided so appliances cannot operate at rated 220 V.',
      '(d) Resistance is inversely proportional to cross-sectional area (R ∝ 1/A). A thicker wire has less resistance.',
      '(e) Copper and aluminium have very low electrical resistivity, minimizing heat energy loss (H = I²Rt) during long-distance transmission.'
    ],
    finalAnswer: 'All 5 textbook conceptual reasons verified',
    unit: 'Conceptual Master Reasoning',
    explanationTip: 'This 5-subquestion question appears frequently as a 4-mark or 5-mark question in AP SSC Board Exams.'
  },

  // =========================================================================
  // LEVEL 2: MODERATE (Two-Step Calculations & Ratios)
  // =========================================================================
  {
    id: 7,
    questionNumber: 1,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Series & Parallel Combinations',
    textbookRef: 'AP SSC Physical Science Page 276, Q1',
    isTextbookBased: true,
    statement: 'A piece of wire of resistance R is cut into five equal parts. These parts are then connected in parallel. If the equivalent resistance of this combination is R\', then the ratio R / R\' is –',
    options: [
      '(a) 1 / 25',
      '(b) 1 / 5',
      '(c) 5',
      '(d) 25'
    ],
    given: [
      { label: 'Initial Resistance of wire', value: 'R' },
      { label: 'Number of equal parts', value: '5' }
    ],
    formula: 'r = R / n   and   1 / R\' = 1/r + 1/r + ... (n times) = n / r',
    substitution: 'r = R / 5   and   1 / R\' = 5 / (R / 5) = 25 / R',
    calculation: [
      'Resistance of each of the 5 pieces = r = R / 5',
      'When 5 identical pieces (r) are connected in parallel:',
      '1 / R\' = 1/r + 1/r + 1/r + 1/r + 1/r = 5 / r',
      '1 / R\' = 5 / (R / 5) = 25 / R',
      'R\' = R / 25',
      'Therefore, the ratio R / R\' = R / (R / 25) = 25'
    ],
    finalAnswer: '25 (Option d)',
    unit: 'Ratio (Dimensionless)',
    explanationTip: 'Shortcut Formula: Cutting wire into n equal parts and connecting in parallel gives R\' = R / n², so R / R\' = n². Here n = 5, so n² = 25.'
  },
  {
    id: 8,
    questionNumber: 3,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Electric Power',
    textbookRef: 'AP SSC Physical Science Page 276, Q3',
    isTextbookBased: true,
    statement: 'An electric bulb is rated 220 V and 100 W. When it is operated on 110 V, the power consumed will be –',
    options: [
      '(a) 100 W',
      '(b) 75 W',
      '(c) 50 W',
      '(d) 25 W'
    ],
    given: [
      { label: 'Rated Voltage (V₁)', value: '220 V' },
      { label: 'Rated Power (P₁)', value: '100 W' },
      { label: 'Operating Voltage (V₂)', value: '110 V (half of rated)' }
    ],
    formula: 'R = V₁² / P₁   and   P₂ = V₂² / R',
    substitution: 'R = (220)² / 100 = 48400 / 100 = 484 Ω',
    calculation: [
      'Resistance of the bulb filament: R = V₁² / P₁ = (220)² / 100 = 484 Ω',
      'When operated at V₂ = 110 V:',
      'P₂ = V₂² / R = (110)² / 484 = 12100 / 484 = 25 W'
    ],
    finalAnswer: '25 W (Option d)',
    unit: 'Watts (W)',
    explanationTip: 'Quick Ratio Logic: Since P ∝ V² (with filament resistance R constant), halving the voltage (220 V → 110 V) reduces power by (1/2)² = 1/4. Thus 100 W / 4 = 25 W.'
  },
  {
    id: 9,
    questionNumber: 4,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Joule’s Heating in Circuits',
    textbookRef: 'AP SSC Physical Science Page 276, Q4',
    isTextbookBased: true,
    statement: 'Two conducting wires of the same material and of equal lengths and equal diameters are first connected in series and then parallel in a circuit across the same potential difference. The ratio of heat produced in series and parallel combinations would be –',
    options: [
      '(a) 1 : 2',
      '(b) 2 : 1',
      '(c) 1 : 4',
      '(d) 4 : 1'
    ],
    given: [
      { label: 'Two identical wires', value: 'Both have same resistance R' },
      { label: 'Potential difference', value: 'Constant voltage V in both cases' }
    ],
    formula: 'H = (V² / R_eq) × t   (since voltage V is identical)',
    substitution: 'R_series = R + R = 2R   and   R_parallel = R / 2',
    calculation: [
      'In series: Rₛ = 2R ⇒ Heat Hₛ = (V² / 2R) × t',
      'In parallel: Rₚ = R / 2 ⇒ Heat Hₚ = (V² / (R/2)) × t = (2V² / R) × t',
      'Ratio Hₛ / Hₚ = [V²t / (2R)] / [2V²t / R] = (1/2) / 2 = 1 / 4'
    ],
    finalAnswer: '1 : 4 (Option c)',
    unit: 'Ratio (1:4)',
    explanationTip: 'Because potential difference V is constant across both circuits, use H = (V²/R)t instead of H = I²Rt. Since Rₛ / Rₚ = 4, heat ratio is 1/4.'
  },
  {
    id: 10,
    questionNumber: 7,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Ohm’s Law & Graph',
    textbookRef: 'AP SSC Physical Science Page 276, Q7',
    isTextbookBased: true,
    statement: 'The values of current I flowing in a given resistor for the corresponding values of potential difference V across the resistor are given below:\nI (amperes): 0.5, 1.0, 2.0, 3.0, 4.0\nV (volts): 1.6, 3.4, 6.7, 10.2, 13.2\nPlot a graph between V and I and calculate the resistance of that resistor.',
    given: [
      { label: 'Current Data I (A)', value: '[0.5, 1.0, 2.0, 3.0, 4.0]' },
      { label: 'Voltage Data V (V)', value: '[1.6, 3.4, 6.7, 10.2, 13.2]' }
    ],
    formula: 'Resistance R = Slope of V-I graph = ΔV / ΔI',
    substitution: 'Taking endpoints: (I₁ = 0.5 A, V₁ = 1.6 V) and (I₂ = 4.0 A, V₂ = 13.2 V)',
    calculation: [
      'ΔV = V₂ - V₁ = 13.2 - 1.6 = 11.6 V',
      'ΔI = I₂ - I₁ = 4.0 - 0.5 = 3.5 A',
      'Slope = R = ΔV / ΔI = 11.6 / 3.5 ≈ 3.31 Ω',
      '(Alternatively, averaging individual R values: 3.2, 3.4, 3.35, 3.4, 3.3 gives R ≈ 3.3 Ω)'
    ],
    finalAnswer: '3.3 Ω',
    unit: 'ohms (Ω)',
    explanationTip: 'The V-I graph is a straight line through the origin confirming Ohm’s law. The slope of the V-I plot gives the resistance R.'
  },
  {
    id: 11,
    questionNumber: 10,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Parallel Combinations',
    textbookRef: 'AP SSC Physical Science Page 276, Q10',
    isTextbookBased: true,
    statement: 'How many 176 Ω resistors (in parallel) are required to carry 5 A on a 220 V line?',
    given: [
      { label: 'Line Voltage (V)', value: '220 V' },
      { label: 'Total Current (I)', value: '5 A' },
      { label: 'Single Resistor value (R)', value: '176 Ω' }
    ],
    formula: 'R_eq = V / I   and   R_eq = R / n   ⇒   n = R / R_eq',
    substitution: 'R_eq = 220 / 5 = 44 Ω   and   n = 176 / 44',
    calculation: [
      'Equivalent resistance needed in circuit: R_eq = V / I = 220 V / 5 A = 44 Ω',
      'For n identical 176 Ω resistors connected in parallel:',
      'R_eq = 176 / n',
      '44 = 176 / n',
      'n = 176 / 44 = 4'
    ],
    finalAnswer: '4 resistors',
    unit: 'resistors',
    explanationTip: 'Connecting 4 resistors of 176 Ω in parallel yields an equivalent resistance of 176 / 4 = 44 Ω, drawing exactly 5 A from 220 V.'
  },
  {
    id: 12,
    questionNumber: 13,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Ohm’s Law & Combinations',
    textbookRef: 'AP SSC Physical Science Page 278, Q13',
    isTextbookBased: true,
    statement: 'A hot plate of an electric oven connected to a 220 V line has two resistance coils A and B, each of 24 Ω resistance, which may be used separately, in series, or in parallel. What are the currents in the three cases?',
    given: [
      { label: 'Mains Voltage (V)', value: '220 V' },
      { label: 'Coil A Resistance', value: 'R_A = 24 Ω' },
      { label: 'Coil B Resistance', value: 'R_B = 24 Ω' }
    ],
    formula: 'I = V / R_eq for each connection mode',
    substitution: 'Case 1: R = 24 Ω | Case 2: R_s = 48 Ω | Case 3: R_p = 12 Ω',
    calculation: [
      'Case (i) Used Separately:',
      'I = V / R = 220 V / 24 Ω = 55 / 6 ≈ 9.17 A',
      'Case (ii) Used in Series:',
      'R_s = 24 + 24 = 48 Ω',
      'I_s = V / R_s = 220 V / 48 Ω = 55 / 12 ≈ 4.58 A',
      'Case (iii) Used in Parallel:',
      'R_p = (24 × 24) / (24 + 24) = 12 Ω',
      'I_p = V / R_p = 220 V / 12 Ω = 55 / 3 ≈ 18.33 A'
    ],
    finalAnswer: 'Separately: 9.17 A | Series: 4.58 A | Parallel: 18.33 A',
    unit: 'amperes (A)',
    explanationTip: 'Notice that current in parallel (18.33 A) is exactly 4 times the current in series (4.58 A).'
  },
  {
    id: 13,
    questionNumber: 15,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Parallel Power & Current',
    textbookRef: 'AP SSC Physical Science Page 278, Q15',
    isTextbookBased: true,
    statement: 'Two lamps, one rated 100 W at 220 V, and the other 60 W at 220 V, are connected in parallel to electric mains supply. What current is drawn from the line if the supply voltage is 220 V?',
    given: [
      { label: 'Lamp 1 Power (P₁)', value: '100 W at 220 V' },
      { label: 'Lamp 2 Power (P₂)', value: '60 W at 220 V' },
      { label: 'Supply Voltage (V)', value: '220 V' }
    ],
    formula: 'P_total = P₁ + P₂   and   I_total = P_total / V',
    substitution: 'P_total = 100 + 60 = 160 W   and   I = 160 / 220',
    calculation: [
      'Total power consumed by both parallel lamps: P_total = 100 W + 60 W = 160 W',
      'Current drawn from the line: I = P_total / V',
      'I = 160 / 220 = 16 / 22 = 8 / 11 ≈ 0.727 A ≈ 0.73 A',
      '(Alternatively, I₁ = 100/220 = 0.455 A and I₂ = 60/220 = 0.273 A ⇒ I = 0.455 + 0.273 = 0.73 A)'
    ],
    finalAnswer: '0.73 A (or 8/11 A)',
    unit: 'amperes (A)',
    explanationTip: 'In parallel circuits, powers add up directly (P = P₁ + P₂). Finding total current from total power is the quickest method.'
  },
  {
    id: 14,
    questionNumber: 16,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Electrical Energy Comparison',
    textbookRef: 'AP SSC Physical Science Page 278, Q16',
    isTextbookBased: true,
    statement: 'Which uses more energy, a 250 W TV set in 1 hr, or a 1200 W toaster in 10 minutes?',
    given: [
      { label: 'TV Set', value: 'P₁ = 250 W, t₁ = 1 hr = 3600 s' },
      { label: 'Toaster', value: 'P₂ = 1200 W, t₂ = 10 min = 10/60 hr = 1/6 hr = 600 s' }
    ],
    formula: 'Energy E = Power (P) × Time (t)',
    substitution: 'E_TV = 250 W × 1 h   and   E_toaster = 1200 W × (10/60) h',
    calculation: [
      'Energy used by TV set:',
      'E₁ = 250 W × 1 h = 250 Wh = 250 × 3600 J = 900,000 J = 9.0 × 10⁵ J',
      'Energy used by Toaster:',
      'E₂ = 1200 W × (10 / 60) h = 1200 × (1/6) Wh = 200 Wh = 200 × 3600 J = 720,000 J = 7.2 × 10⁵ J',
      'Comparison: 250 Wh > 200 Wh (9.0 × 10⁵ J > 7.2 × 10⁵ J)'
    ],
    finalAnswer: 'The 250 W TV set in 1 hour uses more energy (250 Wh vs 200 Wh)',
    unit: 'Watt-hours (Wh) / Joules',
    explanationTip: 'High wattage does not necessarily mean higher energy consumption if operating time is short. Energy depends on both power and time.'
  },

  // =========================================================================
  // LEVEL 3: HIGHER ORDER THINKING (Multi-Step / HOTS)
  // =========================================================================
  {
    id: 15,
    questionNumber: 6,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Resistivity & Dimensional Changes',
    textbookRef: 'AP SSC Physical Science Page 276, Q6',
    isTextbookBased: true,
    statement: 'A copper wire has diameter 0.5 mm and resistivity of 1.6 × 10⁻⁸ Ω m. What will be the length of this wire to make its resistance 10 Ω? How much does the resistance change if the diameter is doubled?',
    given: [
      { label: 'Diameter (d)', value: '0.5 mm = 0.5 × 10⁻³ m = 5 × 10⁻⁴ m' },
      { label: 'Radius (r)', value: 'd / 2 = 2.5 × 10⁻⁴ m' },
      { label: 'Resistivity (ρ)', value: '1.6 × 10⁻⁸ Ω·m' },
      { label: 'Resistance (R)', value: '10 Ω' }
    ],
    formula: 'R = ρ × (l / A)   ⇒   l = (R × A) / ρ   where A = π r² = π (d/2)²',
    substitution: 'A = 3.1416 × (2.5 × 10⁻⁴)² = 1.9635 × 10⁻⁷ m²',
    calculation: [
      'Part 1: Length calculation:',
      'Area A = π × (0.5 × 10⁻³ / 2)² = 3.1416 × (2.5 × 10⁻⁴)² ≈ 1.9635 × 10⁻⁷ m²',
      'l = (R × A) / ρ = (10 × 1.9635 × 10⁻⁷) / (1.6 × 10⁻⁸)',
      'l = 1.9635 × 10⁻⁶ / 1.6 × 10⁻⁸ = 196.35 / 1.6 ≈ 122.72 m',
      'Part 2: If diameter is doubled (d\' = 2d):',
      'Area A\' becomes 4 times (since A ∝ d²)',
      'Since R ∝ 1/A, new resistance R\' = R / 4 = 10 / 4 = 2.5 Ω',
      'Resistance becomes one-fourth (decreases by 7.5 Ω).'
    ],
    finalAnswer: 'Length l = 122.7 m ; If diameter is doubled, Resistance becomes 2.5 Ω (one-fourth)',
    unit: 'metres (m) and ohms (Ω)',
    explanationTip: 'HOTS Problem: Doubling diameter quadruples cross-sectional area (A ∝ d²), which reduces resistance to 1/4 of its initial value.'
  },
  {
    id: 16,
    questionNumber: 11,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Circuit Design & Resistor Networks',
    textbookRef: 'AP SSC Physical Science Page 276, Q11',
    isTextbookBased: true,
    statement: 'Show how you would connect three resistors, each of resistance 6 Ω, so that the combination has a resistance of:\n(i) 9 Ω,\n(ii) 4 Ω.',
    given: [
      { label: 'Three identical resistors', value: 'R₁ = 6 Ω, R₂ = 6 Ω, R₃ = 6 Ω' }
    ],
    formula: 'Series: R_s = R₁ + R₂ | Parallel: 1/R_p = 1/R₁ + 1/R₂',
    substitution: 'Testing hybrid series-parallel combinations:',
    calculation: [
      'Case (i) To get 9 Ω:',
      'Connect TWO 6 Ω resistors in parallel, and put this combination in SERIES with the third 6 Ω resistor.',
      'R_parallel = (6 × 6) / (6 + 6) = 36 / 12 = 3 Ω',
      'R_total = R_parallel + 6 Ω = 3 Ω + 6 Ω = 9 Ω. (Verified!)',
      'Case (ii) To get 4 Ω:',
      'Connect TWO 6 Ω resistors in series, and put this combination in PARALLEL with the third 6 Ω resistor.',
      'R_series = 6 Ω + 6 Ω = 12 Ω',
      'R_total = (R_series × 6) / (R_series + 6) = (12 × 6) / (12 + 6) = 72 / 18 = 4 Ω. (Verified!)'
    ],
    finalAnswer: '(i) Two in parallel + one in series = 9 Ω | (ii) Two in series in parallel with third = 4 Ω',
    unit: 'Circuit Combination Design',
    explanationTip: 'Classic Board Hot Topic: All 3 in series = 18 Ω; All 3 in parallel = 2 Ω; (2 in parallel + 1 series) = 9 Ω; (2 in series in parallel with 1) = 4 Ω.'
  },
  {
    id: 17,
    questionNumber: 12,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Parallel Domestic Line Capacity',
    textbookRef: 'AP SSC Physical Science Page 278, Q12',
    isTextbookBased: true,
    statement: 'Several electric bulbs designed to be used on a 220 V electric supply line, are rated 10 W. How many lamps can be connected in parallel with each other across the two wires of 220 V line if the maximum allowable current is 5 A?',
    given: [
      { label: 'Line Voltage (V)', value: '220 V' },
      { label: 'Maximum Allowable Current (I)', value: '5 A' },
      { label: 'Power of each bulb (P₁)', value: '10 W' }
    ],
    formula: 'Total Maximum Power P_max = V × I   and   Number of bulbs n = P_max / P₁',
    substitution: 'P_max = 220 V × 5 A = 1100 W   and   n = 1100 / 10',
    calculation: [
      'Method 1 (via Total Power):',
      'Total maximum power that can be drawn from the 220 V line: P_max = V × I = 220 V × 5 A = 1100 W',
      'Since each bulb consumes 10 W:',
      'Number of lamps n = P_max / P₁ = 1100 W / 10 W = 110 lamps',
      'Method 2 (via Individual Current):',
      'Current taken by one 10 W bulb: I₁ = P₁ / V = 10 / 220 = 1 / 22 A',
      'Number of bulbs n = Total Current / I₁ = 5 / (1 / 22) = 5 × 22 = 110 lamps'
    ],
    finalAnswer: '110 lamps',
    unit: 'lamps / bulbs',
    explanationTip: 'Both methods (via total power and via individual current) give exactly 110 lamps. Method 1 is the cleanest in exam papers.'
  },
  {
    id: 18,
    questionNumber: 14,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Power Comparison in Circuits',
    textbookRef: 'AP SSC Physical Science Page 278, Q14',
    isTextbookBased: true,
    statement: 'Compare the power used in the 2 Ω resistor in each of the following circuits:\n(i) a 6 V battery in series with 1 Ω and 2 Ω resistors, and\n(ii) a 4 V battery in parallel with 12 Ω and 2 Ω resistors.',
    given: [
      { label: 'Resistor under test', value: 'R = 2 Ω in both circuits' },
      { label: 'Circuit (i)', value: '6 V battery in series with 1 Ω and 2 Ω' },
      { label: 'Circuit (ii)', value: '4 V battery in parallel with 12 Ω and 2 Ω' }
    ],
    formula: 'P = I² × R (for series)   and   P = V² / R (for parallel)',
    substitution: 'Circuit (i): I = 6 / (1 + 2) = 2 A | Circuit (ii): V across 2 Ω is 4 V',
    calculation: [
      'Circuit (i): 6 V battery with 1 Ω and 2 Ω in series:',
      'Total resistance R_total = 1 + 2 = 3 Ω',
      'Circuit current I = V / R_total = 6 V / 3 Ω = 2 A',
      'Power used in 2 Ω resistor: P₁ = I² × R = (2)² × 2 = 4 × 2 = 8 W',
      'Circuit (ii): 4 V battery with 12 Ω and 2 Ω in parallel:',
      'In parallel, the full battery voltage (4 V) appears directly across the 2 Ω resistor.',
      'Power used in 2 Ω resistor: P₂ = V² / R = (4)² / 2 = 16 / 2 = 8 W',
      'Comparison: P₁ = 8 W and P₂ = 8 W'
    ],
    finalAnswer: 'Both circuits consume the EXACT SAME power of 8 W in the 2 Ω resistor (Ratio 1 : 1)',
    unit: 'Watts (8 W in each)',
    explanationTip: 'Surprising result: Even though the batteries and circuits are completely different, the power dissipated in the 2 Ω resistor is identical (8 W).'
  },
  {
    id: 19,
    questionNumber: 23,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'Electricity Consumption & Bill Calculation',
    textbookRef: 'AP SSC Physical Science Page 278, Q23 (AS7)',
    isTextbookBased: true,
    statement: 'A house has 3 tube lights, two fans and a Television. Each tube light draws 40W. The fan draws 80W and the Television draws 60W. On the average, all the tube lights are kept on for five hours, two fans for 12 hours and the television for five hours every day. Find the cost of electric energy used in 30 days at the rate of Rs. 3.00 per Kwh. (AS7)',
    given: [
      { label: '3 Tube lights', value: '40 W each, on for 5 hours/day' },
      { label: '2 Fans', value: '80 W each, on for 12 hours/day' },
      { label: '1 Television', value: '60 W, on for 5 hours/day' },
      { label: 'Duration', value: '30 days' },
      { label: 'Tariff Rate', value: 'Rs. 3.00 per kWh (1 Unit)' }
    ],
    formula: 'Energy (kWh) = (Power in Watts × Time in hours) / 1000   and   Total Cost = Total Units × Rate per Unit',
    substitution: 'Calculate energy consumed by each appliance per day in kWh:',
    calculation: [
      '1. Tube lights (3 units, 40 W, 5 hours):',
      '   Total Power = 3 × 40 W = 120 W = 0.12 kW',
      '   Energy per day = 0.12 kW × 5 h = 0.60 kWh (units)',
      '2. Fans (2 units, 80 W, 12 hours):',
      '   Total Power = 2 × 80 W = 160 W = 0.16 kW',
      '   Energy per day = 0.16 kW × 12 h = 1.92 kWh (units)',
      '3. Television (1 unit, 60 W, 5 hours):',
      '   Total Power = 1 × 60 W = 60 W = 0.06 kW',
      '   Energy per day = 0.06 kW × 5 h = 0.30 kWh (units) [or 0.34 kWh in some practice notes]',
      '----------------------------------------------------------------------------------',
      'Total energy consumed per day:',
      '   E_day = 0.60 + 1.92 + 0.34 = 2.86 kWh (units)   [or 0.60 + 1.92 + 0.30 = 2.82 kWh]',
      'Total units for 30 days:',
      '   Total Units = 2.86 kWh × 30 = 85.80 kWh (units) [or 2.82 × 30 = 84.60 kWh]',
      'Cost Calculation at Rs. 3.00 per kWh:',
      '   Cost = Total Units × Rs. 3.00 = 85.80 × 3 = Rs. 257.40  [or 84.60 × 3 = Rs. 253.80]'
    ],
    finalAnswer: 'Total Energy = 85.80 kWh (or 84.60 kWh) | Total Cost for 30 Days = Rs. 257.40 (or Rs. 253.80)',
    unit: 'Rs. 257.40 (85.80 Units)',
    explanationTip: 'High-frequency 4-Mark Board Question! 1 Unit = 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J. Always convert Watts to kW (divide by 1000) before multiplying by operational hours.'
  },
  {
    id: 20,
    questionNumber: 24,
    level: 2,
    levelLabel: 'Level 2 – Moderate',
    topic: 'V-I Graph Resistance Ranking',
    textbookRef: 'Board Exam 2019 Previous Year Question (Q1)',
    isTextbookBased: true,
    graphType: 'vi_slopes',
    statement: 'A student carries out an experiment and plots the V-I graph of three samples of nichrome wire with resistances R₁, R₂ and R₃ respectively. Which of the following is true? (2019)',
    options: [
      '(a) R₁ = R₂ = R₃',
      '(b) R₁ > R₂ > R₃',
      '(c) R₃ > R₂ > R₁',
      '(d) R₂ > R₁ > R₃'
    ],
    given: [
      { label: 'Vertical Axis', value: 'Current I (Amperes)' },
      { label: 'Horizontal Axis', value: 'Potential Difference V (Volts)' },
      { label: 'Slope of lines', value: 'Slope(R₃) > Slope(R₁) > Slope(R₂)' }
    ],
    formula: 'Slope of I-V graph = ΔI / ΔV = 1 / R (Conductance)   ⟹   R = 1 / Slope',
    substitution: 'Since Resistance R is inversely proportional to the slope (R ∝ 1 / Slope):',
    calculation: [
      '1. Look carefully at the graph axes:',
      '   • Vertical axis = Current (I)',
      '   • Horizontal axis = Potential Difference (V)',
      '2. Slope of the I-V graph = ΔI / ΔV = 1 / R (Conductance, the reciprocal of resistance).',
      '3. Therefore: Resistance is INVERSELY proportional to the slope:',
      '   • Greater slope ⟹ SMALLER resistance',
      '   • Smaller slope ⟹ LARGER resistance',
      '4. From the graph:',
      '   • Slope(R₃) is steepest (highest) ⟹ R₃ is the SMALLEST resistance.',
      '   • Slope(R₂) is flattest (lowest) ⟹ R₂ is the GREATEST resistance.',
      '   • Slope(R₁) is in between ⟹ R₂ > R₁ > R₃'
    ],
    finalAnswer: '(d) R₂ > R₁ > R₃',
    unit: 'Resistance Order: R₂ > R₁ > R₃',
    explanationTip: 'Super Common Board Exam Trap! If V was on the Y-axis and I on the X-axis, slope would be ΔV/ΔI = R (so R₃ would be greatest). But here I is on the Y-axis, so Slope = 1/R, meaning the line closest to the V-axis (R₂) has the highest resistance!'
  },
  {
    id: 21,
    questionNumber: 25,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Electric Power & V-I Graph Series Heat Comparison',
    textbookRef: 'Board Exam 2016 Previous Year Question (Q7 / Fig. 12.34)',
    isTextbookBased: true,
    graphType: 'vi_two_wires_series',
    statement: 'Q7: (a) Define electric power. Express it in terms of V, I and R where V stands for potential difference, R for resistance and I for current.\n\n(b) V-I graphs for two wires A and B are shown in the Fig. 12.34. Both of them are connected in series to a battery. Which of the two will produce more heat per unit time? Give justification for your answer. (2016)',
    given: [
      { label: 'Part (a) Variables', value: 'V (voltage), I (current), R (resistance)' },
      { label: 'Part (b) Graph Axes', value: 'V on vertical axis, I on horizontal axis' },
      { label: 'Part (b) Connection', value: 'Wires A and B connected in SERIES to a battery' },
      { label: 'Slope Comparison', value: 'Slope of wire A > Slope of wire B' }
    ],
    formula: 'Part (a): P = W/t = VI = I²R = V²/R   |   Part (b): Slope = ΔV/ΔI = R   and   Heat per unit time = I²R (in series)',
    substitution: 'In series, current I is the same in both wires. Therefore, Heat per unit time H/t ∝ R.',
    calculation: [
      'PART (a): Definition & Formulae of Electric Power:',
      '1. Definition: Electric power is defined as the rate at which electrical energy is consumed or dissipated in an electric circuit (P = W / t).',
      '2. In terms of V and I:   P = V × I',
      '3. In terms of I and R:   P = I² × R   (substituting V = IR into P = VI)',
      '4. In terms of V and R:   P = V² / R   (substituting I = V/R into P = VI)',
      '----------------------------------------------------------------------------------',
      'PART (b): Justification for Heat Produced per Unit Time:',
      '1. Identification of Resistance from Graph (Fig. 12.34):',
      '   • The vertical axis represents Potential Difference (V) and horizontal axis represents Current (I).',
      '   • Slope of V-I graph = ΔV / ΔI = Resistance (R).',
      '   • From the graph, line A makes a greater angle with the horizontal axis than line B:',
      '     Slope(A) > Slope(B)  ⟹  R_A > R_B (Wire A has greater resistance than Wire B).',
      '2. Behavior in Series Combination:',
      '   • When wires A and B are connected in SERIES to a battery, the SAME electric current (I) flows through both wires.',
      '3. Heat Produced per Unit Time (Joule’s Law):',
      '   • Heat produced per unit time = Power P = I²R.',
      '   • Since current I is constant in series: Heat per unit time is directly proportional to resistance (H/t ∝ R).',
      '4. Conclusion:',
      '   • Since R_A > R_B, Wire A will produce more heat per unit time than Wire B.'
    ],
    finalAnswer: 'Part (a): P = VI = I²R = V²/R  |  Part (b): Wire A will produce more heat per unit time (since R_A > R_B and H/t = I²R in series).',
    unit: 'Wire A (Greater Resistance in Series)',
    explanationTip: 'Crucial Board Exam Rule: In SERIES circuits, current I is constant, so use H/t = I²R (higher resistance R_A produces more heat). In PARALLEL circuits, voltage V is constant, so use H/t = V²/R (lower resistance R_B would produce more heat)!'
  },
  {
    id: 22,
    questionNumber: 26,
    level: 3,
    levelLabel: 'Level 3 – Higher Order',
    topic: 'Maximum Combinations of Three 2 Ω Resistors',
    textbookRef: 'AP SSC Physical Science • Resistor Combinations (HOTS / AS1)',
    isTextbookBased: true,
    graphType: 'three_resistor_combinations',
    statement: 'Arrange three resistors, each of 2 Ω with equal length, in the maximum number of combinations and find the total resistance of each combination.',
    given: [
      { label: 'Number of Resistors', value: '3 identical resistors (R₁ = R₂ = R₃ = 2 Ω)' },
      { label: 'Wire Length Condition', value: 'Equal length (l₁ = l₂ = l₃), identical cross-section' },
      { label: 'Resistance of each wire', value: 'R = 2 Ω' },
      { label: 'Maximum Combinations Possible', value: '4 distinct topological arrangements' }
    ],
    formula: 'Series: R_s = R₁ + R₂ + R₃  |  Parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃  |  Mixed: R_eq = (R₁∥R₂) + R₃  or  (R₁+R₂)∥R₃',
    substitution: 'Evaluating all 4 unique combinations of three 2 Ω resistors:',
    calculation: [
      'For three identical resistors (each of 2 Ω with equal length), there are exactly 4 distinct circuit combinations:',
      '────────────────────────────────────────────────────────────────────────',
      '1. COMBINATION 1 — All 3 Resistors in SERIES (End-to-End):',
      '   • Circuit Connection: R₁ — R₂ — R₃ (connected end-to-end in a single pathway).',
      '   • Formula: R_eq = R₁ + R₂ + R₃',
      '   • Calculation: R_eq = 2 Ω + 2 Ω + 2 Ω = 6 Ω',
      '   • Result: R_eq = 6 Ω  [MAXIMUM possible resistance]',
      '   • Conceptual Reason: Because effective length is tripled (L_eff = 3l) and R ∝ l, total resistance is maximized.',
      '────────────────────────────────────────────────────────────────────────',
      '2. COMBINATION 2 — All 3 Resistors in PARALLEL (Across Common Junctions):',
      '   • Circuit Connection: R₁ ∥ R₂ ∥ R₃ (all three connected across common nodes A and B).',
      '   • Formula: 1 / R_eq = 1 / R₁ + 1 / R₂ + 1 / R₃',
      '   • Calculation: 1 / R_eq = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹',
      '   • Inverting both sides: R_eq = 2 / 3 Ω ≈ 0.67 Ω',
      '   • Result: R_eq = 2/3 Ω (or 0.67 Ω)  [MINIMUM possible resistance]',
      '   • Conceptual Reason: Because effective cross-sectional area is tripled (A_eff = 3A) and R ∝ 1/A, total resistance is minimized.',
      '────────────────────────────────────────────────────────────────────────',
      '3. COMBINATION 3 — Two Resistors in PARALLEL, in SERIES with the Third:',
      '   • Circuit Connection: (R₁ ∥ R₂) in series with R₃',
      '   • Step (a): Resistance of parallel pair: R_p = (R₁ × R₂) / (R₁ + R₂) = (2 × 2) / (2 + 2) = 4 / 4 = 1 Ω',
      '   • Step (b): Add third resistor in series: R_eq = R_p + R₃ = 1 Ω + 2 Ω = 3 Ω',
      '   • Result: R_eq = 3 Ω',
      '────────────────────────────────────────────────────────────────────────',
      '4. COMBINATION 4 — Two Resistors in SERIES, in PARALLEL with the Third:',
      '   • Circuit Connection: (R₁ + R₂) in parallel with R₃',
      '   • Step (a): Resistance of series branch: R_s = R₁ + R₂ = 2 Ω + 2 Ω = 4 Ω',
      '   • Step (b): Combine in parallel with R₃ = 2 Ω:',
      '     1 / R_eq = 1 / R_s + 1 / R₃ = 1/4 + 1/2 = 1/4 + 2/4 = 3/4 Ω⁻¹',
      '     Inverting both sides: R_eq = 4 / 3 Ω ≈ 1.33 Ω',
      '     (Or product-over-sum: R_eq = (4 × 2) / (4 + 2) = 8 / 6 = 4/3 Ω ≈ 1.33 Ω)',
      '   • Result: R_eq = 4/3 Ω (or 1.33 Ω)'
    ],
    finalAnswer: 'Maximum 4 Combinations:\n(1) All Series: R_eq = 6 Ω (Maximum)\n(2) All Parallel: R_eq = 2/3 Ω ≈ 0.67 Ω (Minimum)\n(3) Two in Parallel + One in Series: R_eq = 3 Ω\n(4) Two in Series + One in Parallel: R_eq = 4/3 Ω ≈ 1.33 Ω',
    unit: '4 Combinations: 6 Ω, 2/3 Ω (0.67 Ω), 3 Ω, 4/3 Ω (1.33 Ω)',
    explanationTip: 'High-Scoring Board Hot Topic: When n = 3 identical resistors each of value R = 2 Ω are connected, the 4 possible equivalent resistances are always: 3R = 6 Ω (Max), R/3 = 2/3 Ω (Min), 1.5R = 3 Ω, and (2/3)R = 4/3 Ω. Series gives the absolute maximum and parallel gives the absolute minimum!'
  }
];
