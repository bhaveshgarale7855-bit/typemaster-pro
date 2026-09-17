import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import Login from './Login';
import { Keyboard } from 'lucide-react';

export const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, role } = useAuth();
  const { setRole } = useApp();

  useEffect(() => {
    if (role) {
      setRole(role);
    }
  }, [role, setRole]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center">
            <Keyboard className="w-7 h-7 animate-pulse" />
          </div>
          <p className="text-sm text-slate-400">Checking your TypeMaster Pro session...</p>
        </div>
      </div>
    );
  }

  if (!role) {
    return <Login />;
  }

  return <>{children}</>;
};

export default AuthGate;
