"use server";
import { redirect } from "next/navigation";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

export async function logout() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/sing-in");
}
