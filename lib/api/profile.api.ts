/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./api-Client";

export const getProfiles = async (qureyParams: URLSearchParams, options?: RequestInit) => {
  const response = await apiClient.get<{ data: any}>("/profiles?" + qureyParams, options);
  return response.data;
};
