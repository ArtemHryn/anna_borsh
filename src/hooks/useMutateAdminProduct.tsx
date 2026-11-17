import { backend_url } from "@/helpers/consts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const actions = {
  add: { path: "add", method: "POST", message: "Продукт успішно додано" },
  edit: { path: "edit", method: "PUT", message: "Продукт успішно оновленно" },
};

type ProductAction = keyof typeof actions;

const productMutation = async (
  data: Record<string, unknown>,
  token: string,
  option: ProductAction,
  id?: string,
) => {
  const action = actions[option];
  const res = await fetch(
    `${backend_url}/admin/products/${action.path}${id ? `/${id}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: action.method,
      body: JSON.stringify(data),
    },
  );
  if (!res.ok) {
    const errorBody = await res.json();
    const message = errorBody?.message || "Помилка видалення";
    throw new Error(message);
  }
  return await res.json();
};

const useMutateAdminProduct = (
  token: string,
  option: ProductAction = "add",
  id?: string,
) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) =>
      productMutation(data, token, option, id),
    onSuccess: () => {
      toast.success(actions[option].message);
      setTimeout(() => router.push("/cabinet/admin/products"), 3000);
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
    onError: (err) => toast.error(err?.message || "Упс, щось пішло не так"),
  });
};

export default useMutateAdminProduct;
