"use client";

import { usePathname } from "next/navigation";

export default function NavBarSkeleton() {
  const pathname = usePathname();

  const isLoggedIn = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <div className="hidden sm:flex max-h-12 p-6  items-center justify-between mb-4">
      <div className="mt-4">
        <span className="font-bold text-inherit text-2xl">S.I.T</span>
      </div>
      {!isLoggedIn && (
        <>
          <div className="flex ml-40 gap-2 mt-4">
            <div className="mr-1 h-4 w-16 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl my-4" />
            <div className="mr-1 h-4 w-16 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl my-4" />
            <div className="mr-1 h-4 w-16 bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl my-4" />
          </div>
          <div className="h-14 w-64 flex items-center gap-2 mt-2">
            <div className="size-10 min-w-10 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse" />
            <div className="space-y-2 w-full">
              <div className="mr-1 h-3 w-full bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl" />
              <div className="mr-1 h-3 w-full bg-gray-300 dark:bg-gray-800 animate-pulse rounded-xl" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
