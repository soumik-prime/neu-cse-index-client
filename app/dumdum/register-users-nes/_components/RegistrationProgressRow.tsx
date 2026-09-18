"use client";

import { IconCheck, IconX, IconLoader2, IconAlertTriangle, IconUser } from "@tabler/icons-react";
import type { RegistrationResult, RegistrationStatus } from "../types";
import Avatar from "../../../../components/ui/Avater";

function StatusBadge({ status }: { status: RegistrationStatus }) {
  const map: Record<RegistrationStatus, { label: string; cls: string; icon: React.ReactNode }> = {
    idle:     { label: "Waiting",          cls: "bg-gray-100 text-gray-500",       icon: <IconUser size={11} /> },
    creating: { label: "Creating account", cls: "bg-blue-50 text-blue-600",        icon: <IconLoader2 size={11} className="animate-spin" /> },
    uploading:{ label: "Uploading photo",  cls: "bg-amber-50 text-amber-600",      icon: <IconLoader2 size={11} className="animate-spin" /> },
    patching: { label: "Finishing up",     cls: "bg-amber-50 text-amber-600",      icon: <IconLoader2 size={11} className="animate-spin" /> },
    success:  { label: "Registered",       cls: "bg-[#D1FAE5] text-[#02644A]",    icon: <IconCheck size={11} /> },
    partial:  { label: "Partial — no photo",cls:"bg-amber-100 text-amber-700",     icon: <IconAlertTriangle size={11} /> },
    failed:   { label: "Failed",           cls: "bg-red-100 text-red-600",         icon: <IconX size={11} /> },
  };
  const { label, cls, icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${cls}`}>
      {icon} {label}
    </span>
  );
}

export default function RegistrationProgressRow({
  result,
  index,
}: {
  result: RegistrationResult;
  index: number;
}) {
  const { draft, status, error, imageError } = result;
  const isActive = ["creating","uploading","patching"].includes(status);

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-lg border transition-all duration-500 ${
      isActive     ? "border-[#D1FAE5] bg-[#f0fdf8]" :
      status === "success"  ? "border-gray-100 bg-white opacity-60" :
      status === "partial"  ? "border-amber-200 bg-amber-50" :
      status === "failed"   ? "border-red-200 bg-red-50" :
      "border-gray-100 bg-white"
    }`}>
      <Avatar name={draft.name || "?"} photo={draft.photo} size={36} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[13px] font-medium text-gray-900 truncate">{draft.name}</p>
          <StatusBadge status={status} />
        </div>
        <p className="text-[11px] text-gray-500 mt-0.5">{draft.email} · {draft.registrationNo}</p>
        {error && (
          <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
            <IconX size={10} /> {error}
          </p>
        )}
        {imageError && (
          <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1">
            <IconAlertTriangle size={10} /> Photo: {imageError}
          </p>
        )}
      </div>
      <span className="text-[11px] text-gray-400 shrink-0 mt-0.5">#{index + 1}</span>
    </div>
  );
}
