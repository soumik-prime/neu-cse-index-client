import status from "http-status";
import { AuthUser, ChangePasswordFormData, ForgotPasswordFormData, LoginFormData, RegisterAdminFormData, RegisterUserFormData, ResetPasswordFormData } from "../types/auth.interface";
import { AuthApi } from "./../api/auth.api";
import { ApiError } from "./../utils/AppError";
import { AuthSchema } from "../schemas/auth.schema";

const registerUser = async (data: RegisterUserFormData): Promise<AuthUser> => {
  const response = AuthSchema.authResponseSchemaWithData.parse(await AuthApi.registerUser(data));
  if(response.success && response.data) return response.data;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to register user"
  );
};


const registerAdmin = async (data: RegisterAdminFormData) => {
  const response = AuthSchema.authResponseSchemaWithData.parse(await AuthApi.registerAdmin(data));
  if(response.success && response.data) return response.data;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to register admin"
  );
};


const login = async (data: LoginFormData) => {
  const response = AuthSchema.authResponseSchemaWithoutData.parse(await AuthApi.login(data));
  if(response.success) return response;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to login"
  );
};


const logout = async () => {
  const response = AuthSchema.authResponseSchemaWithoutData.parse(await AuthApi.logout());
  if(response.success) return true;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to logout"
  );
};


const changePassword = async (data: ChangePasswordFormData) => {
  const response = AuthSchema.authResponseSchemaWithoutData.parse(await AuthApi.changePassword(data));
  if(response.success) return true;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to change password"
  );
};


const forgotPassword = async (data: ForgotPasswordFormData) => {
  const response = AuthSchema.authResponseSchemaWithoutData.parse(await AuthApi.forgotPassword(data));
  if(response.success) return true;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to forgot password"
  );
};


const resetPassword = async (data: ResetPasswordFormData) => {
  const response = AuthSchema.authResponseSchemaWithoutData.parse(await AuthApi.resetPassword(data));
  if(response.success) return true;
  throw new ApiError(
    response.status ?? status.INTERNAL_SERVER_ERROR,
    response.message ?? "Failed to reset password"
  );
};



export const AuthService = {
  registerUser,
  registerAdmin,
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword
}