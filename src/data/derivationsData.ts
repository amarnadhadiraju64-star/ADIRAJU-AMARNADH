import { DerivationItem } from '../types';

export const DERIVATIONS_DATA: DerivationItem[] = [
  {
    id: 'resistivity-derivation',
    title: 'A) Derivation of Specific Resistivity (ρ)',
    description: 'Mathematical derivation of electrical resistivity from factors affecting the resistance of a conductor (length and cross-sectional area).',
    formula: 'ρ = (R · A) / l',
    visualType: 'resistivity',
    conclusion: 'Resistivity ρ = (R × A) / l. Its SI unit is ohm-metre (Ω·m). It is an intrinsic characteristic property of the conductor material and depends only on material nature and temperature, not on conductor dimensions.',
    steps: [
      {
        stepNumber: 1,
        title: 'Dependence on Length',
        math: 'R ∝ l  (at constant cross-sectional area and temperature)   ... [Equation 1]',
        explanation: 'The electrical resistance (R) of a uniform conductor is directly proportional to its length (l). Doubling the wire length doubles the collisions experienced by drifting electrons, doubling the resistance.'
      },
      {
        stepNumber: 2,
        title: 'Dependence on Cross-Sectional Area',
        math: 'R ∝ 1 / A  (at constant length and temperature)   ... [Equation 2]',
        explanation: 'The electrical resistance (R) is inversely proportional to its cross-sectional area (A). A thicker wire provides a wider path for electrons to flow freely with fewer bottleneck collisions.'
      },
      {
        stepNumber: 3,
        title: 'Combining Both Factors',
        math: 'R ∝ l / A   ... [Equation 3]',
        explanation: 'Combining Equation 1 and Equation 2 shows that resistance is proportional to the ratio of conductor length to its cross-sectional area.'
      },
      {
        stepNumber: 4,
        title: 'Introducing the Proportionality Constant (ρ)',
        math: 'R = ρ · (l / A)   ... [Equation 4]',
        explanation: 'To convert the proportionality into an equality, we introduce a constant of proportionality ρ (Greek letter "rho"), called the Specific Resistance or Electrical Resistivity of the material.',
        highlight: true
      },
      {
        stepNumber: 5,
        title: 'Rearranging for Resistivity (ρ)',
        math: 'ρ = (R · A) / l   ... [Equation 5]',
        explanation: 'Multiplying both sides by A and dividing by l isolates ρ as the subject of the formula.'
      },
      {
        stepNumber: 6,
        title: 'Derivation of SI Unit of Resistivity',
        math: 'Unit of ρ = (Unit of R × Unit of A) / (Unit of l) = (Ω × m²) / m = Ω · m (ohm-metre)',
        explanation: 'Substituting the SI units: Resistance in ohms (Ω), Area in square metres (m²), and length in metres (m). Metre in denominator cancels one metre in numerator, yielding Ω·m.'
      }
    ]
  },
  {
    id: 'ohms-law-derivation',
    title: 'B) Derivation of Ohm’s Law',
    description: 'Formulation of Ohm’s law from the relationship between electrostatic potential difference and steady electric current.',
    formula: 'V = I · R',
    visualType: 'ohms_law',
    conclusion: 'At constant temperature, potential difference across the ends of a conductor is directly proportional to current flowing through it: V = IR. The constant R is the resistance of the conductor.',
    steps: [
      {
        stepNumber: 1,
        title: 'Physical Basis: Electric Potential as Driving Force',
        math: 'Work done per unit charge: V = W / Q',
        explanation: 'Electric current is the continuous directed flow of free electrons. For electrons to drift steadily against internal collisions, work must be done. The battery maintains an electrostatic potential difference (V) between the terminals.'
      },
      {
        stepNumber: 2,
        title: 'Statement of Direct Proportionality',
        math: 'V ∝ I  (at constant temperature & physical conditions)',
        explanation: 'Georg Simon Ohm experimentally discovered that increasing the potential difference across a metallic wire produces a strictly proportional increase in current flowing through it, provided the wire temperature remains unchanged.'
      },
      {
        stepNumber: 3,
        title: 'Introducing Resistance Constant (R)',
        math: 'V / I = Constant = R   ... [Equation 1]',
        explanation: 'The ratio of potential difference (V) to current (I) is constant for a given conductor at constant temperature. This constant is named Resistance (R).'
      },
      {
        stepNumber: 4,
        title: 'Standard Ohm’s Law Equations',
        math: 'V = I · R   ⇒   I = V / R   ⇒   R = V / I',
        explanation: 'Rearranging allows us to solve for any of the three fundamental electrical quantities.',
        highlight: true
      },
      {
        stepNumber: 5,
        title: 'V-I Characteristic & Slope',
        math: 'Slope of V-I graph (with V on Y-axis and I on X-axis) = ΔV / ΔI = R',
        explanation: 'For any ohmic conductor, the graph between V and I is a straight line passing through the origin (0,0). The slope directly yields the resistance value in ohms.'
      }
    ]
  },
  {
    id: 'series-derivation',
    title: 'C) Derivation: Resistors in Series (R = R₁ + R₂ + R₃)',
    description: 'Complete step-by-step proof that equivalent resistance of resistors in series equals the sum of individual resistances: R_eq = R₁ + R₂ + R₃.',
    formula: 'R_eq = R₁ + R₂ + R₃',
    visualType: 'series',
    conclusion: 'In a series combination: 1) Equivalent resistance is the sum of individual resistances (R_eq = R₁ + R₂ + R₃). 2) Equivalent resistance is always greater than any individual resistance. 3) Total resistance in the circuit increases. 4) Series combination provides a single path for electric current; if the circuit opens, no current flows through all resistors.',
    steps: [
      {
        stepNumber: 1,
        title: 'Single Pathway & Constant Current (i)',
        math: 'i₁ = i₂ = i₃ = i  (Single continuous pathway)',
        explanation: 'Three resistors R₁, R₂, and R₃ are connected end-to-end in series across a battery. Because there is only one unbroken path for current to flow, the same electric current (i) flows through every resistor.'
      },
      {
        stepNumber: 2,
        title: 'Potential Difference Equation',
        math: '[ V_equivalent = V₁ + V₂ + V₃ ]',
        explanation: 'The total potential difference (V_equivalent) supplied by the battery across the combination is equal to the sum of the potential drops across the individual resistors.',
        highlight: true
      },
      {
        stepNumber: 3,
        title: 'Applying Ohm’s Law to Each Resistor',
        math: 'V₁ = i · R₁  ... [Equation ①]\nV₂ = i · R₂  ... [Equation ②]\nV₃ = i · R₃  ... [Equation ③]\nV_eq = i · R_eq  ... [Equation ④]',
        explanation: 'According to Ohm’s law (V = i·R), the voltage across R₁ is V₁ = i·R₁, across R₂ is V₂ = i·R₂, and across R₃ is V₃ = i·R₃. Across the whole equivalent circuit, V_eq = i·R_eq.'
      },
      {
        stepNumber: 4,
        title: 'Substituting Equations ①, ②, ③, ④ into Voltage Equation',
        math: 'V_eq = V₁ + V₂ + V₃\ni · R_eq = i · R₁ + i · R₂ + i · R₃',
        explanation: 'Substitute the expressions for V₁, V₂, V₃, and V_eq into the total voltage equation.'
      },
      {
        stepNumber: 5,
        title: 'Factoring Out Common Current (i)',
        math: 'i · R_eq = i · (R₁ + R₂ + R₃)',
        explanation: 'Factor out the common electric current i on the right side of the equation.'
      },
      {
        stepNumber: 6,
        title: 'Dividing by Current (i) & Final Result',
        math: '[ R_eq = R₁ + R₂ + R₃ ]',
        explanation: 'Dividing both sides by the non-zero current i yields the final formula: equivalent resistance equals the sum of individual resistances.',
        highlight: true
      }
    ]
  },
  {
    id: 'parallel-derivation',
    title: 'D) Derivation: Resistors in Parallel (1/R = 1/R₁ + 1/R₂ + 1/R₃)',
    description: 'Complete step-by-step proof that reciprocal of equivalent resistance in parallel equals sum of reciprocals: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃.',
    formula: '1 / R_eq = 1 / R₁ + 1 / R₂ + 1 / R₃',
    visualType: 'parallel',
    conclusion: 'In parallel combination, 1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃. Equivalent resistance Rₚ is always smaller than the smallest individual resistor. The potential difference across each branch is identical (V), while the total current splits: I = I₁ + I₂ + I₃.',
    steps: [
      {
        stepNumber: 1,
        title: 'Circuit Arrangement & Constant Voltage',
        math: 'V₁ = V₂ = V₃ = V  (Common junctions across battery terminals)',
        explanation: 'Three resistors R₁, R₂, and R₃ are connected between two common junction points A and B. Because every resistor is directly connected across the battery terminals, the potential difference (V) across each resistor is identical.'
      },
      {
        stepNumber: 2,
        title: 'Conservation of Charge: Current Splits into Branches',
        math: 'I_eq = I₁ + I₂ + I₃   ... [Equation 1]',
        explanation: 'At junction A, the incoming total current I divides into three distinct branch currents I₁, I₂, and I₃ flowing through R₁, R₂, and R₃ respectively. By conservation of charge, total current entering junction A equals sum of branch currents.',
        highlight: true
      },
      {
        stepNumber: 3,
        title: 'Applying Ohm’s Law to Each Branch Separately',
        math: 'I₁ = V / R₁ \nI₂ = V / R₂ \nI₃ = V / R₃',
        explanation: 'By Ohm’s law (I = V/R), current through branch 1 is I₁ = V/R₁, through branch 2 is I₂ = V/R₂, and through branch 3 is I₃ = V/R₃.'
      },
      {
        stepNumber: 4,
        title: 'Substituting Branch Currents into Equation 1',
        math: 'I_eq = (V / R₁) + (V / R₂) + (V / R₃) = V · (1/R₁ + 1/R₂ + 1/R₃)   ... [Equation 2]',
        explanation: 'Substitute the expressions for I₁, I₂, and I₃ into Equation 1 and factor out the common voltage term V.'
      },
      {
        stepNumber: 5,
        title: 'Applying Ohm’s Law to Equivalent Parallel Circuit',
        math: 'I_eq = V / Rₚ   ... [Equation 3]',
        explanation: 'If the combination is replaced by a single equivalent resistance Rₚ connected across the same voltage V and drawing total current I_eq, then I_eq = V / Rₚ.'
      },
      {
        stepNumber: 6,
        title: 'Equating and Cancelling Voltage (V)',
        math: 'V / Rₚ = V · (1/R₁ + 1/R₂ + 1/R₃)   ⇒   1 / Rₚ = 1/R₁ + 1/R₂ + 1/R₃',
        explanation: 'Dividing both sides by the non-zero potential difference V proves the formula: 1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃.',
        highlight: true
      },
      {
        stepNumber: 7,
        title: 'Special Case for Two Resistors in Parallel',
        math: '1 / Rₚ = (R₁ + R₂) / (R₁ · R₂)   ⇒   Rₚ = (R₁ · R₂) / (R₁ + R₂)',
        explanation: 'For exactly two resistors in parallel, equivalent resistance equals the Product divided by the Sum: Rₚ = Product / Sum.'
      }
    ]
  },
  {
    id: 'three-resistors-combinations',
    title: 'E) Combinations of Three 2 Ω Resistors (All 4 Cases & Final Resistance)',
    description: 'Animated circuit schematics and step-by-step mathematical proofs for connecting three 2 Ω resistors to achieve 6 Ω, 0.67 Ω, 3 Ω, and 1.33 Ω.',
    formula: 'R = 6 Ω, 0.67 Ω, 3 Ω, 1.33 Ω',
    visualType: 'three_resistors',
    conclusion: 'Three identical 2 Ω resistors can be connected in exactly 4 distinct topologies: 1) All series gives maximum 6 Ω. 2) All parallel gives minimum 2/3 Ω (0.67 Ω). 3) Two in parallel + one in series gives 3 Ω. 4) Two in series + one in parallel gives 4/3 Ω (1.33 Ω).',
    steps: [
      {
        stepNumber: 1,
        title: 'Case 1: All 3 Resistors in Series (R_eq = 6 Ω)',
        math: 'R_eq = R₁ + R₂ + R₃ = 2 Ω + 2 Ω + 2 Ω = 6 Ω',
        explanation: 'Connected end-to-end in a single pathway. Current is identical through all three resistors. Yields the maximum possible resistance.',
        highlight: true
      },
      {
        stepNumber: 2,
        title: 'Case 2: All 3 Resistors in Parallel (R_eq = 0.67 Ω)',
        math: '1/R_eq = 1/R₁ + 1/R₂ + 1/R₃ = 1/2 + 1/2 + 1/2 = 3/2 Ω⁻¹  ⇒  R_eq = 2/3 Ω ≈ 0.67 Ω',
        explanation: 'All three connected across common junctions. Full battery voltage across each. Yields the minimum possible resistance (< 2 Ω).',
        highlight: true
      },
      {
        stepNumber: 3,
        title: 'Case 3: Two in Parallel in Series with Third (R_eq = 3 Ω)',
        math: 'Step A: 1/R_p = 1/2 + 1/2 = 1 Ω⁻¹  ⇒  R_p = 1 Ω\nStep B: R_eq = R_p + R₃ = 1 Ω + 2 Ω = 3 Ω',
        explanation: 'The parallel pair produces 1 Ω, which adds in series with the third 2 Ω resistor to give exactly 3 Ω. Very frequent exam numerical.',
        highlight: true
      },
      {
        stepNumber: 4,
        title: 'Case 4: Two in Series in Parallel with Third (R_eq = 1.33 Ω)',
        math: 'Step A: R_s = 2 Ω + 2 Ω = 4 Ω\nStep B: 1/R_eq = 1/R_s + 1/R₃ = 1/4 + 1/2 = 3/4 Ω⁻¹  ⇒  R_eq = 4/3 Ω ≈ 1.33 Ω',
        explanation: 'The top series branch of 4 Ω is connected in parallel with the single 2 Ω resistor to yield 4/3 Ω (1.33 Ω).',
        highlight: true
      }
    ]
  }
];
