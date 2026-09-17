import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Star,
  Zap,
  Target,
  Flame,
  Clock
} from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, student } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  const filtered = achievements.filter(a => {
    if (selectedFilter === 'unlocked') return a.unlocked;
    if (selectedFilter === 'locked') return !a.unlocked;
    return true;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Speed':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'Accuracy':
        return <Target className="w-5 h-5 text-cyan-400" />;
      case 'Consistency':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Milestones':
        return <Award className="w-5 h-5 text-purple-400" />;
      default:
        return <Trophy className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Badges & Achievements
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Unlock achievements by increasing your typing speed, maintaining accuracy streaks, and mastering lessons.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 px-5 py-3 rounded-2xl">
          <div className="text-right">
            <span className="text-xs font-semibold text-slate-300 block">Total Unlocked</span>
            <span className="text-base font-mono font-black text-amber-400">
              {unlockedCount} / {achievements.length} Badges
            </span>
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
                className="text-amber-500 transition-all duration-500"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold text-white">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'unlocked', 'locked'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedFilter === tab
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab} Badges
          </button>
        ))}
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(ach => {
          const itemProgress = Math.min(100, Math.round((ach.currentValue / ach.requirementValue) * 100));

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                ach.unlocked
                  ? 'bg-slate-900/90 border-amber-500/30 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 opacity-75'
              }`}
            >
              {ach.unlocked && (
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                  <div className="absolute transform rotate-45 bg-amber-500 text-slate-950 text-[9px] font-black py-0.5 right-[-35px] top-[18px] w-[120px] text-center shadow-xs">
                    EARNED
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                      ach.unlocked
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-md shadow-amber-500/10'
                        : 'bg-slate-800/60 border-slate-700 text-slate-500'
                    }`}
                  >
                    {ach.unlocked ? getCategoryIcon(ach.category) : <Lock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">{ach.category}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">{ach.description}</p>
              </div>

              {/* Bottom Progress & Reward */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    {ach.unlocked ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Unlocked on {ach.unlockedAt}
                      </span>
                    ) : (
                      <span>Progress: {ach.currentValue} / {ach.requirementValue}</span>
                    )}
                  </span>
                  <span className="font-semibold text-amber-400 flex items-center gap-1 font-mono">
                    <Sparkles className="w-3 h-3" />+{ach.xpReward} XP
                  </span>
                </div>

                {!ach.unlocked && (
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${itemProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
