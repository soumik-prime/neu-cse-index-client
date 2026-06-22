import * as z from "zod";

const baseApiResponseSchema = z.object({
  status: z.coerce.number(),
  success: z.boolean(),
  needPasswordChange: z.boolean().optional(),
  message: z.string().optional(),
});

const apiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  baseApiResponseSchema.extend({
    data: dataSchema.optional(),
  });

const paginationMeta = z.object({
  total: z.coerce.number(),
  page: z.coerce.number(),
  limit: z.coerce.number(),
  totalPages: z.coerce.number(),
});

const apiResponseWithPaginationSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) => {
  baseApiResponseSchema.extend({
    meta: paginationMeta.optional(),
    data: z.array(dataSchema).optional(),
  });
};

export const ApiSchema = {
  baseApiResponseSchema,
  apiResponseSchema,
  apiResponseWithPaginationSchema,
};
