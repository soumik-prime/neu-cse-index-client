import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/api/auth.api";
import type { AuthUser } from "@/lib/types/auth.interface";

async function getServerCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

export default async function getAuthenticatedUser(): Promise<AuthUser | null> {
  try {
    const cookie = await getServerCookieHeader();
    if (!cookie) return null;
    return await getCurrentUser({ headers: { cookie } });
  } catch {
    return null;
  }
}
