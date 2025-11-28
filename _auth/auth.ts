"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const supabase = await createClient();

export const isLoggedIn = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};

export async function loginOut() {
  const { error } = await supabase.auth.signOut();
  redirect("/sing-in");
}
