"use client";
import { useState } from "react";
import AddProductButton from "./AddProductButton/AddProductButton";
import Search from "./Search/Search";

import styles from "./Products.module.scss";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/helpers/cabinet/admin/fetchProducts";
import { useSession } from "next-auth/react";
import ProductsTable from "./Search/ProductsTable/ProductsTable";

export type Product = {
  _id: string;
  cover?: { url?: string };
  name: string;
  description?: string;
  dateStart?: string;
};

const Products = () => {
  const searchParams = useSearchParams();
  const { data } = useSession();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin", "products", query],
    placeholderData: (prevD) => prevD,
    queryFn: () =>
      fetchProducts({
        search: query,
        token: data?.accessToken || "",
      }),
    enabled: !!data?.accessToken,
  });

  if (isLoading) return null;
  if (!products) return null;

  const productList: Product[] = Array.isArray(products)
    ? products
    : (products.products ?? products.data ?? []);

  return (
    <div>
      <div className={styles.actions_wrapper}>
        <Search query={query} setQuery={setQuery} />
        <AddProductButton />
      </div>
      <ProductsTable products={productList} />
    </div>
  );
};

export default Products;
