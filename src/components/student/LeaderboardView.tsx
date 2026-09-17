import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Flame,
  Medal,
  Crown,
  Search,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { leaderboard, student } = useApp();
  const [scope, setScope] = useState<'global' | 'batch'>('global');
  const [search, setSearch] = useState('');

  const filtered = leaderboard.filter(entry => {
    const entryBatch = entry.batchName || entry.batch;
    const matchesScope = scope === 'global' || entryBatch === student.batchName;
    const matchesSearch = entry.name.toLowerCase().includes(search.toLowerCase());
    return matchesScope && matchesSearch;
  });

  const top3 = filtered.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Typing Leaderboard & Standings
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Compare your typing velocity, accuracy precision, and consistency against peers academy-wide.
          </p>
        </div>

        {/* Global vs Batch Filter */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-950/70 border border-slate-800 rounded-2xl self-start md:self-auto">
          <button
            onClick={() => setScope('global')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              scope === 'global'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Global Academy
          </button>
          <button
            onClick={() => setScope('batch')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              scope === 'batch'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Batch Only
          </button>
        </div>
      </div>

      {/* Podium Top 3 */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {/* 2nd Place (Silver) */}
          <div className="order-2 md:order-1 p-6 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-slate-300/20 border-2 border-slate-300 text-slate-300 flex items-center justify-center font-bold text-base mb-3 shadow-md">
              🥈 2nd
            </div>
            <img
              src={top3[1].avatar}
              alt={top3[1].name}
              className="w-16 h-16 rounded-full border-2 border-slate-400 object-cover mb-2"
            />
            <h3 className="text-base font-bold text-white">{top3[1].name}</h3>
            <span className="text-xs text-slate-400">{top3[1].batchName || top3[1].batch || 'Academy'}</span>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl font-black text-emerald-400 font-mono">{top3[1].wpm} WPM</span>
              <span className="text-xs text-slate-400">{top3[1].accuracy}% Acc</span>
            </div>
          </div>

          {/* 1st Place (Gold Champion) */}
          <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-amber-500/10 to-slate-900 border-2 border-amber-500/40 shadow-xl shadow-amber-500/10 flex flex-col items-center text-center relative overflow-hidden transform md:-translate-y-2">
            <div className="absolute top-2 right-2 text-amber-400">
              <Crown className="w-6 h-6 animate-bounce" />
            </div>
            <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg mb-3 shadow-lg shadow-amber-500/30">
              🥇 1st
            </div>
            <img
              src={top3[0].avatar}
              alt={top3[0].name}
              className="w-20 h-20 rounded-full ring-4 ring-amber-400 object-cover mb-2"
            />
            <h3 className="text-lg font-black text-white">{top3[0].name}</h3>
            <span className="text-xs text-amber-400/90 font-semibold">{top3[0].batchName || top3[0].batch || 'Academy'}</span>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-black text-amber-400 font-mono">{top3[0].wpm} WPM</span>
              <span className="text-xs text-slate-300 font-medium">{top3[0].accuracy}% Acc</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-orange-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-current" /> {top3[0].streak ?? 14} Day Streak
            </div>
          </div>

          {/* 3rd Place (Bronze) */}
          <div className="order-3 p-6 rounded-3xl bg-slate-900/90 border border-amber-800/60 shadow-lg flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-12 h-12 rounded-full bg-amber-700/30 border-2 border-amber-700 text-amber-500 flex items-center justify-center font-bold text-base mb-3 shadow-md">
              🥉 3rd
            </div>
            <img
              src={top3[2].avatar}
              alt={top3[2].name}
              className="w-16 h-16 rounded-full border-2 border-amber-700 object-cover mb-2"
            />
            <h3 className="text-base font-bold text-white">{top3[2].name}</h3>
            <span className="text-xs text-slate-400">{top3[2].batchName || top3[2].batch || 'Academy'}</span>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl font-black text-emerald-400 font-mono">{top3[2].wpm} WPM</span>
              <span className="text-xs text-slate-400">{top3[2].accuracy}% Acc</span>
            </div>
          </div>
        </div>
      )}

      {/* Rankings Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search typist..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} Competitors</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3.5">Rank</th>
                <th className="px-5 py-3.5">Typist</th>
                <th className="px-5 py-3.5">Batch</th>
                <th className="px-5 py-3.5">Net WPM</th>
                <th className="px-5 py-3.5">Accuracy</th>
                <th className="px-5 py-3.5">Streak</th>
                <th className="px-5 py-3.5 text-right">XP Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.map(entry => {
                const isCurrentUser = entry.name.toLowerCase().includes('alex rivera');

                return (
                  <tr
                    key={entry.rank}
                    className={`transition-colors ${
                      isCurrentUser
                        ? 'bg-emerald-500/10 border-l-4 border-l-emerald-400 font-semibold'
                        : 'hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-5 py-4 font-mono font-bold">
                      {entry.rank <= 3 ? (
                        <span className="text-sm">
                          {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                        </span>
                      ) : (
                        `#${entry.rank}`
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <span className={`font-bold ${isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                            {entry.name}
                          </span>
                          {isCurrentUser && (
                            <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                              You
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-400">
                      {entry.batchName || entry.batch || 'Academy'}
                    </td>
                    <td className="px-5 py-4 font-mono font-black text-emerald-400 text-sm">
                      {entry.wpm} WPM
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-300">
                      {entry.accuracy}%
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-orange-400 font-semibold">
                        <Flame className="w-3.5 h-3.5 fill-current" />
                        {entry.streak ?? 1}d
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-amber-400 font-bold">
                      {(entry.xp ?? (entry.level * 400 + entry.testsCompleted * 50)).toLocaleString()} XP
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
