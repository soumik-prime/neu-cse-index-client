"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  IconSchool,
  IconSearch,
  IconUserCheck,
  IconUsers,
  IconUsersGroup,
} from "@tabler/icons-react";
import Pagination, {
  usePagination,
  usePageParam,
} from "../_components/Pagination";
import { SEMESTERS } from "../_data/constants";
import StatCard from "../../dashboard/statistics/_component/StatCard";
import SectionHeader from "../../../components/ui/SectionHeader";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import Btn from "../../../components/ui/Btn";
import Badge from '../../../components/ui/Badge';

const PAGE_SIZE = 20;
const selCls =
  "border border-gray-200 rounded-md px-2.5 py-2 text-[13px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#02644A]/20 focus:border-[#02644A] w-full";

// NOTE: swap these for your real types (e.g. from AppProvider) —
// shaped to match what this component actually reads.
type AppUser = { gradYear?: string; batch: string };
type AcademicBatch = {
  id: string;
  batch: string;
  semester: string;
  gradYear?: string;
};

type Props = {
  users: AppUser[];
  academicBatches: AcademicBatch[];
};

export default function StatsClient({ users, academicBatches }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const page = usePageParam("bpage");

  // Filters are derived from the URL every render — no local state to fall
  // out of sync with it (back/forward nav, external links, etc. all "just work").
  const search = sp.get("bq") ?? "";
  const semFilter = sp.get("bsem") ?? "";
  const yearFilter = sp.get("byr") ?? "";

  const currentYear = new Date().getFullYear();
  const alumni = users.filter(
    (u) => u.gradYear && parseInt(u.gradYear) < currentYear,
  );
  const current = users.filter(
    (u) => !u.gradYear || parseInt(u.gradYear) >= currentYear,
  );

  const stats = [
    {
      icon: IconUsersGroup,
      label: "Total students",
      value: users.length,
      color: "teal" as const,
    },
    {
      icon: IconUserCheck,
      label: "Current students",
      value: current.length,
      color: "blue" as const,
    },
    {
      icon: IconSchool,
      label: "Alumni",
      value: alumni.length,
      color: "purple" as const,
    },
    {
      icon: IconUsers,
      label: "Total batches",
      value: academicBatches.length,
      color: "amber" as const,
    },
  ];

  const enriched = academicBatches.map((b) => ({
    ...b,
    studentCount: users.filter((u) => u.batch === b.batch).length,
    isAlumni: !!(b.gradYear && parseInt(b.gradYear) < currentYear),
  }));

  const gradYears = [
    ...new Set(enriched.map((b) => b.gradYear).filter(Boolean)),
  ].sort();

  const filtered = enriched.filter((b) => {
    const q = search.toLowerCase();
    return (
      (!q ||
        b.batch.toLowerCase().includes(q) ||
        (b.gradYear ?? "").includes(q)) &&
      (!semFilter || b.semester === semFilter) &&
      (!yearFilter || b.gradYear === yearFilter)
    );
  });

  const { paged } = usePagination(filtered, page, PAGE_SIZE);

  function pushParams(overrides: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    Object.entries(overrides).forEach(([k, v]) =>
      v ? params.set(k, v) : params.delete(k),
    );
    params.delete("bpage");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleSearch(v: string) {
    pushParams({ bq: v });
  }
  function handleSem(v: string) {
    pushParams({ bsem: v });
  }
  function handleYear(v: string) {
    pushParams({ byr: v });
  }
  function clearAll() {
    const params = new URLSearchParams(sp.toString());
    ["bq", "bsem", "byr", "bpage"].forEach((k) => params.delete(k));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const hasFilters = search || semFilter || yearFilter;

  return (
    <div>
      <SectionHeader title="Statistics" sub="Overview of students and alumni" />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-gray-700">
              Batch overview
            </p>
            <span className="text-[12px] text-gray-400">
              {filtered.length} of {academicBatches.length} batches
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <IconSearch
                size={14}
                stroke={1.8}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search batch or year…"
                className="pl-8 py-1.5 text-[12px]"
              />
            </div>
            <select
              value={semFilter}
              onChange={(e) => handleSem(e.target.value)}
              className={selCls + " sm:w-40"}
            >
              <option value="">All semesters</option>
              {SEMESTERS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              value={yearFilter}
              onChange={(e) => handleYear(e.target.value)}
              className={selCls + " sm:w-36"}
            >
              <option value="">All grad years</option>
              {gradYears.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            {hasFilters && (
              <Btn onClick={clearAll} className="shrink-0">
                Clear
              </Btn>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-2.5 px-4 font-semibold text-gray-500 whitespace-nowrap">
                  Batch
                </th>
                <th className="text-left py-2.5 px-4 font-semibold text-gray-500 whitespace-nowrap">
                  Semester
                </th>
                <th className="text-left py-2.5 px-4 font-semibold text-gray-500 whitespace-nowrap">
                  Grad year
                </th>
                <th className="text-left py-2.5 px-4 font-semibold text-gray-500 whitespace-nowrap">
                  Students
                </th>
                <th className="text-left py-2.5 px-4 font-semibold text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paged.map((b) => (
                <tr
                  key={b.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium text-gray-900">
                    {b.batch} batch
                  </td>
                  <td className="py-2.5 px-4 text-gray-600">{b.semester}</td>
                  <td className="py-2.5 px-4 text-gray-600">
                    {b.gradYear || "—"}
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="inline-flex items-center gap-1 text-gray-700 font-medium">
                      <IconUsers
                        size={13}
                        stroke={1.8}
                        className="text-gray-400"
                      />
                      {b.studentCount}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <Badge color={b.isAlumni ? "purple" : "teal"}>
                      {b.isAlumni ? "Alumni" : "Active"}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-400 text-[13px]"
                  >
                    No batches match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 pb-3">
          <Pagination
            total={filtered.length}
            page={page}
            pageSize={PAGE_SIZE}
            paramKey="bpage"
          />
        </div>
      </Card>
    </div>
  );
}
