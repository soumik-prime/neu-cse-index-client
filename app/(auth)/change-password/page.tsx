"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/AuthContext";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const otp = searchParams.get("otp") ?? "";

  const { resetPassword } = useAuthContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isPasswordValid = newPassword.length >= 8;
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const canSubmit = isPasswordValid && passwordsMatch && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !email || !otp) return;

    setError(null);
    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => router.push("/dashboard"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <main className="min-h-dvh flex flex-col items-center justify-center px-4">
          <Link href="/" className="mb-8 flex flex-col items-center gap-3 select-none">
            <div className="relative w-11 h-11">
              <Image src="/favicon.ico" className="opacity-90" alt="NeU CSE Index" fill />
            </div>
            <div className="text-center text-2xl">
              <p className="label tracking-widest mb-0.5"><span className="text-xl">NEU CSE Index</span></p>
            </div>
          </Link>

          <div className="w-full max-w-sm surface surface-accent" style={{ padding: "32px 28px" }}>
            <div className="text-center">
              <div className="mb-4 text-4xl">✓</div>
              <h4 style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>Password reset successful</h4>
              <p className="text-text-secondary text-xs font-mono mt-3">
                Your password has been updated. Redirecting to dashboard...
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-center px-4">
        <Link href="/" className="mb-8 flex flex-col items-center gap-3 select-none">
          <div className="relative w-11 h-11">
            <Image src="/favicon.ico" className="opacity-90" alt="NeU CSE Index" fill />
          </div>
          <div className="text-center text-2xl">
            <p className="label tracking-widest mb-0.5"><span className="text-xl">NEU CSE Index</span></p>
          </div>
        </Link>

        <div className="w-full max-w-sm surface surface-accent" style={{ padding: "32px 28px" }}>
          <Link href="/forgot-password" className="text-[0.6875rem] font-mono inline-block mb-4" style={{ color: "#5a8a86" }}>
            ← Back to forgot password
          </Link>

          <h4 className="mb-1 mt-4" style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>
            Reset password
          </h4>
          <p className="text-text-secondary text-xs font-mono mb-7">
            Enter your new password below.
          </p>

          {error && (
            <div
              className="mb-5 flex items-start gap-2.5 rounded-md px-3.5 py-2.5 text-xs font-mono"
              style={{
                background: "rgba(224,96,112,0.08)",
                border: "1px solid rgba(224,96,112,0.25)",
                color: "#e06070",
              }}
            >
              <span style={{ marginTop: 1, flexShrink: 0 }}>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="label" htmlFor="newPassword">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Minimum 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
              />
              {newPassword && !isPasswordValid && (
                <p className="text-[0.6875rem] font-mono" style={{ color: "#e06070" }}>
                  Password must be at least 8 characters
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
              {confirmPassword && !passwordsMatch && (
                <p className="text-[0.6875rem] font-mono" style={{ color: "#e06070" }}>
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary w-full justify-center mt-1"
              style={{ opacity: !canSubmit ? 0.4 : 1, cursor: !canSubmit ? "not-allowed" : "pointer" }}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-text-muted text-[0.625rem] font-mono tracking-widest uppercase">
          NEU CSE Index © {new Date().getFullYear()}
        </p>
      </main>
    </>
  );
}

export default function ChangePasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}