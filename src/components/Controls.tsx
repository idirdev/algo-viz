"use client";

interface ControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  isSorted: boolean;
  speed: number;
  arraySize: number;
  comparisons: number;
  swaps: number;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onArraySizeChange: (size: number) => void;
}

export function Controls({
  isRunning,
  isPaused,
  isSorted,
  speed,
  arraySize,
  comparisons,
  swaps,
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  onArraySizeChange,
}: ControlsProps) {
  const speedLabel = speed <= 10 ? "Slow" : speed <= 50 ? "Medium" : speed <= 150 ? "Fast" : "Turbo";

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        {!isRunning || isPaused ? (
          <button
            onClick={onPlay}
            disabled={isSorted}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-lg text-sm font-medium transition-colors"
          >
            {isPaused ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            onClick={onPause}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg text-sm font-medium transition-colors"
          >
            Pause
          </button>
        )}

        <button
          onClick={onReset}
          className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Speed</label>
          <input
            type="range"
            min={1}
            max={200}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            disabled={isRunning && !isPaused}
            className="w-24 accent-indigo-500"
          />
          <span className="text-xs text-zinc-500 w-12">{speedLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-zinc-400 uppercase tracking-wider">Size</label>
          <input
            type="range"
            min={10}
            max={200}
            step={5}
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-24 accent-indigo-500"
          />
          <span className="text-xs text-zinc-500 w-8">{arraySize}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm font-mono">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Comparisons:</span>
          <span className="text-amber-400">{comparisons.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">Swaps:</span>
          <span className="text-red-400">{swaps.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
