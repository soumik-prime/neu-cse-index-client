"use client";

import {
  ReadonlyURLSearchParams,
  useRouter,
  usePathname,
} from "next/navigation";
import { useMemo, useState, useTransition } from "react";

const GENDERS = ["MALE", "FEMALE"] as const;

const SEMESTERS = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
] as const;

const SORT_OPTIONS = [
  { label: "Name A-Z", sortBy: "name", sortOrder: "asc" },
  { label: "Name Z-A", sortBy: "name", sortOrder: "desc" },
  { label: "Batch ↑", sortBy: "batch", sortOrder: "asc" },
  { label: "Batch ↓", sortBy: "batch", sortOrder: "desc" },
] as const;
const sel =
  "min-w-[110px] rounded-md border border-border-subtle bg-bg-surface px-2.5 py-1.75 text-xs text-text-primary outline-none transition-colors cursor-pointer focus:border-accent disabled:opacity-40 disabled:cursor-not-allowed";


interface Props {
  params: ReadonlyURLSearchParams;
  batches: number[];
  addresses?: {
    iso2: string;
    city: string;
    country: string;
  }[];
}

export default function FilterBar({
  params,
  batches = [],
  addresses = [],
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const currentSortIdx = useMemo(() => {
    const idx = SORT_OPTIONS.findIndex(
      (o) =>
        o.sortBy === (params.get("sortBy") ?? "name") &&
        o.sortOrder === (params.get("sortOrder") ?? "asc"),
    );

    return idx >= 0 ? idx : 0;
  }, [params]);

  const [search, setSearch] = useState(params.get("search") ?? "");
  const [gender, setGender] = useState(params.get("gender") ?? "");
  const [semester, setSemester] = useState(params.get("semester") ?? "");
  const [batch, setBatch] = useState(params.get("batch") ?? "");
  const [country, setCountry] = useState(params.get("country") ?? "");
  const [city, setCity] = useState(params.get("city") ?? "");
  const [sortIdx, setSortIdx] = useState(currentSortIdx);

  // ✅ safe countries (never crashes)
  const countries = useMemo(() => {
    if (!addresses.length) return [];

    return Array.from(
      new Map(
        addresses.map((a) => [a.iso2, { iso2: a.iso2, country: a.country }]),
      ).values(),
    );
  }, [addresses]);

  // ✅ safe city grouping
  const citiesByCountry = useMemo(() => {
    const map = new Map<string, string[]>();

    if (!addresses.length) return map;

    for (const a of addresses) {
      const key = a.iso2.toLowerCase();

      if (!map.has(key)) map.set(key, []);

      const list = map.get(key)!;

      if (!list.includes(a.city)) {
        list.push(a.city);
      }
    }

    return map;
  }, [addresses]);

  const cities = useMemo(() => {
    if (!country) return [];
    return citiesByCountry.get(country.toLowerCase()) ?? [];
  }, [country, citiesByCountry]);

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setCity("");
  };

  const applyFilters = () => {
    const p = new URLSearchParams();

    if (search.trim()) p.set("search", search.trim());
    if (gender) p.set("gender", gender);
    if (semester) p.set("semester", semester);
    if (batch) p.set("batch", batch);
    if (country) p.set("country", country);
    if (city) p.set("city", city);

    const sort = SORT_OPTIONS[sortIdx];

    if (sort.sortBy !== "name" || sort.sortOrder !== "asc") {
      p.set("sortBy", sort.sortBy);
      p.set("sortOrder", sort.sortOrder);
    }

    p.set("page", "1");

    startTransition(() => {
      router.push(`${pathname}?${p.toString()}`);
    });
  };

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setSemester("");
    setBatch("");
    setCountry("");
    setCity("");
    setSortIdx(0);

    startTransition(() => {
      router.push(pathname);
    });
  };

  const isDirty =
    search.trim() !== (params.get("search")?.trim() ?? "") ||
    gender !== (params.get("gender") ?? "") ||
    semester !== (params.get("semester") ?? "") ||
    batch !== (params.get("batch") ?? "") ||
    country !== (params.get("country") ?? "") ||
    city !== (params.get("city") ?? "") ||
    sortIdx !== currentSortIdx;

  const hasActiveFilters = [
    "search",
    "gender",
    "semester",
    "batch",
    "country",
    "city",
    "sortBy",
    "sortOrder",
  ].some((k) => params.has(k));

  return (
    <div className="flex flex-col gap-3 py-6 pb-2 w-fit">
      {/* Search */}
      <div className="relative">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-text-muted">
          ⌕
        </span>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          placeholder="Search by name…"
          className="w-full rounded-md border border-border-subtle bg-bg-surface py-1.75 pr-3 pl-8 text-[13px] text-text-bright outline-none transition-colors placeholder:text-text-muted focus:border-accent"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          className={sel}
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="">All Batches</option>
          {batches.map((b) => (
            <option key={b} value={String(b)}>
              Batch {b}
            </option>
          ))}
        </select>

        <select
          className={sel}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">All Genders</option>
          {GENDERS.map((g) => (
            <option key={g} value={g}>
              {g[0] + g.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select
          className={sel}
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {SEMESTERS.map((s) => (
            <option key={s} value={s}>
              {s} Semester
            </option>
          ))}
        </select>

        {country && (
          <select
            className={sel}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
        
        <select
          className={sel}
          value={country}
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option value="">All Countries</option>
          {countries.map((c) => (
            <option key={c.iso2} value={c.iso2}>
              {c.country}
            </option>
          ))}
        </select>


        <select
          className={sel}
          value={String(sortIdx)}
          onChange={(e) => setSortIdx(Number(e.target.value))}
        >
          {SORT_OPTIONS.map((o, i) => (
            <option key={i} value={i}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          disabled={!isDirty}
          className="rounded-md border border-accent bg-transparent px-3.5 py-1.75 text-[11px] font-medium tracking-wider text-accent transition-all hover:bg-accent hover:text-bg-deep disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Apply
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="rounded-md border border-border-default bg-transparent px-3 py-1.75 text-[11px] tracking-wider text-text-secondary hover:text-accent"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
