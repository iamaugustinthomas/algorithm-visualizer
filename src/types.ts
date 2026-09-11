export type ElementState = 
  | 'default' 
  | 'key' 
  | 'comparing' 
  | 'shifting' 
  | 'sorted' 
  | 'placed';

export interface ArrayElement {
  id: string; // unique identifier for key tracking during animation
  value: number;
  state: ElementState;
}

export type AlgorithmId = 'insertion' | 'selection' | 'bubble';

export interface AlgorithmStep {
  array: ArrayElement[];
  line: number; // 1-indexed pseudocode line number (0 means no line)
  description: string;
  variables: Record<string, string | number | boolean | null | undefined>;
  indices: {
    j?: number; // 1-based or 0-based for UI display
    i?: number;
    keyIndex?: number;
    comparingIndex?: number;
    sortedUpTo?: number; // elements <= this index are sorted
  };
}

export interface PseudocodeLine {
  lineNum: number;
  code: string;
  comment?: string;
}

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  pseudocode: PseudocodeLine[];
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stable: boolean;
  inPlace: boolean;
  description: string;
  codeSnippets: {
    javascript: string;
    python: string;
    cpp: string;
  };
}
