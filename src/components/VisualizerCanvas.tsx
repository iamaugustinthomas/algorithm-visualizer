import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrayElement } from '../types';

interface VisualizerCanvasProps {
  elements: ArrayElement[];
  viewMode: 'bars' | 'cards';
  indices: {
    j?: number;
    i?: number;
    keyIndex?: number;
    comparingIndex?: number;
    sortedUpTo?: number;
  };
  keyValue?: number | string | null;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  elements,
  viewMode,
  indices,
  keyValue,
}) => {
  const maxValue = Math.max(...elements.map((e) => e.value), 10);

  // Map element state to color styles
  const getStateStyle = (state: ArrayElement['state'], isKey: boolean) => {
    if (isKey) {
      return {
        bar: 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 border-amber-300 glow-amber z-20',
        card: 'bg-amber-500/25 border-amber-400 text-amber-200 glow-amber ring-2 ring-amber-400/80 z-20',
        badge: 'bg-amber-500/30 text-amber-300 border-amber-400/50',
      };
    }

    switch (state) {
      case 'sorted':
        return {
          bar: 'bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-300 border-emerald-400 glow-emerald',
          card: 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 glow-emerald',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'key':
        return {
          bar: 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 border-amber-300 glow-amber z-20',
          card: 'bg-amber-950/70 border-amber-400 text-amber-200 glow-amber ring-2 ring-amber-400',
          badge: 'bg-amber-500/30 text-amber-300 border-amber-400/50',
        };
      case 'comparing':
        return {
          bar: 'bg-gradient-to-t from-purple-600 via-purple-500 to-purple-300 border-purple-300 glow-purple z-20',
          card: 'bg-purple-950/70 border-purple-400 text-purple-200 glow-purple ring-2 ring-purple-400/80',
          badge: 'bg-purple-500/30 text-purple-300 border-purple-400/50',
        };
      case 'shifting':
        return {
          bar: 'bg-gradient-to-t from-orange-600 via-orange-500 to-orange-300 border-orange-300 animate-pulse shadow-lg shadow-orange-500/30',
          card: 'bg-orange-950/70 border-orange-400 text-orange-200 ring-2 ring-orange-400/80',
          badge: 'bg-orange-500/30 text-orange-300 border-orange-400/50',
        };
      case 'placed':
        return {
          bar: 'bg-gradient-to-t from-cyan-600 via-cyan-500 to-cyan-300 border-cyan-300 glow-cyan',
          card: 'bg-cyan-950/70 border-cyan-400 text-cyan-200 glow-cyan ring-2 ring-cyan-400/80',
          badge: 'bg-cyan-500/30 text-cyan-300 border-cyan-400/50',
        };
      default:
        return {
          bar: 'bg-gradient-to-t from-slate-800 via-slate-700 to-slate-600 border-slate-600 hover:border-slate-400',
          card: 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700',
          badge: 'bg-slate-800 text-slate-400 border-slate-700',
        };
    }
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between min-h-[380px] relative overflow-hidden">
      {/* Immersive Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Banner & Key Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 z-10">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-400 font-semibold">Length n = {elements.length}</span>
          {keyValue !== undefined && keyValue !== null && keyValue !== '-' && (
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-full font-bold glow-amber animate-bounce">
              Active Key: {keyValue}
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <span className="text-slate-300">Sorted Subarray</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
            <span className="text-slate-300">Key (A[j])</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
            <span className="text-slate-300">Comparing (A[i])</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-sm shadow-orange-400" />
            <span className="text-slate-300">Shifting Right</span>
          </div>
        </div>
      </div>

      {/* Main Array Display */}
      <div className="flex-1 flex items-end justify-center gap-2 sm:gap-3 py-4 z-10 px-2 min-h-[220px]">
        <AnimatePresence mode="popLayout">
          {elements.map((elem, idx) => {
            const oneBasedIdx = idx + 1;
            const isKey = indices.keyIndex === idx;
            const isI = indices.i === oneBasedIdx;
            const isJ = indices.j === oneBasedIdx;
            const isComparing = indices.comparingIndex === idx;

            const style = getStateStyle(elem.state, isKey);
            const heightPercent = Math.max(15, (elem.value / maxValue) * 100);

            if (viewMode === 'bars') {
              return (
                <motion.div
                  key={`${elem.id}-idx-${idx}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  className="flex flex-col items-center flex-1 max-w-[56px] h-full justify-end group relative"
                >
                  {/* Top Pointer Badge */}
                  <div className="h-7 flex items-end justify-center mb-1">
                    {isKey && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500 text-slate-950 rounded shadow animate-pulse">
                        key
                      </span>
                    )}
                    {!isKey && isComparing && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-purple-500 text-white rounded shadow">
                        comp
                      </span>
                    )}
                  </div>

                  {/* Value label on top of bar */}
                  <div className="text-xs font-mono font-bold mb-1 text-slate-200">
                    {elem.value}
                  </div>

                  {/* Vertical Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg border-t-2 border-x transition-all duration-200 flex items-center justify-center relative ${style.bar}`}
                  >
                    {/* Inner highlight */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/20 rounded-t-lg" />
                  </div>

                  {/* 1-Based Index Label */}
                  <div className="mt-2 text-center">
                    <div className="text-[10px] font-mono text-slate-400">
                      A[{oneBasedIdx}]
                    </div>
                  </div>

                  {/* Pointer Marker below */}
                  <div className="h-6 flex items-center justify-center gap-1 mt-1 font-mono text-[11px] font-bold">
                    {isJ && <span className="text-amber-400 border-b-2 border-amber-400">j</span>}
                    {isI && <span className="text-purple-400 border-b-2 border-purple-400">i</span>}
                  </div>
                </motion.div>
              );
            }

            // Cards View
            return (
              <motion.div
                key={`${elem.id}-idx-${idx}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex flex-col items-center justify-center flex-1 max-w-[70px] group"
              >
                {/* Pointer Top Label */}
                <div className="h-6 flex items-center justify-center mb-1 font-mono text-[10px] font-bold">
                  {isKey && (
                    <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 rounded">key</span>
                  )}
                  {!isKey && isComparing && (
                    <span className="px-1.5 py-0.5 bg-purple-500 text-white rounded">comp</span>
                  )}
                </div>

                {/* Card Tile */}
                <div
                  className={`w-full aspect-square rounded-xl border flex flex-col items-center justify-center p-2 relative transition-all duration-200 ${style.card}`}
                >
                  <span className="text-lg sm:text-2xl font-bold font-mono tracking-tight">
                    {elem.value}
                  </span>

                  {/* State badge inside card */}
                  <span className="text-[9px] font-mono uppercase tracking-wider mt-0.5 opacity-80">
                    {elem.state}
                  </span>
                </div>

                {/* Index label */}
                <div className="mt-2 text-[11px] font-mono text-slate-400">
                  A[{oneBasedIdx}]
                </div>

                {/* Bottom Pointers */}
                <div className="h-6 flex items-center justify-center gap-1 font-mono text-[11px] font-bold mt-0.5">
                  {isJ && (
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                      j={indices.j}
                    </span>
                  )}
                  {isI && (
                    <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded">
                      i={indices.i}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Array Range Boundary Indicator */}
      <div className="mt-2 border-t border-slate-800 pt-3 flex items-center justify-between text-xs font-mono text-slate-500 z-10">
        <div>1-Indexed Pseudocode Array Bounds: A[1] ... A[{elements.length}]</div>
        {indices.sortedUpTo !== undefined && indices.sortedUpTo >= 0 && (
          <div className="text-emerald-400">
            Sorted Prefix: A[1 .. {indices.sortedUpTo + 1}]
          </div>
        )}
      </div>
    </div>
  );
};
