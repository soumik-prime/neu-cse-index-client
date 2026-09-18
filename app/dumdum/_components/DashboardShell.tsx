"use client";
import { useState } from "react";
import Sidebar, { MobileTopbar } from "./Sidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <MobileTopbar onOpen={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="max-w-[720px] mx-auto lg:mx-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
