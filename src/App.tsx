// import { AuthProvider } from './context/AuthContext';
// import { TeacherManagementView } from './components/admin/TeacherManagementView';
// // import AuthGate from './components/auth/AuthGate';
// import React, { useEffect, useRef, useState } from 'react';
// import { AppProvider, useApp } from './context/AppContext';
// import { Navbar } from './components/common/Navbar';
// import { TypingEngine } from './components/typing/TypingEngine';
// import { EditProfileModal } from './components/common/EditProfileModal';

// // Student views
// import { StudentDashboard } from './components/student/StudentDashboard';
// import { LearnTypingView } from './components/student/LearnTypingView';
// import { TypingPracticeView } from './components/student/TypingPracticeView';
// import { TypingTestsView } from './components/student/TypingTestsView';
// import TypingGamesView from './components/student/TypingGamesView';
// import { AchievementsView } from './components/student/AchievementsView';
// import { AnalyticsView } from './components/student/AnalyticsView';
// import { ProfileView } from './components/student/ProfileView';
// import { SettingsView } from './components/student/SettingsView';
// import { TestHistoryView } from './components/student/TestHistoryView';
// import { LeaderboardView } from './components/student/LeaderboardView';

// // Admin views
// import { AdminDashboard } from './components/admin/AdminDashboard';
// import { StudentManagementView } from './components/admin/StudentManagementView';
// import { BatchManagementView } from './components/admin/BatchManagementView';
// import { LessonManagementView } from './components/admin/LessonManagementView';
// import { PassageManagementView } from './components/admin/PassageManagementView';
// import { TestCreatorView } from './components/admin/TestCreatorView';
// import { AssignmentsView } from './components/admin/AssignmentsView';
// import { ReportsView } from './components/admin/ReportsView';

// // Icons
// import {
//   LayoutDashboard,
//   BookOpen,
//   UserPlus,
//   Keyboard,
//   Timer,
//   Gamepad2,
//   Trophy,
//   BarChart3,
//   History,
//   Crown,
//   Users,
//   Layers,
//   FileText,
//   Sparkles,
//   TrendingUp,
//   CheckCircle2,
//   MoreHorizontal,
// } from 'lucide-react';

// import { StudentNavTab, AdminNavTab } from './types';

// const studentNavItems: {
//   id: StudentNavTab;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }[] = [
//     { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'learn', label: 'Learn Typing', icon: BookOpen },
//     { id: 'practice', label: 'Practice Drills', icon: Keyboard },
//     { id: 'tests', label: 'Typing Tests', icon: Timer },
//     { id: 'games', label: 'Arcade Games', icon: Gamepad2 },
//   ];

// const studentMoreItems: {
//   id: StudentNavTab;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }[] = [
//     { id: 'achievements', label: 'Achievements', icon: Trophy },
//     { id: 'analytics', label: 'Analytics', icon: BarChart3 },
//     { id: 'history', label: 'Test History', icon: History },
//     { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
//   ];

// const adminNavItems: {
//   id: AdminNavTab;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }[] = [
//     { id: 'admin-dashboard', label: 'Overview', icon: LayoutDashboard },
//     { id: 'admin-students', label: 'Students', icon: Users },
//     { id: 'admin-teachers', label: 'Teachers', icon: UserPlus },
//     { id: 'admin-batches', label: 'Batches', icon: Layers },
//     { id: 'admin-lessons', label: 'Curriculum', icon: BookOpen },
//     { id: 'admin-passages', label: 'Passage Bank', icon: FileText },
//     { id: 'admin-tests', label: 'Test Creator', icon: Sparkles },
//     { id: 'admin-assignments', label: 'Assignments', icon: CheckCircle2 },
//     { id: 'admin-reports', label: 'Reports', icon: TrendingUp },
//   ];

// const teacherNavItems: {
//   id: AdminNavTab;
//   label: string;
//   icon: React.ComponentType<{ className?: string }>;
// }[] = [
//     { id: 'admin-dashboard', label: 'Overview', icon: LayoutDashboard },
//     { id: 'admin-students', label: 'Students', icon: Users },
//     { id: 'admin-batches', label: 'Batches', icon: Layers },
//     { id: 'admin-lessons', label: 'Curriculum', icon: BookOpen },
//     { id: 'admin-passages', label: 'Passage Bank', icon: FileText },
//     { id: 'admin-tests', label: 'Test Creator', icon: Sparkles },
//     { id: 'admin-assignments', label: 'Assignments', icon: CheckCircle2 },
//     { id: 'admin-reports', label: 'Reports', icon: TrendingUp },
//   ];

// const MainLayout: React.FC = () => {
//   const {
//     role,
//     student,
//     updateStudentProfile,
//     studentTab,
//     setStudentTab,
//     adminTab,
//     setAdminTab,
//     activeLesson,
//     activeTestPassage,
//     activeTestDuration,
//     exitActiveSession,
//     lessons,
//   } = useApp();

//   const [showEditProfile, setShowEditProfile] = useState(false);
//   const [moreOpen, setMoreOpen] = useState(false);
//   const [adminView, setAdminView] = useState<'admin' | 'student'>('admin');

//   const moreRef = useRef<HTMLDivElement>(null);

//   // Close More menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         moreRef.current &&
//         !moreRef.current.contains(event.target as Node)
//       ) {
//         setMoreOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Close More menu when changing student tab
//   useEffect(() => {
//     setMoreOpen(false);
//   }, [studentTab]);

//   // =========================================
//   // Active Lesson Session
//   // =========================================
//   if (activeLesson) {
//     const currentLessonIdx = lessons.findIndex(
//       (l) => l.id === activeLesson.id
//     );

//     const hasNext =
//       currentLessonIdx >= 0 &&
//       currentLessonIdx < lessons.length - 1;

//     return (
//       <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
//         <Navbar />

//         <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
//           <TypingEngine
//             title={`${activeLesson.moduleTitle} • ${activeLesson.title}`}
//             sourceText={
//               activeLesson.exercises[0]?.text ||
//               'the quick brown fox jumps over the lazy dog'
//             }
//             type="lesson"
//             targetWpm={activeLesson.exercises[0]?.targetWpm || 30}
//             minAccuracy={activeLesson.exercises[0]?.minAccuracy || 90}
//             onExit={exitActiveSession}
//             hasNextLesson={hasNext}
//             onNextLesson={() => {
//               if (hasNext) {
//                 exitActiveSession();
//               }
//             }}
//           />
//         </main>
//       </div>
//     );
//   }

//   // =========================================
//   // Active Typing Test Session
//   // =========================================
//   if (activeTestPassage) {
//     return (
//       <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
//         <Navbar />

//         <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
//           <TypingEngine
//             title={activeTestPassage.title}
//             sourceText={activeTestPassage.content}
//             type="test"
//             timeLimitSeconds={activeTestDuration}
//             targetWpm={45}
//             minAccuracy={95}
//             onExit={exitActiveSession}
//           />
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#c5d7e6] text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">

//       <Navbar />

//       {/* =========================================
//           Main Navigation
//           ========================================= */}
//       <nav className="border-b border-slate-200 bg-white sticky top-16 z-40 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//           <div className="flex items-center gap-1 sm:gap-2 py-2.5">

//             {role === 'student' || (role === 'admin' && adminView === 'student') ? (
//               <>
//                 {/* Student Navigation */}
//                 <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">

//                   {studentNavItems.map((item) => {
//                     const Icon = item.icon;
//                     const isActive = studentTab === item.id;

//                     return (
//                       <button
//                         key={item.id}
//                         id={`subnav-student-${item.id}`}
//                         onClick={() => setStudentTab(item.id)}
//                         className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
//                           ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
//                           : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
//                           }`}
//                       >
//                         <Icon
//                           className={`w-3.5 h-3.5 ${isActive
//                             ? 'text-white'
//                             : 'text-slate-500'
//                             }`}
//                         />

//                         <span>{item.label}</span>
//                       </button>
//                     );
//                   })}

//                   {/* More Menu */}
//                   <div
//                     ref={moreRef}
//                     className="relative flex-shrink-0"
//                   >
//                     <button
//                       id="student-more-menu"
//                       onClick={() => setMoreOpen((prev) => !prev)}
//                       className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${moreOpen ||
//                         studentMoreItems.some(
//                           (item) => studentTab === item.id
//                         )
//                         ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
//                         : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
//                         }`}
//                     >
//                       <MoreHorizontal className="w-4 h-4" />
//                       <span>More</span>
//                     </button>

//                     {/* More Dropdown */}
//                     {moreOpen && (
//                       <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 z-50">

//                         {studentMoreItems.map((item) => {
//                           const Icon = item.icon;
//                           const isActive = studentTab === item.id;

//                           return (
//                             <button
//                               key={item.id}
//                               id={`more-student-${item.id}`}
//                               onClick={() => {
//                                 setStudentTab(item.id);
//                                 setMoreOpen(false);
//                               }}
//                               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${isActive
//                                 ? 'bg-blue-600 text-white font-bold'
//                                 : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
//                                 }`}
//                             >
//                               <Icon className="w-4 h-4 flex-shrink-0" />
//                               <span>{item.label}</span>
//                             </button>
//                           );
//                         })}

//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 {role === 'admin' && (
//                   <button
//                     onClick={() => setAdminView('admin')}
//                     className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer text-slate-600 hover:text-blue-700 hover:bg-blue-50"
//                   >
//                     <LayoutDashboard className="w-3.5 h-3.5" />
//                     <span>Admin Panel</span>
//                   </button>
//                 )}
//               </>
//             ) : (
//               /* =========================================
//               {/* =========================================
//                   Admin / Teacher Navigation
//                   ========================================= */}
//             <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full">

//               {/* Student Side — Admin only */}
//               {role === 'admin' && (
//                 <button
//                   onClick={() => setAdminView('student')}
//                   className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer text-slate-600 hover:text-blue-700 hover:bg-blue-50"
//                 >
//                   <Keyboard className="w-3.5 h-3.5" />
//                   <span>Student Side</span>
//                 </button>
//               )}

//               {(role === 'admin' ? adminNavItems : teacherNavItems).map((item) => {
//                 const Icon = item.icon;
//                 const isActive = adminTab === item.id;

//                 return (
//                   <button
//                     key={item.id}
//                     id={`subnav-${role}-${item.id}`}
//                     onClick={() => setAdminTab(item.id)}
//                     className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
//                       ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
//                       : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
//                       }`}
//                   >
//                     <Icon
//                       className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'
//                         }`}
//                     />

//                     <span>{item.label}</span>
//                   </button>
//                 );
//               })}
//             </div>


//             {/* =========================================
//           Main Content
//           ========================================= */}
//             <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

//               {role === 'student' || (role === 'admin' && adminView === 'student') ? (
//                 <>
//                   {studentTab === 'dashboard' && <StudentDashboard />}

//                   {studentTab === 'learn' && <LearnTypingView />}

//                   {studentTab === 'practice' && <TypingPracticeView />}

//                   {studentTab === 'tests' && <TypingTestsView />}

//                   {studentTab === 'games' && <TypingGamesView />}

//                   {studentTab === 'achievements' && <AchievementsView />}

//                   {studentTab === 'analytics' && <AnalyticsView />}

//                   {studentTab === 'history' && <TestHistoryView />}

//                   {studentTab === 'leaderboard' && <LeaderboardView />}

//                   {/* Profile */}
//                   {studentTab === 'profile' && (
//                     <ProfileView
//                       onEditProfile={() => setShowEditProfile(true)}
//                     />
//                   )}

//                   {/* Settings */}
//                   {studentTab === 'settings' && (
//                     <SettingsView />
//                   )}
//                 </>
//               ) : (

//                 <>
//                   {adminTab === 'admin-dashboard' && <AdminDashboard />}

//                   {adminTab === 'admin-students' && (
//                     <StudentManagementView />
//                   )}

//                   {adminTab === 'admin-batches' && (
//                     <BatchManagementView />
//                   )}

//                   {adminTab === 'admin-teachers' && (
//                     <TeacherManagementView />
//                   )}

//                   {adminTab === 'admin-lessons' && (
//                     <LessonManagementView />
//                   )}

//                   {adminTab === 'admin-passages' && (
//                     <PassageManagementView />
//                   )}

//                   {adminTab === 'admin-tests' && (
//                     <TestCreatorView />
//                   )}

//                   {adminTab === 'admin-assignments' && (
//                     <AssignmentsView />
//                   )}

//                   {adminTab === 'admin-reports' && (
//                     <ReportsView />
//                   )}
//                 </>
//               )}

//             </main>

//             {/* =========================================
//           Edit Profile Modal
//           ========================================= */}
//             {showEditProfile && role === 'student' && (
//               <EditProfileModal
//                 student={student}
//                 onClose={() => setShowEditProfile(false)}
//                 onSave={(name, avatar) => {
//                   updateStudentProfile(name, avatar);
//                   setShowEditProfile(false);
//                 }}
//               />
//             )}

//             {/* =========================================
//           Footer
//           ========================================= */}
//             <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">

//               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

//                 <div className="flex items-center gap-2">
//                   <span className="font-bold text-slate-700">
//                     TypeMaster Pro
//                   </span>

//                   <span>•</span>

//                   <span>
//                     Accredited Touch-Typing Curriculum & Velocity Platform
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <span>Adaptive Biometrics Engine</span>

//                   <span>•</span>

//                   <span className="text-blue-600 font-mono font-bold">
//                     100% Client-Authoritative
//                   </span>
//                 </div>

//               </div>
//             </footer>

//           </div>
//           );
// };


//           export default function App() {
//   return (
//           <AuthProvider>
//             <AppProvider>
//               <MainLayout />
//             </AppProvider>
//           </AuthProvider>
//           );
// } 










import { AuthProvider } from './context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import {
  AppProvider,
  useApp,
  StudentNavTab,
  AdminNavTab,
} from './context/AppContext';

import { Navbar } from './components/common/Navbar';
import { TypingEngine } from './components/typing/TypingEngine';
import { EditProfileModal } from './components/common/EditProfileModal';

// Student views
import { StudentDashboard } from './components/student/StudentDashboard';
import { LearnTypingView } from './components/student/LearnTypingView';
import { TypingPracticeView } from './components/student/TypingPracticeView';
import { TypingTestsView } from './components/student/TypingTestsView';
import TypingGamesView from './components/student/TypingGamesView';
import { AchievementsView } from './components/student/AchievementsView';
import { AnalyticsView } from './components/student/AnalyticsView';
import { ProfileView } from './components/student/ProfileView';
import { SettingsView } from './components/student/SettingsView';
import { TestHistoryView } from './components/student/TestHistoryView';
import { LeaderboardView } from './components/student/LeaderboardView';

// Admin views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentManagementView } from './components/admin/StudentManagementView';
import { BatchManagementView } from './components/admin/BatchManagementView';
import { TeacherManagementView } from './components/admin/TeacherManagementView';
import { LessonManagementView } from './components/admin/LessonManagementView';
import { PassageManagementView } from './components/admin/PassageManagementView';
import { TestCreatorView } from './components/admin/TestCreatorView';
import { AssignmentsView } from './components/admin/AssignmentsView';
import { ReportsView } from './components/admin/ReportsView';

// Admin / Teacher Profile & Settings
import { AdminProfileView } from './components/admin/AdminProfileView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';
import { EditAdminProfileModal } from './components/admin/EditAdminProfileModal';

import { TeacherProfileView } from './components/teacher/TeacherProfileView';
import { TeacherSettingsView } from './components/teacher/TeacherSettingsView';
import { EditTeacherProfileModal } from './components/teacher/EditTeacherProfileModal';

// Icons
import {
  LayoutDashboard,
  BookOpen,
  UserPlus,
  Keyboard,
  Timer,
  Gamepad2,
  Trophy,
  BarChart3,
  History,
  Crown,
  Users,
  Layers,
  FileText,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  MoreHorizontal,
  User,
  Settings,
} from 'lucide-react';

const studentNavItems: {
  id: StudentNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'learn',
      label: 'Learn Typing',
      icon: BookOpen,
    },
    {
      id: 'practice',
      label: 'Practice Drills',
      icon: Keyboard,
    },
    {
      id: 'tests',
      label: 'Typing Tests',
      icon: Timer,
    },
    {
      id: 'games',
      label: 'Arcade Games',
      icon: Gamepad2,
    },
  ];

const studentMoreItems: {
  id: StudentNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Trophy,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
    },
    {
      id: 'history',
      label: 'Test History',
      icon: History,
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      icon: Crown,
    },
  ];

const adminNavItems: {
  id: AdminNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
      id: 'admin-dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'admin-students',
      label: 'Students',
      icon: Users,
    },
    {
      id: 'admin-teachers',
      label: 'Teachers',
      icon: UserPlus,
    },
    {
      id: 'admin-batches',
      label: 'Batches',
      icon: Layers,
    },
    {
      id: 'admin-lessons',
      label: 'Curriculum',
      icon: BookOpen,
    },
    {
      id: 'admin-passages',
      label: 'Passage Bank',
      icon: FileText,
    },
    {
      id: 'admin-tests',
      label: 'Test Creator',
      icon: Sparkles,
    },
    {
      id: 'admin-assignments',
      label: 'Assignments',
      icon: CheckCircle2,
    },
    {
      id: 'admin-reports',
      label: 'Reports',
      icon: TrendingUp,
    },
    // {
    //   id: 'profile',
    //   label: 'Profile',
    //   icon: User,
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: Settings,
    // },
  ];

const teacherNavItems: {
  id: AdminNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
    {
      id: 'admin-dashboard',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'admin-students',
      label: 'Students',
      icon: Users,
    },
    {
      id: 'admin-batches',
      label: 'Batches',
      icon: Layers,
    },
    {
      id: 'admin-lessons',
      label: 'Curriculum',
      icon: BookOpen,
    },
    {
      id: 'admin-passages',
      label: 'Passage Bank',
      icon: FileText,
    },
    {
      id: 'admin-tests',
      label: 'Test Creator',
      icon: Sparkles,
    },
    {
      id: 'admin-assignments',
      label: 'Assignments',
      icon: CheckCircle2,
    },
    {
      id: 'admin-reports',
      label: 'Reports',
      icon: TrendingUp,
    },
    // {
    //   id: 'profile',
    //   label: 'Profile',
    //   icon: User,
    // },
    // {
    //   id: 'settings',
    //   label: 'Settings',
    //   icon: Settings,
    // },
  ];

const MainLayout: React.FC = () => {
  const {
    role,
    student,
    updateStudentProfile,

    teacher,
    updateTeacherProfile,

    admin,
    updateAdminProfile,

    studentTab,
    setStudentTab,

    adminTab,
    setAdminTab,

    activeLesson,
    activeTestPassage,
    activeTestDuration,
    exitActiveSession,
    lessons,
  } = useApp();

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAdminEditProfile, setShowAdminEditProfile] =
    useState(false);
  const [showTeacherEditProfile, setShowTeacherEditProfile] =
    useState(false);

  const [moreOpen, setMoreOpen] = useState(false);

  const [adminView, setAdminView] = useState<
    'admin' | 'student'
  >('admin');

  const moreRef = useRef<HTMLDivElement>(null);

  // Close More menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  // Close More menu when changing student tab
  useEffect(() => {
    setMoreOpen(false);
  }, [studentTab]);

  // =========================================
  // Active Lesson Session
  // =========================================

  if (activeLesson) {
    const currentLessonIdx = lessons.findIndex(
      (lesson) => lesson.id === activeLesson.id
    );

    const hasNext =
      currentLessonIdx >= 0 &&
      currentLessonIdx < lessons.length - 1;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <TypingEngine
            title={`${activeLesson.moduleTitle} • ${activeLesson.title}`}
            sourceText={
              activeLesson.exercises[0]?.text ||
              'the quick brown fox jumps over the lazy dog'
            }
            type="lesson"
            targetWpm={
              activeLesson.exercises[0]?.targetWpm || 30
            }
            minAccuracy={
              activeLesson.exercises[0]?.minAccuracy || 90
            }
            onExit={exitActiveSession}
            hasNextLesson={hasNext}
            onNextLesson={() => {
              if (hasNext) {
                exitActiveSession();
              }
            }}
          />
        </main>
      </div>
    );
  }

  // =========================================
  // Active Typing Test Session
  // =========================================

  if (activeTestPassage) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <TypingEngine
            title={activeTestPassage.title}
            sourceText={activeTestPassage.content}
            type="test"
            timeLimitSeconds={activeTestDuration}
            targetWpm={45}
            minAccuracy={95}
            onExit={exitActiveSession}
          />
        </main>
      </div>
    );
  }

  const isStudentArea =
    role === 'student' ||
    (role === 'admin' && adminView === 'student');

  return (
    <div className="min-h-screen bg-[#c5d7e6] text-slate-900 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* =========================================
          Main Navigation
          ========================================= */}

      <nav className="border-b border-slate-200 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-1 sm:gap-2 py-2.5">

            {isStudentArea ? (
              <>
                {/* Student Navigation */}

                <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">

                  {studentNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      studentTab === item.id;

                    return (
                      <button
                        key={item.id}
                        id={`subnav-student-${item.id}`}
                        onClick={() =>
                          setStudentTab(item.id)
                        }
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                            ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
                            : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                          }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${isActive
                              ? 'text-white'
                              : 'text-slate-500'
                            }`}
                        />

                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  {/* More Menu */}

                  <div
                    ref={moreRef}
                    className="relative flex-shrink-0"
                  >
                    <button
                      id="student-more-menu"
                      onClick={() =>
                        setMoreOpen((prev) => !prev)
                      }
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${moreOpen ||
                          studentMoreItems.some(
                            (item) =>
                              studentTab === item.id
                          )
                          ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
                          : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                        }`}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      <span>More</span>
                    </button>

                    {moreOpen && (
                      <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-slate-200 bg-white shadow-xl p-2 z-50">

                        {studentMoreItems.map((item) => {
                          const Icon = item.icon;
                          const isActive =
                            studentTab === item.id;

                          return (
                            <button
                              key={item.id}
                              id={`more-student-${item.id}`}
                              onClick={() => {
                                setStudentTab(item.id);
                                setMoreOpen(false);
                              }}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-left ${isActive
                                  ? 'bg-blue-600 text-white font-bold'
                                  : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                                }`}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}

                      </div>
                    )}
                  </div>

                </div>

                {/* Admin → Student Side */}

                {role === 'admin' && (
                  <button
                    onClick={() => {
                      setAdminView('admin');
                      setAdminTab('admin-dashboard');
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Admin Panel</span>
                  </button>
                )}
              </>
            ) : (
              <>
                {/* =========================================
                    Admin / Teacher Navigation
                    ========================================= */}

                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar w-full">

                  {/* Student Side — Admin only */}

                  {role === 'admin' && (
                    <button
                      onClick={() => {
                        setAdminView('student');
                        setStudentTab('dashboard');
                      }}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer text-slate-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Keyboard className="w-3.5 h-3.5" />
                      <span>Student Side</span>
                    </button>
                  )}

                  {(role === 'admin'
                    ? adminNavItems
                    : teacherNavItems
                  ).map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      adminTab === item.id;

                    return (
                      <button
                        key={item.id}
                        id={`subnav-${role}-${item.id}`}
                        onClick={() => {
                          exitActiveSession();
                          setAdminTab(item.id);
                        }}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                            ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-600/20'
                            : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                          }`}
                      >
                        <Icon
                          className={`w-3.5 h-3.5 ${isActive
                              ? 'text-white'
                              : 'text-slate-500'
                            }`}
                        />

                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                </div>
              </>
            )}

          </div>
        </div>
      </nav>

      {/* =========================================
          Main Content
          ========================================= */}

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* =========================================
            STUDENT AREA
            ========================================= */}

        {isStudentArea && (
          <>
            {studentTab === 'dashboard' && (
              <StudentDashboard />
            )}

            {studentTab === 'learn' && (
              <LearnTypingView />
            )}

            {studentTab === 'practice' && (
              <TypingPracticeView />
            )}

            {studentTab === 'tests' && (
              <TypingTestsView />
            )}

            {studentTab === 'games' && (
              <TypingGamesView />
            )}

            {studentTab === 'achievements' && (
              <AchievementsView />
            )}

            {studentTab === 'analytics' && (
              <AnalyticsView />
            )}

            {studentTab === 'history' && (
              <TestHistoryView />
            )}

            {studentTab === 'leaderboard' && (
              <LeaderboardView />
            )}

            {/* Student Profile */}

            {studentTab === 'profile' && (
              <ProfileView
                onEditProfile={() =>
                  setShowEditProfile(true)
                }
              />
            )}

            {/* Student Settings */}

            {studentTab === 'settings' && (
              <SettingsView />
            )}
          </>
        )}

        {/* =========================================
            ADMIN AREA
            ========================================= */}

        {!isStudentArea && role === 'admin' && (
          <>
            {adminTab === 'admin-dashboard' && (
              <AdminDashboard />
            )}

            {adminTab === 'admin-students' && (
              <StudentManagementView />
            )}

            {adminTab === 'admin-teachers' && (
              <TeacherManagementView />
            )}

            {adminTab === 'admin-batches' && (
              <BatchManagementView />
            )}

            {adminTab === 'admin-lessons' && (
              <LessonManagementView />
            )}

            {adminTab === 'admin-passages' && (
              <PassageManagementView />
            )}

            {adminTab === 'admin-tests' && (
              <TestCreatorView />
            )}

            {adminTab === 'admin-assignments' && (
              <AssignmentsView />
            )}

            {adminTab === 'admin-reports' && (
              <ReportsView />
            )}

            {/* Admin Profile */}

            {adminTab === 'profile' && (
              <AdminProfileView
                onEditProfile={() =>
                  setShowAdminEditProfile(true)
                }
              />
            )}

            {/* Admin Settings */}

            {adminTab === 'settings' && (
              <AdminSettingsView />
            )}
          </>
        )}

        {/* =========================================
            TEACHER AREA
            ========================================= */}

        {!isStudentArea && role === 'teacher' && (
          <>
            {adminTab === 'admin-dashboard' && (
              <AdminDashboard />
            )}

            {adminTab === 'admin-students' && (
              <StudentManagementView />
            )}

            {adminTab === 'admin-batches' && (
              <BatchManagementView />
            )}

            {adminTab === 'admin-lessons' && (
              <LessonManagementView />
            )}

            {adminTab === 'admin-passages' && (
              <PassageManagementView />
            )}

            {adminTab === 'admin-tests' && (
              <TestCreatorView />
            )}

            {adminTab === 'admin-assignments' && (
              <AssignmentsView />
            )}

            {adminTab === 'admin-reports' && (
              <ReportsView />
            )}

            {/* Teacher Profile */}

            {adminTab === 'profile' && (
              <TeacherProfileView
                onEditProfile={() =>
                  setShowTeacherEditProfile(true)
                }
              />
            )}

            {/* Teacher Settings */}

            {adminTab === 'settings' && (
              <TeacherSettingsView />
            )}
          </>
        )}

      </main>

      {/* =========================================
          STUDENT EDIT PROFILE MODAL
          ========================================= */}

      {showEditProfile && role === 'student' && (
        <EditProfileModal
          student={student}
          onClose={() =>
            setShowEditProfile(false)
          }
          onSave={(name, avatar) => {
            updateStudentProfile(name, avatar);
            setShowEditProfile(false);
          }}
        />
      )}

      {/* =========================================
          ADMIN EDIT PROFILE MODAL
          ========================================= */}

      {showAdminEditProfile && role === 'admin' && (
        <EditAdminProfileModal
          admin={{
            name:
              admin?.name ||
              'Administrator',
            email:
              admin?.email ||
              '',
            avatar:
              admin?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          }}
          onClose={() =>
            setShowAdminEditProfile(false)
          }
          onSave={async (name, avatar) => {
            try {
              await updateAdminProfile(
                name,
                avatar
              );
            } catch (error) {
              console.error(
                'Failed to update admin profile:',
                error
              );
            } finally {
              setShowAdminEditProfile(false);
            }
          }}
        />
      )}
      
      {/* =========================================
          TEACHER EDIT PROFILE MODAL
          ========================================= */}

      {showTeacherEditProfile && role === 'teacher' && (
        <EditTeacherProfileModal
          teacher={{
            name:
              teacher?.name ||
              'Teacher',
            email:
              teacher?.email ||
              '',
            avatar:
              teacher?.avatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            institution:
              teacher?.institution ||
              'TypeMaster Academy',
          }}
          onClose={() =>
            setShowTeacherEditProfile(false)
          }
          onSave={async (name, avatar) => {
            try {
              await updateTeacherProfile(
                name,
                avatar
              );
            } catch (error) {
              console.error(
                'Failed to update teacher profile:',
                error
              );
            } finally {
              setShowTeacherEditProfile(false);
            }
          }}
        />
      )}

      {/* =========================================
          Footer
          ========================================= */}

      <footer className="border-t border-slate-200 bg-white py-6 text-xs text-slate-500">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">
              TypeMaster Pro
            </span>

            <span>•</span>

            <span>
              Accredited Touch-Typing Curriculum &
              Velocity Platform
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span>
              Adaptive Biometrics Engine
            </span>

            <span>•</span>

            <span className="text-blue-600 font-mono font-bold">
              100% Client-Authoritative
            </span>
          </div>

        </div>

      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </AuthProvider>
  );
}