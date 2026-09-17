export type UserRole = 'student' | 'admin';

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
  | 'admin-reports';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  batchId: string;
  batchName: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streakDays: number;
  lastActiveDate: string;
  bestWpm: number;
  averageWpm: number;
  averageAccuracy: number;
  testsCompleted: number;
  lessonsCompleted: number;
  practiceMinutes: number;
  dailyGoalMinutes: number;
  todayMinutes: number;
  targetWpm: number;
  targetAccuracy: number;
  role: 'student';
}

export interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'teacher' | 'admin';
  institution: string;
  activeBatchesCount: number;
  totalStudentsCount: number;
}

export interface LessonExercise {
  id: string;
  title: string;
  instructions: string;
  text: string;
  targetWpm: number;
  minAccuracy: number;
  focusKeys: string[];
}

export interface Lesson {
  id: string;
  moduleNumber: number;
  moduleTitle: string;
  lessonNumber: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  focusKeys: string[];
  exercises: LessonExercise[];
  completed?: boolean;
  bestWpm?: number;
  bestAccuracy?: number;
  xpReward: number;
}

export interface TypingPassage {
  id: string;
  title: string;
  category:
  | 'Literature'
  | 'Technology'
  | 'Science'
  | 'Business'
  | 'Quotes'
  | 'Code'
  | 'History';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  content: string;
  wordCount: number;
  author?: string;
}

export interface TestResult {
  id: string;
  userId: string;
  date: string;
  title: string;
  type: 'lesson' | 'test' | 'practice' | 'game' | 'assignment';
  durationSeconds: number;
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  errorCount: number;
  consistencyScore: number;
  errorKeys: Record<string, number>;
  xpEarned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'speed' | 'accuracy' | 'streak' | 'lessons' | 'special';
  targetValue: number;
  currentValue: number;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface KeyAccuracyStat {
  key: string;
  hits: number;
  misses: number;
  accuracy: number;
  avgResponseMs: number;
}

export interface Batch {
  id: string;
  name: string;
  code: string;
  instructorName: string;
  studentCount: number;
  averageWpm: number;
  averageAccuracy: number;
  startDate: string;
  schedule: string;
  description: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  avatar: string;
  batchId: string;
  batchName: string;
  wpm: number;
  accuracy: number;
  xp: number;
  level: number;
  streak: number;
  status: 'Active' | 'At Risk' | 'Needs Attention' | 'Top Performer';
  joinedDate: string;
  lastTestDate: string;
  testsTaken: number;
  lessonsDone: number;
}

export interface Assignment {
  id: string;
  title: string;
  batchId: string;
  batchName: string;
  type: 'lesson' | 'passage_test' | 'speed_drill';
  targetWpm: number;
  minAccuracy: number;
  content: string;
  dueDate: string;
  createdAt: string;
  totalAssigned: number;
  completedCount: number;
  status: 'Active' | 'Closed' | 'Draft';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'assignment' | 'achievement' | 'system' | 'streak';
  read: boolean;
  actionUrl?: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  batchName: string;
  batch?: string;
  wpm: number;
  accuracy: number;
  testsCompleted: number;
  level: number;
  streak?: number;
  xp?: number;
  isCurrentUser?: boolean;
}
