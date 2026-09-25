// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useApp } from '../../context/AppContext';
// import { VirtualKeyboard } from '../common/VirtualKeyboard';
// import { TestResultModal } from './TestResultModal';
// import { soundManager } from '../../utils/audio';
// import { TestResult } from '../../types';
// import {
//   RotateCcw,
//   Pause,
//   Play,
//   LogOut,
//   Keyboard as KeyboardIcon,
//   Zap,
//   Target,
//   Clock,
//   CheckCircle,
//   Eye,
//   EyeOff
// } from 'lucide-react';

// interface TypingEngineProps {
//   title: string;
//   sourceText: string;
//   type: 'lesson' | 'test' | 'practice' | 'assignment';
//   timeLimitSeconds?: number; // if set, counts down
//   targetWpm?: number;
//   minAccuracy?: number;
//   onExit: () => void;
//   onNextLesson?: () => void;
//   hasNextLesson?: boolean;
// }

// export const TypingEngine: React.FC<TypingEngineProps> = ({
//   title,
//   sourceText,
//   type,
//   timeLimitSeconds,
//   targetWpm = 30,
//   minAccuracy = 90,
//   onExit,
//   onNextLesson,
//   hasNextLesson = false
// }) => {
//   const { recordTestResult } = useApp();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [typedChars, setTypedChars] = useState<{ char: string; isCorrect: boolean }[]>([]);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [isFinished, setIsFinished] = useState(false);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [lastPressedKey, setLastPressedKey] = useState<string>('');
//   const [isLastKeyError, setIsLastKeyError] = useState<boolean>(false);
//   const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
//   const [errorKeysMap, setErrorKeysMap] = useState<Record<string, number>>({});
//   const [finalResult, setFinalResult] = useState<TestResult | null>(null);

//   const containerRef = useRef<HTMLDivElement>(null);
//   const textDisplayRef = useRef<HTMLDivElement>(null);
//   const activeCharRef = useRef<HTMLSpanElement>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);

//   // Time remaining if timed test
//   const timeRemaining = timeLimitSeconds ? Math.max(0, timeLimitSeconds - elapsedSeconds) : 0;

//   // Real-time metrics
//   const totalKeystrokes = typedChars.length;
//   const correctKeystrokes = typedChars.filter(c => c.isCorrect).length;
//   const errorCount = totalKeystrokes - correctKeystrokes;
//   const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

//   const effectiveMinutes = Math.max(1 / 60, elapsedSeconds / 60);
//   const grossWpm = Math.round((totalKeystrokes / 5) / effectiveMinutes);
//   const netWpm = Math.max(0, Math.round((correctKeystrokes / 5) / effectiveMinutes));

//   // Auto-scroll the text container so active char stays vertically centered
//   useEffect(() => {
//     if (activeCharRef.current && textDisplayRef.current) {
//       const charTop = activeCharRef.current.offsetTop;
//       const containerHeight = textDisplayRef.current.clientHeight;
//       textDisplayRef.current.scrollTop = charTop - containerHeight / 2 + 30;
//     }
//   }, [currentIndex]);

//   // Focus keeper
//   useEffect(() => {
//     containerRef.current?.focus();
//   }, []);

//   // // Timer runner
//   // useEffect(() => {
//   //   if (isRunning && !isPaused && !isFinished) {
//   //     timerRef.current = setInterval(() => {
//   //       setElapsedSeconds(prev => {
//   //         const next = prev + 1;
//   //         if (timeLimitSeconds && next >= timeLimitSeconds) {
//   //           handleComplete(next);
//   //         }
//   //         return next;
//   //       });
//   //     }, 1000);
//   //   } else {
//   //     if (timerRef.current) clearInterval(timerRef.current);
//   //   }
//   //   return () => {
//   //     if (timerRef.current) clearInterval(timerRef.current);
//   //   };
//   // }, [isRunning, isPaused, isFinished, timeLimitSeconds]);
//   // Timer runner
//   useEffect(() => {
//     if (isRunning && !isPaused && !isFinished) {
//       timerRef.current = setInterval(() => {
//         setElapsedSeconds(prev => prev + 1);
//       }, 1000);
//     } else {
//       if (timerRef.current) clearInterval(timerRef.current);
//     }

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isRunning, isPaused, isFinished]);



//   // const handleComplete = useCallback((finalSeconds?: number) => {
//   //   setIsFinished(true);
//   //   setIsRunning(false);
//   //   if (timerRef.current) clearInterval(timerRef.current);

//   //   const dur = finalSeconds ?? Math.max(1, elapsedSeconds);
//   //   const minTime = Math.max(1 / 60, dur / 60);
//   //   const finalGross = Math.round((totalKeystrokes / 5) / minTime);
//   //   const finalNet = Math.max(0, Math.round((correctKeystrokes / 5) / minTime));
//   //   const finalAcc = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

//   //   // XP calculation
//   //   const baseMultiplier = type === 'test' ? 2.5 : 1.8;
//   //   const speedBonus = Math.floor(finalNet * 1.5);
//   //   const accBonus = finalAcc >= 95 ? 50 : 20;
//   //   const earnedXp = Math.max(20, Math.round((speedBonus + accBonus) * baseMultiplier));

//   //   soundManager.playSuccess();

//   //   const result = recordTestResult({
//   //     title,
//   //     type,
//   //     durationSeconds: dur,
//   //     grossWpm: finalGross,
//   //     netWpm: finalNet,
//   //     accuracy: finalAcc,
//   //     totalKeystrokes,
//   //     correctKeystrokes,
//   //     errorCount,
//   //     consistencyScore: Math.min(99, Math.max(70, Math.round(100 - (errorCount * 2)))),
//   //     errorKeys: errorKeysMap,
//   //     xpEarned: earnedXp
//   //   });

//   //   setFinalResult(result);
//   // }, [elapsedSeconds, totalKeystrokes, correctKeystrokes, errorCount, errorKeysMap, recordTestResult, title, type]);
//   const handleComplete = useCallback(
//     (
//       finalSeconds?: number,
//       finalTypedChars = typedChars,
//       finalErrorKeys = errorKeysMap
//     ) => {
//       setIsFinished(true);
//       setIsRunning(false);

//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//       }

//       const dur = finalSeconds ?? Math.max(1, elapsedSeconds);
//       const minTime = Math.max(1 / 60, dur / 60);

//       const finalTotalKeystrokes = finalTypedChars.length;
//       const finalCorrectKeystrokes = finalTypedChars.filter(
//         c => c.isCorrect
//       ).length;

//       const finalErrorCount =
//         finalTotalKeystrokes - finalCorrectKeystrokes;

//       const finalGross = Math.round(
//         (finalTotalKeystrokes / 5) / minTime
//       );

//       const finalNet = Math.max(
//         0,
//         Math.round(
//           (finalCorrectKeystrokes / 5) / minTime
//         )
//       );

//       const finalAcc =
//         finalTotalKeystrokes > 0
//           ? Math.round(
//             (finalCorrectKeystrokes / finalTotalKeystrokes) * 100
//           )
//           : 100;

//       // XP calculation
//       const baseMultiplier = type === 'test' ? 2.5 : 1.8;
//       const speedBonus = Math.floor(finalNet * 1.5);
//       const accBonus = finalAcc >= 95 ? 50 : 20;

//       const earnedXp = Math.max(
//         20,
//         Math.round((speedBonus + accBonus) * baseMultiplier)
//       );

//       soundManager.playSuccess();

//       const result = recordTestResult({
//         title,
//         type,
//         durationSeconds: dur,
//         grossWpm: finalGross,
//         netWpm: finalNet,
//         accuracy: finalAcc,
//         totalKeystrokes: finalTotalKeystrokes,
//         correctKeystrokes: finalCorrectKeystrokes,
//         errorCount: finalErrorCount,
//         consistencyScore: Math.min(
//           99,
//           Math.max(70, Math.round(100 - finalErrorCount * 2))
//         ),
//         errorKeys: finalErrorKeys,
//         xpEarned: earnedXp
//       });

//       setFinalResult(result);
//     },
//     [
//       elapsedSeconds,
//       typedChars,
//       errorKeysMap,
//       recordTestResult,
//       title,
//       type
//     ]
//   );

//   // Complete timed session only after the latest state is rendered
//   useEffect(() => {
//     if (
//       timeLimitSeconds &&
//       elapsedSeconds >= timeLimitSeconds &&
//       isRunning &&
//       !isFinished
//     ) {
//       handleComplete(elapsedSeconds);
//     }
//   }, [
//     elapsedSeconds,
//     timeLimitSeconds,
//     isRunning,
//     isFinished,
//     handleComplete
//   ]);

//   // Handle keyboard events
//   const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
//     if (isFinished || isPaused) return;

//     // Prevent default scrolling for spacebar and tab
//     if (e.key === ' ' || e.key === 'Tab') {
//       e.preventDefault();
//     }

//     // Ignore modifier standalone keys
//     if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) {
//       return;
//     }

//     // Start timer on first real stroke
//     if (!isRunning) {
//       setIsRunning(true);
//     }

//     if (e.key === 'Backspace') {
//       if (currentIndex > 0) {
//         soundManager.playKeypress(false);
//         setCurrentIndex(prev => prev - 1);
//         setTypedChars(prev => prev.slice(0, -1));
//         setLastPressedKey('Backspace');
//         setIsLastKeyError(false);
//       }
//       return;
//     }

//     // Only process printable characters (length 1)
//     // if (e.key.length === 1) {
//     //   const expectedChar = sourceText[currentIndex];
//     //   const isCorrect = e.key === expectedChar;

//     //   setLastPressedKey(e.key);

//     //   if (isCorrect) {
//     //     soundManager.playKeypress(e.key === ' ');
//     //     setIsLastKeyError(false);
//     //   } else {
//     //     soundManager.playError();
//     //     setIsLastKeyError(true);
//     //     // Track error key
//     //     const errKey = expectedChar.toLowerCase();
//     //     setErrorKeysMap(prev => ({
//     //       ...prev,
//     //       [errKey]: (prev[errKey] || 0) + 1
//     //     }));
//     //   }

//     //   setTypedChars(prev => [...prev, { char: e.key, isCorrect }]);
//     //   const nextIndex = currentIndex + 1;
//     //   setCurrentIndex(nextIndex);

//     //   // Check if finished entire passage
//     //   if (nextIndex >= sourceText.length) {
//     //     handleComplete();
//     //   }
//     // }
//     if (e.key.length === 1) {
//       const expectedChar = sourceText[currentIndex];
//       const isCorrect = e.key === expectedChar;

//       setLastPressedKey(e.key);

//       let nextErrorKeys = errorKeysMap;

//       if (isCorrect) {
//         soundManager.playKeypress(e.key === ' ');
//         setIsLastKeyError(false);
//       } else {
//         soundManager.playError();
//         setIsLastKeyError(true);

//         const errKey = expectedChar.toLowerCase();

//         nextErrorKeys = {
//           ...errorKeysMap,
//           [errKey]: (errorKeysMap[errKey] || 0) + 1
//         };

//         setErrorKeysMap(nextErrorKeys);
//       }

//       // Build the complete next state BEFORE updating React state
//       const nextTypedChars = [
//         ...typedChars,
//         {
//           char: e.key,
//           isCorrect
//         }
//       ];

//       setTypedChars(nextTypedChars);

//       const nextIndex = currentIndex + 1;
//       setCurrentIndex(nextIndex);

//       // If the final character was typed,
//       // send the complete latest data directly to the result.
//       if (nextIndex >= sourceText.length) {
//         handleComplete(
//           undefined,
//           nextTypedChars,
//           nextErrorKeys
//         );
//       }
//     }
//   }, [currentIndex, isFinished, isPaused, isRunning, sourceText, handleComplete]);

//   const resetEngine = () => {
//     setCurrentIndex(0);
//     setTypedChars([]);
//     setIsRunning(false);
//     setIsPaused(false);
//     setIsFinished(false);
//     setElapsedSeconds(0);
//     setLastPressedKey('');
//     setIsLastKeyError(false);
//     setErrorKeysMap({});
//     setFinalResult(null);
//     containerRef.current?.focus();
//   };

//   const nextChar = sourceText[currentIndex] || '';

//   return (
//     <div
//       ref={containerRef}
//       tabIndex={0}
//       onKeyDown={handleKeyDown}
//       className="w-full max-w-5xl mx-auto focus:outline-none select-none py-4 space-y-4"
//     >
//       {/* Top Header & HUD */}
//       <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onExit}
//             className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
//             title="Exit Session"
//           >
//             <LogOut className="w-4 h-4" />
//           </button>
//           <div>
//             <h2 className="text-sm sm:text-base font-bold text-white leading-tight">{title}</h2>
//             <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
//               <span className="capitalize">{type}</span>
//               <span>•</span>
//               <span>Target: {targetWpm} WPM</span>
//               <span>•</span>
//               <span>Min Acc: {minAccuracy}%</span>
//             </div>
//           </div>
//         </div>

//         {/* Live HUD Stats */}
//         <div className="flex items-center gap-3 sm:gap-6">
//           <div className="text-center">
//             <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
//               <Zap className="w-3 h-3 text-emerald-400" />
//               <span>Speed</span>
//             </div>
//             <div className="font-mono font-black text-lg sm:text-xl text-emerald-400">
//               {netWpm} <span className="text-[10px] text-slate-500 font-normal">WPM</span>
//             </div>
//           </div>

//           <div className="text-center">
//             <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
//               <Target className="w-3 h-3 text-cyan-400" />
//               <span>Accuracy</span>
//             </div>
//             <div className="font-mono font-black text-lg sm:text-xl text-cyan-400">
//               {accuracy}%
//             </div>
//           </div>

//           <div className="text-center min-w-16">
//             <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
//               <Clock className="w-3 h-3 text-amber-400" />
//               <span>{timeLimitSeconds ? 'Remaining' : 'Time'}</span>
//             </div>
//             <div className="font-mono font-black text-lg sm:text-xl text-amber-400">
//               {timeLimitSeconds
//                 ? `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`
//                 : `${Math.floor(elapsedSeconds / 60)}:${(elapsedSeconds % 60).toString().padStart(2, '0')}`}
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
//             {isRunning && (
//               <button
//                 onClick={() => setIsPaused(!isPaused)}
//                 className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
//                 title={isPaused ? 'Resume' : 'Pause'}
//               >
//                 {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4" />}
//               </button>
//             )}

//             <button
//               onClick={resetEngine}
//               className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
//               title="Restart"
//             >
//               <RotateCcw className="w-4 h-4" />
//             </button>

//             <button
//               onClick={() => setShowKeyboard(!showKeyboard)}
//               className={`p-2 rounded-lg transition-colors ${showKeyboard ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
//                 }`}
//               title="Toggle Virtual Keyboard"
//             >
//               <KeyboardIcon className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Interactive Text Display Box */}
//       <div
//         ref={textDisplayRef}
//         onClick={() => containerRef.current?.focus()}
//         className="relative bg-slate-900/95 border border-slate-800/90 rounded-2xl p-6 sm:p-8 h-48 sm:h-56 overflow-y-auto cursor-text shadow-2xl focus-within:ring-2 focus-within:ring-emerald-500/40 transition-all font-mono text-base sm:text-xl leading-relaxed tracking-wide"
//       >
//         {!isRunning && currentIndex === 0 && (
//           <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20">
//             <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold animate-pulse">
//               Type any key to start typing...
//             </div>
//           </div>
//         )}

//         {isPaused && (
//           <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-30">
//             <div className="text-center p-4">
//               <h3 className="text-lg font-bold text-white mb-2">Practice Paused</h3>
//               <button
//                 onClick={() => setIsPaused(false)}
//                 className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
//               >
//                 Resume
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="break-words">
//           {sourceText.split('').map((char, index) => {
//             const isTyped = index < currentIndex;
//             const isCurrent = index === currentIndex;
//             const typedInfo = typedChars[index];

//             let charColor = 'text-slate-500'; // Untyped
//             let bgClass = '';

//             if (isTyped) {
//               if (typedInfo?.isCorrect) {
//                 charColor = 'text-emerald-400';
//               } else {
//                 charColor = 'text-rose-400 bg-rose-500/20 underline decoration-rose-500';
//               }
//             } else if (isCurrent) {
//               charColor = 'text-white font-black';
//               bgClass = 'bg-emerald-500/30 ring-2 ring-emerald-400 rounded-xs animate-pulse';
//             }

//             return (
//               <span
//                 key={index}
//                 ref={isCurrent ? activeCharRef : null}
//                 className={`relative transition-colors duration-75 ${charColor} ${bgClass}`}
//               >
//                 {char === ' ' && isCurrent ? '␣' : char}
//               </span>
//             );
//           })}
//         </div>
//       </div>

//       {/* Virtual Keyboard Guidance */}
//       {showKeyboard && (
//         <div className="transition-all animate-in fade-in duration-200">
//           <VirtualKeyboard
//             currentKey={nextChar}
//             pressedKey={lastPressedKey}
//             isError={isLastKeyError}
//             showFingerGuide={true}
//           />
//         </div>
//       )}

//       {/* Completion Modal */}
//       {isFinished && finalResult && (
//         <TestResultModal
//           result={finalResult}
//           onRetry={resetEngine}
//           onNext={onNextLesson}
//           onClose={onExit}
//           hasNextLesson={hasNextLesson}
//         />
//       )}
//     </div>
//   );
// };




























import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { VirtualKeyboard } from '../common/VirtualKeyboard';
import { TestResultModal } from './TestResultModal';
import { soundManager } from '../../utils/audio';
import { TestResult } from '../../types';
import {
  RotateCcw,
  Pause,
  Play,
  LogOut,
  Keyboard as KeyboardIcon,
  Zap,
  Target,
  Clock
} from 'lucide-react';

interface TypingEngineProps {
  title: string;
  sourceText: string;
  type: 'lesson' | 'test' | 'practice' | 'assignment';
  timeLimitSeconds?: number;
  targetWpm?: number;
  minAccuracy?: number;
  onExit: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export const TypingEngine: React.FC<TypingEngineProps> = ({
  title,
  sourceText,
  type,
  timeLimitSeconds,
  targetWpm = 30,
  minAccuracy = 90,
  onExit,
  onNextLesson,
  hasNextLesson = false
}) => {
  const { recordTestResult } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [typedChars, setTypedChars] = useState<
    { char: string; isCorrect: boolean }[]
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastPressedKey, setLastPressedKey] = useState<string>('');
  const [isLastKeyError, setIsLastKeyError] = useState<boolean>(false);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const [errorKeysMap, setErrorKeysMap] = useState<Record<string, number>>({});
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const textDisplayRef = useRef<HTMLDivElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ---------------------------------------------------------
  // Latest state refs
  // ---------------------------------------------------------
  // These refs make sure completion always uses the latest data,
  // even if React has not committed the newest state yet.
  const typedCharsRef = useRef<
    { char: string; isCorrect: boolean }[]
  >([]);

  const errorKeysMapRef = useRef<Record<string, number>>({});
  const currentIndexRef = useRef(0);
  const elapsedSecondsRef = useRef(0);

  // Keep refs synchronized with state
  useEffect(() => {
    typedCharsRef.current = typedChars;
  }, [typedChars]);

  useEffect(() => {
    errorKeysMapRef.current = errorKeysMap;
  }, [errorKeysMap]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    elapsedSecondsRef.current = elapsedSeconds;
  }, [elapsedSeconds]);

  // Time remaining if timed test
  const timeRemaining = timeLimitSeconds
    ? Math.max(0, timeLimitSeconds - elapsedSeconds)
    : 0;

  // ---------------------------------------------------------
  // Real-time metrics
  // ---------------------------------------------------------

  const totalKeystrokes = typedChars.length;

  const correctKeystrokes = typedChars.filter(
    c => c.isCorrect
  ).length;

  const errorCount = totalKeystrokes - correctKeystrokes;

  const accuracy =
    totalKeystrokes > 0
      ? Math.round(
        (correctKeystrokes / totalKeystrokes) * 100
      )
      : 100;

  const effectiveMinutes = Math.max(
    1 / 60,
    elapsedSeconds / 60
  );

  const grossWpm = Math.round(
    (totalKeystrokes / 5) / effectiveMinutes
  );

  const netWpm = Math.max(
    0,
    Math.round(
      (correctKeystrokes / 5) / effectiveMinutes
    )
  );

  // ---------------------------------------------------------
  // Auto-scroll
  // ---------------------------------------------------------

  useEffect(() => {
    if (
      activeCharRef.current &&
      textDisplayRef.current
    ) {
      const charTop =
        activeCharRef.current.offsetTop;

      const containerHeight =
        textDisplayRef.current.clientHeight;

      textDisplayRef.current.scrollTop =
        charTop - containerHeight / 2 + 30;
    }
  }, [currentIndex]);

  // ---------------------------------------------------------
  // Focus keeper
  // ---------------------------------------------------------

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // ---------------------------------------------------------
  // Timer runner
  // ---------------------------------------------------------

  useEffect(() => {
    if (
      isRunning &&
      !isPaused &&
      !isFinished
    ) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          elapsedSecondsRef.current = next;
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused, isFinished]);

  // ---------------------------------------------------------
  // Complete test
  // ---------------------------------------------------------

  const handleComplete = useCallback(
    (
      finalSeconds?: number,
      finalTypedChars?: {
        char: string;
        isCorrect: boolean;
      }[],
      finalErrorKeys?: Record<string, number>
    ) => {
      if (isFinished) return;

      setIsFinished(true);
      setIsRunning(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      // Always use the explicitly supplied final values first.
      // Otherwise use refs containing the latest state.
      const chars =
        finalTypedChars ??
        typedCharsRef.current;

      const errors =
        finalErrorKeys ??
        errorKeysMapRef.current;

      const dur =
        finalSeconds ??
        Math.max(
          1,
          elapsedSecondsRef.current
        );

      const minTime = Math.max(
        1 / 60,
        dur / 60
      );

      const finalTotalKeystrokes =
        chars.length;

      const finalCorrectKeystrokes =
        chars.filter(
          c => c.isCorrect
        ).length;

      const finalErrorCount =
        finalTotalKeystrokes -
        finalCorrectKeystrokes;

      const finalGross = Math.round(
        (finalTotalKeystrokes / 5) /
        minTime
      );

      const finalNet = Math.max(
        0,
        Math.round(
          (finalCorrectKeystrokes / 5) /
          minTime
        )
      );

      const finalAcc =
        finalTotalKeystrokes > 0
          ? Math.round(
            (finalCorrectKeystrokes /
              finalTotalKeystrokes) *
            100
          )
          : 100;

      // -------------------------------------------------------
      // XP calculation
      // -------------------------------------------------------

      const baseMultiplier =
        type === 'test' ? 2.5 : 1.8;

      const speedBonus =
        Math.floor(finalNet * 1.5);

      const accBonus =
        finalAcc >= 95 ? 50 : 20;

      const earnedXp = Math.max(
        20,
        Math.round(
          (speedBonus + accBonus) *
          baseMultiplier
        )
      );

      soundManager.playSuccess();

      // -------------------------------------------------------
      // Save result
      // -------------------------------------------------------

      const result = recordTestResult({
        title,
        type,
        durationSeconds: dur,
        grossWpm: finalGross,
        netWpm: finalNet,
        accuracy: finalAcc,
        totalKeystrokes:
          finalTotalKeystrokes,
        correctKeystrokes:
          finalCorrectKeystrokes,
        errorCount:
          finalErrorCount,
        consistencyScore: Math.min(
          99,
          Math.max(
            70,
            Math.round(
              100 -
              finalErrorCount * 2
            )
          )
        ),
        errorKeys: errors,
        xpEarned: earnedXp
      });

      setFinalResult(result);
    },
    [
      isFinished,
      recordTestResult,
      title,
      type
    ]
  );

  // ---------------------------------------------------------
  // Timed test completion
  // ---------------------------------------------------------

  useEffect(() => {
    if (
      timeLimitSeconds &&
      elapsedSeconds >=
      timeLimitSeconds &&
      isRunning &&
      !isFinished
    ) {
      handleComplete(
        timeLimitSeconds,
        typedCharsRef.current,
        errorKeysMapRef.current
      );
    }
  }, [
    elapsedSeconds,
    timeLimitSeconds,
    isRunning,
    isFinished,
    handleComplete
  ]);

  // ---------------------------------------------------------
  // Keyboard events
  // ---------------------------------------------------------

  const handleKeyDown = useCallback(
    (
      e: React.KeyboardEvent<HTMLDivElement>
    ) => {
      if (isFinished || isPaused) {
        return;
      }

      // Prevent default scrolling for spacebar and tab
      if (
        e.key === ' ' ||
        e.key === 'Tab'
      ) {
        e.preventDefault();
      }

      // Ignore modifier-only keys
      if (
        [
          'Shift',
          'Control',
          'Alt',
          'Meta',
          'CapsLock'
        ].includes(e.key)
      ) {
        return;
      }

      // -----------------------------------------------------
      // Start timer on first real keystroke
      // -----------------------------------------------------

      if (!isRunning) {
        setIsRunning(true);
      }

      // -----------------------------------------------------
      // Backspace
      // -----------------------------------------------------

      if (e.key === 'Backspace') {
        const index =
          currentIndexRef.current;

        if (index > 0) {
          soundManager.playKeypress(false);

          const nextChars =
            typedCharsRef.current.slice(
              0,
              -1
            );

          typedCharsRef.current =
            nextChars;

          setTypedChars(nextChars);

          const nextIndex =
            index - 1;

          currentIndexRef.current =
            nextIndex;

          setCurrentIndex(
            nextIndex
          );

          setLastPressedKey(
            'Backspace'
          );

          setIsLastKeyError(false);
        }

        return;
      }

      // -----------------------------------------------------
      // Printable character
      // -----------------------------------------------------

      if (e.key.length === 1) {
        const index =
          currentIndexRef.current;

        const expectedChar =
          sourceText[index];

        const isCorrect =
          e.key === expectedChar;

        setLastPressedKey(e.key);

        // ---------------------------------------------------
        // Error tracking
        // ---------------------------------------------------

        let nextErrorKeys =
          errorKeysMapRef.current;

        if (isCorrect) {
          soundManager.playKeypress(
            e.key === ' '
          );

          setIsLastKeyError(false);
        } else {
          soundManager.playError();
          setIsLastKeyError(true);

          const errKey =
            expectedChar.toLowerCase();

          nextErrorKeys = {
            ...errorKeysMapRef.current,
            [errKey]:
              (errorKeysMapRef.current[
                errKey
              ] || 0) + 1
          };

          errorKeysMapRef.current =
            nextErrorKeys;

          setErrorKeysMap(
            nextErrorKeys
          );
        }

        // ---------------------------------------------------
        // Build latest typed chars BEFORE setState
        // ---------------------------------------------------

        const nextTypedChars = [
          ...typedCharsRef.current,
          {
            char: e.key,
            isCorrect
          }
        ];

        // Update ref immediately
        typedCharsRef.current =
          nextTypedChars;

        // Update React state
        setTypedChars(
          nextTypedChars
        );

        // ---------------------------------------------------
        // Move cursor
        // ---------------------------------------------------

        const nextIndex =
          index + 1;

        currentIndexRef.current =
          nextIndex;

        setCurrentIndex(
          nextIndex
        );

        // ---------------------------------------------------
        // Completed full passage
        // ---------------------------------------------------

        if (
          nextIndex >=
          sourceText.length
        ) {
          handleComplete(
            undefined,
            nextTypedChars,
            nextErrorKeys
          );
        }
      }
    },
    [
      isFinished,
      isPaused,
      isRunning,
      sourceText,
      handleComplete
    ]
  );

  // ---------------------------------------------------------
  // Reset
  // ---------------------------------------------------------

  const resetEngine = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    currentIndexRef.current = 0;
    typedCharsRef.current = [];
    errorKeysMapRef.current = {};
    elapsedSecondsRef.current = 0;

    setCurrentIndex(0);
    setTypedChars([]);
    setIsRunning(false);
    setIsPaused(false);
    setIsFinished(false);
    setElapsedSeconds(0);
    setLastPressedKey('');
    setIsLastKeyError(false);
    setErrorKeysMap({});
    setFinalResult(null);

    containerRef.current?.focus();
  };

  const nextChar =
    sourceText[currentIndex] || '';

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-5xl mx-auto focus:outline-none select-none py-4 space-y-4"
    >
      {/* Top Header & HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Exit Session"
          >
            <LogOut className="w-4 h-4" />
          </button>

          <div>
            <h2 className="text-sm sm:text-base font-bold text-white leading-tight">
              {title}
            </h2>

            <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
              <span className="capitalize">
                {type}
              </span>
              <span>•</span>
              <span>
                Target: {targetWpm} WPM
              </span>
              <span>•</span>
              <span>
                Min Acc: {minAccuracy}%
              </span>
            </div>
          </div>
        </div>

        {/* Live HUD Stats */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Speed</span>
            </div>

            <div className="font-mono font-black text-lg sm:text-xl text-emerald-400">
              {netWpm}{' '}
              <span className="text-[10px] text-slate-500 font-normal">
                WPM
              </span>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Target className="w-3 h-3 text-cyan-400" />
              <span>Accuracy</span>
            </div>

            <div className="font-mono font-black text-lg sm:text-xl text-cyan-400">
              {accuracy}%
            </div>
          </div>

          <div className="text-center min-w-16">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>
                {timeLimitSeconds
                  ? 'Remaining'
                  : 'Time'}
              </span>
            </div>

            <div className="font-mono font-black text-lg sm:text-xl text-amber-400">
              {timeLimitSeconds
                ? `${Math.floor(
                  timeRemaining / 60
                )}:${(
                  timeRemaining % 60
                )
                  .toString()
                  .padStart(2, '0')}`
                : `${Math.floor(
                  elapsedSeconds / 60
                )}:${(
                  elapsedSeconds % 60
                )
                  .toString()
                  .padStart(2, '0')}`}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
            {isRunning && (
              <button
                onClick={() =>
                  setIsPaused(!isPaused)
                }
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title={
                  isPaused
                    ? 'Resume'
                    : 'Pause'
                }
              >
                {isPaused ? (
                  <Play className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
            )}

            <button
              onClick={resetEngine}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              title="Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                setShowKeyboard(
                  !showKeyboard
                )
              }
              className={`p-2 rounded-lg transition-colors ${showKeyboard
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
                }`}
              title="Toggle Virtual Keyboard"
            >
              <KeyboardIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Text Display Box */}
      <div
        ref={textDisplayRef}
        onClick={() =>
          containerRef.current?.focus()
        }
        className="relative bg-slate-900/95 border border-slate-800/90 rounded-2xl p-6 sm:p-8 h-48 sm:h-56 overflow-y-auto cursor-text shadow-2xl focus-within:ring-2 focus-within:ring-emerald-500/40 transition-all font-mono text-base sm:text-xl leading-relaxed tracking-wide"
      >
        {!isRunning &&
          currentIndex === 0 && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold animate-pulse">
                Type any key to start typing...
              </div>
            </div>
          )}

        {isPaused && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-30">
            <div className="text-center p-4">
              <h3 className="text-lg font-bold text-white mb-2">
                Practice Paused
              </h3>

              <button
                onClick={() =>
                  setIsPaused(false)
                }
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
              >
                Resume
              </button>
            </div>
          </div>
        )}

        <div className="break-words">
          {sourceText
            .split('')
            .map((char, index) => {
              const isTyped =
                index < currentIndex;

              const isCurrent =
                index === currentIndex;

              const typedInfo =
                typedChars[index];

              let charColor =
                'text-slate-500';

              let bgClass = '';

              if (isTyped) {
                if (
                  typedInfo?.isCorrect
                ) {
                  charColor =
                    'text-emerald-400';
                } else {
                  charColor =
                    'text-rose-400 bg-rose-500/20 underline decoration-rose-500';
                }
              } else if (isCurrent) {
                charColor =
                  'text-white font-black';

                bgClass =
                  'bg-emerald-500/30 ring-2 ring-emerald-400 rounded-xs animate-pulse';
              }

              return (
                <span
                  key={index}
                  ref={
                    isCurrent
                      ? activeCharRef
                      : null
                  }
                  className={`relative transition-colors duration-75 ${charColor} ${bgClass}`}
                >
                  {char === ' ' &&
                    isCurrent
                    ? '␣'
                    : char}
                </span>
              );
            })}
        </div>
      </div>

      {/* Virtual Keyboard Guidance */}
      {showKeyboard && (
        <div className="transition-all animate-in fade-in duration-200">
          <VirtualKeyboard
            currentKey={nextChar}
            pressedKey={lastPressedKey}
            isError={isLastKeyError}
            showFingerGuide={true}
          />
        </div>
      )}

      {/* Completion Modal */}
      {isFinished &&
        finalResult && (
          <TestResultModal
            result={finalResult}
            onRetry={resetEngine}
            onNext={onNextLesson}
            onClose={onExit}
            hasNextLesson={
              hasNextLesson
            }
          />
        )}
    </div>
  );
};