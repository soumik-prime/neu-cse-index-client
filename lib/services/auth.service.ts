import {
  registerUser,
  registerAdmin,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  reactivateAccount,
  getCurrentUser,
} from "@/lib/api/auth.api";
import type {
  RegisterUserRequest,
  RegisterAdminRequest,
  LoginRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ReactivateRequest,
  AuthUser,
} from "@/lib/types/auth.interface";
import { ApiError } from "@/lib/utils/ApiError";

/**
 * Auth Service - Handles all authentication operations
 */

/**
 * Register a new user (requires SUPERADMIN or ADMIN role)
 */
export const authService = {
  async registerUser(data: RegisterUserRequest): Promise<AuthUser> {
    try {
      const response = await registerUser(data);
      if (!response.success || !response.data) {
        throw new ApiError(response.message || "Failed to register user", 400);
      }
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Registration failed", 500);
    }
  },

  /**
   * Register a new admin (SUPERADMIN only)
   */
  async registerAdmin(data: RegisterAdminRequest): Promise<AuthUser> {
    try {
      const response = await registerAdmin(data);
      if (!response.success || !response.data) {
        throw new ApiError(response.message || "Failed to register admin", 400);
      }
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Admin registration failed", 500);
    }
  },

  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthUser> {
    try {
      const response = await login(credentials);
      if (!response.success || !response.data) {
        throw new ApiError(response.message || "Invalid credentials", 401);
      }
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Login failed", 500);
    }
  },

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      const response = await logout();
      if (!response.success) {
        throw new ApiError(response.message || "Failed to logout", 400);
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Logout failed", 500);
    }
  },

  /**
   * Change password for authenticated user
   */
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    try {
      const response = await changePassword(data);
      if (!response.success) {
        throw new ApiError(
          response.message || "Failed to change password",
          400,
        );
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Password change failed", 500);
    }
  },

  /**
   * Request password reset (sends OTP to email)
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    try {
      const response = await forgotPassword(data);
      if (!response.success) {
        throw new ApiError(response.message || "Failed to send reset OTP", 400);
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Password reset request failed", 500);
    }
  },

  /**
   * Reset password using OTP
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    try {
      const response = await resetPassword(data);
      if (!response.success) {
        throw new ApiError(response.message || "Failed to reset password", 400);
      }
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Password reset failed", 500);
    }
  },

  /**
   * Reactivate a deactivated account
   */
  async reactivateAccount(data: ReactivateRequest): Promise<AuthUser> {
    try {
      const response = await reactivateAccount(data);
      if (!response.success || !response.data) {
        throw new ApiError(
          response.message || "Failed to reactivate account",
          400,
        );
      }
      return response.data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError("Account reactivation failed", 500);
    }
  },

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      return await getCurrentUser();
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  },
};

export type AuthService = typeof authService;
