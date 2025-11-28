"use client";
import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";

export default function Home() {
  const [action, setAction] = useState("");

  return (
    <div className="flex justify-center items-center h-screen">
      Bienvenido al SIT :D
    </div>
  );
}
