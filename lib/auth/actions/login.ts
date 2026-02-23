"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/auth";
import { APIError } from "better-auth";

export async function login(previousState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    await auth.api.signInEmail({
    body: {
      email: username,
      password,
      rememberMe: true,
    },

    headers: await headers(),
  });

  } catch (error) {
    if (error) {
      if (error instanceof APIError && error.statusCode === 401) {
        return {
          message: "Usuario o contraseña incorrectos",
          fieldData: { username },
        };
      }
    }
    return {
      message: "Error inesperado",
      fieldData: { username },
    };
  }


  redirect("/");
}
