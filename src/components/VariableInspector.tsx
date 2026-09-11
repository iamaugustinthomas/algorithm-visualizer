import React from 'react';
import { Eye, Variable } from 'lucide-react';

interface VariableInspectorProps {
  variables: Record<string, string | number | boolean | null | undefined>;
}

export const VariableInspector: React.FC<VariableInspectorProps> = ({ variables }) => {
  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-4 shadow-2xl flex flex-col h-full">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            Variable Inspector
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full glow-purple">
          Live State
        </span>
      </div>

      {/* Grid of Variables */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {Object.entries(variables).map(([key, val]) => {
          const isBoolean = typeof val === 'boolean';
          const displayVal = val === null || val === undefined ? '-' : String(val);

          return (
            <div
              key={key}
              className="bg-slate-950/90 border border-slate-800/90 rounded-xl p-3 flex flex-col justify-between transition-all duration-200 hover:border-slate-700 shadow-inner"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                <span className="flex items-center space-x-1 font-semibold">
                  <Variable className="w-3 h-3 text-purple-400" />
                  <span>{key}</span>
                </span>
              </div>

              <div className="text-sm font-mono font-bold tracking-wide">
                {isBoolean ? (
                  <span
                    className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${
                      val
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 glow-emerald'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                    }`}
                  >
                    {val ? 'TRUE' : 'FALSE'}
                  </span>
                ) : (
                  <span
                    className={`${
                      key === 'key'
                        ? 'text-amber-400 font-extrabold text-lg glow-amber'
                        : key === 'j'
                        ? 'text-amber-300'
                        : key === 'i'
                        ? 'text-purple-300'
                        : 'text-slate-100'
                    }`}
                  >
                    {displayVal}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
