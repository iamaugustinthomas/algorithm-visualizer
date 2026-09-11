import { AlgorithmStep, ArrayElement } from '../types';

export function generateBubbleSortSteps(initialValues: number[]): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];
  const n = initialValues.length;
  if (n === 0) return steps;

  let arr: ArrayElement[] = initialValues.map((val, idx) => ({
    id: `item-${idx}-${val}`,
    value: val,
    state: 'default',
  }));

  const copy = (a: ArrayElement[]) => a.map(i => ({ ...i }));

  steps.push({
    array: copy(arr),
    line: 1,
    description: `BUBBLE-SORT initialized with ${n} elements.`,
    variables: { i: '-', j: '-' },
    indices: {},
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      array: copy(arr),
      line: 1,
      description: `Outer loop i = ${i + 1}. Starting pass across array.`,
      variables: { i: i + 1, j: '-' },
      indices: {},
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Mark comparing
      const compArr = arr.map((item, idx) => ({
        ...item,
        state: idx >= n - i ? 'sorted' : (idx === j || idx === j + 1 ? 'comparing' : 'default'),
      })) as ArrayElement[];

      steps.push({
        array: compArr,
        line: 2,
        description: `Comparing A[${j + 1}] (${arr[j].value}) and A[${j + 2}] (${arr[j + 1].value}).`,
        variables: { i: i + 1, j: j + 1, 'A[j]': arr[j].value, 'A[j+1]': arr[j + 1].value },
        indices: { j: j + 1, comparingIndex: j + 1 },
      });

      if (arr[j].value > arr[j + 1].value) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        const swapArr = arr.map((item, idx) => ({
          ...item,
          state: idx >= n - i ? 'sorted' : (idx === j || idx === j + 1 ? 'shifting' : 'default'),
        })) as ArrayElement[];

        steps.push({
          array: swapArr,
          line: 3,
          description: `A[${j + 1}] > A[${j + 2}]. Swapping elements ${arr[j + 1].value} and ${arr[j].value}.`,
          variables: { i: i + 1, j: j + 1, action: 'Swapped' },
          indices: { j: j + 1 },
        });
      }
    }

    arr[n - i - 1].state = 'sorted';
    steps.push({
      array: copy(arr),
      line: 4,
      description: `Element ${arr[n - i - 1].value} bubbled to position A[${n - i}]. Marked as sorted.`,
      variables: { i: i + 1, sortedAt: n - i },
      indices: { sortedUpTo: n - i - 1 },
    });
  }

  const finalArr = arr.map(i => ({ ...i, state: 'sorted' as const }));
  steps.push({
    array: finalArr,
    line: 0,
    description: `🎉 BUBBLE-SORT complete!`,
    variables: { status: 'Complete' },
    indices: {},
  });

  return steps;
}
