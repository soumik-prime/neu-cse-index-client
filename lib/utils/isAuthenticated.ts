import { headers } from "next/headers";
import { cache } from "react";
export default cache(async function isAuthenticated() {
  const headerStore = await headers();
  return headerStore.get("x-authenticated") === "true";
});
