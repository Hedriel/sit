"use server";

import { createClient } from "@/supabase/clients/anon";
import { revalidatePath, updateTag } from "next/cache";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function editUser(previousState: unknown, formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
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
  }

  try {
    await auth.api.adminUpdateUser({
      body: {
        userId: id,
        data: {
          email,
          name: `${first_name} ${last_name}`,
          first_name,
          last_name,
          role,
          ...(avatar_url && { image: avatar_url }),
        },
      },
      headers: await headers()
    });

    if (password) {
      await auth.api.setUserPassword({
        body: {
          userId: id,
          newPassword: password,
        },
        headers: await headers()
      });
    }

  } catch (userError: any) {
    console.log(userError)
    let message = "Error al editar el usuario";

    if (userError?.message?.includes("duplicate key")) {
      message = "El correo ya está registrado";
    } else if (userError?.message?.includes("Password")) {
      message = "La contraseña es demasiado débil";
    }

    return {
      message,
      fieldData: { email, first_name, last_name, role },
    };
  }

  updateTag('admin-users');
  revalidatePath("/admin");
  return { success: true };
}
