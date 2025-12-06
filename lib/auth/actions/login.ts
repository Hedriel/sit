"use server";

import { createClient } from "@/lib/auth/server";
import { redirect } from "next/navigation";

export async function login(previousState: unknown,formData: FormData) {
  const supabase = await createClient();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const { data , error } = await supabase.auth.signInWithPassword({
    email: username,
    password,
  });

  if (error) {
    if(error.code === 'invalid_credentials') {
      return {message: 'Credenciales invalidas', fieldData:{username}};
    }
    return {message: 'Algo salio mal, vuelve a intentar nuevamente', fieldData:{username}};
  } else {
    redirect("/");
  }
}
