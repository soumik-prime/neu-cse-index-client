import { NextRequest, NextResponse } from "next/server";

export function proxy
(request: NextRequest) {
  const accessToken =
    request.cookies.get("accessToken")?.value;

  const sessionToken =
    request.cookies.get("sessionToken")?.value;

  const isAuthenticated =
    !!accessToken && !!sessionToken;

  const headers = new Headers(request.headers);

  headers.set(
    "x-authenticated",
    String(isAuthenticated),
  );

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith(
      "/dashboard",
    );

  if (
    isProtectedRoute &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  return NextResponse.next({
    request: {
      headers,
    },
  });
}