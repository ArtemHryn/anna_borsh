"use client";

import { createElement, useState } from "react";
import type { ComponentType } from "react";
import { FormProvider, useForm } from "react-hook-form";

import SectionsList from "./SectionsList/SectionsList";
import MainSection from "./FormSections/MainSection/MainSection";
import SubmitButton from "./SubmitButton/SubmitButton";
import Cover from "./FormSections/Cover/Cover";
import Dates from "./FormSections/Dates/Dates";
import Prices from "./FormSections/Prices/Prices";
import Block from "./FormSections/Block/Block";
import type { AddProductFormData } from "./types";
import type { MainSectionProps } from "./FormSections/MainSection/MainSection";
import { fields, ProductListType } from "@/helpers/cabinet/admin/productList";
import styles from "./AddProduct.module.scss";

type RepeatedBlockType = Extract<ProductListType, `block${number}`>;
type SectionConfig = { component: ComponentType<never>; props: never };

const defineSection = <Props,>(
  component: ComponentType<Props>,
  props: Props,
): SectionConfig => ({
  component: component as unknown as ComponentType<never>,
  props: props as never,
});

const blockSectionConfig = Object.fromEntries(
  Array.from({ length: 10 }, (_, index) => {
    const blockNumber = index + 1;
    const blockType = `block${blockNumber}` as RepeatedBlockType;

    return [blockType, defineSection(Block, { blockNumber })];
  }),
) as Record<RepeatedBlockType, SectionConfig>;

const sections = {
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

const AddProduct = () => {
  const [block, setBlock] = useState<ProductListType>(fields[0].type);
  const methods = useForm<AddProductFormData>();

  const { handleSubmit } = methods;
  const ActiveSection = sections[block].component;
  const sectionProps = sections[block].props;

  const handleFormSubmit = (data: AddProductFormData) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      {" "}
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleFormSubmit)}
        autoComplete="off"
      >
        <SectionsList setBlock={setBlock} block={block} />
        <div className={styles.info_wrapper}>
          {createElement(ActiveSection, sectionProps as never)}
          <SubmitButton />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
