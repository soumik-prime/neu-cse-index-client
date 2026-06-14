import type { Metadata } from "next";
import Image from "next/image";
import SectionLabel from "./_component/SectionLabel";
import SocialLink from "./_component/SocialLink";
import { FacebookIcon, GitHubIcon, LinkedInIcon } from "./_component/Icons";

export const metadata: Metadata = {
  title: "About — NEU CSE Index",
  description: "About the NEU CSE Alumni & Student Database project.",
};

const FEATURES = [
  {
    icon: "◈",
    title: "Student Profiles",
    desc: "Academic history, personal details, contact info and comprehensive profiles for every student.",
  },
  {
    icon: "◉",
    title: "Alumni Records",
    desc: "Higher studies, achievements and career paths of graduates — preserved and accessible.",
  },
  {
    icon: "⬡",
    title: "Networking",
    desc: "Connect current students with alumni and departmental community members.",
  },
  {
    icon: "◎",
    title: "Institutional Memory",
    desc: "Academic records, projects and achievements systematically documented for the long term.",
  },
  {
    icon: "⬢",
    title: "Collaboration",
    desc: "Identify peers, mentors and professional contacts within the departmental community.",
  },
  {
    icon: "◌",
    title: "Admin Tools",
    desc: "Provide administrators with tools to manage student and alumni information effectively.",
  },
];

const PROBLEMS = [
  {
    label: "Weak networking",
    desc: "No structured way to connect and maintain departmental relationships between students and alumni.",
  },
  {
    label: "Lost institutional memory",
    desc: "Important academic records and achievements are not preserved as batches graduate.",
  },
  {
    label: "Underutilized talent",
    desc: "Difficult to identify and leverage the talent pool of alumni and experienced professionals.",
  },
  {
    label: "Administrative burden",
    desc: "Cumbersome management of student information scattered across emails and paper documents.",
  },
  {
    label: "Limited community",
    desc: "Lack of continuity as batches graduate and new ones enroll without a shared space.",
  },
];

const FOR_WHOM = [
  {
    role: "Current Students",
    icon: "◈",
    desc: "Access the database to find alumni contacts, peer information and departmental resources.",
  },
  {
    role: "Alumni",
    icon: "◉",
    desc: "Maintain your departmental profile and stay connected with the department and fellow graduates.",
  },
  {
    role: "Faculty",
    icon: "⬡",
    desc: "Access student information and track departmental growth and achievements over time.",
  },
];

const DEVELOPER = {
  name: "Md. Samiul Islam Soumik",
  role: "Developer",
  batch: "4",
  session: "2022-23",
  course: "Application Development Lab (CSE-2216)",
  semester: "2nd Year, 2nd Semester",
  dept: "CSE, Netrokona University",
  github: "https://github.com/soumik-prime",
  facebook: "https://www.facebook.com/soumik.primee",
  linkedin: "https://www.linkedin.com/in/soumik-prime",
  photo: "/images/soumik.webp",
};

export default function AboutPage() {
  return (
    <div className="min-h-dvh">
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 flex justify-center"
          aria-hidden="true"
        >
          <div className="w-175 h-120 rounded-full bg-[rgba(34,168,153,0.05)] blur-[130px] mt-4" />
        </div>

        <div className="relative max-w-2xl mx-auto">
          <p className="label mb-4 tracking-[0.25em]">NEU CSE Index</p>
          <h1 className="mt-0 mb-5 leading-[1.05]">
            About the{" "}
            <span
              className="text-accent-bright"
              style={{ textShadow: "0 0 40px rgba(62,207,191,0.3)" }}
            >
              Project
            </span>
          </h1>
          <p className="text-text-primary text-base leading-relaxed mx-auto mb-0 max-w-xl">
            A centralized database and management system for the Department of
            Computer Science and Engineering at Netrokona University.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-28 space-y-24">
        {/* ── Purpose ── */}
        <section>
          <SectionLabel>Purpose</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">Why this exists</h2>
          <div className="surface surface-accent px-7 py-6">
            <p className="text-text-primary leading-loose text-sm m-0">
              The Department of CSE at Netrokona University has experienced
              significant growth, with multiple active batches progressing
              through their academic journey. As students transition into
              alumni, the need for a structured, organized system to manage
              their information becomes critical — this platform bridges that
              gap.
            </p>
          </div>
        </section>

        {/* ── Features ── */}
        <section>
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">What the system does</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="surface group px-5 py-5 flex gap-4 items-start transition-all duration-220 hover:border-border-default hover:bg-bg-elevated"
              >
                <span className="text-accent text-xl shrink-0 mt-0.5 group-hover:text-accent-bright transition-colors duration-220">
                  {f.icon}
                </span>
                <div>
                  <p className="text-text-bright font-semibold text-[0.8125rem] mt-0 mb-1.5">
                    {f.title}
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed m-0">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Problem ── */}
        <section>
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-2 mb-3 text-2xl">What we&apos;re solving</h2>
          <p className="text-text-secondary text-sm mb-5 leading-relaxed mt-0 max-w-2xl">
            Essential information about students and alumni is scattered across
            personal records, emails, social media and paper — leading to:
          </p>
          <div className="flex flex-col gap-2">
            {PROBLEMS.map((p, i) => (
              <div
                key={i}
                className="surface flex gap-5 items-start px-5 py-4 hover:border-border-default hover:bg-bg-elevated transition-all duration-220"
              >
                <span className="text-accent font-mono text-xs pt-0.5 shrink-0 tabular-nums opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-text-bright font-semibold text-[0.8125rem] m-0 mb-0.5">
                    {p.label}
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed m-0">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section>
          <SectionLabel>Audience</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">Who this is for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FOR_WHOM.map((w) => (
              <div
                key={w.role}
                className="surface surface-accent px-6 py-6 flex flex-col gap-3 hover:bg-bg-elevated transition-all duration-220"
              >
                <span className="text-accent text-2xl">{w.icon}</span>
                <div>
                  <p className="text-text-bright font-bold text-sm mt-0 mb-1.5">
                    {w.role}
                  </p>
                  <p className="text-text-secondary text-xs leading-relaxed m-0">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Vision ── */}
        <section>
          <SectionLabel>Vision</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">Where we&apos;re going</h2>
          <blockquote
            className="m-0 relative pl-6 py-1"
            style={{ borderLeft: "2px solid #22a899" }}
          >
            <div
              className="absolute -left-px top-0 bottom-0 w-0.5 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, #3ecfbf, #22a899, transparent)",
              }}
            />
            <p className="text-text-primary leading-loose text-[0.9375rem] italic m-0">
              &quot;The NEU CSE Alumni &amp; Student Database aims to create a
              sustainable, organized system that bridges the gap between current
              students and alumni — preserving the department&apos;s
              intellectual capital while fostering a strong, connected community
              that supports academic excellence and professional growth.&quot;
            </p>
          </blockquote>
        </section>

        {/* ── Course info ── */}
        <section>
          <SectionLabel>Academic Context</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">Course project</h2>
          <div className="surface px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              ["Course", DEVELOPER.course],
              ["Semester", DEVELOPER.semester],
              ["Institution", DEVELOPER.dept],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1.5">
                <p className="label m-0 text-[0.6rem]">{k}</p>
                <p className="text-text-primary text-[0.8125rem] m-0 leading-snug">
                  {v}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Developer ── */}
        <section>
          <SectionLabel>Built by</SectionLabel>
          <h2 className="mt-2 mb-5 text-2xl">Developer</h2>

          <div className="surface surface-accent overflow-hidden">
            <div className="px-7 py-7 flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-wrap">
              {/* Avatar */}
              <div className="relative shrink-0 flex items-center justify-center w-full! sm:w-28! h-72 sm:h-32">
                <div
                  className="sm:w-28 sm:h-32 sm:rounded-2xl overflow-hidden border border-border-default bg-bg-deep"
                  style={{ boxShadow: "0 0 30px rgba(34,168,153,0.12)" }}
                >
                  {DEVELOPER.photo ? (
                    <Image
                      src={DEVELOPER.photo}
                      alt={DEVELOPER.name}
                      fill
                      className="object-cover object-top opacity-90 sm:rounded-xl"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-text-muted text-[0.6rem] tracking-widest uppercase">
                      Photo
                    </div>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-accent-bright border-2 border-bg-base" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3 min-w-0 flex-1">
                <div>
                  <p className="text-text-bright font-bold text-xl m-0 mb-0.5 leading-tight">
                    {DEVELOPER.name}
                  </p>
                  <p className="label m-0 text-[0.6rem]">{DEVELOPER.role}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="tag">Batch {DEVELOPER.batch}</span>
                  <span className="tag">{DEVELOPER.session}</span>
                  <span className="tag">{DEVELOPER.dept}</span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {DEVELOPER.github && (
                    <SocialLink href={DEVELOPER.github} label="GitHub">
                      <GitHubIcon />
                    </SocialLink>
                  )}
                  {DEVELOPER.linkedin && (
                    <SocialLink href={DEVELOPER.linkedin} label="LinkedIn">
                      <LinkedInIcon />
                    </SocialLink>
                  )}
                  {DEVELOPER.facebook && (
                    <SocialLink href={DEVELOPER.facebook} label="Facebook">
                      <FacebookIcon />
                    </SocialLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
