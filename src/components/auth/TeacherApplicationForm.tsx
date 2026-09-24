import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    ArrowLeft,
    Upload,
    User,
    Mail,
    Phone,
    BriefcaseBusiness,
    GraduationCap,
    FileText,
    Send,
} from 'lucide-react';
const MAX_PHOTO_SIZE = 2 * 1024 * 1024;
const MAX_DOCUMENT_SIZE = 5 * 1024 * 1024;
const MAX_OTHER_DOCUMENTS = 5;

interface TeacherApplicationFormProps {
    onBack: () => void;
}

export const TeacherApplicationForm: React.FC<
    TeacherApplicationFormProps
> = ({ onBack }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        qualification: '',
        experience: '',
        hasOwnCenter: '',
        centerName: '',
        centerAddress: '',
        message: '',
    });

    const [photo, setPhoto] = useState<File | null>(null);
    const [idProof, setIdProof] = useState<File | null>(null);
    const [documents, setDocuments] = useState<File[]>([]);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const updateField = (
        field: keyof typeof form,
        value: string
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const uploadTeacherFile = async (
        file: File,
        folder: string
    ) => {
        const safeName = file.name
            .replace(/[^a-zA-Z0-9._-]/g, '_');

        const path = `${folder}/${crypto.randomUUID()}-${safeName}`;

        const { data, error } = await supabase.functions.invoke(
            'submit-teacher-application',
            {
                body: {
                    action: 'create-upload-url',
                    path,
                },
            }
        );

        if (error) {
            throw new Error(
                error.message || 'Unable to create upload URL.'
            );
        }

        if (!data?.token || !data?.path) {
            throw new Error(
                'Upload URL was not created.'
            );
        }

        const { error: uploadError } =
            await supabase.storage
                .from('teacher-applications')
                .uploadToSignedUrl(
                    data.path,
                    data.token,
                    file
                );

        if (uploadError) {
            throw new Error(
                uploadError.message ||
                `Unable to upload ${file.name}.`
            );
        }

        return data.path;
    };

    // const handleSubmit = async (
    //     event: React.FormEvent
    // ) => {
    //     event.preventDefault();

    //     setError('');
    //     setSuccess('');

    //     if (!form.name.trim()) {
    //         setError('Please enter your full name.');
    //         return;
    //     }

    //     if (!form.email.trim() || !form.email.includes('@')) {
    //         setError('Please enter a valid email address.');
    //         return;
    //     }

    //     if (!form.phone.trim()) {
    //         setError('Please enter your mobile number.');
    //         return;
    //     }

    //     if (!form.occupation.trim()) {
    //         setError('Please enter your occupation.');
    //         return;
    //     }

    //     if (!form.qualification.trim()) {
    //         setError('Please enter your qualification.');
    //         return;
    //     }

    //     if (!photo) {
    //         setError('Please upload your profile photo.');
    //         return;
    //     }

    //     if (!form.hasOwnCenter) {
    //         setError(
    //             'Please select whether you have your own coaching center.'
    //         );
    //         return;
    //     }

    //     if (!form.centerName.trim()) {
    //         setError('Please enter the coaching center name.');
    //         return;
    //     }

    //     if (!form.centerAddress.trim()) {
    //         setError('Please enter the coaching center address.');
    //         return;
    //     }

    //     if (!idProof) {
    //         setError('Please upload your ID proof.');
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         /*
    //          * Email sending will be connected in the next step.
    //          * For now we only validate the complete application.
    //          */

    //         await new Promise((resolve) =>
    //             setTimeout(resolve, 700)
    //         );

    //         setSuccess(
    //             'Application form is ready. Email submission will be connected next.'
    //         );
    //     } catch {
    //         setError(
    //             'Unable to submit application. Please try again.'
    //         );
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (
        event: React.FormEvent
    ) => {
        event.preventDefault();

        setError('');
        setSuccess('');

        if (!form.name.trim()) {
            setError('Please enter your full name.');
            return;
        }

        if (
            !form.email.trim() ||
            !form.email.includes('@')
        ) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!form.phone.trim()) {
            setError('Please enter your mobile number.');
            return;
        }

        if (!form.occupation.trim()) {
            setError('Please enter your occupation.');
            return;
        }

        if (!form.qualification.trim()) {
            setError('Please enter your qualification.');
            return;
        }

        if (!photo) {
            setError('Please upload your profile photo.');
            return;
        }

        if (!form.hasOwnCenter) {
            setError(
                'Please select whether you have your own coaching center.'
            );
            return;
        }

        if (!form.centerName.trim()) {
            setError('Please enter the coaching center name.');
            return;
        }

        if (!form.centerAddress.trim()) {
            setError('Please enter the coaching center address.');
            return;
        }

        if (!idProof) {
            setError('Please upload your ID proof.');
            return;
        }

        setLoading(true);

        try {
            /*
             * 1. Upload profile photo
             */
            const photoPath = await uploadTeacherFile(
                photo,
                'photos'
            );

            /*
             * 2. Upload ID proof
             */
            const idProofPath = await uploadTeacherFile(
                idProof,
                'id-proofs'
            );

            /*
             * 3. Upload optional other documents
             */
            const otherDocuments = [];

            for (const file of documents) {
                const path = await uploadTeacherFile(
                    file,
                    'other-documents'
                );

                otherDocuments.push({
                    name: file.name,
                    path,
                });
            }

            /*
             * 4. Save application + send email
             */
            const { data, error: functionError } =
                await supabase.functions.invoke(
                    'submit-teacher-application',
                    {
                        body: {
                            action: 'submit-application',

                            name: form.name.trim(),
                            email: form.email.trim(),
                            phone: form.phone.trim(),
                            occupation:
                                form.occupation.trim(),
                            qualification:
                                form.qualification.trim(),
                            experience:
                                form.experience.trim(),

                            hasOwnCenter:
                                form.hasOwnCenter === 'yes',

                            centerName:
                                form.centerName.trim(),

                            centerAddress:
                                form.centerAddress.trim(),

                            message:
                                form.message.trim(),

                            photoPath,
                            idProofPath,
                            otherDocuments,
                        },
                    }
                );

            if (functionError) {
                throw new Error(
                    functionError.message ||
                    'Unable to submit application.'
                );
            }

            if (!data?.success) {
                throw new Error(
                    data?.error ||
                    'Unable to submit application.'
                );
            }

            /*
             * Success
             */
            setSuccess(
                'Your teacher application has been submitted successfully.'
            );

            /*
             * Clear uploaded file states
             */
            setPhoto(null);
            setIdProof(null);
            setDocuments([]);

            /*
             * Clear form
             */
            setForm({
                name: '',
                email: '',
                phone: '',
                occupation: '',
                qualification: '',
                experience: '',
                hasOwnCenter: '',
                centerName: '',
                centerAddress: '',
                message: '',
            });
        } catch (err) {
            console.error(
                'Teacher application error:',
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : 'Unable to submit application. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        // <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-8">
        <div className="w-full h-full max-h-[92vh] overflow-y-auto bg-slate-50 text-slate-900 px-4 py-6 sm:px-6 sm:py-8">
            {/* <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"> */}
            <div className="w-full max-w-4xl mx-auto bg-slate-50 rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 sm:px-10 py-7 text-white">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Teacher Login
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                            <GraduationCap className="w-6 h-6" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-black">
                                Teacher Application
                            </h1>

                            <p className="text-sm text-blue-100 mt-1">
                                Submit your details to apply as a TypeMaster Pro teacher.
                            </p>
                        </div>
                    </div>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="p-6 sm:p-10 space-y-6"
                >

                    {/* PHOTO */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                            Profile Photo
                        </label>

                        <label className="flex items-center gap-4 border-2 border-dashed border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition">
                            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center overflow-hidden">
                                {photo ? (
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="Profile preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-6 h-6" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-black">
                                    {photo
                                        ? photo.name
                                        : 'Upload profile photo'}
                                </p>

                                <p className="text-xs text-slate-500 mt-1">
                                    JPG or PNG • Maximum 2 MB
                                </p>
                            </div>

                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    if (file.size > MAX_PHOTO_SIZE) {
                                        setError('Profile photo must be 2 MB or smaller.');
                                        e.target.value = '';
                                        setPhoto(null);
                                        return;
                                    }

                                    setError('');
                                    setPhoto(file);
                                }}
                            />
                        </label>
                    </div>

                    {/* NAME + EMAIL */}
                    <div className="grid sm:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Full Name
                            </label>

                            <div className="relative">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        updateField('name', e.target.value)
                                    }
                                    placeholder="Enter full name"
                                    // className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        updateField('email', e.target.value)
                                    }
                                    placeholder="teacher@example.com"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PHONE + OCCUPATION */}
                    <div className="grid sm:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Mobile Number
                            </label>

                            <div className="relative">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) =>
                                        updateField('phone', e.target.value)
                                    }
                                    placeholder="Enter mobile number"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Occupation
                            </label>

                            <div className="relative">
                                <BriefcaseBusiness className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                <input
                                    type="text"
                                    value={form.occupation}
                                    onChange={(e) =>
                                        updateField(
                                            'occupation',
                                            e.target.value
                                        )
                                    }
                                    placeholder="Current occupation"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* QUALIFICATION + EXPERIENCE */}
                    <div className="grid sm:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Qualification
                            </label>

                            <input
                                type="text"
                                value={form.qualification}
                                onChange={(e) =>
                                    updateField(
                                        'qualification',
                                        e.target.value
                                    )
                                }
                                placeholder="BCA, B.Ed, M.Sc, etc."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Teaching Experience
                            </label>

                            <input
                                type="text"
                                value={form.experience}
                                onChange={(e) =>
                                    updateField(
                                        'experience',
                                        e.target.value
                                    )
                                }
                                placeholder="Example: 2 years"
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* COACHING CENTER DETAILS */}
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-3">
                                Do you have your own coaching center?
                            </label>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <label
                                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ${form.hasOwnCenter === 'yes'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-300 bg-white hover:border-blue-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="hasOwnCenter"
                                        value="yes"
                                        checked={form.hasOwnCenter === 'yes'}
                                        onChange={(e) =>
                                            updateField(
                                                'hasOwnCenter',
                                                e.target.value
                                            )
                                        }
                                        className="accent-blue-600"
                                    />

                                    <span className="text-sm font-semibold text-slate-700">
                                        Yes, I have my own coaching center
                                    </span>
                                </label>

                                <label
                                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition ${form.hasOwnCenter === 'no'
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-300 bg-white hover:border-blue-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="hasOwnCenter"
                                        value="no"
                                        checked={form.hasOwnCenter === 'no'}
                                        onChange={(e) =>
                                            updateField(
                                                'hasOwnCenter',
                                                e.target.value
                                            )
                                        }
                                        className="accent-blue-600"
                                    />

                                    <span className="text-sm font-semibold text-slate-700">
                                        No, I work at a coaching center
                                    </span>
                                </label>
                            </div>
                        </div>

                        {form.hasOwnCenter && (
                            <>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-2">
                                        {form.hasOwnCenter === 'yes'
                                            ? 'Your Coaching Center Name'
                                            : 'Where You Work – Coaching Center Name'}
                                    </label>

                                    <input
                                        type="text"
                                        value={form.centerName}
                                        onChange={(e) =>
                                            updateField(
                                                'centerName',
                                                e.target.value
                                            )
                                        }
                                        placeholder={
                                            form.hasOwnCenter === 'yes'
                                                ? 'Enter your coaching center name'
                                                : 'Enter the coaching center name'
                                        }
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-2">
                                        {form.hasOwnCenter === 'yes'
                                            ? 'Your Coaching Center Address'
                                            : 'Coaching Center Address'}
                                    </label>

                                    <textarea
                                        value={form.centerAddress}
                                        onChange={(e) =>
                                            updateField(
                                                'centerAddress',
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        placeholder="Enter complete coaching center address"
                                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* ID PROOF */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                            ID Proof
                        </label>

                        <label className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
                            <FileText className="w-5 h-5 text-blue-600" />

                            <span className="text-sm font-semibold truncate">
                                {idProof
                                    ? idProof.name
                                    : 'Upload ID proof • Maximum 5 MB'}
                            </span>

                            <Upload className="w-4 h-4 ml-auto text-slate-400" />

                            <input
                                type="file"
                                accept=".pdf,image/png,image/jpeg"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];

                                    if (!file) return;

                                    if (file.size > MAX_DOCUMENT_SIZE) {
                                        setError('ID proof must be 5 MB or smaller.');
                                        e.target.value = '';
                                        setIdProof(null);
                                        return;
                                    }

                                    setError('');
                                    setIdProof(file);
                                }}
                            />
                        </label>
                    </div>

                    {/* OTHER DOCUMENTS */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                            Other Documents
                            <span className="font-normal text-slate-400">
                                {' '}
                                (optional)
                            </span>
                        </label>

                        <label className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 cursor-pointer hover:border-blue-400 transition">
                            <FileText className="w-5 h-5 text-blue-600" />

                            <span className="text-sm font-semibold truncate">
                                {documents.length
                                    ? `${documents.length} document(s) selected`
                                    : 'Upload certificates or other documents • Maximum 5 MB each • Maximum 5 files'}
                            </span>

                            <Upload className="w-4 h-4 ml-auto text-slate-400" />

                            <input
                                type="file"
                                multiple
                                accept=".pdf,image/png,image/jpeg"
                                className="hidden"
                                onChange={(e) => {
                                    const newFiles = Array.from(e.target.files ?? []);

                                    if (newFiles.length === 0) return;

                                    // Existing + newly selected files
                                    const combinedFiles = [...documents, ...newFiles];

                                    // Maximum 5 files
                                    if (combinedFiles.length > MAX_OTHER_DOCUMENTS) {
                                        setError(
                                            `You can upload a maximum of ${MAX_OTHER_DOCUMENTS} documents.`
                                        );
                                        e.target.value = '';
                                        return;
                                    }

                                    // Maximum 5 MB per file
                                    const oversizedFile = newFiles.find(
                                        (file) => file.size > MAX_DOCUMENT_SIZE
                                    );

                                    if (oversizedFile) {
                                        setError(
                                            `"${oversizedFile.name}" is larger than 5 MB.`
                                        );
                                        e.target.value = '';
                                        return;
                                    }

                                    setError('');
                                    setDocuments(combinedFiles);

                                    // Allows selecting more files again
                                    e.target.value = '';
                                }}
                            />

                            {documents.length > 0 && (
                                <div className="mt-3 space-y-2">
                                    {documents.map((file, index) => (
                                        <div
                                            key={`${file.name}-${file.size}-${index}`}
                                            className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                                        >
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-700">
                                                    {file.name}
                                                </p>

                                                <p className="text-xs text-slate-500 mt-1">
                                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setDocuments(
                                                        documents.filter((_, i) => i !== index)
                                                    );
                                                }}
                                                className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </label>
                    </div>

                    {/* MESSAGE */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                            Additional Information
                        </label>

                        <textarea
                            value={form.message}
                            onChange={(e) =>
                                updateField('message', e.target.value)
                            }
                            rows={4}
                            placeholder="Tell us briefly about yourself..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

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
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Preparing Application...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Submit Teacher Application
                            </>
                        )}
                    </button>

                    <p className="text-[11px] text-center text-slate-400">
                        Your application will be reviewed manually.
                    </p>

                </form>
            </div>
        </div>
    );
};

export default TeacherApplicationForm;