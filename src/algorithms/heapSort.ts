import { AlgorithmStep, ArrayElement, HeapInfo } from '../types';

/**
 * Generates step-by-step execution for HEAPSORT following CLRS 4th Edition Chapter 6:
 *
 * HEAPSORT(A)
 * 1  BUILD-MAX-HEAP(A)
 * 2  for i = A.length downto 2
 * 3      exchange A[1] with A[i]
 * 4      A.heap-size = A.heap-size - 1
 * 5      MAX-HEAPIFY(A, 1)
 *
 * BUILD-MAX-HEAP(A)
 * 1  A.heap-size = A.length
 * 2  for i = ⌊A.length / 2⌋ downto 1
 * 3      MAX-HEAPIFY(A, i)
 *
 * MAX-HEAPIFY(A, i)
 * 1  l = LEFT(i)
 * 2  r = RIGHT(i)
 * 3  if l <= A.heap-size and A[l] > A[i]
 * 4      largest = l
 * 5  else largest = i
 * 6  if r <= A.heap-size and A[r] > A[largest]
 * 7      largest = r
 * 8  if largest != i
 * 9      exchange A[i] with A[largest]
 * 10     MAX-HEAPIFY(A, largest)
 */
export function generateHeapSortSteps(initialValues: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = initialValues.length;

  if (n === 0) return steps;

  // Track elements with stable unique IDs
  const arr: ArrayElement[] = initialValues.map((val, idx) => ({
    id: `item-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  let currentHeapSize = 0;

  // Helper to deep copy array with visual states reflecting heap context
  const getDisplayArray = (
    currentArr: ArrayElement[],
    heapSize: number,
    activeI?: number, // 1-based index
    activeL?: number,
    activeR?: number,
    activeLargest?: number,
    swappingIndices?: [number, number] // 1-based
  ): ArrayElement[] => {
    return currentArr.map((item, idx) => {
      const oneBased = idx + 1;

      // Elements beyond current heap size are permanently sorted
      if (oneBased > heapSize) {
        return { ...item, state: 'sorted' };
      }

      if (swappingIndices && (oneBased === swappingIndices[0] || oneBased === swappingIndices[1])) {
        return { ...item, state: 'shifting' };
      }

      if (activeLargest !== undefined && oneBased === activeLargest) {
        return { ...item, state: 'placed' }; // Golden highlight for largest
      }

      if (activeI !== undefined && oneBased === activeI) {
        return { ...item, state: 'key' }; // Primary node being heapified
      }

      if ((activeL !== undefined && oneBased === activeL) || (activeR !== undefined && oneBased === activeR)) {
        return { ...item, state: 'comparing' }; // Children being compared
      }

      // Active member of binary heap
      return { ...item, state: 'subarray' };
    });
  };

  // Step 0: Initial state before any procedure runs
  steps.push({
    array: arr.map((item) => ({ ...item, state: 'default' })),
    line: 1,
    procedure: 'HEAPSORT',
    description: `HEAPSORT(A) initialized with ${n} elements. Next: call BUILD-MAX-HEAP(A) to transform the array into a max-heap in linear O(n) time.`,
    variables: { 'A.length': n, 'A.heap-size': '-', i: '-' },
    indices: {},
    heap: { heapSize: 0 },
    callStack: ['HEAPSORT(A)'],
  });

  // Handle trivial 1-element case
  if (n === 1) {
    steps.push({
      array: arr.map((item) => ({ ...item, state: 'sorted' })),
      line: 2,
      procedure: 'HEAPSORT',
      description: `Array has length 1; trivially sorted.`,
      variables: { 'A.length': 1, 'A.heap-size': 1, i: 1 },
      indices: {},
      heap: { heapSize: 1 },
      callStack: ['HEAPSORT(A)'],
    });
    return steps;
  }

  // --- MAX-HEAPIFY Subroutine ---
  const maxHeapify = (
    i: number, // 1-based index
    heapSize: number,
    callerStack: string[]
  ) => {
    const activeStack = [...callerStack, `MAX-HEAPIFY(A, ${i})`];

    // Line 1: l = LEFT(i) = 2 * i
    const l = 2 * i;
    steps.push({
      array: getDisplayArray(arr, heapSize, i, l <= heapSize ? l : undefined),
      line: 1,
      procedure: 'MAX-HEAPIFY',
      description: `MAX-HEAPIFY Line 1: Compute left child index l = LEFT(${i}) = 2 · ${i} = ${l}${l <= heapSize ? ` (A[${l}] = ${arr[l - 1].value})` : ' (exceeds A.heap-size; no left child)'}.`,
      variables: {
        i,
        'A.heap-size': heapSize,
        l,
        'A[i]': arr[i - 1].value,
        'A[l]': l <= heapSize ? arr[l - 1].value : 'none',
      },
      indices: { i, l: l <= heapSize ? l : undefined, heapSize },
      heap: { heapSize, i, l: l <= heapSize ? l : undefined },
      callStack: activeStack,
    });

    // Line 2: r = RIGHT(i) = 2 * i + 1
    const r = 2 * i + 1;
    steps.push({
      array: getDisplayArray(arr, heapSize, i, l <= heapSize ? l : undefined, r <= heapSize ? r : undefined),
      line: 2,
      procedure: 'MAX-HEAPIFY',
      description: `MAX-HEAPIFY Line 2: Compute right child index r = RIGHT(${i}) = 2 · ${i} + 1 = ${r}${r <= heapSize ? ` (A[${r}] = ${arr[r - 1].value})` : ' (exceeds A.heap-size; no right child)'}.`,
      variables: {
        i,
        'A.heap-size': heapSize,
        l,
        r,
        'A[i]': arr[i - 1].value,
        'A[r]': r <= heapSize ? arr[r - 1].value : 'none',
      },
      indices: {
        i,
        l: l <= heapSize ? l : undefined,
        r: r <= heapSize ? r : undefined,
        heapSize,
      },
      heap: {
        heapSize,
        i,
        l: l <= heapSize ? l : undefined,
        r: r <= heapSize ? r : undefined,
      },
      callStack: activeStack,
    });

    // Line 3: if l <= A.heap-size and A[l] > A[i]
    let largest = i;
    const lValid = l <= heapSize;
    const lGreater = lValid && arr[l - 1].value > arr[i - 1].value;

    steps.push({
      array: getDisplayArray(arr, heapSize, i, lValid ? l : undefined),
      line: 3,
      procedure: 'MAX-HEAPIFY',
      description: `MAX-HEAPIFY Line 3: Evaluate condition (l <= A.heap-size and A[l] > A[i]): (${l} <= ${heapSize} and ${lValid ? `${arr[l - 1].value} > ${arr[i - 1].value}` : 'false'}) → ${lGreater ? 'TRUE' : 'FALSE'}.`,
      variables: {
        i,
        'A.heap-size': heapSize,
        l,
        'l <= heap-size': lValid,
        'A[l] > A[i]': lValid ? `${arr[l - 1].value} > ${arr[i - 1].value}` : 'false',
      },
      indices: { i, l: lValid ? l : undefined, heapSize },
      heap: { heapSize, i, l: lValid ? l : undefined },
      callStack: activeStack,
    });

    if (lGreater) {
      // Line 4: largest = l
      largest = l;
      steps.push({
        array: getDisplayArray(arr, heapSize, i, undefined, undefined, largest),
        line: 4,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY Line 4: Left child A[${l}] (${arr[l - 1].value}) > parent A[${i}] (${arr[i - 1].value}), so largest = l (${l}).`,
        variables: { i, 'A.heap-size': heapSize, largest, 'A[largest]': arr[largest - 1].value },
        indices: { i, largest, heapSize },
        heap: { heapSize, i, largest },
        callStack: activeStack,
      });
    } else {
      // Line 5: else largest = i
      largest = i;
      steps.push({
        array: getDisplayArray(arr, heapSize, i, undefined, undefined, largest),
        line: 5,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY Line 5: Left child is not larger than parent A[${i}] (${arr[i - 1].value}), so largest = i (${i}).`,
        variables: { i, 'A.heap-size': heapSize, largest, 'A[largest]': arr[largest - 1].value },
        indices: { i, largest, heapSize },
        heap: { heapSize, i, largest },
        callStack: activeStack,
      });
    }

    // Line 6: if r <= A.heap-size and A[r] > A[largest]
    const rValid = r <= heapSize;
    const rGreater = rValid && arr[r - 1].value > arr[largest - 1].value;

    steps.push({
      array: getDisplayArray(arr, heapSize, i, undefined, rValid ? r : undefined, largest),
      line: 6,
      procedure: 'MAX-HEAPIFY',
      description: `MAX-HEAPIFY Line 6: Evaluate condition (r <= A.heap-size and A[r] > A[largest]): (${r} <= ${heapSize} and ${rValid ? `${arr[r - 1].value} > ${arr[largest - 1].value}` : 'false'}) → ${rGreater ? 'TRUE' : 'FALSE'}.`,
      variables: {
        i,
        'A.heap-size': heapSize,
        r,
        largest,
        'A[r] > A[largest]': rValid ? `${arr[r - 1].value} > ${arr[largest - 1].value}` : 'false',
      },
      indices: { i, r: rValid ? r : undefined, largest, heapSize },
      heap: { heapSize, i, r: rValid ? r : undefined, largest },
      callStack: activeStack,
    });

    if (rGreater) {
      // Line 7: largest = r
      largest = r;
      steps.push({
        array: getDisplayArray(arr, heapSize, i, undefined, undefined, largest),
        line: 7,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY Line 7: Right child A[${r}] (${arr[r - 1].value}) > current largest A[${arr[largest - 1].value}], so update largest = r (${r}).`,
        variables: { i, 'A.heap-size': heapSize, largest, 'A[largest]': arr[largest - 1].value },
        indices: { i, largest, heapSize },
        heap: { heapSize, i, largest },
        callStack: activeStack,
      });
    }

    // Line 8: if largest != i
    const needsSwap = largest !== i;
    steps.push({
      array: getDisplayArray(arr, heapSize, i, undefined, undefined, largest),
      line: 8,
      procedure: 'MAX-HEAPIFY',
      description: `MAX-HEAPIFY Line 8: Check if largest != i: (${largest} != ${i}) → ${needsSwap ? 'TRUE (violation found; swap needed)' : 'FALSE (node satisfies max-heap property)'}.`,
      variables: {
        i,
        largest,
        'largest != i': needsSwap,
        'A[i]': arr[i - 1].value,
        'A[largest]': arr[largest - 1].value,
      },
      indices: { i, largest, heapSize },
      heap: { heapSize, i, largest },
      callStack: activeStack,
    });

    if (needsSwap) {
      // Line 9: exchange A[i] with A[largest]
      const valI = arr[i - 1].value;
      const valLargest = arr[largest - 1].value;

      // Visual swap step
      const temp = arr[i - 1];
      arr[i - 1] = arr[largest - 1];
      arr[largest - 1] = temp;

      steps.push({
        array: getDisplayArray(arr, heapSize, undefined, undefined, undefined, undefined, [i, largest]),
        line: 9,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY Line 9: Exchange A[${i}] (${valI}) with A[${largest}] (${valLargest}) to float the larger key upward.`,
        variables: {
          'swapped': `A[${i}] ↔ A[${largest}]`,
          'new A[i]': arr[i - 1].value,
          'new A[largest]': arr[largest - 1].value,
        },
        indices: { i, largest, heapSize },
        heap: { heapSize, i, largest },
        callStack: activeStack,
      });

      // Line 10: MAX-HEAPIFY(A, largest)
      steps.push({
        array: getDisplayArray(arr, heapSize, largest),
        line: 10,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY Line 10: Subtree at child index ${largest} may now violate max-heap property; recursively calling MAX-HEAPIFY(A, ${largest}).`,
        variables: { i, largest, 'A.heap-size': heapSize },
        indices: { i: largest, heapSize },
        heap: { heapSize, i: largest },
        callStack: activeStack,
      });

      // Recurse
      maxHeapify(largest, heapSize, activeStack);
    } else {
      steps.push({
        array: getDisplayArray(arr, heapSize, i),
        line: 8,
        procedure: 'MAX-HEAPIFY',
        description: `MAX-HEAPIFY: Node A[${i}] (${arr[i - 1].value}) is >= its children. Subtree rooted at ${i} satisfies max-heap property. Returning.`,
        variables: { i, 'A[i]': arr[i - 1].value, 'A.heap-size': heapSize },
        indices: { i, heapSize },
        heap: { heapSize, i },
        callStack: activeStack,
      });
    }
  };

  // --- Procedure: BUILD-MAX-HEAP(A) ---
  const buildMaxHeap = (callerStack: string[]) => {
    const buildStack = [...callerStack, 'BUILD-MAX-HEAP(A)'];

    // Line 1: A.heap-size = A.length
    currentHeapSize = n;
    steps.push({
      array: getDisplayArray(arr, currentHeapSize),
      line: 1,
      procedure: 'BUILD-MAX-HEAP',
      description: `BUILD-MAX-HEAP Line 1: Set A.heap-size = A.length = ${n}. All ${n} elements are now part of the active heap.`,
      variables: { 'A.length': n, 'A.heap-size': currentHeapSize },
      indices: { heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize },
      callStack: buildStack,
    });

    // Line 2: for i = ⌊A.length / 2⌋ downto 1
    const startIdx = Math.floor(n / 2);
    steps.push({
      array: getDisplayArray(arr, currentHeapSize),
      line: 2,
      procedure: 'BUILD-MAX-HEAP',
      description: `BUILD-MAX-HEAP Line 2: Start loop from last non-leaf node i = ⌊${n} / 2⌋ = ${startIdx} downto 1. Note: elements A[${startIdx + 1}..${n}] are leaves and already trivial 1-element max-heaps.`,
      variables: { 'A.length': n, 'A.heap-size': currentHeapSize, '⌊A.length/2⌋': startIdx, i: startIdx },
      indices: { i: startIdx, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i: startIdx },
      callStack: buildStack,
    });

    for (let i = startIdx; i >= 1; i--) {
      // Step at start of loop iteration
      steps.push({
        array: getDisplayArray(arr, currentHeapSize, i),
        line: 2,
        procedure: 'BUILD-MAX-HEAP',
        description: `BUILD-MAX-HEAP Line 2: Loop iteration i = ${i}. Preparing to heapify subtree rooted at A[${i}] = ${arr[i - 1].value}.`,
        variables: { i, 'A.heap-size': currentHeapSize },
        indices: { i, heapSize: currentHeapSize },
        heap: { heapSize: currentHeapSize, i },
        callStack: buildStack,
      });

      // Line 3: MAX-HEAPIFY(A, i)
      steps.push({
        array: getDisplayArray(arr, currentHeapSize, i),
        line: 3,
        procedure: 'BUILD-MAX-HEAP',
        description: `BUILD-MAX-HEAP Line 3: Call MAX-HEAPIFY(A, ${i}) on subtree rooted at index ${i}.`,
        variables: { i, 'A.heap-size': currentHeapSize },
        indices: { i, heapSize: currentHeapSize },
        heap: { heapSize: currentHeapSize, i },
        callStack: buildStack,
      });

      maxHeapify(i, currentHeapSize, buildStack);
    }

    // Finished BUILD-MAX-HEAP
    steps.push({
      array: getDisplayArray(arr, currentHeapSize, 1),
      line: 1,
      procedure: 'HEAPSORT',
      description: `BUILD-MAX-HEAP completed in linear Θ(n) time! The array now satisfies the max-heap property: maximum element ${arr[0].value} is at root A[1].`,
      variables: { 'A.heap-size': currentHeapSize, 'root A[1]': arr[0].value },
      indices: { i: 1, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i: 1 },
      callStack: ['HEAPSORT(A)'],
    });
  };

  // --- Main HEAPSORT procedure ---
  // Line 1: BUILD-MAX-HEAP(A)
  buildMaxHeap(['HEAPSORT(A)']);

  // Line 2: for i = A.length downto 2
  steps.push({
    array: getDisplayArray(arr, currentHeapSize),
    line: 2,
    procedure: 'HEAPSORT',
    description: `HEAPSORT Line 2: Begin sorting phase. Loop i from A.length (${n}) downto 2. In each iteration, swap max element at root A[1] with last element of heap A[i].`,
    variables: { 'A.length': n, 'A.heap-size': currentHeapSize, i: n },
    indices: { i: n, heapSize: currentHeapSize },
    heap: { heapSize: currentHeapSize, i: n },
    callStack: ['HEAPSORT(A)'],
  });

  for (let i = n; i >= 2; i--) {
    // Start of iteration i
    steps.push({
      array: getDisplayArray(arr, currentHeapSize, 1, undefined, undefined, undefined),
      line: 2,
      procedure: 'HEAPSORT',
      description: `HEAPSORT Line 2: Iteration i = ${i}. Root A[1] (${arr[0].value}) is maximum among current heap elements A[1..${currentHeapSize}].`,
      variables: { i, 'A.heap-size': currentHeapSize, 'root A[1]': arr[0].value, 'A[i]': arr[i - 1].value },
      indices: { i, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i },
      callStack: ['HEAPSORT(A)'],
    });

    // Line 3: exchange A[1] with A[i]
    const rootVal = arr[0].value;
    const lastVal = arr[i - 1].value;

    const temp = arr[0];
    arr[0] = arr[i - 1];
    arr[i - 1] = temp;

    steps.push({
      array: getDisplayArray(arr, currentHeapSize, undefined, undefined, undefined, undefined, [1, i]),
      line: 3,
      procedure: 'HEAPSORT',
      description: `HEAPSORT Line 3: Exchange root A[1] (${rootVal}) with A[${i}] (${lastVal}). Element ${rootVal} is moved to its permanent sorted position.`,
      variables: { i, 'A.heap-size': currentHeapSize, 'exchanged': `A[1] (${rootVal}) ↔ A[${i}] (${lastVal})` },
      indices: { i, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i },
      callStack: ['HEAPSORT(A)'],
    });

    // Line 4: A.heap-size = A.heap-size - 1
    currentHeapSize = currentHeapSize - 1;

    steps.push({
      array: getDisplayArray(arr, currentHeapSize),
      line: 4,
      procedure: 'HEAPSORT',
      description: `HEAPSORT Line 4: Decrement heap size: A.heap-size = ${currentHeapSize}. Subarray A[${i}..${n}] is now permanently sorted.`,
      variables: { i, 'A.heap-size': currentHeapSize, 'sorted elements': n - currentHeapSize },
      indices: { i, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i },
      callStack: ['HEAPSORT(A)'],
    });

    // Line 5: MAX-HEAPIFY(A, 1)
    steps.push({
      array: getDisplayArray(arr, currentHeapSize, 1),
      line: 5,
      procedure: 'HEAPSORT',
      description: `HEAPSORT Line 5: Call MAX-HEAPIFY(A, 1) on new root A[1] (${arr[0].value}) to restore max-heap property on remaining ${currentHeapSize} elements.`,
      variables: { i, 'A.heap-size': currentHeapSize, 'new root A[1]': arr[0].value },
      indices: { i: 1, heapSize: currentHeapSize },
      heap: { heapSize: currentHeapSize, i: 1 },
      callStack: ['HEAPSORT(A)'],
    });

    maxHeapify(1, currentHeapSize, ['HEAPSORT(A)']);
  }

  // Completion step
  steps.push({
    array: arr.map((item) => ({ ...item, state: 'sorted' })),
    line: 2,
    procedure: 'HEAPSORT',
    description: `HEAPSORT finished! All ${n} elements are sorted in non-decreasing order. Worst-case time: Θ(n log n), Auxiliary space: Θ(1) in-place.`,
    variables: { 'A.length': n, 'A.heap-size': 1, 'status': 'COMPLETELY SORTED' },
    indices: {},
    heap: { heapSize: 0 },
    callStack: ['HEAPSORT(A)'],
  });

  return steps;
}
