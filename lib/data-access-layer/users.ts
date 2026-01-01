"use server";

import { getAuthenticatedClient } from "../auth/helper";

export async function getUsers() {
  const { supabase } = await getAuthenticatedClient();

  const { data: users } = await supabase.from("profiles").select("*");

  users?.forEach((user) => {
    user.fullname = user.first_name + " " + user.last_name;
  });

  return { users };
}

export async function getUserById(id: string) {
  const { supabase } = await getAuthenticatedClient();

  const { data: user } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  user.fullname = user.first_name + " " + user.last_name;

  return { user };
}
