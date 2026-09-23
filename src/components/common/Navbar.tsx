import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

import {
  Keyboard,
  Flame,
  Volume2,
  VolumeX,
  Bell,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Menu,
  X,
  Check,
  User,
  Pencil,
  Settings,
  LogOut,
  LogIn,
} from 'lucide-react';

import { EditProfileModal } from './EditProfileModal';
import Login from '../auth/Login';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    student,
    admin,
    updateStudentProfile,
    teacher,
    soundEnabled,
    toggleSound,
    soundType,
    setSoundType,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setStudentTab,
    setAdminTab,
    exitActiveSession,
  } = useApp();

  const {
    user,
    role: authRole,
    signOut,
  } = useAuth();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [showSoundMenu, setShowSoundMenu] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const [showEditProfile, setShowEditProfile] =
    useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [showLogin, setShowLogin] =
    useState(false);

  const isLoggedIn = !!user;

  /*
   * AuthContext role is the primary source because it represents
   * the currently authenticated account.
   *
   * AppContext role is used as a fallback.
   */
  const currentRole = authRole ?? role;

  const unreadNotifs = notifications.filter(
    (n) => !n.read
  );

  const xpPercent = Math.min(
    100,
    Math.round(
      (student.xp / student.xpToNextLevel) * 100
    )
  );

  /*
   * ============================================================
   * CURRENT STAFF PROFILE
   * ============================================================
   *
   * Admin must use the separate `admin` profile.
   * Teacher must use the `teacher` profile.
   *
   * This prevents Admin from showing Teacher's name/avatar.
   */
  const staffProfile =
    currentRole === 'admin'
      ? admin
      : teacher;

  const staffAvatar =
    staffProfile?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const staffName =
    staffProfile?.name ||
    (currentRole === 'admin'
      ? 'Administrator'
      : 'Staff Member');

  const staffEmail =
    staffProfile?.email ||
    user?.email ||
    '';

  const staffRoleLabel =
    currentRole === 'admin'
      ? 'Administrator'
      : 'Instructor';

  const accessLabel =
    currentRole === 'admin'
      ? 'Admin Panel'
      : 'Teacher Panel';

  /*
   * ============================================================
   * MENU HELPERS
   * ============================================================
   */

  const closeAllMenus = () => {
    setShowNotifications(false);
    setShowSoundMenu(false);
    setShowProfileMenu(false);
    setMobileMenuOpen(false);
  };

  /*
   * ============================================================
   * LOGOUT
   * ============================================================
   */

  const handleLogout = async () => {
    try {
      exitActiveSession();
      closeAllMenus();

      await signOut();

      setShowLogin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            {/* =====================================================
                BRAND
            ===================================================== */}

            <div
              id="nav-brand-logo"
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => {
                exitActiveSession();
                closeAllMenus();

                if (
                  isLoggedIn &&
                  currentRole === 'student'
                ) {
                  setStudentTab('dashboard');
                } else if (
                  isLoggedIn &&
                  (
                    currentRole === 'admin' ||
                    currentRole === 'teacher'
                  )
                ) {
                  setAdminTab('profile');
                }
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-cyan-500 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Keyboard className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                    TypeMaster
                    <span className="text-blue-600 font-black">
                      Pro
                    </span>
                  </span>

                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-widest hidden sm:inline-block">
                    v2.4
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 hidden sm:block">
                  {!isLoggedIn
                    ? 'Interactive Typing Academy'
                    : currentRole === 'student'
                      ? 'Interactive Typing Academy'
                      : 'Instructor & Batch Management'}
                </p>
              </div>
            </div>

            {/* =====================================================
                DESKTOP NAV
            ===================================================== */}

            <div className="hidden md:flex items-center gap-2">

              {!isLoggedIn ? (
                <button
                  id="nav-login-btn"
                  onClick={() => {
                    closeAllMenus();
                    setShowLogin(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Login / Sign Up
                </button>
              ) : (
                <div className="flex items-center px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">

                  {currentRole === 'student' ? (
                    <>
                      <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />

                      <span className="text-xs font-semibold text-slate-700">
                        Student
                      </span>
                    </>
                  ) : currentRole === 'teacher' ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-blue-600 mr-2" />

                      <span className="text-xs font-semibold text-slate-700">
                        Teacher
                      </span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-indigo-600 mr-2" />

                      <span className="text-xs font-semibold text-slate-700">
                        Admin
                      </span>
                    </>
                  )}

                </div>
              )}

            </div>

            {/* =====================================================
                RIGHT ACTIONS
            ===================================================== */}

            <div className="flex items-center gap-2 sm:gap-4">

              {/* ===================================================
                  STUDENT XP / STREAK
              =================================================== */}

              {isLoggedIn &&
                currentRole === 'student' && (
                  <>
                    <div
                      id="nav-streak-counter"
                      title={`${student.streakDays} Day Active Streak`}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold shadow-sm"
                    >
                      <Flame className="w-4 h-4 text-orange-500 animate-pulse fill-orange-400/30" />

                      <span>
                        {student.streakDays}d
                      </span>
                    </div>

                    <div
                      id="nav-xp-capsule"
                      className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs"
                    >
                      <div className="flex items-center gap-1 text-blue-600 font-bold">
                        <Sparkles className="w-3.5 h-3.5" />

                        <span>
                          Lvl {student.level}
                        </span>
                      </div>

                      <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${xpPercent}%`,
                          }}
                        />
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {student.xp} XP
                      </span>
                    </div>
                  </>
                )}

              {/* ===================================================
                  SOUND
              =================================================== */}

              <div className="relative">

                <button
                  id="nav-sound-btn"
                  onClick={() => {
                    setShowSoundMenu(
                      (prev) => !prev
                    );

                    setShowNotifications(false);
                    setShowProfileMenu(false);
                  }}
                  title="Typing Sound Settings"
                  className={`p-2 rounded-lg border transition-all ${
                    soundEnabled
                      ? 'bg-blue-50 border-blue-200 text-blue-600 hover:border-blue-300'
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>

                {showSoundMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50">

                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">

                      <span className="text-xs font-semibold text-slate-800">
                        Keyboard Audio
                      </span>

                      <button
                        onClick={toggleSound}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          soundEnabled
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {soundEnabled
                          ? 'ON'
                          : 'OFF'}
                      </button>

                    </div>

                    <div className="space-y-1">

                      <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                        Switch Profile
                      </p>

                      <button
                        onClick={() => {
                          setSoundType(
                            'cherry-blue'
                          );

                          setShowSoundMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          soundType ===
                          'cherry-blue'
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>
                          Mechanical Click (Blue)
                        </span>

                        {soundType ===
                          'cherry-blue' && (
                            <Check className="w-3 h-3 text-blue-600" />
                          )}
                      </button>

                      <button
                        onClick={() => {
                          setSoundType(
                            'cherry-brown'
                          );

                          setShowSoundMenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          soundType ===
                          'cherry-brown'
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>
                          Tactile Soft (Brown)
                        </span>

                        {soundType ===
                          'cherry-brown' && (
                            <Check className="w-3 h-3 text-blue-600" />
                          )}
                      </button>

                    </div>
                  </div>
                )}

              </div>

              {/* ===================================================
                  NOTIFICATIONS
              =================================================== */}

              {isLoggedIn && (
                <div className="relative">

                  <button
                    id="nav-notifications-btn"
                    onClick={() => {
                      setShowNotifications(
                        (prev) => !prev
                      );

                      setShowSoundMenu(false);
                      setShowProfileMenu(false);
                    }}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 relative transition-colors"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />

                    {unreadNotifs.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                        {unreadNotifs.length}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50">

                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">

                        <div className="flex items-center gap-2">

                          <span className="text-sm font-semibold text-slate-800">
                            Notifications
                          </span>

                          {unreadNotifs.length > 0 && (
                            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                              {unreadNotifs.length} new
                            </span>
                          )}

                        </div>

                        {unreadNotifs.length > 0 && (
                          <button
                            onClick={
                              markAllNotificationsRead
                            }
                            className="text-xs text-slate-500 hover:text-blue-600"
                          >
                            Mark all read
                          </button>
                        )}

                      </div>

                      <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">

                        {notifications.length ===
                          0 ? (
                          <p className="text-xs text-slate-400 text-center py-4">
                            No notifications yet
                          </p>
                        ) : (
                          notifications.map(
                            (notif) => (
                              <div
                                key={notif.id}
                                onClick={() =>
                                  markNotificationRead(
                                    notif.id
                                  )
                                }
                                className={`p-3 rounded-lg border text-left cursor-pointer ${
                                  notif.read
                                    ? 'bg-slate-50 border-slate-200 text-slate-500'
                                    : 'bg-blue-50 border-blue-100 text-slate-800'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">

                                  <span className="text-xs font-semibold">
                                    {notif.title}
                                  </span>

                                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                                    {notif.timestamp}
                                  </span>

                                </div>

                                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                                  {notif.message}
                                </p>

                              </div>
                            )
                          )
                        )}

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ===================================================
                  PROFILE / LOGIN
              =================================================== */}

              {isLoggedIn ? (
                <div className="relative pl-2 border-l border-slate-200">

                  <button
                    id="nav-profile-btn"
                    onClick={() => {
                      setShowProfileMenu(
                        (prev) => !prev
                      );

                      setShowNotifications(false);
                      setShowSoundMenu(false);
                    }}
                    className="flex items-center gap-2.5 cursor-pointer rounded-lg px-2 py-1.5 hover:bg-slate-50 transition-colors"
                    title="Open Profile"
                  >

                    {/* CORRECT AVATAR */}

                    <img
                      src={
                        currentRole ===
                          'student'
                          ? student.avatar
                          : staffAvatar
                      }
                      alt="Avatar"
                      className="w-8 h-8 rounded-full ring-2 ring-slate-200 object-cover"
                    />

                    <div className="hidden lg:block text-left">

                      {/* CORRECT NAME */}

                      <p className="text-xs font-semibold text-slate-800 leading-tight">
                        {currentRole ===
                          'student'
                          ? student.name
                          : staffName}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        {currentRole ===
                          'student'
                          ? student.batchName
                          : staffRoleLabel}
                      </p>

                    </div>
                  </button>

                  {/* =================================================
                      PROFILE DROPDOWN
                  ================================================= */}

                  {showProfileMenu && (
                    <div
                      id="profile-dropdown"
                      className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[60] overflow-hidden"
                    >

                      {/* =============================================
                          PROFILE HEADER
                      ============================================= */}

                      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 p-5">

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              currentRole ===
                                'student'
                                ? student.avatar
                                : staffAvatar
                            }
                            alt="Profile"
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-white/30"
                          />

                          <div className="min-w-0 flex-1">

                            <h3 className="text-sm font-bold text-white truncate">
                              {currentRole ===
                                'student'
                                ? student.name
                                : staffName}
                            </h3>

                            {/* EMAIL */}

                            <p className="text-[11px] text-blue-200 mt-1 truncate">
                              {currentRole ===
                                'student'
                                ? user?.email ||
                                  student.email
                                : staffEmail}
                            </p>

                            {/* ROLE */}

                            <p className="text-xs text-blue-200 mt-1">
                              {currentRole ===
                                'student'
                                ? student.batchName
                                : staffRoleLabel}
                            </p>

                            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/10 border border-white/10">

                              {currentRole ===
                                'student' ? (
                                <GraduationCap className="w-3 h-3 text-blue-300" />
                              ) : (
                                <ShieldCheck className="w-3 h-3 text-cyan-300" />
                              )}

                              <span className="text-[10px] font-semibold text-white">
                                {currentRole ===
                                  'student'
                                  ? 'Student Account'
                                  : currentRole ===
                                    'admin'
                                    ? 'Admin Account'
                                    : 'Teacher Account'}
                              </span>

                            </div>

                          </div>
                        </div>
                      </div>

                      {/* =============================================
                          STUDENT STATS
                      ============================================= */}

                      {currentRole ===
                        'student' && (
                          <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">

                            <div className="rounded-xl bg-blue-50 border border-blue-100 p-2.5 text-center">

                              <p className="text-sm font-extrabold text-blue-600">
                                {student.level}
                              </p>

                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Level
                              </p>

                            </div>

                            <div className="rounded-xl bg-orange-50 border border-orange-100 p-2.5 text-center">

                              <p className="text-sm font-extrabold text-orange-600">
                                {student.streakDays}d
                              </p>

                              <p className="text-[10px] text-slate-500 mt-0.5">
                                Streak
                              </p>

                            </div>

                            <div className="rounded-xl bg-violet-50 border border-violet-100 p-2.5 text-center">

                              <p className="text-sm font-extrabold text-violet-600">
                                {student.xp}
                              </p>

                              <p className="text-[10px] text-slate-500 mt-0.5">
                                XP
                              </p>

                            </div>

                          </div>
                        )}

                      {/* =============================================
                          PROFILE ACTIONS
                      ============================================= */}

                      <div className="p-2.5">

                        {/* =================================================
                            MY PROFILE
                        ================================================= */}

                        <button
                          onClick={() => {
                            exitActiveSession();
                            closeAllMenus();

                            if (
                              currentRole ===
                              'student'
                            ) {
                              /*
                               * STUDENT:
                               * Go to Student Profile
                               */
                              setStudentTab(
                                'profile'
                              );
                            } else {
                              /*
                               * ADMIN + TEACHER:
                               * Go directly to their
                               * Profile page.
                               */
                              setAdminTab(
                                'profile'
                              );
                            }
                          }}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-blue-50 transition-colors group"
                        >

                          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>

                          <div>

                            <p className="text-xs font-bold text-slate-800">
                              My Profile
                            </p>

                            <p className="text-[10px] text-slate-500 mt-0.5">
                              View your account and progress
                            </p>

                          </div>

                        </button>

                        {/* =================================================
                            EDIT PROFILE - STUDENT ONLY
                        ================================================= */}

                        {currentRole ===
                          'student' && (
                            <button
                              onClick={() => {
                                setShowProfileMenu(
                                  false
                                );

                                setShowEditProfile(
                                  true
                                );
                              }}
                              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-slate-50 transition-colors group"
                            >

                              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                                <Pencil className="w-4 h-4 text-slate-600" />
                              </div>

                              <div>

                                <p className="text-xs font-bold text-slate-800">
                                  Edit Profile
                                </p>

                                <p className="text-[10px] text-slate-500 mt-0.5">
                                  Update your profile information
                                </p>

                              </div>

                            </button>
                          )}

                        {/* =================================================
                            SETTINGS
                        ================================================= */}

                        <button
                          onClick={() => {
                            exitActiveSession();
                            closeAllMenus();

                            if (
                              currentRole ===
                              'student'
                            ) {
                              /*
                               * STUDENT:
                               * Go to Student Settings
                               */
                              setStudentTab(
                                'settings'
                              );
                            } else {
                              /*
                               * ADMIN + TEACHER:
                               * Go directly to their
                               * Settings page.
                               */
                              setAdminTab(
                                'settings'
                              );
                            }
                          }}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-slate-50 transition-colors group"
                        >

                          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <Settings className="w-4 h-4 text-slate-600" />
                          </div>

                          <div>

                            <p className="text-xs font-bold text-slate-800">
                              Settings
                            </p>

                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Manage application preferences
                            </p>

                          </div>

                        </button>

                      </div>

                      {/* =============================================
                          CURRENT ACCESS
                      ============================================= */}

                      <div className="px-3 pb-3">

                        <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5">

                          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                            Current Access
                          </p>

                          <p className="text-xs font-semibold text-slate-700 mt-1">
                            {currentRole ===
                              'student'
                              ? 'Student Panel'
                              : accessLabel}
                          </p>

                        </div>

                      </div>

                      {/* =============================================
                          LOGOUT
                      ============================================= */}

                      <div className="border-t border-slate-200 p-2.5">

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left hover:bg-red-50 transition-colors group"
                        >

                          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                            <LogOut className="w-4 h-4 text-red-600" />
                          </div>

                          <div>

                            <p className="text-xs font-bold text-red-600">
                              Logout
                            </p>

                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Sign out of your account
                            </p>

                          </div>

                        </button>

                      </div>

                    </div>
                  )}

                </div>
              ) : (

                /* ===================================================
                   NOT LOGGED IN
                =================================================== */

                <button
                  id="nav-login-btn-mobile"
                  onClick={() => {
                    closeAllMenus();
                    setShowLogin(true);
                  }}
                  className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>

              )}

              {/* =====================================================
                  MOBILE MENU BUTTON
              ===================================================== */}

              <button
                onClick={() => {
                  setMobileMenuOpen(
                    (prev) => !prev
                  );

                  setShowProfileMenu(false);
                  setShowNotifications(false);
                  setShowSoundMenu(false);
                }}
                className="md:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE DRAWER
        ========================================================= */}

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-3 shadow-sm">

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogin(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold"
              >
                <LogIn className="w-4 h-4" />
                Login / Sign Up
              </button>
            ) : (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">

                <div className="flex items-center gap-3">

                  <img
                    src={
                      currentRole ===
                        'student'
                        ? student.avatar
                        : staffAvatar
                    }
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div className="min-w-0">

                    <p className="text-sm font-bold text-slate-800 truncate">
                      {currentRole ===
                        'student'
                        ? student.name
                        : staffName}
                    </p>

                    <p className="text-xs text-slate-500 truncate">
                      {currentRole ===
                        'student'
                        ? user?.email ||
                          student.email
                        : staffEmail}
                    </p>

                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {currentRole ===
                        'student'
                        ? 'Student Account'
                        : staffRoleLabel}
                    </p>

                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </div>
            )}

          </div>
        )}

      </header>

      {/* ===========================================================
          LOGIN MODAL
      =========================================================== */}

      {showLogin && (
        <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden bg-white rounded-3xl shadow-2xl">

            <button
              onClick={() =>
                setShowLogin(false)
              }
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              aria-label="Close login"
            >
              <X className="w-5 h-5" />
            </button>

            <Login
              onSuccess={() => {
                setShowLogin(false);
                closeAllMenus();
              }}
            />

          </div>
        </div>
      )}

      {/* ===========================================================
          EDIT STUDENT PROFILE
      =========================================================== */}

      {showEditProfile &&
        currentRole === 'student' && (
          <EditProfileModal
            student={student}
            onClose={() =>
              setShowEditProfile(false)
            }
            onSave={(name, avatar) => {
              updateStudentProfile(
                name,
                avatar
              );

              setShowEditProfile(false);
            }}
          />
        )}

    </>
  );
};