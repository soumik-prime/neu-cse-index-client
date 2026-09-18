"use client";
import { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Btn, Badge, Card, EmptyState, useConfirm, useToast } from "../_components/ui";
import { Avatar } from "../_components/shared";
import Pagination, { usePagination, usePageParam } from "../_components/Pagination";
import { BATCHES as BATCHES_CONST, SEMESTERS } from "../_data/constants";
import type { User } from "../_types";

const GRAD_YEARS = ["2022","2023","2024","2025","2026","2027","2028"];
const PAGE_SIZE  = 20;
const selCls     = "border border-gray-200 rounded-md px-2.5 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] w-full";

function UserManagementInner() {
  const { users, setUsers } = useApp();
  const { confirm, modal }  = useConfirm();
  const { toast, toastEl }  = useToast();
  const router    = useRouter();
  const pathname  = usePathname();
  const sp        = useSearchParams();

  const page      = usePageParam("page");
  const [search,   setSearch]   = useState(sp.get("q") ?? "");
  const [filters,  setFilters]  = useState({
    session:  sp.get("session")  ?? "",
    batch:    sp.get("batch")    ?? "",
    semester: sp.get("semester") ?? "",
    gradYear: sp.get("gradYear") ?? "",
  });
  const [editing,  setEditing]  = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  const sessions = [...new Set(users.map((u) => u.session).filter(Boolean))].sort();

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (!q || u.name.toLowerCase().includes(q) || u.reg.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)) &&
      (!filters.session  || u.session  === filters.session)  &&
      (!filters.batch    || u.batch    === filters.batch)    &&
      (!filters.semester || u.semester === filters.semester) &&
      (!filters.gradYear || u.gradYear === filters.gradYear)
    );
  });

  const { paged } = usePagination(filtered, page, PAGE_SIZE);

  function pushParams(overrides: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(overrides).forEach(([k, v]) => v ? params.set(k, v) : params.delete(k));
    params.delete("page"); // reset to p1 on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(v: string) { setSearch(v); pushParams({ q: v }); }
  function handleFilter(k: string, v: string) { setFilters((p) => ({ ...p, [k]: v })); pushParams({ [k]: v }); }
  function clearAll() {
    setSearch(""); setFilters({ session: "", batch: "", semester: "", gradYear: "" });
    router.push(pathname, { scroll: false });
  }

  const hasFilters = search || filters.session || filters.batch || filters.semester || filters.gradYear;

  function startEdit(u: User) { setEditing(u.id); setEditData({ reg: u.reg, session: u.session, batch: u.batch, semester: u.semester, gradYear: u.gradYear, visible: u.visible }); }

  function saveEdit(id: number) {
    confirm({ title: "Save changes?", message: "User academic details will be updated.", confirmLabel: "Save", variant: "primary",
      onConfirm: () => { setUsers((p) => p.map((u) => u.id === id ? { ...u, ...editData } : u)); setEditing(null); toast("User updated"); },
    });
  }

  function deleteUser(u: User) {
    confirm({ title: "Delete user?", message: `${u.name} (${u.reg}) will be permanently removed.`, confirmLabel: "Delete",
      onConfirm: () => { setUsers((p) => p.filter((x) => x.id !== u.id)); toast("User deleted"); },
    });
  }

  function toggleVisible(u: User) {
    confirm({
      title: u.visible ? "Hide profile?" : "Make visible?",
      message: u.visible ? `${u.name}'s profile will be hidden.` : `${u.name}'s profile will appear in the public index.`,
      confirmLabel: u.visible ? "Hide" : "Show", variant: u.visible ? "danger" : "primary",
      onConfirm: () => { setUsers((p) => p.map((x) => x.id === u.id ? { ...x, visible: !x.visible } : x)); toast("Visibility updated"); },
    });
  }

  return (
    <div>
      <SectionHeader title="User management" sub={`${users.length} total · ${filtered.length} shown`} />

      {/* Search */}
      <div className="flex gap-2 mb-3">
        <div className="relative flex-1">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" aria-hidden />
          <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search name, email or registration…" className="pl-8" />
        </div>
        {hasFilters && <Btn onClick={clearAll}>Clear all</Btn>}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        <select value={filters.session} onChange={(e) => handleFilter("session", e.target.value)} className={selCls}>
          <option value="">All sessions</option>
          {sessions.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.batch} onChange={(e) => handleFilter("batch", e.target.value)} className={selCls}>
          <option value="">All batches</option>
          {BATCHES_CONST.map((b) => <option key={b}>{b}</option>)}
        </select>
        <select value={filters.semester} onChange={(e) => handleFilter("semester", e.target.value)} className={selCls}>
          <option value="">All semesters</option>
          {SEMESTERS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.gradYear} onChange={(e) => handleFilter("gradYear", e.target.value)} className={selCls}>
          <option value="">All grad years</option>
          {GRAD_YEARS.map((y) => <option key={y}>{y}</option>)}
        </select>
      </div>

      {filtered.length === 0 && <EmptyState icon="ti-users-off" text="No users match your search." />}

      {paged.map((u) => (
        <Card key={u.id} className="mb-2.5">
          {editing === u.id ? (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
                <Field label="Registration"><Input value={editData.reg ?? ""} onChange={(e) => setEditData((p) => ({ ...p, reg: e.target.value }))} /></Field>
                <Field label="Session"><Input value={editData.session ?? ""} onChange={(e) => setEditData((p) => ({ ...p, session: e.target.value }))} placeholder="2022-23" /></Field>
                <Field label="Batch">
                  <select value={editData.batch ?? ""} onChange={(e) => setEditData((p) => ({ ...p, batch: e.target.value }))} className={selCls}>
                    <option value="">— select —</option>
                    {BATCHES_CONST.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </Field>
                <Field label="Semester">
                  <select value={editData.semester ?? ""} onChange={(e) => setEditData((p) => ({ ...p, semester: e.target.value }))} className={selCls}>
                    <option value="">— select —</option>
                    {SEMESTERS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Grad year"><Input value={editData.gradYear ?? ""} onChange={(e) => setEditData((p) => ({ ...p, gradYear: e.target.value }))} placeholder="2025" /></Field>
                <Field label="Visibility">
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" checked={editData.visible ?? true} onChange={(e) => setEditData((p) => ({ ...p, visible: e.target.checked }))} className="accent-[#02644A] w-4 h-4" />
                    <span className="text-[13px] text-gray-700">Public profile</span>
                  </label>
                </Field>
              </div>
              <div className="flex gap-2">
                <Btn variant="primary" onClick={() => saveEdit(u.id)}>Save</Btn>
                <Btn onClick={() => setEditing(null)}>Cancel</Btn>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar name={u.name} photo={u.photo} size={40} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-[14px] text-gray-900">{u.name}</p>
                  <Badge color={u.visible ? "teal" : "gray"}>{u.visible ? "Visible" : "Hidden"}</Badge>
                </div>
                <p className="text-[12px] text-gray-500 mt-0.5 truncate">{u.reg} · {u.session} · {u.batch} batch · Sem {u.semester}</p>
              </div>
              <div className="flex gap-1.5 shrink-0">
                <Btn onClick={() => startEdit(u)} className="hidden sm:inline-flex"><i className="ti ti-edit" /> Edit</Btn>
                <Btn onClick={() => startEdit(u)} className="sm:hidden"><i className="ti ti-edit" /></Btn>
                <Btn onClick={() => toggleVisible(u)} className="hidden sm:inline-flex"><i className={`ti ${u.visible ? "ti-eye-off" : "ti-eye"}`} /></Btn>
                <Btn variant="danger" onClick={() => deleteUser(u)}><i className="ti ti-trash" /></Btn>
              </div>
            </div>
          )}
        </Card>
      ))}

      <Pagination total={filtered.length} page={page} pageSize={PAGE_SIZE} paramKey="page" />
      {modal}{toastEl}
    </div>
  );
}

export default function UserManagementPage() {
  return <Suspense><UserManagementInner /></Suspense>;
}
