"use client";

import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import type { StudentDraft, Gender } from "../types";
import Field from '../../../../components/ui/Field';
import Input from "../../../../components/ui/Input";
import PhotoUpload from "../../../../components/dashboard/PhotoUpload";

interface Props {
  draft: StudentDraft;
  index: number;
  total: number;
  onChange: (d: StudentDraft) => void;
  onNext: () => void;
  isLast: boolean;
}

const GENDERS: Gender[] = ["MALE", "FEMALE"];

function extractContentType(base64: string): "jpeg" | "jpg" | "png" | "webp" | null {
  const match = base64.match(/^data:image\/(jpeg|jpg|png|webp);base64,/);
  return match ? (match[1] as "jpeg" | "jpg" | "png" | "webp") : null;
}

export default function StudentFormCard({ draft, index, total, onChange, onNext, isLast }: Props) {
  const set = <K extends keyof StudentDraft>(k: K) => (v: StudentDraft[K]) =>
    onChange({ ...draft, [k]: v });

  const valid =
    draft.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email) &&
    draft.registrationNo.trim().length >= 1 &&
    draft.registrationNo.trim().length <= 25 &&
    draft.gender !== "";

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
            <span className="text-[12px] font-semibold text-[#02644A]">{index + 1}</span>
          </div>
          <p className="text-[13px] font-medium text-gray-900">Student {index + 1}</p>
        </div>
        <span className="text-[11px] text-gray-400">{index + 1} of {total}</span>
      </div>

      <div className="px-5 py-5">
        {/* Photo */}
        <PhotoUpload
          photo={draft.photo}
          name={draft.name || "?"}
          onChange={(base64) => {
            const ct = extractContentType(base64);
            onChange({ ...draft, photo: base64, photoContentType: ct });
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full name">
            <Input
              value={draft.name}
              onChange={(e) => set("name")(e.target.value)}
              placeholder="e.g. Rahim Uddin"
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={draft.email}
              onChange={(e) => set("email")(e.target.value)}
              placeholder="student@neu.ac.bd"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Registration no.">
            <Input
              value={draft.registrationNo}
              onChange={(e) => set("registrationNo")(e.target.value)}
              placeholder="202204023"
            />
          </Field>
          <Field label="Gender">
            <select
              value={draft.gender}
              onChange={(e) => set("gender")(e.target.value as Gender)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-1 ring-[#02644A]/50 transition-colors"
            >
              <option value="">— select —</option>
              {GENDERS.map((g) => (
                <option key={g} value={g}>{g.charAt(0) + g.slice(1).toLowerCase()}</option>
              ))}
            </select>
          </Field>
        </div>

        <button
          onClick={onNext}
          disabled={!valid}
          className="w-full mt-2 flex items-center justify-center gap-2
            bg-[#02644A] hover:bg-[#00916A] active:bg-[#024f3b] text-white rounded-lg
            px-5 py-2.5 text-[13px] font-medium transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLast ? (
            <><IconCheck size={14} /> Done — ready to register</>
          ) : (
            <>Next student <IconChevronRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
}
