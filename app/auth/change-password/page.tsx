// Server component - guards direct URL access via cookie check
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ChangePasswordClient from "./ChangePasswordClient";

export default async function ChangePasswordPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("fp_email")?.value;
  if (!email) redirect("/auth/login");
  return <ChangePasswordClient email={email} />;
}
