"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/lib/contexts/AuthContext";
import { forgotPasswordSchema } from "@/lib/schemas/auth.schema";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword, isLoading, error } = useAuthContext();
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setFormError(null);

    try {
      const result = forgotPasswordSchema.safeParse({ email });
      if (!result.success) {
        setFormError(result.error.flatten().fieldErrors?.email?.[0] || "Invalid email");
        return;
      }

      await forgotPassword(email);
      setSubmitted(true);
      // Redirect to OTP verification after 3 seconds
      setTimeout(() => router.push(`/verify-otp?email=${encodeURIComponent(email)}`), 3000);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not send reset code. Try again.");
    }
  };

  if (submitted) {
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
              <h4 style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>Check your email</h4>
              <p className="text-text-secondary text-xs font-mono mt-3">
                We've sent a password reset code to <strong>{email}</strong>
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
          <Link href="/login" className="text-[0.6875rem] font-mono inline-block mb-4" style={{ color: "#5a8a86" }}>
            ← Back to login
          </Link>
          
          <h4 className="mb-1 mt-4" style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>
            Reset password
          </h4>
          <p className="text-text-secondary text-xs font-mono mb-7">
            Enter your email to receive a reset code.
          </p>

          {(formError || error) && (
            <div
              className="mb-5 flex items-start gap-2.5 rounded-md px-3.5 py-2.5 text-xs font-mono"
              style={{
                background: "rgba(224,96,112,0.08)",
                border: "1px solid rgba(224,96,112,0.25)",
                color: "#e06070",
              }}
            >
              <span style={{ marginTop: 1, flexShrink: 0 }}>⚠</span>
              {formError || error}
            </div>
          )}

w          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={!isEmailValid || isLoading}
              className="btn btn-primary w-full justify-center mt-1"
              style={{ opacity: !isEmailValid || isLoading ? 0.4 : 1, cursor: !isEmailValid ? "not-allowed" : "pointer" }}
            >
              {isLoading ? "Sending..." : "Send reset code"}
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