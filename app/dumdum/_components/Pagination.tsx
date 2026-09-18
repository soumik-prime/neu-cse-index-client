"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const PAGE_SIZE = 20;

/* ── Hook: reads ?page=N from URL, returns slicer ── */
export function usePageParam(paramKey = "page") {
  const sp = useSearchParams();
  const page = Math.max(1, parseInt(sp.get(paramKey) ?? "1") || 1);
  return page;
}

export function usePagination<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage   = Math.min(Math.max(1, page), totalPages);
  const start      = (safePage - 1) * pageSize;
  const paged      = items.slice(start, start + pageSize);
  return { paged, totalPages, safePage };
}

/* ── URL-aware pagination (syncs ?page=N) ── */
interface PaginationProps {
  total:    number;
  page:     number;
  pageSize?: number;
  paramKey?: string;
  /** Called when page changes — use this OR rely on URL */
  onPage?:  (p: number) => void;
}

export default function Pagination({
  total,
  page,
  pageSize = PAGE_SIZE,
  paramKey = "page",
  onPage,
}: PaginationProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const sp       = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages <= 1) return null;

  const [jumpVal, setJumpVal] = useState("");

  function go(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages);
    if (onPage) {
      onPage(clamped);
      return;
    }
    const params = new URLSearchParams(sp.toString());
    params.set(paramKey, String(clamped));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleJump() {
    const n = parseInt(jumpVal);
    if (!isNaN(n)) go(n);
    setJumpVal("");
  }

  // Page window
  const pages: (number | "…")[] = [];
  const add = (n: number) => { if (!pages.includes(n)) pages.push(n); };
  add(1);
  if (page - 2 > 2)           pages.push("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) add(i);
  if (page + 2 < totalPages - 1) pages.push("…");
  if (totalPages > 1) add(totalPages);

  const start = (page - 1) * pageSize + 1;
  const end   = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-100 flex-wrap">
      {/* Count */}
      <p className="text-[12px] text-gray-400 shrink-0">
        Showing{" "}
        <span className="font-medium text-gray-600">{start}–{end}</span>
        {" "}of{" "}
        <span className="font-medium text-gray-600">{total}</span>
      </p>

      {/* Pages + Jump */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Prev */}
        <button
          disabled={page === 1}
          onClick={() => go(page - 1)}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <i className="ti ti-chevron-left text-[13px]" aria-hidden />
        </button>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`el-${i}`} className="px-1 text-gray-400 text-[13px] select-none">…</span>
            ) : (
              <button
                key={p}
                onClick={() => go(p as number)}
                className={`min-w-[30px] h-[30px] px-1 rounded-md text-[13px] font-medium transition-colors ${
                  p === page
                    ? "bg-[#02644A] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* Next */}
        <button
          disabled={page === totalPages}
          onClick={() => go(page + 1)}
          className="w-[30px] h-[30px] flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <i className="ti ti-chevron-right text-[13px]" aria-hidden />
        </button>

        {/* Jump */}
        {totalPages > 5 && (
          <div className="flex items-center gap-1.5 ml-1">
            <span className="text-[12px] text-gray-400">Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpVal}
              onChange={(e) => setJumpVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              placeholder="—"
              className="w-[46px] border border-gray-200 rounded-md px-2 py-1 text-[12px] text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#02644A] focus:border-[#02644A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              onClick={handleJump}
              disabled={!jumpVal}
              className="px-2 py-1 rounded-md border border-gray-200 text-[12px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
