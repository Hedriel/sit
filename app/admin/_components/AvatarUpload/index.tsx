// components/AvatarUpload.tsx
"use client";

import { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ImagePlus, XIcon } from "lucide-react";

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview(null);
    // Opcional: resetear el input
    const input = document.getElementById("avatar-input") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <Card
      className="w-full cursor-pointer border-2 border-dashed border-divider hover:border-primary transition-colors"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
          setPreview(URL.createObjectURL(file));
          // Truco: asignar al input oculto
          const input = document.getElementById(
            "avatar-input"
          ) as HTMLInputElement;
          if (input) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;
          }
        }
      }}
    >
      <CardBody className="p-8 text-center">
        <label htmlFor="avatar-input" className="block cursor-pointer">
          {preview ? (
            <div>
              <img
                src={preview}
                alt="Preview avatar"
                className="mx-auto h-48 w-48 rounded-full object-cover"
              />
              <button
                onClick={reset}
                className="absolute top-2 right-2 rounded-lg bg-red-700/90 p-2 text-white hover:bg-red-800/90 cursor-pointer"
              >
                <XIcon size={16} />
              </button>
            </div>
          ) : (
            <>
              <ImagePlus size={48} className="mx-auto text-foreground/90" />
              <p className="mt-4 font-medium">Arrastrá una foto o hacé click</p>
              <p className="text-xs text-foreground/60">JPG, PNG • máx 5MB</p>
            </>
          )}
        </label>

        {/* Este input está oculto pero dentro del form → Next.js lo incluye automáticamente */}
        <input
          id="avatar-input"
          type="file"
          name="avatar" // ← CLAVE: este name hace que llegue como formData.get("avatar")
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </CardBody>
    </Card>
  );
}
