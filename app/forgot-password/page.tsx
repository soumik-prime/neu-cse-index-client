"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setError(null);
    setLoading(true);

    try {
      // Replace with your actual API call:
      // await api.post("/auth/forgot-password", { email });
      await new Promise((r) => setTimeout(r, 1200));
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch {
      setError("Could not send a reset code. Try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-center px-4">
        {/* Brand */}
                <Link href="/" className="mb-8 flex flex-col items-center gap-3 select-none">
          {/* Logo */}
          <div className="relative w-11 h-11">
            <Image src="/favicon.ico" className="opacity-90" alt="NeU CSE Index" fill />
          </div>

          <div className="text-center text-2xl">
            <p className="label tracking-widest mb-0.5"><span className="text-xl">NEU CSE Index</span></p>
          </div>
        </Link>

        {/* Card */}
        <div className="w-full max-w-sm surface surface-accent" style={{ padding: "32px 28px" }}>
          {/* Back */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-[#5a8a86] text-xs font-mono mb-6 mt-4 hover:text-[#22a899] transition-colors"
          >
            <BackIcon /> Back to sign in
          </Link>

          <h4 className="mb-1" style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>
            Forgot password
          </h4>
          <p className="text-[#5a8a86] text-xs font-mono mb-7">
            Enter your email and we&apos;ll send a one-time code.
          </p>

          {error && <ErrorBanner message={error} />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input focus:outline-0"
              />
            </div>

            <button
              type="submit"
              disabled={!isEmailValid || loading}
              className="btn btn-primary w-full justify-center mt-1"
              style={{
                opacity: !isEmailValid || loading ? 0.4 : 1,
                cursor: !isEmailValid ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <><SpinnerIcon /> Sending code…</> : <>Send code <ArrowIcon /></>}
            </button>
          </form>
        </div>

        <p className="mt-8 text-[#2e5550] text-[0.625rem] font-mono tracking-widest uppercase">
          NEU CSE Index © {new Date().getFullYear()}
        </p>
      </main>
    </>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      className="mb-5 flex items-start gap-2.5 rounded-md px-3.5 py-2.5 text-xs font-mono"
      style={{
        background: "rgba(224,96,112,0.08)",
        border: "1px solid rgba(224,96,112,0.25)",
        color: "#e06070",
      }}
    >
      <span style={{ marginTop: 1, flexShrink: 0 }}>⚠</span>
      {message}
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M11 6.5H2M5.5 3L2 6.5 5.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="26" strokeDashoffset="10" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}