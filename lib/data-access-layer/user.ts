"use server";
import { withAuth } from "@/lib/auth/helpers";

export async function getUserProfile() {
  return withAuth(async (supabase) => {
    const { data: users } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, role, created_at")
      .order("created_at", { ascending: false });

    return { users };
  });
}
