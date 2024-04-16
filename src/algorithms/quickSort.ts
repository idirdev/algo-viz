import type { SortStep, SortGenerator, BarState } from "@/lib/types";

export function* quickSort(inputArray: number[]): SortGenerator {
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  function* partition(
    low: number,
    high: number
  ): Generator<SortStep, number, undefined> {
    const pivot = arr[high];

    // Highlight pivot
    const pivotStates: BarState[] = arr.map((_, idx) => {
      if (idx === high) return "pivot";
      if (idx >= low && idx < high) return "default";
      return "default";
    });
    yield { array: [...arr], states: pivotStates, comparisons, swaps };

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;

      const compareStates: BarState[] = arr.map((_, idx) => {
        if (idx === high) return "pivot";
        if (idx === j) return "comparing";
        if (idx <= i && idx >= low) return "sorted";
        return "default";
      });

      yield { array: [...arr], states: compareStates, comparisons, swaps };

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;

          const swapStates: BarState[] = arr.map((_, idx) => {
            if (idx === high) return "pivot";
            if (idx === i || idx === j) return "swapping";
            return "default";
          });

          yield { array: [...arr], states: swapStates, comparisons, swaps };
        }
      }
    }

    // Place pivot in correct position
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;

    const placedStates: BarState[] = arr.map((_, idx) => {
      if (idx === i + 1) return "sorted";
      return "default";
    });

    yield { array: [...arr], states: placedStates, comparisons, swaps };

    return i + 1;
  }

  function* quickSortHelper(
    low: number,
    high: number
  ): Generator<SortStep, void, undefined> {
    if (low < high) {
      const pi: number = yield* partition(low, high);
      yield* quickSortHelper(low, pi - 1);
      yield* quickSortHelper(pi + 1, high);
    }
  }

  yield* quickSortHelper(0, n - 1);

  const finalStates: BarState[] = arr.map(() => "sorted");
  return { array: [...arr], states: finalStates, comparisons, swaps };
}
