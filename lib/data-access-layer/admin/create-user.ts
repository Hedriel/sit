"use server";

import { createClient } from "@/lib/auth/server";
import { revalidatePath } from "next/cache";

export async function createUser(previousState: unknown, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  console.log(email, first_name, last_name, role, password);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        role,
      },
    },
  });

  console.log("data", data);
  console.log("error", error);
  console.log("previousState", previousState);

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
