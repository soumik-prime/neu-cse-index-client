"use client";

import { useState, useRef, useCallback } from "react";
import { Btn, Card, Field, Input, Select } from "./ui";
import { COUNTRIES, CITIES, INST_TYPES } from "../_data/constants";

/* ── Avatar ── */
export function initials(name = "") {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
}
export function Avatar({ name, photo, size = 36, bgClass = "bg-[#D1FAE5] text-[#02644A]" }: {
  name: string; photo: string | null; size?: number; bgClass?: string;
}) {
  if (photo) return <img src={photo} alt={name} className="rounded-full object-cover shrink-0" style={{ width: size, height: size }} />;
  return (
    <div className={`rounded-full flex items-center justify-center shrink-0 font-semibold ${bgClass}`}
      style={{ width: size, height: size, fontSize: size * 0.32 }}>
      {initials(name)}
    </div>
  );
}

/* ── CropModal ── */
export function CropModal({ src, onSave, onClose }: { src: string; onSave: (d: string) => void; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, ox: 0, oy: 0 });
  const imgRef = useRef(new Image());

  const draw = useCallback(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, 200, 200);
    ctx.save();
    ctx.beginPath(); ctx.arc(100, 100, 100, 0, Math.PI * 2); ctx.clip();
    const img = imgRef.current;
    const s = Math.min(img.naturalWidth, img.naturalHeight) * zoom;
    ctx.drawImage(img, (img.naturalWidth - s) / 2 - offset.x, (img.naturalHeight - s) / 2 - offset.y, s, s, 0, 0, 200, 200);
    ctx.restore();
    ctx.beginPath(); ctx.arc(100, 100, 100, 0, Math.PI * 2);
    ctx.strokeStyle = "#e5e7eb"; ctx.lineWidth = 2; ctx.stroke();
  }, [zoom, offset]);

  useState(() => { const img = imgRef.current; img.onload = () => draw(); img.src = src; });
  useState(() => { draw(); });

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xs p-6">
        <h3 className="text-[15px] font-semibold mb-4">Crop photo</h3>
        <div className="flex justify-center mb-4">
          <canvas ref={canvasRef} width={200} height={200} className="cursor-move rounded-full border border-gray-200"
            onMouseDown={(e) => { dragging.current = true; dragStart.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }; }}
            onMouseMove={(e) => { if (!dragging.current) return; setOffset({ x: dragStart.current.ox + e.clientX - dragStart.current.x, y: dragStart.current.oy + e.clientY - dragStart.current.y }); draw(); }}
            onMouseUp={() => { dragging.current = false; }} onMouseLeave={() => { dragging.current = false; }}
          />
        </div>
        <label className="block text-[12px] text-gray-500 mb-1">Zoom</label>
        <input type="range" min={0.5} max={3} step={0.05} value={zoom} onChange={(e) => { setZoom(+e.target.value); draw(); }} className="w-full mb-4 accent-[#02644A]" />
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => { onSave(canvasRef.current!.toDataURL("image/jpeg", 0.85)); onClose(); }}>Save photo</Btn>
        </div>
      </Card>
    </div>
  );
}

/* ── PhotoUpload ── */
export function PhotoUpload({ photo, name, onChange }: { photo: string | null; name: string; onChange: (d: string) => void }) {
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  return (
    <div className="flex items-center gap-4 mb-5">
      <Avatar name={name} photo={photo} size={64} />
      <div>
        <label className="cursor-pointer">
          <Btn style={{ pointerEvents: "none" }}>Change photo</Btn>
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => setCropSrc(ev.target!.result as string); r.readAsDataURL(f); }} />
        </label>
        <p className="text-[12px] text-gray-400 mt-1">JPG, PNG · max 2 MB</p>
      </div>
      {cropSrc && <CropModal src={cropSrc} onSave={onChange} onClose={() => setCropSrc(null)} />}
    </div>
  );
}

/* ── CityPicker (shared) ── */
export function CityPicker({ country, value, onChange }: {
  country: string; value: string; onChange: (v: string) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [custom, setCustom] = useState("");
  const known = CITIES[country] || [];

  if (adding) {
    return (
      <div className="flex gap-2">
        <Input autoFocus value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Enter city name" />
        <Btn variant="primary" disabled={!custom.trim()} onClick={() => { onChange(custom.trim()); setAdding(false); setCustom(""); }}>Add</Btn>
        <Btn onClick={() => { setAdding(false); setCustom(""); }}>✕</Btn>
      </div>
    );
  }
  return (
    <select value={value} disabled={!country}
      onChange={(e) => { if (e.target.value === "__add__") setAdding(true); else onChange(e.target.value); }}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] disabled:opacity-50">
      <option value="">— select city —</option>
      {known.map((c) => <option key={c} value={c}>{c}</option>)}
      {country && <option value="__add__">+ My city isn't listed…</option>}
    </select>
  );
}

/* ── CityCountry ── */
export function CityCountry({ countryVal, cityVal, onCountry, onCity }: {
  countryVal: string; cityVal: string;
  onCountry: (v: string) => void; onCity: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Country">
        <Select options={COUNTRIES} value={countryVal}
          onChange={(e) => { onCountry(e.target.value); onCity(""); }} />
      </Field>
      <Field label="City">
        <CityPicker country={countryVal} value={cityVal} onChange={onCity} />
      </Field>
    </div>
  );
}

/* ── InstSelect ── */
export function InstSelect({ institutions, value, onChange }: {
  institutions: { id: number; name: string }[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A]">
      <option value="">— Select Institution —</option>
      {institutions.map((i) => <option key={i.id} value={i.name}>{i.name}</option>)}
      <option value="__add__">+ Add new institution…</option>
    </select>
  );
}

/* ── AddressModal ── */
export function AddressModal({ onSave, onClose }: {
  onSave: (a: { city: string; country: string }) => void; onClose: () => void;
}) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h3 className="text-[15px] font-semibold mb-4">Add address</h3>
        <Field label="Country">
          <Select options={COUNTRIES} value={country} onChange={(e) => { setCountry(e.target.value); setCity(""); }} />
        </Field>
        <Field label="City">
          <CityPicker country={country} value={city} onChange={setCity} />
        </Field>
        <div className="flex gap-2 justify-end mt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" disabled={!city || !country} onClick={() => onSave({ city, country })}>Add</Btn>
        </div>
      </Card>
    </div>
  );
}

/* ── InstitutionModal ── */
export function InstitutionModal({ onSave, onClose }: {
  onSave: (i: { name: string; type: string; website: string; city: string; country: string }) => void;
  onClose: () => void;
}) {
  const [d, setD] = useState({ name: "", type: "University", website: "", city: "", country: "" });
  const set = (k: keyof typeof d) => (v: string) => setD((p) => ({ ...p, [k]: v }));
  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <h3 className="text-[15px] font-semibold mb-4">Add institution</h3>
        <Field label="Name">
          <Input value={d.name} onChange={(e) => set("name")(e.target.value)} placeholder="Institution name" />
        </Field>
        <Field label="Type">
          <Select options={[...INST_TYPES]} value={d.type} onChange={(e) => set("type")(e.target.value)} />
        </Field>
        <Field label="Website (optional)">
          <Input value={d.website} onChange={(e) => set("website")(e.target.value)} placeholder="https://…" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Country">
            <Select options={COUNTRIES} value={d.country} onChange={(e) => { set("country")(e.target.value); set("city")(""); }} />
          </Field>
          <Field label="City">
            <CityPicker country={d.country} value={d.city} onChange={set("city")} />
          </Field>
        </div>
        <div className="flex gap-2 justify-end">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" disabled={!d.name} onClick={() => onSave(d)}>Add institution</Btn>
        </div>
      </Card>
    </div>
  );
}
