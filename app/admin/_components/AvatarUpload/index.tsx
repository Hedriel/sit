"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import { Button, PressEvent } from "@heroui/button";

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log(file);
      setError(null);
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const onDropRejected = useCallback((fileRejections: any[]) => {
    const rejection = fileRejections[0];
    if (rejection.errors[0].code === "file-too-large") {
      setError("La imagen es demasiado grande. Máximo 2MB.");
    } else if (rejection.errors[0].code === "too-many-files") {
      setError("Solo puedes subir una imagen.");
    } else if (rejection.errors[0].code === "file-invalid-type") {
      setError("Formato no permitido. Usa JPG, PNG, GIF o WebP.");
    } else {
      setError("Error al subir la imagen.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  const removeImage = (e: PressEvent) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };

  return (
    <div className="mt-2 w-full">
      {error && (
        <div className="mb-2">
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}
      <div
        {...getRootProps()}
        className={`bg-muted/30 relative mx-auto flex size-40 w-full max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-400 text-center transition-all duration-300 ease-in-out ${
          isDragActive
            ? "border-primary bg-primary/10 shadow-2xl"
            : "border-muted-foreground/40 hover:border-primary/60 hover:bg-accent/10 hover:shadow-xl"
        } `}
      >
        <input aria-label="Subir avatar" name="avatar" {...getInputProps()} />

        {preview ? (
          <div className="relative flex size-24 items-center justify-center">
            <img
              src={preview}
              alt="Preview del avatar"
              className="size-full rounded-2xl object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <Button
                size="sm"
                isIconOnly
                type="button"
                onPress={removeImage}
                className="absolute -top-3 -right-2 cursor-pointer rounded-full"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex size-full flex-col items-center justify-center space-y-2 px-6">
            <UploadCloud className="text-muted-foreground size-10" />
            <div className="space-y-1">
              <p className="text-foreground text-base font-medium">
                Selecciona o arrastra tu imagen
              </p>
              <p className="text-muted-foreground text-xs">
                {isDragActive ? "¡Soltá aquí!" : ""}
              </p>
              <p className="text-muted-foreground text-xs">max. 2MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
