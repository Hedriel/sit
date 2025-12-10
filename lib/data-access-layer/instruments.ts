import { createClient } from "@/lib/auth/server";
import { checkAuth } from "../auth/check-session";
import { redirectToLogin } from "../utils";

export async function getInstruments() {
  const supabase = await createClient();

  const isLoggedIn = await checkAuth();
  !isLoggedIn && redirectToLogin();

  const { data, error } = await supabase.from("instrument").select();

  return { data, error };
}
