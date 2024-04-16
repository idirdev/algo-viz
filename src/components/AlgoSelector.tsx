"use client";

import { ALGORITHMS, type AlgorithmId } from "@/lib/types";

interface AlgoSelectorProps {
  selected: AlgorithmId;
  onChange: (id: AlgorithmId) => void;
  disabled: boolean;
}

export function AlgoSelector({ selected, onChange, disabled }: AlgoSelectorProps) {
  const selectedAlgo = ALGORITHMS.find((a) => a.id === selected)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ALGORITHMS.map((algo) => (
          <button
            key={algo.id}
            onClick={() => onChange(algo.id)}
            disabled={disabled}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selected === algo.id
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 disabled:opacity-50"
            }`}
          >
            {algo.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-6 text-xs text-zinc-500 font-mono">
        <div>
          <span className="text-zinc-600">Best: </span>
          <span className="text-emerald-500">{selectedAlgo.timeBest}</span>
        </div>
        <div>
          <span className="text-zinc-600">Avg: </span>
          <span className="text-amber-500">{selectedAlgo.timeAvg}</span>
        </div>
        <div>
          <span className="text-zinc-600">Worst: </span>
          <span className="text-red-500">{selectedAlgo.timeWorst}</span>
        </div>
        <div>
          <span className="text-zinc-600">Space: </span>
          <span className="text-blue-400">{selectedAlgo.space}</span>
        </div>
        <div>
          <span className="text-zinc-600">Stable: </span>
          <span className={selectedAlgo.stable ? "text-emerald-500" : "text-red-500"}>
            {selectedAlgo.stable ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}
