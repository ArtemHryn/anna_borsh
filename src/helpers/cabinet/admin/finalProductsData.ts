import {
  AddProductFormData,
  BlockIndex,
} from "@/components/Cabinet/Admin/Products/AddProduct/types";

export const getFinalProductData = (data: AddProductFormData) => {
  const {
    dateRange,
    name,
    description,
    cardDescription,
    cardName,
    cover,
    price,
    discount,
  } = data;
  const [dateStart, dateEnd] = dateRange;

  const blocks: Record<
    string,
    { blockName: string; blockDescription: string }
  > = {};

  for (const i of Array.from(
    { length: 10 },
    (_, index) => (index + 1) as BlockIndex,
  )) {
    const blockName = data[`blockName${i}`] ?? "";
    const blockDescription = data[`blockDescription${i}`] ?? "";

    if (!blockName && !blockDescription) continue;

    blocks[`block${i}`] = {
      blockName,
      blockDescription,
    };
  }
  return {
    dateStart,
    dateEnd,
    name,
    description,
    cardDescription,
    cardName,
    cover,
    price,
    discount,
    ...blocks,
  };
};
