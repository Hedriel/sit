"use server"
import { redirect } from "next/navigation";
import { createClient } from "@/lib/auth/server";

export async function getInstruments() {
    const supabase = await createClient();

    const { data: user } = await supabase.auth.getClaims();
    const isLoggedIn = user?.claims

    if(!isLoggedIn){
        redirect("/sign-in");
       
    }

    const { data, error } = await supabase.from("instrument").select();

    return { data, error };
}