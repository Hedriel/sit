"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/react";

import Link from "next/link";

import UserCard from "@/components/UserCard";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/providers/UIProvider/ThemeSwitcher";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/admin", label: "Admin" },
  { href: "/instruments", label: "Instruments" },
];
export default function NavBar({ data }: { data: any }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function renderLinks() {
    return links.map((link) => (
      <Link
        onClick={() => setIsMenuOpen(false)}
        key={link.href}
        className={`transition-all duration-300 hover:sm:scale-105 ${
          link.href === pathname
            ? "text-primary"
            : "hover:text-primary opacity-85 "
        }`}
        href={link.href}
      >
        {link.label}
      </Link>
    ));
  }

  return (
    <Navbar isMenuOpen={isMenuOpen} maxWidth="full">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle onChange={(value) => setIsMenuOpen(value)} />
      </NavbarContent>
      <NavbarBrand className="hidden sm:flex">
        <span className="font-bold text-inherit  text-2xl">S.I.T</span>
      </NavbarBrand>

      {data ? (
        <>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {renderLinks()}
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <UserCard
                name={`${data.first_name} ${data.last_name}`!}
                email={data.email!}
                avatar={data?.avatar_url}
              />
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>{renderLinks()}</NavbarMenu>
        </>
      ) : (
        <div className="mr-auto">
          <ThemeSwitcher />
        </div>
      )}
    </Navbar>
  );
}
