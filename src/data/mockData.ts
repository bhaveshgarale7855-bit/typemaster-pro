import { Lesson, TypingPassage, Achievement, Batch, StudentRecord, Assignment, AppNotification, LeaderboardEntry, TestResult } from '../types';

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-1',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Home Row Mastery',
    lessonNumber: 1,
    title: 'The Anchor Keys: F and J',
    description: 'Master index finger placement on the textured bump keys F and J.',
    difficulty: 'Beginner',
    focusKeys: ['f', 'j', ' '],
    xpReward: 100,
    completed: true,
    bestWpm: 42,
    bestAccuracy: 98,
    exercises: [
      {
        id: 'ex-1-1',
        title: 'F and J Basics',
        instructions: 'Rest your left index finger on F and right index finger on J. Tap space with your thumb.',
        text: 'fff jjj fff jjj fj fj jf jf ff jj fjf jfj',
        targetWpm: 25,
        minAccuracy: 90,
        focusKeys: ['f', 'j', ' ']
      },
      {
        id: 'ex-1-2',
        title: 'Alternating F and J Rhythm',
        instructions: 'Maintain a steady, relaxed tempo. Do not look down at the keyboard.',
        text: 'f j f j ff jj fff jjj fj fj jf jf ffff jjjj',
        targetWpm: 30,
        minAccuracy: 92,
        focusKeys: ['f', 'j', ' ']
      }
    ]
  },
  {
    id: 'lesson-2',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Home Row Mastery',
    lessonNumber: 2,
    title: 'Left Hand Home Row: A S D F',
    description: 'Learn pinky on A, ring on S, middle on D, and index on F.',
    difficulty: 'Beginner',
    focusKeys: ['a', 's', 'd', 'f', ' '],
    xpReward: 120,
    completed: true,
    bestWpm: 38,
    bestAccuracy: 95,
    exercises: [
      {
        id: 'ex-2-1',
        title: 'Home Row Left Hand Drill',
        instructions: 'Pinky: A, Ring: S, Middle: D, Index: F.',
        text: 'asdf asdf fdsa fdsa aass ddff asdf sad fad dad fas',
        targetWpm: 25,
        minAccuracy: 90,
        focusKeys: ['a', 's', 'd', 'f']
      },
      {
        id: 'ex-2-2',
        title: 'Left Hand Words',
        instructions: 'Combine the home keys into actual English words.',
        text: 'sad dad fad fads daff fads as sad as dad add dads',
        targetWpm: 30,
        minAccuracy: 92,
        focusKeys: ['a', 's', 'd', 'f']
      }
    ]
  },
  {
    id: 'lesson-3',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Home Row Mastery',
    lessonNumber: 3,
    title: 'Right Hand Home Row: J K L ;',
    description: 'Index on J, middle on K, ring on L, pinky on semicolon.',
    difficulty: 'Beginner',
    focusKeys: ['j', 'k', 'l', ';', ' '],
    xpReward: 120,
    completed: false,
    bestWpm: 0,
    bestAccuracy: 0,
    exercises: [
      {
        id: 'ex-3-1',
        title: 'Right Hand Drill',
        instructions: 'Keep your right hand curved naturally over J, K, L and semicolon.',
        text: 'jkl; jkl; ;lkj ;lkj jj kk ll ;; jkl; kj;l lkj;',
        targetWpm: 25,
        minAccuracy: 90,
        focusKeys: ['j', 'k', 'l', ';']
      },
      {
        id: 'ex-3-2',
        title: 'Full Home Row Combination',
        instructions: 'Type across both hands without moving wrist anchors.',
        text: 'asdf jkl; a s d f j k l ; fall flask salad salsa ask lad',
        targetWpm: 30,
        minAccuracy: 92,
        focusKeys: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';']
      }
    ]
  },
  {
    id: 'lesson-4',
    moduleNumber: 1,
    moduleTitle: 'Module 1: Home Row Mastery',
    lessonNumber: 4,
    title: 'Reaching for G and H',
    description: 'Extend index fingers horizontally: Left index reaches G, right index reaches H.',
    difficulty: 'Beginner',
    focusKeys: ['g', 'h', 'f', 'j'],
    xpReward: 150,
    completed: false,
    exercises: [
      {
        id: 'ex-4-1',
        title: 'G and H Extensions',
        instructions: 'Always return your index fingers back to F and J after hitting G and H.',
        text: 'fgf jhj fgf jhj gag hah glad half dash flag hash flash',
        targetWpm: 28,
        minAccuracy: 92,
        focusKeys: ['g', 'h', 'f', 'j']
      },
      {
        id: 'ex-4-2',
        title: 'Complete Home Row Flow',
        instructions: 'Practice whole phrases using only the home row keys.',
        text: 'all glad lads had half a flash of glass as dad asks',
        targetWpm: 32,
        minAccuracy: 94,
        focusKeys: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
      }
    ]
  },
  {
    id: 'lesson-5',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Top Row Expansion',
    lessonNumber: 5,
    title: 'Vowels E and I',
    description: 'Left middle finger reaches up to E, right middle finger reaches up to I.',
    difficulty: 'Intermediate',
    focusKeys: ['e', 'i', 'd', 'k'],
    xpReward: 160,
    completed: false,
    exercises: [
      {
        id: 'ex-5-1',
        title: 'E and I Discovery',
        instructions: 'Keep home row posture. Move only the middle finger upward smoothly.',
        text: 'ded kik ded kik see side like feed fill field skill life',
        targetWpm: 32,
        minAccuracy: 92,
        focusKeys: ['e', 'i']
      },
      {
        id: 'ex-5-2',
        title: 'Frequent Word Combos',
        instructions: 'Practice smooth fluid transitions between home keys and E and I.',
        text: 'she said he likes easy fields file the fake leaf slide',
        targetWpm: 35,
        minAccuracy: 94,
        focusKeys: ['e', 'i', 's', 'h', 'l', 'd', 'f']
      }
    ]
  },
  {
    id: 'lesson-6',
    moduleNumber: 2,
    moduleTitle: 'Module 2: Top Row Expansion',
    lessonNumber: 6,
    title: 'Top Row Reaches: R, T, Y, U',
    description: 'Learn index finger vertical extensions for R, T (left) and Y, U (right).',
    difficulty: 'Intermediate',
    focusKeys: ['r', 't', 'y', 'u'],
    xpReward: 180,
    completed: false,
    exercises: [
      {
        id: 'ex-6-1',
        title: 'Index Key Ladder',
        instructions: 'F to R, F to T, J to U, J to Y.',
        text: 'frf ftf juj jyj try true rust yurt youth trust furry fruit',
        targetWpm: 35,
        minAccuracy: 93,
        focusKeys: ['r', 't', 'y', 'u']
      }
    ]
  },
  {
    id: 'lesson-7',
    moduleNumber: 3,
    moduleTitle: 'Module 3: Bottom Row & Capitalization',
    lessonNumber: 7,
    title: 'Bottom Row: C, V, B, N, M and Comma',
    description: 'Downward reaches from the home row with proper finger arc.',
    difficulty: 'Intermediate',
    focusKeys: ['c', 'v', 'b', 'n', 'm', ','],
    xpReward: 200,
    completed: false,
    exercises: [
      {
        id: 'ex-7-1',
        title: 'Bottom Row Step Down',
        instructions: 'D down to C, F down to V and B, J down to N and M.',
        text: 'dcd fvf fbf jnj jmj man van cave beam move calm, can',
        targetWpm: 35,
        minAccuracy: 92,
        focusKeys: ['c', 'v', 'b', 'n', 'm', ',']
      }
    ]
  },
  {
    id: 'lesson-8',
    moduleNumber: 4,
    moduleTitle: 'Module 4: Numbers and Symbols',
    lessonNumber: 8,
    title: 'Top Number Row & Punctuation',
    description: 'Reaching numbers 1 through 0 and common punctuation marks.',
    difficulty: 'Advanced',
    focusKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '!', '?'],
    xpReward: 250,
    completed: false,
    exercises: [
      {
        id: 'ex-8-1',
        title: 'Numbers and Currency',
        instructions: 'Extend fingers up two rows while maintaining anchor awareness.',
        text: '123 456 789 2026 $500 100% 3.14159 item #42 on 10/12/2026',
        targetWpm: 30,
        minAccuracy: 90,
        focusKeys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
      }
    ]
  }
];

export const TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'pass-1',
    title: 'The Art of Touch Typing',
    category: 'Technology',
    difficulty: 'Easy',
    wordCount: 54,
    author: 'TypeMaster Academy',
    content: 'Touch typing is the ability to type without looking at the keys. Your fingers learn where each key is located through muscle memory. By practicing regularly, you can dramatically increase your speed and accuracy while reducing fatigue in your hands and wrists. Consistency is always more important than raw speed.'
  },
  {
    id: 'pass-2',
    title: 'The Evolution of Computing',
    category: 'Technology',
    difficulty: 'Medium',
    wordCount: 82,
    author: 'Alan Turing Memorial Lecture',
    content: 'The earliest computational devices were mechanical wonders powered by gears and levers. Today, billions of microscopic transistors operate simultaneously within silicon chips no larger than a postage stamp. As artificial intelligence advances, the way humans interact with software continues to evolve, yet the keyboard remains our primary bridge for expressing complex logical thought and creative prose.'
  },
  {
    id: 'pass-3',
    title: 'The Principles of Clean Code',
    category: 'Code',
    difficulty: 'Hard',
    wordCount: 75,
    author: 'Robert C. Martin',
    content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand. Clean code is simple and direct. It reads like well-written prose. Clean code never obscures the designer intent but rather is full of crisp abstractions and straightforward lines of control.'
  },
  {
    id: 'pass-4',
    title: 'The Cosmos and Human Curiosity',
    category: 'Science',
    difficulty: 'Medium',
    wordCount: 88,
    author: 'Carl Sagan',
    content: 'The nitrogen in our DNA, the calcium in our teeth, the iron in our blood, the carbon in our apple pies were made in the interiors of collapsing stars. We are made of starstuff. We are a way for the cosmos to know itself. For small creatures such as we, the vastness is bearable only through love and scientific pursuit.'
  },
  {
    id: 'pass-5',
    title: 'Principles of Modern Leadership',
    category: 'Business',
    difficulty: 'Easy',
    wordCount: 68,
    author: 'Peter Drucker',
    content: 'Management is doing things right; leadership is doing the right things. Effective leaders empower those around them, fostering autonomy and genuine psychological safety. When teams feel supported, innovation blossoms organically, and obstacles become valuable learning opportunities rather than insurmountable roadblocks.'
  },
  {
    id: 'pass-6',
    title: 'The Road Not Taken',
    category: 'Literature',
    difficulty: 'Medium',
    wordCount: 70,
    author: 'Robert Frost',
    content: 'Two roads diverged in a yellow wood, and sorry I could not travel both and be one traveler, long I stood and looked down one as far as I could to where it bent in the undergrowth. I took the one less traveled by, and that has made all the difference in this life.'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Stroke',
    description: 'Complete your first typing exercise.',
    icon: 'Keyboard',
    category: 'lessons',
    targetValue: 1,
    currentValue: 1,
    unlocked: true,
    unlockedAt: '2026-09-01',
    xpReward: 50
  },
  {
    id: 'ach-2',
    title: 'Speed Apprentice',
    description: 'Reach a typing speed of 40 WPM in any test.',
    icon: 'Zap',
    category: 'speed',
    targetValue: 40,
    currentValue: 48,
    unlocked: true,
    unlockedAt: '2026-09-04',
    xpReward: 150
  },
  {
    id: 'ach-3',
    title: 'Speed Demon',
    description: 'Surpass 65 WPM in a 1-minute or longer test.',
    icon: 'Flame',
    category: 'speed',
    targetValue: 65,
    currentValue: 56,
    unlocked: false,
    xpReward: 300
  },
  {
    id: 'ach-4',
    title: 'Centurion Typist',
    description: 'Achieve 100 WPM on a certified test.',
    icon: 'Crown',
    category: 'speed',
    targetValue: 100,
    currentValue: 56,
    unlocked: false,
    xpReward: 1000
  },
  {
    id: 'ach-5',
    title: 'Flawless Precision',
    description: 'Complete a full test with 100% accuracy.',
    icon: 'Target',
    category: 'accuracy',
    targetValue: 100,
    currentValue: 98,
    unlocked: false,
    xpReward: 250
  },
  {
    id: 'ach-6',
    title: '7-Day Streak Master',
    description: 'Practice every day for 7 consecutive days.',
    icon: 'Calendar',
    category: 'streak',
    targetValue: 7,
    currentValue: 5,
    unlocked: false,
    xpReward: 400
  },
  {
    id: 'ach-7',
    title: 'Curriculum Explorer',
    description: 'Complete 5 structured typing lessons.',
    icon: 'BookOpen',
    category: 'lessons',
    targetValue: 5,
    currentValue: 2,
    unlocked: false,
    xpReward: 200
  },
  {
    id: 'ach-8',
    title: 'Game Champion',
    description: 'Score over 1,500 points in Word Invaders.',
    icon: 'Gamepad2',
    category: 'special',
    targetValue: 1500,
    currentValue: 1240,
    unlocked: false,
    xpReward: 250
  }
];

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-1',
    name: 'Batch Alpha 2026 (Morning)',
    code: 'TYP-2026-AM',
    instructorName: 'Prof. David Vance',
    studentCount: 24,
    averageWpm: 46.5,
    averageAccuracy: 94.2,
    startDate: '2026-08-15',
    schedule: 'Mon, Wed, Fri (09:00 - 10:30 AM)',
    description: 'Beginner to Intermediate typing foundation for first-year computing undergraduates.'
  },
  {
    id: 'batch-2',
    name: 'Batch Beta 2026 (Evening)',
    code: 'TYP-2026-PM',
    instructorName: 'Prof. David Vance',
    studentCount: 18,
    averageWpm: 58.2,
    averageAccuracy: 96.1,
    startDate: '2026-08-20',
    schedule: 'Tue, Thu (05:00 - 06:30 PM)',
    description: 'High-speed touch typing intensive and transcription accuracy certification.'
  },
  {
    id: 'batch-3',
    name: 'Corporate Executive Bootcamp',
    code: 'EXEC-SPEED-01',
    instructorName: 'Elena Rostova',
    studentCount: 14,
    averageWpm: 52.8,
    averageAccuracy: 95.4,
    startDate: '2026-09-01',
    schedule: 'Saturday (10:00 AM - 01:00 PM)',
    description: 'Ergonomic keyboard speed for legal, medical, and executive administrative staff.'
  }
];

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-1',
    batchName: 'Batch Alpha 2026 (Morning)',
    wpm: 56,
    accuracy: 97,
    xp: 2450,
    level: 7,
    streak: 5,
    status: 'Top Performer',
    joinedDate: '2026-08-15',
    lastTestDate: '2026-09-08',
    testsTaken: 28,
    lessonsDone: 6
  },
  {
    id: 'std-2',
    name: 'Marcus Chen',
    email: 'm.chen@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-1',
    batchName: 'Batch Alpha 2026 (Morning)',
    wpm: 68,
    accuracy: 98,
    xp: 3890,
    level: 11,
    streak: 12,
    status: 'Top Performer',
    joinedDate: '2026-08-15',
    lastTestDate: '2026-09-09',
    testsTaken: 45,
    lessonsDone: 8
  },
  {
    id: 'std-3',
    name: 'Sarah Jenkins',
    email: 'sarah.j@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-1',
    batchName: 'Batch Alpha 2026 (Morning)',
    wpm: 32,
    accuracy: 86,
    xp: 980,
    level: 3,
    streak: 1,
    status: 'Needs Attention',
    joinedDate: '2026-08-18',
    lastTestDate: '2026-09-05',
    testsTaken: 9,
    lessonsDone: 2
  },
  {
    id: 'std-4',
    name: 'Devon Wright',
    email: 'devon.w@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-2',
    batchName: 'Batch Beta 2026 (Evening)',
    wpm: 24,
    accuracy: 79,
    xp: 620,
    level: 2,
    streak: 0,
    status: 'At Risk',
    joinedDate: '2026-08-20',
    lastTestDate: '2026-08-29',
    testsTaken: 5,
    lessonsDone: 1
  },
  {
    id: 'std-5',
    name: 'Priya Sharma',
    email: 'priya.s@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-2',
    batchName: 'Batch Beta 2026 (Evening)',
    wpm: 62,
    accuracy: 96,
    xp: 3100,
    level: 9,
    streak: 8,
    status: 'Active',
    joinedDate: '2026-08-20',
    lastTestDate: '2026-09-08',
    testsTaken: 34,
    lessonsDone: 7
  },
  {
    id: 'std-6',
    name: 'Liam Gallagher',
    email: 'liam.g@typemaster.edu',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    batchId: 'batch-3',
    batchName: 'Corporate Executive Bootcamp',
    wpm: 54,
    accuracy: 95,
    xp: 2150,
    level: 6,
    streak: 4,
    status: 'Active',
    joinedDate: '2026-09-01',
    lastTestDate: '2026-09-07',
    testsTaken: 19,
    lessonsDone: 5
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'assign-1',
    title: 'Home Row Speed Milestone Drill',
    batchId: 'batch-1',
    batchName: 'Batch Alpha 2026 (Morning)',
    type: 'speed_drill',
    targetWpm: 35,
    minAccuracy: 92,
    content: 'Focus on keeping your wrists resting lightly. Keep index fingers strictly on F and J home posts.',
    dueDate: '2026-09-15',
    createdAt: '2026-09-05',
    totalAssigned: 24,
    completedCount: 19,
    status: 'Active'
  },
  {
    id: 'assign-2',
    title: 'Clean Code Transcription Test',
    batchId: 'batch-2',
    batchName: 'Batch Beta 2026 (Evening)',
    type: 'passage_test',
    targetWpm: 50,
    minAccuracy: 95,
    content: 'The Principles of Clean Code passage. Special focus on brackets, quotes, and punctuation keys.',
    dueDate: '2026-09-18',
    createdAt: '2026-09-07',
    totalAssigned: 18,
    completedCount: 12,
    status: 'Active'
  },
  {
    id: 'assign-3',
    title: 'Vowel & Top Row Transition Practice',
    batchId: 'batch-1',
    batchName: 'Batch Alpha 2026 (Morning)',
    type: 'lesson',
    targetWpm: 30,
    minAccuracy: 90,
    content: 'Complete Module 2, Lessons 5 and 6 with 90%+ accuracy.',
    dueDate: '2026-09-12',
    createdAt: '2026-09-02',
    totalAssigned: 24,
    completedCount: 22,
    status: 'Active'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Assignment Assigned',
    message: 'Prof. Vance assigned "Home Row Speed Milestone Drill" due Sept 15.',
    timestamp: '2 hours ago',
    type: 'assignment',
    read: false
  },
  {
    id: 'notif-2',
    title: '5-Day Streak Active! 🔥',
    message: 'You have practiced 5 days in a row. Practice today to keep your streak intact!',
    timestamp: '5 hours ago',
    type: 'streak',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Badge Unlocked: Speed Apprentice',
    message: 'Congratulations! You clocked 48 WPM and earned the Speed Apprentice badge (+150 XP).',
    timestamp: 'Yesterday',
    type: 'achievement',
    read: true
  }
];

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'std-2',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    batchName: 'Batch Alpha 2026',
    batch: 'Batch Alpha 2026',
    wpm: 84,
    accuracy: 99,
    testsCompleted: 45,
    level: 11,
    streak: 18,
    xp: 4950
  },
  {
    rank: 2,
    userId: 'std-5',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    batchName: 'Batch Beta 2026',
    batch: 'Batch Beta 2026',
    wpm: 76,
    accuracy: 97,
    testsCompleted: 34,
    level: 9,
    streak: 12,
    xp: 3820
  },
  {
    rank: 3,
    userId: 'current-user',
    name: 'Alex Rivera (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    batchName: 'Batch Alpha 2026',
    batch: 'Batch Alpha 2026',
    wpm: 68,
    accuracy: 98,
    testsCompleted: 28,
    level: 7,
    streak: 6,
    xp: 2840,
    isCurrentUser: true
  },
  {
    rank: 4,
    userId: 'std-6',
    name: 'Liam Gallagher',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    batchName: 'Exec Bootcamp',
    batch: 'Exec Bootcamp',
    wpm: 62,
    accuracy: 95,
    testsCompleted: 19,
    level: 6,
    streak: 8,
    xp: 2150
  },
  {
    rank: 5,
    userId: 'std-3',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    batchName: 'Batch Alpha 2026',
    batch: 'Batch Alpha 2026',
    wpm: 48,
    accuracy: 92,
    testsCompleted: 9,
    level: 3,
    streak: 3,
    xp: 1240
  }
];

export const INITIAL_TEST_HISTORY: TestResult[] = [
  {
    id: 'res-1',
    userId: 'current-user',
    date: '2026-09-08 14:30',
    title: '1-Minute Speed Sprint',
    type: 'test',
    durationSeconds: 60,
    grossWpm: 58,
    netWpm: 56,
    accuracy: 97,
    totalKeystrokes: 290,
    correctKeystrokes: 280,
    errorCount: 10,
    consistencyScore: 91,
    errorKeys: { p: 3, b: 2, q: 2, c: 3 },
    xpEarned: 140
  },
  {
    id: 'res-2',
    userId: 'current-user',
    date: '2026-09-07 10:15',
    title: 'The Art of Touch Typing',
    type: 'test',
    durationSeconds: 65,
    grossWpm: 53,
    netWpm: 51,
    accuracy: 96,
    totalKeystrokes: 275,
    correctKeystrokes: 264,
    errorCount: 11,
    consistencyScore: 89,
    errorKeys: { b: 4, y: 3, ',': 2, p: 2 },
    xpEarned: 125
  },
  {
    id: 'res-3',
    userId: 'current-user',
    date: '2026-09-05 18:40',
    title: 'Home Row Left Hand Drill',
    type: 'lesson',
    durationSeconds: 45,
    grossWpm: 46,
    netWpm: 44,
    accuracy: 95,
    totalKeystrokes: 207,
    correctKeystrokes: 198,
    errorCount: 9,
    consistencyScore: 92,
    errorKeys: { a: 4, s: 3, f: 2 },
    xpEarned: 120
  },
  {
    id: 'res-4',
    userId: 'current-user',
    date: '2026-09-03 16:10',
    title: 'The Cosmos and Human Curiosity',
    type: 'test',
    durationSeconds: 120,
    grossWpm: 49,
    netWpm: 47,
    accuracy: 95,
    totalKeystrokes: 588,
    correctKeystrokes: 560,
    errorCount: 28,
    consistencyScore: 88,
    errorKeys: { p: 7, b: 6, c: 5, ';': 4, y: 6 },
    xpEarned: 190
  }
];

export const COMMON_WORDS: string[] = [
  'about', 'above', 'across', 'action', 'after', 'again', 'against', 'almost', 'along', 'already',
  'always', 'another', 'around', 'balance', 'become', 'before', 'begin', 'behind', 'between', 'beyond',
  'builder', 'business', 'camera', 'capital', 'capture', 'center', 'chance', 'change', 'charge', 'circle',
  'clarity', 'classic', 'clean', 'client', 'climate', 'clock', 'cloud', 'coffee', 'color', 'command',
  'common', 'company', 'compare', 'complex', 'concept', 'connect', 'control', 'corner', 'correct', 'create',
  'current', 'custom', 'danger', 'decision', 'default', 'degree', 'delight', 'design', 'detail', 'develop',
  'device', 'diamond', 'digital', 'direct', 'display', 'distance', 'dynamic', 'effort', 'element', 'enable',
  'energy', 'engine', 'enough', 'entire', 'escape', 'example', 'expand', 'expert', 'explore', 'express',
  'factor', 'family', 'faster', 'feature', 'feeling', 'figure', 'filter', 'finger', 'finish', 'flight',
  'flow', 'focus', 'follow', 'forest', 'format', 'forward', 'friend', 'future', 'garden', 'general',
  'global', 'golden', 'growth', 'handle', 'happen', 'harbor', 'header', 'health', 'height', 'history',
  'honest', 'horizon', 'impact', 'include', 'income', 'input', 'insight', 'inspire', 'instant', 'island',
  'journey', 'keyboard', 'knowledge', 'language', 'layout', 'leader', 'learning', 'legacy', 'lesson', 'library',
  'light', 'linear', 'logic', 'machine', 'manage', 'market', 'master', 'matrix', 'maximum', 'measure',
  'member', 'memory', 'method', 'middle', 'minute', 'mirror', 'modern', 'module', 'moment', 'motion',
  'native', 'nature', 'network', 'normal', 'number', 'object', 'office', 'online', 'option', 'origin',
  'output', 'packet', 'paddle', 'palace', 'panel', 'paper', 'parent', 'partial', 'partner', 'passage',
  'pattern', 'people', 'perfect', 'period', 'person', 'picture', 'planet', 'player', 'pocket', 'policy',
  'portal', 'power', 'practice', 'predict', 'premium', 'prepare', 'primary', 'process', 'produce', 'profile',
  'program', 'progress', 'project', 'promise', 'prompt', 'protect', 'provide', 'public', 'purpose', 'python',
  'quantum', 'quarter', 'query', 'quick', 'quiet', 'radar', 'random', 'rapid', 'reach', 'reason',
  'record', 'reduce', 'refine', 'reflect', 'region', 'regular', 'release', 'remain', 'remote', 'render',
  'repeat', 'report', 'require', 'rescue', 'resolve', 'resource', 'respect', 'respond', 'result', 'return',
  'reward', 'rhythm', 'rocket', 'routine', 'runner', 'safety', 'sample', 'scale', 'schema', 'school',
  'science', 'screen', 'script', 'search', 'season', 'second', 'secret', 'secure', 'select', 'sensor',
  'series', 'server', 'service', 'session', 'shadow', 'signal', 'simple', 'single', 'sister', 'socket',
  'source', 'spark', 'speed', 'spirit', 'spring', 'stable', 'standard', 'status', 'steady', 'stream',
  'street', 'string', 'strong', 'student', 'studio', 'success', 'sudden', 'summer', 'sunset', 'support',
  'switch', 'symbol', 'system', 'talent', 'target', 'teacher', 'template', 'terminal', 'theory', 'ticket',
  'timber', 'timing', 'today', 'token', 'topic', 'total', 'touch', 'track', 'travel', 'trend',
  'trigger', 'tuning', 'type', 'unique', 'unit', 'update', 'upgrade', 'useful', 'valley', 'value',
  'vector', 'velocity', 'venture', 'version', 'vessel', 'victory', 'village', 'virtual', 'vision', 'volume',
  'walker', 'warmth', 'warning', 'watch', 'water', 'weather', 'weight', 'welcome', 'window', 'wisdom',
  'wizard', 'wonder', 'worker', 'world', 'worthy', 'writer', 'yellow', 'yield', 'zenith', 'zipper'
];

export const CODE_SNIPPETS: { id: string; language: string; title: string; code: string }[] = [
  {
    id: 'code-1',
    language: 'JavaScript',
    title: 'Array Reduce & Accumulator',
    code: `const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const average = sum / (numbers.length || 1);
console.log({ sum, average });`
  },
  {
    id: 'code-2',
    language: 'TypeScript',
    title: 'Interface and Generics',
    code: `interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export function parseResponse<T>(res: ApiResponse<T>): T {
  if (res.status !== 200) throw new Error(res.message);
  return res.data;
}`
  },
  {
    id: 'code-3',
    language: 'Python',
    title: 'List Comprehension & Dictionaries',
    code: `def filter_top_scores(scores: dict, threshold: int = 50) -> list:
    filtered = [name for name, score in scores.items() if score >= threshold]
    return sorted(filtered, reverse=True)`
  },
  {
    id: 'code-4',
    language: 'React / JSX',
    title: 'Custom Hook with useEffect',
    code: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}`
  }
];
