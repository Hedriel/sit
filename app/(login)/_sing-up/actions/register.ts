"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const supabase = await createClient();
  const username = formData.get("username");
  const password = formData.get("password");

  const { data, error } = await supabase.auth.signUp({
    email: username as string,
    password: password as string,
  });

  if (error) {
    console.log(error);
  } else {
    redirect("/sing-in");
  }
}
