// app/dashboard/page.tsx
import { redirect } from "next/navigation";
// import getCurrentUser from "@/lib/utils/getCurrentUser";

export default async function DashboardPage() {
  // const user = await getCurrentUser();
  // TODO: Placeholder
  const user = {
    name: "John Doe",
    email: "XHs9a@example.com",
    role: "user",
  };
  // if (!user) redirect("/login");

  // Redirect to role-appropriate default page
  if (user.role === "superadmin") redirect("/dashboard/users");
  if (user.role === "admin")      redirect("/dashboard/users");
  redirect("/dashboard/profile");
}