import { Suspense } from "react";
import Instruments from "./_components/instruments";

export default async function InstrumentsPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <Instruments />
    </Suspense>
  );
}
