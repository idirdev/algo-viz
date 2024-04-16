"use client";

import type { BarState } from "@/lib/types";

interface VisualizerProps {
  array: number[];
  states: BarState[];
  maxValue: number;
}

const STATE_COLORS: Record<BarState, string> = {
  default: "#6366f1",
  comparing: "#f59e0b",
  swapping: "#ef4444",
  sorted: "#22c55e",
  pivot: "#ec4899",
};

export function Visualizer({ array, states, maxValue }: VisualizerProps) {
  const barCount = array.length;
  const gap = barCount > 80 ? 1 : barCount > 40 ? 2 : 3;

  return (
    <div className="w-full h-full flex items-end justify-center gap-px px-4 pb-4">
      {array.map((value, index) => {
        const heightPercent = (value / maxValue) * 100;
        const state = states[index] ?? "default";
        const color = STATE_COLORS[state];

        return (
          <div
            key={index}
            className="flex-1 rounded-t-sm transition-all duration-75"
            style={{
              height: `${heightPercent}%`,
              backgroundColor: color,
              maxWidth: `${100 / barCount}%`,
              marginLeft: gap / 2,
              marginRight: gap / 2,
              minWidth: 2,
            }}
          />
        );
      })}
    </div>
  );
}

export function Legend() {
  const items: Array<{ state: BarState; label: string }> = [
    { state: "default", label: "Unsorted" },
    { state: "comparing", label: "Comparing" },
    { state: "swapping", label: "Swapping" },
    { state: "sorted", label: "Sorted" },
    { state: "pivot", label: "Pivot" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center text-sm">
      {items.map(({ state, label }) => (
        <div key={state} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: STATE_COLORS[state] }}
          />
          <span className="text-zinc-400">{label}</span>
        </div>
      ))}
    </div>
  );
}
