import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  Target,
  Zap,
  CheckCircle2,
  Play,
  Layers,
  Sparkles,
  Send
} from 'lucide-react';

export const TestCreatorView: React.FC = () => {
  const { batches, addPassage, addAssignment, startTypingTest, setAdminTab } = useApp();

  const [testTitle, setTestTitle] = useState('');
  const [testCategory, setTestCategory] = useState('Technology');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [durationSeconds, setDurationSeconds] = useState(60);
  const [targetWpm, setTargetWpm] = useState(45);
  const [minAccuracy, setMinAccuracy] = useState(95);
  const [testContent, setTestContent] = useState('');
  const [assignBatchId, setAssignBatchId] = useState(batches[0]?.id || '');
  const [deployAsAssignment, setDeployAsAssignment] = useState(true);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const wordCount = testContent.trim() ? testContent.trim().split(/\s+/).length : 0;
  const charCount = testContent.length;

  const handleCreateAndDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testTitle.trim() || !testContent.trim()) return;

    // 1. Add to passage library
    addPassage({
      title: testTitle.trim(),
      category: testCategory,
      difficulty,
      content: testContent.trim()
    });

    // 2. If assignment checkbox is on, deploy assignment
    if (deployAsAssignment) {
      const targetBatch = batches.find(b => b.id === assignBatchId) || batches[0];
      addAssignment({
        batchId: targetBatch.id,
        batchName: targetBatch.name,
        title: testTitle.trim(),
        targetWpm,
        targetAccuracy: minAccuracy,
        dueDate,
        passageId: `pass-${Date.now()}`
      });
    }

    setSuccessMessage(`Test "${testTitle}" was successfully created and deployed!`);
    setTimeout(() => {
      setSuccessMessage(null);
      setAdminTab('admin-assignments');
    }, 1500);
  };

  const handleTestDrive = () => {
    if (!testContent.trim()) return;
    startTypingTest(
      {
        id: `preview-${Date.now()}`,
        title: testTitle || 'Preview Exam',
        category: testCategory,
        difficulty,
        content: testContent.trim(),
        wordCount
      },
      durationSeconds
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Test Creator & Speed Exam Studio
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Craft official timed examinations, configure velocity pass-criteria, and deploy directly to student cohorts.
          </p>
        </div>

        {testContent.trim() && (
          <button
            type="button"
            onClick={handleTestDrive}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start md:self-auto"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-current" />
            <span>Test Drive Live</span>
          </button>
        )}
      </div>

      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Creator Form */}
      <form onSubmit={handleCreateAndDeploy} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-lg space-y-6">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
            1. Examination Information & Classification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Test Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Midterm Benchmark: Cloud Infrastructure"
                value={testTitle}
                onChange={e => setTestTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Content Domain
              </label>
              <select
                value={testCategory}
                onChange={e => setTestCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Literature">Literature</option>
                <option value="Business">Business</option>
                <option value="History">History</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Timed Duration
              </label>
              <select
                value={durationSeconds}
                onChange={e => setDurationSeconds(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              >
                <option value={60}>1 Minute (60s)</option>
                <option value={120}>2 Minutes (120s)</option>
                <option value={180}>3 Minutes (180s)</option>
                <option value={300}>5 Minutes (300s)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Benchmark Passing WPM
              </label>
              <input
                type="number"
                min="15"
                max="140"
                value={targetWpm}
                onChange={e => setTargetWpm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Minimum Accuracy (%)
              </label>
              <input
                type="number"
                min="80"
                max="100"
                value={minAccuracy}
                onChange={e => setMinAccuracy(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>

          {/* Test Text Area */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-300">
                Examination Source Passage
              </label>
              <div className="text-[11px] text-slate-400 font-mono space-x-2">
                <span>{wordCount} Words</span>
                <span>•</span>
                <span>{charCount} Characters</span>
              </div>
            </div>
            <textarea
              rows={6}
              required
              placeholder="Paste or draft the complete official examination text here..."
              value={testContent}
              onChange={e => setTestContent(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Assignment Deployment Option */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="deploy-checkbox"
                checked={deployAsAssignment}
                onChange={e => setDeployAsAssignment(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-500 bg-slate-950 border-slate-700"
              />
              <label htmlFor="deploy-checkbox" className="text-xs font-bold text-white cursor-pointer">
                Automatically deploy as homework / exam assignment to a student batch
              </label>
            </div>

            {deployAsAssignment && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Select Target Batch
                  </label>
                  <select
                    value={assignBatchId}
                    onChange={e => setAssignBatchId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Submission Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Save & Publish Examination</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
