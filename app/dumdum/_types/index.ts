export type Role = "user" | "admin" | "superadmin";

export interface HigherStudyEntry {
  degree: string;
  field: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Profile {
  name: string; reg: string; bio: string; gender: string; blood: string;
  email: string; facebook: string; linkedin: string; github: string; scholar: string; portfolio: string;
  session: string; batch: string; semester: string; gradYear: string;
  ssc: string; hsc: string;
  higherStudy: HigherStudyEntry[];
  presentCity: string; presentCountry: string; permCity: string; permCountry: string;
  photo: string | null;
}

export interface User {
  id: number; name: string; email: string; reg: string;
  session: string; batch: string; semester: string; gradYear: string;
  visible: boolean; photo: string | null;
}

export interface Admin {
  id: number; name: string; email: string;
  role: "admin" | "superadmin"; photo: string | null;
}

export interface Institution {
  id: number; name: string; type: string; website: string; city: string; country: string;
}

export interface Address {
  id: number; city: string; country: string;
}

/** One row in the Academic Data table */
export interface AcademicBatch {
  id: number;
  batch: string;       // "1st", "2nd", …
  semester: string;    // current semester of this batch
  gradYear: string;    // expected graduation year
}

export interface AppData {
  role: Role;
  profile: Profile;
  users: User[];
  admins: Admin[];
  institutions: Institution[];
  addresses: Address[];
  academicBatches: AcademicBatch[];
}
