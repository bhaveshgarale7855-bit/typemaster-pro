import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Batch } from '../../types';
import {
  Layers,
  Plus,
  Users,
  Calendar,
  Zap,
  Target,
  Clock,
  Edit2,
  X,
  ArrowRight
} from 'lucide-react';

export const BatchManagementView: React.FC = () => {
  const {
    batches,
    students,
    addBatch,
    updateBatch,
    selectedBatchForDetail,
    setSelectedBatchForDetail
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);

  // Form State
  const [batchName, setBatchName] = useState('');
  const [schedule, setSchedule] = useState('');
  const [targetWpm, setTargetWpm] = useState(50);
  const [targetAccuracy, setTargetAccuracy] = useState(95);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!batchName.trim()) return;

    addBatch({
      name: batchName.trim(),
      schedule: schedule.trim() || 'Flexible Schedule',
      targetWpm,
      targetAccuracy,
      startDate,
      endDate: endDate || 'Ongoing',
      instructor: 'Prof. David Vance'
    });

    setBatchName('');
    setSchedule('');
    setShowCreateModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBatch) return;
    updateBatch(editingBatch);
    setEditingBatch(null);
  };

  // Get students enrolled in a specific batch
  const getBatchStudents = (batchId: string) => {
    return students.filter(s => s.batchId === batchId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Layers className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Instructional Batches & Cohorts
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Organize student cohorts, set collective velocity targets, schedule class sessions, and inspect rosters.
          </p>
        </div>

        <button
          id="btn-create-batch"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-600/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Cohort</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {batches.map(batch => {
          const batchStudents = getBatchStudents(batch.id);

          return (
            <div
              key={batch.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-white leading-snug">{batch.name}</h3>
                  <button
                    onClick={() => setEditingBatch(batch)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                    title="Edit Batch"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{batch.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Term: {batch.startDate} to {batch.endDate}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 rounded-2xl border border-slate-800/80 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Enrolled</span>
                    <span className="text-sm font-bold text-white font-mono">{batchStudents.length || batch.studentCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Avg Speed</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">{batch.averageWpm} WPM</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Target</span>
                    <span className="text-sm font-bold text-amber-400 font-mono">{batch.targetWpm} WPM</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Instructor: {batch.instructor}
                </span>
                <button
                  onClick={() => setSelectedBatchForDetail(batch)}
                  className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>View Roster</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE BATCH MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Batch Cohort</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Batch Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Batch Delta 2026 (Evening Accelerated)"
                  value={batchName}
                  onChange={e => setBatchName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. Mon, Wed, Fri • 4:00 PM - 5:30 PM"
                  value={schedule}
                  onChange={e => setSchedule(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Speed (WPM)</label>
                  <input
                    type="number"
                    min="20"
                    max="140"
                    value={targetWpm}
                    onChange={e => setTargetWpm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Accuracy (%)</label>
                  <input
                    type="number"
                    min="80"
                    max="100"
                    value={targetAccuracy}
                    onChange={e => setTargetAccuracy(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-md shadow-cyan-600/30"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT BATCH MODAL */}
      {editingBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Cohort Settings</h3>
              <button
                onClick={() => setEditingBatch(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Batch Name</label>
                <input
                  type="text"
                  required
                  value={editingBatch.name}
                  onChange={e => setEditingBatch({ ...editingBatch, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Schedule</label>
                <input
                  type="text"
                  value={editingBatch.schedule}
                  onChange={e => setEditingBatch({ ...editingBatch, schedule: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Speed (WPM)</label>
                  <input
                    type="number"
                    value={editingBatch.targetWpm}
                    onChange={e => setEditingBatch({ ...editingBatch, targetWpm: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Accuracy (%)</label>
                  <input
                    type="number"
                    value={editingBatch.targetAccuracy}
                    onChange={e => setEditingBatch({ ...editingBatch, targetAccuracy: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingBatch(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white shadow-md shadow-cyan-600/30"
                >
                  Save Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROSTER INSPECT MODAL */}
      {selectedBatchForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">{selectedBatchForDetail.name}</h3>
                <span className="text-xs text-slate-400">Roster & Member Metrics</span>
              </div>
              <button
                onClick={() => setSelectedBatchForDetail(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
              {getBatchStudents(selectedBatchForDetail.id).length === 0 ? (
                <p className="text-xs text-slate-500 py-8 text-center">No students currently enrolled in this batch.</p>
              ) : (
                getBatchStudents(selectedBatchForDetail.id).map(st => (
                  <div
                    key={st.id}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <span className="text-xs font-bold text-white">{st.name}</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{st.email}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400">{st.wpm} WPM</span>
                      <span className="text-[10px] text-slate-400 block">{st.accuracy}% Acc</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
