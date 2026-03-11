"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";

export async function getAppointments(doctorId?: string) {
  "use cache";
  cacheTag("appointments");
  const supabase = createClient();

  let query = supabase
    .from("appointment")
    .select("*, patient(first_name, last_name, dni)")
    .order("start_time", { ascending: true });

  if (doctorId) {
    query = query.eq("doctor_id", doctorId);
  }

  const { data: appointments } = await query;

  return { appointments: appointments || [] };
}

export async function getAppointmentById(id: string) {
  const supabase = createClient();

  const { data: appointment } = await supabase
    .from("appointment")
    .select("*, patient(first_name, last_name, dni)")
    .eq("id", id)
    .single();

  return { appointment };
}
