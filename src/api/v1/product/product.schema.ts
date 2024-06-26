import { IGetProductByIdResult } from "./product.queries";

export type CreateProductSchema = {
  display_name: string;
  description?: string;
  price_before: number;
  price_after: number;
  expiration_date: string;
  stock: number;
  category_slug: string;
  image_id?: string;
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
  image_id?: string;
  payload: {
    sub: string;
  }
}


export type UpdateStockSchema = {
  stock: number;
  payload: {
    sub: string;
  }
}


export function convertToGetProductResponse(product: IGetProductByIdResult) {
  return {
    id: product.id,
    display_name: product.display_name,
    description: product.description,
    price_before: product.price_before,
    price_after: product.price_after,
    expiration_date: product.expiration_date,
    stock: product.stock,
    image_url: product.image_id
      ? `${process.env.IMAGE_CDN_ENDPOINT}/store/${product.image_id}${product.image_ext}`
      : null,
    store: {
      id: product.store_id,
      display_name: product.store_display_name,
      address: {
        street: product.address_street,
        longitude: product.address_longitude,
        latitude: product.address_latitude,
        created_at: product.address_created_at,
        updated_at: product.address_updated_at,
      },
      created_at: product.store_created_at,
      updated_at: product.store_updated_at,
    },
    category: {
      slug: product.category_slug,
      display_name: product.category_display_name,
    },
    created_at: product.created_at,
    updated_at: product.updated_at
  }
}


export function convertToGetProductListResponse(products: IGetProductByIdResult[]) {
  return products.map(product => ({
    id: product.id,
    display_name: product.display_name,
    description: product.description,
    price_before: product.price_before,
    price_after: product.price_after,
    expiration_date: product.expiration_date,
    stock: product.stock,
    image_url: product.image_id
      ? `${process.env.IMAGE_CDN_ENDPOINT}/store/${product.image_id}${product.image_ext}`
      : null,
    store: {
      id: product.store_id,
      display_name: product.store_display_name,
      address: {
        street: product.address_street,
        longitude: product.address_longitude,
        latitude: product.address_latitude,
        created_at: product.address_created_at,
        updated_at: product.address_updated_at,
      },
      created_at: product.store_created_at,
      updated_at: product.store_updated_at,
    },
    category: {
      slug: product.category_slug,
      display_name: product.category_display_name,
    },
    created_at: product.created_at,
    updated_at: product.updated_at
  }))
}