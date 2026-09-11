import { AlgorithmStep, ArrayElement } from '../types';

export function generateInsertionSortSteps(initialValues: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = initialValues.length;

  if (n === 0) return steps;

  // Create array with stable unique IDs for animation
  let currArray: ArrayElement[] = initialValues.map((val, idx) => ({
    id: `item-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  const copyArray = (arr: ArrayElement[]): ArrayElement[] => 
    arr.map(item => ({ ...item }));

  // Helper to mark sorted prefix
  const updateStates = (
    arr: ArrayElement[], 
    j1: number, // 1-based j
    keyIdx0: number | null, 
    comparingIdx0: number | null,
    shiftedIdx0: number | null
  ) => {
    return arr.map((item, idx) => {
      let state = item.state;
      // Mark sorted subarray up to j-1 (or j)
      if (idx < j1 - 1) {
        state = 'sorted';
      } else {
        state = 'default';
      }

      if (idx === keyIdx0) {
        state = 'key';
      } else if (idx === comparingIdx0) {
        state = 'comparing';
      } else if (idx === shiftedIdx0) {
        state = 'shifting';
      }

      return { ...item, state };
    });
  };

  // Step 0: Initial state
  steps.push({
    array: copyArray(currArray),
    line: 1,
    description: `INSERTION-SORT initialized. Array contains ${n} elements. Subarray A[1] (${currArray[0].value}) is trivially sorted.`,
    variables: { j: '-', key: '-', i: '-', 'A[i]': '-' },
    indices: { sortedUpTo: 0 },
  });

  // Algorithm loop: 1-indexed j from 2 to n
  for (let j = 2; j <= n; j++) {
    const jIdx = j - 1; // 0-based index for j

    // Line 1: for j = 2 to A.length
    steps.push({
      array: updateStates(currArray, j, jIdx, null, null),
      line: 1,
      description: `Line 1: Outer loop iteration j = ${j}. Inspecting element A[${j}] = ${currArray[jIdx].value}.`,
      variables: { j, key: '-', i: '-', 'A[i]': '-' },
      indices: { j, keyIndex: jIdx, sortedUpTo: jIdx - 1 },
    });

    // Line 2: key = A[j]
    const keyVal = currArray[jIdx].value;
    const keyItem = currArray[jIdx];

    steps.push({
      array: updateStates(currArray, j, jIdx, null, null),
      line: 2,
      description: `Line 2: Picked key = ${keyVal} (A[${j}]). Target is to insert ${keyVal} into sorted sequence A[1..${j - 1}].`,
      variables: { j, key: keyVal, i: '-', 'A[i]': '-' },
      indices: { j, keyIndex: jIdx, sortedUpTo: jIdx - 1 },
    });

    // Line 4: i = j - 1
    let i = j - 1; // 1-based i
    let iIdx = i - 1; // 0-based i

    steps.push({
      array: updateStates(currArray, j, jIdx, iIdx, null),
      line: 4,
      description: `Line 4: Set i = ${i} (j - 1). Preparing to compare key (${keyVal}) with sorted subarray elements from right to left.`,
      variables: { j, key: keyVal, i, 'A[i]': currArray[iIdx]?.value ?? '-' },
      indices: { j, i, keyIndex: jIdx, comparingIndex: iIdx, sortedUpTo: jIdx - 1 },
    });

    // Line 5: while i > 0 and A[i] > key
    while (true) {
      if (i <= 0) {
        // Line 5 evaluation: i <= 0 condition fails
        steps.push({
          array: updateStates(currArray, j, jIdx, null, null),
          line: 5,
          description: `Line 5: Loop check failed because i = ${i} (not > 0). Reached beginning of array. Exiting while loop.`,
          variables: { j, key: keyVal, i, 'A[i]': '-', 'i > 0': false },
          indices: { j, i, keyIndex: jIdx, sortedUpTo: jIdx - 1 },
        });
        break;
      }

      iIdx = i - 1;
      const aiVal = currArray[iIdx].value;

      if (aiVal <= keyVal) {
        // Line 5 evaluation: A[i] > key fails
        steps.push({
          array: updateStates(currArray, j, jIdx, iIdx, null),
          line: 5,
          description: `Line 5: Loop check failed because A[${i}] (${aiVal}) is NOT > key (${keyVal}). Correct position found at A[${i + 1}]. Exiting while loop.`,
          variables: { j, key: keyVal, i, 'A[i]': aiVal, 'A[i] > key': false },
          indices: { j, i, keyIndex: jIdx, comparingIndex: iIdx, sortedUpTo: jIdx - 1 },
        });
        break;
      }

      // Line 5 evaluation: Condition holds (i > 0 AND A[i] > key)
      steps.push({
        array: updateStates(currArray, j, jIdx, iIdx, null),
        line: 5,
        description: `Line 5: Condition met! i = ${i} > 0 and A[${i}] (${aiVal}) > key (${keyVal}). Must shift A[${i}] right.`,
        variables: { j, key: keyVal, i, 'A[i]': aiVal, 'A[i] > key': true },
        indices: { j, i, keyIndex: jIdx, comparingIndex: iIdx, sortedUpTo: jIdx - 1 },
      });

      // Line 6: A[i + 1] = A[i]
      const targetIdx0 = iIdx + 1; // 0-based for A[i + 1]
      // Shift element at iIdx to targetIdx0
      currArray[targetIdx0] = {
        ...currArray[iIdx],
        state: 'shifting',
      };

      steps.push({
        array: updateStates(currArray, j, jIdx, iIdx, targetIdx0),
        line: 6,
        description: `Line 6: Shifted A[${i}] (${aiVal}) to position A[${i + 1}].`,
        variables: { j, key: keyVal, i, 'A[i]': aiVal, 'A[i+1]': aiVal },
        indices: { j, i, keyIndex: jIdx, comparingIndex: iIdx, sortedUpTo: jIdx - 1 },
      });

      // Line 7: i = i - 1
      i = i - 1;
      iIdx = i - 1;

      steps.push({
        array: updateStates(currArray, j, jIdx, iIdx >= 0 ? iIdx : null, null),
        line: 7,
        description: `Line 7: Decremented i to ${i}.`,
        variables: { j, key: keyVal, i, 'A[i]': iIdx >= 0 ? currArray[iIdx].value : '-' },
        indices: { j, i, keyIndex: jIdx, sortedUpTo: jIdx - 1 },
      });
    }

    // Line 8: A[i + 1] = key
    const insertIdx0 = i + 1 - 1; // 0-based for A[i + 1]
    currArray[insertIdx0] = {
      id: `${keyItem.id}-p-${insertIdx0}`, // preserve base item identity while ensuring uniqueness
      value: keyVal,
      state: 'placed',
    };

    // Mark current state after placement
    const placedArray = currArray.map((item, idx) => ({
      ...item,
      state: (idx <= j - 1 ? 'sorted' : 'default') as ArrayElement['state'],
    }));

    steps.push({
      array: placedArray,
      line: 8,
      description: `Line 8: Placed key = ${keyVal} into A[${i + 1}]. Subarray A[1..${j}] is now completely sorted!`,
      variables: { j, key: keyVal, i, 'A[i+1]': keyVal },
      indices: { j, i, sortedUpTo: j - 1 },
    });
  }

  // Final Completion Step
  const finalArray = currArray.map(item => ({ ...item, state: 'sorted' as const }));
  steps.push({
    array: finalArray,
    line: 0,
    description: `🎉 INSERTION-SORT finished! All ${n} elements are sorted in non-decreasing order.`,
    variables: { j: 'Done', key: '-', i: '-', status: 'Complete' },
    indices: { sortedUpTo: n - 1 },
  });

  return steps;
}
