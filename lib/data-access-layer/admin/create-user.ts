"use server";

import { getAuthenticatedClient } from "@/lib/auth/helpers";
import { revalidatePath } from "next/cache";

export async function createUser(previousState: unknown, formData: FormData) {
  // Verificar que el usuario esté autenticado antes de permitir crear usuarios
  const { supabase, user } = await getAuthenticatedClient();

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
    console.error("Error al crear usuario:", error);
    
    if (error.code === "invalid_credentials") {
      return {
        success: false,
        message: "Credenciales inválidas",
        fieldData: { email, first_name, last_name, role },
      };
    }
    
    if (error.code === "user_already_exists") {
      return {
        success: false,
        message: "El email ya está registrado",
        fieldData: { email, first_name, last_name, role },
      };
    }
    
    return {
      success: false,
      message: "Algo salió mal, vuelve a intentar nuevamente",
      fieldData: { email, first_name, last_name, role },
    };
  }

  revalidatePath("/admin");
  
  return {
    success: true,
    message: "Usuario creado exitosamente",
    data: data.user,
  };
}
