"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { Button, PressEvent } from "@heroui/button";

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log(file);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024,
  });

  const removeImage = (e: PressEvent) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return (
    <div className="mt-6 w-full">
      <div
        {...getRootProps()}
        className={`
          relative mx-auto size-40 max-w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-gray-400
          bg-muted/30 text-center transition-all duration-300 ease-in-out w-full flex items-center justify-center
          ${
            isDragActive
              ? "border-primary bg-primary/10 shadow-2xl"
              : "border-muted-foreground/40 hover:border-primary/60 hover:bg-accent/10 hover:shadow-xl"
          }
        `}
      >
        <input name="avatar" {...getInputProps()} />

        {preview ? (
          <div className="size-24 flex items-center justify-center relative">
            <img
              src={preview}
              alt="Preview del avatar"
              className="size-full object-cover rounded-2xl"
            />

            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <Button
                size="sm"
                isIconOnly
                type="button"
                onPress={removeImage}
                className=" absolute -top-3 -right-2 rounded-full  cursor-pointer"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex size-full flex-col items-center justify-center space-y-2 px-6">
            <UploadCloud className="size-10 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">
                {isDragActive ? "¡Soltá aquí!" : "Arrastrá tu foto"}
              </p>
              <p className="text-xs text-muted-foreground">
                o click para seleccionar
                <br />
                máx. 4MB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
