import { DifferenceItem } from '../types';

export const DIFFERENCES_DATA: DifferenceItem[] = [
  {
    id: 'series-vs-parallel',
    title: 'A) Series Combination vs. Parallel Combination of Resistors',
    itemA: 'Series Combination',
    itemB: 'Parallel Combination',
    summary: 'The fundamental comparison between end-to-end (single pathway) and branch-to-branch (multiple pathways) circuit topologies.',
    keyExamTakeaway: 'In series, current remains constant while voltage splits. In parallel, voltage remains constant while current splits. AP SSC favourite 4-mark question!',
    rows: [
      {
        parameter: '1. Definition & Connection',
        conceptA: 'Resistors are connected end-to-end consecutively so there is only one single continuous path for current.',
        conceptB: 'Resistors are connected across common junction points so there are multiple independent paths for current.'
      },
      {
        parameter: '2. Electric Current (I)',
        conceptA: 'Same current flows through all resistors: I₁ = I₂ = I₃ = I.',
        conceptB: 'Total current splits among branches: I_total = I₁ + I₂ + I₃.'
      },
      {
        parameter: '3. Potential Difference (V)',
        conceptA: 'Total voltage divides across resistors: V_total = V₁ + V₂ + V₃.',
        conceptB: 'Same voltage exists across each branch: V₁ = V₂ = V₃ = V (full line voltage).'
      },
      {
        parameter: '4. Equivalent Resistance',
        conceptA: 'Rₛ = R₁ + R₂ + R₃. (Always GREATER than the greatest individual resistor).',
        conceptB: '1/Rₚ = 1/R₁ + 1/R₂ + 1/R₃. (Always LESS than the smallest individual resistor).'
      },
      {
        parameter: '5. Effect of Component Failure',
        conceptA: 'If one appliance/bulb burns out or is removed, the entire circuit is broken; all appliances stop working.',
        conceptB: 'If one appliance is switched off or fails, other appliances continue functioning completely unaffected.'
      },
      {
        parameter: '6. Independent Switching',
        conceptA: 'Separate switches cannot be used; one switch turns everything on or off simultaneously.',
        conceptB: 'Each appliance can have its own dedicated independent switch.'
      },
      {
        parameter: '7. Household Suitability',
        conceptA: 'Unsuitable for household wiring (all appliances would receive different voltages and low currents).',
        conceptB: 'Universally used for all household wiring in India (every appliance gets rated 220 V).'
      },
      {
        parameter: '8. Practical Applications',
        conceptA: 'Decorative fairy lights (small festivity serial bulbs), safety fuse in series with live wire.',
        conceptB: 'Domestic home appliances (fans, refrigerators, TVs, lamps), car headlights, street lights.'
      }
    ]
  },
  {
    id: 'pd-vs-emf',
    title: 'B) Electromotive Force (EMF) vs. Potential Difference (p.d.)',
    itemA: 'Electromotive Force (EMF)',
    itemB: 'Potential Difference (p.d.)',
    summary: 'Clear distinction between the total energy provided by an electric source vs the potential drop across circuit elements.',
    keyExamTakeaway: 'EMF is the CAUSE; potential difference is the EFFECT. In a closed discharging circuit, EMF > Potential Difference due to internal resistance of the cell (V = E − Ir).',
    rows: [
      {
        parameter: '1. Definition & Open/Closed Circuit Condition',
        conceptA: '1. The electromotive force (EMF) of a cell is the potential difference between its two terminals when no current is drawn from the cell (i.e. in an OPEN circuit).',
        conceptB: '1. The potential difference (p.d.) is the difference in electric potential between any two points in a circuit when current flows through it (i.e. in a CLOSED circuit).'
      },
      {
        parameter: '2. Cause vs. Effect (Key Principle)',
        conceptA: '2. EMF is the CAUSE. It is the driving force generated inside the source (cell/battery/generator) that initiates and maintains current flow throughout the circuit.',
        conceptB: '2. Potential difference is the EFFECT. It is the result of EMF causing current to flow through the resistance of the external circuit.'
      },
      {
        parameter: '3. Dependence on External Circuit & Resistance',
        conceptA: '3. EMF is independent of the external circuit resistance; it depends solely on the nature of the electrodes and the chemical electrolyte inside the cell.',
        conceptB: '3. Potential difference depends directly on the resistance between the two measured points and the magnitude of current passing through it (V = I · R).'
      },
      {
        parameter: '4. Magnitude & Internal Resistance (Discharging Cell)',
        conceptA: '4. During circuit operation (discharging), EMF is always greater than the potential difference across the cell terminals due to internal resistance r: E = V + Ir.',
        conceptB: '4. Potential difference across the external circuit is always less than EMF because part of the energy is consumed overcoming internal resistance: V = E − Ir.'
      },
      {
        parameter: '5. Device Domain & Energy Transformation',
        conceptA: '5. EMF is associated exclusively with sources of electrical energy (cells, batteries, dynamos), converting chemical/mechanical energy into electrical energy.',
        conceptB: '5. Potential difference can be measured across any two points or components in the circuit, converting electrical energy into heat, light, or work.'
      }
    ]
  },
  {
    id: 'resistance-vs-resistivity',
    title: 'C) Electric Resistance (R) vs. Specific Resistivity (ρ)',
    itemA: 'Resistance (R)',
    itemB: 'Resistivity / Specific Resistance (ρ)',
    summary: 'Differentiating an extrinsic dimensional property (Resistance) from an intrinsic material constant (Resistivity).',
    keyExamTakeaway: 'Cutting a wire in half halves its resistance (R/2), but its resistivity (ρ) remains EXACTLY THE SAME! A frequent AP SSC objective question.',
    rows: [
      {
        parameter: '1. Definition',
        conceptA: 'The total opposition offered by a specific conductor to the flow of electric current.',
        conceptB: 'The intrinsic resistance offered by a unit length (1 m) of a substance with unit cross-sectional area (1 m²).'
      },
      {
        parameter: '2. Symbol',
        conceptA: 'R',
        conceptB: 'ρ (rho)'
      },
      {
        parameter: '3. Formula',
        conceptA: 'R = V / I = ρ · (l / A)',
        conceptB: 'ρ = (R · A) / l'
      },
      {
        parameter: '4. SI Unit',
        conceptA: 'Ohm (Ω)',
        conceptB: 'Ohm-metre (Ω·m)'
      },
      {
        parameter: '5. Dimensional Dependence',
        conceptA: 'Depends directly on the dimensions: Length (R ∝ l) and Cross-sectional Area (R ∝ 1/A).',
        conceptB: 'Completely independent of length, thickness, shape, or dimensions of the conductor.'
      },
      {
        parameter: '6. Environmental Dependence',
        conceptA: 'Depends on material, temperature, length, and area.',
        conceptB: 'Depends ONLY on the nature of the material and its temperature.'
      },
      {
        parameter: '7. Wire Reshaping Effect',
        conceptA: 'If a wire is doubled on itself, its length halves and area doubles, so its resistance drops to R/4.',
        conceptB: 'If a wire is stretched or folded, its resistivity ρ remains completely UNCHANGED.'
      }
    ]
  },
  {
    id: 'conductor-vs-resistor',
    title: 'D) Conductor vs. Resistor',
    itemA: 'Conductor',
    itemB: 'Resistor',
    summary: 'Comparison between materials designed to carry electricity with minimal loss versus components engineered to limit or control current.',
    keyExamTakeaway: 'A conductor is meant to transmit electrical energy with negligible loss; a resistor is deliberately manufactured to provide a specific opposition to current.',
    rows: [
      {
        parameter: '1. Definition & Purpose',
        conceptA: 'A material that allows electric charges to flow easily with negligible obstruction.',
        conceptB: 'An electrical component deliberately engineered to introduce a specific, calibrated electrical resistance into a circuit.'
      },
      {
        parameter: '2. Magnitude of Resistance',
        conceptA: 'Extremely low resistance (typically < 0.01 Ω per metre).',
        conceptB: 'Moderate to very high resistance (ranges from 1 Ω to mega-ohms, MΩ).'
      },
      {
        parameter: '3. Free Electron Density',
        conceptA: 'Enormous concentration of free conduction electrons (~10²⁸ electrons/m³).',
        conceptB: 'Restricted electron density or high electron scattering rate due to alloy lattice or carbon blend.'
      },
      {
        parameter: '4. Energy Transformation',
        conceptA: 'Transfers electrical energy from source to load with minimal thermal energy conversion.',
        conceptB: 'Converts electrical energy into heat energy, drops voltage, or controls current levels.'
      },
      {
        parameter: '5. Materials Used',
        conceptA: 'Pure metals like copper, aluminium, and silver.',
        conceptB: 'Alloys (nichrome, manganin, constantan) or carbon-film compositions.'
      },
      {
        parameter: '6. Typical Applications',
        conceptA: 'Power transmission lines, home wiring cords, internal circuit traces.',
        conceptB: 'Heater coils, volume control potentiometers, current limiters for delicate LEDs.'
      }
    ]
  },
  {
    id: 'ohmic-vs-non-ohmic',
    title: 'E) Ohmic Conductors vs. Non-Ohmic Conductors',
    itemA: 'Ohmic Conductors',
    itemB: 'Non-Ohmic Conductors',
    summary: 'Comparison of linear conductors that obey V = IR versus non-linear materials and semiconductor components.',
    keyExamTakeaway: 'Ohmic V-I graph is a straight line through origin (constant slope = R). Non-Ohmic V-I graph is curved or directional (dynamic resistance varies).',
    rows: [
      {
        parameter: '1. Definition',
        conceptA: 'Conductors that strictly obey Ohm’s law: current is directly proportional to potential difference (V ∝ I) at constant temperature.',
        conceptB: 'Conductors/devices that DO NOT obey Ohm’s law: current is not proportional to potential difference.'
      },
      {
        parameter: '2. V-I Relationship',
        conceptA: 'Linear relationship: V / I = Constant = Resistance R.',
        conceptB: 'Non-linear relationship: V / I is not constant; dynamic resistance is ΔV / ΔI.'
      },
      {
        parameter: '3. V-I Graph Nature',
        conceptA: 'A straight line passing through the origin (0, 0).',
        conceptB: 'A curved line, asymmetric curve, or exponential graph not passing straight through the origin.'
      },
      {
        parameter: '4. Resistance Behaviour',
        conceptA: 'Resistance remains constant regardless of the applied voltage or current direction.',
        conceptB: 'Resistance changes significantly as applied voltage, current, or internal temperature varies.'
      },
      {
        parameter: '5. Direction of Current',
        conceptA: 'Bilateral: conducts equally well in forward and reverse current directions.',
        conceptB: 'Often unilateral (e.g., diodes conduct in forward bias but block reverse bias).'
      },
      {
        parameter: '6. Real Examples',
        conceptA: 'Copper wire, aluminium wire, silver, nichrome wire at steady room temperature.',
        conceptB: 'Electric filament bulb, p-n junction diode, LED, transistor, thermistor, vacuum tube, liquid electrolytes.'
      },
      {
        parameter: '7. Reason for Deviation',
        conceptA: 'No deviation as long as temperature remains strictly steady.',
        conceptB: 'In bulbs: rising heat increases lattice vibration. In semiconductors: charge carrier generation and energy band barriers.'
      }
    ]
  },
  {
    id: 'fuse-vs-filament',
    title: 'F) Electric Fuse Wire vs. Filament / Heating Element',
    itemA: 'Electric Fuse Wire',
    itemB: 'Filament / Heating Element',
    summary: 'Core comparison between safety fuse wire and heating/lighting filaments (Tungsten in bulb, Nichrome in iron box & heater) on melting point, resistance, and material.',
    keyExamTakeaway: 'Fuse wire has LOW melting point to break the circuit; Filament/Heating element has VERY HIGH melting point (Tungsten: 3380 °C, Nichrome: 1400 °C) so it will not melt when hot!',
    rows: [
      {
        parameter: '1. Melting Point',
        conceptA: 'LOW melting point (~200 °C to 250 °C), so it melts quickly when current exceeds the safe limit to prevent fires.',
        conceptB: 'VERY HIGH melting point (Tungsten: 3380 °C, Nichrome: ~1400 °C), so it can glow white-hot or red-hot without melting.'
      },
      {
        parameter: '2. Electrical Resistance',
        conceptA: 'MODERATE / Low resistance (allows normal current to pass without unnecessary power drop or heating).',
        conceptB: 'HIGH resistance and high resistivity (generates intense Joule heat H = I²Rt for lighting or heating).'
      },
      {
        parameter: '3. Example / Material Used',
        conceptA: 'Alloy of Lead and Tin (Pb–Sn alloy, ~63% Tin + 37% Lead).',
        conceptB: '• Tungsten (W) in electric bulbs (for light)\n• Nichrome alloy (Ni + Cr) in electric iron box, room heater, geyser, and toaster (for heat).'
      },
      {
        parameter: '4. Primary Purpose',
        conceptA: 'Safety device to break circuit during short circuit or overload and prevent fires.',
        conceptB: 'Appliance element to produce useful light (in bulb) or thermal heat (in iron box & heater).'
      }
    ]
  }
];
