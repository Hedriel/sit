"use server";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/clients/server";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/sing-in");
}
