// Server component — no "use client"
import Image from "next/image";
import type { ReactNode } from "react";

export const metadata = { title: "NEU CSE Index" };

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Wordmark */}
      <div className="mb-6 flex flex-col items-center justify-center gap-1.5 select-none">
        <div>
          {/* <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <text x="2" y="17" fontSize="14" fontWeight="700" fill="white" fontFamily="system-ui,sans-serif">N</text>
          </svg> */}
          <Image src="/images/versitylogo.jpg" alt="NEU Logo" width={64} height={64} />
        </div>
        <span className="text-[16px] font-semibold text-gray-900 tracking-tight">Dept. of Computer Science &amp; Engineering</span>

      </div>

      {/* Card */}
      <div className="w-full max-w-100 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        {children}
      </div>

      {/* Footer */}
      <p className="mt-6 text-[11px] text-gray-300">
        Built by{" "}
        <a
          href="https://github.com/soumik-prime"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-400 transition-colors"
        >
          Md. Samiul Islam Soumik
        </a>
      </p>
    </div>
  );
}
