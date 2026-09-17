// import React, { createContext, useContext, useState, useEffect } from 'react';
// import {
//   UserRole,
//   StudentProfile,
//   TeacherProfile,
//   Lesson,
//   TypingPassage,
//   TestResult,
//   Achievement,
//   Batch,
//   StudentRecord,
//   Assignment,
//   AppNotification,
//   LeaderboardEntry
// } from '../types';

// import {
//   INITIAL_LESSONS,
//   TYPING_PASSAGES,
//   INITIAL_ACHIEVEMENTS,
//   INITIAL_BATCHES,
//   INITIAL_STUDENTS,
//   INITIAL_ASSIGNMENTS,
//   INITIAL_NOTIFICATIONS,
//   INITIAL_LEADERBOARD,
//   INITIAL_TEST_HISTORY
// } from '../data/mockData';

// import { soundManager } from '../utils/audio';
// import { supabase } from '../lib/supabase';
// import { useAuth } from './AuthContext';

// export type AppRole = UserRole | 'teacher';

// export type StudentNavTab =
//   | 'dashboard'
//   | 'learn'
//   | 'practice'
//   | 'tests'
//   | 'games'
//   | 'achievements'
//   | 'analytics'
//   | 'history'
//   | 'leaderboard'
//   | 'profile'
//   | 'settings';

// export type AdminNavTab =
//   | 'admin-dashboard'
//   | 'admin-students'
//   | 'admin-teachers'
//   | 'admin-batches'
//   | 'admin-lessons'
//   | 'admin-passages'
//   | 'admin-tests'
//   | 'admin-assignments'
//   | 'admin-reports'
//   | 'profile'
//   | 'settings';

// interface AppContextType {
//   role: AppRole;
//   setRole: (role: AppRole) => void;
//   logout: () => void;

//   studentTab: StudentNavTab;
//   setStudentTab: (tab: StudentNavTab) => void;

//   adminTab: AdminNavTab;
//   setAdminTab: (tab: AdminNavTab) => void;

//   student: StudentProfile;

//   updateStudentGoals: (
//     targetWpm: number,
//     targetAccuracy: number,
//     dailyMinutes: number
//   ) => void;

//   updateStudentProfile: (
//     name: string,
//     avatar: string
//   ) => void;

//   teacher: Omit<TeacherProfile, 'role'> & {
//     role: 'teacher' | 'admin';
//   };

//   updateTeacherProfile: (
//     name: string,
//     avatar: string
//   ) => Promise<void>;

//   admin: Omit<TeacherProfile, 'role'> & {
//     role: 'admin';
//   };

//   updateAdminProfile: (
//     name: string,
//     avatar: string
//   ) => Promise<void>;

//   lessons: Lesson[];
//   passages: TypingPassage[];
//   achievements: Achievement[];
//   batches: Batch[];
//   students: StudentRecord[];
//   assignments: Assignment[];
//   notifications: AppNotification[];
//   leaderboard: LeaderboardEntry[];
//   testHistory: TestResult[];

//   activeLesson: Lesson | null;
//   startLesson: (lesson: Lesson) => void;

//   activeTestPassage: TypingPassage | null;
//   activeTestDuration: number;

//   startTypingTest: (
//     passage: TypingPassage,
//     durationSeconds?: number
//   ) => void;

//   activeGame:
//   | 'invaders'
//   | 'racer'
//   | 'defense'
//   | null;

//   startGame: (
//     game: 'invaders' | 'racer' | 'defense'
//   ) => void;

//   exitActiveSession: () => void;

//   recordTestResult: (
//     result: Omit<TestResult, 'id' | 'userId' | 'date'>
//   ) => TestResult;

//   markNotificationRead: (id: string) => void;
//   markAllNotificationsRead: () => void;
//   clearNotification: (id: string) => void;

//   addBatch: (
//     batch: Omit<
//       Batch,
//       'id' | 'studentCount' | 'averageWpm' | 'averageAccuracy'
//     >
//   ) => void;

//   updateBatch: (batch: Batch) => void;

//   addStudent: (
//     student: Omit<
//       StudentRecord,
//       | 'id'
//       | 'wpm'
//       | 'accuracy'
//       | 'xp'
//       | 'level'
//       | 'streak'
//       | 'testsTaken'
//       | 'lessonsDone'
//     >
//   ) => void;

//   updateStudent: (student: StudentRecord) => void;

//   addPassage: (
//     passage: Omit<TypingPassage, 'id' | 'wordCount'>
//   ) => void;

//   updatePassage: (passage: TypingPassage) => void;
//   deletePassage: (id: string) => void;

//   addLesson: (
//     lesson: Omit<
//       Lesson,
//       'id' | 'completed' | 'bestWpm' | 'bestAccuracy'
//     >
//   ) => void;

//   updateLesson: (lesson: Lesson) => void;

//   addAssignment: (
//     assignment: Omit<
//       Assignment,
//       'id' | 'createdAt' | 'completedCount' | 'status'
//     >
//   ) => void;

//   soundEnabled: boolean;
//   toggleSound: () => void;

//   soundType: 'cherry-blue' | 'cherry-brown';
//   setSoundType: (
//     type: 'cherry-blue' | 'cherry-brown'
//   ) => void;

//   selectedStudentForDetail: StudentRecord | null;

//   setSelectedStudentForDetail: (
//     student: StudentRecord | null
//   ) => void;

//   selectedBatchForDetail: Batch | null;

//   setSelectedBatchForDetail: (
//     batch: Batch | null
//   ) => void;
// }

// const AppContext = createContext<AppContextType | undefined>(
//   undefined
// );

// const LOCAL_STORAGE_KEY = 'typemaster_pro_v1';

// export const AppProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const { user } = useAuth();

//   const [role, setRole] = useState<AppRole>('student');

//   const [studentTab, setStudentTab] =
//     useState<StudentNavTab>('dashboard');

//   const [adminTab, setAdminTab] =
//     useState<AdminNavTab>('admin-dashboard');

//   const [activeLesson, setActiveLesson] =
//     useState<Lesson | null>(null);

//   const [activeTestPassage, setActiveTestPassage] =
//     useState<TypingPassage | null>(null);

//   const [activeTestDuration, setActiveTestDuration] =
//     useState<number>(60);

//   const [activeGame, setActiveGame] =
//     useState<'invaders' | 'racer' | 'defense' | null>(null);

//   const [selectedStudentForDetail, setSelectedStudentForDetail] =
//     useState<StudentRecord | null>(null);

//   const [selectedBatchForDetail, setSelectedBatchForDetail] =
//     useState<Batch | null>(null);

//   const [soundEnabled, setSoundEnabled] =
//     useState<boolean>(true);

//   const [soundType, setSoundTypeState] =
//     useState<'cherry-blue' | 'cherry-brown'>('cherry-blue');

//   // Student
//   const [student, setStudent] = useState<StudentProfile>(() => {
//     const saved = localStorage.getItem(
//       `${LOCAL_STORAGE_KEY}_student`
//     );

//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch {
//         // Ignore invalid saved data
//       }
//     }

//     return {
//       id: 'current-user',
//       name: 'Alex Rivera',
//       email: 'alex.rivera@typemaster.edu',
//       avatar:
//         'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
//       batchId: 'batch-1',
//       batchName: 'Batch Alpha 2026 (Morning)',
//       level: 7,
//       xp: 2450,
//       xpToNextLevel: 3000,
//       streakDays: 5,
//       lastActiveDate: new Date().toISOString(),
//       bestWpm: 68,
//       averageWpm: 54.2,
//       averageAccuracy: 96.8,
//       testsCompleted: 28,
//       lessonsCompleted: 6,
//       practiceMinutes: 142,
//       dailyGoalMinutes: 15,
//       todayMinutes: 8,
//       targetWpm: 65,
//       targetAccuracy: 95,
//       role: 'student'
//     };
//   });

//   // const [teacher] = useState<TeacherProfile>({
//   //   id: 'prof-vance',
//   //   name: 'Prof. David Vance',
//   //   email: 'david.vance@typemaster.edu',
//   //   avatar:
//   //     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
//   //   role: 'teacher',
//   //   institution:
//   //     'TypeMaster Academy of Computer Science',
//   //   activeBatchesCount: 3,
//   //   totalStudentsCount: 56
//   // });

//   const [teacher, setTeacher] = useState<TeacherProfile>({
//     id: 'prof-vance',
//     name: 'Prof. David Vance',
//     email: 'david.vance@typemaster.edu',
//     avatar:
//       'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
//     role: 'admin',
//     institution:
//       'TypeMaster Academy of Computer Science',
//     activeBatchesCount: 3,
//     totalStudentsCount: 56
//   });

//   const [admin, setAdmin] = useState<
//     Omit<TeacherProfile, 'role'> & {
//       role: 'admin';
//     }
//   >({
//     id: 'admin',
//     name: 'Administrator',
//     email: 'admin@typemaster.edu',
//     avatar:
//       'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
//     role: 'admin',
//     institution:
//       'TypeMaster Academy of Computer Science',
//     activeBatchesCount: 3,
//     totalStudentsCount: 56
//   });

//   const [lessons, setLessons] = useState<Lesson[]>(() => {
//     const saved = localStorage.getItem(
//       `${LOCAL_STORAGE_KEY}_lessons`
//     );

//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch { }
//     }

//     return INITIAL_LESSONS;
//   });

//   const [passages, setPassages] =
//     useState<TypingPassage[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_passages`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return TYPING_PASSAGES;
//     });

//   const [achievements, setAchievements] =
//     useState<Achievement[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_achievements`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return INITIAL_ACHIEVEMENTS;
//     });

//   const [batches, setBatches] = useState<Batch[]>(() => {
//     const saved = localStorage.getItem(
//       `${LOCAL_STORAGE_KEY}_batches`
//     );

//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch { }
//     }

//     return INITIAL_BATCHES;
//   });

//   const [students, setStudents] =
//     useState<StudentRecord[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_students`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return INITIAL_STUDENTS;
//     });

//   const [assignments, setAssignments] =
//     useState<Assignment[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_assignments`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return INITIAL_ASSIGNMENTS;
//     });

//   const [notifications, setNotifications] =
//     useState<AppNotification[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_notifs`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return INITIAL_NOTIFICATIONS;
//     });

//   const [leaderboard] =
//     useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

//   const [testHistory, setTestHistory] =
//     useState<TestResult[]>(() => {
//       const saved = localStorage.getItem(
//         `${LOCAL_STORAGE_KEY}_history`
//       );

//       if (saved) {
//         try {
//           return JSON.parse(saved);
//         } catch { }
//       }

//       return INITIAL_TEST_HISTORY;
//     });

//   // ---------------------------------------------------------
//   // Local Storage Sync
//   // ---------------------------------------------------------

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_student`,
//       JSON.stringify(student)
//     );
//   }, [student]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_lessons`,
//       JSON.stringify(lessons)
//     );
//   }, [lessons]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_passages`,
//       JSON.stringify(passages)
//     );
//   }, [passages]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_achievements`,
//       JSON.stringify(achievements)
//     );
//   }, [achievements]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_batches`,
//       JSON.stringify(batches)
//     );
//   }, [batches]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_students`,
//       JSON.stringify(students)
//     );
//   }, [students]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_assignments`,
//       JSON.stringify(assignments)
//     );
//   }, [assignments]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_notifs`,
//       JSON.stringify(notifications)
//     );
//   }, [notifications]);

//   useEffect(() => {
//     localStorage.setItem(
//       `${LOCAL_STORAGE_KEY}_history`,
//       JSON.stringify(testHistory)
//     );
//   }, [testHistory]);

//   // ---------------------------------------------------------
//   // Logout
//   // ---------------------------------------------------------

//   const logout = () => {
//     // Stop any currently running lesson, test or game.
//     setActiveLesson(null);
//     setActiveTestPassage(null);
//     setActiveGame(null);

//     // Return to the default student area.
//     setRole('student');
//     setStudentTab('dashboard');
//     setAdminTab('admin-dashboard');

//     // Close any selected admin details.
//     setSelectedStudentForDetail(null);
//     setSelectedBatchForDetail(null);
//   };

//   // ---------------------------------------------------------
//   // Audio
//   // ---------------------------------------------------------

//   const toggleSound = () => {
//     const next = !soundEnabled;

//     setSoundEnabled(next);
//     soundManager.enabled = next;
//   };

//   const setSoundType = (
//     type: 'cherry-blue' | 'cherry-brown'
//   ) => {
//     setSoundTypeState(type);
//     soundManager.soundType = type;
//   };

//   // ---------------------------------------------------------
//   // Active Sessions
//   // ---------------------------------------------------------

//   const startLesson = (lesson: Lesson) => {
//     setActiveLesson(lesson);
//     setActiveTestPassage(null);
//     setActiveGame(null);
//   };

//   const startTypingTest = (
//     passage: TypingPassage,
//     durationSeconds: number = 60
//   ) => {
//     setActiveTestPassage(passage);
//     setActiveTestDuration(durationSeconds);
//     setActiveLesson(null);
//     setActiveGame(null);
//   };

//   const startGame = (
//     game: 'invaders' | 'racer' | 'defense'
//   ) => {
//     setActiveGame(game);
//     setActiveLesson(null);
//     setActiveTestPassage(null);
//   };

//   const exitActiveSession = () => {
//     setActiveLesson(null);
//     setActiveTestPassage(null);
//     setActiveGame(null);
//   };

//   // ---------------------------------------------------------
//   // Student Profile
//   // ---------------------------------------------------------

//   const updateStudentGoals = (
//     targetWpm: number,
//     targetAccuracy: number,
//     dailyMinutes: number
//   ) => {
//     setStudent(prev => ({
//       ...prev,
//       targetWpm,
//       targetAccuracy,
//       dailyGoalMinutes: dailyMinutes
//     }));
//   };

//   const updateStudentProfile = async (
//     name: string,
//     avatar: string
//   ) => {
//     if (!user) return;

//     const cleanName = name.trim();
//     const cleanAvatar = avatar.trim();

//     if (!cleanName) return;

//     const { error } = await supabase
//       .from('profiles')
//       .update({
//         full_name: cleanName,
//         avatar_url: cleanAvatar || null,
//         updated_at: new Date().toISOString(),
//       })
//       .eq('id', user.id);

//     if (error) {
//       console.error('Failed to update student profile:', error);
//       throw error;
//     }

//     await supabase.auth.updateUser({
//       data: {
//         full_name: cleanName,
//         avatar_url: cleanAvatar,
//       },
//     });

//     setStudent(prev => ({
//       ...prev,
//       name: cleanName,
//       avatar: cleanAvatar || prev.avatar,
//     }));
//   };

//   const updateTeacherProfile = async (
//     name: string,
//     avatar: string
//   ) => {
//     if (!user) return;

//     const cleanName = name.trim();
//     const cleanAvatar = avatar.trim();

//     if (!cleanName) return;

//     const { error } = await supabase
//       .from('profiles')
//       .update({
//         full_name: cleanName,
//         avatar_url: cleanAvatar || null,
//         updated_at: new Date().toISOString(),
//       })
//       .eq('id', user.id);

//     if (error) {
//       console.error(
//         'Failed to update teacher profile:',
//         error
//       );
//       throw error;
//     }

//     await supabase.auth.updateUser({
//       data: {
//         full_name: cleanName,
//         avatar_url: cleanAvatar,
//       },
//     });

//     setTeacher(prev => ({
//       ...prev,
//       name: cleanName,
//       avatar: cleanAvatar || prev.avatar,
//     }));
//   };

//   const updateAdminProfile = async (
//     name: string,
//     avatar: string
//   ) => {
//     if (!user) return;

//     const cleanName = name.trim();
//     const cleanAvatar = avatar.trim();

//     if (!cleanName) return;

//     const { error } = await supabase
//       .from('profiles')
//       .update({
//         full_name: cleanName,
//         avatar_url: cleanAvatar || null,
//         updated_at: new Date().toISOString(),
//       })
//       .eq('id', user.id);

//     if (error) {
//       console.error(
//         'Failed to update admin profile:',
//         error
//       );
//       throw error;
//     }

//     await supabase.auth.updateUser({
//       data: {
//         full_name: cleanName,
//         avatar_url: cleanAvatar,
//       },
//     });

//     setAdmin(prev => ({
//       ...prev,
//       name: cleanName,
//       avatar: cleanAvatar || prev.avatar,
//     }));
//   };

//   // ---------------------------------------------------------
//   // Supabase Logged-in User Profile
//   // ---------------------------------------------------------
//   useEffect(() => {
//     if (!user) return;

//     const loadRealProfile = async () => {
//       try {
//         const { data: profile, error } = await supabase
//           .from('profiles')
//           .select('id, full_name, role, avatar_url')
//           .eq('id', user.id)
//           .maybeSingle();

//         if (error) {
//           console.error(
//             'Failed to load user profile:',
//             error
//           );
//           return;
//         }

//         const metadataName =
//           typeof user.user_metadata?.full_name === 'string'
//             ? user.user_metadata.full_name.trim()
//             : typeof user.user_metadata?.name === 'string'
//               ? user.user_metadata.name.trim()
//               : '';

//         const metadataAvatar =
//           typeof user.user_metadata?.avatar_url === 'string'
//             ? user.user_metadata.avatar_url.trim()
//             : '';

//         const realName =
//           profile?.full_name?.trim() ||
//           metadataName ||
//           user.email?.split('@')[0] ||
//           'User';

//         const realAvatar =
//           profile?.avatar_url?.trim() ||
//           metadataAvatar;

//         const realRole =
//           profile?.role === 'admin'
//             ? 'admin'
//             : profile?.role === 'teacher'
//               ? 'teacher'
//               : 'student';

//         // ---------------------------------------------------
//         // STUDENT
//         // ---------------------------------------------------
//         if (realRole === 'student') {
//           setStudent(prev => ({
//             ...prev,
//             id: user.id,
//             name: realName,
//             email: user.email || '',
//             avatar: realAvatar || prev.avatar,
//             role: 'student'
//           }));

//           setRole('student');
//         }

//         // ---------------------------------------------------
//         // TEACHER
//         // ---------------------------------------------------
//         if (realRole === 'teacher') {
//           setTeacher(prev => ({
//             ...prev,
//             id: user.id,
//             name: realName,
//             email: user.email || '',
//             avatar: realAvatar || prev.avatar,
//             role: 'teacher'
//           }));

//           setRole('teacher');
//         }

//         // ---------------------------------------------------
//         // ADMIN
//         // ---------------------------------------------------
//         if (realRole === 'admin') {
//           setAdmin(prev => ({
//             ...prev,
//             id: user.id,
//             name: realName,
//             email: user.email || '',
//             avatar: realAvatar || prev.avatar,
//             role: 'admin'
//           }));

//           setRole('admin');
//         }

//       } catch (error) {
//         console.error(
//           'Unexpected profile loading error:',
//           error
//         );
//       }
//     };

//     loadRealProfile();
//   }, [user]);

//   // ---------------------------------------------------------
//   // Test Result
//   // ---------------------------------------------------------

//   const recordTestResult = (
//     resultData: Omit<TestResult, 'id' | 'userId' | 'date'>
//   ): TestResult => {
//     const newId = `res-${Date.now()}`;

//     const dateStr = new Date()
//       .toISOString()
//       .replace('T', ' ')
//       .slice(0, 16);

//     const newResult: TestResult = {
//       ...resultData,
//       id: newId,
//       userId: student.id,
//       date: dateStr
//     };

//     setTestHistory(prev => [newResult, ...prev]);

//     setStudent(prev => {
//       const newTotalTests = prev.testsCompleted + 1;

//       const newBestWpm = Math.max(
//         prev.bestWpm,
//         newResult.netWpm
//       );

//       const newAvgWpm =
//         Math.round(
//           ((prev.averageWpm * prev.testsCompleted +
//             newResult.netWpm) /
//             newTotalTests) *
//           10
//         ) / 10;

//       const newAvgAcc =
//         Math.round(
//           ((prev.averageAccuracy * prev.testsCompleted +
//             newResult.accuracy) /
//             newTotalTests) *
//           10
//         ) / 10;

//       const addedMinutes = Math.max(
//         1,
//         Math.round(newResult.durationSeconds / 60)
//       );

//       const newPracticeMinutes =
//         prev.practiceMinutes + addedMinutes;

//       const newTodayMinutes =
//         prev.todayMinutes + addedMinutes;

//       let newXp = prev.xp + newResult.xpEarned;
//       let newLevel = prev.level;
//       let newXpToNext = prev.xpToNextLevel;

//       while (newXp >= newXpToNext) {
//         newLevel += 1;
//         newXpToNext = Math.round(
//           newXpToNext * 1.35
//         );

//         soundManager.playLevelUp();
//       }

//       return {
//         ...prev,
//         testsCompleted: newTotalTests,
//         bestWpm: newBestWpm,
//         averageWpm: newAvgWpm,
//         averageAccuracy: newAvgAcc,
//         practiceMinutes: newPracticeMinutes,
//         todayMinutes: newTodayMinutes,
//         xp: newXp,
//         level: newLevel,
//         xpToNextLevel: newXpToNext
//       };
//     });

//     // Lesson completion
//     if (activeLesson) {
//       setLessons(prev =>
//         prev.map(les => {
//           if (les.id === activeLesson.id) {
//             return {
//               ...les,
//               completed: true,
//               bestWpm: Math.max(
//                 les.bestWpm || 0,
//                 newResult.netWpm
//               ),
//               bestAccuracy: Math.max(
//                 les.bestAccuracy || 0,
//                 newResult.accuracy
//               )
//             };
//           }

//           return les;
//         })
//       );
//     }

//     // Achievements
//     setAchievements(prev =>
//       prev.map(ach => {
//         if (ach.unlocked) return ach;

//         let updatedVal = ach.currentValue;
//         let unlocked = false;

//         if (
//           ach.id === 'ach-2' &&
//           newResult.netWpm >= 40
//         ) {
//           unlocked = true;
//           updatedVal = Math.max(
//             updatedVal,
//             newResult.netWpm
//           );
//         } else if (
//           ach.id === 'ach-3' &&
//           newResult.netWpm >= 65
//         ) {
//           unlocked = true;
//           updatedVal = Math.max(
//             updatedVal,
//             newResult.netWpm
//           );
//         } else if (
//           ach.id === 'ach-4' &&
//           newResult.netWpm >= 100
//         ) {
//           unlocked = true;
//           updatedVal = Math.max(
//             updatedVal,
//             newResult.netWpm
//           );
//         } else if (
//           ach.id === 'ach-5' &&
//           newResult.accuracy >= 100
//         ) {
//           unlocked = true;
//           updatedVal = 100;
//         }

//         if (unlocked) {
//           soundManager.playSuccess();

//           setNotifications(nPrev => [
//             {
//               id: `notif-ach-${Date.now()}`,
//               title: `Badge Unlocked: ${ach.title}! 🏆`,
//               message: `You earned the "${ach.title}" achievement and +${ach.xpReward} XP.`,
//               timestamp: 'Just now',
//               type: 'achievement',
//               read: false
//             },
//             ...nPrev
//           ]);

//           return {
//             ...ach,
//             currentValue: updatedVal,
//             unlocked: true,
//             unlockedAt: new Date()
//               .toISOString()
//               .split('T')[0]
//           };
//         }

//         return ach;
//       })
//     );

//     return newResult;
//   };

//   // ---------------------------------------------------------
//   // Notifications
//   // ---------------------------------------------------------

//   const markNotificationRead = (id: string) => {
//     setNotifications(prev =>
//       prev.map(n =>
//         n.id === id
//           ? { ...n, read: true }
//           : n
//       )
//     );
//   };

//   const markAllNotificationsRead = () => {
//     setNotifications(prev =>
//       prev.map(n => ({
//         ...n,
//         read: true
//       }))
//     );
//   };

//   const clearNotification = (id: string) => {
//     setNotifications(prev =>
//       prev.filter(n => n.id !== id)
//     );
//   };





//   // ---------------------------------------------------------
//   // Admin Operations
//   // ---------------------------------------------------------

//   const addBatch = (
//     batchData: Omit<
//       Batch,
//       'id' | 'studentCount' | 'averageWpm' | 'averageAccuracy'
//     >
//   ) => {
//     const newBatch: Batch = {
//       ...batchData,
//       id: `batch-${Date.now()}`,
//       studentCount: 0,
//       averageWpm: 0,
//       averageAccuracy: 0
//     };

//     setBatches(prev => [
//       newBatch,
//       ...prev
//     ]);
//   };

//   const updateBatch = (
//     batchData: Batch
//   ) => {
//     setBatches(prev =>
//       prev.map(b =>
//         b.id === batchData.id
//           ? batchData
//           : b
//       )
//     );
//   };

//   const addStudent = (
//     studentData: Omit<
//       StudentRecord,
//       | 'id'
//       | 'wpm'
//       | 'accuracy'
//       | 'xp'
//       | 'level'
//       | 'streak'
//       | 'testsTaken'
//       | 'lessonsDone'
//     >
//   ) => {
//     const newStudent: StudentRecord = {
//       ...studentData,
//       id: `std-${Date.now()}`,
//       wpm: 25,
//       accuracy: 90,
//       xp: 100,
//       level: 1,
//       streak: 1,
//       testsTaken: 0,
//       lessonsDone: 0
//     };

//     setStudents(prev => [
//       newStudent,
//       ...prev
//     ]);
//   };

//   const updateStudent = (
//     studentData: StudentRecord
//   ) => {
//     setStudents(prev =>
//       prev.map(s =>
//         s.id === studentData.id
//           ? studentData
//           : s
//       )
//     );
//   };

//   const addPassage = (
//     passageData: Omit<
//       TypingPassage,
//       'id' | 'wordCount'
//     >
//   ) => {
//     const words =
//       passageData.content
//         .trim()
//         .split(/\s+/)
//         .length;

//     const newPassage: TypingPassage = {
//       ...passageData,
//       id: `pass-${Date.now()}`,
//       wordCount: words
//     };

//     setPassages(prev => [
//       newPassage,
//       ...prev
//     ]);
//   };

//   const updatePassage = (
//     passageData: TypingPassage
//   ) => {
//     const words =
//       passageData.content
//         .trim()
//         .split(/\s+/)
//         .length;

//     setPassages(prev =>
//       prev.map(p =>
//         p.id === passageData.id
//           ? {
//             ...passageData,
//             wordCount: words
//           }
//           : p
//       )
//     );
//   };

//   const deletePassage = (
//     id: string
//   ) => {
//     setPassages(prev =>
//       prev.filter(p => p.id !== id)
//     );
//   };

//   const addLesson = (
//     lessonData: Omit<
//       Lesson,
//       'id' | 'completed' | 'bestWpm' | 'bestAccuracy'
//     >
//   ) => {
//     const newLesson: Lesson = {
//       ...lessonData,
//       id: `lesson-${Date.now()}`,
//       completed: false,
//       bestWpm: 0,
//       bestAccuracy: 0
//     };

//     setLessons(prev => [
//       ...prev,
//       newLesson
//     ]);
//   };

//   const updateLesson = (
//     lessonData: Lesson
//   ) => {
//     setLessons(prev =>
//       prev.map(l =>
//         l.id === lessonData.id
//           ? lessonData
//           : l
//       )
//     );
//   };

//   const addAssignment = (
//     assignmentData: Omit<
//       Assignment,
//       'id' | 'createdAt' | 'completedCount' | 'status'
//     >
//   ) => {
//     const newAssignment: Assignment = {
//       ...assignmentData,
//       id: `assign-${Date.now()}`,
//       createdAt: new Date()
//         .toISOString()
//         .split('T')[0],
//       completedCount: 0,
//       status: 'Active'
//     };

//     setAssignments(prev => [
//       newAssignment,
//       ...prev
//     ]);

//     setNotifications(prev => [
//       {
//         id: `notif-as-${Date.now()}`,
//         title: `New Assignment: ${newAssignment.title}`,
//         message: `Assigned to ${newAssignment.batchName}. Due ${newAssignment.dueDate}.`,
//         timestamp: 'Just now',
//         type: 'assignment',
//         read: false
//       },
//       ...prev
//     ]);
//   };

//   // ---------------------------------------------------------
//   // Provider
//   // ---------------------------------------------------------

//   return (
//     <AppContext.Provider
//       value={{
//         role,
//         setRole,
//         logout,

//         studentTab,
//         setStudentTab,

//         adminTab,
//         setAdminTab,

//         student,
//         updateStudentGoals,
//         updateStudentProfile,

//         teacher,

//         updateTeacherProfile,

//         admin,
//         updateAdminProfile,


//         lessons,
//         passages,
//         achievements,
//         batches,
//         students,
//         assignments,
//         notifications,
//         leaderboard,
//         testHistory,

//         activeLesson,
//         startLesson,

//         activeTestPassage,
//         activeTestDuration,
//         startTypingTest,

//         activeGame,
//         startGame,

//         exitActiveSession,

//         recordTestResult,

//         markNotificationRead,
//         markAllNotificationsRead,
//         clearNotification,

//         addBatch,
//         updateBatch,
//         addStudent,
//         updateStudent,
//         addPassage,
//         updatePassage,
//         deletePassage,
//         addLesson,
//         updateLesson,
//         addAssignment,

//         soundEnabled,
//         toggleSound,
//         soundType,
//         setSoundType,

//         selectedStudentForDetail,
//         setSelectedStudentForDetail,

//         selectedBatchForDetail,
//         setSelectedBatchForDetail
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => {
//   const context = useContext(AppContext);

//   if (!context) {
//     throw new Error(
//       'useApp must be used within an AppProvider'
//     );
//   }

//   return context;
// }; 









import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  TeacherProfile,
  Lesson,
  TypingPassage,
  TestResult,
  Achievement,
  Batch,
  StudentRecord,
  Assignment,
  AppNotification,
  LeaderboardEntry
} from '../types';

import {
  INITIAL_LESSONS,
  TYPING_PASSAGES,
  INITIAL_ACHIEVEMENTS,
  INITIAL_BATCHES,
  INITIAL_STUDENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_LEADERBOARD,
  INITIAL_TEST_HISTORY
} from '../data/mockData';

import { soundManager } from '../utils/audio';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export type AppRole = UserRole | 'teacher';

export type StudentNavTab =
  | 'dashboard'
  | 'learn'
  | 'practice'
  | 'tests'
  | 'games'
  | 'achievements'
  | 'analytics'
  | 'history'
  | 'leaderboard'
  | 'profile'
  | 'settings';

export type AdminNavTab =
  | 'admin-dashboard'
  | 'admin-students'
  | 'admin-teachers'
  | 'admin-batches'
  | 'admin-lessons'
  | 'admin-passages'
  | 'admin-tests'
  | 'admin-assignments'
  | 'admin-reports'
  | 'profile'
  | 'settings';

export type AppTheme =
  | 'light'
  | 'dark'
  | 'system';

export type AccentColor =
  | 'blue'
  | 'purple'
  | 'green'
  | 'orange'
  | 'red'
  | 'cyan';

export type TextColor =
  | 'default'
  | 'blue'
  | 'purple'
  | 'green'
  | 'orange';

interface AppContextType {
  role: AppRole;
  setRole: (role: AppRole) => void;
  logout: () => void;

  studentTab: StudentNavTab;
  setStudentTab: (tab: StudentNavTab) => void;

  adminTab: AdminNavTab;
  setAdminTab: (tab: AdminNavTab) => void;

  student: StudentProfile;

  updateStudentGoals: (
    targetWpm: number,
    targetAccuracy: number,
    dailyMinutes: number
  ) => void;

  updateStudentProfile: (
    name: string,
    avatar: string
  ) => void;

  teacher: Omit<TeacherProfile, 'role'> & {
    role: 'teacher' | 'admin';
  };

  updateTeacherProfile: (
    name: string,
    avatar: string
  ) => Promise<void>;

  admin: Omit<TeacherProfile, 'role'> & {
    role: 'admin';
  };

  updateAdminProfile: (
    name: string,
    avatar: string
  ) => Promise<void>;

  /* Appearance */
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;

  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;

  textColor: TextColor;
  setTextColor: (color: TextColor) => void;

  lessons: Lesson[];
  passages: TypingPassage[];
  achievements: Achievement[];
  batches: Batch[];
  students: StudentRecord[];
  assignments: Assignment[];
  notifications: AppNotification[];
  leaderboard: LeaderboardEntry[];
  testHistory: TestResult[];

  activeLesson: Lesson | null;
  startLesson: (lesson: Lesson) => void;

  activeTestPassage: TypingPassage | null;
  activeTestDuration: number;

  startTypingTest: (
    passage: TypingPassage,
    durationSeconds?: number
  ) => void;

  activeGame:
  | 'invaders'
  | 'racer'
  | 'defense'
  | null;

  startGame: (
    game: 'invaders' | 'racer' | 'defense'
  ) => void;

  exitActiveSession: () => void;

  recordTestResult: (
    result: Omit<TestResult, 'id' | 'userId' | 'date'>
  ) => TestResult;

  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotification: (id: string) => void;

  addBatch: (
    batch: Omit<
      Batch,
      'id' | 'studentCount' | 'averageWpm' | 'averageAccuracy'
    >
  ) => void;

  updateBatch: (batch: Batch) => void;

  addStudent: (
    student: Omit<
      StudentRecord,
      | 'id'
      | 'wpm'
      | 'accuracy'
      | 'xp'
      | 'level'
      | 'streak'
      | 'testsTaken'
      | 'lessonsDone'
    >
  ) => void;

  updateStudent: (student: StudentRecord) => void;

  addPassage: (
    passage: Omit<TypingPassage, 'id' | 'wordCount'>
  ) => void;

  updatePassage: (passage: TypingPassage) => void;
  deletePassage: (id: string) => void;

  addLesson: (
    lesson: Omit<
      Lesson,
      'id' | 'completed' | 'bestWpm' | 'bestAccuracy'
    >
  ) => void;

  updateLesson: (lesson: Lesson) => void;

  addAssignment: (
    assignment: Omit<
      Assignment,
      'id' | 'createdAt' | 'completedCount' | 'status'
    >
  ) => void;

  soundEnabled: boolean;
  toggleSound: () => void;

  soundType: 'cherry-blue' | 'cherry-brown';
  setSoundType: (
    type: 'cherry-blue' | 'cherry-brown'
  ) => void;

  selectedStudentForDetail: StudentRecord | null;

  setSelectedStudentForDetail: (
    student: StudentRecord | null
  ) => void;

  selectedBatchForDetail: Batch | null;

  setSelectedBatchForDetail: (
    batch: Batch | null
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = 'typemaster_pro_v1';

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user } = useAuth();

  const [role, setRole] = useState<AppRole>('student');

  const [studentTab, setStudentTab] =
    useState<StudentNavTab>('dashboard');

  const [adminTab, setAdminTab] =
    useState<AdminNavTab>('admin-dashboard');

  const [activeLesson, setActiveLesson] =
    useState<Lesson | null>(null);

  const [activeTestPassage, setActiveTestPassage] =
    useState<TypingPassage | null>(null);

  const [activeTestDuration, setActiveTestDuration] =
    useState<number>(60);

  const [activeGame, setActiveGame] =
    useState<'invaders' | 'racer' | 'defense' | null>(null);

  const [selectedStudentForDetail, setSelectedStudentForDetail] =
    useState<StudentRecord | null>(null);

  const [selectedBatchForDetail, setSelectedBatchForDetail] =
    useState<Batch | null>(null);

  const [soundEnabled, setSoundEnabled] =
    useState<boolean>(true);

  const [soundType, setSoundTypeState] =
    useState<'cherry-blue' | 'cherry-brown'>('cherry-blue');

  // ---------------------------------------------------------
  // Appearance
  // ---------------------------------------------------------

  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem(
      `${LOCAL_STORAGE_KEY}_theme`
    );

    if (
      saved === 'light' ||
      saved === 'dark' ||
      saved === 'system'
    ) {
      return saved;
    }

    return 'light';
  });

  const [accentColor, setAccentColor] =
    useState<AccentColor>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_accent`
      );

      if (
        saved === 'blue' ||
        saved === 'purple' ||
        saved === 'green' ||
        saved === 'orange' ||
        saved === 'red' ||
        saved === 'cyan'
      ) {
        return saved;
      }

      return 'blue';
    });

  const [textColor, setTextColor] =
    useState<TextColor>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_textColor`
      );

      if (
        saved === 'default' ||
        saved === 'blue' ||
        saved === 'purple' ||
        saved === 'green' ||
        saved === 'orange'
      ) {
        return saved;
      }

      return 'default';
    });

  // Save appearance settings
  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_theme`,
      theme
    );
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_accent`,
      accentColor
    );
  }, [accentColor]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_textColor`,
      textColor
    );
  }, [textColor]);

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = () => {
      let resolvedTheme: 'light' | 'dark' = 'light';

      if (theme === 'dark') {
        resolvedTheme = 'dark';
      } else if (theme === 'system') {
        resolvedTheme = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
          ? 'dark'
          : 'light';
      }

      root.dataset.theme = resolvedTheme;
      root.dataset.accent = accentColor;
      root.dataset.textColor = textColor;
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );

      mediaQuery.addEventListener('change', applyTheme);

      return () => {
        mediaQuery.removeEventListener('change', applyTheme);
      };
    }
  }, [theme, accentColor, textColor]);

  // Student
  const [student, setStudent] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(
      `${LOCAL_STORAGE_KEY}_student`
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignore invalid saved data
      }
    }

    return {
      id: 'current-user',
      name: 'Alex Rivera',
      email: 'alex.rivera@typemaster.edu',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      batchId: 'batch-1',
      batchName: 'Batch Alpha 2026 (Morning)',
      level: 7,
      xp: 2450,
      xpToNextLevel: 3000,
      streakDays: 5,
      lastActiveDate: new Date().toISOString(),
      bestWpm: 68,
      averageWpm: 54.2,
      averageAccuracy: 96.8,
      testsCompleted: 28,
      lessonsCompleted: 6,
      practiceMinutes: 142,
      dailyGoalMinutes: 15,
      todayMinutes: 8,
      targetWpm: 65,
      targetAccuracy: 95,
      role: 'student'
    };
  });

  const [teacher, setTeacher] = useState<TeacherProfile>({
    id: 'prof-vance',
    name: 'Prof. David Vance',
    email: 'david.vance@typemaster.edu',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    institution:
      'TypeMaster Academy of Computer Science',
    activeBatchesCount: 3,
    totalStudentsCount: 56
  });

  const [admin, setAdmin] = useState<
    Omit<TeacherProfile, 'role'> & {
      role: 'admin';
    }
  >({
    id: 'admin',
    name: 'Administrator',
    email: 'admin@typemaster.edu',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'admin',
    institution:
      'TypeMaster Academy of Computer Science',
    activeBatchesCount: 3,
    totalStudentsCount: 56
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem(
      `${LOCAL_STORAGE_KEY}_lessons`
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
    }

    return INITIAL_LESSONS;
  });

  const [passages, setPassages] =
    useState<TypingPassage[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_passages`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return TYPING_PASSAGES;
    });

  const [achievements, setAchievements] =
    useState<Achievement[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_achievements`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return INITIAL_ACHIEVEMENTS;
    });

  const [batches, setBatches] = useState<Batch[]>(() => {
    const saved = localStorage.getItem(
      `${LOCAL_STORAGE_KEY}_batches`
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { }
    }

    return INITIAL_BATCHES;
  });

  const [students, setStudents] =
    useState<StudentRecord[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_students`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return INITIAL_STUDENTS;
    });

  const [assignments, setAssignments] =
    useState<Assignment[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_assignments`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return INITIAL_ASSIGNMENTS;
    });

  const [notifications, setNotifications] =
    useState<AppNotification[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_notifs`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return INITIAL_NOTIFICATIONS;
    });

  const [leaderboard] =
    useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);

  const [testHistory, setTestHistory] =
    useState<TestResult[]>(() => {
      const saved = localStorage.getItem(
        `${LOCAL_STORAGE_KEY}_history`
      );

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch { }
      }

      return INITIAL_TEST_HISTORY;
    });

  // ---------------------------------------------------------
  // Local Storage Sync
  // ---------------------------------------------------------

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_student`,
      JSON.stringify(student)
    );
  }, [student]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_lessons`,
      JSON.stringify(lessons)
    );
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_passages`,
      JSON.stringify(passages)
    );
  }, [passages]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_achievements`,
      JSON.stringify(achievements)
    );
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_batches`,
      JSON.stringify(batches)
    );
  }, [batches]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_students`,
      JSON.stringify(students)
    );
  }, [students]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_assignments`,
      JSON.stringify(assignments)
    );
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_notifs`,
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}_history`,
      JSON.stringify(testHistory)
    );
  }, [testHistory]);

  // ---------------------------------------------------------
  // Logout
  // ---------------------------------------------------------

  const logout = () => {
    setActiveLesson(null);
    setActiveTestPassage(null);
    setActiveGame(null);

    setRole('student');
    setStudentTab('dashboard');
    setAdminTab('admin-dashboard');

    setSelectedStudentForDetail(null);
    setSelectedBatchForDetail(null);
  };

  // ---------------------------------------------------------
  // Audio
  // ---------------------------------------------------------

  const toggleSound = () => {
    const next = !soundEnabled;

    setSoundEnabled(next);
    soundManager.enabled = next;
  };

  const setSoundType = (
    type: 'cherry-blue' | 'cherry-brown'
  ) => {
    setSoundTypeState(type);
    soundManager.soundType = type;
  };

  // ---------------------------------------------------------
  // Active Sessions
  // ---------------------------------------------------------

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setActiveTestPassage(null);
    setActiveGame(null);
  };

  const startTypingTest = (
    passage: TypingPassage,
    durationSeconds: number = 60
  ) => {
    setActiveTestPassage(passage);
    setActiveTestDuration(durationSeconds);
    setActiveLesson(null);
    setActiveGame(null);
  };

  const startGame = (
    game: 'invaders' | 'racer' | 'defense'
  ) => {
    setActiveGame(game);
    setActiveLesson(null);
    setActiveTestPassage(null);
  };

  const exitActiveSession = () => {
    setActiveLesson(null);
    setActiveTestPassage(null);
    setActiveGame(null);
  };

  // ---------------------------------------------------------
  // Student Profile
  // ---------------------------------------------------------

  const updateStudentGoals = (
    targetWpm: number,
    targetAccuracy: number,
    dailyMinutes: number
  ) => {
    setStudent(prev => ({
      ...prev,
      targetWpm,
      targetAccuracy,
      dailyGoalMinutes: dailyMinutes
    }));
  };

  const updateStudentProfile = async (
    name: string,
    avatar: string
  ) => {
    if (!user) return;

    const cleanName = name.trim();
    const cleanAvatar = avatar.trim();

    if (!cleanName) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: cleanName,
        avatar_url: cleanAvatar || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error('Failed to update student profile:', error);
      throw error;
    }

    await supabase.auth.updateUser({
      data: {
        full_name: cleanName,
        avatar_url: cleanAvatar,
      },
    });

    setStudent(prev => ({
      ...prev,
      name: cleanName,
      avatar: cleanAvatar || prev.avatar,
    }));
  };

  const updateTeacherProfile = async (
    name: string,
    avatar: string
  ) => {
    if (!user) return;

    const cleanName = name.trim();
    const cleanAvatar = avatar.trim();

    if (!cleanName) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: cleanName,
        avatar_url: cleanAvatar || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error(
        'Failed to update teacher profile:',
        error
      );
      throw error;
    }

    await supabase.auth.updateUser({
      data: {
        full_name: cleanName,
        avatar_url: cleanAvatar,
      },
    });

    setTeacher(prev => ({
      ...prev,
      name: cleanName,
      avatar: cleanAvatar || prev.avatar,
    }));
  };

  const updateAdminProfile = async (
    name: string,
    avatar: string
  ) => {
    if (!user) return;

    const cleanName = name.trim();
    const cleanAvatar = avatar.trim();

    if (!cleanName) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: cleanName,
        avatar_url: cleanAvatar || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) {
      console.error(
        'Failed to update admin profile:',
        error
      );
      throw error;
    }

    await supabase.auth.updateUser({
      data: {
        full_name: cleanName,
        avatar_url: cleanAvatar,
      },
    });

    setAdmin(prev => ({
      ...prev,
      name: cleanName,
      avatar: cleanAvatar || prev.avatar,
    }));
  };

  // ---------------------------------------------------------
  // Supabase Logged-in User Profile
  // ---------------------------------------------------------

  useEffect(() => {
    if (!user) return;

    const loadRealProfile = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id, full_name, role, avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error(
            'Failed to load user profile:',
            error
          );
          return;
        }

        const metadataName =
          typeof user.user_metadata?.full_name === 'string'
            ? user.user_metadata.full_name.trim()
            : typeof user.user_metadata?.name === 'string'
              ? user.user_metadata.name.trim()
              : '';

        const metadataAvatar =
          typeof user.user_metadata?.avatar_url === 'string'
            ? user.user_metadata.avatar_url.trim()
            : '';

        const realName =
          profile?.full_name?.trim() ||
          metadataName ||
          user.email?.split('@')[0] ||
          'User';

        const realAvatar =
          profile?.avatar_url?.trim() ||
          metadataAvatar;

        const realRole =
          profile?.role === 'admin'
            ? 'admin'
            : profile?.role === 'teacher'
              ? 'teacher'
              : 'student';

        if (realRole === 'student') {
          setStudent(prev => ({
            ...prev,
            id: user.id,
            name: realName,
            email: user.email || '',
            avatar: realAvatar || prev.avatar,
            role: 'student'
          }));

          setRole('student');
        }

        if (realRole === 'teacher') {
          setTeacher(prev => ({
            ...prev,
            id: user.id,
            name: realName,
            email: user.email || '',
            avatar: realAvatar || prev.avatar,
            role: 'teacher'
          }));

          setRole('teacher');
        }

        if (realRole === 'admin') {
          setAdmin(prev => ({
            ...prev,
            id: user.id,
            name: realName,
            email: user.email || '',
            avatar: realAvatar || prev.avatar,
            role: 'admin'
          }));

          setRole('admin');
        }

      } catch (error) {
        console.error(
          'Unexpected profile loading error:',
          error
        );
      }
    };

    loadRealProfile();
  }, [user]);

  // ---------------------------------------------------------
  // Test Result
  // ---------------------------------------------------------

  const recordTestResult = (
    resultData: Omit<TestResult, 'id' | 'userId' | 'date'>
  ): TestResult => {
    const newId = `res-${Date.now()}`;

    const dateStr = new Date()
      .toISOString()
      .replace('T', ' ')
      .slice(0, 16);

    const newResult: TestResult = {
      ...resultData,
      id: newId,
      userId: student.id,
      date: dateStr
    };

    setTestHistory(prev => [newResult, ...prev]);

    setStudent(prev => {
      const newTotalTests = prev.testsCompleted + 1;

      const newBestWpm = Math.max(
        prev.bestWpm,
        newResult.netWpm
      );

      const newAvgWpm =
        Math.round(
          ((prev.averageWpm * prev.testsCompleted +
            newResult.netWpm) /
            newTotalTests) *
          10
        ) / 10;

      const newAvgAcc =
        Math.round(
          ((prev.averageAccuracy * prev.testsCompleted +
            newResult.accuracy) /
            newTotalTests) *
          10
        ) / 10;

      const addedMinutes = Math.max(
        1,
        Math.round(newResult.durationSeconds / 60)
      );

      const newPracticeMinutes =
        prev.practiceMinutes + addedMinutes;

      const newTodayMinutes =
        prev.todayMinutes + addedMinutes;

      let newXp = prev.xp + newResult.xpEarned;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;

      while (newXp >= newXpToNext) {
        newLevel += 1;
        newXpToNext = Math.round(
          newXpToNext * 1.35
        );

        soundManager.playLevelUp();
      }

      return {
        ...prev,
        testsCompleted: newTotalTests,
        bestWpm: newBestWpm,
        averageWpm: newAvgWpm,
        averageAccuracy: newAvgAcc,
        practiceMinutes: newPracticeMinutes,
        todayMinutes: newTodayMinutes,
        xp: newXp,
        level: newLevel,
        xpToNextLevel: newXpToNext
      };
    });

    if (activeLesson) {
      setLessons(prev =>
        prev.map(les => {
          if (les.id === activeLesson.id) {
            return {
              ...les,
              completed: true,
              bestWpm: Math.max(
                les.bestWpm || 0,
                newResult.netWpm
              ),
              bestAccuracy: Math.max(
                les.bestAccuracy || 0,
                newResult.accuracy
              )
            };
          }

          return les;
        })
      );
    }

    setAchievements(prev =>
      prev.map(ach => {
        if (ach.unlocked) return ach;

        let updatedVal = ach.currentValue;
        let unlocked = false;

        if (
          ach.id === 'ach-2' &&
          newResult.netWpm >= 40
        ) {
          unlocked = true;
          updatedVal = Math.max(
            updatedVal,
            newResult.netWpm
          );
        } else if (
          ach.id === 'ach-3' &&
          newResult.netWpm >= 65
        ) {
          unlocked = true;
          updatedVal = Math.max(
            updatedVal,
            newResult.netWpm
          );
        } else if (
          ach.id === 'ach-4' &&
          newResult.netWpm >= 100
        ) {
          unlocked = true;
          updatedVal = Math.max(
            updatedVal,
            newResult.netWpm
          );
        } else if (
          ach.id === 'ach-5' &&
          newResult.accuracy >= 100
        ) {
          unlocked = true;
          updatedVal = 100;
        }

        if (unlocked) {
          soundManager.playSuccess();

          setNotifications(nPrev => [
            {
              id: `notif-ach-${Date.now()}`,
              title: `Badge Unlocked: ${ach.title}! 🏆`,
              message: `You earned the "${ach.title}" achievement and +${ach.xpReward} XP.`,
              timestamp: 'Just now',
              type: 'achievement',
              read: false
            },
            ...nPrev
          ]);

          return {
            ...ach,
            currentValue: updatedVal,
            unlocked: true,
            unlockedAt: new Date()
              .toISOString()
              .split('T')[0]
          };
        }

        return ach;
      })
    );

    return newResult;
  };

  // ---------------------------------------------------------
  // Notifications
  // ---------------------------------------------------------

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === id
          ? { ...n, read: true }
          : n
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({
        ...n,
        read: true
      }))
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev =>
      prev.filter(n => n.id !== id)
    );
  };

  // ---------------------------------------------------------
  // Admin Operations
  // ---------------------------------------------------------

  const addBatch = (
    batchData: Omit<
      Batch,
      'id' | 'studentCount' | 'averageWpm' | 'averageAccuracy'
    >
  ) => {
    const newBatch: Batch = {
      ...batchData,
      id: `batch-${Date.now()}`,
      studentCount: 0,
      averageWpm: 0,
      averageAccuracy: 0
    };

    setBatches(prev => [
      newBatch,
      ...prev
    ]);
  };

  const updateBatch = (
    batchData: Batch
  ) => {
    setBatches(prev =>
      prev.map(b =>
        b.id === batchData.id
          ? batchData
          : b
      )
    );
  };

  const addStudent = (
    studentData: Omit<
      StudentRecord,
      | 'id'
      | 'wpm'
      | 'accuracy'
      | 'xp'
      | 'level'
      | 'streak'
      | 'testsTaken'
      | 'lessonsDone'
    >
  ) => {
    const newStudent: StudentRecord = {
      ...studentData,
      id: `std-${Date.now()}`,
      wpm: 25,
      accuracy: 90,
      xp: 100,
      level: 1,
      streak: 1,
      testsTaken: 0,
      lessonsDone: 0
    };

    setStudents(prev => [
      newStudent,
      ...prev
    ]);
  };

  const updateStudent = (
    studentData: StudentRecord
  ) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === studentData.id
          ? studentData
          : s
      )
    );
  };

  const addPassage = (
    passageData: Omit<
      TypingPassage,
      'id' | 'wordCount'
    >
  ) => {
    const words =
      passageData.content
        .trim()
        .split(/\s+/)
        .length;

    const newPassage: TypingPassage = {
      ...passageData,
      id: `pass-${Date.now()}`,
      wordCount: words
    };

    setPassages(prev => [
      newPassage,
      ...prev
    ]);
  };

  const updatePassage = (
    passageData: TypingPassage
  ) => {
    const words =
      passageData.content
        .trim()
        .split(/\s+/)
        .length;

    setPassages(prev =>
      prev.map(p =>
        p.id === passageData.id
          ? {
            ...passageData,
            wordCount: words
          }
          : p
      )
    );
  };

  const deletePassage = (
    id: string
  ) => {
    setPassages(prev =>
      prev.filter(p => p.id !== id)
    );
  };

  const addLesson = (
    lessonData: Omit<
      Lesson,
      'id' | 'completed' | 'bestWpm' | 'bestAccuracy'
    >
  ) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: `lesson-${Date.now()}`,
      completed: false,
      bestWpm: 0,
      bestAccuracy: 0
    };

    setLessons(prev => [
      ...prev,
      newLesson
    ]);
  };

  const updateLesson = (
    lessonData: Lesson
  ) => {
    setLessons(prev =>
      prev.map(l =>
        l.id === lessonData.id
          ? lessonData
          : l
      )
    );
  };

  const addAssignment = (
    assignmentData: Omit<
      Assignment,
      'id' | 'createdAt' | 'completedCount' | 'status'
    >
  ) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `assign-${Date.now()}`,
      createdAt: new Date()
        .toISOString()
        .split('T')[0],
      completedCount: 0,
      status: 'Active'
    };

    setAssignments(prev => [
      newAssignment,
      ...prev
    ]);

    setNotifications(prev => [
      {
        id: `notif-as-${Date.now()}`,
        title: `New Assignment: ${newAssignment.title}`,
        message: `Assigned to ${newAssignment.batchName}. Due ${newAssignment.dueDate}.`,
        timestamp: 'Just now',
        type: 'assignment',
        read: false
      },
      ...prev
    ]);
  };

  // ---------------------------------------------------------
  // Provider
  // ---------------------------------------------------------

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        logout,

        studentTab,
        setStudentTab,

        adminTab,
        setAdminTab,

        student,
        updateStudentGoals,
        updateStudentProfile,

        teacher,
        updateTeacherProfile,

        admin,
        updateAdminProfile,

        theme,
        setTheme,

        accentColor,
        setAccentColor,

        textColor,
        setTextColor,

        lessons,
        passages,
        achievements,
        batches,
        students,
        assignments,
        notifications,
        leaderboard,
        testHistory,

        activeLesson,
        startLesson,

        activeTestPassage,
        activeTestDuration,
        startTypingTest,

        activeGame,
        startGame,

        exitActiveSession,

        recordTestResult,

        markNotificationRead,
        markAllNotificationsRead,
        clearNotification,

        addBatch,
        updateBatch,
        addStudent,
        updateStudent,
        addPassage,
        updatePassage,
        deletePassage,
        addLesson,
        updateLesson,
        addAssignment,

        soundEnabled,
        toggleSound,
        soundType,
        setSoundType,

        selectedStudentForDetail,
        setSelectedStudentForDetail,

        selectedBatchForDetail,
        setSelectedBatchForDetail
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used within an AppProvider'
    );
  }

  return context;
};