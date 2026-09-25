import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, Zap, Clock, Trophy } from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'hard';

const TEXT_DATASET: Record<Difficulty, string[]> = {
  easy: [
    "cat dog sun sky blue tree book pen cup hat",
    "the quick brown fox jumps over the lazy dog",
    "apples and bananas are sweet and simple fruits"
  ],
  medium: [
    "Technology is best when it brings people together and solves problems.",
    "Programming requires patience, practice, and continuous learning every day.",
    "Responsive design makes web applications look great on all device screens."
  ],
  hard: [
    "Asynchrony in JavaScript permits non-blocking operations via Event Loop callbacks.",
    "Polymorphism and Encapsulation are foundational paradigms of Object-Oriented Design.",
    "Cryptographic algorithms ensure data integrity and confidentiality across distributed networks."
  ]
};

const TIME_LIMITS: Record<Difficulty, number> = {
  easy: 60,
  medium: 45,
  hard: 30
};

export const TypingGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [targetText, setTargetText] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState<number>(TIME_LIMITS.medium);
  const [isActive, setIsActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const inputRef = useRef<HTMLInputElement>(null);

  // New text pick karne ke liye function
  const getRandomText = (diff: Difficulty) => {
    const list = TEXT_DATASET[diff];
    return list[Math.floor(Math.random() * list.length)];
  };

  // Game Reset ya Level Change hone par reset
  const resetGame = (newDiff: Difficulty = difficulty) => {
    setDifficulty(newDiff);
    setTargetText(getRandomText(newDiff));
    setInput('');
    setTimeLeft(TIME_LIMITS[newDiff]);
    setIsActive(false);
    setIsGameOver(false);
    setWpm(0);
    setAccuracy(100);
  };

  useEffect(() => {
    resetGame(difficulty);
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0 && !isGameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, isGameOver]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (!isActive && !isGameOver) {
      setIsActive(true);
    }

    setInput(val);

    // Accuracy Calculation
    let correctChars = 0;
    val.split('').forEach((char, idx) => {
      if (char === targetText[idx]) correctChars++;
    });
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    // Completion Check
    if (val === targetText) {
      endGame(true);
    }
  };

  const endGame = (isWin = false) => {
    setIsActive(false);
    setIsGameOver(true);

    const timeSpent = (TIME_LIMITS[difficulty] - timeLeft) / 60 || 0.1;
    const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
    const calculatedWpm = Math.round(wordsTyped / timeSpent);
    setWpm(calculatedWpm > 0 ? calculatedWpm : 0);

    if (isWin) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-8 bg-slate-900 text-white rounded-2xl shadow-2xl max-w-2xl mx-auto border border-slate-800">

      {/* Title */}
      <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        TypeMaster Pro
      </h2>

      {/* Difficulty Selector */}
      <div className="flex gap-3 mb-6">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
          <button
            key={level}
            onClick={() => resetGame(level)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition-all duration-200 ${difficulty === level
              ? level === 'easy'
                ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                : level === 'medium'
                  ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/30'
                  : 'bg-red-600 text-white shadow-lg shadow-red-600/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="flex justify-between w-full max-w-lg mb-6 p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          <span className="text-sm font-medium text-slate-300">Time:</span>
          <span className="text-lg font-bold text-white">{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-medium text-slate-300">Accuracy:</span>
          <span className="text-lg font-bold text-white">{accuracy}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium text-slate-300">WPM:</span>
          <span className="text-lg font-bold text-white">{wpm}</span>
        </div>
      </div>

      {/* Display Target Text */}
      <div className="typing-game-input w-full max-w-lg bg-slate-800 p-5 rounded-xl mb-6 text-lg tracking-wide leading-relaxed font-mono select-none border border-slate-700">
        {targetText.split('').map((char, index) => {
          let color = 'text-slate-500';
          if (index < input.length) {
            color = input[index] === char ? 'text-emerald-400' : 'text-red-400 bg-red-950/50 rounded px-0.5';
          }
          return (
            <span key={index} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Input Box */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        disabled={isGameOver}
        placeholder={isGameOver ? "Game Over! Click reset to try again." : "Start typing here..."}
        // className="w-full max-w-lg p-4 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-6 font-mono text-base transition-all"
        className="typing-game-input w-full max-w-lg p-4 rounded-xl bg-slate-950 border border-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 mb-6 font-mono text-base transition-all"
      />


      {/* Reset Button */}
      <button
        onClick={() => resetGame(difficulty)}
        className="typing-game-input flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition font-semibold shadow-lg shadow-blue-600/20 active:scale-95"
      >
        <RefreshCw className="w-5 h-5" /> Reset Game
      </button>
    </div>
  );
};