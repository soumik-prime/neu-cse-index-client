"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { AuthService } from "../services/auth.service";
import {
  ChangePasswordFormData,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterAdminFormData,
  RegisterUserFormData,
  ResetPasswordFormData,
} from "../types/auth.interface";
import { executeAction } from "../utils/executeAction";

export const registerUserAction = async (payload: RegisterUserFormData) => {
  return executeAction(
    () => AuthService.registerUser(payload),
    "Failed to register user"
  );
};

export const registerAdminAction = async (payload: RegisterAdminFormData) => {
  return executeAction(
    () => AuthService.registerAdmin(payload),
    "Failed to register admin"
  );
};

export const loginAction = async (payload: LoginFormData) => {
  const result = await executeAction(
    () => AuthService.login(payload),
    "Failed to login"
  );
  if (result.success) {
    revalidatePath("/dashboard", "layout");
  }
  return result;
};

export const logoutAction = async () => {
  const result = await executeAction(
    () => AuthService.logout(),
    "Failed to logout"
  );
  return result;
};

export const changePasswordAction = async (payload: ChangePasswordFormData) => {
  return executeAction(
    () => AuthService.changePassword(payload),
    "Failed to change password"
  );
};

export const forgotPasswordAction = async (payload: ForgotPasswordFormData) => {
  const result = await executeAction(
    () => AuthService.forgotPassword(payload),
    "Failed to send OTP"
  );
  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("fp_email", payload.email, {
      httpOnly: true,
      path: "/",
      maxAge: 10 * 60,
      sameSite: "lax",
    });
    cookieStore.delete("fp_verified");
  }
  return result;
};

export const resetPasswordAction = async (payload: ResetPasswordFormData) => {
  const result = await executeAction(
    () => AuthService.resetPassword(payload),
    "Failed to reset password"
  );

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.delete("fp_email");
    cookieStore.delete("fp_verified");
  }

  return result;
};
