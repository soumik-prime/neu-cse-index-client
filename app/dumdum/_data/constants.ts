export const COUNTRIES = [
  "Bangladesh","India","USA","UK","Canada","Australia","Germany","Japan","Singapore","Malaysia",
];

export const CITIES: Record<string, string[]> = {
  Bangladesh: ["Dhaka","Chittagong","Sylhet","Rajshahi","Khulna","Netrokona","Mymensingh","Comilla","Gazipur","Barishal"],
  India:      ["Mumbai","Delhi","Kolkata","Bengaluru","Chennai","Hyderabad"],
  USA:        ["New York","San Francisco","Boston","Seattle","Austin","Chicago"],
  UK:         ["London","Manchester","Birmingham","Leeds","Glasgow"],
  Canada:     ["Toronto","Vancouver","Montreal","Calgary"],
  Australia:  ["Sydney","Melbourne","Brisbane","Perth"],
  Germany:    ["Berlin","Munich","Hamburg","Frankfurt"],
  Japan:      ["Tokyo","Osaka","Kyoto","Nagoya"],
  Singapore:  ["Singapore"],
  Malaysia:   ["Kuala Lumpur","Penang","Johor Bahru"],
};

export const BLOOD     = ["A+","A-","B+","B-","AB+","AB-","O+","O-"] as const;
export const GENDERS   = ["Male","Female","Other","Prefer not to say"] as const;
export const INST_TYPES = ["University","College","High School","Other"] as const;
export const BATCHES    = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"] as const;
export const SEMESTERS  = ["1st","2nd","3rd","4th","5th","6th","7th","8th"] as const;
export const ORDINALS   = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"] as const;

export type NavItem = { key: string; label: string; icon: string; href: string };

import type { Role } from "../_types";

export const NAV_STRUCTURE: Record<Role, Record<string, NavItem[]>> = {
  user: {
    Account: [
      { key: "profile",         label: "Profile",          icon: "ti-user",        href: "/dumdum/profile" },
      { key: "social",          label: "Social & contact",  icon: "ti-link",        href: "/dumdum/social" },
      { key: "academic",        label: "Academic",           icon: "ti-school",      href: "/dumdum/academic" },
      { key: "history",         label: "Education history",  icon: "ti-book",        href: "/dumdum/history" },
      { key: "address",         label: "Address",            icon: "ti-map-pin",     href: "/dumdum/address" },
      { key: "change-password", label: "Change password",    icon: "ti-lock",        href: "/dumdum/change-password" },
    ],
  },
  admin: {
    Management: [
      { key: "stats",            label: "Stats",            icon: "ti-chart-bar",   href: "/dumdum/stats" },
      { key: "register-users",   label: "Register users",   icon: "ti-user-plus",   href: "/dumdum/register-users" },
      { key: "user-management",  label: "User management",  icon: "ti-users",       href: "/dumdum/user-management" },
      { key: "data-management",  label: "Data management",  icon: "ti-database",    href: "/dumdum/data-management" },
      { key: "change-password",  label: "Change password",  icon: "ti-lock",        href: "/dumdum/change-password" },
    ],
  },
  superadmin: {
    System: [
      { key: "admin-management", label: "Admin management", icon: "ti-shield-lock", href: "/dumdum/admin-management" },
    ],
    Management: [
      { key: "stats",            label: "Stats",            icon: "ti-chart-bar",   href: "/dumdum/stats" },
      { key: "register-users",   label: "Register users",   icon: "ti-user-plus",   href: "/dumdum/register-users" },
      { key: "user-management",  label: "User management",  icon: "ti-users",       href: "/dumdum/user-management" },
      { key: "data-management",  label: "Data management",  icon: "ti-database",    href: "/dumdum/data-management" },
      { key: "change-password",  label: "Change password",  icon: "ti-lock",        href: "/dumdum/change-password" },
    ],
  },
};

export const CATEGORY_COLORS: Record<string, { label: string; active: string; border: string }> = {
  System:     { label: "text-purple-600", active: "bg-purple-50 text-purple-700 border-purple-500",   border: "border-t border-purple-100" },
  Management: { label: "text-[#02644A]",  active: "bg-[#D1FAE5] text-[#02644A] border-[#02644A]",    border: "border-t border-[#D1FAE5]" },
  Account:    { label: "text-blue-600",   active: "bg-blue-50 text-blue-700 border-blue-500",         border: "border-t border-blue-100" },
};
