"use server";
import { withAuth } from "@/lib/auth/helpers";

export async function getInstruments() {
  return withAuth(async (supabase) => {
    const { data, error } = await supabase
      .from("instrument")
      .select("id, name, description, created_at")
      .order("created_at", { ascending: false });

    return { data, error };
  });
}
