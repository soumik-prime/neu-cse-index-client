"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-(--neu-gray-200) bg-white p-10 text-center shadow-(--neu-shadow-card)">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg---neu-emerald-light)">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-10 w-10 text-(--neu-green)"
          >
            <circle cx="12" cy="12" r="9" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.5 9.5h.01M14.5 9.5h.01M9 15c.8-.8 2-1.2 3-1.2s2.2.4 3 1.2"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text(--neu-gray-900)">
          404 - Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-(--neu-gray-500)">
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the
          URL might be incorrect.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-xl bg-(--neu-green) px-6 py-3 font-medium text-white transition hover:bg-(--neu-green-hover)"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="rounded-xl border border-(--neu-gray-300) bg-white px-6 py-3 font-medium text-(--neu-gray-700) transition hover:bg-(--neu-gray-100)"
          >
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}