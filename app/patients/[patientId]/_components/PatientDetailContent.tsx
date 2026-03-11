import { getPatientById } from "@/lib/data-access-layer/patients/patients";
import { getConsultationsByPatient } from "@/lib/data-access-layer/patients/consultations";
import { getTreatmentsByPatient } from "@/lib/data-access-layer/patients/treatments";
import { notFound } from "next/navigation";
import PatientInfo from "./PatientInfo";
import TreatmentsCard from "./TreatmentsCard";
import ConsultationsTable from "./ConsultationsTable";
import PatientBreadCrumb from "./PatientBreadCrumb";
import PatientActions from "./PatientActions";

export default async function PatientDetailContent({
  patientId,
}: {
  patientId: string;
}) {
  const { patient } = await getPatientById(patientId);

  if (!patient) {
    notFound();
  }

  const [{ consultations }, { treatments }] = await Promise.all([
    getConsultationsByPatient(patientId),
    getTreatmentsByPatient(patientId),
  ]);

  return (
    <>
      <PatientBreadCrumb patientName={patient.fullname} />

      <div className="flex flex-col gap-8 pt-4">
        <PatientInfo patient={patient} />
        <PatientActions patientId={patientId} doctorId={patient.doctor_id} />
        <TreatmentsCard treatments={treatments} />
        <ConsultationsTable consultations={consultations} />
      </div>
    </>
  );
}
