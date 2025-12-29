import type { ChipProps } from "@heroui/react";
export const columns = [

  { name: "USUARIO", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "ROL", uid: "role", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

export interface User {
   id: string,
    first_name: string, 
    last_name: string,        
    role: string,
    avatar_url: string
}


export const statusColorMap: Record<string, ChipProps["color"]> = {
  doctor: "success",
  admin: "warning",
  receptionist: "primary",
};