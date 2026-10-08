export interface QuestionItem {
  id: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  formula?: string;
  boardYear?: string;
}

export interface PracticeTest {
  id: string;
  title: string;
  subtitle: string;
  category: 'Grand Mock' | 'Topic Test' | 'Numerical Special';
  badge: string;
  durationMinutes: number;
  totalMarks: number;
  description: string;
  questions: QuestionItem[];
}

export const PRACTICE_TESTS: PracticeTest[] = [
  {
    id: 'grand-mock-1',
    title: 'AP SSC Electricity Grand Mock Exam',
    subtitle: 'Full Chapter Comprehensive Board Exam Pattern',
    category: 'Grand Mock',
    badge: 'Comprehensive (20 Marks)',
    durationMinutes: 25,
    totalMarks: 20,
    description: 'Simulates the complete AP SSC Board Question Paper with a balanced distribution of definitions, formulas, numerical problems, circuit diagrams, and safety concepts.',
    questions: [
      {
        id: 1,
        question: 'Which of the following physical quantities represents the rate of flow of electric charges?',
        options: [
          'Electric Potential Difference',
          'Electric Current',
          'Electric Resistance',
          'Electric Power'
        ],
        correctIndex: 1,
        explanation: 'Electric current (I = Q/t) is defined as the amount of electric charge passing through any cross-section of a conductor per unit time. Its SI unit is Ampere (A).',
        topic: 'Electric Current',
        difficulty: 'Easy',
        formula: 'I = Q / t',
        boardYear: 'AP SSC Model Paper'
      },
      {
        id: 2,
        question: 'How many electrons constitute one coulomb of negative electric charge?',
        options: [
          '6.25 × 10¹⁸ electrons',
          '1.6 × 10⁻¹⁹ electrons',
          '6.25 × 10¹⁹ electrons',
          '9.1 × 10⁻³¹ electrons'
        ],
        correctIndex: 0,
        explanation: 'From quantization of charge Q = n·e. For Q = 1 C and e = 1.6 × 10⁻¹⁹ C: n = Q / e = 1 / (1.6 × 10⁻¹⁹) = 6.25 × 10¹⁸ electrons.',
        topic: 'Electric Charge',
        difficulty: 'Easy',
        formula: 'n = Q / e = 6.25 × 10¹⁸',
        boardYear: '2020 AP Board'
      },
      {
        id: 3,
        question: 'The work done in moving a unit positive charge across two points in a circuit is called:',
        options: [
          'Electric Current',
          'Potential Difference (Voltage)',
          'Electric Resistance',
          'Specific Resistivity'
        ],
        correctIndex: 1,
        explanation: 'Potential Difference (V = W/Q) is defined as the work done in moving a unit positive charge from one point to the other across an electric field. 1 Volt = 1 Joule / 1 Coulomb.',
        topic: 'Potential Difference',
        difficulty: 'Easy',
        formula: 'V = W / Q'
      },
      {
        id: 4,
        question: 'Ohm’s law (V = I·R) is strictly valid only when:',
        options: [
          'The electric current is alternating',
          'The temperature and other physical conditions of the conductor remain constant',
          'The resistor is connected in parallel with an ammeter',
          'The wire is made exclusively of an insulator'
        ],
        correctIndex: 1,
        explanation: 'Ohm’s law states that current is directly proportional to potential difference (V ∝ I) provided temperature and physical dimensions of the conductor remain constant.',
        topic: 'Ohm’s Law',
        difficulty: 'Medium',
        formula: 'V / I = Constant (R) at constant T',
        boardYear: '2019 AP Board'
      },
      {
        id: 5,
        question: 'Which instrument is always connected in series in an electric circuit to measure current?',
        options: [
          'Voltmeter (High resistance)',
          'Ammeter (Very low resistance)',
          'Galvanometer in parallel',
          'Rheostat across the battery'
        ],
        correctIndex: 1,
        explanation: 'An ammeter has very low resistance so that it does not alter the total circuit current, and is connected in series so all current flows through it.',
        topic: 'Measuring Devices',
        difficulty: 'Easy'
      },
      {
        id: 6,
        question: 'If a cylindrical wire of length l and cross-sectional area A is stretched to double its length (2l) without changing its volume, its new resistance becomes:',
        options: [
          '2 times the original resistance',
          '4 times the original resistance',
          'Remains unchanged',
          'Half the original resistance'
        ],
        correctIndex: 1,
        explanation: 'When stretched to double length (l\' = 2l), volume remains constant (V = A·l = A\'·2l ⇒ A\' = A/2). New resistance R\' = ρ(l\'/A\') = ρ(2l / (A/2)) = 4 · ρ(l/A) = 4R.',
        topic: 'Resistance & Factors',
        difficulty: 'Hard',
        formula: 'R\' = n² · R = 2² · R = 4R',
        boardYear: '2018 AP SSC Board'
      },
      {
        id: 7,
        question: 'The SI unit of specific resistivity (ρ) is:',
        options: [
          'ohm (Ω)',
          'ohm-metre (Ω·m)',
          'ohm per metre (Ω/m)',
          'siemens (S)'
        ],
        correctIndex: 1,
        explanation: 'From R = ρ(l/A), ρ = (R·A)/l. Unit of ρ = (Ω × m²) / m = Ω·m (ohm-metre).',
        topic: 'Specific Resistivity',
        difficulty: 'Easy',
        formula: 'ρ = (R · A) / l [Ω·m]'
      },
      {
        id: 8,
        question: 'Two resistors of 6 Ω and 3 Ω are connected in parallel. What is their equivalent resistance?',
        options: [
          '9 Ω',
          '2 Ω',
          '18 Ω',
          '0.5 Ω'
        ],
        correctIndex: 1,
        explanation: 'For two resistors in parallel: 1/Rₚ = 1/R₁ + 1/R₂ ⇒ Rₚ = (R₁·R₂) / (R₁ + R₂) = (6 × 3) / (6 + 3) = 18 / 9 = 2 Ω.',
        topic: 'Parallel Combination',
        difficulty: 'Medium',
        formula: 'Rₚ = (R₁ · R₂) / (R₁ + R₂) = 2 Ω'
      },
      {
        id: 9,
        question: 'Three identical resistors of resistance R each are connected in series. Their equivalent resistance is:',
        options: [
          'R / 3',
          '3 · R',
          'R / 9',
          '3 / R'
        ],
        correctIndex: 1,
        explanation: 'In a series combination, resistances simply add up: Rₛ = R₁ + R₂ + R₃ = R + R + R = 3R.',
        topic: 'Series Combination',
        difficulty: 'Easy',
        formula: 'Rₛ = n · R = 3R'
      },
      {
        id: 10,
        question: 'Why are household appliances connected in parallel rather than in series?',
        options: [
          'Each appliance receives the full mains voltage (220 V) and can be operated independently',
          'Total circuit resistance becomes very high so no current is wasted',
          'If one bulb fuses, all other appliances automatically turn off for safety',
          'Parallel wiring reduces the current drawn from the main supply'
        ],
        correctIndex: 0,
        explanation: 'In parallel connection: (1) Each appliance gets the same 220 V supply voltage, (2) If one appliance fails or is switched off, others remain functional, (3) Total resistance is low.',
        topic: 'Parallel Wiring',
        difficulty: 'Medium',
        boardYear: '2022 AP SSC Board'
      },
      {
        id: 11,
        question: 'According to Joule’s Law of Heating, heat produced in a resistor of resistance R carrying current I for time t is:',
        options: [
          'H = I · R · t',
          'H = I² · R · t',
          'H = I · R² · t',
          'H = V / (I · t)'
        ],
        correctIndex: 1,
        explanation: 'Joule’s Law states that H = I²Rt. Heat generated is directly proportional to square of current (I²), resistance (R), and time (t).',
        topic: 'Joule Heating',
        difficulty: 'Easy',
        formula: 'H = I² · R · t = V · I · t'
      },
      {
        id: 12,
        question: 'Commercial unit of electrical energy is 1 kilowatt-hour (1 kWh). How many Joules does it equal?',
        options: [
          '3.6 × 10⁵ J',
          '3.6 × 10⁶ J (or 3.6 × 10⁶ W·s)',
          '1000 J',
          '3600 J'
        ],
        correctIndex: 1,
        explanation: '1 kWh = 1 kW × 1 h = 1000 W × 3600 s = 3,600,000 W·s = 3.6 × 10⁶ Joules.',
        topic: 'Commercial Energy Unit',
        difficulty: 'Medium',
        formula: '1 kWh = 3.6 × 10⁶ J (W·s)',
        boardYear: 'Frequent Board Question'
      },
      {
        id: 13,
        question: 'An electric bulb is rated 220 V, 100 W. When operated on 110 V, the power consumed by it will be:',
        options: [
          '100 W',
          '75 W',
          '50 W',
          '25 W'
        ],
        correctIndex: 3,
        explanation: 'Resistance of bulb filament R = V² / P = (220)² / 100 = 484 Ω (constant). At V\' = 110 V: P\' = (V\')² / R = (110)² / 484 = 12100 / 484 = 25 W.',
        topic: 'Electric Power',
        difficulty: 'Hard',
        formula: 'P\' = P / 4 = 100 / 4 = 25 W',
        boardYear: 'AP SSC Textbook Problem 3'
      },
      {
        id: 14,
        question: 'An electric fuse is a safety device based on:',
        options: [
          'Magnetic effect of electric current',
          'Heating effect of electric current (Joule heating)',
          'Chemical effect of electric current',
          'Electrostatic induction'
        ],
        correctIndex: 1,
        explanation: 'A fuse wire is made of a lead-tin alloy with a low melting point. When current exceeds safe limits, Joule heating (H = I²Rt) melts the wire and breaks the circuit.',
        topic: 'Safety & Fuse',
        difficulty: 'Easy'
      },
      {
        id: 15,
        question: 'What is the standard colour coding of the Earth wire in modern domestic electrical wiring?',
        options: [
          'Red or Brown',
          'Black or Light Blue',
          'Green or Green with Yellow stripes',
          'White'
        ],
        correctIndex: 2,
        explanation: 'Live wire = Red/Brown; Neutral wire = Black/Light Blue; Earth wire = Green or Green with yellow stripes.',
        topic: 'Domestic Wiring',
        difficulty: 'Easy'
      },
      {
        id: 16,
        question: 'The resistance of a dry human body is approximately _____ while that of wet human skin drops to _____.',
        options: [
          '100,000 Ω ; 1,000 Ω',
          '1,000 Ω ; 100,000 Ω',
          '50 Ω ; 10 Ω',
          '10 Ω ; 0 Ω'
        ],
        correctIndex: 0,
        explanation: 'Dry human skin offers very high resistance of roughly 100,000 Ω. When skin is wet with water or sweat, resistance drops drastically to about 1,000 Ω, making shock fatal.',
        topic: 'Electric Shock Physics',
        difficulty: 'Medium',
        boardYear: 'AP SSC Activity & Textbook'
      },
      {
        id: 17,
        question: 'Which of the following materials is preferred for heating elements in electric irons and toasters?',
        options: [
          'Copper (low resistivity)',
          'Nichrome (high resistivity and high melting point, does not oxidize readily)',
          'Aluminium (lightweight)',
          'Lead (low melting point)'
        ],
        correctIndex: 1,
        explanation: 'Nichrome (alloy of Nickel, Chromium, Manganese, and Iron) has very high resistivity and does not oxidize (burn) even at red-hot temperatures (around 800°C).',
        topic: 'Joule Heating Applications',
        difficulty: 'Easy'
      },
      {
        id: 18,
        question: 'The slope of the V versus I graph (with V on y-axis and I on x-axis) for an ohmic conductor represents:',
        options: [
          'Electric Charge',
          'Electrical Resistance (R = ΔV / ΔI)',
          'Electric Power',
          'Specific Resistivity'
        ],
        correctIndex: 1,
        explanation: 'By Ohm’s law V = IR. The slope of V vs I is ΔV / ΔI = R (Resistance). A steeper straight line indicates higher resistance.',
        topic: 'V-I Graph',
        difficulty: 'Medium',
        formula: 'Slope = ΔV / ΔI = R',
        boardYear: '2016 AP Board'
      },
      {
        id: 19,
        question: 'A current of 0.5 A is drawn by a filament of an electric bulb for 10 minutes. The amount of electric charge that flows is:',
        options: [
          '5 C',
          '50 C',
          '300 C',
          '3000 C'
        ],
        correctIndex: 2,
        explanation: 'Time t = 10 minutes = 10 × 60 s = 600 seconds. Current I = 0.5 A. Charge Q = I · t = 0.5 A × 600 s = 300 Coulombs (C).',
        topic: 'Numerical Problem',
        difficulty: 'Medium',
        formula: 'Q = I · t = 0.5 × 600 = 300 C',
        boardYear: 'AP SSC Textbook Example 1'
      },
      {
        id: 20,
        question: 'Electric overloading in a domestic circuit happens when:',
        options: [
          'A single 5 W LED bulb is turned on',
          'Too many high-power appliances are switched on simultaneously on a single circuit',
          'The battery runs out of chemical electrolyte',
          'The earthing wire is properly grounded into the earth pit'
        ],
        correctIndex: 1,
        explanation: 'Overloading happens when multiple heavy appliances (air conditioner, geyser, heater, iron) operate together in parallel, causing total active current (I_total = ΣP / 220V) to exceed the safe rating of the circuit fuse.',
        topic: 'Overloading & Safety',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'topic-test-1',
    title: 'Topic Test 1: Charge, Current, Voltage & Ohm’s Law',
    subtitle: '10 Core Fundamental Questions',
    category: 'Topic Test',
    badge: '10 Marks · 15 Mins',
    durationMinutes: 15,
    totalMarks: 10,
    description: 'Master charge quantization, conventional current vs electron drift, potential difference definition, and Ohm’s law verification.',
    questions: [
      {
        id: 1,
        question: 'The direction of conventional electric current is taken as:',
        options: [
          'From negative terminal to positive terminal',
          'From positive terminal to negative terminal',
          'Along the direction of electron drift',
          'Perpendicular to the length of the conductor'
        ],
        correctIndex: 1,
        explanation: 'Historically, current was assumed to be the flow of positive charge (positive to negative). Electrons actually drift from negative to positive terminal.',
        topic: 'Current Direction',
        difficulty: 'Easy'
      },
      {
        id: 2,
        question: 'One volt is equivalent to:',
        options: [
          '1 Joule per second (1 J/s)',
          '1 Joule per Coulomb (1 J/C)',
          '1 Coulomb per second (1 C/s)',
          '1 Newton per Coulomb (1 N/C)'
        ],
        correctIndex: 1,
        explanation: 'V = W / Q. When 1 Joule of work is done in moving 1 Coulomb of charge, the potential difference is 1 Volt (1 V = 1 J/C).',
        topic: 'Potential Difference',
        difficulty: 'Easy',
        formula: '1 V = 1 J / 1 C'
      },
      {
        id: 3,
        question: 'Which of the following is a NON-OHMIC conductor?',
        options: [
          'Copper wire at room temperature',
          'Silver rod',
          'Filament of an incandescent electric bulb',
          'Nichrome resistance coil'
        ],
        correctIndex: 2,
        explanation: 'As current passes through a bulb filament, temperature rises drastically. Resistance increases with temperature, causing the V-I graph to curve. Thus, a bulb filament is non-ohmic.',
        topic: 'Ohmic vs Non-Ohmic',
        difficulty: 'Medium',
        boardYear: 'AP SSC 2017'
      },
      {
        id: 4,
        question: 'In an experiment to verify Ohm’s law, a rheostat is used to:',
        options: [
          'Measure the potential difference across the unknown resistor',
          'Vary the electric current in the circuit smoothly',
          'Keep the temperature of the circuit below 0°C',
          'Store electric charges like a capacitor'
        ],
        correctIndex: 1,
        explanation: 'A rheostat is a variable resistor. By sliding its jockey, the circuit resistance is altered, thereby varying the current (I) to record different sets of (V, I) readings.',
        topic: 'Ohm’s Law Lab',
        difficulty: 'Easy'
      },
      {
        id: 5,
        question: 'If the potential difference across a 20 Ω resistor is 10 V, the current flowing through it is:',
        options: [
          '200 A',
          '2 A',
          '0.5 A',
          '0.2 A'
        ],
        correctIndex: 2,
        explanation: 'By Ohm’s law: I = V / R = 10 V / 20 Ω = 0.5 A.',
        topic: 'Ohm’s Law Numerical',
        difficulty: 'Easy',
        formula: 'I = V / R = 10 / 20 = 0.5 A'
      },
      {
        id: 6,
        question: 'The EMF of a cell is always _____ its terminal potential difference when current is drawn from the cell.',
        options: [
          'Less than',
          'Greater than',
          'Equal to',
          'Zero times'
        ],
        correctIndex: 1,
        explanation: 'EMF (E) is the terminal voltage in an open circuit (I = 0). When current flows in a closed circuit, internal voltage drop occurs across internal resistance (Ir). Hence V = E − Ir, meaning EMF > V.',
        topic: 'EMF vs Potential Difference',
        difficulty: 'Hard',
        formula: 'V = E − Ir (EMF > V)'
      },
      {
        id: 7,
        question: 'What is the device used to detect the presence of feeble current in a circuit?',
        options: [
          'Voltmeter',
          'Galvanometer',
          'Ammeter',
          'Rheostat'
        ],
        correctIndex: 1,
        explanation: 'A galvanometer is a sensitive instrument used to detect and indicate the direction of small electric currents in a circuit.',
        topic: 'Circuit Devices',
        difficulty: 'Easy'
      },
      {
        id: 8,
        question: 'How much energy is given to each coulomb of charge passing through a 6 V battery?',
        options: [
          '1 J',
          '6 J',
          '12 J',
          '0.6 J'
        ],
        correctIndex: 1,
        explanation: 'Work done W = V · Q = 6 V × 1 C = 6 Joules (J).',
        topic: 'Work & Energy',
        difficulty: 'Easy',
        formula: 'W = V · Q = 6 × 1 = 6 J',
        boardYear: 'AP SSC Textbook Problem 2'
      },
      {
        id: 9,
        question: 'What represents the reciprocal of electrical resistance (1 / R)?',
        options: [
          'Resistivity',
          'Conductance (G)',
          'Capacitance',
          'Inductance'
        ],
        correctIndex: 1,
        explanation: 'Conductance G = 1 / R is the measure of how easily electric current flows through a material. Its SI unit is Siemens (S) or ohm⁻¹ (mho).',
        topic: 'Conductance',
        difficulty: 'Medium'
      },
      {
        id: 10,
        question: 'If the charge on an electron is −1.6 × 10⁻¹⁹ C, how many coulombs of charge pass when 2 × 10¹⁸ electrons flow?',
        options: [
          '0.32 C',
          '3.2 C',
          '32 C',
          '0.032 C'
        ],
        correctIndex: 0,
        explanation: 'Q = n · e = (2 × 10¹⁸) × (1.6 × 10⁻¹⁹ C) = 3.2 × 10⁻¹ C = 0.32 C.',
        topic: 'Quantization Numerical',
        difficulty: 'Medium',
        formula: 'Q = n · e = 0.32 C'
      }
    ]
  },
  {
    id: 'topic-test-2',
    title: 'Topic Test 2: Resistance, Resistivity & Factors',
    subtitle: '10 Questions on Length, Area, Material & Temperature',
    category: 'Topic Test',
    badge: '10 Marks · 15 Mins',
    durationMinutes: 15,
    totalMarks: 10,
    description: 'Test your understanding of resistance dependencies (R ∝ l, R ∝ 1/A), specific resistivity formula ρ = RA/l, and temperature coefficients.',
    questions: [
      {
        id: 1,
        question: 'When the length of a uniform conducting wire is doubled while keeping its area constant, its resistance:',
        options: [
          'Is halved',
          'Is doubled',
          'Becomes four times',
          'Remains unchanged'
        ],
        correctIndex: 1,
        explanation: 'Resistance is directly proportional to length (R ∝ l). If length is doubled without altering cross-sectional area, resistance doubles.',
        topic: 'Length Dependence',
        difficulty: 'Easy',
        formula: 'R ∝ l'
      },
      {
        id: 2,
        question: 'When the cross-sectional area of a wire is doubled while keeping its length constant, its resistance:',
        options: [
          'Is doubled',
          'Is halved',
          'Becomes four times',
          'Remains unchanged'
        ],
        correctIndex: 1,
        explanation: 'Resistance is inversely proportional to cross-sectional area (R ∝ 1/A). A thicker wire provides more parallel paths for electrons, halving resistance.',
        topic: 'Area Dependence',
        difficulty: 'Easy',
        formula: 'R ∝ 1 / A'
      },
      {
        id: 3,
        question: 'If a wire of radius r is replaced with a wire of the same material and length but radius 2r, the new resistance is:',
        options: [
          'R / 2',
          'R / 4',
          '2 · R',
          '4 · R'
        ],
        correctIndex: 1,
        explanation: 'Area A = π·r². If radius is doubled (r\' = 2r), new area A\' = π(2r)² = 4πr² = 4A. Since R ∝ 1/A, R\' = R / 4.',
        topic: 'Radius Dependence',
        difficulty: 'Hard',
        formula: 'R ∝ 1 / r²'
      },
      {
        id: 4,
        question: 'Specific resistivity (ρ) of a wire depends ONLY on:',
        options: [
          'Length of the wire',
          'Cross-sectional thickness of the wire',
          'Nature of material and temperature',
          'Shape of the cross section'
        ],
        correctIndex: 2,
        explanation: 'Specific resistivity is an intrinsic material property. Cutting or stretching a wire alters R, but ρ remains identical unless material or temperature changes.',
        topic: 'Specific Resistivity',
        difficulty: 'Medium',
        boardYear: 'AP SSC 2019'
      },
      {
        id: 5,
        question: 'Which of the following metals has the lowest resistivity (best electrical conductor)?',
        options: [
          'Iron',
          'Silver',
          'Nichrome',
          'Tungsten'
        ],
        correctIndex: 1,
        explanation: 'Silver has the lowest resistivity of all metals (ρ ≈ 1.60 × 10⁻⁸ Ω·m), followed closely by copper (1.62 × 10⁻⁸ Ω·m).',
        topic: 'Material Resistivity',
        difficulty: 'Easy'
      },
      {
        id: 6,
        question: 'For pure metals, what happens to electrical resistance as temperature increases?',
        options: [
          'Resistance decreases',
          'Resistance increases',
          'Resistance stays constant',
          'Resistance drops to zero immediately'
        ],
        correctIndex: 1,
        explanation: 'At higher temperatures, positive metal ions vibrate more vigorously, causing more frequent collisions with drifting electrons. Thus, resistance of metals increases with temperature.',
        topic: 'Temperature Effect',
        difficulty: 'Medium'
      },
      {
        id: 7,
        question: 'A wire of resistance R is cut into 5 equal parts. The resistance of each piece is:',
        options: [
          '5 · R',
          'R / 5',
          'R / 25',
          '25 · R'
        ],
        correctIndex: 1,
        explanation: 'Since R ∝ l, dividing length by 5 divides resistance of each segment by 5: R_piece = R / 5.',
        topic: 'Cutting Wire Problem',
        difficulty: 'Medium',
        boardYear: 'AP SSC Exercise Problem 1'
      },
      {
        id: 8,
        question: 'If the 5 equal parts of resistance R/5 each (from previous question) are connected in parallel, the equivalent resistance R\' is:',
        options: [
          'R / 5',
          'R / 25',
          'R',
          '25 · R'
        ],
        correctIndex: 1,
        explanation: 'For 5 identical resistors of value r = R/5 in parallel: R\' = r / 5 = (R/5) / 5 = R / 25.',
        topic: 'Exercise 1 Follow-up',
        difficulty: 'Hard',
        formula: 'R\' = R / 25 (Ratio R/R\' = 25)'
      },
      {
        id: 9,
        question: 'Why are alloy wires like Manganin and Constantan used for standard laboratory resistors?',
        options: [
          'They have zero resistance',
          'Their resistance changes negligibly with temperature (low temperature coefficient)',
          'They melt at room temperature',
          'They attract magnets strongly'
        ],
        correctIndex: 1,
        explanation: 'Standard resistors must have steady resistance across ambient temperature variations. Alloys like manganin have negligible temperature coefficients of resistance.',
        topic: 'Standard Resistors',
        difficulty: 'Hard'
      },
      {
        id: 10,
        question: 'A copper wire has diameter 0.5 mm and resistivity 1.6 × 10⁻⁸ Ω·m. What will be the length of this wire to make its resistance 10 Ω?',
        options: [
          '12.27 m',
          '122.7 m',
          '1227 m',
          '1.227 m'
        ],
        correctIndex: 1,
        explanation: 'Radius r = 0.25 mm = 2.5 × 10⁻⁴ m. Area A = π·r² = 3.1416 × (2.5 × 10⁻⁴)² ≈ 1.963 × 10⁻⁷ m². From R = ρ·l/A: l = (R·A)/ρ = (10 × 1.963 × 10⁻⁷) / (1.6 × 10⁻⁸) ≈ 122.7 metres.',
        topic: 'Textbook Numerical',
        difficulty: 'Hard',
        formula: 'l = (R · A) / ρ = 122.7 m',
        boardYear: 'AP SSC Textbook Problem 6'
      }
    ]
  },
  {
    id: 'topic-test-3',
    title: 'Topic Test 3: Series & Parallel Combinations',
    subtitle: '10 Problems on Voltage Division, Current Branching & Equivalent R',
    category: 'Topic Test',
    badge: '10 Marks · 15 Mins',
    durationMinutes: 15,
    totalMarks: 10,
    description: 'Master equivalent resistance calculations, series voltage drop, parallel current sharing, and complex resistor network shortcuts.',
    questions: [
      {
        id: 1,
        question: 'In a series circuit consisting of three resistors, which quantity remains the same across all three resistors?',
        options: [
          'Potential difference across each resistor',
          'Electric current passing through each resistor',
          'Electric power consumed by each resistor',
          'Heat generated per second in each resistor'
        ],
        correctIndex: 1,
        explanation: 'In series, there is only a single path for charge flow. Therefore, the same current (I) flows through every resistor, whereas voltage splits (V = V₁ + V₂ + V₃).',
        topic: 'Series Rules',
        difficulty: 'Easy'
      },
      {
        id: 2,
        question: 'In a parallel circuit, which quantity is identical across all parallel branches?',
        options: [
          'Electric current',
          'Potential difference (Voltage)',
          'Resistance',
          'Power dissipated'
        ],
        correctIndex: 1,
        explanation: 'All parallel branches are connected between the same two common nodes. Therefore, the potential difference (V) across each parallel branch is identical.',
        topic: 'Parallel Rules',
        difficulty: 'Easy'
      },
      {
        id: 3,
        question: 'The equivalent resistance of any parallel combination is ALWAYS:',
        options: [
          'Greater than the largest individual resistance',
          'Equal to the arithmetic average of the resistances',
          'Smaller than the smallest individual resistance in the combination',
          'Equal to the sum of all individual resistances'
        ],
        correctIndex: 2,
        explanation: 'Connecting resistors in parallel adds more paths for current flow, decreasing total resistance. Hence Rₚ is always smaller than the smallest component resistor.',
        topic: 'Parallel Principle',
        difficulty: 'Medium'
      },
      {
        id: 4,
        question: 'Two resistors of 4 Ω and 12 Ω are connected in parallel across an 8 V battery. The total current drawn from the battery is:',
        options: [
          '2.67 A',
          '0.5 A',
          '3.0 A',
          '1.5 A'
        ],
        correctIndex: 0,
        explanation: 'Rₚ = (4 × 12) / (4 + 12) = 48 / 16 = 3 Ω. Total current I = V / Rₚ = 8 V / 3 Ω = 2.67 A.',
        topic: 'Circuit Numerical',
        difficulty: 'Medium',
        formula: 'I = V / Rₚ = 8 / 3 = 2.67 A'
      },
      {
        id: 5,
        question: 'How can three resistors of 2 Ω, 3 Ω, and 6 Ω be connected to give an equivalent resistance of 4 Ω?',
        options: [
          'All three in series',
          'All three in parallel',
          '3 Ω and 6 Ω in parallel, then connected in series with 2 Ω',
          '2 Ω and 3 Ω in parallel, then connected in series with 6 Ω'
        ],
        correctIndex: 2,
        explanation: 'Parallel of 3 Ω and 6 Ω: R_p = (3 × 6) / (3 + 6) = 18 / 9 = 2 Ω. Then connect in series with 2 Ω: R_total = 2 Ω + 2 Ω = 4 Ω.',
        topic: 'Textbook Combination',
        difficulty: 'Hard',
        boardYear: 'AP SSC Textbook Problem 11'
      },
      {
        id: 6,
        question: 'How can the same three resistors of 2 Ω, 3 Ω, and 6 Ω be connected to give an equivalent resistance of 1 Ω?',
        options: [
          'All three in series',
          'All three in parallel',
          '2 Ω and 3 Ω in series, parallel with 6 Ω',
          '2 Ω and 6 Ω in parallel, series with 3 Ω'
        ],
        correctIndex: 1,
        explanation: 'In parallel: 1/Rₚ = 1/2 + 1/3 + 1/6 = (3 + 2 + 1) / 6 = 6/6 = 1 ⇒ Rₚ = 1 Ω.',
        topic: 'Textbook Combination',
        difficulty: 'Medium',
        boardYear: 'AP SSC Textbook Problem 11'
      },
      {
        id: 7,
        question: 'If n identical resistors of resistance R each are connected in parallel, the equivalent resistance is:',
        options: [
          'n · R',
          'R / n',
          'n² · R',
          'R / n²'
        ],
        correctIndex: 1,
        explanation: '1/Rₚ = 1/R + 1/R + ... (n times) = n/R ⇒ Rₚ = R / n.',
        topic: 'Formula Shortcut',
        difficulty: 'Easy',
        formula: 'Rₚ = R / n'
      },
      {
        id: 8,
        question: 'Three resistors of 5 Ω, 10 Ω, and 30 Ω are connected in parallel across a 12 V battery. The current through the 10 Ω resistor is:',
        options: [
          '2.4 A',
          '1.2 A',
          '0.4 A',
          '4.0 A'
        ],
        correctIndex: 1,
        explanation: 'In parallel, voltage across each branch is 12 V. Current through the 10 Ω branch: I₂ = V / R₂ = 12 V / 10 Ω = 1.2 A.',
        topic: 'Branch Current',
        difficulty: 'Medium',
        formula: 'I₂ = V / R₂ = 12 / 10 = 1.2 A',
        boardYear: 'AP SSC Example 8'
      },
      {
        id: 9,
        question: 'If two identical 100 W light bulbs are connected in SERIES across 220 V mains, the brightness of each bulb will be:',
        options: [
          'Same as when connected in parallel',
          'Twice as bright',
          'Much dimmer (each receives only 110 V)',
          'Zero (they will explode)'
        ],
        correctIndex: 2,
        explanation: 'In series, voltage divides equally: each bulb receives only 110 V instead of 220 V. Since power P ∝ V², each bulb operates at one-fourth power (25 W), glowing very dimly.',
        topic: 'Practical Combination',
        difficulty: 'Medium'
      },
      {
        id: 10,
        question: 'What is the highest equivalent resistance that can be obtained by combining four resistors of 4 Ω, 8 Ω, 12 Ω, and 24 Ω?',
        options: [
          '48 Ω (in series)',
          '2 Ω (in parallel)',
          '24 Ω',
          '16 Ω'
        ],
        correctIndex: 0,
        explanation: 'Highest resistance is always obtained by connecting in series: R_max = 4 + 8 + 12 + 24 = 48 Ω.',
        topic: 'Textbook Problem 5',
        difficulty: 'Easy',
        formula: 'R_max = ΣR = 48 Ω',
        boardYear: 'AP SSC Textbook Problem 5'
      }
    ]
  },
  {
    id: 'topic-test-4',
    title: 'Topic Test 4: Heating, Power & Safety Devices',
    subtitle: '10 High-Yield Exam Questions on Energy & Domestic Wiring',
    category: 'Topic Test',
    badge: '10 Marks · 15 Mins',
    durationMinutes: 15,
    totalMarks: 10,
    description: 'Master electric power formulas (P = VI = I²R = V²/R), electricity bill calculations, fuse ratings, and earthing protection physics.',
    questions: [
      {
        id: 1,
        question: 'Which of the following expressions does NOT represent electrical power in a circuit?',
        options: [
          'I² · R',
          'I · R²',
          'V · I',
          'V² / R'
        ],
        correctIndex: 1,
        explanation: 'Power formulas are P = V·I = I²·R = V² / R. The expression I·R² is physically incorrect and does not represent power.',
        topic: 'Power Formulas',
        difficulty: 'Easy',
        boardYear: 'AP SSC Textbook Problem 2'
      },
      {
        id: 2,
        question: 'An electric heater draws 5 A of current from 220 V supply. The power rating of the heater is:',
        options: [
          '44 W',
          '1100 W',
          '225 W',
          '550 W'
        ],
        correctIndex: 1,
        explanation: 'P = V · I = 220 V × 5 A = 1100 Watts (W) = 1.1 kW.',
        topic: 'Power Numerical',
        difficulty: 'Easy',
        formula: 'P = V · I = 1100 W'
      },
      {
        id: 3,
        question: 'An electric refrigerator rated 400 W operates 8 hours/day. What is the cost of energy to operate it for 30 days at ₹ 3.00 per kWh?',
        options: [
          '₹ 288.00',
          '₹ 96.00',
          '₹ 28.80',
          '₹ 144.00'
        ],
        correctIndex: 0,
        explanation: 'Total energy in 30 days = 400 W × 8 h/day × 30 days = 96,000 W·h = 96 kWh. Cost = 96 kWh × ₹ 3.00/kWh = ₹ 288.00.',
        topic: 'Electricity Bill',
        difficulty: 'Hard',
        formula: 'Energy = 96 kWh; Cost = ₹ 288',
        boardYear: 'AP SSC Textbook Problem 16'
      },
      {
        id: 4,
        question: 'Why is tungsten metal used almost exclusively for filaments of incandescent lamps?',
        options: [
          'It has low melting point and dissolves easily',
          'It has extremely high melting point (3380°C) and emits white light without melting',
          'It is a poor conductor of electricity',
          'It reacts vigorously with atmospheric nitrogen'
        ],
        correctIndex: 1,
        explanation: 'Tungsten has an exceptionally high melting point (3380°C) and high tensile strength. At 2500°C–3000°C, it glows incandescently emitting bright light without melting.',
        topic: 'Bulb Filament',
        difficulty: 'Easy',
        boardYear: 'AP SSC 2018'
      },
      {
        id: 5,
        question: 'Why are electric bulbs filled with chemically unreactive gases like Argon or Nitrogen?',
        options: [
          'To generate extra light through nuclear fusion',
          'To prevent oxidation and prolong the life of the tungsten filament',
          'To decrease the electricity consumption to zero',
          'To make the glass bulb unbreakable'
        ],
        correctIndex: 1,
        explanation: 'If air were present, oxygen would instantly oxidize and burn the hot tungsten filament. Inactive gases like nitrogen and argon prevent oxidation and reduce tungsten evaporation.',
        topic: 'Bulb Gas',
        difficulty: 'Medium'
      },
      {
        id: 6,
        question: 'If an electric iron of 1 kW is operated on a 220 V supply, what rating of fuse should be used in the circuit?',
        options: [
          '1 A',
          '2 A',
          '5 A',
          '20 A'
        ],
        correctIndex: 2,
        explanation: 'Current drawn I = P / V = 1000 W / 220 V = 4.54 A. The fuse rating must be slightly higher than the operating current, so a standard 5 A fuse must be used.',
        topic: 'Fuse Rating Choice',
        difficulty: 'Medium',
        formula: 'I = P / V = 4.54 A ⇒ 5 A fuse',
        boardYear: 'AP SSC Textbook Problem 14'
      },
      {
        id: 7,
        question: 'The purpose of connecting the metal casing of high-power appliances (like iron, refrigerator, washing machine) to an Earth wire is:',
        options: [
          'To prevent the appliance from drawing excess current from the mains',
          'To provide a low-resistance path to the ground so any leakage current flows to earth without shocking the user',
          'To increase the heating efficiency of the appliance',
          'To convert alternating current into direct current'
        ],
        correctIndex: 1,
        explanation: 'Earthing connects the metal body to a copper plate buried deep in the earth. If live wire insulation fails and touches the body, current rushes to ground (path of least resistance), blowing the fuse and protecting the user.',
        topic: 'Earthing Safety',
        difficulty: 'Medium',
        boardYear: 'AP SSC 2019'
      },
      {
        id: 8,
        question: 'A short circuit occurs in a domestic electrical circuit when:',
        options: [
          'The circuit switch is kept open',
          'The live wire and neutral wire come into direct physical contact due to damaged insulation',
          'The earth wire is disconnected from the socket',
          'A bird sits on a single overhead power line'
        ],
        correctIndex: 1,
        explanation: 'When live wire and neutral wire touch directly, circuit resistance drops near zero (R ≈ 0). By Ohm’s law (I = V/R), an extremely large current surges instantly, causing sparks and fire.',
        topic: 'Short Circuiting',
        difficulty: 'Easy'
      },
      {
        id: 9,
        question: 'Two electric bulbs are marked 60 W and 100 W. Both are designed for 220 V. Which bulb has GREATER filament resistance?',
        options: [
          'The 100 W bulb',
          'The 60 W bulb',
          'Both have equal resistance',
          'Resistance depends on how long the switch is kept on'
        ],
        correctIndex: 1,
        explanation: 'From R = V² / P: Since voltage is constant (220 V), resistance is inversely proportional to power (R ∝ 1/P). Lower wattage (60 W) has higher resistance: R₆₀ = 806.7 Ω vs R₁₀₀ = 484 Ω.',
        topic: 'Bulb Resistance Comparison',
        difficulty: 'Hard',
        formula: 'R ∝ 1 / P (R₆₀ > R₁₀₀)'
      },
      {
        id: 10,
        question: 'Two conducting wires of the same material, equal lengths, and equal diameters are first connected in series and then in parallel across the same potential difference. The ratio of heat produced in series to that in parallel is:',
        options: [
          '1 : 2',
          '2 : 1',
          '1 : 4',
          '4 : 1'
        ],
        correctIndex: 2,
        explanation: 'Let resistance of each wire be R. Series resistance R_s = 2R. Parallel resistance R_p = R/2. Since voltage V is constant: H = (V²/R_eff)·t. H_s / H_p = (V²/2R) / (V²/(R/2)) = (1/2) / 2 = 1/4 = 1 : 4.',
        topic: 'Heat Ratio Numerical',
        difficulty: 'Hard',
        formula: 'H_s / H_p = 1 : 4',
        boardYear: 'AP SSC Textbook Problem 4'
      }
    ]
  },
  {
    id: 'notebook-board-test',
    title: 'Notebook Exam: Resistor Combos & Matching Pairs',
    subtitle: 'From Classroom Notebook (With Hidden Solutions & Formulas)',
    category: 'Numerical Special',
    badge: 'Notebook Board Exam (10 Qs)',
    durationMinutes: 15,
    totalMarks: 10,
    description: 'Directly covers the questions from the student notebook: Three 2 Ω resistor combinations (all 4 cases) and Matching Pairs for Physical Units and Mathematical Formulas.',
    questions: [
      {
        id: 1,
        question: 'Arrange three 2 Ω resistors with equal length in maximum number of combinations. How many distinct combinations are possible, and what is the maximum total resistance?',
        options: [
          '4 combinations; Maximum resistance = 6 Ω (All three in series)',
          '3 combinations; Maximum resistance = 4 Ω',
          '2 combinations; Maximum resistance = 8 Ω',
          '5 combinations; Maximum resistance = 12 Ω'
        ],
        correctIndex: 0,
        explanation: 'Three identical 2 Ω resistors can be arranged in exactly 4 distinct combinations:\n1. All three in series: R = 2 + 2 + 2 = 6 Ω (Maximum Resistance)\n2. All three in parallel: 1/R = 1/2 + 1/2 + 1/2 = 3/2 ⇒ R = 2/3 Ω ≈ 0.67 Ω (Minimum Resistance)\n3. Two in parallel + one in series: (2 ∥ 2) + 2 = 1 + 2 = 3 Ω\n4. Two in series in parallel with the third: (2 + 2) ∥ 2 = 4 ∥ 2 = (4×2)/(4+2) = 4/3 Ω ≈ 1.33 Ω.',
        topic: 'Resistor Combinations',
        difficulty: 'Medium',
        formula: 'R_series = R₁ + R₂ + R₃ = 6 Ω',
        boardYear: 'Handwritten Notebook Page Q1'
      },
      {
        id: 2,
        question: 'What is the equivalent resistance when all three 2 Ω resistors are connected in PARALLEL?',
        options: [
          '2/3 Ω (≈ 0.67 Ω, Minimum possible resistance)',
          '1.5 Ω',
          '6 Ω',
          '1/3 Ω (≈ 0.33 Ω)'
        ],
        correctIndex: 0,
        explanation: 'In parallel combination: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃ = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹. Inverting both sides gives R_p = 2/3 Ω ≈ 0.667 Ω. This is the minimum possible resistance from these three resistors.',
        topic: 'Parallel Combination',
        difficulty: 'Easy',
        formula: '1/R_p = 1/2 + 1/2 + 1/2 = 3/2 ⇒ R_p = 2/3 Ω',
        boardYear: 'Handwritten Notebook Page Q1'
      },
      {
        id: 3,
        question: 'When two 2 Ω resistors are connected in parallel and this combination is connected in series with the third 2 Ω resistor, what is the total equivalent resistance?',
        options: [
          '3 Ω  [(2 ∥ 2) + 2 = 1 + 2 = 3 Ω]',
          '4 Ω',
          '1.33 Ω',
          '0.67 Ω'
        ],
        correctIndex: 0,
        explanation: 'Step 1: Parallel combination of two 2 Ω resistors: R_p = (2 × 2) / (2 + 2) = 4 / 4 = 1 Ω.\nStep 2: Add the third 2 Ω resistor in series with this parallel branch: R_total = 1 Ω + 2 Ω = 3 Ω.',
        topic: 'Mixed Resistor Network',
        difficulty: 'Medium',
        formula: 'R_total = (R₁ ∥ R₂) + R₃ = 1 + 2 = 3 Ω',
        boardYear: 'Handwritten Notebook Page Q1'
      },
      {
        id: 4,
        question: 'When two 2 Ω resistors are connected in series and their combination is connected in parallel with the third 2 Ω resistor, what is the total equivalent resistance?',
        options: [
          '4/3 Ω (≈ 1.33 Ω)  [(2 + 2) ∥ 2 = 4 ∥ 2 = 4/3 Ω]',
          '3 Ω',
          '2.5 Ω',
          '2/3 Ω (≈ 0.67 Ω)'
        ],
        correctIndex: 0,
        explanation: 'Step 1: The two series resistors give: R_s = 2 Ω + 2 Ω = 4 Ω.\nStep 2: This 4 Ω branch is in parallel with the third 2 Ω resistor: R_total = (4 × 2) / (4 + 2) = 8 / 6 = 4/3 Ω ≈ 1.33 Ω.',
        topic: 'Mixed Resistor Network',
        difficulty: 'Medium',
        formula: 'R_total = (R₁ + R₂) ∥ R₃ = 4 ∥ 2 = 4/3 Ω',
        boardYear: 'Handwritten Notebook Page Q1'
      },
      {
        id: 5,
        question: 'From the notebook "Match the following: Terms & Units", what is the correct unit of Specific Resistivity?',
        options: [
          'ohm-m (Ω·m)',
          'ohm (Ω)',
          'Watt (W)',
          'Coulomb (C)'
        ],
        correctIndex: 0,
        explanation: 'From the formula ρ = R·(A/l): Unit of R is Ω, area A is m², length l is m. Unit of ρ = Ω × m² / m = Ω·m (ohm-meter). In the notebook table, Specific Resistivity matches with (a) ohm-m.',
        topic: 'Specific Resistivity Unit',
        difficulty: 'Easy',
        formula: 'Unit of ρ = ohm-meter (Ω·m)',
        boardYear: 'Handwritten Notebook Page Q2'
      },
      {
        id: 6,
        question: 'From the notebook "Match the following: Terms & Units", what is the commercial unit of Electric Energy?',
        options: [
          'kWh (kilowatt-hour)',
          'Watt (W)',
          'Ampere (A)',
          'Volt (V)'
        ],
        correctIndex: 0,
        explanation: 'Commercial electrical energy consumed in households and industries is measured in kilowatt-hours (kWh), also called "units". 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ Joules. In the notebook table, Electric energy matches with (c) kWh.',
        topic: 'Commercial Energy Unit',
        difficulty: 'Easy',
        formula: '1 kWh = 3.6 × 10⁶ Joules',
        boardYear: 'Handwritten Notebook Page Q2'
      },
      {
        id: 7,
        question: 'From the notebook "Match the following: Terms & Formulas", which mathematical formula represents Potential Difference (V)?',
        options: [
          'W / q  (Work done per unit charge)',
          'V × I',
          'I²Rt',
          'ρ(l / A)'
        ],
        correctIndex: 0,
        explanation: 'Electric potential difference V is defined as the work done (W) to displace a unit positive charge (q) between two points in an electric field: V = W / q. In the notebook table, Potential difference matches with (e) W / q.',
        topic: 'Potential Difference Formula',
        difficulty: 'Easy',
        formula: 'V = W / q  (1V = 1J / 1C)',
        boardYear: 'Handwritten Notebook Page Q3'
      },
      {
        id: 8,
        question: 'From the notebook "Match the following: Terms & Formulas", what is the formula for Electric Charge (q)?',
        options: [
          'i × t  (Current × time)',
          'q / t',
          'W / q',
          'P × t'
        ],
        correctIndex: 0,
        explanation: 'Electric current is the rate of flow of charge: I = q / t. Rearranging gives q = I × t (or i × t). In the notebook table, Electric charge matches with (g) i × t.',
        topic: 'Electric Charge Formula',
        difficulty: 'Easy',
        formula: 'q = i × t',
        boardYear: 'Handwritten Notebook Page Q3'
      },
      {
        id: 9,
        question: 'From the notebook "Match the following: Terms & Formulas", what is the mathematical expression for Joule\'s Heat?',
        options: [
          'I²Rt  (Current squared × resistance × time)',
          'V × I',
          'R(A / l)',
          'P × t'
        ],
        correctIndex: 0,
        explanation: 'Joule\'s Law of Heating states that heat produced in a resistor of resistance R when current I flows for time t is given by H = I²Rt. In the notebook table, Joule Heat matches with (f) I²Rt.',
        topic: 'Joule\'s Law of Heating',
        difficulty: 'Easy',
        formula: 'H = I²Rt',
        boardYear: 'Handwritten Notebook Page Q3'
      },
      {
        id: 10,
        question: 'From the notebook "Match the following: Terms & Formulas", what is the formula for Specific Resistivity (ρ)?',
        options: [
          'R(A / l)',
          'ρ(l / A)',
          'q / t',
          'W / q'
        ],
        correctIndex: 0,
        explanation: 'Starting with resistance of a conductor R = ρ(l / A). Multiplying by A and dividing by l gives specific resistivity ρ = R(A / l). In the notebook table, Specific resistivity matches with (a) R(A / l).',
        topic: 'Specific Resistivity Formula',
        difficulty: 'Easy',
        formula: 'ρ = R(A / l)',
        boardYear: 'Handwritten Notebook Page Q3'
      }
    ]
  }
];
