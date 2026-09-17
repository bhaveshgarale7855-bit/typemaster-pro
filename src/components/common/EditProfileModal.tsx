// import React, { useEffect, useState } from 'react';
// import { X, User, Mail, Building2, Image as ImageIcon, Save } from 'lucide-react';
// import { StudentProfile } from '../../types';

// interface EditProfileModalProps {
//   student: StudentProfile;
//   onClose: () => void;
//   onSave: (name: string, avatar: string) => void;
// }

// export const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   student,
//   onClose,
//   onSave,
// }) => {
//   const [name, setName] = useState(student.name);
//   const [avatar, setAvatar] = useState(student.avatar);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     setName(student.name);
//     setAvatar(student.avatar);
//   }, [student]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const trimmedName = name.trim();
//     const trimmedAvatar = avatar.trim();

//     if (!trimmedName) {
//       return;
//     }

//     setSaving(true);

//     onSave(trimmedName, trimmedAvatar);

//     setTimeout(() => {
//       setSaving(false);
//       onClose();
//     }, 200);
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) {
//           onClose();
//         }
//       }}
//     >
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

//         {/* Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
//           <div>
//             <h2 className="text-base font-bold text-slate-900">
//               Edit Profile
//             </h2>

//             <p className="text-xs text-slate-500 mt-0.5">
//               Update your profile information
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
//             aria-label="Close"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit}>

//           <div className="p-5 space-y-5">

//             {/* Avatar Preview */}
//             <div className="flex flex-col items-center">
//               <div className="relative">
//                 <img
//                   src={avatar || student.avatar}
//                   alt="Profile preview"
//                   className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50 border-2 border-white shadow-md"
//                   onError={(e) => {
//                     e.currentTarget.src = student.avatar;
//                   }}
//                 />

//                 <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
//                   <ImageIcon className="w-3.5 h-3.5 text-white" />
//                 </div>
//               </div>

//               <p className="text-[11px] text-slate-400 mt-2">
//                 Profile preview
//               </p>
//             </div>

//             {/* Name */}
//             <div>
//               <label
//                 htmlFor="profile-name"
//                 className="block text-xs font-semibold text-slate-700 mb-1.5"
//               >
//                 Full Name
//               </label>

//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

//                 <input
//                   id="profile-name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your name"
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//                   autoComplete="name"
//                 />
//               </div>

//               {!name.trim() && (
//                 <p className="text-[11px] text-red-500 mt-1">
//                   Name cannot be empty.
//                 </p>
//               )}
//             </div>

//             {/* Email - Read Only */}
//             <div>
//               <label
//                 htmlFor="profile-email"
//                 className="block text-xs font-semibold text-slate-700 mb-1.5"
//               >
//                 Email
//               </label>

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

//                 <input
//                   id="profile-email"
//                   type="email"
//                   value={student.email}
//                   readOnly
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 outline-none cursor-not-allowed"
//                 />
//               </div>

//               <p className="text-[10px] text-slate-400 mt-1">
//                 Email is currently read-only.
//               </p>
//             </div>

//             {/* Batch - Read Only */}
//             <div>
//               <label
//                 htmlFor="profile-batch"
//                 className="block text-xs font-semibold text-slate-700 mb-1.5"
//               >
//                 Batch
//               </label>

//               <div className="relative">
//                 <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

//                 <input
//                   id="profile-batch"
//                   type="text"
//                   value={student.batchName}
//                   readOnly
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 outline-none cursor-not-allowed"
//                 />
//               </div>

//               <p className="text-[10px] text-slate-400 mt-1">
//                 Batch is managed by your instructor.
//               </p>
//             </div>

//             {/* Avatar URL */}
//             <div>
//               <label
//                 htmlFor="profile-avatar"
//                 className="block text-xs font-semibold text-slate-700 mb-1.5"
//               >
//                 Profile Image URL
//               </label>

//               <div className="relative">
//                 <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

//                 <input
//                   id="profile-avatar"
//                   type="url"
//                   value={avatar}
//                   onChange={(e) => setAvatar(e.target.value)}
//                   placeholder="https://example.com/avatar.jpg"
//                   className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//                 />
//               </div>

//               <p className="text-[10px] text-slate-400 mt-1">
//                 Paste a direct image URL to change your avatar.
//               </p>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-end gap-2 px-5 py-4 bg-slate-50 border-t border-slate-200">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={!name.trim() || saving}
//               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <Save className="w-3.5 h-3.5" />

//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };




















import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  User,
  Mail,
  Building2,
  Image as ImageIcon,
  Save,
  Upload,
  Loader2,
} from 'lucide-react';
import { StudentProfile } from '../../types';
import { supabase } from '../../lib/supabase';

interface EditProfileModalProps {
  student: StudentProfile;
  onClose: () => void;
  onSave: (name: string, avatar: string) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  student,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(student.name);
  const [avatar, setAvatar] = useState(student.avatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(student.avatar);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(student.name);
    setAvatar(student.avatar);
    setPreview(student.avatar);
    setSelectedFile(null);
    setError('');
  }, [student]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Allow only image files
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    // Maximum 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5 MB.');
      return;
    }

    setError('');
    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  const uploadAvatar = async (file: File): Promise<string> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error('User is not logged in.');
    }

    setUploading(true);

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';

    const filePath = `${user.id}/profile-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      throw new Error('Could not create image URL.');
    }

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Full name is required.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      let finalAvatar = avatar;

      if (selectedFile) {
        finalAvatar = await uploadAvatar(selectedFile);
      }

      onSave(trimmedName, finalAvatar);

      setTimeout(() => {
        setSaving(false);
        setUploading(false);
        onClose();
      }, 300);
    } catch (err) {
      console.error('Avatar upload failed:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to upload profile photo.'
      );

      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Edit Profile
            </h2>
            <p className="text-sm text-slate-500">
              Update your profile information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Profile Photo */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={preview}
                alt="Profile preview"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-slate-100"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://ui-avatars.com/api/?name=Student&background=e2e8f0&color=334155';
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={saving}
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
                title="Choose profile photo"
              >
                <Upload size={17} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={saving}
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Choose Profile Photo
            </button>

            <p className="text-xs text-slate-400 mt-1">
              JPG, PNG or WEBP • Max 5 MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-slate-900"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={student.email}
                disabled
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm"
              />
            </div>
          </div>

          {/* Batch */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Batch
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={student.batchName}
                disabled
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm"
              />
            </div>
          </div>

          {/* Selected file info */}
          {selectedFile && (
            <div className="flex items-center gap-3 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2.5">
              <ImageIcon size={18} className="text-blue-600" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {selectedFile.name}
                </p>

                <p className="text-xs text-slate-400">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium text-sm hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm hover:bg-blue-700 transition disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};