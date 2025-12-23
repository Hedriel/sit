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

export async function getSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return {
      session: null,
    };
  }

  return {
    session: data.claims,
  };
}

export async function getUserProfile() {
  const { session } = await getSession();

  if (!session) {
    return null;
  }

  const userId = session?.sub;

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, avatar_url")
    .eq("id", userId)
    .single();

  if (error || !user) {
    return null;
  }

  return {
    ...user,
    email: session?.email,
  };
}
