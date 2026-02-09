"use server";

import { createClient } from "@/supabase/clients/anon";
import { revalidatePath, revalidateTag } from "next/cache";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth/auth";
import { updateTag } from "next/cache";

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
  try {
    await auth.api.createUser({
      body: {
        email,
        password,
        name: `${first_name} ${last_name}`,
        role: role as any,
        data: {
          first_name,
          last_name,
          image: avatar_url,
        }
      },
    });

  } catch (userError) {
    if (userError) {
      let message = "Error al crear el usuario";
      return {
        message,
        fieldData: { email, first_name, last_name, role, password },
      };
    }
  }

  revalidatePath("/admin");
  return { success: true };
}
