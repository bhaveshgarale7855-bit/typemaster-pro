// import React, { useEffect, useMemo, useState } from 'react';
// import {
//     UserPlus,
//     Users,
//     CheckCircle2,
//     Clock3,
//     Mail,
//     X,
//     Search,
//     Loader2,
//     AlertCircle,
// } from 'lucide-react';
// import { supabase } from '../../lib/supabase';

// type TeacherStatus = 'Active' | 'Added';

// interface Teacher {
//     id: string;
//     name: string;
//     email: string;
//     status: TeacherStatus;
//     joinedAt: string;
// }

// interface TeacherRow {
//     id: string;
//     full_name: string;
//     email: string;
//     status: string;
//     created_at: string;
// }

// const INITIAL_TEACHERS: Teacher[] = [
//     {
//         id: 'teacher-1',
//         name: 'Priya Sharma',
//         email: 'priya.sharma@example.com',
//         status: 'Active',
//         joinedAt: '2 months ago',
//     },
//     {
//         id: 'teacher-2',
//         name: 'Rahul Patil',
//         email: 'rahul.patil@example.com',
//         status: 'Active',
//         joinedAt: '1 month ago',
//     },
// ];

// const formatJoinedDate = (dateString: string) => {
//     const date = new Date(dateString);

//     if (Number.isNaN(date.getTime())) {
//         return 'Recently';
//     }

//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMinutes = Math.floor(diffMs / (1000 * 60));
//     const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//     if (diffMinutes < 1) return 'Just now';
//     if (diffMinutes < 60) return `${diffMinutes} min ago`;
//     if (diffHours < 24) return `${diffHours} hr ago`;
//     if (diffDays === 1) return 'Yesterday';
//     if (diffDays < 30) return `${diffDays} days ago`;

//     if (diffDays < 365) {
//         const months = Math.floor(diffDays / 30);
//         return `${months} month${months > 1 ? 's' : ''} ago`;
//     }

//     const years = Math.floor(diffDays / 365);
//     return `${years} year${years > 1 ? 's' : ''} ago`;
// };

// const mapTeacherRow = (row: TeacherRow): Teacher => ({
//     id: row.id,
//     name: row.full_name,
//     email: row.email,
//     status: row.status === 'Active' ? 'Active' : 'Added',
//     joinedAt: formatJoinedDate(row.created_at),
// });

// export const TeacherManagementView: React.FC = () => {
//     const [teachers, setTeachers] = useState<Teacher[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isAdding, setIsAdding] = useState(false);

//     const [showAddModal, setShowAddModal] = useState(false);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');

//     const [searchTerm, setSearchTerm] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     const loadTeachers = async () => {
//         try {
//             setIsLoading(true);
//             setError('');

//             const { data, error: fetchError } = await supabase
//                 .from('teachers')
//                 .select('id, full_name, email, status, created_at')
//                 .order('created_at', { ascending: false });

//             if (fetchError) {
//                 console.error('Failed to load teachers:', fetchError);
//                 setError('Unable to load teachers from the database.');
//                 setTeachers(INITIAL_TEACHERS);
//                 return;
//             }

//             const databaseTeachers = (data ?? []).map(mapTeacherRow);

//             setTeachers(databaseTeachers);
//         } catch (err) {
//             console.error('Unexpected teacher loading error:', err);
//             setError('Something went wrong while loading teachers.');
//             setTeachers(INITIAL_TEACHERS);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadTeachers();
//     }, []);

//     const resetModal = () => {
//         setName('');
//         setEmail('');
//         setError('');
//         setSuccess('');
//         setShowAddModal(false);
//     };

//     const handleAddTeacher = async (event: React.FormEvent) => {
//         event.preventDefault();

//         const cleanName = name.trim();
//         const cleanEmail = email.trim().toLowerCase();

//         setError('');
//         setSuccess('');

//         if (!cleanName) {
//             setError('Please enter the teacher name.');
//             return;
//         }

//         if (!cleanEmail) {
//             setError('Please enter the teacher email.');
//             return;
//         }

//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         if (!emailPattern.test(cleanEmail)) {
//             setError('Please enter a valid email address.');
//             return;
//         }

//         const alreadyExists = teachers.some(
//             (teacher) => teacher.email.toLowerCase() === cleanEmail
//         );

//         if (alreadyExists) {
//             setError('A teacher with this email already exists.');
//             return;
//         }

//         try {
//             setIsAdding(true);

//             // Get the currently logged-in admin session.
//             const {
//                 data: { session },
//                 error: sessionError,
//             } = await supabase.auth.getSession();

//             if (sessionError || !session?.access_token) {
//                 setError('Your login session has expired. Please sign in again.');
//                 return;
//             }

//             // Call the Supabase Edge Function.
//             const { data, error: functionError } =
//                 await supabase.functions.invoke('invite-teacher', {
//                     body: {
//                         fullName: cleanName,
//                         email: cleanEmail,
//                     },
//                     headers: {
//                         Authorization: `Bearer ${session.access_token}`,
//                     },
//                 });

//             if (functionError) {
//                 console.error(
//                     'Teacher invitation function error:',
//                     functionError
//                 );

//                 setError(
//                     functionError.message ||
//                     'Unable to create the teacher account.'
//                 );

//                 return;
//             }

//             if (data?.error) {
//                 setError(data.error);
//                 return;
//             }

//             if (!data?.success) {
//                 setError(
//                     'Teacher account could not be created. Please try again.'
//                 );
//                 return;
//             }

//             setSuccess(
//                 `${cleanName} has been added and the invitation email has been sent.`
//             );

//             setName('');
//             setEmail('');

//             // Refresh the teacher list from Supabase.
//             await loadTeachers();

//             setTimeout(() => {
//                 setShowAddModal(false);
//                 setSuccess('');
//             }, 1500);
//         } catch (err) {
//             console.error(
//                 'Unexpected teacher invitation error:',
//                 err
//             );

//             setError(
//                 err instanceof Error
//                     ? err.message
//                     : 'Something went wrong while adding the teacher.'
//             );
//         } finally {
//             setIsAdding(false);
//         }
//     };

//     const filteredTeachers = useMemo(() => {
//         const query = searchTerm.trim().toLowerCase();

//         if (!query) {
//             return teachers;
//         }

//         return teachers.filter(
//             (teacher) =>
//                 teacher.name.toLowerCase().includes(query) ||
//                 teacher.email.toLowerCase().includes(query)
//         );
//     }, [teachers, searchTerm]);

//     const activeTeachers = teachers.filter(
//         (teacher) => teacher.status === 'Active'
//     ).length;

//     const recentlyAdded = teachers.filter(
//         (teacher) => teacher.joinedAt === 'Just now'
//     ).length;

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                     <h1 className="text-2xl font-bold text-slate-900">
//                         Teacher Management
//                     </h1>
//                     <p className="mt-1 text-sm text-slate-500">
//                         Add and manage teachers for your typing platform.
//                     </p>
//                 </div>

//                 <button
//                     onClick={() => {
//                         setError('');
//                         setSuccess('');
//                         setShowAddModal(true);
//                     }}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
//                 >
//                     <UserPlus size={18} />
//                     Add Teacher
//                 </button>
//             </div>

//             {/* Error */}
//             {error && !showAddModal && (
//                 <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                     <AlertCircle size={18} className="mt-0.5 shrink-0" />
//                     <span>{error}</span>
//                 </div>
//             )}

//             {/* Success */}
//             {success && !showAddModal && (
//                 <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//                     <CheckCircle2 size={18} />
//                     <span>{success}</span>
//                 </div>
//             )}

//             {/* Stats */}
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-slate-500">
//                                 Total Teachers
//                             </p>
//                             <p className="mt-2 text-3xl font-bold text-slate-900">
//                                 {teachers.length}
//                             </p>
//                         </div>

//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                             <Users size={22} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-slate-500">
//                                 Active Teachers
//                             </p>
//                             <p className="mt-2 text-3xl font-bold text-slate-900">
//                                 {activeTeachers}
//                             </p>
//                         </div>

//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
//                             <CheckCircle2 size={22} />
//                         </div>
//                     </div>
//                 </div>

//                 <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//                     <div className="flex items-center justify-between">
//                         <div>
//                             <p className="text-sm font-medium text-slate-500">
//                                 Recently Added
//                             </p>
//                             <p className="mt-2 text-3xl font-bold text-slate-900">
//                                 {recentlyAdded}
//                             </p>
//                         </div>

//                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
//                             <Clock3 size={22} />
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Search */}
//             <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
//                 <div className="relative">
//                     <Search
//                         size={18}
//                         className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//                     />

//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={(event) => setSearchTerm(event.target.value)}
//                         placeholder="Search teachers by name or email..."
//                         className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
//                     />
//                 </div>
//             </div>

//             {/* Teacher List */}
//             <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//                 <div className="border-b border-slate-200 px-5 py-4">
//                     <h2 className="font-semibold text-slate-900">Teachers</h2>
//                 </div>

//                 {isLoading ? (
//                     <div className="flex min-h-[240px] items-center justify-center">
//                         <div className="flex items-center gap-3 text-sm text-slate-500">
//                             <Loader2 size={20} className="animate-spin text-blue-600" />
//                             Loading teachers...
//                         </div>
//                     </div>
//                 ) : filteredTeachers.length === 0 ? (
//                     <div className="flex min-h-[240px] flex-col items-center justify-center px-6 text-center">
//                         <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
//                             <Users size={26} />
//                         </div>

//                         <h3 className="mt-4 font-semibold text-slate-900">
//                             No teachers found
//                         </h3>

//                         <p className="mt-1 max-w-md text-sm text-slate-500">
//                             {searchTerm
//                                 ? 'Try a different name or email search.'
//                                 : 'Add your first teacher to get started.'}
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="divide-y divide-slate-100">
//                         {filteredTeachers.map((teacher) => (
//                             <div
//                                 key={teacher.id}
//                                 className="flex flex-col gap-4 px-5 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
//                             >
//                                 <div className="flex min-w-0 items-center gap-4">
//                                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
//                                         {teacher.name
//                                             .split(' ')
//                                             .map((part) => part[0])
//                                             .slice(0, 2)
//                                             .join('')
//                                             .toUpperCase()}
//                                     </div>

//                                     <div className="min-w-0">
//                                         <h3 className="truncate font-semibold text-slate-900">
//                                             {teacher.name}
//                                         </h3>

//                                         <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
//                                             <Mail size={15} className="shrink-0" />
//                                             <span className="truncate">{teacher.email}</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-center gap-4 sm:shrink-0">
//                                     <span
//                                         className={`rounded-full px-3 py-1 text-xs font-semibold ${teacher.status === 'Active'
//                                             ? 'bg-green-100 text-green-700'
//                                             : 'bg-blue-100 text-blue-700'
//                                             }`}
//                                     >
//                                         {teacher.status}
//                                     </span>

//                                     <span className="text-xs text-slate-400">
//                                         {teacher.joinedAt}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* Information */}
//             <div className="rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
//                 <div className="flex items-start gap-3">
//                     <CheckCircle2
//                         size={19}
//                         className="mt-0.5 shrink-0 text-blue-600"
//                     />

//                     <div>
//                         <p className="text-sm font-semibold text-blue-900">
//                             Teacher account management
//                         </p>
//                         <p className="mt-1 text-sm leading-6 text-blue-700">
//                             Teachers added here are saved permanently in the database.
//                             Teachers receive an invitation email where they can set their own password.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Add Teacher Modal */}
//             {showAddModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
//                     <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
//                         {/* Modal Header */}
//                         <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
//                             <div>
//                                 <h2 className="text-lg font-bold text-slate-900">
//                                     Add Teacher
//                                 </h2>
//                                 <p className="mt-1 text-sm text-slate-500">
//                                     Add teacher details to your platform.
//                                 </p>
//                             </div>

//                             <button
//                                 type="button"
//                                 onClick={resetModal}
//                                 disabled={isAdding}
//                                 className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
//                             >
//                                 <X size={20} />
//                             </button>
//                         </div>

//                         {/* Modal Form */}
//                         <form onSubmit={handleAddTeacher} className="space-y-5 px-6 py-6">
//                             {error && (
//                                 <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//                                     <AlertCircle size={18} className="mt-0.5 shrink-0" />
//                                     <span>{error}</span>
//                                 </div>
//                             )}

//                             {success && (
//                                 <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
//                                     <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
//                                     <span>{success}</span>
//                                 </div>
//                             )}

//                             <div>
//                                 <label
//                                     htmlFor="teacher-name"
//                                     className="mb-2 block text-sm font-semibold text-slate-700"
//                                 >
//                                     Full Name
//                                 </label>

//                                 <input
//                                     id="teacher-name"
//                                     type="text"
//                                     value={name}
//                                     onChange={(event) => setName(event.target.value)}
//                                     placeholder="Enter teacher name"
//                                     disabled={isAdding}
//                                     autoFocus
//                                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
//                                 />
//                             </div>

//                             <div>
//                                 <label
//                                     htmlFor="teacher-email"
//                                     className="mb-2 block text-sm font-semibold text-slate-700"
//                                 >
//                                     Email Address
//                                 </label>

//                                 <input
//                                     id="teacher-email"
//                                     type="email"
//                                     value={email}
//                                     onChange={(event) => setEmail(event.target.value)}
//                                     placeholder="teacher@example.com"
//                                     disabled={isAdding}
//                                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50"
//                                 />
//                             </div>

//                             <div className="rounded-xl bg-slate-50 px-4 py-3">
//                                 <p className="text-xs leading-5 text-slate-500">
//                                     The teacher will receive an invitation email to set up their password and access the teacher account.
//                                 </p>
//                             </div>

//                             <div className="flex gap-3 pt-1">
//                                 <button
//                                     type="button"
//                                     onClick={resetModal}
//                                     disabled={isAdding}
//                                     className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                                 >
//                                     Cancel
//                                 </button>

//                                 <button
//                                     type="submit"
//                                     disabled={isAdding}
//                                     className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
//                                 >
//                                     {isAdding ? (
//                                         <>
//                                             <Loader2 size={17} className="animate-spin" />
//                                             Adding...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <UserPlus size={17} />
//                                             Add Teacher
//                                         </>
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };


















import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
  Loader2,
  UserPlus,
} from 'lucide-react';

import { supabase } from '../../lib/supabase';

interface Teacher {
  id: string;
  full_name: string;
  email: string;
  status: string;
  created_at: string;
}

export const TeacherManagementView: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTeacher, setSelectedTeacher] =
    useState<Teacher | null>(null);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // =========================================================
  // LOAD TEACHERS
  // =========================================================

  const loadTeachers = async () => {
    setLoading(true);
    setError('');

    const { data, error: fetchError } = await supabase
      .from('teachers')
      .select('id, full_name, email, status, created_at')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('Failed to load teachers:', fetchError);
      setError(
        fetchError.message || 'Failed to load teachers.'
      );
      setTeachers([]);
    } else {
      setTeachers((data || []) as Teacher[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  // =========================================================
  // ADD TEACHER
  // =========================================================

  const handleAddTeacher = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError('Please enter the teacher name.');
      return;
    }

    if (!cleanEmail) {
      setError('Please enter the teacher email.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSaving(true);

    const { data, error: insertError } = await supabase
      .from('teachers')
      .insert({
        full_name: cleanName,
        email: cleanEmail,
        status: 'Active',
      })
      .select(
        'id, full_name, email, status, created_at'
      )
      .single();

    if (insertError) {
      console.error(
        'Failed to add teacher:',
        insertError
      );

      if (
        insertError.message
          .toLowerCase()
          .includes('duplicate') ||
        insertError.message
          .toLowerCase()
          .includes('unique')
      ) {
        setError(
          'A teacher with this email already exists.'
        );
      } else {
        setError(
          insertError.message ||
            'Failed to add teacher.'
        );
      }

      setSaving(false);
      return;
    }

    if (data) {
      setTeachers((current) => [
        data as Teacher,
        ...current,
      ]);
    }

    setFullName('');
    setEmail('');
    setShowAddModal(false);
    setSaving(false);

    setSuccess(
      `${cleanName} has been added as an authorized teacher.`
    );

    window.setTimeout(() => {
      setSuccess('');
    }, 4000);
  };

  // =========================================================
  // DELETE TEACHER
  // =========================================================

  const openDeleteModal = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setError('');
    setShowDeleteModal(true);
  };

  const handleDeleteTeacher = async () => {
    if (!selectedTeacher) return;

    setDeleting(true);
    setError('');
    setSuccess('');

    const { error: deleteError } = await supabase
      .from('teachers')
      .delete()
      .eq('id', selectedTeacher.id);

    if (deleteError) {
      console.error(
        'Failed to delete teacher:',
        deleteError
      );

      setError(
        deleteError.message ||
          'Failed to remove teacher.'
      );

      setDeleting(false);
      return;
    }

    setTeachers((current) =>
      current.filter(
        (teacher) =>
          teacher.id !== selectedTeacher.id
      )
    );

    const deletedName = selectedTeacher.full_name;

    setSelectedTeacher(null);
    setShowDeleteModal(false);
    setDeleting(false);

    setSuccess(
      `${deletedName} has been removed and teacher access has been revoked.`
    );

    window.setTimeout(() => {
      setSuccess('');
    }, 4500);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredTeachers = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    if (!query) return teachers;

    return teachers.filter((teacher) => {
      return (
        teacher.full_name
          .toLowerCase()
          .includes(query) ||
        teacher.email
          .toLowerCase()
          .includes(query)
      );
    });
  }, [teachers, searchQuery]);

  // =========================================================
  // STATS
  // =========================================================

  const totalTeachers = teachers.length;

  const activeTeachers = teachers.filter(
    (teacher) =>
      teacher.status.toLowerCase() === 'active'
  ).length;

  const recentlyAdded = teachers.filter(
    (teacher) => {
      const createdAt = new Date(
        teacher.created_at
      ).getTime();

      const sevenDaysAgo =
        Date.now() -
        7 * 24 * 60 * 60 * 1000;

      return createdAt >= sevenDaysAgo;
    }
  ).length;

  // =========================================================
  // HELPERS
  // =========================================================

  const getInitials = (name: string) => {
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (parts.length === 0) return 'T';

    if (parts.length === 1) {
      return parts[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return `${parts[0][0]}${parts[parts.length - 1][0]}`
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatRelativeDate = (
    dateString: string
  ) => {
    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
      return '';
    }

    const difference =
      Date.now() - date.getTime();

    const minutes = Math.floor(
      difference / (1000 * 60)
    );

    const hours = Math.floor(
      difference / (1000 * 60 * 60)
    );

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return formatDate(dateString);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full space-y-6">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden rounded-[24px] border border-slate-800 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#334d82] p-6 sm:p-8 shadow-xl">

        {/* Glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Instructor Portal
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Teacher Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100/75 sm:text-base">
              Manage authorized teachers, teacher accounts,
              and access to the TypeMaster Pro instructor portal.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                type="button"
                onClick={() => {
                  setFullName('');
                  setEmail('');
                  setError('');
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-600/30 active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Add Teacher
              </button>

              <button
                type="button"
                onClick={loadTeachers}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3 text-sm font-bold text-slate-200 transition-all hover:border-blue-500/50 hover:bg-slate-800 disabled:opacity-50"
              >
                <Clock3 className="h-4 w-4 text-blue-400" />
                Refresh
              </button>

            </div>
          </div>

          {/* Hero snapshot */}
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-[#020617]/80 p-5 shadow-xl lg:w-80">

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-black text-white">
                Teacher Access Snapshot
              </span>

              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>

            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100/60">
                  Authorized Teachers
                </span>

                <span className="font-mono text-sm font-black text-blue-400">
                  {totalTeachers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100/60">
                  Active Teachers
                </span>

                <span className="font-mono text-sm font-black text-emerald-400">
                  {activeTeachers}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-blue-100/60">
                  Added This Week
                </span>

                <span className="font-mono text-sm font-black text-cyan-400">
                  {recentlyAdded}
                </span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/30 bg-[#052e24] px-4 py-3 shadow-lg">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

          <div>
            <p className="text-sm font-black text-white">
              Success
            </p>

            <p className="mt-0.5 text-sm text-emerald-200/80">
              {success}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSuccess('')}
            className="ml-auto rounded-lg p-1 text-emerald-300 hover:bg-emerald-400/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error &&
        !showAddModal &&
        !showDeleteModal && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-500/30 bg-[#3b0a0a] px-4 py-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

            <div>
              <p className="text-sm font-black text-white">
                Something went wrong
              </p>

              <p className="mt-0.5 text-sm text-red-200/80">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError('')}
              className="ml-auto rounded-lg p-1 text-red-300 hover:bg-red-400/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-800 bg-[#020617] p-5 shadow-lg transition-all hover:-translate-y-0.5 hover:border-blue-500/40">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-blue-100/65">
                Total Teachers
              </p>

              <p className="mt-2 font-mono text-4xl font-black text-white">
                {totalTeachers}
              </p>

              <p className="mt-2 text-xs font-medium text-blue-400">
                All authorized teachers →
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <Users className="h-5 w-5 text-blue-400" />
            </div>

          </div>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-800 bg-[#020617] p-5 shadow-lg transition-all hover:-translate-y-0.5 hover:border-emerald-500/40">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-blue-100/65">
                Active Teachers
              </p>

              <p className="mt-2 font-mono text-4xl font-black text-white">
                {activeTeachers}
              </p>

              <p className="mt-2 text-xs font-medium text-emerald-400">
                Currently authorized →
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>

          </div>
        </div>

        {/* Recently added */}
        <div className="rounded-2xl border border-slate-800 bg-[#020617] p-5 shadow-lg transition-all hover:-translate-y-0.5 hover:border-cyan-500/40">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm font-medium text-blue-100/65">
                Recently Added
              </p>

              <p className="mt-2 font-mono text-4xl font-black text-white">
                {recentlyAdded}
              </p>

              <p className="mt-2 text-xs font-medium text-cyan-400">
                Last 7 days →
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
              <Clock3 className="h-5 w-5 text-cyan-400" />
            </div>

          </div>
        </div>

      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="rounded-2xl border border-slate-800 bg-[#020617] p-4 shadow-lg">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
            placeholder="Search teachers by name or email..."
            className="h-12 w-full rounded-xl border border-slate-700 bg-[#0b1224] pl-11 pr-4 text-sm font-medium text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />

        </div>
      </section>

      {/* =====================================================
          TEACHERS TABLE
      ===================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#020617] shadow-xl">

        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-400" />

              <h2 className="text-lg font-black text-white">
                Authorized Teachers
              </h2>
            </div>

            <p className="mt-1 text-xs text-blue-100/50">
              Manage teacher access to the instructor portal.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs font-bold text-blue-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            {filteredTeachers.length} Authorized
          </div>

        </div>

        {/* Column headings */}
        <div className="hidden grid-cols-[1.4fr_1.7fr_130px_110px_50px] gap-4 border-b border-slate-800 bg-[#0b1224] px-5 py-3 md:grid">

          <span className="text-[10px] font-black uppercase tracking-wider text-blue-300/50">
            Teacher
          </span>

          <span className="text-[10px] font-black uppercase tracking-wider text-blue-300/50">
            Email
          </span>

          <span className="text-[10px] font-black uppercase tracking-wider text-blue-300/50">
            Status
          </span>

          <span className="text-[10px] font-black uppercase tracking-wider text-blue-300/50">
            Added
          </span>

          <span />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-blue-500" />

            <p className="mt-3 text-sm font-medium text-blue-100/50">
              Loading teachers...
            </p>
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              {searchQuery ? (
                <Search className="h-6 w-6 text-blue-400" />
              ) : (
                <Users className="h-6 w-6 text-blue-400" />
              )}
            </div>

            <h3 className="mt-4 text-base font-black text-white">
              {searchQuery
                ? 'No teachers found'
                : 'No teachers added yet'}
            </h3>

            <p className="mt-1 max-w-sm text-sm text-blue-100/45">
              {searchQuery
                ? 'Try another teacher name or email.'
                : 'Add a teacher to authorize them for the Teacher portal.'}
            </p>

            {!searchQuery && (
              <button
                type="button"
                onClick={() =>
                  setShowAddModal(true)
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-500"
              >
                <Plus className="h-4 w-4" />
                Add Teacher
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-800">

            {filteredTeachers.map((teacher) => {

              const isActive =
                teacher.status.toLowerCase() ===
                'active';

              return (
                <div
                  key={teacher.id}
                  className="group px-5 py-4 transition-colors hover:bg-blue-500/[0.04]"
                >

                  {/* Desktop */}
                  <div className="hidden grid-cols-[1.4fr_1.7fr_130px_110px_50px] items-center gap-4 md:grid">

                    {/* Teacher */}
                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-sm font-black text-blue-400">
                        {getInitials(
                          teacher.full_name
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-white">
                          {teacher.full_name}
                        </p>

                        <p className="mt-0.5 text-[11px] text-blue-100/40">
                          Instructor
                        </p>
                      </div>

                    </div>

                    {/* Email */}
                    <div className="flex min-w-0 items-center gap-2">

                      <Mail className="h-4 w-4 shrink-0 text-blue-400/60" />

                      <span className="truncate text-sm text-blue-100/65">
                        {teacher.email}
                      </span>

                    </div>

                    {/* Status */}
                    <div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold ${
                          isActive
                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                            : 'border-slate-600 bg-slate-800 text-slate-400'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive
                              ? 'bg-emerald-400'
                              : 'bg-slate-500'
                          }`}
                        />

                        {teacher.status}
                      </span>
                    </div>

                    {/* Added */}
                    <div>
                      <p className="text-xs font-bold text-blue-100/70">
                        {formatRelativeDate(
                          teacher.created_at
                        )}
                      </p>

                      <p className="mt-0.5 text-[10px] text-blue-100/35">
                        {formatDate(
                          teacher.created_at
                        )}
                      </p>
                    </div>

                    {/* Delete */}
                    <div className="flex justify-end">

                      <button
                        type="button"
                        onClick={() =>
                          openDeleteModal(
                            teacher
                          )
                        }
                        title="Remove teacher"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-slate-500 opacity-0 transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>

                    </div>

                  </div>

                  {/* Mobile */}
                  <div className="flex items-start gap-3 md:hidden">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-sm font-black text-blue-400">
                      {getInitials(
                        teacher.full_name
                      )}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <p className="truncate text-sm font-black text-white">
                            {teacher.full_name}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">

                            <Mail className="h-3.5 w-3.5 shrink-0 text-blue-400/60" />

                            <span className="truncate text-xs text-blue-100/55">
                              {teacher.email}
                            </span>

                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(
                              teacher
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>

                      </div>

                      <div className="mt-3 flex items-center justify-between">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                            isActive
                              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                              : 'border-slate-700 bg-slate-800 text-slate-400'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive
                                ? 'bg-emerald-400'
                                : 'bg-slate-500'
                            }`}
                          />

                          {teacher.status}
                        </span>

                        <span className="text-[11px] text-blue-100/35">
                          {formatRelativeDate(
                            teacher.created_at
                          )}
                        </span>

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

      <section className="rounded-2xl border border-blue-500/20 bg-gradient-to-r from-[#020617] to-[#0f1d3b] p-5 shadow-lg">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
            <ShieldCheck className="h-5 w-5 text-blue-400" />
          </div>

          <div>
            <h3 className="text-sm font-black text-white">
              Teacher account management
            </h3>

            <p className="mt-1 text-sm leading-6 text-blue-100/55">
              Teachers added here are authorized to create
              their Teacher account using the same email
              address. Removing a teacher revokes their
              authorization.
            </p>
          </div>

        </div>
      </section>

      {/* =====================================================
          ADD TEACHER MODAL
      ===================================================== */}

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-[#020617] shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <UserPlus className="h-5 w-5 text-blue-400" />
                </div>

                <div>
                  <h2 className="text-lg font-black text-white">
                    Add Teacher
                  </h2>

                  <p className="text-xs text-blue-100/45">
                    Authorize a new teacher
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  if (!saving) {
                    setShowAddModal(false);
                    setError('');
                  }
                }}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleAddTeacher}
              className="space-y-5 px-6 py-6"
            >

              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                  <p className="text-sm text-red-300">
                    {error}
                  </p>

                </div>
              )}

              <div>
                <label
                  htmlFor="teacher-full-name"
                  className="mb-2 block text-xs font-bold text-blue-100/70"
                >
                  Full name
                </label>

                <input
                  id="teacher-full-name"
                  type="text"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(
                      event.target.value
                    )
                  }
                  placeholder="Enter teacher name"
                  disabled={saving}
                  className="h-12 w-full rounded-xl border border-slate-700 bg-[#0b1224] px-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="teacher-email"
                  className="mb-2 block text-xs font-bold text-blue-100/70"
                >
                  Email address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400/60" />

                  <input
                    id="teacher-email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="teacher@example.com"
                    disabled={saving}
                    className="h-12 w-full rounded-xl border border-slate-700 bg-[#0b1224] pl-11 pr-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                  />

                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3">

                <div className="flex gap-3">

                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />

                  <p className="text-xs leading-5 text-blue-100/65">
                    This email will be authorized as a
                    Teacher. The teacher must use this same
                    email when creating their Teacher account.
                  </p>

                </div>

              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    if (!saving) {
                      setShowAddModal(false);
                      setError('');
                    }
                  }}
                  disabled={saving}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add Teacher
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal &&
        selectedTeacher && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-[#020617] shadow-2xl">

              <div className="border-b border-slate-800 px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                    <Trash2 className="h-5 w-5 text-red-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-black text-white">
                      Remove Teacher
                    </h2>

                    <p className="text-xs text-blue-100/45">
                      Revoke teacher authorization
                    </p>
                  </div>

                </div>

              </div>

              <div className="px-6 py-6">

                {error && (
                  <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                    <p className="text-sm text-red-300">
                      {error}
                    </p>

                  </div>
                )}

                <p className="text-sm leading-6 text-blue-100/65">
                  Are you sure you want to remove this
                  teacher from the authorized teacher list?
                </p>

                <div className="mt-4 rounded-xl border border-slate-800 bg-[#0b1224] p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-black text-blue-400">
                      {getInitials(
                        selectedTeacher.full_name
                      )}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-black text-white">
                        {selectedTeacher.full_name}
                      </p>

                      <p className="truncate text-xs text-blue-100/45">
                        {selectedTeacher.email}
                      </p>

                    </div>

                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                  <p className="text-xs leading-5 text-red-200/75">
                    This removes the teacher from the
                    authorized list. If a Teacher account
                    already exists, its Teacher access will
                    also be revoked.
                  </p>

                </div>

              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-800 px-6 py-5 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => {
                    if (!deleting) {
                      setShowDeleteModal(false);
                      setSelectedTeacher(null);
                      setError('');
                    }
                  }}
                  disabled={deleting}
                  className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDeleteTeacher}
                  disabled={deleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-500 disabled:opacity-60"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Removing...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Remove Teacher
                    </>
                  )}
                </button>

              </div>

            </div>
          </div>
        )}

    </div>
  );
};

export default TeacherManagementView;