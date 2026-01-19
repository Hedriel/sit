import UsersTable from "./_components/UsersTable";

import BreadCrumb from "./_components/BreadCrumb";

import { Suspense } from "react";
import UsersTableSkeleton from "./_components/UsersTableSkeleton";

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
