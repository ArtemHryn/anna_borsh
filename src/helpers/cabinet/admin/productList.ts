export const fields = [
  { name: "Повна назва, опис продукту", type: "productInfo" },
  {
    type: "cardInfo",
    name: "Назва для картки, опис для картки",
  },
  {
    type: "cover",
    name: "Обкладинка",
  },
  {
    type: "dates",
    name: "Дата початку та закінчення",
  },
  {
    type: "pricing",
    name: "Вартість продукту та знижка",
  },
  {
    type: "block1",
    name: "Назва та опис Блоку 1",
  },
  {
    type: "block2",
    name: "Назва та опис Блоку  2 ",
  },
  {
    type: "block3",
    name: "Назва та опис Блоку  3",
  },
  {
    type: "block4",
    name: "Назва та опис Блоку  4",
  },
  {
    type: "block5",
    name: "Назва та опис Блоку  5",
  },
  {
    type: "block6",
    name: "Назва та опис Блоку  6",
  },
  {
    type: "block7",
    name: "Назва та опис Блоку  7",
  },
  {
    type: "block8",
    name: "Назва та опис Блоку  8",
  },
  {
    type: "block9",
    name: "Назва та опис Блоку  9",
  },
  {
    type: "block10",
    name: "Назва та опис Блоку  10",
  },
] as const;

export type ProductListType = (typeof fields)[number]["type"];
