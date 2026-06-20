import { ReactNode } from "react";

export type BtnVariant = "default" | "primary" | "danger" | "ghost" | "warning";
export default function Btn({
  children,
  variant = "default",
  onClick,
  className = "",
  disabled,
  type = "button",
  style,
}: {
  children: ReactNode;
  variant?: BtnVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-medium " +
    "cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none";
  const variants: Record<BtnVariant, string> = {
    default:
      "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
    primary:
      "bg-[#02644A] text-white hover:bg-[#00916A] active:bg-[#024f3b] border border-transparent",
    danger:
      "border border-red-200 text-red-600 bg-white hover:bg-red-50 active:bg-red-100",
    ghost:
      "border-none bg-transparent text-gray-500 hover:text-gray-700 px-2 py-1.5",
    warning:
      "border border-amber-200 text-amber-700 bg-white hover:bg-amber-50",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}