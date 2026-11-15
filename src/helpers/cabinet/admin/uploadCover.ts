import { backend_url } from "@/helpers/consts";
import type { UploadedCover } from "@/components/Cabinet/Admin/Products/AddProduct/types";

interface UploadCoverVariables {
  file: File;
  accessToken: string;
}

const parseUploadedCover = (payload: unknown): UploadedCover => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Сервер повернув некоректні дані обкладинки.");
  }

  const response = payload as Record<string, unknown>;
  const cover = (
    response.data && typeof response.data === "object"
      ? response.data
      : response
  ) as Record<string, unknown>;

  if (
    (typeof cover.id !== "string" && typeof cover.id !== "number") ||
    typeof cover.url !== "string"
  ) {
    throw new Error("У відповіді сервера немає ID або URL обкладинки.");
  }

  return { id: cover.id, url: cover.url };
};

export async function uploadCover({
  file,
  accessToken,
}: UploadCoverVariables): Promise<UploadedCover> {
  const formData = new FormData();
  formData.append("cover", file);

  let response: Response;
  try {
    response = await fetch(
      `${backend_url.replace(/\/$/, "")}/storage/cover`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      },
    );
  } catch {
    throw new Error("Не вдалося з'єднатися із сервером. Спробуйте ще раз.");
  }

  if (!response.ok) {
    throw new Error("Не вдалося завантажити обкладинку. Спробуйте ще раз.");
  }

  return parseUploadedCover(await response.json());
}
