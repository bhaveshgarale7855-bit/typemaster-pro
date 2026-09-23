// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState
// } from 'react';
// import type { Session, User } from '@supabase/supabase-js';
// import { supabase } from '../lib/supabase';

// export type AuthRole = 'student' | 'teacher' | 'admin';

// type AuthContextValue = {
//   session: Session | null;
//   user: User | null;
//   role: AuthRole | null;
//   loading: boolean;
//   isPasswordRecovery: boolean;

//   signIn: (
//     email: string,
//     password: string,
//     requestedRole: AuthRole
//   ) => Promise<void>;

//   signUpStudent: (
//     name: string,
//     email: string,
//     password: string
//   ) => Promise<{ needsEmailConfirmation: boolean }>;

//   signOut: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// function getMetadataRole(user: User | null): AuthRole | null {
//   if (!user) return null;

//   const role = user.user_metadata?.role;

//   if (role === 'admin') return 'admin';
//   if (role === 'teacher') return 'teacher';

//   return 'student';
// }

// async function getDatabaseRole(user: User): Promise<AuthRole> {
//   const { data: profile, error } = await supabase
//     .from('profiles')
//     .select('role')
//     .eq('id', user.id)
//     .maybeSingle();

//   if (error) {
//     console.error('Failed to load user role:', error);
//     return getMetadataRole(user) ?? 'student';
//   }

//   if (profile?.role === 'admin') return 'admin';
//   if (profile?.role === 'teacher') return 'teacher';

//   return 'student';
// }

// export const AuthProvider: React.FC<{
//   children: React.ReactNode;
// }> = ({ children }) => {
//   const [session, setSession] = useState<Session | null>(null);
//   const [role, setRole] = useState<AuthRole | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isPasswordRecovery, setIsPasswordRecovery] =
//     useState(false);

//   useEffect(() => {
//     let mounted = true;

//     const loadSession = async () => {
//       const { data, error } = await supabase.auth.getSession();

//       if (!mounted) return;

//       if (error) {
//         console.error('Supabase getSession error:', error);
//         setSession(null);
//         setRole(null);
//         setLoading(false);
//         return;
//       }

//       const currentSession = data.session ?? null;
//       const recovery =
//         window.location.hash.includes('type=recovery');

//       if (recovery) {
//         setIsPasswordRecovery(true);
//       }

//       setSession(currentSession);

//       if (currentSession?.user) {
//         const actualRole = await getDatabaseRole(
//           currentSession.user
//         );

//         if (!mounted) return;

//         setRole(actualRole);
//       } else {
//         setRole(null);
//       }

//       setLoading(false);
//     };

//     loadSession();

//     const { data: listener } =
//       supabase.auth.onAuthStateChange(
//         async (event, nextSession) => {
//           if (!mounted) return;

//           if (event === 'PASSWORD_RECOVERY') {
//             setIsPasswordRecovery(true);
//           }

//           if (event === 'SIGNED_OUT') {
//             setIsPasswordRecovery(false);
//           }

//           setSession(nextSession);

//           if (nextSession?.user) {
//             const actualRole = await getDatabaseRole(
//               nextSession.user
//             );

//             if (!mounted) return;

//             setRole(actualRole);
//           } else {
//             setRole(null);
//           }

//           setLoading(false);
//         }
//       );

//     return () => {
//       mounted = false;
//       listener.subscription.unsubscribe();
//     };
//   }, []);

//   const value = useMemo<AuthContextValue>(
//     () => ({
//       session,
//       user: session?.user ?? null,
//       role,
//       loading,
//       isPasswordRecovery,


//       async signIn(
//         email,
//         password,
//         requestedRole
//       ) {
//         const { data, error } =
//           await supabase.auth.signInWithPassword({
//             email: email.trim(),
//             password,
//           });

//         if (error) throw error;

//         if (!data.user) {
//           throw new Error(
//             'Login succeeded but no user was returned.'
//           );
//         }

//         // IMPORTANT:
//         // Check the real role from public.profiles
//         const actualRole = await getDatabaseRole(
//           data.user
//         );

//         if (actualRole !== requestedRole) {
//           await supabase.auth.signOut();

//           throw new Error(
//             requestedRole === 'admin'
//               ? 'This account is not registered as Admin.'
//               : requestedRole === 'teacher'
//                 ? 'This account is not registered as Teacher.'
//                 : 'This account is not registered as a Student.'
//           );
//         }

//         setRole(actualRole);
//       },

//       async signUpStudent(
//         name,
//         email,
//         password
//       ) {
//         const { data, error } =
//           await supabase.auth.signUp({
//             email: email.trim(),
//             password,
//             options: {
//               data: {
//                 name: name.trim(),
//                 role: 'student',
//               },
//             },
//           });

//         if (error) throw error;

//         return {
//           needsEmailConfirmation: !data.session,
//         };
//       },

//       async signOut() {
//         const { error } =
//           await supabase.auth.signOut();

//         if (error) throw error;

//         setRole(null);
//         setSession(null);
//         setIsPasswordRecovery(false);
//       },
//     }),
//     [loading, role, session, isPasswordRecovery]
//   );

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth(): AuthContextValue {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       'useAuth must be used inside AuthProvider.'
//     );
//   }

//   return context;
// }










import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export type AuthRole = 'student' | 'teacher' | 'admin';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: AuthRole | null;
  loading: boolean;

  // True when Supabase has opened a password-recovery session.
  isPasswordRecovery: boolean;

  signIn: (
    email: string,
    password: string,
    requestedRole: AuthRole
  ) => Promise<void>;

  signUpStudent: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ needsEmailConfirmation: boolean }>;

  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

function getMetadataRole(user: User | null): AuthRole | null {
  if (!user) return null;

  const role = user.user_metadata?.role;

  if (role === 'admin') return 'admin';
  if (role === 'teacher') return 'teacher';

  return 'student';
}

async function getDatabaseRole(user: User): Promise<AuthRole> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Failed to load user role:', error);

    return getMetadataRole(user) ?? 'student';
  }

  if (profile?.role === 'admin') return 'admin';
  if (profile?.role === 'teacher') return 'teacher';

  return 'student';
}

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);

  const [role, setRole] = useState<AuthRole | null>(null);

  const [loading, setLoading] = useState(true);

  const [isPasswordRecovery, setIsPasswordRecovery] =
    useState(false);

  useEffect(() => {
    let mounted = true;

    /*
     * IMPORTANT:
     * Register the auth listener BEFORE getSession().
     *
     * This prevents the PASSWORD_RECOVERY event from being
     * missed during the password-reset redirect.
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, nextSession) => {
        if (!mounted) return;

        console.log(
          '[AuthContext] Auth event:',
          event
        );

        /*
         * Supabase sends PASSWORD_RECOVERY when the user
         * opens a valid password-reset link.
         */
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true);
        }

        /*
         * Only leave recovery mode after the user is
         * actually signed out.
         */
        if (event === 'SIGNED_OUT') {
          setIsPasswordRecovery(false);
        }

        setSession(nextSession);

        if (nextSession?.user) {
          const actualRole = await getDatabaseRole(
            nextSession.user
          );

          if (!mounted) return;

          setRole(actualRole);
        } else {
          setRole(null);
        }

        setLoading(false);
      }
    );

    /*
     * Load the current session after the listener is ready.
     */
    const loadSession = async () => {
      const { data, error } =
        await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        console.error(
          'Supabase getSession error:',
          error
        );

        setSession(null);
        setRole(null);
        setLoading(false);

        return;
      }

      const currentSession =
        data.session ?? null;

      setSession(currentSession);

      if (currentSession?.user) {
        const actualRole =
          await getDatabaseRole(
            currentSession.user
          );

        if (!mounted) return;

        setRole(actualRole);
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    loadSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,

      user: session?.user ?? null,

      role,

      loading,

      isPasswordRecovery,

      async signIn(
        email,
        password,
        requestedRole
      ) {
        const { data, error } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (error) {
          throw error;
        }

        if (!data.user) {
          throw new Error(
            'Login succeeded but no user was returned.'
          );
        }

        /*
         * Always check the actual role from
         * public.profiles.
         */
        const actualRole =
          await getDatabaseRole(data.user);

        if (actualRole !== requestedRole) {
          await supabase.auth.signOut();

          throw new Error(
            requestedRole === 'admin'
              ? 'This account is not registered as Admin.'
              : requestedRole === 'teacher'
                ? 'This account is not registered as Teacher.'
                : 'This account is not registered as a Student.'
          );
        }

        setRole(actualRole);

        /*
         * A normal login is NOT a recovery session.
         */
        setIsPasswordRecovery(false);
      },

      async signUpStudent(
        name,
        email,
        password
      ) {
        const { data, error } =
          await supabase.auth.signUp({
            email: email.trim(),
            password,

            options: {
              data: {
                name: name.trim(),
                role: 'student',
              },
            },
          });

        if (error) {
          throw error;
        }

        return {
          needsEmailConfirmation:
            !data.session,
        };
      },

      async signOut() {
        const { error } =
          await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        setRole(null);
        setSession(null);

        setIsPasswordRecovery(false);
      },
    }),
    [
      loading,
      role,
      session,
      isPasswordRecovery,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider.'
    );
  }

  return context;
}