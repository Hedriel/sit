"use server";

import { createClient } from "@/supabase/clients/anon";
import { revalidatePath } from "next/cache";

export async function deleteUser(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: error.message || "Error al eliminar el usuario",
    };
  }

  revalidatePath("/admin");
  return { success: true };
}
