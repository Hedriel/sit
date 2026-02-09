"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";
import { User } from "@/types";

export async function getUsers() {
  "use cache";
  cacheTag("users");
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("user")
    .select("*")
    .eq("banned", false);

  const users: User[] = (profiles || []).map((profile) => ({
    ...profile,
    fullname: `${profile.first_name || ""} ${profile.last_name || ""}`.trim(),
  }));

  return { users };
}

export async function getUserById(id: string) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("user")
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
