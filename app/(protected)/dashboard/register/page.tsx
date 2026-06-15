// app/dashboard/register/page.tsx
// ADMIN + SUPERADMIN: register a new student user

import RegisterUserForm from "./_components/RegisterUserForm";

export default function RegisterUserPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="label mb-1">Management</p>
        <h1 className="text-2xl font-bold text-text-bright m-0">Register User</h1>
        <p className="text-text-secondary text-sm mt-1">
          Create a new student account. An email with login credentials will be sent automatically.
        </p>
      </div>

      <RegisterUserForm />
    </div>
  );
}
