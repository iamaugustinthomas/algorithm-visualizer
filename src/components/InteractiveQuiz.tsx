import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award } from 'lucide-react';
import { AlgorithmId } from '../types';

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const INSERTION_SORT_QUESTIONS: Question[] = [
  {
    question: 'In CLRS INSERTION-SORT, what is the initial value of loop index j?',
    options: ['j = 1', 'j = 2', 'j = 0', 'j = A.length'],
    correctIndex: 1,
    explanation: 'Line 1 states: "for j = 2 to A.length". Array element A[1] is trivially sorted on its own.',
  },
  {
    question: 'What is the best-case time complexity of Insertion Sort and when does it occur?',
    options: [
      'O(n²) when the array is reverse sorted',
      'O(n) when the array is already sorted',
      'O(n log n) when array elements are distinct',
      'O(1) when key is at index 1',
    ],
    correctIndex: 1,
    explanation: 'When the array is already sorted, the inner while loop test A[i] > key fails immediately on every iteration, leading to n-1 comparisons and zero shifts.',
  },
  {
    question: 'Given array A = [5, 2, 4, 6, 1, 3], when j = 2, what is the value of key?',
    options: ['key = 5', 'key = 2', 'key = 4', 'key = 1'],
    correctIndex: 1,
    explanation: 'When j = 2, A[2] = 2, so key = A[j] = 2.',
  },
  {
    question: 'Is Insertion Sort an in-place and stable sorting algorithm?',
    options: [
      'Neither in-place nor stable',
      'In-place but not stable',
      'Stable but not in-place',
      'Both in-place and stable',
    ],
    correctIndex: 3,
    explanation: 'Insertion Sort requires only O(1) auxiliary space (in-place) and preserves the relative order of duplicate elements because the while condition is A[i] > key (strict inequality).',
  },
];

const MERGE_SORT_QUESTIONS: Question[] = [
  {
    question: 'In CLRS MERGE-SORT(A, p, r), what condition terminates recursion in Line 1?',
    options: ['p == r', 'p >= r', 'p > r', 'r - p <= 1'],
    correctIndex: 1,
    explanation: 'Line 1 specifies: "if p >= r return". This covers empty subarrays (p > r) and 1-element subarrays (p == r), which are trivially sorted.',
  },
  {
    question: 'In CLRS MERGE Line 12, why is "if L[i] <= R[j]" used instead of strict inequality "<"?',
    options: [
      'To prevent an out-of-bounds error',
      'To ensure stability by preserving the relative order of equal elements',
      'Because R[j] cannot equal L[i]',
      'To minimize the total number of comparisons',
    ],
    correctIndex: 1,
    explanation: 'Using <= ensures that whenever L[i] and R[j] have equal keys, the element from L (which originally appeared earlier) is written first, maintaining stability.',
  },
  {
    question: 'What is the auxiliary space complexity of CLRS Merge Sort?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    correctIndex: 2,
    explanation: 'MERGE allocates temporary buffer arrays L[0 : n_L - 1] and R[0 : n_R - 1] having total length n_L + n_R = n, requiring Θ(n) auxiliary space.',
  },
  {
    question: 'What is the running time of Merge Sort across all cases (best, average, worst)?',
    options: ['Θ(n²)', 'Θ(n log n)', 'Θ(n)', 'O(log n)'],
    correctIndex: 1,
    explanation: 'The divide-and-conquer recurrence T(n) = 2T(n/2) + Θ(n) yields Θ(n log n) in best, average, and worst cases by the Master Theorem.',
  },
];

interface InteractiveQuizProps {
  algorithmId?: AlgorithmId;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ algorithmId = 'insertion' }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = algorithmId === 'merge' ? MERGE_SORT_QUESTIONS : INSERTION_SORT_QUESTIONS;
  const title = algorithmId === 'merge' ? 'Merge Sort CLRS Quiz' : 'Insertion Sort CLRS Quiz';

  useEffect(() => {
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
  }, [algorithmId]);

  const currentQ = questions[currentQIndex] || questions[0];

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOpt(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="glass-panel border border-slate-800/80 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-3 mb-4">
        <HelpCircle className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-bold text-slate-100 font-mono uppercase tracking-wide">
          {title}
        </h3>
      </div>

      {!showResult ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              Question {currentQIndex + 1} of {questions.length}
            </span>
            <span className="text-amber-400 font-bold glow-amber">Score: {score}</span>
          </div>

          <p className="text-sm font-semibold text-slate-200">{currentQ.question}</p>

          <div className="space-y-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = 'bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 shadow-inner';

              if (selectedOpt !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 font-bold glow-emerald';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-300 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={selectedOpt !== null}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-mono transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {selectedOpt !== null && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 space-y-2.5 shadow-inner">
              <p className="text-amber-300 font-bold">Explanation:</p>
              <p className="text-slate-300">{currentQ.explanation}</p>
              <button
                onClick={handleNext}
                className="mt-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl glow-amber shadow transition-all"
              >
                {currentQIndex < questions.length - 1 ? 'Next Question →' : 'View Final Score'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 space-y-4">
          <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce glow-amber" />
          <h4 className="text-lg font-bold text-slate-100 font-mono">Quiz Completed!</h4>
          <p className="text-sm font-mono text-slate-300">
            You scored <span className="text-amber-400 font-bold text-xl glow-amber">{score}</span> out of{' '}
            {questions.length}
          </p>
          <button
            onClick={handleRestart}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold rounded-xl text-xs glow-amber transition-all"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};
