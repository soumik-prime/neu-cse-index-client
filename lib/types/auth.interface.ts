import * as z from "zod";
import { AuthSchema } from "../schemas/auth.schema";

export enum UserRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
}


export type AuthResponseWithData = z.infer<typeof AuthSchema.authResponseSchemaWithData>;
export type AuthResponseWithoutData = z.infer<typeof AuthSchema.authResponseSchemaWithoutData>;
export type AuthUser = z.infer<typeof AuthSchema.authUserSchema>;
export type RegisterUserFormData = z.infer<typeof AuthSchema.registerUserSchema>;
export type RegisterAdminFormData = z.infer<typeof AuthSchema.registerAdminSchema>;
export type ChangePasswordFormData = z.infer<typeof AuthSchema.changePasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof AuthSchema.resetPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof AuthSchema.forgotPasswordSchema>;
export type LoginFormData = z.infer<typeof AuthSchema.loginSchema>;