import { AlgorithmId, AlgorithmInfo, AlgorithmStep, MergeSortVariant, PseudocodeLine } from '../types';
import { generateInsertionSortSteps } from './insertionSort';
import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateMergeSortSteps } from './mergeSort';

export const CLRS_4TH_MERGE_PSEUDOCODE: PseudocodeLine[] = [
  // MERGE-SORT(A, p, r)
  { lineNum: 1, procedure: 'MERGE-SORT', code: 'if p >= r                           // zero or one element?' },
  { lineNum: 2, procedure: 'MERGE-SORT', code: '    return' },
  { lineNum: 3, procedure: 'MERGE-SORT', code: 'q = ⌊(p + r) / 2⌋                   // midpoint of A[p:r]' },
  { lineNum: 4, procedure: 'MERGE-SORT', code: 'MERGE-SORT(A, p, q)                 // recursively sort A[p:q]' },
  { lineNum: 5, procedure: 'MERGE-SORT', code: 'MERGE-SORT(A, q + 1, r)             // recursively sort A[q + 1:r]' },
  { lineNum: 6, procedure: 'MERGE-SORT', code: '// Merge A[p:q] and A[q + 1:r] into A[p:r].' },
  { lineNum: 7, procedure: 'MERGE-SORT', code: 'MERGE(A, p, q, r)' },

  // MERGE(A, p, q, r)
  { lineNum: 1, procedure: 'MERGE', code: 'n_L = q - p + 1                    // length of A[p:q]' },
  { lineNum: 2, procedure: 'MERGE', code: 'n_R = r - q                        // length of A[q+1:r]' },
  { lineNum: 3, procedure: 'MERGE', code: 'let L[0:n_L-1] and R[0:n_R-1] be new arrays' },
  { lineNum: 4, procedure: 'MERGE', code: 'for i = 0 to n_L - 1               // copy A[p:q] into L[0:n_L-1]' },
  { lineNum: 5, procedure: 'MERGE', code: '    L[i] = A[p+i]' },
  { lineNum: 6, procedure: 'MERGE', code: 'for j = 0 to n_R - 1               // copy A[q+1:r] into R[0:n_R-1]' },
  { lineNum: 7, procedure: 'MERGE', code: '    R[j] = A[q+j+1]' },
  { lineNum: 8, procedure: 'MERGE', code: 'i = 0                              // i indexes the smallest remaining element in L' },
  { lineNum: 9, procedure: 'MERGE', code: 'j = 0                              // j indexes the smallest remaining element in R' },
  { lineNum: 10, procedure: 'MERGE', code: 'k = p                              // k indexes the location in A to fill' },
  { lineNum: 11, procedure: 'MERGE', code: '// As long as each of the arrays L and R contains an unmerged element,\n// copy the smallest unmerged element back into A[p:r].' },
  { lineNum: 12, procedure: 'MERGE', code: 'while i < n_L and j < n_R' },
  { lineNum: 13, procedure: 'MERGE', code: '    if L[i] <= R[j]' },
  { lineNum: 14, procedure: 'MERGE', code: '        A[k] = L[i]' },
  { lineNum: 15, procedure: 'MERGE', code: '        i = i + 1' },
  { lineNum: 16, procedure: 'MERGE', code: '    else A[k] = R[j]' },
  { lineNum: 17, procedure: 'MERGE', code: '        j = j + 1' },
  { lineNum: 18, procedure: 'MERGE', code: '    k = k + 1' },
  { lineNum: 19, procedure: 'MERGE', code: '// Having gone through one of L and R entirely, copy the\n// remainder of the other to the end of A[p:r].' },
  { lineNum: 20, procedure: 'MERGE', code: 'while i < n_L' },
  { lineNum: 21, procedure: 'MERGE', code: '    A[k] = L[i]' },
  { lineNum: 22, procedure: 'MERGE', code: '    i = i + 1' },
  { lineNum: 23, procedure: 'MERGE', code: '    k = k + 1' },
  { lineNum: 24, procedure: 'MERGE', code: 'while j < n_R' },
  { lineNum: 25, procedure: 'MERGE', code: '    A[k] = R[j]' },
  { lineNum: 26, procedure: 'MERGE', code: '    j = j + 1' },
  { lineNum: 27, procedure: 'MERGE', code: '    k = k + 1' },
];

export const CLRS_3RD_MERGE_PSEUDOCODE: PseudocodeLine[] = [
  // MERGE-SORT(A, p, r)
  { lineNum: 1, procedure: 'MERGE-SORT', code: 'if p < r' },
  { lineNum: 2, procedure: 'MERGE-SORT', code: '    q = floor((p + r) / 2)              // ⌊(p + r) / 2⌋' },
  { lineNum: 3, procedure: 'MERGE-SORT', code: '    MERGE-SORT(A, p, q)' },
  { lineNum: 4, procedure: 'MERGE-SORT', code: '    MERGE-SORT(A, q + 1, r)' },
  { lineNum: 5, procedure: 'MERGE-SORT', code: '    MERGE(A, p, q, r)' },

  // MERGE(A, p, q, r)
  { lineNum: 1, procedure: 'MERGE', code: 'n1 = q - p + 1' },
  { lineNum: 2, procedure: 'MERGE', code: 'n2 = r - q' },
  { lineNum: 3, procedure: 'MERGE', code: 'let L[1..n1 + 1] and R[1..n2 + 1] be new arrays' },
  { lineNum: 4, procedure: 'MERGE', code: 'for i = 1 to n1' },
  { lineNum: 5, procedure: 'MERGE', code: '    L[i] = A[p + i - 1]' },
  { lineNum: 6, procedure: 'MERGE', code: 'for j = 1 to n2' },
  { lineNum: 7, procedure: 'MERGE', code: '    R[j] = A[q + j]' },
  { lineNum: 8, procedure: 'MERGE', code: 'L[n1 + 1] = ∞                           // sentinel card' },
  { lineNum: 9, procedure: 'MERGE', code: 'R[n2 + 1] = ∞                           // sentinel card' },
  { lineNum: 10, procedure: 'MERGE', code: 'i = 1' },
  { lineNum: 11, procedure: 'MERGE', code: 'j = 1' },
  { lineNum: 12, procedure: 'MERGE', code: 'for k = p to r' },
  { lineNum: 13, procedure: 'MERGE', code: '    if L[i] <= R[j]' },
  { lineNum: 14, procedure: 'MERGE', code: '        A[k] = L[i]' },
  { lineNum: 15, procedure: 'MERGE', code: '        i = i + 1' },
  { lineNum: 16, procedure: 'MERGE', code: '    else A[k] = R[j]' },
  { lineNum: 17, procedure: 'MERGE', code: '        j = j + 1' },
];

export const ALGORITHMS: Record<AlgorithmId, AlgorithmInfo> = {
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    pseudocode: CLRS_4TH_MERGE_PSEUDOCODE,
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    description: `Merge Sort is the premier divide-and-conquer algorithm in CLRS (Section 2.3). It partitions A[p : r] at midpoint q, recursively sorts both sub-problems A[p : q] and A[q + 1 : r], and merges the results in linear Θ(n) time via MERGE. It operates in guaranteed Θ(n log n) time across best, average, and worst cases with stable element ordering.`,
    codeSnippets: {
      javascript: `function mergeSort(A, p = 1, r = A.length) {
  if (p >= r) return;
  const q = Math.floor((p + r) / 2);
  mergeSort(A, p, q);
  mergeSort(A, q + 1, r);
  merge(A, p, q, r);
  return A;
}

function merge(A, p, q, r) {
  const nL = q - p + 1;
  const nR = r - q;
  const L = [];
  const R = [];
  for (let i = 0; i < nL; i++) L[i] = A[p - 1 + i];
  for (let j = 0; j < nR; j++) R[j] = A[q + j];
  let i = 0, j = 0, k = p - 1;
  while (i < nL && j < nR) {
    if (L[i] <= R[j]) {
      A[k] = L[i];
      i++;
    } else {
      A[k] = R[j];
      j++;
    }
    k++;
  }
  while (i < nL) A[k++] = L[i++];
  while (j < nR) A[k++] = R[j++];
}`,
      python: `def merge_sort(A, p=1, r=None):
    if r is None:
        r = len(A)
    if p >= r:
        return
    q = (p + r) // 2
    merge_sort(A, p, q)
    merge_sort(A, q + 1, r)
    merge(A, p, q, r)

def merge(A, p, q, r):
    n_L = q - p + 1
    n_R = r - q
    L = [A[p - 1 + i] for i in range(n_L)]
    R = [A[q + j] for j in range(n_R)]
    i = j = 0
    k = p - 1
    while i < n_L and j < n_R:
        if L[i] <= R[j]:
            A[k] = L[i]
            i += 1
        else:
            A[k] = R[j]
            j += 1
        k += 1
    while i < n_L:
        A[k] = L[i]
        i += 1
        k += 1
    while j < n_R:
        A[k] = R[j]
        j += 1
        k += 1`,
      cpp: `void merge(vector<int>& A, int p, int q, int r) {
    int n_L = q - p + 1;
    int n_R = r - q;
    vector<int> L(n_L), R(n_R);
    for (int i = 0; i < n_L; i++) L[i] = A[p - 1 + i];
    for (int j = 0; j < n_R; j++) R[j] = A[q + j];
    int i = 0, j = 0, k = p - 1;
    while (i < n_L && j < n_R) {
        if (L[i] <= R[j]) A[k++] = L[i++];
        else A[k++] = R[j++];
    }
    while (i < n_L) A[k++] = L[i++];
    while (j < n_R) A[k++] = R[j++];
}

void mergeSort(vector<int>& A, int p, int r) {
    if (p >= r) return;
    int q = p + (r - p) / 2;
    mergeSort(A, p, q);
    mergeSort(A, q + 1, r);
    merge(A, p, q, r);
}`,
    },
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    pseudocode: [
      { lineNum: 1, code: 'for j = 2 to A.length' },
      { lineNum: 2, code: '    key = A[j]' },
      { lineNum: 3, code: '    // Insert A[j] into the sorted sequence A[1..j-1]' },
      { lineNum: 4, code: '    i = j - 1' },
      { lineNum: 5, code: '    while i > 0 and A[i] > key' },
      { lineNum: 6, code: '        A[i + 1] = A[i]' },
      { lineNum: 7, code: '        i = i - 1' },
      { lineNum: 8, code: '    A[i + 1] = key' },
    ],
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    description: `Insertion Sort works much like sorting a hand of playing cards. It incrementally builds the sorted array by taking one element at a time (the key) and inserting it into its correct position within the already-sorted prefix sequence A[1..j-1]. Best case occurs when the input array is already sorted, performing only n-1 comparisons.`,
    codeSnippets: {
      javascript: `function insertionSort(A) {
  for (let j = 1; j < A.length; j++) {
    let key = A[j];
    let i = j - 1;
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i];
      i = i - 1;
    }
    A[i + 1] = key;
  }
  return A;
}`,
      python: `def insertion_sort(A):
    for j in range(1, len(A)):
        key = A[j]
        i = j - 1
        while i >= 0 and A[i] > key:
            A[i + 1] = A[i]
            i -= 1
        A[i + 1] = key
    return A`,
      cpp: `void insertionSort(vector<int>& A) {
    int n = A.size();
    for (int j = 1; j < n; j++) {
        int key = A[j];
        int i = j - 1;
        while (i >= 0 && A[i] > key) {
            A[i + 1] = A[i];
            i = i - 1;
        }
        A[i + 1] = key;
    }
}`,
    },
  },
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    pseudocode: [
      { lineNum: 1, code: 'for i = 1 to A.length - 1' },
      { lineNum: 2, code: '    for j = A.length downto i + 1' },
      { lineNum: 3, code: '        if A[j] < A[j - 1]' },
      { lineNum: 4, code: '            exchange A[j] with A[j - 1]' },
    ],
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    description: `Bubble Sort is a popular sorting algorithm described in Problem 2-2 of CLRS. It repeatedly steps through the list from right to left, compares adjacent elements, and swaps them if they are in the wrong order. The smaller elements "bubble" up to the beginning of the list.`,
    codeSnippets: {
      javascript: `function bubbleSort(A) {
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = A.length - 1; j > i; j--) {
      if (A[j] < A[j - 1]) {
        [A[j], A[j - 1]] = [A[j - 1], A[j]];
      }
    }
  }
  return A;
}`,
      python: `def bubble_sort(A):
    n = len(A)
    for i in range(n - 1):
        for j in range(n - 1, i, -1):
            if A[j] < A[j - 1]:
                A[j], A[j - 1] = A[j - 1], A[j]
    return A`,
      cpp: `void bubbleSort(vector<int>& A) {
    int n = A.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = n - 1; j > i; j--) {
            if (A[j] < A[j - 1]) {
                swap(A[j], A[j - 1]);
            }
        }
    }
}`,
    },
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    pseudocode: [
      { lineNum: 1, code: 'for i = 1 to A.length - 1' },
      { lineNum: 2, code: '    minIndex = i' },
      { lineNum: 3, code: '    for j = i + 1 to A.length' },
      { lineNum: 4, code: '        if A[j] < A[minIndex]' },
      { lineNum: 5, code: '            minIndex = j' },
      { lineNum: 6, code: '    exchange A[i] with A[minIndex]' },
    ],
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    description: `Selection Sort is analyzed in Exercise 2.2-2 of CLRS. The algorithm maintains two subarrays in a given array: the subarray which is already sorted, and the remaining unsorted subarray. In every iteration, the minimum element from the unsorted subarray is picked and swapped into the sorted position.`,
    codeSnippets: {
      javascript: `function selectionSort(A) {
  for (let i = 0; i < A.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < A.length; j++) {
      if (A[j] < A[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [A[i], A[minIndex]] = [A[minIndex], A[i]];
    }
  }
  return A;
}`,
      python: `def selection_sort(A):
    n = len(A)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if A[j] < A[min_idx]:
                min_idx = j
        A[i], A[min_idx] = A[min_idx], A[i]
    return A`,
      cpp: `void selectionSort(vector<int>& A) {
    int n = A.size();
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (A[j] < A[minIndex]) {
                minIndex = j;
            }
        }
        swap(A[i], A[minIndex]);
    }
}`,
    },
  },
};

export function getAlgorithmSteps(
  id: AlgorithmId,
  values: number[],
  variant: MergeSortVariant = 'clrs4th'
): AlgorithmStep[] {
  switch (id) {
    case 'merge':
      return generateMergeSortSteps(values, variant);
    case 'insertion':
      return generateInsertionSortSteps(values);
    case 'bubble':
      return generateBubbleSortSteps(values);
    case 'selection':
      return generateSelectionSortSteps(values);
    default:
      return generateMergeSortSteps(values, variant);
  }
}
