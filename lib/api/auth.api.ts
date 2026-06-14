/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./api-Client";
import type {
  RegisterUserRequest,
  RegisterAdminRequest,
  LoginRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ReactivateRequest,
  AuthResponse,
  LoginResponse,
  AuthUser,
} from "@/lib/types/auth.interface";

/**
 * Register a new USER account
 * Auth: SUPERADMIN or ADMIN required
 */
export const registerUser = async (
  payload: RegisterUserRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register",
    payload,
    options,
  );
  return response;
};

/**
 * Register a new ADMIN account
 * Auth: SUPERADMIN only required
 */
export const registerAdmin = async (
  payload: RegisterAdminRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/register/admin",
    payload,
    options,
  );
  return response;
};

/**
 * Login with email and password
 * Issues a session cookie
 */
export const login = async (
  payload: LoginRequest,
  options?: RequestInit,
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    payload,
    options,
  );
  return response;
};

/**
 * Logout the current user
 * Invalidates the session
 */
export const logout = async (options?: RequestInit): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/logout",
    undefined,
    options,
  );
  return response;
};

/**
 * Change password while logged in
 */
export const changePassword = async (
  payload: ChangePasswordRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/change-password",
    payload,
    options,
  );
  return response;
};

/**
 * Request password reset OTP
 * Sends OTP to the provided email
 */
export const forgotPassword = async (
  payload: ForgotPasswordRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/forgot-password",
    payload,
    options,
  );
  return response;
};

/**
 * Reset password using OTP
 */
export const resetPassword = async (
  payload: ResetPasswordRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/reset-password",
    payload,
    options,
  );
  return response;
};

/**
 * Reactivate a previously deactivated account
 */
export const reactivateAccount = async (
  payload: ReactivateRequest,
  options?: RequestInit,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/reactivate",
    payload,
    options,
  );
  return response;
};

/**
 * Get current authenticated user's info
 */
export const getCurrentUser = async (
  options?: RequestInit,
): Promise<AuthUser | null> => {
  try {
    const response = await apiClient.get<{ data: AuthUser }>(
      "/users/me",
      options,
    );
    return response.data || null;
  } catch {
    return null;
  }
};
