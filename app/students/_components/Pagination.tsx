"use client";

import { useState } from "react";

interface Props {
  page: number;
  totalPages: number;
  setParam: (key: string, value: string | null) => void;
}

export default function Pagination({
  page,
  totalPages,
  setParam,
}: Props) {
  const [jumpValue, setJumpValue] = useState("");

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));
    setParam("page", String(clamped));
  };

  const handleJump = () => {
    const n = parseInt(jumpValue, 10);

    if (!isNaN(n)) {
      go(n);
      setJumpValue("");
    }
  };

  const pages: (number | "…l" | "…r")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (page > 3) pages.push("…l");

    for (
      let i = Math.max(2, page - 1);
      i <= Math.min(totalPages - 1, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 2) pages.push("…r");

    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col items-center gap-3 pt-10">
      {/* Page Buttons */}
      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          disabled={page === 1}
          onClick={() => go(1)}
          className="min-w-9 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[13px] py-[7px] text-xs text-[#9ec8c4] transition-all hover:border-[#22a899] disabled:cursor-not-allowed disabled:text-[#2e5550]"
        >
          «
        </button>

        <button
          disabled={page === 1}
          onClick={() => go(page - 1)}
          className="min-w-9 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[13px] py-[7px] text-xs text-[#9ec8c4] transition-all hover:border-[#22a899] disabled:cursor-not-allowed disabled:text-[#2e5550]"
        >
          ‹
        </button>

        {pages.map((p) =>
          typeof p === "string" ? (
            <span
              key={p}
              className="px-1 py-[7px] text-xs leading-none text-[#2e5550]"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              className={
                p === page
                  ? "min-w-9 rounded-md border border-[#22a899] bg-[#22a899] px-[13px] py-[7px] text-xs font-bold text-[#070d0e]"
                  : "min-w-9 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[13px] py-[7px] text-xs text-[#9ec8c4] transition-all hover:border-[#22a899]"
              }
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => go(page + 1)}
          className="min-w-9 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[13px] py-[7px] text-xs text-[#9ec8c4] transition-all hover:border-[#22a899] disabled:cursor-not-allowed disabled:text-[#2e5550]"
        >
          ›
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => go(totalPages)}
          className="min-w-9 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[13px] py-[7px] text-xs text-[#9ec8c4] transition-all hover:border-[#22a899] disabled:cursor-not-allowed disabled:text-[#2e5550]"
        >
          »
        </button>
      </div>

      {/* Jump To Page */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-[#2e5550]">
          Go to page
        </span>

        <input
          type="number"
          min={1}
          max={totalPages}
          value={jumpValue}
          onChange={(e) => setJumpValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJump()}
          placeholder={String(page)}
          className="w-14 rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-2 py-1.5 text-center text-xs text-[#d4eae8] outline-none transition-colors focus:border-[#22a899]"
        />

        <button
          onClick={handleJump}
          className="cursor-pointer rounded-md border border-[#1a4a44] bg-transparent px-3 py-1.5 text-[11px] text-[#22a899] transition-colors hover:border-[#22a899]"
        >
          Go
        </button>

        <span className="text-[11px] text-[#2e5550]">
          of {totalPages}
        </span>
      </div>
    </div>
  );
}