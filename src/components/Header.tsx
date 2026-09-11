import React from 'react';
import { Volume2, VolumeX, BarChart3, LayoutGrid, Sparkles, HelpCircle, Columns, Rows } from 'lucide-react';
import { AlgorithmId } from '../types';
import { ALGORITHMS } from '../algorithms';

interface HeaderProps {
  selectedAlgorithm: AlgorithmId;
  onSelectAlgorithm: (id: AlgorithmId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  viewMode: 'bars' | 'cards';
  onToggleViewMode: (mode: 'bars' | 'cards') => void;
  onOpenHelp: () => void;
  layoutMode: 'stacked' | 'side-by-side';
  onToggleLayoutMode: (mode: 'stacked' | 'side-by-side') => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedAlgorithm,
  onSelectAlgorithm,
  soundEnabled,
  onToggleSound,
  viewMode,
  onToggleViewMode,
  onOpenHelp,
  layoutMode,
  onToggleLayoutMode,
}) => {
  return (
    <header className="glass-panel sticky top-0 z-30 px-4 py-3 border-b border-amber-500/20 text-slate-100 shadow-2xl backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/40 rounded-xl text-amber-400 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">
                AlgoVisualizer
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full tracking-wider uppercase shadow-inner">
                CLRS Textbook Spec
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Interactive step-by-step algorithm visualizer & pseudocode engine
            </p>
          </div>
        </div>

        {/* Controls and Selectors */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Algorithm Selector */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 shadow-inner">
            {(Object.keys(ALGORITHMS) as AlgorithmId[]).map((id) => (
              <button
                key={id}
                onClick={() => onSelectAlgorithm(id)}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold rounded-lg transition-all duration-200 ${
                  selectedAlgorithm === id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md glow-amber font-extrabold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                {ALGORITHMS[id].name}
              </button>
            ))}
          </div>

          {/* Layout Mode Toggle */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => onToggleLayoutMode('side-by-side')}
              className={`p-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                layoutMode === 'side-by-side'
                  ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Side-by-Side View"
            >
              <Columns className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Side-by-Side</span>
            </button>
            <button
              onClick={() => onToggleLayoutMode('stacked')}
              className={`p-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                layoutMode === 'stacked'
                  ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Stacked View"
            >
              <Rows className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Stacked</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => onToggleViewMode('bars')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                viewMode === 'bars'
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Bar Chart View"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Bars</span>
            </button>
            <button
              onClick={() => onToggleViewMode('cards')}
              className={`p-1.5 rounded-lg flex items-center space-x-1 transition-all ${
                viewMode === 'cards'
                  ? 'bg-slate-800 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Animated Cards View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Cards</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 glow-amber'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Help button */}
          <button
            onClick={onOpenHelp}
            className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
            title="Algorithm Visualizer Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
