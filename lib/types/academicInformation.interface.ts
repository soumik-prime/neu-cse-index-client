import * as z from "zod";
import { AcademicInformationSchema } from "../schemas/academicInformation.schema";

export type TAcademicBatchList = z.infer<typeof AcademicInformationSchema.academicBatchListSchema>;
export type TAcademicBatchListApiResponse = z.infer<
  typeof AcademicInformationSchema.academicBatchListApiResponseSchema
>;