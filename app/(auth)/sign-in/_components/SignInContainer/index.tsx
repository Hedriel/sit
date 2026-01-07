"use client";

import { Card, Button } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import { Activity, useState } from "react";
import LoginForm from "../LoginForm";
import ForgotPasswordForm from "../ForgotForm";

export default function SignInContainer() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPassword = () => {
    setShowForgotPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-w-full pt-16 sm:py-32">
      <Card className="p-4 w-full max-w-xs">
        {showForgotPassword && (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="absolute left-2 top-3.5"
            onPress={() => setShowForgotPassword(false)}
          >
            <ArrowLeft size={20} />
          </Button>
        )}

        <Activity mode={showForgotPassword ? "hidden" : "visible"}>
          <LoginForm onForgotPasswordClick={handleForgotPassword} />
        </Activity>
        <Activity mode={showForgotPassword ? "visible" : "hidden"}>
          <ForgotPasswordForm />
        </Activity>
      </Card>
    </div>
  );
}
