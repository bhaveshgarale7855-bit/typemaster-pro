import React from 'react';
import {
  User,
  Mail,
  Building2,
  Flame,
  Sparkles,
  Keyboard,
  Target,
  Trophy,
  BookOpen,
  Clock3,
  Gauge,
  Pencil,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ProfileViewProps {
  onEditProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onEditProfile,
}) => {
  const { student } = useApp();

  const xpPercent = Math.min(
    100,
    Math.round((student.xp / student.xpToNextLevel) * 100)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">

          <div className="relative shrink-0">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/10 shadow-xl"
            />

            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg bg-blue-600 border-2 border-slate-950 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
              Student Profile
            </p>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 truncate">
              {student.name}
            </h1>

            <p className="text-sm text-blue-200 mt-1">
              {student.batchName}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-white">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Level {student.level}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-400/20 text-xs font-semibold text-orange-200">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                {student.streakDays} Day Streak
              </span>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Account Information */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Account Information
            </h2>

            <p className="text-xs text-slate-500">
              Your basic account details
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <User className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Full Name
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800">
              {student.name}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Mail className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Email
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800 break-all">
              {student.email}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Building2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Batch
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800">
              {student.batchName}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Target className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                WPM Target
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800">
              {student.targetWpm} WPM
            </p>
          </div>
        </div>
      </section>

      {/* Progress */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-600" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Level Progress
              </h2>

              <p className="text-xs text-slate-500">
                Keep practicing to reach the next level
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-blue-600">
            {student.xp} / {student.xpToNextLevel} XP
          </span>
        </div>

        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-[10px] text-slate-400">
          <span>Level {student.level}</span>
          <span>{xpPercent}% complete</span>
          <span>Level {student.level + 1}</span>
        </div>
      </section>

      {/* Performance Stats */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-4 h-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900">
            Performance Overview
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <Gauge className="w-5 h-5 text-blue-600 mb-3" />

            <p className="text-2xl font-extrabold text-slate-900">
              {student.bestWpm}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Best WPM
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <Keyboard className="w-5 h-5 text-cyan-600 mb-3" />

            <p className="text-2xl font-extrabold text-slate-900">
              {student.averageWpm}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Average WPM
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <Trophy className="w-5 h-5 text-orange-500 mb-3" />

            <p className="text-2xl font-extrabold text-slate-900">
              {student.averageAccuracy}%
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Average Accuracy
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <Clock3 className="w-5 h-5 text-violet-600 mb-3" />

            <p className="text-2xl font-extrabold text-slate-900">
              {student.practiceMinutes}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Practice Minutes
            </p>
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="grid sm:grid-cols-3 gap-4">

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <Trophy className="w-5 h-5 text-blue-600 mb-3" />
          <p className="text-2xl font-extrabold text-blue-700">
            {student.testsCompleted}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Tests Completed
          </p>
        </div>

        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
          <BookOpen className="w-5 h-5 text-violet-600 mb-3" />
          <p className="text-2xl font-extrabold text-violet-700">
            {student.lessonsCompleted}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Lessons Completed
          </p>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5">
          <Flame className="w-5 h-5 text-orange-600 mb-3" />
          <p className="text-2xl font-extrabold text-orange-700">
            {student.streakDays}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Current Streak
          </p>
        </div>

      </section>
    </div>
  );
};