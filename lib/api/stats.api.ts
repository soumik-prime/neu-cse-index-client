/* eslint-disable @typescript-eslint/no-explicit-any */

import { apiClient } from "./api-Client";


export const getStats = async (qureyParams: string, options?: RequestInit) => {
  const response = await apiClient.get<any>("/statistics?" + qureyParams, options);
  return response;
};