import * as z from "zod";
import { ApiError } from "./AppError";

const backendUrl = () => {
  const url = z.url().parse(process.env.BACKEND_URL);
  if (!url) throw new ApiError(500, "NEXT_PUBLIC_BACKEND_URL is not defined or invalid");
  else return url;
}

const request = async<T>(path: string, options?: RequestInit): Promise<T> => {
  const apiBase = new URL("/api/v1/", backendUrl());
  const url = new URL(path.replace(/^\/+/, ""), apiBase).toString();
  const response = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!response.ok) {
    throw new ApiError(response.status, `Request failed with status ${response.status}`);
  }
  const status = response.status;
  const data = await response.json() as Promise<T>;;
  return {
    status,
    ...data
  };
}

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) => request<T>(path, { method: "GET", ...options }),
  post: <T, TBody>(path: string, body: TBody, options?: RequestInit) => request<T>(path, { method: "POST", body: JSON.stringify(body), ...options }),
  put: <T, TBody>(path: string, body: TBody, options?: RequestInit) => request<T>(path, { method: "PUT", body: JSON.stringify(body), ...options }),
  patch: <T, TBody>(path: string, body: TBody, options?: RequestInit) => request<T>(path, { method: "PATCH", body: JSON.stringify(body), ...options }),
  delete: <T>(path: string, options?: RequestInit) => request<T>(path, { method: "DELETE", ...options }),
};