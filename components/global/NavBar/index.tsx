"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";

import UserCard from "@/components/global/UserCard";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
  { href: "/instruments", label: "Instruments" },
];

export default function NavBar({ data }: { data: any }) {
  const pathname = usePathname();

  return (
    <Navbar maxWidth="full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand className="hidden sm:flex">
        <span className="font-bold text-inherit  text-2xl">S.I.T</span>
      </NavbarBrand>
      {data && (
        <>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {links.map((link) => (
              <NavbarItem isActive={link.href === pathname} key={link.href}>
                <Link
                  color={link.href === pathname ? "primary" : "foreground"}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <UserCard
                name={`${data.first_name} ${data.last_name}`!}
                email={data.email!}
                avatar={data.avatar_url}
              />
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            {links.map((link, index) => (
              <NavbarMenuItem key={`${link}-${index}`}>
                <Link
                  color={link.href === pathname ? "primary" : "foreground"}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </>
      )}
    </Navbar>
  );
}
