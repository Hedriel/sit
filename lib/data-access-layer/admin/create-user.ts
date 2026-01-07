"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function createUser(previousState: unknown, formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;
  const avatarFile = formData.get("avatar") as File | null;

  let avatar_url: string | null = null;

  // Subida del avatar
  if (avatarFile && avatarFile.size > 0) {
    const fileExt = avatarFile.name.split(".").pop();
    const fileName = `${randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, avatarFile, { upsert: false });

    if (uploadError) {
      console.log(uploadError);
      return {
        message: "Error al subir la imagen de perfil",
        fieldData: { email, first_name, last_name, role, password },
      };
    }

    const { data: urlData } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(fileName);

    avatar_url = urlData.publicUrl;

    console.log(avatar_url);
  }

  // Creación del usuario
  const { error: userError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name,
      last_name,
      role,
      avatar_url,
    },
  });

  if (userError) {
    let message = "Error al crear el usuario";

    if (userError.message.includes("duplicate key")) {
      message = "El correo ya está registrado";
    } else if (userError.message.includes("Password")) {
      message = "La contraseña es demasiado débil";
    }
    // Podés agregar más casos según errores comunes de Supabase

    return {
      message,
      fieldData: { email, first_name, last_name, role, password },
    };
  }

  revalidatePath("/admin");
  return { success: true };
}
