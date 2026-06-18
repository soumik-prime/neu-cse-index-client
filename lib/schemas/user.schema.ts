import * as z from 'zod'
import { ApiSchema } from './api.schema';

const roleSchema = z.enum(['SUPERADMIN', 'ADMIN', 'USER']);

const UserDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string(),
  role: roleSchema,
  needPasswordChange: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByUser: z.object({
    id: z.string(),
    name: z.string(),
  }).nullable(),
})

const getUserApiResponseSchema = ApiSchema.apiResponseSchema(UserDetailsSchema);

export const UserSchema = {
  roleSchema,
  UserDetailsSchema,
  getUserApiResponseSchema
}