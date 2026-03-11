"use server";
import { cacheTag } from "next/cache";
import { createClient } from "../../../supabase/clients/anon";
import { Treatment } from "@/types";

export async function getTreatmentsByPatient(
  patientId: string,
): Promise<{ treatments: Treatment[] }> {
  "use cache";
  cacheTag(`treatments-${patientId}`);
  const supabase = createClient();

  const { data: treatments } = await supabase
    .from("treatment")
    .select("*")
    .eq("patient_id", patientId)
    .order("active", { ascending: false })
    .order("start_date", { ascending: false });

  return { treatments: treatments || [] };
}
