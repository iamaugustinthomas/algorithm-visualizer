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

const HEAPSORT_QUESTIONS: Question[] = [
  {
    question: 'In CLRS 4th Edition, for a 1-indexed binary heap, what are the indices of the children of node i?',
    options: [
      'LEFT(i) = 2i, RIGHT(i) = 2i + 1',
      'LEFT(i) = 2i - 1, RIGHT(i) = 2i',
      'LEFT(i) = i / 2, RIGHT(i) = i / 2 + 1',
      'LEFT(i) = i + 1, RIGHT(i) = i + 2',
    ],
    correctIndex: 0,
    explanation: 'CLRS Section 6.1 defines LEFT(i) = 2i and RIGHT(i) = 2i + 1, using simple binary left-shift operations.',
  },
  {
    question: 'What is the tight asymptotic running time of BUILD-MAX-HEAP on an n-element array?',
    options: ['Θ(n log n)', 'Θ(n)', 'Θ(log n)', 'Θ(n²)'],
    correctIndex: 1,
    explanation: 'CLRS Section 6.3 proves that although MAX-HEAPIFY is O(log n), most nodes are near the leaves with small heights; the summation bounds total time to linear Θ(n).',
  },
  {
    question: 'In CLRS HEAPSORT Line 2, why does the loop stop at 2 ("for i = A.length downto 2")?',
    options: [
      'Because index 1 is reserved for sentinels',
      'Because when 1 element remains in A[1], it is already in its correct sorted position',
      'To prevent an array index out-of-bounds exception in MAX-HEAPIFY',
      'Because A.heap-size cannot equal 1',
    ],
    correctIndex: 1,
    explanation: 'Once n - 1 elements have been extracted to their final positions A[2..n], the remaining element A[1] is the smallest and is trivially sorted.',
  },
  {
    question: 'Is Heapsort an in-place and stable sorting algorithm?',
    options: [
      'Both in-place and stable',
      'In-place (Θ(1) auxiliary space), but NOT stable',
      'Stable, but requires Θ(n) auxiliary space',
      'Neither in-place nor stable',
    ],
    correctIndex: 1,
    explanation: 'Heapsort sorts strictly in place with Θ(1) extra space. However, swapping elements between the root and leaves across heap levels disrupts the relative order of identical keys, making it unstable.',
  },
];

const BST_QUESTIONS: Question[] = [
  {
    question: 'What is the Binary-Search-Tree Property defined in CLRS Section 12.1?',
    options: [
      'y in left subtree => y.key <= x.key, and y in right subtree => y.key >= x.key',
      'y in left subtree => y.key >= x.key, and y in right subtree => y.key <= x.key',
      'The tree must always be balanced such that height h = O(lg n)',
      'Every node must have exactly 2 children',
    ],
    correctIndex: 0,
    explanation: 'CLRS Section 12.1: Let x be a node in a BST. If y is in the left subtree of x, then y.key <= x.key. If y is in the right subtree of x, then y.key >= x.key.',
  },
  {
    question: 'What is the running time of INORDER-TREE-WALK on a binary search tree with n nodes?',
    options: ['Θ(lg n)', 'Θ(n)', 'Θ(n lg n)', 'Θ(h) where h is height'],
    correctIndex: 1,
    explanation: 'CLRS Theorem 12.1 proves that INORDER-TREE-WALK visits each of the n nodes exactly once, taking Θ(n) time.',
  },
  {
    question: 'In CLRS TREE-SUCCESSOR(x), if node x has a non-empty right subtree, where is its successor?',
    options: [
      'The maximum node in x\'s right subtree: TREE-MAXIMUM(x.right)',
      'The minimum node in x\'s right subtree: TREE-MINIMUM(x.right)',
      'The parent node x.p',
      'The root of the tree T.root',
    ],
    correctIndex: 1,
    explanation: 'Line 2 of TREE-SUCCESSOR: if x.right != NIL, return TREE-MINIMUM(x.right). The smallest key strictly greater than x.key in that subtree is its leftmost leaf.',
  },
  {
    question: 'What is the role of the TRANSPLANT(T, u, v) subroutine in CLRS TREE-DELETE?',
    options: [
      'It swaps the keys between nodes u and v without moving pointers',
      'It replaces the subtree rooted at node u with the subtree rooted at node v, updating parent pointers',
      'It rotates the tree left around edge (u, v)',
      'It allocates a new node v on the heap',
    ],
    correctIndex: 1,
    explanation: 'CLRS Section 12.3: TRANSPLANT(T, u, v) replaces subtree u with subtree v by updating u.p\'s child pointer (left or right) and v.p to point to u.p.',
  },
  {
    question: 'What is the worst-case time complexity of TREE-SEARCH, TREE-INSERT, and TREE-DELETE?',
    options: ['O(lg n)', 'O(1)', 'O(h) = O(n) on an unbalanced skewed tree', 'O(n lg n)'],
    correctIndex: 2,
    explanation: 'Each basic dynamic-set operation on a BST runs in O(h) time, where h is the tree height. In the worst case (a linear chain), h = n - 1, yielding O(n) time.',
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

  const getQuizData = () => {
    switch (algorithmId) {
      case 'bst':
        return { questions: BST_QUESTIONS, title: 'Binary Search Tree CLRS Ch. 12 Quiz' };
      case 'merge':
        return { questions: MERGE_SORT_QUESTIONS, title: 'Merge Sort CLRS Quiz' };
      case 'heapsort':
        return { questions: HEAPSORT_QUESTIONS, title: 'Heapsort CLRS 4th Ed. Quiz' };
      default:
        return { questions: INSERTION_SORT_QUESTIONS, title: 'Insertion Sort CLRS Quiz' };
    }
  };

  const { questions, title } = getQuizData();

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
