"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function BreadCrumb() {
  return (
    <Breadcrumbs className="py-4">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/admin">Admin</BreadcrumbItem>
    </Breadcrumbs>
  );
}
