import { backend_url } from "@/helpers/consts";

type ActionProductTypes = {
  token: string;
  method: string;
  id: string;
};

export const actionProduct = async ({
  token,
  id,
  method,
}: ActionProductTypes) => {
  const res = await fetch(`${backend_url}/admin/products/${id}`, {
    method,
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(
      errorBody.message ||
        `Помилка ${method === "GET" ? "завантаження" : "видалення"} продукту`,
    );
  }
  return await res.json();
};
