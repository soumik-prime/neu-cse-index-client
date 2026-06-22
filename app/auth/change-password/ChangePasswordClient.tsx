"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { changePasswordAction } from "../_actions/passwordReset";
import AuthPageHeader from "../../../components/auth/AuthPageHeader";
import AlertBox from "../../../components/auth/AlertBox";
import AuthBtn from "../../../components/auth/AuthBtn";

const SESSION_KEY = "fp_otp";

function calcStrength(pw: string): number {
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}
const STRENGTH_LABEL = ["", "Weak",       "Fair",        "Good",        "Strong"     ];
const STRENGTH_COLOR = ["", "bg-red-400", "bg-amber-400","bg-blue-400", "bg-[#02644A]"];
const STRENGTH_TEXT  = ["", "text-red-500","text-amber-600","text-blue-600","text-[#02644A]"];

function EyeBtn({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} tabIndex={-1}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      aria-label={show ? "Hide password" : "Show password"}>
      {show
        ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      }
    </button>
  );
}

function PwField({ label, value, onChange, show, onToggle, error }: {
  label: string; value: string; onChange: (v: string) => void;
  show: boolean; onToggle: () => void; error?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border rounded-lg px-3.5 py-2.5 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 transition-colors pr-10 placeholder:text-gray-400 ${
            error ? "border-red-400 focus:ring-red-200 focus:border-red-400"
                  : "border-gray-200 focus:ring-[#02644A]/20 focus:border-[#02644A]"
          }`}
        />
        <EyeBtn show={show} onToggle={onToggle} />
      </div>
      {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function ChangePasswordClient({ email }: { email: string }) {
  const router = useRouter();
  const [pw,      setPw]      = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw,  setShowPw]  = useState(false);
  const [showCf,  setShowCf]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [errors,  setErrors]  = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // If OTP is missing from sessionStorage, user jumped here directly
  // (cookie guard already ran server-side, this is a belt-and-suspenders check)
  useEffect(() => {
    const otp = sessionStorage.getItem(SESSION_KEY);
    if (!otp) router.replace("/auth/forget-password");
  }, [router]);

  const strength = calcStrength(pw);

  function validate() {
    const e: Record<string, string> = {};
    if (pw.length < 8)  e.pw      = "At least 8 characters required";
    if (pw !== confirm) e.confirm  = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const otp = sessionStorage.getItem(SESSION_KEY) ?? "";
    if (!otp) { router.replace("/auth/forget-password"); return; }

    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.set("otp",      otp);
      fd.set("password", pw);
      const res = await changePasswordAction(fd);

      if (res.ok) {
        sessionStorage.removeItem(SESSION_KEY);
        setSuccess(true);
        setTimeout(() => router.push("/dashboard"), 1800);
      } else {
        setError(res.error ?? "Failed to reset password.");
        // If the server says start over, clear everything
        if (res.redirect) {
          sessionStorage.removeItem(SESSION_KEY);
          router.replace(res.redirect);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center py-4">
        <div className="w-14 h-14 rounded-full bg-[#D1FAE5] flex items-center justify-center mb-4">
          <svg width="26" height="26" fill="none" stroke="#02644A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h2 className="text-[17px] font-semibold text-gray-900 mb-1">Password changed</h2>
        <p className="text-[13px] text-gray-500">Redirecting to the dashboard…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPageHeader title="Set new password" sub={`Resetting password for ${email}`} />

      {error && <AlertBox type="error">{error}</AlertBox>}

      <PwField label="New password" value={pw} onChange={setPw} show={showPw} onToggle={() => setShowPw((v) => !v)} error={errors.pw} />

      {/* Strength bar */}
      {pw.length > 0 && (
        <div className="-mt-2 mb-4 space-y-1">
          <div className="flex gap-1">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? STRENGTH_COLOR[strength] : "bg-gray-200"}`} />
            ))}
          </div>
          <p className={`text-[11px] font-medium ${STRENGTH_TEXT[strength]}`}>{STRENGTH_LABEL[strength]}</p>
        </div>
      )}

      <PwField label="Confirm password" value={confirm} onChange={setConfirm} show={showCf} onToggle={() => setShowCf((v) => !v)} error={errors.confirm} />

      <AuthBtn type="submit" loading={loading} className="mt-2">Change password</AuthBtn>
    </form>
  );
}
