// components/navigation/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CloseIcon, HamburgerIcon } from "./Icons";

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Students", href: "/students" },
  { label: "Alumni", href: "/alumni" },
  { label: "About", href: "/about" },
];

interface NavbarProps {
  loginButtonSlot: React.ReactNode;
}

export default function Navbar({ loginButtonSlot }: NavbarProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Synchronous State Adjustment: Tracks previous route to close mobile menu without a useEffect cascade
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  const lastY = useRef(0);
  const ticking = useRef(false);

  // Hide on scroll-up, show on scroll-down
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 40) {
          setVisible(true); // always show near top
        } else {
          setVisible(y < lastY.current); // show when scrolling DOWN, hide when scrolling UP
        }
        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        // floating pill — fixed, centered, max-width capped
        "fixed top-4 left-1/2 -translate-x-1/2 z-999",
        "w-[calc(100%-48px)] max-w-275",
        // glass surface
        "bg-[rgba(10,18,20,0.75)] backdrop-blur-lg",
        "border border-border-default rounded-2xl",
        "shadow-[0_0_0_1px_rgba(34,168,153,0.06),0_8px_32px_rgba(0,0,0,0.4)]",
        // hide/show animation
        "transition-all duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-[calc(100%+24px)] opacity-0",
      ].join(" ")}
    >
      {/* ── Main bar ── */}
      <div className="flex items-center h-13 px-4 gap-6">
        {/* Logo */}
        <Link
          href="/home"
          className="flex items-center gap-2.5 shrink-0 no-underline"
        >
          <div className="relative w-6 h-6">
            <Image
              src="/favicon.ico"
              alt="NEU CSE Index"
              fill
              className="opacity-85"
            />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-display text-[0.8125rem] font-bold text-text-bright tracking-tight">
              NeU CSE
            </span>
            <span className="font-mono text-[0.5rem] text-text-muted tracking-[0.14em] uppercase">
              Index
            </span>
          </div>
        </Link>

        <div className="flex-1" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "font-mono text-xs px-3 py-1.5 rounded-lg border transition-all duration-120 tracking-wide no-underline",
                  active
                    ? "text-[#22a899] bg-[rgba(34,168,153,0.1)] border-[rgba(34,168,153,0.2)] font-medium"
                    : "text-text-secondary border-transparent hover:text-text-primary hover:bg-[rgba(34,168,153,0.05)]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="w-px h-4 bg-border-default mx-2 shrink-0" />

          {/* Desktop Authentication via Server Component Slot */}
          {loginButtonSlot}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg border border-border-default text-text-secondary bg-transparent cursor-pointer transition-colors duration-120 hover:border-[#22a899] hover:text-[#22a899]"
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border-subtle px-3 pt-2 pb-3 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "font-mono text-[0.8125rem] px-3 py-2.5 rounded-lg no-underline transition-colors duration-120",
                  active
                    ? "text-[#22a899] bg-[rgba(34,168,153,0.08)] font-medium"
                    : "text-text-secondary hover:text-text-primary",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="border-t border-border-subtle my-2" />

          {/* Mobile Authentication via Server Component Slot */}
          <div className="flex flex-col">{loginButtonSlot}</div>
        </div>
      )}
    </div>
  );
}
