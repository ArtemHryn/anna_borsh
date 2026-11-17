export interface UploadedCover {
  id: string | number;
  url: string;
}

export type BlockIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type ProductNameField = "name" | "cardName" | `blockName${BlockIndex}`;
export type ProductDescriptionField =
  | "description"
  | "cardDescription"
  | `blockDescription${BlockIndex}`;

type BlockFormData = {
  [Index in BlockIndex as `blockName${Index}`]?: string;
} & {
  [Index in BlockIndex as `blockDescription${Index}`]?: string;
};

export type AddProductFormData = {
  name: string;
  description: string;
  cardName: string;
  cardDescription: string;
  cover: UploadedCover;
  dateRange: Date[];
  price: string;
  discount?: string;
} & BlockFormData;
