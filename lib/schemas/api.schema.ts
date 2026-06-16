import * as z from "zod";

export const baseApiResponseSchema = z.object({
  status: z.coerce.number(),
  success: z.boolean(),
  message: z.string().optional(),
});

export const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  baseApiResponseSchema.extend({
    data: dataSchema.optional(),
  });

export const ApiSchema = {
  baseApiResponseSchema,
  apiResponseSchema,
};
