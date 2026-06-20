"use client";

import {
  IconArrowLeft,
  IconUser,
  IconLink,
  IconSchool,
  IconBook,
  IconMapPin,
  IconLock,
  IconChartBar,
  IconUserPlus,
  IconUsers,
  IconDatabase,
  IconShieldLock,
  IconId,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "../../../components/ui/Avater";

// ── types ─────────────────────────────────────────────────
type TRole = "USER" | "ADMIN" | "SUPERADMIN";

type TUser = {
  name: string;
  email: string;
  image: string;
  role: TRole;
};

type NavItem = {
  key: string;
  label: string;
  icon: Icon;
  href: string;
};

// ── nav structure (role-based) ────────────────────────────
const NAV_STRUCTURE: Record<TRole, Record<string, NavItem[]>> = {
  USER: {
    Account: [
      {
        key: "profile",
        label: "Profile",
        icon: IconUser,
        href: "/dashboard/profile",
      },
      {
        key: "social",
        label: "Social & contact",
        icon: IconLink,
        href: "/dashboard/social",
      },
      {
        key: "academic",
        label: "Academic",
        icon: IconSchool,
        href: "/dashboard/academic",
      },
      {
        key: "education-history",
        label: "Education history",
        icon: IconBook,
        href: "/dashboard/education-history",
      },
      {
        key: "address",
        label: "Address",
        icon: IconMapPin,
        href: "/dashboard/address",
      },
    ],
  },
  ADMIN: {
    Management: [
      {
        key: "statistics",
        label: "Statistics",
        icon: IconChartBar,
        href: "/dashboard/statistics",
      },
      {
        key: "register-users",
        label: "Register users",
        icon: IconUserPlus,
        href: "/dashboard/register-users",
      },
      {
        key: "user-management",
        label: "User management",
        icon: IconUsers,
        href: "/dashboard/user-management",
      },
      {
        key: "data-management",
        label: "Data management",
        icon: IconDatabase,
        href: "/dashboard/data-management",
      },
    ],
  },
  SUPERADMIN: {
    System: [
      {
        key: "admin-management",
        label: "Admin management",
        icon: IconShieldLock,
        href: "/dashboard/admin-management",
      },
    ],
    Management: [
      {
        key: "statistics",
        label: "Statistics",
        icon: IconChartBar,
        href: "/dashboard/statistics",
      },
      {
        key: "register-users",
        label: "Register users",
        icon: IconUserPlus,
        href: "/dashboard/register-users",
      },
      {
        key: "user-management",
        label: "User management",
        icon: IconUsers,
        href: "/dashboard/user-management",
      },
      {
        key: "data-management",
        label: "Data management",
        icon: IconDatabase,
        href: "/dashboard/data-management",
      },
    ],
  },
};

// ── common nav (all roles) ────────────────────────────────
const COMMON_NAV: NavItem[] = [
  {
    key: "user-information",
    label: "User information",
    icon: IconId,
    href: "/dashboard/user-information",
  },
  {
    key: "change-password",
    label: "Change password",
    icon: IconLock,
    href: "/dashboard/change-password",
  },
];

// ── category colors ───────────────────────────────────────
const CATEGORY_COLORS: Record<
  string,
  { label: string; active: string; border: string }
> = {
  System: {
    label: "text-purple-600",
    active: "bg-purple-50 text-purple-700 border-purple-500",
    border: "border-t border-purple-100",
  },
  Management: {
    label: "text-[#02644A]",
    active: "bg-[#D1FAE5] text-[#02644A] border-[#02644A]",
    border: "border-t border-[#D1FAE5]",
  },
  Account: {
    label: "text-blue-600",
    active: "bg-blue-50 text-blue-700 border-blue-500",
    border: "border-t border-blue-100",
  },
};

// ── avatar ────────────────────────────────────────────────
// function Avatar({
//   name,
//   photo,
//   size = 36,
// }: {
//   name: string;
//   photo?: string;
//   size?: number;
// }) {
//   if (photo) {
//     return (
//       <Image
//         src={photo}
//         alt={name}
//         width={size}
//         height={size}
//         className="rounded-full object-cover"
//       />
//     );
//   }

//   return (
//     <div
//       className="rounded-full bg-[#02644A] text-white flex items-center justify-center font-semibold"
//       style={{ width: size, height: size }}
//     >
//       {name.charAt(0).toUpperCase()}
//     </div>
//   );
// }

// ── sidebar ───────────────────────────────────────────────
export default function Sidebar({
  open,
  onClose,
  user = {
    name: "Md. Samiul Islam Soumik",
    email: "soumik.shu@neu.ac.bd",
    role: "USER",
    image: "",
  },
}: {
  open: boolean;
  onClose: () => void;
  user?: TUser;
}) {
  const pathname = usePathname();
  const navCategories = NAV_STRUCTURE[user.role];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-55 shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden transition-transform duration-200 ${
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Profile */}
      <div className="px-3.5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <Avatar name={user.name} photo={user.image} size={36} />
          <div className="min-w-0">
            <p className="font-semibold text-[13px] text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Role-based nav */}
        {Object.entries(navCategories).map(([category, items], idx) => {
          const colors =
            CATEGORY_COLORS[category] ?? CATEGORY_COLORS["Management"];

          return (
            <div
              key={category}
              className={idx > 0 ? `mt-1 pt-1 ${colors.border}` : ""}
            >
              <p
                className={`text-[10px] font-bold uppercase tracking-widest px-3.5 pt-3 pb-1 ${colors.label}`}
              >
                {category}
              </p>

              {items.map((item) => {
                const active = pathname === item.href;
                const NavIcon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 w-full px-3.5 py-2 text-[13px] transition-colors border-l-2 ${
                      active
                        ? `${colors.active} font-medium`
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent"
                    }`}
                  >
                    <NavIcon size={15} className="shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          );
        })}

        {/* Common nav */}
        <div className="mt-1 pt-1 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-widest px-3.5 pt-3 pb-1 text-gray-400">
            Settings
          </p>
          {COMMON_NAV.map((item) => {
            const active = pathname === item.href;
            const NavIcon = item.icon;

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-2.5 w-full px-3.5 py-2 text-[13px] transition-colors border-l-2 ${
                  active
                    ? "bg-gray-100 text-gray-800 border-gray-500 font-medium"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-transparent"
                }`}
              >
                <NavIcon size={15} className="shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3.5 py-2.5 border-t border-gray-100 space-y-2 lg:space-y-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[12px] text-gray-500 hover:text-[#02644A] transition-colors"
        >
          <IconArrowLeft size={16} /> Back to site
        </Link>

        <div className="flex lg:hidden items-center gap-1.5 text-[10px] text-gray-500/80">
          <span>Built by</span>
          <a
            href="https://github.com/soumik-prime"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#0b8274b7] hover:text-[#0b8274] transition-colors duration-200"
          >
            Md. Samiul Islam Soumik
          </a>
        </div>
      </div>
    </aside>
  );
}
