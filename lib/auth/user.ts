import { createClient } from "@/supabase/clients/server";
import { redirectToLogin } from "../utils";

export async function getUserProfile() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data || !data.user) {
    return redirectToLogin();
  }

  const { data: user, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url, role")
    .eq("id", data.user.id)
    .single();

  if (error || !user) {
    return redirectToLogin();
  }

  return {
    ...user,
    email: data.user.email,
  };
}
