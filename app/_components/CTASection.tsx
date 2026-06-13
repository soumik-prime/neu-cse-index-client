import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative z-10 px-6 py-24">
      <div className="divider-glow" />
      <div className="container mx-auto pt-16 text-center">
        <span className="label mb-4 block">Access the Index</span>

        <h2
          className="glow-text mx-auto"
          style={{
            color: "var(--color-text-bright, #d4eae8)",
            maxWidth: "28ch",
          }}
        >
          Your department&apos;s story, finally in one place.
        </h2>

        <p
          className="mt-5 mx-auto"
          style={{
            color: "var(--color-text-secondary, #9ec8c4)",
            maxWidth: "48ch",
            lineHeight: 1.7,
          }}
        >
          Explore a searchable archive of achievements, activities, people, and
          milestones from the Department of Computer Science and Engineering.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>

          <Link href="/dashboard" className="btn btn-outline">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}