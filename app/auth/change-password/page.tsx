// Server component – guards direct URL access via cookie check
import { requireChangeStep } from "../_actions/passwordReset";
import ChangePasswordClient from "./ChangePasswordClient";

export default async function ChangePasswordPage() {
  // Redirects to /auth/login if fp_email cookie is missing
  const email = await requireChangeStep();
  return <ChangePasswordClient email={email} />;
}
