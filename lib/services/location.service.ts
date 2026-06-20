import { LocationApi } from "../api/location.api";

const getAllLocationGrouped = async () => {
  const result = await LocationApi.getAllLocationGrouped();
  return result.data ?? null;
}

export const LocationService = {
  getAllLocationGrouped,
}