import { AuthResponseWithData, AuthResponseWithoutData, ChangePasswordFormData, ForgotPasswordFormData, LoginFormData, RegisterAdminFormData, RegisterUserFormData, ResetPasswordFormData } from "../types/auth.interface";
import { apiClient } from "../utils/api-Client";

const registerUser = async (
	payload: RegisterUserFormData,
) => {
	return await apiClient.post<AuthResponseWithData, RegisterUserFormData>(
		'/auth/register',
		payload,
		{
			cache: "no-store",
		}
	);
};


const registerAdmin = async (
	payload: RegisterAdminFormData,
) => {
	return await apiClient.post<AuthResponseWithData, RegisterAdminFormData>(
		'/auth/register/admin',
		payload,
		{
			cache: "no-store",
		}
	)
};


const login = async (
	payload: LoginFormData,
) => {
	return await apiClient.post<AuthResponseWithData, LoginFormData>(
		'/auth/login',
		payload,
		{
			cache: "no-store",
		}
	)
};



const logout = async () => {
	return await apiClient.post<AuthResponseWithoutData, undefined>(
		'/auth/logout',
		undefined,
		{
			cache: "no-store"
		}
	);
};


const changePassword = async (
	payload: ChangePasswordFormData
) => {
	return await apiClient.post<AuthResponseWithoutData, ChangePasswordFormData>(
		'/auth/change-password',
		payload,
		{
			cache: "no-store"
		}
	)
};


const forgotPassword = async (payload: ForgotPasswordFormData) => {
	return await apiClient.post<AuthResponseWithoutData, ForgotPasswordFormData>(
		'/auth/forgot-password',
		payload,
		{
			cache: "no-store"
		}
	)
};


const resetPassword = async (payload: ResetPasswordFormData) => {
	return await apiClient.post<AuthResponseWithoutData, ResetPasswordFormData>(
		'/auth/reset-password',
		payload,
		{
			cache: "no-store"
		}
	)
};


// export const reactivateAccount = async () => { };

export const AuthApi = {
	registerUser,
	registerAdmin,
	login,
	logout,
	changePassword,
	forgotPassword,
	resetPassword
}