"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SessionExpiredProps {
  onDismiss?: () => void;
}

export default function SessionExpired({
  onDismiss,
}: SessionExpiredProps = {}) {
  const router = useRouter();
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const id = setInterval(
      () => setDots((d) => (d.length >= 3 ? "." : d + ".")),
      600,
    );
    return () => clearInterval(id);
  }, []);

  function handleLogin() {
    onDismiss?.();
    router.push("/auth/login");
  }

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl w-full max-w-sm p-8 flex flex-col items-center text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mb-5">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" />
            <path d="M11 16a1 1 0 1 0 2 0 1 1 0 0 0-2 0" />
            <path d="M8 11V7a4 4 0 0 1 7.748-1.367" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
        </div>

        {/* Copy */}
        <h2 className="text-[17px] font-semibold text-gray-900 mb-1">
          Session expired
        </h2>
        <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
          Your session has timed out due to inactivity. Please log in again to
          continue
          <span className="inline-block w-5 text-left">{dots}</span>
        </p>

        {/* CTA */}
        <button
          onClick={handleLogin}
          className="w-full inline-flex items-center justify-center gap-2 bg-[#02644A] hover:bg-[#00916A] active:bg-[#024f3b] text-white rounded-lg px-5 py-2 text-[13px] font-medium transition-colors mb-3 cursor-pointer"
        >
          <span className="text-lg font-bold">Log in again</span>
        </button>

        <p className="text-[11px] text-gray-400">
          Any unsaved changes will be lost
        </p>
      </div>
    </div>
  );
}
