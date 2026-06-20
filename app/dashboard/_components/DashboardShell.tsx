"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileTopbar from "./MobileTopbar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="relative flex-1 flex flex-col overflow-hidden min-w-0">

        <MobileTopbar onOpen={() => setOpen(true)} />

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 border border-red-500 sm:py-6 lg:px-8 lg:py-7">
          <div className="mx-auto lg:mx-0 border border-purple-600 max-w-180">{children}</div>
        </main>

        {/* Developer credit — fixed to bottom-right corner */}
        <div className="hidden lg:absolute bottom-0 right-1.5 z-10 lg:flex items-center gap-1.5 text-xs text-gray-500/80 bg-white/30 backdrop-blur-2xl px-1">
          <span>Built by</span>
          <a
            href="https://github.com/soumik-prime"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0b8274b7] hover:text-[#0b8274] transition-colors duration-200"
          >
            Md. Samiul Islam Soumik
          </a>
        </div>

      </div>
    </div>
  );
}