import {
  ChangePasswordFormData,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterAdminFormData,
  RegisterUserFormData,
  ResetPasswordFormData,
} from "../types/auth.interface";
import { AuthApi } from "./../api/auth.api";
import { AuthSchema } from "../schemas/auth.schema";

const registerUser = async (data: RegisterUserFormData) => {
  return AuthSchema.authResponseSchemaWithData.parse(
    await AuthApi.registerUser(data),
  );
};

const registerAdmin = async (data: RegisterAdminFormData) => {
  return AuthSchema.authResponseSchemaWithData.parse(
    await AuthApi.registerAdmin(data),
  );
};

const login = async (data: LoginFormData) => {
  return AuthSchema.authResponseSchemaWithoutData.parse(
    await AuthApi.login(data),
  );
};

const logout = async () => {
  return AuthSchema.authResponseSchemaWithoutData.parse(
    await AuthApi.logout(),
  );
};

const changePassword = async (data: ChangePasswordFormData) => {
  return AuthSchema.authResponseSchemaWithoutData.parse(
    await AuthApi.changePassword(data),
  );
};

const forgotPassword = async (data: ForgotPasswordFormData) => {
  return AuthSchema.authResponseSchemaWithoutData.parse(
    await AuthApi.forgotPassword(data),
  );
};

const resetPassword = async (data: ResetPasswordFormData) => {
  return AuthSchema.authResponseSchemaWithoutData.parse(
    await AuthApi.resetPassword(data),
  );
};

export const AuthService = {
  registerUser,
  registerAdmin,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
