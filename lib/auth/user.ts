import { createClient } from "../supabase/server";

export async function getUserProfile() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data) {
    return null;
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url, role")
    .eq("id", data?.user?.id)
    .single();

  if (error || !user) {
    return null;
  }

  return {
    ...user,
    email: data?.user?.email,
  };
}
