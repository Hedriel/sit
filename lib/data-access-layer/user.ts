"use server";
import { getAuthenticatedClient } from "../auth/helper";

export async function getUsers() {
  const { supabase } = await getAuthenticatedClient();

  const { data: users } = await supabase.from("profiles").select("*");

  return { users };
}
