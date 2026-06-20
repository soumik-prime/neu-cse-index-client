import { TLocationGroupedApiResponse } from "../types/location.interface";
import { apiClient } from "../utils/api-Client";

const getAllLocationGrouped = async () => {
  return await apiClient.get<TLocationGroupedApiResponse>(`/locations`, {
    next: {
      revalidate: 60 * 60 * 24,
      tags: ["locations"],
    },
  });
};

export const LocationApi = {
  getAllLocationGrouped,
};
