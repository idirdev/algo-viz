import type { SortStep, SortGenerator, BarState } from "@/lib/types";

export function* insertionSort(inputArray: number[]): SortGenerator {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Show the element being inserted
    const insertStates: BarState[] = arr.map((_, idx) => {
      if (idx === i) return "pivot";
      if (idx < i) return "sorted";
      return "default";
    });
    yield { array: [...arr], states: insertStates, comparisons, swaps };

    while (j >= 0 && arr[j] > key) {
      comparisons++;

      const states: BarState[] = arr.map((_, idx) => {
        if (idx === j) return "comparing";
        if (idx === j + 1) return "swapping";
        return "default";
      });
      yield { array: [...arr], states, comparisons, swaps };

      arr[j + 1] = arr[j];
      swaps++;
      j--;

      yield {
        array: [...arr],
        states: arr.map((_, idx) => (idx <= i ? "sorted" : "default")),
        comparisons,
        swaps,
      };
    }

    if (j >= 0) comparisons++;
    arr[j + 1] = key;
  }

  const finalStates: BarState[] = arr.map(() => "sorted");
  return { array: [...arr], states: finalStates, comparisons, swaps };
}
