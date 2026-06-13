"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const OTP_LENGTH = 6;

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otp = digits.join("");
  const canSubmit = otp.length === OTP_LENGTH && !loading;

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    // Handle paste
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, "").slice(0, OTP_LENGTH);
      const next = [...digits];
      for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
      setDigits(next);
      const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
      inputRefs.current[focusIdx]?.focus();
      return;
    }
    const char = value.replace(/\D/g, "");
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setLoading(true);

    try {
      // Replace with your actual API call:
      // await api.post("/auth/verify-otp", { email, otp });
      await new Promise((r) => setTimeout(r, 1200));
      router.push(`/change-password?email=${encodeURIComponent(email)}&otp=${otp}`);
    } catch {
      setError("Invalid or expired code. Check and try again.");
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setResendCooldown(60);
    // Replace with your actual API call:
    // await api.post("/auth/forgot-password", { email });
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
            href="/forgot-password"
            className="inline-flex items-center gap-1.5 text-[#5a8a86] text-xs font-mono mb-6 mt-4 hover:text-[#22a899] transition-colors"
          >
            <BackIcon /> Back
          </Link>

          <h4 className="mb-1" style={{ color: "#d4eae8", fontFamily: "var(--font-display)" }}>
            Enter code
          </h4>
          <p className="text-[#5a8a86] text-xs font-mono mb-7">
            We sent a 6-digit code to{" "}
            <span style={{ color: "#22a899" }}>{email || "your email"}</span>.
          </p>

          {error && <ErrorBanner message={error} />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* OTP slots */}
            <div className="flex gap-2 justify-between">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={OTP_LENGTH}
                  value={d}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onFocus={(e) => e.target.select()}
                  style={{
                    width: "44px",
                    height: "52px",
                    textAlign: "center",
                    fontSize: "1.25rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    background: "#0a1214",
                    border: `1px solid ${d ? "#22a899" : "#0f2e2a"}`,
                    borderRadius: "6px",
                    color: "#d4eae8",
                    outline: "none",
                    transition: "border-color 120ms, box-shadow 120ms",
                    caretColor: "#22a899",
                    letterSpacing: 0,
                  }}
                  onFocusCapture={(e) => {
                    e.target.style.borderColor = "#22a899";
                    e.target.style.boxShadow = "0 0 0 3px rgba(34,168,153,0.15)";
                  }}
                  onBlurCapture={(e) => {
                    e.target.style.borderColor = d ? "#22a899" : "#0f2e2a";
                    e.target.style.boxShadow = "none";
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="btn btn-primary w-full justify-center"
              style={{
                opacity: !canSubmit ? 0.4 : 1,
                cursor: !canSubmit ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <><SpinnerIcon /> Verifying…</> : <>Verify <ArrowIcon /></>}
            </button>
          </form>

          <div className="divider-glow" style={{ margin: "24px 0 20px" }} />

          <p className="text-center text-xs font-mono" style={{ color: "#2e5550" }}>
            Didn&apos;t receive it?{" "}
            <button
              onClick={handleResend}
              disabled={resendCooldown > 0}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: resendCooldown > 0 ? "not-allowed" : "pointer",
                color: resendCooldown > 0 ? "#1a4a44" : "#22a899",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                transition: "color 120ms",
              }}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </button>
          </p>
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