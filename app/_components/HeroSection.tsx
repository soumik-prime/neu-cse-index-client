import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[92vh] text-center px-6 py-24">
      {/* eyebrow */}
      <span className="label mb-5 tracking-widest opacity-80">
        Dept. of Computer Science &amp; Engineering 
        <span className="hidden md:inline font-black"> · </span>
        <br className="md:hidden"/>
        Netrokona University
      </span>

      <h1 className="glow-text text-white max-w-4xl mx-auto leading-none">
        NeU&nbsp;
        <span style={{ color: "var(--color-accent)" }}>CSE</span>
        &nbsp;<br className="sm:hidden"/>Index
      </h1>

      <p
        className="mt-6 max-w-2xl mx-auto md:text-lg leading-relaxed"
        style={{ color: "var(--color-text-secondary, #9ec8c4)" }}
      >
        A centralized alumni &amp; student database connecting every batch —
        past, present, and future — of the CSE department at Netrokona
        University.
      </p>

      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <Link href="/students" className="btn btn-primary">
          Browse Students
        </Link>
        <Link href="/alumni" className="btn btn-outline">
          Explore Alumni
        </Link>
      </div>

      {/* scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
        aria-hidden="true"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontSize: 10 }}
        >
          scroll
        </span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <path
            d="M6 1v12M1 8l5 8 5-8"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
