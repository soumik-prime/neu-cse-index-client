'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ArrowIcon from './Icons';

export default function LogInButton() {
  const { isAuthenticated, user, logout, isLoading } = useAuthContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="btn btn-outline py-1.5! px-3.5! text-[0.7rem]! opacity-50">
        Loading...
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard"
          className="btn btn-primary py-1.5! px-3.5! text-[0.7rem]!"
        >
          Dashboard <ArrowIcon />
        </Link>
        <button
          onClick={handleLogout}
          className="btn btn-outline py-1.5! px-3.5! text-[0.7rem]!"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="btn btn-outline py-1.5! px-3.5! text-[0.7rem]!"
    >
      Login <ArrowIcon />
    </Link>
  );
}
