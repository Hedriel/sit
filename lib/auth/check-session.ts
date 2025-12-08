"use server";
import { createClient } from "./server";
export async function checkAuth() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getClaims();
  const isLoggedIn = user?.claims;

  return isLoggedIn;
}
