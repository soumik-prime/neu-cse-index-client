import { ReactNode } from "react";

export default function Field({
  label,
  children,
  hint,
}: {
  label: ReactNode;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] text-gray-600 font-medium mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="text-[12px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
