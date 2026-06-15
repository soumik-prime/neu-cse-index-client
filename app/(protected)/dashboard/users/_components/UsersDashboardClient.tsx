"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { changeProfileVisibility, getProfiles } from "@/lib/api/profile.api";
import type { Profile } from "@/lib/types/profile.interface";

const GENDERS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
] as const;

const BLOOD_GROUPS = [
  { value: "A_POSITIVE", label: "A+" },
  { value: "A_NEGATIVE", label: "A-" },
  { value: "B_POSITIVE", label: "B+" },
  { value: "B_NEGATIVE", label: "B-" },
  { value: "AB_POSITIVE", label: "AB+" },
  { value: "AB_NEGATIVE", label: "AB-" },
  { value: "O_POSITIVE", label: "O+" },
  { value: "O_NEGATIVE", label: "O-" },
] as const;

const SEMESTERS = [
  { value: "FIRST_FIRST", label: "1.1" },
  { value: "FIRST_SECOND", label: "1.2" },
  { value: "SECOND_FIRST", label: "2.1" },
  { value: "SECOND_SECOND", label: "2.2" },
  { value: "THIRD_FIRST", label: "3.1" },
  { value: "THIRD_SECOND", label: "3.2" },
  { value: "FOURTH_FIRST", label: "4.1" },
  { value: "FOURTH_SECOND", label: "4.2" },
  { value: "GRADUATE", label: "Graduate" },
] as const;

const SORT_OPTIONS = [
  { value: "name:asc", label: "Name A-Z", sortBy: "name", sortOrder: "asc" },
  { value: "name:desc", label: "Name Z-A", sortBy: "name", sortOrder: "desc" },
  { value: "batch:desc", label: "Batch newest", sortBy: "batch", sortOrder: "desc" },
  { value: "batch:asc", label: "Batch oldest", sortBy: "batch", sortOrder: "asc" },
  { value: "createdAt:desc", label: "Recently added", sortBy: "createdAt", sortOrder: "desc" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface ProfilesPayload {
  profiles: Profile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface RawProfileResponse {
  profiles?: Profile[];
  data?: Profile[] | { profiles?: Profile[]; data?: Profile[]; meta?: RawMeta };
  meta?: RawMeta;
  pagination?: RawMeta;
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

interface RawMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPage?: number;
  totalPages?: number;
}

const selectClass =
  "h-10 rounded-md border border-border-subtle bg-bg-surface px-3 text-xs text-text-primary outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50";

function normalizeProfilesResponse(raw: unknown, fallbackPage: number, fallbackLimit: number): ProfilesPayload {
  if (Array.isArray(raw)) {
    return {
      profiles: raw,
      total: raw.length,
      page: fallbackPage,
      limit: fallbackLimit,
      totalPages: Math.max(1, Math.ceil(raw.length / fallbackLimit)),
    };
  }

  const response = (raw ?? {}) as RawProfileResponse;
  const nested = !Array.isArray(response.data) && typeof response.data === "object" ? response.data : undefined;
  const profiles = response.profiles ?? nested?.profiles ?? nested?.data ?? (Array.isArray(response.data) ? response.data : []);
  const meta = response.meta ?? response.pagination ?? nested?.meta ?? {};
  const total = meta.total ?? response.total ?? profiles.length;
  const page = meta.page ?? response.page ?? fallbackPage;
  const limit = meta.limit ?? response.limit ?? fallbackLimit;
  const totalPages = meta.totalPages ?? meta.totalPage ?? response.totalPages ?? Math.max(1, Math.ceil(total / limit));

  return { profiles, total, page, limit, totalPages };
}

function displayEnum(value?: string) {
  if (!value) return "Not set";
  const mapped =
    BLOOD_GROUPS.find((item) => item.value === value)?.label ??
    SEMESTERS.find((item) => item.value === value)?.label ??
    GENDERS.find((item) => item.value === value)?.label;

  return mapped ?? value.toLowerCase().replaceAll("_", " ");
}

function getProfileId(profile: Profile) {
  return profile.id ?? profile.userId;
}

function getVisibility(profile: Profile) {
  return profile.visibility ?? profile.visible ?? profile.isVisible ?? true;
}

export default function UsersDashboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentPage = Math.max(1, Number(searchParams.get("page") ?? 1));
  const currentLimit = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
  const currentSortValue = `${searchParams.get("sortBy") ?? "name"}:${searchParams.get("sortOrder") ?? "desc"}` as SortValue;

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [batch, setBatch] = useState(searchParams.get("batch") ?? "");
  const [graduationYear, setGraduationYear] = useState(searchParams.get("graduationYear") ?? "");
  const [gender, setGender] = useState(searchParams.get("gender") ?? "");
  const [bloodGroup, setBloodGroup] = useState(searchParams.get("bloodGroup") ?? "");
  const [semester, setSemester] = useState(searchParams.get("semester") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [sortValue, setSortValue] = useState<SortValue>(
    SORT_OPTIONS.some((option) => option.value === currentSortValue) ? currentSortValue : "name:desc",
  );
  const [payload, setPayload] = useState<ProfilesPayload>({
    profiles: [],
    total: 0,
    page: currentPage,
    limit: currentLimit,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [updatingVisibilityId, setUpdatingVisibilityId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const query = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!params.has("page")) params.set("page", String(currentPage));
    if (!params.has("limit")) params.set("limit", String(currentLimit));
    if (!params.has("sortBy")) params.set("sortBy", "name");
    if (!params.has("sortOrder")) params.set("sortOrder", "desc");
    return params;
  }, [currentLimit, currentPage, searchParams]);

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProfiles(query);
      setPayload(normalizeProfilesResponse(response, currentPage, currentLimit));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profiles");
      setPayload((previous) => ({ ...previous, profiles: [] }));
    } finally {
      setLoading(false);
    }
  }, [currentLimit, currentPage, query]);

  useEffect(() => {
    void fetchProfiles();
  }, [fetchProfiles]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    const sort = SORT_OPTIONS.find((option) => option.value === sortValue) ?? SORT_OPTIONS[0];

    if (search.trim()) params.set("search", search.trim());
    if (batch) params.set("batch", batch);
    if (graduationYear) params.set("graduationYear", graduationYear);
    if (gender) params.set("gender", gender);
    if (bloodGroup) params.set("bloodGroup", bloodGroup);
    if (semester) params.set("semester", semester);
    if (status) params.set("status", status);

    params.set("sortBy", sort.sortBy);
    params.set("sortOrder", sort.sortOrder);
    params.set("limit", String(currentLimit));
    params.set("page", "1");

    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const clearFilters = () => {
    setSearch("");
    setBatch("");
    setGraduationYear("");
    setGender("");
    setBloodGroup("");
    setSemester("");
    setStatus("");
    setSortValue("name:desc");
    startTransition(() => router.push(pathname));
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(Math.min(Math.max(1, page), payload.totalPages)));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const toggleVisibility = async (profile: Profile) => {
    const id = getProfileId(profile);
    const nextVisibility = !getVisibility(profile);

    try {
      setUpdatingVisibilityId(id);
      setError(null);
      setNotice(null);
      const response = await changeProfileVisibility(id, nextVisibility);
      setNotice(response.message ?? "Profile visibility updated.");
      setPayload((current) => ({
        ...current,
        profiles: current.profiles.map((item) =>
          getProfileId(item) === id
            ? { ...item, visibility: nextVisibility, visible: nextVisibility, isVisible: nextVisibility }
            : item,
        ),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile visibility.");
    } finally {
      setUpdatingVisibilityId(null);
    }
  };

  const currentStudents = payload.profiles.filter((profile) => profile.semester && profile.semester !== "GRADUATE").length;
  const alumni = payload.profiles.filter((profile) => profile.semester === "GRADUATE" || profile.graduationYear).length;
  const visible = payload.profiles.filter(getVisibility).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="label mb-1">Management</p>
          <h1 className="m-0 text-2xl font-bold text-text-bright">Profiles</h1>
          <p className="mt-1 max-w-2xl text-sm text-text-secondary">
            Search, filter, and review student and alumni records from the profile API.
          </p>
        </div>

        <button type="button" onClick={fetchProfiles} className="btn btn-outline">
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total records", value: payload.total },
          { label: "Current on page", value: currentStudents },
          { label: "Alumni on page", value: alumni },
          { label: "Visible on page", value: visible },
        ].map((item) => (
          <div key={item.label} className="surface p-4">
            <p className="label mb-2 text-[9px]">{item.label}</p>
            <p className="font-display text-2xl font-bold leading-none text-text-bright">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="surface surface-accent p-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(220px,1.4fr)_repeat(4,minmax(120px,1fr))]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && applyFilters()}
            className="input h-10"
            placeholder="Search by name"
          />
          <input
            value={batch}
            onChange={(event) => setBatch(event.target.value)}
            className="input h-10"
            inputMode="numeric"
            placeholder="Batch"
          />
          <select value={semester} onChange={(event) => setSemester(event.target.value)} className={selectClass}>
            <option value="">All semesters</option>
            {SEMESTERS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select value={gender} onChange={(event) => setGender(event.target.value)} className={selectClass}>
            <option value="">All genders</option>
            {GENDERS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)} className={selectClass}>
            <option value="">All blood groups</option>
            {BLOOD_GROUPS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            value={graduationYear}
            onChange={(event) => setGraduationYear(event.target.value)}
            className="input h-10 w-40"
            inputMode="numeric"
            placeholder="Graduation year"
          />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className={selectClass}>
            <option value="">All status</option>
            <option value="current">Current</option>
            <option value="alumni">Alumni</option>
          </select>
          <select value={sortValue} onChange={(event) => setSortValue(event.target.value as SortValue)} className={selectClass}>
            {SORT_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button type="button" onClick={applyFilters} className="btn btn-primary">
              Apply
            </button>
            <button type="button" onClick={clearFilters} className="btn btn-ghost">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="surface overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-text-bright">Profile records</p>
            <p className="text-xs text-text-muted">
              Page {payload.page} of {payload.totalPages}
            </p>
          </div>
          <span className="tag">{loading ? "Loading" : `${payload.profiles.length} shown`}</span>
        </div>

        {error ? (
          <div className="p-6 text-sm text-status-error">{error}</div>
        ) : payload.profiles.length === 0 && !loading ? (
          <div className="p-10 text-center text-sm text-text-secondary">No profiles match the selected filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-205 border-collapse text-left text-sm">
              <thead className="bg-bg-elevated text-[11px] uppercase tracking-[0.14em] text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Student</th>
                  <th className="px-4 py-3 font-medium">Batch</th>
                  <th className="px-4 py-3 font-medium">Semester</th>
                  <th className="px-4 py-3 font-medium">Blood</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(loading ? Array.from({ length: 6 }) : payload.profiles).map((item, index) => {
                  const profile = item as Profile | undefined;
                  const isVisible = profile ? getVisibility(profile) : true;

                  return (
                    <tr key={profile ? getProfileId(profile) : index} className="border-t border-border-subtle">
                      <td className="px-4 py-3">
                        {profile ? (
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border-subtle bg-bg-elevated">
                              {profile.photo ? (
                                <img src={profile.photo} alt={profile.name} className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-xs text-text-muted">{profile.name.slice(0, 1)}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-text-bright">{profile.name}</p>
                              <p className="truncate text-xs text-text-muted">{profile.publicEmail ?? profile.userId}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-10 w-56 animate-pulse rounded-md bg-bg-elevated" />
                        )}
                      </td>
                      <td className="px-4 py-3 text-text-primary">{profile ? `Batch ${profile.batch ?? "-"}` : ""}</td>
                      <td className="px-4 py-3 text-text-primary">{profile ? displayEnum(profile.semester) : ""}</td>
                      <td className="px-4 py-3 text-text-primary">{profile ? displayEnum(profile.bloodGroup) : ""}</td>
                      <td className="px-4 py-3">
                        {profile && (
                          <span className={isVisible ? "tag" : "rounded border border-border-subtle px-2 py-1 text-[11px] text-text-muted"}>
                            {isVisible ? "Visible" : "Hidden"}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {profile && (
                          <div className="flex justify-end gap-2">
                            <a className="btn btn-ghost px-3 py-2" href={`/students?search=${encodeURIComponent(profile.name)}`}>
                              View
                            </a>
                            <button
                              type="button"
                              onClick={() => toggleVisibility(profile)}
                              disabled={updatingVisibilityId === getProfileId(profile)}
                              className="btn btn-outline px-3 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {updatingVisibilityId === getProfileId(profile)
                                ? "Saving"
                                : isVisible ? "Hide" : "Show"}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle px-4 py-3">
          <p className={notice ? "text-xs text-accent-bright" : "text-xs text-text-muted"}>
            {notice ?? `Showing ${payload.profiles.length} of ${payload.total} records`}
          </p>
          <div className="flex gap-2">
            <button type="button" onClick={() => goToPage(payload.page - 1)} disabled={payload.page <= 1} className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-40">
              Previous
            </button>
            <button type="button" onClick={() => goToPage(payload.page + 1)} disabled={payload.page >= payload.totalPages} className="btn btn-outline disabled:cursor-not-allowed disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
