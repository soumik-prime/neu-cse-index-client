"use client";
import { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Btn, Badge, Card, EmptyState, Field, Input, Select, useConfirm, useToast } from "../_components/ui";
import { InstitutionModal, AddressModal } from "../_components/shared";
import Pagination, { usePagination, usePageParam } from "../_components/Pagination";
import { SEMESTERS, COUNTRIES } from "../_data/constants";
import type { AcademicBatch } from "../_types";

type Tab = "institutions" | "addresses" | "academic";
const PAGE_SIZE = 20;
const selCls = "border border-gray-200 rounded-md px-2.5 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] w-full";

/* ── Batch Modal ── */
function BatchModal({ initial, onSave, onClose }: {
  initial?: Partial<AcademicBatch>;
  onSave: (b: Omit<AcademicBatch, "id">) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    batch:   initial?.batch   ?? "",
    semester:initial?.semester ?? "",
    gradYear:initial?.gradYear ?? "",
  });
  const set = (k: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold">{initial?.batch ? `Edit ${initial.batch} batch` : "Add batch"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="ti ti-x" /></button>
        </div>
        <Field label="Batch name">
          <Input value={form.batch} onChange={(e) => set("batch")(e.target.value)} placeholder="e.g. 6th" disabled={!!initial?.batch} />
        </Field>
        <Field label="Current semester">
          <Select options={[...SEMESTERS]} value={form.semester} onChange={(e) => set("semester")(e.target.value)} />
        </Field>
        <Field label="Expected graduation year">
          <Input value={form.gradYear} onChange={(e) => set("gradYear")(e.target.value)} placeholder="e.g. 2028" />
        </Field>
        <div className="flex gap-2 justify-end mt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" disabled={!form.batch || !form.semester} onClick={() => onSave(form)}>
            {initial?.batch ? "Save changes" : "Add batch"}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

function DataManagementInner() {
  const { institutions, setInstitutions, addresses, setAddresses, academicBatches, setAcademicBatches } = useApp();
  const { confirm, modal } = useConfirm();
  const { toast, toastEl } = useToast();
  const router   = useRouter();
  const pathname = usePathname();
  const sp       = useSearchParams();

  // tab from URL
  const tabParam = (sp.get("tab") as Tab) ?? "institutions";
  const [tab, setTabState] = useState<Tab>(tabParam);

  function setTab(t: Tab) {
    setTabState(t);
    const params = new URLSearchParams(sp.toString());
    params.set("tab", t);
    // reset pagination for new tab
    ["ipage","apage","bpage"].forEach((k) => params.delete(k));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // ── Institution state ──
  const instPage   = usePageParam("ipage");
  const [instSearch, setInstSearch] = useState(sp.get("iq") ?? "");
  const [instType,   setInstType]   = useState(sp.get("itype") ?? "");
  const [showInstModal, setShowInstModal] = useState(false);

  const filteredInst = institutions.filter((i) => {
    const q = instSearch.toLowerCase();
    return (
      (!q || i.name.toLowerCase().includes(q) || i.city.toLowerCase().includes(q) || i.country.toLowerCase().includes(q)) &&
      (!instType || i.type === instType)
    );
  });
  const { paged: pagedInst } = usePagination(filteredInst, instPage, PAGE_SIZE);

  // ── Address state ──
  const addrPage   = usePageParam("apage");
  const [addrSearch,   setAddrSearch]   = useState(sp.get("aq2") ?? "");
  const [addrCountry,  setAddrCountry]  = useState(sp.get("aco") ?? "");
  const [showAddrModal, setShowAddrModal] = useState(false);

  const filteredAddr = addresses.filter((a) => {
    const q = addrSearch.toLowerCase();
    return (
      (!q || a.city.toLowerCase().includes(q) || a.country.toLowerCase().includes(q)) &&
      (!addrCountry || a.country === addrCountry)
    );
  });
  const { paged: pagedAddr } = usePagination(filteredAddr, addrPage, PAGE_SIZE);

  // ── Academic batch state ──
  const batchPage  = usePageParam("bpage");
  const [batchSearch,  setBatchSearch]  = useState(sp.get("bq2") ?? "");
  const [batchSem,     setBatchSem]     = useState(sp.get("bsem2") ?? "");
  const [batchModal, setBatchModal]     = useState<{ open: boolean; editing: AcademicBatch | null }>({ open: false, editing: null });

  const filteredBatches = academicBatches.filter((b) => {
    const q = batchSearch.toLowerCase();
    return (
      (!q || b.batch.toLowerCase().includes(q) || (b.gradYear ?? "").includes(q)) &&
      (!batchSem || b.semester === batchSem)
    );
  });
  const { paged: pagedBatches } = usePagination(filteredBatches, batchPage, PAGE_SIZE);

  // ── Param helpers ──
  function pushInst(overrides: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(overrides).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    params.delete("ipage"); router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function pushAddr(overrides: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(overrides).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    params.delete("apage"); router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function pushBatch(overrides: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(overrides).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    params.delete("bpage"); router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // ── CRUD ──
  function deleteInst(id: number, name: string) {
    confirm({ title: "Delete institution?", message: `"${name}" will be removed.`, confirmLabel: "Delete",
      onConfirm: () => { setInstitutions((p) => p.filter((i) => i.id !== id)); toast("Institution deleted"); },
    });
  }
  function deleteAddr(id: number, city: string) {
    confirm({ title: "Delete address?", message: `"${city}" will be removed.`, confirmLabel: "Delete",
      onConfirm: () => { setAddresses((p) => p.filter((a) => a.id !== id)); toast("Address deleted"); },
    });
  }
  function saveBatch(form: Omit<AcademicBatch, "id">) {
    if (batchModal.editing) {
      confirm({ title: "Save batch?", message: `Update ${batchModal.editing.batch} batch details.`, confirmLabel: "Save", variant: "primary",
        onConfirm: () => { setAcademicBatches((p) => p.map((b) => b.id === batchModal.editing!.id ? { ...b, ...form } : b)); setBatchModal({ open: false, editing: null }); toast("Batch updated"); },
      });
    } else {
      confirm({ title: "Add batch?", message: `Add "${form.batch}" batch to the system.`, confirmLabel: "Add", variant: "primary",
        onConfirm: () => { setAcademicBatches((p) => [...p, { ...form, id: Date.now() }]); setBatchModal({ open: false, editing: null }); toast("Batch added"); },
      });
    }
  }
  function deleteBatch(b: AcademicBatch) {
    confirm({ title: "Delete batch?", message: `"${b.batch}" batch will be permanently removed.`, confirmLabel: "Delete",
      onConfirm: () => { setAcademicBatches((p) => p.filter((x) => x.id !== b.id)); toast("Batch deleted"); },
    });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "institutions", label: "Institutions" },
    { key: "addresses",    label: "Addresses" },
    { key: "academic",     label: "Academic data" },
  ];

  const INST_TYPES = ["University","College","High School","Other"];

  return (
    <div>
      <SectionHeader title="Data management" sub="Manage reference data used across the platform" />

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-5">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 text-[13px] border-b-2 -mb-px transition-colors ${
              tab === t.key ? "border-[#02644A] text-gray-900 font-semibold" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ══ Institutions ══ */}
      {tab === "institutions" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" />
              <Input value={instSearch} onChange={(e) => { setInstSearch(e.target.value); pushInst({ iq: e.target.value }); }} placeholder="Search institutions…" className="pl-8" />
            </div>
            <select value={instType} onChange={(e) => { setInstType(e.target.value); pushInst({ itype: e.target.value }); }} className={selCls + " sm:w-44"}>
              <option value="">All types</option>
              {INST_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
            {(instSearch || instType) && <Btn onClick={() => { setInstSearch(""); setInstType(""); pushInst({ iq: "", itype: "" }); }}>Clear</Btn>}
            <Btn onClick={() => setShowInstModal(true)}><i className="ti ti-plus" /> Add</Btn>
          </div>

          {filteredInst.length === 0 && <EmptyState icon="ti-building-off" text="No institutions found." />}
          {pagedInst.map((inst) => (
            <Card key={inst.id} className="mb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-[14px] text-gray-900 truncate">{inst.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge color="blue">{inst.type}</Badge>
                    <span className="text-[12px] text-gray-500">{inst.city}, {inst.country}</span>
                    {inst.website && (
                      <a href={inst.website} target="_blank" rel="noreferrer" className="text-[12px] text-[#02644A] hover:underline flex items-center gap-0.5">
                        <i className="ti ti-external-link text-[12px]" /> Website
                      </a>
                    )}
                  </div>
                </div>
                <Btn variant="danger" onClick={() => deleteInst(inst.id, inst.name)} className="shrink-0"><i className="ti ti-trash" /></Btn>
              </div>
            </Card>
          ))}
          <Pagination total={filteredInst.length} page={instPage} pageSize={PAGE_SIZE} paramKey="ipage" />

          {showInstModal && (
            <InstitutionModal
              onSave={(i) => {
                confirm({ title: "Add institution?", message: `"${i.name}" will be added.`, confirmLabel: "Add", variant: "primary",
                  onConfirm: () => { setInstitutions((p) => [...p, { ...i, id: Date.now() }]); toast("Institution added"); },
                });
                setShowInstModal(false);
              }}
              onClose={() => setShowInstModal(false)}
            />
          )}
        </div>
      )}

      {/* ══ Addresses ══ */}
      {tab === "addresses" && (
        <div>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" />
              <Input value={addrSearch} onChange={(e) => { setAddrSearch(e.target.value); pushAddr({ aq2: e.target.value }); }} placeholder="Search by city or country…" className="pl-8" />
            </div>
            <select value={addrCountry} onChange={(e) => { setAddrCountry(e.target.value); pushAddr({ aco: e.target.value }); }} className={selCls + " sm:w-44"}>
              <option value="">All countries</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {(addrSearch || addrCountry) && <Btn onClick={() => { setAddrSearch(""); setAddrCountry(""); pushAddr({ aq2: "", aco: "" }); }}>Clear</Btn>}
            <Btn onClick={() => setShowAddrModal(true)}><i className="ti ti-plus" /> Add</Btn>
          </div>

          {filteredAddr.length === 0 && <EmptyState icon="ti-map-pin-off" text="No addresses found." />}
          {pagedAddr.map((a) => (
            <Card key={a.id} className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ti ti-map-pin text-[#02644A] text-[15px]" />
                  <span className="text-[14px] text-gray-900 font-medium">{a.city}</span>
                  <span className="text-[13px] text-gray-500">· {a.country}</span>
                </div>
                <Btn variant="danger" onClick={() => deleteAddr(a.id, a.city)}><i className="ti ti-trash" /></Btn>
              </div>
            </Card>
          ))}
          <Pagination total={filteredAddr.length} page={addrPage} pageSize={PAGE_SIZE} paramKey="apage" />

          {showAddrModal && (
            <AddressModal
              onSave={(a) => {
                confirm({ title: "Add address?", message: `"${a.city}, ${a.country}" will be added.`, confirmLabel: "Add", variant: "primary",
                  onConfirm: () => { setAddresses((p) => [...p, { ...a, id: Date.now() }]); toast("Address added"); },
                });
                setShowAddrModal(false);
              }}
              onClose={() => setShowAddrModal(false)}
            />
          )}
        </div>
      )}

      {/* ══ Academic data ══ */}
      {tab === "academic" && (
        <div>
          {/* Search + filter */}
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <div className="relative flex-1">
              <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" />
              <Input value={batchSearch} onChange={(e) => { setBatchSearch(e.target.value); pushBatch({ bq2: e.target.value }); }} placeholder="Search batch name or grad year…" className="pl-8" />
            </div>
            <select value={batchSem} onChange={(e) => { setBatchSem(e.target.value); pushBatch({ bsem2: e.target.value }); }} className={selCls + " sm:w-44"}>
              <option value="">All semesters</option>
              {SEMESTERS.map((s) => <option key={s}>{s}</option>)}
            </select>
            {(batchSearch || batchSem) && <Btn onClick={() => { setBatchSearch(""); setBatchSem(""); pushBatch({ bq2: "", bsem2: "" }); }}>Clear</Btn>}
            <Btn onClick={() => setBatchModal({ open: true, editing: null })}><i className="ti ti-plus" /> Add batch</Btn>
          </div>

          {filteredBatches.length === 0 && <EmptyState icon="ti-stack-2" text={batchSearch || batchSem ? "No batches match your search." : "No batches yet."} />}

          {filteredBatches.length > 0 && (
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left py-2.5 px-3 font-semibold text-gray-500">Batch</th>
                      <th className="text-left py-2.5 px-3 font-semibold text-gray-500">Current semester</th>
                      <th className="text-left py-2.5 px-3 font-semibold text-gray-500">Grad year</th>
                      <th className="py-2.5 px-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {pagedBatches.map((b) => (
                      <tr key={b.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                        <td className="py-2.5 px-3 font-medium text-gray-900">{b.batch} batch</td>
                        <td className="py-2.5 px-3 text-gray-600">{b.semester}</td>
                        <td className="py-2.5 px-3 text-gray-600">{b.gradYear || "—"}</td>
                        <td className="py-2.5 px-3">
                          <div className="flex gap-1.5 justify-end">
                            <Btn onClick={() => setBatchModal({ open: true, editing: b })}><i className="ti ti-edit" /> Edit</Btn>
                            <Btn variant="danger" onClick={() => deleteBatch(b)}><i className="ti ti-trash" /></Btn>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-3 pb-3">
                <Pagination total={filteredBatches.length} page={batchPage} pageSize={PAGE_SIZE} paramKey="bpage" />
              </div>
            </Card>
          )}

          {batchModal.open && (
            <BatchModal initial={batchModal.editing ?? undefined} onSave={saveBatch} onClose={() => setBatchModal({ open: false, editing: null })} />
          )}
        </div>
      )}

      {modal}{toastEl}
    </div>
  );
}

export default function DataManagementPage() {
  return <Suspense><DataManagementInner /></Suspense>;
}
