import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Target,
  AlertTriangle,
  Zap,
  Clock,
  Keyboard,
  Sparkles,
  BarChart3,
  CheckCircle2
} from 'lucide-react';
import { KEY_FINGER_MAP } from '../common/VirtualKeyboard';

export const AnalyticsView: React.FC = () => {
  const { student, testHistory, startTypingTest } = useApp();

  // Aggregate all error keys from test history
  const allErrorsMap: Record<string, number> = {};
  testHistory.forEach(test => {
    Object.entries(test.errorKeys || {}).forEach(([key, count]) => {
      allErrorsMap[key] = (allErrorsMap[key] || 0) + Number(count);
    });
  });

  // Calculate top worst keys
  const sortedErrorKeys = Object.entries(allErrorsMap).sort((a, b) => b[1] - a[1]);
  const maxErrorCount = sortedErrorKeys[0]?.[1] || 1;

  // Finger error distribution
  const fingerErrorCounts: Record<string, number> = {
    'Left Pinky': 0,
    'Left Ring': 0,
    'Left Middle': 0,
    'Left Index': 0,
    'Right Index': 0,
    'Right Middle': 0,
    'Right Ring': 0,
    'Right Pinky': 0,
    'Thumbs': 0
  };

  Object.entries(allErrorsMap).forEach(([key, count]) => {
    const info = KEY_FINGER_MAP[key.toLowerCase()];
    if (info) {
      const label = `${info.hand} ${info.finger}`;
      if (fingerErrorCounts[label] !== undefined) {
        fingerErrorCounts[label] += count;
      } else if (info.finger === 'Thumb') {
        fingerErrorCounts['Thumbs'] += count;
      }
    }
  });

  const totalFingerErrors = Object.values(fingerErrorCounts).reduce((a, b) => a + b, 0) || 1;

  // Chart data points from test history (reversed so oldest to newest)
  const chartHistory = [...testHistory].reverse();
  const maxWpmInHistory = Math.max(80, ...chartHistory.map(h => h.netWpm));

  const launchRemedialDrill = () => {
    const weakKeysList = sortedErrorKeys.slice(0, 4).map(([k]) => k);
    const content = 'quartz pixel puzzle plaza zeal zero zombie zigzag parameter expect expanse pattern'
      .split(' ')
      .sort(() => 0.5 - Math.random())
      .join(' ');

    startTypingTest({
      id: `remedial-${Date.now()}`,
      title: `Remedial Weak Finger Drill [${weakKeysList.join(', ').toUpperCase()}]`,
      category: 'Remedial Analysis',
      difficulty: 'Medium',
      content,
      wordCount: content.split(/\s+/).length
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Performance & Error Analysis
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Deep diagnostic insights into velocity progression, accuracy stability, and finger-level biomechanics.
          </p>
        </div>

        <button
          onClick={launchRemedialDrill}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Practice Problem Keys</span>
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Current Average WPM</span>
          <span className="text-2xl font-black text-white font-mono">{student.averageWpm}</span>
          <span className="text-[11px] text-emerald-400 block mt-1">Goal: {student.targetWpm} WPM</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Peak Speed Record</span>
          <span className="text-2xl font-black text-emerald-400 font-mono">{student.bestWpm} WPM</span>
          <span className="text-[11px] text-slate-500 block mt-1">Personal Best</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Overall Accuracy</span>
          <span className="text-2xl font-black text-cyan-400 font-mono">{student.averageAccuracy}%</span>
          <span className="text-[11px] text-slate-500 block mt-1">Target: {student.targetAccuracy}%</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-xs text-slate-400 block mb-1">Total Key Strokes</span>
          <span className="text-2xl font-black text-purple-400 font-mono">
            {(testHistory.reduce((acc, curr) => acc + (curr?.totalKeystrokes || 0), 0) || 0).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">Across all tests</span>
        </div>
      </div>

      {/* WPM & Accuracy Trend SVG Chart */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Speed & Accuracy Progression Timeline</span>
            </h2>
            <p className="text-xs text-slate-400">Net Words Per Minute over historical test sessions</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-3 h-1 bg-emerald-400 rounded-full" />
              <span>Net Speed (WPM)</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <span className="w-3 h-1 bg-cyan-400 rounded-full" />
              <span>Accuracy (%)</span>
            </div>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="w-full h-64 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4 relative overflow-hidden flex items-end">
          {chartHistory.length === 0 ? (
            <div className="w-full text-center text-slate-500 text-xs py-20">
              Take at least one test to populate the performance curve.
            </div>
          ) : (
            <div className="w-full h-full flex items-end gap-2 sm:gap-4 pt-6">
              {chartHistory.map((item, idx) => {
                const wpmHeightPercent = Math.min(100, Math.max(15, Math.round((item.netWpm / maxWpmInHistory) * 100)));
                const accHeightPercent = Math.min(100, Math.max(10, Math.round(item.accuracy * 0.9)));

                return (
                  <div
                    key={item.id}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    <div className="absolute -top-12 bg-slate-900 border border-slate-700 text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      <div className="font-bold text-emerald-400">{item.netWpm} WPM</div>
                      <div className="text-slate-400">{item.accuracy}% Acc • {item.date}</div>
                    </div>

                    {/* Dual bar or point indicator */}
                    <div className="w-full max-w-[28px] flex items-end gap-1 h-full justify-center">
                      <div
                        style={{ height: `${wpmHeightPercent}%` }}
                        className="w-2.5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-md group-hover:brightness-125 transition-all"
                      />
                      <div
                        style={{ height: `${accHeightPercent}%` }}
                        className="w-2.5 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t-md group-hover:brightness-125 transition-all opacity-80"
                      />
                    </div>

                    <span className="text-[9px] text-slate-500 mt-2 font-mono truncate max-w-[40px]">
                      #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Two Column Section: Key Misses Heatmap & Finger Biomechanics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Frequency Heatmap Breakdown */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Highest Error Keys Breakdown</span>
            </h3>
            <span className="text-xs text-slate-400">Total misses recorded</span>
          </div>

          <div className="space-y-3">
            {sortedErrorKeys.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No error keystrokes recorded yet.</p>
            ) : (
              sortedErrorKeys.slice(0, 8).map(([key, count]) => {
                const percent = Math.round((count / maxErrorCount) * 100);
                const info = KEY_FINGER_MAP[key.toLowerCase()];

                return (
                  <div key={key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-white">
                          {key === ' ' ? 'SPC' : key.toUpperCase()}
                        </span>
                        <span className="text-slate-400">
                          {info ? `${info.hand} ${info.finger}` : 'Special'}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-rose-400">{count} errors</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full bg-rose-500 rounded-full transition-all duration-300"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Finger Distribution Analysis */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-cyan-400" />
              <span>Finger Error Distribution</span>
            </h3>
            <span className="text-xs text-slate-400">Biomechanics</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(fingerErrorCounts).map(([finger, count]) => {
              const share = Math.round((count / totalFingerErrors) * 100);
              const isHigh = share > 15;

              return (
                <div
                  key={finger}
                  className={`p-3 rounded-xl border ${
                    isHigh
                      ? 'bg-rose-500/10 border-rose-500/30'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-slate-300">{finger}</span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        isHigh ? 'text-rose-400' : 'text-slate-400'
                      }`}
                    >
                      {share}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${share}%` }}
                      className={`h-full rounded-full ${isHigh ? 'bg-rose-500' : 'bg-cyan-500'}`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                    {count} mistypes
                  </span>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Ergonomic Tip:</strong> Keep your wrists slightly elevated above the desk rather than resting them flat. This gives your pinky fingers 30% more reach and prevents carpal strain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
