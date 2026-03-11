"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";

interface CreateConsultationData {
  patient_id: string;
  doctor_id: string;
  diagnosis?: string;
  notes?: string;
}

interface CreateTreatmentData {
  patient_id: string;
  doctor_id: string;
  medication: string;
  dosage: string;
  frequency: string;
  start_date?: string;
  end_date?: string;
  notes?: string;
}

export async function createConsultation(data: CreateConsultationData) {
  const supabase = createClient();

  const { data: consultation, error } = await supabase
    .from("consultation")
    .insert({ ...data, date: new Date().toISOString() })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateTag("consultations", "default");
  return { success: true, consultation };
}

export async function createTreatment(data: CreateTreatmentData) {
  const supabase = createClient();

  const { data: treatment, error } = await supabase
    .from("treatment")
    .insert(data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateTag("treatments", "default");
  return { success: true, treatment };
}
