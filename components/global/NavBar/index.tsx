import { ThemeSwitcher } from "@/providers/UIProvider/ThemeSwitcher";

import LogOut from "@/components/auth/LogOutButton";
import UserCard from "@/components/global/UserCard";

import { getUserProfile } from "@/lib/auth/helper";

export default async function NavBar() {
  const data = await getUserProfile();

  return (
    <nav className="flex justify-between items-center relative">
      <h1 className="text-2xl font-bold">S.I.T</h1>
      <div className="flex gap-4">
        <ThemeSwitcher />
        {data && (
          <UserCard
            name={`${data.first_name} ${data.last_name}`!}
            email={data.email!}
            avatar={data.avatar_url}
          />
        )}
        <LogOut />
      </div>
    </nav>
  );
}
