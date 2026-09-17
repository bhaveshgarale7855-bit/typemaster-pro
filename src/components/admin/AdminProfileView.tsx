import React from 'react';
import {
  User,
  Mail,
  ShieldCheck,
  Users,
  Layers,
  Pencil,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminProfileViewProps {
  onEditProfile: () => void;
}

export const AdminProfileView: React.FC<AdminProfileViewProps> = ({
  onEditProfile,
}) => {
  const { user } = useAuth();

  const name =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Administrator';

  const email = user?.email || '';

  const avatar =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={avatar}
              alt="Admin profile"
              className="h-24 w-24 rounded-full border-4 border-white/20 object-cover shadow-xl"
            />

            <div>
              <p className="text-sm font-medium text-blue-200">
                Administrator Profile
              </p>

              <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {name}
              </h1>

              <p className="mt-1 text-sm text-slate-300">
                {email}
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                <ShieldCheck size={14} />
                Administrator Account
              </div>
            </div>
          </div>

          <button
            onClick={onEditProfile}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-lg transition hover:bg-slate-100"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Account */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4">
          <h2 className="font-bold text-slate-900">
            Account Information
          </h2>
          <p className="text-sm text-slate-500">
            Your administrator account information.
          </p>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <User size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Full Name
              </p>
              <p className="font-semibold text-slate-900">{name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Mail size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="break-all font-semibold text-slate-900">
                {email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Building2 size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Platform
              </p>
              <p className="font-semibold text-slate-900">
                TypeMaster Pro
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Account Type
              </p>
              <p className="font-semibold text-slate-900">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Overview */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Management Access
              </p>
              <p className="text-lg font-bold text-slate-900">
                Full Access
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Layers size={21} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Role
              </p>
              <p className="text-lg font-bold text-slate-900">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm">
        <p className="text-sm font-semibold text-slate-700">
          TypeMaster Pro
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Administrator Profile • Version 1.0
        </p>
      </div>
    </div>
  );
};