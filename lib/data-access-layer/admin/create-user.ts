"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createUser(previousState: unknown, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: {
      first_name,
      last_name,
      role,
    },
  });

  if (error) {
    let message;
    if (error.code === "invalid_credentials") {
      message = "Credenciales invalidas";
    }
    if (error.code === "email_address_invalid") {
      message = "Email invalido";
    }
    return {
      message,
      fieldData: { email, first_name, last_name, role, password },
    };
  } else {
    revalidatePath("/admin");
    return { success: true };
  }
}
