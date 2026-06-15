export interface Profile {
  id?: string;
  userId: string;
  name: string;
  photo?: string;
  batch: number;
  session?: string;
  bio?: string;
  gender?: string;
  bloodGroup?: string;
  semester?: string;
  graduationYear?: number;
  publicEmail?: string;
  facebook?: string;
  github?: string;
  linkedin?: string;
  googleScholar?: string;
  portfolio?: string;
  city?: string;
  country?: string;
  visible?: boolean;
  visibility?: boolean;
  isVisible?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface ProfileResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  data:
  Profile[];
}