import React, { useState } from 'react';
import { BSTOperationId } from '../types';
import {
  Search,
  PlusCircle,
  Trash2,
  ArrowDownToLine,
  ArrowUpToLine,
  ArrowRight,
  ArrowLeft,
  ListTree,
  CornerDownRight,
  Sparkles,
  GitBranch,
} from 'lucide-react';

interface BSTControlsProps {
  activeOperation: BSTOperationId;
  onChangeOperation: (op: BSTOperationId) => void;
  targetKey: number;
  onChangeTargetKey: (key: number) => void;
  onSetArray: (arr: number[]) => void;
  availableKeys: number[];
}

export const BSTControls: React.FC<BSTControlsProps> = ({
  activeOperation,
  onChangeOperation,
  targetKey,
  onChangeTargetKey,
  onSetArray,
  availableKeys,
}) => {
  const [customKeyInput, setCustomKeyInput] = useState<string>(String(targetKey));

  // CLRS Textbook Presets from Chapter 12
  const presets = [
    {
      name: 'CLRS Fig. 12.2 Tree',
      desc: 'Canonical CLRS textbook tree (keys: 15, 6, 18, 3, 7, 17, 20...)',
      keys: [15, 6, 18, 3, 7, 17, 20, 2, 4, 13, 9],
    },
    {
      name: 'CLRS Fig. 12.4 Delete Cases',
      desc: 'Demonstrates all 4 cases of TREE-DELETE & TRANSPLANT',
      keys: [15, 5, 16, 3, 12, 20, 10, 13, 18, 23, 6, 7],
    },
    {
      name: 'Balanced Tree',
      desc: 'Optimal O(lg n) height binary search tree',
      keys: [16, 8, 24, 4, 12, 20, 28, 2, 6, 10, 14],
    },
    {
      name: 'Worst-Case Skewed',
      desc: 'Unbalanced O(n) height right-skewed tree',
      keys: [5, 10, 15, 20, 25, 30, 35],
    },
  ];

  const operations: Array<{
    id: BSTOperationId;
    label: string;
    clrsName: string;
    needsTarget: boolean;
    icon: React.ReactNode;
    color: string;
  }> = [
    {
      id: 'insert',
      label: 'Tree Insert',
      clrsName: 'TREE-INSERT(T, z)',
      needsTarget: false,
      icon: <PlusCircle className="w-3.5 h-3.5" />,
      color: 'from-amber-500 to-amber-600',
    },
    {
      id: 'search',
      label: 'Search (Rec)',
      clrsName: 'TREE-SEARCH(x, k)',
      needsTarget: true,
      icon: <Search className="w-3.5 h-3.5" />,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      id: 'iterative-search',
      label: 'Iterative Search',
      clrsName: 'ITERATIVE-TREE-SEARCH(x, k)',
      needsTarget: true,
      icon: <Search className="w-3.5 h-3.5" />,
      color: 'from-sky-500 to-indigo-600',
    },
    {
      id: 'minimum',
      label: 'Tree Minimum',
      clrsName: 'TREE-MINIMUM(x)',
      needsTarget: false,
      icon: <ArrowDownToLine className="w-3.5 h-3.5" />,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'maximum',
      label: 'Tree Maximum',
      clrsName: 'TREE-MAXIMUM(x)',
      needsTarget: false,
      icon: <ArrowUpToLine className="w-3.5 h-3.5" />,
      color: 'from-emerald-500 to-green-600',
    },
    {
      id: 'successor',
      label: 'Successor',
      clrsName: 'TREE-SUCCESSOR(x)',
      needsTarget: true,
      icon: <ArrowRight className="w-3.5 h-3.5" />,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'predecessor',
      label: 'Predecessor',
      clrsName: 'TREE-PREDECESSOR(x)',
      needsTarget: true,
      icon: <ArrowLeft className="w-3.5 h-3.5" />,
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'delete',
      label: 'Tree Delete',
      clrsName: 'TREE-DELETE(T, z)',
      needsTarget: true,
      icon: <Trash2 className="w-3.5 h-3.5" />,
      color: 'from-rose-500 to-red-600',
    },
    {
      id: 'inorder',
      label: 'Inorder Walk',
      clrsName: 'INORDER-TREE-WALK(x)',
      needsTarget: false,
      icon: <ListTree className="w-3.5 h-3.5" />,
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'preorder',
      label: 'Preorder Walk',
      clrsName: 'PREORDER-TREE-WALK(x)',
      needsTarget: false,
      icon: <CornerDownRight className="w-3.5 h-3.5" />,
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'postorder',
      label: 'Postorder Walk',
      clrsName: 'POSTORDER-TREE-WALK(x)',
      needsTarget: false,
      icon: <ListTree className="w-3.5 h-3.5" />,
      color: 'from-indigo-500 to-purple-600',
    },
  ];

  const currentOpMeta = operations.find((o) => o.id === activeOperation);

  const handleApplyKey = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = parseInt(customKeyInput, 10);
    if (!isNaN(val)) {
      onChangeTargetKey(val);
    }
  };

  return (
    <div className="glass-panel border border-amber-500/30 rounded-2xl p-4 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950">
      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 mb-4 gap-2">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <span>CLRS Chapter 12: Binary Search Tree Operations</span>
              <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-bold border border-amber-500/30">
                11 Algorithms
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Select any CLRS BST subroutine to step through with synchronized pseudocode & pointers.
            </p>
          </div>
        </div>

        {/* Current Active Subroutine Badge */}
        <div className="px-3 py-1 bg-slate-900 border border-amber-500/40 rounded-xl font-mono text-xs font-bold text-amber-300 flex items-center space-x-1.5 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Active: {currentOpMeta?.clrsName}</span>
        </div>
      </div>

      {/* Operation Selection Grid */}
      <div className="space-y-3">
        <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          1. Choose BST Algorithm:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {operations.map((op) => {
            const isSelected = activeOperation === op.id;
            return (
              <button
                key={op.id}
                onClick={() => onChangeOperation(op.id)}
                className={`p-2 rounded-xl border text-xs font-mono text-left transition-all duration-200 flex flex-col justify-between gap-1 shadow-sm ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-lg glow-amber scale-[1.02]'
                    : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] opacity-80">{op.label}</span>
                  {op.icon}
                </div>
                <div className="text-[11px] truncate font-bold">
                  {op.clrsName.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Row: Target Key input (if applicable) & CLRS Presets */}
      <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Target Key Controller */}
        <div className="md:col-span-6 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-400 font-bold">
              2. Target Key <span className="text-amber-400 font-bold font-mono">k / z.key</span>:
            </span>
            {currentOpMeta?.needsTarget && (
              <span className="text-[10px] text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Required for {currentOpMeta.label}
              </span>
            )}
          </div>
          <form onSubmit={handleApplyKey} className="flex gap-2">
            <input
              type="number"
              value={customKeyInput}
              onChange={(e) => setCustomKeyInput(e.target.value)}
              placeholder="e.g. 13"
              className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 shadow-inner font-bold"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl text-xs flex items-center space-x-1 glow-amber transition-all"
            >
              <span>Set Target</span>
            </button>
            {/* Quick chips for existing keys in tree */}
            <div className="flex items-center gap-1 overflow-x-auto py-0.5 max-w-[200px] sm:max-w-none">
              <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-1">Chips:</span>
              {availableKeys.slice(0, 6).map((k) => (
                <button
                  type="button"
                  key={`chip-${k}`}
                  onClick={() => {
                    setCustomKeyInput(String(k));
                    onChangeTargetKey(k);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-mono transition-all ${
                    targetKey === k
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* CLRS Textbook Presets */}
        <div className="md:col-span-6 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 font-bold block">
            3. Load CLRS Chapter 12 Tree Preset:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={`preset-${idx}`}
                onClick={() => {
                  onSetArray(preset.keys);
                  if (preset.keys.length > 0) {
                    const midKey = preset.keys[Math.floor(preset.keys.length / 2)];
                    setCustomKeyInput(String(midKey));
                    onChangeTargetKey(midKey);
                  }
                }}
                className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 rounded-lg text-xs font-mono transition-all flex items-center space-x-1"
                title={preset.desc}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
