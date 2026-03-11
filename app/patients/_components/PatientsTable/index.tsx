import { getPatientsByDoctor } from "@/lib/data-access-layer/patients/patients";
import PatientsTableWrapper from "./components/PatientsTableWrapper";

export default async function PatientsTable({
  doctorId,
}: {
  doctorId: string;
}) {
  const { patients } = await getPatientsByDoctor(doctorId);
  return <PatientsTableWrapper patients={patients} />;
}
