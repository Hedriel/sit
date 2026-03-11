import { Suspense } from "react";
import CalendarContent from "./_components/CalendarContent";

export default function Home() {
  return (
    <div className="mt-16 px-7 py-4">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="h-10 w-48 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
              <div className="flex gap-2">
                <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
                <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
                <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
              </div>
            </div>
            <div className="h-[600px] w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
          </div>
        }
      >
        <CalendarContent />
      </Suspense>
    </div>
  );
}
