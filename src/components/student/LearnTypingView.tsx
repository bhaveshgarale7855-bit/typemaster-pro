// import React, { useState } from 'react';
// import { useApp } from '../../context/AppContext';
// import { Lesson } from '../../types';
// import {
//   BookOpen,
//   CheckCircle2,
//   Play,
//   Zap,
//   Target,
//   Sparkles,
//   ChevronDown,
//   ChevronUp,
//   Award,
//   Layers
// } from 'lucide-react';

// export const LearnTypingView: React.FC = () => {
//   const { lessons, startLesson } = useApp();
//   const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

//   // Group lessons by moduleTitle
//   const modulesMap: Record<string, Lesson[]> = {};
//   lessons.forEach(l => {
//     if (!modulesMap[l.moduleTitle]) {
//       modulesMap[l.moduleTitle] = [];
//     }
//     modulesMap[l.moduleTitle].push(l);
//   });

//   const toggleExpand = (id: string) => {
//     setExpandedLessonId(prev => (prev === id ? null : id));
//   };

//   const totalCompleted = lessons.filter(l => l.completed).length;
//   const overallProgressPercent = Math.round((totalCompleted / lessons.length) * 100);

//   return (
//     <div className="space-y-6">
//       {/* Top Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
//               <BookOpen className="w-5 h-5" />
//             </span>
//             <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
//               Curriculum & Typing Lessons
//             </h1>
//           </div>
//           <p className="text-xs sm:text-sm text-slate-400">
//             Master the standard touch typing method from home-row fundamentals to complex symbol agility.
//           </p>
//         </div>

//         {/* Course Progress Capsule */}
//         <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-4 py-3 rounded-2xl">
//           <div className="space-y-1 text-right">
//             <div className="text-xs font-semibold text-slate-300">Curriculum Progress</div>
//             <div className="text-sm font-mono font-black text-emerald-400">
//               {totalCompleted} / {lessons.length} Lessons
//             </div>
//           </div>
//           <div className="w-12 h-12 relative flex items-center justify-center">
//             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
//               <path
//                 className="text-slate-800"
//                 strokeWidth="3.5"
//                 stroke="currentColor"
//                 fill="none"
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//               />
//               <path
//                 className="text-emerald-500 transition-all duration-500"
//                 strokeDasharray={`${overallProgressPercent}, 100`}
//                 strokeWidth="3.5"
//                 strokeLinecap="round"
//                 stroke="currentColor"
//                 fill="none"
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//               />
//             </svg>
//             <span className="absolute text-[11px] font-bold text-white">
//               {overallProgressPercent}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Modules List */}
//       <div className="space-y-6">
//         {Object.entries(modulesMap).map(([moduleTitle, moduleLessons], mIndex) => (
//           <div
//             key={moduleTitle}
//             className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 space-y-4"
//           >
//             <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
//               <Layers className="w-5 h-5 text-emerald-400" />
//               <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
//                 {moduleTitle}
//               </h2>
//               <span className="text-xs text-slate-400 ml-auto">
//                 {moduleLessons.filter(l => l.completed).length} / {moduleLessons.length} Done
//               </span>
//             </div>

//             <div className="grid grid-cols-1 gap-3">
//               {moduleLessons.map((lesson, lIndex) => {
//                 const isExpanded = expandedLessonId === lesson.id;
//                 return (
//                   <div
//                     key={lesson.id}
//                     className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
//                       lesson.completed
//                         ? 'bg-slate-900/90 border-emerald-500/30 shadow-sm'
//                         : 'bg-slate-900 border-slate-800 hover:border-slate-700'
//                     }`}
//                   >
//                     <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                       {/* Left info */}
//                       <div className="flex items-start gap-3.5">
//                         <div
//                           className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
//                             lesson.completed
//                               ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
//                               : 'bg-slate-800 text-slate-400 border border-slate-700'
//                           }`}
//                         >
//                           {lesson.completed ? (
//                             <CheckCircle2 className="w-4 h-4" />
//                           ) : (
//                             lesson.lessonNumber
//                           )}
//                         </div>

//                         <div>
//                           <div className="flex flex-wrap items-center gap-2">
//                             <h3 className="text-sm sm:text-base font-bold text-white">
//                               {lesson.title}
//                             </h3>
//                             <span
//                               className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
//                                 lesson.difficulty === 'Beginner'
//                                   ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
//                                   : lesson.difficulty === 'Intermediate'
//                                   ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
//                                   : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
//                               }`}
//                             >
//                               {lesson.difficulty}
//                             </span>
//                             <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
//                               <Sparkles className="w-3 h-3" />+{lesson.xpReward} XP
//                             </span>
//                           </div>

//                           <p className="text-xs text-slate-400 mt-1">{lesson.description}</p>

//                           {/* Focus keys tags */}
//                           <div className="flex items-center gap-1.5 mt-2.5">
//                             <span className="text-[11px] text-slate-500 font-medium">Focus Keys:</span>
//                             <div className="flex flex-wrap gap-1">
//                               {lesson.focusKeys.map(k => (
//                                 <span
//                                   key={k}
//                                   className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-200 font-bold"
//                                 >
//                                   {k === ' ' ? 'SPACE' : k.toUpperCase()}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Right controls */}
//                       <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
//                         {lesson.completed && (
//                           <div className="text-right hidden sm:block">
//                             <div className="text-xs font-mono font-bold text-emerald-400">
//                               {lesson.bestWpm} WPM
//                             </div>
//                             <div className="text-[10px] text-slate-400">{lesson.bestAccuracy}% Acc</div>
//                           </div>
//                         )}

//                         <button
//                           onClick={() => toggleExpand(lesson.id)}
//                           className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
//                           title="View exercises"
//                         >
//                           {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
//                         </button>

//                         <button
//                           id={`start-lesson-${lesson.id}`}
//                           onClick={() => startLesson(lesson)}
//                           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
//                             lesson.completed
//                               ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
//                               : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
//                           }`}
//                         >
//                           <Play className="w-3.5 h-3.5 fill-current" />
//                           <span>{lesson.completed ? 'Practice Again' : 'Start Lesson'}</span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Expandable Exercises Preview */}
//                     {isExpanded && (
//                       <div className="px-5 pb-5 pt-2 bg-slate-950/40 border-t border-slate-800/80 space-y-3">
//                         <h4 className="text-xs font-semibold text-slate-300">Exercises in this Lesson</h4>
//                         <div className="space-y-2">
//                           {lesson.exercises.map((ex, idx) => (
//                             <div
//                               key={ex.id}
//                               className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
//                             >
//                               <div>
//                                 <span className="text-xs font-bold text-white">
//                                   Exercise {idx + 1}: {ex.title}
//                                 </span>
//                                 <p className="text-[11px] text-slate-400">{ex.instructions}</p>
//                                 <p className="font-mono text-xs text-emerald-400/90 mt-1 truncate max-w-lg bg-slate-950/60 p-1.5 rounded border border-slate-800">
//                                   {ex.text}
//                                 </p>
//                               </div>
//                               <div className="text-right text-[11px] text-slate-400 font-mono whitespace-nowrap">
//                                 Target: {ex.targetWpm} WPM ({ex.minAccuracy}%)
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };















import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Play,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  Search,
  Clock3,
  Filter,
  RotateCcw,
  Trophy,
  GraduationCap,
  ArrowRight,
  Keyboard,
} from 'lucide-react';

type LessonFilter = 'all' | 'incomplete' | 'completed';

export const LearnTypingView: React.FC = () => {
  const { lessons, startLesson } = useApp();

  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(
    null
  );
  const [activeFilter, setActiveFilter] = useState<LessonFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Course statistics
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const remainingLessons = totalLessons - completedLessons;

  const progressPercent =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  // Find the next lesson to recommend
  const nextLesson = lessons.find((lesson) => !lesson.completed);

  // Filter and search lessons
  const filteredLessons = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return lessons.filter((lesson) => {
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'completed' && lesson.completed) ||
        (activeFilter === 'incomplete' && !lesson.completed);

      const matchesSearch =
        !query ||
        lesson.title.toLowerCase().includes(query) ||
        lesson.description.toLowerCase().includes(query) ||
        lesson.moduleTitle.toLowerCase().includes(query) ||
        lesson.focusKeys.some((key) =>
          (key === ' ' ? 'space' : key).toLowerCase().includes(query)
        );

      return matchesFilter && matchesSearch;
    });
  }, [lessons, activeFilter, searchQuery]);

  // Group visible lessons by module
  const modules = useMemo(() => {
    const grouped: Record<string, Lesson[]> = {};

    filteredLessons.forEach((lesson) => {
      if (!grouped[lesson.moduleTitle]) {
        grouped[lesson.moduleTitle] = [];
      }

      grouped[lesson.moduleTitle].push(lesson);
    });

    return Object.entries(grouped);
  }, [filteredLessons]);

  const toggleExpand = (id: string) => {
    setExpandedLessonId((previous) => (previous === id ? null : id));
  };

  const handleStartLesson = (lesson: Lesson) => {
    startLesson(lesson);
  };

  const filterOptions: {
    id: LessonFilter;
    label: string;
    count: number;
  }[] = [
    {
      id: 'all',
      label: 'All Lessons',
      count: totalLessons,
    },
    {
      id: 'incomplete',
      label: 'To Learn',
      count: remainingLessons,
    },
    {
      id: 'completed',
      label: 'Completed',
      count: completedLessons,
    },
  ];

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Intermediate':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      default:
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 pb-8">
      {/* Page heading */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="min-w-0 space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-400">
              <GraduationCap className="h-4 w-4" />
              YOUR LEARNING PATH
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Learn Touch Typing
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Build muscle memory, improve accuracy, and increase your
                typing speed one lesson at a time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Keyboard className="h-4 w-4 text-emerald-400" />
                Guided practice
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="inline-flex items-center gap-1.5">
                <Target className="h-4 w-4 text-blue-400" />
                Accuracy first
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-400" />
                Earn XP
              </span>
            </div>
          </div>

          {/* Overall course progress */}
          <div className="w-full shrink-0 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 sm:p-5 lg:w-72">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-slate-300">
                Course progress
              </span>
              <span className="text-lg font-black text-emerald-400">
                {progressPercent}%
              </span>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800"
              role="progressbar"
              aria-label="Course completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>
                {completedLessons} of {totalLessons} completed
              </span>
              <span>{remainingLessons} left</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">
              Total lessons
            </p>
            <p className="mt-1 text-2xl font-black text-white">
              {totalLessons}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">
              Lessons completed
            </p>
            <p className="mt-1 text-2xl font-black text-white">
              {completedLessons}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-400">
              Still to learn
            </p>
            <p className="mt-1 text-2xl font-black text-white">
              {remainingLessons}
            </p>
          </div>
        </div>
      </section>

      {/* Continue learning card */}
      {nextLesson && (
        <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-10 -top-12 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Pick up where you left off
                </p>
                <h2 className="mt-1 break-words text-lg font-extrabold text-white">
                  {nextLesson.title}
                </h2>
                <p className="mt-1 text-sm leading-5 text-slate-400">
                  {nextLesson.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${getDifficultyStyles(
                      nextLesson.difficulty
                    )}`}
                  >
                    {nextLesson.difficulty}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    {nextLesson.xpReward} XP reward
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleStartLesson(nextLesson)}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-950/30 transition-colors hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Continue lesson
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      )}

      {/* All lessons completed */}
      {totalLessons > 0 && completedLessons === totalLessons && (
        <section className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <Award className="h-6 w-6 shrink-0 text-emerald-400" />
          <div>
            <h2 className="font-bold text-white">
              Congratulations! Course completed.
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-400">
              You have completed every lesson. Choose any completed lesson
              below to practise again and keep improving.
            </p>
          </div>
        </section>
      )}

      {/* Lesson library */}
      <section className="space-y-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-emerald-400" />
              <h2 className="text-xl font-extrabold text-white">
                Your lessons
              </h2>
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Choose a lesson or review its exercises before starting.
            </p>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            {filteredLessons.length} of {totalLessons} lessons shown
          </span>
        </div>

        {/* Search and filters */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 sm:p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search lessons, modules or focus keys..."
              aria-label="Search lessons"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-10 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </span>

            {filterOptions.map((option) => {
              const isActive = activeFilter === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveFilter(option.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-colors ${
                    isActive
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                      : 'border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-white'
                  }`}
                >
                  {option.label}
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {option.count}
                  </span>
                </button>
              );
            })}

            {(activeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="ml-auto inline-flex items-center gap-1.5 px-2 py-2 text-xs font-semibold text-slate-400 transition hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredLessons.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 px-5 py-12 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-600" />
            <h3 className="mt-3 font-bold text-white">
              No lessons found
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Try another search or choose a different filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              Show all lessons
            </button>
          </div>
        )}

        {/* Module groups */}
        <div className="space-y-5">
          {modules.map(([moduleTitle, moduleLessons], moduleIndex) => {
            const moduleCompleted = moduleLessons.filter(
              (lesson) => lesson.completed
            ).length;

            return (
              <div
                key={moduleTitle}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70"
              >
                {/* Module heading */}
                <div className="border-b border-slate-800 bg-slate-900/80 p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Layers className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Module {moduleIndex + 1}
                      </p>
                      <h3 className="break-words text-sm font-extrabold text-white sm:text-base">
                        {moduleTitle}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[10px] font-bold text-slate-400 sm:text-xs">
                      {moduleCompleted}/{moduleLessons.length}
                    </span>
                  </div>

                  <div
                    className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800"
                    aria-label={`${moduleTitle} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${
                          moduleLessons.length > 0
                            ? (moduleCompleted / moduleLessons.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Lesson cards */}
                <div className="space-y-3 p-3 sm:p-4">
                  {moduleLessons.map((lesson) => {
                    const isExpanded = expandedLessonId === lesson.id;

                    return (
                      <article
                        key={lesson.id}
                        className={`overflow-hidden rounded-2xl border transition-colors ${
                          lesson.completed
                            ? 'border-emerald-500/20 bg-emerald-500/[0.025]'
                            : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="p-4 sm:p-5">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                            {/* Lesson number */}
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-black ${
                                lesson.completed
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : 'border border-slate-700 bg-slate-900 text-slate-300'
                              }`}
                            >
                              {lesson.completed ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                lesson.lessonNumber
                              )}
                            </div>

                            {/* Lesson information */}
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="break-words text-sm font-extrabold text-white sm:text-base">
                                  {lesson.title}
                                </h4>

                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${getDifficultyStyles(
                                    lesson.difficulty
                                  )}`}
                                >
                                  {lesson.difficulty}
                                </span>

                                {lesson.completed && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Completed
                                  </span>
                                )}
                              </div>

                              <p className="mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm">
                                {lesson.description}
                              </p>

                              {/* Focus keys */}
                              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                <span className="mr-1 text-[10px] font-semibold text-slate-500">
                                  Focus keys
                                </span>

                                {lesson.focusKeys.map((key, index) => (
                                  <span
                                    key={`${lesson.id}-${key}-${index}`}
                                    className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-[10px] font-bold text-slate-200"
                                  >
                                    {key === ' ' ? 'SPACE' : key.toUpperCase()}
                                  </span>
                                ))}
                              </div>

                              {/* Lesson stats */}
                              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
                                <span className="inline-flex items-center gap-1 text-amber-400">
                                  <Sparkles className="h-3.5 w-3.5" />
                                  +{lesson.xpReward} XP
                                </span>

                                {lesson.completed && (
                                  <>
                                    <span className="inline-flex items-center gap-1 text-emerald-400">
                                      <Target className="h-3.5 w-3.5" />
                                      Best: {lesson.bestWpm} WPM
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-slate-400">
                                      <Award className="h-3.5 w-3.5" />
                                      {lesson.bestAccuracy}% accuracy
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Lesson actions */}
                            <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                              <button
                                type="button"
                                onClick={() => toggleExpand(lesson.id)}
                                aria-expanded={isExpanded}
                                aria-label={`${
                                  isExpanded ? 'Hide' : 'View'
                                } exercises for ${lesson.title}`}
                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 transition hover:border-slate-600 hover:text-white"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                                <span className="sm:hidden">
                                  {isExpanded ? 'Hide' : 'Exercises'}
                                </span>
                              </button>

                              <button
                                id={`start-lesson-${lesson.id}`}
                                type="button"
                                onClick={() => handleStartLesson(lesson)}
                                className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-extrabold transition focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:flex-none ${
                                  lesson.completed
                                    ? 'border border-slate-700 bg-slate-800 text-white hover:bg-slate-700'
                                    : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950/30 hover:bg-emerald-400'
                                }`}
                              >
                                {lesson.completed ? (
                                  <RotateCcw className="h-3.5 w-3.5" />
                                ) : (
                                  <Play className="h-3.5 w-3.5 fill-current" />
                                )}
                                <span>
                                  {lesson.completed ? 'Practise again' : 'Start lesson'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Expandable exercise preview */}
                        {isExpanded && (
                          <div className="space-y-3 border-t border-slate-800 bg-slate-900/60 p-4 sm:p-5">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <h5 className="text-sm font-bold text-white">
                                  Lesson exercises
                                </h5>
                                <p className="mt-1 text-xs text-slate-400">
                                  Review the exercises before you begin.
                                </p>
                              </div>

                              <span className="shrink-0 rounded-lg bg-slate-800 px-2.5 py-1.5 text-[10px] font-bold text-slate-300">
                                {lesson.exercises.length}{' '}
                                {lesson.exercises.length === 1
                                  ? 'exercise'
                                  : 'exercises'}
                              </span>
                            </div>

                            {lesson.exercises.length > 0 ? (
                              <div className="space-y-2">
                                {lesson.exercises.map((exercise, index) => (
                                  <div
                                    key={exercise.id}
                                    className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 sm:p-4"
                                  >
                                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                      <div className="min-w-0">
                                        <p className="text-xs font-bold text-white sm:text-sm">
                                          <span className="mr-2 text-emerald-400">
                                            {String(index + 1).padStart(2, '0')}
                                          </span>
                                          {exercise.title}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-400">
                                          {exercise.instructions}
                                        </p>
                                      </div>

                                      <div className="flex shrink-0 flex-wrap items-center gap-2 text-[10px] font-semibold">
                                        <span className="rounded-md bg-blue-500/10 px-2 py-1 text-blue-300">
                                          {exercise.targetWpm} WPM target
                                        </span>
                                        <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-300">
                                          {exercise.minAccuracy}% accuracy
                                        </span>
                                      </div>
                                    </div>

                                    <div className="mt-3 overflow-hidden rounded-lg border border-slate-800 bg-black/20 p-3">
                                      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                        Practice text
                                      </p>
                                      <p className="break-words font-mono text-xs leading-6 text-emerald-300">
                                        {exercise.text}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="rounded-xl border border-dashed border-slate-700 p-4 text-center text-xs text-slate-400">
                                No exercises are available for this lesson yet.
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={() => handleStartLesson(lesson)}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
                            >
                              <Play className="h-3.5 w-3.5 fill-current" />
                              Start this lesson
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning reminder */}
      {totalLessons > 0 && remainingLessons > 0 && (
        <footer className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <Clock3 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">
              Consistency beats speed
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              Focus on accuracy first. Practise regularly and let your speed
              improve naturally as your muscle memory develops.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};
