import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { VisualizerCanvas } from './components/VisualizerCanvas';
import { Controls } from './components/Controls';
import { PseudocodeViewer } from './components/PseudocodeViewer';
import { VariableInspector } from './components/VariableInspector';
import { ArrayControls } from './components/ArrayControls';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { HelpModal } from './components/HelpModal';
import { Columns, Rows, Split, BookOpen } from 'lucide-react';
import { AlgorithmId, AlgorithmStep, MergeSortVariant } from './types';
import {
  ALGORITHMS,
  getAlgorithmSteps,
  CLRS_4TH_MERGE_PSEUDOCODE,
  CLRS_3RD_MERGE_PSEUDOCODE,
} from './algorithms';
import { soundEngine } from './utils/audio';

export default function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmId>('merge');
  const [mergeVariant, setMergeVariant] = useState<MergeSortVariant>('clrs4th');
  const [arrayData, setArrayData] = useState<number[]>([5, 2, 4, 7, 1, 3, 2, 6]);
  const [viewMode, setViewMode] = useState<'bars' | 'cards'>('bars');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [layoutMode, setLayoutMode] = useState<'stacked' | 'side-by-side'>('side-by-side');

  // Animation State
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(300); // ms per step

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Re-generate algorithm execution steps whenever arrayData, selectedAlgorithm, or mergeVariant changes
  useEffect(() => {
    const newSteps = getAlgorithmSteps(selectedAlgorithm, arrayData, mergeVariant);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedAlgorithm, arrayData, mergeVariant]);

  // Audio & Confetti side-effects on step change
  useEffect(() => {
    if (!steps || steps.length === 0) return;
    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    if (soundEnabled && isPlaying) {
      if (currentStep.indices.comparingIndex !== undefined && currentStep.array[currentStep.indices.comparingIndex]) {
        const val = currentStep.array[currentStep.indices.comparingIndex].value;
        soundEngine.playNote(val);
      } else if (currentStep.indices.keyIndex !== undefined && currentStep.array[currentStep.indices.keyIndex]) {
        const val = currentStep.array[currentStep.indices.keyIndex].value;
        soundEngine.playNote(val);
      } else if (currentStep.indices.k !== undefined && currentStep.array[currentStep.indices.k - 1]) {
        const val = currentStep.array[currentStep.indices.k - 1].value;
        soundEngine.playNote(val);
      }
    }

    // On completion step
    if (currentStepIndex === steps.length - 1 && steps.length > 1) {
      if (soundEnabled) {
        soundEngine.playCompletionTone();
      }
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
        });
      } catch {
        // ignore confetti errors
      }
    }
  }, [currentStepIndex, steps, soundEnabled, isPlaying]);

  // Playback Timer Loop
  const handleNextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, [steps.length]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNextStep();
      }, speed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, handleNextStep]);

  const handleTogglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    handleNextStep();
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleSeek = (stepIdx: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(stepIdx);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEngine.setEnabled(next);
  };

  const currentStep = steps[currentStepIndex] || {
    array: [],
    line: 0,
    description: 'Ready.',
    variables: {},
    indices: {},
  };

  const currentAlgoInfo = ALGORITHMS[selectedAlgorithm];
  const activePseudocode =
    selectedAlgorithm === 'merge'
      ? mergeVariant === 'clrs3rd'
        ? CLRS_3RD_MERGE_PSEUDOCODE
        : CLRS_4TH_MERGE_PSEUDOCODE
      : currentAlgoInfo.pseudocode;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 relative overflow-x-hidden">
      {/* Immersive Dark Mode Radial Orbs */}
      <div className="fixed -top-40 -left-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed -bottom-20 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <Header
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={(id) => {
          setSelectedAlgorithm(id);
        }}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenHelp={() => setIsHelpOpen(true)}
        layoutMode={layoutMode}
        onToggleLayoutMode={setLayoutMode}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6 relative z-10">
        {/* Quick View Mode Switcher Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 p-2.5 rounded-2xl backdrop-blur-md">
          <div className="flex items-center space-x-2 px-2">
            <Split className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono text-slate-300 font-bold">Layout Mode:</span>
            <span className="text-xs font-mono text-amber-400 font-semibold px-2 py-0.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
              {layoutMode === 'side-by-side' ? 'Side-by-Side (Canvas + Pseudocode)' : 'Stacked (Full Width)'}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setLayoutMode('side-by-side')}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
                layoutMode === 'side-by-side'
                  ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side</span>
            </button>
            <button
              onClick={() => setLayoutMode('stacked')}
              className={`px-3 py-1 rounded-lg flex items-center space-x-1.5 transition-all ${
                layoutMode === 'stacked'
                  ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Rows className="w-3.5 h-3.5" />
              <span>Stacked</span>
            </button>
          </div>
        </div>

        {/* CLRS Merge Sort Variant Selector */}
        {selectedAlgorithm === 'merge' && (
          <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-amber-500/10 via-slate-900/80 to-slate-900/80 border border-amber-500/30 p-3 rounded-2xl backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-xs font-mono font-bold text-amber-300">CLRS Algorithm Variant:</span>
                <span className="text-[11px] font-mono text-slate-400 ml-2 hidden sm:inline">
                  {mergeVariant === 'clrs4th'
                    ? '4th Edition (Section 2.3: Modern 3-loop MERGE without sentinels)'
                    : '3rd Edition (Section 2.3: Classic MERGE with ∞ sentinels)'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setMergeVariant('clrs4th')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mergeVariant === 'clrs4th'
                    ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CLRS 4th Ed. (No Sentinels)
              </button>
              <button
                onClick={() => setMergeVariant('clrs3rd')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  mergeVariant === 'clrs3rd'
                    ? 'bg-amber-500 text-slate-950 font-bold glow-amber'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CLRS 3rd Ed. (Sentinels ∞)
              </button>
            </div>
          </div>
        )}

        {/* Layout Switch: Side-by-Side vs Stacked */}
        {layoutMode === 'side-by-side' ? (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Canvas + Playback Controls */}
            <div className="lg:col-span-7 space-y-4">
              <VisualizerCanvas
                elements={currentStep.array}
                viewMode={viewMode}
                indices={currentStep.indices}
                keyValue={currentStep.variables.key}
                auxArrays={currentStep.auxArrays}
                callStack={currentStep.callStack}
              />

              <Controls
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                currentStep={currentStepIndex}
                totalSteps={steps.length}
                onSeek={handleSeek}
                speed={speed}
                onChangeSpeed={setSpeed}
              />
            </div>

            {/* Right Column (5 cols): Pseudocode + Variable Inspector */}
            <div className="lg:col-span-5 space-y-4 flex flex-col h-full justify-between">
              <div className="flex-1">
                <PseudocodeViewer
                  algorithmName={currentAlgoInfo.name}
                  lines={activePseudocode}
                  activeLine={currentStep.line}
                  procedure={currentStep.procedure}
                  currentDescription={currentStep.description}
                />
              </div>
              <div>
                <VariableInspector variables={currentStep.variables} />
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Stacked Layout */}
            <section className="space-y-4">
              <VisualizerCanvas
                elements={currentStep.array}
                viewMode={viewMode}
                indices={currentStep.indices}
                keyValue={currentStep.variables.key}
                auxArrays={currentStep.auxArrays}
                callStack={currentStep.callStack}
              />

              <Controls
                isPlaying={isPlaying}
                onTogglePlay={handleTogglePlay}
                onStepForward={handleStepForward}
                onStepBackward={handleStepBackward}
                onReset={handleReset}
                currentStep={currentStepIndex}
                totalSteps={steps.length}
                onSeek={handleSeek}
                speed={speed}
                onChangeSpeed={setSpeed}
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <PseudocodeViewer
                  algorithmName={currentAlgoInfo.name}
                  lines={activePseudocode}
                  activeLine={currentStep.line}
                  procedure={currentStep.procedure}
                  currentDescription={currentStep.description}
                />
              </div>

              <div className="lg:col-span-1">
                <VariableInspector variables={currentStep.variables} />
              </div>
            </section>
          </>
        )}

        {/* Bottom Section: Data Setup Controls */}
        <section>
          <ArrayControls
            onSetArray={(newArr) => {
              setArrayData(newArr);
            }}
            currentLength={arrayData.length}
          />
        </section>

        {/* Learning Section: Algorithm Info & Quiz */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AlgorithmInfo info={currentAlgoInfo} />
          </div>
          <div className="lg:col-span-1">
            <InteractiveQuiz algorithmId={selectedAlgorithm} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900/80 bg-slate-950/80 backdrop-blur py-6 text-center text-xs font-mono text-slate-500 relative z-10">
        <p>AlgoVisualizer • CLRS Textbook Spec Algorithm Engine • Built with React & Tailwind CSS</p>
      </footer>

      {/* Help Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
