"use client";
import { useState } from "react";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Divider, Btn, Card, useConfirm, useToast } from "../_components/ui";
import { InstSelect, InstitutionModal } from "../_components/shared";

export default function HistoryPage() {
  const { profile, setProfile, institutions, setInstitutions } = useApp();
  const [showInst, setShowInst] = useState(false);
  const [pending, setPending] = useState<string | { hs: number } | null>(null);
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  const set = (k: string) => (v: string) => setProfile((p) => ({ ...p, [k]: v }));

  function addEntry() {
    setProfile((p) => ({ ...p, higherStudy: [...p.higherStudy, { degree: "", field: "", institution: "", startDate: "", endDate: "" }] }));
  }
  function removeEntry(i: number) {
    confirm({ title: "Remove entry?", message: "This higher education entry will be deleted.", confirmLabel: "Remove",
      onConfirm: () => setProfile((p) => ({ ...p, higherStudy: p.higherStudy.filter((_, idx) => idx !== i) })) });
  }
  function setHS(i: number, k: string, v: string) {
    setProfile((p) => { const hs = [...p.higherStudy]; hs[i] = { ...hs[i], [k]: v }; return { ...p, higherStudy: hs }; });
  }
  function handleInstChange(key: string, v: string) {
    if (v === "__add__") { setPending(key); setShowInst(true); } else set(key)(v);
  }
  function handleHSInst(i: number, v: string) {
    if (v === "__add__") { setPending({ hs: i }); setShowInst(true); } else setHS(i, "institution", v);
  }

  return (
    <div>
      <SectionHeader title="Education history" />
      <Field label="SSC institution">
        <InstSelect institutions={institutions} value={profile.ssc} onChange={(v) => handleInstChange("ssc", v)} />
      </Field>
      <Field label="HSC institution">
        <InstSelect institutions={institutions} value={profile.hsc} onChange={(v) => handleInstChange("hsc", v)} />
      </Field>
      <Divider />
      <div className="flex justify-between items-center mb-3">
        <p className="font-semibold text-[14px] text-gray-900">Higher education</p>
        <Btn onClick={addEntry}><i className="ti ti-plus" aria-hidden /> Add entry</Btn>
      </div>
      {profile.higherStudy.length === 0 && (
        <p className="text-[13px] text-gray-400 text-center py-8 border border-dashed border-gray-200 rounded-lg">No higher education entries yet.</p>
      )}
      {profile.higherStudy.map((hs, i) => (
        <Card key={i} className="mb-3">
          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold text-[14px] text-gray-900">Entry {i + 1}</p>
            <Btn variant="ghost" onClick={() => removeEntry(i)}><i className="ti ti-trash text-red-500" /></Btn>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Field label="Degree"><Input value={hs.degree} onChange={(e) => setHS(i, "degree", e.target.value)} placeholder="B.Sc. Engineering" /></Field>
            <Field label="Field of study"><Input value={hs.field} onChange={(e) => setHS(i, "field", e.target.value)} placeholder="Computer Science" /></Field>
          </div>
          <Field label="Institution">
            <InstSelect institutions={institutions} value={hs.institution} onChange={(v) => handleHSInst(i, v)} />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Field label="Start date"><Input type="date" value={hs.startDate} onChange={(e) => setHS(i, "startDate", e.target.value)} /></Field>
            <Field label="End date (blank if ongoing)"><Input type="date" value={hs.endDate} onChange={(e) => setHS(i, "endDate", e.target.value)} /></Field>
          </div>
        </Card>
      ))}
      <Btn variant="primary" onClick={() => confirm({ title: "Save history?", message: "Your education history will be updated.", confirmLabel: "Save", variant: "primary", onConfirm: () => toast("Saved!") })}>
        Save history
      </Btn>
      {modal}{toastEl}
      {showInst && (
        <InstitutionModal
          onSave={(inst) => {
            const next = [...institutions, { ...inst, id: institutions.length + 1 }];
            setInstitutions(next);
            if (pending === "ssc") set("ssc")(inst.name);
            else if (pending === "hsc") set("hsc")(inst.name);
            else if (typeof pending === "object" && pending) setHS(pending.hs, "institution", inst.name);
            setShowInst(false); setPending(null);
          }}
          onClose={() => { setShowInst(false); setPending(null); }}
        />
      )}
    </div>
  );
}
