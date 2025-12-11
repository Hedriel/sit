"use server";

import { createClient } from "./server";
import { redirectToLogin } from "../utils";

/**
 * Obtiene un cliente de Supabase autenticado y verifica que el usuario esté logueado
 * @throws Redirect to login if user is not authenticated
 * @returns Cliente de Supabase autenticado y los claims del usuario
 */
export async function getAuthenticatedClient() {
  const supabase = await createClient();
  
  // Usar getClaims() es más eficiente que getUser()
  // porque solo valida el JWT sin hacer una llamada a la DB
  const { data, error } = await supabase.auth.getClaims();
  
  if (error || !data?.claims) {
    redirectToLogin();
  }
  
  return {
    supabase,
    user: data.claims,
  };
}
