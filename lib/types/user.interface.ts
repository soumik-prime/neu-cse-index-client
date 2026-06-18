import * as z from "zod"
import { UserSchema } from "../schemas/user.schema"
export type TRole = z.infer<typeof UserSchema.roleSchema>
export type TUser = z.infer<typeof UserSchema.UserDetailsSchema>
export type TUserApiResponse = z.infer<typeof UserSchema.getUserApiResponseSchema>