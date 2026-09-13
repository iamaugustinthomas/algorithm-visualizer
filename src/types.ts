export type ElementState = 
  | 'default' 
  | 'key' 
  | 'comparing' 
  | 'shifting' 
  | 'sorted' 
  | 'placed'
  | 'subarray'
  | 'merging'
  | 'heap-root'
  | 'heap-child'
  | 'heap-largest';

export interface ArrayElement {
  id: string; // unique identifier for key tracking during animation
  value: number;
  state: ElementState;
}

export type AlgorithmId = 'merge' | 'heapsort' | 'insertion' | 'selection' | 'bubble';

export type MergeSortVariant = 'clrs4th' | 'clrs3rd';

export interface AuxBufferItem {
  id: string;
  value: number | string;
  active?: boolean;
  copied?: boolean;
  isSentinel?: boolean;
}

export interface HeapInfo {
  heapSize: number;
  i?: number;
  l?: number;
  r?: number;
  largest?: number;
}

export interface AlgorithmStep {
  array: ArrayElement[];
  line: number; // 1-indexed pseudocode line number (0 means no line)
  procedure?: string; // Procedure name e.g. 'HEAPSORT', 'BUILD-MAX-HEAP', 'MAX-HEAPIFY'
  description: string;
  variables: Record<string, string | number | boolean | null | undefined>;
  indices: {
    j?: number; // 1-based or 0-based for UI display
    i?: number;
    k?: number;
    p?: number;
    q?: number;
    r?: number;
    l?: number;
    largest?: number;
    heapSize?: number;
    keyIndex?: number;
    comparingIndex?: number;
    sortedUpTo?: number; // elements <= this index are sorted
    subrange?: { p: number; q?: number; r: number }; // 1-based p..r
  };
  heap?: HeapInfo;
  auxArrays?: {
    L?: AuxBufferItem[];
    R?: AuxBufferItem[];
    activeL?: number; // active index in L (0-based or 1-based)
    activeR?: number; // active index in R (0-based or 1-based)
  };
  callStack?: string[];
}

export interface PseudocodeLine {
  lineNum: number;
  code: string;
  comment?: string;
  procedure?: string; // e.g. 'MERGE-SORT' or 'MERGE'
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
