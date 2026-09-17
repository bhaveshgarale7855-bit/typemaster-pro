// import React, { useEffect, useState } from 'react';
// import { useApp } from '../../context/AppContext';
// import { GCCTBCTest } from '../typing/GCCTBCTest';
// import { TypingPassage } from '../../types';
// import { GCC_PASSAGES } from '../../data/GCCPassages';
// import {
//   Clock,
//   Search,
//   Zap,
//   Play,
//   Target,
//   FileText,
//   ChevronDown,
// } from 'lucide-react';

// export const TypingTestsView: React.FC = () => {
//   const { passages, startTypingTest } = useApp();

//   const [selectedDuration, setSelectedDuration] = useState<number>(60);
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [selectedDifficulty, setSelectedDifficulty] =
//     useState<string>('All');
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   // Test mode
//   const [testMode, setTestMode] = useState<'modern' | 'gcc'>('modern');

//   // GCC-style test state
//   const [gccTargetWpm, setGccTargetWpm] = useState<30 | 40 | 50>(30);
//   const [selectedGccPassageId, setSelectedGccPassageId] =
//     useState<string>('');
//   const [gccPassage, setGccPassage] =
//     useState<TypingPassage | null>(null);

//   const categories = [
//     'All',
//     'Technology',
//     'Science',
//     'Literature',
//     'History',
//     'Business',
//   ];

//   const difficulties = [
//     'All',
//     'Easy',
//     'Medium',
//     'Hard',
//   ];

//   /*
//    * Main passage filtering.
//    * These filters are also used by the GCC-style passage selector.
//    */
//   const filteredPassages = passages.filter(p => {
//     const matchesCategory =
//       selectedCategory === 'All' ||
//       p.category.toLowerCase() === selectedCategory.toLowerCase();

//     const matchesDifficulty =
//       selectedDifficulty === 'All' ||
//       p.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

//     const matchesSearch =
//       p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.content.toLowerCase().includes(searchQuery.toLowerCase());

//     return (
//       matchesCategory &&
//       matchesDifficulty &&
//       matchesSearch
//     );
//   });

//   /*
//    * Currently selected GCC passage.
//    */
//   const selectedGccPassage =
//     GCC_PASSAGES.find(
//       p => p.id === selectedGccPassageId
//     ) ?? null;
//   /*
//    * If filters change and the selected passage is no longer
//    * available in the filtered list, clear the selection.
//    */
//   useEffect(() => {
//     if (
//       selectedGccPassageId &&
//       !GCC_PASSAGES.some(
//         p => p.id === selectedGccPassageId
//       )
//     ) {
//       setSelectedGccPassageId('');
//     }
//   }, [selectedGccPassageId]);

//   /*
//    * Modern test quick launch.
//    */
//   const launchRandomTest = () => {
//     if (passages.length === 0) return;

//     const randomPassage =
//       passages[
//       Math.floor(Math.random() * passages.length)
//       ];

//     startTypingTest(
//       randomPassage,
//       selectedDuration
//     );
//   };

//   /*
//    * Start GCC-style test with the passage
//    * selected by the user.
//    */
//   const startGccTest = () => {
//     if (!selectedGccPassage) return;

//     setGccPassage(selectedGccPassage);
//     setTestMode('gcc');
//   };

//   /*
//    * GCC test screen.
//    */
//   if (testMode === 'gcc' && gccPassage) {
//     return (
//       <GCCTBCTest
//         passage={gccPassage}
//         targetWpm={gccTargetWpm}
//         onExit={() => {
//           setGccPassage(null);
//           setTestMode('modern');
//         }}
//         onChangePassage={() => {
//           setGccPassage(null);
//           setTestMode('modern');
//         }}
//       />
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* =====================================================
//           PAGE HEADER
//       ====================================================== */}
//       <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

//           <div className="space-y-2">
//             <div className="flex items-center gap-2">
//               <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
//                 <Clock className="w-5 h-5" />
//               </span>

//               <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
//                 Typing Tests & Speed Exams
//               </h1>
//             </div>

//             <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
//               Measure your Words Per Minute (WPM), accuracy,
//               consistency, and typing performance under
//               realistic timed test conditions.
//             </p>
//           </div>

//           {/* Quick Modern Test */}
//           <button
//             id="launch-random-test-btn"
//             onClick={launchRandomTest}
//             disabled={passages.length === 0}
//             className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all self-start md:self-auto"
//           >
//             <Zap className="w-4 h-4 fill-current" />

//             <span>
//               Quick Random {selectedDuration / 60}m Exam
//             </span>
//           </button>
//         </div>
//       </div>


//       {/* =====================================================
//           GCC-TBC STYLE TEST
//       ====================================================== */}
//       <div className="p-6 rounded-3xl bg-slate-950 border border-blue-500/20 shadow-xl">

//         {/* Section Heading */}
//         <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

//           <div>
//             <div className="flex items-center gap-3">

//               <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
//                 <Target className="w-5 h-5" />
//               </div>

//               <div>
//                 <div className="flex items-center gap-2 flex-wrap">

//                   <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black">
//                     EXAM MODE
//                   </span>

//                   <h2 className="text-base sm:text-lg font-black text-white">
//                     Target Speed Test
//                   </h2>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Choose your target speed and passage,
//                   then start an exam-style typing test.
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>


//         {/* =================================================
//             TARGET WPM
//         ================================================== */}
//         <div className="mt-6">

//           <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
//             Select Target Speed
//           </label>

//           <div className="flex flex-wrap gap-2">

//             {[30, 40, 50].map(wpm => (
//               <button
//                 key={wpm}
//                 onClick={() =>
//                   setGccTargetWpm(
//                     wpm as 30 | 40 | 50
//                   )
//                 }
//                 className={`px-5 py-2.5 rounded-xl text-xs font-black border transition-all ${gccTargetWpm === wpm
//                   ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
//                   : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
//                   }`}
//               >
//                 {wpm} WPM
//               </button>
//             ))}

//           </div>

//           <p className="mt-2 text-[11px] text-slate-500">
//             Passing requires reaching your selected target
//             speed with the required accuracy.
//           </p>
//         </div>


//         {/* =================================================
//             PASSAGE SELECTOR
//         ================================================== */}
//         <div className="mt-6">

//           <label
//             htmlFor="gcc-passage-selector"
//             className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
//           >
//             Select Passage
//           </label>

//           <div className="relative">

//             <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

//             <select
//               id="gcc-passage-selector"
//               value={selectedGccPassageId}
//               onChange={e =>
//                 setSelectedGccPassageId(
//                   e.target.value
//                 )
//               }
//               disabled={filteredPassages.length === 0}
//               className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
//             >

//               <option
//                 value=""
//                 className="bg-slate-900 text-slate-400"
//               >
//                 Select a passage...
//               </option>

//               {GCC_PASSAGES.map(passage => (
//                 <option
//                   key={passage.id}
//                   value={passage.id}
//                   className="bg-slate-900 text-white"
//                 >
//                   {passage.title} • {passage.category} •{' '}
//                   {passage.difficulty} •{' '}
//                   {passage.wordCount} words
//                 </option>
//               ))}

//             </select>

//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

//           </div>

//           {/* Selected Passage Preview */}
//           {selectedGccPassage && (
//             <div className="mt-3 p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20">

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">

//                 <h3 className="text-sm font-bold text-white">
//                   {selectedGccPassage.title}
//                 </h3>

//                 <div className="flex items-center gap-2">

//                   <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold">
//                     {selectedGccPassage.category}
//                   </span>

//                   <span
//                     className={`px-2 py-1 rounded-lg text-[10px] font-bold ${selectedGccPassage.difficulty ===
//                       'Easy'
//                       ? 'bg-emerald-500/10 text-emerald-400'
//                       : selectedGccPassage.difficulty ===
//                         'Medium'
//                         ? 'bg-cyan-500/10 text-cyan-400'
//                         : 'bg-rose-500/10 text-rose-400'
//                       }`}
//                   >
//                     {selectedGccPassage.difficulty}
//                   </span>

//                 </div>

//               </div>

//               <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
//                 {selectedGccPassage.content}
//               </p>

//               <div className="mt-3 text-[10px] text-slate-500 font-mono">
//                 {selectedGccPassage.wordCount} words
//               </div>

//             </div>
//           )}

//           {/* No passages after filtering */}
//           {GCC_PASSAGES.length === 0 && (
//             <div className="mt-3 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 text-xs text-rose-300">
//               No passages are available with the current
//               search/category/difficulty filters.
//             </div>
//           )}

//         </div>


//         {/* =================================================
//             START GCC TEST
//         ================================================== */}
//         <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">

//           <div>
//             <p className="text-xs font-bold text-white">
//               Ready for your {gccTargetWpm} WPM test?
//             </p>

//             <p className="mt-1 text-[11px] text-slate-500">
//               Select a passage above to begin the test.
//             </p>
//           </div>

//           <button
//             onClick={startGccTest}
//             disabled={!selectedGccPassage}
//             className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs font-black transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none"
//           >
//             <Play className="w-4 h-4 fill-current" />
//             Start Test
//           </button>

//         </div>

//       </div>


//       {/* =====================================================
//           MODERN TEST SETUP
//       ====================================================== */}
//       <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">

//         {/* Duration Selector */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">

//           <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">

//             <Clock className="w-4 h-4 text-cyan-400" />

//             <span>
//               Select Test Duration:
//             </span>

//           </div>

//           <div className="flex flex-wrap gap-2">

//             {[
//               {
//                 label: '1 Minute',
//                 seconds: 60,
//               },
//               {
//                 label: '2 Minutes',
//                 seconds: 120,
//               },
//               {
//                 label: '3 Minutes',
//                 seconds: 180,
//               },
//               {
//                 label: '5 Minutes',
//                 seconds: 300,
//               },
//             ].map(dur => (
//               <button
//                 key={dur.seconds}
//                 onClick={() =>
//                   setSelectedDuration(
//                     dur.seconds
//                   )
//                 }
//                 className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedDuration === dur.seconds
//                   ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-2 ring-cyan-500/30'
//                   : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
//                   }`}
//               >
//                 {dur.label}
//               </button>
//             ))}

//           </div>

//         </div>


//         {/* Search & Filters */}
//         <div className="flex flex-col md:flex-row items-center gap-3">

//           {/* Search */}
//           <div className="relative flex-1 w-full">

//             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

//             <input
//               type="text"
//               placeholder="Search passages by keyword or title..."
//               value={searchQuery}
//               onChange={e =>
//                 setSearchQuery(e.target.value)
//               }
//               className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
//             />

//           </div>


//           {/* Filters */}
//           <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">

//             {/* Category */}
//             <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">

//               <span className="text-[10px] text-slate-500 font-medium px-2">
//                 Category:
//               </span>

//               <select
//                 value={selectedCategory}
//                 onChange={e =>
//                   setSelectedCategory(
//                     e.target.value
//                   )
//                 }
//                 className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
//               >

//                 {categories.map(category => (
//                   <option
//                     key={category}
//                     value={category}
//                     className="bg-slate-900 text-white"
//                   >
//                     {category}
//                   </option>
//                 ))}

//               </select>

//             </div>


//             {/* Difficulty */}
//             <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">

//               <span className="text-[10px] text-slate-500 font-medium px-2">
//                 Difficulty:
//               </span>

//               <select
//                 value={selectedDifficulty}
//                 onChange={e =>
//                   setSelectedDifficulty(
//                     e.target.value
//                   )
//                 }
//                 className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
//               >

//                 {difficulties.map(difficulty => (
//                   <option
//                     key={difficulty}
//                     value={difficulty}
//                     className="bg-slate-900 text-white"
//                   >
//                     {difficulty}
//                   </option>
//                 ))}

//               </select>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* =====================================================
//           MODERN TEST PASSAGES
//       ====================================================== */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//         {filteredPassages.length === 0 ? (

//           <div className="col-span-full p-12 text-center text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800">

//             No passages found matching your filter
//             criteria.

//           </div>

//         ) : (

//           filteredPassages.map(passage => (

//             <div
//               key={passage.id}
//               className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-sm"
//             >

//               <div className="space-y-3">

//                 <div className="flex items-center justify-between gap-2">

//                   <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
//                     {passage.category}
//                   </span>

//                   <span
//                     className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${passage.difficulty === 'Easy'
//                       ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
//                       : passage.difficulty === 'Medium'
//                         ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
//                         : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
//                       }`}
//                   >
//                     {passage.difficulty}
//                   </span>

//                 </div>


//                 <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
//                   {passage.title}
//                 </h3>


//                 <p className="text-xs text-slate-400 font-serif leading-relaxed line-clamp-3">
//                   &ldquo;
//                   {passage.content}
//                   &rdquo;
//                 </p>

//               </div>


//               <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">

//                 <span className="text-[11px] text-slate-500 font-mono">
//                   {passage.wordCount} Words
//                 </span>


//                 <button
//                   id={`start-test-${passage.id}`}
//                   onClick={() =>
//                     startTypingTest(
//                       passage,
//                       selectedDuration
//                     )
//                   }
//                   className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
//                 >

//                   <Play className="w-3.5 h-3.5 fill-current" />

//                   <span>
//                     Start {selectedDuration / 60}m Test
//                   </span>

//                 </button>

//               </div>

//             </div>

//           ))

//         )}

//       </div>

//     </div>
//   );
// };

















import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GCCTBCTest } from '../typing/GCCTBCTest';
import { TypingPassage } from '../../types';
import { getGCCPassagesByLanguage } from '../../data/GCCPassages';

import {
  Clock,
  Search,
  Zap,
  Play,
  Target,
  FileText,
  ChevronDown,
  Languages,
  Keyboard,
  CheckCircle2,
} from 'lucide-react';

export const TypingTestsView: React.FC = () => {
  const { passages, startTypingTest } = useApp();

  /* =========================================================
     MODERN TEST STATE
  ========================================================= */

  const [selectedDuration, setSelectedDuration] =
    useState<number>(60);

  const [selectedCategory, setSelectedCategory] =
    useState<string>('All');

  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>('All');

  const [searchQuery, setSearchQuery] =
    useState<string>('');

  /* =========================================================
     TEST MODE
  ========================================================= */

  const [testMode, setTestMode] =
    useState<'modern' | 'gcc'>('modern');

  /* =========================================================
     GCC-TBC TEST STATE
  ========================================================= */

  const [gccLanguage, setGccLanguage] =
    useState<'English' | 'Marathi' | 'Hindi'>('English');

  const [gccKeyboard, setGccKeyboard] =
    useState<'Remington' | 'Typewriter' | 'InScript'>(
      'Remington'
    );

  const [gccTargetWpm, setGccTargetWpm] =
    useState<30 | 40 | 50>(30);

  const [selectedGccPassageId, setSelectedGccPassageId] =
    useState<string>('');

  const [gccPassage, setGccPassage] =
    useState<TypingPassage | null>(null);

  /* =========================================================
     MODERN TEST FILTER OPTIONS
  ========================================================= */

  const categories = [
    'All',
    'Technology',
    'Science',
    'Literature',
    'History',
    'Business',
  ];

  const difficulties = [
    'All',
    'Easy',
    'Medium',
    'Hard',
  ];

  /* =========================================================
     MODERN PASSAGE FILTERING
  ========================================================= */

  const filteredPassages = passages.filter(p => {
    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() ===
      selectedCategory.toLowerCase();

    const matchesDifficulty =
      selectedDifficulty === 'All' ||
      p.difficulty.toLowerCase() ===
      selectedDifficulty.toLowerCase();

    const matchesSearch =
      p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      p.content
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return (
      matchesCategory &&
      matchesDifficulty &&
      matchesSearch
    );
  });

  /* =========================================================
     SELECTED GCC PASSAGE
  ========================================================= */

  const gccPassages = getGCCPassagesByLanguage(gccLanguage);

  const selectedGccPassage =
    gccPassages.find(
      p => p.id === selectedGccPassageId
    ) ?? null;

  /* =========================================================
     CLEAR INVALID GCC PASSAGE
  ========================================================= */

  useEffect(() => {
    setSelectedGccPassageId('');
  }, [gccLanguage]);

  /* =========================================================
     LANGUAGE CHANGE
  ========================================================= */

  const handleGccLanguageChange = (
    language: 'English' | 'Marathi' | 'Hindi'
  ) => {
    setGccLanguage(language);

    /*
     * English does not need a Marathi/Hindi keyboard
     * selection.
     *
     * We keep the keyboard state internally so when the
     * user switches back to Marathi/Hindi, the selector
     * is immediately available.
     */
    if (language === 'English') {
      setGccKeyboard('Remington');
    }
  };

  /* =========================================================
     MODERN RANDOM TEST
  ========================================================= */

  const launchRandomTest = () => {
    if (passages.length === 0) return;

    const randomPassage =
      passages[
      Math.floor(
        Math.random() * passages.length
      )
      ];

    startTypingTest(
      randomPassage,
      selectedDuration
    );
  };

  /* =========================================================
     START GCC TEST
  ========================================================= */

  const startGccTest = () => {
    if (!selectedGccPassage) return;

    setGccPassage(selectedGccPassage);
    setTestMode('gcc');
  };

  /* =========================================================
     GCC TEST SCREEN
  ========================================================= */

  if (testMode === 'gcc' && gccPassage) {
    return (
      <GCCTBCTest
        passage={gccPassage}
        targetWpm={gccTargetWpm}
        language={gccLanguage}
        keyboardType={
          gccLanguage === 'English'
            ? undefined
            : gccKeyboard
        }
        onExit={() => {
          setGccPassage(null);
          setTestMode('modern');
        }}
        onChangePassage={() => {
          setGccPassage(null);
          setTestMode('modern');
        }}
      />
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div className="space-y-2">

            <div className="flex items-center gap-2">

              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Clock className="w-5 h-5" />
              </span>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Typing Tests & Speed Exams
              </h1>

            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
              Measure your Words Per Minute (WPM),
              accuracy, consistency, and typing
              performance under realistic timed test
              conditions.
            </p>

          </div>

          {/* QUICK MODERN TEST */}

          <button
            id="launch-random-test-btn"
            onClick={launchRandomTest}
            disabled={passages.length === 0}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all self-start md:self-auto"
          >

            <Zap className="w-4 h-4 fill-current" />

            <span>
              Quick Random {selectedDuration / 60}m Exam
            </span>

          </button>

        </div>

      </div>


      {/* =====================================================
          GCC-TBC STYLE TEST
      ====================================================== */}

      <div className="p-6 rounded-3xl bg-slate-950 border border-blue-500/20 shadow-xl">

        {/* SECTION HEADING */}

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

          <div>

            <div className="flex items-center gap-3">

              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Target className="w-5 h-5" />
              </div>

              <div>

                <div className="flex items-center gap-2 flex-wrap">

                  <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black">
                    EXAM MODE
                  </span>

                  <h2 className="text-base sm:text-lg font-black text-white">
                    GCC-TBC Style Test
                  </h2>

                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Select language, keyboard layout,
                  target speed and passage before
                  starting your typing exam.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            STEP 1 — LANGUAGE
        ================================================== */}

        <div className="mt-6">

          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            1. Select Typing Language
          </label>

          <div className="flex flex-wrap gap-2">

            {(
              ['English', 'Marathi', 'Hindi'] as const
            ).map(language => (

              <button
                key={language}
                type="button"
                onClick={() =>
                  handleGccLanguageChange(language)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black border transition-all ${gccLanguage === language
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
              >

                <Languages className="w-4 h-4" />

                {language}

                {gccLanguage === language && (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}

              </button>

            ))}

          </div>

          <p className="mt-2 text-[11px] text-slate-500">
            Choose the language in which you want to
            type your exam.
          </p>

        </div>


        {/* =================================================
            STEP 2 — KEYBOARD TYPE
        ================================================== */}

        {gccLanguage !== 'English' && (

          <div className="mt-6">

            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              2. Select Keyboard Type
            </label>

            <div className="flex flex-wrap gap-2">

              {(
                [
                  'Remington',
                  'Typewriter',
                  'InScript',
                ] as const
              ).map(keyboard => (

                <button
                  key={keyboard}
                  type="button"
                  onClick={() =>
                    setGccKeyboard(keyboard)
                  }
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black border transition-all ${gccKeyboard === keyboard
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                >

                  <Keyboard className="w-4 h-4" />

                  {keyboard}

                  {gccKeyboard === keyboard && (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}

                </button>

              ))}

            </div>

            <div className="mt-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">

              <p className="text-[11px] text-slate-400 leading-relaxed">

                <span className="font-bold text-blue-400">
                  Selected:
                </span>{' '}

                {gccLanguage} — {gccKeyboard}

              </p>

              <p className="mt-1 text-[10px] text-slate-500">
                Use your physical keyboard with the
                selected layout. No virtual keyboard is
                displayed during the test.
              </p>

            </div>

          </div>

        )}


        {/* =================================================
            STEP 3 — TARGET WPM
        ================================================== */}

        <div className="mt-6">

          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">

            {gccLanguage === 'English'
              ? '2. Select Target Speed'
              : '3. Select Target Speed'}

          </label>

          <div className="flex flex-wrap gap-2">

            {[30, 40, 50].map(wpm => (

              <button
                key={wpm}
                type="button"
                onClick={() =>
                  setGccTargetWpm(
                    wpm as 30 | 40 | 50
                  )
                }
                className={`px-5 py-2.5 rounded-xl text-xs font-black border transition-all ${gccTargetWpm === wpm
                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
              >

                {wpm} WPM

              </button>

            ))}

          </div>

          <p className="mt-2 text-[11px] text-slate-500">
            Select the target speed for your typing
            examination.
          </p>

        </div>


        {/* =================================================
            STEP 4 — PASSAGE
        ================================================== */}

        <div className="mt-6">

          <label
            htmlFor="gcc-passage-selector"
            className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2"
          >

            {gccLanguage === 'English'
              ? '3. Select Passage'
              : '4. Select Passage'}

          </label>

          <div className="relative">

            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

            <select
              id="gcc-passage-selector"
              value={selectedGccPassageId}
              onChange={e =>
                setSelectedGccPassageId(
                  e.target.value
                )
              }
              disabled={gccPassages.length === 0}
              className="w-full appearance-none pl-10 pr-10 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >

              <option
                value=""
                className="bg-slate-900 text-slate-400"
              >
                Select a passage...
              </option>

              {gccPassages.map(passage => (

                <option
                  key={passage.id}
                  value={passage.id}
                  className="bg-slate-900 text-white"
                >

                  {passage.title} •{' '}
                  {passage.category} •{' '}
                  {passage.difficulty} •{' '}
                  {passage.wordCount} words

                </option>

              ))}

            </select>

            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />

          </div>


          {/* SELECTED PASSAGE PREVIEW */}

          {selectedGccPassage && (

            <div className="mt-3 p-4 rounded-2xl bg-slate-900/80 border border-blue-500/20">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">

                <h3 className="text-sm font-bold text-white">
                  {selectedGccPassage.title}
                </h3>

                <div className="flex items-center gap-2">

                  <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-[10px] font-bold">
                    {selectedGccPassage.category}
                  </span>

                  <span
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold ${selectedGccPassage.difficulty ===
                      'Easy'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : selectedGccPassage.difficulty ===
                        'Medium'
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'bg-rose-500/10 text-rose-400'
                      }`}
                  >

                    {selectedGccPassage.difficulty}

                  </span>

                </div>

              </div>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {selectedGccPassage.content}
              </p>

              <div className="mt-3 text-[10px] text-slate-500 font-mono">
                {selectedGccPassage.wordCount} words
              </div>

            </div>

          )}


          {/* NO PASSAGES */}

          {gccPassages.length === 0 && (
            <div className="mt-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300">
              No {gccLanguage} passages are available yet.
            </div>
          )}
          
        </div>


        {/* =================================================
            TEST SUMMARY
        ================================================== */}

        <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800">

          <div className="flex flex-wrap items-center gap-2">

            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Test Setup:
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold">
              {gccLanguage}
            </span>

            {gccLanguage !== 'English' && (
              <span className="px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold">
                {gccKeyboard}
              </span>
            )}

            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
              {gccTargetWpm} WPM
            </span>

            {selectedGccPassage && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Passage Selected
              </span>
            )}

          </div>

        </div>


        {/* =================================================
            START GCC TEST
        ================================================== */}

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">

          <div>

            <p className="text-xs font-bold text-white">
              Ready for your {gccTargetWpm} WPM test?
            </p>

            <p className="mt-1 text-[11px] text-slate-500">

              {gccLanguage}

              {gccLanguage !== 'English' &&
                ` • ${gccKeyboard}`}

              {' • '}
              {selectedGccPassage
                ? selectedGccPassage.title
                : 'Select a passage'}

            </p>

          </div>

          <button
            type="button"
            onClick={startGccTest}
            disabled={!selectedGccPassage}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white text-xs font-black transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none"
          >

            <Play className="w-4 h-4 fill-current" />

            Start Test

          </button>

        </div>

      </div>


      {/* =====================================================
          MODERN TEST SETUP
      ====================================================== */}

      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">

        {/* DURATION SELECTOR */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">

            <Clock className="w-4 h-4 text-cyan-400" />

            <span>
              Select Test Duration:
            </span>

          </div>

          <div className="flex flex-wrap gap-2">

            {[
              {
                label: '1 Minute',
                seconds: 60,
              },
              {
                label: '2 Minutes',
                seconds: 120,
              },
              {
                label: '3 Minutes',
                seconds: 180,
              },
              {
                label: '5 Minutes',
                seconds: 300,
              },
            ].map(dur => (

              <button
                key={dur.seconds}
                type="button"
                onClick={() =>
                  setSelectedDuration(
                    dur.seconds
                  )
                }
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${selectedDuration === dur.seconds
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 ring-2 ring-cyan-500/30'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
              >

                {dur.label}

              </button>

            ))}

          </div>

        </div>


        {/* SEARCH & FILTERS */}

        <div className="flex flex-col md:flex-row items-center gap-3">

          {/* SEARCH */}

          <div className="relative flex-1 w-full">

            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              placeholder="Search passages by keyword or title..."
              value={searchQuery}
              onChange={e =>
                setSearchQuery(
                  e.target.value
                )
              }
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
            />

          </div>


          {/* FILTERS */}

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">

            {/* CATEGORY */}

            <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">

              <span className="text-[10px] text-slate-500 font-medium px-2">
                Category:
              </span>

              <select
                value={selectedCategory}
                onChange={e =>
                  setSelectedCategory(
                    e.target.value
                  )
                }
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
              >

                {categories.map(category => (

                  <option
                    key={category}
                    value={category}
                    className="bg-slate-900 text-white"
                  >
                    {category}
                  </option>

                ))}

              </select>

            </div>


            {/* DIFFICULTY */}

            <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 p-1 rounded-xl">

              <span className="text-[10px] text-slate-500 font-medium px-2">
                Difficulty:
              </span>

              <select
                value={selectedDifficulty}
                onChange={e =>
                  setSelectedDifficulty(
                    e.target.value
                  )
                }
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer pr-2"
              >

                {difficulties.map(difficulty => (

                  <option
                    key={difficulty}
                    value={difficulty}
                    className="bg-slate-900 text-white"
                  >
                    {difficulty}
                  </option>

                ))}

              </select>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MODERN TEST PASSAGES
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {filteredPassages.length === 0 ? (

          <div className="col-span-full p-12 text-center text-slate-500 bg-slate-900/40 rounded-3xl border border-slate-800">

            No passages found matching your filter
            criteria.

          </div>

        ) : (

          filteredPassages.map(passage => (

            <div
              key={passage.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-sm"
            >

              <div className="space-y-3">

                <div className="flex items-center justify-between gap-2">

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {passage.category}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${passage.difficulty ===
                      'Easy'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : passage.difficulty ===
                        'Medium'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                  >

                    {passage.difficulty}

                  </span>

                </div>


                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {passage.title}
                </h3>


                <p className="text-xs text-slate-400 font-serif leading-relaxed line-clamp-3">

                  &ldquo;
                  {passage.content}
                  &rdquo;

                </p>

              </div>


              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">

                <span className="text-[11px] text-slate-500 font-mono">
                  {passage.wordCount} Words
                </span>


                <button
                  id={`start-test-${passage.id}`}
                  type="button"
                  onClick={() =>
                    startTypingTest(
                      passage,
                      selectedDuration
                    )
                  }
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all cursor-pointer"
                >

                  <Play className="w-3.5 h-3.5 fill-current" />

                  <span>
                    Start {selectedDuration / 60}m Test
                  </span>

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};