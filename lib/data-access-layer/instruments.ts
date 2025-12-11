"use server";
import { getAuthenticatedClient } from "@/lib/auth/helpers";

export async function getInstruments() {
  const { supabase } = await getAuthenticatedClient();
  
  const { data, error } = await supabase
    .from("instrument")
    .select("id, name, description, created_at")
    .order("created_at", { ascending: false });

  return { data, error };
}
