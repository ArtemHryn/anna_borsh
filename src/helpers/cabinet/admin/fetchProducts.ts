import { backend_url } from "@/helpers/consts";

type fetchProductsProps = {
  token: string;
  search?: string;
};

export const fetchProducts = async ({ token, search }: fetchProductsProps) => {
  const params = new URLSearchParams();
  if (search) {
    params.append("search", search);
  }
  const res = await fetch(
    `${backend_url}/admin/products/get-all?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Помилка завантаження продуктів");
  }

  return res.json();
};
