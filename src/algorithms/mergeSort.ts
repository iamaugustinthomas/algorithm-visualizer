import { AlgorithmStep, ArrayElement, AuxBufferItem } from '../types';

export function generateMergeSortSteps(values: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = values.length;

  let currentArray: ArrayElement[] = values.map((val, idx) => ({
    id: `elem-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  // Initial step 0: Call MERGE-SORT(A, 1, n)
  steps.push({
    array: currentArray.map((e) => ({ ...e })),
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
  });

  // Helper to deep copy array
  const clone = () => currentArray.map((e) => ({ ...e }));

  function mergeSort(p: number, r: number) {
    // 1-based indices p, r
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
      description: `MERGE-SORT(A, ${p}, ${r}) Line 1: Check if subarray has 0 or 1 element: p (${p}) >= r (${r}) -> ${p >= r ? 'TRUE' : 'FALSE'}.`,
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
    });

    if (p >= r) {
      // Line 2: return
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased === p) {
            return { ...e, state: 'sorted' };
          }
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
          subrange: { p, r },
        },
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
      description: `MERGE-SORT(A, ${p}, ${r}) Line 3: Calculate midpoint q = ⌊(${p} + ${r}) / 2⌋ = ${q}. Partition into A[${p}..${q}] and A[${q + 1}..${r}].`,
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
    });

    // Line 4: MERGE-SORT(A, p, q)
    steps.push({
      array: clone(),
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
    });
    mergeSort(p, q);

    // Line 5: MERGE-SORT(A, q + 1, r)
    steps.push({
      array: clone(),
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
    });
    mergeSort(q + 1, r);

    // Line 6: MERGE(A, p, q, r)
    steps.push({
      array: clone(),
      line: 6,
      procedure: 'MERGE-SORT',
      description: `MERGE-SORT(A, ${p}, ${r}) Line 6: Both halves sorted. Call MERGE(A, ${p}, ${q}, ${r}) to combine A[${p}..${q}] and A[${q + 1}..${r}] into A[${p}..${r}].`,
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
    });
    merge(p, q, r);
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
      description: `MERGE Line 1: Compute length of left subarray A[${p}..${q}]: n_L = ${q} - ${p} + 1 = ${n_L}.`,
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
      description: `MERGE Line 2: Compute length of right subarray A[${q + 1}..${r}]: n_R = ${r} - ${q} = ${n_R}.`,
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
    });

    // Line 3: let L[0 : n_L - 1] and R[0 : n_R - 1] be new arrays
    const L: AuxBufferItem[] = [];
    const R: AuxBufferItem[] = [];

    steps.push({
      array: clone(),
      line: 3,
      procedure: 'MERGE',
      description: `MERGE Line 3: Allocate new auxiliary buffers L[0..${n_L - 1}] and R[0..${n_R - 1}].`,
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
    });

    // Line 4-5: for i = 0 to n_L - 1: L[i] = A[p + i]
    for (let i = 0; i < n_L; i++) {
      const sourceIdx = p + i; // 1-based in A
      const val = currentArray[sourceIdx - 1].value;
      L.push({
        id: `L-${i}-${val}`,
        value: val,
      });

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) {
            return { ...e, state: 'key' };
          }
          if (idx + 1 >= p && idx + 1 <= r) {
            return { ...e, state: 'subarray' };
          }
          return e;
        }),
        line: 5,
        procedure: 'MERGE',
        description: `MERGE Lines 4-5: Copying A[${p} + ${i}] (A[${sourceIdx}] = ${val}) into L[${i}].`,
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
      });
    }

    // Line 6-7: for j = 0 to n_R - 1: R[j] = A[q + j + 1]
    for (let j = 0; j < n_R; j++) {
      const sourceIdx = q + j + 1; // 1-based in A
      const val = currentArray[sourceIdx - 1].value;
      R.push({
        id: `R-${j}-${val}`,
        value: val,
      });

      steps.push({
        array: clone().map((e, idx) => {
          if (idx === sourceIdx - 1) {
            return { ...e, state: 'key' };
          }
          if (idx + 1 >= p && idx + 1 <= r) {
            return { ...e, state: 'subarray' };
          }
          return e;
        }),
        line: 7,
        procedure: 'MERGE',
        description: `MERGE Lines 6-7: Copying A[${q} + ${j} + 1] (A[${sourceIdx}] = ${val}) into R[${j}].`,
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
      });
    }

    // Lines 8, 9, 10: i = 0, j = 0, k = p
    let i = 0;
    let j = 0;
    let k = p; // 1-based in A

    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'subarray' };
        }
        return e;
      }),
      line: 10,
      procedure: 'MERGE',
      description: `MERGE Lines 8-10: Initialize pointers: i = 0 (for L), j = 0 (for R), k = ${p} (destination in A).`,
      variables: {
        i,
        j,
        k,
        'L[i]': L[i]?.value,
        'R[j]': R[j]?.value,
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
        activeL: i,
        activeR: j,
      },
    });

    // Line 11: while i < n_L and j < n_R
    while (i < n_L && j < n_R) {
      const leftVal = L[i].value;
      const rightVal = R[j].value;
      const condition = leftVal <= rightVal;

      // Line 11: while check & Line 12: if L[i] <= R[j]
      steps.push({
        array: clone().map((e, idx) => {
          const oneBased = idx + 1;
          if (oneBased === k) return { ...e, state: 'merging' };
          if (oneBased >= p && oneBased <= r) return { ...e, state: 'subarray' };
          return e;
        }),
        line: 12,
        procedure: 'MERGE',
        description: `MERGE Line 12: Compare smallest unmerged elements: L[${i}] (${leftVal}) <= R[${j}] (${rightVal}) -> ${condition ? 'TRUE (take from L)' : 'FALSE (take from R)'}.`,
        variables: {
          i,
          j,
          k,
          'L[i]': leftVal,
          'R[j]': rightVal,
          'L[i] <= R[j]': condition,
          p,
          q,
          r,
        },
        indices: {
          p,
          q,
          r,
          k,
          subrange: { p, q, r },
        },
        auxArrays: {
          L: L.map((item, idx) => ({ ...item, active: idx === i })),
          R: R.map((item, idx) => ({ ...item, active: idx === j })),
          activeL: i,
          activeR: j,
        },
      });

      if (condition) {
        // Line 13: A[k] = L[i]
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
          line: 13,
          procedure: 'MERGE',
          description: `MERGE Line 13: A[${k}] = L[${i}] (${leftVal}). Placed into merged position A[${k}].`,
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
        });

        // Line 14: i = i + 1
        i = i + 1;
        steps.push({
          array: clone(),
          line: 14,
          procedure: 'MERGE',
          description: `MERGE Line 14: Advanced left buffer index i = ${i}.`,
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
            L: L.map((item, idx) => ({ ...item, copied: idx < i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j })),
            activeL: i,
            activeR: j,
          },
        });
      } else {
        // Line 15: else A[k] = R[j]
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
          line: 15,
          procedure: 'MERGE',
          description: `MERGE Line 15: A[${k}] = R[${j}] (${rightVal}). Placed into merged position A[${k}].`,
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
        });

        // Line 16: j = j + 1
        j = j + 1;
        steps.push({
          array: clone(),
          line: 16,
          procedure: 'MERGE',
          description: `MERGE Line 16: Advanced right buffer index j = ${j}.`,
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
            L: L.map((item, idx) => ({ ...item, copied: idx < i })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j })),
            activeL: i,
            activeR: j,
          },
        });
      }

      // Line 17: k = k + 1
      k = k + 1;
      steps.push({
        array: clone(),
        line: 17,
        procedure: 'MERGE',
        description: `MERGE Line 17: Incremented target position k = ${k}.`,
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
          L: L.map((item, idx) => ({ ...item, copied: idx < i })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j })),
          activeL: i,
          activeR: j,
        },
      });
    }

    // Line 18: while i < n_L
    if (i < n_L) {
      steps.push({
        array: clone(),
        line: 18,
        procedure: 'MERGE',
        description: `MERGE Line 18: Right array R depleted. Copy remaining elements of L into A[${k}..${r}].`,
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
          R: R.map((item) => ({ ...item, copied: true })),
          activeL: i,
        },
      });

      while (i < n_L) {
        const val = L[i].value;
        currentArray[k - 1] = {
          id: `merged-rem-L-${k}-${val}-${Date.now()}-${Math.random()}`,
          value: val,
          state: 'placed',
        };

        // Line 19: A[k] = L[i]
        steps.push({
          array: clone(),
          line: 19,
          procedure: 'MERGE',
          description: `MERGE Line 19: A[${k}] = L[${i}] (${val}). Copied remainder of L into A[${k}].`,
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
            R: R.map((item) => ({ ...item, copied: true })),
            activeL: i,
          },
        });

        // Line 20: i = i + 1
        i = i + 1;

        // Line 21: k = k + 1
        k = k + 1;
        steps.push({
          array: clone(),
          line: 21,
          procedure: 'MERGE',
          description: `MERGE Lines 20-21: Incremented i = ${i} and k = ${k}.`,
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
            L: L.map((item, idx) => ({ ...item, copied: idx < i })),
            R: R.map((item) => ({ ...item, copied: true })),
            activeL: i,
          },
        });
      }
    }

    // Line 22: while j < n_R
    if (j < n_R) {
      steps.push({
        array: clone(),
        line: 22,
        procedure: 'MERGE',
        description: `MERGE Line 22: Left array L depleted. Copy remaining elements of R into A[${k}..${r}].`,
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
          L: L.map((item) => ({ ...item, copied: true })),
          R: R.map((item, idx) => ({ ...item, copied: idx < j, active: idx === j })),
          activeR: j,
        },
      });

      while (j < n_R) {
        const val = R[j].value;
        currentArray[k - 1] = {
          id: `merged-rem-R-${k}-${val}-${Date.now()}-${Math.random()}`,
          value: val,
          state: 'placed',
        };

        // Line 23: A[k] = R[j]
        steps.push({
          array: clone(),
          line: 23,
          procedure: 'MERGE',
          description: `MERGE Line 23: A[${k}] = R[${j}] (${val}). Copied remainder of R into A[${k}].`,
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
            L: L.map((item) => ({ ...item, copied: true })),
            R: R.map((item, idx) => ({ ...item, copied: idx <= j, active: idx === j })),
            activeR: j,
          },
        });

        // Line 24: j = j + 1
        j = j + 1;

        // Line 25: k = k + 1
        k = k + 1;
        steps.push({
          array: clone(),
          line: 25,
          procedure: 'MERGE',
          description: `MERGE Lines 24-25: Incremented j = ${j} and k = ${k}.`,
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
            L: L.map((item) => ({ ...item, copied: true })),
            R: R.map((item, idx) => ({ ...item, copied: idx < j })),
            activeR: j,
          },
        });
      }
    }

    // Subarray merged successfully
    steps.push({
      array: clone().map((e, idx) => {
        const oneBased = idx + 1;
        if (oneBased >= p && oneBased <= r) {
          return { ...e, state: 'sorted' };
        }
        return e;
      }),
      line: 6,
      procedure: 'MERGE-SORT',
      description: `MERGE Complete: Subarray A[${p}..${r}] is now fully merged and sorted in non-decreasing order.`,
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
        sortedUpTo: r === n && p === 1 ? n : undefined,
        subrange: { p, q, r },
      },
    });
  }

  // Run the full algorithm
  mergeSort(1, n);

  // Final step: All sorted
  steps.push({
    array: currentArray.map((e) => ({ ...e, state: 'sorted' })),
    line: 0,
    procedure: 'MERGE-SORT',
    description: `MERGE-SORT Complete: The entire array A[1..${n}] is now completely sorted!`,
    variables: {
      p: 1,
      r: n,
      status: 'COMPLETE',
      comparisons: 'O(n log n)',
    },
    indices: {
      sortedUpTo: n,
    },
  });

  return steps;
}
