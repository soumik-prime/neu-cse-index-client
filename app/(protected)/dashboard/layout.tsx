// app/dashboard/layout.tsx
import { redirect } from "next/navigation";
import getCurrentUser from "@/lib/utils/getCurrentUser";
import DashboardShell from "./_components/DashboardShell";
import Navbar from "@/components/navigation/NavBar";
import LogInButton from "@/components/navigation/LogInButton";


const normalizeRole = (role?: string) => {
  const normalized = role?.toLowerCase();
  if (normalized === "admin" || normalized === "superadmin" || normalized === "user") {
    return normalized;
  }
  return "user";
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <DashboardShell
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: normalizeRole(user.role),
        registrationNo: user.registrationNo,
      }}
    >
  <Navbar loginButtonSlot={<LogInButton />} />

      {children}
    </DashboardShell>
  );
}
