"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";

interface CreatePatientData {
  first_name: string;
  last_name: string;
  dni: string;
  phone?: string;
  email?: string;
  birth_date?: string;
  doctor_id: string;
}

export async function createPatient(data: CreatePatientData) {
  const supabase = createClient();

  const { data: patient, error } = await supabase
    .from("patient")
    .insert(data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message, patient: null };
  }

  revalidateTag("all-patients", "default");
  revalidateTag("patients", "default");
  return { success: true, patient };
}
