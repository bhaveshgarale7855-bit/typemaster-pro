import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StudentRecord } from '../../types';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Edit2,
  X,
  Mail,
  Zap,
  Target,
  Flame,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export const StudentManagementView: React.FC = () => {
  const {
    students,
    batches,
    addStudent,
    updateStudent,
    selectedStudentForDetail,
    setSelectedStudentForDetail
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatchFilter, setSelectedBatchFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');

  // Add Student Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newBatchId, setNewBatchId] = useState(batches[0]?.id || '');
  const [newStatus, setNewStatus] = useState<'Active' | 'Inactive' | 'Completed'>('Active');

  // Edit Student State
  const [editingStudent, setEditingStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter(st => {
    const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          st.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatchFilter === 'All' || st.batchId === selectedBatchFilter;
    const matchesStatus = selectedStatusFilter === 'All' || st.status === selectedStatusFilter;
    return matchesSearch && matchesBatch && matchesStatus;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const chosenBatch = batches.find(b => b.id === newBatchId) || batches[0];
    addStudent({
      name: newName.trim(),
      email: newEmail.trim(),
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      batchId: chosenBatch.id,
      batchName: chosenBatch.name,
      status: newStatus,
      joinedDate: new Date().toISOString().split('T')[0]
    });

    setNewName('');
    setNewEmail('');
    setShowAddModal(false);
  };

  const handleSaveEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent);
    if (selectedStudentForDetail?.id === editingStudent.id) {
      setSelectedStudentForDetail(editingStudent);
    }
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Student Directory & Rosters
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Enrolled learners, speed progress tracking, cohort transfers, and individual performance audits.
          </p>
        </div>

        <button
          id="btn-add-student"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Enroll New Student</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by student name or email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Batch filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium px-2">Batch:</span>
            <select
              value={selectedBatchFilter}
              onChange={e => setSelectedBatchFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
            >
              <option value="All" className="bg-slate-900 text-white">All Batches</option>
              {batches.map(b => (
                <option key={b.id} value={b.id} className="bg-slate-900 text-white">{b.name}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">
            <span className="text-[10px] text-slate-500 font-medium px-2">Status:</span>
            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
            >
              <option value="All" className="bg-slate-900 text-white">All Statuses</option>
              <option value="Active" className="bg-slate-900 text-white">Active</option>
              <option value="Inactive" className="bg-slate-900 text-white">Inactive</option>
              <option value="Completed" className="bg-slate-900 text-white">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Student</th>
                <th className="px-5 py-3.5">Batch</th>
                <th className="px-5 py-3.5">Speed (WPM)</th>
                <th className="px-5 py-3.5">Accuracy</th>
                <th className="px-5 py-3.5">Level & XP</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-slate-500">
                    No students found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(st => (
                  <tr key={st.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white">{st.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{st.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {st.batchName}
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-emerald-400 text-sm">
                      {st.wpm} WPM
                    </td>
                    <td className="px-5 py-4 font-mono">
                      {st.accuracy}%
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-amber-400">Lvl {st.level}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">{st.xp} XP</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          st.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : st.status === 'Completed'
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {st.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudentForDetail(st)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Inspect Student Progress"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingStudent(st)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STUDENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Enroll New Student</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. jordan@typemaster.edu"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Assign Batch</label>
                <select
                  value={newBatchId}
                  onChange={e => setNewBatchId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Initial Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30"
                >
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Student Details</h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEditStudent} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={editingStudent.name}
                  onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={editingStudent.email}
                  onChange={e => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Batch</label>
                <select
                  value={editingStudent.batchId}
                  onChange={e => {
                    const b = batches.find(bat => bat.id === e.target.value);
                    if (b) {
                      setEditingStudent({ ...editingStudent, batchId: b.id, batchName: b.name });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.id} className="bg-slate-900">{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Status</label>
                <select
                  value={editingStudent.status}
                  onChange={e => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT DETAIL DRAWER */}
      {selectedStudentForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudentForDetail.avatar}
                  alt={selectedStudentForDetail.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStudentForDetail.name}</h3>
                  <span className="text-xs text-slate-400">{selectedStudentForDetail.batchName}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForDetail(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Velocity</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{selectedStudentForDetail.wpm} WPM</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Accuracy</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{selectedStudentForDetail.accuracy}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Streak</span>
                <span className="text-xl font-black text-orange-400 font-mono">{selectedStudentForDetail.streak} Days</span>
              </div>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-mono">{selectedStudentForDetail.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Tests Taken:</span>
                <span className="text-white font-mono">{selectedStudentForDetail.testsTaken}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lessons Completed:</span>
                <span className="text-white font-mono">{selectedStudentForDetail.lessonsDone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Enrolled On:</span>
                <span className="text-white font-mono">{selectedStudentForDetail.joinedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Status:</span>
                <span className="text-emerald-400 font-bold">{selectedStudentForDetail.status}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setEditingStudent(selectedStudentForDetail);
                  setSelectedStudentForDetail(null);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white rounded-xl"
              >
                Edit Student Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
