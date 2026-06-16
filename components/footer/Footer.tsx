'use client'

import { useState } from 'react'
import Link from 'next/link'
import BackToTop from './BackToTop'

/* ──────────────────────────────────────────
   Data
────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'About Us',   href: '/message-from-chairman' },
  { label: 'Faculty',    href: '/faculty/active' },
  { label: 'Notices',    href: '/notices' },
  { label: 'Research',   href: '/publications/all' },
  { label: 'Contact Us', href: '/contact-us' },
]

const ACADEMIC_LINKS = [
  { label: 'Admissions', href: 'https://neu.ac.bd/admission-2024-2025/', external: true },
  { label: 'Curriculum', href: '/curriculum' },
  { label: 'Programs',   href: '/academics' },
  { label: 'Alumni',     href: '/alumni' },
]

const SOCIAL_LINKS = [
  { label: 'Facebook', icon: 'f', href: '#', hoverBg: 'hover:bg-blue-600' },
  { label: 'Twitter',  icon: 'x', href: '#', hoverBg: 'hover:bg-sky-400'  },
  { label: 'LinkedIn', icon: 'in', href: '#', hoverBg: 'hover:bg-blue-700' },
  { label: 'YouTube',  icon: '▶', href: '#', hoverBg: 'hover:bg-red-600'  },
]

/* ──────────────────────────────────────────
   Main Footer Component
────────────────────────────────────────── */
export default function Footer() {
  const [email, setEmail] = useState('')
  const [subState, setSubState] = useState<'idle' | 'loading' | 'done'>('idle')

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email || subState !== 'idle') return
    setSubState('loading')
    setTimeout(() => {
      setSubState('done')
      setEmail('')
      setTimeout(() => setSubState('idle'), 3000)
    }, 1400)
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Brand accent stripe */}
      <div className="h-1 bg-gradient-to-r from-[#02644A] via-emerald-500 to-[#02644A]" />

      {/* ── Main grid ── */}
      <div className="py-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Dept. branding */}
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#02644A]">
                Department of CSE
              </span>
            </h2>
            <p className="text-xl text-slate-300 font-medium mt-2">Netrokona University</p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#02644A] to-emerald-400 mx-auto mt-4 rounded-full" />
          </div>

          {/* Four-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* ── Contact ── */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <address className="not-italic space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#02644A] mt-0.5">🏛️</span>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Department of CSE<br />
                    Netrokona University<br />
                    Netrokona, Bangladesh
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#02644A]">📞</span>
                  <a href="tel:+88029977350150" className="text-slate-300 text-sm hover:text-emerald-400 transition-colors">
                    +880 2997735015
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#02644A]">✉️</span>
                  <a href="mailto:cse@neu.ac.bd" className="text-slate-300 text-sm hover:text-emerald-400 transition-colors">
                    cse@neu.ac.bd
                  </a>
                </div>
              </address>
            </div>

            {/* ── Quick Links ── */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Quick Links</h3>
              <ul className="space-y-2.5">
                {QUICK_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-slate-300 text-sm hover:text-[#02644A] transition-colors duration-200
                                 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Academic ── */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Academic</h3>
              <ul className="space-y-2.5">
                {ACADEMIC_LINKS.map((l) => (
                  <li key={l.href}>
                    {l.external ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 text-sm hover:text-[#02644A] transition-colors duration-200
                                   flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                        {l.label}
                      </a>
                    ) : (
                      <Link
                        href={l.href}
                        className="text-slate-300 text-sm hover:text-[#02644A] transition-colors duration-200
                                   flex items-center gap-2 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Connect ── */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-white">Connect With Us</h3>

              {/* Faculty Login */}
              <Link
                href="/faculty/login"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5
                           bg-gradient-to-r from-[#02644A] to-emerald-500
                           hover:from-emerald-600 hover:to-[#02644A]
                           text-white text-sm font-semibold rounded-lg
                           shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                👔 Faculty Login
              </Link>

              {/* Social icons */}
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className={`w-9 h-9 bg-slate-700 ${s.hoverBg} rounded-lg flex items-center justify-center
                               text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <h4 className="text-base font-semibold text-white mb-1">Stay Updated</h4>
                <p className="text-slate-400 text-xs mb-3">Subscribe for latest updates.</p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-3 py-2 bg-slate-700 text-white text-sm rounded-lg
                               border border-slate-600 focus:border-emerald-400 focus:outline-none
                               placeholder-slate-400 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={subState !== 'idle'}
                    className="w-full py-2 text-sm font-semibold rounded-lg text-white
                               bg-[#02644A] hover:bg-emerald-600 disabled:opacity-60
                               transition-all duration-200"
                  >
                    {subState === 'loading' ? 'Subscribing…' : subState === 'done' ? '✓ Subscribed!' : 'Subscribe'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-slate-300 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Department of CSE, Netrokona University. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 text-center md:text-right">
              Developed by{' '}
              <a
                href="https://abirsportfolio.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#02644A] font-bold hover:text-emerald-400 transition-colors"
              >
                Abir Hasan
              </a>
              {' '}• Maintained by NeU CSE Department
            </p>
          </div>
        </div>
      </div>

      {/* ── Back to top ── */}
      <BackToTop />
    </footer>
  )
}

/* ──────────────────────────────────────────
   Back to Top button (self-contained)
────────────────────────────────────────── */
