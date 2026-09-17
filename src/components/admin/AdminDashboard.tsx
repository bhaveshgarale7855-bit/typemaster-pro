import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Layers,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    teacher,
    students,
    batches,
    assignments,
    setAdminTab,
    setSelectedBatchForDetail,
    setSelectedStudentForDetail,
  } = useApp();

  const totalStudents = students.length;

  const activeBatches = batches.length;

  const avgInstitutionWpm = Math.round(
    students.reduce((acc, s) => acc + s.wpm, 0) / (totalStudents || 1)
  );

  const avgInstitutionAccuracy = Math.round(
    students.reduce((acc, s) => acc + s.accuracy, 0) /
      (totalStudents || 1)
  );

  const pendingAssignments = assignments.filter(
    (a) => a.status === 'Active'
  );

  return (
    <div className="space-y-6">
      {/* =====================================================
          INSTRUCTOR HERO
          ===================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/70 p-6 sm:p-8 shadow-xl">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-7 md:flex-row md:items-center">
          {/* Hero Content */}
          <div className="max-w-2xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Instructor Portal
              </span>

              <span className="text-xs text-slate-400">
                {teacher.institution}
              </span>
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Instructor Dashboard:{' '}
              <span className="text-blue-400">
                {teacher.name}
              </span>
            </h1>

            <p className="max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              Monitoring{' '}
              <span className="font-semibold text-slate-200">
                {totalStudents} enrolled typists
              </span>{' '}
              across{' '}
              <span className="font-semibold text-slate-200">
                {activeBatches} active instructional cohorts
              </span>
              . Overall class speed benchmark is pacing at{' '}
              <span className="font-semibold text-blue-400">
                {avgInstitutionWpm} WPM
              </span>
              .
            </p>

            {/* Hero Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="admin-quick-add-student"
                onClick={() => setAdminTab('admin-students')}
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 sm:text-sm"
              >
                <Plus className="h-4 w-4" />
                <span>Enroll New Student</span>
              </button>

              <button
                id="admin-quick-add-assignment"
                onClick={() => setAdminTab('admin-assignments')}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:border-blue-500/40 hover:bg-slate-700 sm:text-sm"
              >
                <FileText className="h-4 w-4 text-blue-400" />
                <span>Create Batch Assignment</span>
              </button>

              <button
                id="admin-quick-test-creator"
                onClick={() => setAdminTab('admin-tests')}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all hover:border-blue-500/40 hover:bg-slate-700 sm:text-sm"
              >
                <Plus className="h-4 w-4 text-cyan-400" />
                <span>Test Creator</span>
              </button>
            </div>
          </div>

          {/* Active Term Snapshot */}
          <div className="w-full min-w-56 rounded-2xl border border-slate-700 bg-slate-950/80 p-4 shadow-lg md:w-auto">
            <div className="mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-200">
                Active Term Snapshot
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-8 text-xs">
                <span className="text-slate-400">
                  Class Avg Speed:
                </span>
                <span className="font-mono font-bold text-emerald-400">
                  {avgInstitutionWpm} WPM
                </span>
              </div>

              <div className="flex items-center justify-between gap-8 text-xs">
                <span className="text-slate-400">
                  Class Avg Accuracy:
                </span>
                <span className="font-mono font-bold text-cyan-400">
                  {avgInstitutionAccuracy}%
                </span>
              </div>

              <div className="flex items-center justify-between gap-8 text-xs">
                <span className="text-slate-400">
                  Active Assignments:
                </span>
                <span className="font-mono font-bold text-amber-400">
                  {pendingAssignments.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          KPI CARDS
          ===================================================== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* Students */}
        <div
          onClick={() => setAdminTab('admin-students')}
          className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-md transition-all hover:-translate-y-0.5 hover:border-blue-500/50 hover:shadow-lg"
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Enrolled Students</span>

            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400 transition-transform group-hover:scale-110">
              <Users className="h-4 w-4" />
            </div>
          </div>

          <div className="font-mono text-3xl font-black text-white">
            {totalStudents}
          </div>

          <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <span>All active learners</span>
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>

        {/* Batches */}
        <div
          onClick={() => setAdminTab('admin-batches')}
          className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-md transition-all hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-lg"
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Instructional Batches</span>

            <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400 transition-transform group-hover:scale-110">
              <Layers className="h-4 w-4" />
            </div>
          </div>

          <div className="font-mono text-3xl font-black text-white">
            {activeBatches}
          </div>

          <p className="mt-1 flex items-center gap-1 text-[11px] text-cyan-400">
            <span>Manage cohorts</span>
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>

        {/* Assignments */}
        <div
          onClick={() => setAdminTab('admin-assignments')}
          className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-md transition-all hover:-translate-y-0.5 hover:border-amber-500/50 hover:shadow-lg"
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Active Assignments</span>

            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-400 transition-transform group-hover:scale-110">
              <FileText className="h-4 w-4" />
            </div>
          </div>

          <div className="font-mono text-3xl font-black text-white">
            {pendingAssignments.length}
          </div>

          <p className="mt-1 flex items-center gap-1 text-[11px] text-amber-400">
            <span>Track submissions</span>
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>

        {/* Reports */}
        <div
          onClick={() => setAdminTab('admin-reports')}
          className="group cursor-pointer rounded-2xl border border-slate-800 bg-slate-950 p-5 shadow-md transition-all hover:-translate-y-0.5 hover:border-emerald-500/50 hover:shadow-lg"
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
            <span>Reports & Exports</span>

            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-transform group-hover:scale-110">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>

          <div className="font-mono text-3xl font-black text-white">
            100%
          </div>

          <p className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <span>Audit gradebooks</span>
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>
      </div>

      {/* =====================================================
          BATCHES + STUDENTS
          ===================================================== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Active Batches */}
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <Layers className="h-4 w-4 text-blue-400" />
              <span>Active Instructional Batches</span>
            </h3>

            <button
              onClick={() => setAdminTab('admin-batches')}
              className="cursor-pointer text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {batches.map((batch) => (
              <div
                key={batch.id}
                onClick={() => {
                  setSelectedBatchForDetail(batch);
                  setAdminTab('admin-batches');
                }}
                className="flex cursor-pointer flex-col justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-all hover:border-blue-500/40 hover:bg-slate-900 sm:flex-row sm:items-center"
              >
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {batch.name}
                  </h4>

                  <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{batch.schedule}</span>
                    <span>•</span>
                    <span>{batch.studentCount} Students</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {batch.averageWpm} WPM
                    </span>

                    <span className="block text-[10px] text-slate-500">
                      Cohort Avg
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {batch.averageAccuracy}%
                    </span>

                    <span className="block text-[10px] text-slate-500">
                      Accuracy
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Standouts */}
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-white">
              <Users className="h-4 w-4 text-cyan-400" />
              <span>Student Cohort Leaders & Standouts</span>
            </h3>

            <button
              onClick={() => setAdminTab('admin-students')}
              className="cursor-pointer text-xs font-semibold text-blue-400 hover:text-blue-300 hover:underline"
            >
              Manage Students
            </button>
          </div>

          <div className="space-y-3">
            {students.slice(0, 4).map((st) => (
              <div
                key={st.id}
                onClick={() => {
                  setSelectedStudentForDetail(st);
                  setAdminTab('admin-students');
                }}
                className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-3.5 transition-all hover:border-blue-500/40 hover:bg-slate-900"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="h-9 w-9 rounded-full border border-slate-700 object-cover"
                  />

                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {st.name}
                    </h4>

                    <span className="text-[10px] text-slate-400">
                      {st.batchName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {st.wpm} WPM
                    </span>

                    <span className="block text-[10px] text-slate-500">
                      {st.accuracy}% Acc
                    </span>
                  </div>

                  <span
                    className={`rounded border px-2 py-0.5 text-[10px] font-bold ${
                      st.status === 'Active'
                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                        : 'border-slate-700 bg-slate-800 text-slate-400'
                    }`}
                  >
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};