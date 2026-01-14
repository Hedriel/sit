"use server";
import { createClient } from "../supabase/anon";

export async function getInstruments() {
  "use cache";
  const supabase = await createClient();

  const { data, error } = await supabase.from("instrument").select();

  return { data, error };
}
