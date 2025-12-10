"use server";
import { createClient } from "@/lib/auth/server";
import { redirectToLogin } from "../utils";

export async function getUserProfile() {
  const supabase = await createClient();

  // Verificar autenticación con el mismo cliente
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirectToLogin();
  }

  const { data: users } = await supabase.from("profiles").select("*");

  return { users };
}
