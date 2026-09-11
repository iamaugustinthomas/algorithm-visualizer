import React, { useEffect, useRef } from 'react';
import { PseudocodeLine } from '../types';
import { ArrowRight, Code2 } from 'lucide-react';

interface PseudocodeViewerProps {
  algorithmName: string;
  lines: PseudocodeLine[];
  activeLine: number; // 1-indexed line number
  procedure?: string; // e.g. 'MERGE-SORT' | 'MERGE'
  currentDescription: string;
}

export const PseudocodeViewer: React.FC<PseudocodeViewerProps> = ({
  algorithmName,
  lines,
  activeLine,
  procedure,
  currentDescription,
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
              {isNewProcedure && (
                <div
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border font-mono font-bold text-xs mt-3 mb-1.5 transition-colors ${
                    procedure === item.procedure
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="tracking-wide">
                    {item.procedure === 'MERGE-SORT'
                      ? 'MERGE-SORT(A, p, r)'
                      : item.procedure === 'MERGE'
                      ? 'MERGE(A, p, q, r)'
                      : item.procedure}
                  </span>
                  {procedure === item.procedure && (
                    <span className="text-[9px] px-2 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/50 rounded-full uppercase tracking-wider glow-amber animate-pulse">
                      Active
                    </span>
                  )}
                </div>
              )}

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
            {procedure ? `${procedure} Step Context:` : 'Step Context:'}
          </span>
        </div>
        <p className="leading-relaxed text-slate-200 font-mono text-[11px]">
          {currentDescription || 'Ready to run algorithm.'}
        </p>
      </div>
    </div>
  );
};
