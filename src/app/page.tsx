"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Visualizer, Legend } from "@/components/Visualizer";
import { Controls } from "@/components/Controls";
import { AlgoSelector } from "@/components/AlgoSelector";
import type { AlgorithmId, BarState, SortGenerator } from "@/lib/types";
import { bubbleSort } from "@/algorithms/bubbleSort";
import { selectionSort } from "@/algorithms/selectionSort";
import { insertionSort } from "@/algorithms/insertionSort";
import { mergeSort } from "@/algorithms/mergeSort";
import { quickSort } from "@/algorithms/quickSort";

const algorithmMap: Record<AlgorithmId, (arr: number[]) => SortGenerator> = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
};

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 500) + 10);
}

export default function Home() {
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState(() => generateRandomArray(50));
  const [states, setStates] = useState<BarState[]>(() => array.map(() => "default"));
  const [algorithm, setAlgorithm] = useState<AlgorithmId>("bubble");
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generatorRef = useRef<SortGenerator | null>(null);
  const animationRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const maxValue = useRef(Math.max(...array));

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const reset = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    generatorRef.current = null;
    animationRef.current = null;

    const newArray = generateRandomArray(arraySize);
    maxValue.current = Math.max(...newArray);
    setArray(newArray);
    setStates(newArray.map(() => "default"));
    setIsRunning(false);
    setIsPaused(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
  }, [arraySize]);

  const runSorting = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = algorithmMap[algorithm]([...array]);
    }

    const gen = generatorRef.current;
    let lastTime = 0;
    const interval = Math.max(1, 201 - speed);

    function step(timestamp: number) {
      if (isPausedRef.current) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      if (timestamp - lastTime < interval) {
        animationRef.current = requestAnimationFrame(step);
        return;
      }

      lastTime = timestamp;
      const result = gen.next();

      if (result.done) {
        const finalStep = result.value;
        setArray(finalStep.array);
        setStates(finalStep.states);
        setComparisons(finalStep.comparisons);
        setSwaps(finalStep.swaps);
        setIsRunning(false);
        setIsSorted(true);
        generatorRef.current = null;
        return;
      }

      const sortStep = result.value;
      setArray(sortStep.array);
      setStates(sortStep.states);
      setComparisons(sortStep.comparisons);
      setSwaps(sortStep.swaps);

      animationRef.current = requestAnimationFrame(step);
    }

    animationRef.current = requestAnimationFrame(step);
  }, [algorithm, array, speed]);

  const handlePlay = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
    runSorting();
  }, [isPaused, runSorting]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleArraySizeChange = useCallback((size: number) => {
    setArraySize(size);
    const newArray = generateRandomArray(size);
    maxValue.current = Math.max(...newArray);
    setArray(newArray);
    setStates(newArray.map(() => "default"));
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
  }, []);

  return (
    <main className="min-h-screen flex flex-col p-6 gap-6">
      <header className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-sm">
          AV
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Algo Viz</h1>
        <span className="text-sm text-zinc-500 ml-2">Sorting Algorithm Visualizer</span>
      </header>

      <AlgoSelector
        selected={algorithm}
        onChange={(id) => {
          setAlgorithm(id);
          if (!isRunning) {
            setIsSorted(false);
          }
        }}
        disabled={isRunning}
      />

      <div className="flex-1 min-h-[400px] bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <Visualizer
          array={array}
          states={states}
          maxValue={maxValue.current}
        />
      </div>

      <Legend />

      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        isSorted={isSorted}
        speed={speed}
        arraySize={arraySize}
        comparisons={comparisons}
        swaps={swaps}
        onPlay={handlePlay}
        onPause={handlePause}
        onReset={reset}
        onSpeedChange={setSpeed}
        onArraySizeChange={handleArraySizeChange}
      />
    </main>
  );
}
