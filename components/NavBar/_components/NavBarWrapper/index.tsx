"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/react";

import { ThemeSwitcher } from "@/providers/UIProvider/ThemeSwitcher";

import { useState } from "react";
import UserCard from "@/components/UserCard";
import NavLinks from "../NavLinks";

interface NavBarProps {
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  role: string;
}

export default function NavBarWrapper({ data }: { data: NavBarProps | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isMenuOpen={isMenuOpen} maxWidth="full">
      <NavbarBrand className="hidden sm:flex">
        <span className="text-2xl font-bold text-inherit">S.I.T</span>
      </NavbarBrand>

      {data ? (
        <>
          {/* Desktop */}
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <NavLinks role={data?.role} />
          </NavbarContent>

          {/* Mobile */}
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle onChange={(value) => setIsMenuOpen(value)} />
          </NavbarContent>
          <NavbarMenu className="sm:hidden">
            <NavLinks setIsMenuOpen={setIsMenuOpen} role={data?.role} />
          </NavbarMenu>

          <NavbarContent justify="end">
            <NavbarItem>
              <UserCard
                name={`${data.first_name} ${data.last_name}`!}
                email={data.email!}
                avatar={data?.avatar_url}
              />
            </NavbarItem>
          </NavbarContent>
        </>
      ) : (
        <div className="mr-auto">
          <ThemeSwitcher />
        </div>
      )}
    </Navbar>
  );
}
