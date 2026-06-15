// app/dashboard/profile/page.tsx
// USER: view + edit own profile

import ProfileForm from "./_components/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-text-bright m-0">My Profile</h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your public profile information.
        </p>
      </div>

      <ProfileForm />
    </div>
  );
}
