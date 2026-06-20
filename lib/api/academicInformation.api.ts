import { TAcademicBatchListApiResponse } from "../types/academicInformation.interface";
import { apiClient } from "../utils/api-Client";

const getBatchList = async () => {
  return await apiClient.get<TAcademicBatchListApiResponse>(`/academicinformation/batchlist`, {
    next: {
      revalidate: 60 * 60 * 24 * 7,
      tags: ["academicBatchList"],
    },
  });
};

export const AcademicInformationApi = {
  getBatchList,
};