"use client";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";

export default function PatientBreadCrumb({
  patientName,
}: {
  patientName: string;
}) {
  return (
    <Breadcrumbs className="py-4">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/patients">Pacientes</BreadcrumbItem>
      <BreadcrumbItem>{patientName}</BreadcrumbItem>
    </Breadcrumbs>
  );
}
