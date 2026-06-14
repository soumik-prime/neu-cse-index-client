export type UserRole = "SUPERADMIN" | "ADMIN" | "USER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  image?: string;
  registrationNo: string;
  batch?: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  registrationNo: string;
  batch: number;
}

export interface RegisterAdminRequest {
  name: string;
  email: string;
  registrationNo: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ReactivateRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: AuthUser;
}
