"use server";
import { getAuthenticatedClient } from "@/lib/auth/helpers";

export async function getUserProfile() {
  const { supabase } = await getAuthenticatedClient();
  
  const { data: users } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, role, created_at")
    .order("created_at", { ascending: false });

  return { users };
}
