import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  const hasToken = !!accessToken || !!sessionToken;

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith("/dashboard");
  const isAuthRoute = pathname.startsWith("/auth");

  if (isProtectedRoute && !hasToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (isAuthRoute && hasToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*"],
};
