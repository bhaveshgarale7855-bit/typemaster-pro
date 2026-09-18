// import React, {
//     useCallback,
//     useEffect,
//     useMemo,
//     useRef,
//     useState,
// } from 'react';

// import {
//     CheckCircle2,
//     Target,
//     XCircle,
// } from 'lucide-react';

// import confetti from 'canvas-confetti';

// import { TypingPassage } from '../../types';
// import { useApp } from '../../context/AppContext';
// import { soundManager } from '../../utils/audio';

// interface GCCTBCTestProps {
//     passage: TypingPassage;
//     targetWpm: 30 | 40 | 50;
//     language: 'English' | 'Marathi' | 'Hindi';
//     keyboardType?: 'Remington' | 'Typewriter' | 'InScript';
//     onExit: () => void;
//     onChangePassage?: () => void;
// }

// type TestStatus = 'ready' | 'running' | 'finished';

// interface TestMetrics {
//     grossWpm: number;
//     netWpm: number;
//     accuracy: number;
//     wrongWords: number;
//     correctChars: number;
//     totalChars: number;
// }

// const PASS_ACCURACY = 90;

// const REMINGTON_NORMAL: Record<string, string> = {
//     'a': 'ं', 'b': 'इ', 'c': 'ब', 'd': 'क', 'e': 'म', 'f': 'ि',
//     'g': 'ह', 'h': 'ी', 'i': 'प', 'j': 'र', 'k': 'ा', 'l': 'स',
//     'm': 'उ', 'n': 'द', 'o': 'व', 'p': 'च', 'q': 'ु', 'r': 'त',
//     's': 'े', 't': 'ज', 'u': 'न', 'v': 'अ', 'w': 'ू', 'x': 'ग',
//     'y': 'ल', 'z': '्र',
//     '`': '़', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५',
//     '6': '६', '7': '७', '8': '८', '9': '९', '0': '०',
//     '-': 'ञ', '=': 'ृ', '[': 'ख्', ']': ',', '\\': '.',
//     ';': 'य', '\'': 'श्', ',': 'ए', '.': 'ण्', '/': 'ध'
// };

// const REMINGTON_SHIFT: Record<string, string> = {
//     'A': 'ा', 'B': 'ठ', 'C': 'ब्', 'D': 'क्', 'E': 'म्', 'F': 'थ्',
//     'G': 'ळ', 'H': 'भ्', 'I': 'प्', 'J': 'श्र', 'K': 'ज्ञ', 'L': 'स्',
//     'M': 'ड', 'N': 'छ', 'O': 'व्', 'P': 'च्', 'Q': 'फ', 'R': 'त्',
//     'S': 'ै', 'T': 'ज्', 'U': 'न्', 'V': 'ट', 'W': 'ॅ', 'X': 'ग्',
//     'Y': 'ल्', 'Z': 'र्',
//     '~': 'द्य', '!': '।', '@': '/', '#': ':', '$': 'रऱ्', '%': '-',
//     '^': '"', '&': "'", '*': 'द्ध', '(': 'त्र', ')': 'ऋ', '_': '.',
//     '+': '्', '{': 'क्ष्', '}': 'द्व', '|': '', ':': 'रू', '"': 'ष्',
//     '<': 'ढ', '>': 'झ', '?': 'घ्'
// };

// // MASTER REMINGTON ENGINE FIX (HINDI & MARATHI)
// const fixDevanagariRemington = (text: string): string => {
//     if (!text) return '';

//     return text
//         // 1. Reph Reordering Fix (उदा. चर् -> र्च, खर्च् -> खर्च)
//         .replace(/([\u0905-\u0939](?:\u094D[\u0905-\u0939])*(?:[\u093E-\u094C\u0901-\u0903])?)(र्)/g, 'र्$1')

//         // 2. Chhoti 'i' Matra & Halant Fix (उदा. ण्िा -> णि, क्िा -> कि)
//         .replace(/([\u0900-\u097F])्िा/g, '$1ि')
//         .replace(/([\u0900-\u097F])्ि/g, '$1ि')

//         // 3. Vowels Auto-Composition (स्वर सुधार)
//         .replace(/अा/g, 'आ')
//         .replace(/आे/g, 'ओ')
//         .replace(/आै/g, 'औ')
//         .replace(/इी/g, 'ई')
//         .replace(/उू/g, 'ऊ')
//         .replace(/एे/g, 'ऐ')
//         .replace(/अॅ/g, 'ॲ')
//         .replace(/आॅ/g, 'ऑ')

//         // 4. Double Matra Fix
//         .replace(/ाे/g, 'ो')
//         .replace(/ाै/g, 'ौ')
//         .replace(/ाॅ/g, 'ॉ')

//         // 5. Hindi Nukta Merge (ड़, ढ़, ज़, फ़, ख़, ग़, क़)
//         .replace(/क़/g, 'क़')
//         .replace(/ख़/g, 'ख़')
//         .replace(/ग़/g, 'ग़')
//         .replace(/ज़/g, 'ज़')
//         .replace(/फ़/g, 'फ़')
//         .replace(/ड़/g, 'ड़')
//         .replace(/ढ़/g, 'ढ़')

//         .normalize('NFC');
// };

// const getGraphemes = (text: string): string[] => {
//     if (!text) return [];
//     const normalized = fixDevanagariRemington(text);
//     const devanagariRegex = /(?:\p{L}(?:\u094D[\u200D\u200C]?\p{L})*\p{M}*[\u200D\u200C]?|\p{N}+|\s+|[^\p{L}\p{N}\s]+)/gu;
//     const matches = normalized.match(devanagariRegex);
//     return matches ? Array.from(matches) : Array.from(normalized);
// };

// const tokenizeWords = (text: string): string[] => {
//     return fixDevanagariRemington(text).trim().split(/\s+/).filter(Boolean);
// };

// const calculateWrongWords = (sourceText: string, typedText: string): number => {
//     const sourceWords = tokenizeWords(sourceText);
//     const typedWords = tokenizeWords(typedText);
//     const sourceLength = sourceWords.length;
//     const typedLength = typedWords.length;

//     if (sourceLength === 0) return typedLength;
//     if (typedLength === 0) return sourceLength;

//     const dp: number[][] = Array.from(
//         { length: sourceLength + 1 },
//         () => Array(typedLength + 1).fill(0)
//     );

//     for (let i = 0; i <= sourceLength; i++) dp[i][0] = i;
//     for (let j = 0; j <= typedLength; j++) dp[0][j] = j;

//     for (let i = 1; i <= sourceLength; i++) {
//         for (let j = 1; j <= typedLength; j++) {
//             const substitutionCost = sourceWords[i - 1] === typedWords[j - 1] ? 0 : 1;
//             dp[i][j] = Math.min(
//                 dp[i - 1][j - 1] + substitutionCost,
//                 dp[i - 1][j] + 1,
//                 dp[i][j - 1] + 1
//             );
//         }
//     }
//     return dp[sourceLength][typedLength];
// };

// const calculateMetricsDirect = (
//     sourceText: string,
//     typedText: string,
//     elapsedSeconds: number
// ): TestMetrics => {
//     const sourceUnits = getGraphemes(sourceText);
//     const typedUnits = getGraphemes(typedText);
//     const totalChars = typedUnits.length;
//     let correctChars = 0;

//     const compareLength = Math.min(sourceUnits.length, typedUnits.length);
//     for (let i = 0; i < compareLength; i++) {
//         if (sourceUnits[i] === typedUnits[i]) {
//             correctChars++;
//         }
//     }

//     const accuracy = totalChars === 0 ? 100 : Math.max(0, Math.min(100, (correctChars / totalChars) * 100));
//     const safeMinutes = Math.max(elapsedSeconds, 1) / 60;
//     const grossWpm = (totalChars / 5) / safeMinutes;
//     const netWpm = grossWpm * (accuracy / 100);

//     return {
//         grossWpm,
//         netWpm,
//         accuracy,
//         wrongWords: calculateWrongWords(sourceText, typedText),
//         correctChars,
//         totalChars,
//     };
// };

// export const GCCTBCTest: React.FC<GCCTBCTestProps> = ({
//     passage,
//     targetWpm,
//     language,
//     keyboardType = 'Remington',
//     onExit,
// }) => {
//     const { recordTestResult } = useApp();

//     const [status, setStatus] = useState<TestStatus>('ready');
//     const [displayTypedText, setDisplayTypedText] = useState('');
//     const [elapsedSeconds, setElapsedSeconds] = useState(0);
//     const [finalMetrics, setFinalMetrics] = useState<TestMetrics | null>(null);

//     const textareaRef = useRef<HTMLTextAreaElement | null>(null);
//     const typedTextRef = useRef('');
//     const elapsedSecondsRef = useRef(0);
//     const hasFinishedRef = useRef(false);
//     const pendingPrefixMatraRef = useRef<string | null>(null);

//     const passageWordCount = useMemo(() => tokenizeWords(passage.content).length, [passage.content]);
//     const sourceUnits = useMemo(() => getGraphemes(passage.content), [passage.content]);

//     const timeLimitSeconds = useMemo(() => {
//         if (targetWpm === 30) return 7 * 60;
//         const words = Math.max(1, passageWordCount);
//         return Math.max(60, Math.ceil((words / targetWpm) * 60));
//     }, [passageWordCount, targetWpm]);

//     const formatTime = (seconds: number): string => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
//     };

//     const finishTest = useCallback(
//         (finalTypedText = typedTextRef.current, finalElapsedSeconds = elapsedSecondsRef.current) => {
//             if (hasFinishedRef.current) return;
//             hasFinishedRef.current = true;

//             const normalizedTypedText = fixDevanagariRemington(finalTypedText);
//             const metrics = calculateMetricsDirect(passage.content, normalizedTypedText, finalElapsedSeconds);
//             setDisplayTypedText(normalizedTypedText);

//             const passed = metrics.netWpm >= targetWpm && metrics.accuracy >= PASS_ACCURACY;
//             const xpEarned = passed ? 100 + targetWpm : 40;

//             setFinalMetrics(metrics);
//             setElapsedSeconds(finalElapsedSeconds);
//             setStatus('finished');

//             recordTestResult({
//                 title: `GCC-TBC Remington Test - ${targetWpm} WPM`,
//                 type: 'test',
//                 duration: finalElapsedSeconds,
//                 grossWpm: Math.round(metrics.grossWpm),
//                 netWpm: Math.round(metrics.netWpm),
//                 accuracy: Math.round(metrics.accuracy),
//                 totalKeystrokes: metrics.totalChars,
//                 correctKeystrokes: metrics.correctChars,
//                 errorCount: Math.max(0, metrics.totalChars - metrics.correctChars),
//                 consistencyScore: Math.round(metrics.accuracy),
//                 errorKeys: {},
//                 xpEarned,
//                 timestamp: new Date().toISOString(),
//             });

//             if (passed) {
//                 soundManager.playSuccess();
//                 confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
//             } else {
//                 soundManager.playError();
//             }
//         },
//         [passage.content, recordTestResult, targetWpm]
//     );

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//         if (status !== 'running') return;
//         if (e.ctrlKey || e.altKey || e.metaKey) return;

//         // Backspace
//         if (e.key === 'Backspace') {
//             e.preventDefault();
//             const currentUnits = getGraphemes(typedTextRef.current);
//             if (currentUnits.length > 0) {
//                 currentUnits.pop();
//                 const updatedText = fixDevanagariRemington(currentUnits.join(''));
//                 typedTextRef.current = updatedText;
//                 setDisplayTypedText(updatedText);
//                 soundManager.playKeypress();
//             }
//             return;
//         }

//         // Space & Enter
//         if (e.key === ' ' || e.key === 'Enter') {
//             e.preventDefault();
//             const charToAdd = e.key === ' ' ? ' ' : '\n';
//             typedTextRef.current = fixDevanagariRemington(typedTextRef.current + charToAdd);
//             setDisplayTypedText(typedTextRef.current);
//             soundManager.playKeypress();
//             return;
//         }

//         if (language === 'English' || keyboardType !== 'Remington') return;

//         const mappedChar = e.shiftKey ? REMINGTON_SHIFT[e.key] : REMINGTON_NORMAL[e.key];
//         if (!mappedChar) return;

//         e.preventDefault();
//         let currentText = typedTextRef.current;

//         // Halant cancellation / Kana ('k' key)
//         if (e.key === 'k' && !e.shiftKey) {
//             if (currentText.endsWith('ि')) {
//                 const base = currentText.slice(0, -1);
//                 if (base.endsWith('्')) {
//                     currentText = base.slice(0, -1) + 'ि';
//                 } else {
//                     currentText += mappedChar;
//                 }
//             } else if (currentText.endsWith('्')) {
//                 currentText = currentText.slice(0, -1);
//             } else if (currentText.endsWith('अ')) {
//                 currentText = currentText.slice(0, -1) + 'आ';
//             } else {
//                 currentText += mappedChar;
//             }
//         }
//         // Chhoti 'i' matra ('f' key)
//         else if (mappedChar === 'ि') {
//             pendingPrefixMatraRef.current = 'ि';
//         } 
//         // Apply matra after consonant
//         else if (pendingPrefixMatraRef.current) {
//             const matra = pendingPrefixMatraRef.current;
//             pendingPrefixMatraRef.current = null;
//             currentText += mappedChar + matra;
//         } 
//         else {
//             currentText += mappedChar;
//         }

//         const normalizedText = fixDevanagariRemington(currentText);
//         typedTextRef.current = normalizedText;
//         setDisplayTypedText(normalizedText);
//         soundManager.playKeypress();

//         const currentUnits = getGraphemes(normalizedText);
//         if (currentUnits.length >= sourceUnits.length) {
//             finishTest(normalizedText, Math.max(elapsedSecondsRef.current, 1));
//         }
//     };

//     const startTest = () => {
//         typedTextRef.current = '';
//         setDisplayTypedText('');
//         setElapsedSeconds(0);
//         elapsedSecondsRef.current = 0;
//         hasFinishedRef.current = false;
//         pendingPrefixMatraRef.current = null;
//         setStatus('running');

//         setTimeout(() => textareaRef.current?.focus(), 50);
//     };

//     useEffect(() => {
//         if (status !== 'running') return;
//         const timer = setInterval(() => {
//             const next = elapsedSecondsRef.current + 1;
//             elapsedSecondsRef.current = next;
//             setElapsedSeconds(next);

//             if (next >= timeLimitSeconds) {
//                 clearInterval(timer);
//                 finishTest(typedTextRef.current, timeLimitSeconds);
//             }
//         }, 1000);
//         return () => clearInterval(timer);
//     }, [status, timeLimitSeconds, finishTest]);

//     const liveMetrics = useMemo(() => {
//         return calculateMetricsDirect(passage.content, displayTypedText, elapsedSeconds);
//     }, [displayTypedText, elapsedSeconds, passage.content]);

//     const renderSourceText = () => {
//         const source = getGraphemes(passage.content);
//         const typed = getGraphemes(displayTypedText);

//         return source.map((unit, index) => {
//             const typedUnit = typed[index];
//             let className = 'text-slate-400';

//             if (typedUnit === undefined) {
//                 className = 'text-slate-500';
//             } else if (typedUnit === unit) {
//                 className = 'text-emerald-400';
//             } else {
//                 className = 'text-rose-400 bg-rose-500/10';
//             }

//             return (
//                 <span key={`${index}-${unit}`} className={className}>
//                     {unit}
//                 </span>
//             );
//         });
//     };

//     if (status === 'ready') {
//         return (
//             <div className="min-h-[600px] flex items-center justify-center">
//                 <div className="w-full max-w-4xl p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl text-center">
//                     <Target className="w-12 h-12 mx-auto text-blue-400" />
//                     <h1 className="mt-4 text-3xl font-black text-white">GCC-TBC Remington Test</h1>
//                     <p className="mt-2 text-slate-400">{passage.title}</p>
//                     <button
//                         onClick={startTest}
//                         className="mt-6 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black shadow-lg"
//                     >
//                         Start Test Now
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (status === 'finished' && finalMetrics) {
//         const passed = finalMetrics.netWpm >= targetWpm && finalMetrics.accuracy >= PASS_ACCURACY;
//         return (
//             <div className="min-h-[600px] flex items-center justify-center">
//                 <div className="w-full max-w-4xl p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center">
//                     {passed ? <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-400" /> : <XCircle className="w-16 h-16 mx-auto text-rose-400" />}
//                     <h1 className={`mt-4 text-4xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
//                         {passed ? 'PASSED' : 'FAILED'}
//                     </h1>
//                     <div className="mt-6 grid grid-cols-3 gap-4">
//                         <div className="p-4 bg-slate-900 rounded-xl">
//                             <p className="text-xs text-slate-500">SPEED</p>
//                             <p className="text-2xl font-bold text-white">{Math.round(finalMetrics.netWpm)} WPM</p>
//                         </div>
//                         <div className="p-4 bg-slate-900 rounded-xl">
//                             <p className="text-xs text-slate-500">ACCURACY</p>
//                             <p className="text-2xl font-bold text-white">{Math.round(finalMetrics.accuracy)}%</p>
//                         </div>
//                         <div className="p-4 bg-slate-900 rounded-xl">
//                             <p className="text-xs text-slate-500">ERRORS</p>
//                             <p className="text-2xl font-bold text-white">{finalMetrics.wrongWords}</p>
//                         </div>
//                     </div>
//                     <button onClick={onExit} className="mt-6 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl">
//                         Back to Selection
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-5">
//             <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex justify-between items-center text-white">
//                 <h2 className="font-bold">{passage.title}</h2>
//                 <div className="flex gap-4 font-mono">
//                     <div>SPEED: {Math.round(liveMetrics.netWpm)}</div>
//                     <div>ACC: {Math.round(liveMetrics.accuracy)}%</div>
//                     <div>TIME: {formatTime(timeLimitSeconds - elapsedSeconds)}</div>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 max-h-[500px] overflow-y-auto leading-8">
//                     {renderSourceText()}
//                 </div>

//                 <div className="rounded-3xl bg-slate-950 border border-blue-500/20 p-5">
//                     <textarea
//                         ref={textareaRef}
//                         value={displayTypedText}
//                         onKeyDown={handleKeyDown}
//                         onChange={() => { }}
//                         autoFocus
//                         spellCheck={false}
//                         className="w-full min-h-[430px] resize-none rounded-2xl bg-slate-900 border border-slate-800 p-5 text-lg leading-8 font-serif text-white focus:outline-none"
//                         style={{
//                             fontFamily: "'Mangal', 'Nirmala UI', 'Mukta', 'Arial Unicode MS', sans-serif"
//                         }}
//                         placeholder="Start typing..."
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default GCCTBCTest;
















import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import {
    CheckCircle2,
    Clock,
    FileText,
    Target,
    XCircle,
    Zap,
} from 'lucide-react';

import confetti from 'canvas-confetti';

import { TypingPassage } from '../../types';
import { useApp } from '../../context/AppContext';
import { soundManager } from '../../utils/audio';

interface GCCTBCTestProps {
    passage: TypingPassage;
    targetWpm: 30 | 40 | 50;
    language: 'English' | 'Marathi' | 'Hindi';
    keyboardType?: 'Remington' | 'Typewriter' | 'InScript';
    onExit: () => void;
    onChangePassage?: () => void;
}

type TestStatus = 'ready' | 'running' | 'finished';

interface TestMetrics {
    grossWpm: number;
    netWpm: number;
    accuracy: number;
    wrongWords: number;
    correctChars: number;
    totalChars: number;
}

const PASS_ACCURACY = 90;

const REMINGTON_NORMAL: Record<string, string> = {
    'a': 'ं', 'b': 'इ', 'c': 'ब', 'd': 'क', 'e': 'म', 'f': 'ि',
    'g': 'ह', 'h': 'ी', 'i': 'प', 'j': 'र', 'k': 'ा', 'l': 'स',
    'm': 'उ', 'n': 'द', 'o': 'व', 'p': 'च', 'q': 'ु', 'r': 'त',
    's': 'े', 't': 'ज', 'u': 'न', 'v': 'अ', 'w': 'ू', 'x': 'ग',
    'y': 'ल', 'z': '्र',
    '`': '़', '1': '१', '2': '२', '3': '३', '4': '४', '5': '५',
    '6': '६', '7': '७', '8': '८', '9': '९', '0': '०',
    '-': 'ञ', '=': 'ृ', '[': 'ख्', ']': ',', '\\': '.',
    ';': 'य', '\'': 'श्', ',': 'ए', '.': 'ण्', '/': 'ध'
};

const REMINGTON_SHIFT: Record<string, string> = {
    'A': 'ा', 'B': 'ठ', 'C': 'ब्', 'D': 'क्', 'E': 'म्', 'F': 'थ्',
    'G': 'ळ', 'H': 'भ्', 'I': 'प्', 'J': 'श्र', 'K': 'ज्ञ', 'L': 'स्',
    'M': 'ड', 'N': 'छ', 'O': 'व्', 'P': 'च्', 'Q': 'फ', 'R': 'त्',
    'S': 'ै', 'T': 'ज्', 'U': 'न्', 'V': 'ट', 'W': 'ॅ', 'X': 'ग्',
    'Y': 'ल्', 'Z': 'र्',
    '~': 'द्य', '!': '।', '@': '/', '#': ':', '$': 'रऱ्', '%': '-',
    '^': '"', '&': "'", '*': 'द्ध', '(': 'त्र', ')': 'ऋ', '_': '.',
    '+': '्', '{': 'क्ष्', '}': 'द्व', '|': '', ':': 'रू', '"': 'ष्',
    '<': 'ढ', '>': 'झ', '?': 'घ्'
};

// MASTER REMINGTON ENGINE FIX (HINDI & MARATHI)
const fixDevanagariRemington = (text: string): string => {
    if (!text) return '';

    return text
        // 1. Reph Reordering Fix (उदा. चर् -> र्च, खर्च् -> खर्च)
        .replace(/([\u0905-\u0939](?:\u094D[\u0905-\u0939])*(?:[\u093E-\u094C\u0901-\u0903])?)(र्)/g, 'र्$1')

        // 2. Chhoti 'i' Matra & Halant Fix (उदा. ण्िा -> णि, क्िा -> कि)
        .replace(/([\u0900-\u097F])्िा/g, '$1ि')
        .replace(/([\u0900-\u097F])्ि/g, '$1ि')

        // 3. Vowels Auto-Composition
        .replace(/अा/g, 'आ')
        .replace(/आे/g, 'ओ')
        .replace(/आै/g, 'औ')
        .replace(/इी/g, 'ई')
        .replace(/उू/g, 'ऊ')
        .replace(/एे/g, 'ऐ')
        .replace(/अॅ/g, 'ॲ')
        .replace(/आॅ/g, 'ऑ')

        // 4. Double Matra Fix
        .replace(/ाे/g, 'ो')
        .replace(/ाै/g, 'ौ')
        .replace(/ाॅ/g, 'ॉ')

        // 5. Hindi Nukta Merge (ड़, ढ़, ज़, फ़, ख़, ग़, क़)
        .replace(/क़/g, 'क़')
        .replace(/ख़/g, 'ख़')
        .replace(/ग़/g, 'ग़')
        .replace(/ज़/g, 'ज़')
        .replace(/फ़/g, 'फ़')
        .replace(/ड़/g, 'ड़')
        .replace(/ढ़/g, 'ढ़')

        .normalize('NFC');
};

const getGraphemes = (text: string): string[] => {
    if (!text) return [];
    const normalized = fixDevanagariRemington(text);
    const devanagariRegex = /(?:\p{L}(?:\u094D[\u200D\u200C]?\p{L})*\p{M}*[\u200D\u200C]?|\p{N}+|\s+|[^\p{L}\p{N}\s]+)/gu;
    const matches = normalized.match(devanagariRegex);
    return matches ? Array.from(matches) : Array.from(normalized);
};

const tokenizeWords = (text: string): string[] => {
    return fixDevanagariRemington(text).trim().split(/\s+/).filter(Boolean);
};

const calculateWrongWords = (sourceText: string, typedText: string): number => {
    const sourceWords = tokenizeWords(sourceText);
    const typedWords = tokenizeWords(typedText);
    const sourceLength = sourceWords.length;
    const typedLength = typedWords.length;

    if (sourceLength === 0) return typedLength;
    if (typedLength === 0) return sourceLength;

    const dp: number[][] = Array.from(
        { length: sourceLength + 1 },
        () => Array(typedLength + 1).fill(0)
    );

    for (let i = 0; i <= sourceLength; i++) dp[i][0] = i;
    for (let j = 0; j <= typedLength; j++) dp[0][j] = j;

    for (let i = 1; i <= sourceLength; i++) {
        for (let j = 1; j <= typedLength; j++) {
            const substitutionCost = sourceWords[i - 1] === typedWords[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j - 1] + substitutionCost,
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1
            );
        }
    }
    return dp[sourceLength][typedLength];
};

const calculateMetricsDirect = (
    sourceText: string,
    typedText: string,
    elapsedSeconds: number
): TestMetrics => {
    const sourceUnits = getGraphemes(sourceText);
    const typedUnits = getGraphemes(typedText);
    const totalChars = typedUnits.length;
    let correctChars = 0;

    const compareLength = Math.min(sourceUnits.length, typedUnits.length);
    for (let i = 0; i < compareLength; i++) {
        if (sourceUnits[i] === typedUnits[i]) {
            correctChars++;
        }
    }

    const accuracy = totalChars === 0 ? 100 : Math.max(0, Math.min(100, (correctChars / totalChars) * 100));
    const safeMinutes = Math.max(elapsedSeconds, 1) / 60;
    const grossWpm = (totalChars / 5) / safeMinutes;
    const netWpm = grossWpm * (accuracy / 100);

    return {
        grossWpm,
        netWpm,
        accuracy,
        wrongWords: calculateWrongWords(sourceText, typedText),
        correctChars,
        totalChars,
    };
};

export const GCCTBCTest: React.FC<GCCTBCTestProps> = ({
    passage,
    targetWpm,
    language,
    keyboardType = 'Remington',
    onExit,
    onChangePassage,
}) => {
    const { recordTestResult } = useApp();

    const [status, setStatus] = useState<TestStatus>('ready');
    const [displayTypedText, setDisplayTypedText] = useState('');
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [finalMetrics, setFinalMetrics] = useState<TestMetrics | null>(null);

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const typedTextRef = useRef('');
    const elapsedSecondsRef = useRef(0);
    const hasFinishedRef = useRef(false);
    const pendingPrefixMatraRef = useRef<string | null>(null);

    const passageWordCount = useMemo(() => tokenizeWords(passage.content).length, [passage.content]);
    const sourceUnits = useMemo(() => getGraphemes(passage.content), [passage.content]);

    const timeLimitSeconds = useMemo(() => {
        if (targetWpm === 30) return 7 * 60;
        const words = Math.max(1, passageWordCount);
        return Math.max(60, Math.ceil((words / targetWpm) * 60));
    }, [passageWordCount, targetWpm]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const finishTest = useCallback(
        (finalTypedText = typedTextRef.current, finalElapsedSeconds = elapsedSecondsRef.current) => {
            if (hasFinishedRef.current) return;
            hasFinishedRef.current = true;

            const normalizedTypedText = fixDevanagariRemington(finalTypedText);
            const metrics = calculateMetricsDirect(passage.content, normalizedTypedText, finalElapsedSeconds);
            setDisplayTypedText(normalizedTypedText);

            const passed = metrics.netWpm >= targetWpm && metrics.accuracy >= PASS_ACCURACY;
            const xpEarned = passed ? 100 + targetWpm : 40;

            setFinalMetrics(metrics);
            setElapsedSeconds(finalElapsedSeconds);
            setStatus('finished');

            // recordTestResult({
            //     title: `GCC-TBC Remington Test - ${targetWpm} WPM`,
            //     type: 'test',
            //     // duration: finalElapsedSeconds,
            //     durationSeconds: finalElapsedSeconds,
            //     grossWpm: Math.round(metrics.grossWpm),
            //     netWpm: Math.round(metrics.netWpm),
            //     accuracy: Math.round(metrics.accuracy),
            //     totalKeystrokes: metrics.totalChars,
            //     correctKeystrokes: metrics.correctChars,
            //     errorCount: Math.max(0, metrics.totalChars - metrics.correctChars),
            //     consistencyScore: Math.round(metrics.accuracy),
            //     errorKeys: {},
            //     xpEarned,
            //     timestamp: new Date().toISOString(),
            // });

            recordTestResult({
                title: `GCC-TBC Remington Test - ${targetWpm} WPM`,
                type: 'test',
                durationSeconds: finalElapsedSeconds,
                grossWpm: Math.round(metrics.grossWpm),
                netWpm: Math.round(metrics.netWpm),
                accuracy: Math.round(metrics.accuracy),
                totalKeystrokes: metrics.totalChars,
                correctKeystrokes: metrics.correctChars,
                errorCount: Math.max(0, metrics.totalChars - metrics.correctChars),
                consistencyScore: Math.round(metrics.accuracy),
                errorKeys: {},
                xpEarned,
            });

            if (passed) {
                soundManager.playSuccess();
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            } else {
                soundManager.playError();
            }
        },
        [passage.content, recordTestResult, targetWpm]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (status !== 'running') return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // Backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            const currentUnits = getGraphemes(typedTextRef.current);
            if (currentUnits.length > 0) {
                currentUnits.pop();
                const updatedText = fixDevanagariRemington(currentUnits.join(''));
                typedTextRef.current = updatedText;
                setDisplayTypedText(updatedText);
                soundManager.playKeypress();
            }
            return;
        }

        // Space & Enter
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const charToAdd = e.key === ' ' ? ' ' : '\n';
            typedTextRef.current = fixDevanagariRemington(typedTextRef.current + charToAdd);
            setDisplayTypedText(typedTextRef.current);
            soundManager.playKeypress();
            return;
        }

        // if (language === 'English' || keyboardType !== 'Remington') return;
        // if (language === 'English') {
        //     const value = typedTextRef.current + e.key;
        //     typedTextRef.current = value;
        //     setDisplayTypedText(value);
        //     soundManager.playKeypress();
        //     return;
        // }

        if (language === 'English') {
            // Only actual printable characters should be added.
            // Shift, CapsLock, Tab, arrows, Ctrl, Alt, etc. must not appear as text.
            if (e.key.length === 1) {
                const value = typedTextRef.current + e.key;
                typedTextRef.current = value;
                setDisplayTypedText(value);
                soundManager.playKeypress();
            }

            e.preventDefault();
            return;
        }

        if (keyboardType !== 'Remington') return;

        const mappedChar = e.shiftKey ? REMINGTON_SHIFT[e.key] : REMINGTON_NORMAL[e.key];
        if (!mappedChar) return;

        e.preventDefault();
        let currentText = typedTextRef.current;

        // Halant cancellation / Kana ('k' key)
        if (e.key === 'k' && !e.shiftKey) {
            if (currentText.endsWith('ि')) {
                const base = currentText.slice(0, -1);
                if (base.endsWith('्')) {
                    currentText = base.slice(0, -1) + 'ि';
                } else {
                    currentText += mappedChar;
                }
            } else if (currentText.endsWith('्')) {
                currentText = currentText.slice(0, -1);
            } else if (currentText.endsWith('अ')) {
                currentText = currentText.slice(0, -1) + 'आ';
            } else {
                currentText += mappedChar;
            }
        }
        // Chhoti 'i' matra ('f' key)
        else if (mappedChar === 'ि') {
            pendingPrefixMatraRef.current = 'ि';
        }
        // Apply matra after consonant
        else if (pendingPrefixMatraRef.current) {
            const matra = pendingPrefixMatraRef.current;
            pendingPrefixMatraRef.current = null;
            currentText += mappedChar + matra;
        }
        else {
            currentText += mappedChar;
        }

        const normalizedText = fixDevanagariRemington(currentText);
        typedTextRef.current = normalizedText;
        setDisplayTypedText(normalizedText);
        soundManager.playKeypress();

        const currentUnits = getGraphemes(normalizedText);
        if (currentUnits.length >= sourceUnits.length) {
            finishTest(normalizedText, Math.max(elapsedSecondsRef.current, 1));
        }
    };

    const startTest = () => {
        typedTextRef.current = '';
        setDisplayTypedText('');
        setElapsedSeconds(0);
        elapsedSecondsRef.current = 0;
        hasFinishedRef.current = false;
        pendingPrefixMatraRef.current = null;
        setStatus('running');

        setTimeout(() => textareaRef.current?.focus(), 50);
    };

    useEffect(() => {
        if (status !== 'running') return;
        const timer = setInterval(() => {
            const next = elapsedSecondsRef.current + 1;
            elapsedSecondsRef.current = next;
            setElapsedSeconds(next);

            if (next >= timeLimitSeconds) {
                clearInterval(timer);
                finishTest(typedTextRef.current, timeLimitSeconds);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [status, timeLimitSeconds, finishTest]);

    const liveMetrics = useMemo(() => {
        return calculateMetricsDirect(passage.content, displayTypedText, elapsedSeconds);
    }, [displayTypedText, elapsedSeconds, passage.content]);

    const renderSourceText = () => {
        const source = getGraphemes(passage.content);
        const typed = getGraphemes(displayTypedText);

        return source.map((unit, index) => {
            const typedUnit = typed[index];
            let className = 'text-slate-400';

            if (typedUnit === undefined) {
                className = 'text-slate-800';
            } else if (typedUnit === unit) {
                className = 'text-emerald-400';
            } else {
                className = 'text-rose-400 bg-rose-500/10';
            }

            return (
                <span key={`${index}-${unit}`} className={className}>
                    {unit}
                </span>
            );
        });
    };

    // MATCHED EXACTLY WITH 2ND SCREENSHOT UI
    if (status === 'ready') {
        return (
            <div className="min-h-[600px] flex items-center justify-center p-4">
                <div className="w-full max-w-4xl p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Target className="w-7 h-7 text-blue-400" />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                        EXAM MODE
                    </span>

                    <h1 className="mt-1 text-4xl font-black text-white tracking-tight">
                        Target Speed Test
                    </h1>

                    <p className="mt-2 text-lg text-slate-400 font-medium">
                        {passage.title}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
                            <Target className="w-5 h-5 text-blue-400 mb-2" />
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Target Speed</span>
                            <span className="text-3xl font-black text-white mt-1">{targetWpm} WPM</span>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
                            <Clock className="w-5 h-5 text-amber-400 mb-2" />
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Time Limit</span>
                            <span className="text-3xl font-black text-white mt-1">{formatTime(timeLimitSeconds)}</span>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center">
                            <FileText className="w-5 h-5 text-emerald-400 mb-2" />
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Passage</span>
                            <span className="text-3xl font-black text-white mt-1">{passageWordCount} words</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={startTest}
                            className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
                        >
                            <Zap className="w-5 h-5 fill-current" />
                            <span>Start Test</span>
                        </button>

                        <button
                            onClick={onChangePassage || onExit}
                            className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            <FileText className="w-5 h-5 text-slate-400" />
                            <span>Change Passage</span>
                        </button>

                        <button
                            onClick={onExit}
                            className="w-full py-4 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                        >
                            <span>Back to Tests</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (status === 'finished' && finalMetrics) {
        const passed = finalMetrics.netWpm >= targetWpm && finalMetrics.accuracy >= PASS_ACCURACY;
        return (
            <div className="min-h-[600px] flex items-center justify-center">
                <div className="w-full max-w-4xl p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center">
                    {passed ? <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-400" /> : <XCircle className="w-16 h-16 mx-auto text-rose-400" />}
                    <h1 className={`mt-4 text-4xl font-black ${passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {passed ? 'PASSED' : 'FAILED'}
                    </h1>
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="p-4 bg-slate-900 rounded-xl">
                            <p className="text-xs text-slate-500">SPEED</p>
                            <p className="text-2xl font-bold text-white">{Math.round(finalMetrics.netWpm)} WPM</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl">
                            <p className="text-xs text-slate-500">ACCURACY</p>
                            <p className="text-2xl font-bold text-white">{Math.round(finalMetrics.accuracy)}%</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl">
                            <p className="text-xs text-slate-500">ERRORS</p>
                            <p className="text-2xl font-bold text-white">{finalMetrics.wrongWords}</p>
                        </div>
                    </div>
                    <button onClick={onExit} className="mt-6 px-6 py-3 bg-slate-800 text-white font-bold rounded-xl">
                        Back to Selection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 flex justify-between items-center text-white">
                <h2 className="font-bold">{passage.title}</h2>
                <div className="flex gap-4 font-mono">
                    <div>SPEED: {Math.round(liveMetrics.netWpm)}</div>
                    <div>ACC: {Math.round(liveMetrics.accuracy)}%</div>
                    <div>TIME: {formatTime(timeLimitSeconds - elapsedSeconds)}</div>
                    {/* End Test */}
                    <button
                        type="button"
                        onClick={() =>
                            finishTest(
                                typedTextRef.current,
                                Math.max(elapsedSeconds, 1)
                            )
                        }
                        className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all shadow-lg shadow-rose-600/20"
                    >
                        End Test
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Original passage */}
                <div className="rounded-3xl bg-slate-950 border border-blue-500/20 overflow-hidden">

                    <div className="p-5">

                        <div className="w-full min-h-[430px] max-h-[430px] overflow-y-auto rounded-2xl bg-white border border-blue-500 p-5 text-lg leading-8 font-mono text-black">

                            {renderSourceText()}

                        </div>

                    </div>

                </div>
                <div className="rounded-3xl bg-slate-950 border border-blue-500/20 p-5">
                    <textarea
                        ref={textareaRef}
                        value={displayTypedText}
                        onKeyDown={handleKeyDown}
                        onChange={() => { }}
                        autoFocus
                        spellCheck={false}
                        // className="w-full min-h-[430px] resize-none rounded-2xl bg-slate-900 border border-slate-800 p-5 text-lg leading-8 font-serif text-white focus:outline-none"
                        className="w-full min-h-[430px] resize-none rounded-2xl bg-white border border-slate-800 p-5 text-lg leading-8 font-mono !text-black caret-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                        style={{
                            fontFamily: "'Mangal', 'Nirmala UI', 'Mukta', 'Arial Unicode MS', sans-serif"
                        }}
                        placeholder="Start typing..."
                    />
                </div>
            </div>
        </div>
    );
};

export default GCCTBCTest;