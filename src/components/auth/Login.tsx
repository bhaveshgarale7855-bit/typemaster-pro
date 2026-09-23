import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  ShieldCheck,
  Eye,
  EyeOff,
  Keyboard,
  LockKeyhole,
  Mail,
  ArrowRight,
  UserPlus,
  LogIn,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

export type LoginRole = 'student' | 'teacher' | 'admin';

interface LoginProps {
  onLogin?: (role: LoginRole, email: string) => void;
  onSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [role, setRole] = useState<LoginRole>('student');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isPasswordRecovery } = useAuth();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setForgotPassword(false);
        setResetPassword(true);
        setError('');
        setSuccess('');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isPasswordRecovery) {
      setForgotPassword(false);
      setResetPassword(true);
      setError('');
      setSuccess('');
    }
  }, [isPasswordRecovery]);

  const selectRole = (newRole: LoginRole) => {
    setRole(newRole);
    setError('');
    setSuccess('');

    // Admin accounts are login-only.
    if (newRole === 'admin' && mode === 'signup') {
      setMode('login');
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setSuccess('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Please enter your email address first.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        cleanEmail,
        {
          redirectTo: window.location.origin,
        }
      );

      if (error) throw error;

      setSuccess(
        'Password reset link has been sent to your email. Please check your inbox.'
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to send password reset email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setError('');
    setSuccess('');

    if (!newPassword) {
      setError('Please enter your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      await supabase.auth.signOut();

      setNewPassword('');
      setConfirmPassword('');
      setPassword('');
      setResetPassword(false);
      setMode('login');

      setSuccess(
        'Password updated successfully. You can now sign in with your new password.'
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to update password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }

    if (!cleanEmail.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'signup' && !name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // Admin signup is not allowed.
    if (mode === 'signup' && role === 'admin') {
      setError(
        'Admin accounts cannot be created from this page. Please use Sign In.'
      );
      return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        /*
         * Student:
         *   Normal Supabase signup.
         *
         * Teacher:
         *   Supabase creates the user.
         *   The database trigger checks the email against
         *   the teachers table and automatically creates
         *   the correct teacher profile.
         *
         * The role stored in metadata is NOT trusted for
         * authorization. The database trigger decides
         * the actual profile role.
         */
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              full_name: name.trim(),
              role: role === 'teacher' ? 'teacher' : 'student',
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.session) {
          onLogin?.(role, cleanEmail);
          onSuccess?.();
          return;
        }

        setSuccess(
          role === 'teacher'
            ? 'Account created. Please verify your email, then sign in with your Teacher account.'
            : 'Account created. Please verify your email, then sign in.'
        );

        setMode('login');
        setPassword('');
        return;
      }

      // =========================
      // SIGN IN
      // =========================
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      if (!data.user) {
        throw new Error('Unable to sign in. Please try again.');
      }

      /*
       * AuthContext will read the actual role from
       * public.profiles.
       *
       * This prevents the login screen from deciding
       * whether an account is really a Teacher/Admin.
       */
      onLogin?.(role, cleanEmail);
      onSuccess?.();
    } catch (err) {
      console.error('Authentication error:', err);

      const message =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (forgotPassword) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <Mail className="w-7 h-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black">
              Forgot Password?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your registered email and we'll send you a password reset link.
            </p>
          </div>

          <div className="mt-7 space-y-5">

            <div>
              <label
                htmlFor="forgot-email"
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                Email address
              </label>

              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                {success}
              </div>
            )}

            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Reset Link
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setForgotPassword(false);
                setError('');
                setSuccess('');
              }}
              disabled={loading}
              className="w-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              ← Back to Sign In
            </button>

          </div>
        </div>
      </div>
    );
  }

  if (resetPassword) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

          <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <LockKeyhole className="w-7 h-7" />
            </div>

            <h2 className="mt-5 text-2xl font-black">
              Set New Password
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Enter your new password below.
            </p>
          </div>

          <div className="mt-7 space-y-5">

            {/* New password */}
            <div>
              <label
                htmlFor="new-password"
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                New password
              </label>

              <input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                Confirm new password
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-2xl shadow-slate-200/70 overflow-hidden border border-slate-200">

        {/* =========================
            LEFT BRANDING PANEL
        ========================== */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-24 w-80 h-80 rounded-full bg-white/10" />

          <div className="relative z-10 flex flex-col justify-between w-full">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <Keyboard className="w-6 h-6" />
                </div>

                <div>
                  <div className="text-2xl font-black tracking-tight">
                    TypeMaster<span className="text-blue-200">Pro</span>
                  </div>

                  <div className="text-xs text-blue-100">
                    Interactive Typing Academy
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-xs uppercase tracking-[0.25em] font-black text-blue-200">
                  Welcome
                </p>

                <h1 className="mt-3 text-4xl xl:text-5xl font-black leading-tight">
                  Improve your typing.
                  <br />
                  Track your progress.
                  <br />
                  Reach your target.
                </h1>

                <p className="mt-6 max-w-lg text-blue-100 leading-7">
                  Learn typing, practice drills, take timed tests,
                  play arcade games, and track your performance in
                  one place.
                </p>
              </div>
            </div>

            <div className="mt-12 text-xs text-blue-100">
              GCC-TBC inspired typing practice platform
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT AUTH PANEL
        ========================== */}
        <div className="p-6 sm:p-10 lg:p-12">

          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Keyboard className="w-5 h-5" />
            </div>

            <div>
              <div className="text-xl font-black">
                TypeMaster<span className="text-blue-600">Pro</span>
              </div>

              <div className="text-[11px] text-slate-500">
                Interactive Typing Academy
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
              Account Access
            </p>

            <h2 className="mt-2 text-3xl font-black text-slate-900">
              {mode === 'login'
                ? 'Welcome back'
                : role === 'teacher'
                  ? 'Create Teacher Account'
                  : 'Create your account'}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {mode === 'login'
                ? 'Sign in to continue to TypeMaster Pro.'
                : role === 'teacher'
                  ? 'Use the email authorized by your administrator.'
                  : 'Create a student account to begin learning.'}
            </p>
          </div>

          {/* =========================
              ROLE SELECTOR
          ========================== */}
          <div className="mt-7">
            <p className="text-xs font-bold text-slate-600 mb-2">
              {mode === 'login' ? 'Sign in as' : 'Create account as'}
            </p>

            <div className="grid grid-cols-3 gap-3">

              {/* STUDENT */}
              <button
                type="button"
                onClick={() => selectRole('student')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${role === 'student'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                    }`}
                >
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm font-black">Student</p>
                  <p className="text-[10px] text-slate-500">
                    Learning
                  </p>
                </div>
              </button>

              {/* TEACHER */}
              <button
                type="button"
                onClick={() => selectRole('teacher')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${role === 'teacher'
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-100'
                  : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/40'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'teacher'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                    }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm font-black">Teacher</p>
                  <p className="text-[10px] text-slate-500">
                    Staff
                  </p>
                </div>
              </button>

              {/* ADMIN */}
              <button
                type="button"
                onClick={() => selectRole('admin')}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${role === 'admin'
                  ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100'
                  : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/40'
                  }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'admin'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-500'
                    }`}
                >
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-sm font-black">Admin</p>
                  <p className="text-[10px] text-slate-500">
                    Management
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* =========================
              AUTH FORM
          ========================== */}
          <form
            onSubmit={handleSubmit}
            className="mt-7 space-y-5"
          >

            {/* FULL NAME */}
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="login-name"
                  className="block text-xs font-bold text-slate-700 mb-2"
                >
                  Full name
                </label>

                <div className="relative">
                  <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    id="login-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-bold text-slate-700 mb-2"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete={
                    mode === 'login'
                      ? 'current-password'
                      : 'new-password'
                  }
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-12 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((value) => !value)
                  }
                  disabled={loading}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                  aria-label={
                    showPassword
                      ? 'Hide password'
                      : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccess('');
                    setForgotPassword(true);
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                {success}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed ${role === 'student'
                ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
                }`}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {mode === 'login' ? (
                    <LogIn className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}

                  {mode === 'login'
                    ? 'Sign In'
                    : 'Create Account'}

                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* =========================
              LOGIN / SIGNUP SWITCH
          ========================== */}
          {role !== 'admin' && (
            <div className="mt-7 text-center">
              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setMode((current) =>
                    current === 'login'
                      ? 'signup'
                      : 'login'
                  );

                  setError('');
                  setSuccess('');
                }}
                className="text-sm font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                {mode === 'login'
                  ? "Don't have an account? Create one"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          )}

          {role === 'admin' && (
            <div className="mt-7 text-center">
              <p className="text-xs text-slate-400">
                Admin accounts are created separately and can
                only sign in here.
              </p>
            </div>
          )}

          <p className="mt-8 text-center text-[11px] text-slate-400">
            Secure authentication powered by Supabase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;