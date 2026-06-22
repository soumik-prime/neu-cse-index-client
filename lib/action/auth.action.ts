"use server";

import { revalidatePath } from "next/cache";
import {
  AuthUser,
  ChangePasswordFormData,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterAdminFormData,
  RegisterUserFormData,
  ResetPasswordFormData,
} from "../types/auth.interface";
import { AuthService } from "../services/auth.service";
import { ActionResult } from "../types/action.interface";
import { executeAction } from "../utils/executeAction";


/**
 * Generic shape returned by every auth action.
 * Keep this consistent so forms / useActionState hooks can rely on it.
 */

/**
 * Wraps a service call, normalizing thrown errors into an ActionResult
 * instead of letting them bubble up as unhandled rejections on the client.
 */


export const registerUserAction = async (
  payload: RegisterUserFormData
): Promise<ActionResult<AuthUser>> => {
  return executeAction(() => AuthService.registerUser(payload), "Failed to register user");
};

export const registerAdminAction = async (
  payload: RegisterAdminFormData
): Promise<ActionResult<AuthUser>> => {
  // NOTE: AuthService.registerAdmin is currently typed as
  // (data: RegisterUserFormData) => ... but registerAdminSchema only has
  // { name, email }. Tighten that param type to RegisterAdminFormData
  // in auth.service.ts to avoid silently allowing/expecting extra fields.
  return executeAction(
    () => AuthService.registerAdmin(payload as unknown as RegisterUserFormData),
    "Failed to register admin"
  );
};


export const loginAction = async (
  payload: LoginFormData
) => {
  const result = await executeAction(() => AuthService.login(payload), "Failed to login");
  if (result.success) {
    revalidatePath("/dashboard", "layout");
  }
  console.log(result);
  return result;
};




export const logoutAction = async (): Promise<ActionResult<boolean>> => {
  const result = await executeAction(() => AuthService.logout(), "Failed to logout");
  if (result.success) {
    revalidatePath("/auth/login", "layout");
  }
  return result;
};

export const changePasswordAction = async (
  payload: ChangePasswordFormData
): Promise<ActionResult<boolean>> => {
  return executeAction(() => AuthService.changePassword(payload), "Failed to change password");
};

export const forgotPasswordAction = async (
  payload: ForgotPasswordFormData
): Promise<ActionResult<boolean>> => {
  return executeAction(() => AuthService.forgotPassword(payload), "Failed to send reset link");
};

export const resetPasswordAction = async (
  payload: ResetPasswordFormData
): Promise<ActionResult<boolean>> => {
  return executeAction(() => AuthService.resetPassword(payload), "Failed to reset password");
};