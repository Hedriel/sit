import { redirect } from "next/navigation";

export function redirectToLogin() {
  redirect("/sign-in");
}

export function redirectToHome() {
  redirect("/");
}
