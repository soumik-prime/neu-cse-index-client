import { TRole } from "../../../lib/types/user.interface";

// export const BLOOD = {
//   "A+": "A_POSITIVE",
//   "A-": "A_NEGATIVE",
//   "B+": "B_POSITIVE",
//   "B-": "B_NEGATIVE",
//   "AB+": "AB_POSITIVE",
//   "AB-": "AB_NEGATIVE",
//   "O+": "O_POSITIVE",
//   "O-": "O_NEGATIVE",
// } as const;

// export const GENDERS = {
//   male: "MALE",
//   female: "FEMALE",
// } as const;

// export const INST_TYPES = {
//   "University": "UNIVERSITY",
//   "College": "COLLEGE",
//   "High School": "HIGH_SCHOOL",
//   "Other": "OTHER",
// } as const;


// export const SEMESTERS = {
//   "1st": "FIRST",
//   "2nd": "SECOND",
//   "3rd": "THIRD",
//   "4th": "FOURTH",
//   "5th": "FIFTH",
//   "6th": "SIXTH",
//   "7th": "SEVENTH",
//   "8th": "EIGHTH",
//   "graduated": "GRADUATED",
// } as const;

export const BLOOD     = ["A+","A-","B+","B-","AB+","AB-","O+","O-"] as const;
export const GENDERS   = ["Male","Female","Other","Prefer not to say"] as const;
export const INST_TYPES = ["University","College","High School","Other"] as const;
export const BATCHES    = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"] as const;
export const SEMESTERS  = ["1st","2nd","3rd","4th","5th","6th","7th","8th"] as const;
export const ORDINALS   = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"] as const;


export type NavItem = {
  key: string;
  label: string;
  icon: string;
  href: string;
};


export const NAV_STRUCTURE: Record<TRole, Record<string, NavItem[]>> = {
  USER: {
    Account: [
      {
        key: "profile",
        label: "Profile",
        icon: "ti-user",
        href: "/dashboard/profile",
      },
      {
        key: "social",
        label: "Social & contact",
        icon: "ti-link",
        href: "/dashboard/social",
      },
      {
        key: "academic",
        label: "Academic",
        icon: "ti-school",
        href: "/dashboard/academic",
      },
      {
        key: "history",
        label: "Education history",
        icon: "ti-book",
        href: "/dashboard/history",
      },
      {
        key: "address",
        label: "Address",
        icon: "ti-map-pin",
        href: "/dashboard/address",
      },
      {
        key: "change-password",
        label: "Change password",
        icon: "ti-lock",
        href: "/dashboard/change-password",
      },
    ],
  },
  ADMIN: {
    Management: [
      {
        key: "stats",
        label: "Stats",
        icon: "ti-chart-bar",
        href: "/dashboard/stats",
      },
      {
        key: "register-users",
        label: "Register users",
        icon: "ti-user-plus",
        href: "/dashboard/register-users",
      },
      {
        key: "user-management",
        label: "User management",
        icon: "ti-users",
        href: "/dashboard/user-management",
      },
      {
        key: "data-management",
        label: "Data management",
        icon: "ti-database",
        href: "/dashboard/data-management",
      },
      {
        key: "change-password",
        label: "Change password",
        icon: "ti-lock",
        href: "/dashboard/change-password",
      },
    ],
  },
  SUPERADMIN: {
    System: [
      {
        key: "admin-management",
        label: "Admin management",
        icon: "ti-shield-lock",
        href: "/dashboard/admin-management",
      },
    ],
    Management: [
      {
        key: "stats",
        label: "Stats",
        icon: "ti-chart-bar",
        href: "/dashboard/stats",
      },
      {
        key: "register-users",
        label: "Register users",
        icon: "ti-user-plus",
        href: "/dashboard/register-users",
      },
      {
        key: "user-management",
        label: "User management",
        icon: "ti-users",
        href: "/dashboard/user-management",
      },
      {
        key: "data-management",
        label: "Data management",
        icon: "ti-database",
        href: "/dashboard/data-management",
      },
      {
        key: "change-password",
        label: "Change password",
        icon: "ti-lock",
        href: "/dashboard/change-password",
      },
    ],
  },
} as const;

export const CATEGORY_COLORS: Record<
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
} as const;

