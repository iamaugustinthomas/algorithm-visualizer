import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrayElement, AuxBufferItem, BSTTreeData, BSTNode, AlgorithmId } from '../types';
import { Layers, GitBranch, Network, ChevronDown, ChevronUp } from 'lucide-react';

interface VisualizerCanvasProps {
  elements: ArrayElement[];
  viewMode: 'bars' | 'cards' | 'tree';
  indices: {
    j?: number;
    i?: number;
    k?: number;
    p?: number;
    q?: number;
    r?: number;
    l?: number;
    largest?: number;
    heapSize?: number;
    keyIndex?: number;
    comparingIndex?: number;
    sortedUpTo?: number;
    subrange?: { p: number; q?: number; r: number };
  };
  keyValue?: number | string | null;
  auxArrays?: {
    L?: AuxBufferItem[];
    R?: AuxBufferItem[];
    activeL?: number;
    activeR?: number;
  };
  callStack?: string[];
  bst?: BSTTreeData;
  selectedAlgorithm?: AlgorithmId;
}

export const VisualizerCanvas: React.FC<VisualizerCanvasProps> = ({
  elements,
  viewMode,
  indices,
  keyValue,
  auxArrays,
  callStack,
  bst,
  selectedAlgorithm,
}) => {
  const [showInlineHeapTree, setShowInlineHeapTree] = useState(true);
  const maxValue = Math.max(...elements.map((e) => e.value), 10);

  // Map element state to color styles
  const getStateStyle = (state: ArrayElement['state'], isKey: boolean, isTargetK: boolean) => {
    if (isKey) {
      return {
        bar: 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 border-amber-300 glow-amber z-20',
        card: 'bg-amber-500/25 border-amber-400 text-amber-200 glow-amber ring-2 ring-amber-400/80 z-20',
        badge: 'bg-amber-500/30 text-amber-300 border-amber-400/50',
      };
    }

    if (isTargetK) {
      return {
        bar: 'bg-gradient-to-t from-rose-600 via-rose-500 to-rose-300 border-rose-300 glow-rose ring-2 ring-rose-400 z-20 animate-pulse',
        card: 'bg-rose-950/70 border-rose-400 text-rose-200 ring-2 ring-rose-400/80 z-20 animate-pulse',
        badge: 'bg-rose-500/30 text-rose-300 border-rose-400/50',
      };
    }

    switch (state) {
      case 'bst-x':
        return {
          bar: 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 border-amber-300 ring-2 ring-amber-400 glow-amber z-20',
          card: 'bg-amber-950/80 border-amber-400 text-amber-200 glow-amber ring-2 ring-amber-400 z-20',
          badge: 'bg-amber-500/30 text-amber-300 border-amber-400/50',
        };
      case 'bst-y':
        return {
          bar: 'bg-gradient-to-t from-cyan-600 via-cyan-500 to-cyan-300 border-cyan-300 ring-2 ring-cyan-400 glow-cyan z-20',
          card: 'bg-cyan-950/80 border-cyan-400 text-cyan-200 glow-cyan ring-2 ring-cyan-400 z-20',
          badge: 'bg-cyan-500/30 text-cyan-300 border-cyan-400/50',
        };
      case 'bst-z':
        return {
          bar: 'bg-gradient-to-t from-rose-600 via-rose-500 to-rose-300 border-rose-300 ring-2 ring-rose-400 glow-rose z-20',
          card: 'bg-rose-950/80 border-rose-400 text-rose-200 glow-rose ring-2 ring-rose-400 z-20',
          badge: 'bg-rose-500/30 text-rose-300 border-rose-400/50',
        };
      case 'bst-found':
        return {
          bar: 'bg-gradient-to-t from-emerald-500 via-emerald-400 to-teal-200 border-emerald-300 ring-2 ring-emerald-400 glow-emerald z-20 animate-pulse',
          card: 'bg-emerald-950/90 border-emerald-400 text-emerald-100 glow-emerald ring-2 ring-emerald-400 z-20 animate-pulse',
          badge: 'bg-emerald-500/40 text-emerald-200 border-emerald-400/60',
        };
      case 'bst-transplant':
        return {
          bar: 'bg-gradient-to-t from-purple-600 via-purple-500 to-purple-300 border-purple-300 ring-2 ring-purple-400 glow-purple z-20 animate-pulse',
          card: 'bg-purple-950/90 border-purple-400 text-purple-100 glow-purple ring-2 ring-purple-400 z-20 animate-pulse',
          badge: 'bg-purple-500/40 text-purple-200 border-purple-400/60',
        };
      case 'bst-visited':
        return {
          bar: 'bg-gradient-to-t from-emerald-700 via-emerald-600 to-teal-400 border-emerald-500',
          card: 'bg-emerald-950/50 border-emerald-600 text-emerald-300',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-600/40',
        };
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
      case 'subarray':
        return {
          bar: 'bg-gradient-to-t from-sky-600 via-sky-500 to-sky-300 border-sky-400 ring-1 ring-sky-400/50 shadow-sm shadow-sky-500/20',
          card: 'bg-sky-950/60 border-sky-400 text-sky-200 ring-2 ring-sky-400/60',
          badge: 'bg-sky-500/25 text-sky-300 border-sky-400/40',
        };
      case 'merging':
        return {
          bar: 'bg-gradient-to-t from-rose-600 via-rose-500 to-rose-300 border-rose-300 animate-pulse glow-rose',
          card: 'bg-rose-950/70 border-rose-400 text-rose-200 ring-2 ring-rose-400 animate-pulse',
          badge: 'bg-rose-500/30 text-rose-300 border-rose-400/50',
        };
      case 'heap-root':
        return {
          bar: 'bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 border-amber-300 ring-2 ring-amber-400 glow-amber z-20',
          card: 'bg-amber-950/80 border-amber-400 text-amber-200 glow-amber ring-2 ring-amber-400 z-20',
          badge: 'bg-amber-500/30 text-amber-300 border-amber-400/50',
        };
      case 'heap-child':
        return {
          bar: 'bg-gradient-to-t from-cyan-600 via-cyan-500 to-cyan-300 border-cyan-300 ring-1 ring-cyan-400 glow-cyan z-20',
          card: 'bg-cyan-950/70 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/80 z-20',
          badge: 'bg-cyan-500/30 text-cyan-300 border-cyan-400/50',
        };
      case 'heap-largest':
        return {
          bar: 'bg-gradient-to-t from-yellow-500 via-amber-400 to-yellow-200 border-yellow-200 ring-2 ring-yellow-400 glow-amber z-20 animate-pulse',
          card: 'bg-yellow-950/80 border-yellow-300 text-yellow-200 glow-amber ring-2 ring-yellow-400 z-20 animate-pulse',
          badge: 'bg-yellow-500/30 text-yellow-300 border-yellow-400/50',
        };
      default:
        return {
          bar: 'bg-gradient-to-t from-slate-800 via-slate-700 to-slate-600 border-slate-600 hover:border-slate-400',
          card: 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700',
          badge: 'bg-slate-800 text-slate-400 border-slate-700',
        };
    }
  };

  const hasAux = auxArrays && ((auxArrays.L && auxArrays.L.length > 0) || (auxArrays.R && auxArrays.R.length > 0));
  const isHeapMode = indices.heapSize !== undefined;
  const isBSTMode = selectedAlgorithm === 'bst' || Boolean(bst);

  // Render Binary Heap Tree (CLRS Figure 6.1 specification)
  const renderHeapTree = (isFullCanvas: boolean = false) => {
    const n = elements.length;
    if (n === 0) return null;
    const totalLevels = Math.floor(Math.log2(n)) + 1;
    const treeHeight = Math.max(isFullCanvas ? 320 : 230, totalLevels * (isFullCanvas ? 80 : 64) + 30);

    const getNodeCoords = (node1Based: number) => {
      const level = Math.floor(Math.log2(node1Based));
      const countInLevel = Math.pow(2, level);
      const indexInLevel = node1Based - countInLevel;
      const xPercent = ((indexInLevel + 0.5) / countInLevel) * 100;
      const yPx = level * (isFullCanvas ? 75 : 58) + 36;
      return { xPercent, yPx, level };
    };

    const edges: Array<{ from: number; to: number; x1: string; y1: number; x2: string; y2: number; inHeap: boolean }> = [];
    for (let k = 2; k <= n; k++) {
      const parentIdx = Math.floor(k / 2);
      const parentCoords = getNodeCoords(parentIdx);
      const nodeCoords = getNodeCoords(k);
      const inHeap = indices.heapSize === undefined || (k <= indices.heapSize && parentIdx <= indices.heapSize);
      edges.push({
        from: parentIdx,
        to: k,
        x1: `${parentCoords.xPercent}%`,
        y1: parentCoords.yPx,
        x2: `${nodeCoords.xPercent}%`,
        y2: nodeCoords.yPx,
        inHeap,
      });
    }

    return (
      <div className={`relative w-full overflow-x-auto py-3 flex justify-center items-center ${isFullCanvas ? 'min-h-[320px]' : ''}`}>
        <div className="relative w-full max-w-4xl" style={{ height: `${treeHeight}px` }}>
          {/* SVG Connecting Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge) => (
              <line
                key={`edge-${edge.from}-${edge.to}`}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke={edge.inHeap ? '#38bdf8' : '#334155'}
                strokeWidth={edge.inHeap ? '2.5' : '1.5'}
                strokeDasharray={edge.inHeap ? 'none' : '4 4'}
                opacity={edge.inHeap ? 0.75 : 0.35}
              />
            ))}
          </svg>

          {/* Node Circles */}
          {elements.map((elem, idx) => {
            const k = idx + 1;
            const coords = getNodeCoords(k);
            const isHeapActive = indices.heapSize === undefined || k <= indices.heapSize;
            const isI = indices.i === k;
            const isL = indices.l === k;
            const isR = indices.r === k;
            const isLargest = indices.largest === k;

            let ringColor = 'border-slate-700 bg-slate-900/90 text-slate-200';
            let badgeText: string | null = null;
            let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';

            if (!isHeapActive) {
              ringColor = 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 opacity-60';
              badgeText = 'sorted';
              badgeColor = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
            } else if (isLargest) {
              ringColor = 'border-yellow-300 bg-yellow-950/90 text-yellow-100 ring-4 ring-yellow-400/80 glow-amber scale-110';
              badgeText = 'largest';
              badgeColor = 'bg-yellow-500 text-slate-950 font-bold border-yellow-300';
            } else if (isI) {
              ringColor = 'border-amber-400 bg-amber-950/90 text-amber-200 ring-4 ring-amber-400/70 glow-amber scale-105';
              badgeText = 'i (root)';
              badgeColor = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
            } else if (isL) {
              ringColor = 'border-cyan-400 bg-cyan-950/90 text-cyan-200 ring-2 ring-cyan-400/80 glow-cyan';
              badgeText = 'l';
              badgeColor = 'bg-cyan-500 text-slate-950 font-bold border-cyan-400';
            } else if (isR) {
              ringColor = 'border-purple-400 bg-purple-950/90 text-purple-200 ring-2 ring-purple-400/80 glow-purple';
              badgeText = 'r';
              badgeColor = 'bg-purple-500 text-white font-bold border-purple-400';
            } else if (k === 1) {
              badgeText = 'root';
              badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';
            }

            return (
              <motion.div
                key={`heap-node-${k}-${elem.id}`}
                layout
                style={{
                  position: 'absolute',
                  left: `${coords.xPercent}%`,
                  top: `${coords.yPx}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="flex flex-col items-center justify-center z-10 select-none group"
              >
                {/* Pointer role pill badge */}
                {badgeText && (
                  <span
                    className={`absolute -top-5 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider rounded border shadow-sm ${badgeColor}`}
                  >
                    {badgeText}
                  </span>
                )}

                {/* Node Circle */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-lg transition-all duration-200 ${ringColor}`}
                >
                  {elem.value}
                </div>

                {/* 1-based index subscript */}
                <span className="text-[10px] font-mono text-slate-400 mt-0.5 font-semibold">
                  A[{k}]
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Binary Search Tree (CLRS Chapter 12 specification)
  const renderBSTTree = (isFullCanvas: boolean = false) => {
    if (!bst || !bst.rootId || Object.keys(bst.nodes).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center text-slate-400 font-mono text-xs">
          <GitBranch className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
          <p>Empty Binary Search Tree (T.root == NIL)</p>
        </div>
      );
    }

    const nodes = bst.nodes;
    const nodeList = Object.values(nodes) as BSTNode[];
    const maxDepth = Math.max(...nodeList.map((n) => n.depth || 0), 0);
    const treeHeight = Math.max(isFullCanvas ? 340 : 250, (maxDepth + 1) * 75 + 50);

    const edges: Array<{
      from: BSTNode;
      to: BSTNode;
      isLeft: boolean;
    }> = [];

    nodeList.forEach((n) => {
      if (n.left && nodes[n.left]) {
        edges.push({ from: n, to: nodes[n.left] as BSTNode, isLeft: true });
      }
      if (n.right && nodes[n.right]) {
        edges.push({ from: n, to: nodes[n.right] as BSTNode, isLeft: false });
      }
    });

    return (
      <div className={`relative w-full overflow-x-auto py-3 flex flex-col justify-center items-center ${isFullCanvas ? 'min-h-[320px]' : ''}`}>
        <div className="relative w-full max-w-4xl" style={{ height: `${treeHeight}px` }}>
          {/* SVG Connecting Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge) => {
              const x1 = `${edge.from.xPercent}%`;
              const y1 = edge.from.yPx;
              const x2 = `${edge.to.xPercent}%`;
              const y2 = edge.to.yPx;
              const stroke = edge.isLeft ? '#38bdf8' : '#c084fc';

              return (
                <g key={`edge-${edge.from.id}-${edge.to.id}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={stroke}
                    strokeWidth="2.5"
                    opacity="0.8"
                  />
                </g>
              );
            })}
          </svg>

          {/* Node Circles */}
          {nodeList.map((node) => {
            const isX = bst.xPointerId === node.id;
            const isY = bst.yPointerId === node.id;
            const isZ = bst.zPointerId === node.id;
            const isRoot = bst.rootId === node.id;
            const isFound = node.state === 'bst-found';
            const isTransplant = node.state === 'bst-transplant';
            const isVisited = node.state === 'bst-visited';

            let ringColor = 'border-slate-700 bg-slate-900/90 text-slate-200';
            let badgeText: string | null = null;
            let badgeColor = 'bg-slate-800 text-slate-300 border-slate-700';

            if (isFound) {
              ringColor = 'border-emerald-300 bg-emerald-950/95 text-emerald-100 ring-4 ring-emerald-400/80 glow-emerald scale-110';
              badgeText = 'MATCH / FOUND';
              badgeColor = 'bg-emerald-500 text-slate-950 font-bold border-emerald-300 animate-bounce';
            } else if (isTransplant) {
              ringColor = 'border-purple-300 bg-purple-950/90 text-purple-100 ring-4 ring-purple-400/80 glow-purple scale-110 animate-pulse';
              badgeText = 'TRANSPLANT';
              badgeColor = 'bg-purple-500 text-white font-bold border-purple-300';
            } else if (isX) {
              ringColor = 'border-amber-400 bg-amber-950/95 text-amber-200 ring-4 ring-amber-400/80 glow-amber scale-105';
              badgeText = isRoot ? 'x (root)' : 'x (curr)';
              badgeColor = 'bg-amber-500 text-slate-950 font-bold border-amber-400';
            } else if (isY) {
              ringColor = 'border-cyan-400 bg-cyan-950/90 text-cyan-200 ring-4 ring-cyan-400/80 glow-cyan scale-105';
              badgeText = bst.activeOperation === 'successor' || bst.activeOperation === 'predecessor' ? 'y (succ)' : 'y (parent)';
              badgeColor = 'bg-cyan-500 text-slate-950 font-bold border-cyan-400';
            } else if (isZ) {
              ringColor = 'border-rose-400 bg-rose-950/90 text-rose-200 ring-4 ring-rose-400/80 glow-rose scale-105';
              badgeText = bst.activeOperation === 'delete' ? 'z (delete)' : 'z (insert)';
              badgeColor = 'bg-rose-500 text-white font-bold border-rose-400';
            } else if (isVisited) {
              ringColor = 'border-emerald-500/60 bg-emerald-950/50 text-emerald-300';
              badgeText = 'visited';
              badgeColor = 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40';
            } else if (isRoot) {
              badgeText = 'root';
              badgeColor = 'bg-slate-800 text-amber-300 border-amber-500/40';
            }

            return (
              <motion.div
                key={`bst-node-${node.id}`}
                layout
                style={{
                  position: 'absolute',
                  left: `${node.xPercent}%`,
                  top: `${node.yPx}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="flex flex-col items-center justify-center z-10 select-none group"
              >
                {badgeText && (
                  <span
                    className={`absolute -top-5 px-1.5 py-0.2 text-[9px] font-mono uppercase tracking-wider rounded border shadow-sm ${badgeColor}`}
                  >
                    {badgeText}
                  </span>
                )}

                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-lg transition-all duration-200 ${ringColor}`}
                >
                  {node.key}
                </div>

                <span className="text-[9px] font-mono text-slate-400 mt-0.5 font-semibold">
                  p: {node.p ? nodes[node.p]?.key : 'NIL'}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl flex flex-col justify-between min-h-[380px] relative overflow-hidden">
      {/* Immersive Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Banner & Key Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 z-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-slate-400 font-semibold">Length n = {elements.length}</span>
          {indices.heapSize !== undefined && (
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-full font-bold glow-amber">
              A.heap-size = {indices.heapSize} / {elements.length}
            </span>
          )}
          {isBSTMode && bst && (
            <>
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-full font-bold">
                BST Nodes: {Object.keys(bst.nodes).length}
              </span>
              {bst.rootId && (
                <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/50 rounded-full font-bold">
                  T.root = {bst.nodes[bst.rootId]?.key ?? 'NIL'}
                </span>
              )}
              {bst.targetKey !== undefined && (
                <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/50 rounded-full font-bold animate-pulse">
                  Target k: {bst.targetKey}
                </span>
              )}
            </>
          )}
          {keyValue !== undefined && keyValue !== null && keyValue !== '-' && (
            <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-full font-bold glow-amber animate-bounce">
              Active Key: {keyValue}
            </span>
          )}
          {indices.subrange && (
            <span className="px-2.5 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/50 rounded-full font-bold">
              Subarray A[{indices.subrange.p}..{indices.subrange.r}]
              {indices.subrange.q ? ` (q=${indices.subrange.q})` : ''}
            </span>
          )}
          {(isHeapMode || isBSTMode) && viewMode !== 'tree' && (
            <button
              onClick={() => setShowInlineHeapTree((prev) => !prev)}
              className="flex items-center space-x-1 px-2.5 py-0.5 bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 rounded-full font-bold transition-all text-xs"
            >
              <Network className="w-3 h-3 text-amber-400" />
              <span>{isBSTMode ? 'BST Diagram' : 'Heap Tree Diagram'}</span>
              {showInlineHeapTree ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
            </button>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
          {isHeapMode ? (
            <>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <span className="text-slate-300">Parent i</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                <span className="text-slate-300">Left l</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                <span className="text-slate-300">Right r</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 shadow-sm shadow-yellow-300" />
                <span className="text-slate-300">Largest</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                <span className="text-slate-300">Sorted Tail</span>
              </div>
            </>
          ) : isBSTMode ? (
            <>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <span className="text-slate-300">Pointer x</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                <span className="text-slate-300">Pointer y</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
                <span className="text-slate-300">Node z</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                <span className="text-slate-300">Match / Found</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                <span className="text-slate-300">Transplant</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                <span className="text-slate-300">Sorted</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                <span className="text-slate-300">Subarray A[p:r]</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-sm shadow-rose-400" />
                <span className="text-slate-300">Target A[k]</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <span className="text-slate-300">Key / L[i]</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-400" />
                <span className="text-slate-300">Comp / R[j]</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Call Stack Breadcrumb for Divide-and-Conquer Recursion */}
      {callStack && callStack.length > 0 && (
        <div className="mb-3 px-3 py-1.5 bg-slate-950/90 border border-slate-800/90 rounded-xl flex items-center gap-2 overflow-x-auto text-xs font-mono z-10 shadow-inner">
          <span className="text-amber-400 font-bold flex items-center gap-1.5 shrink-0">
            <GitBranch className="w-3.5 h-3.5 text-amber-400" />
            Call Stack:
          </span>
          <div className="flex items-center gap-1.5 flex-nowrap overflow-x-auto py-0.5">
            {callStack.map((frame, fIdx) => {
              const isCurrent = fIdx === callStack.length - 1;
              return (
                <React.Fragment key={`frame-${fIdx}`}>
                  {fIdx > 0 && <span className="text-slate-600 font-sans">›</span>}
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-all ${
                      isCurrent
                        ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50 glow-amber'
                        : 'text-slate-400 bg-slate-900/60 border border-slate-800'
                    }`}
                  >
                    {frame}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* Auxiliary Buffers Display for Merge Sort */}
      {hasAux && (
        <div className="mb-4 p-3 bg-slate-950/90 border border-slate-800 rounded-xl shadow-inner z-10 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              Auxiliary Arrays (CLRS MERGE Buffer)
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              L[0..{(auxArrays?.L?.length ?? 1) - 1}] & R[0..{(auxArrays?.R?.length ?? 1) - 1}]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* L Array */}
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] font-mono text-cyan-400 font-bold mb-1.5 flex items-center justify-between">
                <span>Array L (from A[p..q])</span>
                {auxArrays?.activeL !== undefined && (
                  <span className="text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">
                    Pointer i = {auxArrays.activeL}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[42px] items-center">
                {auxArrays?.L && auxArrays.L.length > 0 ? (
                  auxArrays.L.map((item, idx) => {
                    const isActive = auxArrays.activeL === idx;
                    return (
                      <div
                        key={`L-${idx}-${item.id}`}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all flex flex-col items-center ${
                          item.isSentinel
                            ? 'bg-amber-950/70 border-amber-500/70 text-amber-300 glow-amber'
                            : isActive
                            ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 glow-cyan ring-2 ring-cyan-400 scale-105 shadow-md'
                            : item.copied
                            ? 'bg-slate-900/50 border-slate-800/80 text-slate-500 line-through opacity-60'
                            : 'bg-slate-800/90 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] text-slate-400 font-normal">
                          {item.isSentinel ? 'Sentinel' : `L[${idx}]`}
                        </span>
                        <span className="text-sm">{item.value}</span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-xs font-mono text-slate-500 italic">Empty</span>
                )}
              </div>
            </div>

            {/* R Array */}
            <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
              <div className="text-[11px] font-mono text-purple-400 font-bold mb-1.5 flex items-center justify-between">
                <span>Array R (from A[q+1..r])</span>
                {auxArrays?.activeR !== undefined && (
                  <span className="text-purple-300 bg-purple-950/80 px-1.5 py-0.5 rounded border border-purple-800">
                    Pointer j = {auxArrays.activeR}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[42px] items-center">
                {auxArrays?.R && auxArrays.R.length > 0 ? (
                  auxArrays.R.map((item, idx) => {
                    const isActive = auxArrays.activeR === idx;
                    return (
                      <div
                        key={`R-${idx}-${item.id}`}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all flex flex-col items-center ${
                          item.isSentinel
                            ? 'bg-amber-950/70 border-amber-500/70 text-amber-300 glow-amber'
                            : isActive
                            ? 'bg-purple-500/30 border-purple-400 text-purple-200 glow-purple ring-2 ring-purple-400 scale-105 shadow-md'
                            : item.copied
                            ? 'bg-slate-900/50 border-slate-800/80 text-slate-500 line-through opacity-60'
                            : 'bg-slate-800/90 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="text-[9px] text-slate-400 font-normal">
                          {item.isSentinel ? 'Sentinel' : `R[${idx}]`}
                        </span>
                        <span className="text-sm">{item.value}</span>
                      </div>
                    );
                  })
                ) : (
                  <span className="text-xs font-mono text-slate-500 italic">Empty</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional Inline Heap / BST Tree Accordion for Bars and Cards view */}
      {(isHeapMode || isBSTMode) && viewMode !== 'tree' && showInlineHeapTree && (
        <div className="mb-3 p-3 bg-slate-950/90 border border-slate-800/90 rounded-xl shadow-inner z-10">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <Network className="w-3.5 h-3.5 text-amber-400" />
              {isBSTMode
                ? 'Binary Search Tree (CLRS Chapter 12: BST Property)'
                : 'Binary Max-Heap Tree (CLRS Fig. 6.1: LEFT(i)=2i, RIGHT(i)=2i+1)'}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {isBSTMode
                ? `BST Nodes: ${Object.keys(bst?.nodes || {}).length}`
                : `Active Heap Nodes: 1..${indices.heapSize ?? elements.length}`}
            </span>
          </div>
          {isBSTMode ? renderBSTTree(false) : renderHeapTree(false)}
        </div>
      )}

      {/* Main Display: Full Tree View OR Bars / Cards */}
      {viewMode === 'tree' ? (
        <div className="flex-1 flex flex-col justify-center items-center py-2 z-10 min-h-[340px]">
          <div className="w-full text-center mb-1">
            <span className="text-xs font-mono font-bold text-amber-300 bg-slate-950/80 px-3 py-1 rounded-full border border-amber-500/30">
              {isBSTMode
                ? 'Binary Search Tree Structure & Traversal (CLRS Chapter 12)'
                : 'Binary Heap Tree Diagram & Array Strip'}
            </span>
          </div>
          {isBSTMode ? renderBSTTree(true) : renderHeapTree(true)}

          {/* Traversal Tape for BST walks */}
          {isBSTMode && bst?.traversalOutput && bst.traversalOutput.length > 0 && (
            <div className="mt-3 px-4 py-2 bg-slate-950/90 border border-emerald-500/40 rounded-xl flex items-center gap-2 overflow-x-auto text-xs font-mono shadow-lg max-w-full">
              <span className="text-emerald-400 font-bold shrink-0">
                Traversal Output:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {bst.traversalOutput.map((val, idx) => (
                  <span
                    key={`out-${idx}`}
                    className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-md font-bold shadow-sm"
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Compact Array Representation Strip underneath the tree */}
          <div className="mt-3 flex items-center justify-center gap-1 sm:gap-2 flex-wrap max-w-full px-2">
            {elements.map((elem, idx) => {
              const oneBased = idx + 1;
              const inHeap = indices.heapSize === undefined || oneBased <= indices.heapSize;
              const isI = indices.i === oneBased;
              const isL = indices.l === oneBased;
              const isR = indices.r === oneBased;
              const isLargest = indices.largest === oneBased;

              let border = 'border-slate-700 bg-slate-900/80 text-slate-200';
              if (!inHeap) {
                border = 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300 opacity-60';
              } else if (isLargest) {
                border = 'border-yellow-300 bg-yellow-950/80 text-yellow-200 ring-2 ring-yellow-400';
              } else if (isI) {
                border = 'border-amber-400 bg-amber-950/80 text-amber-200 ring-2 ring-amber-400';
              } else if (isL) {
                border = 'border-cyan-400 bg-cyan-950/80 text-cyan-200 ring-1 ring-cyan-400';
              } else if (isR) {
                border = 'border-purple-400 bg-purple-950/80 text-purple-200 ring-1 ring-purple-400';
              }

              return (
                <div
                  key={`strip-${oneBased}-${elem.id}`}
                  className={`flex flex-col items-center p-1.5 rounded-lg border font-mono text-xs transition-all ${border}`}
                >
                  <span className="text-[9px] text-slate-400">A[{oneBased}]</span>
                  <span className="font-bold text-sm">{elem.value}</span>
                  <div className="h-3.5 flex items-center text-[9px] font-bold">
                    {isLargest && <span className="text-yellow-300">max</span>}
                    {!isLargest && isI && <span className="text-amber-400">i</span>}
                    {!isLargest && isL && <span className="text-cyan-400">l</span>}
                    {!isLargest && isR && <span className="text-purple-400">r</span>}
                    {!inHeap && <span className="text-emerald-400">✓</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-end justify-center gap-2 sm:gap-3 py-4 z-10 px-2 min-h-[220px]">
          <AnimatePresence mode="popLayout">
            {elements.map((elem, idx) => {
              const oneBasedIdx = idx + 1;
              const isKey = indices.keyIndex === idx;
              const isTargetK = indices.k === oneBasedIdx;
              const isI = indices.i === oneBasedIdx;
              const isJ = indices.j === oneBasedIdx;
              const isP = indices.p === oneBasedIdx;
              const isQ = indices.q === oneBasedIdx;
              const isR = indices.r === oneBasedIdx;
              const isL = indices.l === oneBasedIdx;
              const isHeapRight = indices.r === oneBasedIdx;
              const isLargest = indices.largest === oneBasedIdx;
              const isComparing = indices.comparingIndex === idx;

              const style = getStateStyle(elem.state, isKey, isTargetK);
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
                      {isLargest && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-yellow-400 text-slate-950 rounded shadow glow-amber animate-pulse">
                          largest
                        </span>
                      )}
                      {!isLargest && isTargetK && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-rose-500 text-white rounded shadow glow-rose animate-bounce">
                          k
                        </span>
                      )}
                      {!isLargest && !isTargetK && isKey && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500 text-slate-950 rounded shadow animate-pulse">
                          key
                        </span>
                      )}
                      {!isLargest && !isTargetK && !isKey && isI && isHeapMode && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500 text-slate-950 rounded shadow">
                          i
                        </span>
                      )}
                      {!isLargest && !isTargetK && !isKey && isL && isHeapMode && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-cyan-500 text-slate-950 rounded shadow">
                          l
                        </span>
                      )}
                      {!isLargest && !isTargetK && !isKey && isHeapRight && isHeapMode && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-purple-500 text-white rounded shadow">
                          r
                        </span>
                      )}
                      {!isLargest && !isTargetK && !isKey && !isI && !isL && !isHeapRight && isComparing && (
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

                    {/* Pointer Markers below */}
                    <div className="h-6 flex flex-wrap items-center justify-center gap-1 mt-1 font-mono text-[10px] font-bold">
                      {isP && <span className="text-sky-400 border-b-2 border-sky-400">p</span>}
                      {isQ && <span className="text-indigo-400 border-b-2 border-indigo-400">q</span>}
                      {isR && !isHeapMode && <span className="text-purple-400 border-b-2 border-purple-400">r</span>}
                      {isTargetK && <span className="text-rose-400 border-b-2 border-rose-400">k</span>}
                      {isJ && <span className="text-amber-400 border-b-2 border-amber-400">j</span>}
                      {isI && <span className="text-amber-400 border-b-2 border-amber-400">i</span>}
                      {isL && <span className="text-cyan-400 border-b-2 border-cyan-400">l</span>}
                      {isHeapRight && <span className="text-purple-400 border-b-2 border-purple-400">r</span>}
                      {isLargest && <span className="text-yellow-300 border-b-2 border-yellow-300">max</span>}
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
                    {isLargest && (
                      <span className="px-1.5 py-0.5 bg-yellow-400 text-slate-950 rounded shadow glow-amber animate-pulse">
                        max
                      </span>
                    )}
                    {!isLargest && isTargetK && (
                      <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded shadow animate-bounce">
                        k
                      </span>
                    )}
                    {!isLargest && !isTargetK && isKey && (
                      <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 rounded">key</span>
                    )}
                    {!isLargest && !isTargetK && !isKey && isI && isHeapMode && (
                      <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 rounded">i</span>
                    )}
                    {!isLargest && !isTargetK && !isKey && isL && isHeapMode && (
                      <span className="px-1.5 py-0.5 bg-cyan-500 text-slate-950 rounded">l</span>
                    )}
                    {!isLargest && !isTargetK && !isKey && isHeapRight && isHeapMode && (
                      <span className="px-1.5 py-0.5 bg-purple-500 text-white rounded">r</span>
                    )}
                    {!isLargest && !isTargetK && !isKey && !isI && !isL && !isHeapRight && isComparing && (
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
                  <div className="h-6 flex flex-wrap items-center justify-center gap-1 font-mono text-[10px] font-bold mt-0.5">
                    {isP && (
                      <span className="px-1 py-0.5 bg-sky-500/20 text-sky-300 border border-sky-500/40 rounded">
                        p
                      </span>
                    )}
                    {isQ && (
                      <span className="px-1 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded">
                        q
                      </span>
                    )}
                    {isR && !isHeapMode && (
                      <span className="px-1 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded">
                        r
                      </span>
                    )}
                    {isTargetK && (
                      <span className="px-1 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded">
                        k={indices.k}
                      </span>
                    )}
                    {isJ && (
                      <span className="px-1 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                        j={indices.j}
                      </span>
                    )}
                    {isI && (
                      <span className="px-1 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                        i={indices.i}
                      </span>
                    )}
                    {isL && (
                      <span className="px-1 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">
                        l={indices.l}
                      </span>
                    )}
                    {isHeapRight && (
                      <span className="px-1 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded">
                        r={indices.r}
                      </span>
                    )}
                    {isLargest && (
                      <span className="px-1 py-0.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded">
                        largest={indices.largest}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Array Range Boundary Indicator */}
      <div className="mt-2 border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 z-10">
        <div>1-Indexed Pseudocode Array Bounds: A[1] ... A[{elements.length}]</div>
        {indices.subrange && (
          <div className="text-sky-400 font-semibold">
            Active Subarray: A[{indices.subrange.p} .. {indices.subrange.r}]
          </div>
        )}
        {indices.sortedUpTo !== undefined && indices.sortedUpTo >= 0 && (
          <div className="text-emerald-400">
            Sorted Prefix: A[1 .. {indices.sortedUpTo}]
          </div>
        )}
      </div>
    </div>
  );
};
