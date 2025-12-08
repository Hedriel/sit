import { createClient } from "@/lib/auth/server";
import { checkAuth } from "../auth/check-session";
import { redirect } from "next/navigation";

export async function getInstruments() {
  const supabase = await createClient();

  const isLoggedIn = await checkAuth();
  !isLoggedIn && redirect("/sign-in");

  const { data, error } = await supabase.from("instrument").select();

  return { data, error };
}
