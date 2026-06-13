"use client";

interface Profile {
  userId: string;
  name: string;
  photo: string;
  batch: number;
  session: string;
  semester?: string;
  gender?: string;
  bloodGroup?: string;
  city?: string;
  country?: string;
}

export default function StudentCard({ profile: p }: { profile: Profile }) {
  const location = [p.city, p.country].filter(Boolean).join(", ");

  return (
    <div className="relative flex cursor-pointer flex-col items-center overflow-hidden rounded-[10px] border border-[#0f2e2a] bg-[#0f1c1e] pb-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#22a899]">
      {/* Square image */}
      <div className="aspect-square w-full shrink-0 overflow-hidden border-b border-[#0f2e2a] bg-[#0a1214]">
        <img
          src={p.photo}
          alt={p.name}
          className="block h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-2 px-[14px] pt-[14px]">
        {/* Name */}
        <p className="m-0 w-full truncate text-center text-sm font-semibold leading-[1.3] text-[#d4eae8]">
          {p.name}
        </p>

        {/* Batch badge */}
        <div className="inline-flex items-center gap-1.5 rounded border border-[rgba(34,168,153,0.25)] bg-[rgba(34,168,153,0.10)] px-2.5 py-[3px]">
          <span className="text-[11px] font-semibold tracking-wider text-[#22a899]">
            Batch {p.batch}
          </span>

          <span className="text-[10px] text-[#2e5550]">·</span>

          <span className="text-[10px] text-[#5a8a86]">
            {p.session}
          </span>
        </div>

        {/* Location */}
        {location && (
          <p className="m-0 w-full truncate text-center text-[11px] text-[#5a8a86]">
            📍 {location}
          </p>
        )}

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {p.semester && (
            <span className="rounded border border-[#0f2e2a] bg-[#152224] px-1.5 py-0.5 text-[10px] text-[#5a8a86]">
              {p.semester} Sem
            </span>
          )}

          {p.bloodGroup && (
            <span className="rounded border border-[rgba(224,96,112,0.2)] bg-[rgba(224,96,112,0.08)] px-1.5 py-0.5 text-[10px] text-[#e06070]">
              {p.bloodGroup}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}