import React, { useState } from 'react';
import { AlgorithmInfo as InfoType } from '../types';
import { BookOpen, Clock, HardDrive, CheckCircle2, XCircle, Code } from 'lucide-react';

interface AlgorithmInfoProps {
  info: InfoType;
}

export const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ info }) => {
  const [selectedLang, setSelectedLang] = useState<'javascript' | 'python' | 'cpp'>('javascript');

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100">{info.name} Overview</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">{info.description}</p>
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span
            className={`px-3 py-1 rounded-full border flex items-center space-x-1 font-bold ${
              info.stable
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 glow-emerald'
                : 'bg-rose-500/10 border-rose-500/40 text-rose-400'
            }`}
          >
            {info.stable ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            <span>{info.stable ? 'Stable' : 'Unstable'}</span>
          </span>

          <span
            className={`px-3 py-1 rounded-full border flex items-center space-x-1 font-bold ${
              info.inPlace
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-400 glow-cyan'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{info.inPlace ? 'In-Place O(1)' : 'Requires Extra Space'}</span>
          </span>
        </div>
      </div>

      {/* Complexities Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-xl flex flex-col shadow-inner">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Best Case</span>
          </div>
          <span className="text-xl font-extrabold font-mono text-emerald-400 glow-emerald">
            {info.timeComplexity.best}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Already sorted array</span>
        </div>

        <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-xl flex flex-col shadow-inner">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Average Case</span>
          </div>
          <span className="text-xl font-extrabold font-mono text-amber-400 glow-amber">
            {info.timeComplexity.average}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Random order elements</span>
        </div>

        <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-xl flex flex-col shadow-inner">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Worst Case</span>
          </div>
          <span className="text-xl font-extrabold font-mono text-rose-400">
            {info.timeComplexity.worst}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Reverse sorted array</span>
        </div>

        <div className="bg-slate-950/90 border border-slate-800/90 p-4 rounded-xl flex flex-col shadow-inner">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono mb-1">
            <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
            <span>Space Complexity</span>
          </div>
          <span className="text-xl font-extrabold font-mono text-cyan-400 glow-cyan">
            {info.spaceComplexity}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 font-mono">Auxiliary memory needed</span>
        </div>
      </div>

      {/* Code Snippets Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
              Implementation Code
            </h3>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {(['javascript', 'python', 'cpp'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-3 py-1 rounded-lg capitalize transition-all duration-200 ${
                  selectedLang === lang
                    ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang === 'cpp' ? 'C++' : lang}
              </button>
            ))}
          </div>
        </div>

        <pre className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl font-mono text-xs text-amber-200/90 overflow-x-auto leading-relaxed shadow-inner">
          {info.codeSnippets[selectedLang]}
        </pre>
      </div>
    </div>
  );
};
