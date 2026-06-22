import { ReactNode } from "react";

export default function AlertBox({
  children,
  type = "error",
}: {
  children: ReactNode;
  type?: "error" | "success" | "info";
}) {
  const styles = {
    error: "bg-red-50 border-red-200 text-red-700",
    success: "bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]",
    info: "bg-blue-50 border-blue-200 text-blue-700",
  };
  const icons = {
    error:
      "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    success: "M5 13l4 4L19 7",
    info: "M13 16h-1v-4h-1m1-4h.01",
  };
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-[13px] mb-4 ${styles[type]}`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 mt-0.5"
      >
        <path d={icons[type]} />
      </svg>
      <span>{children}</span>
    </div>
  );
}
