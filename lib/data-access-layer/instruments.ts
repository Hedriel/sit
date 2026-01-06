import { createClient } from "../supabase/server";

export async function getInstruments() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("instrument").select();

  return { data, error };
}
