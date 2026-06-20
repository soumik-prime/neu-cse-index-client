import * as z from "zod";
import { LocationSchema } from "../schemas/location.schema";


export type TLocationGrouped = z.infer<typeof LocationSchema.LocationGroupedSchema>;
export type TLocationGroupedApiResponse = z.infer<typeof LocationSchema.getLocationGroupedApiResponseSchema>;