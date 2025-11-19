"use client";

import { Card, Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import LoginForm from "../LoginForm";
import ForgotPasswordForm from "../ForgotForm";

export default function SignInContainer() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };
  return (
    <Card className="p-4 w-full max-w-xs">
      {showForgotPassword && (
        <Button
          isIconOnly
          className="absolute left-2 top-2"
          onClick={() => setShowForgotPassword(false)}
        >
          <ArrowLeft />
        </Button>
      )}

      {showForgotPassword ? (
        <ForgotPasswordForm />
      ) : (
        <LoginForm onForgotPasswordClick={handleForgotPassword} />
      )}
    </Card>
  );
}
