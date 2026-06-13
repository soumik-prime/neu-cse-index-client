"use client";

import { ReadonlyURLSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const GENDERS = ["MALE", "FEMALE", "OTHER"];

const SEMESTERS = [
  "1ST",
  "2ND",
  "3RD",
  "4TH",
  "5TH",
  "6TH",
  "7TH",
  "8TH",
];

const SORT_OPTIONS = [
  { label: "Name A–Z", sortBy: "name", sortOrder: "asc" },
  { label: "Name Z–A", sortBy: "name", sortOrder: "desc" },
  { label: "Batch ↑", sortBy: "batch", sortOrder: "asc" },
  { label: "Batch ↓", sortBy: "batch", sortOrder: "desc" },
];

interface Props {
  params: ReadonlyURLSearchParams;
  setParam: (key: string, value: string | null) => void;
  batches: number[];
  cities: string[];
  countries: string[];
}

const selectClass =
  "min-w-[110px] rounded-md border border-[#0f2e2a] bg-[#0f1c1e] px-[10px] py-[7px] text-xs text-[#9ec8c4] outline-none transition-colors focus:border-[#22a899]";

export default function FilterBar({
  params,
  setParam,
  batches,
  cities,
  countries,
}: Props) {
  const [search, setSearch] = useState(
    params.get("search") ?? "",
  );

  const debounce = useRef<ReturnType<typeof setTimeout>>();

  const onSearch = (value: string) => {
    setSearch(value);

    clearTimeout(debounce.current);

    debounce.current = setTimeout(() => {
      setParam("search", value || null);
    }, 350);
  };

  const currentSort = SORT_OPTIONS.findIndex(
    (o) =>
      o.sortBy === (params.get("sortBy") ?? "name") &&
      o.sortOrder === (params.get("sortOrder") ?? "asc"),
  );

  const hasFilters = [
    "search",
    "gender",
    "semester",
    "batch",
    "city",
    "country",
  ].some((key) => params.has(key));

  return (
    <div className="flex flex-col gap-3 py-6 pb-2">
      {/* Search */}
      <div className="relative max-w-[360px]">
        <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-[#2e5550]">
          ⌕
        </span>

        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name…"
          className="w-full rounded-md border border-[#0f2e2a] bg-[#0f1c1e] py-[7px] pr-[10px] pl-[34px] text-[13px] text-[#d4eae8] outline-none transition-colors placeholder:text-[#5a8a86] focus:border-[#22a899]"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <select
          className={selectClass}
          value={params.get("batch") ?? ""}
          onChange={(e) =>
            setParam("batch", e.target.value || null)
          }
        >
          <option value="">All Batches</option>

          {batches.map((batch) => (
            <option key={batch} value={batch}>
              Batch {batch}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={params.get("gender") ?? ""}
          onChange={(e) =>
            setParam("gender", e.target.value || null)
          }
        >
          <option value="">All Genders</option>

          {GENDERS.map((gender) => (
            <option key={gender} value={gender}>
              {gender[0] + gender.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={params.get("semester") ?? ""}
          onChange={(e) =>
            setParam("semester", e.target.value || null)
          }
        >
          <option value="">All Semesters</option>

          {SEMESTERS.map((semester) => (
            <option key={semester} value={semester}>
              {semester} Semester
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={params.get("city") ?? ""}
          onChange={(e) =>
            setParam("city", e.target.value || null)
          }
        >
          <option value="">All Cities</option>

          {cities.map((city) => (
            <option
              key={city}
              value={city.toLowerCase()}
            >
              {city}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={params.get("country") ?? ""}
          onChange={(e) =>
            setParam("country", e.target.value || null)
          }
        >
          <option value="">All Countries</option>

          {countries.map((country) => (
            <option
              key={country}
              value={country.toLowerCase()}
            >
              {country}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={currentSort >= 0 ? currentSort : 0}
          onChange={(e) => {
            const option =
              SORT_OPTIONS[Number(e.target.value)];

            setParam("sortBy", option.sortBy);

            setTimeout(() => {
              setParam("sortOrder", option.sortOrder);
            }, 0);
          }}
        >
          {SORT_OPTIONS.map((option, index) => (
            <option key={index} value={index}>
              {option.label}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={() => {
              setSearch("");

              [
                "search",
                "gender",
                "semester",
                "batch",
                "city",
                "country",
                "sortBy",
                "sortOrder",
              ].forEach((key) => setParam(key, null));
            }}
            className="rounded-md border border-[#1a4a44] bg-transparent px-3 py-[7px] text-[11px] tracking-wider text-[#5a8a86] transition-colors hover:border-[#22a899] hover:text-[#22a899]"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}