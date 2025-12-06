"use server";
import { createClient } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export const isLoggedIn = async () => {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};

export async function loginOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  redirect("/sing-in");
}
