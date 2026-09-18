"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./AppProvider";
import { Avatar } from "./shared";
import { NAV_STRUCTURE, CATEGORY_COLORS } from "../_data/constants";
import type { Role } from "../_types";

const ROLE_LABELS: Record<Role, string> = { user: "User", admin: "Admin", superadmin: "Super Admin" };

export function MobileTopbar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shrink-0">
      <button onClick={onOpen} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100" aria-label="Open menu">
        <i className="ti ti-menu-2 text-xl" aria-hidden />
      </button>
      <span className="text-[14px] font-semibold text-gray-900">NEU CSE Index</span>
    </div>
  );
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { role, setRole, profile } = useApp();
  const pathname = usePathname();
  const nav = NAV_STRUCTURE[role];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-[220px] shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      aria-label="Sidebar"
    >
      {/* Profile header */}
      <div className="px-3.5 py-4 border-b border-gray-100 space-y-3">
        <div className="flex items-center gap-2.5">
          <Avatar name={profile.name} photo={profile.photo} size={36} />
          <div className="min-w-0">
            <p className="font-semibold text-[13px] text-gray-900 truncate">{profile.name}</p>
            <p className="text-[11px] text-gray-400 font-mono">{profile.reg}</p>
          </div>
        </div>

        {/* Role switcher (demo only) */}
        <select
          value={role}
          onChange={(e) => { setRole(e.target.value as Role); onClose(); }}
          className="w-full text-xs border border-gray-200 rounded-md px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#02644A]"
        >
          {(Object.keys(ROLE_LABELS) as Role[]).map((r) => (
            <option key={r} value={r}>{ROLE_LABELS[r]}</option>
          ))}
        </select>
        <p className="text-[10px] text-gray-400">Preview mode — switch roles to explore</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">
        {Object.entries(nav).map(([category, items], idx) => {
          const colors = CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Account"];
          return (
            <div key={category} className={idx > 0 ? `mt-1 pt-1 ${colors.border}` : ""}>
              <p className={`text-[10px] font-bold uppercase tracking-widest px-3.5 pt-3 pb-1 ${colors.label}`}>
                {category}
              </p>
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 w-full px-3.5 py-2 text-[13px] transition-colors border-l-2 ${
                      isActive ? colors.active : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent"
                    }`}
                  >
                    <i className={`ti ${item.icon} text-[15px] shrink-0`} aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3.5 py-2.5 border-t border-gray-100 space-y-2">
        <Link href="/" className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#02644A] transition-colors">
          <i className="ti ti-arrow-left text-sm" aria-hidden /> Back to site
        </Link>
        {/* Developer credit – low-key */}
        <p className="text-[10px] text-gray-300 leading-snug">
          Developed by{" "}
          <a
            href="https://github.com/soumik-prime"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            Md. Samiul Islam Soumik
          </a>
        </p>
      </div>
    </aside>
  );
}
