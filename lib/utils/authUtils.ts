import { authService } from "@/lib/services/auth.service";
import type { AuthUser } from "@/lib/types/auth.interface";

/**
 * Check if user is authenticated
 * Server-side utility
 */
export async function getAuthenticatedUser(): Promise<AuthUser | null> {
  try {
    return await authService.getCurrentUser();
  } catch {
    return null;
  }
}

/**
 * Check if user has a specific role
 */
export async function hasRole(
  requiredRole: string | string[],
): Promise<boolean> {
  try {
    const user = await authService.getCurrentUser();
    if (!user) return false;

    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }

    return user.role === requiredRole;
  } catch {
    return false;
  }
}

/**
 * Check if user is ADMIN or SUPERADMIN
 */
export async function isAdmin(): Promise<boolean> {
  return hasRole(["ADMIN", "SUPERADMIN"]);
}

/**
 * Check if user is SUPERADMIN
 */
export async function isSuperAdmin(): Promise<boolean> {
  return hasRole("SUPERADMIN");
}
