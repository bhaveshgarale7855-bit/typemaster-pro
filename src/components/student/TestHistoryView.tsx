import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TestResult } from '../../types';
import {
  History,
  Search,
  Filter,
  Download,
  Eye,
  Zap,
  Target,
  Clock,
  Sparkles,
  X
} from 'lucide-react';

export const TestHistoryView: React.FC = () => {
  const { testHistory } = useApp();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectResult, setInspectResult] = useState<TestResult | null>(null);

  const filteredHistory = testHistory.filter(item => {
    const matchesType = filterType === 'All' || item.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleExportCSV = () => {
    if (testHistory.length === 0) return;
    const headers = ['Date', 'Title', 'Type', 'Net WPM', 'Gross WPM', 'Accuracy %', 'Duration (s)', 'Errors', 'XP Earned'];
    const rows = testHistory.map(t => [
      `"${t.date}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      t.type,
      t.netWpm,
      t.grossWpm,
      t.accuracy,
      t.durationSeconds,
      t.errorCount,
      t.xpEarned
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `typemaster_history_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <History className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Test & Exercise History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Complete audit trail of all typing sessions, speed certifications, and practice milestones.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search sessions by title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Test', 'Lesson', 'Practice'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Session Title</th>
                <th className="px-5 py-3.5">Type</th>
                <th className="px-5 py-3.5">Net Speed</th>
                <th className="px-5 py-3.5">Accuracy</th>
                <th className="px-5 py-3.5">Duration</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    No test sessions recorded matching current filters.
                  </td>
                </tr>
              ) : (
                filteredHistory.map(record => (
                  <tr key={record.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-white">
                      {record.title}
                    </td>
                    <td className="px-5 py-4">
                      <span className="capitalize px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-semibold border border-slate-700">
                        {record.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-400 text-sm">
                      {record.netWpm} WPM
                    </td>
                    <td className="px-5 py-4 font-mono">
                      <span className={record.accuracy >= 95 ? 'text-cyan-400 font-bold' : 'text-slate-300'}>
                        {record.accuracy}%
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 font-mono">
                      {record.durationSeconds}s
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {record.date}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setInspectResult(record)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                        title="View Detailed Breakdown"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {inspectResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">{inspectResult.title}</h3>
              <button
                onClick={() => setInspectResult(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Net Speed</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{inspectResult.netWpm} WPM</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Accuracy</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{inspectResult.accuracy}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">XP Earned</span>
                <span className="text-xl font-black text-amber-400 font-mono">+{inspectResult.xpEarned}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Keystrokes:</span>
                <span className="font-mono">{inspectResult.totalKeystrokes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Correct Keystrokes:</span>
                <span className="font-mono text-emerald-400">{inspectResult.correctKeystrokes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Error Count:</span>
                <span className="font-mono text-rose-400">{inspectResult.errorCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gross Velocity:</span>
                <span className="font-mono">{inspectResult.grossWpm} WPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-mono">{inspectResult.date}</span>
              </div>
            </div>

            {inspectResult.errorKeys && Object.keys(inspectResult.errorKeys).length > 0 && (
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">Key Mis-strokes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(inspectResult.errorKeys).map(([key, count]) => (
                    <span
                      key={key}
                      className="px-2 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono rounded"
                    >
                      {key === ' ' ? 'SPC' : key.toUpperCase()}: {count}×
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
