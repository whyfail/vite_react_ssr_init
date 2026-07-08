import { cookies, headers } from "next/headers";

export async function getServerRequestContext() {
  const cookieStore = await cookies();
  const headerStore = await headers();

  return {
    token: cookieStore.get("cwa_token")?.value,
    userAgent: headerStore.get("user-agent") || "unknown",
  };
}
