"use server";

import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function login(previousState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const data = await auth.api.signInEmail({
    body: {
      email: username,
      password,
      rememberMe: true,
    },

    headers: await headers(),
  });


  if (!data.user) {
    return {
      message: "Credenciales invalidas",
      fieldData: { username },
    };
  }

  if (data.user.userMetadata?.role !== "admin") {
    return {
      message: "No tienes permisos para iniciar sesion",
      fieldData: { username },
    };
  }

  redirect("/");
}
