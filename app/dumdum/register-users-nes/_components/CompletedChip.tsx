"use client";

import { IconCheck } from "@tabler/icons-react";
import type { StudentDraft } from "../types";
import Avatar from "../../../../components/ui/Avater";

export default function CompletedChip({ draft, index }: { draft: StudentDraft; index: number }) {
  return (
    <div className="flex items-center gap-2.5 bg-[#f0fdf8] border border-[#D1FAE5] rounded-lg px-3.5 py-2.5">
      <Avatar name={draft.name || "?"} photo={draft.photo} size={28} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-gray-900 truncate">{draft.name || `Student ${index + 1}`}</p>
        <p className="text-[11px] text-gray-500 truncate">{draft.registrationNo}</p>
      </div>
      <div className="w-5 h-5 rounded-full bg-[#02644A] flex items-center justify-center shrink-0">
        <IconCheck size={11} className="text-white" />
      </div>
    </div>
  );
}
