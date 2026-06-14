/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./api-Client";


export const getMyUserInfo = async (qureyParams: URLSearchParams, options?: RequestInit) => {
  const response = await apiClient.get<{ data: any}>("/users/me", options);
  return response.data;
};