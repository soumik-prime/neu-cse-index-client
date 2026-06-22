import { LocationApi } from "../api/location.api";
import { LocationSchema } from "../schemas/location.schema";

const getAllLocationGrouped = async () => {
  return LocationSchema.getLocationGroupedApiResponseSchema.parse(
    await LocationApi.getAllLocationGrouped()
  );
}

export const LocationService = {
  getAllLocationGrouped,
}
