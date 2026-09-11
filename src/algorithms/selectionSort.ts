import { AlgorithmStep, ArrayElement } from '../types';

export function generateSelectionSortSteps(initialValues: number[]): AlgorithmStep[] {
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
    description: `SELECTION-SORT initialized with ${n} elements.`,
    variables: { i: '-', minIdx: '-' },
    indices: {},
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: arr.map((item, idx) => ({
        ...item,
        state: idx < i ? 'sorted' : (idx === minIdx ? 'key' : 'default'),
      })),
      line: 1,
      description: `Outer loop i = ${i + 1}. Assume minimum element is at A[${i + 1}] = ${arr[i].value}.`,
      variables: { i: i + 1, minIdx: minIdx + 1, minVal: arr[minIdx].value },
      indices: { i: i + 1, keyIndex: minIdx },
    });

    for (let j = i + 1; j < n; j++) {
      const compArr = arr.map((item, idx) => ({
        ...item,
        state: idx < i ? 'sorted' : (idx === minIdx ? 'key' : (idx === j ? 'comparing' : 'default')),
      })) as ArrayElement[];

      steps.push({
        array: compArr,
        line: 2,
        description: `Comparing current min A[${minIdx + 1}] (${arr[minIdx].value}) with A[${j + 1}] (${arr[j].value}).`,
        variables: { i: i + 1, minIdx: minIdx + 1, j: j + 1 },
        indices: { i: i + 1, j: j + 1, keyIndex: minIdx, comparingIndex: j },
      });

      if (arr[j].value < arr[minIdx].value) {
        minIdx = j;
        steps.push({
          array: arr.map((item, idx) => ({
            ...item,
            state: idx < i ? 'sorted' : (idx === minIdx ? 'key' : 'default'),
          })),
          line: 3,
          description: `Found new minimum at A[${minIdx + 1}] = ${arr[minIdx].value}.`,
          variables: { i: i + 1, minIdx: minIdx + 1, minVal: arr[minIdx].value },
          indices: { i: i + 1, keyIndex: minIdx },
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: arr.map((item, idx) => ({
          ...item,
          state: idx < i ? 'sorted' : (idx === i ? 'placed' : 'default'),
        })),
        line: 4,
        description: `Swapped minimum element ${arr[i].value} into position A[${i + 1}].`,
        variables: { i: i + 1, swapped: `${arr[i].value} <-> ${arr[minIdx].value}` },
        indices: { i: i + 1 },
      });
    } else {
      arr[i].state = 'sorted';
      steps.push({
        array: copy(arr),
        line: 4,
        description: `A[${i + 1}] (${arr[i].value}) is already the minimum. No swap needed.`,
        variables: { i: i + 1 },
        indices: { i: i + 1 },
      });
    }
  }

  const finalArr = arr.map(i => ({ ...i, state: 'sorted' as const }));
  steps.push({
    array: finalArr,
    line: 0,
    description: `🎉 SELECTION-SORT complete!`,
    variables: { status: 'Complete' },
    indices: {},
  });

  return steps;
}
