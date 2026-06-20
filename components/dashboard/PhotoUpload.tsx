"use client";
import { useState } from "react";
import Avatar from "../ui/Avater";
import CropModal from "./CropModal";

/* ── PhotoUpload ── */
export default function PhotoUpload({
  photo,
  name,
  onChange,
}: {
  photo: string | null;
  name: string;
  onChange: (d: string) => void;
}) {
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-4 mb-5">
      <Avatar name={name} photo={photo} size={64} />
      <div className=" mt-1 flex flex-col">
        <label className="cursor-pointer hover:bg-[#00916a1d] hover:border-[#00916A] hover:text-[#01644A] border border-gray-500/50 rounded px-3.5 py-2 text-sm font-semibold text-black/70">
          <span>Change photo</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const r = new FileReader();
              r.onload = (ev) => setCropSrc(ev.target!.result as string);
              r.readAsDataURL(f);
            }}
          />
        </label>
        <p className="text-[12px] text-gray-400 mt-1">JPG, PNG, WEBP</p>
      </div>
      {cropSrc && (
        <CropModal
          src={cropSrc}
          onSave={onChange}
          onClose={() => setCropSrc(null)}
        />
      )}
    </div>
  );
}
