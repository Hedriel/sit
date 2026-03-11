"use server";

import { revalidateTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";

interface CreateAppointmentData {
  patient_id: string;
  doctor_id: string;
  title: string;
  start_time: string;
  end_time: string;
  notes?: string;
  created_by: string;
}

interface UpdateAppointmentData {
  title?: string;
  start_time?: string;
  end_time?: string;
  notes?: string;
  status?: string;
  patient_id?: string;
  doctor_id?: string;
}

export async function createAppointment(data: CreateAppointmentData) {
  const supabase = createClient();

  const { data: appointment, error } = await supabase
    .from("appointment")
    .insert(data)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateTag("appointments", "default");
  return { success: true, appointment };
}

export async function updateAppointment(
  id: string,
  data: UpdateAppointmentData,
) {
  const supabase = createClient();

  const { data: appointment, error } = await supabase
    .from("appointment")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateTag("appointments", "default");
  return { success: true, appointment };
}

export async function deleteAppointment(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("appointment")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidateTag("appointments", "default");
  return { success: true };
}
