/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import StudentCard from "./StudentCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";

// ── Types ──────────────────────────────────────────────────────────────────────
const GENDERS   = ["MALE", "FEMALE", "OTHER"] as const;
const SEMESTERS = ["1ST","2ND","3RD","4TH","5TH","6TH","7TH","8TH"] as const;
type Gender   = typeof GENDERS[number];
type Semester = typeof SEMESTERS[number];

interface DemoProfile {
  userId:        string;
  name:          string;
  photo:         string;
  batch:         number;
  session:       string;
  bio?:          string;
  semester?:     Semester;
  gender?:       Gender;
  bloodGroup?:   string;
  graduationYear?: number;
  city?:         string;
  country?:      string;
  iso2?:         string;
  github?:       string;
  linkedin?:     string;
  portfolio?:    string;
}

// ── Demo data ──────────────────────────────────────────────────────────────────
const FIRST  = ["Arafat","Nusrat","Tanvir","Sumaiya","Rifat","Maliha","Jubayer","Sinthia","Raihan","Fariha","Emon","Lamia","Sabbir","Tania","Naim"];
const LAST   = ["Hossain","Ahmed","Islam","Khatun","Rahman","Akter","Hassan","Begum","Khan","Chowdhury","Mia","Roy","Das","Mondal","Sheikh"];
const BATCHES  = [49,50,51,52,53,54,55,56,57,58];
const SESSIONS = ["2015-16","2016-17","2017-18","2018-19","2019-20","2020-21","2021-22","2022-23","2023-24","2024-25"];
const BLOOD    = ["A+","A-","B+","B-","O+","O-","AB+","AB-"];
const BIOS     = [
  "Passionate about systems programming and open source.",
  "Full-stack developer with a love for clean UI.",
  "Currently pursuing research in machine learning.",
  "Competitive programmer and coffee enthusiast.",
  undefined, undefined, undefined, // some cards have no bio
];

// country → iso2 → cities mapping for FilterBar
const ADDRESS_DATA = [
  { iso2: "BD", country: "Bangladesh", city: "Dhaka"      },
  { iso2: "BD", country: "Bangladesh", city: "Chittagong" },
  { iso2: "BD", country: "Bangladesh", city: "Sylhet"     },
  { iso2: "BD", country: "Bangladesh", city: "Rajshahi"   },
  { iso2: "BD", country: "Bangladesh", city: "Khulna"     },
  { iso2: "DE", country: "Germany",    city: "Berlin"     },
  { iso2: "DE", country: "Germany",    city: "Munich"     },
  { iso2: "US", country: "USA",        city: "New York"   },
  { iso2: "US", country: "USA",        city: "San Francisco" },
  { iso2: "CA", country: "Canada",     city: "Toronto"    },
  { iso2: "CA", country: "Canada",     city: "Vancouver"  },
  { iso2: "GB", country: "UK",         city: "London"     },
  { iso2: "AU", country: "Australia",  city: "Sydney"     },
  { iso2: "JP", country: "Japan",      city: "Tokyo"      },
  { iso2: "MY", country: "Malaysia",   city: "Kuala Lumpur" },
];

function makeDemoProfiles(n: number): DemoProfile[] {
  const manual: DemoProfile[] = [
    { userId:"m0", name:"Arif Hossain",  photo:"https://i.pravatar.cc/300?img=11", batch:47, session:"2019-20", semester:"6TH", gender:"MALE",   bloodGroup:"O+", city:"Dhaka",      country:"Bangladesh", iso2:"BD", bio:"Competitive programmer and backend engineer.", github:"https://github.com" },
    { userId:"m1", name:"Nusrat Jahan",  photo:"https://i.pravatar.cc/300?img=47", batch:49, session:"2021-22", semester:"4TH", gender:"FEMALE",                  city:"Chittagong", country:"Bangladesh", iso2:"BD", linkedin:"https://linkedin.com" },
    { userId:"m2", name:"Tanvir Ahmed",  photo:"https://i.pravatar.cc/300?img=53", batch:46, session:"2018-19",                 gender:"MALE",   bloodGroup:"A+",                                          bio:"Into distributed systems and Rust." },
    { userId:"m3", name:"Sumaiya Islam", photo:"https://i.pravatar.cc/300?img=32", batch:50, session:"2022-23",                 gender:"FEMALE",                  city:"Tokyo",      country:"Japan",      iso2:"JP", portfolio:"https://example.com" },
  ];

  const generated = Array.from({ length: n }, (_, i) => {
    const bi = i % BATCHES.length;
    const addr = ADDRESS_DATA[i % ADDRESS_DATA.length];
    return {
      userId:        `demo-${i}`,
      name:          `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`,
      photo:         `https://api.dicebear.com/8.x/thumbs/svg?seed=${i}&radius=0`,
      batch:         BATCHES[bi],
      session:       SESSIONS[bi],
      bio:           BIOS[i % BIOS.length],
      semester:      SEMESTERS[i % SEMESTERS.length],
      gender:        GENDERS[i % GENDERS.length],
      bloodGroup:    BLOOD[i % BLOOD.length],
      graduationYear: 2020 + (i % 6),
      city:          addr.city,
      country:       addr.country,
      iso2:          addr.iso2,
      github:        i % 3 === 0 ? "https://github.com" : undefined,
      linkedin:      i % 4 === 0 ? "https://linkedin.com" : undefined,
      portfolio:     i % 7 === 0 ? "https://example.com" : undefined,
    };
  });

  return [...manual, ...generated];
}

const ALL_PROFILES = makeDemoProfiles(116);
const PAGE_SIZE    = 20;

// ── Filter logic ───────────────────────────────────────────────────────────────
function filterProfiles(profiles: DemoProfile[], params: URLSearchParams) {
  const search   = params.get("search")?.toLowerCase().trim() ?? "";
  const gender   = params.get("gender")   ?? "";
  const semester = params.get("semester") ?? "";
  const batch    = params.get("batch")    ? Number(params.get("batch")) : null;
  const country  = params.get("country")  ?? "";   // iso2
  const city     = params.get("city")     ?? "";
  const sortBy   = (params.get("sortBy")    ?? "name") as "name" | "batch";
  const sortOrd  = (params.get("sortOrder") ?? "asc")  as "asc"  | "desc";

  const result = profiles.filter(p => {
    if (search   && !p.name.toLowerCase().includes(search))       return false;
    if (gender   && p.gender   !== gender)                        return false;
    if (semester && p.semester !== semester)                       return false;
    if (batch    && p.batch    !== batch)                         return false;
    if (country  && p.iso2?.toLowerCase() !== country.toLowerCase()) return false;
    if (city     && p.city?.toLowerCase() !== city.toLowerCase()) return false;
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

// ── Component ──────────────────────────────────────────────────────────────────
export default function StudentsClient() {
  const rawParams = useSearchParams();

  const filtered = useMemo(
    () => filterProfiles(ALL_PROFILES, rawParams),
    [rawParams]
  );

  const page       = Math.max(1, Number(rawParams.get("page") ?? 1));
  const total      = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const paged      = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const uniqueBatches = useMemo(
    () => [...new Set(ALL_PROFILES.map(p => p.batch))].sort((a, b) => b - a),
    []
  );

  // Address data for FilterBar (city unlocks after country)
  const addresses = useMemo(() => ADDRESS_DATA, []);

  return (
    <div className="min-h-screen pb-16">

      {/* ── Header ── */}
      <div className="mx-auto max-w-6xl border-b border-border-default px-4 md:px-8 pt-12 pb-8">
        <p className="label mb-2">NEU CSE Index</p>
        <h1 className="m-0 text-text-bright">Student Directory</h1>
        <p className="mt-2 text-[13px] text-text-secondary">
          {total} {total === 1 ? "profile" : "profiles"} found
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8">

        {/* ── Filters ── */}
        <FilterBar
          params={rawParams}
          batches={uniqueBatches}
          addresses={addresses}
        />

        {/* ── Grid ── */}
        {paged.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mb-3 text-4xl text-text-muted">◈</div>
            <p className="text-text-secondary">No profiles match your filters.</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {paged.map(p => (
              <StudentCard key={p.userId} profile={p as any} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}