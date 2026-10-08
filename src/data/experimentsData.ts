import { ExperimentItem } from '../types';

export const EXPERIMENTS_DATA: ExperimentItem[] = [
  {
    id: 'exp-ohms-law',
    number: 1,
    title: '1. To Verify Ohm’s Law (10 Headings & Animated Lab)',
    type: 'ohms_law',
    data: {
      aim: 'To determine the resistance of a given resistor by plotting a graph of potential difference (V) versus electric current (I) and to verify Ohm’s law (V ∝ I at constant temperature).',
      requiredMaterials: [
        'DC Battery / Power supply (6 V or 3–4 cells of 1.5 V each in series)',
        'Unknown Resistor / Nichrome resistance wire (R ≈ 5 Ω)',
        'DC Ammeter (0–1.5 A or 0–3 A, connected in series)',
        'DC Voltmeter (0–6 V or 0–10 V, connected in parallel)',
        'Rheostat (variable resistor 0–50 Ω)',
        'Plug Key (one-way switch)',
        'Connecting wires and sandpaper'
      ],
      equation: 'R = V / I  (where V is Potential Difference, I is Electric Current, R is Resistance)',
      procedure: [
        'Clean the ends of all connecting wires with sandpaper to eliminate insulating oxide layers.',
        'Connect the battery, plug key, rheostat, ammeter, and given resistor in series as shown in the circuit diagram.',
        'Connect the voltmeter strictly in parallel across the terminals of the unknown resistor with correct polarities (+ to +, − to −).',
        'Check for zero error and calculate the least count of both the ammeter and voltmeter.',
        'Insert the plug key and adjust the rheostat slider to set a small initial reading in the ammeter.',
        'Note the current (I) on the ammeter and potential difference (V) on the voltmeter.',
        'Shift the rheostat slider to 4–5 different positions to record different pairs of V and I readings.',
        'Calculate the ratio R = V / I for each trial and observe whether it remains constant.',
        'Plot a graph taking Current (I) on the horizontal X-axis and Potential Difference (V) on the vertical Y-axis.'
      ],
      observation: 'As the potential difference (V) across the resistor increases, the electric current (I) increases in direct proportion. The calculated ratio R = V/I remains practically constant for all observations (Mean R ≈ 5.00 Ω). The V vs I graph is a straight line passing through the origin (0, 0).',
      conclusion: 'The ratio V / I is constant, proving that at constant temperature, the current is directly proportional to the potential difference (V ∝ I). Ohm’s law is successfully verified. The resistance equals the slope of the V vs I graph (R = ΔV / ΔI = 5.00 Ω).',
      precautions: [
        'All circuit connections must be clean and tight.',
        'Pass current only while taking readings; remove the plug key immediately after reading to avoid heating the resistor.'
      ],
      tableColumns: ['Serial Number', 'Potential Difference V (V)', 'Current I (A)', 'Resistance R = V/I (Ω)'],
      defaultRows: [
        { trial: 1, v: '1.0', i: '0.20', r: '5.00' },
        { trial: 2, v: '2.0', i: '0.40', r: '5.00' },
        { trial: 3, v: '3.0', i: '0.60', r: '5.00' },
        { trial: 4, v: '4.0', i: '0.80', r: '5.00' },
        { trial: 5, v: '5.0', i: '1.00', r: '5.00' }
      ],
      graphDescription: 'Coordinate graph of Potential Difference V (Volts) on Y-axis plotted against Current I (Amperes) on X-axis.',
      studyOfGraph: [
        'The V vs I graph is a clean straight line passing directly through the origin (0, 0).',
        'A straight line passing through the origin mathematically confirms direct proportionality: V ∝ I.',
        'Slope of the line = ΔV / ΔI = (4.0 - 2.0) / (0.80 - 0.40) = 2.0 / 0.40 = 5.00 Ω, which gives the electrical resistance R of the conductor.'
      ]
    }
  },
  {
    id: 'exp-length',
    number: 2,
    title: 'Experiment 2: To Show Resistance Depends on Length of Conductor',
    type: 'length',
    data: {
      aim: 'To investigate the dependence of electrical resistance on the length of a conductor (using nichrome wires of identical thickness but different lengths) and verify R ∝ l.',
      requiredMaterials: [
        'Battery (6 V DC)',
        'Ammeter (0–3 A)',
        'Voltmeter (0–10 V)',
        'Four pieces of identical gauge nichrome wires of lengths 25 cm, 50 cm, 75 cm, and 100 cm',
        'Plug key, rheostat, and connecting wires'
      ],
      equation: 'R ∝ l  (when cross-sectional area A, material, and temperature remain constant)',
      procedure: [
        'Connect the battery, ammeter, rheostat, and plug key in series.',
        'Insert the first nichrome wire of length l = 25 cm between two binding terminals.',
        'Connect the voltmeter across the wire ends in parallel.',
        'Close the plug key, record the voltmeter (V) and ammeter (I) readings, and calculate R₁ = V₁ / I₁.',
        'Repeat the identical measurement procedure for wires of lengths 50 cm, 75 cm, and 100 cm using the exact same battery voltage setting.',
        'Tabulate the measured resistance R against wire length l and plot a graph of R vs l.'
      ],
      observation: 'As the length of the nichrome wire increases from 25 cm to 100 cm, the ammeter current decreases and the calculated resistance R increases proportionally from 2.0 Ω to 8.0 Ω.',
      conclusion: 'The electrical resistance of a conductor is directly proportional to its length (R ∝ l). When length is doubled, resistance doubles; when length is quadrupled, resistance quadruples.',
      precautions: [
        'All tested wires must be drawn from the exact same spool and have identical diameter (cross-sectional area).',
        'Do not stretch or bend the wires sharply, and take readings swiftly to prevent heating effects.'
      ],
      tableColumns: ['Length l (cm)', 'Voltage V (V)', 'Current I (A)', 'Resistance R (Ω)', 'R / l Ratio (Ω/cm)'],
      defaultRows: [
        { length: 25, v: '4.0', i: '2.00', r: '2.00', ratio: '0.08' },
        { length: 50, v: '4.0', i: '1.00', r: '4.00', ratio: '0.08' },
        { length: 75, v: '4.0', i: '0.67', r: '6.00', ratio: '0.08' },
        { length: 100, v: '4.0', i: '0.50', r: '8.00', ratio: '0.08' }
      ],
      graphDescription: 'Graph of Resistance R (Ω) on Y-axis against Wire Length l (cm) on X-axis.',
      studyOfGraph: [
        'The plot of Resistance (R) versus Length (l) is a clean straight line passing through the origin (0, 0).',
        'A straight line through the origin confirms that R ∝ l.',
        'Slope of the line = ΔR / Δl = (8.0 - 2.0) Ω / (100 - 25) cm = 6.0 / 75 = 0.08 Ω/cm = ρ / A (resistance per unit length).'
      ]
    }
  },
  {
    id: 'exp-area',
    number: 3,
    title: 'Experiment 3: To Show Resistance Depends on Cross-Sectional Area',
    type: 'area',
    data: {
      aim: 'To demonstrate that the electrical resistance of a conductor is inversely proportional to its cross-sectional area (thickness) and verify R ∝ 1/A.',
      requiredMaterials: [
        '6 V DC battery source',
        'Ammeter (0–5 A)',
        'Voltmeter (0–10 V)',
        'Three nichrome wires of identical length (50 cm) but varying thickness: Thin (0.2 mm²), Medium (0.4 mm²), and Thick (0.8 mm²)',
        'Screw gauge (micrometer) to verify wire diameter',
        'Plug key and connecting wires'
      ],
      equation: 'R ∝ 1 / A  ⇒  R · A = Constant (for constant length, material, and temperature)',
      procedure: [
        'Measure the diameter and calculate the cross-sectional area A = πd²/4 of each of the three wires.',
        'Connect the circuit in series with the battery, ammeter, plug key, and the first (thin) wire.',
        'Connect the voltmeter across the wire terminals.',
        'Record V and I readings, and calculate R_thin = V / I.',
        'Substitute the medium and thick wires of the same 50 cm length into the circuit sequentially.',
        'Record the new current values and compute resistance for each wire.',
        'Plot a graph of Resistance (R) vs 1/Area (1/A).'
      ],
      observation: 'As wire cross-sectional area increases (thicker wire), current I increases significantly and measured resistance R decreases in exact inverse proportion. The product R × A remains constant.',
      conclusion: 'The electrical resistance of a conductor is inversely proportional to its cross-sectional area (R ∝ 1/A). A thicker wire offers much less resistance to current flow than a thin wire of the same length and material.',
      precautions: [
        'Measure wire diameters at several points using a screw gauge to ensure uniform thickness.',
        'Keep the exposed length of all test wires strictly equal (50 cm).'
      ],
      tableColumns: ['Wire Gauge', 'Area A (mm²)', 'Voltage V (V)', 'Current I (A)', 'Resistance R (Ω)', 'R × A Product (Ω·mm²)'],
      defaultRows: [
        { wire: 'Thin (SWG 36)', a: '0.20', v: '4.0', i: '0.40', r: '10.00', product: '2.00' },
        { wire: 'Medium (SWG 30)', a: '0.40', v: '4.0', i: '0.80', r: '5.00', product: '2.00' },
        { wire: 'Thick (SWG 24)', a: '0.80', v: '4.0', i: '1.60', r: '2.50', product: '2.00' },
        { wire: 'Heavy (SWG 20)', a: '1.60', v: '4.0', i: '3.20', r: '1.25', product: '2.00' }
      ],
      graphDescription: 'Graph of Resistance R (Ω) plotted against reciprocal of area (1/A in mm⁻²).',
      studyOfGraph: [
        'When R is plotted against 1/A, the resulting curve is a straight line passing through the origin.',
        'Linearity between R and 1/A conclusively proves the inverse relationship: R ∝ 1/A.',
        'Conversely, plotting R against A yields a rectangular hyperbola asymptotic to both axes.'
      ]
    }
  },
  {
    id: 'exp-temperature',
    number: 4,
    title: 'Experiment 4: To Show Resistance Depends on Temperature',
    type: 'temperature',
    data: {
      aim: 'To observe and measure how the electrical resistance of a pure metallic conductor increases with increasing temperature.',
      requiredMaterials: [
        'Coil of thin copper / iron wire insulated with varnish or ceramic',
        'Water bath / oil bath with heating burner / immersion element',
        'Laboratory thermometer (0–100 °C)',
        'Regulated DC power supply (3 V)',
        'Digital milliammeter and voltmeter (or sensitive digital ohmmeter)',
        'Stirrer and insulated connecting leads'
      ],
      equation: 'R_T = R₀ (1 + α · ΔT)  ⇒  Resistance increases linearly with temperature for pure metals',
      procedure: [
        'Immerse the metal wire coil into a beaker filled with water/oil, ensuring terminals stay above liquid.',
        'Place the thermometer in the bath near the coil and stir well to achieve uniform temperature.',
        'Connect the coil into the testing circuit and record initial room temperature (25 °C) along with V and I.',
        'Calculate initial cold resistance R = V / I.',
        'Gently heat the bath using the burner, stirring continuously.',
        'At intervals of 15 °C (40 °C, 55 °C, 70 °C, 85 °C), record voltage, current, and bath temperature.',
        'Tabulate temperature T and computed resistance R, and plot R vs T.'
      ],
      observation: 'As bath temperature rises from 25 °C to 85 °C, the current passing through the metallic coil steadily decreases from 0.60 A to 0.48 A under constant voltage, indicating that resistance increases from 5.00 Ω to 6.25 Ω.',
      conclusion: 'The electrical resistance of pure metallic conductors increases with an increase in temperature due to enhanced lattice thermal vibrations that impede electron drift. (Metals have a positive temperature coefficient of resistance, α > 0).',
      precautions: [
        'Stir the water bath constantly so the thermometer records true coil temperature.',
        'Do not let coil wires touch the metal vessel walls directly to prevent ground short-circuiting.'
      ],
      tableColumns: ['Temperature T (°C)', 'Voltage V (V)', 'Current I (A)', 'Resistance R (Ω)', 'ΔR (Ω)'],
      defaultRows: [
        { temp: 25, v: '3.0', i: '0.60', r: '5.00', delta: '0.00' },
        { temp: 40, v: '3.0', i: '0.57', r: '5.26', delta: '+0.26' },
        { temp: 55, v: '3.0', i: '0.54', r: '5.56', delta: '+0.56' },
        { temp: 70, v: '3.0', i: '0.51', r: '5.88', delta: '+0.88' },
        { temp: 85, v: '3.0', i: '0.48', r: '6.25', delta: '+1.25' }
      ],
      graphDescription: 'Graph of Resistance R (Ω) on Y-axis against Temperature T (°C) on X-axis.',
      studyOfGraph: [
        'The R-T graph is a rising straight line with a positive slope (for the working temperature range).',
        'The positive slope confirms that resistance increases steadily with temperature for metallic conductors.',
        'The Y-intercept represents the conductor resistance at 0 °C (R₀).'
      ]
    }
  },
  {
    id: 'exp-material',
    number: 5,
    title: 'Experiment 5: To Show Resistance Depends on Nature of Material',
    type: 'material',
    data: {
      aim: 'To compare the electrical resistance and resistivity of different materials (Copper, Aluminium, Nichrome, and Constantan) having identical length (1 m) and identical cross-sectional area (1 mm²).',
      requiredMaterials: [
        '4 samples of wire of identical length (100 cm) and diameter (1.13 mm, A = 1 mm²): Copper, Aluminium, Nichrome, and Constantan',
        'DC power supply (2 V regulated)',
        'Precision DC ammeter (0–10 A)',
        'Precision DC voltmeter (0–3 V)',
        'Plug key and crocodile connector clips'
      ],
      equation: 'R = ρ · (l / A)  ⇒  Since l and A are identical, R ∝ ρ (Resistance depends directly on material resistivity)',
      procedure: [
        'Check that all four wires have identical length (100 cm) and identical diameter (1.13 mm).',
        'Set the DC power supply to a steady 2.0 V.',
        'Connect the copper wire into the circuit first and close the plug key.',
        'Record the ammeter current and voltmeter reading, and calculate R_copper = V / I.',
        'Disconnect copper and replace it sequentially with aluminium, constantan, and nichrome wires.',
        'Record the respective current and calculate resistance for each material.',
        'Compare the measured resistances and deduce relative resistivities.'
      ],
      observation: 'Even though all four wires have the exact same dimensions, copper allows the highest current (I = 118 A equivalent / R = 0.017 Ω) and lowest resistance, aluminium offers slightly higher resistance (0.028 Ω), constantan offers high resistance (0.49 Ω), and nichrome offers the highest resistance (1.10 Ω).',
      conclusion: 'Electrical resistance depends fundamentally on the nature of the material (its atomic structure and free electron density). Nichrome has about 60 times higher resistance than copper for the exact same dimensions, making copper ideal for transmission wires and nichrome ideal for heating elements.',
      precautions: [
        'Ensure the length of wire tested between the terminal clips is measured accurately to 100.0 cm.',
        'Do not leave current running through nichrome for prolonged periods to avoid heating which shifts resistance.'
      ],
      tableColumns: ['Material', 'Length (m)', 'Area (mm²)', 'Voltage V (V)', 'Current I (A)', 'Measured R (Ω)', 'Resistivity ρ (Ω·m)'],
      defaultRows: [
        { material: 'Copper', l: '1.0', a: '1.0', v: '0.10', i: '5.88', r: '0.017', rho: '1.7 × 10⁻⁸' },
        { material: 'Aluminium', l: '1.0', a: '1.0', v: '0.10', i: '3.57', r: '0.028', rho: '2.8 × 10⁻⁸' },
        { material: 'Constantan (Alloy)', l: '1.0', a: '1.0', v: '1.00', i: '2.04', r: '0.490', rho: '4.9 × 10⁻⁷' },
        { material: 'Nichrome (Alloy)', l: '1.0', a: '1.0', v: '2.00', i: '1.82', r: '1.100', rho: '1.1 × 10⁻⁶' }
      ],
      graphDescription: 'Bar chart / comparative graph plotting the resistance (Ω) of identical 1 m × 1 mm² samples across the four materials.',
      studyOfGraph: [
        'Copper shows the lowest bar (0.017 Ω), followed by Aluminium (0.028 Ω). Both are excellent conductors.',
        'Alloys like Constantan (0.49 Ω) and Nichrome (1.10 Ω) show dramatically taller resistance bars.',
        'Nichrome resistance is ~65× that of copper, proving that alloys have much higher resistivity than their constituent pure metals.'
      ]
    }
  }
];
