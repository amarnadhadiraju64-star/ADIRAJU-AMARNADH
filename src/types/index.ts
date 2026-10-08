export type Language = 'en' | 'te' | 'both';

export type CompartmentId =
  | 'concepts'
  | 'practice-tests'
  | 'simulations'
  | 'derivations'
  | 'experiments'
  | 'differences'
  | 'problems'
  | 'daily-life'
  | 'electrons';

export interface ConceptItem {
  id: string;
  letter: string;
  title: string;
  titleTe?: string;
  definition: string;
  definitionTe?: string;
  symbol: string;
  formula?: string;
  siUnit: string;
  siUnitTe?: string;
  mksUnit?: string;
  cgsUnit?: string;
  commercialUnit?: string;
  conversion?: string;
  conversionBreakdown?: {
    steps: string[];
    result: string;
    note?: string;
  };
  simpleMeaning: string;
  simpleMeaningTe?: string;
  practicalExample: string;
  practicalExampleTe?: string;
  modelType?: 'cell' | 'battery' | 'plug_key_open' | 'plug_key_closed' | 'wire_joint' | 'wire_crossing' | 'bulb' | 'resistor' | 'rheostat' | 'ammeter' | 'voltmeter' | 'fuse' | 'switch';
  modelTitle?: string;
  diagramType?: 'charge' | 'current' | 'voltage' | 'resistance' | 'resistivity' | 'power' | 'energy' | 'ampere' | 'volt' | 'ohm' | 'watt' | 'kwh' | 'ohms_law' | 'joule' | 'series' | 'parallel' | 'shock' | 'short_circuit' | 'ohmic' | 'non_ohmic' | string;
  examTip?: string;
  examTipTe?: string;
}

export interface DerivationStep {
  stepNumber: number;
  title: string;
  math: string;
  explanation: string;
  highlight?: boolean;
}

export interface DerivationItem {
  id: string;
  title: string;
  description: string;
  formula: string;
  steps: DerivationStep[];
  conclusion: string;
  visualType: 'resistivity' | 'ohms_law' | 'series' | 'parallel' | 'three_resistors';
}

export interface ExperimentHeadingData {
  aim: string;
  requiredMaterials: string[];
  equation: string;
  procedure: string[];
  observation: string;
  conclusion: string;
  precautions: [string, string];
  tableColumns: string[];
  defaultRows: Array<Record<string, string | number>>;
  graphDescription: string;
  studyOfGraph: string[];
}

export interface ExperimentItem {
  id: string;
  number: number;
  title: string;
  data: ExperimentHeadingData;
  type: 'ohms_law' | 'length' | 'area' | 'temperature' | 'material';
}

export interface ComparisonRow {
  parameter: string;
  conceptA: string;
  conceptB: string;
}

export interface DifferenceItem {
  id: string;
  title: string;
  itemA: string;
  itemB: string;
  summary: string;
  rows: ComparisonRow[];
  keyExamTakeaway: string;
}

export interface ProblemItem {
  id: number;
  level: 1 | 2 | 3;
  levelLabel: 'Level 1 – Simple' | 'Level 2 – Moderate' | 'Level 3 – Higher Order';
  topic: string;
  statement: string;
  questionNumber?: number;
  textbookRef?: string;
  isTextbookBased?: boolean;
  options?: string[];
  given: { label: string; value: string }[];
  formula: string;
  substitution: string;
  calculation: string[];
  finalAnswer: string;
  unit: string;
  explanationTip?: string;
  graphType?: 'vi_slopes' | string;
}
