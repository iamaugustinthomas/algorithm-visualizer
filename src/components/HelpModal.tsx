import React from 'react';
import { X, Sparkles, BookOpen, Layers, Volume2 } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Algorithm Visualizer Guide</h2>
            <p className="text-xs text-slate-400">Mastering Insertion Sort and CLRS Pseudocode</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-300 font-mono leading-relaxed">
          <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
            <h3 className="text-amber-400 font-bold flex items-center space-x-1.5">
              <BookOpen className="w-4 h-4" />
              <span>CLRS Insertion Sort Pseudocode</span>
            </h3>
            <p className="text-slate-300">
              This visualizer implements the textbook specification from Introduction to Algorithms (CLRS):
            </p>
            <pre className="bg-slate-900 p-2 rounded text-[11px] text-amber-200/90 overflow-x-auto">
{`INSERTION-SORT(A)
1  for j = 2 to A.length
2      key = A[j]
3      // Insert A[j] into the sorted sequence A[1..j-1]
4      i = j - 1
5      while i > 0 and A[i] > key
6          A[i + 1] = A[i]
7          i = i - 1
8      A[i + 1] = key`}
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-1">
              <span className="text-amber-400 font-bold block">Pointer j</span>
              <p>The outer loop counter iterating from A[2] to A[n]. Marks the current key element to insert.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-1">
              <span className="text-purple-400 font-bold block">Pointer i</span>
              <p>The inner loop index scanning backward through sorted sequence A[1..j-1].</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-1">
              <span className="text-amber-300 font-bold block">Key Value</span>
              <p>The element A[j] temporarily extracted to be inserted into its sorted position.</p>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-1">
              <span className="text-emerald-400 font-bold block">Sorted Subarray</span>
              <p>The prefix subarray A[1..j-1] which is always kept in non-decreasing sorted order.</p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg space-y-2">
            <h3 className="text-cyan-400 font-bold flex items-center space-x-1.5">
              <Layers className="w-4 h-4" />
              <span>Interactive Controls</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li>Use <strong>Play/Pause</strong> or step arrows to advance line-by-line.</li>
              <li>Drag the <strong>Step Scrubber</strong> slider to jump directly to any step.</li>
              <li>Toggle between <strong>Bar Chart</strong> and <strong>Animated Cards</strong> view modes.</li>
              <li>Enable <Volume2 className="w-3.5 h-3.5 inline text-amber-400" /> sound effects for audio pitch feedback during comparisons.</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs font-mono transition-all shadow"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
