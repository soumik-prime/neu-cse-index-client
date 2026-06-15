"use client";

import { useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import { Profile } from "@/lib/types/profile.interface";
import AlumniCard from "./AlumniCard";

export default function AlumniClient({
  profiles,
  meta,
  batches = [],
  addresses = [],
}: {
  profiles: Profile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  batches: number[];
  addresses?: {
    iso2: string;
    city: string;
    country: string;
  }[];
}) {
  const rawParams = useSearchParams();

  const { page, total, totalPages } = meta;

  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-[1200px] border-b border-[#1a4a44] px-6 pt-12 pb-8">
        <p className="label mb-2">NEU CSE Index</p>

        <h1 className="m-0 text-[clamp(1.8rem,4vw,3rem)] text-[#d4eae8]">
          Alumni Directory
        </h1>

        <p className="mt-2 text-[13px] text-[#5a8a86]">
          {total} {total === 1 ? "profile" : "profiles"} found
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <FilterBar
          params={rawParams}
          batches={batches}
          addresses={addresses}
        />

        {profiles.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-3 text-[40px]">◈</div>
            <p className="text-[#5a8a86]">No profiles match your filters.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(220px,2fr))] gap-2 sm:gap-8">
            {profiles.map((p) => (
              <AlumniCard key={p.userId} profile={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}