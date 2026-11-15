export interface UploadedCover {
  id: string | number;
  url: string;
}

export interface AddProductFormData {
  name?: string;
  description?: string;
  cardName?: string;
  cardDescription?: string;
  cover?: UploadedCover;
}
