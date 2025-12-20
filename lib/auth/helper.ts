"use server";

import { createClient } from "./server";
import { redirectToLogin } from "../utils";

export async function getAuthenticatedClient() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirectToLogin();
  }

  return {
    supabase,
    user: data?.claims,
  };
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return {
      user: null,
    };
  }

  return {
    user: data.claims,
  };
}
