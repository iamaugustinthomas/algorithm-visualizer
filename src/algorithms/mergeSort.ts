import { AlgorithmStep, ArrayElement, AuxBufferItem, MergeSortVariant } from '../types';

export function generateMergeSortSteps(
  values: number[],
  variant: MergeSortVariant = 'clrs4th'
): AlgorithmStep[] {
  if (variant === 'clrs3rd') {
    return generateMergeSortStepsCLRS3rd(values);
  }
  return generateMergeSortStepsCLRS4th(values);
}

/**
 * CLRS 4th Edition Merge Sort
 * Procedure MERGE-SORT(A, p, r) & MERGE(A, p, q, r) without sentinels (uses 3 while loops)
 * Every line of pseudocode from CLRS 4th Ed Section 2.3 is explicitly stepped.
 */
function generateMergeSortStepsCLRS4th(values: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = values.length;

  const currentArray: ArrayElement[] = values.map((val, idx) => ({
    id: `elem-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  const callStack: string[] = [];

  const clone = () => currentArray.map((e) => ({ ...e }));
  const getStack = () => [...callStack];

  // Initial step 0: Call MERGE-SORT(A, 1, n)
  callStack.push(`MERGE-SORT(A, 1, ${n})`);
  steps.push({
    array: clone(),
    line: 1,
    procedure: 'MERGE-SORT',
    description: `Initial Call: MERGE-SORT(A, 1, ${n}) to sort the entire array A[1..${n}].`,
    variables: {
      p: 1,
      r: n,
      'p >= r': 1 >= n,
      q: '-',
    },
    indices: {
      p: 1,
      r: n,
      subrange: { p: 1, r: n },
    },
    callStack: getStack(),
  });

  function mergeSort(p: number, r: number) {
    // MERGE-SORT(A, p, r)
    // Line 1: if p >= r
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: e.state === 'sorted' ? 'sorted' : 'subarray' };
        }
        return e;
      }),
      line: 1,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 1: Check if subarray has 0 or 1 element: p (${p}) >= r (${r}) -> ${
        p >= r ? 'TRUE (base case)' : 'FALSE (divide)'
      }.`,
      variables: {
        p,
        r,
        'p >= r': p >= r,
        q: '-',
      },
      indices: {
        p,
        r,
        subrange: { p, r },
      },
      callStack: getStack(),
    });

    if (p >= r) {
      // Line 2: return
      currentArray[p - 1].state = 'sorted';
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased === p) return { ...e, state: 'sorted' };
          return e;
        }),
        line: 2,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT(A, ${p}, ${r}) Line 2: Base case reached! Single element A[${p}] = ${currentArray[p - 1].value} is trivially sorted. Return.`,
        variables: {
          p,
          r,
          'p >= r': true,
        },
        indices: {
          p,
          r,
          sortedUpTo: p === 1 ? 1 : undefined,
          subrange: { p, r },
        },
        callStack: getStack(),
      });
      return;
    }

    // Line 3: q = floor((p + r) / 2)
    const q = Math.floor((p + r) / 2);
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 3,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 3: Compute midpoint q = ⌊(${p} + ${r}) / 2⌋ = ${q}. Divides into A[${p}..${q}] and A[${
        q + 1
      }..${r}].`,
      variables: {
        p,
        r,
        q,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 4: MERGE-SORT(A, p, q) - Call left recursive branch
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= q) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 4,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 4: Recursively call MERGE-SORT(A, ${p}, ${q}) on left half A[${p}..${q}].`,
      variables: {
        p,
        q,
        r,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    callStack.push(`MERGE-SORT(A, ${p}, ${q})`);
    mergeSort(p, q);
    callStack.pop();

    // Step returning to Line 4 in caller frame
    steps.push({
      array: clone(),
      line: 4,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}): Returned from left half sort. A[${p}..${q}] is now sorted. Proceeding to right half.`,
      variables: {
        p,
        q,
        r,
        leftSorted: true,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 5: MERGE-SORT(A, q + 1, r) - Call right recursive branch
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= q + 1 && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 5,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 5: Recursively call MERGE-SORT(A, ${q + 1}, ${r}) on right half A[${q + 1}..${r}].`,
      variables: {
        p,
        q,
        r,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    callStack.push(`MERGE-SORT(A, ${q + 1}, ${r})`);
    mergeSort(q + 1, r);
    callStack.pop();

    // Step returning to Line 5 in caller frame
    steps.push({
      array: clone(),
      line: 5,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}): Returned from right half sort. Both halves A[${p}..${q}] and A[${q + 1}..${r}] are sorted!`,
      variables: {
        p,
        q,
        r,
        bothHalvesSorted: true,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 6: // Merge A[p:q] and A[q + 1:r] into A[p:r].
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 6,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 6: Merge A[${p}..${q}] and A[${q + 1}..${r}] into A[${p}..${r}].`,
      variables: {
        p,
        q,
        r,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 7: MERGE(A, p, q, r)
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 7,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 7: Call MERGE(A, ${p}, ${q}, ${r}) to combine sorted halves into A[${p}..${r}].`,
      variables: {
        p,
        q,
        r,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    callStack.push(`MERGE(A, ${p}, ${q}, ${r})`);
    merge(p, q, r);
    callStack.pop();

    // Return to caller after MERGE completes
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'sorted' };
        }
        return e;
      }),
      line: 7,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 7 Complete: Subarray A[${p}..${r}] is now fully merged and sorted.`,
      variables: {
        p,
        q,
        r,
        status: 'SUBARRAY_SORTED',
      },
      indices: {
        p,
        q,
        r,
        sortedUpTo: p === 1 && r === n ? n : undefined,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });
  }

  function merge(p: number, q: number, r: number) {
    // MERGE(A, p, q, r)
    // Line 1: n_L = q - p + 1
    const n_L = q - p + 1;
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 1,
      procedure: 'MERGE',
      description: `MERGE Line 1: Compute length of left subarray A[${p}..${q}]: n_L = q - p + 1 = ${q} - ${p} + 1 = ${n_L}.`,
      variables: {
        p,
        q,
        r,
        n_L,
        n_R: '-',
        i: '-',
        j: '-',
        k: '-',
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 2: n_R = r - q
    const n_R = r - q;
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 2,
      procedure: 'MERGE',
      description: `MERGE Line 2: Compute length of right subarray A[${q + 1}..${r}]: n_R = r - q = ${r} - ${q} = ${n_R}.`,
      variables: {
        p,
        q,
        r,
        n_L,
        n_R,
        i: '-',
        j: '-',
        k: '-',
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      callStack: getStack(),
    });

    // Line 3: let L[0 : n_L - 1] and R[0 : n_R - 1] be new arrays
    const L: AuxBufferItem[] = [];
    const R: AuxBufferItem[] = [];

    steps.push({
      array: clone(),
      line: 3,
      procedure: 'MERGE',
      description: `MERGE Line 3: Allocate empty auxiliary buffers L[0..${n_L - 1}] and R[0..${n_R - 1}].`,
      variables: {
        p,
        q,
        r,
        n_L,
        n_R,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: [],
        R: [],
      },
      callStack: getStack(),
    });

    // Line 4-5: for i = 0 to n_L - 1 copy A[p + i] into L[i]
    for (let i = 0; i < n_L; i++) {
      const sourceIdx = p + i; // 1-based in A
      const val = currentArray[sourceIdx - 1].value;

      // Line 4: for loop test
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'key' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 4,
        procedure: 'MERGE',
        description: `MERGE Line 4: Loop index i = ${i} (range 0 to ${n_L - 1}). Prepare to copy element at index A[p + i] = A[${p} + ${i}] = A[${sourceIdx}].`,
        variables: {
          p,
          q,
          r,
          n_L,
          n_R,
          i,
          'p + i': sourceIdx,
        },
        indices: {
          p,
          q,
          r,
          i: sourceIdx,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item) => ({ ...item })),
          R: R.map((item) => ({ ...item })),
          activeL: i,
        },
        callStack: getStack(),
      });

      // Line 5: L[i] = A[p + i]
      L.push({
        id: `L-${i}-${val}`,
        value: val,
      });

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'placed' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 5,
        procedure: 'MERGE',
        description: `MERGE Line 5: L[${i}] = A[${sourceIdx}] (${val}). Copied element from A into left buffer L[${i}].`,
        variables: {
          p,
          q,
          r,
          n_L,
          n_R,
          i,
          'L[i]': val,
          'A[p+i]': val,
        },
        indices: {
          p,
          q,
          r,
          i: sourceIdx,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item) => ({ ...item })),
          R: R.map((item) => ({ ...item })),
          activeL: i,
        },
        callStack: getStack(),
      });
    }

    // Line 4 termination step
    steps.push({
      array: clone(),
      line: 4,
      procedure: 'MERGE',
      description: `MERGE Line 4: Left copy loop completed (i reached ${n_L}). Buffer L[0..${n_L - 1}] is now ready.`,
      variables: {
        p,
        q,
        r,
        n_L,
        n_R,
        i: n_L,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
      },
      callStack: getStack(),
    });

    // Line 6-7: for j = 0 to n_R - 1 copy A[q + j + 1] into R[j]
    for (let j = 0; j < n_R; j++) {
      const sourceIdx = q + j + 1; // 1-based in A
      const val = currentArray[sourceIdx - 1].value;

      // Line 6: for loop test
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'key' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 6,
        procedure: 'MERGE',
        description: `MERGE Line 6: Loop index j = ${j} (range 0 to ${n_R - 1}). Prepare to copy element at index A[q + j + 1] = A[${q} + ${j} + 1] = A[${sourceIdx}].`,
        variables: {
          p,
          q,
          r,
          n_L,
          n_R,
          j,
          'q + j + 1': sourceIdx,
        },
        indices: {
          p,
          q,
          r,
          j: sourceIdx,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item) => ({ ...item })),
          R: R.map((item) => ({ ...item })),
          activeR: j,
        },
        callStack: getStack(),
      });

      // Line 7: R[j] = A[q + j + 1]
      R.push({
        id: `R-${j}-${val}`,
        value: val,
      });

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'placed' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 7,
        procedure: 'MERGE',
        description: `MERGE Line 7: R[${j}] = A[${sourceIdx}] (${val}). Copied element from A into right buffer R[${j}].`,
        variables: {
          p,
          q,
          r,
          n_L,
          n_R,
          j,
          'R[j]': val,
          'A[q+j+1]': val,
        },
        indices: {
          p,
          q,
          r,
          j: sourceIdx,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item) => ({ ...item })),
          R: R.map((item) => ({ ...item })),
          activeR: j,
        },
        callStack: getStack(),
      });
    }

    // Line 6 termination step
    steps.push({
      array: clone(),
      line: 6,
      procedure: 'MERGE',
      description: `MERGE Line 6: Right copy loop completed (j reached ${n_R}). Buffer R[0..${n_R - 1}] is now ready.`,
      variables: {
        p,
        q,
        r,
        n_L,
        n_R,
        j: n_R,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
      },
      callStack: getStack(),
    });

    // Line 8: i = 0
    let i = 0;
    steps.push({
      array: clone(),
      line: 8,
      procedure: 'MERGE',
      description: `MERGE Line 8: Initialize left buffer pointer i = 0 (indexes smallest unmerged element in L).`,
      variables: {
        i: 0,
        j: '-',
        k: '-',
        p,
        q,
        r,
        n_L,
        n_R,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
        activeL: 0,
      },
      callStack: getStack(),
    });

    // Line 9: j = 0
    let j = 0;
    steps.push({
      array: clone(),
      line: 9,
      procedure: 'MERGE',
      description: `MERGE Line 9: Initialize right buffer pointer j = 0 (indexes smallest unmerged element in R).`,
      variables: {
        i: 0,
        j: 0,
        k: '-',
        p,
        q,
        r,
        n_L,
        n_R,
      },
      indices: {
        p,
        q,
        r,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
        activeL: 0,
        activeR: 0,
      },
      callStack: getStack(),
    });

    // Line 10: k = p
    let k = p;
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased === k) return { ...e, state: 'merging' };
        if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
        return e;
      }),
      line: 10,
      procedure: 'MERGE',
      description: `MERGE Line 10: Initialize array fill pointer k = p = ${p} (destination location in A to place next smallest element).`,
      variables: {
        i: 0,
        j: 0,
        k,
        p,
        q,
        r,
        n_L,
        n_R,
      },
      indices: {
        p,
        q,
        r,
        k,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
        activeL: 0,
        activeR: 0,
      },
      callStack: getStack(),
    });

    // Line 11: // As long as each of the arrays L and R contains an unmerged element,
    // copy the smallest unmerged element back into A[p:r].
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased === k) return { ...e, state: 'merging' };
        if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
        return e;
      }),
      line: 11,
      procedure: 'MERGE',
      description: `MERGE Line 11: As long as each of the arrays L and R contains an unmerged element, copy the smallest unmerged element back into A[${p}..${r}].`,
      variables: {
        i: 0,
        j: 0,
        k,
        p,
        q,
        r,
        n_L,
        n_R,
      },
      indices: {
        p,
        q,
        r,
        k,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item) => ({ ...item })),
        R: R.map((item) => ({ ...item })),
        activeL: 0,
        activeR: 0,
      },
      callStack: getStack(),
    });

    // Line 12: while i < n_L and j < n_R
    while (i < n_L && j < n_R) {
      const leftVal = L[i].value as number;
      const rightVal = R[j].value as number;
      const condition = leftVal <= rightVal;

      // Line 12 step: Loop condition evaluated to TRUE
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased === k) return { ...e, state: 'merging' };
          if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 12,
        procedure: 'MERGE',
        description: `MERGE Line 12: Test while condition: (i < n_L) [${i} < ${n_L}: true] and (j < n_R) [${j} < ${n_R}: true] -> TRUE. Both buffers contain unmerged elements.`,
        variables: {
          i,
          j,
          k,
          'i < n_L': true,
          'j < n_R': true,
          n_L,
          n_R,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
          activeL: i,
          activeR: j,
        },
        callStack: getStack(),
      });

      // Line 13: if L[i] <= R[j]
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased === k) return { ...e, state: 'merging' };
          if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 13,
        procedure: 'MERGE',
        description: `MERGE Line 13: Compare smallest unmerged elements: L[${i}] (${leftVal}) <= R[${j}] (${rightVal}) -> ${
          condition
            ? 'TRUE (L has smaller or equal element, maintains stability)'
            : 'FALSE (R has smaller element)'
        }.`,
        variables: {
          i,
          j,
          k,
          'L[i]': leftVal,
          'R[j]': rightVal,
          'L[i] <= R[j]': condition,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
          activeL: i,
          activeR: j,
        },
        callStack: getStack(),
      });

      if (condition) {
        // Line 14: A[k] = L[i]
        currentArray[k - 1] = {
          id: `merged-${k}-${leftVal}-${Date.now()}-${Math.random()}`,
          value: leftVal,
          state: 'placed',
        };

        steps.push({
          array: clone().map((e, idx) => {
            const oneBased = idx + 1;
            if (oneBased === k) return { ...e, state: 'placed' };
            if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
            return e;
          }),
          line: 14,
          procedure: 'MERGE',
          description: `MERGE Line 14: A[${k}] = L[${i}] (${leftVal}). Written smaller element into A[${k}].`,
          variables: {
            i,
            j,
            k,
            'A[k]': leftVal,
            'L[i]': leftVal,
            'R[j]': rightVal,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx <= i, active: idx === i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
            activeL: i,
            activeR: j,
          },
          callStack: getStack(),
        });

        // Line 15: i = i + 1
        i = i + 1;
        steps.push({
          array: clone(),
          line: 15,
          procedure: 'MERGE',
          description: `MERGE Line 15: Increment left buffer pointer i = ${i - 1} + 1 = ${i}.`,
          variables: {
            i,
            j,
            k,
            n_L,
            n_R,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
            activeL: i < n_L ? i : undefined,
            activeR: j,
          },
          callStack: getStack(),
        });
      } else {
        // Line 16: else A[k] = R[j]
        currentArray[k - 1] = {
          id: `merged-${k}-${rightVal}-${Date.now()}-${Math.random()}`,
          value: rightVal,
          state: 'placed',
        };

        steps.push({
          array: clone().map((e, idx) => {
            const oneBased = idx + 1;
            if (oneBased === k) return { ...e, state: 'placed' };
            if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
            return e;
          }),
          line: 16,
          procedure: 'MERGE',
          description: `MERGE Line 16: else A[${k}] = R[${j}] (${rightVal}). Written smaller element into A[${k}].`,
          variables: {
            i,
            j,
            k,
            'A[k]': rightVal,
            'L[i]': leftVal,
            'R[j]': rightVal,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
            R: R.map((item, idx) => ({ ...item, copied: idx <= j, active: idx === j })),
            activeL: i,
            activeR: j,
          },
          callStack: getStack(),
        });

        // Line 17: j = j + 1
        j = j + 1;
        steps.push({
          array: clone(),
          line: 17,
          procedure: 'MERGE',
          description: `MERGE Line 17: Increment right buffer pointer j = ${j - 1} + 1 = ${j}.`,
          variables: {
            i,
            j,
            k,
            n_L,
            n_R,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
            activeL: i,
            activeR: j < n_R ? j : undefined,
          },
          callStack: getStack(),
        });
      }

      // Line 18: k = k + 1
      k = k + 1;
      steps.push({
        array: clone(),
        line: 18,
        procedure: 'MERGE',
        description: `MERGE Line 18: Increment destination pointer k = ${k - 1} + 1 = ${k}.`,
        variables: {
          i,
          j,
          k,
          n_L,
          n_R,
        },
        indices: {
          p,
          q,
          r,
          k: k <= r ? k : undefined,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
          activeL: i < n_L ? i : undefined,
          activeR: j < n_R ? j : undefined,
        },
        callStack: getStack(),
      });
    }

    // Line 12 termination step: while loop condition is now FALSE
    steps.push({
      array: clone(),
      line: 12,
      procedure: 'MERGE',
      description: `MERGE Line 12: while condition is now FALSE (i = ${i}/${n_L}, j = ${j}/${n_R}). ${
        i >= n_L ? 'Left buffer L is exhausted.' : 'Right buffer R is exhausted.'
      } Exiting main comparison loop.`,
      variables: {
        i,
        j,
        k,
        'i < n_L': i < n_L,
        'j < n_R': j < n_R,
        'while condition': false,
      },
      indices: {
        p,
        q,
        r,
        k: k <= r ? k : undefined,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item, idx) => ({ ...item, copied: idx < i })),
        R: R.map((item, idx) => ({ ...item, copied: idx < j })),
      },
      callStack: getStack(),
    });

    // Line 19: // Having gone through one of L and R entirely, copy the
    // remainder of the other to the end of A[p:r].
    steps.push({
      array: clone(),
      line: 19,
      procedure: 'MERGE',
      description: `MERGE Line 19: Having gone through one of L and R entirely, copy the remainder of the other to the end of A[${p}..${r}].`,
      variables: {
        i,
        j,
        k,
        p,
        q,
        r,
        n_L,
        n_R,
        exhausted: i >= n_L ? 'L' : 'R',
      },
      indices: {
        p,
        q,
        r,
        k: k <= r ? k : undefined,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item, idx) => ({ ...item, copied: idx < i })),
        R: R.map((item, idx) => ({ ...item, copied: idx < j })),
        activeL: i < n_L ? i : undefined,
        activeR: j < n_R ? j : undefined,
      },
      callStack: getStack(),
    });

    // Line 20: while i < n_L (copy remainder of L)
    steps.push({
      array: clone(),
      line: 20,
      procedure: 'MERGE',
      description: `MERGE Line 20: Check while i < n_L: (${i} < ${n_L}) -> ${
        i < n_L ? `TRUE (${n_L - i} remaining element(s) in L).` : 'FALSE (no remaining elements in L).'
      }`,
      variables: {
        i,
        'i < n_L': i < n_L,
        k,
      },
      indices: {
        p,
        q,
        r,
        k: k <= r ? k : undefined,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
        R: R.map((item, idx) => ({ ...item, copied: idx < j })),
        activeL: i < n_L ? i : undefined,
      },
      callStack: getStack(),
    });

    while (i < n_L) {
      const val = L[i].value as number;
      currentArray[k - 1] = {
        id: `merged-rem-L-${k}-${val}-${Date.now()}-${Math.random()}`,
        value: val,
        state: 'placed',
      };

      // Line 21: A[k] = L[i]
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === k - 1) return { ...e, state: 'placed' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 21,
        procedure: 'MERGE',
        description: `MERGE Line 21: A[${k}] = L[${i}] (${val}). Copied remainder of L into A[${k}].`,
        variables: {
          i,
          k,
          'A[k]': val,
          'L[i]': val,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx <= i, active: idx === i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
          activeL: i,
        },
        callStack: getStack(),
      });

      // Line 22: i = i + 1
      i = i + 1;
      steps.push({
        array: clone(),
        line: 22,
        procedure: 'MERGE',
        description: `MERGE Line 22: Increment left buffer pointer i = ${i - 1} + 1 = ${i}.`,
        variables: {
          i,
          k,
          n_L,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
          activeL: i < n_L ? i : undefined,
        },
        callStack: getStack(),
      });

      // Line 23: k = k + 1
      k = k + 1;
      steps.push({
        array: clone(),
        line: 23,
        procedure: 'MERGE',
        description: `MERGE Line 23: Increment destination pointer k = ${k - 1} + 1 = ${k}.`,
        variables: {
          i,
          k,
        },
        indices: {
          p,
          q,
          r,
          k: k <= r ? k : undefined,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
        },
        callStack: getStack(),
      });

      // Line 20 check again if loop continues
      if (i < n_L) {
        steps.push({
          array: clone(),
          line: 20,
          procedure: 'MERGE',
          description: `MERGE Line 20: Check while i < n_L: (${i} < ${n_L}) -> TRUE (${n_L - i} element(s) remaining in L).`,
          variables: {
            i,
            'i < n_L': true,
            k,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i, active: idx === i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j })),
            activeL: i,
          },
          callStack: getStack(),
        });
      }
    }

    // Line 24: while j < n_R (copy remainder of R)
    steps.push({
      array: clone(),
      line: 24,
      procedure: 'MERGE',
      description: `MERGE Line 24: Check while j < n_R: (${j} < ${n_R}) -> ${
        j < n_R ? `TRUE (${n_R - j} remaining element(s) in R).` : 'FALSE (no remaining elements in R).'
      }`,
      variables: {
        j,
        'j < n_R': j < n_R,
        k,
      },
      indices: {
        p,
        q,
        r,
        k: k <= r ? k : undefined,
        subrange: { p, q, r },
      },
      auxArrays: {
        L: L.map((item, idx) => ({ ...item, copied: idx < i })),
        R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
        activeR: j < n_R ? j : undefined,
      },
      callStack: getStack(),
    });

    while (j < n_R) {
      const val = R[j].value as number;
      currentArray[k - 1] = {
        id: `merged-rem-R-${k}-${val}-${Date.now()}-${Math.random()}`,
        value: val,
        state: 'placed',
      };

      // Line 25: A[k] = R[j]
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === k - 1) return { ...e, state: 'placed' };
          if (idx + 1 >= p && idx + 1 <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 25,
        procedure: 'MERGE',
        description: `MERGE Line 25: A[${k}] = R[${j}] (${val}). Copied remainder of R into A[${k}].`,
        variables: {
          j,
          k,
          'A[k]': val,
          'R[j]': val,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx <= j, active: idx === j })),
          activeR: j,
        },
        callStack: getStack(),
      });

      // Line 26: j = j + 1
      j = j + 1;
      steps.push({
        array: clone(),
        line: 26,
        procedure: 'MERGE',
        description: `MERGE Line 26: Increment right buffer pointer j = ${j - 1} + 1 = ${j}.`,
        variables: {
          j,
          k,
          n_R,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
          activeR: j < n_R ? j : undefined,
        },
        callStack: getStack(),
      });

      // Line 27: k = k + 1
      k = k + 1;
      steps.push({
        array: clone(),
        line: 27,
        procedure: 'MERGE',
        description: `MERGE Line 27: Increment destination pointer k = ${k - 1} + 1 = ${k}.`,
        variables: {
          j,
          k,
        },
        indices: {
          p,
          q,
          r,
          k: k <= r ? k : undefined,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
        },
        callStack: getStack(),
      });

      // Line 24 check again if loop continues
      if (j < n_R) {
        steps.push({
          array: clone(),
          line: 24,
          procedure: 'MERGE',
          description: `MERGE Line 24: Check while j < n_R: (${j} < ${n_R}) -> TRUE (${n_R - j} element(s) remaining in R).`,
          variables: {
            j,
            'j < n_R': true,
            k,
          },
          indices: {
            p,
            q,
            r,
            k,
            subrange: { p, q, r },
          },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
            activeR: j,
          },
          callStack: getStack(),
        });
      }
    }
  }

  // Run recursive algorithm
  mergeSort(1, n);

  // Final step: Entire array sorted
  steps.push({
    array: currentArray.map((e) => ({ ...e, state: 'sorted' })),
    line: 0,
    procedure: 'MERGE-SORT',
    description: `CLRS MERGE-SORT Complete: The entire array A[1..${n}] is completely sorted in non-decreasing order!`,
    variables: {
      p: 1,
      r: n,
      status: 'COMPLETE',
      comparisons: 'Θ(n log n)',
      recurrence: 'T(n) = 2T(n/2) + Θ(n) = Θ(n log n)',
    },
    indices: {
      sortedUpTo: n,
    },
    callStack: ['MERGE-SORT(A, 1, ' + n + ') [Finished]'],
  });

  return steps;
}

/**
 * CLRS 3rd Edition Merge Sort (Classic Sentinels ∞ version)
 * Procedure MERGE-SORT(A, p, r) & MERGE(A, p, q, r) with sentinels L[n1 + 1] = ∞ and R[n2 + 1] = ∞
 */
function generateMergeSortStepsCLRS3rd(values: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = values.length;

  const currentArray: ArrayElement[] = values.map((val, idx) => ({
    id: `elem-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  const callStack: string[] = [];
  const clone = () => currentArray.map((e) => ({ ...e }));
  const getStack = () => [...callStack];

  // Initial call
  callStack.push(`MERGE-SORT(A, 1, ${n})`);
  steps.push({
    array: clone(),
    line: 1,
    procedure: 'MERGE-SORT',
    description: `CLRS 3rd Edition: Initial Call MERGE-SORT(A, 1, ${n}) using ∞ Sentinels.`,
    variables: {
      p: 1,
      r: n,
      'p < r': 1 < n,
    },
    indices: {
      p: 1,
      r: n,
      subrange: { p: 1, r: n },
    },
    callStack: getStack(),
  });

  function mergeSort(p: number, r: number) {
    // Line 1: if p < r
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: e.state === 'sorted' ? 'sorted' : 'subarray' };
        }
        return e;
      }),
      line: 1,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT Line 1: if p < r (${p} < ${r}) -> ${p < r ? 'TRUE' : 'FALSE (base case)'}.`,
      variables: {
        p,
        r,
        'p < r': p < r,
      },
      indices: {
        p,
        r,
        subrange: { p, r },
      },
      callStack: getStack(),
    });

    if (p < r) {
      // Line 2: q = floor((p + r) / 2)
      const q = Math.floor((p + r) / 2);
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 2,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT Line 2: q = ⌊(${p} + ${r}) / 2⌋ = ${q}. Partition into A[${p}..${q}] and A[${
          q + 1
        }..${r}].`,
        variables: {
          p,
          r,
          q,
        },
        indices: {
          p,
          q,
          r,
          subrange: { p, q, r },
        },
        callStack: getStack(),
      });

      // Line 3: MERGE-SORT(A, p, q)
      steps.push({
        array: clone(),
        line: 3,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT Line 3: Recursively call MERGE-SORT(A, ${p}, ${q}) on left half.`,
        variables: { p, q, r },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });

      callStack.push(`MERGE-SORT(A, ${p}, ${q})`);
      mergeSort(p, q);
      callStack.pop();

      // Return to line 3
      steps.push({
        array: clone(),
        line: 3,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT: Left half A[${p}..${q}] sorted. Returning to line 4.`,
        variables: { p, q, r },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });

      // Line 4: MERGE-SORT(A, q + 1, r)
      steps.push({
        array: clone(),
        line: 4,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT Line 4: Recursively call MERGE-SORT(A, ${q + 1}, ${r}) on right half.`,
        variables: { p, q, r },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });

      callStack.push(`MERGE-SORT(A, ${q + 1}, ${r})`);
      mergeSort(q + 1, r);
      callStack.pop();

      // Return to line 4
      steps.push({
        array: clone(),
        line: 4,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT: Right half A[${q + 1}..${r}] sorted. Both halves ready to merge.`,
        variables: { p, q, r },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });

      // Line 5: MERGE(A, p, q, r)
      steps.push({
        array: clone(),
        line: 5,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT Line 5: Call MERGE(A, ${p}, ${q}, ${r}) to combine sorted halves using Sentinels.`,
        variables: { p, q, r },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });

      callStack.push(`MERGE(A, ${p}, ${q}, ${r})`);
      mergeSentinel(p, q, r);
      callStack.pop();

      // Return from MERGE
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased >= p && oneBased <= r) return { ...e, state: 'sorted' };
          return e;
        }),
        line: 5,
        procedure: 'MERGE-SORT',
        description: `MERGE-SORT Line 5 Complete: Subarray A[${p}..${r}] is now fully merged.`,
        variables: { p, q, r, status: 'SUBARRAY_SORTED' },
        indices: { p, q, r, subrange: { p, q, r } },
        callStack: getStack(),
      });
    } else {
      currentArray[p - 1].state = 'sorted';
    }
  }

  function mergeSentinel(p: number, q: number, r: number) {
    // Line 1: n1 = q - p + 1
    const n1 = q - p + 1;
    steps.push({
      array: clone(),
      line: 1,
      procedure: 'MERGE',
      description: `MERGE Line 1: n1 = q - p + 1 = ${q} - ${p} + 1 = ${n1}.`,
      variables: { p, q, r, n1 },
      indices: { p, q, r, subrange: { p, q, r } },
      callStack: getStack(),
    });

    // Line 2: n2 = r - q
    const n2 = r - q;
    steps.push({
      array: clone(),
      line: 2,
      procedure: 'MERGE',
      description: `MERGE Line 2: n2 = r - q = ${r} - ${q} = ${n2}.`,
      variables: { p, q, r, n1, n2 },
      indices: { p, q, r, subrange: { p, q, r } },
      callStack: getStack(),
    });

    // Line 3: let L[1..n1 + 1] and R[1..n2 + 1] be new arrays
    const L: AuxBufferItem[] = [];
    const R: AuxBufferItem[] = [];
    steps.push({
      array: clone(),
      line: 3,
      procedure: 'MERGE',
      description: `MERGE Line 3: Allocate buffers L[1..${n1 + 1}] and R[1..${n2 + 1}] (including sentinel slots).`,
      variables: { p, q, r, n1, n2 },
      indices: { p, q, r, subrange: { p, q, r } },
      auxArrays: { L: [], R: [] },
      callStack: getStack(),
    });

    // Line 4-5: for i = 1 to n1: L[i] = A[p + i - 1]
    for (let i = 1; i <= n1; i++) {
      const sourceIdx = p + i - 1;
      const val = currentArray[sourceIdx - 1].value;

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'key' };
          return e;
        }),
        line: 4,
        procedure: 'MERGE',
        description: `MERGE Line 4: for i = ${i} to ${n1}. Copy A[${sourceIdx}] into L[${i}].`,
        variables: { i, n1, 'A[p+i-1]': val },
        indices: { p, q, r, i: sourceIdx, subrange: { p, q, r } },
        auxArrays: { L: [...L], R: [...R] },
        callStack: getStack(),
      });

      L.push({ id: `L-${i}-${val}`, value: val });
      steps.push({
        array: clone(),
        line: 5,
        procedure: 'MERGE',
        description: `MERGE Line 5: L[${i}] = A[${sourceIdx}] (${val}).`,
        variables: { i, 'L[i]': val },
        indices: { p, q, r, i: sourceIdx, subrange: { p, q, r } },
        auxArrays: { L: [...L], R: [...R] },
        callStack: getStack(),
      });
    }

    // Line 6-7: for j = 1 to n2: R[j] = A[q + j]
    for (let j = 1; j <= n2; j++) {
      const sourceIdx = q + j;
      const val = currentArray[sourceIdx - 1].value;

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) return { ...e, state: 'key' };
          return e;
        }),
        line: 6,
        procedure: 'MERGE',
        description: `MERGE Line 6: for j = ${j} to ${n2}. Copy A[${sourceIdx}] into R[${j}].`,
        variables: { j, n2, 'A[q+j]': val },
        indices: { p, q, r, j: sourceIdx, subrange: { p, q, r } },
        auxArrays: { L: [...L], R: [...R] },
        callStack: getStack(),
      });

      R.push({ id: `R-${j}-${val}`, value: val });
      steps.push({
        array: clone(),
        line: 7,
        procedure: 'MERGE',
        description: `MERGE Line 7: R[${j}] = A[${sourceIdx}] (${val}).`,
        variables: { j, 'R[j]': val },
        indices: { p, q, r, j: sourceIdx, subrange: { p, q, r } },
        auxArrays: { L: [...L], R: [...R] },
        callStack: getStack(),
      });
    }

    // Line 8: L[n1 + 1] = ∞
    L.push({ id: `L-sentinel`, value: '∞', isSentinel: true });
    steps.push({
      array: clone(),
      line: 8,
      procedure: 'MERGE',
      description: `MERGE Line 8: L[${n1 + 1}] = ∞ (Sentinel card placed at end of left pile).`,
      variables: { 'L[n1+1]': '∞' },
      indices: { p, q, r, subrange: { p, q, r } },
      auxArrays: { L: [...L], R: [...R] },
      callStack: getStack(),
    });

    // Line 9: R[n2 + 1] = ∞
    R.push({ id: `R-sentinel`, value: '∞', isSentinel: true });
    steps.push({
      array: clone(),
      line: 9,
      procedure: 'MERGE',
      description: `MERGE Line 9: R[${n2 + 1}] = ∞ (Sentinel card placed at end of right pile).`,
      variables: { 'R[n2+1]': '∞' },
      indices: { p, q, r, subrange: { p, q, r } },
      auxArrays: { L: [...L], R: [...R] },
      callStack: getStack(),
    });

    // Line 10: i = 1
    let i = 1;
    steps.push({
      array: clone(),
      line: 10,
      procedure: 'MERGE',
      description: `MERGE Line 10: i = 1 (Initialize index for L).`,
      variables: { i: 1 },
      indices: { p, q, r, subrange: { p, q, r } },
      auxArrays: { L: [...L], R: [...R], activeL: 0 },
      callStack: getStack(),
    });

    // Line 11: j = 1
    let j = 1;
    steps.push({
      array: clone(),
      line: 11,
      procedure: 'MERGE',
      description: `MERGE Line 11: j = 1 (Initialize index for R).`,
      variables: { i: 1, j: 1 },
      indices: { p, q, r, subrange: { p, q, r } },
      auxArrays: { L: [...L], R: [...R], activeL: 0, activeR: 0 },
      callStack: getStack(),
    });

    // Line 12: for k = p to r
    for (let k = p; k <= r; k++) {
      const leftVal = L[i - 1].value;
      const rightVal = R[j - 1].value;

      // Sentinel comparison helper
      const numLeft = leftVal === '∞' ? Infinity : (leftVal as number);
      const numRight = rightVal === '∞' ? Infinity : (rightVal as number);
      const cond = numLeft <= numRight;

      // Line 12: for loop test
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === k - 1) return { ...e, state: 'merging' };
          return e;
        }),
        line: 12,
        procedure: 'MERGE',
        description: `MERGE Line 12: for k = ${k} to ${r}. Placing element at position A[${k}].`,
        variables: { k, i, j, 'L[i]': leftVal, 'R[j]': rightVal },
        indices: { p, q, r, k, subrange: { p, q, r } },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i - 1, active: idx === i - 1 })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j - 1, active: idx === j - 1 })),
          activeL: i - 1,
          activeR: j - 1,
        },
        callStack: getStack(),
      });

      // Line 13: if L[i] <= R[j]
      steps.push({
        array: clone().map((e, idx) => {
          if (idx === k - 1) return { ...e, state: 'merging' };
          return e;
        }),
        line: 13,
        procedure: 'MERGE',
        description: `MERGE Line 13: if L[${i}] (${leftVal}) <= R[${j}] (${rightVal}) -> ${
          cond ? 'TRUE' : 'FALSE'
        }. ${numLeft === Infinity ? 'Right pile chosen because L is sentinel ∞!' : ''}${
          numRight === Infinity ? 'Left pile chosen because R is sentinel ∞!' : ''
        }`,
        variables: { i, j, k, 'L[i]': leftVal, 'R[j]': rightVal, 'L[i] <= R[j]': cond },
        indices: { p, q, r, k, subrange: { p, q, r } },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, copied: idx < i - 1, active: idx === i - 1 })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j - 1, active: idx === j - 1 })),
          activeL: i - 1,
          activeR: j - 1,
        },
        callStack: getStack(),
      });

      if (cond) {
        // Line 14: A[k] = L[i]
        currentArray[k - 1] = {
          id: `merged-sentinel-${k}-${leftVal}-${Date.now()}-${Math.random()}`,
          value: leftVal as number,
          state: 'placed',
        };

        steps.push({
          array: clone(),
          line: 14,
          procedure: 'MERGE',
          description: `MERGE Line 14: A[${k}] = L[${i}] (${leftVal}). Copied from left buffer.`,
          variables: { k, i, 'A[k]': leftVal },
          indices: { p, q, r, k, subrange: { p, q, r } },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx <= i - 1, active: idx === i - 1 })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j - 1, active: idx === j - 1 })),
            activeL: i - 1,
            activeR: j - 1,
          },
          callStack: getStack(),
        });

        // Line 15: i = i + 1
        i = i + 1;
        steps.push({
          array: clone(),
          line: 15,
          procedure: 'MERGE',
          description: `MERGE Line 15: i = ${i - 1} + 1 = ${i}. Advanced pointer in L.`,
          variables: { i, j, k },
          indices: { p, q, r, k, subrange: { p, q, r } },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i - 1 })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j - 1 })),
            activeL: i - 1,
            activeR: j - 1,
          },
          callStack: getStack(),
        });
      } else {
        // Line 16: else A[k] = R[j]
        currentArray[k - 1] = {
          id: `merged-sentinel-${k}-${rightVal}-${Date.now()}-${Math.random()}`,
          value: rightVal as number,
          state: 'placed',
        };

        steps.push({
          array: clone(),
          line: 16,
          procedure: 'MERGE',
          description: `MERGE Line 16: else A[${k}] = R[${j}] (${rightVal}). Copied from right buffer.`,
          variables: { k, j, 'A[k]': rightVal },
          indices: { p, q, r, k, subrange: { p, q, r } },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i - 1, active: idx === i - 1 })),
            R: R.map((item, idx) => ({ ...item, copied: idx <= j - 1, active: idx === j - 1 })),
            activeL: i - 1,
            activeR: j - 1,
          },
          callStack: getStack(),
        });

        // Line 17: j = j + 1
        j = j + 1;
        steps.push({
          array: clone(),
          line: 17,
          procedure: 'MERGE',
          description: `MERGE Line 17: j = ${j - 1} + 1 = ${j}. Advanced pointer in R.`,
          variables: { i, j, k },
          indices: { p, q, r, k, subrange: { p, q, r } },
          auxArrays: {
            L: L.map((item, idx) => ({ ...item, copied: idx < i - 1 })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j - 1 })),
            activeL: i - 1,
            activeR: j - 1,
          },
          callStack: getStack(),
        });
      }
    }
  }

  mergeSort(1, n);

  steps.push({
    array: currentArray.map((e) => ({ ...e, state: 'sorted' })),
    line: 0,
    procedure: 'MERGE-SORT',
    description: `CLRS 3rd Edition MERGE-SORT Complete: Array A[1..${n}] is sorted using sentinels.`,
    variables: { p: 1, r: n, status: 'COMPLETE' },
    indices: { sortedUpTo: n },
    callStack: ['MERGE-SORT Complete'],
  });

  return steps;
}
