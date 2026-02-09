"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export async function deleteUser(id: string) {

  const { success } = await auth.api.removeUser({
    body: {
      userId: id
    },
    headers: await headers()
  })

  if (!success) {
    console.error("Error deleting user");
    return {
      success: false,
      message: "Error al eliminar el usuario",
    };
  }



  revalidatePath('/admin');
  return { success: true };
}
