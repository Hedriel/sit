"use server";
import { redirect } from "next/navigation";

export async function redirectToLogin() {
  redirect("/sign-in");
}

export async function redirectToHome() {
  redirect("/");
}
