import * as z from "zod";
import { cookies } from "next/headers";
import { parse } from "set-cookie-parser";

const backendUrl = (() => {
  let cached: string | null = null;
  return () => {
    if (cached) return cached;
    cached = z.url().parse(process.env.BACKEND_URL);
    return cached;
  };
})();

// Authentication Token Forwarding
async function forwardIncomingCookies(headers: Headers) {
  const cookieStore = await cookies();

  const cookieNames = [
    "better-auth.session_token",
    "accessToken",
  ];

  const cookieHeader = cookieNames
    .map((name) => cookieStore.get(name))
    .filter((cookie): cookie is NonNullable<typeof cookie> => !!cookie)
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }
}

async function forwardSetCookies(response: Response) {
  const raw = response.headers.get("set-cookie");
  if (!raw) return;

  const cookieStore = await cookies();
  const parsed = parse(raw);

  for (const cookie of parsed) {
    cookieStore.set(cookie.name, cookie.value, {
      path: cookie.path,
      domain: cookie.domain,
      maxAge: cookie.maxAge,
      expires: cookie.expires,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
    });
  }
}

export type ApiResponse<T> = T & { status: number };

const request = async <T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  const apiBase = new URL("/api/v1/", backendUrl());
  const url = new URL(path.replace(/^\/+/, ""), apiBase).toString();

  const headers = new Headers(options?.headers);
  await forwardIncomingCookies(headers);
  const response = await fetch(url, { ...options, headers });
  await forwardSetCookies(response);

  const data = (await response.json()) as T;
  return { ...data, status: response.status };
};

const withJson = (options?: RequestInit): RequestInit => ({
  ...options,
  headers: new Headers({ "Content-Type": "application/json", ...options?.headers }),
});

export const apiClient = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: "GET", ...options }),

  post: <T, TBody>(path: string, body: TBody, options?: RequestInit) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body), ...withJson(options) }),

  put: <T, TBody>(path: string, body: TBody, options?: RequestInit) =>
    request<T>(path, { method: "PUT", body: JSON.stringify(body), ...withJson(options) }),

  patch: <T, TBody>(path: string, body: TBody, options?: RequestInit) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body), ...withJson(options) }),

  delete: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: "DELETE", ...options }),
};