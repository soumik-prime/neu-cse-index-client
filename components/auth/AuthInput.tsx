const inputBase =
  "w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-[13px] text-gray-900 bg-white " +
  "focus:outline-none focus:ring-1 ring-[#02644A]/50 " +
  "placeholder:text-gray-400 transition-colors disabled:opacity-60 disabled:bg-gray-50";

export default function AuthInput({
  label,
  hint,
  error,
  className = "",
  ...p
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        {...p}
        className={`${inputBase} ${error ? "border-red-400 focus:ring-red-200 focus:border-red-400" : ""} ${className}`}
      />
      {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
      {hint && !error && (
        <p className="text-[12px] text-gray-400 mt-1">{hint}</p>
      )}
    </div>
  );
}
