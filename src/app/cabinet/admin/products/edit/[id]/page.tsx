import { auth } from "@/auth";
import AddProduct from "@/components/Cabinet/Admin/Products/AddProduct/AddProduct";
import { backend_url } from "@/helpers/consts";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

const fetchProduct = async ({ token, id }: { token: string; id: string }) => {
  const res = await fetch(`${backend_url}/admin/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(errorBody?.message || "Помилка завантаження продукту");
  }
  return res.json();
};

const EditProductPage = async ({ params }: EditProductPageProps) => {
  return (
    <Suspense fallback={<div>Завантаження...</div>}>
      <ProductContent params={params} />
    </Suspense>
  );
};

const ProductContent = async ({ params }: EditProductPageProps) => {
  const { id } = await params;
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/login");
  }
  let product;
  try {
    product = await fetchProduct({
      token: session?.accessToken,
      id,
    });
  } catch (e) {
    console.log(e);

    return <div>{"Не вдалося завантажити продукт"}</div>;
  }
  return <AddProduct editProduct={product} />;
};

export default EditProductPage;
