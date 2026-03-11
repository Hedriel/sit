import BreadCrumb from "./_components/BreadCrumb";
import { Suspense } from "react";
import PatientsTableSkeleton from "./_components/PatientsTableSkeleton";
import PatientsContent from "./_components/PatientsContent";

export default function PatientsPage() {
  return (
    <div className="px-7">
      <BreadCrumb />
      <Suspense fallback={<PatientsTableSkeleton />}>
        <PatientsContent />
      </Suspense>
    </div>
  );
}
