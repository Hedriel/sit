import { getUserProfile } from "@/lib/auth/user";
import NavBarWrapper from "./_components/NavBarWrapper";

export default async function NavBar() {
  const data = await getUserProfile();

  return <NavBarWrapper data={data || null} />;
}

export const NavBarSkeleton = () => {
  return (
    <div className="max-h-12 p-6 flex items-center justify-between mb-8">
      <div className="mt-4">
        <span className="font-bold text-inherit text-2xl">S.I.T</span>
      </div>
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
    </div>
  );
};
