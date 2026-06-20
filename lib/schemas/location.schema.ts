import * as z from "zod";
import { ApiSchema } from "./api.schema";

const LocationGroupedSchema = z.record(
  z.string(),
  z.object({
    name: z.string(),
    flag: z.string().nullable(),
    cities: z.array(
      z.object({
        id: z.string(),
        city: z.string(),
      })
    ),
  })
);

const getLocationGroupedApiResponseSchema = ApiSchema.apiResponseSchema(LocationGroupedSchema)

export const LocationSchema = {
  LocationGroupedSchema,
  getLocationGroupedApiResponseSchema
};