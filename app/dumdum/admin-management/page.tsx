"use client";
import { useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useApp } from "../_components/AppProvider";
import { SectionHeader, Field, Input, Btn, Badge, Card, ErrorText, EmptyState, useConfirm, useToast } from "../_components/ui";
import { Avatar, PhotoUpload } from "../_components/shared";
import Pagination, { usePagination, usePageParam } from "../_components/Pagination";
import type { Admin } from "../_types";

type AdminRole = "admin" | "superadmin";
const emptyForm = { name: "", email: "", role: "admin" as AdminRole, photo: null as string | null };
const PAGE_SIZE = 20;

function EditAdminModal({ admin, onSave, onClose }: {
  admin: Admin;
  onSave: (data: { name: string; email: string; role: AdminRole; photo: string | null }) => void;
  onClose: () => void;
}) {
  const [form, setForm]     = useState({ name: admin.name, email: admin.email, role: admin.role, photo: admin.photo });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    setErrors(e); return Object.keys(e).length === 0;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-semibold text-gray-900">Edit admin</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
            <i className="ti ti-x text-[16px]" aria-hidden />
          </button>
        </div>
        <PhotoUpload photo={form.photo} name={form.name || "?"} onChange={(v) => setForm((p) => ({ ...p, photo: v }))} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full name">
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Dr. First Last" />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="admin@neu.ac.bd" />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>
        </div>
        <Field label="Role">
          <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as AdminRole }))}
            className="border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] w-auto">
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </Field>
        <div className="flex gap-2 justify-end mt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" onClick={() => { if (validate()) onSave(form); }}>Save changes</Btn>
        </div>
      </Card>
    </div>
  );
}

function AdminManagementInner() {
  const { admins, setAdmins } = useApp();
  const { confirm, modal }    = useConfirm();
  const { toast, toastEl }    = useToast();
  const router    = useRouter();
  const pathname  = usePathname();
  const sp        = useSearchParams();

  const page = usePageParam("apage");
  const [search, setSearch]       = useState(sp.get("aq") ?? "");
  const [form, setForm]           = useState(emptyForm);
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  const filtered = admins.filter((a) => {
    const q = search.toLowerCase();
    return !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
  });

  const { paged } = usePagination(filtered, page, PAGE_SIZE);

  function handleSearch(v: string) {
    setSearch(v);
    const params = new URLSearchParams(sp.toString());
    v ? params.set("aq", v) : params.delete("aq");
    params.delete("apage");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function validateForm() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    setErrors(e); return Object.keys(e).length === 0;
  }

  function register() {
    if (!validateForm()) return;
    confirm({ title: "Register admin?", message: `${form.name} will be added as ${form.role === "superadmin" ? "Super Admin" : "Admin"}.`, confirmLabel: "Register", variant: "primary",
      onConfirm: () => { setAdmins((p) => [...p, { ...form, id: Date.now() }]); setForm(emptyForm); toast("Admin registered"); },
    });
  }

  function saveEdit(data: typeof emptyForm) {
    if (!editingAdmin) return;
    confirm({ title: "Save changes?", message: `Update details for ${data.name}.`, confirmLabel: "Save", variant: "primary",
      onConfirm: () => { setAdmins((p) => p.map((a) => a.id === editingAdmin.id ? { ...a, ...data } : a)); setEditingAdmin(null); toast("Admin updated"); },
    });
  }

  function deleteAdmin(a: Admin) {
    confirm({ title: "Remove admin?", message: `${a.name}'s admin access will be revoked.`, confirmLabel: "Remove",
      onConfirm: () => { setAdmins((p) => p.filter((x) => x.id !== a.id)); toast("Admin removed"); },
    });
  }

  return (
    <div>
      <SectionHeader title="Admin management" sub="Register and manage admin accounts" />

      {/* Register form */}
      <Card className="mb-6">
        <p className="text-[14px] font-semibold text-gray-900 mb-4">Register new admin</p>
        <PhotoUpload photo={form.photo} name={form.name || "?"} onChange={(v) => setForm((p) => ({ ...p, photo: v }))} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full name">
            <Input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Dr. First Last" />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </Field>
          <Field label="Email">
            <Input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="admin@neu.ac.bd" />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </Field>
        </div>
        <Field label="Role">
          <select value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value as AdminRole }))}
            className="border border-gray-200 rounded-md px-3 py-2 text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] w-auto">
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
          </select>
        </Field>
        <Btn variant="primary" onClick={register}>Register admin</Btn>
      </Card>

      {/* Existing admins header */}
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <p className="text-[14px] font-semibold text-gray-900 shrink-0">
          Existing admins <span className="text-gray-400 font-normal">({filtered.length})</span>
        </p>
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[14px]" aria-hidden />
          <Input value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Search admins…" className="pl-8" />
        </div>
      </div>

      {filtered.length === 0 && <EmptyState icon="ti-shield-off" text={search ? "No admins match your search." : "No admins yet."} />}

      {paged.map((a) => (
        <Card key={a.id} className="mb-2.5">
          <div className="flex items-center gap-3">
            <Avatar name={a.name} photo={a.photo} size={40} bgClass="bg-amber-100 text-amber-700" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-[14px] text-gray-900">{a.name}</p>
                <Badge color={a.role === "superadmin" ? "purple" : "teal"}>
                  {a.role === "superadmin" ? "Super Admin" : "Admin"}
                </Badge>
              </div>
              <p className="text-[12px] text-gray-500 mt-0.5">{a.email}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <Btn onClick={() => setEditingAdmin(a)} className="hidden sm:inline-flex"><i className="ti ti-edit" /> Edit</Btn>
              <Btn onClick={() => setEditingAdmin(a)} className="sm:hidden"><i className="ti ti-edit" /></Btn>
              <Btn variant="danger" onClick={() => deleteAdmin(a)}><i className="ti ti-trash" /></Btn>
            </div>
          </div>
        </Card>
      ))}

      <Pagination total={filtered.length} page={page} pageSize={PAGE_SIZE} paramKey="apage" />

      {editingAdmin && <EditAdminModal admin={editingAdmin} onSave={saveEdit} onClose={() => setEditingAdmin(null)} />}
      {modal}{toastEl}
    </div>
  );
}

export default function AdminManagementPage() {
  return <Suspense><AdminManagementInner /></Suspense>;
}
