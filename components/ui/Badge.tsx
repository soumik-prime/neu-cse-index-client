import { ReactNode } from "react";

export default function Badge({
  children,
  color = "teal",
}: {
  children: ReactNode;
  color?: "teal" | "amber" | "red" | "blue" | "gray" | "purple" | "green";
}) {
  const colors: Record<string, string> = {
    teal: "bg-[#D1FAE5] text-[#02644A]",
    green: "bg-green-100 text-green-800",
    amber: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-600",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span
      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${colors[color]}`}
    >
      {children}
    </span>
  );
}