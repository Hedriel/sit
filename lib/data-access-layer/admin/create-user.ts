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

  if (error) {
    if (error.code === "invalid_credentials") {
      return {
        message: "Credenciales invalidas",
        fieldData: { email, first_name, last_name, role, password },
      };
    }
    return {
      message: "Algo salio mal, vuelve a intentar nuevamente",
      fieldData: { email },
    };
  } else {
    revalidatePath("/admin");
  }
}
