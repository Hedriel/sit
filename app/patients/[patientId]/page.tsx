import { Suspense } from "react";
import PatientDetailAuth from "./_components/PatientDetailAuth";
import PatientsTableSkeleton from "../_components/PatientsTableSkeleton";

export async function generateStaticParams() {
  return [{ patientId: "placeholder" }];
}

export default async function PatientDetailPage({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;

  return (
    <div className="px-7">
      <Suspense fallback={<PatientsTableSkeleton />}>
        <PatientDetailAuth patientId={patientId} />
      </Suspense>
    </div>
  );
}
