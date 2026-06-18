import { TUserApiResponse } from "../types/user.interface";
import { apiClient } from "../utils/api-Client";

const getOwnUserDetails = async () => {
  return await apiClient.get<TUserApiResponse>(`/users/me`, {
    cache: "no-store",
  });
};

export const UserApi = {
  getOwnUserDetails,
};
