const AUDIENCES = [
  {
    role: "Current Students",
    color: "var(--color-accent, #22a899)",
    icon: "👨‍💻",
    points: [
      "Browse alumni profiles for mentorship",
      "Find peers across batches",
      "Maintain your own academic profile",
    ],
  },
  {
    role: "Alumni",
    color: "var(--color-accent-bright, #3ecfbf)",
    icon: "🎓",
    points: [
      "Keep your departmental profile updated",
      "Stay connected with the community",
      "Share your journey with current students",
    ],
  },
  {
    role: "Faculty & Admin",
    color: "#60b0e0",
    icon: "🏛️",
    points: [
      "Access and manage all student records",
      "Track departmental growth over time",
      "Generate reports and export data",
    ],
  },
];

export default function ForWhomSection() {
  return (
    <section className="relative z-10 px-6 py-20">
      <div className="divider-glow" />
      <div className="container mx-auto pt-16">
        <div className="text-center mb-14">
          <span className="label mb-3 block">Who it&apos;s for</span>
          <h2 style={{ color: "var(--color-text-bright, #d4eae8)" }}>
            Everyone in the{" "}
            <span style={{ color: "var(--color-accent)" }}>NeU CSE</span> family
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AUDIENCES.map((a) => (
            <div
              key={a.role}
              className="surface p-7"
              style={{
                borderTop: `2px solid ${a.color}`,
                borderRadius: 10,
              }}
            >
              <span style={{ fontSize: 32 }} aria-hidden="true">
                {a.icon}
              </span>
              <h3
                className="mt-4 mb-4"
                style={{ color: a.color, fontSize: "1.05rem", fontWeight: 700 }}
              >
                {a.role}
              </h3>
              <ul className="flex flex-col gap-3">
                {a.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2"
                    style={{
                      color: "var(--color-text-secondary, #9ec8c4)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{ color: a.color, marginTop: 3, flexShrink: 0 }}
                    >
                      ›
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
