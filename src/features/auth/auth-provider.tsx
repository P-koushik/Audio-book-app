import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import {
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../../services/firebase';
import { configureGoogleSignIn, signOutGoogle } from '../../services/auth/google';
import { syncSigninWithBackend } from './auth.api';
import { AuthContextType, AuthUser } from './auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const err = error as Record<string, unknown>;

    if (typeof err.message === 'string') {
      return err.message;
    }

    const response = err.response as Record<string, unknown> | undefined;
    if (typeof response?.message === 'string') {
      return response.message;
    }
  }

  return 'Something went wrong.';
};

const mapFirebaseUserToAuthUser = (firebaseUser: FirebaseUser): Exclude<AuthUser, null> => ({
  id: firebaseUser.uid,
  email: firebaseUser.email ?? undefined,
  name: firebaseUser.displayName ?? firebaseUser.email ?? undefined,
  photoUrl: firebaseUser.photoURL,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      configureGoogleSignIn();
    } catch (error) {
      console.warn('[AuthProvider] Google sign-in not ready', getAuthErrorMessage(error));
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      setIsLoading(true);

      try {
        if (!firebaseUser) {
          setUser(null);
          return;
        }

        setUser(mapFirebaseUserToAuthUser(firebaseUser));
        await syncSigninWithBackend();
      } catch (error) {
        console.error('[AuthProvider] Failed to sync auth state', getAuthErrorMessage(error));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const signOut = async () => {
    await signOutGoogle();
    await firebaseSignOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
