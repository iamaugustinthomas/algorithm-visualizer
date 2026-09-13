import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward, Keyboard } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  currentStep: number;
  totalSteps: number;
  onSeek: (step: number) => void;
  speed: number; // ms delay
  onChangeSpeed: (speed: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  currentStep,
  totalSteps,
  onSeek,
  speed,
  onChangeSpeed,
}) => {
  const isAtEnd = currentStep >= totalSteps - 1;
  const isAtStart = currentStep <= 0;

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
      {/* Step Scrubber Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono font-semibold text-slate-400 w-16">
          Step {currentStep + 1}/{totalSteps}
        </span>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="flex-1 h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-800"
        />
        <span className="text-xs font-mono text-amber-400 font-bold w-12 text-right glow-amber">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}%
        </span>
      </div>

      {/* Main Action Buttons & Speed Slider */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/60 pt-3">
        {/* Playback Buttons */}
        <div className="flex items-center space-x-2">
          {/* Reset */}
          <button
            onClick={onReset}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800 transition-all shadow-md group relative"
            title="Reset to Step 0 (Shortcut: R / Home)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Step Back */}
          <button
            onClick={onStepBackward}
            disabled={isAtStart}
            className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 rounded-xl border border-slate-800 transition-all shadow-md flex items-center space-x-1.5"
            title="Previous Step (Shortcut: Left Arrow ← / J / P)"
          >
            <SkipBack className="w-4 h-4" />
            <kbd className="hidden sm:inline text-[9px] font-mono px-1 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              ←
            </kbd>
          </button>

          {/* Play / Pause */}
          <button
            onClick={onTogglePlay}
            className={`px-5 sm:px-6 py-2.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider flex items-center space-x-2 transition-all duration-200 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 glow-amber'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 glow-emerald'
            }`}
            title="Play / Pause (Shortcut: Space / K)"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isAtEnd ? 'Replay' : 'Play'}</span>
              </>
            )}
            <kbd className="text-[9px] font-mono px-1 py-0.5 rounded bg-black/30 text-slate-900 font-bold border border-black/20">
              Space
            </kbd>
          </button>

          {/* Step Forward */}
          <button
            onClick={onStepForward}
            disabled={isAtEnd}
            className="px-3 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-slate-300 rounded-xl border border-slate-800 transition-all shadow-md flex items-center space-x-1.5"
            title="Next Step (Shortcut: Right Arrow → / L / N)"
          >
            <span className="sr-only sm:not-sr-only sm:text-xs font-mono hidden md:inline">Next</span>
            <kbd className="hidden sm:inline text-[9px] font-mono px-1 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              →
            </kbd>
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard Shortcuts Helper Badge on large screens */}
        <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800/80">
          <Keyboard className="w-3.5 h-3.5 text-amber-400" />
          <span>Shortcuts:</span>
          <span className="flex items-center gap-1 text-slate-300">
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px]">Space</kbd> Play
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px]">←</kbd> Prev
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <kbd className="px-1 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px]">→</kbd> Next
          </span>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-3 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-mono shadow-inner">
          <FastForward className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Speed:</span>
          <input
            type="range"
            min={50}
            max={800}
            step={25}
            value={850 - speed} // inverted so right is faster
            onChange={(e) => onChangeSpeed(850 - Number(e.target.value))}
            className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <span className="text-amber-300 font-bold w-12 text-right">
            {speed <= 100 ? 'Fast' : speed >= 500 ? 'Slow' : `${Math.round(1000 / speed)}x`}
          </span>
        </div>
      </div>
    </div>
  );
};
