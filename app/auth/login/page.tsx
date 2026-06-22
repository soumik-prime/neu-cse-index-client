"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useAuthActionState } from "../../../lib/hooks/useAuthActionState";
import { AuthSchema } from "../../../lib/schemas/auth.schema";
import AuthPageHeader from "../../../components/auth/AuthPageHeader";
import AlertBox from "../../../components/auth/AlertBox";
import AuthInput from "../../../components/auth/AuthInput";
import AuthBtn from "../../../components/auth/AuthBtn";
import * as z from "zod";
import { loginAction } from "../../../lib/action/auth.action";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [clientErrors, setClientErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [state, dispatch, isPending] = useAuthActionState(loginAction);

  // Redirect once the server action reports success.
  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  function validate(payload: { email: string; password: string }) {
    const result = AuthSchema.loginSchema.safeParse(payload);

    if (result.success) {
      setClientErrors({});
      return true;
    }

    const fieldErrors = z.flattenError(result.error).fieldErrors;

    const errors = {
      email:
        payload.email.trim() === ""
          ? "Email is required"
          : (fieldErrors.email?.[0] ?? ""),
      password:
        payload.password === ""
          ? "Password is required"
          : (fieldErrors.password?.[0] ?? ""),
    };

    setClientErrors(errors);
    return false;
  }

  function handleSubmit(ev: React.SubmitEvent) {
    ev.preventDefault();

    const payload = { email, password };
    if (!validate(payload)) return;

    startTransition(() => {
      dispatch({ email, password });
    });
  }

  // Top-level error banner: only show when the failure isn't already
  // explained by a field-level error.
  const topLevelError = state && !state.success ? state.message : "";

  return (
    <form onSubmit={handleSubmit} noValidate>
      <AuthPageHeader
        title="Welcome back"
        sub="Sign in to your index account"
      />

      {topLevelError && <AlertBox type="error">{topLevelError}</AlertBox>}

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={clientErrors.email}
      />

      <div className="mb-1">
        <div className="mb-1.5 flex items-center justify-between">
          <label className="text-[13px] font-medium text-gray-700">
            Password
          </label>

          <Link
            href="/auth/forget-password"
            className="text-[12px] text-[#02644A] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-[13px] text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-1 ${
              clientErrors.password
                ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                : "border-gray-200 focus:border-0 focus:ring-[#02644A]/50"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            tabIndex={-1}
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? (
              <IconEyeOff size={18} stroke={1.8} />
            ) : (
              <IconEye size={18} stroke={1.8} />
            )}
          </button>
        </div>

        {clientErrors.password && (
          <p className="mt-1 text-[12px] text-red-500">
            {clientErrors.password}
          </p>
        )}
      </div>

      <div className="mt-5">
        <AuthBtn type="submit" loading={isPending}>
          Sign in
        </AuthBtn>
      </div>

      <p className="mt-5 text-center text-[11px] text-gray-400">
        Need assistance?{" "}
        <span className="text-gray-500">
          Please contact the CSE Department Office.
        </span>
      </p>
    </form>
  );
}
