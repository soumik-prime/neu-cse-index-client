'use client';

import React, { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { authService } from '@/lib/services/auth.service';
import type { AuthUser } from '@/lib/types/auth.interface';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, registrationNo: string, batch: number) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialMount = useRef(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      if (!isInitialMount.current) {
        setIsLoading(true);
      }
      setError(null);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setUser(null);
    } finally {
      setIsLoading(false);
      isInitialMount.current = false;
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const loggedInUser = await authService.login({ email, password });
      setUser(loggedInUser);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await authService.logout();
      setUser(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (name: string, email: string, registrationNo: string, batch: number) => {
      try {
        setIsLoading(true);
        setError(null);
        const newUser = await authService.registerUser({ name, email, registrationNo, batch });
        setUser(newUser);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Registration failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      try {
        setError(null);
        await authService.changePassword({ currentPassword, newPassword });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Password change failed';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const forgotPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await authService.forgotPassword({ email });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send reset email';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const resetPassword = useCallback(
    async (email: string, otp: string, newPassword: string) => {
      try {
        setError(null);
        await authService.resetPassword({ email, otp, newPassword });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const refetch = useCallback(async () => {
    await fetchCurrentUser();
  }, [fetchCurrentUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    error,
    login,
    logout,
    register,
    changePassword,
    forgotPassword,
    resetPassword,
    refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
