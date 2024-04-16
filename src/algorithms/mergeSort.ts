import type { SortStep, SortGenerator, BarState } from "@/lib/types";

export function* mergeSort(inputArray: number[]): SortGenerator {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  function* mergeSortHelper(
    start: number,
    end: number
  ): Generator<SortStep, void, undefined> {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);

    yield* mergeSortHelper(start, mid);
    yield* mergeSortHelper(mid, end);

    // Merge step
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      comparisons++;

      const states: BarState[] = arr.map((_, idx) => {
        if (idx === start + i || idx === mid + j) return "comparing";
        if (idx >= start && idx < end) return "pivot";
        return "default";
      });

      yield { array: [...arr], states, comparisons, swaps };

      if (left[i] <= right[j]) {
        arr[k] = left[i];
        i++;
      } else {
        arr[k] = right[j];
        j++;
      }
      swaps++;
      k++;

      const mergeStates: BarState[] = arr.map((_, idx) => {
        if (idx >= start && idx < k) return "swapping";
        if (idx >= start && idx < end) return "pivot";
        return "default";
      });

      yield { array: [...arr], states: mergeStates, comparisons, swaps };
    }

    while (i < left.length) {
      arr[k] = left[i];
      swaps++;
      i++;
      k++;
    }

    while (j < right.length) {
      arr[k] = right[j];
      swaps++;
      j++;
      k++;
    }

    const doneStates: BarState[] = arr.map((_, idx) => {
      if (idx >= start && idx < end) return "sorted";
      return "default";
    });

    yield { array: [...arr], states: doneStates, comparisons, swaps };
  }

  yield* mergeSortHelper(0, n);

  const finalStates: BarState[] = arr.map(() => "sorted");
  return { array: [...arr], states: finalStates, comparisons, swaps };
}
