const inputBase =
  "w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white " +
  "focus:outline-none focus:ring-1 ring-[#02644A]/50 " +
  "placeholder:text-gray-400 transition-colors disabled:bg-gray-50 disabled:opacity-60";

export default function Input({
  className = "",
  ...p
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={` ${inputBase} ${className}`} />;
}
