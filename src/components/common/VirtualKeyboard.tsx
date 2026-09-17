import React from 'react';

interface VirtualKeyboardProps {
  currentKey?: string;
  pressedKey?: string;
  isError?: boolean;
  showFingerGuide?: boolean;
}

interface KeyConfig {
  key: string;
  display: string;
  width?: string;
  finger: 'left-pinky' | 'left-ring' | 'left-middle' | 'left-index' | 'thumb' | 'right-index' | 'right-middle' | 'right-ring' | 'right-pinky';
}

export const KEY_FINGER_MAP: Record<string, { finger: string; hand: string; color: string }> = {
  // Left Pinky
  '`': { finger: 'Pinky', hand: 'Left', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  '1': { finger: 'Pinky', hand: 'Left', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  'q': { finger: 'Pinky', hand: 'Left', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  'a': { finger: 'Pinky', hand: 'Left', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  'z': { finger: 'Pinky', hand: 'Left', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  // Left Ring
  '2': { finger: 'Ring', hand: 'Left', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  'w': { finger: 'Ring', hand: 'Left', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  's': { finger: 'Ring', hand: 'Left', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  'x': { finger: 'Ring', hand: 'Left', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  // Left Middle
  '3': { finger: 'Middle', hand: 'Left', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  'e': { finger: 'Middle', hand: 'Left', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  'd': { finger: 'Middle', hand: 'Left', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  'c': { finger: 'Middle', hand: 'Left', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  // Left Index
  '4': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  '5': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  'r': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  't': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  'f': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  'g': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  'v': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  'b': { finger: 'Index', hand: 'Left', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
  // Thumbs
  ' ': { finger: 'Thumb', hand: 'Either', color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
  // Right Index
  '6': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  '7': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'y': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'u': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'h': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'j': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'n': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  'm': { finger: 'Index', hand: 'Right', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
  // Right Middle
  '8': { finger: 'Middle', hand: 'Right', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  'i': { finger: 'Middle', hand: 'Right', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  'k': { finger: 'Middle', hand: 'Right', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  ',': { finger: 'Middle', hand: 'Right', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  // Right Ring
  '9': { finger: 'Ring', hand: 'Right', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  'o': { finger: 'Ring', hand: 'Right', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  'l': { finger: 'Ring', hand: 'Right', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  '.': { finger: 'Ring', hand: 'Right', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  // Right Pinky
  '0': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  '-': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  '=': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  'p': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  '[': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  ']': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  ';': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  "'": { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  '/': { finger: 'Pinky', hand: 'Right', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' }
};

const KEYBOARD_ROWS: KeyConfig[][] = [
  [
    { key: '`', display: '~ `', finger: 'left-pinky' },
    { key: '1', display: '1', finger: 'left-pinky' },
    { key: '2', display: '2', finger: 'left-ring' },
    { key: '3', display: '3', finger: 'left-middle' },
    { key: '4', display: '4', finger: 'left-index' },
    { key: '5', display: '5', finger: 'left-index' },
    { key: '6', display: '6', finger: 'right-index' },
    { key: '7', display: '7', finger: 'right-index' },
    { key: '8', display: '8', finger: 'right-middle' },
    { key: '9', display: '9', finger: 'right-ring' },
    { key: '0', display: '0', finger: 'right-pinky' },
    { key: '-', display: '-', finger: 'right-pinky' },
    { key: '=', display: '=', finger: 'right-pinky' },
    { key: 'Backspace', display: 'Bksp', width: 'flex-[1.6]', finger: 'right-pinky' }
  ],
  [
    { key: 'Tab', display: 'Tab', width: 'flex-[1.3]', finger: 'left-pinky' },
    { key: 'q', display: 'Q', finger: 'left-pinky' },
    { key: 'w', display: 'W', finger: 'left-ring' },
    { key: 'e', display: 'E', finger: 'left-middle' },
    { key: 'r', display: 'R', finger: 'left-index' },
    { key: 't', display: 'T', finger: 'left-index' },
    { key: 'y', display: 'Y', finger: 'right-index' },
    { key: 'u', display: 'U', finger: 'right-index' },
    { key: 'i', display: 'I', finger: 'right-middle' },
    { key: 'o', display: 'O', finger: 'right-ring' },
    { key: 'p', display: 'P', finger: 'right-pinky' },
    { key: '[', display: '[', finger: 'right-pinky' },
    { key: ']', display: ']', finger: 'right-pinky' },
    { key: '\\', display: '\\', width: 'flex-[1.1]', finger: 'right-pinky' }
  ],
  [
    { key: 'CapsLock', display: 'Caps', width: 'flex-[1.6]', finger: 'left-pinky' },
    { key: 'a', display: 'A', finger: 'left-pinky' },
    { key: 's', display: 'S', finger: 'left-ring' },
    { key: 'd', display: 'D', finger: 'left-middle' },
    { key: 'f', display: 'F', finger: 'left-index' },
    { key: 'g', display: 'G', finger: 'left-index' },
    { key: 'h', display: 'H', finger: 'right-index' },
    { key: 'j', display: 'J', finger: 'right-index' },
    { key: 'k', display: 'K', finger: 'right-middle' },
    { key: 'l', display: 'L', finger: 'right-ring' },
    { key: ';', display: ';', finger: 'right-pinky' },
    { key: "'", display: "'", finger: 'right-pinky' },
    { key: 'Enter', display: 'Enter', width: 'flex-[1.9]', finger: 'right-pinky' }
  ],
  [
    { key: 'Shift', display: 'Shift', width: 'flex-[2.1]', finger: 'left-pinky' },
    { key: 'z', display: 'Z', finger: 'left-pinky' },
    { key: 'x', display: 'X', finger: 'left-ring' },
    { key: 'c', display: 'C', finger: 'left-middle' },
    { key: 'v', display: 'V', finger: 'left-index' },
    { key: 'b', display: 'B', finger: 'left-index' },
    { key: 'n', display: 'N', finger: 'right-index' },
    { key: 'm', display: 'M', finger: 'right-index' },
    { key: ',', display: ',', finger: 'right-middle' },
    { key: '.', display: '.', finger: 'right-ring' },
    { key: '/', display: '/', finger: 'right-pinky' },
    { key: 'ShiftRight', display: 'Shift', width: 'flex-[2.1]', finger: 'right-pinky' }
  ],
  [
    { key: 'Control', display: 'Ctrl', width: 'flex-[1.3]', finger: 'left-pinky' },
    { key: 'Alt', display: 'Alt', width: 'flex-[1.2]', finger: 'thumb' },
    { key: ' ', display: 'Spacebar', width: 'flex-[6.5]', finger: 'thumb' },
    { key: 'AltRight', display: 'Alt', width: 'flex-[1.2]', finger: 'thumb' },
    { key: 'ControlRight', display: 'Ctrl', width: 'flex-[1.3]', finger: 'right-pinky' }
  ]
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  currentKey = '',
  pressedKey = '',
  isError = false,
  showFingerGuide = true
}) => {
  const normCurrent = currentKey.toLowerCase();
  const normPressed = pressedKey.toLowerCase();

  const fingerInfo = KEY_FINGER_MAP[normCurrent] || (normCurrent === ' ' ? KEY_FINGER_MAP[' '] : null);

  return (
    <div className="w-full max-w-4xl mx-auto select-none">
      {/* Finger Placement Guidance Bar */}
      {showFingerGuide && fingerInfo && (
        <div className="flex items-center justify-between mb-3 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Target Finger:</span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold border ${fingerInfo.color}`}>
              {fingerInfo.hand} Hand — {fingerInfo.finger}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Key:</span>
            <span className="font-mono font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
              {currentKey === ' ' ? 'SPACE' : currentKey}
            </span>
          </div>
        </div>
      )}

      {/* Keyboard Bed */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2 sm:p-3 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center">
              {row.map(k => {
                const isTarget =
                  normCurrent === k.key.toLowerCase() ||
                  (k.key === ' ' && normCurrent === ' ');

                const isJustPressed =
                  normPressed === k.key.toLowerCase() ||
                  (k.key === ' ' && normPressed === ' ');

                const isHomeRowAnchor = k.key === 'f' || k.key === 'j';

                let keyClasses = 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:border-slate-600';

                if (isTarget) {
                  keyClasses = 'bg-emerald-500 text-slate-950 font-black border-emerald-300 ring-2 ring-emerald-400/60 shadow-lg shadow-emerald-500/30 scale-105 z-10';
                } else if (isJustPressed) {
                  if (isError) {
                    keyClasses = 'bg-rose-500 text-white font-black border-rose-300 ring-2 ring-rose-400/60 animate-shake';
                  } else {
                    keyClasses = 'bg-emerald-600/60 text-white border-emerald-400';
                  }
                }

                return (
                  <div
                    key={k.key}
                    className={`relative flex items-center justify-center rounded-lg border text-[10px] sm:text-xs font-mono transition-all duration-100 ${
                      k.width || 'flex-1'
                    } h-8 sm:h-11 ${keyClasses}`}
                  >
                    <span>{k.display}</span>
                    {/* Anchor bump line for F and J */}
                    {isHomeRowAnchor && (
                      <span className={`absolute bottom-1 w-2.5 sm:w-3.5 h-0.5 rounded-full ${isTarget ? 'bg-slate-950' : 'bg-slate-500'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        {showFingerGuide && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Pinky</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Ring</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Middle</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Index (Left)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Index (Right)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Thumb (Space)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
