import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../src/algorithms/bubbleSort';
import { selectionSort } from '../src/algorithms/selectionSort';
import { insertionSort } from '../src/algorithms/insertionSort';
import { mergeSort } from '../src/algorithms/mergeSort';
import { quickSort } from '../src/algorithms/quickSort';
import type { SortStep, SortGenerator } from '../src/lib/types';

/**
 * Helper: exhaust a sorting generator and return the final result.
 * Each generator yields intermediate SortStep objects and returns the final one.
 */
function runToCompletion(gen: SortGenerator): SortStep {
  let result = gen.next();
  while (!result.done) {
    result = gen.next();
  }
  return result.value;
}

describe('bubbleSort', () => {
  it('sorts an unsorted array', () => {
    const input = [5, 3, 8, 1, 2];
    const result = runToCompletion(bubbleSort(input));
    expect(result.array).toEqual([1, 2, 3, 5, 8]);
  });

  it('handles an already sorted array', () => {
    const input = [1, 2, 3, 4, 5];
    const result = runToCompletion(bubbleSort(input));
    expect(result.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles a reverse-sorted array', () => {
    const input = [5, 4, 3, 2, 1];
    const result = runToCompletion(bubbleSort(input));
    expect(result.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles a single-element array', () => {
    const result = runToCompletion(bubbleSort([42]));
    expect(result.array).toEqual([42]);
  });

  it('tracks comparisons and swaps', () => {
    const result = runToCompletion(bubbleSort([3, 1, 2]));
    expect(result.comparisons).toBeGreaterThan(0);
    expect(result.swaps).toBeGreaterThan(0);
  });

  it('marks all bars as sorted at completion', () => {
    const result = runToCompletion(bubbleSort([4, 2, 7]));
    expect(result.states.every((s) => s === 'sorted')).toBe(true);
  });

  it('does not mutate the original array', () => {
    const input = [5, 3, 1];
    runToCompletion(bubbleSort(input));
    expect(input).toEqual([5, 3, 1]);
  });
});

describe('selectionSort', () => {
  it('sorts an unsorted array', () => {
    const result = runToCompletion(selectionSort([9, 4, 7, 1, 3]));
    expect(result.array).toEqual([1, 3, 4, 7, 9]);
  });

  it('handles duplicate values', () => {
    const result = runToCompletion(selectionSort([3, 1, 3, 2, 1]));
    expect(result.array).toEqual([1, 1, 2, 3, 3]);
  });

  it('marks all bars as sorted at completion', () => {
    const result = runToCompletion(selectionSort([2, 1]));
    expect(result.states.every((s) => s === 'sorted')).toBe(true);
  });
});

describe('insertionSort', () => {
  it('sorts an unsorted array', () => {
    const result = runToCompletion(insertionSort([6, 2, 8, 4, 1]));
    expect(result.array).toEqual([1, 2, 4, 6, 8]);
  });

  it('handles an already sorted array efficiently', () => {
    const result = runToCompletion(insertionSort([1, 2, 3, 4]));
    expect(result.array).toEqual([1, 2, 3, 4]);
    // Insertion sort on a sorted array does zero swaps
    expect(result.swaps).toBe(0);
  });

  it('marks all bars as sorted at completion', () => {
    const result = runToCompletion(insertionSort([3, 1, 2]));
    expect(result.states.every((s) => s === 'sorted')).toBe(true);
  });
});

describe('mergeSort', () => {
  it('sorts an unsorted array', () => {
    const result = runToCompletion(mergeSort([10, 3, 7, 1, 5, 2]));
    expect(result.array).toEqual([1, 2, 3, 5, 7, 10]);
  });

  it('handles a two-element array', () => {
    const result = runToCompletion(mergeSort([2, 1]));
    expect(result.array).toEqual([1, 2]);
  });

  it('handles negative numbers', () => {
    const result = runToCompletion(mergeSort([-3, 0, -1, 5, 2]));
    expect(result.array).toEqual([-3, -1, 0, 2, 5]);
  });

  it('marks all bars as sorted at completion', () => {
    const result = runToCompletion(mergeSort([5, 3, 1]));
    expect(result.states.every((s) => s === 'sorted')).toBe(true);
  });
});

describe('quickSort', () => {
  it('sorts an unsorted array', () => {
    const result = runToCompletion(quickSort([8, 3, 5, 1, 9, 2]));
    expect(result.array).toEqual([1, 2, 3, 5, 8, 9]);
  });

  it('handles an already sorted array', () => {
    const result = runToCompletion(quickSort([1, 2, 3, 4, 5]));
    expect(result.array).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles a single element', () => {
    const result = runToCompletion(quickSort([7]));
    expect(result.array).toEqual([7]);
  });

  it('handles large arrays', () => {
    const input = Array.from({ length: 50 }, () => Math.floor(Math.random() * 1000));
    const result = runToCompletion(quickSort(input));
    const sorted = [...input].sort((a, b) => a - b);
    expect(result.array).toEqual(sorted);
  });

  it('marks all bars as sorted at completion', () => {
    const result = runToCompletion(quickSort([4, 2, 6]));
    expect(result.states.every((s) => s === 'sorted')).toBe(true);
  });
});

describe('sorting generators yield intermediate steps', () => {
  it('bubbleSort yields at least one intermediate step', () => {
    const gen = bubbleSort([3, 1, 2]);
    const first = gen.next();
    expect(first.done).toBe(false);
    expect(first.value).toHaveProperty('array');
    expect(first.value).toHaveProperty('states');
    expect(first.value).toHaveProperty('comparisons');
    expect(first.value).toHaveProperty('swaps');
  });

  it('quickSort yields intermediate steps with pivot state', () => {
    const gen = quickSort([5, 3, 8, 1]);
    const steps: SortStep[] = [];
    let result = gen.next();
    while (!result.done) {
      steps.push(result.value);
      result = gen.next();
    }
    // Should have yielded multiple steps
    expect(steps.length).toBeGreaterThan(0);
    // At least one step should have a 'pivot' state
    const hasPivot = steps.some((s) => s.states.includes('pivot'));
    expect(hasPivot).toBe(true);
  });
});
