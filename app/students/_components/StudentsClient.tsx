"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import StudentCard from "./StudentCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";

const GENDERS = ["MALE", "FEMALE", "OTHER"] as const;
const SEMESTERS = ["1ST", "2ND", "3RD", "4TH", "5TH", "6TH", "7TH", "8TH"] as const;

type Gender = typeof GENDERS[number];
type Semester = typeof SEMESTERS[number];

interface DemoProfile {
  userId: string;
  name: string;
  photo: string;
  batch: number;
  session: string;
  semester?: Semester;
  gender?: Gender;
  bloodGroup?: string;
  city?: string;
  country?: string;
}

function makeDemoProfiles(n: number): DemoProfile[] {
  const firstNames = [
    "Arafat",
    "Nusrat",
    "Tanvir",
    "Sumaiya",
    "Rifat",
    "Maliha",
    "Jubayer",
    "Sinthia",
    "Raihan",
    "Fariha",
    "Emon",
    "Lamia",
    "Sabbir",
    "Tania",
    "Naim",
  ];

  const lastNames = [
    "Hossain",
    "Ahmed",
    "Islam",
    "Khatun",
    "Rahman",
    "Akter",
    "Hassan",
    "Begum",
    "Khan",
    "Chowdhury",
    "Mia",
    "Roy",
    "Das",
    "Mondal",
    "Sheikh",
  ];

  const batches = [49, 50, 51, 52, 53, 54, 55, 56, 57, 58];

  const sessions = [
    "2015-16",
    "2016-17",
    "2017-18",
    "2018-19",
    "2019-20",
    "2020-21",
    "2021-22",
    "2022-23",
    "2023-24",
    "2024-25",
  ];

  const blood = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const cities = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Mymensingh",
    "Comilla",
    "Barishal",
  ];

  const countries = [
    "Bangladesh",
    "Germany",
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Japan",
    "Malaysia",
  ];

  return Array.from({ length: n }, (_, i) => {
    const batchIdx = i % batches.length;

    return {
      userId: `demo-${i}`,
      name: `${firstNames[i % firstNames.length]} ${
        lastNames[i % lastNames.length]
      }`,
      photo: `https://api.dicebear.com/8.x/thumbs/svg?seed=${i}&radius=0`,
      batch: batches[batchIdx],
      session: sessions[batchIdx],
      semester: SEMESTERS[i % SEMESTERS.length],
      gender: GENDERS[i % GENDERS.length],
      bloodGroup: blood[i % blood.length],
      city: cities[i % cities.length],
      country: countries[i % countries.length],
    };
  });
}

const ALL_PROFILES = makeDemoProfiles(120);
const PAGE_SIZE = 20;

function filterProfiles(profiles: DemoProfile[], params: URLSearchParams) {
  const search = params.get("search")?.toLowerCase() ?? "";
  const gender = params.get("gender") ?? "";
  const semester = params.get("semester") ?? "";
  const batch = params.get("batch") ? Number(params.get("batch")) : null;
  const city = params.get("city")?.toLowerCase() ?? "";
  const country = params.get("country")?.toLowerCase() ?? "";
  const sortBy = (params.get("sortBy") ?? "name") as "name" | "batch";
  const sortOrd = (params.get("sortOrder") ?? "asc") as "asc" | "desc";

  let result = profiles.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search)) return false;
    if (gender && p.gender !== gender) return false;
    if (semester && p.semester !== semester) return false;
    if (batch && p.batch !== batch) return false;
    if (city && p.city?.toLowerCase() !== city) return false;
    if (country && p.country?.toLowerCase() !== country) return false;
    return true;
  });

  result.sort((a, b) => {
    const av = sortBy === "name" ? a.name : a.batch;
    const bv = sortBy === "name" ? b.name : b.batch;

    const cmp = av < bv ? -1 : av > bv ? 1 : 0;

    return sortOrd === "asc" ? cmp : -cmp;
  });

  return result;
}

export default function StudentsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const rawParams = useSearchParams();

  const [, startTransition] = useTransition();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const p = new URLSearchParams(rawParams.toString());

      if (value === null || value === "") p.delete(key);
      else p.set(key, value);

      if (key !== "page") p.set("page", "1");

      startTransition(() => {
        router.push(`${pathname}?${p.toString()}`);
      });
    },
    [rawParams, router, pathname]
  );

  const filtered = filterProfiles(ALL_PROFILES, rawParams);

  const page = Math.max(1, Number(rawParams.get("page") ?? 1));
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const uniqueBatches = [
    ...new Set(ALL_PROFILES.map((p) => p.batch)),
  ].sort((a, b) => b - a);

  const uniqueCities = [
    ...new Set(ALL_PROFILES.map((p) => p.city).filter(Boolean)),
  ].sort() as string[];

  const uniqueCountries = [
    ...new Set(ALL_PROFILES.map((p) => p.country).filter(Boolean)),
  ].sort() as string[];

  return (
    <div className="min-h-screen pb-16">
      <div className="mx-auto max-w-[1200px] border-b border-[#1a4a44] px-6 pt-12 pb-8">
        <p className="label mb-2">NEU CSE Index</p>

        <h1 className="m-0 text-[clamp(1.8rem,4vw,3rem)] text-[#d4eae8]">
          Student Directory
        </h1>

        <p className="mt-2 text-[13px] text-[#5a8a86]">
          {total} {total === 1 ? "profile" : "profiles"} found
        </p>
      </div>

      <div className="mx-auto max-w-[1200px] px-6">
        <FilterBar
          params={rawParams}
          setParam={setParam}
          batches={uniqueBatches}
          cities={uniqueCities}
          countries={uniqueCountries}
        />

        {paged.length === 0 ? (
          <div className="py-20 text-center text-[#2e5550]">
            <div className="mb-3 text-[40px]">◈</div>

            <p className="text-[#5a8a86]">
              No profiles match your filters.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-5">
            {paged.map((p) => (
              <StudentCard key={p.userId} profile={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            setParam={setParam}
          />
        )}
      </div>
    </div>
  );
}