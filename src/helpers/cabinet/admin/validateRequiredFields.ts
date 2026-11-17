import { AddProductFormData } from "@/components/Cabinet/Admin/Products/AddProduct/types";
import { ProductListType } from "./productList";

export const validateRequiredFields = (data: AddProductFormData) => {
  const errors: {
    field: keyof AddProductFormData;
    section: ProductListType;
    message: string;
  }[] = [];

  const addTextError = (
    field: keyof AddProductFormData,
    section: ProductListType,
    message: string,
  ) => {
    const value = data[field];
    if (typeof value !== "string" || !value.trim()) {
      errors.push({ field, section, message });
    }
  };

  const hasDescription = (html?: string) => {
    if (!html) return false;
    const document = new DOMParser().parseFromString(html, "text/html");
    return (
      Boolean(document.body.textContent?.trim()) ||
      document.querySelector("[data-inline-svg-icon]") !== null
    );
  };

  addTextError("name", "productInfo", "Введіть повну назву продукту.");
  if (!hasDescription(data.description)) {
    errors.push({
      field: "description",
      section: "productInfo",
      message: "Додайте опис продукту.",
    });
  }
  addTextError("cardName", "cardInfo", "Введіть назву для картки.");
  if (!hasDescription(data.cardDescription)) {
    errors.push({
      field: "cardDescription",
      section: "cardInfo",
      message: "Додайте опис для картки.",
    });
  }

  if (data.dateRange?.length !== 2) {
    errors.push({
      field: "dateRange",
      section: "dates",
      message: "Оберіть дату початку та завершення.",
    });
  }
  if (!data.cover?.url || !data.cover?.id) {
    errors.push({
      field: "cover",
      section: "cover",
      message: "Додайте картинку",
    });
  }
  addTextError("price", "pricing", "Вкажіть ціну продукту.");

  addTextError("blockName1", "block1", "Введіть назву першого блоку.");
  if (!hasDescription(data.blockDescription1)) {
    errors.push({
      field: "blockDescription1",
      section: "block1",
      message: "Додайте зміст першого блоку.",
    });
  }

  return errors;
};
