"use server"
import { createClient } from "./server";
export async function CheckAuth(){
    const supabase = await createClient();
    const { data: user } = await supabase.auth.getClaims();
    const isLoggedIn = user?.claims

  return isLoggedIn
}