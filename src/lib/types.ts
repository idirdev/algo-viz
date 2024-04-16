export type BarState = "default" | "comparing" | "swapping" | "sorted" | "pivot";

export interface SortStep {
  array: number[];
  states: BarState[];
  comparisons: number;
  swaps: number;
}

export type SortGenerator = Generator<SortStep, SortStep, undefined>;

export type AlgorithmId = "bubble" | "selection" | "insertion" | "merge" | "quick";

export interface AlgorithmInfo {
  id: AlgorithmId;
  name: string;
  timeWorst: string;
  timeAvg: string;
  timeBest: string;
  space: string;
  stable: boolean;
}

export const ALGORITHMS: AlgorithmInfo[] = [
  {
    id: "bubble",
    name: "Bubble Sort",
    timeWorst: "O(n^2)",
    timeAvg: "O(n^2)",
    timeBest: "O(n)",
    space: "O(1)",
    stable: true,
  },
  {
    id: "selection",
    name: "Selection Sort",
    timeWorst: "O(n^2)",
    timeAvg: "O(n^2)",
    timeBest: "O(n^2)",
    space: "O(1)",
    stable: false,
  },
  {
    id: "insertion",
    name: "Insertion Sort",
    timeWorst: "O(n^2)",
    timeAvg: "O(n^2)",
    timeBest: "O(n)",
    space: "O(1)",
    stable: true,
  },
  {
    id: "merge",
    name: "Merge Sort",
    timeWorst: "O(n log n)",
    timeAvg: "O(n log n)",
    timeBest: "O(n log n)",
    space: "O(n)",
    stable: true,
  },
  {
    id: "quick",
    name: "Quick Sort",
    timeWorst: "O(n^2)",
    timeAvg: "O(n log n)",
    timeBest: "O(n log n)",
    space: "O(log n)",
    stable: false,
  },
];
