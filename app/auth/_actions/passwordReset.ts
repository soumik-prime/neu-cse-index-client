"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/* ─────────────────────────────────────────────────────
   STEP 1  –  forget-password page calls this.
   Sends OTP to the user's email.
   On success sets a short-lived cookie marking that
   OTP was dispatched for this email.
───────────────────────────────────────────────────── */
export async function sendOtpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();

  // ── Replace with your real API call ──────────────
  // const res = await yourApiClient.sendOtp({ email });
  // Demo:
  const res = await (async () => {
    await new Promise((r) => setTimeout(r, 800));
    if (email.endsWith("@neu.ac.bd")) return { ok: true };
    return { ok: false, error: "No account found with that email." };
  })();
  // ─────────────────────────────────────────────────

  if (!res.ok) {
    // Return error to the client — page handles display
    return { ok: false, error: res.error ?? "Failed to send OTP." };
  }

  // Mark that OTP was sent for this email.
  // verify-otp and change-password pages check this cookie.
  const cookieStore = await cookies();
  cookieStore.set("fp_email", email, {
    httpOnly: true,
    path: "/",
    maxAge: 10 * 60, // 10 minutes to complete the flow
    sameSite: "lax",
  });
  // Clear any stale "otp verified" cookie from a previous attempt
  cookieStore.delete("fp_verified");

  return { ok: true };
}

/* ─────────────────────────────────────────────────────
   STEP 2  –  change-password page calls this.
   Verifies OTP and sets the new password in one call.
   Requires fp_email cookie set by step 1.
───────────────────────────────────────────────────── */
export async function changePasswordAction(formData: FormData) {
  const cookieStore = await cookies();
  const email       = cookieStore.get("fp_email")?.value;

  // Guard: must have come through forget-password first
  if (!email) {
    return { ok: false, error: "Session expired. Please start over.", redirect: "/auth/forget-password" };
  }

  const otp         = String(formData.get("otp")      ?? "").trim();
  const newPassword = String(formData.get("password") ?? "").trim();

  // ── Replace with your real API call ──────────────
  // const res = await yourApiClient.resetPassword({ email, otp, newPassword });
  // Demo:
  const res = await (async () => {
    await new Promise((r) => setTimeout(r, 900));
    if (otp === "123456") return { ok: true };
    return { ok: false, error: "Invalid or expired OTP." };
  })();
  // ─────────────────────────────────────────────────

  if (!res.ok) {
    return { ok: false, error: res.error ?? "Failed to reset password." };
  }

  // Clean up flow cookies
  cookieStore.delete("fp_email");
  cookieStore.delete("fp_verified");

  return { ok: true };
}

/* ─────────────────────────────────────────────────────
   Guards – called from page.tsx server components
   to protect direct URL access.
───────────────────────────────────────────────────── */

/** verify-otp page: requires fp_email cookie */
export async function requireOtpStep() {
  const cookieStore = await cookies();
  const email = cookieStore.get("fp_email")?.value;
  if (!email) redirect("/auth/login");
  return email;
}

/** change-password page: requires fp_email cookie */
export async function requireChangeStep() {
  const cookieStore = await cookies();
  const email = cookieStore.get("fp_email")?.value;
  if (!email) redirect("/auth/login");
  return email;
}
