"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "../../../lib/action/auth.action";
import AuthPageHeader from "../../../components/auth/AuthPageHeader";
import AlertBox from "../../../components/auth/AlertBox";
import AuthBtn from "../../../components/auth/AuthBtn";
import { IconArrowLeft } from "@tabler/icons-react";


const SESSION_KEY = "fp_otp";
const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function VerifyOtpClient({ email }: { email: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  function handleChange(i: number, val: string) {
    const ch = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < OTP_LENGTH - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0)
      refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1)
      refs.current[i + 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;
    const next = [...digits];
    [...text].forEach((ch, idx) => {
      next[idx] = ch;
    });
    setDigits(next);
    refs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  }

  function handleSubmit(ev: React.SubmitEvent) {
    ev.preventDefault();
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError("Enter all 6 digits.");
      return;
    }
    setLoading(true);
    setError("");
    sessionStorage.setItem(SESSION_KEY, otp);
    router.push("/auth/change-password");
  }

  async function handleResend() {
    if (cooldown > 0 || resending) return;
    setResending(true);
    setError("");
    setSent(false);
    try {
      const res = await forgotPasswordAction({ email });
      if (!res.success) {
        setError(res.message ?? "Failed to resend code.");
        return;
      }
      setCooldown(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      sessionStorage.removeItem(SESSION_KEY);
      refs.current[0]?.focus();
      setSent(true);
    } finally {
      setResending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Link
        href="/auth/forget-password"
        className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-5"
      >
        <IconArrowLeft size={14} stroke={2} />
        Back
      </Link>

      <AuthPageHeader
        title="Check your email"
        sub={`We sent a 6-digit code to ${email}`}
      />

      {error && <AlertBox type="error">{error}</AlertBox>}
      {sent && (
        <AlertBox type="success">A new code was sent to {email}</AlertBox>
      )}

      {/* OTP boxes */}
      <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-12 text-center text-[18px] font-semibold rounded-lg border transition-colors focus:outline-none focus:ring-2 ${
              d
                ? "border-[#02644A] text-[#02644A] bg-[#f0fdf8] focus:ring-[#02644A]/20"
                : "border-gray-200 text-gray-900 bg-white focus:ring-[#02644A]/20"
            }`}
          />
        ))}
      </div>

      <AuthBtn type="submit" loading={loading}>
        Verify &amp; Continue
      </AuthBtn>

      <div className="text-center mt-4">
        {cooldown > 0 ? (
          <p className="text-[12px] text-gray-400">
            Resend code in{" "}
            <span className="font-medium text-gray-600 tabular-nums">
              0:{String(cooldown).padStart(2, "0")}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-[12px] text-[#02644A] hover:underline disabled:opacity-50"
          >
            {resending ? "Sending…" : "Resend code"}
          </button>
        )}
      </div>
    </form>
  );
}
