import { Profile } from "@/lib/types/profile.interface";
import { LinkedInIcon } from "../../about/_component/Icons";
import { GithubIcon, PortfolioIcon } from "./Icons";
import Image from "next/image";

/**
 * profile props:
 * name
 * bio
 * batch
 * photo
 * session
 * semester
 * city
 * country
 * github
 * linkedin*
 * portfolio
 * facebook*
 * googleScholar
 * publicEmail*
 */

export default function StudentCard({ profile: p }: { profile: Profile }) {
  const location = [p.city, p.country].filter(Boolean).join(", ");

  const socialLinks = [
    p.github && { href: p.github, icon: <GithubIcon />, label: "GitHub" },

    p.linkedin && {
      href: p.linkedin,
      icon: <LinkedInIcon />,
      label: "LinkedIn",
    },

    p.portfolio && {
      href: p.portfolio,
      icon: <PortfolioIcon />,
      label: "Portfolio",
    },
  ].filter(Boolean) as { href: string; icon: React.ReactNode; label: string }[];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-glow cursor-pointer">
      {/* ── Image ── */}
      <div className="relative aspect-square w-full overflow-hidden bg-bg-deep">
        {/* 1. The Parent Container must be relative and overflow-hidden */}
        <div className="relative h-full w-full overflow-hidden rounded-t-xl">
          <Image
            src={p.photo ?? "/default-profile.png"}
            alt={p.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] opacity-85"
          />
        </div>

        {/* Batch tag — top left, overlaid on image */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded border border-[rgba(34,168,153,0.35)] bg-[rgba(7,13,14,0.75)] px-2 py-0.5 backdrop-blur-sm">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-accent">
            B{p.batch}
          </span>
          {p.session && (
            <>
              <span className="text-text-muted text-[9px]">·</span>
              <span className="font-mono text-[9px] text-text-secondary">
                {p.session}
              </span>
            </>
          )}
        </div>

        {/* Blood group — top right */}
        {p.bloodGroup && (
          <div className="absolute  top-2.5 left-2.5 px-2 py-0.5 flex items-center rounded border border-[rgba(224,96,112,0.3)] bg-[rgba(7,13,14,0.75)] backdrop-blur-sm">
            <span className="font-mono text-[10px] font-semibold text-status-error">
              {p.bloodGroup}
            </span>
          </div>
        )}

        {/* Gradient fade at bottom of image into card */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-bg-surface to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col gap-2 px-3.5 pt-2.5 pb-3.5">
        {/* Name */}
        <p className="m-0 truncate text-sm font-semibold leading-snug text-text-bright">
          {p.name}
        </p>

        {/* Bio */}
        {p.bio && (
          <p className="m-0 line-clamp-2 text-[11px] leading-relaxed text-text-secondary">
            {p.bio}
          </p>
        )}

        {/* Meta row */}
        <div className="sm:flex flex-wrap items-center gap-1.5 hidden">
          {p.semester && (
            <span className="rounded border border-border-subtle bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
              {p.semester} SEM
            </span>
          )}
          {p.graduationYear && (
            <span className="rounded border border-border-subtle bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">
              {p.graduationYear}
            </span>
          )}
          {location && (
            <span className="text-[10px] text-text-muted truncate">
              📍 {location}
            </span>
          )}
        </div>

        {/* Social links */}
        {socialLinks.length > 0 && (
          <div className="flex items-center gap-1.5 pt-0.5 border-t border-border-subtle mt-0.5">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center w-6 h-6 rounded border border-border-subtle bg-bg-elevated text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                {icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
