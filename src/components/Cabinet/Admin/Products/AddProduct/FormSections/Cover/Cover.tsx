"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import type { DragEvent } from "react";
import { toast } from "sonner";
import { uploadCover as uploadCoverRequest } from "@/helpers/cabinet/admin/uploadCover";

import type { AddProductFormData } from "../../types";
import styles from "./Cover.module.scss";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/tiff",
];
const ACCEPTED_FILE_EXTENSIONS = /\.(jpe?g|png|webp|avif|tiff?)$/i;

const Cover = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue, watch } = useFormContext<AddProductFormData>();
  const uploadedCover = watch("cover");
  const hasUploadedCover =
    uploadedCover !== undefined &&
    (typeof uploadedCover.id === "string" ||
      typeof uploadedCover.id === "number") &&
    typeof uploadedCover.url === "string" &&
    uploadedCover.url.length > 0;
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    hasUploadedCover ? uploadedCover.url : "",
  );
  const [fileError, setFileError] = useState("");
  const { data: session } = useSession();
  const uploadMutation = useMutation({
    mutationFn: uploadCoverRequest,
    onSuccess: (cover) => {
      setValue("cover", cover, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setPreviewUrl(cover.url);
      toast.success("Обкладинку успішно завантажено.");
    },
    onError: (mutationError: Error) => toast.error(mutationError.message),
  });
  const isUploading = uploadMutation.isPending;
  const error = fileError || uploadMutation.error?.message || "";

  const showFileError = (message: string) => {
    setFileError(message);
    toast.error(message);
  };

  const uploadCover = async (file?: File) => {
    if (!file) return;
    setFileError("");
    uploadMutation.reset();

    const isSupportedType = ACCEPTED_FILE_TYPES.includes(file.type);
    const hasSupportedExtension = ACCEPTED_FILE_EXTENSIONS.test(file.name);
    if (!isSupportedType && !hasSupportedExtension) {
      showFileError("Оберіть зображення JPG, PNG, WEBP, AVIF або TIFF.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showFileError("Розмір файлу не має перевищувати 10 МБ.");
      return;
    }

    if (!session?.accessToken) {
      showFileError("Не вдалося отримати токен авторизації. Увійдіть ще раз.");
      return;
    }

    uploadMutation.mutate({ file, accessToken: session.accessToken });
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsDragging(false);
    void uploadCover(event.dataTransfer.files[0]);
  };

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.avif,.tif,.tiff,image/jpeg,image/png,image/webp,image/avif,image/tiff"
        aria-label="Завантажити обкладинку"
        disabled={isUploading}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.value = "";
          void uploadCover(file);
        }}
      />

      <button
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""}`}
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (
            !event.currentTarget.contains(event.relatedTarget as Node | null)
          ) {
            setIsDragging(false);
          }
        }}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <Image
            fill
            unoptimized
            className={styles.preview}
            src={previewUrl}
            alt="Попередній перегляд обкладинки"
          />
        ) : (
          <span>
            {isUploading
              ? "Завантаження…"
              : "Перетягніть зображення сюди або натисніть, щоб вибрати файл"}
            <br />
            JPG, PNG, WEBP, AVIF або TIFF · до 10 МБ
          </span>
        )}
        {hasUploadedCover && (
          <span className={styles.uploaded}>Зображення завантажено</span>
        )}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Cover;
