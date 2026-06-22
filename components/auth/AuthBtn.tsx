export default function AuthBtn({
  children,
  loading = false,
  className = "",
  ...p
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
}) {
  return (
    <button
      {...p}
      disabled={loading || p.disabled}
      className={
        "w-full flex items-center justify-center gap-2 bg-[#02644A] hover:bg-[#00916A] active:bg-[#024f3b] " +
        "text-white rounded-lg px-5 py-2.5 text-[13px] font-medium transition-colors " +
        "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer " +
        className
      }
    >
      {loading ? (
        <>
          <svg
            className="animate-spin w-4 h-4 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          Please wait…
        </>
      ) : (
        children
      )}
    </button>
  );
}
