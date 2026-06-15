// app/dashboard/register-admin/page.tsx
// SUPERADMIN only: register a new admin

import RegisterAdminForm from "./_components/RegisterAdminForm";

export default function RegisterAdminPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label mb-1">System</p>
        <h1 className="text-2xl font-bold text-text-bright m-0">Register Admin</h1>
        <p className="text-text-secondary text-sm mt-1">
          Create a new admin account.
        </p>
      </div>

      <RegisterAdminForm />
    </div>
  );
}
