"use client";

import { usePathname } from "next/navigation";

export default function NavBarSkeleton() {
  const pathname = usePathname();

  const isLoggedIn = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <div className="mb-4 hidden max-h-12 items-center justify-between p-6 sm:flex">
      <div className="mt-4">
        <span className="text-2xl font-bold text-inherit">S.I.T</span>
      </div>
      {!isLoggedIn && (
        <>
          <div className="mt-4 ml-40 flex gap-2">
            <div className="my-4 mr-1 h-4 w-16 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
            <div className="my-4 mr-1 h-4 w-16 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
            <div className="my-4 mr-1 h-4 w-16 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
          </div>
          <div className="mt-2 flex h-14 w-64 items-center gap-2">
            <div className="size-10 min-w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-800" />
            <div className="w-full space-y-2">
              <div className="mr-1 h-3 w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
              <div className="mr-1 h-3 w-full animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
