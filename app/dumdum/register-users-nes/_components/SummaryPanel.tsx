"use client";

import { IconCheck, IconAlertTriangle, IconX, IconRefresh } from "@tabler/icons-react";
import type { RegistrationResult } from "../types";
import Avatar from "../../../../components/ui/Avater";

interface Props {
  results: RegistrationResult[];
  onReset: () => void;
}

function ResultGroup({
  title, icon, results, color,
}: {
  title: string;
  icon: React.ReactNode;
  results: RegistrationResult[];
  color: string;
}) {
  if (results.length === 0) return null;
  return (
    <div className="mb-4">
      <div className={`flex items-center gap-2 text-[12px] font-semibold mb-2 ${color}`}>
        {icon} {title} ({results.length})
      </div>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={r.draft.id} className={`flex items-start gap-3 rounded-lg border px-3.5 py-2.5 ${
            r.status === "success" ? "border-[#D1FAE5] bg-[#f0fdf8]" :
            r.status === "partial" ? "border-amber-200 bg-amber-50" :
            "border-red-200 bg-red-50"
          }`}>
            <Avatar name={r.draft.name || "?"} photo={r.draft.photo} size={32} />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-900">{r.draft.name}</p>
              <p className="text-[11px] text-gray-500">{r.draft.email}</p>
              <p className="text-[11px] text-gray-400">{r.draft.registrationNo}</p>
              {r.error && <p className="text-[11px] text-red-500 mt-0.5">{r.error}</p>}
              {r.imageError && <p className="text-[11px] text-amber-600 mt-0.5">Photo: {r.imageError}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SummaryPanel({ results, onReset }: Props) {
  const success = results.filter((r) => r.status === "success");
  const partial  = results.filter((r) => r.status === "partial");
  const failed   = results.filter((r) => r.status === "failed");

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden max-w-2xl">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[14px] font-semibold text-gray-900">Registration complete</p>
        <p className="text-[12px] text-gray-400 mt-0.5">{results.length} students processed</p>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { label: "Successful",    value: success.length, cls: "text-[#02644A]" },
          { label: "Partial",       value: partial.length, cls: "text-amber-600" },
          { label: "Failed",        value: failed.length,  cls: "text-red-600"   },
        ].map(({ label, value, cls }) => (
          <div key={label} className="px-5 py-4 text-center">
            <p className={`text-[22px] font-bold ${cls}`}>{value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Groups */}
      <div className="px-5 py-4">
        <ResultGroup
          title="Successfully registered"
          icon={<IconCheck size={13} />}
          results={success}
          color="text-[#02644A]"
        />
        <ResultGroup
          title="Partial — account created, photo failed"
          icon={<IconAlertTriangle size={13} />}
          results={partial}
          color="text-amber-600"
        />
        <ResultGroup
          title="Completely failed"
          icon={<IconX size={13} />}
          results={failed}
          color="text-red-600"
        />

        <button
          onClick={onReset}
          className="mt-2 flex items-center gap-2 text-[13px] text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IconRefresh size={14} /> Register more students
        </button>
      </div>
    </div>
  );
}
