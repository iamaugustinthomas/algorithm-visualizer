import React, { useEffect, useRef } from 'react';
import { PseudocodeLine } from '../types';
import { ArrowRight, Code2 } from 'lucide-react';

interface PseudocodeViewerProps {
  algorithmName: string;
  lines: PseudocodeLine[];
  activeLine: number; // 1-indexed line number
  procedure?: string; // e.g. 'MERGE-SORT' | 'MERGE' | 'HEAPSORT' | 'BUILD-MAX-HEAP' | 'MAX-HEAPIFY'
  currentDescription: string;
  indices?: {
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
  variables?: Record<string, string | number | boolean | null | undefined>;
  arrayLength?: number;
}

interface ProcedureDetails {
  name: string;
  signature: string;
  formalArgs: string;
  passedItemsBadge: string;
}

const getProcedureDetails = (
  procName: string,
  isActive: boolean,
  indices?: PseudocodeViewerProps['indices'],
  variables?: PseudocodeViewerProps['variables'],
  arrayLength?: number
): ProcedureDetails => {
  switch (procName) {
    case 'MAX-HEAPIFY': {
      const rawI =
        indices?.i ??
        (typeof variables?.['i (root)'] === 'number' || typeof variables?.['i (root)'] === 'string'
          ? variables['i (root)']
          : variables?.['i']);
      const passedItems =
        isActive && rawI !== undefined
          ? `[Passed: A, i = ${rawI}]`
          : '[Passed: A, i]';
      return {
        name: 'MAX-HEAPIFY',
        signature: 'MAX-HEAPIFY(A, i)',
        formalArgs: '(A, i)',
        passedItemsBadge: passedItems,
      };
    }
    case 'BUILD-MAX-HEAP': {
      const nVal = arrayLength ?? variables?.['A.length'] ?? variables?.['n'];
      const passedItems =
        isActive && nVal !== undefined
          ? `[Passed: A, n = ${nVal}]`
          : '[Passed: A]';
      return {
        name: 'BUILD-MAX-HEAP',
        signature: 'BUILD-MAX-HEAP(A)',
        formalArgs: '(A)',
        passedItemsBadge: passedItems,
      };
    }
    case 'HEAPSORT': {
      const nVal = arrayLength ?? variables?.['A.length'] ?? variables?.['n'];
      const passedItems =
        isActive && nVal !== undefined
          ? `[Passed: A, n = ${nVal}]`
          : '[Passed: A]';
      return {
        name: 'HEAPSORT',
        signature: 'HEAPSORT(A)',
        formalArgs: '(A)',
        passedItemsBadge: passedItems,
      };
    }
    case 'MERGE-SORT': {
      const pVal = indices?.p ?? indices?.subrange?.p ?? variables?.['p'];
      const rVal = indices?.r ?? indices?.subrange?.r ?? variables?.['r'];
      const passedItems =
        isActive && pVal !== undefined && rVal !== undefined
          ? `[Passed: A, p = ${pVal}, r = ${rVal}]`
          : '[Passed: A, p, r]';
      return {
        name: 'MERGE-SORT',
        signature: 'MERGE-SORT(A, p, r)',
        formalArgs: '(A, p, r)',
        passedItemsBadge: passedItems,
      };
    }
    case 'MERGE': {
      const pVal = indices?.p ?? indices?.subrange?.p ?? variables?.['p'];
      const qVal = indices?.q ?? indices?.subrange?.q ?? variables?.['q'];
      const rVal = indices?.r ?? indices?.subrange?.r ?? variables?.['r'];
      const passedItems =
        isActive && pVal !== undefined && qVal !== undefined && rVal !== undefined
          ? `[Passed: A, p = ${pVal}, q = ${qVal}, r = ${rVal}]`
          : '[Passed: A, p, q, r]';
      return {
        name: 'MERGE',
        signature: 'MERGE(A, p, q, r)',
        formalArgs: '(A, p, q, r)',
        passedItemsBadge: passedItems,
      };
    }
    default: {
      return {
        name: procName,
        signature: `${procName}(A)`,
        formalArgs: '(A)',
        passedItemsBadge: '[Passed: A]',
      };
    }
  }
};

export const PseudocodeViewer: React.FC<PseudocodeViewerProps> = ({
  algorithmName,
  lines,
  activeLine,
  procedure,
  currentDescription,
  indices,
  variables,
  arrayLength,
}) => {
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeLine, procedure]);

  // Group lines by procedure if multiple procedures exist
  const hasMultipleProcedures = lines.some((l) => l.procedure);

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 shadow-2xl flex flex-col h-full">
      {/* Title with IDE window buttons */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <Code2 className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-mono font-bold text-slate-200 tracking-wide">
            {algorithmName.toUpperCase().replace(/\s+/g, '-')}.pseudocode
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-amber-500/10 text-amber-300 rounded-full border border-amber-500/30">
          CLRS Notation
        </span>
      </div>

      {/* Code Container */}
      <div className="font-mono text-xs overflow-x-auto overflow-y-auto max-h-[380px] bg-slate-950/90 p-3 rounded-xl border border-slate-800/90 space-y-1 my-1 flex-1 shadow-inner">
        {/* Single procedure banner if no subroutines */}
        {!hasMultipleProcedures && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border border-slate-800/80 bg-slate-900/60 font-mono font-bold text-xs mb-2 text-slate-300">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="tracking-wide text-amber-300">
                {algorithmName.toUpperCase().replace(/\s+/g, '-')}(A)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-800/80 text-slate-400 border border-slate-700">
                [Passed: A{arrayLength ? `, n = ${arrayLength}` : ''}]
              </span>
            </div>
            <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full uppercase tracking-wider">
              Main Procedure
            </span>
          </div>
        )}

        {lines.map((item, idx) => {
          // Check if this line starts a new procedure
          const prevItem = idx > 0 ? lines[idx - 1] : null;
          const isNewProcedure = item.procedure && (!prevItem || prevItem.procedure !== item.procedure);

          const isActive =
            item.lineNum > 0 &&
            item.lineNum === activeLine &&
            (!item.procedure || !procedure || item.procedure === procedure);

          const isComment = item.code.trim().startsWith('//');

          return (
            <React.Fragment key={`${item.procedure || 'proc'}-${idx}-${item.lineNum}`}>
              {/* Procedure Subheader */}
              {isNewProcedure && (() => {
                const isCurrentProc = procedure === item.procedure;
                const details = getProcedureDetails(item.procedure!, isCurrentProc, indices, variables, arrayLength);
                return (
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg border font-mono font-bold text-xs mt-3 mb-1.5 transition-all duration-200 ${
                      isCurrentProc
                        ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-sm'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2 flex-wrap">
                      <span className="tracking-wide text-amber-200 font-bold">
                        {details.signature}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold border transition-colors ${
                          isCurrentProc
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 glow-amber'
                            : 'bg-slate-800/80 text-slate-400 border-slate-700'
                        }`}
                      >
                        {details.passedItemsBadge}
                      </span>
                    </div>
                    {isCurrentProc && (
                      <span className="text-[9px] px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/50 rounded-full uppercase tracking-wider glow-amber animate-pulse">
                        Active Subroutine
                      </span>
                    )}
                  </div>
                );
              })()}

              {/* Pseudocode Line */}
              <div
                ref={isActive ? activeLineRef : undefined}
                className={`flex items-center px-2 py-1 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-transparent text-amber-200 border-l-4 border-amber-400 font-bold shadow-md glow-amber'
                    : 'text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                {/* Line Number */}
                <span
                  className={`w-6 text-right pr-3 select-none text-[11px] font-mono shrink-0 ${
                    isActive ? 'text-amber-400 font-bold' : 'text-slate-600'
                  }`}
                >
                  {item.lineNum > 0 ? item.lineNum : ''}
                </span>

                {/* Arrow Indicator */}
                <span className="w-4 flex items-center justify-center mr-1 shrink-0">
                  {isActive && <ArrowRight className="w-3 h-3 text-amber-400 animate-pulse" />}
                </span>

                {/* Code Line Text */}
                <pre className={`flex-1 whitespace-pre ${isComment ? 'text-slate-500 italic' : ''}`}>
                  {item.code}
                </pre>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Active Line Description / Context */}
      <div className="mt-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-400 font-mono text-[11px] mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-ping" />
          <span className="font-bold uppercase tracking-wider text-[10px]">
            {procedure
              ? `${getProcedureDetails(procedure, true, indices, variables, arrayLength).signature} Context:`
              : 'Step Context:'}
          </span>
        </div>
        <p className="leading-relaxed text-slate-200 font-mono text-[11px]">
          {currentDescription || 'Ready to run algorithm.'}
        </p>
      </div>
    </div>
  );
};
