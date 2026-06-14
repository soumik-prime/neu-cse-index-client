'use client';

import { useAuthContext } from '@/lib/contexts/AuthContext';
import { withAuth } from '@/lib/middlewares/withAuth';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuthContext();

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6">Your Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-400">Name</label>
              <p className="text-lg text-white font-medium">{user?.name}</p>
            </div>

            <div>
              <label className="text-sm text-slate-400">Email</label>
              <p className="text-lg text-white font-medium">{user?.email}</p>
            </div>

            <div>
              <label className="text-sm text-slate-400">Registration No.</label>
              <p className="text-lg text-white font-medium">{user?.registrationNo}</p>
            </div>

            <div>
              <label className="text-sm text-slate-400">Batch</label>
              <p className="text-lg text-white font-medium">{user?.batch || 'N/A'}</p>
            </div>

            <div>
              <label className="text-sm text-slate-400">Role</label>
              <p className="text-lg text-white font-medium">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-400">Member Since</label>
              <p className="text-lg text-white font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 bg-slate-800/50 border border-slate-700 rounded hover:bg-slate-700/50 transition text-white font-medium">
            Edit Profile
          </button>
          <button className="p-4 bg-slate-800/50 border border-slate-700 rounded hover:bg-slate-700/50 transition text-white font-medium">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardPage);