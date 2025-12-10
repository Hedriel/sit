"use server";
import { createClient } from "@/lib/auth/server";
import { checkAuth } from "../auth/check-session";
import { redirectToLogin } from "../utils";

export async function getUserProfile() {
  const userClaims = await checkAuth();
  !userClaims && redirectToLogin();

  const supabase = await createClient();

  const { data: users } = await supabase.from("profiles").select("*");

  console.log("profile", users);

  return { users };
}
