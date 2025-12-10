"use client";
import { Chip } from "@heroui/react";

interface UserPlateProps {
  users: {
    first_name: string;
    last_name: string;
    role: string;
  }[];
}

export default function UserPlate({ users }: UserPlateProps) {
  return (
    <>
      <div className="space-y-2 gap-2 py-2 border-r border-gray-200 col-span-2 my-2">
        {users.map((user, index) => (
          <div className="flex items-center gap-2" key={index}>
            <Chip
              variant="solid"
              color={
                user.role === "admin"
                  ? "warning"
                  : user.role === "doctor"
                  ? "success"
                  : "primary"
              }
              size="sm"
            >
              {user.role.toUpperCase()}
            </Chip>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
