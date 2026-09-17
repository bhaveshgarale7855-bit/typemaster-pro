import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Download,
  Printer,
  AlertTriangle,
  Award,
  Layers,
  Users,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { students, batches, assignments, teacher } = useApp();
  const [selectedCohort, setSelectedCohort] = useState('All');

  const filteredStudents = students.filter(s =>
    selectedCohort === 'All' || s.batchId === selectedCohort
  );

  const totalTests = filteredStudents.reduce((a, b) => a + b.testsTaken, 0);
  const avgWpm = Math.round(
    filteredStudents.reduce((a, b) => a + b.wpm, 0) / (filteredStudents.length || 1)
  );
  const avgAcc = Math.round(
    filteredStudents.reduce((a, b) => a + b.accuracy, 0) / (filteredStudents.length || 1)
  );

  // Identify struggling students (e.g. < 38 WPM or < 93% accuracy)
  const struggling = filteredStudents.filter(s => s.wpm < 38 || s.accuracy < 93);
  // Honor roll (> 55 WPM)
  const honorRoll = filteredStudents.filter(s => s.wpm >= 55);

  const handleExportCSV = () => {
    const headers = ['Student Name', 'Email', 'Batch', 'Net WPM', 'Accuracy %', 'Level', 'XP', 'Streak (days)', 'Status'];
    const rows = filteredStudents.map(s => [
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.batchName}"`,
      s.wpm,
      s.accuracy,
      s.level,
      s.xp,
      s.streak,
      s.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `typemaster_academy_audit_${new Date().toISOString().split('T')[0]}.csv`);
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
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Institutional Reports & Gradebooks
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Audit cohort milestones, benchmark velocity progression, export official CSV grade transcripts.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export Roster CSV</span>
          </button>
        </div>
      </div>

      {/* Cohort Selector and KPI Row */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">Filter Scope:</span>
          <select
            value={selectedCohort}
            onChange={e => setSelectedCohort(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
          >
            <option value="All">All Cohorts Combined</option>
            {batches.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-slate-400 block">Total Drills</span>
            <span className="font-mono font-bold text-white text-base">{totalTests}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Mean Speed</span>
            <span className="font-mono font-bold text-emerald-400 text-base">{avgWpm} WPM</span>
          </div>
          <div>
            <span className="text-slate-400 block">Mean Precision</span>
            <span className="font-mono font-bold text-cyan-400 text-base">{avgAcc}%</span>
          </div>
        </div>
      </div>

      {/* Cohort Comparison Cards */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Cohort Comparative Benchmarks</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {batches.map(batch => (
            <div key={batch.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <h4 className="text-xs font-bold text-white">{batch.name}</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Class Average:</span>
                  <span className="font-mono font-bold text-emerald-400">{batch.averageWpm} WPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Goal:</span>
                  <span className="font-mono text-amber-400">{batch.targetWpm} WPM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Accuracy:</span>
                  <span className="font-mono text-cyan-400">{batch.averageAccuracy}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Columns: Needs Coaching vs Honor Roll */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Needs Coaching */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Learners Needing Acceleration (<span className="text-rose-400">Below 38 WPM</span>)</span>
            </h3>
            <span className="text-xs font-mono text-rose-400">{struggling.length} flagged</span>
          </div>

          <div className="space-y-2">
            {struggling.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">All learners are currently meeting or exceeding 38 WPM pace!</p>
            ) : (
              struggling.map(s => (
                <div
                  key={s.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <span className="text-xs font-bold text-white">{s.name}</span>
                      <span className="text-[10px] text-slate-500 block">{s.batchName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-rose-400">{s.wpm} WPM</span>
                    <span className="text-[10px] text-slate-400 block">{s.accuracy}% Acc</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Honor Roll */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Velocity Honor Roll (<span className="text-amber-400">55+ WPM</span>)</span>
            </h3>
            <span className="text-xs font-mono text-amber-400">{honorRoll.length} typists</span>
          </div>

          <div className="space-y-2">
            {honorRoll.map(s => (
              <div
                key={s.id}
                className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <span className="text-[10px] text-slate-500 block">{s.batchName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-emerald-400">{s.wpm} WPM</span>
                  <span className="text-[10px] text-slate-400 block">{s.accuracy}% Acc</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
