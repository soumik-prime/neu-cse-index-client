"use client";

import { useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import type { Role, Profile, User, Admin, Institution, Address, AcademicBatch, AppData } from "../_types";
import { NAV_STRUCTURE } from "../_data/constants";

/* ── Context shape ── */
export interface AppState {
  role: Role; setRole: (r: Role) => void;
  profile: Profile; setProfile: (p: Profile | ((prev: Profile) => Profile)) => void;
  users: User[]; setUsers: (u: User[] | ((prev: User[]) => User[])) => void;
  admins: Admin[]; setAdmins: (a: Admin[] | ((prev: Admin[]) => Admin[])) => void;
  institutions: Institution[]; setInstitutions: (i: Institution[] | ((prev: Institution[]) => Institution[])) => void;
  addresses: Address[]; setAddresses: (a: Address[] | ((prev: Address[]) => Address[])) => void;
  academicBatches: AcademicBatch[]; setAcademicBatches: (b: AcademicBatch[] | ((prev: AcademicBatch[]) => AcademicBatch[])) => void;
}

export const AppContext = createContext<AppState>({} as AppState);
export function useApp() { return useContext(AppContext); }

export default function AppProvider({ data, children }: { data: AppData; children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(data.role);
  const [profile, setProfile] = useState<Profile>(data.profile);
  const [users, setUsers] = useState<User[]>(data.users);
  const [admins, setAdmins] = useState<Admin[]>(data.admins);
  const [institutions, setInstitutions] = useState<Institution[]>(data.institutions);
  const [addresses, setAddresses] = useState<Address[]>(data.addresses);
  const [academicBatches, setAcademicBatches] = useState<AcademicBatch[]>(data.academicBatches);
  const router = useRouter();

  function setRole(r: Role) {
    setRoleState(r);
    router.push(Object.values(NAV_STRUCTURE[r]).flat()[0].href);
  }

  return (
    <AppContext.Provider value={{
      role, setRole, profile, setProfile,
      users, setUsers, admins, setAdmins,
      institutions, setInstitutions, addresses, setAddresses,
      academicBatches, setAcademicBatches,
    }}>
      {children}
    </AppContext.Provider>
  );
}
