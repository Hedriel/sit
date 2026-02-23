import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function getUserProfile() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData) {
    return null;
  }

  const user = sessionData.user;

  return {
    ...user,
  };
}
