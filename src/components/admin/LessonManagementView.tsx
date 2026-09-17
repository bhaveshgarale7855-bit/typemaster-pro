import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lesson } from '../../types';
import {
  BookOpen,
  Plus,
  Edit2,
  X,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';

export const LessonManagementView: React.FC = () => {
  const { lessons, addLesson, updateLesson } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [moduleTitle, setModuleTitle] = useState('Module 1: Home Row Mastery');
  const [description, setDescription] = useState('');
  const [focusKeysStr, setFocusKeysStr] = useState('f, j');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [targetWpm, setTargetWpm] = useState(25);
  const [minAccuracy, setMinAccuracy] = useState(90);
  const [xpReward, setXpReward] = useState(60);
  const [exerciseText, setExerciseText] = useState('fff jjj fff jjj fj fj jf jf');

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !exerciseText.trim()) return;

    const keys = focusKeysStr.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);

    addLesson({
      lessonNumber: lessons.length + 1,
      moduleTitle,
      title: title.trim(),
      description: description.trim() || `Mastery drill for ${keys.join(', ').toUpperCase()}`,
      focusKeys: keys.length > 0 ? keys : ['f', 'j'],
      difficulty,
      xpReward,
      exercises: [
        {
          id: `ex-${Date.now()}-1`,
          title: `${title.trim()} Drill`,
          instructions: `Maintain rhythmic cadence and focus on anchor positioning.`,
          text: exerciseText.trim(),
          targetWpm,
          minAccuracy
        }
      ]
    });

    setTitle('');
    setDescription('');
    setExerciseText('');
    setShowAddModal(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLesson) return;
    updateLesson(editingLesson);
    setEditingLesson(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Curriculum & Lesson Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Author and organize instructional typing modules, set benchmark accuracy, and tailor practice drills.
          </p>
        </div>

        <button
          id="btn-add-lesson"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lesson</span>
        </button>
      </div>

      {/* Lessons Table */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3.5">#</th>
                <th className="px-5 py-3.5">Lesson & Module</th>
                <th className="px-5 py-3.5">Focus Keys</th>
                <th className="px-5 py-3.5">Difficulty</th>
                <th className="px-5 py-3.5">Target Speed</th>
                <th className="px-5 py-3.5">Reward</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {lessons.map(lesson => (
                <tr key={lesson.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-4 font-mono text-slate-400 font-bold">
                    {lesson.lessonNumber}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-bold text-white">{lesson.title}</div>
                    <div className="text-[10px] text-indigo-400">{lesson.moduleTitle}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1">
                      {lesson.focusKeys.map(k => (
                        <span
                          key={k}
                          className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-[10px] text-white font-bold"
                        >
                          {k.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                        lesson.difficulty === 'Beginner'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : lesson.difficulty === 'Intermediate'
                          ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                          : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      }`}
                    >
                      {lesson.difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono font-bold text-emerald-400">
                    {lesson.exercises[0]?.targetWpm || 30} WPM
                  </td>
                  <td className="px-5 py-4 font-mono text-amber-400 font-bold">
                    +{lesson.xpReward} XP
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setEditingLesson(lesson)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Edit Lesson"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD LESSON MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create New Curriculum Lesson</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Module Group</label>
                <input
                  type="text"
                  required
                  value={moduleTitle}
                  onChange={e => setModuleTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Lesson Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master the G & H Index Stretch"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Focus Keys (comma separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. g, h"
                    value={focusKeysStr}
                    onChange={e => setFocusKeysStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={e => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Speed (WPM)</label>
                  <input
                    type="number"
                    value={targetWpm}
                    onChange={e => setTargetWpm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={xpReward}
                    onChange={e => setXpReward(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Drill Practice Text</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter the exact keystroke pattern to practice..."
                  value={exerciseText}
                  onChange={e => setExerciseText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
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
                  Publish Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT LESSON MODAL */}
      {editingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Edit Lesson #{editingLesson.lessonNumber}</h3>
              <button
                onClick={() => setEditingLesson(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingLesson.title}
                  onChange={e => setEditingLesson({ ...editingLesson, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Description</label>
                <input
                  type="text"
                  value={editingLesson.description}
                  onChange={e => setEditingLesson({ ...editingLesson, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={editingLesson.difficulty}
                    onChange={e => setEditingLesson({ ...editingLesson, difficulty: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">XP Reward</label>
                  <input
                    type="number"
                    value={editingLesson.xpReward}
                    onChange={e => setEditingLesson({ ...editingLesson, xpReward: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLesson(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30"
                >
                  Save Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
