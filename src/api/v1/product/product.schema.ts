export type CreateProductSchema = {
  display_name: string;
  description?: string;
  price_before: number;
  price_after: number;
  expiration_date: string;
  stock: number;
  category_slug: string;
  payload: {
    sub: string;
  }
}

export type UpdateProductSchema = {
  display_name: string;
  description?: string;
  price_before: number;
  price_after: number;
  expiration_date: string;
  category_slug: string;
  payload: {
    sub: string;
  }
}