"use client";

import { ReactNode, useState } from "react";

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      {sub && <p className="text-[13px] text-gray-500 mt-0.5">{sub}</p>}
    </div>
  );
}

export function Field({ label, children, hint }: { label: ReactNode; children: ReactNode; hint?: string }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] text-gray-600 font-medium mb-1">{label}</label>
      {children}
      {hint && <p className="text-[12px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

export function Divider() { return <div className="border-t border-gray-100 my-5" />; }

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>{children}</div>;
}

export function ErrorText({ children }: { children: ReactNode }) {
  return <p className="text-[12px] text-red-500 mt-1">{children}</p>;
}

export function EmptyState({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center py-10 border border-dashed border-gray-200 rounded-lg">
      <i className={`ti ${icon} text-3xl text-gray-300 block mb-2`} aria-hidden />
      <p className="text-[13px] text-gray-400">{text}</p>
    </div>
  );
}

const inputBase =
  "w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white " +
  "focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] " +
  "placeholder:text-gray-400 transition-colors disabled:bg-gray-50 disabled:opacity-60";

export function Input({ className = "", ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...p} className={`${inputBase} ${className}`} />;
}

export function Select({
  options = [], placeholder = "— select —", className = "", ...p
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options?: string[]; placeholder?: string }) {
  return (
    <select {...p} className={`${inputBase} ${className}`}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function Textarea({ className = "", ...p }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...p} rows={3} className={`${inputBase} resize-none ${className}`} />;
}

export type BtnVariant = "default" | "primary" | "danger" | "ghost" | "warning";
export function Btn({
  children, variant = "default", onClick, className = "", disabled, type = "button", style,
}: {
  children: ReactNode; variant?: BtnVariant; onClick?: () => void;
  className?: string; disabled?: boolean; type?: "button" | "submit"; style?: React.CSSProperties;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-medium " +
    "cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none";
  const variants: Record<BtnVariant, string> = {
    default: "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
    primary: "bg-[#02644A] text-white hover:bg-[#00916A] active:bg-[#024f3b] border border-transparent",
    danger:  "border border-red-200 text-red-600 bg-white hover:bg-red-50 active:bg-red-100",
    ghost:   "border-none bg-transparent text-gray-500 hover:text-gray-700 px-2 py-1.5",
    warning: "border border-amber-200 text-amber-700 bg-white hover:bg-amber-50",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={style}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}

export function Badge({ children, color = "teal" }: {
  children: ReactNode;
  color?: "teal" | "amber" | "red" | "blue" | "gray" | "purple" | "green";
}) {
  const colors: Record<string, string> = {
    teal:   "bg-[#D1FAE5] text-[#02644A]",
    green:  "bg-green-100 text-green-800",
    amber:  "bg-amber-100 text-amber-800",
    red:    "bg-red-100 text-red-700",
    blue:   "bg-blue-100 text-blue-800",
    gray:   "bg-gray-100 text-gray-600",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${colors[color]}`}>
      {children}
    </span>
  );
}

export function StatCard({ icon, label, value, color = "teal" }: {
  icon: string; label: string; value: number | string;
  color?: "teal" | "blue" | "amber" | "purple";
}) {
  const ring: Record<string, string> = {
    teal:   "bg-[#D1FAE5] text-[#02644A]",
    blue:   "bg-blue-100 text-blue-700",
    amber:  "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${ring[color]}`}>
        <i className={`ti ${icon} text-[18px]`} aria-hidden />
      </div>
      <div>
        <p className="text-[22px] font-bold text-gray-900 leading-none">{value}</p>
        <p className="text-[12px] text-gray-500 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

export function ConfirmModal({ title, message, confirmLabel = "Confirm", variant = "danger", onConfirm, onClose }: {
  title: string; message: string; confirmLabel?: string;
  variant?: "danger" | "primary"; onConfirm: () => void; onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-sm p-6">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${variant === "danger" ? "bg-red-100" : "bg-[#D1FAE5]"}`}>
          <i className={`ti ${variant === "danger" ? "ti-alert-triangle text-red-500" : "ti-check text-[#02644A]"} text-lg`} aria-hidden />
        </div>
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-[13px] text-gray-500 mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant={variant} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</Btn>
        </div>
      </div>
    </div>
  );
}

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex items-center gap-2.5 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl text-[13px] font-medium">
      <i className="ti ti-circle-check text-[#10B981] text-base" aria-hidden />
      {message}
      <button onClick={onClose} className="ml-2 opacity-50 hover:opacity-100"><i className="ti ti-x text-sm" aria-hidden /></button>
    </div>
  );
}

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean; title: string; message: string;
    confirmLabel: string; variant: "danger" | "primary"; onConfirm: () => void;
  }>({ open: false, title: "", message: "", confirmLabel: "Confirm", variant: "danger", onConfirm: () => {} });

  function confirm(opts: {
    title: string; message: string; confirmLabel?: string;
    variant?: "danger" | "primary"; onConfirm: () => void;
  }) {
    setState({ open: true, confirmLabel: "Confirm", variant: "danger", ...opts });
  }

  const modal = state.open ? (
    <ConfirmModal {...state} onClose={() => setState((s) => ({ ...s, open: false }))} />
  ) : null;

  return { confirm, modal };
}

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  function toast(message: string) { setMsg(message); setTimeout(() => setMsg(null), 3200); }
  const toastEl = msg ? <Toast message={msg} onClose={() => setMsg(null)} /> : null;
  return { toast, toastEl };
}
