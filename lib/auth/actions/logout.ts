"use server";
import { redirect } from "next/navigation";
import { createClient } from "../server";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Error al cerrar sesión:", error);
  }
  
  redirect("/sign-in");
}
