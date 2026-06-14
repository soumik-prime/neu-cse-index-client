export default function AboutSection() {
  return (
    <section className="relative z-10 px-6 py-28">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* text */}
          <div>
            <span className="label mb-4 block">About the Project</span>
            <h2 style={{ color: "var(--color-text-bright, #d4eae8)" }}>
              One home for every{" "}
              <span style={{ color: "var(--color-accent)" }}>NeU CSE</span>{" "}
              mind.
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{
                color: "var(--color-text-secondary, #9ec8c4)",
                maxWidth: "52ch",
              }}
            >
              As the department grew, essential records scattered across emails,
              paper files, and informal chats. The NeU CSE Index gathers
              everything into one structured, searchable system — preserving
              institutional memory while building the connections that move
              careers forward.
            </p>
            <p
              className="mt-4 leading-relaxed"
              style={{
                color: "var(--color-text-secondary, #9ec8c4)",
                maxWidth: "52ch",
              }}
            >
              Built as part of the{" "}
              <span style={{ color: "var(--color-accent-bright, #3ecfbf)" }}>
                Application Development Lab (CSE-2216)
              </span>{" "}
              — Second Year, Second Semester — this is a real-world full-stack
              solution developed by students, for students.
            </p>
          </div>

          {/* problem cards */}
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                icon: "⚡",
                title: "Scattered Records",
                body: "Student data lived in emails, paper files, and private messages — no single source of truth.",
              },
              {
                icon: "🔗",
                title: "Weak Networking",
                body: "No structured way for current students to find alumni mentors or peers from earlier batches.",
              },
              {
                icon: "📚",
                title: "Lost Knowledge",
                body: "Achievements, projects, and profiles vanished with each graduating batch.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="surface p-5 flex gap-4 items-start"
                style={{ borderRadius: 8 }}
              >
                <span style={{ fontSize: 22 }} aria-hidden="true">
                  {c.icon}
                </span>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{
                      color: "var(--color-text-bright, #d4eae8)",
                      fontSize: 14,
                    }}
                  >
                    {c.title}
                  </p>
                  <p
                    style={{
                      color: "var(--color-text-secondary, #9ec8c4)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    {c.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
