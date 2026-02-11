"use server";

import { createClient } from "@/supabase/clients/anon";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth";

export async function editUser(previousState: unknown, formData: FormData) {
  const supabase = await createClient();

  const id = formData.get("id") as string;
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;
  const avatarFile = formData.get("avatar") as File | null;

  let image: string | null = null;

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

    image = urlData.publicUrl;
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
          ...(image && { image }),
        },
      },
      headers: await headers(),
    });

    if (password) {
      await auth.api.setUserPassword({
        body: {
          userId: id,
          newPassword: password,
        },
        headers: await headers(),
      });
    }
  } catch (userError) {
    if (userError instanceof APIError) {
      return {
        message: userError.message,
        fieldData: { email, first_name, last_name, role },
      };
    }
  }

  revalidatePath("/admin");
  return { success: true };
}
