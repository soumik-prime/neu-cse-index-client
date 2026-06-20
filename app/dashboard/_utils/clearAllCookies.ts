export function clearAuthCookies() {
  document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "better-auth.session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}