"use client";
import { useState, useRef } from "react";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Btn, useConfirm, useToast } from "../_components/ui";

import { BATCHES as BATCHES_CONST } from "../_data/constants";
import { Avatar } from "../_components/shared";

interface Row { tempId: number; name: string; email: string; reg: string; photo: string | null; }
function emptyRow(): Row { return { tempId: Date.now() + Math.random(), name: "", email: "", reg: "", photo: null }; }

const cellCls = "w-full border border-gray-200 rounded-md px-2.5 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] placeholder:text-gray-400";

export default function RegisterUsersPage() {
  const { setUsers } = useApp();
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  const [globalSession, setGlobalSession] = useState("");
  const [globalBatch, setGlobalBatch] = useState("");
  const [rows, setRows] = useState<Row[]>([emptyRow(), emptyRow()]);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  function setRow(tempId: number, k: keyof Row, v: string) {
    setRows((p) => p.map((r) => r.tempId === tempId ? { ...r, [k]: v } : r));
  }
  function photoRow(tempId: number, file: File) {
    const r = new FileReader();
    r.onload = (ev) => setRow(tempId, "photo", ev.target!.result as string);
    r.readAsDataURL(file);
  }

  function submit() {
    const valid = rows.filter((r) => r.name && r.email && r.reg);
    if (!valid.length) { alert("Fill at least one complete row (Name, Email, Registration)."); return; }
    confirm({
      title: `Register ${valid.length} student${valid.length > 1 ? "s" : ""}?`,
      message: `${valid.length} student${valid.length > 1 ? "s" : ""} will be added${globalSession ? ` · Session ${globalSession}` : ""}${globalBatch ? ` · ${globalBatch} batch` : ""}.`,
      confirmLabel: "Register", variant: "primary",
      onConfirm: () => {
        setUsers((prev) => [
          ...prev,
          ...valid.map((r, i) => ({ ...r, id: prev.length + i + 1, session: globalSession, batch: globalBatch, semester: "1st", gradYear: "", visible: true })),
        ]);
        setRows([emptyRow(), emptyRow()]);
        toast(`${valid.length} student${valid.length > 1 ? "s" : ""} registered`);
      },
    });
  }

  return (
    <div>
      <SectionHeader title="Register users" sub="Add one or more students at once" />

      {/* Shared fields */}
      <div className="bg-[#f0fdf8] border border-[#D1FAE5] rounded-lg p-4 mb-5">
        <p className="text-[11px] font-bold text-[#02644A] uppercase tracking-widest mb-3">Shared for all students below</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Session">
            <Input value={globalSession} onChange={(e) => setGlobalSession(e.target.value)} placeholder="e.g. 2022-23" />
          </Field>
          <Field label="Batch">
            <select value={globalBatch} onChange={(e) => setGlobalBatch(e.target.value)}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A]">
              <option value="">— select —</option>
              {BATCHES_CONST.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </Field>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 sm:hidden">
        {rows.map((row, idx) => (
          <div key={row.tempId} className="border border-gray-200 rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer">
                  <Avatar name={row.name || "?"} photo={row.photo} size={34} />
                  <input ref={(el) => { fileRefs.current[row.tempId] = el; }} type="file" accept="image/*" className="hidden"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) photoRow(row.tempId, f); }} />
                </label>
                <span className="text-[12px] font-medium text-gray-500">Student {idx + 1}</span>
              </div>
              {rows.length > 1 && (
                <Btn variant="ghost" onClick={() => setRows((p) => p.filter((r) => r.tempId !== row.tempId))}>
                  <i className="ti ti-trash text-red-400 text-base" />
                </Btn>
              )}
            </div>
            <div className="space-y-2">
              <input value={row.name} onChange={(e) => setRow(row.tempId, "name", e.target.value)} placeholder="Full name *" className={cellCls} />
              <input type="email" value={row.email} onChange={(e) => setRow(row.tempId, "email", e.target.value)} placeholder="Email *" className={cellCls} />
              <input value={row.reg} onChange={(e) => setRow(row.tempId, "reg", e.target.value)} placeholder="Registration no. *" className={cellCls} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-[13px] border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 w-10">Photo</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 w-[30%]">Full name *</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 w-[30%]">Email *</th>
              <th className="text-left px-3 py-2.5 font-medium text-gray-500 w-[25%]">Registration *</th>
              <th className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.tempId} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2">
                  <label className="cursor-pointer">
                    <Avatar name={row.name || "?"} photo={row.photo} size={32} />
                    <input ref={(el) => { fileRefs.current[row.tempId] = el; }} type="file" accept="image/*" className="hidden"
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) photoRow(row.tempId, f); }} />
                  </label>
                </td>
                <td className="px-3 py-2"><input value={row.name} onChange={(e) => setRow(row.tempId, "name", e.target.value)} placeholder="Full name" className={cellCls} /></td>
                <td className="px-3 py-2"><input type="email" value={row.email} onChange={(e) => setRow(row.tempId, "email", e.target.value)} placeholder="email@neu.ac.bd" className={cellCls} /></td>
                <td className="px-3 py-2"><input value={row.reg} onChange={(e) => setRow(row.tempId, "reg", e.target.value)} placeholder="NEU-CSE-XX-XXX" className={cellCls} /></td>
                <td className="px-2 py-2">
                  {rows.length > 1 && (
                    <Btn variant="ghost" onClick={() => setRows((p) => p.filter((r) => r.tempId !== row.tempId))}>
                      <i className="ti ti-trash text-red-400 text-base" />
                    </Btn>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Btn onClick={() => setRows((p) => [...p, emptyRow()])}><i className="ti ti-plus" /> Add row</Btn>
        <Btn variant="primary" onClick={submit}>Register students</Btn>
      </div>
      {modal}{toastEl}
    </div>
  );
}
