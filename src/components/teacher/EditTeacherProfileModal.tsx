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
import { supabase } from '../../lib/supabase';

interface TeacherProfileData {
  name: string;
  email: string;
  avatar: string;
  institution?: string;
}

interface EditTeacherProfileModalProps {
  teacher: TeacherProfileData;
  onClose: () => void;
  onSave: (name: string, avatar: string) => void | Promise<void>;
}

export const EditTeacherProfileModal: React.FC<
  EditTeacherProfileModalProps
> = ({ teacher, onClose, onSave }) => {
  const [name, setName] = useState(teacher.name);
  const [avatar, setAvatar] = useState(teacher.avatar);
  const [preview, setPreview] = useState(teacher.avatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(teacher.name);
    setAvatar(teacher.avatar);
    setPreview(teacher.avatar);
    setSelectedFile(null);
    setError('');
  }, [teacher]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }

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

    const fileExt =
      file.name.split('.').pop()?.toLowerCase() || 'jpg';

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
      throw new Error('Could not create profile image URL.');
    }

    return data.publicUrl;
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Name cannot be empty.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      let finalAvatar = avatar.trim();

      // Upload new PC photo if selected
      if (selectedFile) {
        finalAvatar = await uploadAvatar(selectedFile);
      }

      // Save name + avatar URL through AppContext
      await onSave(trimmedName, finalAvatar);

      setSaving(false);
      setUploading(false);

      onClose();
    } catch (err) {
      console.error(
        'Failed to update teacher profile:',
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : 'Failed to update profile.'
      );

      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (
          e.target === e.currentTarget &&
          !saving
        ) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Edit Profile
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              Update your teacher profile information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="space-y-5 p-5">

            {/* Profile Photo */}
            <div className="flex flex-col items-center">

              <div className="relative">

                <img
                  src={preview || teacher.avatar}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-md ring-4 ring-blue-50"
                  onError={(e) => {
                    e.currentTarget.src =
                      teacher.avatar;
                  }}
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  disabled={saving}
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 shadow-md transition-colors hover:bg-blue-700 disabled:opacity-50"
                  title="Choose profile photo"
                >
                  <Upload className="h-3.5 w-3.5 text-white" />
                </button>

              </div>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                disabled={saving}
                className="mt-3 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700"
              >
                Choose Profile Photo
              </button>

              <p className="mt-1 text-[10px] text-slate-400">
                JPG, PNG or WEBP • Max 5 MB
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Selected file */}
            {selectedFile && (
              <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2.5">

                <ImageIcon className="h-4 w-4 shrink-0 text-blue-600" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-slate-700">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

              </div>
            )}

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  disabled={saving}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-800 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:bg-slate-50"
                />
              </div>

              {!name.trim() && (
                <p className="mt-1 text-[11px] text-red-500">
                  Name cannot be empty.
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  value={teacher.email}
                  readOnly
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-500 outline-none"
                />
              </div>

              <p className="mt-1 text-[10px] text-slate-400">
                Email is currently read-only.
              </p>
            </div>

            {/* Institution */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                Institution
              </label>

              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={
                    teacher.institution ||
                    'TypeMaster Academy'
                  }
                  readOnly
                  className="h-11 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-500 outline-none"
                />
              </div>

              <p className="mt-1 text-[10px] text-slate-400">
                Institution is managed by the administrator.
              </p>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim() || saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  {uploading
                    ? 'Uploading...'
                    : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
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