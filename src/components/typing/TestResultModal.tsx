import React from 'react';
import confetti from 'canvas-confetti';
import { TestResult } from '../../types';
import {
  Trophy,
  Zap,
  Target,
  RotateCcw,
  ArrowRight,
  Clock,
  Sparkles,
  AlertTriangle,
  Award
} from 'lucide-react';

interface TestResultModalProps {
  result: TestResult;
  onRetry: () => void;
  onNext?: () => void;
  onClose: () => void;
  hasNextLesson?: boolean;
}

export const TestResultModal: React.FC<TestResultModalProps> = ({
  result,
  onRetry,
  onNext,
  onClose,
  hasNextLesson = false
}) => {
  React.useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }
  }, []);

  const getSpeedGrade = (wpm: number) => {
    if (wpm >= 80) return { grade: 'Master Typist', color: 'text-purple-400', border: 'border-purple-500/40 bg-purple-500/10' };
    if (wpm >= 60) return { grade: 'Advanced Pro', color: 'text-cyan-400', border: 'border-cyan-500/40 bg-cyan-500/10' };
    if (wpm >= 40) return { grade: 'Intermediate', color: 'text-emerald-400', border: 'border-emerald-500/40 bg-emerald-500/10' };
    return { grade: 'Developing', color: 'text-amber-400', border: 'border-amber-500/40 bg-amber-500/10' };
  };

  const speedGrade = getSpeedGrade(result.netWpm);
  const errorKeyEntries = Object.entries(result.errorKeys || {}).sort((a, b) => Number(b[1]) - Number(a[1]));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500" />

        {/* Title and Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 shadow-lg shadow-emerald-500/10">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Session Completed!</h2>
          <p className="text-sm text-slate-400 mt-1">{result.title}</p>
          
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border capitalize">
            <Award className={`w-3.5 h-3.5 ${speedGrade.color}`} />
            <span className={speedGrade.color}>{speedGrade.grade}</span>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Net Speed</span>
            </div>
            <div className="text-3xl font-black text-white font-mono">{result.netWpm}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">WPM (Words/Min)</div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Accuracy</span>
            </div>
            <div className="text-3xl font-black text-white font-mono">{result.accuracy}%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{result.errorCount} mistakes</div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>XP Earned</span>
            </div>
            <div className="text-3xl font-black text-amber-400 font-mono">+{result.xpEarned}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Level Progress</div>
          </div>
        </div>

        {/* Secondary Details & Error Heatmap */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 mb-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Duration: {result.durationSeconds}s</span>
            </div>
            <div>
              <span>Keystrokes: </span>
              <span className="text-white font-mono font-medium">{result.totalKeystrokes}</span>
              <span className="text-emerald-400 font-mono"> ({result.correctKeystrokes} ok)</span>
            </div>
          </div>

          {/* Key Misstrokes Analysis */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Key Misses Breakdown</span>
            </div>
            {errorKeyEntries.length === 0 ? (
              <p className="text-xs text-emerald-400">Zero errors! Perfect touch precision.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {errorKeyEntries.slice(0, 6).map(([key, count]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono"
                  >
                    <span className="font-bold">{key === ' ' ? 'SPACE' : key}</span>
                    <span className="text-[10px] text-rose-400 bg-rose-500/20 px-1 rounded font-bold">
                      {count}×
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <button
            id="result-modal-retry"
            onClick={onRetry}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 font-semibold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>

          {hasNextLesson && onNext ? (
            <button
              id="result-modal-next"
              onClick={onNext}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="result-modal-done"
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <span>Return to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
