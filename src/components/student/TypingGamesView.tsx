// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useApp } from '../../context/AppContext';
// import { soundManager } from '../../utils/audio';
// import confetti from 'canvas-confetti';
// import { Swords } from 'lucide-react';
// import {
//   Gamepad2,
//   Trophy,
//   RotateCcw,
//   Zap,
//   Play,
//   ShieldAlert,
//   Car,
//   Flame,
//   Target,
//   CheckCircle2,
// } from 'lucide-react';
// import { COMMON_WORDS } from '../../data/mockData';

// interface FallingWord {
//   id: number;
//   text: string;
//   x: number;
//   y: number;
//   speed: number;
// }

// type GameId = 'invaders' | 'racer' | 'rush' | 'monkey';

// const TypingGamesView: React.FC = () => {
//   const { recordTestResult } = useApp();

//   const [selectedGame, setSelectedGame] =
//     useState<GameId>('invaders');

//   // ============================================================
//   // COMMON HELPERS
//   // ============================================================

//   const randomWord = useCallback((maxWords = COMMON_WORDS.length) => {
//     const limit = Math.min(COMMON_WORDS.length, maxWords);

//     return COMMON_WORDS[
//       Math.floor(Math.random() * limit)
//     ];
//   }, []);

//   const shuffleWords = useCallback((count: number) => {
//     return [...COMMON_WORDS]
//       .sort(() => Math.random() - 0.5)
//       .slice(0, count);
//   }, []);

//   const showConfetti = () => {
//     try {
//       confetti({
//         particleCount: 80,
//         spread: 65,
//         origin: {
//           y: 0.65,
//         },
//       });
//     } catch {
//       // Ignore confetti errors
//     }
//   };

//   // ============================================================
//   // GAME 1 — WORD INVADERS
//   // ============================================================

//   const [invadersActive, setInvadersActive] =
//     useState(false);

//   const [invaderWords, setInvaderWords] =
//     useState<FallingWord[]>([]);

//   const [invaderInput, setInvaderInput] =
//     useState('');

//   const [invaderScore, setInvaderScore] =
//     useState(0);

//   const [invaderLives, setInvaderLives] =
//     useState(3);

//   const [invaderGameOver, setInvaderGameOver] =
//     useState(false);

//   const [invaderLevel, setInvaderLevel] =
//     useState(1);

//   const [invaderCombo, setInvaderCombo] =
//     useState(0);

//   const invaderLoopRef =
//     useRef<ReturnType<typeof setInterval> | null>(null);

//   const invaderSpawnRef =
//     useRef<ReturnType<typeof setInterval> | null>(null);

//   const invaderInputRef =
//     useRef<HTMLInputElement>(null);

//   const invaderResultRecordedRef =
//     useRef(false);

//   const stopInvadersGame = useCallback(() => {
//     setInvadersActive(false);

//     if (invaderLoopRef.current) {
//       clearInterval(invaderLoopRef.current);
//       invaderLoopRef.current = null;
//     }

//     if (invaderSpawnRef.current) {
//       clearInterval(invaderSpawnRef.current);
//       invaderSpawnRef.current = null;
//     }
//   }, []);

//   const startInvadersGame = () => {
//     stopInvadersGame();

//     invaderResultRecordedRef.current = false;

//     setInvadersActive(true);
//     setInvaderGameOver(false);
//     setInvaderScore(0);
//     setInvaderLives(3);
//     setInvaderLevel(1);
//     setInvaderCombo(0);
//     setInvaderInput('');

//     setInvaderWords([
//       {
//         id: Date.now(),
//         text: randomWord(40),
//         x: 30,
//         y: 5,
//         speed: 0.6,
//       },
//     ]);

//     setTimeout(() => {
//       invaderInputRef.current?.focus();
//     }, 100);
//   };

//   const recordInvaderResult = useCallback(() => {
//     if (invaderResultRecordedRef.current) return;

//     invaderResultRecordedRef.current = true;

//     const estimatedWords = Math.max(
//       1,
//       Math.round(invaderScore / 100)
//     );

//     const estimatedWpm = Math.max(
//       20,
//       Math.min(90, 25 + estimatedWords * 2)
//     );

//     recordTestResult({
//       title: 'Word Invaders',
//       type: 'practice',
//       durationSeconds: 60,
//       grossWpm: estimatedWpm,
//       netWpm: Math.max(15, estimatedWpm - 4),
//       accuracy: Math.min(
//         100,
//         Math.max(70, 90 + invaderCombo)
//       ),
//       totalKeystrokes: Math.max(
//         20,
//         estimatedWords * 5
//       ),
//       correctKeystrokes: Math.max(
//         15,
//         estimatedWords * 5 - 5
//       ),
//       errorCount: 5,
//       consistencyScore: Math.min(
//         100,
//         70 + invaderLevel * 5
//       ),
//       xpEarned: Math.max(
//         40,
//         Math.min(150, 40 + invaderLevel * 15)
//       ),
//     });
//   }, [
//     recordTestResult,
//     invaderScore,
//     invaderCombo,
//     invaderLevel,
//   ]);

//   // Invader movement
//   useEffect(() => {
//     if (!invadersActive || invaderGameOver) return;

//     invaderLoopRef.current = setInterval(() => {
//       setInvaderWords(prevWords => {
//         const nextWords: FallingWord[] = [];
//         let lostLife = false;

//         for (const word of prevWords) {
//           const nextY = word.y + word.speed;

//           if (nextY >= 88) {
//             lostLife = true;
//           } else {
//             nextWords.push({
//               ...word,
//               y: nextY,
//             });
//           }
//         }

//         if (lostLife) {
//           soundManager.playError();

//           setInvaderLives(lives => {
//             const nextLives = lives - 1;

//             if (nextLives <= 0) {
//               setInvaderGameOver(true);
//               setInvadersActive(false);
//             }

//             return Math.max(0, nextLives);
//           });

//           setInvaderCombo(0);
//         }

//         return nextWords;
//       });
//     }, 100);

//     return () => {
//       if (invaderLoopRef.current) {
//         clearInterval(invaderLoopRef.current);
//         invaderLoopRef.current = null;
//       }
//     };
//   }, [invadersActive, invaderGameOver]);

//   // Invader spawning
//   useEffect(() => {
//     if (!invadersActive || invaderGameOver) return;

//     const intervalTime = Math.max(
//       1200,
//       2600 - invaderLevel * 200
//     );

//     invaderSpawnRef.current = setInterval(() => {
//       const word = randomWord(
//         Math.min(
//           COMMON_WORDS.length,
//           50 + invaderLevel * 20
//         )
//       );

//       const x =
//         Math.floor(Math.random() * 75) + 5;

//       const speed =
//         0.5 + invaderLevel * 0.15;

//       setInvaderWords(prev => {
//         if (prev.length >= 6) return prev;

//         return [
//           ...prev,
//           {
//             id: Date.now() + Math.random(),
//             text: word,
//             x,
//             y: 0,
//             speed,
//           },
//         ];
//       });
//     }, intervalTime);

//     return () => {
//       if (invaderSpawnRef.current) {
//         clearInterval(invaderSpawnRef.current);
//         invaderSpawnRef.current = null;
//       }
//     };
//   }, [
//     invadersActive,
//     invaderGameOver,
//     invaderLevel,
//     randomWord,
//   ]);

//   useEffect(() => {
//     if (invaderGameOver) {
//       recordInvaderResult();
//     }
//   }, [
//     invaderGameOver,
//     recordInvaderResult,
//   ]);

//   const handleInvaderChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = e.target.value;

//     setInvaderInput(value);

//     soundManager.playKeypress(
//       value.endsWith(' ')
//     );

//     const typedWord = value.trim().toLowerCase();

//     const matchedIndex =
//       invaderWords.findIndex(
//         word =>
//           word.text.toLowerCase() === typedWord
//       );

//     if (matchedIndex !== -1) {
//       soundManager.playSuccess();

//       const newCombo = invaderCombo + 1;
//       const points = 100 * newCombo;

//       setInvaderScore(score => score + points);
//       setInvaderCombo(newCombo);

//       if (
//         invaderScore + points >=
//         invaderLevel * 1200
//       ) {
//         setInvaderLevel(level => level + 1);
//         soundManager.playLevelUp();
//       }

//       setInvaderWords(prev =>
//         prev.filter(
//           (_, index) => index !== matchedIndex
//         )
//       );

//       setInvaderInput('');
//     }
//   };

//   // ============================================================
//   // GAME 2 — SPEED RACER 3000
//   // ============================================================

//   const [racerActive, setRacerActive] =
//     useState(false);

//   const [racerWords, setRacerWords] =
//     useState<string[]>([]);

//   const [racerWordIndex, setRacerWordIndex] =
//     useState(0);

//   const [racerInput, setRacerInput] =
//     useState('');

//   const [racerPlayerProgress, setRacerPlayerProgress] =
//     useState(0);

//   const [racerBot1Progress, setRacerBot1Progress] =
//     useState(0);

//   const [racerBot2Progress, setRacerBot2Progress] =
//     useState(0);

//   const [racerFinished, setRacerFinished] =
//     useState(false);

//   const [racerWinner, setRacerWinner] =
//     useState<string | null>(null);

//   const racerBotIntervalRef =
//     useRef<ReturnType<typeof setInterval> | null>(null);

//   const racerResultRecordedRef =
//     useRef(false);

//   const racerFinishedRef =
//     useRef(false);

//   const stopRacerGame = useCallback(() => {
//     setRacerActive(false);

//     if (racerBotIntervalRef.current) {
//       clearInterval(racerBotIntervalRef.current);
//       racerBotIntervalRef.current = null;
//     }
//   }, []);

//   const finishRacer = useCallback(
//     (winner: string) => {
//       if (racerFinishedRef.current) return;

//       racerFinishedRef.current = true;

//       if (racerBotIntervalRef.current) {
//         clearInterval(
//           racerBotIntervalRef.current
//         );

//         racerBotIntervalRef.current = null;
//       }

//       setRacerActive(false);
//       setRacerFinished(true);
//       setRacerWinner(winner);

//       if (winner === 'You') {
//         if (
//           !racerResultRecordedRef.current
//         ) {
//           racerResultRecordedRef.current = true;

//           showConfetti();
//           soundManager.playLevelUp();

//           const completedWords =
//             Math.max(
//               1,
//               racerWordIndex + 1
//             );

//           const accuracy = Math.min(
//             100,
//             Math.max(
//               85,
//               94 +
//               Math.floor(
//                 completedWords / 4
//               )
//             )
//           );

//           recordTestResult({
//             title:
//               'Speed Racer Grand Prix',
//             type: 'practice',
//             durationSeconds: 30,
//             grossWpm: 72,
//             netWpm: 68,
//             accuracy,
//             totalKeystrokes:
//               completedWords * 5,
//             correctKeystrokes: Math.max(
//               1,
//               completedWords * 5 - 3
//             ),
//             errorCount: 3,
//             consistencyScore: 92,
//             xpEarned: 180,
//           });
//         }
//       } else {
//         soundManager.playError();
//       }
//     },
//     [
//       recordTestResult,
//       racerWordIndex,
//     ]
//   );

//   const startRacerGame = () => {
//     stopRacerGame();

//     racerResultRecordedRef.current = false;
//     racerFinishedRef.current = false;

//     const words = shuffleWords(25);

//     setRacerWords(words);
//     setRacerWordIndex(0);
//     setRacerInput('');
//     setRacerPlayerProgress(0);
//     setRacerBot1Progress(0);
//     setRacerBot2Progress(0);
//     setRacerFinished(false);
//     setRacerWinner(null);
//     setRacerActive(true);

//     racerBotIntervalRef.current =
//       setInterval(() => {
//         setRacerBot1Progress(progress => {
//           const next =
//             progress + 2.2;

//           if (
//             next >= 100 &&
//             !racerFinishedRef.current
//           ) {
//             finishRacer('Turbo Bot');
//           }

//           return Math.min(100, next);
//         });

//         setRacerBot2Progress(progress => {
//           const next =
//             progress + 3;

//           if (
//             next >= 100 &&
//             !racerFinishedRef.current
//           ) {
//             finishRacer('Cyber Bot');
//           }

//           return Math.min(100, next);
//         });
//       }, 1000);
//   };

//   const handleRacerInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = e.target.value;

//     setRacerInput(value);

//     soundManager.playKeypress(
//       value.endsWith(' ')
//     );

//     const currentWord =
//       racerWords[racerWordIndex];

//     if (
//       currentWord &&
//       value
//         .trim()
//         .toLowerCase() ===
//       currentWord.toLowerCase() &&
//       value.endsWith(' ')
//     ) {
//       soundManager.playSuccess();

//       const nextIndex =
//         racerWordIndex + 1;

//       setRacerWordIndex(nextIndex);
//       setRacerInput('');

//       const progress = Math.round(
//         (nextIndex /
//           racerWords.length) *
//         100
//       );

//       setRacerPlayerProgress(progress);

//       if (progress >= 100) {
//         finishRacer('You');
//       }
//     }
//   };

//   // ============================================================
//   // GAME 3 — WORD RUSH
//   // ============================================================

//   const [rushActive, setRushActive] =
//     useState(false);

//   const [rushTarget, setRushTarget] =
//     useState('');

//   const [rushInput, setRushInput] =
//     useState('');

//   const [rushScore, setRushScore] =
//     useState(0);

//   const [rushWordsTyped, setRushWordsTyped] =
//     useState(0);

//   const [rushCombo, setRushCombo] =
//     useState(0);

//   const [rushCorrect, setRushCorrect] =
//     useState(0);

//   const [rushMistakes, setRushMistakes] =
//     useState(0);

//   const [rushOver, setRushOver] =
//     useState(false);

//   const [rushTime, setRushTime] =
//     useState(60);

//   const rushInputRef =
//     useRef<HTMLInputElement>(null);

//   const rushTimerRef =
//     useRef<ReturnType<typeof setInterval> | null>(null);

//   const rushResultRecordedRef =
//     useRef(false);

//   const rushCorrectRef =
//     useRef(0);

//   const rushMistakesRef =
//     useRef(0);

//   const rushScoreRef =
//     useRef(0);

//   const rushComboRef =
//     useRef(0);

//   const stopRushGame = useCallback(() => {
//     setRushActive(false);

//     if (rushTimerRef.current) {
//       clearInterval(rushTimerRef.current);
//       rushTimerRef.current = null;
//     }
//   }, []);

//   const finishRush = useCallback(() => {
//     if (!rushActive) return;

//     stopRushGame();
//     setRushOver(true);

//     if (rushResultRecordedRef.current) {
//       return;
//     }

//     rushResultRecordedRef.current = true;

//     const totalAttempts =
//       rushCorrectRef.current +
//       rushMistakesRef.current;

//     const accuracy =
//       totalAttempts > 0
//         ? Math.round(
//           (rushCorrectRef.current /
//             totalAttempts) *
//           100
//         )
//         : 0;

//     const estimatedWpm = Math.max(
//       20,
//       Math.min(
//         100,
//         rushCorrectRef.current * 2
//       )
//     );

//     showConfetti();
//     soundManager.playLevelUp();

//     recordTestResult({
//       title: 'Word Rush',
//       type: 'practice',
//       durationSeconds: 60,
//       grossWpm: estimatedWpm,
//       netWpm: Math.max(
//         15,
//         estimatedWpm -
//         Math.floor(
//           rushMistakesRef.current / 2
//         )
//       ),
//       accuracy,
//       totalKeystrokes:
//         Math.max(1, totalAttempts * 5),
//       correctKeystrokes:
//         Math.max(
//           1,
//           rushCorrectRef.current * 5
//         ),
//       errorCount:
//         rushMistakesRef.current,
//       consistencyScore: Math.max(
//         50,
//         accuracy
//       ),
//       xpEarned: Math.max(
//         50,
//         Math.min(
//           180,
//           50 +
//           rushCorrectRef.current * 3
//         )
//       ),
//     });
//   }, [
//     recordTestResult,
//     rushActive,
//     stopRushGame,
//   ]);

//   const startRushGame = () => {
//     stopRushGame();

//     rushResultRecordedRef.current = false;

//     rushCorrectRef.current = 0;
//     rushMistakesRef.current = 0;
//     rushScoreRef.current = 0;
//     rushComboRef.current = 0;

//     setRushActive(true);
//     setRushOver(false);
//     setRushTime(60);
//     setRushScore(0);
//     setRushWordsTyped(0);
//     setRushCombo(0);
//     setRushCorrect(0);
//     setRushMistakes(0);
//     setRushInput('');
//     setRushTarget(randomWord());

//     setTimeout(() => {
//       rushInputRef.current?.focus();
//     }, 100);

//     rushTimerRef.current =
//       setInterval(() => {
//         setRushTime(time => {
//           if (time <= 1) {
//             return 0;
//           }

//           return time - 1;
//         });
//       }, 1000);
//   };

//   useEffect(() => {
//     if (
//       rushActive &&
//       rushTime <= 0
//     ) {
//       finishRush();
//     }
//   }, [
//     rushActive,
//     rushTime,
//     finishRush,
//   ]);

//   const handleRushInput = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const value = e.target.value;

//     setRushInput(value);

//     soundManager.playKeypress(
//       value.endsWith(' ')
//     );

//     if (!value.endsWith(' ')) {
//       return;
//     }

//     const typedWord =
//       value.trim().toLowerCase();

//     const targetWord =
//       rushTarget.trim().toLowerCase();

//     if (typedWord === targetWord) {
//       soundManager.playSuccess();

//       const newCombo =
//         rushComboRef.current + 1;

//       const points =
//         100 + newCombo * 10;

//       rushCorrectRef.current += 1;
//       rushScoreRef.current += points;
//       rushComboRef.current =
//         newCombo;

//       setRushCorrect(
//         rushCorrectRef.current
//       );

//       setRushScore(
//         rushScoreRef.current
//       );

//       setRushCombo(
//         rushComboRef.current
//       );

//       setRushWordsTyped(
//         count => count + 1
//       );

//       setRushInput('');
//       setRushTarget(randomWord());
//     } else {
//       soundManager.playError();

//       rushMistakesRef.current += 1;
//       rushComboRef.current = 0;

//       rushScoreRef.current =
//         Math.max(
//           0,
//           rushScoreRef.current - 25
//         );

//       setRushMistakes(
//         rushMistakesRef.current
//       );

//       setRushCombo(0);

//       setRushScore(
//         rushScoreRef.current
//       );

//       setRushInput('');
//     }
//   };

//   // ============================================================
//   // CLEANUP
//   // ============================================================

//   useEffect(() => {
//     return () => {
//       if (invaderLoopRef.current) {
//         clearInterval(
//           invaderLoopRef.current
//         );
//       }

//       if (invaderSpawnRef.current) {
//         clearInterval(
//           invaderSpawnRef.current
//         );
//       }

//       if (racerBotIntervalRef.current) {
//         clearInterval(
//           racerBotIntervalRef.current
//         );
//       }

//       if (rushTimerRef.current) {
//         clearInterval(
//           rushTimerRef.current
//         );
//       }
//     };
//   }, []);

//   // ============================================================
//   // GAME SWITCHING
//   // ============================================================

//   const changeGame = (game: GameId) => {
//     stopInvadersGame();
//     stopRacerGame();
//     stopRushGame();

//     setSelectedGame(game);
//   };

//   // ============================================================
//   // UI
//   // ============================================================

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

//           <div className="space-y-1">
//             <div className="flex items-center gap-2">
//               <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
//                 <Gamepad2 className="w-5 h-5" />
//               </span>

//               <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
//                 Arcade Typing Games
//               </h1>
//             </div>

//             <p className="text-xs sm:text-sm text-slate-400">
//               Improve typing speed, accuracy and
//               keyboard reflexes through quick
//               arcade challenges.
//             </p>
//           </div>

//           {/* GAME TABS */}
//           <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-950/70 border border-slate-800 rounded-2xl">

//             <button
//               onClick={() =>
//                 changeGame('invaders')
//               }
//               className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'invaders'
//                   ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
//                   : 'text-slate-400 hover:text-white hover:bg-slate-800'
//                 }`}
//             >
//               Invaders
//             </button>

//             <button
//               onClick={() =>
//                 changeGame('racer')
//               }
//               className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'racer'
//                   ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
//                   : 'text-slate-400 hover:text-white hover:bg-slate-800'
//                 }`}
//             >
//               Racer
//             </button>

//             <button
//               onClick={() =>
//                 changeGame('rush')
//               }
//               className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'rush'
//                   ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
//                   : 'text-slate-400 hover:text-white hover:bg-slate-800'
//                 }`}
//             >
//               Rush
//             </button>

//             <button
//               onClick={() =>
//                 changeGame('monkey')
//               }
//               className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'monkey'
//                   ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
//                   : 'text-slate-400 hover:text-white hover:bg-slate-800'
//                 }`}
//             >
//               <span className="flex items-center justify-center gap-1.5">
//                 <Swords className="w-3.5 h-3.5" />
//                 Monkey
//               </span>
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* ========================================================
//           GAME 1 — WORD INVADERS
//       ======================================================== */}

//       {selectedGame === 'invaders' && (
//         <div className="space-y-4">

//           <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

//             {/* STATS */}
//             <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

//               <div>
//                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                   <ShieldAlert className="w-5 h-5 text-amber-400" />
//                   Word Invaders
//                 </h3>

//                 <p className="text-xs text-slate-400 mt-1">
//                   Type the falling words before
//                   they reach the bottom shield.
//                 </p>
//               </div>

//               <div className="flex flex-wrap items-center gap-2">

//                 <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
//                   <span className="text-[10px] text-slate-500 block">
//                     SCORE
//                   </span>
//                   <span className="font-mono font-bold text-amber-400">
//                     {invaderScore}
//                   </span>
//                 </div>

//                 <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
//                   <span className="text-[10px] text-slate-500 block">
//                     LEVEL
//                   </span>
//                   <span className="font-mono font-bold text-cyan-400">
//                     {invaderLevel}
//                   </span>
//                 </div>

//                 <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
//                   <span className="text-[10px] text-slate-500 block">
//                     COMBO
//                   </span>
//                   <span className="font-mono font-bold text-purple-400">
//                     x{invaderCombo}
//                   </span>
//                 </div>

//                 <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
//                   <span className="text-[10px] text-slate-500 block">
//                     SHIELDS
//                   </span>

//                   <span className="font-mono font-bold text-rose-400">
//                     {'♥'.repeat(invaderLives)}

//                     <span className="text-slate-700">
//                       {'♥'.repeat(
//                         3 - invaderLives
//                       )}
//                     </span>
//                   </span>
//                 </div>

//               </div>
//             </div>

//             {/* GAME AREA */}
//             <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">

//               <div
//                 className="absolute inset-0 opacity-20"
//                 style={{
//                   backgroundImage:
//                     'linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)',
//                   backgroundSize:
//                     '32px 32px',
//                 }}
//               />

//               {/* FALLING WORDS */}
//               {invaderWords.map(word => (
//                 <div
//                   key={word.id}
//                   className="absolute transition-none"
//                   style={{
//                     left: `${word.x}%`,
//                     top: `${word.y}%`,
//                   }}
//                 >
//                   <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-sm font-bold shadow-lg shadow-amber-500/10">
//                     {word.text}
//                   </div>
//                 </div>
//               ))}

//               {/* SHIELD */}
//               <div className="absolute bottom-5 left-0 right-0 px-6">

//                 <div className="h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-lg shadow-cyan-400/30" />

//                 <div className="flex justify-center mt-2">
//                   <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-400">
//                     Defense Shield
//                   </span>
//                 </div>

//               </div>

//               {/* START */}
//               {!invadersActive &&
//                 !invaderGameOver && (
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/85 backdrop-blur-sm">

//                     <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
//                       <ShieldAlert className="w-10 h-10" />
//                     </div>

//                     <h3 className="text-xl font-black text-white">
//                       Word Invaders
//                     </h3>

//                     <p className="text-xs text-slate-400 max-w-sm mt-1 mb-5">
//                       Words will fall from the top.
//                       Type them quickly to score
//                       points and build your combo.
//                     </p>

//                     <button
//                       onClick={
//                         startInvadersGame
//                       }
//                       className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30"
//                     >
//                       <Play className="w-4 h-4 fill-current" />
//                       Launch Game
//                     </button>

//                   </div>
//                 )}

//               {/* GAME OVER */}
//               {invaderGameOver && (
//                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 backdrop-blur-md">

//                   <Trophy className="w-12 h-12 text-amber-400 mb-3" />

//                   <h3 className="text-2xl font-black text-white">
//                     Game Over
//                   </h3>

//                   <p className="text-sm text-slate-300 mt-1">
//                     Final Score:{' '}
//                     <strong className="text-amber-400 font-mono">
//                       {invaderScore}
//                     </strong>
//                   </p>

//                   <p className="text-xs text-slate-500 mt-1">
//                     Level {invaderLevel} • Best Combo x
//                     {invaderCombo}
//                   </p>

//                   <button
//                     onClick={
//                       startInvadersGame
//                     }
//                     className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
//                   >
//                     <RotateCcw className="w-4 h-4" />
//                     Play Again
//                   </button>

//                 </div>
//               )}

//             </div>

//             {/* INPUT */}
//             <div className="border-t border-slate-800 mt-4 pt-4">

//               <input
//                 ref={invaderInputRef}
//                 type="text"
//                 disabled={
//                   !invadersActive ||
//                   invaderGameOver
//                 }
//                 value={invaderInput}
//                 onChange={
//                   handleInvaderChange
//                 }
//                 placeholder={
//                   invadersActive
//                     ? 'Type a falling word...'
//                     : 'Launch the game to start typing'
//                 }
//                 className="w-full text-center py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
//               />

//             </div>

//           </div>
//         </div>
//       )}

//       {/* ========================================================
//           GAME 2 — SPEED RACER
//       ======================================================== */}

//       {selectedGame === 'racer' && (
//         <div className="space-y-4">

//           <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">

//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

//               <div>
//                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                   <Car className="w-5 h-5 text-amber-400" />
//                   Speed Racer 3000
//                 </h3>

//                 <p className="text-xs text-slate-400 mt-1">
//                   Complete 25 words and race
//                   against two AI challengers.
//                 </p>
//               </div>

//               {!racerActive &&
//                 !racerFinished && (
//                   <button
//                     onClick={
//                       startRacerGame
//                     }
//                     className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
//                   >
//                     <Play className="w-4 h-4 fill-current" />
//                     Start Grand Prix
//                   </button>
//                 )}

//             </div>

//             {/* RACE LANES */}
//             <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">

//               {/* PLAYER */}
//               <div>

//                 <div className="flex justify-between text-xs text-slate-400 mb-1">
//                   <span className="font-bold text-emerald-400">
//                     🏎️ You
//                   </span>

//                   <span className="font-mono">
//                     {racerPlayerProgress}%
//                   </span>
//                 </div>

//                 <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

//                   <div
//                     className="absolute inset-y-0 left-0 bg-emerald-500/20 border-r-2 border-emerald-400 transition-all duration-300"
//                     style={{
//                       width: `${racerPlayerProgress}%`,
//                     }}
//                   />

//                   <div
//                     className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
//                     style={{
//                       left: `${Math.max(
//                         5,
//                         Math.min(
//                           95,
//                           racerPlayerProgress
//                         )
//                       )}%`,
//                     }}
//                   >
//                     🚗
//                   </div>

//                 </div>
//               </div>

//               {/* TURBO BOT */}
//               <div>

//                 <div className="flex justify-between text-xs text-slate-400 mb-1">
//                   <span className="font-semibold text-cyan-400">
//                     🚙 Turbo Bot
//                   </span>

//                   <span className="font-mono">
//                     {Math.round(
//                       racerBot1Progress
//                     )}
//                     %
//                   </span>
//                 </div>

//                 <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

//                   <div
//                     className="absolute inset-y-0 left-0 bg-cyan-500/20 border-r-2 border-cyan-400 transition-all duration-300"
//                     style={{
//                       width: `${racerBot1Progress}%`,
//                     }}
//                   />

//                   <div
//                     className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
//                     style={{
//                       left: `${Math.max(
//                         5,
//                         Math.min(
//                           95,
//                           racerBot1Progress
//                         )
//                       )}%`,
//                     }}
//                   >
//                     🚙
//                   </div>

//                 </div>
//               </div>

//               {/* CYBER BOT */}
//               <div>

//                 <div className="flex justify-between text-xs text-slate-400 mb-1">
//                   <span className="font-semibold text-purple-400">
//                     🏎️ Cyber Bot
//                   </span>

//                   <span className="font-mono">
//                     {Math.round(
//                       racerBot2Progress
//                     )}
//                     %
//                   </span>
//                 </div>

//                 <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

//                   <div
//                     className="absolute inset-y-0 left-0 bg-purple-500/20 border-r-2 border-purple-400 transition-all duration-300"
//                     style={{
//                       width: `${racerBot2Progress}%`,
//                     }}
//                   />

//                   <div
//                     className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
//                     style={{
//                       left: `${Math.max(
//                         5,
//                         Math.min(
//                           95,
//                           racerBot2Progress
//                         )
//                       )}%`,
//                     }}
//                   >
//                     🏎️
//                   </div>

//                 </div>
//               </div>

//             </div>

//             {/* TYPING AREA */}
//             {racerActive &&
//               !racerFinished && (
//                 <div className="space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">

//                   <div className="flex items-center justify-between gap-3">

//                     <span className="text-xs text-slate-500">
//                       Word{' '}
//                       {Math.min(
//                         racerWordIndex + 1,
//                         25
//                       )}{' '}
//                       / 25
//                     </span>

//                     <span className="text-xs font-bold text-amber-400">
//                       {racerPlayerProgress}%
//                       complete
//                     </span>

//                   </div>

//                   <div className="flex flex-wrap gap-2 text-sm sm:text-base font-mono max-h-32 overflow-hidden">

//                     {racerWords.map(
//                       (word, index) => {
//                         const isDone =
//                           index <
//                           racerWordIndex;

//                         const isCurrent =
//                           index ===
//                           racerWordIndex;

//                         return (
//                           <span
//                             key={`${word}-${index}`}
//                             className={`px-2 py-1 rounded ${isDone
//                                 ? 'text-emerald-400 line-through'
//                                 : isCurrent
//                                   ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50'
//                                   : 'text-slate-600'
//                               }`}
//                           >
//                             {word}
//                           </span>
//                         );
//                       }
//                     )}

//                   </div>

//                   <input
//                     type="text"
//                     autoFocus
//                     value={racerInput}
//                     onChange={
//                       handleRacerInputChange
//                     }
//                     placeholder="Type the highlighted word + SPACE"
//                     className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                   />

//                 </div>
//               )}

//             {/* RESULT */}
//             {racerFinished && (
//               <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">

//                 <Trophy className="w-10 h-10 text-amber-400 mx-auto" />

//                 <h4 className="text-xl font-bold text-white">
//                   Race Completed!
//                 </h4>

//                 <p className="text-xs text-slate-400">
//                   Winner:{' '}
//                   <strong className="text-amber-400 font-bold">
//                     {racerWinner}
//                   </strong>
//                 </p>

//                 <button
//                   onClick={
//                     startRacerGame
//                   }
//                   className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
//                 >
//                   Race Again
//                 </button>

//               </div>
//             )}

//           </div>
//         </div>
//       )}

//       {/* ========================================================
//           GAME 3 — WORD RUSH
//       ======================================================== */}

//       {selectedGame === 'rush' && (
//         <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

//             <div>
//               <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                 <Zap className="w-5 h-5 text-orange-400" />
//                 Word Rush
//               </h3>

//               <p className="text-xs text-slate-400 mt-1">
//                 You have 60 seconds. Type target
//                 words as quickly and accurately
//                 as possible.
//               </p>
//             </div>

//             {!rushActive &&
//               !rushOver && (
//                 <button
//                   onClick={
//                     startRushGame
//                   }
//                   className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20"
//                 >
//                   <Play className="w-4 h-4 fill-current" />
//                   Start Word Rush
//                 </button>
//               )}

//           </div>


//           {/* STATS */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">

//             <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
//               <span className="text-[10px] uppercase tracking-wider text-slate-500">
//                 Time
//               </span>

//               <div className="text-lg font-black font-mono text-orange-400 mt-1">
//                 {rushTime}s
//               </div>
//             </div>

//             <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
//               <span className="text-[10px] uppercase tracking-wider text-slate-500">
//                 Score
//               </span>

//               <div className="text-lg font-black font-mono text-amber-400 mt-1">
//                 {rushScore}
//               </div>
//             </div>

//             <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
//               <span className="text-[10px] uppercase tracking-wider text-slate-500">
//                 Words
//               </span>

//               <div className="text-lg font-black font-mono text-cyan-400 mt-1">
//                 {rushWordsTyped}
//               </div>
//             </div>

//             <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
//               <span className="text-[10px] uppercase tracking-wider text-slate-500">
//                 Combo
//               </span>

//               <div className="text-lg font-black font-mono text-purple-400 mt-1 flex items-center gap-1">
//                 <Flame className="w-4 h-4" />
//                 {rushCombo}x
//               </div>
//             </div>

//           </div>

//           {/* GAME AREA */}
//           <div className="min-h-[340px] rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6">

//             {rushActive ? (
//               <>
//                 <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">
//                   <Target className="w-4 h-4 text-orange-400" />
//                   Type this word
//                 </div>

//                 <div className="text-4xl sm:text-6xl font-black font-mono text-orange-300 tracking-wider mb-8 text-center break-all">
//                   {rushTarget}
//                 </div>

//                 <div className="w-full max-w-xl">

//                   <input
//                     ref={rushInputRef}
//                     type="text"
//                     autoFocus
//                     value={rushInput}
//                     onChange={
//                       handleRushInput
//                     }
//                     placeholder="Type word + SPACE..."
//                     className="w-full text-center py-4 px-5 rounded-2xl bg-slate-900 border border-slate-700 text-base font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />

//                 </div>

//                 <div className="flex items-center gap-4 mt-5 text-xs text-slate-500">

//                   <span className="flex items-center gap-1">
//                     <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
//                     Correct: {rushCorrect}
//                   </span>

//                   <span>
//                     Errors: {rushMistakes}
//                   </span>

//                 </div>
//               </>
//             ) : rushOver ? (
//               <div className="text-center">

//                 <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />

//                 <h3 className="text-2xl font-black text-white">
//                   Word Rush Complete!
//                 </h3>

//                 <p className="text-sm text-slate-400 mt-2">
//                   Final Score:{' '}
//                   <strong className="text-amber-400">
//                     {rushScore}
//                   </strong>
//                 </p>

//                 <p className="text-xs text-slate-500 mt-1">
//                   {rushWordsTyped} words •{' '}
//                   {rushCorrect} correct •{' '}
//                   {rushMistakes} errors
//                 </p>

//                 <button
//                   onClick={
//                     startRushGame
//                   }
//                   className="mt-5 flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs"
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                   Play Again
//                 </button>

//               </div>
//             ) : (
//               <div className="text-center">

//                 <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 w-fit mx-auto mb-4">
//                   <Zap className="w-10 h-10" />
//                 </div>

//                 <h3 className="text-xl font-black text-white">
//                   Word Rush
//                 </h3>

//                 <p className="text-xs text-slate-400 max-w-sm mt-2">
//                   Type as many target words as
//                   possible in 60 seconds.
//                 </p>

//                 <button
//                   onClick={
//                     startRushGame
//                   }
//                   className="mt-5 flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-sm"
//                 >
//                   <Play className="w-4 h-4 fill-current" />
//                   Start Word Rush
//                 </button>

//               </div>
//             )}

//           </div>
//         </div>
//       )}

//       {/* GAME 4 — MONKEY TYPING BATTLE */}
//       {selectedGame === 'monkey' && (
//         <MonkeyTypingBattle
//           onBack={() => setSelectedGame('invaders')}
//         />
//       )}

//       {/* FOOTER */}
//       <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">

//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

//           <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
//             <Zap className="w-4 h-4" />
//           </div>

//           <div>
//             <p className="text-xs font-bold text-white">
//               Arcade Training
//             </p>

//             <p className="text-[11px] text-slate-500 mt-0.5">
//               Every completed game contributes
//               to your typing performance history
//               and XP progression.
//             </p>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// };

// export default TypingGamesView;


















import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Zap,
  Play,
  ShieldAlert,
  Car,
  Flame,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { COMMON_WORDS } from '../../data/mockData';

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
}

type GameId = 'invaders' | 'racer' | 'rush';

const TypingGamesView: React.FC = () => {
  const { recordTestResult } = useApp();

  const [selectedGame, setSelectedGame] =
    useState<GameId>('invaders');

  // ============================================================
  // COMMON HELPERS
  // ============================================================

  const randomWord = useCallback((maxWords = COMMON_WORDS.length) => {
    const limit = Math.min(COMMON_WORDS.length, maxWords);

    return COMMON_WORDS[
      Math.floor(Math.random() * limit)
    ];
  }, []);

  const shuffleWords = useCallback((count: number) => {
    return [...COMMON_WORDS]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }, []);

  const showConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: {
          y: 0.65,
        },
      });
    } catch {
      // Ignore confetti errors
    }
  };

  // ============================================================
  // GAME 1 — WORD INVADERS
  // ============================================================

  const [invadersActive, setInvadersActive] =
    useState(false);

  const [invaderWords, setInvaderWords] =
    useState<FallingWord[]>([]);

  const [invaderInput, setInvaderInput] =
    useState('');

  const [invaderScore, setInvaderScore] =
    useState(0);

  const [invaderLives, setInvaderLives] =
    useState(3);

  const [invaderGameOver, setInvaderGameOver] =
    useState(false);

  const [invaderLevel, setInvaderLevel] =
    useState(1);

  const [invaderCombo, setInvaderCombo] =
    useState(0);

  const invaderLoopRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const invaderSpawnRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const invaderInputRef =
    useRef<HTMLInputElement>(null);

  const invaderResultRecordedRef =
    useRef(false);

  const stopInvadersGame = useCallback(() => {
    setInvadersActive(false);

    if (invaderLoopRef.current) {
      clearInterval(invaderLoopRef.current);
      invaderLoopRef.current = null;
    }

    if (invaderSpawnRef.current) {
      clearInterval(invaderSpawnRef.current);
      invaderSpawnRef.current = null;
    }
  }, []);

  const startInvadersGame = () => {
    stopInvadersGame();

    invaderResultRecordedRef.current = false;

    setInvadersActive(true);
    setInvaderGameOver(false);
    setInvaderScore(0);
    setInvaderLives(3);
    setInvaderLevel(1);
    setInvaderCombo(0);
    setInvaderInput('');

    setInvaderWords([
      {
        id: Date.now(),
        text: randomWord(40),
        x: 30,
        y: 5,
        speed: 0.6,
      },
    ]);

    setTimeout(() => {
      invaderInputRef.current?.focus();
    }, 100);
  };

  const recordInvaderResult = useCallback(() => {
    if (invaderResultRecordedRef.current) return;

    invaderResultRecordedRef.current = true;

    const estimatedWords = Math.max(
      1,
      Math.round(invaderScore / 100)
    );

    const estimatedWpm = Math.max(
      20,
      Math.min(90, 25 + estimatedWords * 2)
    );

    recordTestResult({
      title: 'Word Invaders',
      type: 'practice',
      durationSeconds: 60,
      grossWpm: estimatedWpm,
      netWpm: Math.max(15, estimatedWpm - 4),
      accuracy: Math.min(
        100,
        Math.max(70, 90 + invaderCombo)
      ),
      totalKeystrokes: Math.max(
        20,
        estimatedWords * 5
      ),
      correctKeystrokes: Math.max(
        15,
        estimatedWords * 5 - 5
      ),
      errorCount: 5,
      errorKeys: {},
      consistencyScore: Math.min(
        100,
        70 + invaderLevel * 5
      ),
      xpEarned: Math.max(
        40,
        Math.min(150, 40 + invaderLevel * 15)
      ),
    });
  }, [
    recordTestResult,
    invaderScore,
    invaderCombo,
    invaderLevel,
  ]);

  // Invader movement
  useEffect(() => {
    if (!invadersActive || invaderGameOver) return;

    invaderLoopRef.current = setInterval(() => {
      setInvaderWords(prevWords => {
        const nextWords: FallingWord[] = [];
        let lostLife = false;

        for (const word of prevWords) {
          const nextY = word.y + word.speed;

          if (nextY >= 88) {
            lostLife = true;
          } else {
            nextWords.push({
              ...word,
              y: nextY,
            });
          }
        }

        if (lostLife) {
          soundManager.playError();

          setInvaderLives(lives => {
            const nextLives = lives - 1;

            if (nextLives <= 0) {
              setInvaderGameOver(true);
              setInvadersActive(false);
            }

            return Math.max(0, nextLives);
          });

          setInvaderCombo(0);
        }

        return nextWords;
      });
    }, 100);

    return () => {
      if (invaderLoopRef.current) {
        clearInterval(invaderLoopRef.current);
        invaderLoopRef.current = null;
      }
    };
  }, [invadersActive, invaderGameOver]);

  // Invader spawning
  useEffect(() => {
    if (!invadersActive || invaderGameOver) return;

    const intervalTime = Math.max(
      1200,
      2600 - invaderLevel * 200
    );

    invaderSpawnRef.current = setInterval(() => {
      const word = randomWord(
        Math.min(
          COMMON_WORDS.length,
          50 + invaderLevel * 20
        )
      );

      const x =
        Math.floor(Math.random() * 75) + 5;

      const speed =
        0.5 + invaderLevel * 0.15;

      setInvaderWords(prev => {
        if (prev.length >= 6) return prev;

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: word,
            x,
            y: 0,
            speed,
          },
        ];
      });
    }, intervalTime);

    return () => {
      if (invaderSpawnRef.current) {
        clearInterval(invaderSpawnRef.current);
        invaderSpawnRef.current = null;
      }
    };
  }, [
    invadersActive,
    invaderGameOver,
    invaderLevel,
    randomWord,
  ]);

  useEffect(() => {
    if (invaderGameOver) {
      recordInvaderResult();
    }
  }, [
    invaderGameOver,
    recordInvaderResult,
  ]);

  const handleInvaderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setInvaderInput(value);

    soundManager.playKeypress(
      value.endsWith(' ')
    );

    const typedWord = value.trim().toLowerCase();

    const matchedIndex =
      invaderWords.findIndex(
        word =>
          word.text.toLowerCase() === typedWord
      );

    if (matchedIndex !== -1) {
      soundManager.playSuccess();

      const newCombo = invaderCombo + 1;
      const points = 100 * newCombo;

      setInvaderScore(score => score + points);
      setInvaderCombo(newCombo);

      if (
        invaderScore + points >=
        invaderLevel * 1200
      ) {
        setInvaderLevel(level => level + 1);
        soundManager.playLevelUp();
      }

      setInvaderWords(prev =>
        prev.filter(
          (_, index) => index !== matchedIndex
        )
      );

      setInvaderInput('');
    }
  };

  // ============================================================
  // GAME 2 — SPEED RACER 3000
  // ============================================================

  const [racerActive, setRacerActive] =
    useState(false);

  const [racerWords, setRacerWords] =
    useState<string[]>([]);

  const [racerWordIndex, setRacerWordIndex] =
    useState(0);

  const [racerInput, setRacerInput] =
    useState('');

  const [racerPlayerProgress, setRacerPlayerProgress] =
    useState(0);

  const [racerBot1Progress, setRacerBot1Progress] =
    useState(0);

  const [racerBot2Progress, setRacerBot2Progress] =
    useState(0);

  const [racerFinished, setRacerFinished] =
    useState(false);

  const [racerWinner, setRacerWinner] =
    useState<string | null>(null);

  const racerBotIntervalRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const racerResultRecordedRef =
    useRef(false);

  const racerFinishedRef =
    useRef(false);

  const stopRacerGame = useCallback(() => {
    setRacerActive(false);

    if (racerBotIntervalRef.current) {
      clearInterval(racerBotIntervalRef.current);
      racerBotIntervalRef.current = null;
    }
  }, []);

  const finishRacer = useCallback(
    (winner: string) => {
      if (racerFinishedRef.current) return;

      racerFinishedRef.current = true;

      if (racerBotIntervalRef.current) {
        clearInterval(
          racerBotIntervalRef.current
        );

        racerBotIntervalRef.current = null;
      }

      setRacerActive(false);
      setRacerFinished(true);
      setRacerWinner(winner);

      if (winner === 'You') {
        if (
          !racerResultRecordedRef.current
        ) {
          racerResultRecordedRef.current = true;

          showConfetti();
          soundManager.playLevelUp();

          const completedWords =
            Math.max(
              1,
              racerWordIndex + 1
            );

          const accuracy = Math.min(
            100,
            Math.max(
              85,
              94 +
              Math.floor(
                completedWords / 4
              )
            )
          );

          recordTestResult({
            title:
              'Speed Racer Grand Prix',
            type: 'practice',
            durationSeconds: 30,
            grossWpm: 72,
            netWpm: 68,
            accuracy,
            totalKeystrokes:
              completedWords * 5,
            correctKeystrokes: Math.max(
              1,
              completedWords * 5 - 3
            ),
            errorCount: 3,
            errorKeys: {},
            consistencyScore: 92,
            xpEarned: 180,
          });
        }
      } else {
        soundManager.playError();
      }
    },
    [
      recordTestResult,
      racerWordIndex,
    ]
  );

  const startRacerGame = () => {
    stopRacerGame();

    racerResultRecordedRef.current = false;
    racerFinishedRef.current = false;

    const words = shuffleWords(25);

    setRacerWords(words);
    setRacerWordIndex(0);
    setRacerInput('');
    setRacerPlayerProgress(0);
    setRacerBot1Progress(0);
    setRacerBot2Progress(0);
    setRacerFinished(false);
    setRacerWinner(null);
    setRacerActive(true);

    racerBotIntervalRef.current =
      setInterval(() => {
        setRacerBot1Progress(progress => {
          const next =
            progress + 2.2;

          if (
            next >= 100 &&
            !racerFinishedRef.current
          ) {
            finishRacer('Turbo Bot');
          }

          return Math.min(100, next);
        });

        setRacerBot2Progress(progress => {
          const next =
            progress + 3;

          if (
            next >= 100 &&
            !racerFinishedRef.current
          ) {
            finishRacer('Cyber Bot');
          }

          return Math.min(100, next);
        });
      }, 1000);
  };

  const handleRacerInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setRacerInput(value);

    soundManager.playKeypress(
      value.endsWith(' ')
    );

    const currentWord =
      racerWords[racerWordIndex];

    if (
      currentWord &&
      value
        .trim()
        .toLowerCase() ===
      currentWord.toLowerCase() &&
      value.endsWith(' ')
    ) {
      soundManager.playSuccess();

      const nextIndex =
        racerWordIndex + 1;

      setRacerWordIndex(nextIndex);
      setRacerInput('');

      const progress = Math.round(
        (nextIndex /
          racerWords.length) *
        100
      );

      setRacerPlayerProgress(progress);

      if (progress >= 100) {
        finishRacer('You');
      }
    }
  };

  // ============================================================
  // GAME 3 — WORD RUSH
  // ============================================================

  const [rushActive, setRushActive] =
    useState(false);

  const [rushTarget, setRushTarget] =
    useState('');

  const [rushInput, setRushInput] =
    useState('');

  const [rushScore, setRushScore] =
    useState(0);

  const [rushWordsTyped, setRushWordsTyped] =
    useState(0);

  const [rushCombo, setRushCombo] =
    useState(0);

  const [rushCorrect, setRushCorrect] =
    useState(0);

  const [rushMistakes, setRushMistakes] =
    useState(0);

  const [rushOver, setRushOver] =
    useState(false);

  const [rushTime, setRushTime] =
    useState(60);

  const rushInputRef =
    useRef<HTMLInputElement>(null);

  const rushTimerRef =
    useRef<ReturnType<typeof setInterval> | null>(null);

  const rushResultRecordedRef =
    useRef(false);

  const rushCorrectRef =
    useRef(0);

  const rushMistakesRef =
    useRef(0);

  const rushScoreRef =
    useRef(0);

  const rushComboRef =
    useRef(0);

  const stopRushGame = useCallback(() => {
    setRushActive(false);

    if (rushTimerRef.current) {
      clearInterval(rushTimerRef.current);
      rushTimerRef.current = null;
    }
  }, []);

  const finishRush = useCallback(() => {
    if (!rushActive) return;

    stopRushGame();
    setRushOver(true);

    if (rushResultRecordedRef.current) {
      return;
    }

    rushResultRecordedRef.current = true;

    const totalAttempts =
      rushCorrectRef.current +
      rushMistakesRef.current;

    const accuracy =
      totalAttempts > 0
        ? Math.round(
          (rushCorrectRef.current /
            totalAttempts) *
          100
        )
        : 0;

    const estimatedWpm = Math.max(
      20,
      Math.min(
        100,
        rushCorrectRef.current * 2
      )
    );

    showConfetti();
    soundManager.playLevelUp();

    recordTestResult({
      title: 'Word Rush',
      type: 'practice',
      durationSeconds: 60,
      grossWpm: estimatedWpm,
      netWpm: Math.max(
        15,
        estimatedWpm -
        Math.floor(
          rushMistakesRef.current / 2
        )
      ),
      accuracy,
      totalKeystrokes:
        Math.max(1, totalAttempts * 5),
      correctKeystrokes:
        Math.max(
          1,
          rushCorrectRef.current * 5
        ),
      errorCount:
        rushMistakesRef.current,
      errorKeys: {},
      consistencyScore: Math.max(
        50,
        accuracy
      ),
      xpEarned: Math.max(
        50,
        Math.min(
          180,
          50 +
          rushCorrectRef.current * 3
        )
      ),
    });
  }, [
    recordTestResult,
    rushActive,
    stopRushGame,
  ]);

  const startRushGame = () => {
    stopRushGame();

    rushResultRecordedRef.current = false;

    rushCorrectRef.current = 0;
    rushMistakesRef.current = 0;
    rushScoreRef.current = 0;
    rushComboRef.current = 0;

    setRushActive(true);
    setRushOver(false);
    setRushTime(60);
    setRushScore(0);
    setRushWordsTyped(0);
    setRushCombo(0);
    setRushCorrect(0);
    setRushMistakes(0);
    setRushInput('');
    setRushTarget(randomWord());

    setTimeout(() => {
      rushInputRef.current?.focus();
    }, 100);

    rushTimerRef.current =
      setInterval(() => {
        setRushTime(time => {
          if (time <= 1) {
            return 0;
          }

          return time - 1;
        });
      }, 1000);
  };

  useEffect(() => {
    if (
      rushActive &&
      rushTime <= 0
    ) {
      finishRush();
    }
  }, [
    rushActive,
    rushTime,
    finishRush,
  ]);

  const handleRushInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setRushInput(value);

    soundManager.playKeypress(
      value.endsWith(' ')
    );

    if (!value.endsWith(' ')) {
      return;
    }

    const typedWord =
      value.trim().toLowerCase();

    const targetWord =
      rushTarget.trim().toLowerCase();

    if (typedWord === targetWord) {
      soundManager.playSuccess();

      const newCombo =
        rushComboRef.current + 1;

      const points =
        100 + newCombo * 10;

      rushCorrectRef.current += 1;
      rushScoreRef.current += points;
      rushComboRef.current =
        newCombo;

      setRushCorrect(
        rushCorrectRef.current
      );

      setRushScore(
        rushScoreRef.current
      );

      setRushCombo(
        rushComboRef.current
      );

      setRushWordsTyped(
        count => count + 1
      );

      setRushInput('');
      setRushTarget(randomWord());
    } else {
      soundManager.playError();

      rushMistakesRef.current += 1;
      rushComboRef.current = 0;

      rushScoreRef.current =
        Math.max(
          0,
          rushScoreRef.current - 25
        );

      setRushMistakes(
        rushMistakesRef.current
      );

      setRushCombo(0);

      setRushScore(
        rushScoreRef.current
      );

      setRushInput('');
    }
  };

  // ============================================================
  // CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      if (invaderLoopRef.current) {
        clearInterval(
          invaderLoopRef.current
        );
      }

      if (invaderSpawnRef.current) {
        clearInterval(
          invaderSpawnRef.current
        );
      }

      if (racerBotIntervalRef.current) {
        clearInterval(
          racerBotIntervalRef.current
        );
      }

      if (rushTimerRef.current) {
        clearInterval(
          rushTimerRef.current
        );
      }
    };
  }, []);

  // ============================================================
  // GAME SWITCHING
  // ============================================================

  const changeGame = (game: GameId) => {
    stopInvadersGame();
    stopRacerGame();
    stopRushGame();

    setSelectedGame(game);
  };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Gamepad2 className="w-5 h-5" />
              </span>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Arcade Typing Games
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-400">
              Improve typing speed, accuracy and
              keyboard reflexes through quick
              arcade challenges.
            </p>
          </div>

          {/* GAME TABS */}
          <div className="grid grid-cols-3 gap-1 p-1.5 bg-slate-950/70 border border-slate-800 rounded-2xl">

            <button
              onClick={() =>
                changeGame('invaders')
              }
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'invaders'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              Invaders
            </button>

            <button
              onClick={() =>
                changeGame('racer')
              }
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'racer'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              Racer
            </button>

            <button
              onClick={() =>
                changeGame('rush')
              }
              className={`px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${selectedGame === 'rush'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              Rush
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          GAME 1 — WORD INVADERS
      ======================================================== */}

      {selectedGame === 'invaders' && (
        <div className="space-y-4">

          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

            {/* STATS */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  Word Invaders
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  Type the falling words before
                  they reach the bottom shield.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">

                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    SCORE
                  </span>
                  <span className="font-mono font-bold text-amber-400">
                    {invaderScore}
                  </span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    LEVEL
                  </span>
                  <span className="font-mono font-bold text-cyan-400">
                    {invaderLevel}
                  </span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    COMBO
                  </span>
                  <span className="font-mono font-bold text-purple-400">
                    x{invaderCombo}
                  </span>
                </div>

                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">
                    SHIELDS
                  </span>

                  <span className="font-mono font-bold text-rose-400">
                    {'♥'.repeat(invaderLives)}

                    <span className="text-slate-700">
                      {'♥'.repeat(
                        3 - invaderLives
                      )}
                    </span>
                  </span>
                </div>

              </div>
            </div>

            {/* GAME AREA */}
            <div className="relative h-[420px] sm:h-[500px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">

              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)',
                  backgroundSize:
                    '32px 32px',
                }}
              />

              {/* FALLING WORDS */}
              {invaderWords.map(word => (
                <div
                  key={word.id}
                  className="absolute transition-none"
                  style={{
                    left: `${word.x}%`,
                    top: `${word.y}%`,
                  }}
                >
                  <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/40 text-amber-300 font-mono text-sm font-bold shadow-lg shadow-amber-500/10">
                    {word.text}
                  </div>
                </div>
              ))}

              {/* SHIELD */}
              <div className="absolute bottom-5 left-0 right-0 px-6">

                <div className="h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full shadow-lg shadow-cyan-400/30" />

                <div className="flex justify-center mt-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-cyan-400">
                    Defense Shield
                  </span>
                </div>

              </div>

              {/* START */}
              {!invadersActive &&
                !invaderGameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/85 backdrop-blur-sm">

                    <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
                      <ShieldAlert className="w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-black text-white">
                      Word Invaders
                    </h3>

                    <p className="text-xs text-slate-400 max-w-sm mt-1 mb-5">
                      Words will fall from the top.
                      Type them quickly to score
                      points and build your combo.
                    </p>

                    <button
                      onClick={
                        startInvadersGame
                      }
                      className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Launch Game
                    </button>

                  </div>
                )}

              {/* GAME OVER */}
              {invaderGameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-950/90 backdrop-blur-md">

                  <Trophy className="w-12 h-12 text-amber-400 mb-3" />

                  <h3 className="text-2xl font-black text-white">
                    Game Over
                  </h3>

                  <p className="text-sm text-slate-300 mt-1">
                    Final Score:{' '}
                    <strong className="text-amber-400 font-mono">
                      {invaderScore}
                    </strong>
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    Level {invaderLevel} • Best Combo x
                    {invaderCombo}
                  </p>

                  <button
                    onClick={
                      startInvadersGame
                    }
                    className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </button>

                </div>
              )}

            </div>

            {/* INPUT
            <div className="border-t border-slate-800 mt-4 pt-4">

              <input
                ref={invaderInputRef}
                type="text"
                disabled={
                  !invadersActive ||
                  invaderGameOver
                }
                value={invaderInput}
                onChange={
                  handleInvaderChange
                }
                placeholder={
                  invadersActive
                    ? 'Type a falling word...'
                    : 'Launch the game to start typing'
                }
                className="w-full text-center py-3 px-4 rounded-xl bg-slate-950 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              /> */}
            {/* INPUT */}
            <div className="border-t border-slate-800 mt-4 pt-4">

              <input
                ref={invaderInputRef}
                type="text"
                disabled={
                  !invadersActive ||
                  invaderGameOver
                }
                value={invaderInput}
                onChange={
                  handleInvaderChange
                }
                placeholder={
                  invadersActive
                    ? 'Type a falling word...'
                    : 'Launch the game to start typing'
                }
                className="w-full text-center py-3 px-4 rounded-xl bg-slate-950 border-2 border-amber-500/80 !text-amber-300 placeholder-slate-600 text-lg font-mono font-black tracking-widest focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)] drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
              />
            </div>

          </div>

        </div>
      )
      }

      {/* ========================================================
          GAME 2 — SPEED RACER
      ======================================================== */}

      {
        selectedGame === 'racer' && (
          <div className="space-y-4">

            <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Car className="w-5 h-5 text-amber-400" />
                    Speed Racer 3000
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Complete 25 words and race
                    against two AI challengers.
                  </p>
                </div>

                {!racerActive &&
                  !racerFinished && (
                    <button
                      onClick={
                        startRacerGame
                      }
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Start Grand Prix
                    </button>
                  )}

              </div>

              {/* RACE LANES */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">

                {/* PLAYER */}
                <div>

                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span className="font-bold text-emerald-400">
                      🏎️ You
                    </span>

                    <span className="font-mono">
                      {racerPlayerProgress}%
                    </span>
                  </div>

                  <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-500/20 border-r-2 border-emerald-400 transition-all duration-300"
                      style={{
                        width: `${racerPlayerProgress}%`,
                      }}
                    />

                    <div
                      className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
                      style={{
                        left: `${Math.max(
                          5,
                          Math.min(
                            95,
                            racerPlayerProgress
                          )
                        )}%`,
                      }}
                    >
                      🚗
                    </div>

                  </div>
                </div>

                {/* TURBO BOT */}
                <div>

                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-cyan-400">
                      🚙 Turbo Bot
                    </span>

                    <span className="font-mono">
                      {Math.round(
                        racerBot1Progress
                      )}
                      %
                    </span>
                  </div>

                  <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

                    <div
                      className="absolute inset-y-0 left-0 bg-cyan-500/20 border-r-2 border-cyan-400 transition-all duration-300"
                      style={{
                        width: `${racerBot1Progress}%`,
                      }}
                    />

                    <div
                      className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
                      style={{
                        left: `${Math.max(
                          5,
                          Math.min(
                            95,
                            racerBot1Progress
                          )
                        )}%`,
                      }}
                    >
                      🚙
                    </div>

                  </div>
                </div>

                {/* CYBER BOT */}
                <div>

                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span className="font-semibold text-purple-400">
                      🏎️ Cyber Bot
                    </span>

                    <span className="font-mono">
                      {Math.round(
                        racerBot2Progress
                      )}
                      %
                    </span>
                  </div>

                  <div className="relative w-full h-9 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">

                    <div
                      className="absolute inset-y-0 left-0 bg-purple-500/20 border-r-2 border-purple-400 transition-all duration-300"
                      style={{
                        width: `${racerBot2Progress}%`,
                      }}
                    />

                    <div
                      className="absolute top-1 text-lg transition-all duration-300 -translate-x-1/2"
                      style={{
                        left: `${Math.max(
                          5,
                          Math.min(
                            95,
                            racerBot2Progress
                          )
                        )}%`,
                      }}
                    >
                      🏎️
                    </div>

                  </div>
                </div>

              </div>

              {/* TYPING AREA */}
              {racerActive &&
                !racerFinished && (
                  <div className="space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs text-slate-500">
                        Word{' '}
                        {Math.min(
                          racerWordIndex + 1,
                          25
                        )}{' '}
                        / 25
                      </span>

                      <span className="text-xs font-bold text-amber-400">
                        {racerPlayerProgress}%
                        complete
                      </span>

                    </div>

                    <div className="flex flex-wrap gap-2 text-sm sm:text-base font-mono max-h-32 overflow-hidden">

                      {racerWords.map(
                        (word, index) => {
                          const isDone =
                            index <
                            racerWordIndex;

                          const isCurrent =
                            index ===
                            racerWordIndex;

                          return (
                            <span
                              key={`${word}-${index}`}
                              className={`px-2 py-1 rounded ${isDone
                                ? 'text-emerald-400 line-through'
                                : isCurrent
                                  ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/50'
                                  : 'text-slate-600'
                                }`}
                            >
                              {word}
                            </span>
                          );
                        }
                      )}

                    </div>

                    <input
                      type="text"
                      autoFocus
                      value={racerInput}
                      onChange={
                        handleRacerInputChange
                      }
                      placeholder="Type the highlighted word + SPACE"
                      // className="w-full py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      className="w-full text-center py-3 px-4 rounded-xl bg-slate-950 border-2 border-emerald-500/80 !text-emerald-300 placeholder-slate-600 text-lg font-mono font-black tracking-widest focus:outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)] drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]"
                    />

                  </div>
                )}

              {/* RESULT */}
              {racerFinished && (
                <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">

                  <Trophy className="w-10 h-10 text-amber-400 mx-auto" />

                  <h4 className="text-xl font-bold text-white">
                    Race Completed!
                  </h4>

                  <p className="text-xs text-slate-400">
                    Winner:{' '}
                    <strong className="text-amber-400 font-bold">
                      {racerWinner}
                    </strong>
                  </p>

                  <button
                    onClick={
                      startRacerGame
                    }
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Race Again
                  </button>

                </div>
              )}

            </div>
          </div>
        )
      }

      {/* ========================================================
          GAME 3 — WORD RUSH
      ======================================================== */}

      {
        selectedGame === 'rush' && (
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">

              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  Word Rush
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  You have 60 seconds. Type target
                  words as quickly and accurately
                  as possible.
                </p>
              </div>

              {!rushActive &&
                !rushOver && (
                  <button
                    onClick={
                      startRushGame
                    }
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/20"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Start Word Rush
                  </button>
                )}

            </div>


            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Time
                </span>

                <div className="text-lg font-black font-mono text-orange-400 mt-1">
                  {rushTime}s
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Score
                </span>

                <div className="text-lg font-black font-mono text-amber-400 mt-1">
                  {rushScore}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Words
                </span>

                <div className="text-lg font-black font-mono text-cyan-400 mt-1">
                  {rushWordsTyped}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  Combo
                </span>

                <div className="text-lg font-black font-mono text-purple-400 mt-1 flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {rushCombo}x
                </div>
              </div>

            </div>

            {/* GAME AREA */}
            <div className="min-h-[340px] rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6">

              {rushActive ? (
                <>
                  <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-[0.2em] mb-4">
                    <Target className="w-4 h-4 text-orange-400" />
                    Type this word
                  </div>

                  <div className="text-4xl sm:text-6xl font-black font-mono text-orange-300 tracking-wider mb-8 text-center break-all">
                    {rushTarget}
                  </div>

                  <div className="w-full max-w-xl">

                    <input
                      ref={rushInputRef}
                      type="text"
                      autoFocus
                      value={rushInput}
                      onChange={
                        handleRushInput
                      }
                      placeholder="Type word + SPACE..."
                      // className="w-full text-center py-4 px-5 rounded-2xl bg-slate-900 border border-slate-700 text-base font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      className="w-full text-center py-3 px-4 rounded-xl bg-slate-950 border-2 border-cyan-500/80 !text-cyan-300 placeholder-slate-600 text-lg font-mono font-black tracking-widest focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)] drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />

                  </div>

                  <div className="flex items-center gap-4 mt-5 text-xs text-slate-500">

                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Correct: {rushCorrect}
                    </span>

                    <span>
                      Errors: {rushMistakes}
                    </span>

                  </div>
                </>
              ) : rushOver ? (
                <div className="text-center">

                  <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />

                  <h3 className="text-2xl font-black text-white">
                    Word Rush Complete!
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    Final Score:{' '}
                    <strong className="text-amber-400">
                      {rushScore}
                    </strong>
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {rushWordsTyped} words •{' '}
                    {rushCorrect} correct •{' '}
                    {rushMistakes} errors
                  </p>

                  <button
                    onClick={
                      startRushGame
                    }
                    className="mt-5 flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                  </button>

                </div>
              ) : (
                <div className="text-center">

                  <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 w-fit mx-auto mb-4">
                    <Zap className="w-10 h-10" />
                  </div>

                  <h3 className="text-xl font-black text-white">
                    Word Rush
                  </h3>

                  <p className="text-xs text-slate-400 max-w-sm mt-2">
                    Type as many target words as
                    possible in 60 seconds.
                  </p>

                  <button
                    onClick={
                      startRushGame
                    }
                    className="mt-5 flex items-center gap-2 mx-auto px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 text-slate-950 font-black text-sm"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Start Word Rush
                  </button>

                </div>
              )}

            </div>
          </div>
        )
      }


      {/* FOOTER */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4" />
          </div>

          <div>
            <p className="text-xs font-bold text-white">
              Arcade Training
            </p>

            <p className="text-[11px] text-slate-500 mt-0.5">
              Every completed game contributes
              to your typing performance history
              and XP progression.
            </p>
          </div>

        </div>
      </div>

    </div >
  );
};

export default TypingGamesView;