export default function UsersTableSkeleton() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex justify-between">
        <div className="mr-1 h-10 w-[377px] animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
        <div className="h-10 w-42 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />
      </div>

      <div className="mt-5 mr-1 mb-4 h-4 w-32 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-800" />

      <div className="w-full animate-pulse rounded-xl bg-gray-300 p-4 dark:bg-gray-800">
        <div className="mb-2 h-10 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-13 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-13 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
