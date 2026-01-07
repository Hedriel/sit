import type { ChipProps } from "@heroui/react";

export const statusColorMap: Record<string, ChipProps["color"]> = {
  doctor: "success",
  admin: "warning",
  receptionist: "primary",
};
