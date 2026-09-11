import { AlgorithmId, AlgorithmInfo, AlgorithmStep } from '../types';
import { generateInsertionSortSteps } from './insertionSort';
import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';

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
};

export function getAlgorithmSteps(id: AlgorithmId, values: number[]): AlgorithmStep[] {
  switch (id) {
    case 'insertion':
      return generateInsertionSortSteps(values);
    case 'bubble':
      return generateBubbleSortSteps(values);
    case 'selection':
      return generateSelectionSortSteps(values);
    default:
      return generateInsertionSortSteps(values);
  }
}
