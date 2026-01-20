"use server";
import { createClient } from "../../../supabase/clients/anon";
import { User } from "@/types";

export async function getUsers() {
  "use cache";
  const supabase = await createClient();

  const { data: profiles } = await supabase.from("profiles").select("*");

  const users: User[] = (profiles || []).map((profile) => ({
    ...profile,
    fullname: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
  }));

  return { users };
}

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (!profile) {
    return { user: null };
  }

  const user: User = {
    ...profile,
    fullname: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
  };

  return { user };
}
