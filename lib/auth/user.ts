import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function getUserProfile() {
  const sessionData = await auth.api.getSession({
    headers: await headers()
  })


  if (!sessionData) {
    return null;
  }

  const user = sessionData.user.userMetadata;

  return {
    ...user,
    email: sessionData.user.email,
  };
}
