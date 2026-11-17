import type { ComponentType } from "react";

import MainSection from "@/components/Cabinet/Admin/Products/AddProduct/FormSections/MainSection/MainSection";
import type { MainSectionProps } from "@/components/Cabinet/Admin/Products/AddProduct/FormSections/MainSection/MainSection";
import Cover from "@/components/Cabinet/Admin/Products/AddProduct/FormSections/Cover/Cover";
import Dates from "@/components/Cabinet/Admin/Products/AddProduct/FormSections/Dates/Dates";
import Prices from "@/components/Cabinet/Admin/Products/AddProduct/FormSections/Prices/Prices";
import type { BlockIndex } from "@/components/Cabinet/Admin/Products/AddProduct/types";
import { ProductListType } from "@/helpers/cabinet/admin/productList";

type RepeatedBlockType = Extract<ProductListType, `block${number}`>;
type SectionConfig = { component: ComponentType<never>; props: never };

const blockNumbers: BlockIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const defineSection = <Props>(
  component: ComponentType<Props>,
  props: Props,
): SectionConfig => ({
  component: component as unknown as ComponentType<never>,
  props: props as never,
});

const blockSectionConfig = Object.fromEntries(
  blockNumbers.map((blockNumber) => {
    const blockType = `block${blockNumber}` as RepeatedBlockType;

    return [
      blockType,
      defineSection(MainSection, {
        name: `blockName${blockNumber}`,
        labelName: `НАЗВА БЛОКУ ${blockNumber}`,
        description: `blockDescription${blockNumber}`,
        labelDescription: `ЗМІСТ БЛОКУ ${blockNumber}`,
        nameRules: {
          ...(blockNumber === 1
            ? { required: "Введіть назву першого блоку" }
            : {}),
          maxLength: { value: 100, message: "Максимум 100 символів" },
        },
        descriptionRules: {
          ...(blockNumber === 1
            ? { required: "Додайте зміст першого блоку" }
            : {}),
          maxLength: { value: 2500, message: "Максимум 2500 символів" },
        },
      } satisfies MainSectionProps),
    ];
  }),
) as Record<RepeatedBlockType, SectionConfig>;

export const addProductSections = {
  productInfo: defineSection(MainSection, {
    name: "name",
    labelName: "Повна назва продукту (максимум 100 символів)",
    description: "description",
    labelDescription: "Опис продукту (максимум 2500 символів)",
    nameRules: {
      required: "Введіть повну назву продукту",
      maxLength: { value: 100, message: "Максимум 100 символів" },
    },
    descriptionRules: {
      required: "Додайте опис продукту",
      maxLength: { value: 2500, message: "Максимум 2500 символів" },
    },
  } satisfies MainSectionProps),
  cardInfo: defineSection(MainSection, {
    name: "cardName",
    labelName: "Назва для картки (максимум 60 символів)",
    description: "cardDescription",
    labelDescription: "Опис продукту для картки (максимум 150 символів)",
    nameRules: {
      required: "Введіть назву для картки",
      maxLength: { value: 60, message: "Максимум 60 символів" },
    },
    descriptionRules: {
      required: "Додайте опис для картки",
      maxLength: { value: 150, message: "Максимум 150 символів" },
    },
  } satisfies MainSectionProps),
  cover: defineSection(Cover, {}),
  dates: defineSection(Dates, {}),
  pricing: defineSection(Prices, {}),
  ...blockSectionConfig,
} satisfies Record<ProductListType, SectionConfig>;
