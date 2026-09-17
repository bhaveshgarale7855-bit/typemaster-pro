import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Zap,
  Target,
  Trophy,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Keyboard,
  Gamepad2,
  TrendingUp,
  AlertCircle,
  Play
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    lessons,
    testHistory,
    startLesson,
    startTypingTest,
    passages,
    setStudentTab,
    updateStudentGoals
  } = useApp();

  const [editingGoals, setEditingGoals] = useState(false);
  const [goalTargetWpm, setGoalTargetWpm] = useState(student.targetWpm);
  const [goalDailyMinutes, setGoalDailyMinutes] = useState(
    student.dailyGoalMinutes
  );

  // Find next incomplete lesson
  const nextLesson = lessons.find(l => !l.completed) || lessons[0];

  // Calculate weak keys from recent test history
  const keyErrorsMap: Record<string, number> = {};

  testHistory.slice(0, 5).forEach(test => {
    Object.entries(test.errorKeys || {}).forEach(([key, count]) => {
      keyErrorsMap[key] = (keyErrorsMap[key] || 0) + Number(count);
    });
  });

  const weakKeys = Object.entries(keyErrorsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([k]) => k);

  // const dailyPercent =
  //   student.dailyGoalMinutes > 0
  //     ? Math.min(
  //         100,
  //         Math.round(
  //           (student.todayMinutes / student.dailyGoalMinutes) * 100
  //         )
  //       )
  //     : 0;
  const todayMins = student?.todayMinutes || 0;
  const goalMins = student?.dailyGoalMinutes || 5;

  const dailyPercent =
    goalMins > 0
      ? Math.min(100, Math.round((todayMins / goalMins) * 100))
      : 0;


  const handleSaveGoals = (e: React.FormEvent) => {
    e.preventDefault();

    updateStudentGoals(
      goalTargetWpm,
      student.targetAccuracy,
      goalDailyMinutes
    );

    setEditingGoals(false);
  };

  return (
    <div className="space-y-6">

      {/* =====================================================
          HERO / WELCOME SECTION
          ===================================================== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border border-slate-800 shadow-xl">

        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-6 sm:p-8">

          <div className="space-y-3 max-w-2xl">

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold">
                Student Portal
              </span>

              <span className="text-xs text-slate-400">
                {student.batchName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome back,{' '}
              <span className="text-blue-400">
                {student.name}
              </span>
              !
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              You are currently on{' '}
              <strong className="text-orange-400 font-semibold">
                {student.streakDays}-day streak
              </strong>
              . Complete your daily practice to hit today's goal of{' '}
              {student.dailyGoalMinutes} minutes!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">

              <button
                id="dash-resume-lesson-btn"
                onClick={() => startLesson(nextLesson)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all duration-200 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />

                <span>
                  Resume Lesson: {nextLesson.title}
                </span>
              </button>

              <button
                id="dash-quick-test-btn"
                onClick={() => {
                  const defaultPassage = passages[0];
                  startTypingTest(defaultPassage, 60);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4 text-blue-400" />
                <span>1-Min Speed Test</span>
              </button>

            </div>
          </div>

          {/* DAILY TARGET CARD */}
          <div className="w-full lg:w-60 p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-700 shadow-lg flex flex-col items-center justify-center text-center">

            <div className="flex items-center justify-between w-full mb-2">

              <span className="text-xs font-semibold text-white">
                Daily Target
              </span>

              <button
                onClick={() => setEditingGoals(!editingGoals)}
                className="text-[11px] text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                {editingGoals ? 'Cancel' : 'Edit'}
              </button>

            </div>

            {editingGoals ? (
              <form
                onSubmit={handleSaveGoals}
                className="w-full space-y-3 mt-2"
              >

                <div>
                  <label className="text-[10px] text-slate-400 block text-left mb-1">
                    Daily Minutes
                  </label>

                  <input
                    type="number"
                    min="5"
                    max="120"
                    value={goalDailyMinutes}
                    onChange={e =>
                      setGoalDailyMinutes(Number(e.target.value))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block text-left mb-1">
                    Target WPM
                  </label>

                  <input
                    type="number"
                    min="20"
                    max="160"
                    value={goalTargetWpm}
                    onChange={e =>
                      setGoalTargetWpm(Number(e.target.value))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Save Goals
                </button>

              </form>
            ) : (
              <>
                <div className="relative w-24 h-24 my-3 flex items-center justify-center">

                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 36 36"
                  >

                    <path
                      className="text-slate-700"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                    <path
                      className="text-blue-500 transition-all duration-700 ease-out"
                      strokeDasharray={`${dailyPercent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />

                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <span className="text-lg font-black text-white">
                      {dailyPercent}%
                    </span>

                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  <strong className="text-white font-mono">
                    {student.todayMinutes}
                  </strong>{' '}
                  of{' '}
                  <strong className="text-white font-mono">
                    {student.dailyGoalMinutes}
                  </strong>{' '}
                  min completed
                </p>
              </>
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          KPI STATS
          ===================================================== */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Peak Speed */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg hover:border-blue-500/40 transition-all">

          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">

            <span>Peak Speed</span>

            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Zap className="w-4 h-4" />
            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {student.bestWpm}
            </span>

            <span className="text-xs text-slate-400 font-medium">
              WPM
            </span>

          </div>

          <p className="text-[11px] text-blue-400 mt-1">
            Target: {student.targetWpm} WPM
          </p>

        </div>


        {/* Average Speed */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg hover:border-cyan-500/40 transition-all">

          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">

            <span>Average Speed</span>

            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {student.averageWpm}
            </span>

            <span className="text-xs text-slate-400 font-medium">
              WPM
            </span>

          </div>

          <p className="text-[11px] text-cyan-400 mt-1">
            Across all sessions
          </p>

        </div>


        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg hover:border-emerald-500/40 transition-all">

          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">

            <span>Accuracy Rate</span>

            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Target className="w-4 h-4" />
            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {student.averageAccuracy}%
            </span>

          </div>

          <p className="text-[11px] text-emerald-400 mt-1">
            Goal: {student.targetAccuracy}% precision
          </p>

        </div>


        {/* Tests */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg hover:border-violet-500/40 transition-all">

          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">

            <span>Tests & Lessons</span>

            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400">
              <Trophy className="w-4 h-4" />
            </div>

          </div>

          <div className="flex items-baseline gap-2">

            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              {student.testsCompleted}
            </span>

            <span className="text-xs text-slate-400 font-medium">
              taken
            </span>

          </div>

          <p className="text-[11px] text-violet-400 mt-1">
            {student.practiceMinutes} total min logged
          </p>

        </div>

      </section>


      {/* =====================================================
          PRACTICE MODULES + RIGHT SIDEBAR
          ===================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ===================================================
            PRACTICE MODULES
            =================================================== */}
        <div className="lg:col-span-2 space-y-4">

          <div className="flex items-center justify-between">

            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Practice Modules</span>
            </h2>

            <span className="text-[11px] text-slate-500">
              Choose your next activity
            </span>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


            {/* =================================================
                1. CURRICULUM LESSONS
                ================================================= */}
            <div
              onClick={() => setStudentTab('learn')}
              className="
                group relative overflow-hidden
                p-5 rounded-2xl
                bg-gradient-to-br from-blue-50 via-white to-blue-50/70
                border border-blue-200
                shadow-sm
                hover:shadow-xl hover:shadow-blue-100
                hover:border-blue-400
                hover:-translate-y-1
                transition-all duration-200
                cursor-pointer
              "
            >

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />

              <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-200 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                <BookOpen className="w-5 h-5" />

              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                Curriculum Lessons
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Step-by-step touch typing from home row anchor
                posts to full alphanumeric fluency.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600">

                <span>View all 8 lessons</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

              </div>

            </div>


            {/* =================================================
                2. TIMED TESTS
                ================================================= */}
            <div
              onClick={() => setStudentTab('tests')}
              className="
                group relative overflow-hidden
                p-5 rounded-2xl
                bg-gradient-to-br from-cyan-50 via-white to-cyan-50/70
                border border-cyan-200
                shadow-sm
                hover:shadow-xl hover:shadow-cyan-100
                hover:border-cyan-400
                hover:-translate-y-1
                transition-all duration-200
                cursor-pointer
              "
            >

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500" />

              <div className="w-11 h-11 rounded-xl bg-cyan-100 border border-cyan-200 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                <Clock className="w-5 h-5" />

              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                Timed Tests & Exams
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                1, 2, 3, or 5-minute timed typing tests with
                official passage certification metrics.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-cyan-600">

                <span>Take a test</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

              </div>

            </div>


            {/* =================================================
                3. CUSTOM DRILLS
                ================================================= */}
            <div
              onClick={() => setStudentTab('practice')}
              className="
                group relative overflow-hidden
                p-5 rounded-2xl
                bg-gradient-to-br from-violet-50 via-white to-violet-50/70
                border border-violet-200
                shadow-sm
                hover:shadow-xl hover:shadow-violet-100
                hover:border-violet-400
                hover:-translate-y-1
                transition-all duration-200
                cursor-pointer
              "
            >

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />

              <div className="w-11 h-11 rounded-xl bg-violet-100 border border-violet-200 text-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                <Keyboard className="w-5 h-5" />

              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
                Custom Drills & Code
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Paste your own articles, drill the top 100
                common words, or practice code syntax.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-violet-600">

                <span>Configure drill</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

              </div>

            </div>


            {/* =================================================
                4. ARCADE GAMES
                ================================================= */}
            <div
              onClick={() => setStudentTab('games')}
              className="
                group relative overflow-hidden
                p-5 rounded-2xl
                bg-gradient-to-br from-orange-50 via-white to-orange-50/70
                border border-orange-200
                shadow-sm
                hover:shadow-xl hover:shadow-orange-100
                hover:border-orange-400
                hover:-translate-y-1
                transition-all duration-200
                cursor-pointer
              "
            >

              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />

              <div className="w-11 h-11 rounded-xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                <Gamepad2 className="w-5 h-5" />

              </div>

              <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                Arcade Typing Games
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Word Invaders, Speed Racer sprints, and Meteor
                Shield defense for high-reflex fun.
              </p>

              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-orange-600">

                <span>Play arcade</span>

                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            RIGHT SIDEBAR
            =================================================== */}
        <div className="space-y-6">


          {/* Problematic Keys */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">

            <div className="flex items-center justify-between mb-3">

              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">

                <AlertCircle className="w-4 h-4 text-orange-500" />

                <span>Problematic Keys</span>

              </h3>

              <span className="text-[10px] text-slate-400">
                Past 5 sessions
              </span>

            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Your fingers encountered the highest mis-stroke
              rates on these specific keys:
            </p>

            <div className="flex items-center gap-2 mb-4">

              {weakKeys.length > 0 ? (
                weakKeys.map(k => (

                  <div
                    key={k}
                    className="flex-1 py-2.5 px-2 rounded-xl bg-rose-50 border border-rose-100 text-center"
                  >

                    <span className="text-lg font-mono font-black text-rose-600">
                      {k === ' ' ? 'SPC' : k.toUpperCase()}
                    </span>

                    <span className="block text-[10px] text-rose-500 font-medium">
                      {keyErrorsMap[k]} err
                    </span>

                  </div>

                ))
              ) : (

                <p className="text-xs text-emerald-600">
                  No recurring error keys detected yet!
                </p>

              )}

            </div>

            <button
              onClick={() => setStudentTab('practice')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-xs font-semibold text-white transition-all cursor-pointer"
            >
              Start Remedial Key Drill
            </button>

          </div>


          {/* Recent Sessions */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-lg">

            <div className="flex items-center justify-between mb-4">

              <h3 className="text-sm font-bold text-white flex items-center gap-2">

                <Clock className="w-4 h-4 text-blue-400" />

                Recent Sessions

              </h3>

              <button
                onClick={() => setStudentTab('history')}
                className="text-xs text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
              >
                View all
              </button>

            </div>

            <div className="space-y-2.5">

              {testHistory.slice(0, 3).map(res => (

                <div
                  key={res.id}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors"
                >

                  <div className="min-w-0">

                    <h4 className="text-xs font-semibold text-white truncate max-w-[150px]">
                      {res.title}
                    </h4>

                    <span className="text-[10px] text-slate-500">
                      {res.date}
                    </span>

                  </div>

                  <div className="text-right ml-3">

                    <span className="text-xs font-mono font-black text-blue-400">
                      {res.netWpm} WPM
                    </span>

                    <span className="block text-[10px] text-slate-500">
                      {res.accuracy}% acc
                    </span>

                  </div>

                </div>

              ))}

              {testHistory.length === 0 && (
                <div className="py-6 text-center">

                  <p className="text-xs text-slate-500">
                    No sessions recorded yet.
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};