import type { ChipProps } from "@heroui/react";

export interface User {
  id: string;
  fullname: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar_url: string;
  email: string;
}

export const statusColorMap: Record<string, ChipProps["color"]> = {
  doctor: "success",
  admin: "warning",
  receptionist: "primary",
};
