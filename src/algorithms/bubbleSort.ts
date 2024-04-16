import type { SortStep, SortGenerator, BarState } from "@/lib/types";

export function* bubbleSort(inputArray: number[]): SortGenerator {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Mark comparing indices
      const states: BarState[] = arr.map((_, idx) =>
        idx >= n - i ? "sorted" : idx === j || idx === j + 1 ? "comparing" : "default"
      );

      yield { array: [...arr], states, comparisons, swaps };

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        swapped = true;

        const swapStates: BarState[] = arr.map((_, idx) =>
          idx >= n - i ? "sorted" : idx === j || idx === j + 1 ? "swapping" : "default"
        );

        yield { array: [...arr], states: swapStates, comparisons, swaps };
      }
    }

    if (!swapped) break;
  }

  const finalStates: BarState[] = arr.map(() => "sorted");
  return { array: [...arr], states: finalStates, comparisons, swaps };
}
