// Server component – guards direct URL access via cookie check
import { requireOtpStep } from "../_actions/passwordReset";
import VerifyOtpClient from "./VerifyOtpClient";

export default async function VerifyOtpPage() {
  // Redirects to /auth/login if fp_email cookie is missing
  const email = await requireOtpStep();
  return <VerifyOtpClient email={email} />;
}
