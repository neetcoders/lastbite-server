/** Types generated for queries found in "src/api/v1/product/product.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

export type NumberOrString = number | string;

/** 'CreateProduct' parameters type */
export interface ICreateProductParams {
  product: {
    display_name: string | null | void,
    description: string | null | void,
    price_before: NumberOrString | null | void,
    price_after: NumberOrString | null | void,
    expiration_date: DateOrString | null | void,
    stock: number | null | void,
    store_id: string | null | void,
    category_id: string | null | void
  };
}

/** 'CreateProduct' return type */
export interface ICreateProductResult {
  id: string;
}

/** 'CreateProduct' query type */
export interface ICreateProductQuery {
  params: ICreateProductParams;
  result: ICreateProductResult;
}

const createProductIR: any = {"usedParamSet":{"product":true},"params":[{"name":"product","required":false,"transform":{"type":"pick_tuple","keys":[{"name":"display_name","required":false},{"name":"description","required":false},{"name":"price_before","required":false},{"name":"price_after","required":false},{"name":"expiration_date","required":false},{"name":"stock","required":false},{"name":"store_id","required":false},{"name":"category_id","required":false}]},"locs":[{"a":129,"b":136}]}],"statement":"INSERT INTO product (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)\nVALUES :product\nRETURNING id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO product (display_name, description, price_before, price_after, expiration_date, stock, store_id, category_id)
 * VALUES :product
 * RETURNING id
 * ```
 */
export const createProduct = new PreparedQuery<ICreateProductParams,ICreateProductResult>(createProductIR);


/** 'GetProductById' parameters type */
export interface IGetProductByIdParams {
  id?: string | null | void;
}

/** 'GetProductById' return type */
export interface IGetProductByIdResult {
  address_created_at: Date;
  address_latitude: number;
  address_longitude: number;
  address_street: string;
  address_updated_at: Date;
  category_display_name: string;
  category_slug: string;
  created_at: Date;
  description: string | null;
  display_name: string;
  expiration_date: Date;
  id: string;
  price_after: string;
  price_before: string;
  stock: number;
  store_created_at: Date;
  store_display_name: string;
  store_id: string;
  store_updated_at: Date;
  updated_at: Date;
}

/** 'GetProductById' query type */
export interface IGetProductByIdQuery {
  params: IGetProductByIdParams;
  result: IGetProductByIdResult;
}

const getProductByIdIR: any = {"usedParamSet":{"id":true},"params":[{"name":"id","required":false,"transform":{"type":"scalar"},"locs":[{"a":746,"b":748}]}],"statement":"SELECT\n    p.id,\n    p.display_name,\n    p.description,\n    p.price_before,\n    p.price_after,\n    p.expiration_date,\n    p.stock,\n    s.id as \"store_id\",\n    s.display_name as \"store_display_name\",\n    s.created_at as \"store_created_at\",\n    s.updated_at as \"store_updated_at\",\n    a.street as \"address_street\",\n    a.longitude as \"address_longitude\",\n    a.latitude as \"address_latitude\",\n    a.created_at as \"address_created_at\",\n    a.updated_at as \"address_updated_at\",\n    c.slug as \"category_slug\",\n    c.display_name as \"category_display_name\",\n    p.created_at,\n    p.updated_at\nFROM product p\nINNER JOIN store s ON s.id = p.store_id\nINNER JOIN address a ON a.id = s.address_id\nINNER JOIN category c ON c.id = p.category_id\nWHERE p.id = :id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.id,
 *     p.display_name,
 *     p.description,
 *     p.price_before,
 *     p.price_after,
 *     p.expiration_date,
 *     p.stock,
 *     s.id as "store_id",
 *     s.display_name as "store_display_name",
 *     s.created_at as "store_created_at",
 *     s.updated_at as "store_updated_at",
 *     a.street as "address_street",
 *     a.longitude as "address_longitude",
 *     a.latitude as "address_latitude",
 *     a.created_at as "address_created_at",
 *     a.updated_at as "address_updated_at",
 *     c.slug as "category_slug",
 *     c.display_name as "category_display_name",
 *     p.created_at,
 *     p.updated_at
 * FROM product p
 * INNER JOIN store s ON s.id = p.store_id
 * INNER JOIN address a ON a.id = s.address_id
 * INNER JOIN category c ON c.id = p.category_id
 * WHERE p.id = :id
 * ```
 */
export const getProductById = new PreparedQuery<IGetProductByIdParams,IGetProductByIdResult>(getProductByIdIR);


