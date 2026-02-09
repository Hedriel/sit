import {
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import defaultProfile from "@/public/images/default-user.webp";

import LogOut from "@/app/(auth)/sign-in/_components/LogOutButton";
import { ThemeSwitcher } from "@/providers/UIProvider/ThemeSwitcher";

interface UserCardProps {
  name: string;
  email: string;
  image?: string | null | undefined;
}

export default function UserCard({ name, email, image }: UserCardProps) {
  if (!name || !email) return null;
  return (
    <Dropdown showArrow>
      <DropdownTrigger className="cursor-pointer">
        <User
          avatarProps={{
            size: "md",
            src: image || defaultProfile.src,
          }}
          description={email}
          name={name}
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem className="p-0" key="theme">
          <ThemeSwitcher />
        </DropdownItem>
        <DropdownItem className="p-0" key="logout">
          <LogOut />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
