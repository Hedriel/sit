"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";
import { Consultation } from "@/types";

export async function getConsultationsByPatient(
  patientId: string,
): Promise<{ consultations: Consultation[] }> {
  "use cache";
  cacheTag(`consultations-${patientId}`);
  const supabase = createClient();

  const { data: consultations } = await supabase
    .from("consultation")
    .select("*")
    .eq("patient_id", patientId)
    .order("date", { ascending: false });

  return { consultations: consultations || [] };
}
