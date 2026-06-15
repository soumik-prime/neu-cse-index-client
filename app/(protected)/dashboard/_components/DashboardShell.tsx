// app/dashboard/_components/DashboardShell.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

// ── Icons ─────────────────────────────────────────────────────────────────────
const Icon = {
  Profile:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  HigherStudy:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  Password:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Users:        () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Register:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>,
  Academic:     () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Institution:  () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M8 9V7a4 4 0 0 1 8 0v2"/><line x1="12" y1="13" x2="12" y2="17"/></svg>,
  Country:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Address:      () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Menu:         () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  Close:        () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Logout:       () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// ── Nav config by role ────────────────────────────────────────────────────────
type Role = "user" | "admin" | "superadmin";

interface NavItem {
  label: string;
  href:  string;
  icon:  () => ReactElement;
  roles: Role[];
}

const NAV: NavItem[] = [
  // USER
  { label: "My Profile",     href: "/dashboard/profile",        icon: Icon.Profile,     roles: ["user","admin","superadmin"] },
  { label: "Higher Studies", href: "/dashboard/higher-studies", icon: Icon.HigherStudy, roles: ["user","admin","superadmin"] },
  { label: "Password",       href: "/dashboard/password",       icon: Icon.Password,    roles: ["user","admin","superadmin"] },
  // ADMIN+
  { label: "Users",          href: "/dashboard/users",          icon: Icon.Users,       roles: ["admin","superadmin"] },
  { label: "Register User",  href: "/dashboard/register",       icon: Icon.Register,    roles: ["admin","superadmin"] },
  { label: "Institutions",   href: "/dashboard/institutions",   icon: Icon.Institution, roles: ["admin","superadmin"] },
  // SUPERADMIN
  { label: "Register Admin", href: "/dashboard/register-admin", icon: Icon.Register,    roles: ["superadmin"] },
  { label: "Academics",      href: "/dashboard/academics",      icon: Icon.Academic,    roles: ["superadmin"] },
  { label: "Countries",      href: "/dashboard/countries",      icon: Icon.Country,     roles: ["superadmin"] },
  { label: "Addresses",      href: "/dashboard/addresses",      icon: Icon.Address,     roles: ["superadmin"] },
];

const ROLE_BADGE: Record<Role, { label: string; color: string }> = {
  user:        { label: "User",        color: "#22a899" },
  admin:       { label: "Admin",       color: "#e0a060" },
  superadmin:  { label: "Superadmin",  color: "#c87ef0" },
};

interface User {
  id:             string;
  name:           string;
  email:          string;
  image?:         string;
  role:           Role;
  registrationNo: string;
}

// ── Shell ─────────────────────────────────────────────────────────────────────
export default function DashboardShell({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);
  const badge     = ROLE_BADGE[user.role];
  const visibleNav = NAV.filter(n => n.roles.includes(user.role));

  const NavLink = ({ item }: { item: NavItem }) => {
    const active = pathname === item.href || pathname.startsWith(item.href + "/");
    return (
      <Link
        href={item.href}
        onClick={() => setOpen(false)}
        className={[
          "flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-mono transition-all",
          active
            ? "bg-[rgba(34,168,153,0.12)] text-accent border border-[rgba(34,168,153,0.2)]"
            : "text-text-secondary border border-transparent hover:text-text-primary hover:bg-bg-elevated",
        ].join(" ")}
      >
        <span className={active ? "text-accent" : "text-text-muted"}>
          <item.icon />
        </span>
        {item.label}
      </Link>
    );
  };

  const Sidebar = () => (
    <aside className="flex flex-col h-full">
      {/* User info */}
      <div className="px-4 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-bg-elevated border border-border-subtle overflow-hidden shrink-0 flex items-center justify-center">
            {user.image
              ? <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              : <span className="text-text-muted text-xs">{user.name[0]}</span>
            }
          </div>
          <div className="min-w-0">
            <p className="text-text-bright text-xs font-semibold truncate leading-tight">{user.name}</p>
            <p className="text-text-muted text-[10px] truncate">{user.email}</p>
          </div>
        </div>
        <div className="mt-2.5">
          <span
            className="inline-block rounded px-2 py-0.5 text-[10px] font-mono font-semibold border"
            style={{ color: badge.color, borderColor: badge.color + "40", background: badge.color + "15" }}
          >
            {badge.label}
          </span>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        {/* Group dividers */}
        {user.role !== "user" && (
          <>
            <div className="flex flex-col gap-0.5">
              <p className="label text-[9px] px-2 mb-1 mt-0">Account</p>
              {visibleNav.filter(n => ["user","admin","superadmin"].every(r => n.roles.includes(r as Role))).map(n => (
                <NavLink key={n.href} item={n} />
              ))}
            </div>
            <div className="my-2 border-t border-border-subtle" />
            <div className="flex flex-col gap-0.5">
              <p className="label text-[9px] px-2 mb-1">Management</p>
              {visibleNav.filter(n => !["user","admin","superadmin"].every(r => n.roles.includes(r as Role)) && n.roles.includes("admin")).map(n => (
                <NavLink key={n.href} item={n} />
              ))}
            </div>
            {user.role === "superadmin" && (
              <>
                <div className="my-2 border-t border-border-subtle" />
                <div className="flex flex-col gap-0.5">
                  <p className="label text-[9px] px-2 mb-1">System</p>
                  {visibleNav.filter(n => n.roles.length === 1 && n.roles[0] === "superadmin").map(n => (
                    <NavLink key={n.href} item={n} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {user.role === "user" && visibleNav.map(n => (
          <NavLink key={n.href} item={n} />
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4 border-t border-border-subtle pt-3">
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-mono text-text-secondary border border-transparent hover:text-status-error hover:border-[rgba(224,96,112,0.2)] hover:bg-[rgba(224,96,112,0.05)] transition-all"
          >
            <Icon.Logout />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-[calc(100vh-80px)]">

      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex flex-col w-56 shrink-0 border-r border-border-subtle bg-bg-surface sticky top-20 h-[calc(100vh-80px)]">
        <Sidebar />
      </div>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className={[
        "fixed top-20 left-0 z-50 h-[calc(100vh-80px)] w-56 bg-bg-surface border-r border-border-subtle transition-transform duration-200 md:hidden",
        open ? "translate-x-0" : "-translate-x-full",
      ].join(" ")}>
        <Sidebar />
      </div>

      {/* ── Main ── */}
      <div className="flex-1 min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border-subtle bg-bg-surface">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-border-subtle text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
          <span className="text-text-primary text-sm font-semibold font-display">Dashboard</span>
        </div>

        <div className="p-4 md:p-8 max-w-5xl">
          {children}
        </div>
      </div>
    </div>
  );
}