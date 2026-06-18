import * as z from "zod";
import { ApiSchema } from "./api.schema";

const UserRole = z.enum([
  "superadmin",
  "admin",
  "user",
]);

// Login Schema
const loginSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Register User Schema
const registerUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email format"),
  registrationNo: z.string().min(1, "Registration number is required").max(25),
  batch: z.coerce.number().min(1, "Batch must be a positive number"),
});

// Register Admin Schema
const registerAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.email("Invalid email format"),
  registrationNo: z.string().min(1, "Registration number is required").max(25),
});

// Change Password Schema
const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, "Current password must be at least 8 characters"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

// Forgot Password Schema
const forgotPasswordSchema = z.object({
  email: z.email("Invalid email format").min(1, "Email is required"),
});

// Reset Password Schema
const resetPasswordSchema = z.object({
  email: z.email("Invalid email format"),
  otp: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

// Auth Response Schema
// NOTE: Need to change in Backend too, deleted change to locked and it is optional for now
const authUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  role: UserRole,
  image: z.url(),
  needPasswordChange: z.boolean(),
  isLocked: z.boolean().optional(),
  LockedAt: z.string().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const authResponseSchemaWithData = ApiSchema.apiResponseSchema(authUserSchema);
const authResponseSchemaWithoutData = ApiSchema.baseApiResponseSchema;

export const AuthSchema = {
  UserRole,
  loginSchema,
  registerUserSchema,
  registerAdminSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  authResponseSchemaWithData,
  authResponseSchemaWithoutData,
  authUserSchema,
};
