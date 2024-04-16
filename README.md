# Algo Viz

Interactive sorting algorithm visualizer built with Next.js, React, and Tailwind CSS.

## Features

- 5 sorting algorithms: Bubble, Selection, Insertion, Merge, Quick Sort
- Real-time bar chart visualization with color-coded states
- Adjustable speed and array size
- Play, pause, and reset controls
- Live comparison and swap counters
- Big-O complexity display for each algorithm

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Algorithms

| Algorithm      | Best       | Average    | Worst      | Space    | Stable |
|---------------|------------|------------|------------|----------|--------|
| Bubble Sort   | O(n)       | O(n^2)     | O(n^2)     | O(1)     | Yes    |
| Selection Sort| O(n^2)     | O(n^2)     | O(n^2)     | O(1)     | No     |
| Insertion Sort| O(n)       | O(n^2)     | O(n^2)     | O(1)     | Yes    |
| Merge Sort    | O(n log n) | O(n log n) | O(n log n) | O(n)     | Yes    |
| Quick Sort    | O(n log n) | O(n log n) | O(n^2)     | O(log n) | No     |

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
