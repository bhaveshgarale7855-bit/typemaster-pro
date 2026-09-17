import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson } from '../../types';
import {
  BookOpen,
  CheckCircle2,
  Play,
  Zap,
  Target,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  Layers
} from 'lucide-react';

export const LearnTypingView: React.FC = () => {
  const { lessons, startLesson } = useApp();
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // Group lessons by moduleTitle
  const modulesMap: Record<string, Lesson[]> = {};
  lessons.forEach(l => {
    if (!modulesMap[l.moduleTitle]) {
      modulesMap[l.moduleTitle] = [];
    }
    modulesMap[l.moduleTitle].push(l);
  });

  const toggleExpand = (id: string) => {
    setExpandedLessonId(prev => (prev === id ? null : id));
  };

  const totalCompleted = lessons.filter(l => l.completed).length;
  const overallProgressPercent = Math.round((totalCompleted / lessons.length) * 100);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Curriculum & Typing Lessons
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Master the standard touch typing method from home-row fundamentals to complex symbol agility.
          </p>
        </div>

        {/* Course Progress Capsule */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-4 py-3 rounded-2xl">
          <div className="space-y-1 text-right">
            <div className="text-xs font-semibold text-slate-300">Curriculum Progress</div>
            <div className="text-sm font-mono font-black text-emerald-400">
              {totalCompleted} / {lessons.length} Lessons
            </div>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-500"
                strokeDasharray={`${overallProgressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-white">
              {overallProgressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-6">
        {Object.entries(modulesMap).map(([moduleTitle, moduleLessons], mIndex) => (
          <div
            key={moduleTitle}
            className="rounded-3xl bg-slate-900/60 border border-slate-800/80 p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {moduleTitle}
              </h2>
              <span className="text-xs text-slate-400 ml-auto">
                {moduleLessons.filter(l => l.completed).length} / {moduleLessons.length} Done
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {moduleLessons.map((lesson, lIndex) => {
                const isExpanded = expandedLessonId === lesson.id;
                return (
                  <div
                    key={lesson.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      lesson.completed
                        ? 'bg-slate-900/90 border-emerald-500/30 shadow-sm'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left info */}
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`mt-0.5 w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                            lesson.completed
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}
                        >
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            lesson.lessonNumber
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-white">
                              {lesson.title}
                            </h3>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                lesson.difficulty === 'Beginner'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : lesson.difficulty === 'Intermediate'
                                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                  : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              }`}
                            >
                              {lesson.difficulty}
                            </span>
                            <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />+{lesson.xpReward} XP
                            </span>
                          </div>

                          <p className="text-xs text-slate-400 mt-1">{lesson.description}</p>

                          {/* Focus keys tags */}
                          <div className="flex items-center gap-1.5 mt-2.5">
                            <span className="text-[11px] text-slate-500 font-medium">Focus Keys:</span>
                            <div className="flex flex-wrap gap-1">
                              {lesson.focusKeys.map(k => (
                                <span
                                  key={k}
                                  className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-slate-200 font-bold"
                                >
                                  {k === ' ' ? 'SPACE' : k.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right controls */}
                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                        {lesson.completed && (
                          <div className="text-right hidden sm:block">
                            <div className="text-xs font-mono font-bold text-emerald-400">
                              {lesson.bestWpm} WPM
                            </div>
                            <div className="text-[10px] text-slate-400">{lesson.bestAccuracy}% Acc</div>
                          </div>
                        )}

                        <button
                          onClick={() => toggleExpand(lesson.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="View exercises"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <button
                          id={`start-lesson-${lesson.id}`}
                          onClick={() => startLesson(lesson)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                            lesson.completed
                              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                          }`}
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{lesson.completed ? 'Practice Again' : 'Start Lesson'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Exercises Preview */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 bg-slate-950/40 border-t border-slate-800/80 space-y-3">
                        <h4 className="text-xs font-semibold text-slate-300">Exercises in this Lesson</h4>
                        <div className="space-y-2">
                          {lesson.exercises.map((ex, idx) => (
                            <div
                              key={ex.id}
                              className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                              <div>
                                <span className="text-xs font-bold text-white">
                                  Exercise {idx + 1}: {ex.title}
                                </span>
                                <p className="text-[11px] text-slate-400">{ex.instructions}</p>
                                <p className="font-mono text-xs text-emerald-400/90 mt-1 truncate max-w-lg bg-slate-950/60 p-1.5 rounded border border-slate-800">
                                  {ex.text}
                                </p>
                              </div>
                              <div className="text-right text-[11px] text-slate-400 font-mono whitespace-nowrap">
                                Target: {ex.targetWpm} WPM ({ex.minAccuracy}%)
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
