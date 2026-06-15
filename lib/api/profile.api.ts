/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "./api-Client";
import type { Profile } from "@/lib/types/profile.interface";

const getProfiles = async (qureyParams: URLSearchParams, options?: RequestInit) => {
  const response = await apiClient.get<{ data: any}>("/profiles?" + qureyParams, options);
  return response.data;
};

const getCurrentUserProfile = async (options?: RequestInit) => {
  const response = await apiClient.get<{ data: Profile }>("/profiles/current-user-profile", options);
  return response.data;
};

const updateCurrentUserProfile = async (payload: Partial<Profile>, options?: RequestInit) => {
  const response = await apiClient.put<{ success: boolean; message?: string; data?: Profile }>(
    "/profiles/update-current-user-profile",
    payload,
    options,
  );
  return response;
};

const changeProfileVisibility = async (
  id: string,
  visibility: boolean,
  options?: RequestInit,
) => {
  const response = await apiClient.put<{ success: boolean; message?: string }>(
    `/profiles/change-visibility/${id}`,
    { visibility },
    options,
  );
  return response;
};


export const ProfileApi = {
  getProfiles,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  changeProfileVisibility,
};