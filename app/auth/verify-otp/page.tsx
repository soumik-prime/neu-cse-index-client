// Server component – guards direct URL access via cookie check
import { cookies } from "next/headers";
import VerifyOtpClient from "./VerifyOtpClient";
import { redirect } from "next/navigation";

export default async function VerifyOtpPage() {
  const cookieStore = await cookies();
  const email = cookieStore.get("fp_email")?.value;
  if (!email) redirect("/auth/login");
  return <VerifyOtpClient email={email} />;
}
