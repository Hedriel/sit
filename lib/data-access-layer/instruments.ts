import { getAuthenticatedClient } from "../auth/helper";

export async function getInstruments() {
  const { supabase } = await getAuthenticatedClient();

  const { data, error } = await supabase.from("instrument").select();

  return { data, error };
}
