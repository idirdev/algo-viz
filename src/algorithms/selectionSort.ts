import type { SortStep, SortGenerator, BarState } from "@/lib/types";

export function* selectionSort(inputArray: number[]): SortGenerator {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      const states: BarState[] = arr.map((_, idx) => {
        if (idx < i) return "sorted";
        if (idx === minIdx) return "pivot";
        if (idx === j) return "comparing";
        return "default";
      });

      yield { array: [...arr], states, comparisons, swaps };

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;

      const swapStates: BarState[] = arr.map((_, idx) => {
        if (idx < i) return "sorted";
        if (idx === i || idx === minIdx) return "swapping";
        return "default";
      });

      yield { array: [...arr], states: swapStates, comparisons, swaps };
    }
  }

  const finalStates: BarState[] = arr.map(() => "sorted");
  return { array: [...arr], states: finalStates, comparisons, swaps };
}
