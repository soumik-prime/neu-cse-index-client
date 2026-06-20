import * as z from "zod";
import { ApiSchema } from "./api.schema";

const academicBatchListSchema = z.array(z.coerce.number());
const academicBatchListApiResponseSchema = ApiSchema.apiResponseSchema(academicBatchListSchema);

export const AcademicInformationSchema = {
  academicBatchListSchema,
  academicBatchListApiResponseSchema
};