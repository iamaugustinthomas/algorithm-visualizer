import React, { useState } from 'react';
import { Shuffle, Sliders, ListPlus, RefreshCw } from 'lucide-react';

interface ArrayControlsProps {
  onSetArray: (arr: number[]) => void;
  currentLength: number;
}

export const ArrayControls: React.FC<ArrayControlsProps> = ({
  onSetArray,
  currentLength,
}) => {
  const [customInput, setCustomInput] = useState<string>('12, 5, 8, 3, 19, 1, 7');
  const [arraySize, setArraySize] = useState<number>(currentLength || 8);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Preset generators
  const generateRandom = (size: number) => {
    const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 5);
    onSetArray(arr);
    setCustomInput(arr.join(', '));
    setErrorMsg(null);
  };

  const generateNearlySorted = (size: number) => {
    const arr = Array.from({ length: size }, (_, i) => Math.floor((i + 1) * (90 / size)));
    // Swap 2 random adjacent elements
    if (size > 3) {
      const idx = Math.floor(Math.random() * (size - 2));
      const temp = arr[idx];
      arr[idx] = arr[idx + 1];
      arr[idx + 1] = temp;
    }
    onSetArray(arr);
    setCustomInput(arr.join(', '));
    setErrorMsg(null);
  };

  const generateReversed = (size: number) => {
    const arr = Array.from({ length: size }, (_, i) => (size - i) * 8 + 4);
    onSetArray(arr);
    setCustomInput(arr.join(', '));
    setErrorMsg(null);
  };

  const generateFewUnique = (size: number) => {
    const uniqueValues = [15, 42, 78, 25];
    const arr = Array.from({ length: size }, () => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
    onSetArray(arr);
    setCustomInput(arr.join(', '));
    setErrorMsg(null);
  };

  const handleApplyCustom = () => {
    try {
      const parsed = customInput
        .split(/[\s,]+/)
        .filter((x) => x.trim().length > 0)
        .map((x) => {
          const num = Number(x);
          if (isNaN(num)) throw new Error(`Invalid number: "${x}"`);
          return Math.max(1, Math.min(999, Math.round(num)));
        });

      if (parsed.length < 2) {
        setErrorMsg('Please enter at least 2 numbers.');
        return;
      }
      if (parsed.length > 30) {
        setErrorMsg('Maximum array size is 30 for clear visualization.');
        return;
      }

      setErrorMsg(null);
      setArraySize(parsed.length);
      onSetArray(parsed);
    } catch (err) {
      setErrorMsg((err as Error).message || 'Invalid input format.');
    }
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3 mb-4">
        <Sliders className="w-4 h-4 text-amber-400" />
        <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
          Array Data Setup
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preset Generators & Size */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-400 block">
            Array Size: <span className="text-amber-400 font-bold">{arraySize}</span> elements
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min={4}
              max={20}
              value={arraySize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setArraySize(newSize);
                generateRandom(newSize);
              }}
              className="flex-1 h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-slate-800"
            />
            <button
              onClick={() => generateRandom(arraySize)}
              className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center space-x-1.5 transition-all glow-amber"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Randomize</span>
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <button
              onClick={() => generateNearlySorted(arraySize)}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-800 transition-all"
            >
              Nearly Sorted
            </button>
            <button
              onClick={() => generateReversed(arraySize)}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-800 transition-all"
            >
              Reversed
            </button>
            <button
              onClick={() => generateFewUnique(arraySize)}
              className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-800 transition-all"
            >
              Duplicates
            </button>
            <button
              onClick={() => {
                const sample = [5, 2, 4, 6, 1, 3];
                setCustomInput(sample.join(', '));
                setArraySize(sample.length);
                onSetArray(sample);
              }}
              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-xs font-mono font-semibold border border-amber-500/30 transition-all"
            >
              CLRS Textbook Sample
            </button>
          </div>
        </div>

        {/* Custom Input */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 block">
            Custom Array (comma-separated numbers):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g. 12, 5, 8, 3, 19, 1, 7"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 shadow-inner"
            />
            <button
              onClick={handleApplyCustom}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl text-xs flex items-center space-x-1 glow-amber transition-all"
            >
              <ListPlus className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>
          </div>
          {errorMsg && <p className="text-[11px] font-mono text-rose-400">{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};
