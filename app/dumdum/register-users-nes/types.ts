export type Gender = "MALE" | "FEMALE";

export interface StudentDraft {
  id: string; // temp id for UI tracking
  name: string;
  email: string;
  registrationNo: string;
  gender: Gender | "";
  photo: string | null; // base64 from crop
  photoContentType: "jpeg" | "jpg" | "png" | "webp" | null;
}

export type RegistrationStatus =
  | "idle"
  | "creating"
  | "uploading"
  | "patching"
  | "success"
  | "partial" // account created but image failed
  | "failed";

export interface RegistrationResult {
  draft: StudentDraft;
  status: RegistrationStatus;
  userId?: string;
  error?: string;
  imageError?: string;
}

export interface BatchConfig {
  session: string;
  batch: number;
  count: number;
}
