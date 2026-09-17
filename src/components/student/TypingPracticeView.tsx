// import React, { useState } from 'react';
// import { useApp } from '../../context/AppContext';
// import {
//   Keyboard,
//   FileText,
//   Code,
//   AlertCircle,
//   Play,
//   RotateCcw,
//   Sparkles,
//   Quote
// } from 'lucide-react';
// import { COMMON_WORDS, CODE_SNIPPETS } from '../../data/mockData';

// export const TypingPracticeView: React.FC = () => {
//   const { startTypingTest, testHistory } = useApp();

//   const [activePracticeTab, setActivePracticeTab] = useState<'custom' | 'common' | 'weak' | 'code' | 'quotes'>('common');
//   const [customText, setCustomText] = useState('');
//   const [wordCountOption, setWordCountOption] = useState<number>(30);
//   const [selectedCodeLang, setSelectedCodeLang] = useState<string>('javascript');

//   // Compute weak keys
//   const keyErrorsMap: Record<string, number> = {};
//   testHistory.forEach(test => {
//     Object.entries(test.errorKeys || {}).forEach(([key, count]) => {
//       keyErrorsMap[key] = (keyErrorsMap[key] || 0) + Number(count);
//     });
//   });
//   const weakKeys = Object.entries(keyErrorsMap)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 4)
//     .map(([k]) => k);

//   const startCustomPractice = () => {
//     if (!customText.trim()) return;
//     startTypingTest({
//       id: `custom-${Date.now()}`,
//       title: 'Custom User Passage',
//       category: 'Custom Practice',
//       difficulty: 'Medium',
//       content: customText.trim(),
//       wordCount: customText.trim().split(/\s+/).length
//     });
//   };

//   const startCommonWordsPractice = () => {
//     // Pick random subset of COMMON_WORDS
//     const shuffled = [...COMMON_WORDS].sort(() => 0.5 - Math.random());
//     const selected = shuffled.slice(0, wordCountOption).join(' ');
//     startTypingTest({
//       id: `common-${Date.now()}`,
//       title: `Top ${wordCountOption} Frequent Words`,
//       category: 'Vocabulary Drill',
//       difficulty: 'Easy',
//       content: selected,
//       wordCount: wordCountOption
//     });
//   };

//   const startWeakKeysPractice = () => {
//     const targetKeys = weakKeys.length > 0 ? weakKeys : ['p', 'q', 'z', 'x'];
//     // Generate targeted drill words
//     const drillTemplates = [
//       'quick puzzle quiz zephyr pixel quartz plaza',
//       'expect explicit express explore explain expose expanse',
//       'panama parallel parameter particle password pattern pavilion',
//       'zero zenith zigzag zombie zone zeal zest'
//     ];
//     const drillContent = drillTemplates.join(' ');
//     startTypingTest({
//       id: `weak-keys-${Date.now()}`,
//       title: `Targeted Keys Practice: [${targetKeys.join(', ').toUpperCase()}]`,
//       category: 'Remedial Drills',
//       difficulty: 'Medium',
//       content: drillContent,
//       wordCount: drillContent.split(/\s+/).length
//     });
//   };

//   const startCodePractice = () => {
//     const snippet = CODE_SNIPPETS[selectedCodeLang] || CODE_SNIPPETS['javascript'];
//     startTypingTest({
//       id: `code-${selectedCodeLang}`,
//       title: `${selectedCodeLang.toUpperCase()} Syntax Practice`,
//       category: 'Programming Code',
//       difficulty: 'Hard',
//       content: snippet,
//       wordCount: snippet.split(/\s+/).length
//     });
//   };

//   const quotes = [
//     {
//       title: 'Technology & Human Spirit',
//       author: 'Steve Jobs',
//       text: 'Technology is nothing. What is important is that you have a faith in people, that they are basically good and smart, and if you give them tools, they will do wonderful things with them.'
//     },
//     {
//       title: 'Perseverance in Craft',
//       author: 'Confucius',
//       text: 'It does not matter how slowly you go as long as you do not stop. Success depends upon previous preparation, and without such preparation there is sure to be failure.'
//     },
//     {
//       title: 'Mastery of Tools',
//       author: 'Marcus Aurelius',
//       text: 'The soul becomes dyed with the color of its thoughts. Confine yourself to the present. Very little is needed to make a happy life; it is all within yourself in your way of thinking.'
//     }
//   ];

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="space-y-1">
//           <div className="flex items-center gap-2">
//             <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
//               <Keyboard className="w-5 h-5" />
//             </span>
//             <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
//               Typing Practice & Custom Drills
//             </h1>
//           </div>
//           <p className="text-xs sm:text-sm text-slate-400">
//             Tailor your typing sessions with custom text inputs, high-frequency word lists, and code syntax drills.
//           </p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
//         <button
//           onClick={() => setActivePracticeTab('common')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
//             activePracticeTab === 'common'
//               ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
//               : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
//           }`}
//         >
//           <FileText className="w-4 h-4" />
//           <span>Common Words</span>
//         </button>

//         <button
//           onClick={() => setActivePracticeTab('weak')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
//             activePracticeTab === 'weak'
//               ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
//               : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
//           }`}
//         >
//           <AlertCircle className="w-4 h-4" />
//           <span>Problem Keys Remedial</span>
//         </button>

//         <button
//           onClick={() => setActivePracticeTab('code')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
//             activePracticeTab === 'code'
//               ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
//               : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
//           }`}
//         >
//           <Code className="w-4 h-4" />
//           <span>Code Syntax</span>
//         </button>

//         <button
//           onClick={() => setActivePracticeTab('quotes')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
//             activePracticeTab === 'quotes'
//               ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
//               : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
//           }`}
//         >
//           <Quote className="w-4 h-4" />
//           <span>Inspiring Quotes</span>
//         </button>

//         <button
//           onClick={() => setActivePracticeTab('custom')}
//           className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
//             activePracticeTab === 'custom'
//               ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
//               : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
//           }`}
//         >
//           <Sparkles className="w-4 h-4" />
//           <span>Custom Text</span>
//         </button>
//       </div>

//       {/* Tab Panels */}
//       <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
//         {/* COMMON WORDS TAB */}
//         {activePracticeTab === 'common' && (
//           <div className="space-y-6 max-w-2xl">
//             <div>
//               <h2 className="text-lg font-bold text-white">High-Frequency English Words</h2>
//               <p className="text-xs text-slate-400 mt-1">
//                 The top 200 words make up over 50% of all written English. Muscle memory here yields immediate speed breakthroughs.
//               </p>
//             </div>

//             <div className="space-y-2">
//               <label className="text-xs font-semibold text-slate-300">Word Count Selection</label>
//               <div className="flex gap-3">
//                 {[15, 30, 60, 100].map(count => (
//                   <button
//                     key={count}
//                     onClick={() => setWordCountOption(count)}
//                     className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
//                       wordCountOption === count
//                         ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 ring-2 ring-purple-500/30'
//                         : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
//                     }`}
//                   >
//                     {count} Words
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
//               <span className="text-[11px] font-semibold text-slate-400 block mb-2">Sample Preview:</span>
//               <p className="font-mono text-xs text-slate-300 leading-relaxed">
//                 the of and to a in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when
//               </p>
//             </div>

//             <button
//               id="start-common-practice-btn"
//               onClick={startCommonWordsPractice}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//             >
//               <Play className="w-4 h-4 fill-current" />
//               <span>Launch Common Words Drill</span>
//             </button>
//           </div>
//         )}

//         {/* WEAK KEYS TAB */}
//         {activePracticeTab === 'weak' && (
//           <div className="space-y-6 max-w-2xl">
//             <div>
//               <h2 className="text-lg font-bold text-white">Targeted Problem Keys Remedial</h2>
//               <p className="text-xs text-slate-400 mt-1">
//                 Intensive drills specifically isolating characters where your hands consistently stutter or mistype.
//               </p>
//             </div>

//             <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
//               <span className="text-xs font-semibold text-slate-300 block mb-2">Detected Miss Keys:</span>
//               <div className="flex gap-2">
//                 {(weakKeys.length > 0 ? weakKeys : ['p', 'q', 'z', 'x']).map(k => (
//                   <span
//                     key={k}
//                     className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 font-mono font-black text-rose-300 text-sm"
//                   >
//                     {k.toUpperCase()}
//                   </span>
//                 ))}
//               </div>
//               <p className="text-[11px] text-slate-400 mt-3">
//                 This custom generated drill contains repetitive permutations like quiz, puzzle, pixel, quartz, parallel, and zero to reinforce anchor transitions.
//               </p>
//             </div>

//             <button
//               id="start-weak-practice-btn"
//               onClick={startWeakKeysPractice}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//             >
//               <Play className="w-4 h-4 fill-current" />
//               <span>Launch Weak Keys Drill</span>
//             </button>
//           </div>
//         )}

//         {/* CODE SYNTAX TAB */}
//         {activePracticeTab === 'code' && (
//           <div className="space-y-6 max-w-3xl">
//             <div>
//               <h2 className="text-lg font-bold text-white">Programming Code Syntax</h2>
//               <p className="text-xs text-slate-400 mt-1">
//                 Develop muscle memory for brackets, braces, parentheses, camelCase, and language-specific operators.
//               </p>
//             </div>

//             <div className="flex gap-2">
//               {[
//                 { id: 'javascript', label: 'JavaScript' },
//                 { id: 'python', label: 'Python' },
//                 { id: 'html', label: 'HTML / JSX' }
//               ].map(lang => (
//                 <button
//                   key={lang.id}
//                   onClick={() => setSelectedCodeLang(lang.id)}
//                   className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
//                     selectedCodeLang === lang.id
//                       ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
//                       : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
//                   }`}
//                 >
//                   {lang.label}
//                 </button>
//               ))}
//             </div>

//             <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed">
//               {CODE_SNIPPETS[selectedCodeLang] || CODE_SNIPPETS['javascript']}
//             </div>

//             <button
//               id="start-code-practice-btn"
//               onClick={startCodePractice}
//               className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//             >
//               <Play className="w-4 h-4 fill-current" />
//               <span>Practice {selectedCodeLang.toUpperCase()} Code</span>
//             </button>
//           </div>
//         )}

//         {/* INSPIRING QUOTES TAB */}
//         {activePracticeTab === 'quotes' && (
//           <div className="space-y-4 max-w-3xl">
//             <div>
//               <h2 className="text-lg font-bold text-white">Famous Quotes & Literature</h2>
//               <p className="text-xs text-slate-400 mt-1">
//                 Type timeless excerpts from literature, philosophy, and history.
//               </p>
//             </div>

//             <div className="grid grid-cols-1 gap-4">
//               {quotes.map((q, idx) => (
//                 <div
//                   key={idx}
//                   className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
//                 >
//                   <div className="space-y-1">
//                     <div className="flex items-center gap-2">
//                       <span className="text-xs font-bold text-white">{q.title}</span>
//                       <span className="text-[10px] text-slate-500">— {q.author}</span>
//                     </div>
//                     <p className="text-xs font-serif text-slate-300 italic line-clamp-2">
//                       &ldquo;{q.text}&rdquo;
//                     </p>
//                   </div>
//                   <button
//                     onClick={() =>
//                       startTypingTest({
//                         id: `quote-${idx}`,
//                         title: q.title,
//                         category: 'Quotes',
//                         difficulty: 'Medium',
//                         content: q.text,
//                         wordCount: q.text.split(/\s+/).length
//                       })
//                     }
//                     className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 whitespace-nowrap"
//                   >
//                     Type This Quote
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* CUSTOM TEXT TAB */}
//         {activePracticeTab === 'custom' && (
//           <div className="space-y-4 max-w-2xl">
//             <div>
//               <h2 className="text-lg font-bold text-white">Custom Text Input</h2>
//               <p className="text-xs text-slate-400 mt-1">
//                 Paste any article, document, or custom homework text you want to train on.
//               </p>
//             </div>

//             <textarea
//               id="custom-practice-textarea"
//               rows={6}
//               value={customText}
//               onChange={e => setCustomText(e.target.value)}
//               placeholder="Paste or write your custom practice text here (e.g. an essay, poem, or vocabulary list)..."
//               className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
//             />

//             <div className="flex items-center justify-between">
//               <span className="text-xs text-slate-500 font-mono">
//                 {customText.trim() ? customText.trim().split(/\s+/).length : 0} words
//               </span>
//               <button
//                 id="start-custom-text-btn"
//                 disabled={!customText.trim()}
//                 onClick={startCustomPractice}
//                 className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
//               >
//                 <Play className="w-4 h-4 fill-current" />
//                 <span>Start Custom Practice</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };























import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Keyboard,
  FileText,
  Code,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  Quote
} from 'lucide-react';
import { COMMON_WORDS, CODE_SNIPPETS } from '../../data/mockData';

// Fallback snippets in case mockData is missing keys or empty
const DEFAULT_SNIPPETS: Record<string, string> = {
  javascript: `const calculateWpm = (chars, timeInSec) => {\n  return Math.round((chars / 5) / (timeInSec / 60));\n};`,
  python: `def calculate_wpm(chars, seconds):\n    return round((chars / 5) / (seconds / 60))`,
  html: `<div className="flex items-center justify-between p-4 bg-slate-900">\n  <button onClick={handleClick}>Submit</button>\n</div>`
};

export const TypingPracticeView: React.FC = () => {
  const { startTypingTest, testHistory } = useApp();

  const [activePracticeTab, setActivePracticeTab] = useState<'custom' | 'common' | 'weak' | 'code' | 'quotes'>('common');
  const [customText, setCustomText] = useState('');
  const [wordCountOption, setWordCountOption] = useState<number>(30);
  const [selectedCodeLang, setSelectedCodeLang] = useState<string>('javascript');

  // Compute weak keys
  const keyErrorsMap: Record<string, number> = {};
  testHistory.forEach(test => {
    Object.entries(test.errorKeys || {}).forEach(([key, count]) => {
      keyErrorsMap[key] = (keyErrorsMap[key] || 0) + Number(count);
    });
  });
  const weakKeys = Object.entries(keyErrorsMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([k]) => k);

  // Helper function to resolve code snippet safely
  const getCodeSnippet = (lang: string): string => {
    const val = CODE_SNIPPETS?.[lang] || CODE_SNIPPETS?.[lang.toUpperCase()] || CODE_SNIPPETS?.[lang.toLowerCase()];
    if (typeof val === 'string' && val.trim()) return val;
    if (Array.isArray(val) && val.length > 0) return val.join('\n');
    return DEFAULT_SNIPPETS[lang] || DEFAULT_SNIPPETS['javascript'];
  };

  const currentCodeSnippet = getCodeSnippet(selectedCodeLang);

  const startCustomPractice = () => {
    if (!customText.trim()) return;
    startTypingTest({
      id: `custom-${Date.now()}`,
      title: 'Custom User Passage',
      category: 'Custom Practice',
      difficulty: 'Medium',
      content: customText.trim(),
      wordCount: customText.trim().split(/\s+/).length
    });
  };

  const startCommonWordsPractice = () => {
    // Pick random subset of COMMON_WORDS
    const shuffled = [...COMMON_WORDS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, wordCountOption).join(' ');
    startTypingTest({
      id: `common-${Date.now()}`,
      title: `Top ${wordCountOption} Frequent Words`,
      category: 'Vocabulary Drill',
      difficulty: 'Easy',
      content: selected,
      wordCount: wordCountOption
    });
  };

  const startWeakKeysPractice = () => {
    const targetKeys = weakKeys.length > 0 ? weakKeys : ['p', 'q', 'z', 'x'];
    // Generate targeted drill words
    const drillTemplates = [
      'quick puzzle quiz zephyr pixel quartz plaza',
      'expect explicit express explore explain expose expanse',
      'panama parallel parameter particle password pattern pavilion',
      'zero zenith zigzag zombie zone zeal zest'
    ];
    const drillContent = drillTemplates.join(' ');
    startTypingTest({
      id: `weak-keys-${Date.now()}`,
      title: `Targeted Keys Practice: [${targetKeys.join(', ').toUpperCase()}]`,
      category: 'Remedial Drills',
      difficulty: 'Medium',
      content: drillContent,
      wordCount: drillContent.split(/\s+/).length
    });
  };

  const startCodePractice = () => {
    const snippet = currentCodeSnippet;
    startTypingTest({
      id: `code-${selectedCodeLang}`,
      title: `${selectedCodeLang.toUpperCase()} Syntax Practice`,
      category: 'Programming Code',
      difficulty: 'Hard',
      content: snippet,
      wordCount: snippet.split(/\s+/).length
    });
  };

  const quotes = [
    {
      title: 'Technology & Human Spirit',
      author: 'Steve Jobs',
      text: 'Technology is nothing. What is important is that you have a faith in people, that they are basically good and smart, and if you give them tools, they will do wonderful things with them.'
    },
    {
      title: 'Perseverance in Craft',
      author: 'Confucius',
      text: 'It does not matter how slowly you go as long as you do not stop. Success depends upon previous preparation, and without such preparation there is sure to be failure.'
    },
    {
      title: 'Mastery of Tools',
      author: 'Marcus Aurelius',
      text: 'The soul becomes dyed with the color of its thoughts. Confine yourself to the present. Very little is needed to make a happy life; it is all within yourself in your way of thinking.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Keyboard className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Typing Practice & Custom Drills
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Tailor your typing sessions with custom text inputs, high-frequency word lists, and code syntax drills.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActivePracticeTab('common')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePracticeTab === 'common'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Common Words</span>
        </button>

        <button
          onClick={() => setActivePracticeTab('weak')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePracticeTab === 'weak'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Problem Keys Remedial</span>
        </button>

        <button
          onClick={() => setActivePracticeTab('code')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePracticeTab === 'code'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Code Syntax</span>
        </button>

        <button
          onClick={() => setActivePracticeTab('quotes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePracticeTab === 'quotes'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Quote className="w-4 h-4" />
          <span>Inspiring Quotes</span>
        </button>

        <button
          onClick={() => setActivePracticeTab('custom')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePracticeTab === 'custom'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Custom Text</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8">
        {/* COMMON WORDS TAB */}
        {activePracticeTab === 'common' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-white">High-Frequency English Words</h2>
              <p className="text-xs text-slate-400 mt-1">
                The top 200 words make up over 50% of all written English. Muscle memory here yields immediate speed breakthroughs.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Word Count Selection</label>
              <div className="flex gap-3">
                {[15, 30, 60, 100].map(count => (
                  <button
                    key={count}
                    onClick={() => setWordCountOption(count)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                      wordCountOption === count
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 ring-2 ring-purple-500/30'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {count} Words
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">Sample Preview:</span>
              <p className="font-mono text-xs text-slate-300 leading-relaxed">
                the of and to a in is you that it he was for on are as with his they I at be this have from or one had by word but not what all were we when
              </p>
            </div>

            <button
              id="start-common-practice-btn"
              onClick={startCommonWordsPractice}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Common Words Drill</span>
            </button>
          </div>
        )}

        {/* WEAK KEYS TAB */}
        {activePracticeTab === 'weak' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-white">Targeted Problem Keys Remedial</h2>
              <p className="text-xs text-slate-400 mt-1">
                Intensive drills specifically isolating characters where your hands consistently stutter or mistype.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-2">Detected Miss Keys:</span>
              <div className="flex gap-2">
                {(weakKeys.length > 0 ? weakKeys : ['p', 'q', 'z', 'x']).map(k => (
                  <span
                    key={k}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 font-mono font-black text-rose-300 text-sm"
                  >
                    {k.toUpperCase()}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 mt-3">
                This custom generated drill contains repetitive permutations like quiz, puzzle, pixel, quartz, parallel, and zero to reinforce anchor transitions.
              </p>
            </div>

            <button
              id="start-weak-practice-btn"
              onClick={startWeakKeysPractice}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Weak Keys Drill</span>
            </button>
          </div>
        )}

        {/* CODE SYNTAX TAB */}
        {activePracticeTab === 'code' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-white">Programming Code Syntax</h2>
              <p className="text-xs text-slate-400 mt-1">
                Develop muscle memory for brackets, braces, parentheses, camelCase, and language-specific operators.
              </p>
            </div>

            <div className="flex gap-2">
              {[
                { id: 'javascript', label: 'JavaScript' },
                { id: 'python', label: 'Python' },
                { id: 'html', label: 'HTML / JSX' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedCodeLang(lang.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedCodeLang === lang.id
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed min-h-[70px] flex items-center">
              <code>{currentCodeSnippet}</code>
            </div>

            <button
              id="start-code-practice-btn"
              onClick={startCodePractice}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Practice {selectedCodeLang.toUpperCase()} Code</span>
            </button>
          </div>
        )}

        {/* INSPIRING QUOTES TAB */}
        {activePracticeTab === 'quotes' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <h2 className="text-lg font-bold text-white">Famous Quotes & Literature</h2>
              <p className="text-xs text-slate-400 mt-1">
                Type timeless excerpts from literature, philosophy, and history.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{q.title}</span>
                      <span className="text-[10px] text-slate-500">— {q.author}</span>
                    </div>
                    <p className="text-xs font-serif text-slate-300 italic line-clamp-2">
                      &ldquo;{q.text}&rdquo;
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      startTypingTest({
                        id: `quote-${idx}`,
                        title: q.title,
                        category: 'Quotes',
                        difficulty: 'Medium',
                        content: q.text,
                        wordCount: q.text.split(/\s+/).length
                      })
                    }
                    className="self-start sm:self-center px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 whitespace-nowrap"
                  >
                    Type This Quote
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CUSTOM TEXT TAB */}
        {activePracticeTab === 'custom' && (
          <div className="space-y-4 max-w-2xl">
            <div>
              <h2 className="text-lg font-bold text-white">Custom Text Input</h2>
              <p className="text-xs text-slate-400 mt-1">
                Paste any article, document, or custom homework text you want to train on.
              </p>
            </div>

            <textarea
              id="custom-practice-textarea"
              rows={6}
              value={customText}
              onChange={e => setCustomText(e.target.value)}
              placeholder="Paste or write your custom practice text here (e.g. an essay, poem, or vocabulary list)..."
              className="w-full rounded-2xl bg-slate-950/80 border border-slate-800 p-4 font-mono text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                {customText.trim() ? customText.trim().split(/\s+/).length : 0} words
              </span>
              <button
                id="start-custom-text-btn"
                disabled={!customText.trim()}
                onClick={startCustomPractice}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start Custom Practice</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};