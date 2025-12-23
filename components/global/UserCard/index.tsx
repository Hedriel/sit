"use client";
import { User, Link } from "@heroui/react";
import defaultProfile from "@/public/images/default-user.webp";
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export default function UserCard({ name, email, avatar }: UserCardProps) {
  if (!name || !email) return null;
  return (
    <User
      avatarProps={{
        src: avatar || defaultProfile.src,
      }}
      description={
        <Link href="https://x.com/jrgarciadev" size="sm">
          {email}
        </Link>
      }
      name={name}
    />
  );
}
