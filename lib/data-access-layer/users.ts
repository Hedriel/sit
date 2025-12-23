"use server";
import { getAuthenticatedClient } from "../auth/helper";

export async function getUsers() {
  const { supabase } = await getAuthenticatedClient();

  const { data: users } = await supabase.from("profiles").select("*");

  return { users };
}

export async function getUserById(id: string) {
  const { supabase } = await getAuthenticatedClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  return { user };
}
