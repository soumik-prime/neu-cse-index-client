'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Higher-order component to protect routes
 * Redirects to login if not authenticated
 */
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, isLoading } = useAuthContext();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/login');
      }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
}

/**
 * Higher-order component to protect admin routes
 * Redirects to login if not authenticated or not admin
 */
export function withAdminAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AdminProtectedComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, isLoading, user } = useAuthContext();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPERADMIN';

    useEffect(() => {
      if (!isLoading && (!isAuthenticated || !isAdmin)) {
        router.push('/login');
      }
    }, [isLoading, isAuthenticated, isAdmin, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      );
    }

    if (!isAuthenticated || !isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
}
