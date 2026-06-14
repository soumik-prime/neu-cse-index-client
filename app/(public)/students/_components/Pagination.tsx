"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  totalPages: number;
}

export default function Pagination({ page, totalPages }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const go = (p: number) => {
    const clamped = Math.max(1, Math.min(totalPages, p));

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(clamped));

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleJump = (value: string) => {
    const n = Number(value);

    if (!isNaN(n)) {
      go(n);
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
      {/* Pagination buttons */}
      <div className="flex flex-wrap justify-center gap-1.5">
        <button
          disabled={page === 1}
          onClick={() => go(1)}
          className="min-w-9 rounded-md border border-border-subtle bg-bg-surface px-3.25 py-1.75 text-xs disabled:opacity-40"
        >
          «
        </button>

        <button
          disabled={page === 1}
          onClick={() => go(page - 1)}
          className="min-w-9 rounded-md border border-border-subtle bg-bg-surface px-3.25 py-1.75 text-xs disabled:opacity-40"
        >
          ‹
        </button>

        {pages.map((p, idx) =>
          typeof p === "string" ? (
            <span key={`${p}-${idx}`} className="px-1 text-xs text-muted">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => go(p)}
              className={
                p === page
                  ? "min-w-9 rounded-md bg-accent px-3.25 py-1.75 text-xs font-bold text-black cursor-default"
                  : "min-w-9 rounded-md border border-border-subtle bg-bg-surface px-3.25 py-1.75 text-xs cursor-pointer hover:border-accent"
              }
            >
              {p}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => go(page + 1)}
          className="min-w-9 rounded-md border border-border-subtle bg-bg-surface px-3.25 py-1.75 text-xs disabled:opacity-40"
        >
          ›
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => go(totalPages)}
          className="min-w-9 rounded-md border border-border-subtle bg-bg-surface px-3.25 py-1.75 text-xs disabled:opacity-40"
        >
          »
        </button>
      </div>

      {/* Jump to page */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-muted">Go to page</span>

        <input
          type="number"
          min={1}
          max={totalPages}
          placeholder={String(page)}
          className="w-14 rounded-md border border-border-subtle bg-bg-surface px-2 py-1 text-center text-xs"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleJump((e.target as HTMLInputElement).value);
            }
          }}
        />

        <span className="text-[11px] text-muted">of {totalPages}</span>
      </div>
    </div>
  );
}
