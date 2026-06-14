import { getPublicStats } from "@/lib/services/stats.service";

export default async function StatsSection() {
  const publicStats = await getPublicStats();
  const STATS = [
    { value: publicStats.data?.totalBatch || "00", label: "Academic Batches" },
    { value: publicStats.data?.currentStudents || "00", label: "Active Enrolments" },
    { value: publicStats.data?.totalAlumni || "00", label: "Graduated Alumni" },
    { value: publicStats.data?.totalStudents || "00", label: "Total Registrations" },
  ];
  
  return (
    <section className="relative z-10 px-6 py-0">
      <div className="container mx-auto">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{
            background: "var(--color-border-default, #1a4a44)",
            border: "1px solid var(--color-border-default, #1a4a44)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: "var(--color-bg-surface, #0f1c1e)" }}
            >
              <span
                className="glow-text font-display font-bold text-3xl md:text-4xl"
                style={{ color: "var(--color-accent, #22a899)" }}
              >
                {s.value}
              </span>
              <span
                className="label mt-2"
                style={{ color: "var(--color-text-secondary, #5a8a86)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
