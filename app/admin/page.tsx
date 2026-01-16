import UsersTable from "./_components/UsersTable";

import BreadCrumb from "./_components/BreadCrumb";

import { Suspense } from "react";
export default async function AdminPage() {
  return (
    <div className="px-7">
      <BreadCrumb />
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

function UsersTableSkeleton() {
  return (
    <div className="max-w-7xl mx-auto  w-full">
      <div className="flex justify-between">
        <div className="mr-1 h-10 w-96 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl" />
        <div className="mr-1 h-10 w-42 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl" />
      </div>

      <div className="mr-1 h-4 w-32 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl mt-5 mb-4" />

      <div className="p-4 w-full  bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl ">
        <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl mb-2" />
        <div className="w-full h-13 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl mb-2" />
        <div className="w-full h-13 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl" />
      </div>
    </div>
  );
}
