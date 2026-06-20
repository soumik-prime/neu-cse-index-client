const inputBase =
  "w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white " +
  "focus:outline-none focus:ring-1 ring-[#02644A]/50 " +
  "placeholder:text-gray-400 transition-colors disabled:bg-gray-50 disabled:opacity-60";

export default function Select({
  options = [],
  placeholder = "— select —",
  className = "",
  ...p
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  options?: string[];
  placeholder?: string;
}) {
  return (
    <select {...p} className={`${inputBase} ${className}`}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}