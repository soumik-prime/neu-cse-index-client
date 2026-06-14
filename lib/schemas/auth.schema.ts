import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register User Schema
export const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email format"),
  registrationNo: z.string().min(1, "Registration number is required").max(25),
  batch: z.coerce.number().min(1, "Batch must be a positive number"),
});

export type RegisterUserFormData = z.infer<typeof registerUserSchema>;

// Register Admin Schema
export const registerAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email format"),
  registrationNo: z.string().min(1, "Registration number is required").max(25),
});

export type RegisterAdminFormData = z.infer<typeof registerAdminSchema>;

// Change Password Schema
export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Reactivate Account Schema
export const reactivateSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ReactivateFormData = z.infer<typeof reactivateSchema>;

// Auth Response Schema
export const authUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["SUPERADMIN", "ADMIN", "USER"]),
  image: z.string().optional(),
  registrationNo: z.string(),
  batch: z.number().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const authResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: authUserSchema.optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
