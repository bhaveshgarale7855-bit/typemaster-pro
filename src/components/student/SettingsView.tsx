// import React from 'react';
// import {
//   Volume2,
//   Bell,
//   Palette,
//   Keyboard,
//   User,
//   Shield,
//   ChevronRight,
// } from 'lucide-react';
// import { useApp } from '../../context/AppContext';

// interface SettingsViewProps {
//   onClose?: () => void;
// }

// export const SettingsView: React.FC<SettingsViewProps> = ({ onClose }) => {
//   const {
//     student,
//     soundEnabled,
//     toggleSound,
//   } = useApp();

//   return (
//     <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-4xl">
//         {/* Header */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Settings
//               </h1>
//               <p className="mt-1 text-sm text-slate-500">
//                 Manage your TypeMaster Pro preferences.
//               </p>
//             </div>

//             {onClose && (
//               <button
//                 onClick={onClose}
//                 className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
//               >
//                 Back
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="space-y-5">
//           {/* Sound */}
//           <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//             <div className="border-b border-slate-100 px-5 py-4">
//               <h2 className="font-bold text-slate-900">Preferences</h2>
//               <p className="text-sm text-slate-500">
//                 Control how the application behaves.
//               </p>
//             </div>

//             <div className="divide-y divide-slate-100">
//               {/* Sound */}
//               <div className="flex items-center justify-between gap-4 px-5 py-4">
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                     <Volume2 size={20} />
//                   </div>

//                   <div>
//                     <p className="font-semibold text-slate-900">
//                       Sound Effects
//                     </p>
//                     <p className="text-sm text-slate-500">
//                       Play sounds during typing activities.
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={toggleSound}
//                   aria-label="Toggle sound"
//                   className={`relative h-7 w-12 rounded-full transition ${
//                     soundEnabled ? 'bg-blue-600' : 'bg-slate-300'
//                   }`}
//                 >
//                   <span
//                     className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
//                       soundEnabled ? 'left-6' : 'left-1'
//                     }`}
//                   />
//                 </button>
//               </div>

//               {/* Notifications */}
//               <button
//                 type="button"
//                 className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
//                     <Bell size={20} />
//                   </div>

//                   <div>
//                     <p className="font-semibold text-slate-900">
//                       Notifications
//                     </p>
//                     <p className="text-sm text-slate-500">
//                       Notification preferences.
//                     </p>
//                   </div>
//                 </div>

//                 <ChevronRight size={19} className="text-slate-400" />
//               </button>

//               {/* Appearance */}
//               <button
//                 type="button"
//                 className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
//                     <Palette size={20} />
//                   </div>

//                   <div>
//                     <p className="font-semibold text-slate-900">
//                       Appearance
//                     </p>
//                     <p className="text-sm text-slate-500">
//                       Choose how TypeMaster Pro looks.
//                     </p>
//                   </div>
//                 </div>

//                 <span className="text-xs font-semibold text-slate-400">
//                   Coming soon
//                 </span>
//               </button>

//               {/* Typing Preferences */}
//               <button
//                 type="button"
//                 className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
//                     <Keyboard size={20} />
//                   </div>

//                   <div>
//                     <p className="font-semibold text-slate-900">
//                       Typing Preferences
//                     </p>
//                     <p className="text-sm text-slate-500">
//                       Configure typing practice preferences.
//                     </p>
//                   </div>
//                 </div>

//                 <span className="text-xs font-semibold text-slate-400">
//                   Coming soon
//                 </span>
//               </button>
//             </div>
//           </section>

//           {/* Account */}
//           <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//             <div className="border-b border-slate-100 px-5 py-4">
//               <h2 className="font-bold text-slate-900">Account</h2>
//               <p className="text-sm text-slate-500">
//                 Your current account information.
//               </p>
//             </div>

//             <div className="divide-y divide-slate-100">
//               <div className="flex items-center gap-3 px-5 py-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
//                   <User size={20} />
//                 </div>

//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                     Name
//                   </p>
//                   <p className="font-semibold text-slate-900">
//                     {student.name}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 px-5 py-4">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
//                   <Shield size={20} />
//                 </div>

//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                     Account Type
//                   </p>
//                   <p className="font-semibold text-slate-900">
//                     Student
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* App information */}
//           <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
//             <p className="text-sm font-semibold text-slate-700">
//               TypeMaster Pro
//             </p>
//             <p className="mt-1 text-xs text-slate-400">
//               Student Settings • Version 1.0
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
















import React from 'react';
import {
  Volume2,
  Bell,
  Palette,
  Keyboard,
  User,
  Shield,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const themeOptions = [
  { value: 'light' as const, label: 'Light', icon: '☀️' },
  { value: 'dark' as const, label: 'Dark', icon: '🌙' },
  { value: 'system' as const, label: 'System', icon: '🖥️' },
];

const accentOptions = [
  { value: 'blue' as const, label: 'Blue', color: '#2563eb' },
  { value: 'purple' as const, label: 'Purple', color: '#7c3aed' },
  { value: 'green' as const, label: 'Green', color: '#16a34a' },
  { value: 'orange' as const, label: 'Orange', color: '#ea580c' },
  { value: 'red' as const, label: 'Red', color: '#dc2626' },
  { value: 'cyan' as const, label: 'Cyan', color: '#0891b2' },
];

const textColorOptions = [
  { value: 'default' as const, label: 'Default', color: '#0f172a' },
  { value: 'blue' as const, label: 'Blue', color: '#1e3a8a' },
  { value: 'purple' as const, label: 'Purple', color: '#4c1d95' },
  { value: 'green' as const, label: 'Green', color: '#14532d' },
  { value: 'orange' as const, label: 'Orange', color: '#7c2d12' },
];

interface SettingsViewProps {
  onClose?: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = () => {
  const {
    student,
    soundEnabled,
    toggleSound,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    textColor,
    setTextColor,
  } = useApp();

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--tm-text)]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[var(--tm-text-secondary)]">
            Customize your TypeMaster Pro experience.
          </p>
        </div>

        {/* Preferences */}
        <section className="overflow-hidden rounded-2xl border border-[var(--tm-border)] bg-[var(--tm-surface)] shadow-sm">
          <div className="border-b border-[var(--tm-border)] px-5 py-4">
            <h2 className="font-bold text-[var(--tm-text)]">
              Preferences
            </h2>
            <p className="mt-1 text-sm text-[var(--tm-text-secondary)]">
              Control how the application behaves.
            </p>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between gap-4 border-b border-[var(--tm-border)] px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
                <Volume2 size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--tm-text)]">
                  Sound Effects
                </p>
                <p className="text-sm text-[var(--tm-text-secondary)]">
                  Play sounds during typing activities.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className={`relative h-6 w-11 rounded-full transition ${
                soundEnabled
                  ? 'bg-[var(--tm-accent)]'
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
              aria-label="Toggle sound effects"
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  soundEnabled ? 'left-5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 border-b border-[var(--tm-border)] px-5 py-4 text-left transition hover:bg-[var(--tm-surface-soft)]"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
                <Bell size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--tm-text)]">
                  Notifications
                </p>
                <p className="text-sm text-[var(--tm-text-secondary)]">
                  Manage your notification preferences.
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-[var(--tm-text-muted)]">
              Coming soon
            </span>
          </button>

          {/* Theme */}
          <div className="border-b border-[var(--tm-border)] px-5 py-5">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
                <Palette size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--tm-text)]">
                  Theme
                </p>
                <p className="text-sm text-[var(--tm-text-secondary)]">
                  Choose how TypeMaster Pro looks.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  className={`relative rounded-xl border px-3 py-4 transition ${
                    theme === option.value
                      ? 'border-[var(--tm-accent)] bg-[var(--tm-accent-soft)]'
                      : 'border-[var(--tm-border)] hover:bg-[var(--tm-surface-soft)]'
                  }`}
                >
                  {theme === option.value && (
                    <span className="absolute right-2 top-2 text-[var(--tm-accent)]">
                      <Check size={16} />
                    </span>
                  )}

                  <div className="text-2xl">
                    {option.icon}
                  </div>

                  <p className="mt-2 text-sm font-semibold text-[var(--tm-text)]">
                    {option.label}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Accent Color */}
          <div className="border-b border-[var(--tm-border)] px-5 py-5">
            <div className="mb-4">
              <p className="font-semibold text-[var(--tm-text)]">
                Accent Color
              </p>
              <p className="mt-1 text-sm text-[var(--tm-text-secondary)]">
                Choose the color used for buttons, tabs and highlights.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {accentOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAccentColor(option.value)}
                  className={`group flex items-center gap-2 rounded-full border px-3 py-2 transition ${
                    accentColor === option.value
                      ? 'border-[var(--tm-accent)] bg-[var(--tm-accent-soft)]'
                      : 'border-[var(--tm-border)] hover:bg-[var(--tm-surface-soft)]'
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200"
                    style={{ backgroundColor: option.color }}
                  />

                  <span className="text-sm font-medium text-[var(--tm-text)]">
                    {option.label}
                  </span>

                  {accentColor === option.value && (
                    <Check
                      size={15}
                      className="text-[var(--tm-accent)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Text Color */}
          <div className="px-5 py-5">
            <div className="mb-4">
              <p className="font-semibold text-[var(--tm-text)]">
                Text Color
              </p>
              <p className="mt-1 text-sm text-[var(--tm-text-secondary)]">
                Change the main text color across the application.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {textColorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTextColor(option.value)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition ${
                    textColor === option.value
                      ? 'border-[var(--tm-accent)] bg-[var(--tm-accent-soft)]'
                      : 'border-[var(--tm-border)] hover:bg-[var(--tm-surface-soft)]'
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: option.color }}
                  />

                  <span className="text-sm font-semibold text-[var(--tm-text)]">
                    {option.label}
                  </span>

                  {textColor === option.value && (
                    <Check
                      size={15}
                      className="text-[var(--tm-accent)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Typing Preferences */}
        <section className="overflow-hidden rounded-2xl border border-[var(--tm-border)] bg-[var(--tm-surface)] shadow-sm">
          <div className="flex items-center justify-between gap-4 px-5 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
                <Keyboard size={20} />
              </div>

              <div>
                <p className="font-semibold text-[var(--tm-text)]">
                  Typing Preferences
                </p>
                <p className="text-sm text-[var(--tm-text-secondary)]">
                  Configure your typing experience.
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-[var(--tm-text-muted)]">
              Coming soon
            </span>
          </div>
        </section>

        {/* Account */}
        <section className="overflow-hidden rounded-2xl border border-[var(--tm-border)] bg-[var(--tm-surface)] shadow-sm">
          <div className="border-b border-[var(--tm-border)] px-5 py-4">
            <h2 className="font-bold text-[var(--tm-text)]">
              Account
            </h2>
          </div>

          <div className="flex items-center gap-4 border-b border-[var(--tm-border)] px-5 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
              <User size={21} />
            </div>

            <div>
              <p className="font-semibold text-[var(--tm-text)]">
                {student?.name || 'Student'}
              </p>
              <p className="text-sm text-[var(--tm-text-secondary)]">
                Student account
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 px-5 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--tm-accent-soft)] text-[var(--tm-accent)]">
              <Shield size={21} />
            </div>

            <div>
              <p className="font-semibold text-[var(--tm-text)]">
                Account Security
              </p>
              <p className="text-sm text-[var(--tm-text-secondary)]">
                Your account information is protected.
              </p>
            </div>
          </div>
        </section>

        {/* App Info */}
        <div className="pb-4 text-center">
          <p className="text-xs text-[var(--tm-text-muted)]">
            TypeMaster Pro
          </p>
          <p className="mt-1 text-xs text-[var(--tm-text-muted)]">
            Typing made simple, productive and fun.
          </p>
        </div>

      </div>
    </div>
  );
};

export { SettingsView };