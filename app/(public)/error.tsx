"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[var(--neu-gray-200)] bg-white p-10 text-center shadow-[var(--neu-shadow-card)]">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--neu-emerald-light)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-10 w-10 text-[var(--neu-green)]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86l-8 14A1 1 0 003.14 19h17.72a1 1 0 00.85-1.14l-8-14a1 1 0 00-1.72 0z"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold text-[var(--neu-gray-900)]">
          Something went wrong
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--neu-gray-500)]">
          We couldn&apos;t complete your request. Please try again. If the problem
          persists, contact the administrator.
        </p>

        {/* Error details (development only) */}
        {isDev && error.message && (
          <div className="mt-6 rounded-xl border border-[var(--neu-gray-200)] bg-[var(--neu-gray-50)] p-4 text-left">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--neu-gray-500)]">
              Error
            </p>
            <p className="break-words font-mono text-sm text-[var(--neu-red)]">
              {error.message}
            </p>
          </div>
        )}

        {/* Error ID (production only) */}
        {!isDev && error.digest && (
          <p className="mt-6 text-xs text-[var(--neu-gray-500)]">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-xl bg-[var(--neu-green)] px-6 py-3 font-medium text-white transition hover:bg-[var(--neu-green-hover)]"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="rounded-xl border border-[var(--neu-gray-300)] bg-white px-6 py-3 font-medium text-[var(--neu-gray-700)] transition hover:bg-[var(--neu-gray-100)]"
          >
            Go Home
          </button>
        </div>
      </div>
    </main>
  );
}