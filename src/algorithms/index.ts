import { AlgorithmId, AlgorithmInfo, AlgorithmStep } from '../types';
import { generateInsertionSortSteps } from './insertionSort';
import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateMergeSortSteps } from './mergeSort';

export const ALGORITHMS: Record<AlgorithmId, AlgorithmInfo> = {
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
      { lineNum: 2, code: '    for j = 1 to A.length - i' },
      { lineNum: 3, code: '        if A[j] > A[j + 1]' },
      { lineNum: 4, code: '            swap A[j] and A[j + 1]' },
    ],
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    description: `Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Pass after pass, larger elements "bubble" up to the end of the array.`,
    codeSnippets: {
      javascript: `function bubbleSort(A) {
  for (let i = 0; i < A.length - 1; i++) {
    for (let j = 0; j < A.length - i - 1; j++) {
      if (A[j] > A[j + 1]) {
        [A[j], A[j + 1]] = [A[j + 1], A[j]];
      }
    }
  }
  return A;
}`,
      python: `def bubble_sort(A):
    n = len(A)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if A[j] > A[j + 1]:
                A[j], A[j + 1] = A[j + 1], A[j]
    return A`,
      cpp: `void bubbleSort(vector<int>& A) {
    int n = A.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (A[j] > A[j + 1]) {
                swap(A[j], A[j + 1]);
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
      { lineNum: 2, code: '    minIdx = i' },
      { lineNum: 3, code: '    for j = i + 1 to A.length' },
      { lineNum: 4, code: '        if A[j] < A[minIdx] then minIdx = j' },
      { lineNum: 5, code: '    swap A[i] and A[minIdx]' },
    ],
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    description: `Selection Sort divides the list into a sorted and unsorted region. In each iteration, it finds the smallest element in the unsorted region and swaps it with the first unsorted element.`,
    codeSnippets: {
      javascript: `function selectionSort(A) {
  for (let i = 0; i < A.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < A.length; j++) {
      if (A[j] < A[minIdx]) minIdx = j;
    }
    if (minIdx !== i) [A[i], A[minIdx]] = [A[minIdx], A[i]];
  }
  return A;
}`,
      python: `def selection_sort(A):
    for i in range(len(A) - 1):
        min_idx = i
        for j in range(i + 1, len(A)):
            if A[j] < A[min_idx]:
                min_idx = j
        A[i], A[min_idx] = A[min_idx], A[i]
    return A`,
      cpp: `void selectionSort(vector<int>& A) {
    int n = A.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (A[j] < A[minIdx]) minIdx = j;
        }
        swap(A[i], A[minIdx]);
    }
}`,
    },
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    pseudocode: [
      // MERGE-SORT(A, p, r)
      { lineNum: 1, procedure: 'MERGE-SORT', code: 'if p >= r                           // zero or one element?' },
      { lineNum: 2, procedure: 'MERGE-SORT', code: '    return' },
      { lineNum: 3, procedure: 'MERGE-SORT', code: 'q = floor((p + r) / 2)              // midpoint of A[p : r] (or ⌊(p + r) / 2⌋)' },
      { lineNum: 4, procedure: 'MERGE-SORT', code: 'MERGE-SORT(A, p, q)                 // recursively sort A[p : q]' },
      { lineNum: 5, procedure: 'MERGE-SORT', code: 'MERGE-SORT(A, q + 1, r)             // recursively sort A[q + 1 : r]' },
      { lineNum: 0, procedure: 'MERGE-SORT', code: '   // Merge A[p : q] and A[q + 1 : r] into A[p : r].' },
      { lineNum: 6, procedure: 'MERGE-SORT', code: 'MERGE(A, p, q, r)' },

      // MERGE(A, p, q, r)
      { lineNum: 1, procedure: 'MERGE', code: 'n_L = q - p + 1                    // length of A[p : q]' },
      { lineNum: 2, procedure: 'MERGE', code: 'n_R = r - q                        // length of A[q + 1 : r]' },
      { lineNum: 3, procedure: 'MERGE', code: 'let L[0 : n_L - 1] and R[0 : n_R - 1] be new arrays' },
      { lineNum: 4, procedure: 'MERGE', code: 'for i = 0 to n_L - 1               // copy A[p : q] into L[0 : n_L - 1]' },
      { lineNum: 5, procedure: 'MERGE', code: '    L[i] = A[p + i]' },
      { lineNum: 6, procedure: 'MERGE', code: 'for j = 0 to n_R - 1               // copy A[q + 1 : r] into R[0 : n_R - 1]' },
      { lineNum: 7, procedure: 'MERGE', code: '    R[j] = A[q + j + 1]' },
      { lineNum: 8, procedure: 'MERGE', code: 'i = 0                              // i indexes the smallest remaining element in L' },
      { lineNum: 9, procedure: 'MERGE', code: 'j = 0                              // j indexes the smallest remaining element in R' },
      { lineNum: 10, procedure: 'MERGE', code: 'k = p                              // k indexes the location in A to fill' },
      { lineNum: 0, procedure: 'MERGE', code: '   // As long as each of the arrays L and R contains an unmerged element,' },
      { lineNum: 0, procedure: 'MERGE', code: '   // copy the smallest unmerged element back into A[p : r].' },
      { lineNum: 11, procedure: 'MERGE', code: 'while i < n_L and j < n_R' },
      { lineNum: 12, procedure: 'MERGE', code: '    if L[i] <= R[j]' },
      { lineNum: 13, procedure: 'MERGE', code: '        A[k] = L[i]' },
      { lineNum: 14, procedure: 'MERGE', code: '        i = i + 1' },
      { lineNum: 15, procedure: 'MERGE', code: '    else A[k] = R[j]' },
      { lineNum: 16, procedure: 'MERGE', code: '        j = j + 1' },
      { lineNum: 17, procedure: 'MERGE', code: '    k = k + 1' },
      { lineNum: 0, procedure: 'MERGE', code: '   // Having gone through one of L and R entirely, copy the' },
      { lineNum: 0, procedure: 'MERGE', code: '   // remainder of the other to the end of A[p : r].' },
      { lineNum: 18, procedure: 'MERGE', code: 'while i < n_L' },
      { lineNum: 19, procedure: 'MERGE', code: '    A[k] = L[i]' },
      { lineNum: 20, procedure: 'MERGE', code: '    i = i + 1' },
      { lineNum: 21, procedure: 'MERGE', code: '    k = k + 1' },
      { lineNum: 22, procedure: 'MERGE', code: 'while j < n_R' },
      { lineNum: 23, procedure: 'MERGE', code: '    A[k] = R[j]' },
      { lineNum: 24, procedure: 'MERGE', code: '    j = j + 1' },
      { lineNum: 25, procedure: 'MERGE', code: '    k = k + 1' },
    ],
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    description: `Merge Sort is an archetypal divide-and-conquer algorithm specified in CLRS 4th Edition (Section 2.3). It divides the subarray A[p : r] at midpoint q, recursively sorts A[p : q] and A[q + 1 : r], and then merges them in linear time via MERGE using temporary buffers L and R. It guarantees Θ(n log n) running time across all input distributions and maintains element stability.`,
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
};

export function getAlgorithmSteps(id: AlgorithmId, values: number[]): AlgorithmStep[] {
  switch (id) {
    case 'insertion':
      return generateInsertionSortSteps(values);
    case 'bubble':
      return generateBubbleSortSteps(values);
    case 'selection':
      return generateSelectionSortSteps(values);
    case 'merge':
      return generateMergeSortSteps(values);
    default:
      return generateInsertionSortSteps(values);
  }
}
