"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendOtpAction } from "../_actions/passwordReset";
import AuthPageHeader from "../../../components/auth/AuthPageHeader";
import AlertBox from "../../../components/auth/AlertBox";
import AuthInput from "../../../components/auth/AuthInput";
import AuthBtn from "../../../components/auth/AuthBtn";

export default function ForgetPasswordPage() {
  const router = useRouter();
  const [email,    setEmail]   = useState("");
  const [loading,  setLoading] = useState(false);
  const [error,    setError]   = useState("");
  const [fieldErr, setFieldErr]= useState("");

  function validate() {
    if (!email.trim()) { setFieldErr("Email is required"); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setFieldErr("Enter a valid email"); return false; }
    setFieldErr(""); return true;
  }

  async function handleSubmit(ev: React.SubmitEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true); setError("");
    try {
      const fd = new FormData();
      fd.set("email", email);
      const res = await sendOtpAction(fd);
      if (res.ok) {
        router.push("/auth/verify-otp");
      } else {
        setError(res.error ?? "Failed to send OTP.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Link href="/auth/login" className="inline-flex items-center gap-1.5 text-[12px] text-gray-400 hover:text-gray-600 transition-colors mb-5">
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M19 12H5m7-7-7 7 7 7"/>
        </svg>
        Back to login
      </Link>

      <AuthPageHeader
  title="Forgot password?"
  sub="Enter your email to receive a verification code."
/>
      {error && <AlertBox type="error">{error}</AlertBox>}

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@neu.ac.bd"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErr}
      />

      <AuthBtn type="submit" loading={loading} className="mt-2">Send OTP</AuthBtn>

      <p className="text-center text-[12px] text-gray-400 mt-4">
        Remembered it?{" "}
        <Link href="/auth/login" className="text-[#02644A] hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
