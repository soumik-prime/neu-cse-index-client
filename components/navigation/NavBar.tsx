'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/* ──────────────────────────────────────────
   Types
────────────────────────────────────────── */
interface NavItem {
    label: string
    href?: string
    children?: { label: string; href: string; icon: string; iconBg: string; iconColor: string }[]
}

/* ──────────────────────────────────────────
   Nav config — mirrors the original site
────────────────────────────────────────── */
const NAV_ITEMS: NavItem[] = [
    {
        label: 'About',
        children: [
            { label: 'Why NeU CSE?', href: '/why-neu-cse', icon: '❓', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Message from Department', href: '/message-from-department', icon: '🏛️', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Message from Chairman', href: '/message-from-chairman', icon: '👔', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'History of NeU CSE', href: '/history-neu-cse', icon: '📜', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Mission and Vision', href: '/mission-vision', icon: '🎯', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'History of University', href: '/history-neu', icon: '🏛️', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Achievements', href: '/achievements', icon: '🏆', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Facilities', href: '/facilities', icon: '🏢', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
        ],
    },
    {
        label: 'Academic',
        children: [
            { label: 'Program', href: '/academics', icon: '🎓', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Admission', href: '/admission', icon: '🚪', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Curriculum', href: '/curriculum', icon: '📖', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Calendar', href: '/academic-calendar', icon: '📅', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
        ],
    },
    {
        label: 'Research',
        children: [
            { label: 'Publications', href: '/publications', icon: '📰', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
            { label: 'Projects', href: '/projects', icon: '🔗', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
        ],
    },
    {
        label: 'Notice',
        children: [
            { label: 'Important Notice', href: '/notices?type=important', icon: '⚠️', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
            { label: 'Latest Notices', href: '/notices?type=latest', icon: '🔔', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
            { label: 'All Notices', href: '/notices?type=all', icon: '📋', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
        ],
    },
    {
        label: 'Faculty & Staff',
        children: [
            { label: 'Active Faculty', href: '/faculty/active', icon: '🎓', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
            { label: 'Faculty (on Leave)', href: '/faculty/on-leave', icon: '⏰', iconBg: 'bg-yellow-100', iconColor: 'text-yellow-600' },
            { label: 'Past Faculty', href: '/faculty/past', icon: '📚', iconBg: 'bg-gray-100', iconColor: 'text-gray-600' },
            { label: 'Ex Chairman', href: '/faculty/ex-chairman', icon: '👑', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
            { label: 'Officer & Staff', href: '/faculty/officer-and-staff', icon: '👥', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        ],
    },
    {
        label: 'Index',
        children: [

            {
                label: 'Students', href: '/students', icon: '💻', iconBg: 'bg-blue-100', iconColor: 'text-blue-600'
            },
            {
                label: 'Alumni', href: '/alumni', icon: '💻', iconBg: 'bg-blue-100', iconColor: 'text-blue-600'
            },
            { label: 'Contact Us', href: '/contact-us', icon: '💻', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        ]
    },
    {
        label: 'Club',
        children: [
            { label: 'Computer Club', href: '/clubs/computer', icon: '💻', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
            { label: 'Programming Club', href: '/clubs/programming', icon: '⌨️', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
        ],
    },
    { label: 'Contact Us', href: '/contact-us' },
    
]

/* ──────────────────────────────────────────
   Sub-component: Desktop Dropdown
────────────────────────────────────────── */
function DesktopDropdown({ item }: { item: NavItem }) {
    return (
        <div className="relative group mx-1">
            <button
                className="relative px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide
                   text-slate-200 hover:text-white hover:bg-slate-700/50
                   flex items-center gap-1.5 transition-all duration-200"
            >
                {item.label}
                <svg
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180"
                    fill="currentColor" viewBox="0 0 24 24"
                >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
            </button>

            {/* Dropdown panel */}
            <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                   bg-white rounded-2xl shadow-2xl border border-slate-200
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-all duration-200 z-[9999] overflow-hidden min-w-[220px]"
            >
                {/* Arrow */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-l border-t border-slate-200" />
                <div className="p-2">
                    {item.children?.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 text-sm font-medium
                         hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50
                         hover:text-emerald-700 transition-all duration-150"
                        >
                            <span className={`w-8 h-8 ${child.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 text-base`}>
                                {child.icon}
                            </span>
                            {child.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ──────────────────────────────────────────
   Sub-component: Mobile Accordion Item
────────────────────────────────────────── */
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
    const [open, setOpen] = useState(false)

    if (!item.children) {
        return (
            <Link
                href={item.href!}
                onClick={onClose}
                className="block py-3 px-4 rounded-xl font-semibold text-sm text-slate-200
                   hover:text-white hover:bg-slate-700/50 transition-all duration-200"
            >
                {item.label}
            </Link>
        )
    }

    return (
        <div>
            <button
                onClick={() => setOpen((v) => !v)}
                className="w-full text-left py-3 px-4 rounded-xl font-semibold text-sm
                   text-slate-200 hover:text-white hover:bg-slate-700/50
                   flex justify-between items-center transition-all duration-200"
            >
                {item.label}
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    fill="currentColor" viewBox="0 0 24 24"
                >
                    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
            </button>

            {open && (
                <div className="mt-1 ml-4 bg-slate-800/50 rounded-xl overflow-hidden">
                    {item.children.map((child) => (
                        <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="flex items-center gap-2 py-2.5 px-4 text-slate-300 text-sm
                         hover:bg-slate-700/50 hover:text-white transition-all duration-150"
                        >
                            <span className="text-emerald-400 text-xs w-5">{child.icon}</span>
                            {child.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

/* ──────────────────────────────────────────
   Main Navbar Component
────────────────────────────────────────── */
export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <nav className="relative z-[9999] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">

            {/* ── Top Header Bar ── */}
            <header className="bg-gradient-to-r from-gray-50 to-white text-slate-800 border-b border-slate-200">
                <div className="container mx-auto px-4 sm:px-6 py-3">
                    <div className="flex justify-between items-center">

                        {/* Logo + Department name */}
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                {/* Replace src with your actual logo path */}
                                <div className="h-16 w-12 bg-neu-green rounded flex items-center justify-center text-white font-black text-xl">
                                    N
                                </div>
                            </div>
                            <div className="space-y-0.5 min-w-0">
                                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-600 leading-tight">
                                    Department of Computer Science &amp; Engineering
                                </h1>
                                <a
                                    href="https://neu.ac.bd/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1.5 text-sm text-slate-600
                             hover:text-emerald-600 font-medium transition-colors duration-200"
                                >
                                    Netrokona University
                                    <svg
                                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 translate-x-0
                               group-hover:translate-x-0.5 transition-all duration-200"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Contact info — desktop only */}
                        <div className="hidden lg:block space-y-1.5">
                            <p className="text-sm font-medium text-slate-700 flex items-center gap-2.5">
                                <span className="text-emerald-600">✉</span>
                                cse@neu.ac.bd
                            </p>
                            <p className="text-sm font-medium text-slate-700 flex items-center gap-2.5">
                                <span className="text-emerald-600">📞</span>
                                +880 2997735015
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── Desktop Nav Bar ── */}
            <div className="container mx-auto px-4 py-2.5">
                <div className="hidden md:flex justify-center items-center w-full">
                    <div className="flex items-center bg-slate-800/30 backdrop-blur-md rounded-full
                          px-2 py-1 shadow-xl border border-slate-700/50">

                        {/* Home — always highlighted */}
                        <Link
                            href="/"
                            className="px-5 py-2.5 mx-1 rounded-full font-semibold text-sm tracking-wide
                         bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg
                         transition-all duration-200 hover:shadow-xl"
                        >
                            Home
                        </Link>

                        {NAV_ITEMS.map((item) =>
                            item.children ? (
                                <DesktopDropdown key={item.label} item={item} />
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
                                    className="px-5 py-2.5 mx-1 rounded-full font-semibold text-sm tracking-wide
                             text-slate-200 hover:text-white hover:bg-slate-700/50
                             transition-all duration-200"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </div>
                </div>

                {/* ── Mobile Menu Toggle ── */}
                <div className="md:hidden flex justify-end">
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700
                       hover:bg-slate-700/50 focus:outline-none focus-visible:ring-2
                       focus-visible:ring-emerald-400 transition-all duration-200"
                    >
                        {mobileOpen ? (
                            /* X icon */
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            /* Hamburger icon */
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            {mobileOpen && (
                <div className="md:hidden bg-gradient-to-b from-slate-900 to-slate-800
                        border-t border-slate-700 max-h-[calc(100vh-140px)]
                        overflow-y-auto">
                    <div className="px-4 py-4 space-y-1.5">
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="block py-3 px-4 rounded-xl font-semibold text-sm
                         bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                        >
                            Home
                        </Link>
                        {NAV_ITEMS.map((item) => (
                            <MobileNavItem
                                key={item.label}
                                item={item}
                                onClose={() => setMobileOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}