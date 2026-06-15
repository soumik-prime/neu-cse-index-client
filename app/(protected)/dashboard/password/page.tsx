// app/dashboard/password/page.tsx
// ALL roles: change own password

import PasswordForm from "./_components/PasswordForm";

export default function PasswordPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label mb-1">Dashboard</p>
        <h1 className="text-2xl font-bold text-text-bright m-0">Change Password</h1>
        <p className="text-text-secondary text-sm mt-1">
          Update your account password.
        </p>
      </div>

      <PasswordForm />
    </div>
  );
}
