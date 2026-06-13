"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const canSubmit = isEmailValid && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);

    setLoading(true);
    // Replace with your actual auth call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // setError("Invalid credentials. Check your email or password.");
  };

  return (
    <>
      <main className="min-h-dvh flex flex-col items-center justify-center px-4">
        {/* ── Brand mark ── */}
        <Link href="/" className="mb-8 flex flex-col items-center gap-3 select-none">
          {/* Logo */}
          <div className="relative w-11 h-11">
            <Image src="/favicon.ico" className="opacity-90" alt="NeU CSE Index" fill />
          </div>

          <div className="text-center text-2xl">
            <p className="label tracking-widest mb-0.5"><span className="text-xl">NEU CSE Index</span></p>
          </div>
        </Link>

        {/* ── Card ── */}
        <div
          className="w-full max-w-sm surface surface-accent"
          style={{ padding: "32px 28px" }}
        >
          <h4 className="mb-1 mt-4" style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>
            Sign in
          </h4>
          <p className="text-[#5a8a86] text-xs font-mono mb-7">
            Authenticate to access the index.
          </p>

          {/* Error banner */}
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
            {/* Email */}
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

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[0.6875rem] font-mono"
                  style={{ color: "#5a8a86", letterSpacing: "0.05em" }}
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="btn btn-primary w-full justify-center mt-1"
              style={{ opacity: !canSubmit || loading ? 0.4 : 1, cursor: !canSubmit ? "not-allowed" : "pointer" }}
            >
              {loading ? (
                <>
                  <SpinnerIcon />
                  Authenticating…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowIcon />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider-glow" style={{ margin: "24px 0 20px" }} />

        </div>

        {/* ── Footer ── */}
        <p className="mt-8 text-[#2e5550] text-[0.625rem] font-mono tracking-widest uppercase">
          NEU CSE Index © {new Date().getFullYear()}
        </p>
      </main>
    </>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="26" strokeDashoffset="10" strokeLinecap="round" />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}