"use client";

import { Card } from "@heroui/react";
import LoginForm from "../LoginForm";

export default function SignInContainer() {
  return (
    <div className="flex min-w-full items-center justify-center pt-16 sm:py-32">
      <Card className="w-full max-w-xs p-4">
        <LoginForm />
      </Card>
    </div>
  );
}
