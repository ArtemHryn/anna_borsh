"use client";

import { createElement, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import SectionsList from "./SectionsList/SectionsList";
import SubmitButton from "./SubmitButton/SubmitButton";
import type { AddProductFormData, BlockIndex } from "./types";
import { fields, ProductListType } from "@/helpers/cabinet/admin/productList";
import { addProductSections } from "@/helpers/cabinet/admin/addProductSections";
import { getFinalProductData } from "@/helpers/cabinet/admin/finalProductsData";
import { validateRequiredFields } from "@/helpers/cabinet/admin/validateRequiredFields";
import useMutateAdminProduct from "@/hooks/useMutateAdminProduct";
import styles from "./AddProduct.module.scss";
import { useSession } from "next-auth/react";

interface AddProductProps {
  editProduct?: EditProduct;
}

interface EditProduct {
  _id: string;
  name: string;
  description: string;
  cardName: string;
  cardDescription: string;
  cover: AddProductFormData["cover"];
  dateStart: string | Date;
  dateEnd: string | Date;
  price: string | number;
  discount?: string | number | null;
  [key: string]: unknown;
}

const getDefaultValues = (
  product?: EditProduct,
): AddProductFormData | undefined => {
  if (!product) return undefined;

  const defaults: AddProductFormData = {
    name: product.name,
    description: product.description,
    cardName: product.cardName,
    cardDescription: product.cardDescription,
    cover: product.cover,
    dateRange: [new Date(product.dateStart), new Date(product.dateEnd)],
    price: String(product.price),
    discount: product.discount == null ? "" : String(product.discount),
  };

  for (const index of Array.from(
    { length: 10 },
    (_, i) => (i + 1) as BlockIndex,
  )) {
    const block = product[`block${index}`];
    if (!block || typeof block !== "object") continue;

    const { blockName, blockDescription } = block as {
      blockName?: unknown;
      blockDescription?: unknown;
    };
    defaults[`blockName${index}`] =
      typeof blockName === "string" ? blockName : "";
    defaults[`blockDescription${index}`] =
      typeof blockDescription === "string" ? blockDescription : "";
  }

  return defaults;
};

const AddProduct = ({ editProduct }: AddProductProps) => {
  const { data } = useSession();
  const [block, setBlock] = useState<ProductListType>(fields[0].type);
  const methods = useForm<AddProductFormData>({
    mode: "onChange",
    defaultValues: getDefaultValues(editProduct),
  });

  const { getValues, handleSubmit, setError } = methods;
  const ActiveSection = addProductSections[block].component;
  const sectionProps = addProductSections[block].props;

  const reportRequiredFieldErrors = (data: AddProductFormData) => {
    const errors = validateRequiredFields(data);
    if (errors.length === 0) return false;

    toast.error("Заповніть всі поля");
    errors.forEach(({ field, message }) => {
      setError(field, { type: "required", message });
    });
    setBlock(errors[0].section);
    return true;
  };

  const mutateProduct = useMutateAdminProduct(
    data?.accessToken || "",
    !!editProduct ? "edit" : "add",
    !!editProduct ? editProduct._id : "",
  );

  const handleFormSubmit = (data: AddProductFormData) => {
    if (reportRequiredFieldErrors(data)) return;
    mutateProduct.mutate(getFinalProductData(data));
  };

  const handleFormInvalid = () => {
    reportRequiredFieldErrors(getValues());
  };

  return (
    <FormProvider {...methods}>
      {" "}
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
        autoComplete="off"
      >
        <SectionsList setBlock={setBlock} block={block} />
        <div key={block} className={styles.info_wrapper}>
          {createElement(ActiveSection, sectionProps as never)}
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
